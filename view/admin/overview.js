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
  if (tab === 'active-orders') return renderActiveOrders();
  if (tab === 'courier-finance') return renderAdminCourierFinance();
  if (tab === 'mitra-finance') return renderAdminMitraFinance();
  if (tab === 'attendance') return renderAttendance();
  if (tab === 'profile') return renderGenericProfile();
  return renderAdminOverview();
}

function renderAdminCourierFinance() {
  if (!State.adminCourierDate) State.adminCourierDate = new Date().toISOString().split('T')[0];
  const dateVal = State.adminCourierDate;
  const couriers = DB.users.filter(u => u.role === 'courier');
  const deliveryOrders = DB.orders.filter(o => o.order_type === 'delivery' && o.created_at && o.created_at.split('T')[0] === dateVal);
  const totalRevenue = deliveryOrders.filter(o => o.payment_status === 'paid').reduce((s, o) => s + (o.total_amount || 0), 0);
  const totalOrders = deliveryOrders.length;
  const courierStats = couriers.map(c => {
    const assigned = deliveryOrders.filter(o => o.courier_id === c.id);
    const completed = assigned.filter(o => o.status === 'completed' || o.status === 'delivered');
    return { ...c, assigned, completed, revenue: completed.reduce((s, o) => s + (o.total_amount || 0), 0) };
  });
  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Keuangan Kurir</h2>
    <div class="mb-4">
      <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Filter Tanggal</label>
      <input type="date" class="input-field" style="max-width:260px" value="${dateVal}" onchange="State.adminCourierDate=this.value;render()">
    </div>
    <div class="grid grid-cols-2 gap-3 mb-5">
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Pendapatan Kurir</div><div class="text-xl font-bold mt-1" style="color:var(--accent)">${formatCurrency(totalRevenue)}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Pesanan Delivery</div><div class="text-xl font-bold mt-1">${totalOrders}</div></div>
    </div>
    <div class="space-y-3 mb-4">
      <h3 class="font-semibold text-sm">Kinerja Kurir</h3>
      ${courierStats.map(cs => `
      <div class="card">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold" style="background:var(--accent);color:#fff">${cs.avatar || cs.name[0]}</div>
          <div class="flex-1">
            <div class="font-semibold text-sm">${cs.name}</div>
            <div class="text-xs" style="color:var(--muted)">${cs.email}</div>
          </div>
          <div class="text-right">
            <div class="text-sm font-bold" style="color:var(--success)">${cs.completed.length}/${cs.assigned.length}</div>
            <div class="text-[10px]" style="color:var(--muted)">Selesai</div>
          </div>
        </div>
        <div class="text-sm flex justify-between px-1">
          <span style="color:var(--muted)">Pendapatan:</span>
          <span style="color:var(--accent)">${formatCurrency(cs.revenue)}</span>
        </div>
      </div>`).join('')}
    </div>
    <div class="card">
      <h3 class="font-semibold text-sm mb-3">Riwayat Delivery</h3>
      <div class="space-y-2 max-h-80 overflow-y-auto">
        ${deliveryOrders.length === 0 ? '<p class="text-sm text-center py-4" style="color:var(--muted)">Belum ada pesanan delivery</p>' : deliveryOrders.sort((a,b) => new Date(b.created_at) - new Date(a.created_at)).map(o => {
          const c = o.courier_id ? getUser(o.courier_id) : null;
          return `
        <div class="flex justify-between items-center text-sm py-2 border-b" style="border-color:var(--border)">
          <div>
            <span class="font-medium">#${o.id.slice(-5).toUpperCase()}</span>
            <span class="badge ${getStatusBadge(o.status)} ml-1">${getStatusLabel(o.status)}</span>
            <div class="text-[10px] mt-0.5" style="color:var(--muted)">${o.customer_name || 'Walk-in'}${c ? ' — Kurir: ' + c.name : ' — Tanpa Kurir'}</div>
          </div>
          <div class="text-right">
            <div style="color:${o.payment_status === 'paid' ? 'var(--success)' : 'var(--danger)'}">${formatCurrency(o.total_amount)}</div>
            <div class="text-[10px]" style="color:var(--muted)">${o.payment_status === 'paid' ? 'Lunas' : 'Belum Bayar'}</div>
          </div>
        </div>`;}).join('')}
      </div>
    </div>
  </div>`;
}

function renderAdminMitraFinance() {
  if (!State.adminMitraDate) State.adminMitraDate = new Date().toISOString().split('T')[0];
  const dateVal = State.adminMitraDate;
  const mitraUsers = DB.users.filter(u => u.role === 'mitra_juru_masak');
  const mitraOrders = DB.orders.filter(o => o.created_at && o.created_at.split('T')[0] === dateVal && o.items.some(i => i.claimed_by));
  const mitraStats = mitraUsers.map(m => {
    const items = [];
    let revenue = 0;
    mitraOrders.forEach(o => {
      o.items.forEach(i => {
        if (i.claimed_by === m.name) {
          items.push({ ...i, order: o });
          if (o.payment_status === 'paid') revenue += (i.unit_price * i.quantity) || 0;
        }
      });
    });
    return { ...m, items, revenue, count: items.length };
  });
  const totalRevenue = mitraStats.reduce((s, m) => s + m.revenue, 0);
  const totalItems = mitraStats.reduce((s, m) => s + m.count, 0);
  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Keuangan Mitra Juru Masak</h2>
    <div class="mb-4">
      <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Filter Tanggal</label>
      <input type="date" class="input-field" style="max-width:260px" value="${dateVal}" onchange="State.adminMitraDate=this.value;render()">
    </div>
    <div class="grid grid-cols-2 gap-3 mb-5">
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Pendapatan Mitra</div><div class="text-xl font-bold mt-1" style="color:var(--accent)">${formatCurrency(totalRevenue)}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Item Diproses</div><div class="text-xl font-bold mt-1">${totalItems}</div></div>
    </div>
    <div class="space-y-3 mb-4">
      <h3 class="font-semibold text-sm">Kinerja Mitra</h3>
      ${mitraStats.map(ms => `
      <div class="card">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold" style="background:var(--accent);color:#fff">${ms.avatar || ms.name[0]}</div>
          <div class="flex-1">
            <div class="font-semibold text-sm">${ms.name}</div>
            <div class="text-xs" style="color:var(--muted)">${ms.email}</div>
          </div>
          <div class="text-right">
            <div class="text-sm font-bold" style="color:var(--success)">${ms.count}</div>
            <div class="text-[10px]" style="color:var(--muted)">Item</div>
          </div>
        </div>
        <div class="text-sm flex justify-between px-1">
          <span style="color:var(--muted)">Pendapatan:</span>
          <span style="color:var(--accent)">${formatCurrency(ms.revenue)}</span>
        </div>
      </div>`).join('')}
      ${mitraStats.length === 0 ? '<p class="text-sm text-center py-4" style="color:var(--muted)">Belum ada data mitra</p>' : ''}
    </div>
    <div class="card">
      <h3 class="font-semibold text-sm mb-3">Riwayat Proses Mitra</h3>
      <div class="space-y-2 max-h-80 overflow-y-auto">
        ${mitraOrders.length === 0 ? '<p class="text-sm text-center py-4" style="color:var(--muted)">Belum ada item diproses mitra</p>' : mitraOrders.sort((a,b) => new Date(b.created_at) - new Date(a.created_at)).map(o => {
          const claimedItems = o.items.filter(i => i.claimed_by);
          return `
        <div class="flex justify-between items-center text-sm py-2 border-b" style="border-color:var(--border)">
          <div>
            <span class="font-medium">#${o.id.slice(-5).toUpperCase()}</span>
            <span class="badge ${getStatusBadge(o.status)} ml-1">${getStatusLabel(o.status)}</span>
            <div class="text-[10px] mt-0.5" style="color:var(--muted)">${claimedItems.map(i => i.claimed_by + ' (' + (getMenuItem(i.menu_item_id)?.name || 'Item') + ' x' + i.quantity + ')').join(', ')}</div>
          </div>
          <div style="color:${o.payment_status === 'paid' ? 'var(--success)' : 'var(--danger)'}">${formatCurrency(o.total_amount)}</div>
        </div>`;}).join('')}
      </div>
    </div>
  </div>`;
}

