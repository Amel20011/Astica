const config = require('../config');
const db = require('../lib/database');

// Store user message timestamps
const userMessages = new Map();
const spamWarnings = new Map();

module.exports = {
    name: 'antispam',
    description: 'Anti-spam protection',
    
    async execute(sock, message) {
        const { sender, from, isGroup, text } = message;
        
        if (!isGroup) return;
        
        const group = db.getGroup(from);
        if (!group || !group.settings?.antispam) return;
        
        const now = Date.now();
        const userKey = `${from}_${sender}`;
        
        // Initialize user data
        if (!userMessages.has(userKey)) {
            userMessages.set(userKey, {
                timestamps: [],
                lastMessage: now,
                warningCount: 0
            });
        }
        
        const userData = userMessages.get(userKey);
        userData.timestamps.push(now);
        
        // Keep only messages from last 10 seconds
        userData.timestamps = userData.timestamps.filter(time => now - time < 10000);
        
        // Check if user is spamming (more than 5 messages in 10 seconds)
        if (userData.timestamps.length > 5) {
            // Increment warning count
            userData.warningCount++;
            
            // Get warning data
            if (!spamWarnings.has(userKey)) {
                spamWarnings.set(userKey, {
                    count: 0,
                    lastWarned: 0
                });
            }
            
            const warnData = spamWarnings.get(userKey);
            
            // Check if we should warn (once per 30 seconds)
            if (now - warnData.lastWarned > 30000) {
                warnData.count++;
                warnData.lastWarned = now;
                
                const warnings = warnData.count;
                let action = '';
                
                if (warnings === 1) {
                    action = 'Peringatan pertama';
                } else if (warnings === 2) {
                    action = 'Peringatan kedua';
                } else if (warnings === 3) {
                    action = 'Peringatan terakhir';
                } else if (warnings >= 4) {
                    // Kick user after 4 warnings
                    try {
                        await sock.groupParticipantsUpdate(from, [sender], 'remove');
                        action = 'DIKELUARKAN dari grup';
                        spamWarnings.delete(userKey);
                        userMessages.delete(userKey);
                    } catch (error) {
                        action = 'Gagal dikeluarkan (bot bukan admin)';
                    }
                }
                
                // Send warning message
                const warnText = `
*⚠️ 𝗔𝗡𝗧𝗜-𝗦𝗣𝗔𝗠 𝗪𝗔𝗥𝗡𝗜𝗡𝗚*

@${sender.split('@')[0]} terdeteksi spam!
${action}

*Detail:*
• Pesan: ${userData.timestamps.length}/5 pesan dalam 10 detik
• Peringatan: ${warnings}/3
• Aksi: ${action}

*Silahkan kurangi aktivitas mengirim pesan.*
                `;
                
                await sock.sendMessage(from, {
                    text: warnText,
                    mentions: [sender]
                });
                
                // Reset timestamps after warning
                userData.timestamps = [];
            }
        }
        
        // Cleanup old data (older than 1 minute)
        if (now - userData.lastMessage > 60000) {
            userMessages.delete(userKey);
            spamWarnings.delete(userKey);
        }
        
        userData.lastMessage = now;
    }
};
