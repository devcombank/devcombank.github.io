// Quản lý thông tin người dùng và xác thực
class UserAuth {
    constructor() {
        this.currentUser = null;
        this.isAuthenticated = false;
    }

    // Kiểm tra trạng thái đăng nhập
    checkAuthStatus() {
        const token = localStorage.getItem('auth_token');
        if (token) {
            this.fetchUserData(token);
        } else {
            this.redirectToLogin();
        }
    }

    // Lấy thông tin người dùng từ API
    async fetchUserData(token) {
        try {
            const response = await fetch('api/user/info', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.ok) {
                const userData = await response.json();
                this.currentUser = userData;
                this.isAuthenticated = true;
                this.updateUIWithUserData();
            } else {
                this.handleAuthError();
            }
        } catch (error) {
            console.error('Lỗi khi lấy thông tin người dùng:', error);
            this.handleAuthError();
        }
    }

    // Cập nhật UI với thông tin người dùng
    updateUIWithUserData() {
        if (this.currentUser) {
            // Cập nhật số dư
            this.updateBalance(this.currentUser.balance);
            
            // Cập nhật thông tin profile
            this.updateProfileInfo();
        }
    }

    // Cập nhật hiển thị số dư
    updateBalance(amount) {
        const balanceElement = document.querySelector('.balance-amount');
        if (balanceElement) {
            const formattedAmount = new Intl.NumberFormat('vi-VN').format(amount);
            balanceElement.textContent = formattedAmount;
            
            // Animation khi số dư thay đổi
            balanceElement.classList.add('balance-updated');
            setTimeout(() => {
                balanceElement.classList.remove('balance-updated');
            }, 1000);
        }
    }

    // Xử lý lỗi xác thực
    handleAuthError() {
        this.isAuthenticated = false;
        this.currentUser = null;
        this.redirectToLogin();
    }

    // Chuyển hướng đến trang đăng nhập
    redirectToLogin() {
        window.location.href = '/login.html';
    }
} 