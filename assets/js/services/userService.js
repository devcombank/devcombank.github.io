class UserService {
    constructor() {
        this.API_URL = '/api';
        console.log("UserService initialized");
    }

    async checkInitialState() {
        console.log("Checking initial state...");
        const token = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('user_data');

        if (!token || !userData) {
            console.log("No auth data found");
            return {
                isAuthenticated: false,
                balance: 0,
                showAuthButtons: true
            };
        }

        try {
            const user = JSON.parse(userData);
            console.log("User data found:", user);
            return {
                isAuthenticated: true,
                balance: user.stats?.balance || 0,
                showAuthButtons: false
            };
        } catch (error) {
            console.error("Error parsing user data:", error);
            return {
                isAuthenticated: false,
                balance: 0,
                showAuthButtons: true
            };
        }
    }

    isLoggedIn() {
        const isLoggedIn = !!localStorage.getItem('auth_token');
        console.log("Checking login status:", isLoggedIn);
        return isLoggedIn;
    }

    async getCurrentUser() {
        console.log("Getting current user...");
        const userData = localStorage.getItem('user_data');
        
        if (!userData) {
            console.log("No user data found");
            throw new Error('Không tìm thấy thông tin người dùng');
        }

        try {
            return JSON.parse(userData);
        } catch (error) {
            console.error("Error parsing user data:", error);
            throw error;
        }
    }

    dispatchAuthEvent(type) {
        console.log("Dispatching auth event:", type);
        document.dispatchEvent(new CustomEvent('authStateChange', {
            detail: { type }
        }));
    }

    dispatchBalanceUpdate(balance) {
        console.log("Dispatching balance update:", balance);
        document.dispatchEvent(new CustomEvent('balanceUpdate', {
            detail: { balance }
        }));
    }
}

// Export single instance
const userService = new UserService();
export default userService; 