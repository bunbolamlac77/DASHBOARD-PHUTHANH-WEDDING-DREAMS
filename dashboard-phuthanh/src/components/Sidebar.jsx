import { LayoutDashboard, Users, FilePlus, Calendar, Settings, Bookmark } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {

  const getNavItemClass = (tabName) => {
    const baseClass = "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all group";
    return activeTab === tabName
      ? `${baseClass} bg-white/5 text-gold shadow-glow`
      : `${baseClass} text-graytext hover:bg-white/5 hover:text-white`;
  };

  return (
    /* Desktop only - hidden on mobile */
    <aside className="hidden md:flex flex-col w-64 h-full px-6 pt-8 pb-6 bg-deep border-r border-white/5 shrink-0">

      {/* Logo */}
      <div className="flex items-center gap-3 mb-12">
        <img src="/logo.png" alt="Phu Thanh Wedding Dreams" className="w-12 h-12 object-contain" />
        <div>
          <h1 className="font-serif text-lg text-gold leading-none">Phu Thanh</h1>
          <p className="text-[10px] text-graytext uppercase tracking-widest mt-1">Wedding Dreams</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        <button onClick={() => setActiveTab('dashboard')} className={getNavItemClass('dashboard')}>
          <LayoutDashboard size={20} />
          <span className="font-medium">Dashboard</span>
        </button>
        <button onClick={() => setActiveTab('customers')} className={getNavItemClass('customers')}>
          <Users size={20} />
          <span className="font-medium">Danh sách Show</span>
        </button>
        <button onClick={() => setActiveTab('quote')} className={getNavItemClass('quote')}>
          <FilePlus size={20} />
          <span className="font-medium">Tạo Báo Giá</span>
        </button>
        <button onClick={() => setActiveTab('leads')} className={getNavItemClass('leads')}>
          <Bookmark size={20} />
          <span className="font-medium">Khách Tiềm Năng</span>
        </button>
        <button onClick={() => setActiveTab('calendar')} className={getNavItemClass('calendar')}>
          <Calendar size={20} />
          <span className="font-medium">Lịch Trình</span>
        </button>
      </nav>

      {/* Bottom Actions */}
      <div className="border-t border-white/5 pt-6 space-y-4">
        <button onClick={() => setActiveTab('settings')} className={getNavItemClass('settings')}>
          <Settings size={20} />
          <span className="font-medium">Cài đặt</span>
        </button>

        <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-2xl border border-white/5">
          <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center border border-gold/30">
            <span className="font-bold text-gold text-xs">PT</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-bold text-cream truncate">Phú Thành</p>
            <p className="text-[10px] text-success">Online</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
