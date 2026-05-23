// ============================================================
// ADMIN VIEW — Overview & Users
// ============================================================
function renderAdminView() {
  const tab = State.currentTab.admin || 'overview';
  if (tab === 'overview') return renderAdminOverview();
  if (tab === 'users') return renderAdminUsers();
  if (tab === 'menu-mgmt') return renderAdminMenuMgmt();
  if (tab === 'tables-mgmt') return renderAdminTablesMgmt();
  if (tab === 'promos') return renderAdminPromos();
  if (tab === 'finance') return renderFinanceReport();
  if (tab === 'stock') return renderStockManagement();
  if (tab === 'expenses') return renderExpenseManagement();
  if (tab === 'attendance') return renderAttendance();
  if (tab === 'profile') return renderGenericProfile();
  return renderAdminOverview();
}

function renderAdminOverview() {
  const totalRev = getFinanceData().reduce((s, d) => s + d.revenue, 0);
  const totalExp = (DB.expenses || []).reduce((s, e) => s + e.amount, 0);
  const activeOrders = DB.orders.filter(o => !['completed', 'cancelled'].includes(o.status)).length;
  const pegawai = DB.users.filter(u => u.role !== 'customer').length;
  return `
  <div class="animate-fade-up">
    <div class="mb-6">
      <h2 class="font-display text-2xl font-bold mb-1">Admin Overview</h2>
      <p class="text-sm" style="color:var(--muted)">Kontrol penuh seluruh operasional ARQA Coffee</p>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
      <div class="stat-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="State.showRevenueTable=true;State.currentTab.admin='finance';render()"><div class="text-xs" style="color:var(--muted)">Total Pendapatan</div><div class="text-lg font-bold mt-1" style="color:var(--accent)">${formatCurrency(totalRev)}</div></div>
      <div class="stat-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="State.showExpenseTable=true;State.currentTab.admin='finance';render()"><div class="text-xs" style="color:var(--muted)">Total Pengeluaran</div><div class="text-lg font-bold mt-1" style="color:var(--danger)">${formatCurrency(totalExp)}</div></div>
      <div class="stat-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="State.currentTab.admin='overview';render()"><div class="text-xs" style="color:var(--muted)">Pesanan Aktif</div><div class="text-lg font-bold mt-1" style="color:var(--warning)">${activeOrders}</div></div>
      <div class="stat-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="State.currentTab.admin='attendance';render()"><div class="text-xs" style="color:var(--muted)">Pegawai Aktif</div><div class="text-lg font-bold mt-1" style="color:var(--success)">${pegawai}</div></div>
      <div class="stat-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="switchTab('menu-mgmt')"><div class="text-xs" style="color:var(--muted)">Total Menu</div><div class="text-lg font-bold mt-1">${DB.menuItems.length}</div></div>
      <div class="stat-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="switchTab('users')"><div class="text-xs" style="color:var(--muted)">Pengguna</div><div class="text-lg font-bold mt-1">${DB.users.length}</div></div>
    </div>
    ${(() => {
      const lowStock = DB.stockItems.filter(s => s.current_quantity <= s.min_quantity);
      if (!lowStock.length) return '';
      return `
    <div class="card mb-4" style="border-color:rgba(231,76,60,.3)">
      <h3 class="font-semibold text-sm mb-2" style="color:var(--danger)"><i class="fas fa-exclamation-triangle mr-1"></i>Peringatan Stok Rendah</h3>
      <div class="space-y-2">
        ${lowStock.map(s => `<div class="flex justify-between text-sm"><span>${s.name}</span><span style="color:var(--danger)">${s.current_quantity} / ${s.min_quantity} ${s.unit}</span></div>`).join('')}
      </div>
      <button onclick="State.currentTab.admin='stock';render()" class="text-xs font-bold mt-2 flex items-center gap-1" style="color:var(--accent)">Selengkapnya <i class="fas fa-arrow-right" style="font-size:10px"></i></button>
    </div>`})()}
    <div class="grid md:grid-cols-2 gap-4 mb-6">
      <div class="card"><canvas id="chart-admin-revenue" height="200"></canvas></div>
      <div class="card">
        <h3 class="font-semibold text-sm mb-3">Pesanan Terkini</h3>
        <div class="space-y-2 max-h-64 overflow-y-auto">
          ${DB.orders.slice(0, 6).map(o => {
            const tableInfo = o.order_type === 'dine-in' && o.table_id ? 'Meja ' + (getTable(o.table_id)?.number || '-') : '';
            const addrInfo = o.order_type === 'delivery' ? (o.delivery_address || '').slice(0, 30) + '...' : '';
            return `
          <div class="flex justify-between items-center text-sm py-2 border-b" style="border-color:var(--border)">
            <div>
              <span class="font-medium">#${o.id.slice(-5).toUpperCase()}</span>
              <span class="badge ${getStatusBadge(o.status)} ml-2">${getStatusLabel(o.status)}</span>
              <div class="text-[10px] mt-0.5" style="color:var(--muted)">${tableInfo || addrInfo}</div>
            </div>
            <span>${formatCurrency(o.total_amount)}</span>
          </div>`;
          }).join('')}
        </div>
        <button onclick="State.currentTab.admin='finance';render()" class="text-xs font-bold mt-2 flex items-center gap-1" style="color:var(--accent)">Selengkapnya <i class="fas fa-arrow-right" style="font-size:10px"></i></button>
      </div>
    </div>
    <div class="card">
      <h3 class="font-semibold text-sm mb-3">Status Meja</h3>
      <div class="grid grid-cols-4 md:grid-cols-8 gap-2">
        ${DB.tables.map(t => `
        <div class="text-center py-3 rounded-xl cursor-pointer hover:scale-[1.05] transition-transform" style="background:${t.status === 'available' ? 'rgba(39,174,96,.1)' : 'rgba(231,76,60,.1)'}" onclick="showTableDetail('${t.id}')">
          <i class="fas fa-chair mb-1" style="color:${t.status === 'available' ? 'var(--success)' : 'var(--danger)'}"></i>
          <div class="text-xs font-semibold">${t.number}</div>
        </div>`).join('')}
      </div>
    </div>
  </div>`;
}

