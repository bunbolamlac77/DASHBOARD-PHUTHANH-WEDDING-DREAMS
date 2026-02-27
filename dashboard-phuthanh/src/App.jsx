import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import CustomerList from './components/CustomerList'
import QuoteMaker from './components/QuoteMaker'
import LeadList from './components/LeadList'
import CalendarView from './components/CalendarView'
import Settings from './components/Settings'
import BottomTabBar from './components/BottomTabBar'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex flex-col md:flex-row h-[100dvh] w-full bg-deep text-cream font-sans relative overflow-hidden">

      {/* Sidebar - Desktop only */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">

        {/* Desktop Header */}
        <header className="hidden md:flex justify-between items-center px-10 py-8 shrink-0">
          <div>
            <h2 className="text-3xl font-serif text-gold">
              {activeTab === 'dashboard' && 'Dashboard Overview'}
              {activeTab === 'customers' && 'Danh sách Show'}
              {activeTab === 'quote' && 'Tạo Báo Giá'}
              {activeTab === 'leads' && 'Danh Sách Chờ (Leads)'}
              {activeTab === 'calendar' && 'Lịch Trình'}
              {activeTab === 'settings' && 'Cài đặt'}
            </h2>
            <p className="text-graytext text-sm mt-1">Hôm nay, {new Date().toLocaleDateString('vi-VN')}</p>
          </div>
        </header>

        {/* Mobile Top Safe Area spacer (Dynamic Island) */}
        <div className="md:hidden shrink-0" style={{ height: 'env(safe-area-inset-top, 0px)', minHeight: '0px' }} />

        {/* Mobile Page Title */}
        <div className="md:hidden shrink-0 px-4 pt-3 pb-2 flex items-center gap-3">
          <img src="/logo.png" alt="Phu Thanh Wedding Dreams" className="w-7 h-7 object-contain" />
          <h1 className="font-serif text-base text-gold">
            {activeTab === 'dashboard' && 'Dashboard'}
            {activeTab === 'customers' && 'Danh sách Show'}
            {activeTab === 'quote' && 'Tạo Báo Giá'}
            {activeTab === 'leads' && 'Khách Tiềm Năng'}
            {activeTab === 'calendar' && 'Lịch Trình'}
            {activeTab === 'settings' && 'Cài đặt'}
          </h1>
        </div>

        {/* Dynamic Content Area */}
        <div
          className="flex-1 overflow-y-auto no-scrollbar p-4 md:p-10"
          style={{
            paddingBottom: 'calc(5rem + env(safe-area-inset-bottom, 0px))'
          }}
        >
          <div className="md:[padding-bottom:2.5rem]">
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'customers' && <CustomerList />}
            {activeTab === 'quote' && <QuoteMaker />}
            {activeTab === 'leads' && <LeadList />}
            {activeTab === 'calendar' && <CalendarView />}
            {activeTab === 'settings' && <Settings />}
          </div>
        </div>
      </main>

      {/* Bottom Tab Bar - Mobile only */}
      <BottomTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}

export default App