function renderAdminOverview() {
  const totalRev = getFinanceData().reduce((s, d) => s + d.revenue, 0);
  const totalExp = (DB.expenses || []).reduce((s, e) => s + e.amount, 0);
  const activeOrders = DB.orders.filter(o => !['completed', 'cancelled'].includes(o.status)).length;
  const pegawai = DB.users.filter(u => u.role !== 'customer').length;
  const prodCount = {};
  DB.orders.filter(o => o.payment_status === 'paid').forEach(o => {
    (o.items || []).forEach(item => {
      const mi = DB.menuItems.find(m => m.id === item.menu_item_id);
      if (mi) prodCount[mi.name] = (prodCount[mi.name] || 0) + item.quantity;
    });
  });
  const topProducts = Object.entries(prodCount).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const maxQty = topProducts.length ? topProducts[0][1] : 0;
  return `
  <div class="animate-fade-up">
    <div class="mb-6">
      <h2 class="font-display text-2xl font-bold mb-1">Admin Overview</h2>
      <p class="text-sm" style="color:var(--muted)">Kontrol penuh seluruh operasional ARQA Coffee</p>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
      <div class="stat-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="State.showRevenueTable=true;State.currentTab.admin='finance';render()"><div class="text-xs" style="color:var(--muted)">Total Pendapatan</div><div class="text-lg font-bold mt-1" style="color:var(--accent)">${formatCurrency(totalRev)}</div></div>
      <div class="stat-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="State.showExpenseTable=true;State.currentTab.admin='finance';render()"><div class="text-xs" style="color:var(--muted)">Total Pengeluaran</div><div class="text-lg font-bold mt-1" style="color:var(--danger)">${formatCurrency(totalExp)}</div></div>
      <div class="stat-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="State.currentTab.admin='active-orders';render()"><div class="text-xs" style="color:var(--muted)">Pesanan Aktif</div><div class="text-lg font-bold mt-1" style="color:var(--warning)">${activeOrders}</div></div>
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
    <div class="grid md:grid-cols-2 gap-4 mb-6">
      <div class="card">
        <h3 class="font-semibold text-sm mb-3">Produk Terlaris</h3>
        ${topProducts.length ? `
        <div class="space-y-3">
          ${topProducts.map(([name, qty], i) => {
            const pct = maxQty > 0 ? Math.round(qty / maxQty * 100) : 0;
            return `
          <div>
            <div class="flex items-center justify-between text-sm mb-1">
              <div class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style="background:${i === 0 ? 'var(--accent)' : 'var(--bg2)'};color:${i === 0 ? '#fff' : 'var(--muted)'}">${i + 1}</span>
                <span class="truncate">${name}</span>
              </div>
              <span class="font-semibold shrink-0" style="color:var(--accent)">${qty}</span>
            </div>
            <div class="w-full h-1.5 rounded-full" style="background:var(--bg2)">
              <div class="h-full rounded-full transition-all" style="width:${pct}%;background:${i === 0 ? 'var(--accent)' : 'var(--muted)'}"></div>
            </div>
          </div>`;
          }).join('')}
        </div>` : '<div class="text-sm py-4 text-center" style="color:var(--muted)">Belum ada data</div>'}
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
