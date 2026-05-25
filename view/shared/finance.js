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

function showOrderDetail(orderId) {
  const order = DB.orders.find(o => o.id === orderId);
  if (!order) return;
  let rows = '';
  let total = 0;
  (order.items || []).forEach(item => {
    const mi = DB.menuItems.find(m => m.id === item.menu_item_id);
    const name = mi ? mi.name : '(unknown)';
    const subtotal = (item.quantity || 0) * (item.unit_price || 0);
    total += subtotal;
    rows += `<tr><td style="border-bottom:1px solid var(--border);padding:8px 10px">${name}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;text-align:right">${item.quantity}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;text-align:right;color:var(--muted)">${formatCurrency(item.unit_price || 0)}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;text-align:right;color:var(--success)">${formatCurrency(subtotal)}</td></tr>`;
  });
  showModal(`
    <div style="max-width:500px">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-base">Detail Order #${order.id.slice(-5).toUpperCase()}</h3>
        <button onclick="closeModal()" class="text-xs" style="color:var(--muted)"><i class="fas fa-times mr-1"></i>Tutup</button>
      </div>
      <div class="text-sm mb-3" style="color:var(--muted)">${getOrderTypeName(order.order_type)} — ${formatDate(order.created_at?.split('T')[0])} ${order.created_at?.split('T')[1]?.slice(0,5) || ''}</div>
      <div class="overflow-x-auto max-h-96 overflow-y-auto">
        <table class="w-full text-sm" style="border-collapse:collapse">
          <thead><tr style="color:var(--muted)"><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Menu</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:right">Qty</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:right">Harga</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:right">Subtotal</th></tr></thead>
          <tbody>${rows || '<tr><td style="border-bottom:1px solid var(--border);padding:8px 10px;text-align:center;color:var(--muted)" colspan="4">Tidak ada data</td></tr>'}</tbody>
          <tfoot><tr class="font-bold"><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)" colspan="3">Total</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent);text-align:right;color:var(--accent)">${formatCurrency(total)}</td></tr></tfoot>
        </table>
      </div>
    </div>
  `);
}

