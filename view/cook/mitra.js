// ============================================================
// MITRA JURU MASAK VIEW
// ============================================================
async function renderMitraView() {
  try {
    showSkeleton('mitra-view', 'courier');
    var tab = State.currentTab.mitra_juru_masak || 'queue';
    if (tab === 'queue') return await renderMitraQueue();
    if (tab === 'history') return await renderMitraHistory();
    if (tab === 'menu-mgmt') return renderAdminMenuMgmt();
    if (tab === 'finance') return await renderMitraFinance();
    if (tab === 'profile') return await renderMitraProfile();
    return await renderMitraQueue();
  } catch(e) { console.error(e); showToast('Gagal memuat tampilan mitra', 'error'); return ''; }
  finally { hideSkeleton('mitra-view'); }
}

async function renderMitraQueue() {
  try {
    showSkeleton('mitra-queue', 'orders');
    var attendances = await API.getAttendances();
    var today = new Date().toLocaleDateString('sv-SE');
    var hasCheckedIn = attendances.some(function(a) {
      return a.user_id === State.currentUser.id
        && !a.check_out
        && new Date(a.check_in).toLocaleDateString('sv-SE') === today;
    });
    if (!hasCheckedIn) {
      return `
      <div class="animate-fade-up">
        <h2 class="font-display text-xl font-bold mb-4">Antrian Dapur</h2>
        <div class="card text-center py-6" style="border-color:rgba(231,76,60,.2)">
          <i class="fas fa-fire-burner text-3xl mb-2" style="color:var(--danger)"></i>
          <p class="text-sm font-semibold mb-1" style="color:var(--danger)">Belum Check-in Hari Ini</p>
          <p class="text-xs mb-3" style="color:var(--muted)">Lakukan check-in di profil sebelum melihat antrian</p>
          <button onclick="mitraCheckIn()" class="btn-primary text-sm px-5 py-2" style="font-size:13px">
            <i class="fas fa-clock mr-1"></i>Check-in
          </button>
        </div>
      </div>`;
    }
    var menuItems = await API.getMenu();
    var orders = await API.getOrders();
    var tables = await API.getTables();
    DB.attendances = attendances;
    DB.menuItems = menuItems;
    DB.orders = orders;
    DB.tables = tables;
    var mitraMenuIds = menuItems
      .filter(function(m) { return m.submitted_by === State.currentUser.name; })
      .map(function(m) { return m.id; });
    return renderKitchenQueue(
      function(i, mi, o) { return mitraMenuIds.includes(mi.id); },
      function(i, mi, o) {
        var subtotal = i.unit_price * i.quantity;
        var fee = calcMitraFee(subtotal);
        return fee > 0 ? '<div class="text-xs mb-1" style="color:var(--muted)"><i class="fas fa-hand-holding-dollar mr-1"></i>Jasa Aplikasi: <b style="color:var(--danger)">-' + formatCurrency(fee) + '</b></div>' : '';
      },
    );
  } catch(e) { console.error(e); showToast('Gagal memuat antrian', 'error'); return ''; }
  finally { hideSkeleton('mitra-queue'); }
}

