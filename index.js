const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const pino = require('pino');
const fs = require('fs');
const path = require('path');
const qrcode = require('qrcode-terminal');

// Load Configuration
const config = require('./config');

// Load Database
const database = require('./lib/database');
global.db = database;

// Load Commands
const commands = {};
const commandsPath = path.join(__dirname, 'commands');

function loadCommands(dir = commandsPath) {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            loadCommands(fullPath);
        } else if (item.endsWith('.js')) {
            try {
                const command = require(fullPath);
                if (command.name) {
                    commands[command.name] = command;
                    
                    // Load aliases if exist
                    if (command.aliases) {
                        command.aliases.forEach(alias => {
                            commands[alias] = command;
                        });
                    }
                }
            } catch (error) {
                console.error(`❌ Error loading command ${item}:`, error.message);
            }
        }
    });
}

loadCommands();
console.log(`✅ Loaded ${Object.keys(commands).length} commands`);

// Start Bot Function
async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState(config.sessionPath);
    
    const sock = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: config.baileys.printQRInTerminal,
        auth: state,
        browser: ['Laysha Bot', 'Safari', '1.0.0'],
        markOnlineOnConnect: true,
        generateHighQualityLinkPreview: true,
        defaultQueryTimeoutMs: 60000
    });

    // Save credentials when updated
    sock.ev.on('creds.update', saveCreds);

    // Handle connection
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;
        
        if (qr) {
            console.log('📱 Scan QR Code below:');
            qrcode.generate(qr, { small: true });
        }
        
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log(`Connection closed due to ${lastDisconnect.error?.message || 'unknown reason'}, reconnecting ${shouldReconnect}`);
            
            if (shouldReconnect) {
                startBot();
            }
        } else if (connection === 'open') {
            console.log('✅ Connected to WhatsApp');
            console.log(`🤖 Bot Name: ${config.botName}`);
            console.log(`🎯 Prefix: ${config.prefix}`);
            console.log(`👑 Owner: ${config.ownerNumber}`);
        }
    });

    // Handle incoming messages
    sock.ev.on('messages.upsert', async ({ messages }) => {
        const m = messages[0];
        
        if (!m.message || m.key.remoteJid === 'status@broadcast') return;
        
        const messageType = Object.keys(m.message)[0];
        const text = m.message.conversation || 
                    m.message.extendedTextMessage?.text || 
                    m.message.imageMessage?.caption || 
                    m.message.videoMessage?.caption || '';
        
        const sender = m.key.remoteJid;
        const isGroup = sender.endsWith('@g.us');
        const pushName = m.pushName || 'User';
        const isCmd = text.startsWith(config.prefix);
        
        // Auto read message
        if (config.autoRead) {
            await sock.readMessages([m.key]);
        }
        
        // Handle commands
        if (isCmd) {
            const args = text.slice(config.prefix.length).trim().split(/ +/);
            const cmd = args.shift().toLowerCase();
            const command = commands[cmd];
            
            if (command) {
                console.log(`⚡ Executing command: ${cmd} by ${pushName} in ${isGroup ? 'group' : 'private'}`);
                
                try {
                    await command.execute(sock, {
                        key: m.key,
                        message: m.message,
                        pushName,
                        sender,
                        from: sender,
                        isGroup,
                        text,
                        args
                    }, args);
                } catch (error) {
                    console.error(`❌ Error executing ${cmd}:`, error);
                    await sock.sendMessage(sender, {
                        text: `*❌ Error:* ${error.message || 'Unknown error occurred'}`
                    });
                }
            } else {
                // Send menu if command not found
                const menuCmd = commands['menu'];
                if (menuCmd) {
                    await menuCmd.execute(sock, {
                        key: m.key,
                        message: m.message,
                        pushName,
                        sender,
                        from: sender,
                        isGroup,
                        text,
                        args: []
                    }, []);
                }
            }
        }
        
        // Handle button responses
        if (m.message?.templateButtonReplyMessage || m.message?.buttonsResponseMessage) {
            const buttonId = m.message.templateButtonReplyMessage?.selectedId || 
                           m.message.buttonsResponseMessage?.selectedButtonId;
            
            if (buttonId && buttonId.startsWith(config.prefix)) {
                const args = buttonId.slice(config.prefix.length).trim().split(/ +/);
                const cmd = args.shift().toLowerCase();
                const command = commands[cmd];
                
                if (command) {
                    try {
                        await command.execute(sock, {
                            key: m.key,
                            message: m.message,
                            pushName,
                            sender,
                            from: sender,
                            isGroup,
                            text: buttonId,
                            args
                        }, args);
                    } catch (error) {
                        console.error(`❌ Error executing button command ${cmd}:`, error);
                    }
                }
            }
        }
    });

    // Handle group participants update
    sock.ev.on('group-participants.update', async (update) => {
        const { id, participants, action } = update;
        
        // You can add welcome/leave messages here
        if (action === 'add') {
            // Welcome message
            console.log(`👋 New member added to group ${id}`);
        } else if (action === 'remove') {
            // Leave message
            console.log(`👋 Member removed from group ${id}`);
        }
    });

    // Handle message deletions
    sock.ev.on('messages.delete', (item) => {
        console.log(`🗑️ Message deleted:`, item);
    });

    return sock;
}

// Start the bot
startBot().catch(console.error);

// Handle process termination
process.on('SIGINT', () => {
    console.log('\n👋 Bot shutting down...');
    process.exit(0);
});

process.on('uncaughtException', (error) => {
    console.error('⚠️ Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('⚠️ Unhandled Rejection at:', promise, 'reason:', reason);
});
