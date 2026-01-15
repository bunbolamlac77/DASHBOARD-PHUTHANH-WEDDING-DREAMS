import React, { useState, useEffect } from 'react';
import { Search, Filter, Phone, Calendar, CheckCircle, Clock } from 'lucide-react';
import { getShows } from '../services/api'; // ✅ Import hàm chuẩn từ api.js

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [error, setError] = useState(null); // State lưu lỗi

    // Helper: Normalize keys to lowercase to avoid case sensitivity issues
    const normalizeData = (data) => {
        return data.map(item => {
            const newItem = {};
            Object.keys(item).forEach(key => {
                newItem[key.toLowerCase()] = item[key]; // Convert all keys to lowercase
            });
            // Return object with standardized keys (CamelCase mapping)
            return {
               GroomName: newItem.groomname || newItem.groom || '',
               BrideName: newItem.bridename || newItem.bride || '',
               Phone: newItem.phone || '',
               Date: newItem.date || '',
               TotalAmount: newItem.totalamount || 0,
               Status: newItem.status || 'Pending',
               ServiceList: newItem.servicelist || '',
               ...newItem // Keep originals just in case
            };
        });
    };

    // ✅ Dùng useEffect để gọi API thật khi mở trang
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null); // Reset error trước khi gọi lại
            try {
                const rawData = await getShows();
                if (Array.isArray(rawData)) {
                    // 1. Chuẩn hóa dữ liệu (xử lý lệch hoa/thường)
                    const validData = normalizeData(rawData);
                    
                    // 2. Lọc bỏ các dòng rác (không có tên)
                    const cleanData = validData.filter(item => 
                        item.GroomName.trim() !== '' || item.BrideName.trim() !== ''
                    );

                    // 3. Sắp xếp mới nhất
                    const sortedData = cleanData.sort((a, b) => {
                        // Handle date parsing safely
                        const dateA = new Date(a.Date).getTime() || 0;
                        const dateB = new Date(b.Date).getTime() || 0;
                        return dateB - dateA; 
                    });
                    
                    setCustomers(sortedData);
                } else {
                    setCustomers([]);
                }
            } catch (err) {
                console.error("Error loading data:", err);
                setError(err.message); // Hiển thị lỗi ra UI
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Logic lọc (như cũ)
    const filteredCustomers = customers.filter(c => {
        const matchSearch = (c.GroomName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             c.BrideName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             c.Phone?.includes(searchTerm));
        const matchFilter = filterStatus === 'All' || c.Status === filterStatus;
        return matchSearch && matchFilter;
    });

    // Helper: Format số điện thoại (Thêm số 0 ở đầu nếu thiếu)
    const formatPhoneNumber = (phone) => {
        if (!phone) return '';
        const phoneStr = phone.toString();
        // Nếu là số và chưa có số 0 ở đầu thì thêm vào
        if (/^\d+$/.test(phoneStr) && !phoneStr.startsWith('0')) {
            return `0${phoneStr}`;
        }
        return phoneStr;
    };

    // Helper: Format ngày tháng hiển thị đẹp hơn
    const formatDate = (dateString) => {
        if (!dateString) return '';
        // Cố gắng parse ngày nếu là dạng ISO
        const date = new Date(dateString);
        if (!isNaN(date.getTime()) && dateString.includes('-')) {
             return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
        }
        // Nếu không phải ISO (vd: "22/3, 23/3" do người dùng nhập tay), giữ nguyên
        return dateString;
    };

    return (
        <div className="animate-fade-in max-w-7xl mx-auto h-full flex flex-col">
            {/* Header Search & Filter */}
            <div className="sticky top-0 bg-deep/95 backdrop-blur-xl z-20 py-2 space-y-3 mb-4">
                <div className="relative">
                     <input 
                        type="text" 
                        placeholder="Tìm tên Dâu Rể, SĐT..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-glass border border-white/10 px-4 py-3 pl-10 rounded-2xl text-sm focus:border-gold text-cream outline-none transition-colors"
                     />
                     <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                </div>
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                    {['All', 'Deposited', 'Pending', 'Done'].map(status => (
                        <button 
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-5 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                                filterStatus === status 
                                ? 'bg-gold text-deep font-bold shadow-glow' 
                                : 'bg-glass border border-white/10 text-graytext hover:bg-white/5'
                            }`}
                        >
                            {status === 'All' ? 'Tất cả' : status}
                        </button>
                    ))}
                </div>
            </div>

            {/* List Content */}
            <div className="space-y-4 pb-20 overflow-y-auto no-scrollbar flex-1">
                {loading ? (
                    <div className="text-center text-graytext py-10">Đang tải dữ liệu từ Google Sheets...</div>
                ) : error ? (
                    <div className="text-center py-10 px-4">
                        <div className="inline-block bg-red-500/10 border border-red-500/20 rounded-2xl p-6 max-w-lg">
                            <h3 className="text-red-400 font-bold text-lg mb-2">Đã xảy ra lỗi!</h3>
                            <p className="text-gray-300 text-sm mb-4">{error}</p>
                            <button 
                                onClick={() => window.location.reload()}
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-bold transition-colors"
                            >
                                Tải lại trang
                            </button>
                        </div>
                    </div>
                ) : filteredCustomers.length === 0 ? (
                    <div className="text-center text-graytext py-10">Không tìm thấy khách hàng nào.</div>
                ) : (
                    filteredCustomers.map((cus, idx) => (
                        <div key={idx} className="glass-panel p-6 rounded-[24px] flex flex-col md:flex-row md:items-center justify-between group cursor-pointer hover:bg-white/5 transition-all gap-4">
                            <div className="flex items-center gap-5">
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-serif font-bold shrink-0 ${
                                    cus.Status === 'Done' ? 'bg-success/20 text-success' : 'bg-gold/20 text-gold'
                                }`}>
                                    {cus.GroomName ? cus.GroomName.charAt(0) : 'K'}
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-serif text-xl text-cream">{cus.GroomName} <span className="text-gold text-sm">&</span> {cus.BrideName}</h4>
                                    <div className="text-sm text-graytext flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                                        <span className="flex items-center gap-1.5"><Calendar size={14} className="text-gold/70"/> {formatDate(cus.Date)}</span>
                                        <span className="hidden md:block w-1 h-1 rounded-full bg-white/20"></span>
                                        <span className="flex items-center gap-1.5"><Phone size={14} className="text-gold/70"/> {formatPhoneNumber(cus.Phone)}</span>
                                    </div>
                                    {cus.ServiceList && (
                                        <p className="text-xs text-gray-500 truncate max-w-[200px] md:max-w-md italic mt-1">
                                            {cus.ServiceList}
                                        </p>
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2 pl-14 md:pl-0">
                                <span className="text-gold font-bold text-lg">{Number(cus.TotalAmount).toLocaleString()}đ</span>
                                <span className={`text-[10px] px-3 py-1 rounded-full border uppercase font-bold tracking-wider ${
                                    cus.Status === 'Done' ? 'bg-success/10 text-success border-success/20' : 
                                    cus.Status === 'Deposited' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                    'bg-warning/10 text-warning border-warning/20'
                                }`}>
                                    {cus.Status}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CustomerList;