async function renderMitraHistory() {
  try {
    showSkeleton('mitra-history', 'orders');
    var menuItems = await API.getMenu();
    var orders = await API.getOrders();
    var payouts = await API.getMitraPayouts();
    DB.menuItems = menuItems;
    DB.orders = orders;
    DB.mitraPayouts = payouts;
    var mitraMenuIds = menuItems
      .filter(function(m) { return m.submitted_by === State.currentUser.name; })
      .map(function(m) { return m.id; });
    var done = orders.filter(function(o) { return ["ready", "delivering", "delivered", "completed", "rejected"].indexOf(o.status) !== -1; });
    var dateFilter = State.mitraDateFilter || new Date().toLocaleDateString('sv-SE');
    if (dateFilter) {
      var s = new Date(dateFilter);
      s.setHours(0, 0, 0, 0);
      var e = new Date(dateFilter);
      e.setHours(23, 59, 59, 999);
      done = done.filter(function(o) { return new Date(o.created_at) >= s && new Date(o.created_at) <= e; });
    }
    done = done.filter(function(o) { return o.items.some(function(i) { return mitraMenuIds.indexOf(i.menu_item_id) !== -1; }); });
    done.sort(function(a, b) { return new Date(b.created_at) - new Date(a.created_at); });
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
        ${done.map(function(o) {
          var t = o.table_id ? getTable(o.table_id) : null;
          var myItems = (o.items || []).filter(function(i) { return mitraMenuIds.indexOf(i.menu_item_id) !== -1; });
          var itemsStr = myItems.map(function(i) {
            var mi = getMenuItem(i.menu_item_id);
            return mi ? mi.name + ' x' + i.quantity : '';
          }).filter(Boolean).join(', ');
          var hItems = myItems.reduce(function(s, i) { return s + (i.unit_price * i.quantity); }, 0);
          var hTax = calcItemTax(myItems);
          var hFee = calcMitraFee(hItems);
          var hTotal = Math.max(0, hItems - hTax - hFee);
          return `
        <div class="card cursor-pointer hover:scale-[1.02] transition-transform" onclick="showMitraOrderDetail('${o.id}')">
          <div class="flex justify-between items-start mb-1">
            <div class="flex items-center gap-2">
              <span class="font-semibold text-sm">#${o.id.slice(-5).toUpperCase()}</span>
              <span class="text-xs" style="color:var(--muted)">${getOrderTypeName(o.order_type)}</span>
            </div>
            <span class="badge ${o.status === 'rejected' ? 'badge-danger' : 'badge-completed'}">${o.status === 'rejected' ? 'Ditolak' : getStatusLabel(o.status)}</span>
            ${o.payment_status === 'paid' ? (function() {
              var payout = payouts.find(function(p) { return p.order_id === o.id && p.mitra_name === State.currentUser.name; });
              if (!payout) return '';
              if (payout.status === 'confirmed') return '<span class="badge" style="background:rgba(39,174,96,.15);color:var(--success);font-size:9px"><i class="fas fa-check mr-0.5"></i>Dikonfirmasi</span>';
              if (payout.status === 'paid') return '<span class="badge" style="background:rgba(52,152,219,.15);color:#3498db;font-size:9px"><i class="fas fa-clock mr-0.5"></i>Menunggu Konfirmasi</span>';
              return '<span class="badge" style="background:rgba(243,156,18,.15);color:#f39c12;font-size:9px"><i class="fas fa-clock mr-0.5"></i>Menunggu Setoran</span>';
            })() : ''}
          </div>
          <div class="text-xs mb-1" style="color:var(--muted)">
            ${o.customer_name ? '<i class="fas fa-user mr-1"></i>' + o.customer_name : '<i class="fas fa-chair mr-1"></i>Walk-in'}${t ? ' — Meja ' + t.number : ''}
          </div>
          <div class="text-xs truncate" style="color:var(--muted)">${itemsStr || '-'}</div>
          <div class="flex justify-between items-center mt-1">
            <span class="text-xs" style="color:var(--muted)"><i class="far fa-clock mr-1"></i>${formatDate(o.created_at)} ${formatTime(o.created_at)}</span>
            <span class="text-sm font-semibold" style="color:var(--accent)">${formatCurrency(hTotal)}</span>
          </div>
          ${o.payment_status === 'paid' ? (function() {
            var payout = payouts.find(function(p) { return p.order_id === o.id && p.mitra_name === State.currentUser.name; });
            if (!payout || payout.status !== 'paid') return '';
            return '<button onclick="event.stopPropagation();confirmMitraPayoutReceipt(\'' + o.id + '\')" class="btn-sm w-full mt-2 text-center" style="background:linear-gradient(135deg,var(--success),#1e8449);color:#fff;border:none;padding:8px;border-radius:8px;cursor:pointer;font-weight:600;font-size:12px"><i class="fas fa-check mr-1"></i>Konfirmasi Terima Pembayaran</button>';
          })() : ''}
        </div>`;
          }).join('')}
      </div>
    </div>`;
  } catch(e) { console.error(e); showToast('Gagal memuat riwayat', 'error'); return ''; }
  finally { hideSkeleton('mitra-history'); }
}

function showMitraOrderDetail(id) {
  var o = DB.orders.find(function(x) { return x.id === id; });
  if (!o) return;
  var mitraMenuIds = DB.menuItems.filter(function(m) { return m.submitted_by === State.currentUser.name; }).map(function(m) { return m.id; });
  var mitraItems = o.items.filter(function(i) { return mitraMenuIds.indexOf(i.menu_item_id) !== -1; });
  var t = o.table_id ? getTable(o.table_id) : null;
  var itemsSubtotal = mitraItems.reduce(function(s, i) { return s + (i.unit_price * i.quantity); }, 0);
  var tax = calcItemTax(mitraItems);
  var biayaLayanan = calcMitraFee(itemsSubtotal);
  var pembayaranMitra = Math.max(0, itemsSubtotal - tax - biayaLayanan);
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
  ${o.reject_reason ? '<div class="card mb-4 text-sm" style="background:rgba(231,76,60,.08);border:1px solid rgba(231,76,60,.2)"><i class="fas fa-ban mr-1" style="color:var(--danger)"></i><strong>Alasan Tolak:</strong> ' + o.reject_reason + '</div>' : ''}
  <div class="space-y-2 mb-4">
    ${mitraItems.map(function(i) {
      var mi = getMenuItem(i.menu_item_id);
      return mi ? `
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
    ${tax > 0 ? '<div class="flex justify-between text-xs mb-1"><span style="color:var(--muted)"><i class="fas fa-receipt mr-1"></i>Pajak</span><span style="color:var(--muted)">' + formatCurrency(tax) + '</span></div>' : ''}
    ${biayaLayanan > 0 ? '<div class="flex justify-between text-xs mb-1"><span style="color:var(--muted)"><i class="fas fa-hand-holding-dollar mr-1"></i>Biaya Layanan</span><span style="color:var(--muted)">' + formatCurrency(biayaLayanan) + '</span></div>' : ''}
    <div class="flex justify-between font-bold text-sm mt-2"><span>Total Pembayaran</span><span style="color:var(--accent)">${formatCurrency(pembayaranMitra)}</span></div>
    ${(function() {
      var payout = DB.mitraPayouts.find(function(p) { return p.order_id === o.id && p.mitra_name === State.currentUser.name; });
      if (!payout && o.payment_status === 'paid') return '';
      if (!payout) return '';
      if (payout.status === 'confirmed') {
        return `
    <div class="flex justify-between items-center text-xs mt-2 p-2 rounded-lg" style="background:rgba(39,174,96,.1);border:1px solid rgba(39,174,96,.2)">
      <span style="color:var(--success)"><i class="fas fa-check-circle mr-1"></i>Sudah Dikonfirmasi</span>
      <span style="color:var(--muted)">${payout.paid_at ? formatDate(payout.paid_at) + ' ' + formatTime(payout.paid_at) : ''}</span>
    </div>`;
      }
      if (payout.status === 'paid') {
        var payer = payout.paid_by ? getUser(payout.paid_by) : null;
        return `
    <div class="flex justify-between items-center text-xs mt-2 p-2 rounded-lg" style="background:rgba(52,152,219,.1);border:1px solid rgba(52,152,219,.2)">
      <span style="color:#3498db"><i class="fas fa-clock mr-1"></i>Dibayar Kasir — Menunggu Konfirmasi</span>
      <span style="color:var(--muted)">${payout.paid_at ? formatDate(payout.paid_at) + ' ' + formatTime(payout.paid_at) : ''}${payer ? ' — ' + payer.name : ''}</span>
    </div>`;
      }
      return `
    <div class="flex justify-between items-center text-xs mt-2 p-2 rounded-lg" style="background:rgba(243,156,18,.1);border:1px solid rgba(243,156,18,.2)">
      <span style="color:#f39c12"><i class="fas fa-clock mr-1"></i>Menunggu Pembayaran Kasir</span>
      <span style="color:var(--muted)">${formatCurrency(pembayaranMitra)}</span>
    </div>`;
    })()}
    <div class="flex justify-between text-xs mt-1" style="color:var(--muted)"><span>Pembayaran</span><span>${o.payment_method === "qris" ? "QRIS" : o.payment_method === "bank_transfer" ? "Transfer Bank" : o.payment_method === "cod" ? "COD" : o.payment_method === "" ? "Bayar Nanti" : "Tunai"}</span></div>
    <div class="flex justify-between text-xs mt-1" style="color:var(--muted)"><span>Status Bayar</span><span class="badge ${o.payment_status === "paid" ? "badge-paid" : "badge-unpaid"}">${o.payment_status === "paid" ? "Lunas" : "Belum Bayar"}</span></div>
    <div class="flex justify-between text-xs mt-1" style="color:var(--muted)"><span>Waktu</span><span>${formatTime(o.created_at)}</span></div>
  </div>
  <div class="flex gap-2 mt-4">
    ${o.status !== "rejected" ? '<button onclick="closeModal();printMitraInvoice(\'' + o.id + '\')" class="btn-primary flex-1 text-center"><i class="fas fa-print mr-1"></i> Cetak Invoice</button>' : ''}
    <button onclick="closeModal()" class="btn-secondary flex-1 text-center">Tutup</button>
  </div>
</div>
`);
}

function printMitraInvoice(id) {
  var o = DB.orders.find(function(x) { return x.id === id; });
  if (!o) return;
  var mitraMenuIds = DB.menuItems.filter(function(m) { return m.submitted_by === State.currentUser.name; }).map(function(m) { return m.id; });
  var mitraItems = o.items.filter(function(i) { return mitraMenuIds.indexOf(i.menu_item_id) !== -1; });
  var itemsSubtotal = mitraItems.reduce(function(s, i) { return s + (i.unit_price * i.quantity); }, 0);
  var tax = Math.round(calcItemTax(mitraItems));
  var biayaLayanan = calcMitraFee(itemsSubtotal);
  var pembayaranMitra = Math.max(0, itemsSubtotal - tax - biayaLayanan);
  var payout = DB.mitraPayouts.find(function(p) { return p.order_id === o.id && p.mitra_name === State.currentUser.name; });
  var payoutStatus = payout && payout.status === 'confirmed' ? 'Sudah Dikonfirmasi' : payout && payout.status === 'paid' ? 'Sudah Dibayar' : 'Menunggu Pembayaran';
  var win = window.open('', '_blank');
  var payMethodLabel = 'Tunai';
  if (o.payment_method === 'qris') payMethodLabel = 'QRIS';
  else if (o.payment_method === 'bank_transfer') payMethodLabel = 'Transfer Bank';
  else if (o.payment_method === 'cod') payMethodLabel = 'COD';
  else if (o.payment_method === '') payMethodLabel = 'Bayar Nanti';
  var custName = o.customer_name || (o.user_id && getUser(o.user_id) ? getUser(o.user_id).name : '') || '';
  var orderTypeLabel = o.order_type === 'dine-in' ? 'Makan di Tempat' : o.order_type === 'takeaway' ? 'Bungkus' : 'Pesan Antar';
  win.document.write(`
    <html><head>
      <title>Invoice Mitra #${o.id.slice(-5).toUpperCase()}</title>
      <style>
        body { font-family: 'Segoe UI',sans-serif; padding:40px; max-width:400px; margin:0 auto; }
        .header { text-align:center; margin-bottom:24px; }
        .header h1 { font-size:22px; margin:0; }
        .header p { font-size:12px; color:#666; margin:2px 0; }
        .divider { border-top:2px dashed #333; margin:16px 0; }
        .item { display:flex; justify-content:space-between; font-size:13px; padding:4px 0; }
        .item .name { flex:1; }
        .item .qty { margin:0 12px; color:#666; }
        .item .price { text-align:right; }
        .totals { margin-top:12px; font-size:13px; }
        .totals > div { display:flex; justify-content:space-between; padding:2px 0; }
        .payout-status { text-align:center; margin-top:12px; font-size:13px; font-weight:bold; }
        .footer { text-align:center; font-size:11px; color:#888; margin-top:24px; }
        @media print { body { padding:20px; } }
      </style>
    </head><body>
      <div class="header">
        <h1>ARQA Coffee</h1>
        <p>Invoice Mitra</p>
        <p>${orderTypeLabel}</p>
        ${o.table_id ? '<p>Meja ' + (getTable(o.table_id) ? getTable(o.table_id).number : '') + '</p>' : ''}
        ${custName ? '<p>' + custName + '</p>' : ''}
        <p>#${o.id.slice(-5).toUpperCase()}</p>
        <p>${new Date(o.created_at).toLocaleString('id-ID')}</p>
      </div>
      <div class="divider"></div>
      ${mitraItems.map(function(i) {
        var mi = getMenuItem(i.menu_item_id);
        return '<div class="item"><span class="name">' + (mi ? mi.name : 'Item') + '</span><span class="qty">x' + i.quantity + '</span><span class="price">' + formatCurrency(i.unit_price * i.quantity) + '</span></div>';
      }).join('')}
      <div class="divider"></div>
      <div class="totals">
        <div><span>Subtotal Menu</span><span>${formatCurrency(itemsSubtotal)}</span></div>
        ${tax > 0 ? '<div><span>Pajak</span><span>' + formatCurrency(tax) + '</span></div>' : ''}
        ${biayaLayanan > 0 ? '<div style="color:#e07a3a"><span>Biaya Layanan</span><span>' + formatCurrency(biayaLayanan) + '</span></div>' : ''}
        <div style="font-weight:bold;font-size:15px"><span>Total Pembayaran</span><span>${formatCurrency(pembayaranMitra)}</span></div>
        <div style="margin-top:8px"><span>Pembayaran</span><span>${payMethodLabel}</span></div>
        <div><span>Status Bayar</span><span>${o.payment_status === 'paid' ? 'Lunas' : 'Belum Bayar'}</span></div>
      </div>
      <div class="payout-status" style="color:${payout && (payout.status === 'paid' || payout.status === 'confirmed') ? '#27ae60' : '#f39c12'}">Pembayaran Mitra: ${payoutStatus}</div>
      ${o.delivery_address ? '<div class="divider"></div><p style="font-size:12px"><strong>Alamat:</strong> ' + o.delivery_address + '</p>' : ''}
      <div class="footer">Terima kasih atas kerja samanya</div>
      <script>window.print()</script>
    </body></html>
  `);
  win.document.close();
}

async function _renderMitraFinanceFor(mitraName) {
  try {
    var orders = await API.getOrders();
    var payouts = await API.getMitraPayouts();
    DB.orders = orders;
    DB.mitraPayouts = payouts;
    var claimItems = [];
    orders.forEach(function(o) {
      if (!o.created_at) return;
      o.items.forEach(function(i) {
        if (i.claimed_by === mitraName) claimItems.push({ ...i, order: o });
      });
    });
    var dateFilter = State.mitraFinanceDateFilter || new Date().toLocaleDateString('sv-SE');
    if (dateFilter) {
      var s = new Date(dateFilter);
      s.setHours(0, 0, 0, 0);
      var e = new Date(dateFilter);
      e.setHours(23, 59, 59, 999);
      var filtered = [];
      claimItems.forEach(function(ci) {
        var d = new Date(ci.order.created_at);
        if (d >= s && d <= e) filtered.push(ci);
      });
      claimItems.length = 0;
      claimItems.push.apply(claimItems, filtered);
    }
    var paidTotals = {};
    var pendingTotals = {};
    claimItems
      .filter(function(ci) { return ci.order.payment_status === 'paid' && ci.order.status !== 'cancelled' && ci.order.status !== 'rejected'; })
      .forEach(function(ci) {
        var payout = payouts.find(function(p) { return p.order_id === ci.order.id && p.mitra_name === mitraName; });
        var isPaid = payout && payout.status === 'confirmed';
        var target = isPaid ? paidTotals : pendingTotals;
        if (!target[ci.order.id]) {
          var mitraItems = ci.order.items.filter(function(i) { return i.claimed_by === mitraName; });
          var sub = mitraItems.reduce(function(s, i) { return s + (i.unit_price * i.quantity); }, 0);
          var tax = calcItemTax(mitraItems);
          var fee = calcMitraFee(sub);
          target[ci.order.id] = Math.max(0, sub - tax - fee);
        }
      });
    var totalRevenue = Object.values(paidTotals).reduce(function(s, v) { return s + v; }, 0);
    var confirmedOrderIds = new Set(payouts.filter(function(p) { return p.mitra_name === mitraName && p.status === 'confirmed'; }).map(function(p) { return p.order_id; }));
    var confirmedHarga = claimItems.filter(function(ci) { return confirmedOrderIds.has(ci.order.id); }).reduce(function(s, i) { return s + (i.unit_price * i.quantity); }, 0);
    var confirmedPengeluaran = confirmedHarga - totalRevenue;
    return `
    <div class="animate-fade-up">
      <h2 class="font-display text-xl font-bold mb-4">Laporan Keuangan Mitra</h2>
      <div class="flex gap-2 mb-4">
        <div class="flex-1">
          <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Tanggal</label>
          <input type="date" id="mitra-finance-date-filter" class="input-field w-full" value="${dateFilter}" onchange="State.mitraFinanceDateFilter=this.value;render()">
        </div>
      </div>
      <div class="grid grid-cols-3 gap-2 mb-4">
        <div class="stat-card text-center cursor-pointer hover:scale-[1.02] transition-transform" onclick="State.showMitraRevenueTable=!State.showMitraRevenueTable;State.showMitraExpenseTable=false;State.showMitraProfitTable=false;render()">
          <div class="text-xs" style="color:var(--muted)">Total Pendapatan</div>
          <div class="text-sm font-bold mt-1" style="color:var(--warning)">${formatCurrency(confirmedHarga)}</div>
        </div>
        <div class="stat-card text-center cursor-pointer hover:scale-[1.02] transition-transform" onclick="State.showMitraExpenseTable=!State.showMitraExpenseTable;State.showMitraRevenueTable=false;State.showMitraProfitTable=false;render()">
          <div class="text-xs" style="color:var(--muted)">Total Pengeluaran</div>
          <div class="text-sm font-bold mt-1" style="color:var(--danger)">${formatCurrency(confirmedPengeluaran)}</div>
        </div>
        <div class="stat-card text-center cursor-pointer hover:scale-[1.02] transition-transform" onclick="State.showMitraProfitTable=!State.showMitraProfitTable;State.showMitraRevenueTable=false;State.showMitraExpenseTable=false;render()">
          <div class="text-xs" style="color:var(--muted)">Total Laba Bersih</div>
          <div class="text-sm font-bold mt-1" style="color:var(--success)">${formatCurrency(totalRevenue)}</div>
        </div>
      </div>
      ${State.showMitraExpenseTable ? (function() {
        var paidOrderIds = new Set();
        var expenseRows = [];
        var gSub = 0, gTax = 0, gFee = 0;
        claimItems.forEach(function(ci) {
          var o = ci.order;
          if (o.payment_status !== 'paid') return;
          if (paidOrderIds.has(o.id)) return;
          var payout = payouts.find(function(p) { return p.order_id === o.id && p.mitra_name === mitraName && p.status === 'confirmed'; });
          if (!payout) return;
          paidOrderIds.add(o.id);
          var mitraItems = o.items.filter(function(i) { return i.claimed_by === mitraName; });
          var sub = mitraItems.reduce(function(s, i) { return s + (i.unit_price * i.quantity); }, 0);
          var tax = calcItemTax(mitraItems);
          var fee = calcMitraFee(sub);
          var exp = tax + fee;
          expenseRows.push({ o: o, sub: sub, tax: tax, fee: fee, exp: exp });
          gSub += sub; gTax += tax; gFee += fee;
        });
        var gExp = gTax + gFee;
        if (!expenseRows.length) {
          return `
      <div class="card mb-4">
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-semibold text-sm">Detail Pengeluaran</h3>
          <button onclick="State.showMitraExpenseTable=false;render()" class="text-xs" style="color:var(--muted)"><i class="fas fa-times mr-1"></i>Tutup</button>
        </div>
        <p class="text-sm py-4 text-center" style="color:var(--muted)">Belum ada data pengeluaran</p>
      </div>`;
        }
        return `
      <div class="card mb-4">
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-semibold text-sm">Detail Pengeluaran</h3>
          <button onclick="State.showMitraExpenseTable=false;render()" class="text-xs" style="color:var(--muted)"><i class="fas fa-times mr-1"></i>Tutup</button>
        </div>
        <div class="grid grid-cols-2 gap-3 mb-3">
          <div class="stat-card text-center"><div class="text-xs" style="color:var(--muted)"><i class="fas fa-receipt mr-1"></i>Pajak</div><div class="text-sm font-bold mt-1" style="color:var(--accent)">${formatCurrency(gTax)}</div></div>
          <div class="stat-card text-center"><div class="text-xs" style="color:var(--muted)"><i class="fas fa-hand-holding-dollar mr-1"></i>Biaya Layanan</div><div class="text-sm font-bold mt-1" style="color:var(--danger)">${formatCurrency(gFee)}</div></div>
        </div>
        <div class="overflow-x-auto max-h-72 overflow-y-auto">
          <table class="w-full text-sm" style="border-collapse:collapse">
            <thead><tr style="color:var(--muted);font-size:11px"><th style="border-bottom:2px solid var(--border);padding:6px 8px;text-align:left">No</th><th style="border-bottom:2px solid var(--border);padding:6px 8px;text-align:left">Order</th><th style="border-bottom:2px solid var(--border);padding:6px 8px;text-align:right">Subtotal</th><th style="border-bottom:2px solid var(--border);padding:6px 8px;text-align:right">Pajak</th><th style="border-bottom:2px solid var(--border);padding:6px 8px;text-align:right">Biaya</th><th style="border-bottom:2px solid var(--border);padding:6px 8px;text-align:right">Jumlah</th></tr></thead>
            <tbody>${expenseRows.map(function(r, i) {
              return `
              <tr class="cursor-pointer hover:bg-white/5" onclick="showMitraOrderDetail('${r.o.id}')">
                <td style="border-bottom:1px solid var(--border);padding:6px 8px;color:var(--muted)">${i + 1}</td>
                <td style="border-bottom:1px solid var(--border);padding:6px 8px;font-weight:600">#${r.o.id.slice(-5).toUpperCase()}</td>
                <td style="border-bottom:1px solid var(--border);padding:6px 8px;text-align:right;color:var(--muted)">${formatCurrency(r.sub)}</td>
                <td style="border-bottom:1px solid var(--border);padding:6px 8px;text-align:right;color:var(--accent)">${formatCurrency(r.tax)}</td>
                <td style="border-bottom:1px solid var(--border);padding:6px 8px;text-align:right;color:var(--danger)">${formatCurrency(r.fee)}</td>
                <td style="border-bottom:1px solid var(--border);padding:6px 8px;text-align:right;color:var(--danger)">${formatCurrency(r.exp)}</td>
              </tr>`;
            }).join('')}</tbody>
            <tfoot><tr class="font-bold" style="font-size:11px">
              <td style="border-bottom:1px solid var(--border);padding:6px 8px;border-top:2px solid var(--danger)"></td>
              <td style="border-bottom:1px solid var(--border);padding:6px 8px;border-top:2px solid var(--danger)">Total</td>
              <td style="border-bottom:1px solid var(--border);padding:6px 8px;border-top:2px solid var(--danger);text-align:right;color:var(--muted)">${formatCurrency(gSub)}</td>
              <td style="border-bottom:1px solid var(--border);padding:6px 8px;border-top:2px solid var(--danger);text-align:right;color:var(--accent)">${formatCurrency(gTax)}</td>
              <td style="border-bottom:1px solid var(--border);padding:6px 8px;border-top:2px solid var(--danger);text-align:right;color:var(--danger)">${formatCurrency(gFee)}</td>
              <td style="border-bottom:1px solid var(--border);padding:6px 8px;border-top:2px solid var(--danger);text-align:right;color:var(--danger)">${formatCurrency(gExp)}</td>
            </tr></tfoot>
          </table>
        </div>
      </div>`;
      })() : State.showMitraRevenueTable ? (function() {
        var revenueRows = [];
        var revCount = 0, revTotal = 0;
        var orderMap = {};
        claimItems.forEach(function(ci) {
          if (ci.order.payment_status !== 'paid') return;
          var payout = payouts.find(function(p) { return p.order_id === ci.order.id && p.mitra_name === mitraName && p.status === 'confirmed'; });
          if (!payout) return;
          orderMap[ci.order.id] = ci.order;
        });
        Object.values(orderMap).forEach(function(o) {
          var mitraItems = o.items.filter(function(i) { return i.claimed_by === mitraName; });
          var sub = mitraItems.reduce(function(s, i) { return s + (i.unit_price * i.quantity); }, 0);
          if (sub <= 0) return;
          var itemsStr = mitraItems.map(function(i) {
            var mi = getMenuItem(i.menu_item_id);
            return mi ? mi.name + ' x' + i.quantity : '';
          }).filter(Boolean).join(', ');
          revenueRows.push({ o: o, itemsStr: itemsStr, sub: sub });
          revCount++; revTotal += sub;
        });
        if (!revenueRows.length) {
          return `
      <div class="card mb-4">
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-semibold text-sm">Detail Pendapatan</h3>
          <button onclick="State.showMitraRevenueTable=false;render()" class="text-xs" style="color:var(--muted)"><i class="fas fa-times mr-1"></i>Tutup</button>
        </div>
        <p class="text-sm py-4 text-center" style="color:var(--muted)">Belum ada data pendapatan</p>
      </div>`;
        }
        return `
      <div class="card mb-4">
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-semibold text-sm">Detail Pendapatan</h3>
          <button onclick="State.showMitraRevenueTable=false;render()" class="text-xs" style="color:var(--muted)"><i class="fas fa-times mr-1"></i>Tutup</button>
        </div>
        <div class="grid grid-cols-2 gap-3 mb-3">
          <div class="stat-card text-center"><div class="text-xs" style="color:var(--muted)"><i class="fas fa-money-bill mr-1"></i>Total Pendapatan</div><div class="text-sm font-bold mt-1" style="color:var(--warning)">${formatCurrency(revTotal)}</div></div>
          <div class="stat-card text-center"><div class="text-xs" style="color:var(--muted)"><i class="fas fa-receipt mr-1"></i>Total Transaksi</div><div class="text-sm font-bold mt-1" style="color:var(--accent)">${revCount}</div></div>
        </div>
        <div class="overflow-x-auto max-h-72 overflow-y-auto">
          <table class="w-full text-sm" style="border-collapse:collapse">
            <thead><tr style="color:var(--muted);font-size:11px"><th style="border-bottom:2px solid var(--border);padding:6px 8px;text-align:left">No</th><th style="border-bottom:2px solid var(--border);padding:6px 8px;text-align:left">Order</th><th style="border-bottom:2px solid var(--border);padding:6px 8px;text-align:left">Menu</th><th style="border-bottom:2px solid var(--border);padding:6px 8px;text-align:right">Jumlah</th></tr></thead>
            <tbody>${revenueRows.map(function(r, i) {
              return `
              <tr class="cursor-pointer hover:bg-white/5" onclick="showMitraOrderDetail('${r.o.id}')">
                <td style="border-bottom:1px solid var(--border);padding:6px 8px;color:var(--muted)">${i + 1}</td>
                <td style="border-bottom:1px solid var(--border);padding:6px 8px;font-weight:600">#${r.o.id.slice(-5).toUpperCase()}</td>
                <td style="border-bottom:1px solid var(--border);padding:6px 8px;color:var(--muted);font-size:11px;max-width:160px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${r.itemsStr}">${r.itemsStr}</td>
                <td style="border-bottom:1px solid var(--border);padding:6px 8px;text-align:right;color:var(--warning)">${formatCurrency(r.sub)}</td>
              </tr>`;
            }).join('')}</tbody>
            <tfoot><tr class="font-bold" style="font-size:11px">
              <td style="border-bottom:1px solid var(--border);padding:6px 8px;border-top:2px solid var(--warning)"></td>
              <td style="border-bottom:1px solid var(--border);padding:6px 8px;border-top:2px solid var(--warning)">Total</td>
              <td style="border-bottom:1px solid var(--border);padding:6px 8px;border-top:2px solid var(--warning)"></td>
              <td style="border-bottom:1px solid var(--border);padding:6px 8px;border-top:2px solid var(--warning);text-align:right;color:var(--warning)">${formatCurrency(revTotal)}</td>
            </tr></tfoot>
          </table>
        </div>
      </div>`;
      })() : State.showMitraProfitTable ? (function() {
        var profitRows = [];
        var pCount = 0, pSubTotal = 0, pExpTotal = 0, pProfitTotal = 0;
        var orderMap = {};
        claimItems.forEach(function(ci) {
          if (ci.order.payment_status !== 'paid') return;
          var payout = payouts.find(function(p) { return p.order_id === ci.order.id && p.mitra_name === mitraName && p.status === 'confirmed'; });
          if (!payout) return;
          orderMap[ci.order.id] = ci.order;
        });
        Object.values(orderMap).forEach(function(o) {
          var mitraItems = o.items.filter(function(i) { return i.claimed_by === mitraName; });
          var sub = mitraItems.reduce(function(s, i) { return s + (i.unit_price * i.quantity); }, 0);
          if (sub <= 0) return;
          var tax = calcItemTax(mitraItems);
          var fee = calcMitraFee(sub);
          var expense = tax + fee;
          var profit = Math.max(0, sub - expense);
          profitRows.push({ o: o, sub: sub, expense: expense, profit: profit });
          pCount++; pSubTotal += sub; pExpTotal += expense; pProfitTotal += profit;
        });
        if (!profitRows.length) {
          return `
      <div class="card mb-4">
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-semibold text-sm">Detail Laba Bersih</h3>
          <button onclick="State.showMitraProfitTable=false;render()" class="text-xs" style="color:var(--muted)"><i class="fas fa-times mr-1"></i>Tutup</button>
        </div>
        <p class="text-sm py-4 text-center" style="color:var(--muted)">Belum ada data laba bersih</p>
      </div>`;
        }
        return `
      <div class="card mb-4">
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-semibold text-sm">Detail Laba Bersih</h3>
          <button onclick="State.showMitraProfitTable=false;render()" class="text-xs" style="color:var(--muted)"><i class="fas fa-times mr-1"></i>Tutup</button>
        </div>
        <div class="grid grid-cols-3 gap-2 mb-3">
          <div class="stat-card text-center"><div class="text-xs" style="color:var(--muted)"><i class="fas fa-money-bill mr-1"></i>Pendapatan</div><div class="text-sm font-bold mt-1" style="color:var(--warning)">${formatCurrency(pSubTotal)}</div></div>
          <div class="stat-card text-center"><div class="text-xs" style="color:var(--muted)"><i class="fas fa-receipt mr-1"></i>Pengeluaran</div><div class="text-sm font-bold mt-1" style="color:var(--danger)">${formatCurrency(pExpTotal)}</div></div>
          <div class="stat-card text-center"><div class="text-xs" style="color:var(--muted)"><i class="fas fa-chart-line mr-1"></i>Laba Bersih</div><div class="text-sm font-bold mt-1" style="color:var(--success)">${formatCurrency(pProfitTotal)}</div></div>
        </div>
        <div class="overflow-x-auto max-h-72 overflow-y-auto">
          <table class="w-full text-sm" style="border-collapse:collapse">
            <thead><tr style="color:var(--muted);font-size:11px"><th style="border-bottom:2px solid var(--border);padding:6px 8px;text-align:left">No</th><th style="border-bottom:2px solid var(--border);padding:6px 8px;text-align:left">Order</th><th style="border-bottom:2px solid var(--border);padding:6px 8px;text-align:right">Pendapatan</th><th style="border-bottom:2px solid var(--border);padding:6px 8px;text-align:right">Pengeluaran</th><th style="border-bottom:2px solid var(--border);padding:6px 8px;text-align:right">Laba Bersih</th></tr></thead>
            <tbody>${profitRows.map(function(r, i) {
              return `
              <tr class="cursor-pointer hover:bg-white/5" onclick="showMitraOrderDetail('${r.o.id}')">
                <td style="border-bottom:1px solid var(--border);padding:6px 8px;color:var(--muted)">${i + 1}</td>
                <td style="border-bottom:1px solid var(--border);padding:6px 8px;font-weight:600">#${r.o.id.slice(-5).toUpperCase()}</td>
                <td style="border-bottom:1px solid var(--border);padding:6px 8px;text-align:right;color:var(--warning)">${formatCurrency(r.sub)}</td>
                <td style="border-bottom:1px solid var(--border);padding:6px 8px;text-align:right;color:var(--danger)">${formatCurrency(r.expense)}</td>
                <td style="border-bottom:1px solid var(--border);padding:6px 8px;text-align:right;color:var(--success)">${formatCurrency(r.profit)}</td>
              </tr>`;
            }).join('')}</tbody>
            <tfoot><tr class="font-bold" style="font-size:11px">
              <td style="border-bottom:1px solid var(--border);padding:6px 8px;border-top:2px solid var(--accent)"></td>
              <td style="border-bottom:1px solid var(--border);padding:6px 8px;border-top:2px solid var(--accent)">Total</td>
              <td style="border-bottom:1px solid var(--border);padding:6px 8px;border-top:2px solid var(--accent);text-align:right;color:var(--warning)">${formatCurrency(pSubTotal)}</td>
              <td style="border-bottom:1px solid var(--border);padding:6px 8px;border-top:2px solid var(--accent);text-align:right;color:var(--danger)">${formatCurrency(pExpTotal)}</td>
              <td style="border-bottom:1px solid var(--border);padding:6px 8px;border-top:2px solid var(--accent);text-align:right;color:var(--success)">${formatCurrency(pProfitTotal)}</td>
            </tr></tfoot>
          </table>
        </div>
      </div>`;
      })() : `
      <div class="card mb-4">
        <h3 class="font-semibold text-sm mb-3">Menu Terlaris</h3>
        <div class="space-y-2">
          ${(function() {
            var count = {};
            claimItems.forEach(function(ci) {
              var mi = getMenuItem(ci.menu_item_id);
              if (mi) count[mi.name] = (count[mi.name] || 0) + ci.quantity;
            });
            var sorted = Object.entries(count).sort(function(a, b) { return b[1] - a[1]; }).slice(0, 5);
            if (!sorted.length) return '<p class="text-sm" style="color:var(--muted)">Belum ada data</p>';
            var maxQty = sorted[0][1];
            return sorted.map(function(item) {
              var name = item[0], qty = item[1];
              return `
              <div>
                <div class="flex justify-between text-sm mb-1"><span>${name}</span><span style="color:var(--muted)">${qty} terjual</span></div>
                <div class="stock-bar"><div class="stock-bar-fill" style="width:${(qty / maxQty) * 100}%;background:linear-gradient(90deg,var(--accent),var(--accent3))"></div></div>
              </div>`;
            }).join('');
          })()}
        </div>
      </div>
      <div class="card mb-4">
        <h3 class="font-semibold text-sm mb-3">Total Pesanan</h3>
        <div class="space-y-2 max-h-64 overflow-y-auto">
          ${(function() {
            var orderMap = {};
            claimItems.forEach(function(ci) { orderMap[ci.order.id] = ci.order; });
            var list = Object.values(orderMap)
              .sort(function(a, b) { return new Date(b.created_at) - new Date(a.created_at); })
              .slice(0, 6);
            if (!list.length) return '<p class="text-sm py-4 text-center" style="color:var(--muted)">Belum ada data</p>';
            return list.map(function(o) {
              var myItems = (o.items || []).filter(function(i) { return i.claimed_by === mitraName; });
              var mySubtotal = myItems.reduce(function(s, i) { return s + (i.unit_price * i.quantity); }, 0);
              var itemsStr = myItems.map(function(i) {
                var mi = getMenuItem(i.menu_item_id);
                return mi ? mi.name + ' x' + i.quantity : '';
              }).filter(Boolean).join(', ');
              var tableInfo = o.order_type === 'dine-in' && o.table_id ? 'Meja ' + (getTable(o.table_id) ? getTable(o.table_id).number : '-') : '';
              return `
            <div class="flex justify-between items-center text-sm py-2 border-b" style="border-color:var(--border);cursor:pointer" onclick="showMitraOrderDetail('${o.id}')">
              <div>
                <span class="font-medium">#${o.id.slice(-5).toUpperCase()}</span>
                <span class="badge ${getStatusBadge(o.status)} ml-2">${getStatusLabel(o.status)}</span>
                ${(function() {
                  var payout = payouts.find(function(p) { return p.order_id === o.id && p.mitra_name === mitraName; });
                  if (!payout) return '';
                  if (payout.status === 'confirmed') return '<span class="badge" style="background:rgba(39,174,96,.15);color:var(--success);font-size:9px;margin-left:4px"><i class="fas fa-check mr-0.5"></i>Dikonfirmasi</span>';
                  if (payout.status === 'paid') return '<span class="badge" style="background:rgba(52,152,219,.15);color:#3498db;font-size:9px;margin-left:4px"><i class="fas fa-clock mr-0.5"></i>Menunggu Konfirmasi</span>';
                  return '<span class="badge" style="background:rgba(243,156,18,.15);color:#f39c12;font-size:9px;margin-left:4px"><i class="fas fa-clock mr-0.5"></i>Menunggu Pembayaran</span>';
                })()}
                <div class="text-[10px] mt-0.5" style="color:var(--muted)">${tableInfo || getOrderTypeName(o.order_type)}</div>
                <div class="text-[10px] truncate max-w-[200px]" style="color:var(--muted)">${itemsStr}</div>
              </div>
              <span style="color:var(--accent)">${formatCurrency(mySubtotal)}</span>
            </div>`;
            }).join('');
          })()}
        </div>
      </div>`}
    </div>`;
  } catch(e) { console.error(e); showToast('Gagal memuat laporan keuangan', 'error'); return ''; }
}

async function renderMitraFinance() {
  return await _renderMitraFinanceFor(State.currentUser.name);
}

async function renderMitraProfile() {
  try {
    showSkeleton('mitra-profile', 'profile');
    var attendances = await API.getAttendances();
    DB.attendances = attendances;
    var u = State.currentUser;
    var today = new Date().toLocaleDateString('sv-SE');
    var att = attendances.find(function(a) { return a.user_id === u.id && !a.check_out && new Date(a.check_in).toLocaleDateString('sv-SE') === today; });
    return `
    <div class="animate-fade-up">
      <div class="card text-center mb-4">
        <div class="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold" style="background:var(--accent);color:#fff">${u.avatar}</div>
        <h3 class="font-semibold text-lg">${u.name}</h3>
        ${u.business_name ? '<p class="text-xs mb-1" style="color:var(--accent)"><i class="fas fa-store mr-1"></i>' + u.business_name + '</p>' : ''}
        <p class="text-sm" style="color:var(--muted)">${u.email}</p>
        <p class="text-sm" style="color:var(--muted)">${u.phone}</p>
      </div>
      <div class="card mb-3" style="border-color:${att ? 'rgba(39,174,96,.3)' : 'rgba(231,76,60,.3)'}">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:${att ? 'rgba(39,174,96,.15)' : 'rgba(231,76,60,.15)'};color:${att ? 'var(--success)' : 'var(--danger)'}"><i class="fas fa-clock"></i></div>
          <div class="flex-1">
            <div class="font-semibold text-sm" style="color:${att ? 'var(--success)' : 'var(--danger)'}">${att ? 'Sedang Bekerja' : 'Belum Check-in'}</div>
            <div class="text-xs" style="color:var(--muted)">${att ? 'Check-in: ' + formatTime(att.check_in) : 'Lakukan check-in agar menu tersedia untuk pelanggan'}</div>
          </div>
        </div>
        ${att
          ? '<button onclick="mitraCheckOut()" class="btn-secondary w-full text-center" style="background:rgba(231,76,60,.1);color:var(--danger);border-color:transparent;"><i class="fas fa-sign-out-alt mr-1"></i>Check Out</button>'
          : '<button onclick="mitraCheckIn()" class="btn-primary w-full text-center"><i class="fas fa-sign-in-alt mr-1"></i>Check In</button>'}
      </div>

      <div class="card mb-3 flex items-center gap-3 cursor-pointer" onclick="showEditProfileModal()">
        <i class="fas fa-pen-to-square" style="color:var(--accent)"></i>
        <span class="text-sm flex-1">Edit Profil</span>
        <i class="fas fa-chevron-right" style="color:var(--muted);font-size:12px"></i>
      </div>
      <div class="card mb-3 flex items-center gap-3 cursor-pointer" onclick="handleLogout()">
        <i class="fas fa-right-from-bracket" style="color:var(--danger)"></i>
        <span class="text-sm flex-1">Keluar dari Akun</span>
        <i class="fas fa-chevron-right" style="color:var(--muted);font-size:12px"></i>
      </div>
    </div>`;
  } catch(e) { console.error(e); showToast('Gagal memuat profil', 'error'); return ''; }
  finally { hideSkeleton('mitra-profile'); }
}

async function mitraCheckIn() {
  try {
    var btn = document.querySelector('.btn-primary i.fa-clock')?.closest('button');
    if (btn) showBtnSpinner(btn);
    await API.createAttendance({
      id: 'a' + Date.now(),
      user_id: State.currentUser.id,
      check_in: new Date().toISOString(),
      check_out: null,
      status: 'present',
    });
    showToast('Check-in berhasil — menu kamu sekarang tersedia untuk pelanggan', 'success');
    await render();
  } catch(e) { console.error(e); showToast('Gagal check-in', 'error'); }
  finally { if (btn) hideBtnSpinner(btn); }
}

async function mitraCheckOut() {
  try {
    var today = new Date().toLocaleDateString('sv-SE');
    var attendances = await API.getAttendances();
    var att = attendances.find(function(a) { return a.user_id === State.currentUser.id && !a.check_out && new Date(a.check_in).toLocaleDateString('sv-SE') === today; });
    if (!att) { showToast('Belum check-in hari ini', 'warning'); return; }
    await API.updateAttendance(att.id, { check_out: new Date().toISOString() });
    showToast('Check-out berhasil', 'success');
    await render();
  } catch(e) { console.error(e); showToast('Gagal check-out', 'error'); }
}

function confirmMitraPayoutReceipt(orderId) {
  var o = DB.orders.find(function(x) { return x.id === orderId; });
  if (!o) return;
  var payout = DB.mitraPayouts.find(function(p) { return p.order_id === orderId && p.mitra_name === State.currentUser.name; });
  if (!payout || payout.status !== 'paid') return;
  showModal(`
    <div class="text-center">
      <div class="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl" style="background:rgba(39,174,96,.1);color:var(--success)">
        <i class="fas fa-check-circle"></i>
      </div>
      <h3 class="font-display text-lg font-bold mb-2">Konfirmasi Pembayaran</h3>
      <p class="text-sm mb-1" style="color:var(--muted)">Anda akan mengkonfirmasi penerimaan pembayaran sebesar</p>
      <p class="text-2xl font-bold mb-4" style="color:var(--success)">${formatCurrency(payout.amount)}</p>
      <div class="p-3 rounded-xl mb-4 text-xs text-left" style="background:var(--bg2)">
        <div class="flex justify-between mb-1"><span style="color:var(--muted)">Pesanan</span><span>#${o.id.slice(-5).toUpperCase()}</span></div>
        <div class="flex justify-between mb-1"><span style="color:var(--muted)">Item</span><span>${formatCurrency(payout.total_items)}</span></div>
        <div class="flex justify-between mb-1"><span style="color:var(--muted)">Pajak</span><span>-${formatCurrency(payout.tax)}</span></div>
        <div class="flex justify-between mb-1"><span style="color:var(--muted)">Biaya Layanan</span><span>-${formatCurrency(payout.fee)}</span></div>
        <div class="border-t pt-1 mt-1" style="border-color:var(--border)"></div>
        <div class="flex justify-between font-semibold" style="color:var(--accent)"><span>Total</span><span>${formatCurrency(payout.amount)}</span></div>
      </div>
      <div class="flex gap-3">
        <button onclick="closeModal()" class="btn-secondary flex-1">Batal</button>
        <button onclick="processMitraPayoutConfirm('${orderId}')" class="btn-primary flex-1 text-center" style="background:linear-gradient(135deg,var(--success),#1e8449)"><i class="fas fa-check mr-1"></i>Ya, Konfirmasi</button>
      </div>
    </div>
  `);
}

async function processMitraPayoutConfirm(orderId) {
  try {
    var orders = await API.getOrders();
    var payouts = await API.getMitraPayouts();
    var o = orders.find(function(x) { return x.id === orderId; });
    if (!o) return;
    var payout = payouts.find(function(p) { return p.order_id === orderId && p.mitra_name === State.currentUser.name; });
    if (!payout || payout.status !== 'paid') return;
    await API.updateMitraPayout(payout.id, { status: 'confirmed', confirmed_at: new Date().toISOString() });
    addNotification({
      title: 'Pembayaran Dikonfirmasi Mitra',
      message: payout.mitra_name + ' telah mengkonfirmasi penerimaan ' + formatCurrency(payout.amount) + ' — #' + o.id.slice(-5).toUpperCase(),
      type: 'payment',
      icon: 'fa-check-circle',
      targetRoles: ['cashier', 'admin', 'manager'],
      relatedOrderId: o.id,
    });
    closeModal();
    showToast('Pembayaran ' + formatCurrency(payout.amount) + ' berhasil dikonfirmasi', 'success');
    await render();
  } catch(e) { console.error(e); showToast('Gagal mengkonfirmasi pembayaran', 'error'); }
}
