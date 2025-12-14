const fs = require('fs-extra');
const path = require('path');
const config = require('../config');
const database = require('./database');

class MessageHandler {
    constructor() {
        this.commands = new Map();
        this.aliases = new Map();
        this.loadCommands();
    }

    loadCommands() {
        const commandsDir = path.join(__dirname, '../commands');
        
        const walk = (dir) => {
            const files = fs.readdirSync(dir);
            
            files.forEach(file => {
                const filePath = path.join(dir, file);
                const stat = fs.statSync(filePath);
                
                if (stat.isDirectory()) {
                    walk(filePath);
                } else if (file.endsWith('.js')) {
                    try {
                        const command = require(filePath);
                        
                        if (command.name && command.execute) {
                            this.commands.set(command.name, command);
                            console.log(`📦 Loaded command: ${command.name}`);
                            
                            // Register aliases
                            if (command.aliases && Array.isArray(command.aliases)) {
                                command.aliases.forEach(alias => {
                                    this.aliases.set(alias, command.name);
                                    console.log(`  ↪ Alias: ${alias}`);
                                });
                            }
                        }
                    } catch (error) {
                        console.error(`❌ Error loading command ${file}:`, error.message);
                    }
                }
            });
        };
        
        walk(commandsDir);
        console.log(`✅ Total commands loaded: ${this.commands.size}`);
    }

    getCommand(name) {
        // Check direct command
        if (this.commands.has(name)) {
            return this.commands.get(name);
        }
        
        // Check alias
        if (this.aliases.has(name)) {
            const commandName = this.aliases.get(name);
            return this.commands.get(commandName);
        }
        
        return null;
    }

    async handleMessage(sock, message) {
        try {
            const { key, message: msg, pushName, sender, isGroup } = message;
            
            // Extract message text
            let text = '';
            if (msg.conversation) {
                text = msg.conversation;
            } else if (msg.extendedTextMessage?.text) {
                text = msg.extendedTextMessage.text;
            } else if (msg.imageMessage?.caption) {
                text = msg.imageMessage.caption;
            } else if (msg.videoMessage?.caption) {
                text = msg.videoMessage.caption;
            }
            
            // Check if it's a command
            if (!text.startsWith(config.prefix)) {
                return;
            }
            
            // Parse command
            const args = text.slice(config.prefix.length).trim().split(/ +/);
            const cmdName = args.shift().toLowerCase();
            
            // Get command
            const command = this.getCommand(cmdName);
            if (!command) {
                return;
            }
            
            // Check permissions
            if (command.category === 'owner' && !this.isOwner(sender)) {
                await sock.sendMessage(sender, {
                    text: '*❌ Akses Ditolak!*\nHanya owner yang bisa menggunakan command ini.'
                });
                return;
            }
            
            // Check group only commands
            if (command.groupOnly && !isGroup) {
                await sock.sendMessage(sender, {
                    text: '*❌ Command ini hanya bisa digunakan di grup!*'
                });
                return;
            }
            
            // Check private only commands
            if (command.privateOnly && isGroup) {
                await sock.sendMessage(sender, {
                    text: '*❌ Command ini hanya bisa digunakan di private chat!*'
                });
                return;
            }
            
            // Check if user is registered for certain commands
            if (command.requireRegister && !database.isRegistered(sender)) {
                const daftarCmd = this.getCommand('daftar');
                if (daftarCmd) {
                    await daftarCmd.execute(sock, message, args);
                }
                return;
            }
            
            // Check premium requirements
            if (command.premiumOnly && !database.isPremium(sender)) {
                await sock.sendMessage(sender, {
                    text: '*🌟 Fitur Premium*\nFitur ini hanya untuk user premium.\nKetik `.sewa` untuk info premium.'
                });
                return;
            }
            
            // Execute command
            console.log(`⚡ Executing: ${cmdName} by ${pushName} (${sender})`);
            await command.execute(sock, message, args);
            
        } catch (error) {
            console.error('❌ Error in message handler:', error);
        }
    }

    async handleButton(sock, message) {
        try {
            const { key, message: msg, sender } = message;
            
            let buttonId = '';
            if (msg.templateButtonReplyMessage?.selectedId) {
                buttonId = msg.templateButtonReplyMessage.selectedId;
            } else if (msg.buttonsResponseMessage?.selectedButtonId) {
                buttonId = msg.buttonsResponseMessage.selectedButtonId;
            }
            
            if (!buttonId || !buttonId.startsWith(config.prefix)) {
                return;
            }
            
            // Parse button command
            const args = buttonId.slice(config.prefix.length).trim().split(/ +/);
            const cmdName = args.shift().toLowerCase();
            
            // Get command
            const command = this.getCommand(cmdName);
            if (!command) {
                return;
            }
            
            // Execute button command
            console.log(`⚡ Executing button: ${cmdName} by ${sender}`);
            await command.execute(sock, message, args);
            
        } catch (error) {
            console.error('❌ Error in button handler:', error);
        }
    }

    isOwner(jid) {
        return jid.includes(config.ownerNumber);
    }

    isAdmin(sock, jid, userJid) {
        if (!jid.endsWith('@g.us')) return false;
        
        try {
            const metadata = sock.groupMetadata(jid);
            const participants = metadata.participants;
            const user = participants.find(p => p.id === userJid);
            
            return user && (user.admin === 'admin' || user.admin === 'superadmin');
        } catch (error) {
            return false;
        }
    }

    formatTime(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        if (days > 0) return `${days}d ${hours % 24}h`;
        if (hours > 0) return `${hours}h ${minutes % 60}m`;
        if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
        return `${seconds}s`;
    }

    parseMention(text) {
        const mentions = [];
        const regex = /@(\d+)/g;
        let match;
        
        while ((match = regex.exec(text)) !== null) {
            mentions.push(match[1] + '@s.whatsapp.net');
        }
        
        return mentions;
    }
}

module.exports = MessageHandler;
