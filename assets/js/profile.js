import userService from './services/userService.js';

class ProfileManager {
    constructor() {
        this.initializeProfile();
        this.initializeEventListeners();
    }

    async initializeProfile() {
        try {
            const userData = await userService.getCurrentUser();
            this.updateProfileUI(userData);
        } catch (error) {
            console.error('Lỗi khi tải thông tin profile:', error);
            window.location.href = '/login.html';
        }
    }

    updateProfileUI(userData) {
        // Cập nhật thông tin hiển thị
        document.querySelector('.profile-name h1').textContent = userData.username;
        document.querySelector('.info-item [data-field="email"]').textContent = userData.email;
        document.querySelector('.info-item [data-field="phone"]').textContent = userData.phone || 'Chưa cập nhật';
        document.querySelector('.info-item [data-field="joinDate"]').textContent = new Date(userData.createdAt).toLocaleDateString('vi-VN');
        
        // Cập nhật số dư và thông tin khác
        document.querySelector('.stat-card .stat-value[data-field="balance"]').textContent = 
            new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(userData.balance);
    }

    initializeEventListeners() {
        // Xử lý các sự kiện trong profile
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => this.switchTab(item.dataset.tab));
        });

        // Xử lý nút đăng xuất
        document.querySelector('.logout-btn')?.addEventListener('click', () => {
            userService.logout();
        });
    }

    switchTab(tabId) {
        // Ẩn tất cả các tab
        document.querySelectorAll('.tab-pane').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Hiển thị tab được chọn
        document.getElementById(tabId).classList.add('active');
        
        // Cập nhật trạng thái active của nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.tab === tabId);
        });
    }
}

// Khởi tạo Profile Manager
document.addEventListener('DOMContentLoaded', () => {
    new ProfileManager();
}); 