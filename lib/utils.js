const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');
const config = require('../config');

class Utils {
    constructor() {
        this.logsPath = path.join(__dirname, '../logs');
        this.ensureDirectories();
    }

    ensureDirectories() {
        const dirs = [
            this.logsPath,
            path.join(__dirname, '../session'),
            path.join(__dirname, '../database')
        ];
        
        dirs.forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.ensureDirSync(dir);
                console.log(`📁 Created directory: ${dir}`);
            }
        });
    }

    // Format date to Indonesian format
    formatDate(date = new Date()) {
        return date.toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }

    // Format time duration
    formatDuration(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        if (days > 0) return `${days} hari ${hours % 24} jam`;
        if (hours > 0) return `${hours} jam ${minutes % 60} menit`;
        if (minutes > 0) return `${minutes} menit ${seconds % 60} detik`;
        return `${seconds} detik`;
    }

    // Generate random string
    generateId(length = 8) {
        return crypto.randomBytes(Math.ceil(length / 2))
            .toString('hex')
            .slice(0, length)
            .toUpperCase();
    }

    // Format number with commas
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    // Format currency
    formatCurrency(amount) {
        return `Rp ${this.formatNumber(amount)}`;
    }

    // Validate phone number
    validatePhoneNumber(number) {
        const regex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
        return regex.test(number);
    }

    // Parse phone number to standard format
    parsePhoneNumber(number) {
        let num = number.replace(/\D/g, '');
        
        if (num.startsWith('0')) {
            num = '62' + num.slice(1);
        } else if (num.startsWith('8')) {
            num = '62' + num;
        } else if (!num.startsWith('62')) {
            num = '62' + num;
        }
        
        return num;
    }

    // Extract JID from text
    extractJid(text) {
        const regex = /(\d+@s\.whatsapp\.net)/;
        const match = text.match(regex);
        return match ? match[1] : null;
    }

    // Create log file
    async log(type, message) {
        const date = new Date();
        const dateStr = date.toISOString().split('T')[0];
        const timeStr = date.toTimeString().split(' ')[0];
        const logFile = path.join(this.logsPath, `${dateStr}.log`);
        
        const logMessage = `[${timeStr}] [${type.toUpperCase()}] ${message}\n`;
        
        try {
            await fs.appendFile(logFile, logMessage);
        } catch (error) {
            console.error('❌ Error writing log:', error);
        }
    }

    // Error logger
    error(error, context = '') {
        const errorMessage = context ? `${context}: ${error.message}` : error.message;
        console.error('❌', errorMessage);
        this.log('error', errorMessage);
        
        if (error.stack) {
            this.log('error', error.stack);
        }
    }

    // Info logger
    info(message) {
        console.log('ℹ️', message);
        this.log('info', message);
    }

    // Success logger
    success(message) {
        console.log('✅', message);
        this.log('success', message);
    }

    // Warning logger
    warn(message) {
        console.log('⚠️', message);
        this.log('warning', message);
    }

    // Check if file exists
    async fileExists(filePath) {
        try {
            await fs.access(filePath);
            return true;
        } catch {
            return false;
        }
    }

    // Read JSON file
    async readJson(filePath) {
        try {
            const data = await fs.readFile(filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            this.error(error, `readJson: ${filePath}`);
            return null;
        }
    }

    // Write JSON file
    async writeJson(filePath, data) {
        try {
            await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
            return true;
        } catch (error) {
            this.error(error, `writeJson: ${filePath}`);
            return false;
        }
    }

    // Generate progress bar
    progressBar(current, total, length = 20) {
        const percentage = current / total;
        const filledLength = Math.round(length * percentage);
        const emptyLength = length - filledLength;
        
        const filledBar = '█'.repeat(filledLength);
        const emptyBar = '░'.repeat(emptyLength);
        
        return `[${filledBar}${emptyBar}] ${Math.round(percentage * 100)}%`;
    }

    // Delay function
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Format text with colors (for terminal)
    color(text, color) {
        const colors = {
            reset: '\x1b[0m',
            bright: '\x1b[1m',
            dim: '\x1b[2m',
            underscore: '\x1b[4m',
            blink: '\x1b[5m',
            reverse: '\x1b[7m',
            hidden: '\x1b[8m',
            
            black: '\x1b[30m',
            red: '\x1b[31m',
            green: '\x1b[32m',
            yellow: '\x1b[33m',
            blue: '\x1b[34m',
            magenta: '\x1b[35m',
            cyan: '\x1b[36m',
            white: '\x1b[37m',
            
            bgBlack: '\x1b[40m',
            bgRed: '\x1b[41m',
            bgGreen: '\x1b[42m',
            bgYellow: '\x1b[43m',
            bgBlue: '\x1b[44m',
            bgMagenta: '\x1b[45m',
            bgCyan: '\x1b[46m',
            bgWhite: '\x1b[47m'
        };
        
        return `${colors[color] || colors.reset}${text}${colors.reset}`;
    }

    // Get bot uptime
    getUptime(startTime) {
        const uptime = Date.now() - startTime;
        return this.formatDuration(uptime);
    }

    // Validate email
    validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Shuffle array
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // Get random element from array
    getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    // Generate random number between min and max
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Truncate text
    truncate(text, length = 100) {
        if (text.length <= length) return text;
        return text.slice(0, length - 3) + '...';
    }

    // Check if text contains URL
    containsUrl(text) {
        const regex = /https?:\/\/[^\s]+/gi;
        return regex.test(text);
    }

    // Extract URLs from text
    extractUrls(text) {
        const regex = /https?:\/\/[^\s]+/gi;
        return text.match(regex) || [];
    }

    // Sanitize filename
    sanitizeFilename(filename) {
        return filename.replace(/[^a-z0-9.\-_]/gi, '_').toLowerCase();
    }
}

module.exports = new Utils();
