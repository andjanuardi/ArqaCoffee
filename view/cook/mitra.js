// ============================================================
// MITRA JURU MASAK VIEW
// ============================================================
function renderMitraView() {
  const tab = State.currentTab.mitra_juru_masak || 'queue';
  if (tab === 'queue') return renderMitraQueue();
  if (tab === 'history') return renderMitraHistory();
  if (tab === 'menu-mgmt') return renderAdminMenuMgmt();
  if (tab === 'finance') return renderMitraFinance();
  if (tab === 'profile') return renderMitraProfile();
  return renderMitraQueue();
}

function renderMitraQueue() {
  const today = new Date().toISOString().split('T')[0];
  const hasCheckedIn = DB.attendances.some(
    a => a.user_id === State.currentUser.id
      && !a.check_out
      && new Date(a.check_in).toISOString().split('T')[0] === today
  );
  if (!hasCheckedIn) {
    return `
    <div class="animate-fade-up">
      <h2 class="font-display text-xl font-bold mb-4">Antrian Dapur</h2>
      <div class="card text-center py-6" style="border-color:rgba(231,76,60,.2)">
        <i class="fas fa-fire-burner text-3xl mb-2" style="color:var(--danger)"></i>
        <p class="text-sm font-semibold mb-1" style="color:var(--danger)">Belum Check-in Hari Ini</p>
        <p class="text-xs mb-3" style="color:var(--muted)">Lakukan check-in di profil sebelum melihat antrian</p>
        <button onclick="State.currentTab.mitra_juru_masak='profile';render()" class="btn-primary text-sm px-5 py-2" style="font-size:13px">
          <i class="fas fa-clock mr-1"></i>Check-in di Profil
        </button>
      </div>
    </div>`;
  }
  const mitraMenuIds = DB.menuItems
    .filter(m => m.submitted_by === State.currentUser.name)
    .map(m => m.id);
  return renderKitchenQueue(
    (i, mi, o) => mitraMenuIds.includes(mi.id),
    (i, mi, o) => {
      const subtotal = i.unit_price * i.quantity;
      const fee = calcMitraFee(subtotal);
      return fee > 0 ? `<div class="text-xs mb-1" style="color:var(--muted)"><i class="fas fa-hand-holding-dollar mr-1"></i>Jasa Aplikasi: <b style="color:var(--danger)">-${formatCurrency(fee)}</b></div>` : '';
    },
  );
}

