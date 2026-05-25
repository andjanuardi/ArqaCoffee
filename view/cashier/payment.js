// ============================================================
// CASHIER VIEW — Accept, Payment, Settle, Report, Profile
// ============================================================
function acceptCashierOrder(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  o.accepted = true;
  addNotification({
    title: 'Pesanan Diterima Kasir',
    message: '#' + o.id.slice(-5).toUpperCase() + ' — diterima, menunggu dapur',
    type: 'order',
    icon: 'fa-check-circle',
    targetRoles: ['kitchen'],
    relatedOrderId: o.id
  });
  showToast(
    `Pesanan #${o.id.slice(-5).toUpperCase()} diterima — menunggu dapur`,
    "success",
  );
  render();
}

function processPayment(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  o.payment_status = "paid";
  o.payment_method = "digital";
  notifyPayment(o, 'Digital');
  showToast(
    `Pembayaran #${o.id.slice(-5).toUpperCase()} berhasil (Digital)`,
    "success",
  );
  render();
}
function processCashPayment(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  o.payment_status = "paid";
  o.payment_method = "cash";
  notifyPayment(o, 'Tunai');
  showToast(
    `Pembayaran #${o.id.slice(-5).toUpperCase()} berhasil (Tunai)`,
    "success",
  );
  render();
}

function settleDelivery(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  o.status = "completed";
  o.payment_status = "paid";
  o.payment_method = "cod";
  notifyPayment(o, 'COD (Setoran Kurir)');
  showToast(
    `Setoran diterima — Pesanan #${o.id.slice(-5).toUpperCase()} selesai`,
    "success",
  );
  render();
}

