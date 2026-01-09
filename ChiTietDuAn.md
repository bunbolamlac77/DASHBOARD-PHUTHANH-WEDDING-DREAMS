# 📂 DỰ ÁN: DASHBOARD PHU THANH WEDDING (GG SHEETS EDITION)

Chào anh Phú Thành, đây là **Bản thiết kế kỹ thuật (Specification)** và **Hồ sơ thiết kế Giao diện (UI/UX)** chi tiết cho dự án Dashboard cá nhân của anh. Tài liệu này sẽ là kim chỉ nam cho quá trình phát triển App.

---

## PHẦN 1: KIẾN TRÚC HỆ THỐNG & KỸ THUẬT

### 1. Nguyên lý hoạt động
Chúng ta sử dụng mô hình **Serverless** để tối ưu chi phí và tận dụng hệ sinh thái Google.
- **Cơ sở dữ liệu (Database):** File Google Sheets trên Google Drive.
- **API (Cổng giao tiếp):** Google Apps Script (GAS) đóng vai trò trung gian, nhận request từ App và thao tác với Sheet.
- **Frontend (Giao diện):** Web App viết bằng ReactJS.
- **Hosting:** Vercel (Cloud).

### 2. Cấu trúc dữ liệu (Google Sheets)
File Sheet: `PhuThanh_CRM_DB`

#### Tab 1: `Shows` (Quản lý Khách hàng)
| Cột | Tên trường | Mô tả |
| :--- | :--- | :--- |
| **A** | `ID` | Mã hợp đồng (VD: 20260101-01) |
| **B** | `Status` | Trạng thái (Cọc, Chụp, Edit, Hoàn thành) |
| **C** | `GroomName` | Tên Chú Rể |
| **D** | `BrideName` | Tên Cô Dâu |
| **E** | `Phone` | Số điện thoại |
| **F** | `Date` | Ngày cưới |
| **G** | `Location` | Địa điểm |
| **H** | `ServiceList` | Danh sách dịch vụ (Text) |
| **I** | `TotalAmount` | Tổng tiền |
| **J** | `Deposit` | Đã cọc |
| **K** | `DriveLink` | Link Folder ảnh gốc |
| **L** | `Notes` | Ghi chú |

#### Tab 2: `Services` (Bảng giá)
| Cột | Tên trường | Mô tả |
| :--- | :--- | :--- |
| **A** | `Name` | Tên gói (Phóng sự, Truyền thống...) |
| **B** | `Price` | Giá tiền |
| **C** | `Category` | Phân loại (Chụp, Quay, Makeup) |

#### Tab 3: `Config` (Cấu hình)
| Cột | Tên trường | Mô tả |
| :--- | :--- | :--- |
| **A** | `AdminPassword` | Mật khẩu đăng nhập App |
| **B** | `BankInfo` | Thông tin tài khoản ngân hàng (cho QR Code) |

### 3. Quy trình xử lý (Logic Flow)
#### A. Hiển thị danh sách (Read)
1. App gọi API GAS.
2. GAS đọc Sheet `Shows` & `Services`.
3. Trả về JSON.
4. App hiển thị danh sách với bộ lọc/tìm kiếm.

#### B. Tạo Báo giá & Chốt khách (Create)
1. Chọn dịch vụ trên App -> Tính tổng tiền.
2. App tạo QR Code chuyển khoản.
3. Bấm "Lưu Show" -> Gửi data lên GAS.
4. GAS thêm dòng mới vào Sheet `Shows`.
5. (Optional) GAS tạo Folder Drive và lưu Link.

#### C. Cập nhật trạng thái (Update)
1. App gửi request đổi trạng thái (VD: "Cọc" -> "Đã Chụp").
2. GAS tìm row tương ứng theo ID và update cột Status.

### 4. Công nghệ chi tiết (Tech Stack)
- **Frontend:** ReactJS + Vite.
- **UI:** Tailwind CSS (Mobile First).
- **Icons:** Lucide React.
- **Animation:** Framer Motion.
- **Utils:** `react-qr-code`, `html-to-image`.
- **API:** Google Apps Script.
- **Hosting:** Vercel.
- **Platform:** PWA (Progressive Web App - Add to Home Screen).

