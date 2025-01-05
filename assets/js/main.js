import userService from './services/userService.js';

class App {
    constructor() {
        this.init();
    }

    async init() {
        try {
            if (userService.isLoggedIn()) {
                const userData = await userService.getCurrentUser();
                this.updateNavigation(userData);
            }
            this.initializeEventListeners();
        } catch (error) {
            console.error('App initialization failed:', error);
        }
    }

    updateNavigation(userData) {
        // Cập nhật tên người dùng
        const usernameDisplay = document.querySelector('.username-display');
        if (usernameDisplay) {
            if (userData && userData.username) {
                usernameDisplay.textContent = userData.username;
                // Thêm tooltip cho tên dài
                usernameDisplay.title = userData.username;
            } else {
                usernameDisplay.textContent = 'Tài khoản';
            }
        }

        // Cập nhật trạng thái nút
        const profileButton = document.querySelector('.profile-button');
        if (profileButton) {
            if (userData) {
                profileButton.classList.add('authenticated');
                // Thêm hiệu ứng highlight
                profileButton.classList.add('highlight');
                setTimeout(() => {
                    profileButton.classList.remove('highlight');
                }, 2000);
            } else {
                profileButton.classList.remove('authenticated');
            }
        }

        // Cập nhật số dư
        const balanceAmount = document.querySelector('.balance-amount');
        if (balanceAmount && userData) {
            balanceAmount.textContent = new Intl.NumberFormat('vi-VN').format(userData.stats.balance);
        }
    }

    initializeEventListeners() {
        // Lắng nghe sự kiện auth state change
        document.addEventListener('authStateChange', async (e) => {
            if (e.detail.type === 'login' || e.detail.type === 'register') {
                const userData = await userService.getCurrentUser();
                this.updateNavigation(userData);
            } else if (e.detail.type === 'logout') {
                this.updateNavigation(null);
            }
        });

        // Lắng nghe sự kiện cập nhật số dư
        document.addEventListener('balanceUpdate', (e) => {
            const balanceAmount = document.querySelector('.balance-amount');
            if (balanceAmount) {
                balanceAmount.textContent = new Intl.NumberFormat('vi-VN').format(e.detail.balance);
            }
        });
    }
}

// Khởi tạo app
document.addEventListener('DOMContentLoaded', () => {
    new App();
}); 