
## **📁 LIB FOLDER**

### **5. 📄 lib/database.js**
```javascript
const fs = require('fs-extra');
const path = require('path');
const config = require('../config');

class Database {
    constructor() {
        this.users = [];
        this.groups = [];
        this.premium = [];
        this.loadDatabases();
    }

    loadDatabases() {
        try {
            // Load users database
            if (fs.existsSync(config.database.users)) {
                const usersData = fs.readFileSync(config.database.users, 'utf8');
                this.users = JSON.parse(usersData);
                console.log(`✅ Loaded ${this.users.length} users from database`);
            } else {
                fs.ensureFileSync(config.database.users);
                fs.writeJsonSync(config.database.users, []);
                console.log('📁 Created new users database');
            }

            // Load groups database
            if (fs.existsSync(config.database.groups)) {
                const groupsData = fs.readFileSync(config.database.groups, 'utf8');
                this.groups = JSON.parse(groupsData);
                console.log(`✅ Loaded ${this.groups.length} groups from database`);
            } else {
                fs.ensureFileSync(config.database.groups);
                fs.writeJsonSync(config.database.groups, []);
                console.log('📁 Created new groups database');
            }

            // Load premium database
            if (fs.existsSync(config.database.premium)) {
                const premiumData = fs.readFileSync(config.database.premium, 'utf8');
                this.premium = JSON.parse(premiumData);
                console.log(`✅ Loaded ${this.premium.length} premium users from database`);
            } else {
                fs.ensureFileSync(config.database.premium);
                fs.writeJsonSync(config.database.premium, []);
                console.log('📁 Created new premium database');
            }
        } catch (error) {
            console.error('❌ Error loading databases:', error);
        }
    }

    saveDatabase(type) {
        try {
            switch(type) {
                case 'users':
                    fs.writeJsonSync(config.database.users, this.users, { spaces: 2 });
                    break;
                case 'groups':
                    fs.writeJsonSync(config.database.groups, this.groups, { spaces: 2 });
                    break;
                case 'premium':
                    fs.writeJsonSync(config.database.premium, this.premium, { spaces: 2 });
                    break;
                default:
                    this.saveDatabase('users');
                    this.saveDatabase('groups');
                    this.saveDatabase('premium');
            }
        } catch (error) {
            console.error(`❌ Error saving ${type} database:`, error);
        }
    }

    // User Management
    addUser(jid, userData = {}) {
        const existingUser = this.getUser(jid);
        
        if (existingUser) {
            // Update existing user
            Object.assign(existingUser, userData, {
                lastSeen: new Date().toISOString()
            });
        } else {
            // Add new user
            const user = {
                jid,
                number: jid.split('@')[0],
                name: userData.name || 'User',
                registeredAt: new Date().toISOString(),
                lastSeen: new Date().toISOString(),
                isBanned: false,
                isPremium: false,
                premiumExpired: null,
                ...userData
            };
            this.users.push(user);
        }
        
        this.saveDatabase('users');
        return this.getUser(jid);
    }

    getUser(jid) {
        return this.users.find(user => user.jid === jid);
    }

    getUsers() {
        return this.users;
    }

    updateUser(jid, data) {
        const user = this.getUser(jid);
        if (user) {
            Object.assign(user, data, {
                updatedAt: new Date().toISOString()
            });
            this.saveDatabase('users');
            return true;
        }
        return false;
    }

    deleteUser(jid) {
        const index = this.users.findIndex(user => user.jid === jid);
        if (index !== -1) {
            this.users.splice(index, 1);
            this.saveDatabase('users');
            return true;
        }
        return false;
    }

    isRegistered(jid) {
        return !!this.getUser(jid);
    }

    // Group Management
    addGroup(jid, groupData = {}) {
        const existingGroup = this.getGroup(jid);
        
        if (existingGroup) {
            Object.assign(existingGroup, groupData, {
                updatedAt: new Date().toISOString()
            });
        } else {
            const group = {
                jid,
                id: jid,
                name: groupData.name || 'Group',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                isActive: true,
                settings: {
                    antilink: false,
                    antibot: false,
                    welcome: true,
                    antidelete: false,
                    ...groupData.settings
                },
                ...groupData
            };
            this.groups.push(group);
        }
        
        this.saveDatabase('groups');
        return this.getGroup(jid);
    }

    getGroup(jid) {
        return this.groups.find(group => group.jid === jid);
    }

    getGroups() {
        return this.groups;
    }

    updateGroup(jid, data) {
        const group = this.getGroup(jid);
        if (group) {
            Object.assign(group, data, {
                updatedAt: new Date().toISOString()
            });
            this.saveDatabase('groups');
            return true;
        }
        return false;
    }

    deleteGroup(jid) {
        const index = this.groups.findIndex(group => group.jid === jid);
        if (index !== -1) {
            this.groups.splice(index, 1);
            this.saveDatabase('groups');
            return true;
        }
        return false;
    }

    // Premium Management
    addPremium(jid, duration = 30) {
        const existingPremium = this.getPremium(jid);
        const expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + duration);
        
        if (existingPremium) {
            existingPremium.expiredAt = expireDate.toISOString();
            existingPremium.duration = duration;
            existingPremium.updatedAt = new Date().toISOString();
        } else {
            const premium = {
                jid,
                number: jid.split('@')[0],
                startedAt: new Date().toISOString(),
                expiredAt: expireDate.toISOString(),
                duration,
                isActive: true
            };
            this.premium.push(premium);
        }
        
        // Update user premium status
        const user = this.getUser(jid);
        if (user) {
            user.isPremium = true;
            user.premiumExpired = expireDate.toISOString();
            this.saveDatabase('users');
        }
        
        this.saveDatabase('premium');
        return this.getPremium(jid);
    }

    getPremium(jid) {
        return this.premium.find(premium => premium.jid === jid);
    }

    getPremiumUsers() {
        return this.premium;
    }

    isPremium(jid) {
        const premium = this.getPremium(jid);
        if (!premium || !premium.isActive) return false;
        
        const now = new Date();
        const expiredAt = new Date(premium.expiredAt);
        return now < expiredAt;
    }

    removePremium(jid) {
        const index = this.premium.findIndex(premium => premium.jid === jid);
        if (index !== -1) {
            this.premium.splice(index, 1);
            
            // Update user premium status
            const user = this.getUser(jid);
            if (user) {
                user.isPremium = false;
                user.premiumExpired = null;
                this.saveDatabase('users');
            }
            
            this.saveDatabase('premium');
            return true;
        }
        return false;
    }

    // Statistics
    getStats() {
        const totalUsers = this.users.length;
        const totalGroups = this.groups.length;
        const totalPremium = this.premium.length;
        const activePremium = this.premium.filter(p => this.isPremium(p.jid)).length;
        const activeToday = this.users.filter(u => {
            const lastSeen = new Date(u.lastSeen);
            const today = new Date();
            return lastSeen.toDateString() === today.toDateString();
        }).length;

        return {
            totalUsers,
            totalGroups,
            totalPremium,
            activePremium,
            activeToday
        };
    }
}

module.exports = new Database();
