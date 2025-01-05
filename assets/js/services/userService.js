class UserService {
    constructor() {
        this.API_URL = '/api';
        this.currentUser = null;
    }

    // Đăng ký tài khoản mới
    async register(userData) {
        try {
            const response = await fetch(`${this.API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            // Lưu thông tin người dùng vào localStorage
            localStorage.setItem('user_data', JSON.stringify(data.user));
            localStorage.setItem('auth_token', data.token);

            return data;
        } catch (error) {
            throw error;
        }
    }

    // Đăng nhập
    async login(credentials) {
        try {
            const response = await fetch(`${this.API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            // Lưu thông tin người dùng và token
            localStorage.setItem('user_data', JSON.stringify(data.user));
            localStorage.setItem('auth_token', data.token);

            return data;
        } catch (error) {
            throw error;
        }
    }

    // Cập nhật thông tin profile
    async updateProfile(profileData) {
        try {
            const token = localStorage.getItem('auth_token');
            const response = await fetch(`${this.API_URL}/user/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(profileData)
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            // Cập nhật thông tin trong localStorage
            const currentUser = JSON.parse(localStorage.getItem('user_data'));
            const updatedUser = { ...currentUser, ...data.user };
            localStorage.setItem('user_data', JSON.stringify(updatedUser));

            return data;
        } catch (error) {
            throw error;
        }
    }

    // Lấy thông tin người dùng hiện tại
    async getCurrentUser() {
        try {
            const token = localStorage.getItem('auth_token');
            if (!token) throw new Error('Không tìm thấy token');

            const response = await fetch(`${this.API_URL}/user/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            // Cập nhật thông tin trong localStorage
            localStorage.setItem('user_data', JSON.stringify(data.user));
            this.currentUser = data.user;

            return data.user;
        } catch (error) {
            throw error;
        }
    }

    // Kiểm tra trạng thái đăng nhập
    isLoggedIn() {
        return !!localStorage.getItem('auth_token');
    }

    // Đăng xuất
    logout() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        this.currentUser = null;
        window.location.href = '/login.html';
    }
}

// Khởi tạo service
const userService = new UserService();
export default userService; 