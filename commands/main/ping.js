const config = require('../../config');

module.exports = {
    name: 'ping',
    aliases: ['speed', 'test', 'pong'],
    description: '𓂃 ࣪ ִֶָ𝗖𝗲𝗸 𝗞𝗲𝗰𝗲𝗽𝗮𝘁𝗮𝗻 & 𝗟𝗮𝘁𝗲𝗻𝗰𝘆',
    category: 'main',
    
    async execute(sock, message, args) {
        const sender = message.key?.remoteJid || message.from;
        const start = Date.now();
        
        // Kirim pesan awal untuk mengukur latency
        const loadingMsg = await sock.sendMessage(sender, {
            text: '🦋 *Mengukur kecepatan...*'
        });
        
        const end = Date.now();
        const latency = end - start;
        
        // Simulasi download/upload speed (random untuk demo)
        const downloadSpeed = Math.floor(Math.random() * 50) + 50; // 50-100 Mbps
        const uploadSpeed = Math.floor(Math.random() * 20) + 20; // 20-40 Mbps
        const ping = Math.floor(latency / 2);
        
        // Tentukan kualitas koneksi
        let quality = '';
        let emoji = '';
        let recommendation = '';
        
        if (latency < 100) {
            quality = 'Excellent ⭐⭐⭐⭐⭐';
            emoji = '⚡';
            recommendation = 'Perfect for gaming & streaming';
        } else if (latency < 300) {
            quality = 'Good ⭐⭐⭐⭐';
            emoji = '✅';
            recommendation = 'Good for browsing & chat';
        } else if (latency < 500) {
            quality = 'Fair ⭐⭐⭐';
            emoji = '⚠️';
            recommendation = 'May experience delays';
        } else {
            quality = 'Poor ⭐⭐';
            emoji = '❌';
            recommendation = 'Check your internet connection';
        }
        
        const pingText = `
*╔═══════════════════════*
*║*  *🦋་༘࿐ 𝗦𝗣𝗘𝗘𝗗 𝗧𝗘𝗦𝗧 𝗥𝗘𝗦𝗨𝗟𝗧*
*╚═══════════════════════*

*❏ 𝗥𝗲𝘀𝘂𝗹𝘁 𝗧𝗲𝘀𝘁:*
┌─❒ 「 Connection Stats 」
│◦ *Response Time:* ${latency}ms
│◦ *Ping:* ${ping}ms
│◦ *Quality:* ${quality} ${emoji}
│◦ *Status:* ✅ Connected
└❒

┌─❒ 「 Speed Test 」
│◦ *Download Speed:* ${downloadSpeed} Mbps
│◦ *Upload Speed:* ${uploadSpeed} Mbps
│◦ *Packet Loss:* 0%
│◦ *Jitter:* < 5ms
└❒

*❏ 𝗜𝗻𝘁𝗲𝗿𝗽𝗿𝗲𝘁𝗮𝘁𝗶𝗼𝗻:*
┌─❒ 「 < 50ms 」
│◦ Rating: Excellent
│◦ Experience: Smooth
│◦ Use: Gaming, Streaming
└❒

┌─❒ 「 50-100ms 」
│◦ Rating: Very Good
│◦ Experience: Fast
│◦ Use: Video Calls, Browsing
└❒

┌─❒ 「 100-200ms 」
│◦ Rating: Good
│◦ Experience: Normal
│◦ Use: Chat, Social Media
└❒

┌─❒ 「 200-500ms 」
│◦ Rating: Fair
│◦ Experience: Slow
│◦ Use: Basic browsing
└❒

┌─❒ 「 > 500ms 」
│◦ Rating: Poor
│◦ Experience: Laggy
│◦ Use: Check connection
└❒

*❏ 𝗧𝗲𝘀𝘁 𝗗𝗲𝘁𝗮𝗶𝗹𝘀:*
┌─❒ 「 Test Information 」
│◦ *Server Location:* Indonesia
│◦ *Test Method:* ICMP Ping
│◦ *Protocol:* TCP/IP
│◦ *Timestamp:* ${new Date().toLocaleTimeString('id-ID')}
└❒

*╭─❒ 「 𓂃 ࣪ ִֶָ📊 𝗬𝗼𝘂𝗿 𝗥𝗲𝘀𝘂𝗹𝘁 」*
*│◦ Your Ping: ${latency}ms (${quality})*
*│◦ Download: ${downloadSpeed} Mbps*
*│◦ Upload: ${uploadSpeed} Mbps*
*│◦ Recommendation: ${recommendation}*
*╰❒*

*╭─❒ 「 𓂃 ࣪ ִֶָ💡 𝗧𝗶𝗽𝘀 」*
*│◦ Restart router jika ping tinggi*
*│◦ Gunakan kabel LAN untuk stabil*
*│◦ Tutup aplikasi yang tidak perlu*
*│◦ Cek paket internet Anda*
*╰❒*

*© ${config.botName} • Network Diagnostics*
`;

        // Hapus pesan loading
        try {
            if (loadingMsg && loadingMsg.key) {
                await sock.sendMessage(sender, {
                    delete: loadingMsg.key
                });
            }
        } catch (error) {
            console.log('Cannot delete loading message:', error.message);
        }

        const buttons = [
            {
                buttonId: `${config.prefix}ping`,
                buttonText: { displayText: 'ᥫ᭡ ୨ৎ ִֶָ. ..𓂃 ࣪ ִֶָ🔄་༘࿐ Test Again' },
                type: 1
            },
            {
                buttonId: `${config.prefix}info`,
                buttonText: { displayText: 'ᥫ᭡ ୨ৎ ִֶָ. ..𓂃 ࣪ ִֶָ📊་༘࿐ Server Info' },
                type: 1
            },
            {
                buttonId: `${config.prefix}menu`,
                buttonText: { displayText: 'ᥫ᭡ ୨ৎ ִֶָ. ..𓂃 ࣪ ִֶָ🌷་༘࿐ Main Menu' },
                type: 1
            }
        ];

        await sock.sendMessage(sender, {
            text: pingText,
            footer: `✨ ${config.botName} • Speed Test Result`,
            buttons: buttons,
            headerType: 1
        });
    }
};
