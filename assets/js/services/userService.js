class UserService {
    constructor() {
        this.API_URL = '/api';
        this.currentUser = {
            username: 'Hoàng Thiên Tùng',
            email: 'admin@vvl6.com',
            phone: '0987654321',
            joinDate: '01/01/2025',
            membership: {
                type: 'Premium',
                daysLeft: 25
            },
            stats: {
                billsCreated: 1500,
                balance: 500789142
            },
            security: {
                twoFactorEnabled: false
            },
            apiKeys: {
                production: 'sk_live_xxxxxxxxxxxxx',
                test: 'sk_test_xxxxxxxxxxxxx'
            }
        };
    }

    async getCurrentUser() {
        try {
            // Giả lập API call
            return this.currentUser;
        } catch (error) {
            throw error;
        }
    }

    async updateProfile(profileData) {
        try {
            // Cập nhật thông tin người dùng
            this.currentUser = {
                ...this.currentUser,
                ...profileData
            };
            return this.currentUser;
        } catch (error) {
            throw error;
        }
    }

    async updateSecurity(securityData) {
        try {
            this.currentUser.security = {
                ...this.currentUser.security,
                ...securityData
            };
            return this.currentUser.security;
        } catch (error) {
            throw error;
        }
    }

    async getTransactionHistory() {
        return [
            {
                type: 'deposit',
                title: 'Nạp tiền',
                description: 'Nạp tiền qua LIO Bank',
                date: '01/01/2024 15:30',
                amount: 500000000,
                isPositive: true
            },
            {
                type: 'purchase',
                title: 'Mua gói Premium',
                description: 'Gia hạn gói Premium 30 ngày',
                date: '01/01/2024 15:25',
                amount: 200000,
                isPositive: false
            }
        ];
    }

    async regenerateApiKey(type) {
        const newKey = type === 'production' 
            ? 'sk_live_' + Math.random().toString(36).substr(2, 20)
            : 'sk_test_' + Math.random().toString(36).substr(2, 20);
        
        this.currentUser.apiKeys[type] = newKey;
        return newKey;
    }
}

export default new UserService(); 