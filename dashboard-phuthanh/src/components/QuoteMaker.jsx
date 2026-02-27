import React, { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { Plus, Trash2, Camera, Download, CheckCircle, Save, MapPin, Calendar, Phone, User, Loader2, Copy, Bookmark } from 'lucide-react';
import { createNewShow, createLead, getServices } from '../services/api';
import QRCode from 'qrcode';

// --- CẤU HÌNH DỮ LIỆU GÓI CHỤP ---
const PACKAGES = {
  wedding: [
    { 
      id: 'wed1', 
      name: 'Truyền Thống Cưới', 
      price: 2800000,
      deliverables: [
        'Nhân sự: 01 Thợ chụp chuyên nghiệp',
        'Thời gian: 01 Buổi (Dưới 6 giờ chụp)',
        'Số lượng file: Chụp KHÔNG GIỚI HẠN trong suốt buổi lễ',
        'Quy trình chụp: Chụp chân dung Dâu và gia đình + Chụp gia đình trước bàn thờ gia tiên và cổng hoa + Chụp toàn bộ diễn biến buổi Lễ (theo sắp xếp của bác trưởng tộc) + Chụp dàn mâm quả, chú rể đi vào + Chụp chân dung Dâu Rể, gia đình 2 bên tại cổng và gia tiên + Chụp Check-in với khách mời tại bàn tiệc/cổng',
        'Đặc quyền Hậu kỳ (Nổi bật): 🎨 Tất cả các hình ảnh được xử lý chuyên sâu: Làm màu nghệ thuật + Làm mịn da + Chỉnh sửa chi tiết (xóa khuyết điểm, bóp gọn tay chân nhẹ nhàng, tự nhiên)',
        'Sản phẩm nhận được: 📸 Album 100 ảnh 13x18 High Quality: In lụa cao cấp, không ép nhựa (đã có lớp bảo vệ chống ẩm mốc)',
        'Sản phẩm nhận được: 🖼️ 01 Ảnh lớn treo tường 40x60cm chất lượng cao sang trọng',
        'Sản phẩm nhận được: 🎁 Trải nghiệm ý nghĩa: Dâu Rể TỰ TAY CHỌN HÌNH và TỰ TAY LỐNG ẢNH vào album theo ý thích để lưu giữ kỷ niệm'
      ]
    },
    { 
      id: 'wed2', 
      name: 'Truyền Thống Lai Phóng Sự Cưới', 
      price: 3500000,
      deliverables: [
        'Nhân sự: 01 Thợ chụp chuyên nghiệp (Chuyên bắt khoảnh khắc)',
        'Thời gian: 01 Buổi (Dưới 6 giờ)',
        'Số lượng file: Chụp KHÔNG GIỚI HẠN - Chú trọng cảm xúc thực',
        'Quy trình chụp (Trước Khi Nhà Trai Tới): Chụp Flatlay: Thiệp cưới, giày cưới (Dâu chuẩn bị trước) + Chụp khoảnh khắc Dâu đang Makeup + Chụp Dâu và Manocanh mặc áo dài + Bắt trọn khoảnh khắc chuẩn bị, tất bật đầy cảm xúc của người thân',
        'Quy trình chụp (Chân dung & Tập thể): Chụp chân dung Dâu nghệ thuật (Dâu dành thời gian riêng cho phần này nhé) + Chụp Dâu cùng dàn bưng mâm & Gia đình trước bàn thờ gia tiên/cổng hoa',
        'Quy trình chụp (Nhà Trai Tới & Làm Lễ): Chụp tập thể nhà trai, rể phụ và chú rể trình lễ + Bắt khoảnh khắc trao mâm và đón dâu tại cổng + Chụp trọn bộ diễn biến Lễ Gia Tiên (theo sắp xếp của trưởng tộc) + Chụp check-in khách mời tại bàn tiệc/cổng hoa',
        'Đặc quyền Hậu kỳ (Nổi bật): 🎨 Tất cả các hình ảnh được xử lý chuyên sâu: Làm màu nghệ thuật + Làm mịn da + Chỉnh sửa chi tiết (xóa khuyết điểm, bóp gọn tay chân nhẹ nhàng, tự nhiên)',
        'Sản phẩm nhận được: 📸 Album 100 ảnh 13x18 High Quality: In lụa cao cấp, không ép nhựa (đã có lớp bảo vệ chống ẩm mốc)',
        'Sản phẩm nhận được: 🖼️ 02 Ảnh lớn treo tường 40x60cm chất lượng cao sang trọng',
        'Sản phẩm nhận được: 🎁 Trải nghiệm ý nghĩa: Dâu Rể TỰ TAY CHỌN HÌNH và TỰ TAY LỐNG ẢNH vào album theo ý thích để lưu giữ kỷ niệm'
      ]
    },
    { 
      id: 'wed3', 
      name: 'Gói Trọn Vẹn Cảm Xúc (Combo 02 Thợ)', 
      price: 4800000,
      deliverables: [
        'Nhân sự cao cấp: 01 Thợ Truyền Thống: Chuyên trách các góc máy chuẩn mực, lễ nghi, gia đình + 01 Thợ Phóng Sự: Chuyên bắt khoảnh khắc, cảm xúc tự nhiên và góc máy nghệ thuật',
        'Thời gian: 01 Buổi (Dưới 6 giờ)',
        'Số lượng file: Chụp KHÔNG GIỚI HẠN - Đảm bảo góc nhìn đa dạng từ 2 thợ',
        'Quy trình chụp (Trước Khi Nhà Trai Tới): Chụp Flatlay: Thiệp cưới, giày cưới (Dâu chuẩn bị trước) + Chụp khoảnh khắc Dâu đang Makeup + Chụp Dâu và Manocanh mặc áo dài + Bắt trọn khoảnh khắc chuẩn bị, tất bật đầy cảm xúc của người thân',
        'Quy trình chụp (Chân dung & Tập thể): Chụp chân dung Dâu nghệ thuật (Dâu dành thời gian riêng cho phần này nhé) + Chụp Dâu cùng dàn bưng mâm & Gia đình trước bàn thờ gia tiên/cổng hoa',
        'Quy trình chụp (Nhà Trai Tới & Làm Lễ): Chụp tập thể nhà trai, rể phụ và chú rể trình lễ + Bắt khoảnh khắc trao mâm và đón dâu tại cổng + Chụp trọn bộ diễn biến Lễ Gia Tiên (theo sắp xếp của trưởng tộc) + Chụp check-in khách mời tại bàn tiệc/cổng hoa',
        'Đặc quyền Hậu kỳ (Nổi bật): 🎨 Tất cả các hình ảnh được xử lý chuyên sâu: Làm màu nghệ thuật + Làm mịn da + Chỉnh sửa chi tiết (xóa khuyết điểm, bóp gọn tay chân nhẹ nhàng, tự nhiên)',
        'Sản phẩm nhận được: 📸 Album Photobook Cao Cấp: Size lớn 25cm x 35cm (15 tờ - 30 trang - 150 ảnh)',
        'Sản phẩm nhận được: 🖼️ 02 Ảnh lớn treo tường 40x60cm chất lượng cao sang trọng',
        'Sản phẩm nhận được: 🎁 Trải nghiệm ý nghĩa: Dâu Rể TỰ TAY CHỌN HÌNH và TỰ TAY LỐNG ẢNH vào album theo ý thích để lưu giữ kỷ niệm'
      ]
    },
  ],
  video: [
    { 
      id: 'vid1', 
      name: 'Quay Phim Highlight (Demo)', 
      price: 4000000,
      deliverables: [
        'Video highlight chuyên nghiệp',
        'Thời lượng: 3-5 phút',
        'Chỉnh sửa chuyên nghiệp',
        'Nhạc nền bản quyền'
      ]
    },
  ]
};

// --- CẤU HÌNH TÀI KHOẢN NGÂN HÀNG (Thay đổi thông tin của bạn ở đây) ---
const BANK_INFO = {
  BANK_ID: 'ICB', // VietinBank
  ACCOUNT_NO: '0764816715',
  ACCOUNT_NAME: 'TANG HUYNH THANH PHU'
};

// --- CẤU HÌNH CHI PHÍ PHÁT SINH ---
const EXTRA_OPTIONS = [
  { label: 'Thêm thợ chụp (1 buổi)', price: 1000000 },
  { label: 'Phát sinh thêm giờ (1h)', price: 200000 },
  { label: 'Lễ xuất giá buổi tối', price: 600000 },
  { label: 'In thêm ảnh 13x18 (10 ảnh)', price: 100000 }, // Giả định block 10 ảnh cho dễ tính
  { label: 'In thêm ảnh 40x60 (1 ảnh)', price: 200000 },
  { label: 'Upsize 60x90', price: 300000 },
  { label: 'Di chuyển ngoài tỉnh (1 ngày)', price: 500000 },

];

const QuoteMaker = () => {
  // --- STATE QUẢN LÝ DỮ LIỆU ---
  const [customerInfo, setCustomerInfo] = useState({
    groom: '', bride: '', phone: '',
    dates: '', location: ''
  });
  const [packagesList, setPackagesList] = useState([]);
  const [isLoadingPackages, setIsLoadingPackages] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
        setIsLoadingPackages(true);
        const data = await getServices();
        setPackagesList(data);
        setIsLoadingPackages(false);
    };
    fetchPackages();
  }, []);
  
  const [selectedItems, setSelectedItems] = useState([]); // Danh sách gói đã chọn
  const [extraCosts, setExtraCosts] = useState([]); // Chi phí phát sinh
  const [generatedImage, setGeneratedImage] = useState(null); // Lưu ảnh báo giá
  const [paymentQrImage, setPaymentQrImage] = useState(null); // Lưu ảnh QR thanh toán
  const [isSaving, setIsSaving] = useState(false); // Trạng thái đang lưu
  const [qrDataUrl, setQrDataUrl] = useState(''); // QR code as data URL
  const [showAddedToast, setShowAddedToast] = useState(false); // Show toast when package added

  const receiptRef = useRef(null); // Ref để chụp ảnh vùng báo giá
  const paymentQrRef = useRef(null); // Ref để chụp ảnh QR thanh toán
  const previewContainerRef = useRef(null); // Ref cho container preview

  // --- LOGIC TÍNH TOÁN ---
  const calculateTotal = () => {
    const packageTotal = selectedItems.reduce((sum, item) => sum + Number(item.Price || item.price || 0), 0);
    const extraTotal = extraCosts.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
    return packageTotal + extraTotal;
  };

  const totalAmount = calculateTotal();
  const depositAmount = selectedItems.length * 500000; // Cọc 500k mỗi gói

  // --- HÀM XỬ LÝ ---
  // --- HÀM XỬ LÝ ---
  const handleAddPackage = (pkg) => {
    // Cho phép thêm nhiều gói giống nhau (Mỗi lần thêm tạo ra một unique ID tạm thời)
    const newPackage = { ...pkg, _instanceId: Date.now() + Math.random() };
    setSelectedItems([...selectedItems, newPackage]);
    
    // Show toast notification
    setShowAddedToast(true);
    setTimeout(() => setShowAddedToast(false), 2000);
  };

  const handleRemovePackage = (instanceId) => {
    setSelectedItems(selectedItems.filter(i => i._instanceId !== instanceId));
  };

  const handleAddExtra = () => {
    setExtraCosts([...extraCosts, { name: '', price: '' }]);
  };

  const handleQuickAddExtra = (option) => {
      setExtraCosts([...extraCosts, { name: option.label, price: option.price }]);
  };

  const handleRemoveExtra = (index) => {
    const newExtras = [...extraCosts];
    newExtras.splice(index, 1);
    setExtraCosts(newExtras);
  };

  const updateExtra = (index, field, value) => {
    const newExtras = [...extraCosts];
    newExtras[index][field] = value;
    setExtraCosts(newExtras);
  };

  const renderDeliverableText = (text) => {
    // 1. Tách chuỗi bằng dấu "+"
    const parts = text.split('+');
    
    // Nếu không có dấu cộng, trả về text gốc
    if (parts.length === 1) return text;

    // Nếu có dấu cộng, render lại với span styled cho dấu "+"
    return (
      <span>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {part.trim()}
            {index < parts.length - 1 && (
              <span className="text-gold font-bold mx-1 text-sm inline-block transform translate-y-[1px]">+</span>
            )}
          </React.Fragment>
        ))}
      </span>
    );
  };

  // --- TẠO ẢNH BÁO GIÁ ---
  const generateQuoteImage = async () => {
    if (receiptRef.current === null) return;

    try {
      // Chụp ảnh DOM element
      // Thêm filter để loại bỏ các element không mong muốn nếu cần
      const dataUrl = await toPng(receiptRef.current, { 
          cacheBust: true, 
          pixelRatio: 2,
          skipAutoScale: true,
          skipFonts: true // Fix CORS errors with Google Fonts
      });
      setGeneratedImage(dataUrl);
      
      // Tự động scroll lên đầu để xem được icon
      setTimeout(() => {
        if (previewContainerRef.current) {
          previewContainerRef.current.scrollTop = 0;
        }
      }, 100);
    } catch (err) {
      console.error('Lỗi tạo ảnh:', err);
      // Hiển thị chi tiết lỗi hơn để debug
      alert(`Không thể tạo ảnh. Lỗi: ${err.message || err}`);
    }
  };

  // --- XÁC NHẬN THÔNG TIN & TẠO ẢNH QR THANH TOÁN ---
  const handleConfirmInfo = async () => {
    if (!generatedImage) return alert("Vui lòng tạo bảng báo giá trước!");
    
    // Tạo ảnh QR thanh toán
    if (paymentQrRef.current === null) return;
    
    try {
      const dataUrl = await toPng(paymentQrRef.current, { 
        cacheBust: true, 
        pixelRatio: 2,
        skipAutoScale: true,
        skipFonts: true // Fix CORS errors
      });
      setPaymentQrImage(dataUrl);
    } catch (err) {
      console.error('Lỗi tạo ảnh QR thanh toán:', err);
      alert(`Không thể tạo ảnh QR. Lỗi: ${err.message || err}`);
    }
  };
  
  // --- HÀM LƯU NHÁP (KHÁCH TIỀM NĂNG) ---
  const handleSaveDraft = async () => {
    if(!customerInfo.groom && !customerInfo.bride) return alert("Nhập ít nhất 1 tên để lưu nháp!");

    setIsSaving(true);
    const leadData = {
        Name: `${customerInfo.groom} - ${customerInfo.bride}`,
        Phone: customerInfo.phone,
        Date: customerInfo.dates,
        Note: `Quan tâm: ${selectedItems.map(i => i.Name || i.name).join(', ')}. Tổng: ${totalAmount.toLocaleString()}đ`
    };

    const success = await createLead(leadData);
    if (success) {
      alert("Đã lưu vào danh sách tiềm năng!");
    } else {
      alert("Có lỗi khi lưu. Vui lòng thử lại!");
    }
    setIsSaving(false);
  };
  
  // --- LƯU & XÁC NHẬN CỌC ---
  const handleSaveToSheet = async () => {
    if(!customerInfo.groom && !customerInfo.bride) return alert("Vui lòng nhập tên Dâu/Rể");
    
    setIsSaving(true);
    const payload = {
      GroomName: customerInfo.groom,
      BrideName: customerInfo.bride,
      Phone: customerInfo.phone,
      Date: customerInfo.dates,
      Location: customerInfo.location,
      ServiceList: selectedItems.map(i => i.Name || i.name).join(', ') + (extraCosts.length ? ' + Phát sinh' : ''),
      TotalAmount: totalAmount,
      Deposit: depositAmount,
      Status: 'Confirmed', // Đánh dấu là đã xác nhận thông tin
      Notes: 'Khách đã xác nhận thông tin qua App'
    };

    try {
      console.log("Sending to Sheet:", payload);
      await createNewShow(payload); 
      
      alert(`Đã lưu hồ sơ của ${customerInfo.groom} & ${customerInfo.bride} thành công!`);
      // Reset form
      setGeneratedImage(null);
      setPaymentQrImage(null);
      setSelectedItems([]);
      setExtraCosts([]);
      setCustomerInfo({ groom: '', bride: '', phone: '', dates: '', location: '' });
    } catch (error) {
      console.error(error);
      alert('Lỗi khi lưu dữ liệu!');
    } finally {
      setIsSaving(false);
    }
  };

  // --- TẠO QR CODE VIETQR ---
  useEffect(() => {
    // Không cần dùng thư viện qrcode local nữa, dùng API VietQR
    const generateQR = () => {
        if (!depositAmount) return;
        
        const amount = Math.round(depositAmount);
        // Simple format: Names + Date (e.g., "Thanh Phu 24.3")
        const groomName = customerInfo.groom || 'Thanh';
        const brideName = customerInfo.bride || 'Phu';
        const dateStr = customerInfo.dates || '';
        const addInfo = `${groomName} ${brideName} ${dateStr}`.trim();
        const accountName = BANK_INFO.ACCOUNT_NAME;
        
        // Construct VietQR URL
        // Format: https://img.vietqr.io/image/<BANK_ID>-<ACCOUNT_NO>-<TEMPLATE>.png
        const url = `https://img.vietqr.io/image/${BANK_INFO.BANK_ID}-${BANK_INFO.ACCOUNT_NO}-print.png?amount=${amount}&addInfo=${encodeURIComponent(addInfo)}&accountName=${encodeURIComponent(accountName)}`;
        
        setQrDataUrl(url);
    };
    
    generateQR();
  }, [depositAmount, customerInfo.dates, customerInfo.groom, customerInfo.bride]);

  // --- SAO CHÉP ẢNH VÀO CLIPBOARD ---
  const handleCopyImage = async (imageSrc) => {
    // Nếu không truyền tham số, mặc định là generatedImage (ảnh báo giá)
    const targetImage = imageSrc || generatedImage;
    if (!targetImage) return;
    
    try {
      // Chuyển đổi base64 image sang blob
      const response = await fetch(targetImage);
      const blob = await response.blob();
      
      // Copy vào clipboard
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      
      alert('Đã sao chép ảnh vào clipboard!');
    } catch (err) {
      console.error('Lỗi khi copy ảnh:', err);
      alert('Không thể sao chép ảnh. Vui lòng thử tải xuống thay thế.');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:h-full pb-20">
      
      {/* --- CỘT TRÁI: NHẬP LIỆU (Ẩn khi đã tạo ảnh) --- */}
      {!generatedImage && (
      <div className="w-full lg:w-1/2 space-y-6 lg:overflow-y-auto pr-2 no-scrollbar min-h-0">
        
        {/* 1. Thông tin khách */}
        <div className="glass-panel p-5 rounded-3xl space-y-4">
          <h3 className="text-gold font-serif text-lg flex items-center gap-2">
            <User size={18} /> Thông tin Dâu Rể
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <input type="text" placeholder="Tên Chú Rể" className="input-field" 
              value={customerInfo.groom} onChange={e => setCustomerInfo({...customerInfo, groom: e.target.value})} />
            <input type="text" placeholder="Tên Cô Dâu" className="input-field" 
              value={customerInfo.bride} onChange={e => setCustomerInfo({...customerInfo, bride: e.target.value})} />
            <div className="col-span-2 relative">
               <Calendar className="absolute left-3 top-3 text-graytext w-4 h-4"/>
               <input type="text" placeholder="Ngày chụp (VD: 24/03/2026)" className="input-field pl-10" 
                value={customerInfo.dates} onChange={e => setCustomerInfo({...customerInfo, dates: e.target.value})} />
            </div>
            <div className="col-span-2 relative">
               <Phone className="absolute left-3 top-3 text-graytext w-4 h-4"/>
               <input type="text" placeholder="Số điện thoại" className="input-field pl-10" 
                value={customerInfo.phone} onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})} />
            </div>
            <div className="col-span-2 relative">
               <MapPin className="absolute left-3 top-3 text-graytext w-4 h-4"/>
               <input type="text" placeholder="Địa điểm (VD: Cần Thơ, Vĩnh Long)" className="input-field pl-10" 
                value={customerInfo.location} onChange={e => setCustomerInfo({...customerInfo, location: e.target.value})} />
            </div>
          </div>
        </div>

        {/* 2. Chọn Gói */}
        <div className="glass-panel p-5 rounded-3xl space-y-4">
           <h3 className="text-gold font-serif text-lg flex items-center gap-2">
            <Camera size={18} /> Chọn Gói Chụp (Sáng)
          </h3>
          
          {/* Tabs giả lập */}
          <div className="space-y-4">

            
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs text-graytext uppercase font-bold">Gói Cưới & Video (Từ CSDL)</p>
                {isLoadingPackages && <Loader2 size={12} className="animate-spin text-gold" />}
              </div>
              <div className="grid grid-cols-1 gap-2">
                {packagesList.length === 0 && !isLoadingPackages && (
                    <p className="text-xs text-gray-500 italic">Chưa có dữ liệu gói từ báo giá.</p>
                )}
                {packagesList.map((pkg, idx) => (
                  <button key={`dyn_${idx}`} onClick={() => handleAddPackage(pkg)} 
                    className="flex justify-between p-3 rounded-xl bg-white/5 hover:bg-gold/10 hover:border-gold border border-transparent transition-all text-sm text-left group">
                    <span className="group-hover:text-gold">{pkg.Name || pkg.name}</span>
                    <span className="font-bold text-cream">{Number(pkg.Price || pkg.price).toLocaleString()}đ</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2.5 Gói đã chọn */}
        {selectedItems.length > 0 && (
          <div className="glass-panel p-5 rounded-3xl space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-gold font-serif text-lg flex items-center gap-2">
                <CheckCircle size={18} /> Gói đã chọn ({selectedItems.length})
              </h3>
            </div>
            <div className="space-y-2">
              {selectedItems.map((item) => (
                <div key={item._instanceId} className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-sm text-cream">{item.Name || item.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-gold">{Number(item.Price || item.price || 0).toLocaleString()}đ</span>
                    <button 
                      onClick={() => handleRemovePackage(item._instanceId)}
                      className="text-red-500 hover:text-red-400 p-1 hover:bg-red-500/10 rounded transition-colors"
                      title="Xóa gói">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Phát sinh */}
        <div className="glass-panel p-5 rounded-3xl space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-gold font-serif text-lg">Chi phí phát sinh</h3>
            <button onClick={handleAddExtra} className="text-xs bg-white/10 hover:bg-gold hover:text-deep px-3 py-1 rounded-full transition-colors">+ Thêm khác</button>
          </div>
          
          {/* Quick Select Tags */}
          <div className="flex flex-wrap gap-2 mb-2">
            {EXTRA_OPTIONS.map((opt, idx) => (
                <button key={idx} onClick={() => handleQuickAddExtra(opt)} 
                    className="text-[10px] px-2 py-1 rounded border border-white/10 hover:border-gold hover:text-gold transition-colors text-gray-400">
                    {opt.label}
                </button>
            ))}
          </div>

          <div className="space-y-2">
            {extraCosts.map((item, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                <input type="text" placeholder="Tên khoản phí" className="input-field w-3/5" 
                    value={item.name} onChange={e => updateExtra(idx, 'name', e.target.value)} />
                <input type="number" placeholder="Giá tiền" className="input-field w-2/5" 
                    value={item.price} onChange={e => updateExtra(idx, 'price', e.target.value)} />
                <button onClick={() => handleRemoveExtra(idx)} className="text-gray-500 hover:text-red-500">
                    <Trash2 size={16} />
                </button>
                </div>
            ))}
          </div>
        </div>

      </div>
      )}

      {/* --- CỘT PHẢI: PREVIEW & ACTIONS --- */}
      <div 
        ref={previewContainerRef}
        className={`flex flex-col gap-4 min-h-0 transition-all ${
          generatedImage 
            ? 'w-full flex items-start justify-start lg:overflow-y-auto' 
            : 'w-full lg:w-1/2 lg:overflow-y-auto'
        }`}>
        
        {/* Nút tạo ảnh */}
        {!generatedImage && (
             <button onClick={generateQuoteImage} className="w-full py-4 bg-gold text-deep font-bold rounded-2xl shadow-glow hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
                <Camera size={20} /> TẠO BẢNG BÁO GIÁ
             </button>
        )}

        {/* --- KHU VỰC HIỂN THỊ ẢNH ĐÃ TẠO --- */}
        {generatedImage ? (
            <div className="animate-fade-in space-y-4 w-full max-w-2xl mx-auto px-4 py-6">
                <div className="relative group">
                    <img src={generatedImage} alt="Báo giá" className="w-full rounded-2xl shadow-2xl border border-white/10" />
                    {/* Buttons trên góc phải ảnh */}
                    <div className="absolute top-4 right-4 flex gap-2 z-10">
                        <button 
                            onClick={() => handleCopyImage(generatedImage)}
                            className="bg-gold hover:bg-gold/80 p-3 rounded-full text-deep transition-all shadow-xl hover:scale-110 border-2 border-deep/20"
                            title="Copy ảnh">
                            <Copy size={20} strokeWidth={2.5} />
                        </button>
                        <a 
                            href={generatedImage} 
                            download={`BaoGia-${customerInfo.groom}-${customerInfo.bride}.png`} 
                            className="bg-gold/90 hover:bg-gold p-2.5 rounded-full text-deep transition-all shadow-lg hover:scale-110"
                            title="Tải xuống">
                            <Download size={20} strokeWidth={2.5} />
                        </a>
                    </div>
                </div>
                
                {/* Hành động - Xác nhận thông tin */}
                {!paymentQrImage && (
                  <div className="flex gap-3">
                      <button onClick={handleConfirmInfo} className="flex-1 py-3 bg-gold text-deep font-bold rounded-xl shadow-lg hover:bg-gold/90 transition-colors flex items-center justify-center gap-2">
                          <CheckCircle /> 
                          XÁC NHẬN THÔNG TIN
                      </button>
                      <button onClick={() => setGeneratedImage(null)} className="px-6 py-3 bg-white/10 text-cream font-bold rounded-xl hover:bg-white/20 transition-colors">
                          Sửa lại
                      </button>
                  </div>
                )}
                
                {/* Hiển thị ảnh QR thanh toán sau khi xác nhận */}
                {paymentQrImage && (
                  <>
                    <div className="relative group mt-6">
                        <img src={paymentQrImage} alt="QR Thanh toán" className="w-full rounded-2xl shadow-2xl border border-white/10" />
                        <div className="absolute top-4 right-4 flex gap-2 z-10">
                             <button 
                                onClick={() => handleCopyImage(paymentQrImage)}
                                className="bg-gold hover:bg-gold/80 p-3 rounded-full text-deep transition-all shadow-xl hover:scale-110 border-2 border-deep/20"
                                title="Copy ảnh">
                                <Copy size={20} strokeWidth={2.5} />
                            </button>
                            <a 
                                href={paymentQrImage} 
                                download={`QR-ThanhToan-${customerInfo.groom}-${customerInfo.bride}.png`} 
                                className="bg-gold hover:bg-gold/90 p-2.5 rounded-full text-deep transition-all shadow-lg hover:scale-110"
                                title="Tải xuống QR">
                                <Download size={20} strokeWidth={2.5} />
                            </a>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={handleSaveToSheet} disabled={isSaving} className="flex-1 py-3 bg-success text-white font-bold rounded-xl shadow-lg hover:bg-success/80 transition-colors flex items-center justify-center gap-2">
                            {isSaving ? <Loader2 className="animate-spin"/> : <Save />} 
                            LƯU HỒ SƠ
                        </button>
                        <button 
                            onClick={handleSaveDraft}
                            disabled={isSaving} 
                            className="px-4 py-3 bg-white/10 text-gold font-bold rounded-xl hover:bg-white/20 transition-colors flex items-center gap-2">
                            <Bookmark size={20} />
                            Lưu Nháp
                        </button>
                        <button onClick={() => { setGeneratedImage(null); setPaymentQrImage(null); }} className="px-6 py-3 bg-white/10 text-cream font-bold rounded-xl hover:bg-white/20 transition-colors">
                            Làm mới
                        </button>
                    </div>
                  </>
                )}
            </div>
        ) : (
            /* --- KHU VỰC RENDER QUOTE - Không có logo, không có QR --- */
            <div className="w-full max-w-6xl mx-auto"> 
                <div ref={receiptRef} className="bg-[#0B1410] text-cream p-6 md:p-8 w-full border border-gold/30 relative rounded-2xl">
                    
                    {/* Header - Chỉ có Title */}
                    <div className="text-center mb-6">
                        <h1 className="font-serif text-xl md:text-2xl text-gold tracking-wide uppercase">Bảng Báo Giá Gói Chụp</h1>
                        <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-2"></div>
                    </div>

                    {/* Main Content - Grid Layout responsive */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                        {/* Left Column - Info & Table */}
                        <div>
                            {/* Customer Info */}
                            <div className="mb-4 space-y-0.5">
                                <h2 className="font-serif text-lg md:text-xl text-white">{customerInfo.groom || 'Chú Rể'} <span className="text-gold">&</span> {customerInfo.bride || 'Cô Dâu'}</h2>
                                <p className="text-xs text-gray-400">Ngày chụp: {customerInfo.dates || '...'}</p>
                                <p className="text-xs text-gray-400">{customerInfo.location || ''}</p>
                            </div>

                            {/* Table */}
                            <div className="mb-4">
                                <div className="border-b border-white/20 pb-2 mb-2 flex justify-between text-xs text-gold uppercase font-bold">
                                    <span>Dịch vụ</span>
                                    <span>Thành tiền</span>
                                </div>
                                <div className="space-y-2 min-h-[60px]">
                                    {selectedItems.map((item, i) => (
                                        <div key={item._instanceId || i} className="flex justify-between text-sm group">
                                            <span className="text-gray-300 flex items-center gap-2">
                                                <button onClick={() => handleRemovePackage(item._instanceId)} 
                                                    className="opacity-100 md:opacity-0 md:group-hover:opacity-100 text-red-500 hover:text-red-400 -ml-3 transition-opacity" title="Xóa">
                                                    <Trash2 size={10} />
                                                </button>
                                                {item.Name || item.name}
                                            </span>
                                            <span className="text-cream whitespace-nowrap ml-2">{Number(item.Price || item.price || 0).toLocaleString()}đ</span>
                                        </div>
                                    ))}
                                    {extraCosts.map((item, i) => (
                                        item.name && (
                                        <div key={`ex-${i}`} className="flex justify-between text-sm italic text-gray-400">
                                            <span>+ {item.name}</span>
                                            <span className="whitespace-nowrap ml-2">{Number(item.price).toLocaleString()}đ</span>
                                        </div>
                                        )
                                    ))}
                                </div>
                                <div className="border-t border-white/20 mt-4 pt-3 space-y-2">
                                     <div className="flex justify-between text-base font-bold text-white">
                                        <span>Tổng cộng</span>
                                        <span>{totalAmount.toLocaleString()}đ</span>
                                    </div>
                                     <div className="flex justify-between text-sm text-gold">
                                        <span>Cọc trước</span>
                                        <span>{depositAmount.toLocaleString()}đ</span>
                                    </div>
                                     <div className="flex justify-between text-sm text-gray-400">
                                        <span>Còn lại</span>
                                        <span>{(totalAmount - depositAmount).toLocaleString()}đ</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Package Deliverables */}
                        <div className="border-l-0 lg:border-l border-white/10 lg:pl-8">
                            <h3 className="text-sm font-bold text-gold uppercase mb-3">Sản phẩm nhận được</h3>
                            <div className="space-y-4">
                                {selectedItems.map((item, i) => {
                                    const delivs = item.DeliverablesArray || item.deliverables || [];
                                    if(delivs.length === 0) return null;
                                    return (
                                        <div key={i} className="space-y-1">
                                            <p className="text-xs font-semibold text-cream mb-1">{item.Name || item.name}:</p>
                                            <ul className="space-y-1 text-[10px] md:text-xs text-gray-300 leading-relaxed">
                                                {delivs
                                                    .filter(d => Boolean(d && d.trim()))
                                                    .map((deliverable, idx) => (
                                                    <li key={idx} className="flex gap-1.5">
                                                        <span className="text-gold mt-0.5">•</span>
                                                        <span>{renderDeliverableText(deliverable.replace(/^(Sản phẩm nhận được:|Sản phẩm:)\s*/i, ''))}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    );
                                })}
                                {selectedItems.length === 0 && (
                                    <p className="text-xs text-gray-500 italic">Chưa chọn gói chụp nào</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <p className="text-[10px] text-center text-gray-500 mt-6 italic">Cảm ơn bạn đã lựa chọn Phu Thanh Wedding Dreams!</p>
                </div>
            </div>
        )}
        
        {/* --- KHU VỰC PAYMENT QR (Ẩn, chỉ render) --- */}
        <div className="fixed -left-[9999px] -top-[9999px]">
            <div ref={paymentQrRef} className="bg-[#0B1410] text-cream p-10 w-[600px] border-2 border-gold/50 rounded-3xl relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                
                <div className="text-center space-y-6 relative z-10">
                    <div className="space-y-2">
                        <h2 className="font-serif text-3xl text-gold uppercase tracking-widest">Thông Tin Thanh Toán</h2>
                        <div className="w-20 h-0.5 bg-gold/50 mx-auto"></div>
                    </div>

                    <div className="space-y-1">
                        <p className="text-2xl font-serif text-white">{customerInfo.groom} <span className="text-gold">&</span> {customerInfo.bride}</p>
                        <p className="text-sm text-gray-400 uppercase tracking-wide">Ngày chụp: {customerInfo.dates}</p>
                        <p className="text-sm text-gray-300 italic mt-1">Gói: {selectedItems.map(i => i.Name || i.name).join(', ')}</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-3xl inline-block shadow-[0_0_30px_rgba(255,255,255,0.1)] border border-white/20">
                        {qrDataUrl && <img src={qrDataUrl} alt="QR Code" className="w-56 h-56 rounded-xl" />}
                    </div>
                    
                    <div className="bg-white/5 rounded-2xl p-6 space-y-3 border border-white/10">
                        <div className="flex justify-between items-center text-gray-300">
                            <span>Tổng giá trị</span>
                            <span className="text-xl font-bold">{totalAmount.toLocaleString()}đ</span>
                        </div>
                        <div className="flex justify-between items-center text-gold">
                            <span>Cần thanh toán (Cọc)</span>
                            <span className="text-2xl font-bold">{depositAmount.toLocaleString()}đ</span>
                        </div>
                        <div className="w-full h-px bg-white/10 my-2"></div>
                        <div className="flex justify-between items-center text-gray-400 text-sm">
                            <span>Còn lại (Thanh toán sau)</span>
                            <span>{(totalAmount - depositAmount).toLocaleString()}đ</span>
                        </div>
                    </div>
                    
                    <p className="text-xs text-gray-500">Vui lòng kiểm tra kỹ thông tin trước khi chuyển khoản</p>
                </div>
            </div>
        </div>

      </div>

      {/* Toast Notification */}
      {showAddedToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-success/90 backdrop-blur-xl text-white px-6 py-3 rounded-2xl shadow-2xl border border-success/20 flex items-center gap-2">
            <CheckCircle size={20} className="text-white" />
            <span className="font-medium">Đã thêm gói chụp!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteMaker;