### 5. Ưu điểm & Hạn chế
| Đặc điểm | Chi tiết |
| :--- | :--- |
| **✅ Ưu điểm** | Miễn phí trọn đời (Free Tier Vercel + Google), Không cần bảo trì Server, Dữ liệu đồng bộ App - Sheet, Hoạt động offline cơ bản. |
| **⚠️ Hạn chế** | Độ trễ API (0.5s - 1s), Giới hạn 5000 dòng (dùng thoải mái ~50 năm). |

### 6. Lộ trình triển khai
1. **Database:** Tạo Sheet + Deploy Google Apps Script Script.
2. **Setup Frontend:** Init project ReactJS + Tailwind.
3. **Develop:** Code giao diện và tích hợp API.
4. **Deploy:** Đẩy lên GitHub -> Vercel -> Cài vào iPhone.

---

## PHẦN 2: THIẾT KẾ GIAO DIỆN & TRẢI NGHIỆM (UI/UX)

### 1. Phong cách chủ đạo (Concept)
**Dark Mode Luxury**: Sang trọng, huyền bí, chuyên nghiệp.
- **Màu nền:** Tối (Xanh rêu đen).
- **Điểm nhấn:** Vàng Gold (Sang trọng) & Kem (Dịu mắt).

### 2. Bảng màu (Color Palette)
Cấu hình cho `tailwind.config.js`:

| Tên màu | Mã HEX | Vai trò |
| :--- | :--- | :--- |
| **Background** | `#0B1410` | Nền chính (Deep Moss Green) |
| **Card/Surface** | `#162620` | Nền các khối/thẻ |
| **Primary (Gold)** | `#D4AF37` | Màu chủ đạo, Logo, Nút chính |
| **Text Primary** | `#F3E9D2` | Chữ chính (Cream) |
| **Text Secondary** | `#9CA3AF` | Chữ phụ (Gray) |
| **Accent/Border** | `#2C4A3E` | Đường viền, điểm nhấn phụ |
| **Status: Done** | `#10B981` | Hoàn thành |
| **Status: Pending**| `#F59E0B` | Đang xử lý |
| **Status: Alert** | `#EF4444` | Hủy/Chưa cọc |

### 3. Phông chữ (Typography)
- **Headings (Tiêu đề):** `Playfair Display` (Serif - Cổ điển, sang trọng).
- **Body (Nội dung):** `Inter` hoặc `Be Vietnam Pro` (Sans-serif - Hiện đại, dễ đọc).

### 4. Trải nghiệm người dùng (Mobile UX)
Thiết kế tối ưu cho **iPhone 14 Pro Max** và thao tác 1 tay (**Thumb Zone**).

#### A. Thanh điều hướng dưới (Bottom Bar)
Ghim cố định dưới cùng:
1. 🏠 **Home:** Dashboard, Lịch trình.
2. 👥 **Shows:** Danh sách khách hàng (Có Search).
3. ➕ **New:** Nút nổi bật (FAB) để tạo Báo giá nhanh.
4. ⚙️ **Config:** Cài đặt.

#### B. Thẻ Khách hàng (Cards)
- Bo tròn, nổi bật trên nền tối.
- Hiển thị: Ngày cưới, Tên Dâu Rể (Font Playfair), Dịch vụ, Trạng thái.
- **Shortcuts:** Nút gọi điện 📞 và nhắn tin Zalo 💬 ngay trên thẻ.

#### C. Báo giá & Chốt đơn
- Chọn dịch vụ dạng checklist.
- Tổng tiền luôn hiển thị (Sticky footer).
- **Xuất ảnh:** Chức năng render ảnh báo giá (JPG) kèm QR Code để gửi khách.

### 5. Tài nguyên và Hiệu ứng
- **Logo:** Màu Vàng Gold hoặc Kem, nền trong suốt.
- **App Icon:** PWA Icon chuẩn đẹp trên iOS (Nền xanh rêu, chữ cái cách điệu).
- **Loading:** Sử dụng hiệu ứng **Shimmer** (quét sáng) thay vì Spinner xoay để tạo cảm giác mượt mà cao cấp.

---
*Tài liệu này được tạo ra để đảm bảo thống nhất trong quá trình phát triển ứng dụng Dashboard Phu Thanh Wedding.*
