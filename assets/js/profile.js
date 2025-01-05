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
            this.loadTransactionHistory();
        } catch (error) {
            this.showError('Không thể tải thông tin người dùng');
        }
    }

    updateProfileUI(userData) {
        // Cập nhật thông tin cơ bản
        document.querySelector('.profile-name h1').textContent = userData.username;
        document.querySelector('.membership-badge').textContent = `${userData.membership.type} Member`;

        // Cập nhật thông tin chi tiết
        const infoFields = {
            'email': userData.email,
            'phone': userData.phone,
            'joinDate': userData.joinDate,
            'membership': `${userData.membership.type} (còn ${userData.membership.daysLeft} ngày)`
        };

        for (const [field, value] of Object.entries(infoFields)) {
            const element = document.querySelector(`[data-field="${field}"]`);
            if (element) element.textContent = value;
        }

        // Cập nhật thống kê
        document.querySelector('[data-stat="bills"]').textContent = userData.stats.billsCreated;
        document.querySelector('[data-stat="days"]').textContent = userData.membership.daysLeft;
        document.querySelector('[data-stat="balance"]').textContent = 
            new Intl.NumberFormat('vi-VN').format(userData.stats.balance) + ' VND';

        // Cập nhật trạng thái 2FA
        document.querySelector('#twoFactorToggle').checked = userData.security.twoFactorEnabled;

        // Cập nhật API Keys
        document.querySelector('#productionKey').value = userData.apiKeys.production;
        document.querySelector('#testKey').value = userData.apiKeys.test;
    }

    async loadTransactionHistory() {
        try {
            const transactions = await userService.getTransactionHistory();
            const container = document.querySelector('.transactions-list');
            container.innerHTML = transactions.map(transaction => this.createTransactionHTML(transaction)).join('');
        } catch (error) {
            this.showError('Không thể tải lịch sử giao dịch');
        }
    }

    createTransactionHTML(transaction) {
        return `
            <div class="transaction-item">
                <div class="transaction-icon ${transaction.type}">
                    <i class="fas fa-${transaction.isPositive ? 'arrow-down' : 'arrow-up'}"></i>
                </div>
                <div class="transaction-info">
                    <h3>${transaction.title}</h3>
                    <p>${transaction.description}</p>
                    <span class="transaction-date">${transaction.date}</span>
                </div>
                <div class="transaction-amount ${transaction.isPositive ? 'positive' : 'negative'}">
                    ${transaction.isPositive ? '+' : '-'}${new Intl.NumberFormat('vi-VN').format(transaction.amount)}đ
                </div>
            </div>
        `;
    }

    initializeEventListeners() {
        // Tab switching
        document.querySelectorAll('.nav-item').forEach(button => {
            button.addEventListener('click', () => this.switchTab(button.dataset.tab));
        });

        // API Key regeneration
        document.querySelectorAll('.regenerate-btn').forEach(button => {
            button.addEventListener('click', async () => {
                const keyType = button.dataset.keyType;
                try {
                    const newKey = await userService.regenerateApiKey(keyType);
                    document.querySelector(`#${keyType}Key`).value = newKey;
                    this.showSuccess('API Key đã được tạo mới');
                } catch (error) {
                    this.showError('Không thể tạo mới API Key');
                }
            });
        });
    }

    showSuccess(message) {
        // Implement notification
    }

    showError(message) {
        // Implement notification
    }
}

// Initialize Profile Manager
document.addEventListener('DOMContentLoaded', () => {
    new ProfileManager();
}); 