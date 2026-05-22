// ============================================================
// SHARED VIEWS — used by both admin.js and manager.js
// ============================================================

// ------------------------------------------------------------------
// FINANCE REPORT
// ------------------------------------------------------------------
function renderFinanceReport() {
  const totalRev = DB.dailySales.reduce((s, d) => s + d.revenue, 0);
  const totalExp = (DB.expenses || []).reduce((s, e) => s + e.amount, 0);
  const netProfit = totalRev - totalExp;
  const today = DB.dailySales[DB.dailySales.length - 1];

  const prodCount = {};
  DB.orders.filter(o => o.payment_status === 'paid').forEach(o => {
    (o.items || []).forEach(item => {
      const mi = DB.menuItems.find(m => m.id === item.menu_item_id);
      if (mi) prodCount[mi.name] = (prodCount[mi.name] || 0) + item.quantity;
    });
  });
  const topProducts = Object.entries(prodCount).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Laporan Keuangan</h2>
    <div class="grid grid-cols-2 md:grid-cols-5 gap-3 mb-5">
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Hari Ini</div><div class="text-lg font-bold mt-1" style="color:var(--accent)">${formatCurrency(today.revenue)}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">7 Hari</div><div class="text-lg font-bold mt-1" style="color:var(--accent)">${formatCurrency(totalRev)}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Rata-rata/Hari</div><div class="text-lg font-bold mt-1">${formatCurrency(Math.round(totalRev / 7))}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Laba Bersih</div><div class="text-lg font-bold mt-1" style="color:${netProfit >= 0 ? 'var(--success)' : 'var(--danger)'}">${formatCurrency(netProfit)}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Transaksi Hari Ini</div><div class="text-lg font-bold mt-1">${today.orders}</div></div>
    </div>
    <div class="grid md:grid-cols-2 gap-4 mb-4">
      <div class="card"><canvas id="chart-finance-detail" height="200"></canvas></div>
      <div class="card">
        <h3 class="font-semibold text-sm mb-3">Biaya Operasional per Kategori</h3>
        <canvas id="chart-expense-category" height="180"></canvas>
      </div>
    </div>
    <div class="card mb-4"><canvas id="chart-cashflow" height="180"></canvas></div>
    <div class="grid md:grid-cols-2 gap-4 mb-4">
      <div class="card">
        <h3 class="font-semibold text-sm mb-3">Produk Terlaris</h3>
        ${topProducts.length ? `
        <div class="space-y-2">
          ${topProducts.map(([name, qty], i) => `
          <div class="flex items-center gap-3 text-sm">
            <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style="background:${i === 0 ? 'var(--accent)' : 'var(--bg2)'};color:${i === 0 ? '#fff' : 'var(--muted)'}">${i + 1}</span>
            <span class="flex-1 truncate">${name}</span>
            <span class="font-semibold" style="color:var(--accent)">${qty} terjual</span>
          </div>`).join('')}
        </div>` : '<div class="text-sm py-4 text-center" style="color:var(--muted)">Belum ada data</div>'}
      </div>
      <div class="card">
        <h3 class="font-semibold text-sm mb-3">Rincian Transaksi Hari Ini</h3>
        <div class="space-y-2 max-h-64 overflow-y-auto">
          ${DB.orders.filter(o => o.payment_status === 'paid').slice(0, 8).map(o => `
          <div class="flex justify-between items-center text-sm py-2 border-b" style="border-color:var(--border)">
            <div><span class="font-medium">#${o.id.slice(-5).toUpperCase()}</span><span class="text-xs ml-2" style="color:var(--muted)">${getOrderTypeName(o.order_type)}</span></div>
            <span style="color:var(--success)">${formatCurrency(o.total_amount)}</span>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>`;
}

// ------------------------------------------------------------------
// STOCK MANAGEMENT
// ------------------------------------------------------------------
function renderStockManagement() {
  if (!State.stockSearch) State.stockSearch = '';
  const filterMenuId = State.stockMenuFilter || '';
  const menuOpts = DB.menuItems.filter(m => DB.menuStockMapping && DB.menuStockMapping[m.id]).map(m =>
    `<option value="${m.id}" ${filterMenuId === m.id ? 'selected' : ''}>${m.name}</option>`
  ).join('');
  const byMenu = filterMenuId && DB.menuStockMapping && DB.menuStockMapping[filterMenuId]
    ? DB.stockItems.filter(s => DB.menuStockMapping[filterMenuId].some(r => (typeof r === 'string' ? r : r.id) === s.id))
    : DB.stockItems;
  const bySearch = byMenu.filter(s => !State.stockSearch || s.name.toLowerCase().includes(State.stockSearch.toLowerCase()));
  const sorted = [...bySearch].sort((a, b) => {
    const aPct = a.min_quantity > 0 ? a.current_quantity / a.min_quantity : a.current_quantity;
    const bPct = b.min_quantity > 0 ? b.current_quantity / b.min_quantity : b.current_quantity;
    return aPct - bPct;
  });
  return `
  <div class="animate-fade-up">
    <div class="flex justify-between items-center mb-4">
      <h2 class="font-display text-xl font-bold">Stok Bahan Baku</h2>
      <button onclick="showAddStockModal()" class="btn-primary btn-sm"><i class="fas fa-plus mr-1"></i>Tambah</button>
    </div>
    <div class="card mb-4" style="padding:10px">
      <div class="flex gap-2 mb-2">
        <input type="text" class="input-field text-sm flex-1" placeholder="Cari bahan..." value="${State.stockSearch}" oninput="State.stockSearch=this.value;render()">
        <select onchange="State.stockMenuFilter=this.value;render()" class="input-field text-sm" style="width:auto">
          <option value="">Semua Menu</option>
          ${menuOpts}
        </select>
      </div>
    </div>
    <div class="space-y-3">
      ${sorted.map(s => {
        const pct = Math.min(100, Math.round(s.current_quantity / (s.min_quantity * 3) * 100));
        const isLow = s.current_quantity <= s.min_quantity;
        const usedIn = DB.menuItems.filter(m => DB.menuStockMapping && DB.menuStockMapping[m.id] && DB.menuStockMapping[m.id].some(r => (typeof r === 'string' ? r : r.id) === s.id));
        return `
        <div class="card ${isLow ? 'animate-breathe' : ''}">
          <div class="flex justify-between items-center mb-2">
            <div class="font-semibold text-sm">${s.name} ${isLow ? '<span style="color:var(--danger);font-size:11px"><i class="fas fa-exclamation-triangle"></i> Rendah</span>' : ''}</div>
            <div class="flex items-center gap-2">
              <div class="text-sm font-bold" style="color:${isLow ? 'var(--danger)' : 'var(--accent)'}">${s.current_quantity} ${s.unit}</div>
              <button onclick="showEditStockModal('${s.id}')" class="btn-sm" style="background:rgba(224,122,58,.12);color:var(--accent);border:none;padding:4px 7px;border-radius:6px;cursor:pointer;font-size:11px"><i class="fas fa-pen"></i></button>
              <button onclick="deleteStockItem('${s.id}')" class="btn-sm" style="background:rgba(231,76,60,.12);color:var(--danger);border:none;padding:4px 7px;border-radius:6px;cursor:pointer;font-size:11px"><i class="fas fa-trash"></i></button>
            </div>
          </div>
          <div class="stock-bar"><div class="stock-bar-fill" style="width:${pct}%;background:${isLow ? 'var(--danger)' : 'var(--accent)'}"></div></div>
          <div class="flex justify-between mt-2">
            <span class="text-xs" style="color:var(--muted)">Minimum: ${s.min_quantity} ${s.unit}</span>
            <div class="flex gap-1">
              <button onclick="adjustStock('${s.id}','in')" class="btn-sm" style="background:rgba(39,174,96,.15);color:var(--success);border:none;padding:4px 10px;border-radius:6px;cursor:pointer;font-size:11px"><i class="fas fa-plus"></i></button>
              <button onclick="adjustStock('${s.id}','out')" class="btn-sm" style="background:rgba(231,76,60,.15);color:var(--danger);border:none;padding:4px 10px;border-radius:6px;cursor:pointer;font-size:11px"><i class="fas fa-minus"></i></button>
            </div>
          </div>
          ${usedIn.length ? `<div class="flex flex-wrap gap-1 mt-2 pt-2 border-t" style="border-color:var(--border)">${usedIn.map(m => `<span class="text-[10px] px-2 py-0.5 rounded" style="background:rgba(224,122,58,.12);color:var(--accent)"><i class="fas fa-utensils mr-0.5"></i>${m.name}</span>`).join('')}</div>` : ''}
        </div>`;
      }).join('')}
      ${sorted.length === 0 ? '<div class="text-center py-6 text-sm" style="color:var(--muted)">Tidak ada bahan baku ditemukan</div>' : ''}
    </div>
  </div>`;
}

function showEditStockModal(id) {
  const s = DB.stockItems.find(x => x.id === id);
  if (!s) return;
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Edit Bahan Baku</h3>
      <div class="space-y-3">
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Nama</label><input id="edit-stock-name" class="input-field text-sm" value="${s.name}"></div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Jumlah</label><input id="edit-stock-qty" type="number" class="input-field text-sm" value="${s.current_quantity}"></div>
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Satuan</label><input id="edit-stock-unit" class="input-field text-sm" value="${s.unit}"></div>
        </div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Batas Minimum</label><input id="edit-stock-min" type="number" class="input-field text-sm" value="${s.min_quantity}"></div>
      </div>
      <button onclick="saveEditStock('${s.id}')" class="btn-primary w-full mt-4 text-center">Simpan</button>
    </div>
  `);
}

function saveEditStock(id) {
  const s = DB.stockItems.find(x => x.id === id);
  if (!s) return;
  const name = document.getElementById('edit-stock-name')?.value;
  if (!name) { showToast('Nama bahan wajib diisi', 'warning'); return; }
  s.name = name;
  s.current_quantity = parseInt(document.getElementById('edit-stock-qty')?.value || '0');
  s.unit = document.getElementById('edit-stock-unit')?.value || 'kg';
  s.min_quantity = parseInt(document.getElementById('edit-stock-min')?.value || '3');
  s.updated_at = new Date().toISOString();
  closeModal(); showToast('Bahan baku diperbarui', 'success'); render();
}

function deleteStockItem(id) {
  const s = DB.stockItems.find(x => x.id === id);
  if (!s) return;
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Konfirmasi Hapus</h3>
      <p class="text-sm mb-4">Hapus bahan "${s.name}"? Tindakan ini tidak dapat dibatalkan.</p>
      <div class="flex gap-2">
        <button onclick="closeModal()" class="btn-sm flex-1 text-center" style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:10px;cursor:pointer">Batal</button>
        <button onclick="confirmDeleteStockItem('${id}')" class="btn-sm flex-1 text-center" style="background:rgba(231,76,60,.15);color:var(--danger);border:1px solid rgba(231,76,60,.3);border-radius:10px;padding:10px;cursor:pointer"><i class="fas fa-trash mr-1"></i>Hapus</button>
      </div>
    </div>
  `);
}

function confirmDeleteStockItem(id) {
  DB.stockItems = DB.stockItems.filter(x => x.id !== id);
  closeModal(); showToast('Bahan baku dihapus', 'info'); render();
}

function adjustStock(id, type) {
  const s = DB.stockItems.find(x => x.id === id);
  if (!s) return;
  const qty = type === 'in' ? 5 : 2;
  s.current_quantity = type === 'in' ? s.current_quantity + qty : Math.max(0, s.current_quantity - qty);
  DB.stockMovements.push({ id: 'sm' + Date.now(), stock_item_id: id, user_id: State.currentUser.id, type, quantity: qty, notes: type === 'in' ? 'Restok' : 'Pemakaian', created_at: new Date().toISOString() });
  if (s.current_quantity <= s.min_quantity) notifyLowStock(s);
  autoUpdateMenuAvailability();
  showToast(`${s.name}: ${type === 'in' ? '+' + qty : '-' + qty} ${s.unit}`, 'success');
  render();
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
  if (!name) { showToast('Nama bahan wajib diisi', 'warning'); return; }
  DB.stockItems.push({ id: 's' + Date.now(), name, unit: document.getElementById('new-stock-unit')?.value || 'kg', current_quantity: parseInt(document.getElementById('new-stock-qty')?.value || '10'), min_quantity: parseInt(document.getElementById('new-stock-min')?.value || '3'), updated_at: new Date().toISOString() });
  closeModal(); showToast('Bahan baku ditambahkan', 'success'); render();
}

// ------------------------------------------------------------------
// ATTENDANCE
// ------------------------------------------------------------------
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
        <div class="card flex items-center gap-4 cursor-pointer hover:scale-[1.01] transition-transform" onclick="showAttendanceReport('${s.id}')">
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

function showAttendanceReport(id) {
  const u = DB.users.find(x => x.id === id);
  if (!u) return;
  const today = new Date().toISOString().split('T')[0];
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
  const dailyRecords = DB.attendances.filter(a => a.user_id === id && a.check_in.startsWith(today));
  const monthlyRecords = DB.attendances.filter(a => a.user_id === id && a.check_in >= monthStart);
  const dailyTotalMin = dailyRecords.reduce((sum, r) => {
    if (r.check_out) return sum + Math.round((new Date(r.check_out) - new Date(r.check_in)) / 60000);
    return sum + Math.round((Date.now() - new Date(r.check_in)) / 60000);
  }, 0);
  const monthlyTotalMin = monthlyRecords.reduce((sum, r) => {
    if (r.check_out) return sum + Math.round((new Date(r.check_out) - new Date(r.check_in)) / 60000);
    return sum + Math.round((Date.now() - new Date(r.check_in)) / 60000);
  }, 0);
  const dailyH = Math.floor(dailyTotalMin / 60), dailyM = dailyTotalMin % 60;
  const monthlyH = Math.floor(monthlyTotalMin / 60), monthlyM = monthlyTotalMin % 60;
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">${u.avatar} ${u.name}</h3>
      <p class="text-xs mb-4" style="color:var(--muted)">${getRoleLabel(u.role)}</p>
      <div class="grid grid-cols-2 gap-3 mb-4">
        <div class="stat-card text-center">
          <div class="text-xs" style="color:var(--muted)">Presensi Hari Ini</div>
          <div class="text-lg font-bold mt-1" style="color:var(--accent)">${dailyRecords.length}</div>
          <div class="text-xs mt-1" style="color:var(--muted)">${dailyH}j ${dailyM}m</div>
        </div>
        <div class="stat-card text-center">
          <div class="text-xs" style="color:var(--muted)">Presensi Bulan Ini</div>
          <div class="text-lg font-bold mt-1" style="color:var(--accent)">${monthlyRecords.length}</div>
          <div class="text-xs mt-1" style="color:var(--muted)">${monthlyH}j ${monthlyM}m</div>
        </div>
      </div>
      <h4 class="font-semibold text-sm mb-2">Riwayat Harian</h4>
      <div class="space-y-1 max-h-48 overflow-y-auto">
        ${monthlyRecords.slice(-10).reverse().map(r => {
          const min = r.check_out ? Math.round((new Date(r.check_out) - new Date(r.check_in)) / 60000) : Math.round((Date.now() - new Date(r.check_in)) / 60000);
          const h = Math.floor(min / 60), m = min % 60;
          return `
        <div class="flex justify-between items-center text-xs py-1 border-b" style="border-color:var(--border)">
          <span>${formatDate(r.check_in)}</span>
          <span style="color:var(--muted)">${formatTime(r.check_in)} - ${r.check_out ? formatTime(r.check_out) : '...'}</span>
          <span style="color:var(--accent)">${h}j ${m}m</span>
        </div>`;
        }).join('')}
        ${monthlyRecords.length === 0 ? '<div class="text-xs py-4 text-center" style="color:var(--muted)">Belum ada data presensi bulan ini</div>' : ''}
      </div>
    </div>
  `);
}

// ------------------------------------------------------------------
// TABLE DETAIL MODAL (manager version with stats)
// ------------------------------------------------------------------
function showTableDetail(id) {
  const t = DB.tables.find(x => x.id === id);
  if (!t) return;
  const orders = DB.orders.filter(o => o.table_id === id && !['completed', 'cancelled'].includes(o.status));
  const totalOrders = DB.orders.filter(o => o.table_id === id);
  const todayRevenue = totalOrders.filter(o => o.payment_status === 'paid').reduce((s, o) => s + o.total_amount, 0);
  showModal(`
    <div>
      <div class="flex items-center gap-3 mb-4">
        <div class="w-12 h-12 rounded-full flex items-center justify-center text-xl" style="background:${t.status === 'available' ? 'rgba(39,174,96,.15)' : 'rgba(231,76,60,.15)'}">
          <i class="fas fa-chair" style="color:${t.status === 'available' ? 'var(--success)' : 'var(--danger)'}"></i>
        </div>
        <div>
          <h3 class="font-display text-lg font-bold">Meja ${t.number}</h3>
          <span class="badge ${t.status === 'available' ? 'badge-ready' : 'badge-cooking'}">${t.status === 'available' ? 'Tersedia' : 'Terisi'}</span>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-3 mb-4">
        <div class="stat-card text-center">
          <div class="text-xs" style="color:var(--muted)">Total Pesanan</div>
          <div class="text-lg font-bold mt-1" style="color:var(--accent)">${totalOrders.length}</div>
        </div>
        <div class="stat-card text-center">
          <div class="text-xs" style="color:var(--muted)">Pendapatan</div>
          <div class="text-lg font-bold mt-1" style="color:var(--success)">${formatCurrency(todayRevenue)}</div>
        </div>
      </div>
      ${orders.length ? `
      <h4 class="font-semibold text-sm mb-2">Pesanan Aktif</h4>
      <div class="space-y-1 max-h-40 overflow-y-auto">
        ${orders.map(o => `
        <div class="flex justify-between items-center text-xs py-1.5 border-b" style="border-color:var(--border)">
          <span class="font-medium">#${o.id.slice(-5).toUpperCase()}</span>
          <span class="badge ${getStatusBadge(o.status)}">${getStatusLabel(o.status)}</span>
          <span style="color:var(--accent)">${formatCurrency(o.total_amount)}</span>
        </div>`).join('')}
      </div>` : '<div class="text-sm py-3 text-center" style="color:var(--muted)">Meja kosong</div>'}
    </div>
  `);
}

// ------------------------------------------------------------------
// MENU MANAGEMENT
// ------------------------------------------------------------------
function renderAdminMenuMgmt() {
  autoUpdateMenuAvailability();
  if (!State.adminMenuFilter) State.adminMenuFilter = '';
  const cats = [...new Set(DB.menuItems.map(m => m.category).filter(Boolean))];
  const labelMap = { coffee: 'Kopi', 'non-coffee': 'Non-Kopi', food: 'Makanan', snack: 'Snack' };
  const filtered = DB.menuItems.filter(m => !State.adminMenuFilter || m.category === State.adminMenuFilter);
  return `
  <div class="animate-fade-up">
    <div class="flex justify-between items-center mb-4">
      <h2 class="font-display text-xl font-bold">Kelola Menu</h2>
      <button onclick="showAddMenuItemModal()" class="btn-primary btn-sm"><i class="fas fa-plus mr-1"></i>Tambah</button>
    </div>
    <div class="mb-4">
      <select id="admin-menu-filter" class="input-field text-sm" onchange="State.adminMenuFilter=this.value;render()">
        <option value="">Semua Kategori</option>
        ${cats.map(c => `<option value="${c}" ${State.adminMenuFilter === c ? 'selected' : ''}>${labelMap[c] || c}</option>`).join('')}
      </select>
    </div>
    <div class="space-y-3">
      ${filtered.map(m => `
      <div class="card flex items-center gap-4 cursor-pointer hover:scale-[1.01] transition-transform" onclick="showEditMenuItemModal('${m.id}')">
        <img src="${m.image}" class="w-14 h-14 rounded-xl object-cover" onerror="this.src='https://picsum.photos/seed/${m.id}/100/100'">
        <div class="flex-1 min-w-0">
          <div class="font-semibold text-sm truncate">${m.name}</div>
          <div class="text-xs" style="color:var(--muted)">${m.category} — ${formatCurrency(m.price)}</div>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="event.stopPropagation(); toggleMenuAvail('${m.id}')" class="text-xs px-3 py-1 rounded-lg" style="background:${m.is_available ? 'rgba(39,174,96,.15)' : 'rgba(231,76,60,.15)'};color:${m.is_available ? 'var(--success)' : 'var(--danger)'}">${m.is_available ? 'Tersedia' : 'Tidak Tersedia'}</button>
        </div>
      </div>`).join('')}
      ${filtered.length === 0 ? '<div class="text-center py-6 text-sm" style="color:var(--muted)">Tidak ada menu di kategori ini</div>' : ''}
    </div>
  </div>`;
}

function autoUpdateMenuAvailability() {
  if (!DB.menuStockMapping) return;
  let changed = [];
  DB.menuItems.forEach(m => {
    const deps = DB.menuStockMapping[m.id];
    if (!deps || deps.length === 0) return;
    const insufficient = deps.some(r => {
      const sid = typeof r === 'string' ? r : r.id;
      const needQty = typeof r === 'string' ? 1 : (r.qty || 1);
      const s = DB.stockItems.find(x => x.id === sid);
      return !s || s.current_quantity < needQty;
    });
    const newAvail = !insufficient;
    if (m.is_available !== newAvail) {
      m.is_available = newAvail;
      changed.push(m.name + ': ' + (newAvail ? 'Tersedia' : 'Tidak Tersedia'));
      if (!newAvail) {
        addNotification({
          title: 'Menu Otomatis Tidak Tersedia',
          message: m.name + ' — bahan baku tidak mencukupi',
          type: 'warning',
          icon: 'fa-circle-exclamation',
          targetRoles: ['cashier', 'kitchen'],
        });
      }
    }
  });
  if (changed.length) showToast('Status menu diperbarui: ' + changed.join(', '), 'info');
}

function toggleMenuAvail(id) {
  const m = DB.menuItems.find(x => x.id === id);
  if (m) { m.is_available = !m.is_available; showToast(`${m.name}: ${m.is_available ? 'Tersedia' : 'Tidak Tersedia'}`, 'info'); render(); }
  if (m && !m.is_available) {
    addNotification({
      title: 'Menu Tidak Tersedia',
      message: m.name + ' — ditandai tidak tersedia',
      type: 'warning',
      icon: 'fa-circle-exclamation',
      targetRoles: ['cashier', 'kitchen'],
    });
  }
}

// ------------------------------------------------------------------
// IMAGE HELPERS
// ------------------------------------------------------------------
function renderImageInput(prefix, currentVal) {
  const hasImage = currentVal && currentVal !== 'https://picsum.photos/seed/';
  return `
    <div class="flex gap-2 mb-2">
      <button type="button" onclick="document.getElementById('${prefix}-img-mode').value='upload';document.getElementById('${prefix}-img-file').click()" class="btn-sm flex-1 text-center" style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:8px"><i class="fas fa-upload mr-1"></i>Upload</button>
      <button type="button" onclick="document.getElementById('${prefix}-img-mode').value='url';document.getElementById('${prefix}-img-url').style.display='block';this.style.background='rgba(224,122,58,.1)';this.style.borderColor='var(--accent)'" class="btn-sm flex-1 text-center" style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:8px"><i class="fas fa-link mr-1"></i>URL</button>
    </div>
    <input type="hidden" id="${prefix}-img-mode" value="${hasImage ? 'url' : 'upload'}">
    <input type="file" id="${prefix}-img-file" accept="image/*" style="display:none" onchange="previewImage(this,'${prefix}-img-preview')">
    <input type="text" id="${prefix}-img-url" class="input-field text-sm" placeholder="https://..." value="${currentVal || ''}" style="${hasImage ? '' : 'display:none'}">
    <div id="${prefix}-img-preview" class="mt-2 ${hasImage ? '' : 'hidden'}" style="${hasImage ? '' : 'display:none'}">${hasImage ? `<img src="${currentVal}" style="width:80px;height:80px;object-fit:cover;border-radius:10px">` : ''}</div>`;
}

function previewImage(input, previewId) {
  const file = input.files && input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const el = document.getElementById(previewId);
    if (el) { el.innerHTML = '<img src="' + e.target.result + '" style="width:80px;height:80px;object-fit:cover;border-radius:10px">'; el.style.display = 'block'; }
  };
  reader.readAsDataURL(file);
}

function getImageValue(prefix) {
  const mode = document.getElementById(prefix + '-img-mode')?.value;
  if (mode === 'upload') {
    const fileInput = document.getElementById(prefix + '-img-file');
    if (fileInput && fileInput.files && fileInput.files[0]) return '';
  }
  return document.getElementById(prefix + '-img-url')?.value || '';
}

// ------------------------------------------------------------------
// MENU ITEM CRUD
// ------------------------------------------------------------------
function showEditMenuItemModal(id) {
  const m = DB.menuItems.find(x => x.id === id);
  if (!m) return;
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Edit Menu</h3>
      <div class="space-y-3">
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Nama Item</label><input id="edit-menu-name" class="input-field text-sm" value="${m.name}"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Deskripsi</label><textarea id="edit-menu-desc" class="input-field text-sm min-h-[60px]">${m.description || ''}</textarea></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Gambar</label>
          ${renderImageInput('edit', m.image)}
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Harga</label><input id="edit-menu-price" type="number" class="input-field text-sm" value="${m.price}"></div>
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Kategori</label>
            ${getCategoryOptions(m.category, 'edit')}
          </div>
        </div>
      </div>
      <div class="flex gap-2 mt-4">
        <button onclick="deleteMenuItem('${m.id}')" class="btn-sm flex-1 text-center" style="background:rgba(231,76,60,.15);color:var(--danger);border:1px solid rgba(231,76,60,.3);border-radius:10px;padding:10px"><i class="fas fa-trash mr-1"></i>Hapus</button>
        <button onclick="saveEditMenuItem('${m.id}')" class="btn-primary flex-1 text-center">Simpan Perubahan</button>
      </div>
    </div>
  `);
}

