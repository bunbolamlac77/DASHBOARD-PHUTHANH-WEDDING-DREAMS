import { useState } from 'react'
import Sidebar from './components/Sidebar'
// Import các component mới
import Dashboard from './components/Dashboard'
import CustomerList from './components/CustomerList'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Hàm render nội dung động dựa theo tab đang chọn
  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />;
      case 'customers':
        return <CustomerList />;
      case 'quote':
        return <div className="text-center text-graytext pt-20">Tính năng Báo giá đang phát triển...</div>;
      case 'calendar':
        return <div className="text-center text-graytext pt-20">Tính năng Lịch đang phát triển...</div>;
      default:
        return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-deep text-cream overflow-hidden font-sans">
      
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        
        {/* Header */}
        <header className="px-6 md:px-10 py-6 md:py-8 flex justify-between items-center z-10 shrink-0">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif text-gold-gradient" id="page-title">
              {activeTab === 'dashboard' && 'Dashboard Overview'}
              {activeTab === 'customers' && 'Danh sách Khách'}
              {activeTab === 'quote' && 'Tạo Báo Giá'}
              {activeTab === 'calendar' && 'Lịch Trình'}
              {activeTab === 'settings' && 'Cài Đặt'}
            </h2>
            <p className="text-graytext text-xs md:text-sm mt-1">Thứ Năm, 08 Tháng 01, 2026</p>
          </div>

          {/* User Profile on Desktop Header */}
          <div className="flex items-center gap-4">
             <button className="w-10 h-10 rounded-full bg-glass border border-white/5 flex items-center justify-center hover:bg-gold/10 hover:border-gold/30 transition-all relative">
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-danger rounded-full border border-deep"></span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cream"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            </button>
          </div>
        </header>

        {/* SCROLLABLE CONTENT AREA */}
        <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth px-6 md:px-10 pb-20">
          {renderContent()}
        </div>

      </main>
    </div>
  )
}

export default App
