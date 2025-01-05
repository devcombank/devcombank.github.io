// Quản lý số dư và giao dịch
class BalanceManager {
    constructor(userAuth) {
        this.userAuth = userAuth;
        this.initializeEventListeners();
    }

    // Khởi tạo các event listeners
    initializeEventListeners() {
        // Lắng nghe sự kiện nạp tiền thành công
        document.addEventListener('paymentSuccess', (e) => {
            this.handlePaymentSuccess(e.detail.amount);
        });

        // Lắng nghe sự kiện cập nhật số dư
        document.addEventListener('balanceUpdate', (e) => {
            this.handleBalanceUpdate(e.detail.newBalance);
        });
    }

    // Xử lý khi nạp tiền thành công
    async handlePaymentSuccess(amount) {
        try {
            const response = await this.updateBalanceOnServer(amount);
            if (response.ok) {
                const data = await response.json();
                this.userAuth.updateBalance(data.newBalance);
                this.showSuccessNotification(amount);
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật số dư:', error);
            this.showErrorNotification();
        }
    }

    // Gửi yêu cầu cập nhật số dư lên server
    async updateBalanceOnServer(amount) {
        return await fetch('api/user/balance/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            },
            body: JSON.stringify({ amount })
        });
    }

    // Hiển thị thông báo thành công
    showSuccessNotification(amount) {
        const formattedAmount = new Intl.NumberFormat('vi-VN').format(amount);
        const notification = document.createElement('div');
        notification.className = 'notification success';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            Nạp thành công ${formattedAmount} VNĐ
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    // Hiển thị thông báo lỗi
    showErrorNotification() {
        const notification = document.createElement('div');
        notification.className = 'notification error';
        notification.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            Có lỗi xảy ra, vui lòng thử lại
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
} 