function printRevenueDetail() {
  const startDate = State.financeStartDate || (() => {
    const d = new Date(); d.setDate(d.getDate() - 6); return d.toISOString().split('T')[0];
  })();
  const endDate = State.financeEndDate || new Date().toISOString().split('T')[0];
  const paidOrders = DB.orders.filter(o => o.payment_status === 'paid' && o.created_at);
  const filtered = paidOrders.filter(o => {
    const d = o.created_at.split('T')[0];
    return d >= startDate && d <= endDate;
  });
  const totalRev = filtered.reduce((s, o) => s + (o.total_amount || 0), 0);
  const w = window.open('', '_blank');
  w.document.write(`
    <html><head><title>Detail Pendapatan</title>
    <style>
      body{font-family:sans-serif;padding:40px;color:#222}
      h2{margin-bottom:8px}
      .meta{color:#666;font-size:14px;margin-bottom:24px}
      table{width:100%;border-collapse:collapse;font-size:13px}
      th{text-align:left;padding:8px 10px;border-bottom:2px solid #ddd;color:#666;white-space:nowrap}
      td{padding:8px 10px;border-bottom:1px solid #eee;vertical-align:top}
      .tfoot td{border-top:2px solid #333;font-weight:bold}
      .right{text-align:right}
      .green{color:#27ae60}
      .muted{color:#999}
      .flex{display:flex;gap:24px;margin-bottom:24px}
      .box{padding:16px 24px;background:#f5f5f5;border-radius:8px;text-align:center}
      .box .val{font-size:20px;font-weight:bold;margin-top:4px}
      .box .lbl{font-size:12px;color:#666}
    </style></head><body>
    <h2>Detail Pendapatan</h2>
    <div class="meta">Periode: ${startDate} s/d ${endDate}</div>
    <div class="flex">
      <div class="box"><div class="lbl">Total Pendapatan</div><div class="val">${formatCurrency(totalRev)}</div></div>
      <div class="box"><div class="lbl">Total Transaksi</div><div class="val">${filtered.length}</div></div>
    </div>
    <table>
      <thead><tr><th>Tanggal</th><th>Jam</th><th>Order</th><th>Menu</th><th class="right">Pendapatan</th></tr></thead>
      <tbody>${filtered.map(o => {
        const date = o.created_at?.split('T')[0] || '';
        const time = o.created_at?.split('T')[1]?.slice(0, 5) || '-';
        const menuCount = {};
        (o.items || []).forEach(item => {
          const mi = DB.menuItems.find(m => m.id === item.menu_item_id);
          if (mi) menuCount[mi.name] = (menuCount[mi.name] || 0) + item.quantity;
        });
        const menuList = Object.entries(menuCount).map(([name, qty]) => name + ' x' + qty).join(', ');
        return `<tr><td>${formatDate(date)}</td><td class="muted">${time}</td><td class="muted">#${o.id.slice(-5).toUpperCase()} (${getOrderTypeName(o.order_type)})<br><span style="font-size:10px;color:${o.payment_method === 'cash' ? '#27ae60' : '#e07a3a'}">${o.payment_method === 'cash' ? 'Tunai' : 'Digital'}</span></td><td class="muted">${menuList || '-'}</td><td class="right green">${formatCurrency(o.total_amount || 0)}</td></tr>`;
      }).join('')}</tbody>
      <tfoot><tr class="tfoot"><td colspan="4">Total</td><td class="right green">${formatCurrency(totalRev)}</td></tr></tfoot>
    </table>
    <script>window.print()<${'/'}script></body></html>
  `);
  w.document.close();
}

function printExpenseDetail() {
  const startDate = State.financeStartDate || (() => {
    const d = new Date(); d.setDate(d.getDate() - 6); return d.toISOString().split('T')[0];
  })();
  const endDate = State.financeEndDate || new Date().toISOString().split('T')[0];
  const expenses = (DB.expenses || []).filter(e => e.date && e.date >= startDate && e.date <= endDate);
  const totalExp = expenses.reduce((s, e) => s + e.amount, 0);
  const catTotals = {};
  expenses.forEach(e => { catTotals[e.category] = (catTotals[e.category] || 0) + e.amount; });
  const w = window.open('', '_blank');
  w.document.write(`
    <html><head><title>Detail Pengeluaran</title>
    <style>
      body{font-family:sans-serif;padding:40px;color:#222}
      h2{margin-bottom:8px}
      .meta{color:#666;font-size:14px;margin-bottom:24px}
      table{width:100%;border-collapse:collapse;font-size:14px}
      th{text-align:left;padding:8px 12px;border-bottom:2px solid #ddd;color:#666}
      td{padding:8px 12px;border-bottom:1px solid #eee}
      .tfoot td{border-top:2px solid #333;font-weight:bold}
      .right{text-align:right}
      .red{color:#e74c3c}
      .flex{display:flex;gap:24px;margin-bottom:24px}
      .box{padding:16px 24px;background:#f5f5f5;border-radius:8px;text-align:center}
      .box .val{font-size:20px;font-weight:bold;margin-top:4px;color:#e74c3c}
      .box .lbl{font-size:12px;color:#666}
    </style></head><body>
    <h2>Detail Pengeluaran</h2>
    <div class="meta">Periode: ${startDate} s/d ${endDate}</div>
    <div class="flex">
      <div class="box"><div class="lbl">Total Pengeluaran</div><div class="val">${formatCurrency(totalExp)}</div></div>
      <div class="box"><div class="lbl">Jumlah Transaksi</div><div class="val">${expenses.length}</div></div>
    </div>
    <table>
      <thead><tr><th>Tanggal</th><th>Jam</th><th>Kategori</th><th>Keterangan</th><th class="right">Jumlah</th></tr></thead>
      <tbody>${expenses.map(e => `<tr><td>${e.date}</td><td class="muted">${e.time || '-'}</td><td>${e.category}</td><td>${e.note || '-'}</td><td class="right red">${formatCurrency(e.amount)}</td></tr>`).join('')}</tbody>
      <tfoot><tr class="tfoot"><td colspan="4">Total</td><td class="right red">${formatCurrency(totalExp)}</td></tr></tfoot>
    </table>
    <script>window.print()<${'/'}script></body></html>
  `);
  w.document.close();
}

function printAvgDetail() {
  const startDate = State.financeStartDate || (() => {
    const d = new Date(); d.setDate(d.getDate() - 6); return d.toISOString().split('T')[0];
  })();
  const endDate = State.financeEndDate || new Date().toISOString().split('T')[0];
  const data = getFinanceData(startDate, endDate);
  const totalRev = data.reduce((s, d) => s + d.revenue, 0);
  const dayCount = Math.max(1, Math.round((new Date(endDate) - new Date(startDate)) / 86400000) + 1);
  const w = window.open('', '_blank');
  w.document.write(`
    <html><head><title>Detail Rata-rata per Hari</title>
    <style>
      body{font-family:sans-serif;padding:40px;color:#222}
      h2{margin-bottom:8px}
      .meta{color:#666;font-size:14px;margin-bottom:24px}
      table{width:100%;border-collapse:collapse;font-size:14px}
      th{text-align:left;padding:8px 12px;border-bottom:2px solid #ddd;color:#666}
      td{padding:8px 12px;border-bottom:1px solid #eee}
      .tfoot td{border-top:2px solid #333;font-weight:bold}
      .right{text-align:right}
      .green{color:#27ae60}
      .flex{display:flex;gap:24px;margin-bottom:24px}
      .box{padding:16px 24px;background:#f5f5f5;border-radius:8px;text-align:center}
      .box .val{font-size:20px;font-weight:bold;margin-top:4px}
      .box .lbl{font-size:12px;color:#666}
    </style></head><body>
    <h2>Detail Rata-rata per Hari</h2>
    <div class="meta">Periode: ${startDate} s/d ${endDate} (${dayCount} hari)</div>
    <div class="flex">
      <div class="box"><div class="lbl">Rata-rata/Hari</div><div class="val">${formatCurrency(Math.round(totalRev / dayCount))}</div></div>
      <div class="box"><div class="lbl">Total Pendapatan</div><div class="val">${formatCurrency(totalRev)}</div></div>
    </div>
    <table>
      <thead><tr><th>Tanggal</th><th class="right">Pendapatan</th><th class="right">Rata-rata Kumulatif</th></tr></thead>
      <tbody>${data.map((d, i) => {
        const cumAvg = Math.round(data.slice(0, i + 1).reduce((s, x) => s + x.revenue, 0) / (i + 1));
        return `<tr><td>${formatDate(d.date)}</td><td class="right green">${formatCurrency(d.revenue)}</td><td class="right">${formatCurrency(cumAvg)}</td></tr>`;
      }).join('')}</tbody>
      <tfoot><tr class="tfoot"><td>Total</td><td class="right green">${formatCurrency(totalRev)}</td><td class="right">${formatCurrency(Math.round(totalRev / dayCount))}</td></tr></tfoot>
    </table>
    <script>window.print()<${'/'}script></body></html>
  `);
  w.document.close();
}

function printProfitDetail() {
  const startDate = State.financeStartDate || (() => {
    const d = new Date(); d.setDate(d.getDate() - 6); return d.toISOString().split('T')[0];
  })();
  const endDate = State.financeEndDate || new Date().toISOString().split('T')[0];
  const data = getFinanceData(startDate, endDate);
  const totalRev = data.reduce((s, d) => s + d.revenue, 0);
  const expenses = (DB.expenses || []).filter(e => e.date && e.date >= startDate && e.date <= endDate);
  const totalExp = expenses.reduce((s, e) => s + e.amount, 0);
  const netProfit = totalRev - totalExp;
  const expByDate = {};
  expenses.forEach(e => { if (!expByDate[e.date]) expByDate[e.date] = 0; expByDate[e.date] += e.amount; });
  const w = window.open('', '_blank');
  w.document.write(`
    <html><head><title>Detail Laba Bersih</title>
    <style>
      body{font-family:sans-serif;padding:40px;color:#222}
      h2{margin-bottom:8px}
      .meta{color:#666;font-size:14px;margin-bottom:24px}
      table{width:100%;border-collapse:collapse;font-size:14px}
      th{text-align:left;padding:8px 12px;border-bottom:2px solid #ddd;color:#666}
      td{padding:8px 12px;border-bottom:1px solid #eee}
      .tfoot td{border-top:2px solid #333;font-weight:bold}
      .right{text-align:right}
      .green{color:#27ae60}
      .red{color:#e74c3c}
      .flex{display:flex;gap:24px;margin-bottom:24px}
      .box{padding:16px 24px;background:#f5f5f5;border-radius:8px;text-align:center}
      .box .val{font-size:20px;font-weight:bold;margin-top:4px}
      .box .lbl{font-size:12px;color:#666}
    </style></head><body>
    <h2>Detail Laba Bersih</h2>
    <div class="meta">Periode: ${startDate} s/d ${endDate}</div>
    <div class="flex">
      <div class="box"><div class="lbl">Pendapatan</div><div class="val" style="color:#27ae60">${formatCurrency(totalRev)}</div></div>
      <div class="box"><div class="lbl">Pengeluaran</div><div class="val" style="color:#e74c3c">${formatCurrency(totalExp)}</div></div>
      <div class="box"><div class="lbl">Laba Bersih</div><div class="val" style="color:${netProfit >= 0 ? '#27ae60' : '#e74c3c'}">${formatCurrency(netProfit)}</div></div>
    </div>
    <table>
      <thead><tr><th>Tanggal</th><th class="right">Pendapatan</th><th class="right">Pengeluaran</th><th class="right">Laba</th></tr></thead>
      <tbody>${data.map(d => {
        const exp = expByDate[d.date] || 0;
        const profit = d.revenue - exp;
        return `<tr><td>${formatDate(d.date)}</td><td class="right green">${formatCurrency(d.revenue)}</td><td class="right red">${formatCurrency(exp)}</td><td class="right" style="color:${profit >= 0 ? '#27ae60' : '#e74c3c'}">${formatCurrency(profit)}</td></tr>`;
      }).join('')}</tbody>
      <tfoot><tr class="tfoot"><td>Total</td><td class="right green">${formatCurrency(totalRev)}</td><td class="right red">${formatCurrency(totalExp)}</td><td class="right" style="color:${netProfit >= 0 ? '#27ae60' : '#e74c3c'}">${formatCurrency(netProfit)}</td></tr></tfoot>
    </table>
    <script>window.print()<${'/'}script></body></html>
  `);
  w.document.close();
}

function printTransactionDetail() {
  const startDate = State.financeStartDate || (() => {
    const d = new Date(); d.setDate(d.getDate() - 6); return d.toISOString().split('T')[0];
  })();
  const endDate = State.financeEndDate || new Date().toISOString().split('T')[0];
  const paidOrders = DB.orders.filter(o => o.payment_status === 'paid' && o.created_at);
  const orders = paidOrders.filter(o => {
    const d = o.created_at.split('T')[0];
    return d >= startDate && d <= endDate;
  });
  const totalRev = orders.reduce((s, o) => s + (o.total_amount || 0), 0);
  const w = window.open('', '_blank');
  w.document.write(`
    <html><head><title>Detail Transaksi</title>
    <style>
      body{font-family:sans-serif;padding:40px;color:#222}
      h2{margin-bottom:8px}
      .meta{color:#666;font-size:14px;margin-bottom:24px}
      table{width:100%;border-collapse:collapse;font-size:14px}
      th{text-align:left;padding:8px 12px;border-bottom:2px solid #ddd;color:#666}
      td{padding:8px 12px;border-bottom:1px solid #eee}
      .tfoot td{border-top:2px solid #333;font-weight:bold}
      .right{text-align:right}
      .green{color:#27ae60}
      .muted{color:#999}
      .flex{display:flex;gap:24px;margin-bottom:24px}
      .box{padding:16px 24px;background:#f5f5f5;border-radius:8px;text-align:center}
      .box .val{font-size:20px;font-weight:bold;margin-top:4px}
      .box .lbl{font-size:12px;color:#666}
    </style></head><body>
    <h2>Detail Transaksi</h2>
    <div class="meta">Periode: ${startDate} s/d ${endDate}</div>
    <div class="flex">
      <div class="box"><div class="lbl">Total Transaksi</div><div class="val">${orders.length}</div></div>
      <div class="box"><div class="lbl">Total Pendapatan</div><div class="val" style="color:#27ae60">${formatCurrency(totalRev)}</div></div>
    </div>
    <table>
      <thead><tr><th>Order</th><th>Tgl</th><th>Tipe</th><th>Menu</th><th class="right">Qty</th><th class="right">Harga</th><th class="right">Subtotal</th></tr></thead>
      <tbody>${orders.flatMap(o => {
        const items = o.items || [];
        if (!items.length) {
          return `<tr><td>#${o.id.slice(-5).toUpperCase()}</td><td class="muted">${o.created_at.split('T')[0]}</td><td class="muted">${getOrderTypeName(o.order_type)}</td><td class="muted" colspan="4">-</td></tr>`;
        }
        return items.map((item, idx) => {
          const mi = DB.menuItems.find(m => m.id === item.menu_item_id);
          const name = mi ? mi.name : '(unknown)';
          const subtotal = (item.quantity || 0) * (item.unit_price || 0);
          return `<tr><td>${idx === 0 ? '#' + o.id.slice(-5).toUpperCase() : ''}</td><td class="muted">${idx === 0 ? o.created_at.split('T')[0] : ''}</td><td class="muted">${idx === 0 ? getOrderTypeName(o.order_type) : ''}</td><td>${name}${item.notes ? ' (' + item.notes + ')' : ''}</td><td class="right">${item.quantity}</td><td class="right muted">${formatCurrency(item.unit_price || 0)}</td><td class="right green">${formatCurrency(subtotal)}</td></tr>`;
        });
      }).join('')}</tbody>
      <tfoot><tr class="tfoot"><td colspan="6">Total</td><td class="right green">${formatCurrency(totalRev)}</td></tr></tfoot>
    </table>
    <script>window.print()<${'/'}script></body></html>
  `);
  w.document.close();
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

  const paidOrders = DB.orders.filter(o => o.payment_status === 'paid');
  const periodOrders = paidOrders.filter(o => {
    if (!o.created_at) return false;
    const d = o.created_at.split('T')[0];
    return d >= startDate && d <= endDate;
  });

  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Laporan Keuangan</h2>
    <div class="flex flex-wrap items-center gap-2 mb-4">
      <input type="date" id="finance-start" value="${startDate}" class="input-field text-sm" style="flex:1;min-width:140px" onchange="setFinanceRange(this.value,document.getElementById('finance-end').value)">
      <span class="text-xs" style="color:var(--muted)">s/d</span>
      <input type="date" id="finance-end" value="${endDate}" class="input-field text-sm" style="flex:1;min-width:140px" onchange="setFinanceRange(document.getElementById('finance-start').value,this.value)">
    </div>
    <div class="grid grid-cols-2 md:grid-cols-5 gap-3 mb-5">
      <div class="stat-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="State.showRevenueTable=!State.showRevenueTable;render()"><div class="text-xs" style="color:var(--muted)">Total Pendapatan</div><div class="text-lg font-bold mt-1" style="color:var(--accent)">${formatCurrency(totalRev)}</div></div>
      <div class="stat-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="State.showExpenseTable=!State.showExpenseTable;render()"><div class="text-xs" style="color:var(--muted)">Total Pengeluaran</div><div class="text-lg font-bold mt-1" style="color:var(--danger)">${formatCurrency(totalExp)}</div></div>
      <div class="stat-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="State.showAvgTable=!State.showAvgTable;render()"><div class="text-xs" style="color:var(--muted)">Rata-rata/Hari</div><div class="text-lg font-bold mt-1">${formatCurrency(Math.round(totalRev / dayCount))}</div></div>
      <div class="stat-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="State.showProfitTable=!State.showProfitTable;render()"><div class="text-xs" style="color:var(--muted)">Laba Bersih</div><div class="text-lg font-bold mt-1" style="color:${netProfit >= 0 ? 'var(--success)' : 'var(--danger)'}">${formatCurrency(netProfit)}</div></div>
      <div class="stat-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="State.showTransactionTable=!State.showTransactionTable;render()"><div class="text-xs" style="color:var(--muted)">Transaksi</div><div class="text-lg font-bold mt-1">${periodOrders.length}</div></div>
    </div>
    ${State.showRevenueTable ? `
    <div class="card mb-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-semibold text-sm">Detail Pendapatan</h3>
        <button onclick="State.showRevenueTable=false;render()" class="text-xs" style="color:var(--muted)"><i class="fas fa-times mr-1"></i>Tutup</button>
      </div>
      <div class="grid grid-cols-2 gap-3 mb-3">
        <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Total Pendapatan</div><div class="text-base font-bold mt-1" style="color:var(--accent)">${formatCurrency(totalRev)}</div></div>
        <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Total Transaksi</div><div class="text-base font-bold mt-1">${periodOrders.length}</div></div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm" style="border-collapse:collapse">
          <thead><tr style="color:var(--muted)"><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Tanggal</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Jam</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Orders</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Menu</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:right">Pendapatan</th></tr></thead>
          <tbody>${periodOrders.map(o => {
            const date = o.created_at?.split('T')[0] || '';
            const time = o.created_at?.split('T')[1]?.slice(0, 5) || '-';
            const menuCount = {};
            (o.items || []).forEach(item => {
              const mi = DB.menuItems.find(m => m.id === item.menu_item_id);
              if (mi) menuCount[mi.name] = (menuCount[mi.name] || 0) + item.quantity;
            });
            const menuList = Object.entries(menuCount).map(([name, qty]) => name + ' x' + qty).join(', ');
            const encoded = encodeURIComponent(o.id);
            return `<tr class="cursor-pointer hover:bg-white/5" onclick="showOrderDetail('${encoded}')"><td style="border-bottom:1px solid var(--border);padding:8px 10px">${formatDate(date)}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">${time}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">#${o.id.slice(-5).toUpperCase()} (${getOrderTypeName(o.order_type)})<br><span style="font-size:10px;color:${o.payment_method === 'cash' ? 'var(--success)' : 'var(--accent)'}">${o.payment_method === 'cash' ? 'Tunai' : 'Digital'}</span></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">${menuList || '-'}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;text-align:right;color:var(--success)">${formatCurrency(o.total_amount || 0)}</td></tr>`;
          }).join('')}</tbody>
          <tfoot><tr class="font-bold"><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)">Total</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent);text-align:right;color:var(--accent)">${formatCurrency(totalRev)}</td></tr></tfoot>
        </table>
      </div>
      <div class="mt-3">
        <button onclick="printRevenueDetail()" class="btn-sm btn-secondary" style="padding:4px 12px;font-size:11px"><i class="fas fa-print mr-1"></i>Cetak</button>
      </div>
    </div>` : ''}
    ${State.showExpenseTable ? `
    <div class="card mb-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-semibold text-sm">Detail Pengeluaran</h3>
        <button onclick="State.showExpenseTable=false;render()" class="text-xs" style="color:var(--muted)"><i class="fas fa-times mr-1"></i>Tutup</button>
      </div>
      <div class="grid grid-cols-2 gap-3 mb-3">
        <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Total Pengeluaran</div><div class="text-base font-bold mt-1" style="color:var(--danger)">${formatCurrency(totalExp)}</div></div>
        <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Jumlah Transaksi</div><div class="text-base font-bold mt-1">${filteredExpenses.length}</div></div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm" style="border-collapse:collapse">
          <thead><tr style="color:var(--muted)"><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Tanggal</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Jam</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Kategori</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Keterangan</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:right">Jumlah</th></tr></thead>
          <tbody>${filteredExpenses.map(e => `
            <tr><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted)">${e.date || '-'}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">${e.time || '-'}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px">${e.category}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted)">${e.note || '-'}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;text-align:right;color:var(--danger)">${formatCurrency(e.amount)}</td></tr>
          `).join('')}</tbody>
          <tfoot><tr class="font-bold"><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--danger)" colspan="4">Total</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--danger);text-align:right;color:var(--danger)">${formatCurrency(totalExp)}</td></tr></tfoot>
        </table>
      </div>
      <div class="mt-3">
        <button onclick="printExpenseDetail()" class="btn-sm btn-secondary" style="padding:4px 12px;font-size:11px"><i class="fas fa-print mr-1"></i>Cetak</button>
      </div>
    </div>` : ''}
    ${State.showAvgTable ? `
    <div class="card mb-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-semibold text-sm">Detail Rata-rata per Hari</h3>
        <button onclick="State.showAvgTable=false;render()" class="text-xs" style="color:var(--muted)"><i class="fas fa-times mr-1"></i>Tutup</button>
      </div>
      <div class="grid grid-cols-2 gap-3 mb-3">
        <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Rata-rata/Hari</div><div class="text-base font-bold mt-1" style="color:var(--accent)">${formatCurrency(Math.round(totalRev / dayCount))}</div></div>
        <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Total Hari</div><div class="text-base font-bold mt-1">${dayCount} hari</div></div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm" style="border-collapse:collapse">
          <thead><tr style="color:var(--muted)"><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Tanggal</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:right">Pendapatan</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:right">Rata-rata Kumulatif</th></tr></thead>
          <tbody>${computedSales.map((d, i) => {
            const cumAvg = Math.round(computedSales.slice(0, i + 1).reduce((s, x) => s + x.revenue, 0) / (i + 1));
            return `<tr><td style="border-bottom:1px solid var(--border);padding:8px 10px">${formatDate(d.date)}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;text-align:right;color:var(--success)">${formatCurrency(d.revenue)}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;text-align:right;color:var(--muted)">${formatCurrency(cumAvg)}</td></tr>`;
          }).join('')}</tbody>
          <tfoot><tr class="font-bold"><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)">Total</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent);text-align:right;color:var(--success)">${formatCurrency(totalRev)}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent);text-align:right;color:var(--accent)">${formatCurrency(Math.round(totalRev / dayCount))}</td></tr></tfoot>
        </table>
      </div>
      <div class="mt-3">
        <button onclick="printAvgDetail()" class="btn-sm btn-secondary" style="padding:4px 12px;font-size:11px"><i class="fas fa-print mr-1"></i>Cetak</button>
      </div>
    </div>` : ''}
    ${State.showProfitTable ? `
    <div class="card mb-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-semibold text-sm">Detail Laba Bersih</h3>
        <button onclick="State.showProfitTable=false;render()" class="text-xs" style="color:var(--muted)"><i class="fas fa-times mr-1"></i>Tutup</button>
      </div>
      <div class="grid grid-cols-3 gap-3 mb-3">
        <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Pendapatan</div><div class="text-base font-bold mt-1" style="color:var(--accent)">${formatCurrency(totalRev)}</div></div>
        <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Pengeluaran</div><div class="text-base font-bold mt-1" style="color:var(--danger)">${formatCurrency(totalExp)}</div></div>
        <div class="stat-card" style="border-color:${netProfit >= 0 ? 'rgba(39,174,96,.4)' : 'rgba(231,76,60,.4)'}"><div class="text-xs" style="color:var(--muted)">Laba Bersih</div><div class="text-base font-bold mt-1" style="color:${netProfit >= 0 ? 'var(--success)' : 'var(--danger)'}">${formatCurrency(netProfit)}</div></div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm" style="border-collapse:collapse">
          <thead><tr style="color:var(--muted)"><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Tanggal</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:right">Pendapatan</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:right">Pengeluaran</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:right">Laba</th></tr></thead>
          <tbody>${(() => {
            const expByDate = {};
            filteredExpenses.forEach(e => {
              if (!expByDate[e.date]) expByDate[e.date] = 0;
              expByDate[e.date] += e.amount;
            });
            return computedSales.map(d => {
              const exp = expByDate[d.date] || 0;
              const profit = d.revenue - exp;
              return `<tr><td style="border-bottom:1px solid var(--border);padding:8px 10px">${formatDate(d.date)}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;text-align:right;color:var(--success)">${formatCurrency(d.revenue)}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;text-align:right;color:var(--danger)">${formatCurrency(exp)}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;text-align:right;color:${profit >= 0 ? 'var(--success)' : 'var(--danger)'}">${formatCurrency(profit)}</td></tr>`;
            }).join('');
          })()}</tbody>
          <tfoot><tr class="font-bold"><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)">Total</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent);text-align:right;color:var(--success)">${formatCurrency(totalRev)}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent);text-align:right;color:var(--danger)">${formatCurrency(totalExp)}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent);text-align:right;color:${netProfit >= 0 ? 'var(--success)' : 'var(--danger)'}">${formatCurrency(netProfit)}</td></tr></tfoot>
        </table>
      </div>
      <div class="mt-3">
        <button onclick="printProfitDetail()" class="btn-sm btn-secondary" style="padding:4px 12px;font-size:11px"><i class="fas fa-print mr-1"></i>Cetak</button>
      </div>
    </div>` : ''}
    ${State.showTransactionTable ? `
    <div class="card mb-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-semibold text-sm">Detail Transaksi</h3>
        <button onclick="State.showTransactionTable=false;render()" class="text-xs" style="color:var(--muted)"><i class="fas fa-times mr-1"></i>Tutup</button>
      </div>
      <div class="grid grid-cols-2 gap-3 mb-3">
        <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Total Transaksi</div><div class="text-base font-bold mt-1" style="color:var(--accent)">${periodOrders.length}</div></div>
        <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Total Pendapatan</div><div class="text-base font-bold mt-1" style="color:var(--success)">${formatCurrency(totalRev)}</div></div>
      </div>
      <div class="overflow-x-auto max-h-96 overflow-y-auto">
        <table class="w-full text-sm" style="border-collapse:collapse">
          <thead><tr style="color:var(--muted)"><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Order</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Tgl</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Tipe</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Menu</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:right">Qty</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:right">Harga</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:right">Subtotal</th></tr></thead>
          <tbody>${periodOrders.flatMap(o => {
            const items = o.items || [];
            if (!items.length) {
              return `<tr><td style="border-bottom:1px solid var(--border);padding:8px 10px;font-weight:500">#${o.id.slice(-5).toUpperCase()}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted)">${o.created_at?.split('T')[0] || '-'}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted)">${getOrderTypeName(o.order_type)}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted)" colspan="4">-</td></tr>`;
            }
            return items.map((item, idx) => {
              const mi = DB.menuItems.find(m => m.id === item.menu_item_id);
              const name = mi ? mi.name : '(unknown)';
              const subtotal = (item.quantity || 0) * (item.unit_price || 0);
              return `<tr><td style="border-bottom:1px solid var(--border);padding:8px 10px;font-weight:500">${idx === 0 ? '#' + o.id.slice(-5).toUpperCase() : ''}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted)">${idx === 0 ? (o.created_at?.split('T')[0] || '-') : ''}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted)">${idx === 0 ? getOrderTypeName(o.order_type) : ''}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px">${name}${item.notes ? '<br><span style="font-size:11px;color:var(--muted)">' + item.notes + '</span>' : ''}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;text-align:right">${item.quantity}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;text-align:right;color:var(--muted)">${formatCurrency(item.unit_price || 0)}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;text-align:right;color:var(--success)">${formatCurrency(subtotal)}</td></tr>`;
            });
          }).join('')}</tbody>
          <tfoot><tr class="font-bold"><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)" colspan="6">Total</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent);text-align:right;color:var(--accent)">${formatCurrency(totalRev)}</td></tr></tfoot>
        </table>
      </div>
      <div class="mt-3">
        <button onclick="printTransactionDetail()" class="btn-sm btn-secondary" style="padding:4px 12px;font-size:11px"><i class="fas fa-print mr-1"></i>Cetak</button>
      </div>
    </div>` : ''}
    <div class="grid md:grid-cols-2 gap-4 mb-4">
      <div class="card"><canvas id="chart-finance-detail" height="200"></canvas></div>
      <div class="card">
        <h3 class="font-semibold text-sm mb-3">Pengeluaran per Kategori</h3>
        <canvas id="chart-expense-category" height="180"></canvas>
      </div>
    </div>
    <div class="card mb-4"><canvas id="chart-cashflow" height="180"></canvas></div>
  </div>`;
}
