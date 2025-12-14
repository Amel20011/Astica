const config = require('../config');
const db = require('../lib/database');

module.exports = {
    name: 'welcome',
    description: 'Auto welcome message for new members',
    
    async execute(sock, update) {
        const { id, participants, action } = update;
        
        if (action !== 'add') return;
        
        const group = db.getGroup(id);
        if (!group || !group.settings?.welcome) return;
        
        try {
            const groupMetadata = await sock.groupMetadata(id);
            
            participants.forEach(async (participant) => {
                // Send welcome message
                const welcomeText = `
*╔═══════════════════════*
*║*  *🦋་༘࿐ 𝗪𝗘𝗟𝗖𝗢𝗠𝗘*
*╚═══════════════════════*

👋 *Selamat datang* @${participant.split('@')[0]}!

*❏ Group:* ${groupMetadata.subject}
*❏ Member ke:* ${groupMetadata.participants.length}
*❏ Dibuat oleh:* ${groupMetadata.owner?.split('@')[0] || 'Unknown'}

*╭─❒ 「 𓂃 ࣪ ִֶָ📋 𝗣𝗲𝗿𝗮𝘁𝘂𝗿𝗮𝗻 」*
*│◦ Baca deskripsi grup*
*│◦ Jangan spam*
*│◦ Hormati semua member*
*│◦ Tidak boleh promosi tanpa izin*
*╰❒*

*╭─❒ 「 𓂃 ࣪ ִֶָℹ️ 𝗜𝗻𝗳𝗼 」*
*│◦ Ketik .menu untuk command*
*│◦ .rules untuk peraturan*
*│◦ .admin untuk list admin*
*╰❒*

*© ${config.botName} • Welcome System*
`;
                
                await sock.sendMessage(id, {
                    text: welcomeText,
                    mentions: [participant]
                });
                
                // Send private welcome message
                try {
                    const privateWelcome = `
*🌸 Halo! Selamat datang di ${groupMetadata.subject}*

Terima kasih telah bergabung dengan kami. 
Semoga kamu betah dan bisa berpartisipasi aktif.

*Bot Commands:*
• .menu - Menu utama
• .group - Command grup
• .info - Info bot

*Butuh bantuan?*
Ketik .owner untuk menghubungi admin.

*© ${config.botName}*
`;
                    
                    await sock.sendMessage(participant, { text: privateWelcome });
                } catch (error) {
                    // User might have private chat disabled
                }
            });
            
        } catch (error) {
            console.error('Error in welcome plugin:', error);
        }
    }
};
