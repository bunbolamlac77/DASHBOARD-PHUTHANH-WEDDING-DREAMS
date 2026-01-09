import React from 'react';
import { Search, Filter, MoreHorizontal, CheckCircle, Clock } from 'lucide-react';

const CustomerList = () => {
  // Dữ liệu giả lập (Mock Data)
  const customers = [
    { id: 'WS001', groom: 'Minh Tuấn', bride: 'Thanh Hằng', date: '2024-10-15', service: 'Full Package', status: 'completed', amount: '45.000.000' },
    { id: 'WS002', groom: 'Quốc Bảo', bride: 'Minh Anh', date: '2024-11-02', service: 'Decor + Sound', status: 'pending', amount: '28.000.000' },
    { id: 'WS003', groom: 'Đức Thịnh', bride: 'Hồng Ngọc', date: '2024-12-20', service: 'Photography', status: 'deposit', amount: '12.000.000' },
  ];

  const getStatusStyle = (status) => {
      switch(status) {
          case 'completed': return 'bg-success/20 text-success border-success/20';
          case 'pending': return 'bg-warning/20 text-warning border-warning/20';
          default: return 'bg-blue-500/20 text-blue-400 border-blue-500/20';
      }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-glass p-4 rounded-2xl border border-white/5">
         <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-graytext" size={18} />
            <input 
                type="text" 
                placeholder="Tìm kiếm tên Chú rể, Cô dâu..." 
                className="w-full bg-deep border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-gold/50 transition-colors"
            />
         </div>
         <div className="flex gap-2">
             <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium transition-colors">
                 <Filter size={18}/> Bộ lọc
             </button>
             <button className="px-4 py-2 bg-gold hover:bg-[#B59223] text-deep rounded-xl text-sm font-bold shadow-glow transition-all">
                 + Thêm Mới
             </button>
         </div>
      </div>

      {/* Table */}
      <div className="bg-glass rounded-3xl border border-white/5 overflow-hidden">
          <table className="w-full text-left border-collapse">
              <thead>
                  <tr className="bg-white/5 text-graytext text-sm uppercase tracking-wider">
                      <th className="p-4 font-medium">Mã Show</th>
                      <th className="p-4 font-medium">Chú Rể & Cô Dâu</th>
                      <th className="p-4 font-medium">Ngày Cưới</th>
                      <th className="p-4 font-medium">Dịch Vụ</th>
                      <th className="p-4 font-medium">Trạng Thái</th>
                      <th className="p-4 font-medium text-right">Tổng Tiền</th>
                      <th className="p-4 font-medium text-center">Xử lý</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                  {customers.map((item) => (
                      <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                          <td className="p-4 font-medium text-gold">{item.id}</td>
                          <td className="p-4">
                              <div className="font-bold text-cream">{item.groom} & {item.bride}</div>
                          </td>
                          <td className="p-4 text-graytext">{item.date}</td>
                          <td className="p-4 text-cream">{item.service}</td>
                          <td className="p-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(item.status)}`}>
                                  {item.status === 'completed' && 'Đã xong'}
                                  {item.status === 'pending' && 'Chờ xử lý'}
                                  {item.status === 'deposit' && 'Đã cọc'}
                              </span>
                          </td>
                          <td className="p-4 text-right font-bold text-gold">{item.amount}₫</td>
                          <td className="p-4 text-center">
                              <button className="p-2 hover:bg-white/10 rounded-lg text-graytext hover:text-white transition-colors">
                                  <MoreHorizontal size={18} />
                              </button>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    </div>
  );
};

export default CustomerList;
