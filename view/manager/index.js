// ============================================================
// MANAGER VIEW — Dashboard & Users
// ============================================================
function renderManagerView() {
  const tab = State.currentTab.manager || 'dashboard';
  if (tab === 'dashboard') return renderManagerDashboard();
  if (tab === 'report') return renderManagerReport();
  if (tab === 'finance') return renderManagerFinance();
  if (tab === 'stock') return renderStockManagement();
  if (tab === 'pg-stock') return renderPlaygroundPgStock();
  if (tab === 'expenses') return renderExpenseManagement();
  if (tab === 'active-orders') return renderActiveOrders();
  if (tab === 'active-playground') return renderActivePlaygroundTickets();
  if (tab === 'tarif-kurir') return renderTarifKurir();
  if (tab === 'tarif-mitra') return renderTarifMitra();
  if (tab === 'tarif-pelanggan') return renderTarifPelanggan();
  if (tab === 'attendance') return renderAttendance();
  if (tab === 'promos') return renderAdminPromos();
  if (tab === 'tables-mgmt') return renderAdminTablesMgmt();
  if (tab === 'menu-mgmt') return renderAdminMenuMgmt();
  if (tab === 'users') return renderManagerUsers();
  if (tab === 'profile') return renderGenericProfile();
  return renderManagerDashboard();
}