function deleteMenuItem(id) {
  const m = DB.menuItems.find(x => x.id === id);
  if (!m) return;
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Konfirmasi Hapus</h3>
      <p class="text-sm mb-4">Hapus menu "${m.name}"? Tindakan ini tidak dapat dibatalkan.</p>
      <div class="flex gap-2">
        <button onclick="closeModal()" class="btn-sm flex-1 text-center" style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:10px;cursor:pointer">Batal</button>
        <button onclick="confirmDeleteMenuItem('${id}')" class="btn-sm flex-1 text-center" style="background:rgba(231,76,60,.15);color:var(--danger);border:1px solid rgba(231,76,60,.3);border-radius:10px;padding:10px;cursor:pointer"><i class="fas fa-trash mr-1"></i>Hapus</button>
      </div>
    </div>
  `);
}

function confirmDeleteMenuItem(id) {
  DB.menuItems = DB.menuItems.filter(x => x.id !== id);
  closeModal(); showToast('Menu dihapus', 'info'); render();
}

function saveEditMenuItem(id) {
  const m = DB.menuItems.find(x => x.id === id);
  if (!m) return;
  const name = document.getElementById('edit-menu-name')?.value;
  const price = parseInt(document.getElementById('edit-menu-price')?.value || '0');
  const mode = document.getElementById('edit-img-mode')?.value;
  let image = document.getElementById('edit-img-url')?.value;
  if (mode === 'upload') {
    const preview = document.getElementById('edit-img-preview');
    const img = preview && preview.querySelector('img');
    if (img) image = img.src;
  }
  let cat = document.getElementById('edit-menu-cat')?.value;
  if (cat === '__new__' || !cat) {
    cat = document.getElementById('edit-menu-cat-custom')?.value.trim() || m.category;
  }
  if (!name) { showToast('Nama menu wajib diisi', 'warning'); return; }
  m.name = name;
  m.price = price;
  if (image) m.image = image;
  if (cat) m.category = cat;
  m.description = document.getElementById('edit-menu-desc')?.value || '';
  closeModal(); showToast('Menu berhasil diperbarui', 'success'); render();
}

function getCategoryOptions(selected, prefix) {
  prefix = prefix || 'new';
  const cats = [...new Set(DB.menuItems.map(m => m.category).filter(Boolean))];
  if (!cats.includes('coffee')) cats.unshift('coffee');
  if (!cats.includes('non-coffee')) cats.unshift('non-coffee');
  if (!cats.includes('food')) cats.push('food');
  if (!cats.includes('snack')) cats.push('snack');
  const unique = [...new Set(cats)];
  const labelMap = { coffee: 'Kopi', 'non-coffee': 'Non-Kopi', food: 'Makanan', snack: 'Snack' };
  const opts = unique.map(c => `<option value="${c}" ${selected === c ? 'selected' : ''}>${labelMap[c] || c}</option>`).join('');
  return `<select id="${prefix}-menu-cat" class="input-field text-sm" onchange="if(this.value==='__new__'){document.getElementById('${prefix}-cat-container').style.display='block';this.style.display='none'}">${opts}<option value="__new__">+ Tambah Baru...</option></select>
    <div id="${prefix}-cat-container" style="display:none"><input id="${prefix}-menu-cat-custom" class="input-field text-sm mt-1" placeholder="Nama kategori baru..."></div>`;
}

function showAddMenuItemModal() {
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Tambah Menu</h3>
      <div class="space-y-3">
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Nama Item</label><input id="add-menu-name" class="input-field text-sm" placeholder="Nama menu"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Deskripsi</label><textarea id="add-menu-desc" class="input-field text-sm min-h-[60px]" placeholder="Deskripsi menu"></textarea></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Gambar</label>
          ${renderImageInput('add', '')}
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Harga</label><input id="add-menu-price" type="number" class="input-field text-sm" placeholder="0"></div>
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Kategori</label>
            ${getCategoryOptions('', 'add')}
          </div>
        </div>
      </div>
      <button onclick="addMenuItem()" class="btn-primary w-full mt-4 text-center">Tambah</button>
    </div>
  `);
}

