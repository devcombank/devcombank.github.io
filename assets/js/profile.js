import userService from './services/userService.js';

class ProfileManager {
    constructor() {
        this.DEBUG = true; // Bật chế độ debug
        this.init();
    }

    async init() {
        try {
            // Kiểm tra trạng thái đăng nhập
            if (!userService.checkAuthStatus()) {
                return;
            }

            await this.loadAndDisplayUserData();
            this.initializeEventListeners();

            if (this.DEBUG) {
                this.setupDebugTools();
            }
        } catch (error) {
            console.error('Lỗi khởi tạo profile:', error);
            this.showError('Không thể tải thông tin profile');
        }
    }

    async loadAndDisplayUserData() {
        try {
            const userData = await userService.getCurrentUser();
            
            if (this.DEBUG) {
                console.log('Loading user data:', userData);
            }

            this.updateProfileUI(userData);
            await this.loadTransactionHistory();

            // Kiểm tra và hiển thị trạng thái đồng bộ
            this.checkSyncStatus(userData);
        } catch (error) {
            console.error('Lỗi khi tải dữ liệu:', error);
            throw error;
        }
    }

    checkSyncStatus(userData) {
        if (this.DEBUG) {
            const syncStatus = {
                localStorageData: localStorage.getItem('user_data'),
                currentUserData: userData,
                timestamp: new Date().toISOString()
            };
            console.log('Sync Status:', syncStatus);
        }

        // Hiển thị trạng thái đồng bộ trên UI
        const syncIndicator = document.createElement('div');
        syncIndicator.className = 'sync-status';
        syncIndicator.innerHTML = `
            <i class="fas fa-sync-alt"></i>
            <span>Đã đồng bộ</span>
        `;
        document.querySelector('.profile-header').appendChild(syncIndicator);
    }

    setupDebugTools() {
        // Thêm công cụ debug vào UI
        const debugPanel = document.createElement('div');
        debugPanel.className = 'debug-panel';
        debugPanel.innerHTML = `
            <h3>Debug Panel</h3>
            <button id="checkSync">Kiểm tra đồng bộ</button>
            <button id="clearData">Xóa dữ liệu</button>
            <div id="debugOutput"></div>
        `;
        document.body.appendChild(debugPanel);

        // Thêm các event listeners cho debug
        document.getElementById('checkSync').addEventListener('click', () => {
            this.checkSyncStatus(userService.getCurrentUser());
        });

        document.getElementById('clearData').addEventListener('click', () => {
            localStorage.clear();
            window.location.reload();
        });
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

// Thêm CSS cho debug và sync status
const style = document.createElement('style');
style.textContent = `
    .sync-status {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px;
        background: #e8f5e9;
        border-radius: 4px;
        margin-top: 10px;
    }

    .debug-panel {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #f5f5f5;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 1000;
    }

    .debug-panel button {
        margin: 5px;
        padding: 5px 10px;
    }

    #debugOutput {
        margin-top: 10px;
        padding: 10px;
        background: #fff;
        border-radius: 4px;
        max-height: 200px;
        overflow-y: auto;
    }
`;
document.head.appendChild(style);

// Khởi tạo Profile Manager
document.addEventListener('DOMContentLoaded', () => {
    new ProfileManager();
}); 