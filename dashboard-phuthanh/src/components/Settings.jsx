import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Edit, Loader2, RefreshCw, Settings as SettingsIcon, Package } from 'lucide-react';
import { getConfig, updateConfig, getServices, addService, updateService, deleteService } from '../services/api';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('config'); // 'config' | 'services'
    const [isLoading, setIsLoading] = useState(false);
    
    // Config State
    const [config, setConfig] = useState({
        bankId: '',
        accountNo: '',
        accountName: '',
        studioName: '',
        studioPhone: '',
        studioAddress: '',
        studioNotes: '',
    });
    
    // Services State
    const [services, setServices] = useState([]);
    
    // Service Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [serviceForm, setServiceForm] = useState({
        Name: '',
        Price: '',
        Category: 'wedding', // 'wedding', 'video', etc.
        Deliverables: ''
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        try {
            const [configData, servicesData] = await Promise.all([
                getConfig(),
                getServices()
            ]);
            
            if (configData) {
               setConfig(prev => ({ ...prev, ...configData }));
            }
            if (servicesData) {
                setServices(servicesData);
            }
        } catch (error) {
            console.error("Failed to load settings data", error);
            alert("Lỗi khi tải dữ liệu cài đặt!");
        } finally {
            setIsLoading(false);
        }
    };

    const handleConfigChange = (e) => {
        const { name, value } = e.target;
        setConfig(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveConfig = async () => {
        setIsLoading(true);
        try {
            const success = await updateConfig(config);
            if (success) {
                alert("Đã lưu cấu hình thành công!");
            } else {
                alert("Lỗi khi lưu cấu hình!");
            }
        } catch {
            alert("Lỗi mạng khi lưu cấu hình!");
        } finally {
            setIsLoading(false);
        }
    };

    // Services methods
    const handleOpenModal = (service = null) => {
        if (service) {
            setEditingService(service);
            setServiceForm({
                Name: service.Name,
                Price: service.Price,
                Category: service.Category || 'wedding',
                Deliverables: Array.isArray(service.DeliverablesArray) 
                    ? service.DeliverablesArray.join('\n') 
                    : service.Deliverables || ''
            });
        } else {
            setEditingService(null);
            setServiceForm({
                Name: '',
                Price: '',
                Category: 'wedding',
                Deliverables: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleSaveService = async () => {
        if (!serviceForm.Name || !serviceForm.Price) {
            alert("Vui lòng nhập Tên dịch vụ và Giá tiền!");
            return;
        }

        setIsLoading(true);
        try {
            const deliverablesArray = serviceForm.Deliverables.split('\n').filter(line => line.trim() !== '');
            const payload = {
                Name: serviceForm.Name,
                Price: parseInt(serviceForm.Price),
                Category: serviceForm.Category,
                Deliverables: deliverablesArray
            };

            let success = false;
            if (editingService) {
                payload.ID = editingService.ID;
                success = await updateService(payload);
            } else {
                success = await addService(payload);
            }

            if (success) {
                alert(editingService ? "Đã cập nhật dịch vụ!" : "Đã thêm dịch vụ!");
                setIsModalOpen(false);
                loadData(); // Reload list
            } else {
                alert("Lỗi khi lưu dịch vụ!");
            }
        } catch {
            alert("Lỗi mạng khi lưu dịch vụ!");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteService = async (serviceId) => {
        if (!window.confirm("Bạn có chắc muốn xóa dịch vụ này không?")) return;
        
        setIsLoading(true);
        try {
            const success = await deleteService(serviceId);
            if (success) {
                alert("Đã xóa dịch vụ!");
                loadData();
            } else {
                alert("Lỗi khi xóa dịch vụ!");
            }
        } catch {
            alert("Lỗi mạng khi xóa!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-deep text-cream -m-4 md:-m-10 p-4 md:p-10 hide-scrollbar overflow-y-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-gold flex items-center gap-3">
                        <SettingsIcon size={32} />
                        Cài đặt Hệ thống
                    </h1>
                    <p className="text-graytext mt-2">Quản lý các cấu hình chung và danh sách gói dịch vụ.</p>
                </div>
                <button 
                    onClick={loadData}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors disabled:opacity-50"
                >
                    <RefreshCw size={20} className={isLoading ? "animate-spin" : ""} />
                    Làm mới dữ liệu
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-white/10 pb-2">
                <button
                    onClick={() => setActiveTab('config')}
                    className={`pb-2 px-4 font-medium transition-colors ${activeTab === 'config' ? 'text-gold border-b-2 border-gold' : 'text-graytext hover:text-white'}`}
                >
                    Cấu hình Chung
                </button>
                <button
                    onClick={() => setActiveTab('services')}
                    className={`pb-2 px-4 font-medium transition-colors ${activeTab === 'services' ? 'text-gold border-b-2 border-gold' : 'text-graytext hover:text-white'}`}
                >
                    Danh sách Dịch vụ
                </button>
            </div>

            {/* Content Region */}
            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm relative min-h-[500px]">
                
                {isLoading && (
                    <div className="absolute inset-0 bg-deep/50 flex items-center justify-center z-10 rounded-2xl">
                        <Loader2 size={40} className="text-gold animate-spin" />
                    </div>
                )}

                {/* TAB: CONFIGURATIONS */}
                {activeTab === 'config' && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        {/* Nhóm Thông tin Ngân hàng */}
                        <div>
                            <h3 className="text-xl font-serif text-gold mb-4 border-b border-white/10 pb-2">Thông tin Ngân hàng (Mã QR)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm text-graytext mb-2">Mã Ngân hàng (ex: ICB, VCB)</label>
                                    <input 
                                        type="text" name="bankId" value={config.bankId || ''} onChange={handleConfigChange}
                                        className="w-full bg-deep border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-gold text-cream" placeholder="ICB"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-graytext mb-2">Số tài khoản</label>
                                    <input 
                                        type="text" name="accountNo" value={config.accountNo || ''} onChange={handleConfigChange}
                                        className="w-full bg-deep border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-gold text-cream" placeholder="0764816715"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-graytext mb-2">Tên chủ tài khoản</label>
                                    <input 
                                        type="text" name="accountName" value={config.accountName || ''} onChange={handleConfigChange}
                                        className="w-full bg-deep border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-gold text-cream" placeholder="TANG HUYNH THANH PHU"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Nhóm Thông tin Studio */}
                        <div>
                            <h3 className="text-xl font-serif text-gold mb-4 border-b border-white/10 pb-2">Thông tin Studio</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm text-graytext mb-2">Tên Studio</label>
                                    <input 
                                        type="text" name="studioName" value={config.studioName || ''} onChange={handleConfigChange}
                                        className="w-full bg-deep border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-gold text-cream" placeholder="PHU THANH WEDDING DREAMS"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-graytext mb-2">Số điện thoại / Zalo</label>
                                    <input 
                                        type="text" name="studioPhone" value={config.studioPhone || ''} onChange={handleConfigChange}
                                        className="w-full bg-deep border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-gold text-cream" placeholder="076 481 6715"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm text-graytext mb-2">Địa chỉ</label>
                                    <input 
                                        type="text" name="studioAddress" value={config.studioAddress || ''} onChange={handleConfigChange}
                                        className="w-full bg-deep border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-gold text-cream" placeholder="123 Đường XYZ, TP HCM..."
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm text-graytext mb-2">Lời cảm ơn / Ghi chú ở footer báo giá</label>
                                    <input 
                                        type="text" name="studioNotes" value={config.studioNotes || ''} onChange={handleConfigChange}
                                        className="w-full bg-deep border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-gold text-cream" placeholder="Cảm ơn bạn đã lựa chọn..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="pt-4 flex justify-end">
                            <button 
                                onClick={handleSaveConfig}
                                disabled={isLoading}
                                className="bg-gold text-deep font-semibold px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Save size={20} />
                                Lưu Cấu Hình
                            </button>
                        </div>
                    </div>
                )}

                {/* TAB: SERVICES */}
                {activeTab === 'services' && (
                    <div className="animate-in fade-in duration-500 flex flex-col h-full">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-serif text-gold">Danh sách Gói Dịch vụ</h3>
                            <button 
                                onClick={() => handleOpenModal()}
                                className="bg-white/10 text-cream px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-white/20 transition-colors"
                            >
                                <Plus size={20} />
                                Thêm mới
                            </button>
                        </div>
                        
                        <div className="overflow-x-auto rounded-xl border border-white/10 max-h-[60vh] overflow-y-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/10 text-graytext uppercase text-xs tracking-wider sticky top-0 backdrop-blur-md">
                                        <th className="p-4 rounded-tl-xl text-center">STT</th>
                                        <th className="p-4 font-semibold">Tên Dịch Vụ</th>
                                        <th className="p-4 font-semibold">Danh Mục</th>
                                        <th className="p-4 font-semibold text-right">Giá Tiền (VNĐ)</th>
                                        <th className="p-4 font-semibold rounded-tr-xl text-center">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {services.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="p-8 text-center text-graytext">Chưa có gói dịch vụ nào.</td>
                                        </tr>
                                    ) : (
                                        services.map((svc, index) => (
                                            <tr key={svc.ID || index} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                                                <td className="p-4 text-center">{index + 1}</td>
                                                <td className="p-4 font-medium text-cream">{svc.Name}</td>
                                                <td className="p-4 text-graytext capitalize">{svc.Category}</td>
                                                <td className="p-4 font-mono text-gold text-right">{new Intl.NumberFormat('vi-VN').format(svc.Price)}</td>
                                                <td className="p-4">
                                                    <div className="flex items-center justify-center gap-3">
                                                        <button 
                                                            onClick={() => handleOpenModal(svc)}
                                                            className="text-gray-400 hover:text-white transition-colors" title="Sửa"
                                                        >
                                                            <Edit size={18} />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDeleteService(svc.ID)}
                                                            className="text-red-400 hover:text-red-300 transition-colors" title="Xóa"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* MODAL: Thêm/Sửa Dịch Vụ */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-deep border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        {/* Modal Header */}
                        <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex justify-between items-center shrink-0">
                            <h3 className="font-serif text-xl text-gold flex items-center gap-2">
                                <Package size={24} />
                                {editingService ? 'Chỉnh sửa Gói Dịch Vụ' : 'Thêm Gói Dịch Vụ Mới'}
                            </h3>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto flex-1 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm text-graytext mb-2">Tên Dịch vụ <span className="text-red-500">*</span></label>
                                    <input 
                                        type="text" 
                                        value={serviceForm.Name}
                                        onChange={(e) => setServiceForm({...serviceForm, Name: e.target.value})}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold text-cream"
                                        placeholder="Ví dụ: Truyền Thống Cưới"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-graytext mb-2">Giá tiền (VNĐ) <span className="text-red-500">*</span></label>
                                    <input 
                                        type="number" 
                                        value={serviceForm.Price}
                                        onChange={(e) => setServiceForm({...serviceForm, Price: e.target.value})}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold text-cream font-mono"
                                        placeholder="2800000"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm text-graytext mb-2">Danh mục (Category)</label>
                                <select 
                                    value={serviceForm.Category}
                                    onChange={(e) => setServiceForm({...serviceForm, Category: e.target.value})}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold text-cream appearance-none"
                                >
                                    <option value="wedding" className="bg-deep">Chụp Ảnh Cưới (Wedding)</option>
                                    <option value="video" className="bg-deep">Quay Phim (Video)</option>
                                    <option value="other" className="bg-deep">Khác (Other)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm text-graytext mb-2">Chi tiết Dịch vụ (Mỗi dòng là một mục)</label>
                                <textarea 
                                    rows="6"
                                    value={serviceForm.Deliverables}
                                    onChange={(e) => setServiceForm({...serviceForm, Deliverables: e.target.value})}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold text-cream resize-none"
                                    placeholder="Nhân sự: 01 Thợ chụp chuyên nghiệp&#10;Thời gian: 01 Buổi (Dưới 6 giờ chụp)&#10;..."
                                ></textarea>
                                <p className="text-xs text-gray-500 mt-2">Dùng dấu xuống dòng (Enter) để tách các chi tiết hiển thị trong báo giá.</p>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="bg-white/5 px-6 py-4 border-t border-white/10 flex justify-end gap-3 shrink-0">
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="px-6 py-2 rounded-xl text-cream hover:bg-white/10 transition-colors"
                            >
                                Hủy
                            </button>
                            <button 
                                onClick={handleSaveService}
                                disabled={isLoading}
                                className="bg-gold text-deep font-semibold px-8 py-2 rounded-xl flex items-center gap-2 hover:bg-yellow-600 transition-colors disabled:opacity-50"
                            >
                                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                                Lưu Dịch vụ
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;