function addMenuItem() {
  const name = document.getElementById('add-menu-name')?.value;
  const price = parseInt(document.getElementById('add-menu-price')?.value || '0');
  if (!name) { showToast('Nama menu wajib diisi', 'warning'); return; }
  const id = 'm' + Date.now();
  const mode = document.getElementById('add-img-mode')?.value;
  let image = document.getElementById('add-img-url')?.value;
  if (mode === 'upload') {
    const preview = document.getElementById('add-img-preview');
    const img = preview && preview.querySelector('img');
    if (img) image = img.src;
  }
  if (!image) image = `https://picsum.photos/seed/${Date.now()}/400/300`;
  let cat = document.getElementById('add-menu-cat')?.value;
  if (cat === '__new__' || !cat) {
    cat = document.getElementById('add-menu-cat-custom')?.value.trim() || 'coffee';
  }
  DB.menuItems.push({ id, name, description: document.getElementById('add-menu-desc')?.value || '', price, category: cat, image, is_available: true });
  closeModal(); showToast('Menu ditambahkan', 'success'); render();
}

// ------------------------------------------------------------------
// TABLE MANAGEMENT
// ------------------------------------------------------------------
function renderAdminTablesMgmt() {
  return `
  <div class="animate-fade-up">
    <div class="flex justify-between items-center mb-4">
      <h2 class="font-display text-xl font-bold">Kelola Meja</h2>
      <button onclick="addTable()" class="btn-primary btn-sm"><i class="fas fa-plus mr-1"></i>Tambah</button>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      ${DB.tables.map(t => `
      <div class="card text-center" style="position:relative">
        <button onclick="event.stopPropagation(); confirmDeleteTable('${t.id}')" class="btn-sm" style="position:absolute;top:6px;left:6px;background:rgba(231,76,60,.12);color:var(--danger);border:none;padding:4px 7px;border-radius:6px;cursor:pointer;font-size:11px;line-height:1"><i class="fas fa-trash"></i></button>
        <div class="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center text-2xl" style="background:${t.status === 'available' ? 'rgba(39,174,96,.1)' : 'rgba(231,76,60,.1)'}">
          <i class="fas fa-chair" style="color:${t.status === 'available' ? 'var(--success)' : 'var(--danger)'}"></i>
        </div>
        <div class="font-bold text-lg">Meja ${t.number}</div>
        <div class="text-xs mb-2" style="color:var(--muted)">QR: ${t.qr_code}</div>
        <span class="badge ${t.status === 'available' ? 'badge-ready' : 'badge-cooking'}">${t.status === 'available' ? 'Tersedia' : 'Terisi'}</span>
        <div class="mt-3">
          <button onclick="toggleTableStatus('${t.id}')" class="btn-secondary btn-sm w-full text-center">Toggle Status</button>
        </div>
      </div>`).join('')}
    </div>
  </div>`;
}

