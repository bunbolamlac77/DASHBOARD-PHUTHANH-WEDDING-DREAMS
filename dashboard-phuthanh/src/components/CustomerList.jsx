import React from 'react';
import { Search, Filter } from 'lucide-react';

const CustomerList = () => {
  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col animate-fade-in pb-20">
        
        {/* Search & Filter Header */}
        <div className="sticky top-0 bg-deep/95 backdrop-blur-xl z-20 py-2 space-y-3 mb-4">
            <div className="relative">
                 <input type="text" placeholder="Tìm tên Dâu Rể, SĐT..." className="w-full bg-glass border border-white/10 pl-12 pr-4 py-3 rounded-2xl text-sm focus:border-gold text-cream outline-none transition-all focus:bg-white/5" />
                 <Search className="absolute left-4 top-3.5 text-gray-500" size={20} />
            </div>
            
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                <button className="px-5 py-2 rounded-full bg-gold text-deep font-bold text-sm shadow-glow whitespace-nowrap">Tất cả</button>
                <button className="px-5 py-2 rounded-full bg-glass border border-white/10 text-graytext text-sm whitespace-nowrap hover:bg-white/5 flex items-center gap-2">
                    <Filter size={14} /> Chưa cọc
                </button>
                <button className="px-5 py-2 rounded-full bg-glass border border-white/10 text-graytext text-sm whitespace-nowrap hover:bg-white/5">Chưa xong</button>
            </div>
        </div>

        {/* List Items */}
        <div className="space-y-3">
            {/* Customer 1 */}
            <div className="glass-panel p-5 rounded-[24px] flex items-center justify-between group cursor-pointer active:scale-[0.99] transition-all hover:bg-glassHover">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center text-lg font-serif text-gold">
                        1
                    </div>
                    <div>
                        <h4 className="font-serif text-lg text-cream group-hover:text-gold transition-colors">Thành & Lan</h4>
                        <p className="text-xs text-graytext">25/01/2026 • Full Package</p>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <span className="text-gold font-bold text-sm">15.000.000đ</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-success/10 text-success border border-success/20">Done</span>
                </div>
            </div>

            {/* Customer 2 */}
            <div className="glass-panel p-5 rounded-[24px] flex items-center justify-between group cursor-pointer active:scale-[0.99] transition-all hover:bg-glassHover">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center text-lg font-serif text-gold">
                        2
                    </div>
                    <div>
                        <h4 className="font-serif text-lg text-cream group-hover:text-gold transition-colors">Tuấn & Vy</h4>
                        <p className="text-xs text-graytext">14/02/2026 • Studio</p>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <span className="text-gold font-bold text-sm">8.000.000đ</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-warning/10 text-warning border border-warning/20">Pending</span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default CustomerList;
