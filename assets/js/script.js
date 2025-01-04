document.addEventListener('DOMContentLoaded', function() {
    // Các elements
    const openDepositBtn = document.getElementById('openDepositBtn');
    const depositModal = document.getElementById('depositModal');
    const closeModal = document.querySelector('.close-modal');
    const customAmount = document.getElementById('customAmount');
    const createInvoiceBtn = document.getElementById('createInvoiceBtn');
    const invoiceDetails = document.getElementById('invoiceDetails');
    const suggestBtns = document.querySelectorAll('.suggest-btn');

    // Mở modal
    openDepositBtn.addEventListener('click', function() {
        depositModal.style.display = 'block';
        setTimeout(() => {
            depositModal.classList.add('show-modal');
        }, 10);
    });

    // Đóng modal
    function closeDepositModal() {
        depositModal.classList.remove('show-modal');
        setTimeout(() => {
            depositModal.style.display = 'none';
        }, 300);
    }

    closeModal.addEventListener('click', closeDepositModal);

    // Đóng khi click outside
    window.addEventListener('click', function(e) {
        if (e.target === depositModal) {
            closeDepositModal();
        }
    });

    // Format số tiền
    customAmount.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value && value < 10000) {
            value = '10000';
        }

        if (value) {
            const formattedValue = parseInt(value).toLocaleString('vi-VN');
            e.target.value = formattedValue;
            createInvoiceBtn.disabled = false;
        } else {
            createInvoiceBtn.disabled = true;
        }

        // Log để debug
        console.log('Current value:', e.target.value);
    });

    // Gợi ý số tiền
    suggestBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const amount = parseInt(this.dataset.amount);
            customAmount.value = amount.toLocaleString('vi-VN');
            createInvoiceBtn.disabled = false;
            
            // Log để debug
            console.log('Suggested amount:', amount);
        });
    });

    // Tạo hóa đơn
    createInvoiceBtn.addEventListener('click', function() {
        const amount = customAmount.value.replace(/\D/g, '');
        const invoiceAmount = document.getElementById('invoiceAmount');
        
        invoiceAmount.textContent = parseInt(amount).toLocaleString('vi-VN') + ' VNĐ';
        
        const amountCopyBtn = invoiceAmount.nextElementSibling;
        amountCopyBtn.setAttribute('data-copy', amount);

        invoiceDetails.classList.remove('hidden');
        invoiceDetails.classList.add('show');

        // Log để debug
        console.log('Creating invoice for amount:', amount);
    });

    // Copy buttons
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', async function() {
            const textToCopy = this.getAttribute('data-copy');
            try {
                await navigator.clipboard.writeText(textToCopy);
                showCopySuccess(this);
                
                // Log để debug
                console.log('Copied text:', textToCopy);
            } catch (err) {
                console.error('Copy failed:', err);
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