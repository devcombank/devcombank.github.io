document.addEventListener('DOMContentLoaded', () => {
    const depositModal = document.getElementById('depositModal');
    const openDepositBtn = document.getElementById('openDepositBtn');
    const closeModalBtn = document.querySelector('.close-modal');
    const amountInput = document.getElementById('customAmount');
    const amountBtns = document.querySelectorAll('.amount-btn');
    const copyBtns = document.querySelectorAll('.copy-btn');
    
    // Mở/đóng modal
    openDepositBtn?.addEventListener('click', () => {
        depositModal.classList.add('active');
    });
    
    closeModalBtn?.addEventListener('click', () => {
        depositModal.classList.remove('active');
    });
    
    // Đóng khi click ngoài
    depositModal?.addEventListener('click', (e) => {
        if (e.target === depositModal) {
            depositModal.classList.remove('active');
        }
    });
    
    // Xử lý nút chọn số tiền nhanh
    amountBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const amount = btn.dataset.amount;
            amountInput.value = formatMoney(amount);
            amountBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    
    // Xử lý copy thông tin
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.dataset.copy;
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Hiệu ứng khi copy thành công
                btn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    btn.innerHTML = '<i class="far fa-copy"></i>';
                }, 2000);
            });
        });
    });
    
    // Format tiền
    function formatMoney(amount) {
        return new Intl.NumberFormat('vi-VN').format(amount);
    }
});
