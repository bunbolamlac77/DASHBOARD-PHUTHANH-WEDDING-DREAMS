// src/services/api.js

// ⚠️ QUAN TRỌNG: Lấy link từ biến môi trường (.env.local)
const WEB_APP_URL = import.meta.env.VITE_API_URL;

if (!WEB_APP_URL) {
    console.error("❌ LỖI: Chưa cấu hình VITE_API_URL trong file .env.local");
} 

// Helper: Validate API Config
const ensureApiConfig = () => {
    if (!WEB_APP_URL) {
        throw new Error("Lỗi cấu hình: Không tìm thấy API URL. Hãy kiểm tra file .env.local");
    }
};

export const createNewShow = async (data) => {
    try {
        ensureApiConfig();
        console.log("Sending API Request to:", WEB_APP_URL);
        
        const response = await fetch(WEB_APP_URL, {
            method: 'POST',
            redirect: 'follow', // Quan trọng cho Apps Script
            headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // Apps Script thích text/plain hơn
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
                 throw new Error(result.message || "Lỗi xử lý từ máy chủ (Server Error)");
             }
        } catch (e) {
            console.error("Non-JSON Response from Add Show:", text);
            // Check for common HTML error pages from Google
            if (text.includes("<!DOCTYPE html>")) {
                throw new Error("Lỗi kết nối: Server trả về HTML thay vì JSON. Kiểm tra lại Deployment ID và quyền truy cập 'Anyone'.");
            }
            throw new Error("Lỗi kết nối: Server trả về dữ liệu không hợp lệ.");
        }

    } catch (error) {
        console.error("API Add Show Network Error:", error);
        throw error;
    }
};

// 👇 Hàm lấy danh sách Show cho trang CustomerList
export const getShows = async () => {
    try {
        ensureApiConfig();
        console.log("Fetching shows from:", `${WEB_APP_URL}?action=getShows`);
        
        const response = await fetch(`${WEB_APP_URL}?action=getShows`, {
            method: 'GET',
            redirect: 'follow'
        });
        
        const text = await response.text();
        console.log("API Raw Response:", text);

        let result;
        try {
            result = JSON.parse(text);
        } catch (e) {
            console.error("JSON Parse Error:", e);
            console.error("Response likely HTML:", text.substring(0, 100));
            throw new Error("Lỗi đọc dữ liệu: Server không trả về JSON hợp lệ.");
        }

        if(result.status === 'success') {
            return result.data;
        } else {
            console.error("API returned error status:", result);
            throw new Error(result.message || "Lỗi từ server khi lấy danh sách.");
        }
    } catch (error) {
        console.error("Lỗi lấy danh sách shows:", error);
        throw error;
    }
};

// 👇 NEW: Hàm lấy danh sách Services (Gói chụp) từ Google Sheets
export const getServices = async () => {
    try {
        ensureApiConfig();
        console.log("Fetching services from:", `${WEB_APP_URL}?action=getServices`);
        
        const response = await fetch(`${WEB_APP_URL}?action=getServices`, {
            method: 'GET',
            redirect: 'follow'
        });
        
        const text = await response.text();
        console.log("Services API Response:", text);

        let result;
        try {
            result = JSON.parse(text);
        } catch (e) {
            console.error("JSON Parse Error:", e);
            throw new Error("Lỗi server: Không thể đọc danh sách gói dịch vụ.");
        }

        if(result.status === 'success') {
            return result.data;
        } else {
            console.error("API returned error status:", result);
            throw new Error(result.message || "Lỗi server khi lấy gói dịch vụ.");
        }
    } catch (error) {
        console.error("Lỗi lấy danh sách services:", error);
        throw error;
    }
};

// ⚠️ BACKWARD COMPATIBILITY: Giữ lại object api để tránh lỗi import cũ
export const api = {
    getShows,
    getServices,
    addShow: createNewShow
};
