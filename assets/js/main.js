import userService from './services/userService.js';

class App {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const state = await userService.checkInitialState();
            userService.updateNavigation(state);
            
            // Khởi tạo event listeners
            this.initializeEventListeners();
            
            // Kiểm tra path hiện tại
            if (window.location.pathname === '/profile.html' && !state.isAuthenticated) {
                window.location.href = '/';
            }
        } catch (error) {
            console.error('App initialization failed:', error);
        }
    }

    initializeEventListeners() {
        // Lắng nghe sự kiện auth state change
        document.addEventListener('authStateChange', async (e) => {
            const state = await userService.checkInitialState();
            userService.updateNavigation(state);
        });

        // Xử lý click vào nút tài khoản
        const profileLink = document.querySelector('.profile-link');
        if (profileLink) {
            profileLink.addEventListener('click', (e) => {
                const state = userService.isLoggedIn();
                if (!state) {
                    e.preventDefault();
                    window.location.href = '/profile.html#login';
                }
            });
        }
    }
}

// Khởi tạo app khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
    new App();
}); 