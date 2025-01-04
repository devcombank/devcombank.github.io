const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let image = null;

// Cấu hình các vị trí text
const TEXT_POSITIONS = [
    { x: 100, y: 50 },
    { x: 100, y: 100 },
    { x: 100, y: 150 },
    { x: 100, y: 200 },
    { x: 100, y: 250 },
    { x: 100, y: 300 },
    { x: 100, y: 350 },
    { x: 100, y: 400 },
    { x: 100, y: 450 },
    { x: 100, y: 500 }
];

// Cấu hình text
const TEXT_CONFIG = {
    fontSize: 24,
    fontFamily: 'Arial',
    color: '#000000'
};

// Tải hình ảnh mặc định
function loadDefaultImage() {
    image = new Image();
    image.onload = function() {
        // Thiết lập kích thước cố định cho canvas
        canvas.width = 1280;
        canvas.height = 960;
        // Vẽ ảnh với kích thước mới
        ctx.drawImage(image, 0, 0, 1280, 960);
    }
    // Thay đổi đường dẫn này thành đường dẫn tới hình ảnh mặc định của bạn
    image.src = 'https://photos.app.goo.gl/dsckP74rg5mG44j98';
}

// Khởi tạo ngay khi trang web load
loadDefaultImage();

// Vẽ text lên ảnh
function drawTexts() {
    if (!image) return;
    
    // Vẽ lại ảnh gốc
    ctx.drawImage(image, 0, 0);
    
    // Cấu hình font
    ctx.font = `${TEXT_CONFIG.fontSize}px ${TEXT_CONFIG.fontFamily}`;
    ctx.fillStyle = TEXT_CONFIG.color;
    
    // Lấy tất cả các input
    const inputs = document.querySelectorAll('.textInput');
    
    // Vẽ từng dòng text
    inputs.forEach((input, index) => {
        const text = input.value;
        if (text && TEXT_POSITIONS[index]) {
            ctx.fillText(text, TEXT_POSITIONS[index].x, TEXT_POSITIONS[index].y);
        }
    });
}

// Xử lý nút xem trước
document.getElementById('addText').addEventListener('click', drawTexts);

// Xử lý nút tải ảnh
document.getElementById('downloadBtn').addEventListener('click', function() {
    // Hiện canvas khi nhấn nút tải
    canvas.style.display = 'block';
    
    // Vẽ text và xử lý tải ảnh
    drawTexts();
    
    // Tự động tải ảnh
    const link = document.createElement('a');
    link.download = 'cccd.png';
    link.href = canvas.toDataURL();
    link.click();
    
    // Ẩn canvas lại sau khi tải xong
    setTimeout(() => {
        canvas.style.display = 'none';
    }, 100);
});

// Xử lý modal nạp tiền
function showDepositModal() {
    const modal = document.getElementById('depositModal');
    modal.style.display = 'block';
}

// Đóng modal khi click vào nút X
document.querySelector('.close-modal').onclick = function() {
    document.getElementById('depositModal').style.display = 'none';
}

// Đóng modal khi click bên ngoài
window.onclick = function(event) {
    const modal = document.getElementById('depositModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Xử lý khi click vào các nút số tiền
document.querySelectorAll('.amount-btn').forEach(button => {
    button.addEventListener('click', function() {
        const amount = this.getAttribute('data-amount');
        // Có thể thêm xử lý khi người dùng chọn số tiền
        alert('Vui lòng chuyển khoản số tiền: ' + Number(amount).toLocaleString('vi-VN') + 'đ');
    });
}); 
