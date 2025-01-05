class UserService {
    constructor() {
        this.API_URL = '/api';
    }

    async register(userData) {
        try {
            // Tạo user mới với số dư mặc định là 0
            const newUser = {
                username: userData.username,
                email: userData.email,
                stats: {
                    balance: 0,
                    billsCreated: 0
                },
                membership: {
                    type: 'Free',
                    daysLeft: 0
                },
                createdAt: new Date().toISOString()
            };

            // Lưu vào localStorage
            localStorage.setItem('user_data', JSON.stringify(newUser));
            localStorage.setItem('auth_token', 'mock_token_' + Date.now());

            this.dispatchAuthEvent('register');
            return newUser;
        } catch (error) {
            throw new Error('Đăng ký thất bại');
        }
    }

    async login(credentials) {
        try {
            // Kiểm tra thông tin đăng nhập từ localStorage
            const savedUserData = localStorage.getItem('user_data');
            if (savedUserData) {
                const userData = JSON.parse(savedUserData);
                if (userData.email === credentials.email) {
                    // Cập nhật token mới
                    localStorage.setItem('auth_token', 'mock_token_' + Date.now());
                    this.dispatchAuthEvent('login');
                    return userData;
                }
            }
            throw new Error('Email hoặc mật khẩu không đúng');
        } catch (error) {
            throw error;
        }
    }

    async updateBalance(amount) {
        try {
            const userData = await this.getCurrentUser();
            userData.stats.balance += amount;
            
            // Cập nhật localStorage
            localStorage.setItem('user_data', JSON.stringify(userData));
            
            // Gửi event cập nhật số dư
            this.dispatchBalanceUpdate(userData.stats.balance);
            
            return userData.stats.balance;
        } catch (error) {
            throw new Error('Không thể cập nhật số dư');
        }
    }

    async getCurrentUser() {
        const userData = localStorage.getItem('user_data');
        if (!userData) {
            throw new Error('Chưa đăng nhập');
        }
        return JSON.parse(userData);
    }

    isLoggedIn() {
        return !!localStorage.getItem('auth_token');
    }

    dispatchAuthEvent(type) {
        document.dispatchEvent(new CustomEvent('authStateChange', {
            detail: { type }
        }));
    }

    dispatchBalanceUpdate(balance) {
        document.dispatchEvent(new CustomEvent('balanceUpdate', {
            detail: { balance }
        }));
    }

    logout() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        this.dispatchAuthEvent('logout');
        window.location.href = '/';
    }
}

export default new UserService(); 