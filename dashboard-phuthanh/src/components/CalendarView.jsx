import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { vi } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, MapPin, Loader2, Plus, X } from 'lucide-react';
import { getCalendarEvents, quickAddCalendar } from '../services/api';

const CalendarView = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDateEvents, setSelectedDateEvents] = useState([]);
    
    // Quick Add Modal State
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [quickAddText, setQuickAddText] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    // Xử lý thêm nhanh
    const handleQuickAdd = async () => {
        const text = quickAddText.trim();
        if(!text) return;
        
        // Match: "24/03/2026 Tiệc Cưới FB Xuân Thảo"
        const match = text.match(/^(\d{1,2}\/\d{1,2}(?:\/\d{4})?)\s+(.+)$/);
        if(!match) {
            alert("Sai định dạng! VD: 24/03/2026 Tiệc Cưới FB Xuân Thảo");
            return;
        }
        
        setIsSaving(true);
        const success = await quickAddCalendar({ Date: match[1], Title: match[2] });
        if(success) {
            alert("Thêm lịch thành công!");
            setIsAddModalOpen(false);
            setQuickAddText("");
            // Force re-fetch by triggering effect
            setCurrentDate(new Date(currentDate.getTime() + 1)); 
        } else {
            alert("Lỗi khi thêm lịch!");
        }
        setIsSaving(false);
    };

    // Load dữ liệu khi đổi tháng
    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            const month = currentDate.getMonth();
            const year = currentDate.getFullYear();
            
            // Lấy dữ liệu từ Google Calendar
            const data = await getCalendarEvents(month, year);
            setEvents(data);
            setLoading(false);
        };
        fetchEvents();
    }, [currentDate]);

    // Xử lý tạo lưới lịch
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Bắt đầu từ Thứ 2
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
    const dateFormat = "d";
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    const weekDays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

    // Chọn ngày để xem chi tiết
    const onDateClick = (day) => {
        const daysEvents = events.filter(e => isSameDay(new Date(e.start), day));
        setSelectedDateEvents(daysEvents);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 h-full pb-20 animate-fade-in">
            
            {/* --- LỊCH LỚN --- */}
            <div className="flex-1 glass-panel p-6 rounded-[32px] overflow-hidden flex flex-col relative">
                
                {/* Header Lịch */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-serif text-gold capitalize">
                            {format(currentDate, 'MMMM yyyy', { locale: vi })}
                        </h2>
                        <button 
                            onClick={() => setIsAddModalOpen(true)}
                            className="bg-gold/20 text-gold hover:bg-gold hover:text-deep px-3 py-1.5 rounded-full text-xs font-bold transition-colors flex items-center gap-1"
                        >
                            <Plus size={14} /> Thêm Nhanh
                        </button>
                    </div>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setCurrentDate(subMonths(currentDate, 1))} 
                            className="p-2 hover:bg-white/10 rounded-full transition-all"
                        >
                            <ChevronLeft className="text-cream"/>
                        </button>
                        <button 
                            onClick={() => setCurrentDate(addMonths(currentDate, 1))} 
                            className="p-2 hover:bg-white/10 rounded-full transition-all"
                        >
                            <ChevronRight className="text-cream"/>
                        </button>
                    </div>
                </div>

                {/* Thứ trong tuần */}
                <div className="grid grid-cols-7 mb-2">
                    {weekDays.map(day => (
                        <div key={day} className="text-center text-xs font-bold text-graytext uppercase py-2">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Lưới ngày */}
                <div className="grid grid-cols-7 grid-rows-6 flex-1 gap-2">
                    {days.map((day) => {
                        // Tìm sự kiện trong ngày này
                        const dayEvents = events.filter(e => isSameDay(new Date(e.start), day));
                        const isToday = isSameDay(day, new Date());
                        
                        return (
                            <div 
                                key={day.toString()} 
                                onClick={() => onDateClick(day)}
                                className={`
                                    relative flex flex-col items-center justify-start pt-2 rounded-xl cursor-pointer transition-all border
                                    ${!isSameMonth(day, monthStart) ? 'text-gray-700 bg-transparent border-transparent' : 'bg-white/5 border-white/5 hover:bg-white/10'}
                                    ${isToday ? 'border-gold/50 bg-gold/10' : ''}
                                `}
                            >
                                <span className={`text-sm ${isToday ? 'text-gold font-bold' : 'text-cream'}`}>
                                    {format(day, dateFormat)}
                                </span>
                                
                                {/* Dấu chấm sự kiện */}
                                <div className="flex gap-1 mt-1 flex-wrap justify-center px-1">
                                    {dayEvents.map((ev, i) => (
                                        <div 
                                            key={i} 
                                            className="w-1.5 h-1.5 rounded-full bg-success shadow-glow-sm" 
                                            title={ev.title}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                {loading && (
                    <div className="absolute inset-0 bg-deep/50 flex items-center justify-center rounded-[32px]">
                        <Loader2 className="animate-spin text-gold" size={32}/>
                    </div>
                )}
            </div>

            {/* --- CHI TIẾT NGÀY --- */}
            <div className="w-full lg:w-80 glass-panel p-6 rounded-[32px] overflow-y-auto no-scrollbar">
                <h3 className="text-lg font-serif text-cream mb-4 border-b border-white/10 pb-2">Sự kiện trong ngày</h3>
                
                <div className="space-y-4">
                    {selectedDateEvents.length > 0 ? (
                        selectedDateEvents.map((evt, i) => (
                            <div key={i} className="bg-white/5 p-4 rounded-xl border-l-2 border-gold">
                                <h4 className="font-bold text-gold text-sm line-clamp-2">{evt.title}</h4>
                                <div className="text-xs text-graytext mt-2 space-y-1">
                                    <p className="flex items-center gap-2">
                                        <MapPin size={12}/> 
                                        {evt.location || 'Chưa có địa điểm'}
                                    </p>
                                    {evt.description && (
                                        <p className="bg-black/20 p-2 rounded mt-1 italic text-white/70 whitespace-pre-line">
                                            {evt.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-graytext text-sm py-10">
                            Chọn một ngày trên lịch để xem chi tiết.
                        </div>
                    )}
                </div>
            </div>

            {/* --- QUICK ADD MODAL --- */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="bg-deep border border-gold/30 rounded-3xl w-full max-w-lg p-6 shadow-2xl relative">
                        <button 
                            onClick={() => setIsAddModalOpen(false)} 
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                        
                        <h3 className="text-xl font-serif text-gold mb-4">Thêm Nhanh Lịch Trình</h3>
                        <p className="text-sm text-gray-400 mb-2">Nhập theo định dạng: <strong>[Ngày] [Nội dung]</strong></p>
                        <p className="text-xs text-white/50 italic mb-4">VD: 24/03/2026 Tiệc Cưới FB Xuân Thảo</p>
                        
                        <input 
                            type="text" 
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold focus:outline-none placeholder-gray-600 mb-4"
                            placeholder="Nhập thông tin..."
                            value={quickAddText}
                            onChange={(e) => setQuickAddText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleQuickAdd()}
                        />
                        
                        <button 
                            onClick={handleQuickAdd}
                            disabled={isSaving}
                            className="w-full py-3 bg-gold text-deep font-bold rounded-xl hover:bg-gold/90 transition-colors flex justify-center items-center gap-2"
                        >
                            {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />} 
                            THÊM VÀO LỊCH
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default CalendarView;
