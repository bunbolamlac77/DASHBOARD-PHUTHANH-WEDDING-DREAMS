import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { vi } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, MapPin, Loader2 } from 'lucide-react';
import { getCalendarEvents } from '../services/api';

const CalendarView = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDateEvents, setSelectedDateEvents] = useState([]);

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
                    <h2 className="text-2xl font-serif text-gold capitalize">
                        {format(currentDate, 'MMMM yyyy', { locale: vi })}
                    </h2>
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

        </div>
    );
};

export default CalendarView;
