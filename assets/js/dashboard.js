document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra đăng nhập
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'auth.html';
        return;
    }

    // Hiển thị thông tin người dùng
    document.getElementById('userName').textContent = currentUser.username;
    document.getElementById('userBalance').textContent = currentUser.balance.toLocaleString('vi-VN');

    // Lấy danh sách giao dịch của user từ localStorage
    const allTransactions = JSON.parse(localStorage.getItem('transactions') || '{}');
    const userTransactions = allTransactions[currentUser.username] || [];

    // Hiển thị danh sách giao dịch
    const transactionList = document.getElementById('transactionList');
    if (userTransactions.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'Chưa có giao dịch nào';
        li.className = 'no-transactions';
        transactionList.appendChild(li);
    } else {
        userTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
        userTransactions.forEach(transaction => {
            const li = document.createElement('li');
            li.textContent = `${transaction.date} - ${transaction.type}: ${transaction.amount.toLocaleString('vi-VN')} VNĐ`;
            transactionList.appendChild(li);
        });
    }

    // Vẽ biểu đồ giao dịch
    const ctx = document.getElementById('transactionChart').getContext('2d');
    
    // Tính toán dữ liệu cho biểu đồ
    const monthlyData = calculateMonthlyData(userTransactions);
    
    const transactionChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: monthlyData.labels,
            datasets: [{
                label: 'Giao dịch (VNĐ)',
                data: monthlyData.values,
                borderColor: '#6c72cb',
                backgroundColor: 'rgba(108, 114, 203, 0.2)',
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString('vi-VN') + ' VNĐ';
                        }
                    }
                }
            }
        }
    });

    // Xử lý đăng xuất
    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        window.location.href = 'auth.html';
    });
});

// Hàm tính toán dữ liệu theo tháng cho biểu đồ
function calculateMonthlyData(transactions) {
    const monthlyTotals = {};
    const months = [];
    const values = [];

    // Lấy 6 tháng gần nhất
    for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const monthKey = `${date.getMonth() + 1}/${date.getFullYear()}`;
        monthlyTotals[monthKey] = 0;
        months.push(`Tháng ${date.getMonth() + 1}`);
    }

    // Tính tổng giao dịch theo tháng
    transactions.forEach(transaction => {
        const date = new Date(transaction.date);
        const monthKey = `${date.getMonth() + 1}/${date.getFullYear()}`;
        if (monthlyTotals[monthKey] !== undefined) {
            monthlyTotals[monthKey] += transaction.amount;
        }
    });

    // Chuyển đổi dữ liệu cho biểu đồ
    Object.values(monthlyTotals).forEach(total => {
        values.push(total);
    });

    return {
        labels: months,
        values: values
    };
}

function addTransaction(username, type, amount) {
    // Lấy danh sách giao dịch hiện tại
    const allTransactions = JSON.parse(localStorage.getItem('transactions') || '{}');
    if (!allTransactions[username]) {
        allTransactions[username] = [];
    }

    // Thêm giao dịch mới
    const transaction = {
        date: new Date().toLocaleDateString('vi-VN'),
        type: type,
        amount: amount
    };
    allTransactions[username].push(transaction);

    // Lưu lại vào localStorage
    localStorage.setItem('transactions', JSON.stringify(allTransactions));

    // Cập nhật số dư
    const users = JSON.parse(localStorage.getItem('users'));
    const userIndex = users.findIndex(u => u.username === username);
    if (userIndex !== -1) {
        if (type === 'Nạp tiền') {
            users[userIndex].balance += amount;
        } else if (type === 'Rút tiền') {
            users[userIndex].balance -= amount;
        }
        localStorage.setItem('users', JSON.stringify(users));

        // Cập nhật currentUser
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        currentUser.balance = users[userIndex].balance;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }

    // Reload trang để cập nhật dữ liệu
    location.reload();
} 