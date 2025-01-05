document.addEventListener('DOMContentLoaded', function() {
    const authForm = document.getElementById('authForm');
    
    authForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Lấy danh sách users từ localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Tìm user trong danh sách
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            // Lưu thông tin đăng nhập
            localStorage.setItem('currentUser', JSON.stringify({
                username: user.username,
                email: user.email,
                balance: user.balance
            }));
            
            alert('Đăng nhập thành công!');
            window.location.href = 'dashboard.html';
        } else {
            alert('Tên đăng nhập hoặc mật khẩu không đúng!');
        }
    });
}); 