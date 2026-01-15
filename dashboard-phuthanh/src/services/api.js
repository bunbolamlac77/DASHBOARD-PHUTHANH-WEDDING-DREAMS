// src/services/api.js

// ⚠️ QUAN TRỌNG: Thay dòng bên dưới bằng Link thật của bạn
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbylcm-D5CGZG7Xr3Cyn9ObLynrrajBCQGLgvEafR9tDVQ-ceTqOeYC3LoHsqMEAnHSQjA/exec"; 

export const createNewShow = async (data) => {
    try {
        console.log("Sending API Request to:", WEB_APP_URL);
        const response = await fetch(WEB_APP_URL, {
            method: 'POST',
            // mode: 'no-cors',  <-- BỎ dòng này để dùng CORS chuẩn, giúp gửi được Header JSON
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({ action: 'addShow', payload: data })
        });

        const text = await response.text();
        console.log("Add Show Response:", text);

        try {
             const result = JSON.parse(text);
             if(result.status === 'success') {
                 return true;
             } else {
                 console.error("API Error Result:", result);
                 throw new Error(result.message || "Lỗi không xác định");
             }
        } catch (e) {
            // Nếu không phải JSON (VD: lỗi HTML), log ra
            console.error("Non-JSON Response from Add Show:", text);
            // Nếu là no-cors cũ thì không đọc được text, nhưng giờ bỏ no-cors rồi
            // Tuy nhiên nếu server không trả header CORS, thì fetch sẽ throw lỗi "Failed to fetch"
            // Nếu vậy user cần chỉnh App Script "Who has access" = "Anyone"
            throw e;
        }

    } catch (error) {
        console.error("API Add Show Network Error:", error);
        throw error;
    }
};

// 👇 Thêm hàm này để lấy danh sách Show cho trang CustomerList
export const getShows = async () => {
    try {
        console.log("Fetching shows from:", `${WEB_APP_URL}?action=getShows`);
        const response = await fetch(`${WEB_APP_URL}?action=getShows`);
        
        // Đọc raw text trước để debug lỗi HTML (thường do quyền truy cập hoặc Script Crash)
        const text = await response.text();
        console.log("API Raw Response:", text);

        // Kiểm tra sơ bộ xem có phải HTML báo lỗi không
        if (text.trim().startsWith("<!DOCTYPE") || text.includes("<html")) {
             console.error("API returned HTML instead of JSON. Check 'Who has access' or Script Errors.");
             throw new Error("Lỗi Server (HTML Response): Vui lòng kiểm tra quyền truy cập hoặc Log của Apps Script.");
        }

        let result;
        try {
            result = JSON.parse(text);
        } catch (e) {
            console.error("JSON Parse Error:", e);
            throw new Error("Dữ liệu trả về không đúng định dạng JSON.");
        }

        if(result.status === 'success') {
            console.log("Data received:", result.data);
            return result.data;
        } else {
            console.error("API returned error status:", result);
            throw new Error(result.message || "Lỗi API không xác định");
        }
    } catch (error) {
        console.error("Lỗi lấy danh sách:", error);
        throw error; // Ném lỗi ra ngoài để Component xử lý
    }
};

// ⚠️ BACKWARD COMPATIBILITY: Giữ lại object api để tránh lỗi import cũ
export const api = {
    getShows,
    addShow: createNewShow
};
