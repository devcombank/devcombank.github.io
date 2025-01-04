document.addEventListener('DOMContentLoaded', function() {
    const customAmount = document.getElementById('customAmount');
    const createInvoiceBtn = document.getElementById('createInvoiceBtn');
    const invoiceDetails = document.getElementById('invoiceDetails');
    const suggestBtns = document.querySelectorAll('.suggest-btn');
    const invoiceAmount = document.getElementById('invoiceAmount');

    // Format số tiền khi nhập
    customAmount.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        // Kiểm tra giá trị tối thiểu
        if (value && value < 10000) {
            value = '10000';
        }

        // Format số với dấu phẩy
        if (value) {
            const formattedValue = parseInt(value).toLocaleString('vi-VN');
            e.target.value = formattedValue;
            
            // Enable/disable nút tạo hóa đơn
            createInvoiceBtn.disabled = false;
        } else {
            createInvoiceBtn.disabled = true;
        }
    });

    // Xử lý các nút gợi ý số tiền
    suggestBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const amount = parseInt(this.dataset.amount);
            customAmount.value = amount.toLocaleString('vi-VN');
            createInvoiceBtn.disabled = false;
        });
    });

    // Tạo hóa đơn
    createInvoiceBtn.addEventListener('click', function() {
        // Lấy số tiền đã nhập
        const amount = customAmount.value.replace(/\D/g, '');
        
        // Cập nhật số tiền trong hóa đơn
        invoiceAmount.textContent = parseInt(amount).toLocaleString('vi-VN') + ' VNĐ';
        
        // Cập nhật data-copy cho nút copy số tiền
        const amountCopyBtn = invoiceAmount.nextElementSibling;
        amountCopyBtn.setAttribute('data-copy', amount);

        // Hiển thị thông tin hóa đơn
        invoiceDetails.classList.remove('hidden');
        invoiceDetails.classList.add('show');

        // Tạo QR code (giả định)
        generateQRCode(amount);
    });

    // Xử lý copy thông tin
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', async function() {
            const textToCopy = this.getAttribute('data-copy');
            try {
                await navigator.clipboard.writeText(textToCopy);
                showCopySuccess(this);
            } catch (err) {
                console.error('Copy failed', err);
            }
        });
    });
});

// Hiển thị thông báo copy thành công
function showCopySuccess(button) {
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i>';
    button.classList.add('copied');
    
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.classList.remove('copied');
    }, 1500);
}

// Tạo QR Code (giả định)
function generateQRCode(amount) {
    // Thêm logic tạo QR code thực tế ở đây
    const qrCode = document.getElementById('qrCode');
    // Giả định: Cập nhật src của QR code
    qrCode.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=NAP_VL123456_${amount}`;
}
