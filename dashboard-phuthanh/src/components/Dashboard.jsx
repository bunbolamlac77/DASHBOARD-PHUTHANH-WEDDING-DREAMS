import React from 'react';
import { TrendingUp, Edit3, Printer, MapPin, Clock, Camera, Image, Check, ArrowRight } from 'lucide-react';

const Dashboard = ({ setActiveTab }) => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in pb-20">
      
      {/* --- BENTO GRID SYSTEM --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
        
        {/* 1. REVENUE CARD (Doanh thu) */}
        <div className="glass-panel rounded-[32px] p-6 md:p-8 col-span-1 md:col-span-2 relative overflow-hidden group h-64 md:h-80 flex flex-col justify-between">
            <div className="absolute -top-20 -left-20 w-48 h-48 bg-gold/10 blur-[80px] rounded-full group-hover:bg-gold/20 transition-all duration-700"></div>
            
            <div className="relative z-10 flex justify-between items-start">
                <div>
                    <p className="text-graytext text-xs md:text-sm font-medium uppercase tracking-wider mb-2">Tổng Doanh Thu (T1)</p>
                    <h1 className="text-4xl md:text-5xl font-serif text-white tracking-tight leading-none group-hover:scale-105 transition-transform origin-left">
                        85.000<span className="text-2xl text-gold">.000đ</span>
                    </h1>
                </div>
                <span className="px-3 py-1 bg-success/20 text-success text-xs font-bold rounded-full border border-success/20 flex items-center gap-1">
                    <TrendingUp size={12} /> +12%
                </span>
            </div>

            {/* Wave Chart SVG */}
            <div className="w-full h-24 md:h-32 relative mt-auto">
                <svg viewBox="0 0 400 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4"/>
                            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0"/>
                        </linearGradient>
                    </defs>
                    <path d="M0,80 Q50,60 100,85 T200,40 T300,70 T400,20 V100 H0 Z" fill="url(#chartGrad)"/>
                    <path d="M0,80 Q50,60 100,85 T200,40 T300,70 T400,20" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" className="wave-path"/>
                    <circle cx="200" cy="40" r="4" fill="#FFF" className="animate-ping-slow"/>
                    <circle cx="200" cy="40" r="4" fill="#FFF"/>
                </svg>
            </div>
        </div>

        {/* 2. PROGRESS RINGS (Trạng thái) */}
        <div className="col-span-1 md:col-span-1 flex flex-col gap-4 md:gap-6">
            {/* Card: Chưa Edit */}
            <div className="glass-panel rounded-[32px] p-4 flex-1 flex flex-row md:flex-col items-center justify-between md:justify-center relative group cursor-pointer hover:bg-glassHover">
                <div className="relative w-16 h-16 md:w-20 md:h-20">
                    <svg className="w-full h-full -rotate-90">
                        <circle cx="50%" cy="50%" r="40%" stroke="rgba(255,255,255,0.1)" strokeWidth="6" fill="none"/>
                        <circle cx="50%" cy="50%" r="40%" stroke="#F59E0B" strokeWidth="6" fill="none" strokeDasharray="251" strokeDashoffset="80" strokeLinecap="round" className="transition-all duration-1000 group-hover:stroke-dashoffset-40"/>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Edit3 size={20} className="text-warning" />
                    </div>
                </div>
                <div className="text-right md:text-center pr-4 md:pr-0">
                    <h4 className="text-xl font-bold text-cream">03</h4>
                    <p className="text-xs text-graytext">Chưa Edit</p>
                </div>
            </div>

            {/* Card: Chờ In */}
            <div className="glass-panel rounded-[32px] p-4 flex-1 flex flex-row md:flex-col items-center justify-between md:justify-center relative group cursor-pointer hover:bg-glassHover">
                <div className="relative w-16 h-16 md:w-20 md:h-20">
                    <svg className="w-full h-full -rotate-90">
                        <circle cx="50%" cy="50%" r="40%" stroke="rgba(255,255,255,0.1)" strokeWidth="6" fill="none"/>
                        <circle cx="50%" cy="50%" r="40%" stroke="#10B981" strokeWidth="6" fill="none" strokeDasharray="251" strokeDashoffset="50" strokeLinecap="round"/>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Printer size={20} className="text-success" />
                    </div>
                </div>
                <div className="text-right md:text-center pr-4 md:pr-0">
                    <h4 className="text-xl font-bold text-cream">01</h4>
                    <p className="text-xs text-graytext">Chờ In</p>
                </div>
            </div>
        </div>

        {/* 3. UPCOMING CARD (Sắp tới) */}
        <div className="col-span-1 md:col-span-1 glass-panel rounded-[32px] p-6 flex flex-col justify-between relative overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/80 to-transparent"></div>
            
            <div className="relative z-10 flex justify-between">
                <span className="px-2.5 py-1 bg-gold/90 text-deep text-[10px] font-bold uppercase rounded-md shadow-glow">Ngày mai</span>
                <div className="w-8 h-8 rounded-full bg-glass flex items-center justify-center border border-white/10 group-hover:bg-gold group-hover:text-deep transition-colors">
                    <MapPin size={16} />
                </div>
            </div>
            
            <div className="relative z-10 mt-4">
                <div className="text-gold text-xs font-bold mb-1 flex items-center gap-1">
                    <Clock size={12} /> 08:00 AM
                </div>
                <h3 className="text-xl font-serif text-white leading-tight">Hùng & Mai</h3>
                <p className="text-xs text-gray-300 mt-1 truncate">Vĩnh Long City Center</p>
            </div>
        </div>
      </div>

      {/* --- RECENT ACTIVITY LIST --- */}
      <div className="mt-8">
        <div className="flex justify-between items-end mb-4 px-2">
            <h3 className="text-lg md:text-xl font-serif text-cream">Hoạt động gần đây</h3>
            <button onClick={() => setActiveTab('customers')} className="text-xs text-gold hover:text-white transition-colors flex items-center gap-1">
                Xem tất cả <ArrowRight size={12} />
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Item 1 */}
            <div className="glass-panel p-4 rounded-3xl flex items-center gap-4 group cursor-pointer hover:bg-white/5">
                <div className="w-14 h-14 rounded-2xl bg-surface border border-white/5 flex flex-col items-center justify-center text-center leading-none group-hover:border-gold/50 transition-colors">
                    <span className="text-xs font-bold text-gray-400">JAN</span>
                    <span className="text-xl font-bold text-gold">25</span>
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-lg text-cream truncate group-hover:text-gold transition-colors">Thành & Lan</h4>
                    <p className="text-xs text-graytext flex items-center gap-1">
                        <Camera size={12} /> Phóng sự + Quay
                    </p>
                </div>
                <span className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center text-success border border-success/20">
                    <Check size={16} />
                </span>
            </div>

             {/* Item 2 */}
             <div className="glass-panel p-4 rounded-3xl flex items-center gap-4 group cursor-pointer hover:bg-white/5 opacity-80">
                <div className="w-14 h-14 rounded-2xl bg-surface border border-white/5 flex flex-col items-center justify-center text-center leading-none">
                    <span className="text-xs font-bold text-gray-400">FEB</span>
                    <span className="text-xl font-bold text-cream">14</span>
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-lg text-cream truncate group-hover:text-gold transition-colors">Tuấn & Vy</h4>
                    <p className="text-xs text-graytext flex items-center gap-1">
                        <Image size={12} /> Pre-wedding Studio
                    </p>
                </div>
                 <span className="w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center text-warning border border-warning/20">
                    <Clock size={16} />
                </span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
