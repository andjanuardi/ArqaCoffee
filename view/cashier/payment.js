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

function renderCashierReport() {
  const todayKey = new Date().toISOString().split('T')[0];
  const todayPaid = DB.orders.filter(o => o.payment_status === 'paid' && o.created_at?.startsWith(todayKey));
  const todayRev = todayPaid.reduce((s, o) => s + (o.total_amount || 0), 0);
  const todayOrders = todayPaid.length;
  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Laporan Harian</h2>
    <div class="grid grid-cols-2 gap-3 mb-5">
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Pendapatan Hari Ini</div><div class="text-xl font-bold mt-1" style="color:var(--accent)">${formatCurrency(todayRev)}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Total Pesanan</div><div class="text-xl font-bold mt-1">${todayOrders}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Lunas</div><div class="text-xl font-bold mt-1" style="color:var(--success)">${DB.orders.filter((o) => o.payment_status === "paid").length}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Belum Bayar</div><div class="text-xl font-bold mt-1" style="color:var(--danger)">${DB.orders.filter((o) => o.payment_status === "unpaid").length}</div></div>
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
