const { Boom } = require('@hapi/boom');
const qrcode = require('qrcode-terminal');
const utils = require('./utils');
const config = require('../config');

class ConnectionManager {
    constructor() {
        this.sock = null;
        this.isConnected = false;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.reconnectDelay = 5000; // 5 seconds
    }

    async connect(socketFunction) {
        try {
            this.sock = await socketFunction();
            this.setupEventListeners();
            utils.success('Connection manager initialized');
            return this.sock;
        } catch (error) {
            utils.error(error, 'ConnectionManager.connect');
            throw error;
        }
    }

    setupEventListeners() {
        if (!this.sock) return;

        // Connection update
        this.sock.ev.on('connection.update', (update) => {
            this.handleConnectionUpdate(update);
        });

        // Credentials update
        this.sock.ev.on('creds.update', () => {
            utils.info('Credentials updated');
        });

        // Messages upsert
        this.sock.ev.on('messages.upsert', (data) => {
            utils.info(`New message received`);
        });

        // Group participants update
        this.sock.ev.on('group-participants.update', (update) => {
            this.handleGroupUpdate(update);
        });

        // Messages delete
        this.sock.ev.on('messages.delete', (items) => {
            utils.info(`${items.keys.length} messages deleted`);
        });
    }

    handleConnectionUpdate(update) {
        const { connection, lastDisconnect, qr } = update;
        
        if (qr) {
            console.log('\n📱 Scan QR Code below to login:');
            qrcode.generate(qr, { small: true });
            console.log('\n');
        }
        
        if (connection === 'open') {
            this.isConnected = true;
            this.reconnectAttempts = 0;
            utils.success('✅ Connected to WhatsApp');
            this.showConnectionInfo();
        }
        
        if (connection === 'close') {
            this.isConnected = false;
            const statusCode = lastDisconnect?.error?.output?.statusCode;
            
            if (statusCode === DisconnectReason.loggedOut) {
                utils.error('❌ Logged out from WhatsApp, please delete session and rescan QR');
                process.exit(1);
            } else if (this.reconnectAttempts < this.maxReconnectAttempts) {
                utils.warn(`⚠️ Connection closed, attempting to reconnect... (Attempt ${this.reconnectAttempts + 1}/${this.maxReconnectAttempts})`);
                this.reconnectAttempts++;
                
                setTimeout(() => {
                    utils.info('🔄 Reconnecting...');
                    this.reconnect();
                }, this.reconnectDelay * this.reconnectAttempts);
            } else {
                utils.error('❌ Max reconnection attempts reached, please restart bot');
            }
        }
        
        if (connection === 'connecting') {
            utils.info('🔄 Connecting to WhatsApp...');
        }
    }

    handleGroupUpdate(update) {
        const { id, participants, action } = update;
        
        switch (action) {
            case 'add':
                utils.info(`👋 ${participants.length} participant(s) added to group ${id}`);
                break;
            case 'remove':
                utils.info(`👋 ${participants.length} participant(s) removed from group ${id}`);
                break;
            case 'promote':
                utils.info(`⬆️ ${participants.length} participant(s) promoted in group ${id}`);
                break;
            case 'demote':
                utils.info(`⬇️ ${participants.length} participant(s) demoted in group ${id}`);
                break;
            default:
                utils.info(`Group update in ${id}: ${action}`);
        }
    }

    showConnectionInfo() {
        console.log('\n' + '═'.repeat(50));
        console.log('🤖 BOT INFORMATION');
        console.log('═'.repeat(50));
        console.log(`Bot Name     : ${config.botName}`);
        console.log(`Owner        : ${config.ownerName} (${config.ownerNumber})`);
        console.log(`Prefix       : ${config.prefix}`);
        console.log(`Session      : ${config.sessionName}`);
        console.log(`Version      : 2.0.0`);
        console.log('═'.repeat(50));
        console.log('💡 Type .menu to see available commands\n');
    }

    async reconnect() {
        try {
            if (this.sock) {
                await this.sock.ws.close();
            }
            
            utils.info('🔄 Reconnecting...');
            // The reconnection will be handled by the main index.js
        } catch (error) {
            utils.error(error, 'ConnectionManager.reconnect');
        }
    }

    async sendMessage(jid, content, options = {}) {
        if (!this.isConnected || !this.sock) {
            utils.warn('Cannot send message: Not connected');
            return null;
        }

        try {
            const result = await this.sock.sendMessage(jid, content, options);
            utils.info(`Message sent to ${jid}`);
            return result;
        } catch (error) {
            utils.error(error, `sendMessage to ${jid}`);
            return null;
        }
    }

    async sendTyping(jid, duration = 1000) {
        if (!this.isConnected || !this.sock) return;

        try {
            await this.sock.sendPresenceUpdate('composing', jid);
            
            if (duration > 0) {
                setTimeout(async () => {
                    await this.sock.sendPresenceUpdate('paused', jid);
                }, duration);
            }
        } catch (error) {
            utils.error(error, 'sendTyping');
        }
    }

    async sendReadReceipt(jid, messageKey) {
        if (!this.isConnected || !this.sock) return;

        try {
            await this.sock.readMessages([messageKey]);
        } catch (error) {
            utils.error(error, 'sendReadReceipt');
        }
    }

    async getGroupMetadata(jid) {
        if (!this.isConnected || !this.sock) return null;

        try {
            const metadata = await this.sock.groupMetadata(jid);
            return metadata;
        } catch (error) {
            utils.error(error, `getGroupMetadata for ${jid}`);
            return null;
        }
    }

    async getProfilePicture(jid) {
        if (!this.isConnected || !this.sock) return null;

        try {
            const profilePicture = await this.sock.profilePictureUrl(jid, 'image');
            return profilePicture;
        } catch (error) {
            utils.error(error, `getProfilePicture for ${jid}`);
            return null;
        }
    }

    async updateProfileStatus(status) {
        if (!this.isConnected || !this.sock) return;

        try {
            await this.sock.updateProfileStatus(status);
            utils.info(`Profile status updated to: ${status}`);
        } catch (error) {
            utils.error(error, 'updateProfileStatus');
        }
    }

    async updateProfileName(name) {
        if (!this.isConnected || !this.sock) return;

        try {
            await this.sock.updateProfileName(name);
            utils.info(`Profile name updated to: ${name}`);
        } catch (error) {
            utils.error(error, 'updateProfileName');
        }
    }

    async updateProfilePicture(jid, imageBuffer) {
        if (!this.isConnected || !this.sock) return;

        try {
            await this.sock.updateProfilePicture(jid, imageBuffer);
            utils.info(`Profile picture updated for ${jid}`);
        } catch (error) {
            utils.error(error, 'updateProfilePicture');
        }
    }

    async downloadMediaMessage(message) {
        if (!this.isConnected || !this.sock) return null;

        try {
            const buffer = await this.sock.downloadMediaMessage(message);
            return buffer;
        } catch (error) {
            utils.error(error, 'downloadMediaMessage');
            return null;
        }
    }

    isConnected() {
        return this.isConnected;
    }

    getSocket() {
        return this.sock;
    }

    async disconnect() {
        if (this.sock) {
            try {
                await this.sock.ws.close();
                utils.info('Disconnected from WhatsApp');
            } catch (error) {
                utils.error(error, 'disconnect');
            }
        }
    }
}

module.exports = ConnectionManager;
