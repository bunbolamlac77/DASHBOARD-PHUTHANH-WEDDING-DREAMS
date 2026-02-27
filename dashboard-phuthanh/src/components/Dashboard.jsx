import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Calendar, DollarSign, Activity, ArrowUpRight, AlertCircle, BellRing, CheckCircle2 } from 'lucide-react';
import { getShows, getLeads } from '../services/api';

const Dashboard = () => {
  const [shows, setShows] = useState([]);
  const [leads, setLeads] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const [rawShows, rawLeads] = await Promise.all([getShows(), getLeads()]);

        // Normalize shows
        const normalized = Array.isArray(rawShows) ? rawShows.map(item => {
          const n = {};
          Object.keys(item).forEach(k => { n[k.toLowerCase()] = item[k]; });
          return {
            ID: n.id || '',
            GroomName: n.groomname || n.groom || '',
            BrideName: n.bridename || n.bride || '',
            Date: n.date || '',
            Location: n.location || '',
            TotalAmount: Number(n.totalamount) || 0,
            PaidAmount: Number(n.paidamount) || 0,
            Deposit: Number(n.deposit) || 0,
            Status: n.status || 'Pending',
            ServiceList: n.servicelist || '',
          };
        }).filter(s => s.GroomName.trim() !== '' || s.BrideName.trim() !== '') : [];

        setShows(normalized);
        setLeads(Array.isArray(rawLeads) ? rawLeads : []);

        // --- Build notifications ---
        const notif = [];
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        normalized.forEach((show, idx) => {
          if (show.Date && show.Status !== 'Done' && show.Status !== 'Delivery') {
            const showDate = new Date(show.Date);
            if (!isNaN(showDate.getTime()) && show.Date.includes('-')) {
              const isToday = showDate.toDateString() === today.toDateString();
              const isTomorrow = showDate.toDateString() === tomorrow.toDateString();
              if (isToday) {
                notif.push({
                  id: `today-${idx}`, type: 'upcoming', urgent: true,
                  title: 'Lịch chụp hôm nay',
                  message: `Hôm nay có lịch chụp của ${show.GroomName} & ${show.BrideName}${show.Location ? ` tại ${show.Location}` : ''}.`
                });
              } else if (isTomorrow) {
                notif.push({
                  id: `tomorrow-${idx}`, type: 'upcoming', urgent: false,
                  title: 'Lịch chụp ngày mai',
                  message: `Mai có lịch chụp của ${show.GroomName} & ${show.BrideName}${show.Location ? ` tại ${show.Location}` : ''}.`
                });
              }
            }
          }
          if ((show.Status === 'Delivery' || show.Status === 'Done') && show.TotalAmount > (show.Deposit + show.PaidAmount)) {
            const debt = show.TotalAmount - show.Deposit - show.PaidAmount;
            notif.push({
              id: `debt-${idx}`, type: 'debt', urgent: debt >= 5000000,
              title: 'Nhắc nợ chưa thanh toán',
              message: `${show.GroomName} & ${show.BrideName} đã giao sản phẩm, còn nợ: ${debt.toLocaleString()}đ.`
            });
          }
        });

        notif.sort((a, b) => {
          if (a.urgent && !b.urgent) return -1;
          if (!a.urgent && b.urgent) return 1;
          if (a.type === 'upcoming' && b.type === 'debt') return -1;
          if (a.type === 'debt' && b.type === 'upcoming') return 1;
          return 0;
        });
        setNotifications(notif);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // --- KPI Calculations ---
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Doanh thu tháng này: tổng TotalAmount của shows có ngày trong tháng hiện tại
  const revenueThisMonth = shows.reduce((sum, s) => {
    if (!s.Date) return sum;
    const d = new Date(s.Date);
    if (!isNaN(d.getTime()) && d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
      return sum + s.TotalAmount;
    }
    return sum;
  }, 0);

  // Shows sắp tới: chưa xong, ngày >= hôm nay
  const upcomingShows = shows.filter(s => {
    if (!s.Date || s.Status === 'Done') return false;
    const d = new Date(s.Date);
    return !isNaN(d.getTime()) && d >= new Date(now.toDateString());
  });

  // Tổng shows đã hoàn thành
  const doneShows = shows.filter(s => s.Status === 'Done').length;
  const conversionRate = shows.length > 0 ? Math.round((doneShows / shows.length) * 100) : 0;

  // Khách mới (Leads)
  const newLeadsCount = leads.length;

  // --- Chart: doanh thu 7 tháng gần nhất (tính thực) ---
  const chartMonths = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(currentYear, currentMonth - i, 1);
    const mLabel = `T${d.getMonth() + 1}`;
    const mRevenue = shows.reduce((sum, s) => {
      if (!s.Date) return sum;
      const sd = new Date(s.Date);
      if (!isNaN(sd.getTime()) && sd.getMonth() === d.getMonth() && sd.getFullYear() === d.getFullYear()) {
        return sum + s.TotalAmount;
      }
      return sum;
    }, 0);
    chartMonths.push({ month: mLabel, revenue: mRevenue });
  }
  const maxRevenue = Math.max(...chartMonths.map(m => m.revenue), 1);

  // --- Recent: 5 shows mới nhất ---
  const recentShows = [...shows]
    .sort((a, b) => new Date(b.Date || 0) - new Date(a.Date || 0))
    .slice(0, 5);

  const formatMoney = (n) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1).replace('.0', '')}tr`;
    if (n >= 1000) return `${Math.round(n / 1000)}k`;
    return n.toLocaleString();
  };

  return (
    <div className="space-y-6 animate-fade-in pb-20 md:pb-0">
      
      {/* 0. Notifications */}
      <div className="mb-6">
        <h3 className="text-lg md:text-xl font-serif text-gold flex items-center gap-2 mb-4">
          <BellRing size={20}/> Việc cần làm hôm nay
        </h3>
        {loading ? (
          <div className="bg-glass border border-white/5 rounded-2xl p-4 flex items-center justify-center h-20">
            <div className="w-5 h-5 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : notifications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notifications.map(note => (
              <div
                key={note.id}
                className={`p-4 rounded-2xl border flex items-start gap-3 transition-transform hover:-translate-y-1 ${
                  note.type === 'debt'
                    ? (note.urgent ? 'bg-red-500/10 border-red-500/30' : 'bg-orange-500/10 border-orange-500/30')
                    : 'bg-yellow-500/10 border-yellow-500/30'
                }`}
              >
                <div className={`mt-0.5 shrink-0 ${
                  note.type === 'debt' ? (note.urgent ? 'text-red-400' : 'text-orange-400') : 'text-yellow-400'
                }`}>
                  {note.type === 'upcoming' ? <Calendar size={18} /> : <AlertCircle size={18} />}
                </div>
                <div>
                  <p className={`text-sm font-bold mb-1 ${
                    note.type === 'debt' ? (note.urgent ? 'text-red-400' : 'text-orange-400') : 'text-yellow-400'
                  }`}>{note.title}</p>
                  <p className="text-sm text-cream/90 leading-relaxed">{note.message}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-glass border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-3">
              <CheckCircle2 size={24} className="text-emerald-400" />
            </div>
            <p className="text-cream font-medium">Bạn đã hoàn thành mọi việc!</p>
            <p className="text-sm text-graytext mt-1">Hôm nay không có lịch trình hoặc công việc cấp bách nào.</p>
          </div>
        )}
      </div>

      {/* 1. KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <StatCard
          icon={<DollarSign size={20} className="text-deep" />}
          label="Doanh Thu Tháng"
          value={loading ? '...' : formatMoney(revenueThisMonth)}
          fullValue={loading ? '' : `${revenueThisMonth.toLocaleString()}₫`}
          trend={`T${currentMonth + 1}/${currentYear}`}
          color="bg-gradient-to-br from-[#D4AF37] to-[#F5D76E]"
          textColor="text-deep"
          iconBg="bg-deep/10"
          className="col-span-2 md:col-span-1"
        />
        <StatCard
          icon={<Calendar size={20} className="text-gold" />}
          label="Show Sắp Tới"
          value={loading ? '...' : String(upcomingShows.length).padStart(2, '0')}
          trend="Chưa hoàn thành"
          color="bg-gradient-to-br from-glass to-surface border border-white/5"
          textColor="text-cream"
          iconBg="bg-white/5"
        />
        <StatCard
          icon={<Users size={20} className="text-gold" />}
          label="Khách Tiềm Năng"
          value={loading ? '...' : String(newLeadsCount)}
          trend="Chờ xác nhận"
          color="bg-gradient-to-br from-glass to-surface border border-white/5"
          textColor="text-cream"
          iconBg="bg-white/5"
        />
        <StatCard
          icon={<Activity size={20} className="text-gold" />}
          label="Tỷ lệ Hoàn thành"
          value={loading ? '...' : `${conversionRate}%`}
          trend={`${doneShows}/${shows.length} show`}
          color="bg-gradient-to-br from-glass to-surface border border-white/5"
          textColor="text-cream"
          iconBg="bg-white/5"
          className="col-span-2 md:col-span-1"
        />
      </div>

      {/* 2. Chart + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Biểu đồ doanh thu 7 tháng */}
        <div className="lg:col-span-2 bg-glass/50 backdrop-blur-xl p-5 md:p-6 rounded-3xl border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg md:text-xl font-serif text-gold flex items-center gap-2">
              <TrendingUp size={20}/> <span className="hidden md:inline">Biểu Đồ</span> Doanh Thu
            </h3>
            <span className="text-xs text-graytext bg-white/5 border border-white/10 rounded-lg px-3 py-1">
              7 tháng gần đây
            </span>
          </div>
          {loading ? (
            <div className="h-48 md:h-64 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="flex items-end justify-between h-48 md:h-64 px-2 md:px-4 gap-2 md:gap-4 mt-4 md:mt-8">
              {chartMonths.map((item, i) => {
                const heightPct = maxRevenue > 0 ? Math.max((item.revenue / maxRevenue) * 100, item.revenue > 0 ? 5 : 0) : 0;
                return (
                  <div key={i} className="w-full h-full bg-white/5 rounded-t-lg relative group/bar transition-all duration-300 hover:bg-white/10 cursor-pointer">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface/90 backdrop-blur border border-gold/30 text-gold text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none transform translate-y-2 group-hover/bar:translate-y-0 duration-200">
                      {item.revenue > 0 ? formatMoney(item.revenue) : '—'}
                    </div>
                    <div
                      style={{ height: `${heightPct}%` }}
                      className="absolute bottom-0 w-full bg-gradient-to-t from-gold/10 via-gold/50 to-gold rounded-t-md shadow-[0_0_10px_rgba(212,175,55,0.2)] transition-all duration-700 ease-out group-hover/bar:from-gold/30 group-hover/bar:to-[#F5D76E]"
                    ></div>
                    <div className="absolute -bottom-6 w-full text-center text-[10px] md:text-xs text-graytext font-medium group-hover/bar:text-gold transition-colors">
                      {item.month}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Hoạt động gần đây */}
        <div className="bg-glass/50 backdrop-blur-xl p-5 md:p-6 rounded-3xl border border-white/5 flex flex-col h-[400px] md:h-auto">
          <h3 className="text-lg md:text-xl font-serif text-gold mb-4 md:mb-6 flex justify-between items-center">
            Hoạt động gần đây
          </h3>
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 no-scrollbar">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : recentShows.length === 0 ? (
              <p className="text-graytext text-sm text-center py-8">Chưa có dữ liệu.</p>
            ) : (
              recentShows.map((show, i) => {
                const initials = [show.GroomName, show.BrideName]
                  .filter(Boolean)
                  .map(n => n.charAt(0).toUpperCase())
                  .join('');
                const statusColors = {
                  'Pending': 'text-graytext',
                  'Deposited': 'text-blue-400',
                  'Shooting': 'text-yellow-400',
                  'Editing': 'text-purple-400',
                  'Delivery': 'text-orange-400',
                  'Done': 'text-emerald-400',
                };
                const statusLabels = {
                  'Pending': 'Chờ xử lý', 'Deposited': 'Đã cọc', 'Shooting': 'Chụp ảnh',
                  'Editing': 'Hậu kỳ', 'Delivery': 'Giao SP', 'Done': 'Hoàn thành'
                };
                return (
                  <div key={show.ID || i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-gold/20 transition-all group">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center text-gold font-bold text-xs shrink-0 group-hover:scale-110 transition-transform">
                      {initials || '?'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-cream truncate group-hover:text-gold transition-colors">
                        {show.GroomName} & {show.BrideName}
                      </p>
                      <p className="text-[10px] text-graytext truncate">
                        {show.Date ? new Date(show.Date).toLocaleDateString('vi-VN') : 'Chưa có ngày'} · {show.Location || ''}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className={`block text-xs font-bold ${statusColors[show.Status] || 'text-graytext'}`}>
                        {statusLabels[show.Status] || show.Status}
                      </span>
                      <span className="text-[10px] text-graytext/50">{formatMoney(show.TotalAmount)}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Component thẻ KPI
const StatCard = ({ icon, label, value, fullValue, trend, color, textColor, iconBg, className = "" }) => (
  <div className={`${color} p-4 md:p-6 rounded-3xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 ${className}`}>
    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <div className="flex justify-between items-start mb-3 md:mb-4">
      <div className={`p-2.5 md:p-3 rounded-xl ${iconBg} backdrop-blur-md`}>
        {icon}
      </div>
      <span className={`text-[10px] md:text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1 ${color.includes('from-[#D4AF37]') ? 'bg-deep/10 text-deep' : 'bg-emerald-500/20 text-emerald-400'}`}>
        {trend}
      </span>
    </div>
    <div>
      <p className={`text-xs md:text-sm mb-0.5 md:mb-1 ${textColor === 'text-deep' ? 'text-deep/70' : 'text-graytext'}`}>{label}</p>
      <h3 className={`text-xl md:text-2xl font-bold font-serif truncate ${textColor}`}>{value}</h3>
      {fullValue && <p className="text-[10px] opacity-60 hidden md:block">{fullValue}</p>}
    </div>
  </div>
);

export default Dashboard;
