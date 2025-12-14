const config = require('../../config');

module.exports = {
    name: 'tagall',
    aliases: ['tag', 'everyone', 'all'],
    description: '𓂃 ࣪ ִֶָ𝗧𝗮𝗴 𝗦𝗲𝗺𝘂𝗮 𝗠𝗲𝗺𝗯𝗲𝗿',
    category: 'group',
    groupOnly: true,
    requireAdmin: true,
    
    async execute(sock, message, args) {
        const { sender, from, isGroup } = message;
        
        if (!isGroup) {
            return await sock.sendMessage(sender, {
                text: '*❌ Command ini hanya bisa digunakan di grup!*'
            });
        }

        try {
            // Get group metadata
            const groupMetadata = await sock.groupMetadata(from);
            const participants = groupMetadata.participants;
            
            // Filter out bots and get mentions
            const mentions = [];
            let tagMessage = '';
            
            participants.forEach((participant, index) => {
                if (!participant.id.includes('@s.whatsapp.net')) return;
                
                mentions.push(participant.id);
                tagMessage += `@${participant.id.split('@')[0]}\n`;
                
                // Add some spacing for readability
                if ((index + 1) % 5 === 0) {
                    tagMessage += '\n';
                }
            });

            const infoText = args.join(' ') || '📢 *PENGUMUMAN DARI ADMIN* 📢';
            
            const finalMessage = `
*╔═══════════════════════*
*║*  *🦋་༘࿐ 𝗧𝗔𝗚 𝗔𝗟𝗟 𝗠𝗘𝗠𝗕𝗘𝗥*
*╚═══════════════════════*

${infoText}

*❏ Group:* ${groupMetadata.subject}
*❏ Total Member:* ${participants.length}
*❏ Admin:* @${message.sender.split('@')[0]}

────────────────────
${tagMessage}
────────────────────

*© ${config.botName} • Group Notification*
`;
            
            await sock.sendMessage(from, {
                text: finalMessage,
                mentions: mentions
            });
            
        } catch (error) {
            console.error('Error in tagall:', error);
            await sock.sendMessage(from, {
                text: '*❌ Gagal melakukan tag all!*\nPastikan bot adalah admin grup.'
            });
        }
    }
};
