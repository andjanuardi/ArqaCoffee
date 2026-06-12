// ============================================================
// MANAGER VIEW — Dashboard & Users
// ============================================================
async function renderManagerView() {
  try {
    var tab = State.currentTab.manager || 'dashboard';
    if (tab === 'dashboard') return await renderManagerDashboard();
    if (tab === 'report') return await renderManagerReport();
    if (tab === 'finance') return await renderManagerFinance();
    if (tab === 'stock') return await renderStockManagement();
    if (tab === 'pg-stock') return await renderPlaygroundPgStock();
    if (tab === 'expenses') return await renderExpenseManagement();
    if (tab === 'active-orders') return await renderActiveOrders();
    if (tab === 'active-playground') return await renderActivePlaygroundTickets();
    if (tab === 'tarif-kurir') return await renderTarifKurir();
    if (tab === 'tarif-mitra') return await renderTarifMitra();
    if (tab === 'tarif-pelanggan') return await renderTarifPelanggan();
    if (tab === 'attendance') return await renderAttendance();
    if (tab === 'promos') return await renderAdminPromos();
    if (tab === 'tables-mgmt') return await renderAdminTablesMgmt();
    if (tab === 'menu-mgmt') return await renderAdminMenuMgmt();
    if (tab === 'users') return await renderManagerUsers();
    if (tab === 'profile') return renderGenericProfile();
    return await renderManagerDashboard();
  } catch(e) { console.error(e); showToast('Gagal memuat halaman', 'error'); return ''; }
}

async function renderManagerReport() {
  try {
    showSkeleton('manager-report', 'list');
    DB.orders = await API.getOrders();
    DB.menuItems = await API.getMenu();
    DB.users = await API.getUsers();
    var dateVal = State.managerReportDate || new Date().toLocaleDateString('sv-SE');
    var paidInRange = DB.orders.filter(function(o) {
      if (o.payment_status !== 'paid' || !o.created_at) return false;
      if (o.status === 'cancelled' || o.status === 'rejected') return false;
      var d = new Date(o.created_at).toLocaleDateString('sv-SE');
      return d === dateVal;
    });
    var cashInRange = paidInRange.filter(function(o) { return o.payment_method === 'cash' || o.payment_method === 'cod'; });
    var cashTotal = cashInRange.reduce(function(s, o) { return s + effectiveAmount(o); }, 0);
    var digitalInRange = paidInRange.filter(function(o) { return o.payment_method === 'digital' || o.payment_method === 'qris' || o.payment_method === 'bank_transfer'; });
    var digitalTotal = digitalInRange.reduce(function(s, o) { return s + effectiveAmount(o); }, 0);
    var unpaidOrders = DB.orders.filter(function(o) { return o.status !== 'cancelled' && o.status !== 'rejected' && o.payment_status === 'unpaid' && (!o.created_at || new Date(o.created_at).toLocaleDateString('sv-SE') === dateVal); });
    return `
    <div class="animate-fade-up">
      <h2 class="font-display text-xl font-bold mb-4">Laporan Harian</h2>
      <div class="mb-4">
        <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Filter Tanggal</label>
        <input type="date" id="manager-report-date" class="input-field w-full" value="${dateVal}" onchange="State.managerReportDate=this.value;render()">
      </div>
      <div class="grid grid-cols-2 gap-3 mb-5">
        <div class="stat-card cursor-pointer" onclick="State.showManagerCashTable=!State.showManagerCashTable;render()"><div class="flex items-center gap-2"><i class="fas fa-money-bill-wave" style="color:var(--success);font-size:18px"></i><span class="text-xs" style="color:var(--muted)">Bayar Tunai</span></div><div class="text-xl font-bold mt-1" style="color:var(--success)">${formatCurrency(cashTotal)}</div></div>
        <div class="stat-card cursor-pointer" onclick="State.showManagerDigitalTable=!State.showManagerDigitalTable;render()"><div class="flex items-center gap-2"><i class="fas fa-credit-card" style="color:var(--accent);font-size:18px"></i><span class="text-xs" style="color:var(--muted)">Bayar Digital</span></div><div class="text-xl font-bold mt-1" style="color:var(--accent)">${formatCurrency(digitalTotal)}</div></div>
        <div class="stat-card"><div class="flex items-center gap-2"><i class="fas fa-check-circle" style="color:var(--success);font-size:18px"></i><span class="text-xs" style="color:var(--muted)">Lunas</span></div><div class="text-xl font-bold mt-1" style="color:var(--success)">${paidInRange.length}</div></div>
        <div class="stat-card"><div class="flex items-center gap-2"><i class="fas fa-exclamation-circle" style="color:var(--danger);font-size:18px"></i><span class="text-xs" style="color:var(--muted)">Belum Bayar</span></div><div class="text-xl font-bold mt-1" style="color:var(--danger)">${unpaidOrders.length}</div></div>
      </div>
      ${State.showManagerCashTable ? renderManagerCashTable(dateVal) : ''}
      ${State.showManagerDigitalTable ? renderManagerDigitalTable(dateVal) : ''}
      <div class="card">
        <h3 class="font-semibold text-sm mb-3">Pesanan Terkini</h3>
        <div class="space-y-2 max-h-64 overflow-y-auto">
          ${DB.orders.slice(0, 6).map(function(o) {
            var staffIcon = o.waiter_id && getUser(o.waiter_id) ? '<i class="fas fa-user-tie ml-2" style="color:var(--accent);font-size:10px"></i> ' + getUser(o.waiter_id).name : '';
            var courierIcon = o.courier_id && getUser(o.courier_id) ? '<i class="fas fa-motorcycle ml-2" style="color:var(--accent);font-size:10px"></i> ' + getUser(o.courier_id).name : '';
            return `
          <div class="flex items-center justify-between text-sm py-2.5 px-3 rounded-xl cursor-pointer hover:bg-white/5" style="border:1px solid var(--border)" onclick="${o.order_type === 'delivery' ? `showCashierActiveOrderDetail('${o.id}')` : `showFinanceOrderDetail('${encodeURIComponent(o.id)}')`}">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-1.5">
                <span class="font-medium text-xs">#${o.id.slice(-5).toUpperCase()}</span>
                <span class="badge ${getStatusBadge(o.status)}" style="font-size:8px">${getStatusLabel(o.status)}</span>
                ${o.promo_discount ? '<span class="text-[10px]" style="color:var(--success)"><i class="fas fa-tag"></i></span>' : ''}
              </div>
              <div class="text-[10px] truncate mt-0.5" style="color:var(--muted)">
                ${getOrderTypeName(o.order_type)}${o.customer_name ? ' — ' + o.customer_name : ''}${o.user_id && o.user_id !== 'walk-in' && getUser(o.user_id) ? ' (' + getUser(o.user_id).email + ')' : ''}${staffIcon}${courierIcon}
              </div>
            </div>
            <span class="font-semibold text-xs whitespace-nowrap ml-3" style="color:${o.payment_status === 'paid' ? 'var(--success)' : 'var(--muted)'}">${formatCurrency(effectiveAmount(o))}</span>
          </div>`;}).join('')}
        </div>
      </div>
    </div>`;
  } catch(e) { console.error(e); showToast('Gagal memuat laporan', 'error'); return ''; }
  finally { hideSkeleton('manager-report'); }
}