function renderCashTable() {
  const startVal = State.cashierDateStart || "";
  const endVal = State.cashierDateEnd || "";
  const startDate = startVal || new Date().toISOString().split('T')[0];
  const endDate = endVal || new Date().toISOString().split('T')[0];
  const orders = DB.orders.filter(o => {
    if (o.payment_status !== 'paid' || (o.payment_method !== 'cash' && o.payment_method !== 'cod') || !o.created_at) return false;
    const d = o.created_at.split('T')[0];
    return d >= startDate && d <= endDate;
  }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const total = orders.reduce((s, o) => s + (o.total_amount || 0), 0);
  return `
    <div class="card mb-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-semibold text-sm">Detail Bayar Tunai</h3>
        <button onclick="State.showCashierCashTable=false;render()" class="text-xs" style="color:var(--muted)"><i class="fas fa-times mr-1"></i>Tutup</button>
      </div>
      <div class="grid grid-cols-2 gap-3 mb-3">
        <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Total Tunai</div><div class="text-base font-bold mt-1" style="color:var(--success)">${formatCurrency(total)}</div></div>
        <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Jumlah Transaksi</div><div class="text-base font-bold mt-1">${orders.length}</div></div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm" style="border-collapse:collapse">
          <thead><tr style="color:var(--muted)"><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Tanggal</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Jam</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Orders</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Menu</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:right">Total</th></tr></thead>
          <tbody>${orders.length === 0 ? '<tr><td style="padding:8px 10px;text-align:center;color:var(--muted)" colspan="5">Belum ada transaksi tunai</td></tr>' : orders.map(o => {
            const date = o.created_at?.split('T')[0] || '';
            const time = o.created_at?.split('T')[1]?.slice(0, 5) || '-';
            const menuCount = {};
            (o.items || []).forEach(item => {
              const mi = DB.menuItems.find(m => m.id === item.menu_item_id);
              if (mi) menuCount[mi.name] = (menuCount[mi.name] || 0) + item.quantity;
            });
            const menuList = Object.entries(menuCount).map(([name, qty]) => name + ' x' + qty).join(', ');
            const encoded = encodeURIComponent(o.id);
            return `<tr class="cursor-pointer hover:bg-white/5" onclick="showOrderDetail('${encoded}')"><td style="border-bottom:1px solid var(--border);padding:8px 10px">${formatDate(date)}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">${time}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">#${o.id.slice(-5).toUpperCase()} (${getOrderTypeName(o.order_type)})</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">${menuList || '-'}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;text-align:right;color:var(--success)">${formatCurrency(o.total_amount || 0)}</td></tr>`;
          }).join('')}</tbody>
          <tfoot><tr class="font-bold"><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)">Total</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent);text-align:right;color:var(--accent)">${formatCurrency(total)}</td></tr></tfoot>
        </table>
      </div>
    </div>`;
}

function renderDigitalTable() {
  const startVal = State.cashierDateStart || "";
  const endVal = State.cashierDateEnd || "";
  const startDate = startVal || new Date().toISOString().split('T')[0];
  const endDate = endVal || new Date().toISOString().split('T')[0];
  const orders = DB.orders.filter(o => {
    if (o.payment_status !== 'paid' || o.payment_method !== 'digital' || !o.created_at) return false;
    const d = o.created_at.split('T')[0];
    return d >= startDate && d <= endDate;
  }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const total = orders.reduce((s, o) => s + (o.total_amount || 0), 0);
  return `
    <div class="card mb-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-semibold text-sm">Detail Bayar Digital</h3>
        <button onclick="State.showCashierDigitalTable=false;render()" class="text-xs" style="color:var(--muted)"><i class="fas fa-times mr-1"></i>Tutup</button>
      </div>
      <div class="grid grid-cols-2 gap-3 mb-3">
        <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Total Digital</div><div class="text-base font-bold mt-1" style="color:var(--accent)">${formatCurrency(total)}</div></div>
        <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Jumlah Transaksi</div><div class="text-base font-bold mt-1">${orders.length}</div></div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm" style="border-collapse:collapse">
          <thead><tr style="color:var(--muted)"><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Tanggal</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Jam</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Orders</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Menu</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:right">Total</th></tr></thead>
          <tbody>${orders.length === 0 ? '<tr><td style="padding:8px 10px;text-align:center;color:var(--muted)" colspan="5">Belum ada transaksi digital</td></tr>' : orders.map(o => {
            const date = o.created_at?.split('T')[0] || '';
            const time = o.created_at?.split('T')[1]?.slice(0, 5) || '-';
            const menuCount = {};
            (o.items || []).forEach(item => {
              const mi = DB.menuItems.find(m => m.id === item.menu_item_id);
              if (mi) menuCount[mi.name] = (menuCount[mi.name] || 0) + item.quantity;
            });
            const menuList = Object.entries(menuCount).map(([name, qty]) => name + ' x' + qty).join(', ');
            const encoded = encodeURIComponent(o.id);
            return `<tr class="cursor-pointer hover:bg-white/5" onclick="showOrderDetail('${encoded}')"><td style="border-bottom:1px solid var(--border);padding:8px 10px">${formatDate(date)}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">${time}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">#${o.id.slice(-5).toUpperCase()} (${getOrderTypeName(o.order_type)})</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">${menuList || '-'}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;text-align:right;color:var(--accent)">${formatCurrency(o.total_amount || 0)}</td></tr>`;
          }).join('')}</tbody>
          <tfoot><tr class="font-bold"><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)">Total</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent);text-align:right;color:var(--accent)">${formatCurrency(total)}</td></tr></tfoot>
        </table>
      </div>
    </div>`;
}

function renderCashierReport() {
  const startVal = State.cashierDateStart || "";
  const endVal = State.cashierDateEnd || "";
  const startDate = startVal || new Date().toISOString().split('T')[0];
  const endDate = endVal || new Date().toISOString().split('T')[0];
  const paidInRange = DB.orders.filter(o => {
    if (o.payment_status !== 'paid' || !o.created_at) return false;
    const d = o.created_at.split('T')[0];
    return d >= startDate && d <= endDate;
  });
  const cashInRange = paidInRange.filter(o => o.payment_method === 'cash' || o.payment_method === 'cod');
  const cashTotal = cashInRange.reduce((s, o) => s + (o.total_amount || 0), 0);
  const digitalInRange = paidInRange.filter(o => o.payment_method === 'digital');
  const digitalTotal = digitalInRange.reduce((s, o) => s + (o.total_amount || 0), 0);
  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Laporan Harian</h2>
    <div class="flex gap-2 mb-4">
      <div class="flex-1">
        <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Dari Tanggal</label>
        <input type="date" id="cashier-report-start" class="input-field w-full" value="${startVal}" onchange="State.cashierDateStart=this.value;render()">
      </div>
      <div class="flex-1">
        <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Sampai Tanggal</label>
        <input type="date" id="cashier-report-end" class="input-field w-full" value="${endVal}" onchange="State.cashierDateEnd=this.value;render()">
      </div>
      ${startVal || endVal ? '<button onclick="State.cashierDateStart=\'\';State.cashierDateEnd=\'\';render()" class="self-end btn-sm mb-0.5" style="background:rgba(231,76,60,.1);color:var(--danger);border:none;padding:8px 12px;border-radius:10px;height:40px"><i class="fas fa-times"></i></button>' : ""}
    </div>
    <div class="grid grid-cols-2 gap-3 mb-5">
      <div class="stat-card cursor-pointer" onclick="State.showCashierCashTable=!State.showCashierCashTable;render()"><div class="flex items-center gap-2"><i class="fas fa-money-bill-wave" style="color:var(--success);font-size:18px"></i><span class="text-xs" style="color:var(--muted)">Bayar Tunai</span></div><div class="text-xl font-bold mt-1" style="color:var(--success)">${formatCurrency(cashTotal)}</div></div>
      <div class="stat-card cursor-pointer" onclick="State.showCashierDigitalTable=!State.showCashierDigitalTable;render()"><div class="flex items-center gap-2"><i class="fas fa-credit-card" style="color:var(--accent);font-size:18px"></i><span class="text-xs" style="color:var(--muted)">Bayar Digital</span></div><div class="text-xl font-bold mt-1" style="color:var(--accent)">${formatCurrency(digitalTotal)}</div></div>
      <div class="stat-card cursor-pointer" onclick="State.currentTab['cashier']='payment';State.showPaymentHistory=true;render()"><div class="flex items-center gap-2"><i class="fas fa-check-circle" style="color:var(--success);font-size:18px"></i><span class="text-xs" style="color:var(--muted)">Lunas</span></div><div class="text-xl font-bold mt-1" style="color:var(--success)">${paidInRange.length}</div></div>
      <div class="stat-card cursor-pointer" onclick="State.currentTab['cashier']='payment';render()"><div class="flex items-center gap-2"><i class="fas fa-exclamation-circle" style="color:var(--danger);font-size:18px"></i><span class="text-xs" style="color:var(--muted)">Belum Bayar</span></div><div class="text-xl font-bold mt-1" style="color:var(--danger)">${DB.orders.filter(o => {
        if (o.payment_status !== 'unpaid' || !o.created_at) return false;
        const d = o.created_at.split('T')[0];
        return d >= startDate && d <= endDate;
      }).length}</div></div>
    </div>
    ${State.showCashierCashTable ? renderCashTable() : ''}
    ${State.showCashierDigitalTable ? renderDigitalTable() : ''}
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
          <div><span class="font-medium">#${o.id.slice(-5).toUpperCase()}</span><span class="badge ${getStatusBadge(o.status)} ml-2">${getStatusLabel(o.status)}</span>${o.promo_discount ? '<span class="text-[10px] ml-1" style="color:var(--success)"><i class="fas fa-tag"></i></span>' : ''}</div>
          <span>${formatCurrency(o.total_amount)}</span>
        </div>`).join('')}
      </div>
    </div>
    <div class="card"><canvas id="chart-cashier" height="200"></canvas></div>
  </div>`;
}

function renderCashierProfile() {
  return renderGenericProfile();
}
