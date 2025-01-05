document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('paymentModal');
    const customAmountInput = document.getElementById('customAmount');
    const presetButtons = document.querySelectorAll('.preset-btn');
    let currentAmount = 50000;

    const supportedBanks = [
        'MB Bank',
        'Techcombank',
        'Vietcombank',
        'TPBank',
        'ACB',
        'BIDV'
    ];

    // Mở modal khi click nút nạp tiền
    document.querySelector('.deposit-button').addEventListener('click', function() {
        modal.style.display = 'block';
        updateQRCodes();
    });

    // Đóng modal
    document.querySelector('.modal-close').addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Xử lý input số tiền
    customAmountInput.addEventListener('input', function() {
        let value = parseInt(this.value);
        if (value < 10000) {
            value = 10000;
            this.value = value;
        }
        currentAmount = value;
        updateQRCodes();
        presetButtons.forEach(btn => btn.classList.remove('active'));
    });

    // Xử lý preset buttons
    presetButtons.forEach(button => {
        button.addEventListener('click', function() {
            const amount = parseInt(this.dataset.amount);
            customAmountInput.value = amount;
            currentAmount = amount;
            updateQRCodes();
            
            presetButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Tạo QR Codes
    function updateQRCodes() {
        const accountNumber = '9999999999';
        const accountName = 'HOANG THIEN TUNG';
        const transferId = document.getElementById('transferContent').textContent;
        
        // QR cho LIO Bank
        const qrContent = `bank_transfer://account=${accountNumber}&amount=${currentAmount}&content=${transferId}&name=${accountName}`;
        
        const qrContainer = document.getElementById('qrcode-lio');
        qrContainer.innerHTML = '';
        
        new QRCode(qrContainer, {
            text: qrContent,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    }

    // Copy to clipboard
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.dataset.copy;
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalIcon = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    button.innerHTML = originalIcon;
                }, 2000);
            });
        });
    });

    // Download QR
    document.querySelectorAll('.download-qr').forEach(button => {
        button.addEventListener('click', function() {
            const qrImage = this.parentElement.querySelector('.qr-code img');
            if (qrImage) {
                const link = document.createElement('a');
                link.download = `payment-qr-${currentAmount}.png`;
                link.href = qrImage.src;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        });
    });
}); 