const os = require('os');
const config = require('../../config');
const db = require('../../lib/database');

module.exports = {
    name: 'info',
    aliases: ['botinfo', 'about', 'status'],
    description: '𓂃 ࣪ ִֶָ𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘀𝗶 𝗕𝗼𝘁 & 𝗦𝘁𝗮𝘁𝘂𝘀',
    category: 'main',
    
    async execute(sock, message, args) {
        const sender = message.key?.remoteJid || message.from;
        
        // Hitung statistik
        const totalUsers = db.users.length;
        const totalGroups = db.groups.length;
        const premiumUsers = db.premium.length;
        
        // System info
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);
        
        // Memory usage
        const usedMemory = process.memoryUsage().heapUsed / 1024 / 1024;
        const totalMemory = os.totalmem() / 1024 / 1024;
        const memoryPercent = ((usedMemory / totalMemory) * 100).toFixed(2);
        
        // Platform info
        const platform = os.platform();
        const arch = os.arch();
        const cpuModel = os.cpus()[0].model;
        const cpuCores = os.cpus().length;
        
        const infoText = `
*╔═══════════════════════*
*║*  *🦋་༘࿐ 𝗕𝗢𝗧 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡*
*╚═══════════════════════*

*❏ 𝗕𝗮𝘀𝗶𝗰 𝗜𝗻𝗳𝗼:*
┌─❒ 「 Bot Identity 」
│◦ *Name:* ${config.botName}
│◦ *Owner:* @${config.ownerNumber.split('@')[0]}
│◦ *Prefix:* ${config.prefix}
│◦ *Version:* 2.0.0
│◦ *Library:* @whiskeysockets/baileys
└❒

*❏ 𝗦𝘁𝗮𝘁𝗶𝘀𝘁𝗶𝗸𝘀:*
┌─❒ 「 Database Stats 」
│◦ *Total Users:* ${totalUsers}
│◦ *Total Groups:* ${totalGroups}
│◦ *Premium Users:* ${premiumUsers}
│◦ *Active Today:* ${db.users.filter(u => {
    const lastSeen = new Date(u.lastSeen || u.registeredAt);
    const today = new Date();
    return lastSeen.toDateString() === today.toDateString();
}).length}
└❒

*❏ 𝗦𝘆𝘀𝘁𝗲𝗺 𝗦𝘁𝗮𝘁𝘂𝘀:*
┌─❒ 「 Server Info 」
│◦ *Platform:* ${platform} ${arch}
│◦ *CPU:* ${cpuCores} cores
│◦ *CPU Model:* ${cpuModel.split('@')[0].trim()}
│◦ *Total RAM:* ${(totalMemory / 1024).toFixed(2)} GB
│◦ *Used RAM:* ${usedMemory.toFixed(2)} MB (${memoryPercent}%)
└❒

┌─❒ 「 Bot Uptime 」
│◦ *Duration:* ${hours}h ${minutes}m ${seconds}s
│◦ *Started:* ${new Date(Date.now() - (uptime * 1000)).toLocaleString('id-ID')}
│◦ *Ping:* ${Date.now() - (message.messageTimestamp * 1000)}ms
│◦ *Node.js:* ${process.version}
└❒

*❏ 𝗙𝗲𝗮𝘁𝘂𝗿𝗲𝘀:*
┌─❒ 「 Available Features 」
│◦ Multi-device: ✅
│◦ Interactive Buttons: ✅
│◦ Template Messages: ✅
│◦ Database System: ✅
│◦ Plugin System: ✅
│◦ Auto Session: ✅
│◦ QR Code Login: ✅
│◦ Media Support: ✅
└❒

┌─❒ 「 Command Categories 」
│◦ Main Commands: 15+
│◦ Owner Commands: 15+
│◦ Group Commands: 20+
│◦ Downloader: 10+
│◦ Tools: 15+
│◦ Fun & Games: 12+
│◦ Premium: 15+
│◦ Total: ~100 commands
└❒

*❏ 𝗧𝗲𝗰𝗵𝗻𝗼𝗹𝗼𝗴𝘆:*
┌─❒ 「 Tech Stack 」
│◦ *Backend:* Node.js ${process.version}
│◦ *Framework:* Baileys MD
│◦ *Database:* JSON Database
│◦ *Session:* Multi-device
│◦ *API:* REST & WebSocket
│◦ *Security:* End-to-end
└❒

*╭─❒ 「 𓂃 ࣪ ִֶָ📞 𝗖𝗼𝗻𝘁𝗮𝗰𝘁 」*
*│◦ Owner:* @${config.ownerNumber.split('@')[0]}
*│◦ WhatsApp:* wa.me/${config.ownerNumber.split('@')[0]}
*│◦ Instagram:* @laysha.bot
*│◦ Updates:* .changelog
*╰❒*

*╭─❒ 「 𓂃 ࣪ ִֶָ📊 𝗣𝗲𝗿𝗳𝗼𝗿𝗺𝗮𝗻𝗰𝗲 」*
*│◦ Memory Usage: ${memoryPercent}%*
*│◦ Uptime: ${hours}h ${minutes}m*
*│◦ Response Time: ${Date.now() - (message.messageTimestamp * 1000)}ms*
*│◦ Database Size: ${totalUsers + totalGroups + premiumUsers} records*
*╰❒*

*© ${config.botName} • Information Center*
`;

        const templateButtons = [
            {
                index: 1,
                quickReplyButton: {
                    displayText: 'ᥫ᭡ ୨ৎ ִֶָ. ..𓂃 ࣪ ִֶָ⚡་༘࿐ Ping Test',
                    id: `${config.prefix}ping`
                }
            },
            {
                index: 2,
                quickReplyButton: {
                    displayText: 'ᥫ᭡ ୨ৎ ִֶָ. ..𓂃 ࣪ ִֶָ📋་༘࿐ All Commands',
                    id: `${config.prefix}allmenu`
                }
            },
            {
                index: 3,
                quickReplyButton: {
                    displayText: 'ᥫ᭡ ୨ৎ ִֶָ. ..𓂃 ࣪ ִֶָ🦋་༘࿐ Owner',
                    id: `${config.prefix}owner`
                }
            }
        ];

        await sock.sendMessage(sender, {
            text: infoText,
            footer: `✨ ${config.botName} • System Information`,
            templateButtons: templateButtons,
            headerType: 1,
            mentions: [config.ownerNumber]
        });
    }
};
