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

    async register(userData) {
        try {
            // Kiểm tra email đã tồn tại
            const existingData = localStorage.getItem('user_data');
            if (existingData) {
                const existingUser = JSON.parse(existingData);
                if (existingUser.email === userData.email) {
                    throw new Error('Email đã được sử dụng');
                }
            }

            // Tạo user mới
            const newUser = {
                ...this.defaultUser,
                username: userData.username,
                email: userData.email,
                createdAt: new Date().toISOString()
            };

            // Lưu vào localStorage
            const token = 'mock_token_' + Date.now();
            localStorage.setItem('auth_token', token);
            localStorage.setItem('user_data', JSON.stringify(newUser));

            // Gửi event đăng ký thành công
            this.dispatchAuthEvent('register');
            
            return newUser;
        } catch (error) {
            console.error('Registration failed:', error);
            throw new Error(error.message || 'Đăng ký thất bại');
        }
    }

    async login(credentials) {
        try {
            const userData = localStorage.getItem('user_data');
            if (userData) {
                const user = JSON.parse(userData);
                if (user.email === credentials.email) {
                    localStorage.setItem('auth_token', 'mock_token_' + Date.now());
                    this.dispatchAuthEvent('login');
                    return user;
                }
            }
            throw new Error('Email hoặc mật khẩu không đúng');
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }

    dispatchAuthEvent(type) {
        document.dispatchEvent(new CustomEvent('authStateChange', {
            detail: { type }
        }));
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

// Tạo và export instance
const userService = new UserService();
export default userService; 