// Biến toàn cục
let currentAmount = 0;

// Mở modal nạp tiền
function openDepositModal() {
    document.getElementById('depositModal').style.display = 'block';
}

// Đóng modal nạp tiền
function closeDepositModal() {
    document.getElementById('depositModal').style.display = 'none';
}

// Format số tiền
function formatAmount(input) {
    // Xóa tất cả ký tự không phải số
    let value = input.value.replace(/\D/g, '');
    
    // Format số với dấu phẩy
    value = new Intl.NumberFormat('vi-VN').format(value);
    
    // Cập nhật giá trị input
    input.value = value;
    
    // Enable/disable nút tạo hóa đơn
    currentAmount = parseInt(value.replace(/\D/g, ''));
    document.getElementById('createBill').disabled = currentAmount < 50000;
}

// Chọn số tiền nhanh
function selectAmount(amount) {
    document.getElementById('amount').value = new Intl.NumberFormat('vi-VN').format(amount);
    currentAmount = amount;
    document.getElementById('createBill').disabled = false;
}

// Hiển thị thông tin thanh toán
function showBankInfo() {
    // Cập nhật số tiền
    document.getElementById('finalAmount').textContent = 
        new Intl.NumberFormat('vi-VN').format(currentAmount) + ' VNĐ';
    
    // Ẩn modal nạp tiền
    document.getElementById('depositModal').style.display = 'none';
    
    // Hiện thông tin thanh toán
    document.getElementById('bankInfo').style.display = 'block';
}

// Copy text
function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        showCopySuccess();
    });
}

// Copy số tiền
function copyAmount() {
    copyText(currentAmount.toString());
}

// Hiển thị thông báo copy thành công
function showCopySuccess() {
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = 'Đã sao chép!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Tải QR Code
function downloadQR() {
    const link = document.createElement('a');
    link.href = document.getElementById('qrImage').src;
    link.download = 'qr-code.png';
    link.click();
}

// Đóng modal khi click ngoài
window.onclick = function(event) {
    if (event.target.className === 'modal') {
        event.target.style.display = 'none';
    }
}
