const config = require('../../config');
const db = require('../../lib/database');

module.exports = {
    name: 'user',
    aliases: ['usermenu', 'my', 'profile'],
    description: '𓂃 ࣪ ִֶָ𝗠𝗲𝗻𝘂 𝗨𝘀𝗲𝗿 & 𝗣𝗿𝗼𝗳𝗶𝗹',
    category: 'main',
    
    async execute(sock, message, args) {
        const sender = message.key?.remoteJid || message.from;
        const pushName = message.pushName || 'User';
        const user = db.getUser(sender);
        
        const userText = `
*╔═══════════════════════*
*║*  *🦋་༘࿐ 𝗨𝗦𝗘𝗥 𝗠𝗘𝗡𝗨 & 𝗣𝗥𝗢𝗙𝗜𝗟𝗘*
*╚═══════════════════════*

*❏ 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘀𝗶 𝗨𝘀𝗲𝗿:*
┌─❒ 「 My Profile 」
│◦ *Command:* .profile
│◦ *Desc:* Lihat profil kamu
│◦ *Access:* All users
│◦ *Note:* Tampilkan data user
└❒

┌─❒ 「 Check Premium 」
│◦ *Command:* .cekpremium
│◦ *Desc:* Cek status premium
│◦ *Access:* All users
│◦ *Note:* Cek masa aktif premium
└❒

┌─❒ 「 All Commands 」
│◦ *Command:* .allmenu
│◦ *Desc:* Semua command bot
│◦ *Access:* All users
│◦ *Note:* Complete command list
└❒

┌─❒ 「 Bot Info 」
│◦ *Command:* .info
│◦ *Desc:* Info tentang bot
│◦ *Access:* All users
│◦ *Note:* Bot information
└❒

*❏ 𝗠𝗲𝗱𝗶𝗮 𝗧𝗼𝗼𝗹𝘀:*
┌─❒ 「 Sticker Maker 」
│◦ *Command:* .sticker
│◦ *Desc:* Buat sticker dari gambar
│◦ *Access:* All users
│◦ *Note:* Reply image with .sticker
└❒

┌─❒ 「 Sticker to Image 」
│◦ *Command:* .toimage
│◦ *Desc:* Konversi sticker ke gambar
│◦ *Access:* All users
│◦ *Note:* Reply sticker with .toimage
└❒

┌─❒ 「 Sticker with Text 」
│◦ *Command:* .stickertext [text]
│◦ *Desc:* Sticker dengan teks
│◦ *Access:* All users
│◦ *Note:* .stickertext Hello
└❒

┌─❒ 「 Resize Image 」
│◦ *Command:* .resize [percentage]
│◦ *Desc:* Ubah ukuran gambar
│◦ *Access:* All users
│◦ *Note:* .resize 50 (50%)
└❒

*❏ 𝗨𝘁𝗶𝗹𝗶𝘁𝗶𝗲𝘀:*
┌─❒ 「 Ping Test 」
│◦ *Command:* .ping
│◦ *Desc:* Cek kecepatan bot
│◦ *Access:* All users
│◦ *Note:* Bot response time
└❒

┌─❒ 「 Server Status 」
│◦ *Command:* .status
│◦ *Desc:* Cek status server
│◦ *Access:* All users
│◦ *Note:* Bot uptime & stats
└❒

┌─❒ 「 Get JID 」
│◦ *Command:* .getjid
│◦ *Desc:* Dapatkan JID user
│◦ *Access:* All users
│◦ *Note:* Useful for admin
└❒

┌─❒ 「 Random Quotes 」
│◦ *Command:* .quotes
│◦ *Desc:* Dapatkan quotes random
│◦ *Access:* All users
│◦ *Note:* Motivational quotes
└❒

*❏ 𝗙𝘂𝗻 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀:*
┌─❒ 「 Fortune Cookie 」
│◦ *Command:* .fortune
│◦ *Desc:* Ramalan hari ini
│◦ *Access:* All users
│◦ *Note:* Random fortune
└❒

┌─❒ 「 Random Joke 」
│◦ *Command:* .joke
│◦ *Desc:* Dapatkan joke lucu
│◦ *Access:* All users
│◦ *Note:* Indonesian jokes
└❒

┌─❒ 「 Fact of the Day 」
│◦ *Command:* .fact
│◦ *Desc:* Fakta menarik
│◦ *Access:* All users
│◦ *Note:* Interesting facts
└❒

┌─❒ 「 Horoscope 」
│◦ *Command:* .horoscope [zodiak]
│◦ *Desc:* Ramalan zodiak
│◦ *Access:* All users
│◦ *Note:* .horoscope aries
└❒

*❏ 𝗣𝗿𝗲𝗺𝗶𝘂𝗺 𝗙𝗲𝗮𝘁𝘂𝗿𝗲𝘀:*
✓ *AI Chat:* ChatGPT, Gemini, Claude
✓ *Downloader:* YT, TikTok, IG, FB
✓ *Anime Search:* Info & download
✓ *Music Download:* Spotify, SoundCloud
✓ *PDF Tools:* Convert & edit PDF
✓ *Image Editor:* Advanced editing
✓ *Video Editor:* Cut, merge, convert
✓ *No Limits:* Unlimited requests
✓ *Priority Support:* Fast response

*╭─❒ 「 𓂃 ࣪ ִֶָ📊 𝗬𝗼𝘂𝗿 𝗦𝘁𝗮𝘁𝘂𝘀 」*
*│◦ Nama:* ${user?.name || pushName}
*│◦ Status:* ${user ? '✅ Terdaftar' : '❌ Belum Daftar'}
*│◦ Premium:* ${user?.premium ? '🌟 Aktif' : '✨ Regular'}
*│◦ Expired:* ${user?.premiumExpired ? new Date(user.premiumExpired).toLocaleDateString('id-ID') : '-'}
*│◦ Registered:* ${user?.registeredAt ? new Date(user.registeredAt).toLocaleDateString('id-ID') : '-'}
*╰❒*

*© ${config.botName} • User Commands & Profile*
`;

        const buttons = [
            {
                buttonId: `${config.prefix}profile`,
                buttonText: { displayText: 'ᥫ᭡ ୨ৎ ִֶָ. ..𓂃 ࣪ ִֶָ👤་༘࿐ My Profile' },
                type: 1
            },
            {
                buttonId: `${config.prefix}daftar`,
                buttonText: { displayText: 'ᥫ᭡ ୨ৎ ִֶָ. ..𓂃 ࣪ ִֶָ📝་༘࿐ Register' },
                type: 1
            },
            {
                buttonId: `${config.prefix}sewa`,
                buttonText: { displayText: 'ᥫ᭡ ୨ৎ ִֶָ. ..𓂃 ࣪ ִֶָ🌟་༘࿐ Go Premium' },
                type: 1
            }
        ];

        await sock.sendMessage(sender, {
            text: userText,
            footer: `✨ ${config.botName} • User Dashboard`,
            buttons: buttons,
            headerType: 1
        });
    }
};
