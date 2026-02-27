import { useState } from 'react'
import { Menu } from 'lucide-react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import CustomerList from './components/CustomerList'
import QuoteMaker from './components/QuoteMaker'
import LeadList from './components/LeadList'
import CalendarView from './components/CalendarView'
import Settings from './components/Settings'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-deep text-cream overflow-hidden font-sans relative">
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 bg-deep border-b border-white/5 z-30 shrink-0">
         <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Phu Thanh Wedding Dreams" className="w-8 h-8 object-contain" />
            <h1 className="font-serif text-lg text-gold leading-none">Phu Thanh</h1>
         </div>
         <button onClick={() => setIsMobileMenuOpen(true)} className="text-cream p-2">
            <Menu size={24} />
         </button>
      </div>

      {/* Overlay for Mobile */}
      {isMobileMenuOpen && (
        <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
      />

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

        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 md:p-10 pb-20 md:pb-10">
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'customers' && <CustomerList />}
            {activeTab === 'quote' && <QuoteMaker />}
            {activeTab === 'leads' && <LeadList />}
            {activeTab === 'calendar' && <CalendarView />}
            {activeTab === 'settings' && <Settings />}
        </div>
      </main>
    </div>
  )
}

export default App
