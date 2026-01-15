// src/services/api.js

// ⚠️ Sử dụng biến môi trường từ .env.local
const WEB_APP_URL = import.meta.env.VITE_API_URL;

if (!WEB_APP_URL) {
    console.error("❌ Chưa cấu hình VITE_API_URL trong file .env.local");
} 

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

// ✅ HÀM MỚI: Cập nhật Show (Status, PaidAmount, etc.)
export const updateShow = async (id, updateData) => {
    try {
        // updateData là object chứa các trường cần sửa. VD: { Status: 'Done', PaidAmount: 1000000 }
        const payload = { ID: id, ...updateData };
        
        console.log("🚀 [API] Updating show...", {
            url: WEB_APP_URL,
            payload: payload
        });

        const response = await fetch(WEB_APP_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({ action: 'updateShow', payload: payload })
        });

        const text = await response.text();
        console.log("📥 [API] Update Response Raw:", text);

        let result;
        try {
            result = JSON.parse(text);
        } catch (e) {
            console.error("❌ [API] Non-JSON Response:", text);
            throw new Error("Server trả về dữ liệu lỗi (HTML/Text). Kiểm tra Deployment.");
        }

        if(result.status === 'success') {
            console.log("✅ [API] Update Success");
            return true;
        } else {
            console.error("❌ [API] Update Failed:", result);
            return false;
        }
    } catch (error) {
        console.error("🔥 [API] Network/System Error:", error);
        return false;
    }
};

// ✅ HÀM MỚI: Lấy danh sách khách tiềm năng
export const getLeads = async () => {
    try {
        const response = await fetch(`${WEB_APP_URL}?action=getLeads`);
        const text = await response.text();
        
        if (text.trim().startsWith("<!DOCTYPE") || text.includes("<html")) {
            console.error("API returned HTML instead of JSON for getLeads");
            return [];
        }
        
        const result = JSON.parse(text);
        return result.status === 'success' ? result.data : [];
    } catch (error) {
        console.error("Lỗi lấy danh sách Leads:", error);
        return [];
    }
};

// ✅ HÀM MỚI: Lưu khách tiềm năng (Nháp)
export const createLead = async (data) => {
    try {
        console.log("Đang gửi yêu cầu tạo Lead...", data);
        const response = await fetch(WEB_APP_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({ action: 'addLead', payload: data })
        });
        
        const text = await response.text();
        console.log("Create Lead Response:", text);
        
        try {
            const result = JSON.parse(text);
            if (result.status === 'success') {
                return true;
            } else {
                console.error("Server trả về lỗi:", result.message);
                return false;
            }
        } catch (e) {
            console.error("Không thể đọc phản hồi từ server (lỗi JSON):", text);
            return false;
        }
    } catch (error) {
        console.error("Lỗi kết nối tạo Lead:", error);
        return false;
    }
};

// ✅ HÀM MỚI: Xóa khách tiềm năng
export const deleteLead = async (leadId) => {
    try {
        console.log("Đang gửi yêu cầu xóa Lead:", leadId);
        const response = await fetch(WEB_APP_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({ action: 'deleteLead', payload: { ID: leadId } })
        });
        
        const text = await response.text();
        console.log("Delete Lead Response:", text);
        
        try {
            const result = JSON.parse(text);
            if (result.status === 'success') {
                return true;
            } else {
                console.error("Server trả về lỗi:", result.message);
                return false;
            }
        } catch (e) {
            console.error("Không thể đọc phản hồi từ server (lỗi JSON):", text);
            return false;
        }
    } catch (error) {
        console.error("Lỗi kết nối xóa Lead:", error);
        return false;
    }
};

// ✅ HÀM MỚI: Lấy sự kiện từ Google Calendar
export const getCalendarEvents = async (month, year) => {
    try {
        const response = await fetch(`${WEB_APP_URL}?action=getCalendar&month=${month}&year=${year}`);
        const text = await response.text();
        
        if (text.trim().startsWith("<!DOCTYPE") || text.includes("<html")) {
            console.error("API returned HTML instead of JSON for getCalendar");
            return [];
        }
        
        const result = JSON.parse(text);
        return result.status === 'success' ? result.data : [];
    } catch (error) {
        console.error("Lỗi lấy lịch:", error);
        return [];
    }
};

// ⚠️ BACKWARD COMPATIBILITY: Giữ lại object api để tránh lỗi import cũ
export const api = {
    getShows,
    addShow: createNewShow,
    updateShow,
    getLeads,
    createLead,
    deleteLead,
    getCalendarEvents
};
