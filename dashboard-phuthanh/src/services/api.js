const API_URL = import.meta.env.VITE_API_URL;

// Hàm gửi request chung (để tái sử dụng)
const sendRequest = async (action, method = 'GET', payload = null) => {
    try {
        // Vì Google Apps Script chuyển hướng 302, ta dùng fetch mặc định
        // Với POST, Google yêu cầu gửi text string thay vì JSON thuần
        const options = {
            method: method,
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        };

        if (payload) {
            options.body = JSON.stringify({ action, payload });
        }

        // Xây dựng URL: GET thì thêm tham số vào đuôi link
        const endpoint = method === 'GET' 
            ? `${API_URL}?action=${action}` 
            : API_URL;

        const response = await fetch(endpoint, options);
        const result = await response.json();
        
        return result;
    } catch (error) {
        console.error("API Error:", error);
        return { status: 'error', message: 'Lỗi kết nối Server' };
    }
};

export const api = {
    // Lấy danh sách Show
    getShows: () => sendRequest('getShows'),
    
    // Lấy bảng giá
    getServices: () => sendRequest('getServices'),
    
    // Tạo Show mới
    addShow: (data) => sendRequest('addShow', 'POST', data)
};
