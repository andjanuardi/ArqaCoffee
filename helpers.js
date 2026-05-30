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
        const CAFE_LOCATION = (DB && DB.cafe && DB.cafe.location) || { lat: 2.458461, lng: 96.3766943 };
        const SHIPPING_RATE_PER_KM = 3000;
        const SHIPPING_MIN = 5000;
        const SHIPPING_MAX = 50000;

        function calcShippingCost(lat, lng) {
          if (!lat || !lng) return 0;
          const R = 6371;
          const dLat = (lat - CAFE_LOCATION.lat) * Math.PI / 180;
          const dLng = (lng - CAFE_LOCATION.lng) * Math.PI / 180;
          const a = Math.sin(dLat/2)**2 + Math.cos(CAFE_LOCATION.lat * Math.PI / 180) * Math.cos(lat * Math.PI / 180) * Math.sin(dLng/2)**2;
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const dist = R * c;
          const cost = Math.round(dist * SHIPPING_RATE_PER_KM);
          return Math.min(SHIPPING_MAX, Math.max(SHIPPING_MIN, cost));
        }

        function calcItemTax(items) {
          return items.reduce((sum, item) => {
            const mi = DB.menuItems.find(m => m.id === item.menu_item_id);
            const rate = (mi && mi.tax_percentage) || 0;
            return sum + (item.unit_price * item.quantity * rate / 100);
          }, 0);
        }

