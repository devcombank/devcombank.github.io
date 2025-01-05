import userService from './services/userService.js';

class NavigationManager {
    constructor() {
        this.initializeNavigation();
        this.initializeEventListeners();
    }

    async initializeNavigation() {
        const isLoggedIn = userService.isLoggedIn();
        const guestMenu = document.getElementById('guestMenu');
        const userMenu = document.getElementById('userMenu');

        if (isLoggedIn) {
            try {
                const userData = await userService.getCurrentUser();
                this.updateUserMenu(userData);
                guestMenu.classList.add('hidden');
                userMenu.classList.remove('hidden');
            } catch (error) {
                console.error('Lỗi khi tải thông tin người dùng:', error);
                userService.logout();
            }
        } else {
            guestMenu.classList.remove('hidden');
            userMenu.classList.add('hidden');
        }
    }

    updateUserMenu(userData) {
        // Cập nhật avatar và tên người dùng
        const userAvatar = document.querySelector('.user-avatar');
        const userName = document.querySelector('.user-name');
        const balanceAmount = document.querySelector('.balance-amount');

        if (userData.avatar) {
            userAvatar.src = userData.avatar;
        }
        
        userName.textContent = userData.username;
        
        // Format số dư
        const formattedBalance = new Intl.NumberFormat('vi-VN').format(userData.balance);
        balanceAmount.textContent = formattedBalance;
    }

    initializeEventListeners() {
        // Xử lý đăng xuất
        const logoutBtn = document.querySelector('.logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                userService.logout();
            });
        }

        // Xử lý dropdown mobile (nếu cần)
        const dropdownToggle = document.querySelector('.dropdown-toggle');
        if (dropdownToggle) {
            dropdownToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const dropdownMenu = document.querySelector('.dropdown-menu');
                dropdownMenu.classList.toggle('show');
            });
        }
    }
}

// Khởi tạo Navigation Manager
document.addEventListener('DOMContentLoaded', () => {
    new NavigationManager();
}); 