function renderManagerCashTable(dateVal) {
  var orders = DB.orders.filter(function(o) {
    if (o.payment_status !== 'paid' || (o.payment_method !== 'cash' && o.payment_method !== 'cod') || !o.created_at) return false;
    return new Date(o.created_at).toLocaleDateString('sv-SE') === dateVal;
  }).sort(function(a, b) { return new Date(b.created_at) - new Date(a.created_at); });
  var total = orders.reduce(function(s, o) { return s + effectiveAmount(o); }, 0);
  return `
    <div class="card mb-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-semibold text-sm">Detail Bayar Tunai</h3>
        <button onclick="State.showManagerCashTable=false;render()" class="text-xs" style="color:var(--muted)"><i class="fas fa-times mr-1"></i>Tutup</button>
      </div>
      <div class="grid grid-cols-2 gap-3 mb-3">
        <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Total Tunai</div><div class="text-base font-bold mt-1" style="color:var(--success)">${formatCurrency(total)}</div></div>
        <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Jumlah Transaksi</div><div class="text-base font-bold mt-1">${orders.length}</div></div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm" style="border-collapse:collapse">
          <thead><tr style="color:var(--muted)"><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Jam</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Orders</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Menu</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:right">Total</th></tr></thead>
          <tbody>${orders.length === 0 ? '<tr><td style="padding:8px 10px;text-align:center;color:var(--muted)" colspan="4">Belum ada transaksi tunai</td></tr>' : orders.map(function(o) {
            var ea = effectiveAmount(o);
            var time = o.created_at ? new Date(o.created_at).toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'}) : '-';
            var menuCount = {};
            (o.items || []).forEach(function(item) {
              var mi = DB.menuItems.find(function(m) { return m.id === item.menu_item_id; });
              if (mi) menuCount[mi.name] = (menuCount[mi.name] || 0) + item.quantity;
            });
            var menuList = Object.entries(menuCount).map(function(e) { return e[0] + ' x' + e[1]; }).join(', ');
            var encoded = encodeURIComponent(o.id);
            return `<tr class="cursor-pointer hover:bg-white/5" onclick="${o.order_type === 'delivery' ? `showCashierActiveOrderDetail('${o.id}')` : `showFinanceOrderDetail('${encoded}')`}"><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">${time}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">#${o.id.slice(-5).toUpperCase()} (${getOrderTypeName(o.order_type)})${o.customer_name ? '<br><span style="font-size:10px">' + o.customer_name + '</span>' : ''}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">${menuList || '-'}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;text-align:right;color:var(--success)">${formatCurrency(ea)}</td></tr>`;
          }).join('')}</tbody>
          <tfoot><tr class="font-bold"><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent);text-align:right;color:var(--accent)">${formatCurrency(total)}</td></tr></tfoot>
        </table>
      </div>
    </div>`;
}

function renderManagerDigitalTable(dateVal) {
  var orders = DB.orders.filter(function(o) {
    if (o.payment_status !== 'paid' || (o.payment_method !== 'digital' && o.payment_method !== 'qris' && o.payment_method !== 'bank_transfer') || !o.created_at) return false;
    return new Date(o.created_at).toLocaleDateString('sv-SE') === dateVal;
  }).sort(function(a, b) { return new Date(b.created_at) - new Date(a.created_at); });
  var total = orders.reduce(function(s, o) { return s + effectiveAmount(o); }, 0);
  return `
    <div class="card mb-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-semibold text-sm">Detail Bayar Digital</h3>
        <button onclick="State.showManagerDigitalTable=false;render()" class="text-xs" style="color:var(--muted)"><i class="fas fa-times mr-1"></i>Tutup</button>
      </div>
      <div class="grid grid-cols-2 gap-3 mb-3">
        <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Total Digital</div><div class="text-base font-bold mt-1" style="color:var(--accent)">${formatCurrency(total)}</div></div>
        <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Jumlah Transaksi</div><div class="text-base font-bold mt-1">${orders.length}</div></div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm" style="border-collapse:collapse">
          <thead><tr style="color:var(--muted)"><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Jam</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Orders</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Menu</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:right">Total</th></tr></thead>
          <tbody>${orders.length === 0 ? '<tr><td style="padding:8px 10px;text-align:center;color:var(--muted)" colspan="4">Belum ada transaksi digital</td></tr>' : orders.map(function(o) {
            var ea = effectiveAmount(o);
            var time = o.created_at ? new Date(o.created_at).toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'}) : '-';
            var menuCount = {};
            (o.items || []).forEach(function(item) {
              var mi = DB.menuItems.find(function(m) { return m.id === item.menu_item_id; });
              if (mi) menuCount[mi.name] = (menuCount[mi.name] || 0) + item.quantity;
            });
            var menuList = Object.entries(menuCount).map(function(e) { return e[0] + ' x' + e[1]; }).join(', ');
            var payLabel = o.payment_method === 'qris' ? 'QRIS' : o.payment_method === 'bank_transfer' ? 'Transfer' : 'Digital';
            var encoded = encodeURIComponent(o.id);
            return `<tr class="cursor-pointer hover:bg-white/5" onclick="${o.order_type === 'delivery' ? `showCashierActiveOrderDetail('${o.id}')` : `showFinanceOrderDetail('${encoded}')`}"><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">${time}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">#${o.id.slice(-5).toUpperCase()} (${getOrderTypeName(o.order_type)})${o.customer_name ? '<br><span style="font-size:10px">' + o.customer_name + '</span>' : ''}<br><span style="font-size:10px;color:var(--accent)">${payLabel}</span></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">${menuList || '-'}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;text-align:right;color:var(--accent)">${formatCurrency(ea)}</td></tr>`;
          }).join('')}</tbody>
          <tfoot><tr class="font-bold"><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent);text-align:right;color:var(--accent)">${formatCurrency(total)}</td></tr></tfoot>
        </table>
      </div>
    </div>`;
}

async function renderManagerFinance() {
  try {
    showSkeleton('manager-finance', 'list');
    DB.orders = await API.getOrders();
    DB.stockItems = await API.getStock();
    var dateVal = State.managerFinanceDate || new Date().toLocaleDateString('sv-SE');
    var paidInRange = DB.orders.filter(function(o) {
      if (o.payment_status !== 'paid' || !o.created_at) return false;
      if (o.status === 'cancelled' || o.status === 'rejected') return false;
      var d = new Date(o.created_at).toLocaleDateString('sv-SE');
      return d === dateVal;
    });
    var cashInRange = paidInRange.filter(function(o) { return o.payment_method === 'cash' || o.payment_method === 'cod'; });
    var cashTotal = cashInRange.reduce(function(s, o) { return s + effectiveAmount(o); }, 0);
    var digitalInRange = paidInRange.filter(function(o) { return o.payment_method === 'digital' || o.payment_method === 'qris' || o.payment_method === 'bank_transfer'; });
    var digitalTotal = digitalInRange.reduce(function(s, o) { return s + effectiveAmount(o); }, 0);
    var unpaid = DB.orders.filter(function(o) {
      if (o.payment_status !== 'unpaid' || !o.created_at) return false;
      if (o.status === 'cancelled' || o.status === 'rejected') return false;
      var d = new Date(o.created_at).toLocaleDateString('sv-SE');
      return d === dateVal;
    });
    return `
    <div class="animate-fade-up">
      <h2 class="font-display text-xl font-bold mb-4">Laporan Keuangan</h2>
      <div class="mb-4">
        <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Filter Tanggal</label>
        <input type="date" id="manager-finance-date" class="input-field w-full" value="${dateVal}" onchange="State.managerFinanceDate=this.value;render()">
      </div>
      <div class="grid grid-cols-2 gap-3 mb-5">
        <div class="stat-card cursor-pointer" onclick="State.showManagerFinanceCash=!State.showManagerFinanceCash;render()">
          <div class="flex items-center gap-2"><i class="fas fa-money-bill-wave" style="color:var(--success);font-size:18px"></i><span class="text-xs" style="color:var(--muted)">Bayar Tunai</span></div>
          <div class="text-xl font-bold mt-1" style="color:var(--success)">${formatCurrency(cashTotal)}</div>
        </div>
        <div class="stat-card cursor-pointer" onclick="State.showManagerFinanceDigital=!State.showManagerFinanceDigital;render()">
          <div class="flex items-center gap-2"><i class="fas fa-credit-card" style="color:var(--accent);font-size:18px"></i><span class="text-xs" style="color:var(--muted)">Bayar Digital</span></div>
          <div class="text-xl font-bold mt-1" style="color:var(--accent)">${formatCurrency(digitalTotal)}</div>
        </div>
        <div class="stat-card">
          <div class="flex items-center gap-2"><i class="fas fa-check-circle" style="color:var(--success);font-size:18px"></i><span class="text-xs" style="color:var(--muted)">Lunas</span></div>
          <div class="text-xl font-bold mt-1" style="color:var(--success)">${paidInRange.length}</div>
        </div>
        <div class="stat-card">
          <div class="flex items-center gap-2"><i class="fas fa-exclamation-circle" style="color:var(--danger);font-size:18px"></i><span class="text-xs" style="color:var(--muted)">Belum Bayar</span></div>
          <div class="text-xl font-bold mt-1" style="color:var(--danger)">${unpaid.length}</div>
        </div>
      </div>
      ${State.showManagerFinanceCash ? renderManagerFinanceCashTable(dateVal) : ''}
      ${State.showManagerFinanceDigital ? renderManagerFinanceDigitalTable(dateVal) : ''}
      ${(function() {
        var lowStock = DB.stockItems.filter(function(s) { return s.current_quantity <= s.min_quantity; });
        if (!lowStock.length) return '';
        return `
      <div class="card mb-4" style="border-color:rgba(231,76,60,.3)">
        <h3 class="font-semibold text-sm mb-2" style="color:var(--danger)"><i class="fas fa-exclamation-triangle mr-1"></i>Peringatan Stok Rendah</h3>
        <div class="space-y-2">
          ${lowStock.map(function(s) { return `<div class="flex justify-between text-sm"><span>${s.name}</span><span style="color:var(--danger)">${s.current_quantity} / ${s.min_quantity} ${s.unit}</span></div>`; }).join('')}
        </div>
      </div>`})()}
      <div class="card mb-4">
        <h3 class="font-semibold text-sm mb-3">Pesanan Terkini</h3>
        <div class="space-y-2 max-h-64 overflow-y-auto">
          ${DB.orders.slice(0, 6).map(function(o) {
            var staffIcon = o.waiter_id && getUser(o.waiter_id) ? '<i class="fas fa-user-tie ml-2" style="color:var(--accent);font-size:10px"></i> ' + getUser(o.waiter_id).name : '';
            var courierIcon = o.courier_id && getUser(o.courier_id) ? '<i class="fas fa-motorcycle ml-2" style="color:var(--accent);font-size:10px"></i> ' + getUser(o.courier_id).name : '';
            return `
          <div class="flex items-center justify-between text-sm py-2.5 px-3 rounded-xl cursor-pointer hover:bg-white/5" style="border:1px solid var(--border)" onclick="${o.order_type === 'delivery' ? `showCashierActiveOrderDetail('${o.id}')` : `showFinanceOrderDetail('${encodeURIComponent(o.id)}')`}">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-1.5">
                <span class="font-medium text-xs">#${o.id.slice(-5).toUpperCase()}</span>
                <span class="badge ${getStatusBadge(o.status)}" style="font-size:8px">${getStatusLabel(o.status)}</span>
                ${o.promo_discount ? '<span class="text-[10px]" style="color:var(--success)"><i class="fas fa-tag"></i></span>' : ''}
              </div>
              <div class="text-[10px] truncate mt-0.5" style="color:var(--muted)">
                ${getOrderTypeName(o.order_type)}${o.customer_name ? ' — ' + o.customer_name : ''}${o.user_id && o.user_id !== 'walk-in' && getUser(o.user_id) ? ' (' + getUser(o.user_id).email + ')' : ''}${staffIcon}${courierIcon}
              </div>
            </div>
            <span class="font-semibold text-xs whitespace-nowrap ml-3" style="color:${o.payment_status === 'paid' ? 'var(--success)' : 'var(--muted)'}">${formatCurrency(effectiveAmount(o))}</span>
          </div>`;}).join('')}
        </div>
      </div>
      <div class="card"><canvas id="chart-cashier" height="200"></canvas></div>
    </div>`;
  } catch(e) { console.error(e); showToast('Gagal memuat keuangan', 'error'); return ''; }
  finally { hideSkeleton('manager-finance'); }
}

function renderManagerFinanceCashTable(dateVal) {
  var orders = DB.orders.filter(function(o) {
    if (o.payment_status !== 'paid' || (o.payment_method !== 'cash' && o.payment_method !== 'cod') || !o.created_at) return false;
    var d = new Date(o.created_at).toLocaleDateString('sv-SE');
    return d === dateVal;
  }).sort(function(a, b) { return new Date(b.created_at) - new Date(a.created_at); });
  var total = orders.reduce(function(s, o) { return s + effectiveAmount(o); }, 0);
  return `
    <div class="card mb-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-semibold text-sm">Detail Bayar Tunai</h3>
        <button onclick="State.showManagerFinanceCash=false;render()" class="text-xs" style="color:var(--muted)"><i class="fas fa-times mr-1"></i>Tutup</button>
      </div>
      <div class="grid grid-cols-2 gap-3 mb-3">
        <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Total Tunai</div><div class="text-base font-bold mt-1" style="color:var(--success)">${formatCurrency(total)}</div></div>
        <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Jumlah Transaksi</div><div class="text-base font-bold mt-1">${orders.length}</div></div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm" style="border-collapse:collapse">
          <thead><tr style="color:var(--muted)">
            <th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Tanggal</th>
            <th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Jam</th>
            <th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Orders</th>
            <th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Menu</th>
            <th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:right">Total</th>
          </tr></thead>
          <tbody>${orders.length === 0 ? '<tr><td style="padding:8px 10px;text-align:center;color:var(--muted)" colspan="5">Belum ada transaksi tunai</td></tr>' : orders.map(function(o) {
            var ea = effectiveAmount(o);
            var date = o.created_at ? new Date(o.created_at).toLocaleDateString('sv-SE') : '';
            var time = o.created_at ? new Date(o.created_at).toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'}) : '-';
            var menuCount = {};
            (o.items || []).forEach(function(item) {
              var mi = DB.menuItems.find(function(m) { return m.id === item.menu_item_id; });
              if (mi) menuCount[mi.name] = (menuCount[mi.name] || 0) + item.quantity;
            });
            var menuList = Object.entries(menuCount).map(function(e) { return e[0] + ' x' + e[1]; }).join(', ');
            var encoded = encodeURIComponent(o.id);
            return `<tr class="cursor-pointer hover:bg-white/5" onclick="${o.order_type === 'delivery' ? `showCashierActiveOrderDetail('${o.id}')` : `showFinanceOrderDetail('${encoded}')`}">
              <td style="border-bottom:1px solid var(--border);padding:8px 10px">${formatDate(date)}</td>
              <td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">${time}</td>
              <td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">#${o.id.slice(-5).toUpperCase()} (${getOrderTypeName(o.order_type)})${o.customer_name ? '<br><span style="font-size:10px">' + o.customer_name + '</span>' : ''}</td>
              <td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">${menuList || '-'}</td>
              <td style="border-bottom:1px solid var(--border);padding:8px 10px;text-align:right;color:var(--success)">${formatCurrency(ea)}</td>
            </tr>`;
          }).join('')}</tbody>
          <tfoot><tr class="font-bold">
            <td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)">Total</td>
            <td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td>
            <td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td>
            <td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td>
            <td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent);text-align:right;color:var(--accent)">${formatCurrency(total)}</td>
          </tr></tfoot>
        </table>
      </div>
    </div>`;
}

function renderManagerFinanceDigitalTable(dateVal) {
  var orders = DB.orders.filter(function(o) {
    if (o.payment_status !== 'paid' || (o.payment_method !== 'digital' && o.payment_method !== 'qris' && o.payment_method !== 'bank_transfer') || !o.created_at) return false;
    var d = new Date(o.created_at).toLocaleDateString('sv-SE');
    return d === dateVal;
  }).sort(function(a, b) { return new Date(b.created_at) - new Date(a.created_at); });
  var total = orders.reduce(function(s, o) { return s + effectiveAmount(o); }, 0);
  return `
    <div class="card mb-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-semibold text-sm">Detail Bayar Digital</h3>
        <button onclick="State.showManagerFinanceDigital=false;render()" class="text-xs" style="color:var(--muted)"><i class="fas fa-times mr-1"></i>Tutup</button>
      </div>
      <div class="grid grid-cols-2 gap-3 mb-3">
        <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Total Digital</div><div class="text-base font-bold mt-1" style="color:var(--accent)">${formatCurrency(total)}</div></div>
        <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Jumlah Transaksi</div><div class="text-base font-bold mt-1">${orders.length}</div></div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm" style="border-collapse:collapse">
          <thead><tr style="color:var(--muted)">
            <th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Tanggal</th>
            <th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Jam</th>
            <th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Orders</th>
            <th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Menu</th>
            <th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:right">Total</th>
          </tr></thead>
          <tbody>${orders.length === 0 ? '<tr><td style="padding:8px 10px;text-align:center;color:var(--muted)" colspan="5">Belum ada transaksi digital</td></tr>' : orders.map(function(o) {
            var ea = effectiveAmount(o);
            var date = o.created_at ? new Date(o.created_at).toLocaleDateString('sv-SE') : '';
            var time = o.created_at ? new Date(o.created_at).toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'}) : '-';
            var menuCount = {};
            (o.items || []).forEach(function(item) {
              var mi = DB.menuItems.find(function(m) { return m.id === item.menu_item_id; });
              if (mi) menuCount[mi.name] = (menuCount[mi.name] || 0) + item.quantity;
            });
            var menuList = Object.entries(menuCount).map(function(e) { return e[0] + ' x' + e[1]; }).join(', ');
            var encoded = encodeURIComponent(o.id);
            var payLabel = o.payment_method === 'qris' ? 'QRIS' : o.payment_method === 'bank_transfer' ? 'Transfer' : 'Digital';
            return `<tr class="cursor-pointer hover:bg-white/5" onclick="${o.order_type === 'delivery' ? `showCashierActiveOrderDetail('${o.id}')` : `showFinanceOrderDetail('${encoded}')`}">
              <td style="border-bottom:1px solid var(--border);padding:8px 10px">${formatDate(date)}</td>
              <td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">${time}</td>
              <td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">#${o.id.slice(-5).toUpperCase()} (${getOrderTypeName(o.order_type)})${o.customer_name ? '<br><span style="font-size:10px">' + o.customer_name + '</span>' : ''}<br><span style="font-size:10px;color:var(--accent)">${payLabel}</span></td>
              <td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">${menuList || '-'}</td>
              <td style="border-bottom:1px solid var(--border);padding:8px 10px;text-align:right;color:var(--accent)">${formatCurrency(ea)}</td>
            </tr>`;
          }).join('')}</tbody>
          <tfoot><tr class="font-bold">
            <td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)">Total</td>
            <td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td>
            <td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td>
            <td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td>
            <td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent);text-align:right;color:var(--accent)">${formatCurrency(total)}</td>
          </tr></tfoot>
        </table>
      </div>
    </div>`;
}

async function renderManagerDashboard() {
  try {
    showSkeleton('manager-dashboard', 'list');
    DB.orders = await API.getOrders();
    DB.playgroundTickets = await API.getPlaygroundTickets();
    DB.attendances = await API.getAttendances();
    DB.stockItems = await API.getStock();
    DB.menuItems = await API.getMenu();
    DB.tables = await API.getTables();
    DB.users = await API.getUsers();
    DB.pgStockItems = await API.getPgStock();
    if (!isCheckedIn()) {
      return `
      <div class="animate-fade-up">
        <div class="card text-center py-6" style="border-color:rgba(231,76,60,.2)">
          <i class="fas fa-gauge-high text-3xl mb-2" style="color:var(--danger)"></i>
          <p class="text-sm font-semibold mb-1" style="color:var(--danger)">Belum Check-in Hari Ini</p>
          <p class="text-xs mb-3" style="color:var(--muted)">Lakukan check-in di profil sebelum melihat dashboard</p>
          <button onclick="showGeoAttendanceModal()" class="btn-primary text-sm px-5 py-2" style="font-size:13px">
            <i class="fas fa-clock mr-1"></i>Check-in
          </button>
        </div>
      </div>`;
    }
    var activeOrders = DB.orders.filter(function(o) { return !['completed', 'cancelled'].includes(o.status); }).length;
    var activePgTickets = (DB.playgroundTickets || []).filter(function(t) { return t.status === 'active'; }).length;
    var activeEmployees = DB.attendances.filter(function(a) { return !a.check_out; }).length;
    var lowStock = DB.stockItems.filter(function(s) { return s.current_quantity <= s.min_quantity; });
    var prodCount = {};
    DB.orders.filter(function(o) { return o.payment_status === 'paid'; }).forEach(function(o) {
      (o.items || []).forEach(function(item) {
        var mi = DB.menuItems.find(function(m) { return m.id === item.menu_item_id; });
        if (mi) prodCount[mi.name] = (prodCount[mi.name] || 0) + item.quantity;
      });
    });
    var topProducts = Object.entries(prodCount).sort(function(a, b) { return b[1] - a[1]; }).slice(0, 5);
    var maxQty = topProducts.length ? topProducts[0][1] : 0;
    return `
    <div class="animate-fade-up">
      <div class="mb-6">
        <h2 class="font-display text-2xl font-bold mb-1">Dashboard</h2>
        <p class="text-sm" style="color:var(--muted)">Ringkasan operasional ARQA Coffee</p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div class="stat-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="showActiveLayananModal('manager')"><div class="text-xs" style="color:var(--muted)">Layanan Aktif</div><div class="text-lg font-bold mt-1" style="color:var(--warning)">${activeOrders + activePgTickets}</div></div>
        <div class="stat-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="State.currentTab.manager='attendance';render()"><div class="text-xs" style="color:var(--muted)">Pegawai Aktif</div><div class="text-lg font-bold mt-1" style="color:var(--success)">${activeEmployees}</div></div>
        <div class="stat-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="switchTab('menu-mgmt')"><div class="text-xs" style="color:var(--muted)">Total Menu</div><div class="text-lg font-bold mt-1">${DB.menuItems.length}</div></div>
        <div class="stat-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="switchTab('users')"><div class="text-xs" style="color:var(--muted)">Pengguna</div><div class="text-lg font-bold mt-1">${DB.users.length}</div></div>
      </div>
      ${(function() {
        var lowPgStock = (DB.pgStockItems || []).filter(function(s) { return s.current_quantity <= s.min_quantity; });
        var allLow = [
          ...lowStock.map(function(s) { return { ...s, source: 'Cafe' }; }),
          ...lowPgStock.map(function(s) { return { ...s, source: 'Playground' }; }),
        ];
        if (!allLow.length) return '';
        return `
      <div class="card mb-4" style="border-color:rgba(231,76,60,.3)">
        <h3 class="font-semibold text-sm mb-2" style="color:var(--danger)"><i class="fas fa-exclamation-triangle mr-1"></i>Peringatan Stok Rendah</h3>
        <div class="space-y-2">
          ${allLow.map(function(s) { return `<div class="flex justify-between text-sm"><span>${s.name} <span class="text-[10px] px-1.5 py-0.5 rounded" style="background:${s.source === 'Cafe' ? 'rgba(224,122,58,.15)' : 'rgba(142,68,173,.15)'};color:${s.source === 'Cafe' ? 'var(--accent)' : '#8e44ad'}">${s.source}</span></span><span style="color:var(--danger)">${s.current_quantity} / ${s.min_quantity} ${s.unit}</span></div>`; }).join('')}
        </div>
        <button onclick="showPilihStokModal()" class="text-xs font-bold mt-2 flex items-center gap-1" style="color:var(--accent)">Selengkapnya <i class="fas fa-arrow-right" style="font-size:10px"></i></button>
      </div>`})()}
      ${(function() {
        var now = Date.now();
        var overtimeTickets = (DB.playgroundTickets || [])
          .filter(function(t) { return t.status === 'active' && new Date(t.end_time).getTime() <= now; });
        if (!overtimeTickets.length) return '';
        return `
      <div class="card mb-4" style="border-color:rgba(231,76,60,.3)">
        <h3 class="font-semibold text-sm mb-2" style="color:var(--danger)"><i class="fas fa-hourglass-end mr-1"></i>Peringatan Over Time</h3>
        <div class="space-y-3">
          ${overtimeTickets.map(function(t) {
            var start = new Date(t.start_time).getTime();
            var end = new Date(t.end_time).getTime();
            var total = end - start;
            var elapsed = Math.min(100, ((now - start) / total) * 100);
            var overdue = Math.round((now - end) / 60000);
            var h = Math.floor(overdue / 60), m = overdue % 60;
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
        <button onclick="State.currentTab.manager='active-playground';render()" class="text-xs font-bold mt-2 flex items-center gap-1" style="color:var(--accent)">Selengkapnya <i class="fas fa-arrow-right" style="font-size:10px"></i></button>
      </div>`})()}
      <div class="card mb-6">
        <h3 class="font-semibold text-sm mb-3">Pesanan Terkini</h3>
          <div class="space-y-2 max-h-64 overflow-y-auto">
            ${DB.orders.slice(0, 6).map(function(o) {
              var staffIcon = o.waiter_id && getUser(o.waiter_id) ? '<i class="fas fa-user-tie ml-2" style="color:var(--accent);font-size:10px"></i> ' + getUser(o.waiter_id).name : '';
              var courierIcon = o.courier_id && getUser(o.courier_id) ? '<i class="fas fa-motorcycle ml-2" style="color:var(--accent);font-size:10px"></i> ' + getUser(o.courier_id).name : '';
              return `
            <div class="flex items-center justify-between text-sm py-2.5 px-3 rounded-xl cursor-pointer hover:bg-white/5" style="border:1px solid var(--border)" onclick="${o.order_type === 'delivery' ? `showCashierActiveOrderDetail('${o.id}')` : `showFinanceOrderDetail('${encodeURIComponent(o.id)}')`}">
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-1.5">
                  <span class="font-medium text-xs">#${o.id.slice(-5).toUpperCase()}</span>
                  <span class="badge ${getStatusBadge(o.status)}" style="font-size:8px">${getStatusLabel(o.status)}</span>
                  ${o.promo_discount ? '<span class="text-[10px]" style="color:var(--success)"><i class="fas fa-tag"></i></span>' : ''}
                </div>
                <div class="text-[10px] truncate mt-0.5" style="color:var(--muted)">
                  ${getOrderTypeName(o.order_type)}${o.customer_name ? ' — ' + o.customer_name : ''}${o.user_id && o.user_id !== 'walk-in' && getUser(o.user_id) ? ' (' + getUser(o.user_id).email + ')' : ''}${staffIcon}${courierIcon}
                </div>
              </div>
              <span class="font-semibold text-xs whitespace-nowrap ml-3" style="color:${o.payment_status === 'paid' ? 'var(--success)' : 'var(--muted)'}">${formatCurrency(effectiveAmount(o))}</span>
            </div>`;
            }).join('')}
          </div>
          <button onclick="State.currentTab.manager='finance';render()" class="text-xs font-bold mt-2 flex items-center gap-1" style="color:var(--accent)">Selengkapnya <i class="fas fa-arrow-right" style="font-size:10px"></i></button>
        </div>
      <div class="grid md:grid-cols-2 gap-4 mb-6">
        <div class="card">
          <h3 class="font-semibold text-sm mb-3">Produk Terlaris</h3>
          ${topProducts.length ? `
          <div class="space-y-3">
            ${topProducts.map(function(e, i) {
              var name = e[0], qty = e[1];
              var pct = maxQty > 0 ? Math.round(qty / maxQty * 100) : 0;
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
          ${DB.tables.map(function(t) { return `
          <div class="text-center py-3 rounded-xl cursor-pointer hover:scale-[1.05] transition-transform" style="background:${t.status === 'available' ? 'rgba(39,174,96,.1)' : 'rgba(231,76,60,.1)'}" onclick="showTableDetail('${t.id}')">
            <i class="fas fa-chair mb-1" style="color:${t.status === 'available' ? 'var(--success)' : 'var(--danger)'}"></i>
            <div class="text-xs font-semibold">${t.number}</div>
          </div>`; }).join('')}
        </div>
      </div>
    </div>
    </div>`;
  } catch(e) { console.error(e); showToast('Gagal memuat dashboard', 'error'); return ''; }
  finally { hideSkeleton('manager-dashboard'); }
}