function renderMitraHistory() {
  const mitraMenuIds = DB.menuItems
    .filter(m => m.submitted_by === State.currentUser.name)
    .map(m => m.id);
  let done = DB.orders.filter((o) => ["ready", "completed", "rejected"].includes(o.status));
  const dateFilter = State.mitraDateFilter || new Date().toISOString().split("T")[0];
  if (dateFilter) {
    const s = new Date(dateFilter);
    s.setHours(0, 0, 0, 0);
    const e = new Date(dateFilter);
    e.setHours(23, 59, 59, 999);
    done = done.filter((o) => new Date(o.created_at) >= s && new Date(o.created_at) <= e);
  }
  done = done.filter(o => o.items.some(i => mitraMenuIds.includes(i.menu_item_id)));
  done.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Riwayat Pesanan</h2>
    <div class="flex gap-2 mb-4">
      <div class="flex-1">
        <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Tanggal</label>
        <input type="date" id="mitra-date-filter" class="input-field w-full" value="${dateFilter}" onchange="State.mitraDateFilter=this.value;render()">
      </div>
    </div>
    <div class="space-y-2">
      ${done.length === 0 ? '<p class="text-center py-8 text-sm" style="color:var(--muted)">Belum ada riwayat</p>' : ''}
      ${done.map((o) => {
        const t = o.table_id ? getTable(o.table_id) : null;
        const itemsStr = (o.items || []).map(i => {
          const mi = getMenuItem(i.menu_item_id);
          return mi ? mi.name + ' x' + i.quantity : '';
        }).filter(Boolean).join(', ');
        const hItems = o.items.reduce((s, i) => s + (i.unit_price * i.quantity), 0);
        const hTax = calcItemTax(o.items);
        const hFee = calcMitraFee(hItems);
        const hTotal = Math.max(0, hItems - hTax - hFee);
        return `
      <div class="card cursor-pointer hover:scale-[1.02] transition-transform" onclick="showMitraOrderDetail('${o.id}')">
        <div class="flex justify-between items-start mb-1">
          <div class="flex items-center gap-2">
            <span class="font-semibold text-sm">#${o.id.slice(-5).toUpperCase()}</span>
            <span class="text-xs" style="color:var(--muted)">${getOrderTypeName(o.order_type)}</span>
          </div>
          <span class="badge ${o.status === 'rejected' ? 'badge-danger' : 'badge-completed'}">${o.status === 'rejected' ? 'Ditolak' : getStatusLabel(o.status)}</span>
        </div>
        <div class="text-xs mb-1" style="color:var(--muted)">
          ${o.customer_name ? '<i class="fas fa-user mr-1"></i>' + o.customer_name : '<i class="fas fa-chair mr-1"></i>Walk-in'}${t ? ' — Meja ' + t.number : ''}
        </div>
        <div class="text-xs truncate" style="color:var(--muted)">${itemsStr || '-'}</div>
        <div class="flex justify-between items-center mt-1">
          <span class="text-xs" style="color:var(--muted)"><i class="far fa-clock mr-1"></i>${formatDate(o.created_at)} ${formatTime(o.created_at)}</span>
          <span class="text-sm font-semibold" style="color:var(--accent)">${formatCurrency(hTotal)}</span>
        </div>
      </div>`;
      }).join('')}
    </div>
  </div>`;
}

function showMitraOrderDetail(id) {
  const o = DB.orders.find(x => x.id === id); if (!o) return;
  const t = o.table_id ? getTable(o.table_id) : null;
  const itemsSubtotal = o.items.reduce((s, i) => s + (i.unit_price * i.quantity), 0);
  const tax = calcItemTax(o.items);
  const biayaLayanan = calcMitraFee(itemsSubtotal);
  const pembayaranMitra = Math.max(0, itemsSubtotal - tax - biayaLayanan);
  showModal(`
<div>
  <div class="flex justify-between items-start mb-4">
    <h3 class="font-display text-lg font-bold">Pesanan #${o.id.slice(-5).toUpperCase()}</h3>
    <span class="badge ${o.status === 'rejected' ? 'badge-danger' : 'badge-completed'}">${o.status === 'rejected' ? 'Ditolak' : 'Selesai'}</span>
  </div>
  <div class="text-xs mb-4" style="color:var(--muted)">
    <i class="fas ${o.order_type === 'dine-in' ? 'fa-chair' : 'fa-motorcycle'} mr-1"></i>${getOrderTypeName(o.order_type)}
    ${t ? ' — Meja ' + t.number : ''}
    ${o.customer_name ? ' — ' + o.customer_name : ''}
    ${o.delivery_address ? '<br>' + o.delivery_address : ''}
  </div>
  ${o.reject_reason ? `<div class="card mb-4 text-sm" style="background:rgba(231,76,60,.08);border:1px solid rgba(231,76,60,.2)"><i class="fas fa-ban mr-1" style="color:var(--danger)"></i><strong>Alasan Tolak:</strong> ${o.reject_reason}</div>` : ''}
  <div class="space-y-2 mb-4">
    ${o.items.map(i => {
      const mi = getMenuItem(i.menu_item_id); return mi ? `
    <div class="flex justify-between text-sm">
      <div>
        <span>${mi.name} x${i.quantity} ${i.notes ? '<span style="color:var(--muted)">(' + i.notes + ')</span>' : ''}</span>
      </div>
      <span style="color:var(--muted)">${formatCurrency(i.unit_price * i.quantity)}</span>
    </div>` : '';
    }).join('')}
  </div>
  <div class="border-t pt-3" style="border-color:var(--border)">
    <div class="flex justify-between text-xs mb-1"><span style="color:var(--muted)">Subtotal Menu</span><span style="color:var(--muted)">${formatCurrency(itemsSubtotal)}</span></div>
    ${tax > 0 ? `<div class="flex justify-between text-xs mb-1"><span style="color:var(--muted)"><i class="fas fa-receipt mr-1"></i>Pajak</span><span style="color:var(--muted)">${formatCurrency(tax)}</span></div>` : ''}
    ${biayaLayanan > 0 ? `<div class="flex justify-between text-xs mb-1"><span style="color:var(--muted)"><i class="fas fa-hand-holding-dollar mr-1"></i>Biaya Layanan</span><span style="color:var(--muted)">${formatCurrency(biayaLayanan)}</span></div>` : ''}
    <div class="flex justify-between font-bold text-sm mt-2"><span>Total Pembayaran</span><span style="color:var(--accent)">${formatCurrency(pembayaranMitra)}</span></div>
    <div class="flex justify-between text-xs mt-1" style="color:var(--muted)"><span>Waktu</span><span>${formatTime(o.created_at)}</span></div>
  </div>
  <button onclick="closeModal()" class="btn-secondary w-full mt-4 text-center">Tutup</button>
</div>
`);
}

function renderMitraFinance() {
  const mitraName = State.currentUser.name;
  const claimItems = [];
  DB.orders.forEach(o => {
    if (!o.created_at) return;
    o.items.forEach(i => {
      if (i.claimed_by === mitraName) claimItems.push({ ...i, order: o });
    });
  });
  const dateFilter = State.mitraFinanceDateFilter || new Date().toISOString().split("T")[0];
  if (dateFilter) {
    const s = new Date(dateFilter);
    s.setHours(0, 0, 0, 0);
    const e = new Date(dateFilter);
    e.setHours(23, 59, 59, 999);
    const filtered = [];
    claimItems.forEach(ci => {
      const d = new Date(ci.order.created_at);
      if (d >= s && d <= e) filtered.push(ci);
    });
    claimItems.length = 0;
    claimItems.push(...filtered);
  }
  const orderTotals = {};
  claimItems
    .filter(ci => ci.order.payment_status === 'paid')
    .forEach(ci => {
      if (!orderTotals[ci.order.id]) {
        const items = ci.order.items;
        const sub = items.reduce((s, i) => s + (i.unit_price * i.quantity), 0);
        const tax = calcItemTax(items);
        const fee = calcMitraFee(sub);
        orderTotals[ci.order.id] = Math.max(0, sub - tax - fee);
      }
    });
  const totalRevenue = Object.values(orderTotals).reduce((s, v) => s + v, 0);
  const totalOrders = new Set(claimItems.map(ci => ci.order.id)).size;
  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Laporan Keuangan Mitra</h2>
    <div class="flex gap-2 mb-4">
      <div class="flex-1">
        <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Tanggal</label>
        <input type="date" id="mitra-finance-date-filter" class="input-field w-full" value="${dateFilter}" onchange="State.mitraFinanceDateFilter=this.value;render()">
      </div>
    </div>
    <div class="grid grid-cols-2 gap-3 mb-5">
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Total Pendapatan</div><div class="text-lg font-bold mt-1" style="color:var(--accent)">${formatCurrency(totalRevenue)}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Total Pesanan Diproses</div><div class="text-lg font-bold mt-1">${totalOrders}</div></div>
    </div>
    <div class="card mb-4">
      <h3 class="font-semibold text-sm mb-3">Menu Terlaris</h3>
      <div class="space-y-2">
        ${(() => {
          const count = {};
          claimItems.forEach(ci => {
            const mi = getMenuItem(ci.menu_item_id);
            if (mi) count[mi.name] = (count[mi.name] || 0) + ci.quantity;
          });
          const sorted = Object.entries(count).sort((a, b) => b[1] - a[1]).slice(0, 5);
          if (!sorted.length) return '<p class="text-sm" style="color:var(--muted)">Belum ada data</p>';
          const maxQty = sorted[0][1];
          return sorted.map(([name, qty]) => `
            <div>
              <div class="flex justify-between text-sm mb-1"><span>${name}</span><span style="color:var(--muted)">${qty} terjual</span></div>
              <div class="stock-bar"><div class="stock-bar-fill" style="width:${(qty / maxQty) * 100}%;background:linear-gradient(90deg,var(--accent),var(--accent3))"></div></div>
            </div>
          `).join('');
        })()}
      </div>
    </div>
    <div class="card"><canvas id="chart-cashier" height="200"></canvas></div>
  </div>`;
}

