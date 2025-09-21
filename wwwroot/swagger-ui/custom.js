// JavaScript سفارشی برای بهبود Swagger UI

(function() {
    'use strict';

    // اضافه کردن دکمه‌های کنترل به صفحه
    function addControlButtons() {
        const topbar = document.querySelector('.topbar');
        if (!topbar) return;

        const controlPanel = document.createElement('div');
        controlPanel.className = 'control-panel';
        controlPanel.style.cssText = `
            position: fixed;
            top: 60px;
            right: 20px;
            z-index: 1000;
            background: white;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 15px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            min-width: 200px;
        `;

        controlPanel.innerHTML = `
            <div style="margin-bottom: 10px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 600; color: #333;">کنترل نمایش:</label>
                <button id="expandAll" style="margin-right: 5px; padding: 5px 10px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">باز کردن همه</button>
                <button id="collapseAll" style="padding: 5px 10px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;">بستن همه</button>
            </div>
            <div style="margin-bottom: 10px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 600; color: #333;">فیلتر بر اساس Method:</label>
                <select id="methodFilter" style="width: 100%; padding: 5px; border: 1px solid #ddd; border-radius: 4px;">
                    <option value="">همه Method ها</option>
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                </select>
            </div>
            <div>
                <label style="display: block; margin-bottom: 5px; font-weight: 600; color: #333;">جستجو در API ها:</label>
                <input type="text" id="apiSearch" placeholder="نام API یا توضیحات..." style="width: 100%; padding: 5px; border: 1px solid #ddd; border-radius: 4px;">
            </div>
        `;

        document.body.appendChild(controlPanel);

        // اضافه کردن event listeners
        document.getElementById('expandAll').addEventListener('click', expandAllOperations);
        document.getElementById('collapseAll').addEventListener('click', collapseAllOperations);
        document.getElementById('methodFilter').addEventListener('change', filterByMethod);
        document.getElementById('apiSearch').addEventListener('input', searchAPIs);
    }

    // باز کردن همه عملیات
    function expandAllOperations() {
        const operations = document.querySelectorAll('.opblock');
        operations.forEach(op => {
            if (!op.classList.contains('is-open')) {
                const summary = op.querySelector('.opblock-summary');
                if (summary) summary.click();
            }
        });
    }

    // بستن همه عملیات
    function collapseAllOperations() {
        const operations = document.querySelectorAll('.opblock');
        operations.forEach(op => {
            if (op.classList.contains('is-open')) {
                const summary = op.querySelector('.opblock-summary');
                if (summary) summary.click();
            }
        });
    }

    // فیلتر بر اساس HTTP Method
    function filterByMethod() {
        const selectedMethod = document.getElementById('methodFilter').value;
        const operations = document.querySelectorAll('.opblock');

        operations.forEach(op => {
            if (!selectedMethod) {
                op.style.display = 'block';
            } else {
                const method = op.querySelector('.opblock-summary-method');
                if (method && method.textContent.trim() === selectedMethod) {
                    op.style.display = 'block';
                } else {
                    op.style.display = 'none';
                }
            }
        });
    }

    // جستجو در API ها
    function searchAPIs() {
        const searchTerm = document.getElementById('apiSearch').value.toLowerCase();
        const operations = document.querySelectorAll('.opblock');

        operations.forEach(op => {
            const summary = op.querySelector('.opblock-summary');
            if (!summary) return;

            const path = summary.querySelector('.opblock-summary-path')?.textContent || '';
            const description = summary.querySelector('.opblock-summary-description')?.textContent || '';
            const method = summary.querySelector('.opblock-summary-method')?.textContent || '';

            const searchableText = (path + ' ' + description + ' ' + method).toLowerCase();

            if (searchableText.includes(searchTerm)) {
                op.style.display = 'block';
            } else {
                op.style.display = 'none';
            }
        });
    }

    // اضافه کردن دکمه‌های کنترل به فیلتر موجود
    function enhanceExistingFilter() {
        const filterContainer = document.querySelector('.filter-container');
        if (!filterContainer) return;

        const existingInput = filterContainer.querySelector('input');
        if (!existingInput) return;

        // اضافه کردن placeholder بهتر
        existingInput.placeholder = 'جستجو در API ها، توضیحات و مسیرها...';

        // اضافه کردن دکمه‌های کنترل به کنار فیلتر موجود
        const controlButtons = document.createElement('div');
        controlButtons.style.cssText = 'margin-top: 10px; text-align: center;';
        controlButtons.innerHTML = `
            <button id="quickExpand" style="margin: 0 5px; padding: 5px 10px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">باز کردن همه</button>
            <button id="quickCollapse" style="margin: 0 5px; padding: 5px 10px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">بستن همه</button>
            <button id="clearFilter" style="margin: 0 5px; padding: 5px 10px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">پاک کردن فیلتر</button>
        `;

        filterContainer.appendChild(controlButtons);

        // اضافه کردن event listeners
        document.getElementById('quickExpand').addEventListener('click', expandAllOperations);
        document.getElementById('quickCollapse').addEventListener('click', collapseAllOperations);
        document.getElementById('clearFilter').addEventListener('click', () => {
            existingInput.value = '';
            searchAPIs();
        });
    }

    // اضافه کردن شمارنده API ها
    function addAPICounter() {
        const infoContainer = document.querySelector('.info');
        if (!infoContainer) return;

        const counter = document.createElement('div');
        counter.id = 'apiCounter';
        counter.style.cssText = 'margin-top: 10px; padding: 10px; background: #e9ecef; border-radius: 6px; font-size: 14px;';
        
        function updateCounter() {
            const visibleOps = document.querySelectorAll('.opblock[style*="block"], .opblock:not([style*="none"])');
            const totalOps = document.querySelectorAll('.opblock');
            counter.textContent = `نمایش ${visibleOps.length} از ${totalOps.length} API`;
        }

        infoContainer.appendChild(counter);
        updateCounter();

        // به‌روزرسانی شمارنده هنگام تغییر فیلتر
        const observer = new MutationObserver(updateCounter);
        observer.observe(document.querySelector('.swagger-ui'), { childList: true, subtree: true });
    }

    // اضافه کردن دکمه‌های میانبر
    function addKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            // Ctrl + E برای باز کردن همه
            if (e.ctrlKey && e.key === 'e') {
                e.preventDefault();
                expandAllOperations();
            }
            // Ctrl + Q برای بستن همه
            if (e.ctrlKey && e.key === 'q') {
                e.preventDefault();
                collapseAllOperations();
            }
            // Ctrl + F برای فوکوس روی فیلتر
            if (e.ctrlKey && e.key === 'f') {
                e.preventDefault();
                const searchInput = document.getElementById('apiSearch') || document.querySelector('.filter-container input');
                if (searchInput) searchInput.focus();
            }
        });
    }

    // اضافه کردن tooltip برای دکمه‌ها
    function addTooltips() {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(btn => {
            if (btn.id === 'expandAll') btn.title = 'باز کردن همه API ها (Ctrl+E)';
            if (btn.id === 'collapseAll') btn.title = 'بستن همه API ها (Ctrl+Q)';
            if (btn.id === 'quickExpand') btn.title = 'باز کردن همه API ها';
            if (btn.id === 'quickCollapse') btn.title = 'بستن همه API ها';
            if (btn.id === 'clearFilter') btn.title = 'پاک کردن فیلتر جستجو';
        });
    }

    // اجرای توابع پس از بارگذاری صفحه
    function initialize() {
        // صبر کردن تا DOM کاملاً بارگذاری شود
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initialize);
            return;
        }

        // صبر کردن تا Swagger UI کاملاً بارگذاری شود
        const checkSwagger = setInterval(() => {
            if (document.querySelector('.swagger-ui')) {
                clearInterval(checkSwagger);
                
                setTimeout(() => {
                    addControlButtons();
                    enhanceExistingFilter();
                    addAPICounter();
                    addKeyboardShortcuts();
                    addTooltips();
                }, 1000);
            }
        }, 100);
    }

    initialize();
})();
