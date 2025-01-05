import userService from './services/userService.js';

class AuthManager {
    constructor() {
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Form submissions
        document.getElementById('loginForm')?.addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('registerForm')?.addEventListener('submit', (e) => this.handleRegister(e));

        // Password visibility toggles
        document.querySelectorAll('.toggle-password').forEach(button => {
            button.addEventListener('click', (e) => this.togglePasswordVisibility(e));
        });
    }

    async handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe')?.checked;

        try {
            await userService.login({ email, password, rememberMe });
            this.showSuccess('Đăng nhập thành công!');
            // Chuyển về trang chủ sau khi đăng nhập
            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
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
            await userService.register({ email, username, password });
            this.showSuccess('Đăng ký thành công! Đang chuyển hướng...');
            // Tự động đăng nhập và chuyển về trang chủ
            setTimeout(async () => {
                await userService.login({ email, password });
                window.location.href = '/';
            }, 1000);
        } catch (error) {
            this.showError(error.message);
        }
    }

    togglePasswordVisibility(e) {
        const button = e.currentTarget;
        const input = button.parentElement.querySelector('input');
        const icon = button.querySelector('i');

        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.replace('fa-eye-slash', 'fa-eye');
        }
    }

    showSuccess(message) {
        const notification = document.createElement('div');
        notification.className = 'notification success';
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    showError(message) {
        const notification = document.createElement('div');
        notification.className = 'notification error';
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
}

// Switch between login and register forms
window.switchAuthMode = function(mode) {
    const loginSection = document.getElementById('loginSection');
    const registerSection = document.getElementById('registerSection');

    if (mode === 'login') {
        loginSection.classList.remove('hidden');
        registerSection.classList.add('hidden');
    } else {
        loginSection.classList.add('hidden');
        registerSection.classList.remove('hidden');
    }
}

// Initialize Auth Manager
document.addEventListener('DOMContentLoaded', () => {
    new AuthManager();
}); 