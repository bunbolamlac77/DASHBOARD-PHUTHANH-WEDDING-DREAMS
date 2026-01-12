import { LayoutDashboard, Users, FilePlus, Calendar, Settings, LogOut, X } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  
  // Hàm tạo Class động cho nút bấm (để hiện màu vàng khi đang chọn)
  const getNavItemClass = (tabName) => {
    const baseClass = "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all group";
    return activeTab === tabName 
      ? `${baseClass} bg-white/5 text-gold shadow-glow` // Active
      : `${baseClass} text-graytext hover:bg-white/5 hover:text-white`; // Inactive
  };

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    if (onClose) onClose(); // Close sidebar on mobile when item clicked
  };

  return (
    <>
    <aside className={`
        fixed md:static inset-y-0 left-0 z-50 
        w-64 h-full p-6 bg-deep border-r border-white/5 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
    `}>
        {/* Close Button Mobile */}
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 md:hidden text-graytext hover:text-white"
        >
            <X size={24} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-12">
            <img src="/logo.png" alt="Phu Thanh Wedding" className="w-12 h-12 object-contain" />
            <div>
                <h1 className="font-serif text-lg text-gold leading-none">Phu Thanh</h1>
                <p className="text-[10px] text-graytext uppercase tracking-widest mt-1">Wedding Dreams</p>
            </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
            <button onClick={() => handleNavClick('dashboard')} className={getNavItemClass('dashboard')}>
                <LayoutDashboard size={20} />
                <span className="font-medium">Dashboard</span>
            </button>
            <button onClick={() => handleNavClick('customers')} className={getNavItemClass('customers')}>
                <Users size={20} />
                <span className="font-medium">Danh sách Show</span>
            </button>
            <button onClick={() => handleNavClick('quote')} className={getNavItemClass('quote')}>
                <FilePlus size={20} />
                <span className="font-medium">Tạo Báo Giá</span>
            </button>
             <button onClick={() => handleNavClick('calendar')} className={getNavItemClass('calendar')}>
                <Calendar size={20} />
                <span className="font-medium">Lịch Trình</span>
            </button>
        </nav>

        {/* Bottom Actions */}
        <div className="border-t border-white/5 pt-6 space-y-4">
             <button onClick={() => handleNavClick('settings')} className="w-full flex items-center gap-4 px-4 py-2 rounded-xl text-graytext hover:text-white transition-colors">
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
    </>
  );
};

export default Sidebar;
