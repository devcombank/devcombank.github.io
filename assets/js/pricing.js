document.addEventListener('DOMContentLoaded', function() {
    const customAmountInput = document.getElementById('customAmount');
    const presetButtons = document.querySelectorAll('.preset-btn');
    const qrContainer = document.getElementById('modal-qrcode');
    let currentAmount = 50000;

    // Xử lý input số tiền tùy chỉnh
    customAmountInput.addEventListener('input', function() {
        let value = parseInt(this.value);
        if (value < 10000) {
            value = 10000;
            this.value = value;
        }
        currentAmount = value;
        updateQRCode();
        // Remove active class from preset buttons
        presetButtons.forEach(btn => btn.classList.remove('active'));
    });

    // Xử lý preset buttons
    presetButtons.forEach(button => {
        button.addEventListener('click', function() {
            const amount = parseInt(this.dataset.amount);
            customAmountInput.value = amount;
            currentAmount = amount;
            updateQRCode();
            
            // Update active state
            presetButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Tạo QR Code
    function updateQRCode() {
        const accountNumber = '9999999999';
        const accountName = 'HOANG THIEN TUNG';
        const transferId = document.getElementById('transferContent').textContent;
        
        // Format theo chuẩn QR Pay VietQR
        const qrContent = `bank_transfer://account=${accountNumber}&amount=${currentAmount}&content=${transferId}&name=${accountName}`;
        
        // Xóa QR code cũ nếu có
        qrContainer.innerHTML = '';
        
        // Tạo QR code mới
        new QRCode(qrContainer, {
            text: qrContent,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    }

    // Download QR Code
    document.querySelector('.btn-download-qr').addEventListener('click', function() {
        const qrImage = qrContainer.querySelector('img');
        if (qrImage) {
            const link = document.createElement('a');
            link.download = `qr-payment-${currentAmount}.png`;
            link.href = qrImage.src;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    });

    // Initialize QR Code
    updateQRCode();
}); 