function addTable() {
  const num = (DB.tables.length + 1).toString();
  DB.tables.push({ id: 't' + Date.now(), number: num, qr_code: 'ARQA-T' + num, status: 'available' });
  showToast(`Meja ${num} ditambahkan`, 'success'); render();
}

function toggleTableStatus(id) {
  const t = DB.tables.find(x => x.id === id);
  if (t) { t.status = t.status === 'available' ? 'occupied' : 'available'; render(); }
}

function confirmDeleteTable(id) {
  const t = DB.tables.find(x => x.id === id);
  if (!t) return;
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Konfirmasi Hapus</h3>
      <p class="text-sm mb-4">Hapus Meja ${t.number}? Tindakan ini tidak dapat dibatalkan.</p>
      <div class="flex gap-2">
        <button onclick="closeModal()" class="btn-sm flex-1 text-center" style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:10px;cursor:pointer">Batal</button>
        <button onclick="confirmDeleteTableAction('${id}')" class="btn-sm flex-1 text-center" style="background:rgba(231,76,60,.15);color:var(--danger);border:1px solid rgba(231,76,60,.3);border-radius:10px;padding:10px;cursor:pointer"><i class="fas fa-trash mr-1"></i>Hapus</button>
      </div>
    </div>
  `);
}

function confirmDeleteTableAction(id) {
  DB.tables = DB.tables.filter(x => x.id !== id);
  closeModal(); showToast('Meja dihapus', 'info'); render();
}

function deleteTable(id) {
  const t = DB.tables.find(x => x.id === id);
  if (!t) return;
  DB.tables = DB.tables.filter(x => x.id !== id);
  showToast('Meja ' + t.number + ' dihapus', 'info'); render();
}

// ------------------------------------------------------------------
// PROMO MANAGEMENT
// ------------------------------------------------------------------
function renderAdminPromos() {
  return `
  <div class="animate-fade-up">
    <div class="flex justify-between items-center mb-4">
      <h2 class="font-display text-xl font-bold">Kelola Promo</h2>
      <button onclick="showAddPromoModal()" class="btn-primary btn-sm"><i class="fas fa-plus mr-1"></i>Tambah</button>
    </div>
    <div class="space-y-3">
      ${(DB.promos || []).map(p => {
        const now = new Date();
        const active = p.is_active && (!p.end_date || new Date(p.end_date) >= now);
        const discLabel = p.discount_type === 'fixed' ? formatCurrency(p.discount_value) : p.discount_value + '%';
        const menuNames = (p.menu_ids || []).map(id => { const m = DB.menuItems.find(x => x.id === id); return m ? m.name : ''; }).filter(Boolean).join(', ');
        return `
      <div class="card flex flex-col gap-3">
        <div class="flex items-start gap-4 cursor-pointer hover:scale-[1.01] transition-transform" onclick="showEditPromoModal('${p.id}')">
          <img src="${p.image || 'https://picsum.photos/seed/' + p.id + '/100/100'}" class="w-14 h-14 rounded-xl object-cover" onerror="this.src='https://picsum.photos/seed/${p.id}/100/100'">
          <div class="flex-1 min-w-0">
            <div class="font-bold text-sm">${p.title}</div>
            <div class="text-xs mb-1" style="color:var(--muted)">${p.desc}</div>
            <div class="text-[10px] font-mono" style="color:var(--accent)">${p.code}</div>
            <div class="text-[10px] mt-1" style="color:var(--muted)">Diskon ${discLabel}</div>
            ${p.start_date ? `<div class="text-[10px]" style="color:var(--muted)">${formatDate(p.start_date)} - ${p.end_date ? formatDate(p.end_date) : '...'}</div>` : ''}
            ${menuNames ? `<div class="text-[10px] mt-1" style="color:var(--accent)">Menu: ${menuNames}</div>` : '<div class="text-[10px] mt-1" style="color:var(--muted)">Semua menu</div>'}
          </div>
          <button onclick="event.stopPropagation(); togglePromoStatus('${p.id}')" class="text-xs px-3 py-1 rounded-lg" style="background:${active ? 'rgba(39,174,96,.15)' : 'rgba(231,76,60,.15)'};color:${active ? 'var(--success)' : 'var(--danger)'}">${active ? 'Aktif' : 'Nonaktif'}</button>
        </div>
      </div>`;
      }).join('')}
      ${!(DB.promos || []).length ? '<div class="text-center py-6 text-sm" style="color:var(--muted)">Belum ada promo</div>' : ''}
    </div>
  </div>`;
}

function togglePromoStatus(id) {
  const p = DB.promos.find(x => x.id === id);
  if (p) {
    p.is_active = !p.is_active;
    showToast(`Promo ${p.title} ${p.is_active ? 'diaktifkan' : 'dinonaktifkan'}`, 'info');
    render();
  }
}

function renderPromoMenuCheckboxes(prefix, selected) {
  selected = selected || [];
  return DB.menuItems.map(m => `
    <label class="flex items-center gap-2 text-sm py-1 cursor-pointer">
      <input type="checkbox" id="${prefix}-menu-${m.id}" value="${m.id}" ${selected.includes(m.id) ? 'checked' : ''} style="accent-color:var(--accent)">
      <img src="${m.image}" class="w-6 h-6 rounded object-cover" onerror="this.src='https://picsum.photos/seed/${m.id}/40/40'">
      <span class="flex-1">${m.name}</span>
      <span style="color:var(--muted);font-size:11px">${formatCurrency(m.price)}</span>
    </label>`).join('');
}

function getSelectedMenuIds(prefix) {
  return DB.menuItems.filter(m => document.getElementById(prefix + '-menu-' + m.id)?.checked).map(m => m.id);
}

function showAddPromoModal() {
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Tambah Promo</h3>
      <div class="space-y-3">
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Judul Promo</label><input id="new-promo-title" class="input-field text-sm" placeholder="Misal: Diskon 50%"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Kode Promo</label><input id="new-promo-code" class="input-field text-sm" placeholder="Misal: diskon50"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Deskripsi</label><input id="new-promo-desc" class="input-field text-sm" placeholder="Penjelasan singkat promo"></div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Tipe Diskon</label>
            <select id="new-promo-disc-type" class="input-field text-sm">
              <option value="percent">Persentase (%)</option>
              <option value="fixed">Nominal (Rp)</option>
            </select>
          </div>
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Nilai Diskon</label><input id="new-promo-disc-value" type="number" class="input-field text-sm" placeholder="50" min="0"></div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Tanggal Mulai</label><input id="new-promo-start" type="date" class="input-field text-sm"></div>
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Tanggal Berakhir</label><input id="new-promo-end" type="date" class="input-field text-sm"></div>
        </div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Gambar Promo</label>${renderImageInput('new-promo', '')}</div>
        <div>
          <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Pilih Menu yang Mendapat Diskon</label>
          <div class="max-h-40 overflow-y-auto space-y-1 p-2 rounded-xl" style="background:var(--bg2)">${renderPromoMenuCheckboxes('new-promo', [])}</div>
        </div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Syarat & Ketentuan (pisahkan dgn koma)</label><textarea id="new-promo-terms" class="input-field text-sm min-h-[60px]" placeholder="Berlaku hari Senin, Minimal order 50rb..."></textarea></div>
      </div>
      <button onclick="addPromo()" class="btn-primary w-full mt-4 text-center">Simpan Promo</button>
    </div>
  `);
}

