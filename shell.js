// ============================================================
        // MAIN APP SHELL
        // ============================================================
        function renderMainApp() {
            const u = State.currentUser;
            const role = u.role;
            let content = '';
            if (role === 'customer') content = renderCustomerView();
            else if (role === 'cashier') content = renderCashierView();
            else if (role === 'kitchen') content = renderKitchenView();
            else if (role === 'courier') content = renderCourierView();
            else if (role === 'manager') content = renderManagerView();
            else if (role === 'admin') content = renderAdminView();

            const useDrawer = ['admin', 'manager'].includes(role);
            const useNav = !useDrawer;

            return `
  <div class="min-h-screen" style="background:var(--bg)">
    ${useDrawer ? renderSideDrawer(role) : ''}
    ${useDrawer ? `<div class="drawer-overlay ${State.sidebarOpen ? 'open' : ''}" onclick="toggleDrawer()"></div>` : ''}
    <!-- Top Bar -->
    <header class="sticky top-0 z-50 glass-strong" style="border-bottom:1px solid var(--border)">
      <div class="flex items-center justify-between px-4 py-3 max-w-5xl mx-auto">
        <div class="flex items-center gap-3">
          ${useDrawer ? `<button onclick="toggleDrawer()" class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:var(--card)"><i class="fas fa-bars" style="color:var(--muted)"></i></button>` : ''}
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style="background:linear-gradient(135deg,var(--accent),var(--accent3))"><i class="fas fa-mug-hot text-white"></i></div>
            <span class="font-bold text-sm hidden sm:inline">ARQA Coffee</span>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <button onclick="showNotifPanel()" class="w-10 h-10 rounded-xl flex items-center justify-center relative" style="background:var(--card)">
            <i class="fas fa-bell" style="color:var(--muted)"></i>
            <span class="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center" style="background:var(--danger);color:#fff">${getUnreadCount()}</span>
          </button>
          
        </div>
      </div>
    </header>
    <!-- Content -->
    <main class="max-w-5xl mx-auto px-4 py-4 ${useNav ? 'pb-24' : ''}">
      ${content}
    </main>
    <!-- Bottom Nav -->
    ${useNav ? renderBottomNav(role) : ''}
  </div>`;
        }

        function getRoleLabel(r) {
            const m = { admin: 'Admin', manager: 'Manager', cashier: 'Kasir', kitchen: 'Juru Masak', courier: 'Kurir', customer: 'Pelanggan' };
            return m[r] || r;
        }

        function renderBottomNav(role) {
            const tabs = {
                customer: [{ id: 'menu', icon: 'fa-utensils', label: 'Menu' }, { id: 'cart', icon: 'fa-shopping-bag', label: 'Keranjang' }, { id: 'orders', icon: 'fa-receipt', label: 'Pesanan' }, { id: 'profile', icon: 'fa-user', label: 'Profil' }],
                cashier: [{ id: 'orders', icon: 'fa-clipboard-list', label: 'Pesanan' }, { id: 'payment', icon: 'fa-credit-card', label: 'Bayar' }, { id: 'report', icon: 'fa-chart-bar', label: 'Laporan' }, { id: 'tables-mgmt', icon: 'fa-table-cells', label: 'Meja' }, { id: 'profile', icon: 'fa-user', label: 'Profil' }],
                kitchen: [{ id: 'queue', icon: 'fa-fire-burner', label: 'Antrian' }, { id: 'history', icon: 'fa-clock-rotate-left', label: 'Riwayat' }, { id: 'profile', icon: 'fa-user', label: 'Profil' }],
                courier: [{ id: 'available', icon: 'fa-box', label: 'Tersedia' }, { id: 'active', icon: 'fa-route', label: 'Aktif' }, { id: 'history', icon: 'fa-clock-rotate-left', label: 'Riwayat' }, { id: 'profile', icon: 'fa-user', label: 'Profil' }],
            };
            const items = tabs[role] || [];
            const active = State.currentTab[role] || items[0]?.id;
            return `<nav class="bottom-nav">${items.map(t => `
    <div class="nav-item ${active === t.id ? 'active' : ''}" onclick="switchTab('${t.id}')">
      <i class="fas ${t.icon}"></i><span>${t.label}</span>
      ${t.id === 'cart' && State.cart.length ? `<span class="notif-dot"></span>` : ''}
      ${t.id === 'orders' && role === 'cashier' ? `<span class="notif-dot"></span>` : ''}
    </div>`).join('')}
  </nav>`;
        }

        function renderSideDrawer(role) {
            const items = role === 'admin' ? [
                { id: 'overview', icon: 'fa-gauge-high', label: 'Overview' },
                { id: 'wizard', icon: 'fa-wand-magic-sparkles', label: 'Setup Wizard' },
                { id: 'users', icon: 'fa-users-gear', label: 'Kelola Pengguna' },
                { id: 'menu-mgmt', icon: 'fa-utensils', label: 'Kelola Menu' },
                { id: 'tables-mgmt', icon: 'fa-table-cells', label: 'Kelola Meja' },
                { id: 'promos', icon: 'fa-tags', label: 'Kelola Promo' },
                { id: 'finance', icon: 'fa-chart-pie', label: 'Keuangan' },
                { id: 'stock', icon: 'fa-warehouse', label: 'Stok Bahan' },
                { id: 'attendance', icon: 'fa-calendar-check', label: 'Presensi' },
            ] : [
                { id: 'dashboard', icon: 'fa-gauge-high', label: 'Dashboard' },
                { id: 'menu-mgmt', icon: 'fa-utensils', label: 'Kelola Menu' },
                { id: 'tables-mgmt', icon: 'fa-table-cells', label: 'Kelola Meja' },
                { id: 'promos', icon: 'fa-tags', label: 'Kelola Promo' },
                { id: 'finance', icon: 'fa-chart-pie', label: 'Keuangan' },
                { id: 'stock', icon: 'fa-warehouse', label: 'Stok Bahan' },
                { id: 'attendance', icon: 'fa-calendar-check', label: 'Presensi' },
                { id: 'staff', icon: 'fa-users', label: 'Staff' },
                { id: 'profile', icon: 'fa-user', label: 'Profil' },
            ];
            const active = State.currentTab[role] || items[0]?.id;
            return `
  <div class="side-drawer ${State.sidebarOpen ? 'open' : ''}">
    <div class="px-6 py-5 border-b" style="border-color:var(--border)">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center font-bold" style="background:var(--accent);color:#fff">${State.currentUser.avatar}</div>
        <div><div class="font-semibold text-sm">${State.currentUser.name}</div><div class="text-xs" style="color:var(--muted)">${getRoleLabel(role)}</div></div>
      </div>
    </div>
    <div class="py-3">${items.map(i => `
      <div class="drawer-item ${active === i.id ? 'active' : ''}" onclick="switchTab('${i.id}');toggleDrawer()">
        <i class="fas ${i.icon}"></i><span>${i.label}</span>
      </div>`).join('')}
    </div>
    <div class="absolute bottom-0 left-0 right-0 p-4 border-t" style="border-color:var(--border)">
      <button onclick="handleLogout()" class="btn-secondary w-full text-center flex items-center justify-center gap-2">
        <i class="fas fa-right-from-bracket"></i> Keluar
      </button>
    </div>
  </div>`;
        }

        function toggleDrawer() { State.sidebarOpen = !State.sidebarOpen; render() }
        function switchTab(id) { State.currentTab[State.currentUser.role] = id; render() }
        function handleLogout() { State.currentUser = null; State.currentView = 'login'; State.cart = []; State.sidebarOpen = false; Object.values(State.mapInstances).forEach(m => { try { m.remove() } catch (e) { } }); State.mapInstances = {}; Object.values(State.chartInstances).forEach(c => { try { c.destroy() } catch (e) { } }); State.chartInstances = {}; render() }
        function showNotifPanel() { renderNotifPanel() }

