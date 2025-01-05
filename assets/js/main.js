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
        const profileButton = document.querySelector('.profile-button');
        if (profileButton) {
            // Cập nhật trạng thái đăng nhập
            profileButton.classList.add('authenticated');
            
            // Cập nhật tên người dùng
            const span = profileButton.querySelector('span');
            if (span) {
                span.textContent = userData.username;
            }

            // Thêm hiệu ứng highlight
            profileButton.classList.add('highlight');
            setTimeout(() => {
                profileButton.classList.remove('highlight');
            }, 2000);
        }

        // Cập nhật số dư
        const balanceAmount = document.querySelector('.balance-amount');
        if (balanceAmount) {
            balanceAmount.textContent = new Intl.NumberFormat('vi-VN').format(userData.stats.balance);
        }
    }

    initializeEventListeners() {
        // Lắng nghe sự kiện cập nhật số dư
        document.addEventListener('balanceUpdate', (e) => {
            const balanceAmount = document.querySelector('.balance-amount');
            if (balanceAmount) {
                balanceAmount.textContent = new Intl.NumberFormat('vi-VN').format(e.detail.balance);
            }
        });

        // Lắng nghe sự kiện đăng nhập/đăng xuất
        document.addEventListener('authStateChange', async (e) => {
            if (e.detail.type === 'login' || e.detail.type === 'register') {
                const userData = await userService.getCurrentUser();
                this.updateNavigation(userData);
            }
        });
    }
}

// Khởi tạo app
document.addEventListener('DOMContentLoaded', () => {
    new App();
}); 