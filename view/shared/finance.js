// ============================================================
// SHARED VIEWS — used by both admin.js and manager.js
// ============================================================

// ------------------------------------------------------------------
// FINANCE HELPERS
// ------------------------------------------------------------------
function getComputedDailySales() {
  const daily = {};
  DB.orders.filter(o => o.payment_status === 'paid').forEach(o => {
    const dateKey = o.created_at?.split('T')[0];
    if (!dateKey) return;
    if (!daily[dateKey]) daily[dateKey] = { date: dateKey, revenue: 0, orders: 0 };
    daily[dateKey].revenue += o.total_amount || 0;
    daily[dateKey].orders += 1;
  });
  const entries = Object.values(daily).sort((a, b) => a.date.localeCompare(b.date));
  const last7 = entries.slice(-7);
  while (last7.length < 7) {
    const d = new Date();
    d.setDate(d.getDate() - (6 - last7.length));
    const key = d.toISOString().split('T')[0];
    last7.unshift({ date: key, revenue: 0, orders: 0 });
  }
  return last7;
}

// ------------------------------------------------------------------
// FINANCE REPORT
// ------------------------------------------------------------------
function renderFinanceReport() {
  const computedSales = getComputedDailySales();
  const totalRev = computedSales.reduce((s, d) => s + d.revenue, 0);
  const totalExp = (DB.expenses || []).reduce((s, e) => s + e.amount, 0);
  const netProfit = totalRev - totalExp;
  const today = computedSales[computedSales.length - 1];

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
