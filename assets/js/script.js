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

// Xử lý hiển thị phần nạp tiền
document.addEventListener('DOMContentLoaded', function() {
    // Lấy reference đến modal
    const pricingModal = document.getElementById('pricingModal');
    
    // Xử lý click vào nút nạp tiền
    document.querySelector('a[href="#pricing"]').addEventListener('click', function(e) {
        e.preventDefault(); // Ngăn chặn chuyển trang
        pricingModal.classList.add('active'); // Thêm class active để hiển thị
        document.body.style.overflow = 'hidden'; // Ngăn scroll
    });

    // Xử lý đóng modal
    const closeModal = document.querySelector('.modal-close');
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            pricingModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Đóng modal khi click bên ngoài
    window.addEventListener('click', function(e) {
        if (e.target === pricingModal) {
            pricingModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Đóng modal khi nhấn ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && pricingModal.classList.contains('active')) {
            pricingModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Xử lý tạo bill
function createBill(bankName) {
    // Thêm logic xử lý tạo bill ở đây
    console.log(`Creating bill for ${bankName}`);
    // Có thể mở modal hoặc chuyển hướng đến trang tạo bill
}

// Copy to clipboard function
document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', () => {
        const textToCopy = button.dataset.copy;
        navigator.clipboard.writeText(textToCopy).then(() => {
            // Show success feedback
            const originalIcon = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                button.innerHTML = originalIcon;
            }, 2000);
        });
    });
});

// Generate QR Codes
window.addEventListener('load', () => {
    // MB Bank QR
    new QRCode(document.getElementById('qrcode-mb'), {
        text: 'MB Bank: 9999999999\nHOANG THIEN TUNG\nVLID123456',
        width: 180,
        height: 180
    });

    // MoMo QR
    new QRCode(document.getElementById('qrcode-momo'), {
        text: 'MoMo: 0987654321\nHOANG THIEN TUNG',
        width: 180,
        height: 180
    });
});

// Download QR Code
document.querySelectorAll('.download-qr').forEach(button => {
    button.addEventListener('click', function() {
        const qrImage = this.previousElementSibling.querySelector('img');
        if (qrImage) {
            const link = document.createElement('a');
            link.download = 'qr-code.png';
            link.href = qrImage.src;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    });
});

// Xử lý hiển thị modal khi chọn gói
function showPaymentMethods(plan) {
    const modal = document.getElementById('paymentModal');
    const planInfo = {
        basic: { name: 'Gói Cơ Bản', amount: '50.000' },
        premium: { name: 'Gói Premium', amount: '100.000' },
        pro: { name: 'Gói Pro', amount: '250.000' }
    };

    // Cập nhật thông tin gói được chọn
    document.querySelector('.selected-plan').textContent = planInfo[plan].name;
    document.querySelector('.selected-amount').textContent = planInfo[plan].amount;

    // Tạo QR code mới
    const qrContainer = document.getElementById('modal-qrcode');
    qrContainer.innerHTML = ''; // Xóa QR code cũ
    
    const qrText = `MB BANK
STK: 9999999999
CTK: HOANG THIEN TUNG
ND: VLID123456
SO TIEN: ${planInfo[plan].amount} VND`;

    new QRCode(qrContainer, {
        text: qrText,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    // Hiển thị modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Đóng modal
document.querySelector('.modal-close').addEventListener('click', () => {
    document.getElementById('paymentModal').classList.remove('active');
    document.body.style.overflow = '';
});

// Click bên ngoài để đóng modal
window.addEventListener('click', (e) => {
    const modal = document.getElementById('paymentModal');
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Copy to clipboard với animation
document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', () => {
        const textToCopy = button.dataset.copy;
        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalIcon = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i>';
            button.style.color = '#2ecc71';
            
            setTimeout(() => {
                button.innerHTML = originalIcon;
                button.style.color = '';
            }, 2000);
        });
    });
});
