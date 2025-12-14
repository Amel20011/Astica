const fs = require('fs');
const path = require('path');
const config = require('../../config');

module.exports = {
    name: 'allmenu',
    aliases: ['helpall', 'commands', 'listcmd'],
    description: '𓂃 ࣪ ִֶָ𝗦𝗲𝗺𝘂𝗮 𝗖𝗼𝗺𝗺𝗮𝗻𝗱 𝗟𝗲𝗻𝗴𝗸𝗮𝗽',
    category: 'main',
    
    async execute(sock, message, args) {
        const sender = message.key?.remoteJid || message.from;
        
        // Kategori command
        const categories = {
            'main': '𓂃 ࣪ ִֶָ🦋 𝗠𝗮𝗶𝗻 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀',
            'owner': '𓂃 ࣪ ִֶָ👑 𝗢𝘄𝗻𝗲𝗿 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀',
            'group': '𓂃 ࣪ ִֶָ👥 𝗚𝗿𝗼𝘂𝗽 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀',
            'download': '𓂃 ࣪ ִֶָ⬇️ 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱𝗲𝗿',
            'tools': '𓂃 ࣪ ִֶָ🔧 𝗧𝗼𝗼𝗹𝘀',
            'fun': '𓂃 ࣪ ִֶָ🎮 𝗙𝘂𝗻 & 𝗚𝗮𝗺𝗲𝘀',
            'premium': '𓂃 ࣪ ִֶָ🌟 𝗣𝗿𝗲𝗺𝗶𝘂𝗺'
        };

        const allmenuText = `
*╔═══════════════════════*
*║*  *🦋་༘࿐ 𝗔𝗟𝗟 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦*
*╚═══════════════════════*

*❏ ${categories.main}:*
• ${config.prefix}menu - Menu utama
• ${config.prefix}daftar - Daftar bot
• ${config.prefix}profile - Profile user
• ${config.prefix}info - Info bot
• ${config.prefix}ping - Cek kecepatan
• ${config.prefix}status - Status server
• ${config.prefix}owner - Menu owner
• ${config.prefix}group - Menu grup
• ${config.prefix}admin - Menu admin
• ${config.prefix}user - Menu user
• ${config.prefix}sewa - Menu sewa
• ${config.prefix}payment - Menu payment
• ${config.prefix}allmenu - Semua command

*❏ ${categories.owner}:*
• ${config.prefix}self - Mode private
• ${config.prefix}public - Mode public
• ${config.prefix}setppbot - Set foto bot
• ${config.prefix}restart - Restart bot
• ${config.prefix}shutdown - Matikan bot
• ${config.prefix}backup - Backup data
• ${config.prefix}block - Blokir user
• ${config.prefix}unblock - Buka blokir
• ${config.prefix}bcall - Broadcast all
• ${config.prefix}bcgroup - Broadcast grup
• ${config.prefix}listuser - List user
• ${config.prefix}listgroup - List grup
• ${config.prefix}stats - Statistik
• ${config.prefix}eval - Execute code
• ${config.prefix}exec - Shell command

*❏ ${categories.group}:*
• ${config.prefix}antilink - Anti link
• ${config.prefix}antibot - Anti bot
• ${config.prefix}antispam - Anti spam
• ${config.prefix}welcome - Welcome msg
• ${config.prefix}goodbye - Goodbye msg
• ${config.prefix}add - Tambah member
• ${config.prefix}kick - Keluarkan member
• ${config.prefix}promote - Jadikan admin
• ${config.prefix}demote - Turunkan admin
• ${config.prefix}tagall - Tag semua
• ${config.prefix}hidetag - Tag tanpa notif
• ${config.prefix}mute - Mute grup
• ${config.prefix}unmute - Unmute grup
• ${config.prefix}setname - Ubah nama grup
• ${config.prefix}setdesc - Ubah deskripsi
• ${config.prefix}linkgroup - Dapatkan link
• ${config.prefix}revoke - Revoke link
• ${config.prefix}delete - Hapus pesan
• ${config.prefix}groupinfo - Info grup
• ${config.prefix}listadmin - List admin

*❏ ${categories.download}:*
• ${config.prefix}ytdl - Download YouTube
• ${config.prefix}ttdl - Download TikTok
• ${config.prefix}igdl - Download Instagram
• ${config.prefix}fbdl - Download Facebook
• ${config.prefix}twitterdl - Download Twitter
• ${config.prefix}spotifydl - Download Spotify
• ${config.prefix}gitclone - Clone GitHub
• ${config.prefix}mediafire - Download MF

*❏ ${categories.tools}:*
• ${config.prefix}sticker - Buat sticker
• ${config.prefix}toimage - Sticker to image
• ${config.prefix}stickertext - Sticker + text
• ${config.prefix}resize - Resize image
• ${config.prefix}getjid - Dapatkan JID
• ${config.prefix}translate - Terjemahkan
• ${config.prefix}shortlink - Pendekin link
• ${config.prefix}qrread - Baca QR code
• ${config.prefix}qrcreate - Buat QR code
• ${config.prefix}ocr - Baca teks gambar
• ${config.prefix}calc - Kalkulator
• ${config.prefix}weather - Cuaca

*❏ ${categories.fun}:*
• ${config.prefix}quotes - Quotes random
• ${config.prefix}joke - Joke lucu
• ${config.prefix}fact - Fakta menarik
• ${config.prefix}fortune - Ramalan
• ${config.prefix}horoscope - Zodiak
• ${config.prefix}truth - Truth game
• ${config.prefix}dare - Dare game
• ${config.prefix}slot - Slot machine
• ${config.prefix}casino - Casino game
• ${config.prefix}math - Game matematika
• ${config.prefix}tebakgambar - Tebak gambar
• ${config.prefix}susunkata - Susun kata

*❏ ${categories.premium}:*
• ${config.prefix}ai - AI Chat (GPT)
• ${config.prefix}gpt - ChatGPT 4
• ${config.prefix}gemini - Google Gemini
• ${config.prefix}claude - Anthropic Claude
• ${config.prefix}anime - Cari anime
• ${config.prefix}manga - Cari manga
• ${config.prefix}character - Karakter anime
• ${config.prefix}wallpaper - Wallpaper HD
• ${config.prefix}music - Download musik
• ${config.prefix}ringtone - Download ringtone
• ${config.prefix}pdfmerge - Merge PDF
• ${config.prefix}pdfsplit - Split PDF
• ${config.prefix}imageai - AI image tools
• ${config.prefix}videoai - AI video tools

*╭─❒ 「 𓂃 ࣪ ִֶָ📋 𝗣𝗲𝗻𝗴𝗴𝘂𝗻𝗮𝗮𝗻 」*
*│◦ Format: ${config.prefix}command [parameter]*
*│◦ Contoh: ${config.prefix}sticker (reply image)*
*│◦ Contoh: ${config.prefix}ytdl https://youtube.com*
*│◦ Contoh: ${config.prefix}ai Apa itu AI?*
*╰❒*

*╭─❒ 「 𓂃 ࣪ ִֶָℹ️ 𝗜𝗻𝗳𝗼 」*
*│◦ Total Command: ~100 commands*
*│◦ Bot Version: 2.0.0*
*│◦ Last Update: ${new Date().toLocaleDateString('id-ID')}*
*│◦ Support: @${config.ownerNumber.split('@')[0]}*
*╰❒*

*© ${config.botName} • Complete Command List*
`;

        const buttons = [
            {
                buttonId: `${config.prefix}menu`,
                buttonText: { displayText: 'ᥫ᭡ ୨ৎ ִֶָ. ..𓂃 ࣪ ִֶָ🌷་༘࿐ Menu Utama' },
                type: 1
            },
            {
                buttonId: `${config.prefix}sewa`,
                buttonText: { displayText: 'ᥫ᭡ ୨ৎ ִֶָ. ..𓂃 ࣪ ִֶָ🌟་༘࿐ Go Premium' },
                type: 1
            },
            {
                buttonId: `${config.prefix}owner`,
                buttonText: { displayText: 'ᥫ᭡ ୨ৎ ִֶָ. ..𓂃 ࣪ ִֶָ🦋་༘࿐ Contact Owner' },
                type: 1
            }
        ];

        await sock.sendMessage(sender, {
            text: allmenuText,
            footer: `✨ ${config.botName} • All Commands v2.0`,
            buttons: buttons,
            headerType: 1,
            mentions: [config.ownerNumber]
        });
    }
};