function addPromo() {
  const title = document.getElementById('new-promo-title')?.value;
  const code = document.getElementById('new-promo-code')?.value;
  const desc = document.getElementById('new-promo-desc')?.value;
  const discount_type = document.getElementById('new-promo-disc-type')?.value || 'percent';
  const discount_value = parseInt(document.getElementById('new-promo-disc-value')?.value || '0');
  const start_date = document.getElementById('new-promo-start')?.value || '';
  const end_date = document.getElementById('new-promo-end')?.value || '';
  const termsStr = document.getElementById('new-promo-terms')?.value || '';
  if (!title || !code) { showToast('Judul dan kode promo wajib diisi', 'warning'); return; }
  if (!discount_value) { showToast('Nilai diskon wajib diisi', 'warning'); return; }
  const mode = document.getElementById('new-promo-img-mode')?.value;
  let image = document.getElementById('new-promo-img-url')?.value;
  if (mode === 'upload') {
    const preview = document.getElementById('new-promo-img-preview');
    const img = preview && preview.querySelector('img');
    if (img) image = img.src;
  }
  if (!image) image = `https://picsum.photos/seed/${Date.now()}/400/300`;
  if (!DB.promos) DB.promos = [];
  DB.promos.push({
    id: 'p' + Date.now(), code, title, desc, discount_type, discount_value,
    start_date, end_date, image,
    menu_ids: getSelectedMenuIds('new-promo'),
    terms: termsStr.split(',').map(t => t.trim()).filter(Boolean),
    is_active: true,
  });
  closeModal(); showToast('Promo berhasil ditambahkan', 'success'); render();
}

