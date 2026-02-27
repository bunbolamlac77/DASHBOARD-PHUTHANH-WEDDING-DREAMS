import React, { useState, useEffect } from 'react';
import { getLeads, deleteLead } from '../services/api';
import { Calendar, MessageSquare, Trash2, X } from 'lucide-react';

const LeadList = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [confirmDelete, setConfirmDelete] = useState(null); // {lead, show}

    const loadLeads = async () => {
        setLoading(true);
        const data = await getLeads();
        console.log("Raw leads data from API:", data);
        console.log("First lead sample:", data[0]);
        // Normalize key ID (hỗ trợ cả id, Id, ID tùy header Sheet)
        const normalized = data.map(lead => ({
            ...lead,
            ID: lead.ID || lead.id || lead.Id || ''
        }));
        setLeads(normalized.reverse()); // Người mới nhất lên đầu
        setLoading(false);
    };

    useEffect(() => {
        // eslint-disable-next-line
        loadLeads();
    }, []);

    const handleDeleteClick = (lead) => {
        console.log("Delete button clicked for lead:", lead);
        if (!lead.ID) {
            alert('Lỗi: Không tìm thấy ID của khách tiềm năng!');
            return;
        }
        setConfirmDelete({ lead, show: true });
    };

    const handleConfirmDelete = async () => {
        const lead = confirmDelete.lead;
        setConfirmDelete(null);
        
        console.log("Calling deleteLead API for:", lead.ID);
        const success = await deleteLead(lead.ID);
        console.log("Delete result:", success);
        
        if (success) {
            alert('Đã xóa thành công!');
            loadLeads();
        } else {
            alert('Có lỗi khi xóa. Vui lòng thử lại!');
        }
    };

    const handleCancelDelete = () => {
        setConfirmDelete(null);
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-2xl font-serif text-gold mb-6">Danh Sách Khách Tiềm Năng</h2>
            
            {loading && (
                <p className="text-graytext">Đang tải...</p>
            )}
            
            <div className="grid gap-4">
                {!loading && leads.length === 0 && (
                    <p className="text-graytext">Chưa có khách nào trong danh sách chờ.</p>
                )}
                
                {leads.map((lead, idx) => (
                    <div key={idx} className="glass-panel p-5 rounded-xl border-l-4 border-gold flex justify-between items-center hover:bg-white/5 transition-all">
                        <div className="flex-1">
                            <h3 className="font-bold text-lg text-cream">{lead.Name}</h3>
                            <div className="flex gap-4 text-xs text-graytext mt-2">
                                {lead.Phone && (
                                    <span className="flex items-center gap-1">
                                        📞 {lead.Phone}
                                    </span>
                                )}
                                {lead.Date && (
                                    <span className="flex items-center gap-1">
                                        <Calendar size={12}/> {lead.Date}
                                    </span>
                                )}
                            </div>
                            {lead.Note && (
                                <p className="mt-2 text-sm text-white/80 italic bg-black/20 p-2 rounded flex gap-2 items-start">
                                    <MessageSquare size={14} className="mt-0.5 text-gold flex-shrink-0"/> 
                                    {lead.Note}
                                </p>
                            )}
                        </div>
                        <button 
                            onClick={() => handleDeleteClick(lead)}
                            className="bg-red-500/10 p-3 rounded-full hover:bg-red-500 hover:text-white transition-colors text-red-400 ml-4 flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center"
                            title="Xóa khách tiềm năng"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Custom Confirm Modal */}
            {confirmDelete?.show && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
                    <div className="bg-deep border border-gold/30 rounded-2xl p-6 max-w-md mx-4 shadow-2xl">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-serif text-gold">Xác nhận xóa</h3>
                            <button onClick={handleCancelDelete} className="text-graytext hover:text-white">
                                <X size={20} />
                            </button>
                        </div>
                        <p className="text-cream mb-6">
                            Bạn có chắc muốn xóa khách tiềm năng <strong className="text-gold">"{confirmDelete.lead.Name}"</strong>?
                        </p>
                        <div className="flex gap-3">
                            <button 
                                onClick={handleConfirmDelete}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-colors"
                            >
                                Xóa
                            </button>
                            <button 
                                onClick={handleCancelDelete}
                                className="flex-1 bg-white/10 hover:bg-white/20 text-cream font-bold py-3 rounded-xl transition-colors"
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeadList;

