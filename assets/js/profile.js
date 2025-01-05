import userService from './services/userService.js';

class ProfileManager {
    constructor() {
        console.log("ProfileManager initialized");
        this.init();
    }

    async init() {
        try {
            console.log("Initializing profile...");
            const state = await userService.checkInitialState();
            console.log("Profile state:", state);

            if (!state.isAuthenticated) {
                console.log("User not authenticated, showing auth forms");
                this.showAuthForms();
            } else {
                console.log("User authenticated, showing profile");
                await this.showUserProfile();
            }
        } catch (error) {
            console.error("Profile initialization error:", error);
            this.showError('Không thể tải thông tin profile');
        }
    }

    showAuthForms() {
        console.log("Rendering auth forms");
        const profileContainer = document.querySelector('.profile-container');
        profileContainer.innerHTML = `
            <div class="auth-section">
                <div class="auth-header">
                    <h2>Đăng Nhập / Đăng Ký</h2>
                    <p>Vui lòng đăng nhập hoặc đăng ký để tiếp tục</p>
                </div>
                <div class="auth-forms">
                    <div class="login-form">
                        <h3>Đăng Nhập</h3>
                        <form id="loginForm">
                            <input type="email" placeholder="Email" required>
                            <input type="password" placeholder="Mật khẩu" required>
                            <button type="submit">Đăng Nhập</button>
                        </form>
                    </div>
                    <div class="auth-divider">
                        <span>hoặc</span>
                    </div>
                    <div class="register-form">
                        <h3>Đăng Ký</h3>
                        <form id="registerForm">
                            <input type="email" placeholder="Email" required>
                            <input type="text" placeholder="Tên người dùng" required>
                            <input type="password" placeholder="Mật khẩu" required>
                            <input type="password" placeholder="Xác nhận mật khẩu" required>
                            <button type="submit">Đăng Ký</button>
                        </form>
                    </div>
                </div>
            </div>
        `;

        this.initializeAuthListeners();
    }

    async showUserProfile() {
        console.log("Rendering user profile");
        try {
            const userData = await userService.getCurrentUser();
            const profileContainer = document.querySelector('.profile-container');
            
            // Hiển thị thông tin profile như trong mẫu
            profileContainer.innerHTML = `
                <div class="profile-header">
                    <div class="profile-cover"></div>
                    <div class="profile-info">
                        <div class="profile-avatar">
                            <img src="${userData.avatar || 'assets/images/avatar-default.png'}" alt="Avatar">
                        </div>
                        <div class="profile-name">
                            <h1>${userData.username}</h1>
                            <span class="membership-badge ${userData.membership.type.toLowerCase()}">
                                <i class="fas fa-crown"></i> ${userData.membership.type} Member
                            </span>
                        </div>
                    </div>
                </div>
                <!-- Các tab thông tin khác giữ nguyên như profile.html -->
            `;
        } catch (error) {
            console.error('Lỗi khi tải profile:', error);
            this.showError('Không thể tải thông tin profile');
        }
    }

    initializeAuthListeners() {
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            // Xử lý đăng nhập
        });

        document.getElementById('registerForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            // Xử lý đăng ký
        });
    }
}

// Initialize ProfileManager
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded, initializing ProfileManager...");
    new ProfileManager();
}); 