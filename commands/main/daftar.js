const db = require('../../lib/database');
const config = require('../../config');

module.exports = {
    name: 'daftar',
    aliases: ['register', 'reg'],
    description: '𓂃 ࣪ ִֶָ𝗗𝗮𝗳𝘁𝗮𝗿 𝗕𝗼𝘁 𝗦𝗲𝗰𝘂𝗿𝗲',
    category: 'main',
    
    async execute(sock, message, args) {
        const sender = message.key?.remoteJid || message.from;
        const pushName = message.pushName || 'User';
        const isGroup = sender.endsWith('@g.us');
        const user = db.getUser(sender);

        // Jika di grup dan belum terdaftar
        if (isGroup) {
            if (!user) {
                const botJid = sock.user?.id?.split(':')[0] + '@s.whatsapp.net' || config.ownerNumber;
                const daftarLink = `https://wa.me/${botJid.split('@')[0]}?text=${encodeURIComponent('.daftar')}`;
                
                const msg = {
                    text: `*🦋་༘࿐ 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘀𝗶 𝗗𝗮𝗳𝘁𝗮𝗿*\n\n@${sender.split('@')[0]} *kamu belum terdaftar!*\n\nKlik tombol di bawah untuk mendaftar via chat pribadi.\n\n*Note:* Pendaftaran aman, nomor tidak akan ditampilkan ke publik.`,
                    mentions: [sender],
                    templateButtons: [
                        {
                            index: 1,
                            urlButton: {
                                displayText: 'ᥫ᭡ ୨ৎ ִֶָ. ..𓂃 ࣪ ִֶָ🦋་༘࿐ Daftar Sekarang',
                                url: daftarLink
                            }
                        },
                        {
                            index: 2,
                            quickReplyButton: {
                                displayText: 'ᥫ᭡ ୨ৎ ִֶָ. ..𓂃 ࣪ ִֶָℹ️་༘࿐ Info Bot',
                                id: `${config.prefix}info`
                            }
                        }
                    ]
                };
                
                return await sock.sendMessage(sender, msg);
            } else {
                return await sock.sendMessage(sender, {
                    text: `*✅ 𝗦𝘂𝗱𝗮𝗵 𝗧𝗲𝗿𝗱𝗮𝗳𝘁𝗮𝗿*\n\n@${sender.split('@')[0]} kamu sudah terdaftar sebagai *${user.name || pushName}*\n\n*Status:* ${user.premium ? '🌟 Premium User' : '✨ Regular User'}\n*Tanggal Daftar:* ${new Date(user.registeredAt).toLocaleDateString('id-ID')}`,
                    mentions: [sender]
                });
            }
        }

        // Jika di chat pribadi dan sudah terdaftar
        if (user) {
            return await sock.sendMessage(sender, {
                text: `*🦋་༘࿐ 𝗣𝗿𝗼𝗳𝗶𝗹 𝗨𝘀𝗲𝗿*\n\n╭─❒ 「 𓂃 ࣪ ִֶָ👤 𝗜𝗱𝗲𝗻𝘁𝗶𝘁𝗮𝘀 」\n│◦ *Nama:* ${user.name}\n│◦ *ID:* ***${user.number?.slice(-4) || '****'}**\n│◦ *Status:* ${user.premium ? '🌟 Premium' : '✨ Regular'}\n│◦ *Tanggal Daftar:* ${new Date(user.registeredAt).toLocaleDateString('id-ID')}\n╰❒\n\nKamu sudah terdaftar! Gunakan .menu untuk melihat fitur.`
            });
        }

        // Proses pendaftaran baru
        const name = args.join(' ') || pushName;
        const newUser = db.addUser(sender, {
            name: name,
            number: sender.split('@')[0].slice(-4) // Hanya simpan 4 digit terakhir
        });

        const successMsg = {
            text: `*🌸 𝗗𝗮𝗳𝘁𝗮𝗿 𝗕𝗲𝗿𝗵𝗮𝘀𝗶𝗹!*\n\n╭─❒ 「 𓂃 ࣪ ִֶָ🦋 𝗜𝗱𝗲𝗻𝘁𝗶𝘁𝗮𝘀 」\n│◦ *Nama:* ${name}\n│◦ *ID User:* ***${sender.split('@')[0].slice(-4)}**\n│◦ *Status:* ✅ Terdaftar\n│◦ *Tanggal:* ${new Date().toLocaleDateString('id-ID')}\n│◦ *Waktu:* ${new Date().toLocaleTimeString('id-ID')}\n╰❒\n\n*Selamat!* 🎉 Sekarang kamu bisa menggunakan semua fitur bot.\n\n*Fitur yang tersedia:*\n• Semua command user\n• Downloader (setelah premium)\n• AI Chat (setelah premium)\n• Dan masih banyak lagi!\n\nKetik *${config.prefix}menu* untuk melihat menu lengkap.`
        };

        await sock.sendMessage(sender, successMsg);
        
        // Notify owner about new registration
        if (config.ownerNumber) {
            try {
                await sock.sendMessage(config.ownerNumber + '@s.whatsapp.net', {
                    text: `*📝 𝗡𝗲𝘄 𝗨𝘀𝗲𝗿 𝗥𝗲𝗴𝗶𝘀𝘁𝗿𝗮𝘁𝗶𝗼𝗻*\n\n• Nama: ${name}\n• Nomor: ***${sender.split('@')[0].slice(-4)}**\n• Waktu: ${new Date().toLocaleString('id-ID')}\n• Total User: ${db.users.length}`
                });
            } catch (error) {
                console.log('Cannot notify owner:', error.message);
            }
        }
    }
};