async function renderManagerUsers() {
  try {
    showSkeleton('manager-users', 'list');
    DB.users = await API.getUsers();
    if (!State.managerRoleFilter) State.managerRoleFilter = '';
    var roleChips = [
      { id: '', label: 'Semua' },
      { id: 'manager', label: 'Manager' },
      { id: 'cashier', label: 'Kasir' },
      { id: 'kitchen', label: 'Juru Masak' },
      { id: 'courier', label: 'Kurir' },
      { id: 'waiter', label: 'Waiters' },
      { id: 'customer', label: 'Pelanggan' },
    ];
    var base = DB.users.filter(function(u) { return u.role !== 'admin'; });
    var filtered = base.filter(function(u) { return !State.managerRoleFilter || u.role === State.managerRoleFilter; });
    return `
    <div class="animate-fade-up">
      <div class="flex justify-between items-center mb-4">
        <h2 class="font-display text-xl font-bold">Kelola Pengguna</h2>
        <button onclick="showAddUserModal()" class="btn-primary btn-sm"><i class="fas fa-plus mr-1"></i>Tambah</button>
      </div>
      <div class="flex gap-2 mb-4 overflow-x-auto pb-2" style="-webkit-overflow-scrolling:touch;scrollbar-width:none;">
        ${roleChips.map(function(c) { return `<div class="category-chip ${State.managerRoleFilter === c.id ? 'active' : ''}" onclick="State.managerRoleFilter='${c.id}';render()">${c.label}</div>`; }).join('')}
      </div>
      <div class="space-y-3">
        ${filtered.map(function(u) { return `
        <div class="card flex items-center gap-4">
          <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold" style="background:var(--accent);color:#fff">${u.avatar}</div>
          <div class="flex-1">
            <div class="font-semibold text-sm">${u.name}</div>
            <div class="text-xs" style="color:var(--muted)">${u.email} — ${u.phone || '-'}</div>
          </div>
          <span class="badge ${u.role === 'manager' ? 'badge-delivering' : u.role === 'cashier' ? 'badge-ready' : u.role === 'kitchen' ? 'badge-cooking' : u.role === 'waiter' ? 'badge-cooking' : 'badge-pending'}">${getRoleLabel(u.role)}</span>
          <div class="flex gap-1">
            <button onclick="showEditUserManagerModal('${u.id}')" class="btn-sm" style="background:rgba(224,122,58,.12);color:var(--accent);border:none;padding:4px 8px;border-radius:6px;cursor:pointer;font-size:11px"><i class="fas fa-pen"></i></button>
            <button onclick="deleteUserManager('${u.id}')" class="btn-sm" style="background:rgba(231,76,60,.12);color:var(--danger);border:none;padding:4px 8px;border-radius:6px;cursor:pointer;font-size:11px"><i class="fas fa-trash"></i></button>
          </div>
        </div>`; }).join('')}
      </div>
    </div>`;
  } catch(e) { console.error(e); showToast('Gagal memuat pengguna', 'error'); return ''; }
  finally { hideSkeleton('manager-users'); }
}

