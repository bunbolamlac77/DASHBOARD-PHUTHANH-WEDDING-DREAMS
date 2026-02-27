import React, { useState } from 'react';
import { X, Calendar, Phone, MapPin, DollarSign, CheckCircle, AlertTriangle, Save } from 'lucide-react';
import { updateShow } from '../services/api';

// Định nghĩa quy trình trạng thái (Map English -> Vietnamese)
const STATUS_MAPPING = {
    'Pending': 'Chờ xử lý',
    'Deposited': 'Đã cọc',
    'Shooting': 'Chụp ảnh',
    'Editing': 'Hậu kỳ',
    'Delivery': 'Giao sản phẩm',
    'Done': 'Hoàn thành'
};

const STATUS_STEPS = Object.keys(STATUS_MAPPING);

// Helper function format ngày giờ
const formatDateTime = (dateString) => {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        return date.toLocaleDateString('vi-VN', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch {
        return dateString;
    }
};

const ShowDetailModal = ({ show, onClose, onUpdate }) => {
    const [status, setStatus] = useState(show.Status || 'Pending');
    const [paidAmount, setPaidAmount] = useState(show.PaidAmount || 0);
    const [isSaving, setIsSaving] = useState(false);

    // Tính toán tài chính
    const total = Number(show.TotalAmount) || 0;
    const deposit = Number(show.Deposit) || 0;
    const paid = Number(paidAmount) || 0;
    const remaining = total - deposit - paid;

    // Màu sắc cho công nợ
    const debtStatusColor = remaining > 0 ? 'text-red-500' : 'text-success';
    const debtStatusText = remaining > 0 ? 'CHƯA THANH TOÁN ĐỦ' : 'ĐÃ THANH TOÁN ĐỦ';

    const handleSave = async () => {
        setIsSaving(true);
        console.log("Preparing to save show:", { ID: show.ID, Status: status, PaidAmount: paid });
        
        try {
            // Gọi API cập nhật
            const success = await updateShow(show.ID, {
                Status: status,
                PaidAmount: paid
            });
            
            console.log("Update result:", success);

            if (success) {
                onUpdate(); // Refresh lại danh sách bên ngoài
                onClose();  // Đóng modal
            } else {
                alert('Không thể cập nhật hồ sơ. Vui lòng kiểm tra Console để biết chi tiết lỗi.');
            }
        } catch (err) {
            console.error("Critical error in handleSave:", err);
            alert('Lỗi hệ thống khi lưu: ' + err.message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
            {/* Modal Container */}
            <div className="bg-deep md:border border-gold/30 w-full md:max-w-3xl md:rounded-3xl rounded-t-3xl overflow-hidden shadow-2xl flex flex-col h-[90vh] md:h-auto md:max-h-[85vh] transition-all transform duration-300">
                
                {/* Header */}
                <div className="p-5 md:p-6 border-b border-white/10 flex justify-between items-start bg-glass/50 backdrop-blur-md sticky top-0 z-10">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-gold font-bold">{show.GroomName} <span className="text-white/50 text-xl">&</span> {show.BrideName}</h2>
                        <p className="text-gray-400 text-xs md:text-sm mt-1 font-mono tracking-wider">ID: {show.ID}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors group">
                        <X size={24} className="text-gray-400 group-hover:text-white transition-colors" />
                    </button>
                </div>

                {/* Body - Scrollable */}
                <div className="p-5 md:p-8 overflow-y-auto space-y-8 no-scrollbar flex-1 bg-gradient-to-b from-deep to-black/40">
                    
                    {/* 1. Trạng thái (Pipeline) */}
                    <div>
                        <h3 className="text-xs uppercase font-bold text-gray-400 mb-4 tracking-widest">Quy trình thực hiện</h3>
                        <div className="flex flex-wrap gap-2.5">
                            {STATUS_STEPS.map((step, idx) => {
                                const isActive = STATUS_STEPS.indexOf(status) >= idx;
                                const isCurrent = status === step;
                                return (
                                    <button
                                        key={step}
                                        onClick={() => setStatus(step)}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-300 relative overflow-hidden ${
                                            isCurrent 
                                            ? 'bg-gold text-deep border-gold shadow-[0_0_15px_rgba(255,215,0,0.4)] scale-105 z-10' 
                                            : isActive 
                                                ? 'bg-gold/10 text-gold border-gold/20'
                                                : 'bg-white/5 text-gray-500 border-transparent hover:bg-white/10'
                                        }`}
                                    >
                                        {STATUS_MAPPING[step]}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 2. Thông tin chính */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Cột trái */}
                        <div className="glass-panel p-5 rounded-2xl space-y-4 border border-white/5 hover:border-gold/20 transition-colors">
                            <div className="flex items-center gap-4 text-sm group">
                                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                                    <Calendar className="text-gold w-4 h-4" />
                                </div>
                                <span className="capitalize text-gray-200">{formatDateTime(show.Date)}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm group">
                                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                                    <Phone className="text-gold w-4 h-4" />
                                </div>
                                <span className="text-gray-200 tracking-wider font-mono">{show.Phone}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm group">
                                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                                    <MapPin className="text-gold w-4 h-4" />
                                </div>
                                <span className="truncate text-gray-200">{show.Location || "Chưa cập nhật địa chỉ"}</span>
                            </div>
                        </div>

                        {/* Cột phải - Ghi chú */}
                        <div className="glass-panel p-5 rounded-2xl border border-white/5 hover:border-gold/20 transition-colors flex flex-col h-full">
                            <h4 className="text-xs text-gray-400 mb-3 uppercase tracking-wider font-bold">Ghi chú & Dịch vụ</h4>
                            <div className="flex-1 space-y-4">
                                <p className="text-sm text-amber-50/90 italic bg-amber-900/10 p-3 rounded-lg border border-amber-500/10">
                                    "{show.Notes || "Không có ghi chú"}"
                                </p>
                                <div>
                                    <span className="text-[10px] text-gray-500 block mb-1">DỊCH VỤ ĐÃ CHỌN:</span>
                                    <p className="text-sm text-white line-clamp-3 leading-relaxed">{show.ServiceList}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Tài chính & Công nợ (QUAN TRỌNG) */}
                    <div className={`p-6 rounded-2xl border-2 transition-colors duration-300 relative overflow-hidden ${remaining > 0 ? 'bg-gradient-to-br from-red-950/30 to-black border-red-500/30' : 'bg-gradient-to-br from-emerald-950/30 to-black border-emerald-500/30'}`}>
                        {/* Background Decoration */}
                        <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none ${remaining > 0 ? 'bg-red-600/20' : 'bg-emerald-600/20'}`}></div>

                        <div className="flex justify-between items-center mb-6 relative z-10">
                            <h3 className="text-lg font-serif font-bold flex items-center gap-2 text-white">
                                <DollarSign size={20} className="text-gold" /> QUẢN LÝ TÀI CHÍNH
                            </h3>
                            <span className={`text-[10px] uppercase font-black px-3 py-1.5 rounded-lg border tracking-wider shadow-lg ${remaining > 0 ? 'bg-red-500 text-white border-red-400 shadow-red-900/20' : 'bg-emerald-500 text-white border-emerald-400 shadow-emerald-900/20'}`}>
                                {debtStatusText}
                            </span>
                        </div>

                        <div className="space-y-4 text-sm relative z-10">
                            {/* Summary Rows */}
                            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/5">
                                <div className="space-y-1">
                                    <span className="text-gray-400 text-xs uppercase block">Tổng giá trị HĐ</span>
                                    <span className="font-bold text-xl md:text-2xl text-white">{total.toLocaleString()}</span>
                                </div>
                                <div className="space-y-1 text-right">
                                    <span className="text-gray-400 text-xs uppercase block">Đã đặt cọc</span>
                                    <span className="font-bold text-xl md:text-2xl text-gold">{deposit.toLocaleString()}</span>
                                </div>
                            </div>
                            
                            {/* Payment Input Section */}
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 pt-2">
                                <span className="text-gray-300 font-medium flex items-center gap-2">
                                    <CheckCircle size={14} className="text-green-500" /> Đã thanh toán thêm:
                                </span>
                                <div className="flex items-center gap-3 bg-black/50 p-1.5 rounded-xl border border-white/10 focus-within:border-gold/70 transition-colors w-full md:w-auto">
                                    <input 
                                        type="number" 
                                        min="0"
                                        placeholder="0"
                                        value={paidAmount}
                                        onChange={(e) => {
                                            const val = Number(e.target.value);
                                            if (val >= 0) setPaidAmount(val);
                                        }}
                                        className="bg-transparent border-none px-3 py-2 text-right w-full md:w-40 text-lg font-bold text-white focus:outline-none placeholder-gray-600"
                                    />
                                    <span className="text-xs font-bold text-gray-500 pr-3">VNĐ</span>
                                </div>
                            </div>

                            {/* Final Result */}
                            <div className={`flex justify-between items-center p-4 rounded-xl mt-4 border ${remaining > 0 ? 'bg-red-500/10 border-red-500/20' : 'bg-emerald-500/10 border-emerald-500/20'}`}>
                                <span className="text-sm font-bold uppercase text-white/80">Còn lại phải thu:</span>
                                <span className={`text-2xl md:text-3xl font-black tracking-tight ${debtStatusColor}`}>
                                    {remaining.toLocaleString()} <span className="text-base font-normal opacity-70">VNĐ</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 md:p-6 border-t border-white/10 bg-glass/80 backdrop-blur-xl flex justify-end gap-3 sticky bottom-0 z-10 pb-8 md:pb-6">
                    <button onClick={onClose} className="px-5 py-3 rounded-xl hover:bg-white/10 text-gray-300 font-medium transition-colors text-sm">Đóng</button>
                    <button 
                        onClick={handleSave} 
                        disabled={isSaving}
                        className="px-6 md:px-8 py-3 bg-gold text-deep font-bold rounded-xl shadow-glow hover:shadow-[0_0_25px_rgba(255,215,0,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSaving ? (
                            <>
                                <div className="w-5 h-5 border-2 border-deep/30 border-t-deep rounded-full animate-spin"/> Đang lưu...
                            </>
                        ) : (
                            <><Save size={18} /> Cập nhật Hồ Sơ</>
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ShowDetailModal;
