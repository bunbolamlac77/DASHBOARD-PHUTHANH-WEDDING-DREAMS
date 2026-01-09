# 🎨 HỒ SƠ THIẾT KẾ GIAO DIỆN (UI/UX SPECIFICATION)
**DỰ ÁN: DASHBOARD PHU THANH WEDDING**
**VERSION:** 2.0 (Trends 2025-2026 Edition)

Chào anh Thành, đây là hồ sơ thiết kế chi tiết dựa trên yêu cầu **"Luxury & High-Performance"**. Thiết kế này tối ưu hóa cho iPhone 14 Pro Max của anh, loại bỏ hoàn toàn cảm giác "Web cũ kỹ" để mang lại trải nghiệm như một "Native App" xịn xò.

---

## 1. PHỐI CẢNH MÀN HÌNH CHÍNH (VISUAL MOCKUP)

Dưới đây là hình ảnh phác thảo giao diện Dashboard theo phong cách **Bento Grid** và **Dark Mode Luxury**.

![Dashboard Mockup](/Users/phuthanh/.gemini/antigravity/brain/64edbb17-f6b2-48c5-bc7d-9e22ffd19a78/dashboard_ui_mockup_1767887015783.png)

*Mô tả: Giao diện sử dụng hiệu ứng kính mờ (Glassmorphism), màu xanh rêu sâu thẳm làm nền để tôn lên các thông tin quan trọng màu Vàng Gold.*

---

## 2. HỆ THỐNG MÀU SẮC (COLOR PALETTE)

Chúng ta sử dụng bảng màu **Deep Moss & Gold** để tạo cảm giác quyền lực và tin cậy.

| Tên Màu | Mã HEX | Minh Họa | Vị Trí Sử Dụng |
| :--- | :--- | :--- | :--- |
| **Deep Forest** | `#0B1410` | ⬛️ (Đen xanh) | Nền chính toàn App (Background). |
| **Glass Card** | `#162620` | 🟩 (Rêu tối) | Nền các thẻ (Card), độ trong suốt 80%. |
| **Royal Gold** | `#D4AF37` | 🟨 (Vàng kim) | Logo, Tổng tiền, Icon Active, Nút chính (Fab). |
| **Cream Sand** | `#F3E9D2` | ⬜️ (Kem) | Văn bản chính (Tiêu đề, Tên người). |
| **Metallic Gray**| `#9CA3AF` | ⬜️ (Xám bạc) | Văn bản phụ (Ngày tháng, Label). |
| **Success** | `#10B981` | 🟩 (Lục bảo) | Trạng thái "Hoàn thành", "Đã cọc". |
| **Warning** | `#F59E0B` | 🟧 (Hổ phách) | Trạng thái "Chưa Edit", "Sắp đến hạn". |

---

## 3. CẤU TRÚC MÀN HÌNH (DETAILED SCREENS)

### 📱 Màn 1: Dashboard (Trang Chủ)
*Phong cách: Bento Grid - Gọn gàng, Hiện đại.*

1.  **Header (Trên cùng):**
    *   Avatar tròn nhỏ bên phải.
    *   Text: "Good morning, Mr. Thành" (Font Playfair Display).
    *   *Logic:* Lấy giờ hiện tại để chào (Sáng/Chiều/Tối).
2.  **Khối Doanh Thu (Big Block):**
    *   Chiếm 2/3 bề ngang.
    *   Hiển thị: "Doanh thu T1" - **85.000.000đ** (Số to, màu Gold).
    *   Biểu đồ sóng (Wave chart) chạy nhẹ bên dưới.
3.  **Khối Tiến Độ (Side Block):**
    *   Chiếm 1/3 bề ngang.
    *   2 Vòng tròn (Donut Chart): "3 Edit", "1 Album".
4.  **Khối Upcoming (Wide Block):**
    *   Nằm dưới cùng.
    *   Hiển thị show gần nhất: "Ngày mai: Hùng & Mai - Vĩnh Long".
    *   Bấm vào mở bản đồ.

### 📱 Màn 2: My Shows (Danh Sách)
*Phong cách: Infinite Scroll & Swipe (Vuốt).*

1.  **Thanh Tìm Kiếm & Lọc:**
    *   Ô Input nền kính mờ: "Tìm tên, SĐT...".
    *   Chips lọc (Nút bầu dục): [All] [Payment Pending] [Editing].
2.  **Danh Sách Thẻ (List Cards):**
    *   Mỗi khách là 1 thẻ nằm dọc.
    *   **Thao tác vuốt:**
        *   Vuốt trái ⬅️: Gọi điện / Nhắn Zalo.
        *   Vuốt phải ➡️: Đánh dấu xong / Xóa.
3.  **Nút Thêm Mới (+):**
    *   Nổi (Floating Action Button) ở góc dưới phải.
    *   Màu vàng rực, bấm vào nảy nhẹ (Haptic feedback).

### 📱 Màn 3: Quote Maker (Tạo Báo Giá)
*Phong cách: Stepper (Bước) & Visual Selection.*

1.  **Chọn Dịch Vụ (Visual Grid):**
    *   Lưới các ô vuông: [📸 Chụp] [🎥 Quay] [💄 Makeup].
    *   Không dùng checkbox nhàm chán, dùng **Border Highlight** (Bấm vào sáng viền vàng).
2.  **Dynamic Pricing (Tính tiền động):**
    *   Thanh "Tổng tiền" dính chặt ở đáy màn hình.
    *   Bấm chọn dịch vụ -> Tiền nhảy số ngay lập tức (Animation tăng số).
3.  **Xuất File:**
    *   Nút "Xuất Báo Giá": Render ra file ảnh JPG tỉ lệ 16:9.
    *   Tự động chèn Mã QR Ngân hàng vào góc ảnh.

### 📱 Màn 4: Settings (Cấu Hình)
1.  **Quản lý Gói:** Thêm/Sửa/Xóa tên gói dịch vụ và giá tiền.
2.  **Tài khoản:** Cập nhật số tài khoản nhận tiền (VietQR).
3.  **Giao diện:** Nút gật tắt/bật âm thanh, rung.

---

## 4. HIỆU ỨNG TRẢI NGHIỆM (UX & MICRO-INTERACTIONS)

Để đạt chuẩn **App 2026**, chúng ta sẽ áp dụng:

*   **Skeleton Loading:** Khi tải dữ liệu từ Google Sheets, hiển thị khung xương xám quét ánh sáng (Shimmer) thay vì vòng quay (Spinner).
*   **Haptic Feedback:** Rung nhẹ (Taptic) khi bấm nút quan trọng (Lưu, Chốt đơn).
*   **Toast Message:** Thông báo nhỏ hiện góc trên ("Đã lưu thành công!") rồi tự biến mất, nền mờ.
*   **Page Transition:** Chuyển trang mượt mà (Slide hoặc Fade), không bị chớp trắng.

---

## 5. TÀI NGUYÊN (ASSETS)

*   **Logo:** Đã có file `NenTrongSuot/5.png`. Sẽ được xử lý để hiển thị tốt trên nền tối (có thể tráng lại màu Vàng Gold bằng CSS Filter nếu cần).
*   **Font:**
    *   Tiêu đề: `Playfair Display` (Google Fonts).
    *   Nội dung: `Be Vietnam Pro` (Google Fonts).
*   **Icons:** Bộ `Lucide React` (Nét mảnh, tinh tế).

---
*File thiết kế này là cơ sở để lập trình viên (Code) xây dựng giao diện chính xác. Anh có thể duyệt qua bố cục hình ảnh ở trên trước khi chúng ta bắt đầu code.*
