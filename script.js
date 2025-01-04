// Khởi tạo các biến
const depositBtn = document.querySelector('.deposit-btn');
const depositModal = document.getElementById('depositModal');
const closeModal = document.querySelector('.close-modal');
const amountBtns = document.querySelectorAll('.amount-btn');
const customAmount = document.getElementById('customAmount');
const copyBtns = document.querySelectorAll('.copy-btn');

// Mở modal
function openDepositModal() {
    depositModal.classList.add('show-modal');
    document.body.style.overflow = 'hidden';
}

// Đóng modal
function closeDepositModal() {
    depositModal.classList.remove('show-modal');
    document.body.style.overflow = 'auto';
}

// Event listeners
depositBtn.addEventListener('click', openDepositModal);
closeModal.addEventListener('click', closeDepositModal);

// Đóng modal khi click bên ngoài
window.addEventListener('click', (e) => {
    if (e.target === depositModal) {
        closeDepositModal();
    }
});

// Xử lý các nút số tiền
amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Xóa active class từ tất cả các nút
        amountBtns.forEach(b => b.classList.remove('active'));
        // Thêm active class cho nút được chọn
        btn.classList.add('active');
        // Clear input số tiền tùy chọn
        customAmount.value = '';
        
        // Animation khi chọn
        btn.classList.add('clicked');
        setTimeout(() => btn.classList.remove('clicked'), 200);
    });
});

// Xử lý copy
copyBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
        const textToCopy = btn.getAttribute('data-copy');
        try {
            await navigator.clipboard.writeText(textToCopy);
            
            // Hiệu ứng khi copy thành công
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i>';
            btn.classList.add('copied');
            
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.classList.remove('copied');
            }, 1500);
        } catch (err) {
            console.error('Copy failed', err);
        }
    });
});

// Format số tiền
customAmount.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value) {
        // Đảm bảo là bội số của 10,000
        value = Math.floor(value / 10000) * 10000;
        // Set giá trị tối thiểu
        if (value < 10000) value = 10000;
        // Format với dấu phẩy
        e.target.value = value.toLocaleString('vi-VN');
    }
});
