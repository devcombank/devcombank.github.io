class UserService {
    constructor() {
        this.API_URL = 'https://devcombank.github.io/api';
        this.defaultUser = {
            username: null,
            email: null,
            stats: {
                balance: 0,
                billsCreated: 0
            },
            membership: {
                type: 'Free',
                daysLeft: 0
            }
        };
    }

    async checkInitialState() {
        try {
            const token = localStorage.getItem('auth_token');
            if (!token) {
                return {
                    isAuthenticated: false,
                    balance: 0,
                    userData: this.defaultUser
                };
            }

            const userData = await this.getCurrentUser();
            return {
                isAuthenticated: true,
                balance: userData.stats.balance,
                userData: userData
            };
        } catch (error) {
            console.error('Initial state check failed:', error);
            return {
                isAuthenticated: false,
                balance: 0,
                userData: this.defaultUser
            };
        }
    }

    updateNavigation(state) {
        const balanceDisplay = document.querySelector('.balance-amount');
        if (balanceDisplay) {
            balanceDisplay.textContent = new Intl.NumberFormat('vi-VN').format(state.balance);
        }
    }

    async login(credentials) {
        try {
            // Giả lập API call
            const mockUser = {
                ...this.defaultUser,
                username: credentials.email.split('@')[0],
                email: credentials.email,
                stats: {
                    balance: 0,
                    billsCreated: 0
                }
            };

            localStorage.setItem('auth_token', 'mock_token');
            localStorage.setItem('user_data', JSON.stringify(mockUser));

            this.dispatchAuthEvent('login');
            return mockUser;
        } catch (error) {
            throw new Error('Đăng nhập thất bại');
        }
    }

    logout() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        this.dispatchAuthEvent('logout');
        window.location.href = '/';
    }

    dispatchAuthEvent(type) {
        document.dispatchEvent(new CustomEvent('authStateChange', {
            detail: { type }
        }));
    }
}

export default new UserService(); 