function renderManagerReport() {
  const dateVal = State.managerReportDate || new Date().toLocaleDateString('sv-SE');
  const paidInRange = DB.orders.filter(o => {
    if (o.payment_status !== 'paid' || !o.created_at) return false;
    const d = new Date(o.created_at).toLocaleDateString('sv-SE');
    return d === dateVal;
  });
  const cashInRange = paidInRange.filter(o => o.payment_method === 'cash' || o.payment_method === 'cod');
  const cashTotal = cashInRange.reduce((s, o) => s + (o.total_amount || 0), 0);
  const digitalInRange = paidInRange.filter(o => o.payment_method === 'digital' || o.payment_method === 'qris' || o.payment_method === 'bank_transfer');
  const digitalTotal = digitalInRange.reduce((s, o) => s + (o.total_amount || 0), 0);
  const unpaidOrders = DB.orders.filter(o => o.status !== 'cancelled' && o.status !== 'rejected' && o.payment_status === 'unpaid' && (!o.created_at || new Date(o.created_at).toLocaleDateString('sv-SE') === dateVal));
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
        ${DB.orders.slice(0, 6).map(o => `
        <div class="flex justify-between items-center text-sm py-2 border-b" style="border-color:var(--border)">
          <div><span class="font-medium">#${o.id.slice(-5).toUpperCase()}</span><span class="badge ${getStatusBadge(o.status)} ml-2">${getStatusLabel(o.status)}</span>${o.promo_discount ? '<span class="text-[10px] ml-1" style="color:var(--success)"><i class="fas fa-tag"></i></span>' : ''}${o.customer_name ? '<span class="text-[10px] ml-1" style="color:var(--muted)">— ' + o.customer_name + '</span>' : ''}</div>
          <span>${formatCurrency(o.total_amount)}</span>
        </div>`).join('')}
      </div>
    </div>
  </div>`;
}

function renderManagerCashTable(dateVal) {
  const orders = DB.orders.filter(o => {
    if (o.payment_status !== 'paid' || (o.payment_method !== 'cash' && o.payment_method !== 'cod') || !o.created_at) return false;
    return new Date(o.created_at).toLocaleDateString('sv-SE') === dateVal;
  }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const total = orders.reduce((s, o) => s + (o.total_amount || 0), 0);
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
          <tbody>${orders.length === 0 ? '<tr><td style="padding:8px 10px;text-align:center;color:var(--muted)" colspan="4">Belum ada transaksi tunai</td></tr>' : orders.map(o => {
            const time = o.created_at ? new Date(o.created_at).toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'}) : '-';
            const menuCount = {};
            (o.items || []).forEach(item => {
              const mi = DB.menuItems.find(m => m.id === item.menu_item_id);
              if (mi) menuCount[mi.name] = (menuCount[mi.name] || 0) + item.quantity;
            });
            const menuList = Object.entries(menuCount).map(([name, qty]) => name + ' x' + qty).join(', ');
            return `<tr><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">${time}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">#${o.id.slice(-5).toUpperCase()} (${getOrderTypeName(o.order_type)})${o.customer_name ? '<br><span style="font-size:10px">' + o.customer_name + '</span>' : ''}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">${menuList || '-'}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;text-align:right;color:var(--success)">${formatCurrency(o.total_amount || 0)}</td></tr>`;
          }).join('')}</tbody>
          <tfoot><tr class="font-bold"><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent);text-align:right;color:var(--accent)">${formatCurrency(total)}</td></tr></tfoot>
        </table>
      </div>
    </div>`;
}

function renderManagerDigitalTable(dateVal) {
  const orders = DB.orders.filter(o => {
    if (o.payment_status !== 'paid' || (o.payment_method !== 'digital' && o.payment_method !== 'qris' && o.payment_method !== 'bank_transfer') || !o.created_at) return false;
    return new Date(o.created_at).toLocaleDateString('sv-SE') === dateVal;
  }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const total = orders.reduce((s, o) => s + (o.total_amount || 0), 0);
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
          <tbody>${orders.length === 0 ? '<tr><td style="padding:8px 10px;text-align:center;color:var(--muted)" colspan="4">Belum ada transaksi digital</td></tr>' : orders.map(o => {
            const time = o.created_at ? new Date(o.created_at).toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'}) : '-';
            const menuCount = {};
            (o.items || []).forEach(item => {
              const mi = DB.menuItems.find(m => m.id === item.menu_item_id);
              if (mi) menuCount[mi.name] = (menuCount[mi.name] || 0) + item.quantity;
            });
            const menuList = Object.entries(menuCount).map(([name, qty]) => name + ' x' + qty).join(', ');
            const payLabel = o.payment_method === 'qris' ? 'QRIS' : o.payment_method === 'bank_transfer' ? 'Transfer' : 'Digital';
            return `<tr><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">${time}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">#${o.id.slice(-5).toUpperCase()} (${getOrderTypeName(o.order_type)})${o.customer_name ? '<br><span style="font-size:10px">' + o.customer_name + '</span>' : ''}<br><span style="font-size:10px;color:var(--accent)">${payLabel}</span></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">${menuList || '-'}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;text-align:right;color:var(--accent)">${formatCurrency(o.total_amount || 0)}</td></tr>`;
          }).join('')}</tbody>
          <tfoot><tr class="font-bold"><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent);text-align:right;color:var(--accent)">${formatCurrency(total)}</td></tr></tfoot>
        </table>
      </div>
    </div>`;
}

function renderManagerFinance() {
  const dateVal = State.managerFinanceDate || new Date().toLocaleDateString('sv-SE');
  const paidInRange = DB.orders.filter(o => {
    if (o.payment_status !== 'paid' || !o.created_at) return false;
    const d = new Date(o.created_at).toLocaleDateString('sv-SE');
    return d === dateVal;
  });
  const cashInRange = paidInRange.filter(o => o.payment_method === 'cash' || o.payment_method === 'cod');
  const cashTotal = cashInRange.reduce((s, o) => s + (o.total_amount || 0), 0);
  const digitalInRange = paidInRange.filter(o => o.payment_method === 'digital' || o.payment_method === 'qris' || o.payment_method === 'bank_transfer');
  const digitalTotal = digitalInRange.reduce((s, o) => s + (o.total_amount || 0), 0);
  const unpaid = DB.orders.filter(o => {
    if (o.payment_status !== 'unpaid' || !o.created_at) return false;
    if (o.status === 'cancelled' || o.status === 'rejected') return false;
    const d = new Date(o.created_at).toLocaleDateString('sv-SE');
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
    ${(() => {
      const lowStock = DB.stockItems.filter(s => s.current_quantity <= s.min_quantity);
      if (!lowStock.length) return '';
      return `
    <div class="card mb-4" style="border-color:rgba(231,76,60,.3)">
      <h3 class="font-semibold text-sm mb-2" style="color:var(--danger)"><i class="fas fa-exclamation-triangle mr-1"></i>Peringatan Stok Rendah</h3>
      <div class="space-y-2">
        ${lowStock.map(s => `<div class="flex justify-between text-sm"><span>${s.name}</span><span style="color:var(--danger)">${s.current_quantity} / ${s.min_quantity} ${s.unit}</span></div>`).join('')}
      </div>
    </div>`})()}
    <div class="card mb-4">
      <h3 class="font-semibold text-sm mb-3">Pesanan Terkini</h3>
      <div class="space-y-2 max-h-64 overflow-y-auto">
        ${DB.orders.slice(0, 6).map(o => `
        <div class="flex justify-between items-center text-sm py-2 border-b" style="border-color:var(--border)">
          <div><span class="font-medium">#${o.id.slice(-5).toUpperCase()}</span><span class="badge ${getStatusBadge(o.status)} ml-2">${getStatusLabel(o.status)}</span>${o.promo_discount ? '<span class="text-[10px] ml-1" style="color:var(--success)"><i class="fas fa-tag"></i></span>' : ''}${o.customer_name ? '<span class="text-[10px] ml-1" style="color:var(--muted)">— ' + o.customer_name + '</span>' : ''}</div>
          <span>${formatCurrency(o.total_amount)}</span>
        </div>`).join('')}
      </div>
    </div>
    <div class="card"><canvas id="chart-cashier" height="200"></canvas></div>
  </div>`;
}

