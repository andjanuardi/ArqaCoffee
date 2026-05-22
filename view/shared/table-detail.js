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
