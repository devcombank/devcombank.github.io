import userService from './services/userService.js';

class AuthManager {
    constructor() {
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe')?.checked;

        try {
            const response = await userService.login({ email, password, rememberMe });
            this.showSuccess('Đăng nhập thành công!');
            window.location.href = '/profile.html';
        } catch (error) {
            this.showError(error.message);
        }
    }

    async handleRegister(e) {
        e.preventDefault();
        const email = document.getElementById('registerEmail').value;
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            this.showError('Mật khẩu xác nhận không khớp');
            return;
        }

        try {
            const response = await userService.register({ email, username, password });
            this.showSuccess('Đăng ký thành công! Vui lòng đăng nhập.');
            window.location.href = '/login.html';
        } catch (error) {
            this.showError(error.message);
        }
    }

    showSuccess(message) {
        // Hiển thị thông báo thành công
        const notification = document.createElement('div');
        notification.className = 'notification success';
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    showError(message) {
        // Hiển thị thông báo lỗi
        const notification = document.createElement('div');
        notification.className = 'notification error';
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
}

// Khởi tạo Auth Manager
document.addEventListener('DOMContentLoaded', () => {
    new AuthManager();
}); 