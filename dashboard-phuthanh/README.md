# Phu Thanh Wedding Dreams - CRM Dashboard 💍

Phu Thanh Wedding Dreams là một hệ thống quản lý khách hàng (CRM) và Dashboard trực quan dành riêng cho Studio ảnh cưới. Dự án được tối ưu hóa đặc biệt cho thiết bị di động (iPhone / App) bằng PWA và sử dụng Google Sheets làm cơ sở dữ liệu miễn phí, linh hoạt.

## 🚀 Tính Năng Chính (Features)

Hệ thống bao gồm 6 phân hệ chính, điều hướng thông qua **Sidebar** (trên máy tính) và **Bottom Tab Bar** (trên điện thoại):

1. **📊 Dashboard (Tổng Quan)**
   - Theo dõi doanh thu tháng hiện tại, số lượng show sắp tới, khách tiềm năng.
   - Hiển thị tỷ lệ chuyển đổi (Conversion Rate).
   - Biểu đồ thống kê doanh thu 7 tháng gần nhất.
   - Nhắc nhở công việc hôm nay (Notification) và danh sách hoạt động gần đây.

2. **👫 Danh Sách Show (Customer List)**
   - Quản lý trạng thái hợp đồng: *Chờ xử lý, Đã cọc, Chụp ảnh, Hậu kỳ, Giao sản phẩm, Hoàn thành*.
   - Tìm kiếm nhanh bằng Tên Dâu/Rể, Số điện thoại.
   - Xem chi tiết show, lịch chụp, giá trị gói, tình trạng thanh toán.
   - Chỉnh sửa thông tin khách hàng, cập nhật trạng thái hợp đồng, đánh dấu thanh toán (tiền mặt / chuyển khoản).

3. **📝 Tạo Báo Giá (Quote Maker)**
   - Tạo tự động đơn hàng cưới chuyên nghiệp.
   - Lựa chọn linh hoạt các gói dịch vụ và các chi phí phát sinh bổ sung.
   - Tự động sinh **Mã QR Thanh Toán (VietQR)** theo mã ngân hàng, đúng số tiền cọc.
   - Chụp ảnh (Export Image) bill báo giá và mã QR để gửi ngay cho khách hàng.
   - Nút lưu trực tiếp vào danh sách Show (Đã cọc) hoặc Danh sách chờ (Lưu Nháp).

4. **🔖 Khách Tiềm Năng (Leads)**
   - Danh sách theo dõi các khách hàng đang tư vấn (chưa chốt hợp đồng).
   - Lưu trữ lại các gói khách quan tâm, chi phí dự kiến.

5. **🗓 Lịch Trình (Calendar View)**
   - Quản lý lịch chụp, lịch hẹn theo giao diện Lịch tháng.
   - Tính năng **Thêm Nhanh (Quick Add)** sự kiện bằng text (VD: "24/03/2026 Chụp Pre-Wedding").
   - Hiển thị chấm trạng thái và danh sách sự kiện chi tiết của từng ngày.

6. **⚙️ Cài Đặt (Settings)**
   - Quản lý cấu hình chung (Tên Studio, SĐT, Địa chỉ, STK Ngân Hàng).
   - Quản lý động danh sách các **Gói Dịch Vụ** (Thêm, Sửa, Xóa). Dữ liệu này được load thẳng vào mục Tạo Báo Giá.

---

## 💻 Công Nghệ Sử Dụng (Tech Stack)

### Frontend (User Interface)
- **Framework:** React 19 + Vite.
- **Styling:** Tailwind CSS v4, tối ưu hóa class bằng Vanilla CSS nâng cao, giao diện "Glassmorphism" hiện đại, Dark Mode sang trọng tông Xanh Rêu/Vàng Gold (`#D4AF37`, `#0B1410`).
- **Icons & Helpers:** Lucide React, date-fns.
- **Responsive:** Tối ưu hóa mạnh cho thiết bị di động (đặc biệt là iPhone 14 Pro Max & Dynamic Island) bằng CSS `safe-area-inset`.
- **PWA (Progressive Web App):** Sử dụng `vite-plugin-pwa`, có thể "Thêm vào Màn Hình Chính" (Add to Home Screen) trên iOS/Android để sử dụng như một native app app độc lập.

### Backend & Database (API)
- **Database:** Google Sheets (Hoàn toàn miễn phí, dễ dàng chỉnh sửa thủ công nếu cần).
- **Backend API:** Google Apps Script (GAS) đóng vai trò làm REST API (GET, POST xử lý dữ liệu từ React gửi lên Google Sheets + Google Calendar).
- **Third-party APIs:** VietQR API (tạo mã QR tự động ghép tên khách và thông tin).

---

## 🛠 Cài Đặt & Chạy Cục Bộ (Local Deployment)

1. **Yêu cầu hệ thống:** Node.js (phiên bản ^18 hoặc mới hơn).
2. **Cài đặt thư viện:**
   ```bash
   npm install
   ```
3. **Khởi chạy môi trường phát triển (Dev server):**
   ```bash
   npm run dev
   ```
   *Ứng dụng sẽ chạy tại: http://localhost:5173/*
4. **Build Production & Deploy:** (App đã được cấu hình deploy lên Vercel)
   ```bash
   npm run build
   ```

---

## 🌍 Môi Trường (Environment Variables)

Ứng dụng kết nối tới Google Apps Script thông qua biến môi trường.
Tạo file `.env` ở thư mục gốc (nếu chạy local) bằng format:
```env
VITE_API_URL="https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
```
*(Trên Vercel / Netlify: thiết lập biến này trong mục Environment Variables).*

---

*Được thiết kế và phát triển dành riêng cho Phu Thanh Wedding Dreams.*
