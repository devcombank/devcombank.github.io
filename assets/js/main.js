import userService from './services/userService.js';

class App {
    constructor() {
        this.init();
    }

    async init() {
        try {
            console.log("Initializing app...");
            await this.checkAuthState();
            this.initializeEventListeners();
        } catch (error) {
            console.error("Initialization error:", error);
        }
    }

    async checkAuthState() {
        try {
            const state = await userService.checkInitialState();
            console.log("Auth state:", state);
            this.updateUI(state);
        } catch (error) {
            console.error("Auth state check error:", error);
        }
    }

    updateUI(state) {
        const balanceElement = document.querySelector('.balance-amount');
        const profileLink = document.querySelector('.profile-link');

        if (balanceElement) {
            balanceElement.textContent = new Intl.NumberFormat('vi-VN').format(state.balance);
        }

        if (profileLink) {
            profileLink.href = state.isAuthenticated ? 'profile.html' : 'profile.html#login';
        }
    }

    initializeEventListeners() {
        // Lắng nghe sự kiện cập nhật số dư
        document.addEventListener('balanceUpdate', (e) => {
            const balanceElement = document.querySelector('.balance-amount');
            if (balanceElement) {
                balanceElement.textContent = new Intl.NumberFormat('vi-VN').format(e.detail.balance);
            }
        });

        // Lắng nghe sự kiện đăng nhập/đăng xuất
        document.addEventListener('authStateChange', async () => {
            await this.checkAuthState();
        });
    }
}

// Khởi tạo ứng dụng
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded, initializing app...");
    new App();
}); 
document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo các class quản lý
    const userAuth = new UserAuth();
    const balanceManager = new BalanceManager(userAuth);

    // Kiểm tra trạng thái đăng nhập
    userAuth.checkAuthStatus();
}); 