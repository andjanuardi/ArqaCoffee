// ============================================================
        // MANAGER VIEW
        // ============================================================
        function renderManagerView() {
            const tab = State.currentTab.manager || 'dashboard';
            if (tab === 'dashboard') return renderManagerDashboard();
            if (tab === 'finance') return renderFinanceReport();
            if (tab === 'stock') return renderStockManagement();
            if (tab === 'attendance') return renderAttendance();
            if (tab === 'staff') return renderStaffManagement();
            if (tab === 'promos') return renderAdminPromos(); // Reuse admin promo view
            if (tab === 'tables-mgmt') return renderAdminTablesMgmt();
            if (tab === 'profile') return renderGenericProfile();
            return renderManagerDashboard();
        }

        function renderManagerDashboard() {
            const totalRev = DB.dailySales.reduce((s, d) => s + d.revenue, 0);
            const totalOrders = DB.dailySales.reduce((s, d) => s + d.orders, 0);
            const lowStock = DB.stockItems.filter(s => s.current_quantity <= s.min_quantity);
            return `
  <div class="animate-fade-up">
    <div class="mb-6">
      <h2 class="font-display text-2xl font-bold mb-1">Dashboard</h2>
      <p class="text-sm" style="color:var(--muted)">Ringkasan operasional hari ini</p>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Pendapatan 7 Hari</div><div class="text-lg font-bold mt-1" style="color:var(--accent)">${formatCurrency(totalRev)}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Total Pesanan</div><div class="text-lg font-bold mt-1">${totalOrders}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Pesanan Aktif</div><div class="text-lg font-bold mt-1" style="color:var(--warning)">${DB.orders.filter(o => !['completed', 'cancelled'].includes(o.status)).length}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Stok Rendah</div><div class="text-lg font-bold mt-1" style="color:var(--danger)">${lowStock.length}</div></div>
    </div>
    ${lowStock.length > 0 ? `
    <div class="card mb-4" style="border-color:rgba(231,76,60,.3)">
      <h3 class="font-semibold text-sm mb-2" style="color:var(--danger)"><i class="fas fa-exclamation-triangle mr-1"></i>Peringatan Stok Rendah</h3>
      <div class="space-y-2">
        ${lowStock.map(s => `<div class="flex justify-between text-sm"><span>${s.name}</span><span style="color:var(--danger)">${s.current_quantity} / ${s.min_quantity} ${s.unit}</span></div>`).join('')}
      </div>
    </div>`: ''}
    <div class="card mb-4">
      <h3 class="font-semibold text-sm mb-3">Pesanan Terkini</h3>
      <div class="space-y-2 max-h-64 overflow-y-auto">
        ${DB.orders.slice(0, 6).map(o => `
        <div class="flex justify-between items-center text-sm py-2 border-b" style="border-color:var(--border)">
          <div><span class="font-medium">#${o.id.slice(-5).toUpperCase()}</span><span class="badge ${getStatusBadge(o.status)} ml-2">${getStatusLabel(o.status)}</span></div>
          <span>${formatCurrency(o.total_amount)}</span>
        </div>`).join('')}
      </div>
    </div>
    <div class="card mb-4">
      <h3 class="font-semibold text-sm mb-3">Status Meja</h3>
      <div class="grid grid-cols-4 md:grid-cols-8 gap-2">
        ${DB.tables.map(t => `
        <div class="text-center py-3 rounded-xl" style="background:${t.status === 'available' ? 'rgba(39,174,96,.1)' : 'rgba(231,76,60,.1)'}">
          <i class="fas fa-chair mb-1" style="color:${t.status === 'available' ? 'var(--success)' : 'var(--danger)'}"></i>
          <div class="text-xs font-semibold">${t.number}</div>
        </div>`).join('')}
      </div>
    </div>
    <div class="card mb-4"><canvas id="chart-revenue" height="200"></canvas></div>
    <div class="card"><canvas id="chart-orders" height="160"></canvas></div>
  </div>`;
        }

        function renderFinanceReport() {
            const totalRev = DB.dailySales.reduce((s, d) => s + d.revenue, 0);
            const today = DB.dailySales[DB.dailySales.length - 1];
            return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Laporan Keuangan</h2>
    <div class="grid grid-cols-2 gap-3 mb-5">
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Hari Ini</div><div class="text-lg font-bold mt-1" style="color:var(--accent)">${formatCurrency(today.revenue)}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">7 Hari</div><div class="text-lg font-bold mt-1" style="color:var(--accent)">${formatCurrency(totalRev)}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Rata-rata/Hari</div><div class="text-lg font-bold mt-1">${formatCurrency(Math.round(totalRev / 7))}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Transaksi Hari Ini</div><div class="text-lg font-bold mt-1">${today.orders}</div></div>
    </div>
    <div class="card mb-4"><canvas id="chart-finance-detail" height="250"></canvas></div>
    <div class="card">
      <h3 class="font-semibold text-sm mb-3">Rincian Transaksi Hari Ini</h3>
      <div class="space-y-2">
        ${DB.orders.filter(o => o.payment_status === 'paid').slice(0, 8).map(o => `
        <div class="flex justify-between items-center text-sm py-2 border-b" style="border-color:var(--border)">
          <div><span class="font-medium">#${o.id.slice(-5).toUpperCase()}</span><span class="text-xs ml-2" style="color:var(--muted)">${getOrderTypeName(o.order_type)}</span></div>
          <span style="color:var(--success)">${formatCurrency(o.total_amount)}</span>
        </div>`).join('')}
      </div>
    </div>
  </div>`;
        }

        function renderStockManagement() {
            return `
  <div class="animate-fade-up">
    <div class="flex justify-between items-center mb-4">
      <h2 class="font-display text-xl font-bold">Stok Bahan Baku</h2>
      <button onclick="showAddStockModal()" class="btn-primary btn-sm"><i class="fas fa-plus mr-1"></i>Tambah</button>
    </div>
    <div class="space-y-3">
      ${DB.stockItems.map(s => {
                const pct = Math.min(100, Math.round(s.current_quantity / (s.min_quantity * 3) * 100));
                const isLow = s.current_quantity <= s.min_quantity;
                return `
        <div class="card ${isLow ? 'animate-breathe' : ''}">
          <div class="flex justify-between items-center mb-2">
            <div class="font-semibold text-sm">${s.name} ${isLow ? '<span style="color:var(--danger);font-size:11px"><i class="fas fa-exclamation-triangle"></i> Rendah</span>' : ''}</div>
            <div class="text-sm font-bold" style="color:${isLow ? 'var(--danger)' : 'var(--accent)'}">${s.current_quantity} ${s.unit}</div>
          </div>
          <div class="stock-bar"><div class="stock-bar-fill" style="width:${pct}%;background:${isLow ? 'var(--danger)' : 'var(--accent)'}"></div></div>
          <div class="flex justify-between mt-2">
            <span class="text-xs" style="color:var(--muted)">Minimum: ${s.min_quantity} ${s.unit}</span>
            <div class="flex gap-1">
              <button onclick="adjustStock('${s.id}','in')" class="btn-sm" style="background:rgba(39,174,96,.15);color:var(--success);border:none;padding:4px 10px;border-radius:6px;cursor:pointer;font-size:11px"><i class="fas fa-plus"></i></button>
              <button onclick="adjustStock('${s.id}','out')" class="btn-sm" style="background:rgba(231,76,60,.15);color:var(--danger);border:none;padding:4px 10px;border-radius:6px;cursor:pointer;font-size:11px"><i class="fas fa-minus"></i></button>
            </div>
          </div>
        </div>`;
            }).join('')}
    </div>
  </div>`;
        }

        function adjustStock(id, type) {
            const s = DB.stockItems.find(x => x.id === id); if (!s) return;
            const qty = type === 'in' ? 5 : 2;
  s.current_quantity = type === 'in' ? s.current_quantity + qty : Math.max(0, s.current_quantity - qty);
  DB.stockMovements.push({ id: 'sm' + Date.now(), stock_item_id: id, user_id: State.currentUser.id, type, quantity: qty, notes: type === 'in' ? 'Restok' : 'Pemakaian', created_at: new Date().toISOString() });
  if (s.current_quantity <= s.min_quantity) notifyLowStock(s);
  autoUpdateMenuAvailability();
  showToast(`${s.name}: ${type === 'in' ? '+' + qty : '-' + qty} ${s.unit}`, 'success'); render();
        }

        function showAddStockModal() {
            showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Tambah Bahan Baku</h3>
      <div class="space-y-3">
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Nama</label><input id="new-stock-name" class="input-field text-sm" placeholder="Misal: Susu Oat"></div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Jumlah</label><input id="new-stock-qty" type="number" class="input-field text-sm" value="10"></div>
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Satuan</label><input id="new-stock-unit" class="input-field text-sm" value="kg"></div>
        </div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Batas Minimum</label><input id="new-stock-min" type="number" class="input-field text-sm" value="3"></div>
      </div>
      <button onclick="addStockItem()" class="btn-primary w-full mt-4 text-center">Simpan</button>
    </div>
  `);
        }

        function addStockItem() {
            const name = document.getElementById('new-stock-name')?.value;
            if (!name) { showToast('Nama bahan wajib diisi', 'warning'); return }
            DB.stockItems.push({ id: 's' + Date.now(), name, unit: document.getElementById('new-stock-unit')?.value || 'kg', current_quantity: parseInt(document.getElementById('new-stock-qty')?.value || '10'), min_quantity: parseInt(document.getElementById('new-stock-min')?.value || '3'), updated_at: new Date().toISOString() });
            closeModal(); showToast('Bahan baku ditambahkan', 'success'); render();
        }

        function renderAttendance() {
            const today = new Date().toISOString().split('T')[0];
            const staff = DB.users.filter(u => ['manager', 'cashier', 'kitchen', 'courier'].includes(u.role));
            return `
  <div class="animate-fade-up">
    <div class="flex justify-between items-center mb-4">
      <h2 class="font-display text-xl font-bold">Presensi</h2>
      <span class="text-sm" style="color:var(--muted)">${formatDate(today)}</span>
    </div>
    
    <div class="space-y-3">
      ${staff.map(s => {
                const att = DB.attendances.find(a => a.user_id === s.id && !a.check_out);
                const isCheckedIn = !!att;
                return `
        <div class="card flex items-center gap-4">
          <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold" style="background:var(--accent);color:#fff">${s.avatar}</div>
          <div class="flex-1 min-w-0">
            <div class="font-semibold text-sm">${s.name}</div>
            <div class="text-xs" style="color:var(--muted)">${getRoleLabel(s.role)}</div>
            ${att ? `<div class="text-xs mt-1" style="color:var(--success)"><i class="fas fa-clock mr-1"></i>Check-in: ${formatTime(att.check_in)}</div>` : ''}
            ${att && att.lat ? `<div class="text-[10px] mt-0.5" style="color:var(--muted)"><i class="fas fa-map-pin mr-1"></i>${att.lat.toFixed(4)}, ${att.lng.toFixed(4)}</div>` : ''}
          </div>
          <div class="flex-shrink-0">
            ${isCheckedIn ? `<span class="badge badge-cooking">Aktif</span>` : `<span class="badge badge-pending">Off</span>`}
          </div>
        </div>`;
            }).join('')}
    </div>
  </div>`;
        }

        function renderStaffManagement() {

            const staff = DB.users.filter(u => u.role !== 'admin');
            return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Manajemen Staff</h2>
    <div class="space-y-3">
      ${staff.map(s => `
      <div class="card flex items-center gap-4">
        <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold" style="background:var(--accent);color:#fff">${s.avatar}</div>
        <div class="flex-1">
          <div class="font-semibold text-sm">${s.name}</div>
          <div class="text-xs" style="color:var(--muted)">${s.email} — ${getRoleLabel(s.role)}</div>
        </div>
        <span class="badge ${s.role === 'cashier' ? 'badge-ready' : s.role === 'kitchen' ? 'badge-cooking' : 'badge-delivering'}">${getRoleLabel(s.role)}</span>
      </div>`).join('')}
    </div>
  </div>`;
        }

