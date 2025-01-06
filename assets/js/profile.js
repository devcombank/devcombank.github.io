document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'auth.html';
        return;
    }

    // Load thông tin user từ danh sách users
    const users = JSON.parse(localStorage.getItem('users'));
    const userDetails = users.find(u => u.username === currentUser.username);

    if (userDetails) {
        // Cập nhật thông tin hiển thị
        document.getElementById('username').value = userDetails.username;
        document.getElementById('email').value = userDetails.email;
        document.getElementById('joinDate').textContent = new Date(userDetails.joinDate).toLocaleDateString('vi-VN');
        document.getElementById('currentBalance').textContent = userDetails.balance.toLocaleString('vi-VN') + ' VNĐ';

        // Load avatar
        const savedAvatar = localStorage.getItem(`avatar_${userDetails.username}`);
        if (savedAvatar) {
            document.getElementById('userAvatar').src = savedAvatar;
        }

        // Load giao dịch
        const transactions = JSON.parse(localStorage.getItem('transactions') || '{}');
        const userTransactions = transactions[userDetails.username] || [];
        document.getElementById('totalTransactions').textContent = userTransactions.length;
    }
});

// Hàm hiển thị thông báo
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    const container = document.querySelector('.profile-container');
    container.insertBefore(alertDiv, container.firstChild);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
} 