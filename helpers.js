function getOrderTypeName(t) { return t === 'dine-in' ? 'Dine-In' : t === 'takeaway' ? 'Takeaway' : 'Delivery' }
        function getStatusLabel(s) {
            const m = { pending: 'Menunggu', cooking: 'Dimasak', ready: 'Siap Saji', delivering: 'Diantar', delivered: 'Telah Diantar', completed: 'Selesai', cancelled: 'Dibatalkan', rejected: 'Ditolak' };
            return m[s] || s
        }
        function getStatusBadge(s) {
            const m = { pending: 'badge-pending', cooking: 'badge-cooking', ready: 'badge-ready', delivering: 'badge-delivering', delivered: 'badge-delivering', completed: 'badge-completed', cancelled: 'badge-pending', rejected: 'badge-pending' };
            return m[s] || 'badge-pending'
        }
        function formatCurrency(n) { return 'Rp ' + n.toLocaleString('id-ID') }
        function formatDate(d) { return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) }
        function formatTime(d) { return new Date(d).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) }
        function genId() { return 'o' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6) }
        function getMenuItem(id) { return DB.menuItems.find(m => m.id === id) }
        function getUser(id) { return DB.users.find(u => u.id === id) }
        function getTable(id) { return DB.tables.find(t => t.id === id) }
        function calcItemTax(items) {
          return items.reduce((sum, item) => {
            const mi = DB.menuItems.find(m => m.id === item.menu_item_id);
            const rate = (mi && mi.tax_percentage) || 0;
            return sum + (item.unit_price * item.quantity * rate / 100);
          }, 0);
        }

