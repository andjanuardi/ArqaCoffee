function getOrderTypeName(t) { return t === 'dine-in' ? 'Dine-In' : t === 'takeaway' ? 'Takeaway' : 'Delivery' }
        function getStatusLabel(s) {
            const m = { pending: 'Menunggu', cooking: 'Dimasak', ready: 'Siap Saji', delivering: 'Diantar', delivered: 'Telah Diantar', completed: 'Selesai', cancelled: 'Dibatalkan', rejected: 'Ditolak' };
            return m[s] || s
        }
        function getStatusBadge(s) {
            const m = { pending: 'badge-pending', cooking: 'badge-cooking', ready: 'badge-ready', delivering: 'badge-delivering', delivered: 'badge-delivering', completed: 'badge-completed', cancelled: 'badge-pending', rejected: 'badge-rejected' };
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
        function getShippingConfig() {
          const s = DB.cafe?.shipping;
          return { rate_per_km: s?.rate_per_km ?? 3000, min: s?.min ?? 5000, max: s?.max ?? 50000 };
        }

        function calcShippingCost(lat, lng) {
          if (!lat || !lng) return 0;
          const R = 6371;
          const dLat = (lat - CAFE_LOCATION.lat) * Math.PI / 180;
          const dLng = (lng - CAFE_LOCATION.lng) * Math.PI / 180;
          const a = Math.sin(dLat/2)**2 + Math.cos(CAFE_LOCATION.lat * Math.PI / 180) * Math.cos(lat * Math.PI / 180) * Math.sin(dLng/2)**2;
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const dist = R * c;
          const cfg = getShippingConfig();
          const cost = Math.round(dist * cfg.rate_per_km);
          return Math.min(cfg.max, Math.max(cfg.min, cost));
        }

        function calcItemTax(items) {
          return items.reduce((sum, item) => {
            const mi = DB.menuItems.find(m => m.id === item.menu_item_id);
            const rate = (mi && mi.tax_percentage) || 0;
            return sum + (item.unit_price * item.quantity * rate / 100);
          }, 0);
        }
        function calcCustomerFee(subtotal, orderType) {
          if (orderType !== 'delivery') return 0;
          const cfg = DB.cafe?.rates?.customer?.service_fee;
          if (!cfg || !cfg.value) return 0;
          if (cfg.type === 'percent') return Math.round(subtotal * cfg.value / 100);
          return cfg.value;
        }
        function calcCourierFee(shippingCost) {
          const cfg = DB.cafe?.rates?.courier?.service_fee;
          if (!cfg || !cfg.value || !shippingCost) return 0;
          if (cfg.type === 'percent') return Math.round(shippingCost * cfg.value / 100);
          return cfg.value;
        }
        function effectiveAmount(o) {
          if (o.order_type === 'delivery' && o.shipping_cost > 0) {
            const ongkirPaid = o.payment_method === 'cod' || ['paid', 'confirmed'].includes(o.ongkir_status);
            if (ongkirPaid) {
              const netOngkir = o.shipping_cost - calcCourierFee(o.shipping_cost);
              return o.total_amount - netOngkir;
            }
          }
          return o.total_amount;
        }
        function calcMitraFee(total) {
          const cfg = DB.cafe?.rates?.mitra?.service_fee;
          if (!cfg || !cfg.value || !total) return 0;
          if (cfg.type === 'percent') return Math.round(total * cfg.value / 100);
          return cfg.value;
        }
        function isCheckedIn() {
          const today = new Date().toLocaleDateString('sv-SE');
          return DB.attendances.some(a =>
            a.user_id === State.currentUser.id && !a.check_out &&
            new Date(a.check_in).toLocaleDateString('sv-SE') === today
          );
        }
        function hasActiveCourier() {
          const today = new Date().toLocaleDateString('sv-SE');
          return DB.users.some(u => u.role === 'courier' && DB.attendances.some(a =>
            a.user_id === u.id && !a.check_out && new Date(a.check_in).toLocaleDateString('sv-SE') === today
          ));
        }
        function isMitraActive(mitraName) {
          if (!mitraName) return true;
          const today = new Date().toLocaleDateString('sv-SE');
          return DB.users.some(u => u.role === 'mitra_juru_masak' && u.name === mitraName && DB.attendances.some(a =>
            a.user_id === u.id && !a.check_out && new Date(a.check_in).toLocaleDateString('sv-SE') === today
          ));
        }
        function createMitraPayouts(orderId) {
          const o = DB.orders.find(x => x.id === orderId);
          if (!o) return;
          const mitraGroups = {};
          o.items.forEach(i => {
            const mi = getMenuItem(i.menu_item_id);
            if (mi && mi.submitted_by) {
              if (!mitraGroups[mi.submitted_by]) mitraGroups[mi.submitted_by] = [];
              mitraGroups[mi.submitted_by].push(i);
            }
          });
          Object.keys(mitraGroups).forEach(mitraName => {
            const items = mitraGroups[mitraName];
            const total = items.reduce((s, i) => s + i.unit_price * i.quantity, 0);
            const tax = Math.round(calcItemTax(items));
            const fee = calcMitraFee(total);
            const amount = total - tax - fee;
            if (amount <= 0) return;
            const exists = DB.mitraPayouts.some(p => p.order_id === orderId && p.mitra_name === mitraName);
            if (exists) return;
            DB.mitraPayouts.push({
              id: 'mp' + Date.now() + Math.random().toString(36).slice(2,6),
              order_id: orderId,
              mitra_name: mitraName,
              total_items: total,
              fee: fee,
              tax: tax,
              amount: amount,
              status: 'unpaid',
              created_at: new Date().toISOString(),
              paid_at: null,
              paid_by: null,
            });
          });
        }
        function getMitraPendingPayouts() {
          return DB.mitraPayouts.filter(p => p.status === 'unpaid');
        }
        function getMitraPaidPayouts() {
          return DB.mitraPayouts.filter(p => p.status === 'paid');
        }

