const config = require('../../config');
const db = require('../../lib/database');

module.exports = {
    name: 'menu',
    aliases: ['help', 'start'],
    description: '𓂃 ࣪ ִֶָ𝗠𝗲𝗻𝘂 𝗨𝘁𝗮𝗺𝗮 𝗔𝗲𝘀𝘁𝗵𝗲𝘁𝗶𝗰',
    category: 'main',
    
    async execute(sock, message, args) {
        const sender = message.key?.remoteJid || message.from;
        const pushName = message.pushName || 'User';
        const isOwner = sender.includes(config.ownerNumber);
        const isGroup = sender.endsWith('@g.us');
        const user = db.getUser(sender);
        
        const menuText = `
*╔═══════════════════════*
*║*  *🦋་༘࿐ 𝒍𝒂𝒚𝒔𝒉𝒂 ᥫ᭡. 🌷💗🌹☘️*
*║*  *𝗕𝗢𝗧 𝗔𝗘𝗦𝗧𝗛𝗘𝗧𝗜𝗖*
*╚═══════════════════════*

*❏ Prefix:* 「 ${config.prefix} 」
*❏ Owner:* @${config.ownerNumber.split('@')[0]}
*❏ User:* ${pushName}
*❏ Status:* ${user ? '✅ Terdaftar' : '❌ Belum Daftar'}
*❏ Tanggal:* ${new Date().toLocaleDateString('id-ID')}

*╭─❒ 「 𓂃 ࣪ ִֶָ🦋་༘࿐ 𝗢𝘄𝗻𝗲𝗿 」*
*│◦ ${config.prefix}owner*
*│◦ ${config.prefix}self*
*│◦ ${config.prefix}public*
*│◦ ${config.prefix}setppbot*
*│◦ ${config.prefix}restart*
*╰❒*

*╭─❒ 「 𓂃 ࣪ ִֶָ🌷 𝗚𝗿𝗼𝘂𝗽 」*
*│◦ ${config.prefix}antilink*
*│◦ ${config.prefix}add*
*│◦ ${config.prefix}kick*
*│◦ ${config.prefix}promote*
*│◦ ${config.prefix}demote*
*│◦ ${config.prefix}tagall*
*│◦ ${config.prefix}hidetag*
*│◦ ${config.prefix}setname*
*╰❒*

*╭─❒ 「 𓂃 ࣪ ִֶָ🌹 𝗔𝗱𝗺𝗶𝗻 」*
*│◦ ${config.prefix}mute*
*│◦ ${config.prefix}unmute*
*│◦ ${config.prefix}setdesc*
*│◦ ${config.prefix}linkgroup*
*│◦ ${config.prefix}revoke*
*│◦ ${config.prefix}delete*
*│◦ ${config.prefix}antibot*
*╰❒*

*╭─❒ 「 𓂃 ࣪ ִֶָ☘️ 𝗨𝘀𝗲𝗿 」*
*│◦ ${config.prefix}ping*
*│◦ ${config.prefix}info*
*│◦ ${config.prefix}allmenu*
*│◦ ${config.prefix}profile*
*│◦ ${config.prefix}daftar*
*│◦ ${config.prefix}sticker*
*│◦ ${config.prefix}toimage*
*╰❒*

*╭─❒ 「 𓂃 ࣪ ִֶָ💳 𝗣𝗮𝘆𝗺𝗲𝗻𝘁 」*
*│◦ ${config.prefix}payment*
*│◦ ${config.prefix}qris*
*│◦ ${config.prefix}transfer*
*│◦ ${config.prefix}konfirm*
*│◦ ${config.prefix}status*
*╰❒*

*╭─❒ 「 𓂃 ࣪ ִֶָ📦 𝗦𝗲𝘄𝗮 」*
*│◦ ${config.prefix}sewa*
*│◦ ${config.prefix}price*
*│◦ ${config.prefix}premium*
*│◦ ${config.prefix}cekpremium*
*│◦ ${config.prefix}upgrade*
*╰❒*

*╭─❒ 「 𓂃 ࣪ ִֶָ🌟 𝗣𝗿𝗲𝗺𝗶𝘂𝗺 」*
*│◦ ${config.prefix}ai*
*│◦ ${config.prefix}ytdl*
*│◦ ${config.prefix}ttdl*
*│◦ ${config.prefix}igdl*
*│◦ ${config.prefix}anime*
*╰❒*

*© ${config.botName} • ${new Date().getFullYear()}*
`;

        const buttons = [
            {
                buttonId: `${config.prefix}owner`,
                buttonText: { displayText: 'ᥫ᭡ ୨ৎ ִֶָ. ..𓂃 ࣪ ִֶָ🦋་༘࿐ Owner' },
                type: 1
            },
            {
                buttonId: `${config.prefix}daftar`,
                buttonText: { displayText: 'ᥫ᭡ ୨ৎ ִֶָ. ..𓂃 ࣪ ִֶָ🌷་༘࿐ Daftar' },
                type: 1
            },
            {
                buttonId: `${config.prefix}sewa`,
                buttonText: { displayText: 'ᥫ᭡ ୨ৎ ִֶָ. ..𓂃 ࣪ ִֶָ💗་༘࿐ Sewa' },
                type: 1
            }
        ];

        const templateButtons = [
            {
                index: 1,
                urlButton: {
                    displayText: '🌷 Instagram',
                    url: 'https://instagram.com/laysha.bot'
                }
            },
            {
                index: 2,
                callButton: {
                    displayText: '📞 Call Owner',
                    phoneNumber: config.ownerNumber
                }
            },
            {
                index: 3,
                quickReplyButton: {
                    displayText: '🦋 Speed Test',
                    id: `${config.prefix}ping`
                }
            }
        ];

        try {
            await sock.sendMessage(sender, {
                text: menuText,
                footer: `✨ ${config.botName} • Aesthetic Bot`,
                templateButtons: templateButtons,
                headerType: 1,
                mentions: [config.ownerNumber]
            });
        } catch (error) {
            console.error('Error sending menu:', error);
            await sock.sendMessage(sender, {
                text: '❌ Terjadi error saat menampilkan menu. Silakan coba lagi.'
            });
        }
    }
};
