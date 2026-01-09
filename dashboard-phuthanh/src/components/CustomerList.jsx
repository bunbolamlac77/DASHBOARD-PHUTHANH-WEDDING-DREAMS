import React, { useEffect, useState } from 'react';
import { api } from '../services/api'; // Import cầu nối
import { Search, Loader } from 'lucide-react';

const CustomerList = () => {
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, pending, done
    const [searchTerm, setSearchTerm] = useState('');

    // Gọi API khi mới vào trang
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await api.getShows();
            if (res.status === 'success') {
                setShows(res.data);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    // Logic lọc và tìm kiếm
    const filteredShows = shows.filter(show => {
        const matchSearch = (show.GroomName + show.BrideName + show.Phone)
            .toLowerCase().includes(searchTerm.toLowerCase());
        
        if (filter === 'all') return matchSearch;
        return matchSearch && show.Status.toLowerCase() === filter;
    });

    return (
        <div className="space-y-6 animate-fade-in max-w-7xl mx-auto h-full flex flex-col">
            {/* Thanh công cụ tìm kiếm & lọc */}
            <div className="sticky top-0 bg-deep/95 backdrop-blur-xl z-20 py-2 space-y-3">
                <div className="relative">
                     <input 
                        type="text" 
                        placeholder="Tìm tên Dâu Rể, SĐT..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-glass border border-white/10 px-10 py-3 rounded-2xl text-sm focus:border-gold text-cream outline-none"
                     />
                     <Search className="absolute left-4 top-3.5 text-gray-500" size={18} />
                </div>
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                    {['all', 'pending', 'done'].map(st => (
                        <button 
                            key={st}
                            onClick={() => setFilter(st)}
                            className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                                filter === st ? 'bg-gold text-deep shadow-glow' : 'bg-glass border border-white/10 text-graytext'
                            }`}
                        >
                            {st === 'all' ? 'Tất cả' : st.charAt(0).toUpperCase() + st.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Danh sách hiển thị */}
            <div className="space-y-3 pb-20">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gold gap-2">
                        <Loader className="animate-spin" size={30} />
                        <p className="text-xs">Đang tải dữ liệu từ Google Sheet...</p>
                    </div>
                ) : filteredShows.length === 0 ? (
                    <p className="text-center text-graytext py-10">Không tìm thấy dữ liệu.</p>
                ) : (
                    filteredShows.map((show, index) => (
                        <div key={index} className="glass-panel p-5 rounded-[24px] flex items-center justify-between group cursor-pointer active:scale-[0.99] transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center text-lg font-serif text-gold">
                                    {index + 1}
                                </div>
                                <div>
                                    <h4 className="font-serif text-lg text-cream">{show.GroomName} & {show.BrideName}</h4>
                                    <p className="text-xs text-graytext">
                                        {new Date(show.Date).toLocaleDateString('vi-VN')} • {show.ServiceList}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <span className="text-gold font-bold text-sm">
                                    {Number(show.TotalAmount).toLocaleString()}đ
                                </span>
                                <span className={`text-[10px] px-2 py-0.5 rounded border ${
                                    show.Status === 'Done' 
                                    ? 'bg-success/10 text-success border-success/20' 
                                    : 'bg-warning/10 text-warning border-warning/20'
                                }`}>
                                    {show.Status}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CustomerList;
