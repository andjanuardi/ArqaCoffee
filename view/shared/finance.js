// ============================================================
// SHARED VIEWS — used by both admin.js and manager.js
// ============================================================

// ------------------------------------------------------------------
// FINANCE HELPERS
// ------------------------------------------------------------------
function getFinanceData(startDate, endDate) {
  const paidOrders = DB.orders.filter(o => o.payment_status === 'paid');
  if (!startDate) {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 6);
    startDate = start.toISOString().split('T')[0];
    endDate = end.toISOString().split('T')[0];
  }
  const filtered = paidOrders.filter(o => {
    if (!o.created_at) return false;
    const d = o.created_at.split('T')[0];
    return d >= startDate && d <= endDate;
  });
  const grouped = {};
  filtered.forEach(o => {
    const dateKey = o.created_at.split('T')[0];
    if (!grouped[dateKey]) grouped[dateKey] = { date: dateKey, revenue: 0, orders: 0 };
    grouped[dateKey].revenue += o.total_amount || 0;
    grouped[dateKey].orders += 1;
  });
  const entries = Object.values(grouped).sort((a, b) => a.date.localeCompare(b.date));
  if (!entries.length) {
    entries.push({ date: startDate, revenue: 0, orders: 0 });
  }
  return entries;
}

function setFinanceRange(startDate, endDate) {
  State.financeStartDate = startDate;
  State.financeEndDate = endDate;
  render();
}

// ------------------------------------------------------------------
// FINANCE REPORT
// ------------------------------------------------------------------
function renderFinanceReport() {
  const startDate = State.financeStartDate || (() => {
    const d = new Date(); d.setDate(d.getDate() - 6); return d.toISOString().split('T')[0];
  })();
  const endDate = State.financeEndDate || new Date().toISOString().split('T')[0];
  const computedSales = getFinanceData(startDate, endDate);
  const totalRev = computedSales.reduce((s, d) => s + d.revenue, 0);

  const filteredExpenses = (DB.expenses || []).filter(e => {
    if (!e.date) return false;
    return e.date >= startDate && e.date <= endDate;
  });
  const totalExp = filteredExpenses.reduce((s, e) => s + e.amount, 0);
  const netProfit = totalRev - totalExp;
  const dayCount = Math.max(1, Math.round((new Date(endDate) - new Date(startDate)) / 86400000) + 1);

  const prodCount = {};
  const paidOrders = DB.orders.filter(o => o.payment_status === 'paid');
  const periodOrders = paidOrders.filter(o => {
    if (!o.created_at) return false;
    const d = o.created_at.split('T')[0];
    return d >= startDate && d <= endDate;
  });
  periodOrders.forEach(o => {
    (o.items || []).forEach(item => {
      const mi = DB.menuItems.find(m => m.id === item.menu_item_id);
      if (mi) prodCount[mi.name] = (prodCount[mi.name] || 0) + item.quantity;
    });
  });
  const topProducts = Object.entries(prodCount).sort((a, b) => b[1] - a[1]).slice(0, 5);

  const periodTransactions = paidOrders.filter(o => {
    if (!o.created_at) return false;
    const d = o.created_at.split('T')[0];
    return d >= startDate && d <= endDate;
  }).slice(0, 8);

  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Laporan Keuangan</h2>
    <div class="flex flex-wrap items-center gap-2 mb-4">
      <input type="date" id="finance-start" value="${startDate}" class="input-field text-sm" style="flex:1;min-width:140px" onchange="setFinanceRange(this.value,document.getElementById('finance-end').value)">
      <span class="text-xs" style="color:var(--muted)">s/d</span>
      <input type="date" id="finance-end" value="${endDate}" class="input-field text-sm" style="flex:1;min-width:140px" onchange="setFinanceRange(document.getElementById('finance-start').value,this.value)">
    </div>
    <div class="grid grid-cols-2 md:grid-cols-5 gap-3 mb-5">
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Total Pendapatan</div><div class="text-lg font-bold mt-1" style="color:var(--accent)">${formatCurrency(totalRev)}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Total Biaya</div><div class="text-lg font-bold mt-1" style="color:var(--danger)">${formatCurrency(totalExp)}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Rata-rata/Hari</div><div class="text-lg font-bold mt-1">${formatCurrency(Math.round(totalRev / dayCount))}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Laba Bersih</div><div class="text-lg font-bold mt-1" style="color:${netProfit >= 0 ? 'var(--success)' : 'var(--danger)'}">${formatCurrency(netProfit)}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Transaksi</div><div class="text-lg font-bold mt-1">${periodOrders.length}</div></div>
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
        <h3 class="font-semibold text-sm mb-3">Rincian Transaksi</h3>
        <div class="space-y-2 max-h-64 overflow-y-auto">
          ${periodTransactions.length ? periodTransactions.map(o => `
          <div class="flex justify-between items-center text-sm py-2 border-b" style="border-color:var(--border)">
            <div><span class="font-medium">#${o.id.slice(-5).toUpperCase()}</span><span class="text-xs ml-2" style="color:var(--muted)">${getOrderTypeName(o.order_type)}</span></div>
            <span style="color:var(--success)">${formatCurrency(o.total_amount)}</span>
          </div>`).join('') : '<div class="text-sm py-4 text-center" style="color:var(--muted)">Belum ada transaksi</div>'}
        </div>
      </div>
    </div>
  </div>`;
}
