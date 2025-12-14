const config = require('../../config');
const db = require('../../lib/database');

module.exports = {
    name: 'owner',
    aliases: ['owneronly', 'adminmenu'],
    description: '𓂃 ࣪ ִֶָ𝗠𝗲𝗻𝘂 𝗢𝘄𝗻𝗲𝗿 𝗣𝗿𝗶𝘃𝗮𝘁𝗲',
    category: 'owner',
    
    async execute(sock, message, args) {
        const sender = message.key?.remoteJid || message.from;
        
        // Check if user is owner
        if (!sender.includes(config.ownerNumber)) {
            return await sock.sendMessage(sender, {
                text: '*❌ 𝗔𝗸𝘀𝗲𝘀 𝗗𝗶𝘁𝗼𝗹𝗮𝗸!*\n\nHanya owner yang bisa menggunakan command ini.\n\nSilakan hubungi owner untuk bantuan:\n@' + config.ownerNumber.split('@')[0],
                mentions: [config.ownerNumber]
            });
        }

        const menuText = `
*╔═══════════════════════*
*║*  *🦋་༘࿐ 𝗢𝗪𝗡𝗘𝗥 𝗠𝗘𝗡𝗨*
*╚═══════════════════════*

*❏ 𝗜𝗻𝗳𝗼 𝗕𝗼𝘁:*
┌─❒ 「 Bot Status 」
│◦ *Command:* .self
│◦ *Desc:* Mode bot private
│◦ *Access:* Owner only
└❒

┌─❒ 「 Public Mode 」
│◦ *Command:* .public
│◦ *Desc:* Mode bot public
│◦ *Access:* Owner only
└❒

┌─❒ 「 Set PP Bot 」
│◦ *Command:* .setppbot
│◦ *Desc:* Ubah foto profil bot
│◦ *Access:* Owner only
└❒

*❏ 𝗦𝘆𝘀𝘁𝗲𝗺:*
┌─❒ 「 Restart Bot 」
│◦ *Command:* .restart
│◦ *Desc:* Restart sistem bot
│◦ *Access:* Owner only
└❒

┌─❒ 「 Shutdown 」
│◦ *Command:* .shutdown
│◦ *Desc:* Matikan bot
│◦ *Access:* Owner only
└❒

┌─❒ 「 Backup Data 」
│◦ *Command:* .backup
│◦ *Desc:* Backup database
│◦ *Access:* Owner only
└❒

┌─❒ 「 Eval Code 」
│◦ *Command:* .eval
│◦ *Desc:* Execute JavaScript
│◦ *Access:* Owner only
└❒

*❏ 𝗨𝘀𝗲𝗿 𝗠𝗮𝗻𝗮𝗴𝗲𝗺𝗲𝗻𝘁:*
┌─❒ 「 Block User 」
│◦ *Command:* .block 628xxx
│◦ *Desc:* Blokir user
│◦ *Access:* Owner only
└❒

┌─❒ 「 Unblock User 」
│◦ *Command:* .unblock 628xxx
│◦ *Desc:* Buka blokir user
│◦ *Access:* Owner only
└❒

┌─❒ 「 Add Premium 」
│◦ *Command:* .addprem 628xxx 30
│◦ *Desc:* Tambah premium user
│◦ *Access:* Owner only
└❒

┌─❒ 「 Remove Premium 」
│◦ *Command:* .delprem 628xxx
│◦ *Desc:* Hapus premium user
│◦ *Access:* Owner only
└❒

*❏ 𝗕𝗿𝗼𝗮𝗱𝗰𝗮𝘀𝘁:*
┌─❒ 「 Broadcast All 」
│◦ *Command:* .bcall Pesan
│◦ *Desc:* Kirim ke semua user
│◦ *Access:* Owner only
└❒

┌─❒ 「 Broadcast Group 」
│◦ *Command:* .bcgroup Pesan
│◦ *Desc:* Kirim ke semua grup
│◦ *Access:* Owner only
└❒

┌─❒ 「 Broadcast Premium 」
│◦ *Command:* .bcprem Pesan
│◦ *Desc:* Kirim ke premium user
│◦ *Access:* Owner only
└❒

*❏ 𝗗𝗮𝘁𝗮𝗯𝗮𝘀𝗲:*
┌─❒ 「 List Users 」
│◦ *Command:* .listuser
│◦ *Desc:* Lihat semua user
│◦ *Access:* Owner only
└❒

┌─❒ 「 List Groups 」
│◦ *Command:* .listgroup
│◦ *Desc:* Lihat semua grup
│◦ *Access:* Owner only
└❒

┌─❒ 「 List Premium 」
│◦ *Command:* .listpremium
│◦ *Desc:* Lihat premium user
│◦ *Access:* Owner only
└❒

┌─❒ 「 Stats Bot 」
│◦ *Command:* .stats
│◦ *Desc:* Statistik bot
│◦ *Access:* Owner only
└❒

*❏ 𝗗𝗲𝘃𝗲𝗹𝗼𝗽𝗺𝗲𝗻𝘁:*
┌─❒ 「 Exec Command 」
│◦ *Command:* .exec cmd
│◦ *Desc:* Execute shell command
│◦ *Access:* Owner only
└❒

┌─❒ 「 Load Command 」
│◦ *Command:* .load command.js
│◦ *Desc:* Load command baru
│◦ *Access:* Owner only
└❒

┌─❒ 「 Unload Command 」
│◦ *Command:* .unload command
│◦ *Desc:* Unload command
│◦ *Access:* Owner only
└❒

┌─❒ 「 Reload All 」
│◦ *Command:* .reload
│◦ *Desc:* Reload semua command
│◦ *Access:* Owner only
└❒

*╭─❒ 「 𓂃 ࣪ ִֶָ📊 𝗦𝘁𝗮𝘁𝘀 」*
*│◦ Total Users: ${db.users.length}*
*│◦ Total Groups: ${db.groups.length}*
*│◦ Premium Users: ${db.premium.length}*
*│◦ Bot Uptime: ${process.uptime().toFixed(0)}s*
*╰❒*

*© ${config.ownerName} • Owner Menu*
`;

        const buttons = [
            {
                buttonId: `${config.prefix}stats`,
                buttonText: { displayText: 'ᥫ᭡ ୨ৎ ִֶָ. ..𓂃 ࣪ ִֶָ📊་༘࿐ Stats' },
                type: 1
            },
            {
                buttonId: `${config.prefix}listuser`,
                buttonText: { displayText: 'ᥫ᭡ ୨ৎ ִֶָ. ..𓂃 ࣪ ִֶָ👥་༘࿐ Users' },
                type: 1
            },
            {
                buttonId: `${config.prefix}restart`,
                buttonText: { displayText: 'ᥫ᭡ ୨ৎ ִֶָ. ..𓂃 ࣪ ִֶָ🔄་༘࿐ Restart' },
                type: 1
            }
        ];

        await sock.sendMessage(sender, {
            text: menuText,
            footer: `✨ ${config.botName} • Owner Panel`,
            buttons: buttons,
            headerType: 1
        });
    }
};
