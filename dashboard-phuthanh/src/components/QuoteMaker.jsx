import React, { useState } from 'react';
import { Camera, Video, Sparkles, QrCode, Save, Loader } from 'lucide-react';
import { api } from '../services/api';

const QuoteMaker = () => {
    const [loading, setLoading] = useState(false);
    const [selectedServices, setSelectedServices] = useState([]);
    
    // Quản lý form nhập liệu
    const [form, setForm] = useState({
        groom: '', bride: '', date: '', phone: ''
    });

    const prices = {
        'Chụp Ảnh': 5000000,
        'Quay Phim': 7000000,
        'Makeup': 2500000
    };

    const toggleService = (service) => {
        if (selectedServices.includes(service)) {
            setSelectedServices(selectedServices.filter(s => s !== service));
        } else {
            setSelectedServices([...selectedServices, service]);
        }
    };

    const totalAmount = selectedServices.reduce((sum, s) => sum + prices[s], 0);

    const handleSave = async () => {
        if (!form.groom || !form.bride || selectedServices.length === 0) {
            alert("Vui lòng nhập tên Dâu Rể và chọn ít nhất 1 dịch vụ!");
            return;
        }

        setLoading(true);
        const payload = {
            groomName: form.groom,
            brideName: form.bride,
            phone: form.phone,
            date: form.date || new Date().toISOString(),
            serviceList: selectedServices.join(', '),
            totalAmount: totalAmount
        };

        const res = await api.addShow(payload);
        setLoading(false);

        if (res.status === 'success') {
            alert(`✅ ${res.message}`);
            // Reset form
            setForm({ groom: '', bride: '', date: '', phone: '' });
            setSelectedServices([]);
        } else {
            alert("❌ Lỗi: " + res.message);
        }
    };

    return (
        <div className="animate-fade-in max-w-4xl mx-auto pb-20">
            <div className="glass-panel p-6 md:p-10 rounded-[32px] border border-gold/20 relative overflow-hidden">
                <h2 className="text-2xl font-serif text-center mb-8 text-gold">Tạo Báo Giá & Lưu Show</h2>
                
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-1">
                            <label className="text-xs text-graytext ml-2 mb-1 block">Tên Chú Rể</label>
                            <input 
                                value={form.groom}
                                onChange={e => setForm({...form, groom: e.target.value})}
                                type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-cream focus:border-gold outline-none" placeholder="Nhập tên..." 
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="text-xs text-graytext ml-2 mb-1 block">Tên Cô Dâu</label>
                            <input 
                                value={form.bride}
                                onChange={e => setForm({...form, bride: e.target.value})}
                                type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-cream focus:border-gold outline-none" placeholder="Nhập tên..." 
                            />
                        </div>
                         <div className="col-span-1">
                            <label className="text-xs text-graytext ml-2 mb-1 block">Ngày cưới</label>
                            <input 
                                value={form.date}
                                onChange={e => setForm({...form, date: e.target.value})}
                                type="date" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-cream focus:border-gold outline-none"
                            />
                        </div>
                         <div className="col-span-1">
                            <label className="text-xs text-graytext ml-2 mb-1 block">Số điện thoại</label>
                            <input 
                                value={form.phone}
                                onChange={e => setForm({...form, phone: e.target.value})}
                                type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-cream focus:border-gold outline-none" placeholder="09xxx..." 
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs text-graytext ml-2 mb-3 block">Chọn Dịch Vụ</label>
                        <div className="grid grid-cols-3 gap-3">
                            {Object.keys(prices).map((item) => (
                                <button 
                                    key={item}
                                    onClick={() => toggleService(item)}
                                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all active:scale-95 ${
                                        selectedServices.includes(item) 
                                        ? 'border-gold bg-gold/10 text-gold' 
                                        : 'border-white/10 bg-black/20 text-graytext hover:bg-white/5'
                                    }`}
                                >
                                    {item === 'Chụp Ảnh' && <Camera size={24} />}
                                    {item === 'Quay Phim' && <Video size={24} />}
                                    {item === 'Makeup' && <Sparkles size={24} />}
                                    <span className="text-xs">{item}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-graytext">Tổng cộng</p>
                            <h3 className="text-2xl font-bold text-gold">{totalAmount.toLocaleString()}đ</h3>
                        </div>
                        <button 
                            onClick={handleSave}
                            disabled={loading}
                            className="bg-gold text-deep px-8 py-3 rounded-full font-bold shadow-glow hover:bg-white transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                            {loading ? <Loader className="animate-spin" size={18} /> : <Save size={18} />}
                            {loading ? 'Đang lưu...' : 'Lưu Show'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuoteMaker;
