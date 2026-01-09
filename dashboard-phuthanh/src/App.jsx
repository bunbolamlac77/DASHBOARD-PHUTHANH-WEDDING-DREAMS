import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import CustomerList from './components/CustomerList'
import QuoteMaker from './components/QuoteMaker'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen w-full bg-deep text-cream overflow-hidden font-sans">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        
        {/* Header */}
        <header className="hidden md:flex justify-between items-center px-10 py-8 shrink-0">
            <div>
                <h2 className="text-3xl font-serif text-gold">
                    {activeTab === 'dashboard' && 'Dashboard Overview'}
                    {activeTab === 'customers' && 'Danh sách Show'}
                    {activeTab === 'quote' && 'Tạo Báo Giá'}
                    {activeTab === 'calendar' && 'Lịch Trình'}
                    {activeTab === 'settings' && 'Cài đặt'}
                </h2>
                <p className="text-graytext text-sm mt-1">Hôm nay, {new Date().toLocaleDateString('vi-VN')}</p>
            </div>
        </header>

        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-6 md:p-10 pb-28 md:pb-10">
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'customers' && <CustomerList />}
            {activeTab === 'quote' && <QuoteMaker />}
            
            {/* Placeholder cho các tab chưa làm */}
            {(activeTab === 'calendar' || activeTab === 'settings') && (
                <div className="flex items-center justify-center h-full text-graytext opacity-50">
                    Chức năng đang phát triển...
                </div>
            )}
        </div>
      </main>
    </div>
  )
}

export default App