function showEditUserManagerModal(id) {
  var u = DB.users.find(function(x) { return x.id === id; });
  if (!u || u.role === 'admin') { showToast('Tidak dapat mengedit admin', 'warning'); return; }
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Edit Pengguna</h3>
      <div class="space-y-3">
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Nama</label><input id="edit-user-name" class="input-field text-sm" value="${u.name}"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Email</label><input id="edit-user-email" class="input-field text-sm" value="${u.email}"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Telepon</label><input id="edit-user-phone" class="input-field text-sm" value="${u.phone || ''}"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Password <span class="text-[10px]" style="color:var(--muted)">(kosongkan jika tidak diubah)</span></label><input id="edit-user-pass" type="password" class="input-field text-sm" placeholder="Password baru"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Peran</label>
          <select id="edit-user-role" class="input-field text-sm">
            <option value="manager" ${u.role === 'manager' ? 'selected' : ''}>Manager</option>
            <option value="cashier" ${u.role === 'cashier' ? 'selected' : ''}>Kasir</option>
            <option value="kitchen" ${u.role === 'kitchen' ? 'selected' : ''}>Juru Masak</option>
            <option value="courier" ${u.role === 'courier' ? 'selected' : ''}>Kurir</option>
            <option value="waiter" ${u.role === 'waiter' ? 'selected' : ''}>Waiters</option>
            <option value="customer" ${u.role === 'customer' ? 'selected' : ''}>Pelanggan</option>
          </select>
        </div>
      </div>
      <div class="flex gap-2 mt-4">
        <button onclick="deleteUserManager('${u.id}')" class="btn-sm flex-1 text-center" style="background:rgba(231,76,60,.15);color:var(--danger);border:1px solid rgba(231,76,60,.3);border-radius:10px;padding:10px"><i class="fas fa-trash mr-1"></i>Hapus</button>
        <button onclick="saveEditUserManager('${u.id}')" class="btn-primary flex-1 text-center">Simpan</button>
      </div>
    </div>
  `);
}

async function saveEditUserManager(id) {
  try {
    var btn = document.querySelector('#modal-content .btn-primary');
    if (btn) showBtnSpinner(btn);
    var u = DB.users.find(function(x) { return x.id === id; });
    if (!u || u.role === 'admin') { showToast('Tidak dapat mengedit admin', 'warning'); return; }
    var name = document.getElementById('edit-user-name')?.value;
    var email = document.getElementById('edit-user-email')?.value;
    var phone = document.getElementById('edit-user-phone')?.value;
    var pass = document.getElementById('edit-user-pass')?.value;
    var role = document.getElementById('edit-user-role')?.value;
    if (!name || !email) { showToast('Nama dan email wajib diisi', 'warning'); return; }
    var updateData = { name: name, email: email, phone: phone, role: role, avatar: name[0].toUpperCase() };
    if (pass) updateData.password = pass;
    await API.updateUser(id, updateData);
    closeModal(); showToast('Pengguna berhasil diperbarui', 'success'); render();
  } catch(e) { console.error(e); showToast('Gagal menyimpan pengguna', 'error'); }
  finally { var btn2 = document.querySelector('#modal-content .btn-primary'); if (btn2) hideBtnSpinner(btn2); }
}

function deleteUserManager(id) {
  var u = DB.users.find(function(x) { return x.id === id; });
  if (!u) return;
  if (u.role === 'admin') { showToast('Tidak dapat menghapus admin', 'warning'); return; }
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Konfirmasi Hapus</h3>
      <p class="text-sm mb-4">Hapus pengguna "${u.name}"? Tindakan ini tidak dapat dibatalkan.</p>
      <div class="flex gap-2">
        <button onclick="closeModal()" class="btn-sm flex-1 text-center" style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:10px;cursor:pointer">Batal</button>
        <button onclick="confirmDeleteUserManager('${id}')" class="btn-sm flex-1 text-center" style="background:rgba(231,76,60,.15);color:var(--danger);border:1px solid rgba(231,76,60,.3);border-radius:10px;padding:10px;cursor:pointer"><i class="fas fa-trash mr-1"></i>Hapus</button>
      </div>
    </div>
  `);
}

async function confirmDeleteUserManager(id) {
  try {
    var btn = document.querySelector('#modal-content button[onclick*="confirmDeleteUserManager"]');
    if (btn) showBtnSpinner(btn);
    await API.deleteUser(id);
    closeModal(); showToast('Pengguna dihapus', 'info'); render();
  } catch(e) { console.error(e); showToast('Gagal menghapus pengguna', 'error'); }
  finally { var btn2 = document.querySelector('#modal-content button[onclick*="confirmDeleteUserManager"]'); if (btn2) hideBtnSpinner(btn2); }
}
