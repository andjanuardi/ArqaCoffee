// ============================================================
        // TOAST NOTIFICATIONS
        // ============================================================
        function showToast(msg, type = 'info') {
            const c = document.getElementById('toasts');
            const icons = { success: 'fa-check-circle', warning: 'fa-exclamation-triangle', error: 'fa-times-circle', info: 'fa-info-circle' };
            const t = document.createElement('div');
            t.className = `toast toast-${type}`;
            t.innerHTML = `<i class="fas ${icons[type]}"></i><span>${msg}</span>`;
            c.appendChild(t);
            setTimeout(() => { t.style.animation = 'slideOut .3s ease forwards'; setTimeout(() => t.remove(), 300) }, 3500);
        }