function renderMitraProfile() {
  const u = State.currentUser;
  const today = new Date().toISOString().split('T')[0];
  const att = DB.attendances.find(a => a.user_id === u.id && !a.check_out && new Date(a.check_in).toISOString().split('T')[0] === today);
  return `
  <div class="animate-fade-up">
    <div class="card text-center mb-4">
      <div class="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold" style="background:var(--accent);color:#fff">${u.avatar}</div>
      <h3 class="font-semibold text-lg">${u.name}</h3>
      <p class="text-sm" style="color:var(--muted)">${u.email}</p>
      <p class="text-sm" style="color:var(--muted)">${u.phone}</p>
      <div class="mt-4 space-y-3 text-left">
        <div class="card" style="border-color:${att ? 'rgba(39,174,96,.3)' : 'rgba(231,76,60,.3)'}">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:${att ? 'rgba(39,174,96,.15)' : 'rgba(231,76,60,.15)'};color:${att ? 'var(--success)' : 'var(--danger)'}"><i class="fas fa-clock"></i></div>
            <div class="flex-1">
              <div class="font-semibold text-sm" style="color:${att ? 'var(--success)' : 'var(--danger)'}">${att ? 'Sedang Bekerja' : 'Belum Check-in'}</div>
              <div class="text-xs" style="color:var(--muted)">${att ? 'Check-in: ' + formatTime(att.check_in) : 'Lakukan check-in agar menu tersedia untuk pelanggan'}</div>
            </div>
          </div>
          ${att
            ? `<button onclick="mitraCheckOut()" class="btn-secondary w-full text-center" style="background:rgba(231,76,60,.1);color:var(--danger);border-color:transparent;"><i class="fas fa-sign-out-alt mr-1"></i>Check Out</button>`
            : `<button onclick="mitraCheckIn()" class="btn-primary w-full text-center"><i class="fas fa-sign-in-alt mr-1"></i>Check In</button>`}
        </div>
        <div class="card flex items-center gap-3 cursor-pointer" onclick="showEditProfileModal()">
          <i class="fas fa-pen-to-square" style="color:var(--accent)"></i>
          <span class="text-sm flex-1">Edit Profil</span>
          <i class="fas fa-chevron-right" style="color:var(--muted);font-size:12px"></i>
        </div>
        <div class="card flex items-center gap-3 cursor-pointer" onclick="handleLogout()">
          <i class="fas fa-right-from-bracket" style="color:var(--danger)"></i>
          <span class="text-sm flex-1">Keluar dari Akun</span>
          <i class="fas fa-chevron-right" style="color:var(--muted);font-size:12px"></i>
        </div>
      </div>
    </div>
  </div>`;
}

function mitraCheckIn() {
  DB.attendances.push({
    id: 'a' + Date.now(),
    user_id: State.currentUser.id,
    check_in: new Date().toISOString(),
    check_out: null,
    status: 'present',
  });
  showToast('Check-in berhasil — menu kamu sekarang tersedia untuk pelanggan', 'success');
  render();
}

function mitraCheckOut() {
  const today = new Date().toISOString().split('T')[0];
  const att = DB.attendances.find(a => a.user_id === State.currentUser.id && !a.check_out && new Date(a.check_in).toISOString().split('T')[0] === today);
  if (!att) { showToast('Belum check-in hari ini', 'warning'); return; }
  att.check_out = new Date().toISOString();
  showToast('Check-out berhasil', 'success');
  render();
}
