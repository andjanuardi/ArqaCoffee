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
  if (tab === 'pg-stock') return renderPlaygroundPgStock();
  if (tab === 'expenses') return renderExpenseManagement();
  if (tab === 'active-orders') return renderActiveOrders();
  if (tab === 'active-playground') return renderActivePlaygroundTickets();
  if (tab === 'service-control') return renderServiceControl();
  if (tab === 'tarif-group') return renderPengaturanTarif();
  if (tab === 'courier-finance') return renderAdminCourierFinance();
  if (tab === 'mitra-finance') return renderAdminMitraFinance();
  if (tab === 'mitra-approval') return renderAdminMitraApproval();
  if (tab === 'attendance') return renderAttendance();
  if (tab === 'profile') return renderGenericProfile();
  return renderAdminOverview();
}

function renderAdminCourierFinance() {
  const courierId = State.adminCourierFilterId || "";
  const dateFilter = State.adminCourierDateFilter || new Date().toLocaleDateString('sv-SE');
  const couriers = DB.users.filter(u => u.role === 'courier');
  let done = DB.orders.filter(o => o.courier_id && (o.status === "completed" || o.status === "delivered"));
  if (courierId) done = done.filter(o => o.courier_id === courierId);
  if (dateFilter) {
    done = done.filter(o => o.created_at && new Date(o.created_at).toLocaleDateString('sv-SE') === dateFilter);
  }
  const totalSetor = done.filter(o => o.status === "delivered").reduce((s, o) => s + (o.total_amount || 0), 0);
  const totalOngkir = done.reduce((s, o) => s + (o.shipping_cost || 0), 0);
  const totalSemuaAmount = done.reduce((s, o) => s + (o.total_amount || 0), 0);
  const totalTransaksi = totalSemuaAmount + totalOngkir;
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
    <div class="mb-4">
      <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Tanggal</label>
      <input type="date" id="admin-courier-date-filter" class="input-field" style="max-width:260px" value="${dateFilter}" onchange="State.adminCourierDateFilter=this.value;render()">
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
  const mitraUsers = DB.users.filter(u => u.role === 'mitra_juru_masak');
  if (!State.adminMitraSelectedName) State.adminMitraSelectedName = mitraUsers[0]?.name || '';
  if (!State.adminMitraDateFilter) State.adminMitraDateFilter = new Date().toLocaleDateString('sv-SE');
  const selected = State.adminMitraSelectedName;
  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Laporan Mitra Juru Masak</h2>
    <div class="flex gap-2 mb-4">
      <div class="flex-[2]">
        <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Pilih Mitra</label>
        <select class="input-field w-full" onchange="State.adminMitraSelectedName=this.value;render()">
          ${mitraUsers.map(m => `<option value="${m.name}" ${m.name === selected ? 'selected' : ''}>${m.name}</option>`).join('')}
        </select>
      </div>
      <div class="flex-1">
        <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Tanggal</label>
        <input type="date" class="input-field w-full" value="${State.adminMitraDateFilter}" onchange="State.adminMitraDateFilter=this.value;render()">
      </div>
    </div>
    ${_renderMitraFinanceHTML(selected, {
      dateFilter: 'adminMitraDateFilter',
      showRevenue: 'adminShowMitraRevenueTable',
      showExpense: 'adminShowMitraExpenseTable',
      showProfit: 'adminShowMitraProfitTable',
    })}
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
            ${r.usaha && r.role === 'mitra_juru_masak' ? `<div class="text-xs mt-1" style="color:var(--accent)"><i class="fas fa-store mr-1"></i>${r.usaha}</div>` : ''}
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
            ${r.usaha && r.role === 'mitra_juru_masak' ? `<div class="text-xs mt-0.5" style="color:var(--accent)"><i class="fas fa-store mr-1"></i>${r.usaha}</div>` : ''}
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
            ${r.usaha && r.role === 'mitra_juru_masak' ? `<div class="text-xs mt-0.5" style="color:var(--accent)"><i class="fas fa-store mr-1"></i>${r.usaha}</div>` : ''}
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
  const pwd = '123456';
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
  const pgTotalRev = (DB.playgroundTickets || [])
    .filter(t => t.payment_status === "paid")
    .reduce((s, t) => s + (t.total_amount || 0), 0);
  const combinedRev = totalRev + pgTotalRev;
  const totalExp = (DB.expenses || []).reduce((s, e) => s + e.amount, 0);
  const activeOrders = DB.orders.filter(o => !['completed', 'cancelled'].includes(o.status)).length;
  const activePgTickets = (DB.playgroundTickets || []).filter(t => t.status === 'active').length;
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
      <div class="stat-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="State.currentTab.admin='finance';showPendapatanModal()"><div class="text-xs" style="color:var(--muted)">Total Pendapatan</div><div class="text-xs" style="color:var(--muted);font-size:10px">Cafe + Playground</div><div class="text-lg font-bold mt-1" style="color:var(--accent)">${formatCurrency(combinedRev)}</div></div>
      <div class="stat-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="State.showExpenseTable=true;State.currentTab.admin='finance';render()"><div class="text-xs" style="color:var(--muted)">Total Pengeluaran</div><div class="text-lg font-bold mt-1" style="color:var(--danger)">${formatCurrency(totalExp)}</div></div>
      <div class="stat-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="showActiveLayananModal()"><div class="text-xs" style="color:var(--muted)">Layanan Aktif</div><div class="text-lg font-bold mt-1" style="color:var(--warning)">${activeOrders + activePgTickets}</div></div>
      <div class="stat-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="State.currentTab.admin='attendance';render()"><div class="text-xs" style="color:var(--muted)">Pegawai Aktif</div><div class="text-lg font-bold mt-1" style="color:var(--success)">${pegawai}</div></div>
      <div class="stat-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="switchTab('menu-mgmt')"><div class="text-xs" style="color:var(--muted)">Total Menu</div><div class="text-lg font-bold mt-1">${DB.menuItems.length}</div></div>
      <div class="stat-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="switchTab('users')"><div class="text-xs" style="color:var(--muted)">Pengguna</div><div class="text-lg font-bold mt-1">${DB.users.length}</div></div>
    </div>
    ${(() => {
      const pendingMenus = DB.menuItems.filter(m => m.is_approved === false && m.submitted_by);
      if (!pendingMenus.length) return '';
      return `
    <div class="mb-4 p-3 rounded-xl flex items-center gap-2 text-xs cursor-pointer" style="background:rgba(243,156,18,.1);border:1px solid rgba(243,156,18,.2);color:var(--warning)" onclick="switchTab('menu-mgmt')">
      <i class="fas fa-clock"></i>
      <span class="font-semibold">${pendingMenus.length} menu menunggu persetujuan</span>
      <i class="fas fa-chevron-right ml-auto text-[10px]" style="color:var(--muted)"></i>
    </div>`})()}
    ${(() => {
      const lowStock = DB.stockItems.filter(s => s.current_quantity <= s.min_quantity);
      const lowPgStock = (DB.pgStockItems || []).filter(s => s.current_quantity <= s.min_quantity);
      const allLow = [
        ...lowStock.map(s => ({ ...s, source: 'Cafe' })),
        ...lowPgStock.map(s => ({ ...s, source: 'Playground' })),
      ];
      if (!allLow.length) return '';
      return `
    <div class="card mb-4" style="border-color:rgba(231,76,60,.3)">
      <h3 class="font-semibold text-sm mb-2" style="color:var(--danger)"><i class="fas fa-exclamation-triangle mr-1"></i>Peringatan Stok Rendah</h3>
      <div class="space-y-2">
        ${allLow.map(s => `<div class="flex justify-between text-sm"><span>${s.name} <span class="text-[10px] px-1.5 py-0.5 rounded" style="background:${s.source === 'Cafe' ? 'rgba(224,122,58,.15)' : 'rgba(142,68,173,.15)'};color:${s.source === 'Cafe' ? 'var(--accent)' : '#8e44ad'}">${s.source}</span></span><span style="color:var(--danger)">${s.current_quantity} / ${s.min_quantity} ${s.unit}</span></div>`).join('')}
      </div>
      <button onclick="showPilihStokModal()" class="text-xs font-bold mt-2 flex items-center gap-1" style="color:var(--accent)">Selengkapnya <i class="fas fa-arrow-right" style="font-size:10px"></i></button>
    </div>`})()}
    ${(() => {
      const now = Date.now();
      const overtimeTickets = (DB.playgroundTickets || [])
        .filter(t => t.status === 'active' && new Date(t.end_time).getTime() <= now);
      if (!overtimeTickets.length) return '';
      return `
    <div class="card mb-4" style="border-color:rgba(231,76,60,.3)">
      <h3 class="font-semibold text-sm mb-2" style="color:var(--danger)"><i class="fas fa-hourglass-end mr-1"></i>Peringatan Over Time</h3>
      <div class="space-y-3">
        ${overtimeTickets.map(t => {
          const start = new Date(t.start_time).getTime();
          const end = new Date(t.end_time).getTime();
          const total = end - start;
          const elapsed = Math.min(100, ((now - start) / total) * 100);
          const overdue = Math.round((now - end) / 60000);
          const h = Math.floor(overdue / 60), m = overdue % 60;
          return `
        <div>
          <div class="flex justify-between text-sm mb-1">
            <span>${t.customer_name} <span class="text-[10px] px-1.5 py-0.5 rounded" style="background:rgba(142,68,173,.15);color:#8e44ad">${(t.children || []).length} anak</span></span>
            <span style="color:var(--danger)">−${h}j ${m}m</span>
          </div>
          <div class="time-bar-bg" style="height:6px">
            <div class="time-bar-fill" style="width:${elapsed}%;background:var(--danger)"></div>
          </div>
          <div class="flex justify-between text-[10px] mt-0.5" style="color:var(--muted)">
            <span>${formatTime(new Date(t.start_time))}</span>
            <span>${formatTime(new Date(t.end_time))}</span>
          </div>
        </div>`;
        }).join('')}
      </div>
      <button onclick="State.currentTab.admin='active-playground';render()" class="text-xs font-bold mt-2 flex items-center gap-1" style="color:var(--accent)">Selengkapnya <i class="fas fa-arrow-right" style="font-size:10px"></i></button>
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
  if (DB.cafe.serviceStatus === 'force_open') return false;
  if (DB.cafe.specialDates) {
    const todayStr = new Date().toLocaleDateString('sv-SE');
    const special = DB.cafe.specialDates.find(s => s.date === todayStr);
    if (special) return special.closed;
  }
  if (DB.cafe.serviceSchedule) {
    const today = new Date().getDay();
    const idx = today === 0 ? 6 : today - 1;
    const day = DB.cafe.serviceSchedule[idx];
    if (day) {
      const now = new Date();
      const currentMin = now.getHours() * 60 + now.getMinutes();
      const openMin = parseInt(day.open?.split(':')[0] || 0) * 60 + parseInt(day.open?.split(':')[1] || 0);
      const closeMin = parseInt(day.close?.split(':')[0] || 0) * 60 + parseInt(day.close?.split(':')[1] || 0);
      if (currentMin < openMin || currentMin >= closeMin) return true;
    }
  }
  return false;
}

function isWithinScheduleHours() {
  if (!DB.cafe) DB.cafe = {};
  if (DB.cafe.specialDates) {
    const todayStr = new Date().toLocaleDateString('sv-SE');
    const special = DB.cafe.specialDates.find(s => s.date === todayStr);
    if (special) return !special.closed;
  }
  if (DB.cafe.serviceSchedule) {
    const today = new Date().getDay();
    const idx = today === 0 ? 6 : today - 1;
    const day = DB.cafe.serviceSchedule[idx];
    if (day) {
      const now = new Date();
      const cur = now.getHours() * 60 + now.getMinutes();
      const open = parseInt(day.open?.split(':')[0] || 0) * 60 + parseInt(day.open?.split(':')[1] || 0);
      const close = parseInt(day.close?.split(':')[0] || 0) * 60 + parseInt(day.close?.split(':')[1] || 0);
      return cur >= open && cur < close;
    }
  }
  return true;
}

function renderServiceControl() {
  if (!DB.cafe) DB.cafe = {};
  if (!DB.cafe.serviceStatus) DB.cafe.serviceStatus = 'open';
  if (!DB.cafe.serviceSchedule) {
    const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu', 'Minggu'];
    DB.cafe.serviceSchedule = days.map((name, i) => ({ day: i, name, open: '08:00', close: '22:00' }));
  }

  const inSchedule = isWithinScheduleHours();
  const isForceOpen = DB.cafe.serviceStatus === 'force_open';
  const isManualClosed = DB.cafe.serviceStatus === 'closed';
  const isEffOpen = isForceOpen || (!isManualClosed && inSchedule);

  let statusLabel, statusIcon, statusColor, statusBg, statusBorder, statusDesc, btnIcon, btnLabel;

  if (isForceOpen) {
    statusLabel = 'Buka di luar jam operasional';
    statusIcon = 'fa-store';
    statusColor = 'var(--warning)';
    statusBg = 'rgba(243,156,18,.12)';
    statusBorder = 'rgba(243,156,18,.3)';
    statusDesc = 'Layanan dipaksa buka di luar jam operasional';
    btnIcon = 'fa-store-slash';
    btnLabel = 'Tutup Manual';
  } else if (isEffOpen) {
    statusLabel = 'Buka di jam operasional';
    statusIcon = 'fa-store';
    statusColor = 'var(--success)';
    statusBg = 'rgba(39,174,96,.12)';
    statusBorder = 'rgba(39,174,96,.3)';
    statusDesc = 'Layanan beroperasi sesuai jadwal';
    btnIcon = 'fa-store-slash';
    btnLabel = 'Tutup Manual';
  } else if (isManualClosed) {
    statusLabel = 'Tutup di luar jam operasional';
    statusIcon = 'fa-store-slash';
    statusColor = 'var(--danger)';
    statusBg = 'rgba(231,76,60,.12)';
    statusBorder = 'rgba(231,76,60,.3)';
    statusDesc = 'Layanan ditutup manual';
    btnIcon = 'fa-store';
    btnLabel = 'Buka Manual';
  } else {
    statusLabel = 'Tutup di jam operasional';
    statusIcon = 'fa-store-slash';
    statusColor = 'var(--danger)';
    statusBg = 'rgba(231,76,60,.12)';
    statusBorder = 'rgba(231,76,60,.3)';
    statusDesc = 'Layanan otomatis tutup — di luar jam operasional';
    btnIcon = 'fa-store';
    btnLabel = 'Buka Paksa';
  }

  const now = new Date();
  const curMin = now.getHours() * 60 + now.getMinutes();
  const dayIdx = now.getDay() === 0 ? 6 : now.getDay() - 1;
  const todaySched = DB.cafe.serviceSchedule?.[dayIdx];
  let nextInfo = '';
  if (todaySched) {
    const openMin = parseInt(todaySched.open?.split(':')[0] || 0) * 60 + parseInt(todaySched.open?.split(':')[1] || 0);
    const closeMin = parseInt(todaySched.close?.split(':')[0] || 0) * 60 + parseInt(todaySched.close?.split(':')[1] || 0);
    if (isEffOpen && closeMin > curMin) {
      const diff = closeMin - curMin;
      nextInfo = `Tutup otomatis pukul ${todaySched.close} (${Math.floor(diff/60)}j ${diff%60}m lagi)`;
    } else if (!isEffOpen && openMin > curMin) {
      const diff = openMin - curMin;
      nextInfo = `Buka otomatis pukul ${todaySched.open} (${Math.floor(diff/60)}j ${diff%60}m lagi)`;
    }
  }

  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-1">Kontrol Buka Tutup Layanan</h2>
    <p class="text-sm mb-5" style="color:var(--muted)">Atur jadwal operasional ARQA Coffee</p>
    <div class="card mb-5 text-center py-8" style="border:2px solid ${statusBorder}">
      <div class="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-4xl" style="background:${statusBg};color:${statusColor}">
        <i class="fas ${statusIcon}"></i>
      </div>
      <div class="text-2xl font-bold mb-1" style="color:${statusColor}">${statusLabel}</div>
      <p class="text-sm mb-1" style="color:var(--muted)">${statusDesc}</p>
      ${nextInfo ? `<p class="text-xs font-medium mb-4" style="color:var(--accent)"><i class="fas fa-clock mr-1"></i>${nextInfo}</p>` : '<p class="mb-4"></p>'}
      <button onclick="toggleServiceStatus()" class="btn-sm font-semibold" style="background:${statusBg};color:${statusColor};border:1px solid ${statusBorder};padding:10px 24px;border-radius:12px;cursor:pointer">
        <i class="fas ${btnIcon} mr-1"></i>${btnLabel}
      </button>
    </div>
    <div class="card">
      <h3 class="font-semibold text-sm mb-1"><i class="fas fa-clock mr-1"></i>Jam Operasional</h3>
      <p class="text-xs mb-4" style="color:var(--muted)">Atur jam buka dan tutup otomatis setiap hari.</p>
      <div class="space-y-2 mb-4">
        ${DB.cafe.serviceSchedule.map(d => `
        <div class="flex items-center justify-between py-2 px-3 rounded-xl" style="background:var(--bg2)">
          <span class="text-sm font-medium">${d.name}</span>
          <div class="flex items-center gap-2">
            <input type="time" value="${d.open}" onchange="updateScheduleTime(${d.day},'open',this.value)" class="input-field text-xs" style="width:85px;padding:4px 8px">
            <span style="color:var(--muted)">—</span>
            <input type="time" value="${d.close}" onchange="updateScheduleTime(${d.day},'close',this.value)" class="input-field text-xs" style="width:85px;padding:4px 8px">
          </div>
        </div>`).join('')}
      </div>
      <button onclick="saveServiceSchedule()" class="btn-primary w-full text-center"><i class="fas fa-save mr-1"></i>Simpan Jadwal</button>
    </div>
    <div class="card mt-4">
      <h3 class="font-semibold text-sm mb-1"><i class="fas fa-calendar-exclamation mr-1"></i>Tanggal Spesial</h3>
      <p class="text-xs mb-4" style="color:var(--muted)">Atur pengecualian tanggal tertentu (libur nasional, acara khusus).</p>
      <div class="space-y-2 mb-4">
        ${(DB.cafe.specialDates || []).length === 0 ? '<p class="text-xs text-center py-4" style="color:var(--muted)">Belum ada tanggal spesial</p>' : (DB.cafe.specialDates || []).map(s => `
        <div class="flex items-center justify-between py-2 px-3 rounded-xl" style="background:var(--bg2)">
          <div class="flex items-center gap-3">
            <span style="color:${s.closed ? 'var(--danger)' : 'var(--success)'}"><i class="fas ${s.closed ? 'fa-times-circle' : 'fa-check-circle'}"></i></span>
            <div>
              <span class="text-sm font-medium">${s.date}</span>
              ${s.note ? `<p class="text-xs" style="color:var(--muted)">${s.note}</p>` : ''}
            </div>
          </div>
          <button onclick="removeSpecialDate('${s.id}')" class="btn-sm btn-danger"><i class="fas fa-trash"></i></button>
        </div>`).join('')}
      </div>
      <button onclick="addSpecialDate()" class="btn-primary w-full text-center"><i class="fas fa-plus mr-1"></i>Tambah Tanggal Spesial</button>
    </div>
  </div>`;
}

function toggleServiceStatus() {
  if (!DB.cafe) DB.cafe = {};
  if (DB.cafe.serviceStatus === 'force_open') {
    DB.cafe.serviceStatus = 'open';
    showToast('Layanan dikembalikan ke mode otomatis', 'info');
  } else if (DB.cafe.serviceStatus === 'closed') {
    DB.cafe.serviceStatus = 'open';
    showToast('Layanan dikembalikan ke mode otomatis', 'info');
  } else {
    const inSchedule = isWithinScheduleHours();
    if (inSchedule) {
      DB.cafe.serviceStatus = 'closed';
      showToast('Layanan ditutup', 'warning');
    } else {
      DB.cafe.serviceStatus = 'force_open';
      showToast('Layanan dipaksa buka', 'success');
    }
  }
  render();
}

function updateScheduleTime(day, field, value) {
  if (!DB.cafe?.serviceSchedule) return;
  DB.cafe.serviceSchedule[day][field] = value;
}

function saveServiceSchedule() {
  if (!DB.cafe) DB.cafe = {};
  showToast('Jadwal layanan tersimpan!', 'success');
  render();
}

function addSpecialDate() {
  showModal(`
    <h3 class="font-semibold text-sm mb-4"><i class="fas fa-calendar-alt mr-1"></i>Tambah Tanggal Spesial</h3>
    <div class="space-y-3">
      <div>
        <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Tanggal</label>
        <input type="date" id="special-date-input" class="input-field w-full">
      </div>
      <div>
        <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Status</label>
        <select id="special-date-status" class="input-field w-full">
          <option value="closed">Tutup</option>
          <option value="open">Buka Khusus</option>
        </select>
      </div>
      <div>
        <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Catatan (opsional)</label>
        <input type="text" id="special-date-note" class="input-field w-full" placeholder="Misal: Libur Nasional">
      </div>
      <button onclick="confirmSpecialDate()" class="btn-primary w-full text-center"><i class="fas fa-check mr-1"></i>Simpan</button>
    </div>
  `);
}

function confirmSpecialDate() {
  const date = document.getElementById('special-date-input')?.value;
  const closed = document.getElementById('special-date-status')?.value === 'closed';
  const note = document.getElementById('special-date-note')?.value || '';
  if (!date) { showToast('Pilih tanggal terlebih dahulu', 'error'); return; }
  if (!DB.cafe) DB.cafe = {};
  if (!DB.cafe.specialDates) DB.cafe.specialDates = [];
  if (DB.cafe.specialDates.some(s => s.date === date)) { showToast('Tanggal sudah ada', 'error'); return; }
  DB.cafe.specialDates.push({ id: 'sd' + Date.now(), date, closed, note });
  closeModal();
  showToast('Tanggal spesial ditambahkan', 'success');
  render();
}

function removeSpecialDate(id) {
  if (!DB.cafe?.specialDates) return;
  DB.cafe.specialDates = DB.cafe.specialDates.filter(s => s.id !== id);
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

function showPilihStokModal() {
  const role = State.currentUser?.role || 'admin';
  const tabPrefix = role;
  const cafeCount = DB.stockItems.filter(s => s.current_quantity <= s.min_quantity).length;
  const pgCount = (DB.pgStockItems || []).filter(s => s.current_quantity <= s.min_quantity).length;
  showModal(`
<div class="p-4">
  <h3 class="font-display text-lg font-bold mb-4 text-center">Pilih Stok</h3>
  <div class="flex gap-4">
    <div class="flex-1 stat-card cursor-pointer text-center p-4" onclick="closeModal();State.currentTab['${tabPrefix}']='stock';render()">
      <div class="text-3xl mb-2">☕</div>
      <div class="font-semibold">Stok Cafe</div>
      <div class="text-xs mt-1" style="color:var(--muted)">${cafeCount} item rendah</div>
    </div>
    <div class="flex-1 stat-card cursor-pointer text-center p-4" onclick="closeModal();State.currentTab['${tabPrefix}']='pg-stock';render()">
      <div class="text-3xl mb-2">🎠</div>
      <div class="font-semibold">Stok Playground</div>
      <div class="text-xs mt-1" style="color:var(--muted)">${pgCount} item rendah</div>
    </div>
  </div>
  <div class="mt-4 text-center">
    <button onclick="closeModal()" class="btn-secondary text-sm">Tutup</button>
  </div>
</div>
  `);
}

// ============================================================
// PENGATURAN TARIF
// ============================================================
function saveTarifKurir() {
  if (!DB.cafe) DB.cafe = {};
  if (!DB.cafe.rates) DB.cafe.rates = {};
  if (!DB.cafe.rates.courier) DB.cafe.rates.courier = { shipping: { rate_per_km: 3000, min: 5000, max: 50000 }, service_fee: { type: 'percent', value: 5 } };
  const min = parseInt(document.getElementById('tarif-kurir-min')?.value);
  const rate = parseInt(document.getElementById('tarif-kurir-rate')?.value);
  const feeType = document.getElementById('tarif-kurir-fee-type')?.value;
  const feeValue = parseInt(document.getElementById('tarif-kurir-fee-value')?.value);
  if (!min || !rate || min < 0 || rate < 0 || feeValue < 0) { showToast('Nilai tidak valid', 'warning'); return; }
  DB.cafe.rates.courier.shipping.min = min;
  DB.cafe.rates.courier.shipping.rate_per_km = rate;
  DB.cafe.rates.courier.service_fee.type = feeType;
  DB.cafe.rates.courier.service_fee.value = feeValue;
  // Also update legacy shipping for backward compat
  DB.cafe.shipping = DB.cafe.shipping || {};
  DB.cafe.shipping.min = min;
  DB.cafe.shipping.rate_per_km = rate;
  showToast('Tarif kurir diperbarui!', 'success');
  render();
}

function saveTarifMitra() {
  if (!DB.cafe) DB.cafe = {};
  if (!DB.cafe.rates) DB.cafe.rates = {};
  if (!DB.cafe.rates.mitra) DB.cafe.rates.mitra = { service_fee: { type: 'percent', value: 5 } };
  const feeType = document.getElementById('tarif-mitra-fee-type')?.value;
  const feeValue = parseInt(document.getElementById('tarif-mitra-fee-value')?.value);
  if (feeValue < 0) { showToast('Nilai tidak valid', 'warning'); return; }
  DB.cafe.rates.mitra.service_fee.type = feeType;
  DB.cafe.rates.mitra.service_fee.value = feeValue;
  showToast('Tarif mitra diperbarui!', 'success');
  render();
}

function saveTarifPelanggan() {
  if (!DB.cafe) DB.cafe = {};
  if (!DB.cafe.rates) DB.cafe.rates = {};
  if (!DB.cafe.rates.customer) DB.cafe.rates.customer = { service_fee: { type: 'fixed', value: 1000 } };
  const feeType = document.getElementById('tarif-pelanggan-fee-type')?.value;
  const feeValue = parseInt(document.getElementById('tarif-pelanggan-fee-value')?.value);
  if (feeValue < 0) { showToast('Nilai tidak valid', 'warning'); return; }
  DB.cafe.rates.customer.service_fee.type = feeType;
  DB.cafe.rates.customer.service_fee.value = feeValue;
  showToast('Tarif pelanggan diperbarui!', 'success');
  render();
}

function renderTarifKurir() {
  const cfg = DB.cafe?.rates?.courier || { shipping: { rate_per_km: 3000, min: 5000, max: 50000 }, service_fee: { type: 'percent', value: 5 } };
  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Tarif Kurir Per-Transaksi</h2>
    <div class="card mb-4">
      <div class="font-semibold text-sm mb-3" style="color:var(--accent)"><i class="fas fa-truck mr-1"></i>Ongkos Kirim</div>
      <div class="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Tarif Dasar (Min)</label>
          <input type="number" id="tarif-kurir-min" class="input-field text-sm" value="${cfg.shipping.min}" min="0" step="500">
        </div>
        <div>
          <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Tarif Per KM</label>
          <input type="number" id="tarif-kurir-rate" class="input-field text-sm" value="${cfg.shipping.rate_per_km}" min="0" step="500">
        </div>
      </div>
      <div class="text-xs p-2 rounded-lg mb-4" style="background:var(--bg2);color:var(--muted)">
        <i class="fas fa-info-circle mr-1"></i>
        Ongkir = Jarak (km) × Tarif Per KM. Minimal ${formatCurrency(cfg.shipping.min)}, maksimal ${formatCurrency(cfg.shipping.max)}.
      </div>
      <div class="font-semibold text-sm mb-3" style="color:var(--accent)"><i class="fas fa-percent mr-1"></i>Jasa Aplikasi</div>
      <div class="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Tipe</label>
          <select id="tarif-kurir-fee-type" class="input-field text-sm">
            <option value="percent" ${cfg.service_fee.type === 'percent' ? 'selected' : ''}>Persentase (%)</option>
            <option value="fixed" ${cfg.service_fee.type === 'fixed' ? 'selected' : ''}>Nominal Tetap (Rp)</option>
          </select>
        </div>
        <div>
          <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Nilai</label>
          <input type="number" id="tarif-kurir-fee-value" class="input-field text-sm" value="${cfg.service_fee.value}" min="0">
        </div>
      </div>
      <button onclick="saveTarifKurir()" class="btn-primary text-sm"><i class="fas fa-save mr-1"></i>Simpan</button>
    </div>
  </div>`;
}

function renderTarifMitra() {
  const cfg = DB.cafe?.rates?.mitra || { service_fee: { type: 'percent', value: 5 } };
  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Tarif Mitra Per-Transaksi</h2>
    <div class="card mb-4">
      <div class="font-semibold text-sm mb-3" style="color:var(--accent)"><i class="fas fa-percent mr-1"></i>Jasa Aplikasi</div>
      <div class="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Tipe</label>
          <select id="tarif-mitra-fee-type" class="input-field text-sm">
            <option value="percent" ${cfg.service_fee.type === 'percent' ? 'selected' : ''}>Persentase (%)</option>
            <option value="fixed" ${cfg.service_fee.type === 'fixed' ? 'selected' : ''}>Nominal Tetap (Rp)</option>
          </select>
        </div>
        <div>
          <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Nilai</label>
          <input type="number" id="tarif-mitra-fee-value" class="input-field text-sm" value="${cfg.service_fee.value}" min="0">
        </div>
      </div>
      <button onclick="saveTarifMitra()" class="btn-primary text-sm"><i class="fas fa-save mr-1"></i>Simpan</button>
    </div>
  </div>`;
}

function renderTarifPelanggan() {
  const cfg = DB.cafe?.rates?.customer || { service_fee: { type: 'fixed', value: 1000 } };
  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Tarif Pelanggan Per-Transaksi</h2>
    <div class="card mb-4">
      <div class="font-semibold text-sm mb-3" style="color:var(--accent)"><i class="fas fa-percent mr-1"></i>Jasa Aplikasi</div>
      <div class="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Tipe</label>
          <select id="tarif-pelanggan-fee-type" class="input-field text-sm">
            <option value="percent" ${cfg.service_fee.type === 'percent' ? 'selected' : ''}>Persentase (%)</option>
            <option value="fixed" ${cfg.service_fee.type === 'fixed' ? 'selected' : ''}>Nominal Tetap (Rp)</option>
          </select>
        </div>
        <div>
          <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Nilai</label>
          <input type="number" id="tarif-pelanggan-fee-value" class="input-field text-sm" value="${cfg.service_fee.value}" min="0">
        </div>
      </div>
      <button onclick="saveTarifPelanggan()" class="btn-primary text-sm"><i class="fas fa-save mr-1"></i>Simpan</button>
    </div>
  </div>`;
}

function renderPengaturanTarif() {
  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Pengaturan Tarif</h2>
    <div class="space-y-4">
      ${renderTarifKurir()}
      ${renderTarifMitra()}
      ${renderTarifPelanggan()}
    </div>
  </div>`;
}

function showActiveLayananModal(role = 'admin') {
  const orderCount = DB.orders.filter(o => !['completed', 'cancelled'].includes(o.status)).length;
  const ticketCount = (DB.playgroundTickets || []).filter(t => t.status === 'active').length;
  showModal(`
<div class="p-4">
  <h3 class="font-display text-lg font-bold mb-4 text-center">Pilih Layanan Aktif</h3>
  <div class="flex gap-4">
    <div class="flex-1 stat-card cursor-pointer text-center p-4" onclick="closeModal();State.currentTab.${role}='active-orders';render()">
      <div class="text-3xl mb-2">📋</div>
      <div class="font-semibold">Pesanan Aktif</div>
      <div class="text-xs mt-1" style="color:var(--muted)">${orderCount} pesanan</div>
    </div>
    <div class="flex-1 stat-card cursor-pointer text-center p-4" onclick="closeModal();State.currentTab.${role}='active-playground';render()">
      <div class="text-3xl mb-2">🎟️</div>
      <div class="font-semibold">Tiket Playground</div>
      <div class="text-xs mt-1" style="color:var(--muted)">${ticketCount} tiket aktif</div>
    </div>
  </div>
  <div class="mt-4 text-center">
    <button onclick="closeModal()" class="btn-secondary text-sm">Tutup</button>
  </div>
</div>
  `);
}
