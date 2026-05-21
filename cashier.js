// ============================================================
// CASHIER VIEW
// ============================================================
function renderCashierView() {
    const tab = State.currentTab.cashier || 'orders';
    if (tab === 'orders') return renderCashierOrders();
    if (tab === 'payment') return renderCashierPayment();
    if (tab === 'report') return renderCashierReport();
    if (tab === 'profile') return renderCashierProfile();
    return renderCashierOrders();
}

function renderCashierOrders() {
    const pending = DB.orders.filter(o => ['pending', 'cooking', 'ready'].includes(o.status));
    const completed = DB.orders.filter(o => o.status === 'completed').slice(0, 5);
    return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Pesanan Masuk</h2>
    <div class="grid grid-cols-3 gap-3 mb-5">
      <div class="stat-card text-center"><div class="text-2xl font-bold" style="color:var(--warning)">${pending.filter(o => o.status === 'pending').length}</div><div class="text-[10px]" style="color:var(--muted)">Menunggu</div></div>
      <div class="stat-card text-center"><div class="text-2xl font-bold" style="color:var(--accent)">${pending.filter(o => o.status === 'cooking').length}</div><div class="text-[10px]" style="color:var(--muted)">Dimasak</div></div>
      <div class="stat-card text-center"><div class="text-2xl font-bold" style="color:var(--success)">${pending.filter(o => o.status === 'ready').length}</div><div class="text-[10px]" style="color:var(--muted)">Siap Saji</div></div>
    </div>
    <h3 class="font-semibold text-sm mb-3">Aktif</h3>
    <div class="space-y-3 mb-6">
      ${pending.length === 0 ? '<p class="text-sm text-center py-8" style="color:var(--muted)">Tidak ada pesanan aktif</p>' : ''}
      ${pending.map(o => {
          const t = o.table_id ? getTable(o.table_id) : null;
          return `
        <div class="order-card">
          <div class="flex justify-between items-start mb-2">
            <div>
              <span class="font-bold text-sm">#${o.id.slice(-5).toUpperCase()}</span>
              <span class="badge ${getStatusBadge(o.status)} ml-2">${getStatusLabel(o.status)}</span>
              <span class="badge ${o.payment_status === 'paid' ? 'badge-paid' : 'badge-unpaid'} ml-1">${o.payment_status === 'paid' ? 'Lunas' : 'Belum'}</span>
            </div>
            <span class="text-xs" style="color:var(--muted)">${formatTime(o.created_at)}</span>
          </div>
          <div class="text-xs mb-2" style="color:var(--muted)">
            <i class="fas ${o.order_type === 'dine-in' ? 'fa-chair' : 'fa-motorcycle'} mr-1"></i>${getOrderTypeName(o.order_type)}${t ? ' — Meja ' + t.number : ''}
          </div>
          <div class="text-xs mb-3">${o.items.map(i => { const mi = getMenuItem(i.menu_item_id); return mi ? mi.name + ' x' + i.quantity : '' }).join(', ')}</div>
          <div class="flex justify-between items-center">
            <span class="font-bold" style="color:var(--accent)">${formatCurrency(o.total_amount)}</span>
            <div class="flex gap-2">
              ${o.status === 'pending' ? `<button onclick="updateOrderStatus('${o.id}','cooking')" class="btn-primary btn-sm">Terima</button>` : ''}
              ${o.status === 'ready' && o.payment_status === 'unpaid' ? `<button onclick="processPayment('${o.id}')" class="btn-primary btn-sm">Bayar</button>` : ''}
              ${o.status === 'ready' && o.payment_status === 'paid' ? `<button onclick="updateOrderStatus('${o.id}','completed')" class="btn-primary btn-sm" style="background:linear-gradient(135deg,var(--success),#1e8449)">Selesai</button>` : ''}
            </div>
          </div>
        </div>`;
      }).join('')}
    </div>
    <h3 class="font-semibold text-sm mb-3">Selesai Hari Ini</h3>
    <div class="space-y-2">
      ${completed.map(o => `
      <div class="card flex justify-between items-center py-3 cursor-pointer hover:scale-[1.02] transition-transform" onclick="showCashierOrderDetail('${o.id}')">
        <div class="text-sm">#${o.id.slice(-5).toUpperCase()} <span style="color:var(--muted)">— ${getOrderTypeName(o.order_type)}</span></div>
        <span class="font-semibold text-sm" style="color:var(--success)">${formatCurrency(o.total_amount)}</span>
      </div>`).join('')}
    </div>
  </div>`;
}

function showCashierOrderDetail(id) {
    const o = DB.orders.find(x => x.id === id); if (!o) return;
    const t = o.table_id ? getTable(o.table_id) : null;
    showModal(`
<div>
  <div class="flex justify-between items-start mb-4">
    <h3 class="font-display text-lg font-bold">Pesanan #${o.id.slice(-5).toUpperCase()}</h3>
    <span class="badge badge-completed">Selesai</span>
  </div>
  <div class="text-xs mb-4" style="color:var(--muted)">
    <i class="fas ${o.order_type === 'dine-in' ? 'fa-chair' : 'fa-motorcycle'} mr-1"></i>${getOrderTypeName(o.order_type)}
    ${t ? ' — Meja ' + t.number : ''}
    ${o.delivery_address ? '<br>' + o.delivery_address : ''}
  </div>
  <div class="space-y-2 mb-4">
    ${o.items.map(i => {
            const mi = getMenuItem(i.menu_item_id); return mi ? `
    <div class="flex justify-between text-sm">
      <span>${mi.name} x${i.quantity} ${i.notes ? '<span style="color:var(--muted)">(' + i.notes + ')</span>' : ''}</span>
      <span>${formatCurrency(i.unit_price * i.quantity)}</span>
    </div>` : ''
        }).join('')}
  </div>
  <div class="border-t pt-3" style="border-color:var(--border)">
    <div class="flex justify-between font-bold"><span>Total</span><span style="color:var(--accent)">${formatCurrency(o.total_amount)}</span></div>
    <div class="flex justify-between text-xs mt-1" style="color:var(--muted)"><span>Pembayaran</span><span>${o.payment_method === 'digital' ? 'Digital' : 'Tunai/COD'}</span></div>
    <div class="flex justify-between text-xs mt-1" style="color:var(--muted)"><span>Waktu Selesai</span><span>${formatTime(o.created_at)}</span></div>
  </div>
  <button onclick="closeModal()" class="btn-secondary w-full mt-4 text-center">Tutup</button>
</div>
`);
}

function renderCashierPayment() {
    const unpaid = DB.orders.filter(o => o.payment_status === 'unpaid' && o.status !== 'completed' && o.status !== 'cancelled');
    return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Pembayaran</h2>
    <div class="space-y-3">
      ${unpaid.length === 0 ? '<div class="text-center py-12"><i class="fas fa-check-circle text-4xl mb-3" style="color:var(--success)"></i><p style="color:var(--muted)">Semua pesanan sudah lunas</p></div>' : ''}
      ${unpaid.map(o => `
      <div class="card">
        <div class="flex justify-between items-start mb-3">
          <div><span class="font-bold">#${o.id.slice(-5).toUpperCase()}</span><span class="badge ${getStatusBadge(o.status)} ml-2">${getStatusLabel(o.status)}</span></div>
          <span class="font-bold text-lg" style="color:var(--accent)">${formatCurrency(o.total_amount)}</span>
        </div>
        <div class="text-xs mb-3" style="color:var(--muted)">${o.items.map(i => { const mi = getMenuItem(i.menu_item_id); return mi ? mi.name + ' x' + i.quantity : '' }).join(', ')}</div>
        <div class="flex gap-2">
          <button onclick="processPayment('${o.id}')" class="btn-primary btn-sm flex-1 text-center"><i class="fas fa-wallet mr-1"></i>Digital</button>
          <button onclick="processCashPayment('${o.id}')" class="btn-secondary btn-sm flex-1 text-center"><i class="fas fa-money-bill mr-1"></i>Tunai</button>
        </div>
      </div>`).join('')}
    </div>
  </div>`;
}

