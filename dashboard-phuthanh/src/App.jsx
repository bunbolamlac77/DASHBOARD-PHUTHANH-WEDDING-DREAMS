import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import CustomerList from './components/CustomerList'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen w-full bg-deep text-cream overflow-hidden font-sans selection:bg-gold selection:text-deep">
      
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden bg-gradient-to-br from-deep via-deep to-[#0f1c16]">
        
        {/* Header */}
        <header className="px-8 py-6 border-b border-white/5 flex justify-between items-center backdrop-blur-sm sticky top-0 z-40">
          <div>
            <h2 className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold to-white">
              {activeTab === 'dashboard' && 'Tổng Quan Hệ Thống'}
              {activeTab === 'customers' && 'Quản Lý Khách Hàng'}
              {activeTab === 'quote' && 'Tạo Báo Giá & Hợp Đồng'}
              {activeTab === 'calendar' && 'Lịch Trình Sự Kiện'}
              {activeTab === 'settings' && 'Cài Đặt'}
            </h2>
            <p className="text-xs text-graytext mt-1">Chào mừng quay trở lại, Phú Thành!</p>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'customers' && <CustomerList />}
          
          {/* Các tab khác tạm thời để trống hoặc hiển thị thông báo */}
          {['quote', 'calendar', 'settings'].includes(activeTab) && (
            <div className="flex flex-col items-center justify-center h-full text-graytext opacity-50">
               <div className="text-4xl mb-4">🚧</div>
               <p>Chức năng <strong>{activeTab}</strong> đang được phát triển trong Giai đoạn 2</p>
            </div>
          )}
        </div>

      </main>
    </div>
  )
}

export default App
