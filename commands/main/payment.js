const config = require('../../config');

module.exports = {
    name: 'payment',
    aliases: ['pay', 'donasi', 'donate', 'pembayaran'],
    description: '𓂃 ࣪ ִֶָ𝗠𝗲𝗻𝘂 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻 & 𝗗𝗼𝗻𝗮𝘀𝗶',
    category: 'main',
    
    async execute(sock, message, args) {
        const sender = message.key?.remoteJid || message.from;
        
        const paymentText = `
*╔═══════════════════════*
*║*  *🦋་༘࿐ 𝗣𝗔𝗬𝗠𝗘𝗡𝗧 & 𝗗𝗢𝗡𝗔𝗧𝗜𝗢𝗡*
*╚═══════════════════════*

*❏ 𝗥𝗲𝗸𝗲𝗻𝗶𝗻𝗴 𝗕𝗮𝗻𝗸:*
┌─❒ 「 BCA - LAYSHA BOT 」
│◦ *No Rek:* 1234-5678-9012
│◦ *A/N:* LAYSHA BOT
│◦ *Bank:* Bank Central Asia
└❒

┌─❒ 「 BRI - LAYSHA BOT 」
│◦ *No Rek:* 0987-6543-2109
│◦ *A/N:* LAYSHA BOT
│◦ *Bank:* Bank Rakyat Indonesia
└❒

┌─❒ 「 BNI - LAYSHA BOT 」
│◦ *No Rek:* 5678-9012-3456
│◦ *A/N:* LAYSHA BOT
│◦ *Bank:* Bank Negara Indonesia
└❒

┌─❒ 「 Mandiri - LAYSHA BOT 」
│◦ *No Rek:* 9012-3456-7890
│◦ *A/N:* LAYSHA BOT
│◦ *Bank:* Bank Mandiri
└❒

*❏ 𝗘-𝗪𝗮𝗹𝗹𝗲𝘁:*
┌─❒ 「 Dana 」
│◦ *No:* 0812-3456-7890
│◦ *A/N:* Laysha
│◦ *QRIS:* .qris
└❒

┌─❒ 「 OVO 」
│◦ *No:* 0812-3456-7890
│◦ *A/N:* Laysha
│◦ *QRIS:* .qris
└❒

┌─❒ 「 GoPay 」
│◦ *No:* 0812-3456-7890
│◦ *A/N:* Laysha
│◦ *QRIS:* .qris
└❒

┌─❒ 「 ShopeePay 」
│◦ *No:* 0812-3456-7890
│◦ *A/N:* Laysha
│◦ *QRIS:* .qris
└❒

*❏ 𝗗𝗼𝗻𝗮𝘀𝗶 𝗩𝗶𝗮:*
┌─❒ 「 Saweria 」
│◦ *Link:* saweria.co/layshabot
│◦ *Min:* Rp 5.000
│◦ *Bonus:* Thank you message
└❒

┌─❒ 「 Trakteer 」
│◦ *Link:* trakteer.id/layshabot
│◦ *Min:* Rp 10.000
│◦ *Bonus:* Premium 1 hari
└❒

┌─❒ 「 Sociabuzz 」
│◦ *Link:* sociabuzz.com/laysha
│◦ *Min:* Rp 15.000
│◦ *Bonus:* Premium 3 hari
└❒

*╭─❒ 「 𓂃 ࣪ ִֶָ📋 𝗜𝗻𝘀𝘁𝗿𝘂𝗸𝘀𝗶 」*
*│◦ 1. Transfer sesuai nominal*
*│◦ 2. Screenshoot bukti transfer*
*│◦ 3. Kirim ke owner dengan format:*
*│    .konfirm Nama#Bank#Nominal*
*│◦ 4. Tunggu konfirmasi dari owner*
*│◦ 5. Status cek: .status 628xxx*
*╰❒*

*╭─❒ 「 𓂃 ࣪ ִֶָ⚠️ 𝗣𝗲𝗿𝗶𝗻𝗴𝗮𝘁𝗮𝗻 」*
*│◦ Jangan lupa konfirmasi setelah bayar*
*│◦ Simpan bukti transfer*
*│◦ Hati-hati penipuan!*
*│◦ Hanya gunakan rekening resmi*
*╰❒*

*📞 Customer Service 24/7:*
@${config.ownerNumber.split('@')[0]}

*© ${config.botName} • Payment Gateway*
`;

        const buttons = [
            {
                buttonId: `${config.prefix}qris`,
                buttonText: { displayText: 'ᥫ᭡ ୨ৎ ִֶָ. ..𓂃 ࣪ ִֶָ💳་༘࿐ QRIS' },
                type: 1
            },
            {
                buttonId: `${config.prefix}konfirm`,
                buttonText: { displayText: 'ᥫ᭡ ୨ৎ ִֶָ. ..𓂃 ࣪ ִֶָ📝་༘࿐ Konfirmasi' },
                type: 1
            },
            {
                buttonId: `${config.prefix}owner`,
                buttonText: { displayText: 'ᥫ᭡ ୨ৎ ִֶָ. ..𓂃 ࣪ ִֶָ🦋་༘࿐ CS 24/7' },
                type: 1
            }
        ];

        await sock.sendMessage(sender, {
            text: paymentText,
            footer: `✨ ${config.botName} • Secure Payment System`,
            buttons: buttons,
            headerType: 1,
            mentions: [config.ownerNumber]
        });
    }
};
