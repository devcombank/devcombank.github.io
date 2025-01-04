// Xử lý scroll header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Xử lý active menu item
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Xử lý mobile menu
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Đóng menu khi click outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav') && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// Tạo QR Code
function generateQRCode() {
    const qrContainer = document.getElementById('qrcode');
    if (qrContainer) {
        // Xóa QR code cũ nếu có
        qrContainer.innerHTML = '';
        
        // Thông tin chuyển khoản
        const bankInfo = {
            accountNumber: "0123456789",
            accountName: "NGUYEN VAN A",
            bankName: "MB BANK",
            amount: "100000",
            content: "VLID123456"
        };

        // Tạo chuỗi thông tin cho QR
        const qrText = `Chuyển khoản:
        STK: ${bankInfo.accountNumber}
        Tên: ${bankInfo.accountName}
        NH: ${bankInfo.bankName}
        ND: ${bankInfo.content}`;

        // Tạo QR code
        new QRCode(qrContainer, {
            text: qrText,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    }
}

// Tải QR code
document.querySelector('.btn-copy-code').addEventListener('click', function() {
    const qrImage = document.querySelector('#qrcode img');
    if (qrImage) {
        // Tạo link tải
        const link = document.createElement('a');
        link.download = 'qr-code.png';
        link.href = qrImage.src;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});

// Gọi hàm tạo QR khi trang load
window.addEventListener('load', generateQRCode);
