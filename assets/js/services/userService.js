class UserService {
    constructor() {
        this.API_URL = '/api';
        this.defaultUser = {
            username: 'Khách',
            email: '',
            phone: '',
            avatar: 'assets/images/default-avatar.png',
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
    }

    async checkInitialState() {
        try {
            const token = localStorage.getItem('auth_token');
            const userData = localStorage.getItem('user_data');

            if (!token || !userData) {
                return {
                    isAuthenticated: false,
                    userData: this.defaultUser
                };
            }

            return {
                isAuthenticated: true,
                userData: JSON.parse(userData)
            };
        } catch (error) {
            console.error('Initial state check failed:', error);
            return {
                isAuthenticated: false,
                userData: this.defaultUser
            };
        }
    }

    async getUserProfile() {
        const state = await this.checkInitialState();
        if (!state.isAuthenticated) {
            window.location.href = '/login.html';
            throw new Error('Vui lòng đăng nhập');
        }
        return state.userData;
    }

    isLoggedIn() {
        return !!localStorage.getItem('auth_token');
    }
}

export default new UserService(); 