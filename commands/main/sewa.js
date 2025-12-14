const config = require('../../config');
const db = require('../../lib/database');

module.exports = {
    name: 'sewa',
    aliases: ['rent', 'premium', 'price'],
    description: '𓂃 ࣪ ִֶָ𝗠𝗲𝗻𝘂 𝗦𝗲𝘄𝗮 & 𝗣𝗿𝗲𝗺𝗶𝘂𝗺',
    category: 'main',
    
    async execute(sock, message, args) {
        const sender = message.key?.remoteJid || message.from;
        
        const sewaText = `
*╔═══════════════════════*
*║*  *🦋་༘࿐ 𝗦𝗘𝗪𝗔 & 𝗣𝗥𝗘𝗠𝗜𝗨𝗠*
*╚═══════════════════════*

*❏ 𝗣𝗮𝗸𝗲𝘁 𝗥𝗲𝗴𝘂𝗹𝗲𝗿:*
┌─❒ 「 1 Hari Trial 」
│◦ *Harga:* Rp 5.000
│◦ *Fitur:* All basic features
│◦ *Support:* Basic support
│◦ *Order:* .order trial
└❒

┌─❒ 「 7 Hari 」
│◦ *Harga:* Rp 25.000
│◦ *Bonus:* +2 hari extra
│◦ *Fitur:* Premium access
│◦ *Support:* Priority support
│◦ *Order:* .order 7hari
└❒

┌─❒ 「 30 Hari 」
│◦ *Harga:* Rp 80.000
│◦ *Bonus:* +10 hari extra
│◦ *Fitur:* Full premium
│◦ *Support:* 24/7 support
│◦ *Order:* .order 30hari
└❒

*❏ 𝗣𝗮𝗸𝗲𝘁 𝗩𝗜𝗣:*
┌─❒ 「 VIP 1 Bulan 」
│◦ *Harga:* Rp 150.000
│◦ *Fitur:* Custom command
│◦ *Support:* Private mentoring
│◦ *Bonus:* Custom menu
│◦ *Order:* .order vip1
└❒

┌─❒ 「 VIP 3 Bulan 」
│◦ *Harga:* Rp 400.000
│◦ *Fitur:* All VIP features
│◦ *Support:* Dedicated support
│◦ *Bonus:* Source code included
│◦ *Order:* .order vip3
└❒

┌─❒ 「 VIP Lifetime 」
│◦ *Harga:* Rp 800.000
│◦ *Fitur:* Unlimited access
│◦ *Support:* Lifetime support
│◦ *Bonus:* Full source code
│◦ *Order:* .order lifetime
└❒

*❏ 𝗣𝗮𝗸𝗲𝘁 𝗚𝗿𝗼𝘂𝗽:*
┌─❒ 「 Group Bot 」
│◦ *Harga:* Rp 100.000/bulan
│◦ *Fitur:* Bot khusus grup
│◦ *Include:* All group features
│◦ *Order:* .order group
└❒

┌─❒ 「 Custom Bot 」
│◦ *Harga:* Rp 300.000+
│◦ *Fitur:* Bot custom request
│◦ *Include:* Full customization
│◦ *Order:* .order custom
└❒

*❏ 𝗙𝗶𝘁𝘂𝗿 𝗣𝗿𝗲𝗺𝗶𝘂𝗺:*
✓ *Downloader:* YouTube, TikTok, Instagram, Facebook
✓ *AI Chat:* GPT-4, Gemini, Claude
✓ *Tools:* Sticker maker, Image editor
✓ *Entertainment:* Games, Quotes, Anime
✓ *Productivity:* Reminder, Notes, Calculator
✓ *No Ads:* Experience without ads
✓ *Priority Support:* Fast response

*╭─❒ 「 𓂃 ࣪ ִֶָ💳 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻 」*
*│◦ Transfer:* BCA, BRI, BNI, Mandiri
*│◦ E-Wallet:* Dana, OVO, GoPay, ShopeePay
*│◦ QRIS:* Ketik .qris untuk QR Code
*│◦ Konfirmasi:* .konfirm Nama#Bank#Nominal
*╰❒*

*╭─❒ 「 𓂃 ࣪ ִֶָ📞 𝗖𝗼𝗻𝘁𝗮𝗰𝘁 」*
*│◦ Owner:* @${config.ownerNumber.split('@')[0]}
*│◦ WhatsApp:* wa.me/${config.ownerNumber.split('@')[0]}
*│◦ Instagram:* @laysha.bot
*╰❒*

*📢 Note:*
• Harga sudah termasuk PPN
• Garansi uang kembali 7 hari
• Free setup untuk paket VIP
• Update gratis seumur hidup

*© ${config.botName} • Premium Services*
`;

        const templateButtons = [
            {
                index: 1,
                quickReplyButton: {
                    displayText: 'ᥫ᭡ ୨ৎ ִֶָ. ..𓂃 ࣪ ִֶָ💳་༘࿐ Payment',
                    id: `${config.prefix}payment`
                }
            },
            {
                index: 2,
                quickReplyButton: {
                    displayText: 'ᥫ᭡ ୨ৎ ִֶָ. ..𓂃 ࣪ ִֶָ🦋་༘࿐ Owner',
                    id: `${config.prefix}owner`
                }
            },
            {
                index: 3,
                quickReplyButton: {
                    displayText: 'ᥫ᭡ ୨ৎ ִֶָ. ..𓂃 ࣪ ִֶָ📋་༘࿐ Order',
                    id: `${config.prefix}order`
                }
            }
        ];

        await sock.sendMessage(sender, {
            text: sewaText,
            footer: `✨ ${config.botName} • Premium Bot Services`,
            templateButtons: templateButtons,
            headerType: 1,
            mentions: [config.ownerNumber]
        });
    }
};
