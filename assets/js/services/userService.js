class UserService {
    constructor() {
        this.API_URL = '/api';
        this.DEBUG = true; // Bật chế độ debug
    }

    // Kiểm tra trạng thái đăng nhập và token
    checkAuthStatus() {
        const token = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('user_data');
        
        if (this.DEBUG) {
            console.log('Auth Status:', {
                hasToken: !!token,
                hasUserData: !!userData
            });
        }

        if (!token || !userData) {
            this.redirectToLogin();
            return false;
        }
        return true;
    }

    // Lấy thông tin người dùng từ localStorage
    async getCurrentUser() {
        try {
            const userData = localStorage.getItem('user_data');
            if (!userData) {
                throw new Error('Không tìm thấy thông tin người dùng');
            }

            const user = JSON.parse(userData);
            
            if (this.DEBUG) {
                console.log('Current User Data:', user);
            }

            // Kiểm tra tính hợp lệ của dữ liệu
            if (!this.validateUserData(user)) {
                throw new Error('Dữ liệu người dùng không hợp lệ');
            }

            return user;
        } catch (error) {
            console.error('Lỗi khi lấy thông tin người dùng:', error);
            this.redirectToLogin();
            throw error;
        }
    }

    // Kiểm tra tính hợp lệ của dữ liệu người dùng
    validateUserData(userData) {
        const requiredFields = [
            'username',
            'email',
            'membership',
            'stats',
            'security',
            'apiKeys'
        ];

        const isValid = requiredFields.every(field => {
            const hasField = userData.hasOwnProperty(field);
            if (!hasField && this.DEBUG) {
                console.warn(`Missing required field: ${field}`);
            }
            return hasField;
        });

        if (this.DEBUG) {
            console.log('User Data Validation:', isValid);
        }

        return isValid;
    }

    // Chuyển hướng về trang đăng nhập
    redirectToLogin() {
        if (this.DEBUG) {
            console.log('Redirecting to login page...');
        }
        window.location.href = '/login.html';
    }

    // Cập nhật thông tin người dùng
    async updateUserData(updates) {
        try {
            const currentData = await this.getCurrentUser();
            const updatedData = { ...currentData, ...updates };
            
            if (this.DEBUG) {
                console.log('Updating user data:', {
                    current: currentData,
                    updates: updates,
                    result: updatedData
                });
            }

            localStorage.setItem('user_data', JSON.stringify(updatedData));
            return updatedData;
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin:', error);
            throw error;
        }
    }
}

export default new UserService(); 