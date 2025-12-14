const config = {
    // Session Configuration
    sessionName: 'session-aesthetic',
    sessionPath: './session',
    
    // Bot Configuration
    prefix: '.',
    botName: 'Laysha Bot',
    botOwner: 'Pemilik',
    
    // Owner Information
    ownerNumber: '6281234567890', // Ganti dengan nomor kamu
    ownerName: 'Laysha',
    
    // Database Configuration
    database: {
        users: './database/users.json',
        groups: './database/groups.json',
        premium: './database/premium.json'
    },
    
    // Payment Information (ganti dengan data kamu)
    payment: {
        bca: '1234567890',
        bri: '0987654321',
        dana: '081234567890',
        ovo: '081234567890',
        gopay: '081234567890'
    },
    
    // Bot Settings
    autoRead: true,
    autoTyping: false,
    autoRecording: false,
    
    // Baileys Configuration
    baileys: {
        version: [2, 2413, 1],
        printQRInTerminal: true,
        auth: {
            creds: {},
            keys: {}
        },
        markOnlineOnConnect: true,
        generateHighQualityLinkPreview: true,
        defaultQueryTimeoutMs: 60000
    }
};

module.exports = config;
