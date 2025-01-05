document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Email không hợp lệ!');
            return;
        }

        // Kiểm tra xem username đã tồn tại chưa
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.some(user => user.username === username)) {
            alert('Tên đăng nhập đã tồn tại!');
            return;
        }

        // Thêm user mới vào danh sách
        users.push({
            username,
            email,
            password,
            balance: 0 // Số dư ban đầu
        });

        // Lưu danh sách users vào localStorage
        localStorage.setItem('users', JSON.stringify(users));

        alert('Đăng ký thành công!');
        window.location.href = 'auth.html';
    });
}); 