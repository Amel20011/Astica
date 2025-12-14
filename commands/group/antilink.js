const config = require('../../config');
const db = require('../../lib/database');

module.exports = {
    name: 'antilink',
    aliases: ['setantilink', 'linkguard'],
    description: '𓂃 ࣪ ִֶָ𝗔𝗻𝘁𝗶 𝗟𝗶𝗻𝗸 𝗦𝗲𝘁𝘁𝗶𝗻𝗴𝘀',
    category: 'group',
    groupOnly: true,
    requireAdmin: true,
    
    async execute(sock, message, args) {
        const { sender, from, isGroup, pushName } = message;
        
        if (!isGroup) {
            return await sock.sendMessage(sender, {
                text: '*❌ Command ini hanya bisa digunakan di grup!*'
            });
        }

        const group = db.getGroup(from);
        if (!group) {
            db.addGroup(from, { name: 'Group' });
        }

        const currentSetting = group?.settings?.antilink || false;
        
        if (args.length === 0) {
            // Show current status
            const statusText = `
*╔═══════════════════════*
*║*  *🦋་༘࿐ 𝗔𝗡𝗧𝗜𝗟𝗜𝗡𝗞 𝗦𝗘𝗧𝗧𝗜𝗡𝗚𝗦*
*╚═══════════════════════*

*❏ Status:* ${currentSetting ? '✅ AKTIF' : '❌ NONAKTIF'}
*❏ Group:* ${group?.name || 'Unknown'}

*╭─❒ 「 𓂃 ࣪ ִֶָ📋 𝗜𝗻𝘀𝘁𝗿𝘂𝗸𝘀𝗶 」*
*│◦ ${config.prefix}antilink on - Aktifkan*
*│◦ ${config.prefix}antilink off - Nonaktifkan*
*│◦ ${config.prefix}antilink list - List domain diblokir*
*╰❒*

*╭─❒ 「 𓂃 ࣪ ִֶָℹ️ 𝗜𝗻𝗳𝗼 」*
*│◦ Fitur ini akan menghapus otomatis*
*│◦ pesan yang mengandung link*
*│◦ kecuali dari admin*
*╰❒*

*© ${config.botName} • Group Protection*
`;
            
            const buttons = [
                {
                    buttonId: `${config.prefix}antilink on`,
                    buttonText: { displayText: 'ᥫ᭡ ୨ৎ ִֶָ. ..𓂃 ࣪ ִֶָ✅་༘࿐ Aktifkan' },
                    type: 1
                },
                {
                    buttonId: `${config.prefix}antilink off`,
                    buttonText: { displayText: 'ᥫ᭡ ୨ৎ ִֶָ. ..𓂃 ࣪ ִֶָ❌་༘࿐ Nonaktifkan' },
                    type: 1
                },
                {
                    buttonId: `${config.prefix}menu`,
                    buttonText: { displayText: 'ᥫ᭡ ୨ৎ ִֶָ. ..𓂃 ࣪ ִֶָ🌷་༘࿐ Menu' },
                    type: 1
                }
            ];

            return await sock.sendMessage(from, {
                text: statusText,
                footer: `✨ ${config.botName} • Group Settings`,
                buttons: buttons,
                headerType: 1
            });
        }

        const action = args[0].toLowerCase();
        
        if (action === 'on' || action === 'enable' || action === 'aktif') {
            db.updateGroup(from, {
                'settings.antilink': true,
                updatedAt: new Date().toISOString()
            });
            
            await sock.sendMessage(from, {
                text: `*✅ ANTI-LINK DIAKTIFKAN*\n\nFitur anti-link telah diaktifkan di grup ini.\nSemua link yang dikirim member akan dihapus otomatis.`
            });
            
        } else if (action === 'off' || action === 'disable' || action === 'nonaktif') {
            db.updateGroup(from, {
                'settings.antilink': false,
                updatedAt: new Date().toISOString()
            });
            
            await sock.sendMessage(from, {
                text: `*❌ ANTI-LINK DIMATIKAN*\n\nFitur anti-link telah dimatikan di grup ini.\nMember sekarang bisa mengirim link.`
            });
            
        } else if (action === 'list' || action === 'daftar') {
            const blockedDomains = [
                'whatsapp.com',
                'chat.whatsapp.com',
                'facebook.com',
                'fb.com',
                'instagram.com',
                'tiktok.com',
                'youtube.com',
                'twitter.com',
                'x.com',
                'telegram.org',
                't.me',
                'discord.gg',
                'discord.com'
            ];
            
            const listText = `
*╔═══════════════════════*
*║*  *🦋་༘࿐ 𝗗𝗢𝗠𝗔𝗜𝗡 𝗗𝗜𝗕𝗟𝗢𝗞𝗜𝗥*
*╚═══════════════════════*

*❏ Total Domain:* ${blockedDomains.length}
*❏ Status:* ${currentSetting ? '✅ AKTIF' : '❌ NONAKTIF'}

*📋 List Domain:*
${blockedDomains.map((domain, i) => `${i + 1}. ${domain}`).join('\n')}

*╭─❒ 「 𓂃 ࣪ ִֶָℹ️ 𝗜𝗻𝗳𝗼 」*
*│◦ Domain di atas akan diblokir*
*│◦ Kecuali dikirim oleh admin*
*│◦ Untuk custom domain hubungi owner*
*╰❒*

*© ${config.botName} • Security System*
`;
            
            await sock.sendMessage(from, { text: listText });
            
        } else {
            await sock.sendMessage(from, {
                text: `*❌ Penggunaan salah!*\nGunakan: ${config.prefix}antilink [on/off/list]`
            });
        }
    }
};
