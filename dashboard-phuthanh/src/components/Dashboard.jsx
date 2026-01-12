import React from 'react';
import { TrendingUp, Users, Calendar, DollarSign, Activity, ArrowUpRight } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in pb-20 md:pb-0">
      {/* 1. Top Stats Cards (KPIs) */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {/* Doanh Thu - Full width on mobile if needed, but 2-col looks okay with span-2 */}
        <StatCard 
          icon={<DollarSign size={20} className="text-deep" />} 
          label="Doanh Thu Tháng" 
          value="125tr" 
          fullValue="125.000.000₫"
          trend="+12%" 
          color="bg-gradient-to-br from-[#D4AF37] to-[#F5D76E]"
          textColor="text-deep"
          iconBg="bg-deep/10"
          className="col-span-2 md:col-span-1"
        />
        <StatCard 
          icon={<Calendar size={20} className="text-gold" />} 
          label="Show Sắp Tới" 
          value="08" 
          trend="Tháng này" 
          color="bg-gradient-to-br from-glass to-surface border border-white/5"
          textColor="text-cream"
          iconBg="bg-white/5"
        />
        <StatCard 
          icon={<Users size={20} className="text-gold" />} 
          label="Khách Mới" 
          value="24" 
          trend="+5" 
          color="bg-gradient-to-br from-glass to-surface border border-white/5"
          textColor="text-cream"
          iconBg="bg-white/5"
        />
        <StatCard 
          icon={<Activity size={20} className="text-gold" />} 
          label="Tỷ lệ Chốt" 
          value="85%" 
          trend="Cao" 
          color="bg-gradient-to-br from-glass to-surface border border-white/5"
          textColor="text-cream"
          iconBg="bg-white/5"
          className="col-span-2 md:col-span-1"
        />
      </div>

      {/* 2. Main Content Grid (Bento Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart Section (Biểu đồ) */}
        <div className="lg:col-span-2 bg-glass/50 backdrop-blur-xl p-5 md:p-6 rounded-3xl border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg md:text-xl font-serif text-gold flex items-center gap-2">
                    <TrendingUp size={20}/> <span className="hidden md:inline">Biểu Đồ</span> Doanh Thu
                </h3>
                <select className="bg-white/5 text-xs text-cream border border-white/10 rounded-lg px-2 py-1 outline-none focus:border-gold/50">
                    <option>6 tháng qua</option>
                    <option>Năm nay</option>
                </select>
            </div>
            
            {/* Fake Chart Bars (CSS Only) */}
            <div className="flex items-end justify-between h-48 md:h-64 px-2 md:px-4 gap-2 md:gap-4 mt-4 md:mt-8">
                {[
                  { month: 'T8', height: 40, value: '40tr' },
                  { month: 'T9', height: 55, value: '55tr' },
                  { month: 'T10', height: 45, value: '45tr' },
                  { month: 'T11', height: 75, value: '75tr' },
                  { month: 'T12', height: 60, value: '60tr' },
                  { month: 'T1', height: 90, value: '90tr' },
                  { month: 'T2', height: 70, value: '70tr' }
                ].map((item, i) => (
                    <div key={i} className="w-full h-full bg-white/5 rounded-t-lg relative group/bar transition-all duration-300 hover:bg-white/10 cursor-pointer">
                        {/* Tooltip Value */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface/90 backdrop-blur border border-gold/30 text-gold text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none transform translate-y-2 group-hover/bar:translate-y-0 duration-200">
                            {item.value}
                        </div>
                        
                        {/* Bar */}
                        <div 
                            style={{ height: `${item.height}%` }} 
                            className="absolute bottom-0 w-full bg-gradient-to-t from-gold/10 via-gold/50 to-gold rounded-t-md shadow-[0_0_10px_rgba(212,175,55,0.2)] transition-all duration-700 ease-out group-hover/bar:from-gold/30 group-hover/bar:to-[#F5D76E]"
                        ></div>
                         
                         {/* Month Label */}
                         <div className="absolute -bottom-6 w-full text-center text-[10px] md:text-xs text-graytext font-medium group-hover/bar:text-gold transition-colors">
                            {item.month}
                         </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Recent Activity (Hoạt động gần đây) */}
        <div className="bg-glass/50 backdrop-blur-xl p-5 md:p-6 rounded-3xl border border-white/5 flex flex-col h-[400px] md:h-auto">
            <h3 className="text-lg md:text-xl font-serif text-gold mb-4 md:mb-6 flex justify-between items-center">
                Hoạt động gần đây
                <button className="text-xs font-sans text-graytext hover:text-white transition-colors">Xem hết</button>
            </h3>
            
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
                {[1,2,3,4,5].map((item) => (
                    <div key={item} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-gold/20 transition-all cursor-pointer group">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center text-gold font-bold text-xs shrink-0 group-hover:scale-110 transition-transform">
                            DL
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-cream truncate group-hover:text-gold transition-colors">Đám cưới Duy & Lan</p>
                            <p className="text-[10px] text-graytext truncate">Vừa chốt cọc 30 phút trước</p>
                        </div>
                        <div className="text-right shrink-0">
                             <span className="block text-xs text-success font-bold text-emerald-400">+15tr</span>
                             <span className="text-[10px] text-graytext/50">10:30</span>
                        </div>
                    </div>
                ))}
            </div>
             <button className="w-full mt-4 py-3 rounded-xl border border-gold/30 text-gold text-sm font-medium hover:bg-gold hover:text-deep transition-all flex items-center justify-center gap-2 group">
                Xem tất cả <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"/>
            </button>
        </div>
      </div>
    </div>
  );
};

// Component con hiển thị thẻ nhỏ (để code gọn hơn)
const StatCard = ({ icon, label, value, fullValue, trend, color, textColor, iconBg, className = "" }) => (
  <div className={`${color} p-4 md:p-6 rounded-3xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 ${className}`}>
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="flex justify-between items-start mb-3 md:mb-4">
          <div className={`p-2.5 md:p-3 rounded-xl ${iconBg} backdrop-blur-md`}>
              {icon}
          </div>
          <span className={`text-[10px] md:text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1 ${color.includes('bg-gold') || color.includes('from-[#D4AF37]') ? 'bg-deep/10 text-deep' : 'bg-emerald-500/20 text-emerald-400'}`}>
              {trend}
          </span>
      </div>
      <div>
          <p className={`text-xs md:text-sm mb-0.5 md:mb-1 ${textColor === 'text-deep' ? 'text-deep/70' : 'text-graytext'}`}>{label}</p>
          <h3 className={`text-xl md:text-2xl font-bold font-serif truncate ${textColor}`}>
            {value}
          </h3>
          {fullValue && <p className="text-[10px] opacity-60 hidden md:block">{fullValue}</p>}
      </div>
  </div>
);

export default Dashboard;
