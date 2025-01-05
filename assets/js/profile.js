import userService from './services/userService.js';

class ProfileManager {
    constructor() {
        this.init();
    }

    async init() {
        try {
            // Kiểm tra đăng nhập
            if (!userService.isLoggedIn()) {
                window.location.href = '/login.html';
                return;
            }

            const userData = await userService.getUserProfile();
            this.renderProfile(userData);
            this.initializeEventListeners();
        } catch (error) {
            console.error('Profile initialization failed:', error);
            // Hiển thị thông báo lỗi
            this.showError('Không thể tải thông tin tài khoản');
        }
    }

    renderProfile(userData) {
        if (!userData) return;

        // Cập nhật UI với dữ liệu người dùng
        document.querySelector('.profile-name').textContent = userData.username;
        document.querySelector('[data-field="email"] span').textContent = userData.email;
        document.querySelector('[data-field="phone"] span').textContent = userData.phone || 'Chưa cập nhật';
        
        // Cập nhật thống kê
        const stats = userData.stats || { balance: 0, billsCreated: 0 };
        document.querySelector('[data-stat="bills"] .stat-value').textContent = stats.billsCreated;
        document.querySelector('[data-stat="balance"] .stat-value').textContent = 
            new Intl.NumberFormat('vi-VN').format(stats.balance);

        // Cập nhật membership
        const membership = userData.membership || { type: 'Free', daysLeft: 0 };
        document.querySelector('[data-stat="days"] .stat-value').textContent = membership.daysLeft;
        
        // Cập nhật badge
        const premiumBadge = document.querySelector('.premium-badge');
        if (premiumBadge) {
            premiumBadge.innerHTML = membership.type === 'Premium' 
                ? '<i class="fas fa-crown"></i> Premium Member'
                : '<i class="fas fa-user"></i> Free Member';
        }
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        document.querySelector('.profile-container').prepend(errorDiv);
    }
}

// Khởi tạo khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
    new ProfileManager();
}); 