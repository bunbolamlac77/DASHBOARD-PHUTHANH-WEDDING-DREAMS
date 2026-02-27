import { LayoutDashboard, Users, FilePlus, Bookmark, Calendar, Settings } from 'lucide-react';

const TABS = [
  { key: 'dashboard', icon: LayoutDashboard, label: 'Home' },
  { key: 'customers', icon: Users, label: 'Show' },
  { key: 'quote', icon: FilePlus, label: 'Báo Giá' },
  { key: 'leads', icon: Bookmark, label: 'Leads' },
  { key: 'calendar', icon: Calendar, label: 'Lịch' },
  { key: 'settings', icon: Settings, label: 'Cài đặt' },
];

const BottomTabBar = ({ activeTab, setActiveTab }) => {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-deep/95 backdrop-blur-xl border-t border-white/5"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex items-stretch h-[56px]">
        {TABS.map(({ key, icon: Icon, label }) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-all duration-200 relative
                ${isActive ? 'text-gold' : 'text-white/40 active:text-white/70'}
              `}
            >
              {/* Active indicator pill */}
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-gold" />
              )}
              <Icon
                size={isActive ? 22 : 20}
                strokeWidth={isActive ? 2.5 : 1.8}
                className={`transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}
              />
              <span
                className={`text-[9px] font-medium transition-all duration-200 leading-none
                  ${isActive ? 'text-gold font-bold' : 'text-white/40'}
                `}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomTabBar;