function renderManagerFinanceCashTable(dateVal) {
  const orders = DB.orders.filter(o => {
    if (o.payment_status !== 'paid' || (o.payment_method !== 'cash' && o.payment_method !== 'cod') || !o.created_at) return false;
    const d = new Date(o.created_at).toLocaleDateString('sv-SE');
    return d === dateVal;
  }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const total = orders.reduce((s, o) => s + (o.total_amount || 0), 0);
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
          <tbody>${orders.length === 0 ? '<tr><td style="padding:8px 10px;text-align:center;color:var(--muted)" colspan="5">Belum ada transaksi tunai</td></tr>' : orders.map(o => {
            const date = o.created_at ? new Date(o.created_at).toLocaleDateString('sv-SE') : '';
            const time = o.created_at ? new Date(o.created_at).toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'}) : '-';
            const menuCount = {};
            (o.items || []).forEach(item => {
              const mi = DB.menuItems.find(m => m.id === item.menu_item_id);
              if (mi) menuCount[mi.name] = (menuCount[mi.name] || 0) + item.quantity;
            });
            const menuList = Object.entries(menuCount).map(([name, qty]) => name + ' x' + qty).join(', ');
            const encoded = encodeURIComponent(o.id);
            return `<tr class="cursor-pointer hover:bg-white/5" onclick="showFinanceOrderDetail('${encoded}')">
              <td style="border-bottom:1px solid var(--border);padding:8px 10px">${formatDate(date)}</td>
              <td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">${time}</td>
              <td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">#${o.id.slice(-5).toUpperCase()} (${getOrderTypeName(o.order_type)})${o.customer_name ? '<br><span style="font-size:10px">' + o.customer_name + '</span>' : ''}</td>
              <td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">${menuList || '-'}</td>
              <td style="border-bottom:1px solid var(--border);padding:8px 10px;text-align:right;color:var(--success)">${formatCurrency(o.total_amount || 0)}</td>
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
  const orders = DB.orders.filter(o => {
    if (o.payment_status !== 'paid' || (o.payment_method !== 'digital' && o.payment_method !== 'qris' && o.payment_method !== 'bank_transfer') || !o.created_at) return false;
    const d = new Date(o.created_at).toLocaleDateString('sv-SE');
    return d === dateVal;
  }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const total = orders.reduce((s, o) => s + (o.total_amount || 0), 0);
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
          <tbody>${orders.length === 0 ? '<tr><td style="padding:8px 10px;text-align:center;color:var(--muted)" colspan="5">Belum ada transaksi digital</td></tr>' : orders.map(o => {
            const date = o.created_at ? new Date(o.created_at).toLocaleDateString('sv-SE') : '';
            const time = o.created_at ? new Date(o.created_at).toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'}) : '-';
            const menuCount = {};
            (o.items || []).forEach(item => {
              const mi = DB.menuItems.find(m => m.id === item.menu_item_id);
              if (mi) menuCount[mi.name] = (menuCount[mi.name] || 0) + item.quantity;
            });
            const menuList = Object.entries(menuCount).map(([name, qty]) => name + ' x' + qty).join(', ');
            const encoded = encodeURIComponent(o.id);
            const payLabel = o.payment_method === 'qris' ? 'QRIS' : o.payment_method === 'bank_transfer' ? 'Transfer' : 'Digital';
            return `<tr class="cursor-pointer hover:bg-white/5" onclick="showFinanceOrderDetail('${encoded}')">
              <td style="border-bottom:1px solid var(--border);padding:8px 10px">${formatDate(date)}</td>
              <td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">${time}</td>
              <td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">#${o.id.slice(-5).toUpperCase()} (${getOrderTypeName(o.order_type)})${o.customer_name ? '<br><span style="font-size:10px">' + o.customer_name + '</span>' : ''}<br><span style="font-size:10px;color:var(--accent)">${payLabel}</span></td>
              <td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">${menuList || '-'}</td>
              <td style="border-bottom:1px solid var(--border);padding:8px 10px;text-align:right;color:var(--accent)">${formatCurrency(o.total_amount || 0)}</td>
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

function renderManagerDashboard() {
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
  const activeOrders = DB.orders.filter(o => !['completed', 'cancelled'].includes(o.status)).length;
  const activePgTickets = (DB.playgroundTickets || []).filter(t => t.status === 'active').length;
  const activeEmployees = DB.attendances.filter(a => !a.check_out).length;
  const lowStock = DB.stockItems.filter(s => s.current_quantity <= s.min_quantity);
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
      <h2 class="font-display text-2xl font-bold mb-1">Dashboard</h2>
      <p class="text-sm" style="color:var(--muted)">Ringkasan operasional ARQA Coffee</p>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      <div class="stat-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="showActiveLayananModal('manager')"><div class="text-xs" style="color:var(--muted)">Layanan Aktif</div><div class="text-lg font-bold mt-1" style="color:var(--warning)">${activeOrders + activePgTickets}</div></div>
      <div class="stat-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="State.currentTab.manager='attendance';render()"><div class="text-xs" style="color:var(--muted)">Pegawai Aktif</div><div class="text-lg font-bold mt-1" style="color:var(--success)">${activeEmployees}</div></div>
      <div class="stat-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="switchTab('menu-mgmt')"><div class="text-xs" style="color:var(--muted)">Total Menu</div><div class="text-lg font-bold mt-1">${DB.menuItems.length}</div></div>
      <div class="stat-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="switchTab('users')"><div class="text-xs" style="color:var(--muted)">Pengguna</div><div class="text-lg font-bold mt-1">${DB.users.length}</div></div>
    </div>
    ${(() => {
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
      <button onclick="State.currentTab.manager='active-playground';render()" class="text-xs font-bold mt-2 flex items-center gap-1" style="color:var(--accent)">Selengkapnya <i class="fas fa-arrow-right" style="font-size:10px"></i></button>
    </div>`})()}
    <div class="card mb-6">
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
        <button onclick="State.currentTab.manager='finance';render()" class="text-xs font-bold mt-2 flex items-center gap-1" style="color:var(--accent)">Selengkapnya <i class="fas fa-arrow-right" style="font-size:10px"></i></button>
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

function renderManagerUsers() {
  if (!State.managerRoleFilter) State.managerRoleFilter = '';
  const roleChips = [
    { id: '', label: 'Semua' },
    { id: 'manager', label: 'Manager' },
    { id: 'cashier', label: 'Kasir' },
    { id: 'kitchen', label: 'Juru Masak' },
    { id: 'courier', label: 'Kurir' },
    { id: 'waiter', label: 'Waiters' },
    { id: 'customer', label: 'Pelanggan' },
  ];
  const base = DB.users.filter(u => u.role !== 'admin');
  const filtered = base.filter(u => !State.managerRoleFilter || u.role === State.managerRoleFilter);
  return `
  <div class="animate-fade-up">
    <div class="flex justify-between items-center mb-4">
      <h2 class="font-display text-xl font-bold">Kelola Pengguna</h2>
      <button onclick="showAddUserModal()" class="btn-primary btn-sm"><i class="fas fa-plus mr-1"></i>Tambah</button>
    </div>
    <div class="flex gap-2 mb-4 overflow-x-auto pb-2" style="-webkit-overflow-scrolling:touch;scrollbar-width:none;">
      ${roleChips.map(c => `<div class="category-chip ${State.managerRoleFilter === c.id ? 'active' : ''}" onclick="State.managerRoleFilter='${c.id}';render()">${c.label}</div>`).join('')}
    </div>
    <div class="space-y-3">
      ${filtered.map(u => `
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
      </div>`).join('')}
    </div>
  </div>`;
}

function showEditUserManagerModal(id) {
  const u = DB.users.find(x => x.id === id);
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

function saveEditUserManager(id) {
  const u = DB.users.find(x => x.id === id);
  if (!u || u.role === 'admin') { showToast('Tidak dapat mengedit admin', 'warning'); return; }
  const name = document.getElementById('edit-user-name')?.value;
  const email = document.getElementById('edit-user-email')?.value;
  const phone = document.getElementById('edit-user-phone')?.value;
  const pass = document.getElementById('edit-user-pass')?.value;
  const role = document.getElementById('edit-user-role')?.value;
  if (!name || !email) { showToast('Nama dan email wajib diisi', 'warning'); return; }
  u.name = name; u.email = email; u.phone = phone; u.role = role; u.avatar = name[0].toUpperCase();
  if (pass) u.password = pass;
  closeModal(); showToast('Pengguna berhasil diperbarui', 'success'); render();
}

function deleteUserManager(id) {
  const u = DB.users.find(x => x.id === id);
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

function confirmDeleteUserManager(id) {
  DB.users = DB.users.filter(x => x.id !== id);
  closeModal(); showToast('Pengguna dihapus', 'info'); render();
}
