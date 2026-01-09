import React from 'react';
import { TrendingUp, Users, Calendar, DollarSign, Activity } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* 1. Top Stats Cards (KPIs) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<DollarSign size={24} className="text-deep" />} 
          label="Doanh Thu Tháng" 
          value="125.000.000₫" 
          trend="+12%" 
          color="bg-gold"
        />
        <StatCard 
          icon={<Calendar size={24} className="text-white" />} 
          label="Show Sắp Tới" 
          value="08" 
          trend="Tháng này" 
          color="bg-glass"
        />
        <StatCard 
          icon={<Users size={24} className="text-white" />} 
          label="Khách Hàng Mới" 
          value="24" 
          trend="+5" 
          color="bg-glass"
        />
        <StatCard 
          icon={<Activity size={24} className="text-white" />} 
          label="Tỷ lệ Chốt" 
          value="85%" 
          trend="Cao" 
          color="bg-glass"
        />
      </div>

      {/* 2. Main Content Grid (Bento Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
        
        {/* Chart Section (Biểu đồ) */}
        <div className="lg:col-span-2 bg-glass p-6 rounded-3xl border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            <h3 className="text-xl font-serif text-gold mb-6 flex items-center gap-2">
                <TrendingUp size={20}/> Biểu Đồ Doanh Thu
            </h3>
            
            {/* Fake Chart Bars (CSS Only) */}
            <div className="flex items-end justify-between h-64 px-4 gap-4 mt-8">
                {[
                  { month: 'T8', height: 40, value: '40.000.000đ' },
                  { month: 'T9', height: 55, value: '55.000.000đ' },
                  { month: 'T10', height: 45, value: '45.000.000đ' },
                  { month: 'T11', height: 75, value: '75.000.000đ' },
                  { month: 'T12', height: 60, value: '60.000.000đ' },
                  { month: 'T1', height: 90, value: '90.000.000đ' },
                  { month: 'T2', height: 70, value: '70.000.000đ' }
                ].map((item, i) => (
                    <div key={i} className="w-full h-full bg-white/5 rounded-t-lg relative group/bar hover:bg-white/10 transition-colors cursor-pointer">
                        {/* Tooltip Value */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface border border-gold/30 text-gold text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                            {item.value}
                        </div>
                        
                        {/* Bar */}
                        <div 
                            style={{ height: `${item.height}%` }} 
                            className="absolute bottom-0 w-full bg-gradient-to-t from-gold/20 to-gold rounded-t-lg shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all duration-1000 ease-out group-hover/bar:from-gold/40 group-hover/bar:to-[#F5D76E]"
                        ></div>
                         
                         {/* Month Label */}
                         <div className="absolute -bottom-6 w-full text-center text-xs text-graytext font-medium group-hover/bar:text-white transition-colors">
                            {item.month}
                         </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Recent Activity (Hoạt động gần đây) */}
        <div className="bg-glass p-6 rounded-3xl border border-white/5 flex flex-col">
            <h3 className="text-xl font-serif text-gold mb-6">Hoạt động gần đây</h3>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {[1,2,3,4].map((item) => (
                    <div key={item} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gold font-bold text-sm">
                            DL
                        </div>
                        <div>
                            <p className="text-sm font-medium text-cream">Đám cưới Duy & Lan</p>
                            <p className="text-xs text-graytext">Vừa chốt cọc 30 phút trước</p>
                        </div>
                        <span className="ml-auto text-xs text-gold font-bold">+15tr</span>
                    </div>
                ))}
            </div>
             <button className="w-full mt-4 py-3 rounded-xl border border-gold/30 text-gold text-sm font-medium hover:bg-gold hover:text-deep transition-all">
                Xem tất cả
            </button>
        </div>
      </div>
    </div>
  );
};

// Component con hiển thị thẻ nhỏ (để code gọn hơn)
const StatCard = ({ icon, label, value, trend, color }) => (
  <div className={`${color} p-6 rounded-3xl border border-white/5 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300`}>
      <div className="flex justify-between items-start mb-4">
          <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md">
              {icon}
          </div>
          <span className={`text-xs font-bold px-2 py-1 rounded-lg ${color === 'bg-gold' ? 'bg-deep/10 text-deep' : 'bg-success/20 text-success'}`}>
              {trend}
          </span>
      </div>
      <div>
          <p className={`text-sm mb-1 ${color === 'bg-gold' ? 'text-deep/70' : 'text-graytext'}`}>{label}</p>
          <h3 className={`text-2xl font-bold font-serif ${color === 'bg-gold' ? 'text-deep' : 'text-gold'}`}>{value}</h3>
      </div>
  </div>
);

export default Dashboard;
