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
  if (tab === 'active-playground') return renderActivePlaygroundTickets();
  if (tab === 'service-control') return renderServiceControl();
  if (tab === 'courier-finance') return renderAdminCourierFinance();
  if (tab === 'mitra-finance') return renderAdminMitraFinance();
  if (tab === 'mitra-approval') return renderAdminMitraApproval();
  if (tab === 'attendance') return renderAttendance();
  if (tab === 'profile') return renderGenericProfile();
  return renderAdminOverview();
}

function saveShippingRate() {
  if (!DB.cafe) DB.cafe = {};
  if (!DB.cafe.shipping) DB.cafe.shipping = {};
  const min = parseInt(document.getElementById('shipping-min-input')?.value);
  const rate = parseInt(document.getElementById('shipping-rate-input')?.value);
  if (!min || !rate || min < 0 || rate < 0) { showToast('Nilai tidak valid', 'warning'); return; }
  DB.cafe.shipping.min = min;
  DB.cafe.shipping.rate_per_km = rate;
  showToast('Tarif ongkir diperbarui! Min ' + formatCurrency(min) + ', Per KM ' + formatCurrency(rate), 'success');
  render();
}

function renderAdminCourierFinance() {
  const courierId = State.adminCourierFilterId || "";
  const dateFilter = State.adminCourierDateFilter || "";
  const couriers = DB.users.filter(u => u.role === 'courier');
  let done = DB.orders.filter(o => o.courier_id && (o.status === "completed" || o.status === "delivered"));
  if (courierId) done = done.filter(o => o.courier_id === courierId);
  if (dateFilter) {
    const s = new Date(dateFilter);
    s.setHours(0, 0, 0, 0);
    const e = new Date(dateFilter);
    e.setHours(23, 59, 59, 999);
    done = done.filter(o => new Date(o.created_at) >= s && new Date(o.created_at) <= e);
  }
  const totalSetor = done.filter(o => o.status === "delivered").reduce((s, o) => s + (o.total_amount || 0), 0);
  const totalOngkir = done.reduce((s, o) => s + (o.shipping_cost || 0), 0);
  const totalTransaksi = totalSetor + totalOngkir;
  const totalPendapatan = totalOngkir;
  done.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Keuangan Kurir</h2>
    <div class="flex gap-2 mb-3">
      <div class="flex-1">
        <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Kurir</label>
        <select id="admin-courier-select" class="input-field text-sm" onchange="State.adminCourierFilterId=this.value;render()">
          <option value="">Semua Kurir</option>
          ${couriers.map(c => `<option value="${c.id}" ${c.id === courierId ? 'selected' : ''}>${c.name}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="flex gap-2 mb-4">
      <div class="flex-1">
        <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Tanggal</label>
        <input type="date" id="admin-courier-date-filter" class="input-field w-full" value="${dateFilter}" onchange="State.adminCourierDateFilter=this.value;render()">
      </div>
      ${dateFilter ? '<button onclick="State.adminCourierDateFilter=\'\';render()" class="self-end btn-sm mb-0.5" style="background:rgba(231,76,60,.1);color:var(--danger);border:none;padding:8px 12px;border-radius:10px;height:40px"><i class="fas fa-times"></i></button>' : ""}
    </div>
    <div class="grid grid-cols-3 gap-2 mb-4">
      <div class="stat-card text-center">
        <div class="text-xs" style="color:var(--muted)">Total Transaksi</div>
        <div class="text-sm font-bold mt-1" style="color:var(--accent)">${formatCurrency(totalTransaksi)}</div>
      </div>
      <div class="stat-card text-center">
        <div class="text-xs" style="color:var(--muted)">Harus Disetor</div>
        <div class="text-sm font-bold mt-1" style="color:${totalSetor > 0 ? 'var(--danger)' : 'var(--success)'}">${formatCurrency(totalSetor)}</div>
      </div>
      <div class="stat-card text-center">
        <div class="text-xs" style="color:var(--muted)">Total Pendapatan</div>
        <div class="text-sm font-bold mt-1" style="color:var(--accent)">${formatCurrency(totalPendapatan)}</div>
      </div>
    </div>
    <div class="space-y-2">
      ${done.length === 0 ? '<p class="text-center py-8 text-sm" style="color:var(--muted)">Belum ada riwayat</p>' : ''}
      ${done.map(o => {
        const c = o.courier_id ? getUser(o.courier_id) : null;
        return `
      <div class="card flex justify-between items-center py-3 cursor-pointer hover:scale-[1.02] transition-transform" onclick="showCourierOrderDetail('${o.id}')">
        <div>
          <div><span class="font-semibold text-sm">#${o.id.slice(-5).toUpperCase()}</span> ${o.status === "delivered" ? '<span class="badge badge-unpaid" style="background:rgba(241,196,15,.15);color:#f1c40f">Belum Setor</span>' : '<span class="badge badge-completed">Selesai</span>'} ${c ? '<span class="text-xs ml-1" style="color:var(--muted)"><i class="fas fa-motorcycle mr-1"></i>' + c.name + '</span>' : ''}</div>
          <div class="text-xs" style="color:var(--muted)"><i class="fas fa-user mr-1" style="color:var(--accent)"></i>${o.customer_name || (getUser(o.user_id)?.name || getUser(o.user_id)?.email || '—')}</div>
          <div class="text-xs" style="color:var(--muted)"><i class="fas fa-phone mr-1" style="color:var(--accent)"></i>${o.customer_phone || (getUser(o.user_id)?.phone || '—')}</div>
          <div class="text-xs" style="color:var(--muted)">${formatDate(o.created_at)} ${formatTime(o.created_at)}</div>
          <div class="text-xs" style="color:var(--muted)">${o.delivery_address?.slice(0, 30) || ""}</div>${o.delivery_detail ? `<div class="text-xs" style="color:var(--muted)">${o.delivery_detail?.slice(0, 30) || ""}</div>` : ""}${o.shipping_cost && o.shipping_cost > 0 ? `<div class="text-xs mt-1" style="color:var(--accent)"><i class="fas fa-truck mr-1"></i>Ongkir: ${formatCurrency(o.shipping_cost)}</div>` : ""}</div>
        <span class="font-bold text-sm" style="color:var(--success)">${formatCurrency(o.total_amount)}</span>
      </div>`;
      }).join('')}
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

function renderAdminMitraApproval() {
  if (!DB.mitraRegistrations) DB.mitraRegistrations = [];
  const pending = DB.mitraRegistrations.filter(r => r.status === 'pending');
  const approved = DB.mitraRegistrations.filter(r => r.status === 'approved');
  const rejected = DB.mitraRegistrations.filter(r => r.status === 'rejected');
  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Approval Pendaftaran Mitra</h2>
    ${pending.length > 0 ? `<div class="mb-4 p-3 rounded-xl flex items-center gap-2" style="background:rgba(243,156,18,.1);border:1px solid rgba(243,156,18,.2)">
      <i class="fas fa-clock" style="color:var(--warning)"></i>
      <span class="text-sm font-semibold" style="color:var(--warning)">${pending.length} pendaftaran menunggu</span>
    </div>` : ''}
    <div class="space-y-3 mb-6">
      <h3 class="font-semibold text-sm">Menunggu Persetujuan</h3>
      ${pending.length === 0 ? '<p class="text-sm text-center py-6" style="color:var(--muted)">Tidak ada pendaftaran baru</p>' : pending.map(r => `
      <div class="card">
        <div class="flex items-start gap-3 mb-3">
          <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm" style="background:${r.role === 'courier' ? 'rgba(155,89,182,.15)' : 'rgba(232,67,147,.15)'};color:${r.role === 'courier' ? '#9b59b6' : '#e84393'}">${r.name[0]}</div>
          <div class="flex-1 min-w-0">
            <div class="font-semibold text-sm">${r.name}</div>
            <div class="text-xs" style="color:var(--muted)">${r.email}${r.phone ? ' • ' + r.phone : ''}</div>
            <div class="text-xs mt-1"><span class="badge" style="background:${r.role === 'courier' ? 'rgba(155,89,182,.15)' : 'rgba(232,67,147,.15)'};color:${r.role === 'courier' ? '#9b59b6' : '#e84393'}">${r.role === 'courier' ? 'Kurir' : 'Mitra Juru Masak'}</span></div>
            ${r.address ? `<div class="text-xs mt-1" style="color:var(--muted)"><i class="fas fa-map-pin mr-1"></i>${r.address}</div>` : ''}
            <div class="text-[10px] mt-1" style="color:var(--muted)">Daftar: ${formatDate(r.created_at)}</div>
          </div>
        </div>
        <div class="flex gap-2">
          <button onclick="approveMitraRegistration('${r.id}')" class="btn-primary btn-sm flex-1 text-center" style="background:linear-gradient(135deg,var(--success),#1e8449)"><i class="fas fa-check mr-1"></i>Setujui</button>
          <button onclick="rejectMitraRegistration('${r.id}')" class="btn-sm flex-1 text-center" style="background:rgba(231,76,60,.1);color:var(--danger);border:none;padding:8px;border-radius:10px;cursor:pointer;font-size:12px"><i class="fas fa-times mr-1"></i>Tolak</button>
        </div>
      </div>`).join('')}
    </div>
    ${approved.length > 0 ? `
    <details class="mb-4">
      <summary class="text-xs font-semibold cursor-pointer" style="color:var(--success)"><i class="fas fa-check-circle mr-1"></i>Disetujui (${approved.length})</summary>
      <div class="mt-3 space-y-2">${approved.map(r => `
        <div class="card flex items-center gap-3 py-2 px-3">
          <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style="background:rgba(39,174,96,.15);color:var(--success)">${r.name[0]}</div>
          <div class="flex-1 min-w-0">
            <div class="text-sm font-semibold">${r.name}</div>
            <div class="text-xs" style="color:var(--muted)">${r.email} — ${r.role === 'courier' ? 'Kurir' : 'Mitra Juru Masak'}</div>
          </div>
          <span class="text-[10px]" style="color:var(--muted)">${formatDate(r.created_at)}</span>
        </div>`).join('')}</div>
    </details>` : ''}
    ${rejected.length > 0 ? `
    <details>
      <summary class="text-xs font-semibold cursor-pointer" style="color:var(--danger)"><i class="fas fa-times-circle mr-1"></i>Ditolak (${rejected.length})</summary>
      <div class="mt-3 space-y-2">${rejected.map(r => `
        <div class="card flex items-center gap-3 py-2 px-3">
          <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style="background:rgba(231,76,60,.15);color:var(--danger)">${r.name[0]}</div>
          <div class="flex-1 min-w-0">
            <div class="text-sm font-semibold">${r.name}</div>
            <div class="text-xs" style="color:var(--muted)">${r.email} — ${r.role === 'courier' ? 'Kurir' : 'Mitra Juru Masak'}</div>
          </div>
          <span class="text-[10px]" style="color:var(--muted)">${formatDate(r.created_at)}</span>
        </div>`).join('')}</div>
    </details>` : ''}
  </div>`;
}

function approveMitraRegistration(id) {
  const r = DB.mitraRegistrations?.find(x => x.id === id);
  if (!r) return;
  r.status = 'approved';
  const pwd = 'password123';
  DB.users.push({ id: 'u' + Date.now(), name: r.name, email: r.email, password: pwd, role: r.role, phone: r.phone || '', address: r.address || '', avatar: r.name[0].toUpperCase() });
  showToast(`${r.name} disetujui sebagai ${r.role === 'courier' ? 'Kurir' : 'Mitra Juru Masak'}!`, 'success');
  render();
}

function rejectMitraRegistration(id) {
  const r = DB.mitraRegistrations?.find(x => x.id === id);
  if (!r) return;
  r.status = 'rejected';
  showToast(`${r.name} ditolak`, 'info');
  render();
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

function isServiceClosed() {
  if (!DB.cafe) DB.cafe = {};
  if (DB.cafe.serviceStatus === 'closed') return true;
  if (DB.cafe.serviceSchedule) {
    const today = new Date().getDay();
    const idx = today === 0 ? 6 : today - 1;
    const day = DB.cafe.serviceSchedule[idx];
    if (day && !day.active) return true;
  }
  return false;
}

function renderServiceControl() {
  if (!DB.cafe) DB.cafe = {};
  if (!DB.cafe.serviceStatus) DB.cafe.serviceStatus = 'open';
  if (!DB.cafe.serviceSchedule) {
    const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu', 'Minggu'];
    DB.cafe.serviceSchedule = days.map((name, i) => ({ day: i, name, active: true }));
  }
  const isOpen = DB.cafe.serviceStatus === 'open';
  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-1">Kontrol Buka Tutup Layanan</h2>
    <p class="text-sm mb-5" style="color:var(--muted)">Atur jadwal operasional ARQA Coffee</p>
    <div class="card mb-5 text-center py-8" style="border:2px solid ${isOpen ? 'rgba(39,174,96,.3)' : 'rgba(231,76,60,.3)'}">
      <div class="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-4xl" style="background:${isOpen ? 'rgba(39,174,96,.12)' : 'rgba(231,76,60,.12)'};color:${isOpen ? 'var(--success)' : 'var(--danger)'}">
        <i class="fas ${isOpen ? 'fa-store' : 'fa-store-slash'}"></i>
      </div>
      <div class="text-2xl font-bold mb-1" style="color:${isOpen ? 'var(--success)' : 'var(--danger)'}">${isOpen ? 'BUKA' : 'TUTUP'}</div>
      <p class="text-sm mb-4" style="color:var(--muted)">Layanan sedang ${isOpen ? 'beroperasi' : 'tidak beroperasi'}</p>
      <button onclick="toggleServiceStatus()" class="btn-sm font-semibold" style="background:${isOpen ? 'rgba(231,76,60,.1)' : 'rgba(39,174,96,.1)'};color:${isOpen ? 'var(--danger)' : 'var(--success)'};border:1px solid ${isOpen ? 'rgba(231,76,60,.2)' : 'rgba(39,174,96,.2)'};padding:10px 24px;border-radius:12px;cursor:pointer">
        <i class="fas ${isOpen ? 'fa-store-slash' : 'fa-store'} mr-1"></i>${isOpen ? 'Tutup Manual' : 'Buka Manual'}
      </button>
    </div>
    <div class="card">
      <h3 class="font-semibold text-sm mb-1"><i class="fas fa-calendar-week mr-1"></i>Jadwal Buka Otomatis</h3>
      <p class="text-xs mb-4" style="color:var(--muted)">Atur hari apa saja layanan buka. Di luar hari ini layanan otomatis tutup.</p>
      <div class="space-y-2 mb-4">
        ${DB.cafe.serviceSchedule.map(d => `
        <div class="flex items-center justify-between py-2 px-3 rounded-xl" style="background:var(--bg2)">
          <span class="text-sm font-medium">${d.name}</span>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" class="sr-only peer" ${d.active ? 'checked' : ''} onchange="scheduleDayToggle(${d.day}, this.checked)">
            <div class="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" style="background:${d.active ? 'var(--success)' : 'rgba(255,255,255,.15)'}"></div>
          </label>
        </div>`).join('')}
      </div>
      <button onclick="saveServiceSchedule()" class="btn-primary w-full text-center"><i class="fas fa-save mr-1"></i>Simpan Jadwal</button>
    </div>
    ${DB.cafe.serviceSchedule.some(d => !d.active) ? `
    <div class="card mt-4" style="border-color:rgba(243,156,18,.2)">
      <div class="flex items-start gap-3">
        <i class="fas fa-info-circle mt-0.5" style="color:var(--warning)"></i>
        <div>
          <p class="text-sm font-semibold mb-1" style="color:var(--warning)">Jadwal Tidak Penuh</p>
          <p class="text-xs" style="color:var(--muted)">Layanan akan otomatis tutup pada hari ${DB.cafe.serviceSchedule.filter(d => !d.active).map(d => d.name).join(', ')}.</p>
        </div>
      </div>
    </div>` : ''}
  </div>`;
}

function toggleServiceStatus() {
  if (!DB.cafe) DB.cafe = {};
  DB.cafe.serviceStatus = DB.cafe.serviceStatus === 'open' ? 'closed' : 'open';
  const label = DB.cafe.serviceStatus === 'open' ? 'Layanan dibuka' : 'Layanan ditutup';
  showToast(label, DB.cafe.serviceStatus === 'open' ? 'success' : 'warning');
  render();
}

function scheduleDayToggle(day, checked) {
  if (!DB.cafe?.serviceSchedule) return;
  DB.cafe.serviceSchedule[day].active = checked;
}

function saveServiceSchedule() {
  if (!DB.cafe) DB.cafe = {};
  showToast('Jadwal layanan tersimpan!', 'success');
  render();
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