function showTableDetail(id) {
  const t = DB.tables.find(x => x.id === id);
  if (!t) return;
  const orders = DB.orders.filter(o => o.table_id === id && !['completed', 'cancelled', 'rejected'].includes(o.status));
  showModal(`
    <div>
      <div class="flex items-center gap-4 mb-5">
        <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl" style="background:${t.status === 'available' ? 'rgba(39,174,96,.1)' : 'rgba(231,76,60,.1)'};color:${t.status === 'available' ? 'var(--success)' : 'var(--danger)'}"><i class="fas fa-chair"></i></div>
        <div>
          <h3 class="font-display text-xl font-bold">Meja ${t.number}</h3>
          <span class="badge ${t.status === 'available' ? 'badge-ready' : 'badge-cooking'}" style="background:${t.status === 'available' ? 'rgba(39,174,96,.1)' : 'rgba(231,76,60,.1)'};color:${t.status === 'available' ? 'var(--success)' : 'var(--danger)'}">${t.status === 'available' ? 'Tersedia' : 'Terisi'}</span>
        </div>
      </div>
      <div class="text-xs mb-4" style="color:var(--muted)"><i class="fas fa-qrcode mr-1"></i>QR: ${t.qr_code}</div>
      ${orders.length ? `
      <h4 class="font-semibold text-sm mb-3">Pesanan Aktif</h4>
      <div class="space-y-2 mb-4">
        ${orders.map(o => `
        <div class="card flex justify-between items-center py-2 px-3">
          <div>
            <span class="font-bold text-sm">#${o.id.slice(-5).toUpperCase()}</span>
            <span class="badge ${getStatusBadge(o.status)} ml-1">${getStatusLabel(o.status)}</span>
            <div class="text-[10px]" style="color:var(--muted)">${formatTime(o.created_at)}${o.customer_name ? ' — ' + o.customer_name : ''}</div>
          </div>
          <span class="font-bold text-sm" style="color:var(--accent)">${formatCurrency(o.total_amount)}</span>
        </div>`).join('')}
      </div>` : '<p class="text-sm py-3" style="color:var(--muted)">Tidak ada pesanan aktif di meja ini</p>'}
      <button onclick="closeModal()" class="btn-secondary w-full text-center">Tutup</button>
    </div>
  `);
}
