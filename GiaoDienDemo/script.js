// Initialize Icons
lucide.createIcons();

// Interaction Logic
function switchTab(tabId) {
    // 1. Hide all views
    document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));

    // 2. Show target view
    const targetView = document.getElementById('view-' + tabId);
    if (targetView) {
        targetView.classList.remove('hidden');
    } else {
        // Fallback to dashboard if not found
        document.getElementById('view-dashboard').classList.remove('hidden');
        tabId = 'dashboard';
    }

    // 3. Update Nav States (Bottom Bar & Sidebar)
    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.remove('active', 'text-gold', 'text-white');
        el.classList.add('text-graytext');

        // Check if this nav item links to the current tab
        if (el.getAttribute('onclick').includes(tabId)) {
            el.classList.add('active', 'text-gold');
            el.classList.remove('text-graytext');

            // Specific fix for lucide icon fill in bottom nav
            const icon = el.querySelector('i');
            if (icon) icon.style.fill = 'rgba(212,175,55,0.1)';
        } else {
            const icon = el.querySelector('i');
            if (icon) icon.style.fill = 'none';
        }
    });

    // 4. Update Header Title based on Tab
    const titles = {
        'dashboard': 'Dashboard Overview',
        'customers': 'Danh sách Show',
        'quote': 'Tạo Báo Giá',
        'settings': 'Cài đặt Hệ thống',
        'calendar': 'Lịch Trình Công Việc',
        'customer-detail': 'Chi Tiết Hợp Đồng'
    };
    const pageTitle = document.getElementById('page-title');
    if (pageTitle) pageTitle.innerText = titles[tabId] || 'Dashboard';

    // 5. Re-init icons 
    lucide.createIcons();

    // 6. Scroll to top
    const contentArea = document.getElementById('content-area');
    if (contentArea) contentArea.scrollTop = 0;
}

// Function to Show Customer Detail
function showCustomerDetail(id) {
    // Populate dummy data based on ID
    const nameEl = document.getElementById('detail-name');
    const dateEl = document.getElementById('detail-date');
    const priceEl = document.getElementById('detail-price');
    
    // Simulating fetching data
    nameEl.innerText = id % 2 === 0 ? "Tuấn & Vy" : "Thành & Lan";
    dateEl.innerText = id % 2 === 0 ? "14/02/2026" : "25/01/2026";
    priceEl.innerText = id % 2 === 0 ? "12.000.000đ" : "15.000.000đ";
    
    switchTab('customer-detail');
}

// Function to Render Calendar (Simple Mock)
function renderCalendar() {
    const calendarEl = document.getElementById('calendar-grid');
    if (!calendarEl) return;
    
    calendarEl.innerHTML = '';
    
    // Headers
    const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    days.forEach(d => {
        calendarEl.innerHTML += `<div class="calendar-day-header">${d}</div>`;
    });

    // Empty slots for start of month
    for(let i=0; i<4; i++) {
         calendarEl.innerHTML += `<div class="calendar-day bg-transparent border-0 cursor-default"></div>`;
    }

    // Days 1-31
    for (let i = 1; i <= 31; i++) {
        let classes = 'calendar-day';
        if (i === 8) classes += ' active'; // Today
        if (i === 25 || i === 14) classes += ' has-event'; // Mock Events
        
        calendarEl.innerHTML += `<div class="${classes}">${i}</div>`;
    }
}

// Set Date on Load
const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const today = new Date().toLocaleDateString('vi-VN', dateOptions);
const dateEl = document.getElementById('current-date');
if(dateEl) dateEl.innerText = today.charAt(0).toUpperCase() + today.slice(1);

// Run Initial Setup
document.addEventListener('DOMContentLoaded', () => {
    renderCalendar();
});
