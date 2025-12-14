const config = require('../../config');

module.exports = {
    name: 'group',
    aliases: ['grup', 'grouptools', 'groupmenu'],
    description: '𓂃 ࣪ ִֶָ𝗠𝗲𝗻𝘂 𝗠𝗮𝗻𝗮𝗷𝗲𝗺𝗲𝗻 𝗚𝗿𝘂𝗽',
    category: 'main',
    
    async execute(sock, message, args) {
        const sender = message.key?.remoteJid || message.from;
        const isGroup = sender.endsWith('@g.us');
        
        if (!isGroup) {
            return await sock.sendMessage(sender, {
                text: '*❌ 𝗘𝗿𝗿𝗼𝗿!*\n\nCommand ini hanya bisa digunakan di dalam grup!\n\nPindah ke grup yang ingin dikelola atau gunakan command lain.'
            });
        }

        const groupText = `
*╔═══════════════════════*
*║*  *🦋་༘࿐ 𝗚𝗥𝗢𝗨𝗣 𝗠𝗔𝗡𝗔𝗚𝗘𝗠𝗘𝗡𝗧*
*╚═══════════════════════*

*❏ 𝗠𝗲𝗺𝗯𝗲𝗿 𝗠𝗮𝗻𝗮𝗴𝗲𝗺𝗲𝗻𝘁:*
┌─❒ 「 Add Member 」
│◦ *Command:* .add 628xxx
│◦ *Desc:* Tambah member ke grup
│◦ *Permission:* Admin only
│◦ *Example:* .add 6281234567890
└❒

┌─❒ 「 Kick Member 」
│◦ *Command:* .kick @tag
│◦ *Desc:* Keluarkan member
│◦ *Permission:* Admin only
│◦ *Example:* .kick @user
└❒

┌─❒ 「 Promote Admin 」
│◦ *Command:* .promote @tag
│◦ *Desc:* Jadikan admin
│◦ *Permission:* Admin only
│◦ *Example:* .promote @user
└❒

┌─❒ 「 Demote Admin 」
│◦ *Command:* .demote @tag
│◦ *Desc:* Turunkan dari admin
│◦ *Permission:* Admin only
│◦ *Example:* .demote @user
└❒

*❏ 𝗚𝗿𝗼𝘂𝗽 𝗦𝗲𝘁𝘁𝗶𝗻𝗴𝘀:*
┌─❒ 「 Set Name 」
│◦ *Command:* .setname NamaBaru
│◦ *Desc:* Ubah nama grup
│◦ *Permission:* Admin only
│◦ *Example:* .setname Group Official
└❒

┌─❒ 「 Set Description 」
│◦ *Command:* .setdesc Deskripsi
│◦ *Desc:* Ubah deskripsi grup
│◦ *Permission:* Admin only
│◦ *Example:* .setdesc Ini group official
└❒

┌─❒ 「 Get Link 」
│◦ *Command:* .linkgroup
│◦ *Desc:* Dapatkan link grup
│◦ *Permission:* Admin only
│◦ *Example:* .linkgroup
└❒

┌─❒ 「 Revoke Link 」
│◦ *Command:* .revoke
│◦ *Desc:* Buat link baru
│◦ *Permission:* Admin only
│◦ *Example:* .revoke
└❒

*❏ 𝗠𝗲𝘀𝘀𝗮𝗴𝗲 𝗧𝗼𝗼𝗹𝘀:*
┌─❒ 「 Tag All Members 」
│◦ *Command:* .tagall
│◦ *Desc:* Mention semua member
│◦ *Permission:* Admin only
│◦ *Example:* .tagall Meeting penting!
└❒

┌─❒ 「 Hide Tag 」
│◦ *Command:* .hidetag Pesan
│◦ *Desc:* Tag tanpa notifikasi
│◦ *Permission:* Admin only
│◦ *Example:* .hidetag Info penting
└❒

┌─❒ 「 Mute Group 」
│◦ *Command:* .mute
│◦ *Desc:* Matikan grup (mute)
│◦ *Permission:* Admin only
│◦ *Example:* .mute
└❒

┌─❒ 「 Unmute Group 」
│◦ *Command:* .unmute
│◦ *Desc:* Hidupkan grup
│◦ *Permission:* Admin only
│◦ *Example:* .unmute
└❒

*❏ 𝗦𝗲𝗰𝘂𝗿𝗶𝘁𝘆:*
┌─❒ 「 Anti Link 」
│◦ *Command:* .antilink [on/off]
│◦ *Desc:* Blokir link dari member
│◦ *Permission:* Admin only
│◦ *Example:* .antilink on
└❒

┌─❒ 「 Anti Bot 」
│◦ *Command:* .antibot [on/off]
│◦ *Desc:* Blokir bot masuk
│◦ *Permission:* Admin only
│◦ *Example:* .antibot on
└❒

┌─❒ 「 Delete Message 」
│◦ *Command:* .delete (reply)
│◦ *Desc:* Hapus pesan yang di reply
│◦ *Permission:* Admin only
│◦ *Example:* Reply .delete
└❒

*❏ 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻:*
┌─❒ 「 Group Info 」
│◦ *Command:* .groupinfo
│◦ *Desc:* Info detail grup
│◦ *Permission:* All members
│◦ *Example:* .groupinfo
└❒

┌─❒ 「 List Admin 」
│◦ *Command:* .listadmin
│◦ *Desc:* Daftar admin grup
│◦ *Permission:* All members
│◦ *Example:* .listadmin
└❒

┌─❒ 「 My Role 」
│◦ *Command:* .myrole
│◦ *Desc:* Cek role kamu
│◦ *Permission:* All members
│◦ *Example:* .myrole
└❒

*╭─❒ 「 𓂃 ࣪ ִֶָ📋 𝗡𝗼𝘁𝗲𝘀 」*
*│◦ [admin] = Hanya admin grup*
*│◦ [all] = Semua member grup*
*│◦ @tag = Reply atau mention*
*│◦ Contoh benar: .promote @user*
*╰❒*

*© ${config.botName} • Group Management Tools*
`;

        const buttons = [
            {
                buttonId: `${config.prefix}antilink`,
                buttonText: { displayText: 'ᥫ᭡ ୨ৎ ִֶָ. ..𓂃 ࣪ ִֶָ🔗་༘࿐ Antilink' },
                type: 1
            },
            {
                buttonId: `${config.prefix}tagall`,
                buttonText: { displayText: 'ᥫ᭡ ୨ৎ ִֶָ. ..𓂃 ࣪ ִֶָ📍་༘࿐ Tagall' },
                type: 1
            },
            {
                buttonId: `${config.prefix}menu`,
                buttonText: { displayText: 'ᥫ᭡ ୨ৎ ִֶָ. ..𓂃 ࣪ ִֶָ🌷་༘࿐ Menu Utama' },
                type: 1
            }
        ];

        await sock.sendMessage(sender, {
            text: groupText,
            footer: `✨ ${config.botName} • Group Management System`,
            buttons: buttons,
            headerType: 1
        });
    }
};
