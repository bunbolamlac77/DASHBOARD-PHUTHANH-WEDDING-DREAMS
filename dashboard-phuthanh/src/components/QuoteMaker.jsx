import React, { useState } from 'react';
import { Camera, Video, Sparkles, QrCode } from 'lucide-react';

const QuoteMaker = () => {
    // State quản lý dịch vụ đang chọn
    const [selectedServices, setSelectedServices] = useState([]);

    const toggleService = (service) => {
        if (selectedServices.includes(service)) {
            setSelectedServices(selectedServices.filter(s => s !== service));
        } else {
            setSelectedServices([...selectedServices, service]);
        }
    };

    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <div className="glass-panel p-6 md:p-10 rounded-[32px] border border-gold/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"></div>
                <h2 className="text-2xl font-serif text-center mb-8 text-gold">Tạo Báo Giá Mới</h2>
                
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 md:col-span-1">
                            <label className="text-xs text-graytext ml-2 mb-1 block">Tên Chú Rể</label>
                            <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-cream focus:border-gold outline-none transition-colors" placeholder="Nhập tên..." />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <label className="text-xs text-graytext ml-2 mb-1 block">Tên Cô Dâu</label>
                            <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-cream focus:border-gold outline-none transition-colors" placeholder="Nhập tên..." />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs text-graytext ml-2 mb-3 block">Chọn Dịch Vụ</label>
                        <div className="grid grid-cols-3 gap-3">
                            {['Chụp Ảnh', 'Quay Phim', 'Makeup'].map((item) => (
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
                            <p className="text-xs text-graytext">Tổng cộng (Tạm tính)</p>
                            <h3 className="text-2xl font-bold text-gold">0đ</h3>
                        </div>
                        <button className="bg-gold text-deep px-8 py-3 rounded-full font-bold shadow-glow hover:bg-white transition-colors flex items-center gap-2">
                            <QrCode size={18} />
                            Xuất Báo Giá
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuoteMaker;