function showEditPromoModal(id) {
  const p = DB.promos.find(x => x.id === id);
  if (!p) return;
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Edit Promo</h3>
      <div class="space-y-3">
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Judul Promo</label><input id="edit-promo-title" class="input-field text-sm" value="${p.title.replace(/"/g, '&quot;')}"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Kode Promo</label><input id="edit-promo-code" class="input-field text-sm" value="${p.code}"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Deskripsi</label><input id="edit-promo-desc" class="input-field text-sm" value="${(p.desc||'').replace(/"/g, '&quot;')}"></div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Tipe Diskon</label>
            <select id="edit-promo-disc-type" class="input-field text-sm">
              <option value="percent" ${p.discount_type === 'percent' ? 'selected' : ''}>Persentase (%)</option>
              <option value="fixed" ${p.discount_type === 'fixed' ? 'selected' : ''}>Nominal (Rp)</option>
            </select>
          </div>
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Nilai Diskon</label><input id="edit-promo-disc-value" type="number" class="input-field text-sm" value="${p.discount_value || 0}" min="0"></div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Tanggal Mulai</label><input id="edit-promo-start" type="date" class="input-field text-sm" value="${p.start_date || ''}"></div>
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Tanggal Berakhir</label><input id="edit-promo-end" type="date" class="input-field text-sm" value="${p.end_date || ''}"></div>
        </div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Gambar Promo</label>${renderImageInput('edit-promo', p.image || '')}</div>
        <div>
          <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Pilih Menu yang Mendapat Diskon</label>
          <div class="max-h-40 overflow-y-auto space-y-1 p-2 rounded-xl" style="background:var(--bg2)">${renderPromoMenuCheckboxes('edit-promo', p.menu_ids || [])}</div>
        </div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Syarat & Ketentuan (pisahkan dgn koma)</label><textarea id="edit-promo-terms" class="input-field text-sm min-h-[60px]">${(p.terms||[]).join(', ')}</textarea></div>
      </div>
      <div class="flex gap-2 mt-4">
        <button onclick="deletePromo('${p.id}')" class="btn-sm flex-1 text-center" style="background:rgba(231,76,60,.15);color:var(--danger);border:1px solid rgba(231,76,60,.3);border-radius:10px;padding:10px"><i class="fas fa-trash mr-1"></i>Hapus</button>
        <button onclick="saveEditPromo('${p.id}')" class="btn-primary flex-1 text-center">Simpan</button>
      </div>
    </div>
  `);
}

function saveEditPromo(id) {
  const p = DB.promos.find(x => x.id === id);
  if (!p) return;
  const title = document.getElementById('edit-promo-title')?.value;
  const code = document.getElementById('edit-promo-code')?.value;
  const discount_value = parseInt(document.getElementById('edit-promo-disc-value')?.value || '0');
  if (!title || !code) { showToast('Judul dan kode promo wajib diisi', 'warning'); return; }
  if (!discount_value) { showToast('Nilai diskon wajib diisi', 'warning'); return; }
  p.title = title;
  p.code = code;
  p.desc = document.getElementById('edit-promo-desc')?.value;
  p.discount_type = document.getElementById('edit-promo-disc-type')?.value || 'percent';
  p.discount_value = discount_value;
  p.start_date = document.getElementById('edit-promo-start')?.value || '';
  p.end_date = document.getElementById('edit-promo-end')?.value || '';
  const mode = document.getElementById('edit-promo-img-mode')?.value;
  let image = document.getElementById('edit-promo-img-url')?.value;
  if (mode === 'upload') {
    const preview = document.getElementById('edit-promo-img-preview');
    const img = preview && preview.querySelector('img');
    if (img) image = img.src;
  }
  if (image) p.image = image;
  p.menu_ids = getSelectedMenuIds('edit-promo');
  const termsStr = document.getElementById('edit-promo-terms')?.value || '';
  p.terms = termsStr.split(',').map(t => t.trim()).filter(Boolean);
  closeModal(); showToast('Promo berhasil diperbarui', 'success'); render();
}

function deletePromo(id) {
  const p = DB.promos.find(x => x.id === id);
  if (!p) return;
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Konfirmasi Hapus</h3>
      <p class="text-sm mb-4">Hapus promo "${p.title}"? Tindakan ini tidak dapat dibatalkan.</p>
      <div class="flex gap-2">
        <button onclick="closeModal()" class="btn-sm flex-1 text-center" style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:10px;cursor:pointer">Batal</button>
        <button onclick="confirmDeletePromo('${id}')" class="btn-sm flex-1 text-center" style="background:rgba(231,76,60,.15);color:var(--danger);border:1px solid rgba(231,76,60,.3);border-radius:10px;padding:10px;cursor:pointer"><i class="fas fa-trash mr-1"></i>Hapus</button>
      </div>
    </div>
  `);
}

function confirmDeletePromo(id) {
  DB.promos = DB.promos.filter(x => x.id !== id);
  closeModal(); showToast('Promo dihapus', 'info'); render();
}