function processPayment(id) {
    const o = DB.orders.find(x => x.id === id); if (!o) return;
    o.payment_status = 'paid'; o.payment_method = 'digital';
    showToast(`Pembayaran #${o.id.slice(-5).toUpperCase()} berhasil (Digital)`, 'success'); render();
}
function processCashPayment(id) {
    const o = DB.orders.find(x => x.id === id); if (!o) return;
    o.payment_status = 'paid'; o.payment_method = 'cash';
    showToast(`Pembayaran #${o.id.slice(-5).toUpperCase()} berhasil (Tunai)`, 'success'); render();
}

function renderCashierReport() {
    const today = DB.dailySales[DB.dailySales.length - 1];
    const completedToday = DB.orders.filter(o => o.status === 'completed');
    const todayRev = completedToday.reduce((s, o) => s + o.total_amount, 0) + today.revenue;
    return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Laporan Harian</h2>
    <div class="grid grid-cols-2 gap-3 mb-5">
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Pendapatan Hari Ini</div><div class="text-xl font-bold mt-1" style="color:var(--accent)">${formatCurrency(todayRev)}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Total Pesanan</div><div class="text-xl font-bold mt-1">${today.orders + completedToday.length}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Lunas</div><div class="text-xl font-bold mt-1" style="color:var(--success)">${DB.orders.filter(o => o.payment_status === 'paid').length}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Belum Bayar</div><div class="text-xl font-bold mt-1" style="color:var(--danger)">${DB.orders.filter(o => o.payment_status === 'unpaid').length}</div></div>
    </div>
    <div class="card"><canvas id="chart-cashier" height="200"></canvas></div>
  </div>`;
}

function renderCashierProfile() {
    return renderGenericProfile();
}
