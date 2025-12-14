const config = require('../../config');

module.exports = {
    name: 'admin',
    aliases: ['adminmenu', 'moderator'],
    description: '𓂃 ࣪ ִֶָ𝗠𝗲𝗻𝘂 𝗔𝗱𝗺𝗶𝗻 & 𝗠𝗼𝗱𝗲𝗿𝗮𝘁𝗼𝗿',
    category: 'main',
    
    async execute(sock, message, args) {
        const sender = message.key?.remoteJid || message.from;
        const isGroup = sender.endsWith('@g.us');
        
        if (!isGroup) {
            return await sock.sendMessage(sender, {
                text: '*❌ 𝗘𝗿𝗿𝗼𝗿!*\n\nCommand ini hanya bisa digunakan di dalam grup!\n\nPindah ke grup untuk melihat menu admin.'
            });
        }

        const adminText = `
*╔═══════════════════════*
*║*  *🦋་༘࿐ 𝗔𝗗𝗠𝗜𝗡 & 𝗠𝗢𝗗𝗘𝗥𝗔𝗧𝗢𝗥*
*╚═══════════════════════*

*❏ 𝗠𝗼𝗱𝗲𝗿𝗮𝘀𝗶 𝗚𝗿𝘂𝗽:*
┌─❒ 「 Delete Message 」
│◦ *Command:* .delete
│◦ *Desc:* Hapus pesan (reply)
│◦ *Access:* Admin only
│◦ *Note:* Reply pesan dengan .delete
└❒

┌─❒ 「 Anti Link System 」
│◦ *Command:* .antilink [on/off]
│◦ *Desc:* Auto delete link
│◦ *Access:* Admin only
│◦ *Note:* Blokir link WhatsApp, IG, dll
└❒

┌─❒ 「 Anti Bot 」
│◦ *Command:* .antibot [on/off]
│◦ *Desc:* Blokir bot masuk
│◦ *Access:* Admin only
│◦ *Note:* Auto kick bot detected
└❒

┌─❒ 「 Anti Delete 」
│◦ *Command:* .antidelete [on/off]
│◦ *Desc:* Deteksi pesan dihapus
│◦ *Access:* Admin only
│◦ *Note:* Tampilkan pesan yang dihapus
└❒

*❏ 𝗦𝗲𝗰𝘂𝗿𝗶𝘁𝘆:*
┌─❒ 「 Anti Spam 」
│◦ *Command:* .antispam [on/off]
│◦ *Desc:* Cegah spam pesan
│◦ *Access:* Admin only
│◦ *Note:* Auto mute spammer
└❒

┌─❒ 「 Anti View Once 」
│◦ *Command:* .antiviewonce [on/off]
│◦ *Desc:* Simpan view once
│◦ *Access:* Admin only
│◦ *Note:* Save view once media
└❒

┌─❒ 「 Anti Toxic 」
│◦ *Command:* .antitoxic [on/off]
│◦ *Desc:* Blokir kata kasar
│◦ *Access:* Admin only
│◦ *Note:* Auto delete toxic words
└❒

┌─❒ 「 Anti Virtex 」
│◦ *Command:* .antivirtex [on/off]
│◦ *Desc:* Blokir virtex/emoji spam
│◦ *Access:* Admin only
│◦ *Note:* Block excessive emoji
└❒

*❏ 𝗔𝘂𝘁𝗼𝗺𝗮𝘁𝗶𝗼𝗻:*
┌─❒ 「 Welcome Message 」
│◦ *Command:* .welcome [on/off]
│◦ *Desc:* Sambutan member baru
│◦ *Access:* Admin only
│◦ *Note:* Auto welcome new members
└❒

┌─❒ 「 Goodbye Message 」
│◦ *Command:* .goodbye [on/off]
│◦ *Desc:* Pesan keluar member
│◦ *Access:* Admin only
│◦ *Note:* Auto goodbye left members
└❒

┌─❒ 「 Auto Sticker 」
│◦ *Command:* .autosticker [on/off]
│◦ *Desc:* Auto convert image
│◦ *Access:* Admin only
│◦ *Note:* Auto convert to sticker
└❒

┌─❒ 「 Auto Reply 」
│◦ *Command:* .autoreply [on/off]
│◦ *Desc:* Auto reply keyword
│◦ *Access:* Admin only
│◦ *Note:* Set auto response
└❒

*❏ 𝗚𝗿𝗼𝘂𝗽 𝗖𝗼𝗻𝘁𝗿𝗼𝗹:*
┌─❒ 「 Open Group 」
│◦ *Command:* .group open
│◦ *Desc:* Buka grup untuk semua
│◦ *Access:* Admin only
│◦ *Note:* Anyone can send message
└❒

┌─❒ 「 Close Group 」
│◦ *Command:* .group close
│◦ *Desc:* Tutup grup (admin only)
│◦ *Access:* Admin only
│◦ *Note:* Only admin can send
└❒

┌─❒ 「 Set Rules 」
│◦ *Command:* .setrules [rules]
│◦ *Desc:* Set peraturan grup
│◦ *Access:* Admin only
│◦ *Example:* .setrules No spam
└❒

┌─❒ 「 Set Welcome 」
│◦ *Command:* .setwelcome [text]
│◦ *Desc:* Set custom welcome
│◦ *Access:* Admin only
│◦ *Example:* .setwelcome Selamat datang
└❒

*❏ 𝗨𝘁𝗶𝗹𝗶𝘁𝗶𝗲𝘀:*
┌─❒ 「 Poll Creator 」
│◦ *Command:* .poll [question|opt1|opt2]
│◦ *Desc:* Buat polling
│◦ *Access:* Admin only
│◦ *Example:* .poll Meeting kapan?|Senin|Selasa
└❒

┌─❒ 「 Vote System 」
│◦ *Command:* .vote [topic]
│◦ *Desc:* Buat voting
│◦ *Access:* Admin only
│◦ *Example:* .vote Pilih ketua
└❒

┌─❒ 「 Broadcast Group 」
│◦ *Command:* .bc [message]
│◦ *Desc:* Broadcast ke grup
│◦ *Access:* Admin only
│◦ *Example:* .bc Info penting
└❒

┌─❒ 「 Set Language 」
│◦ *Command:* .setlang [id/en]
│◦ *Desc:* Set bahasa bot
│◦ *Access:* Admin only
│◦ *Example:* .setlang en
└❒

*╭─❒ 「 𓂃 ࣪ ִֶָ📋 𝗡𝗼𝘁𝗲𝘀 」*
*│◦ Semua command di atas hanya untuk admin*
*│◦ Bot harus menjadi admin untuk bekerja*
*│◦ Untuk pengaturan lanjut hubungi owner*
*╰❒*

*© ${config.botName} • Admin Control Panel*
`;

        const templateButtons = [
            {
                index: 1,
                quickReplyButton: {
                    displayText: 'ᥫ᭡ ୨ৎ ִֶָ. ..𓂃 ࣪ ִֶָ🔗་༘࿐ Antilink',
                    id: `${config.prefix}antilink`
                }
            },
            {
                index: 2,
                quickReplyButton: {
                    displayText: 'ᥫ᭡ ୨ৎ ִֶָ. ..𓂃 ࣪ ִֶָ🤖་༘࿐ Antibot',
                    id: `${config.prefix}antibot`
                }
            },
            {
                index: 3,
                quickReplyButton: {
                    displayText: 'ᥫ᭡ ୨ৎ ִֶָ. ..𓂃 ࣪ ִֶָ👋་༘࿐ Welcome',
                    id: `${config.prefix}welcome`
                }
            }
        ];

        await sock.sendMessage(sender, {
            text: adminText,
            footer: `✨ ${config.botName} • Admin Management System`,
            templateButtons: templateButtons,
            headerType: 1
        });
    }
};
