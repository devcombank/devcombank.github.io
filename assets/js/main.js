document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo các class quản lý
    const userAuth = new UserAuth();
    const balanceManager = new BalanceManager(userAuth);

    // Kiểm tra trạng thái đăng nhập
    userAuth.checkAuthStatus();
}); 