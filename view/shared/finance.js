// ============================================================
// SHARED VIEWS — used by both admin.js and manager.js
// ============================================================

// ------------------------------------------------------------------
// FINANCE HELPERS
// ------------------------------------------------------------------
function getFinanceData(period) {
  const paidOrders = DB.orders.filter(o => o.payment_status === 'paid');

  if (period === 'monthly') {
    const monthly = {};
    paidOrders.forEach(o => {
      if (!o.created_at) return;
      const d = new Date(o.created_at);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (!monthly[key]) monthly[key] = { date: key, revenue: 0, orders: 0 };
      monthly[key].revenue += o.total_amount || 0;
      monthly[key].orders += 1;
    });
    const entries = Object.values(monthly).sort((a, b) => a.date.localeCompare(b.date));
    const last6 = entries.slice(-6);
    while (last6.length < 6) {
      const d = new Date();
      d.setMonth(d.getMonth() - (5 - last6.length));
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      last6.unshift({ date: key, revenue: 0, orders: 0 });
    }
    return last6;
  }

  if (period === 'yearly') {
    const yearly = {};
    paidOrders.forEach(o => {
      if (!o.created_at) return;
      const key = o.created_at.split('T')[0].slice(0, 4);
      if (!yearly[key]) yearly[key] = { date: key, revenue: 0, orders: 0 };
      yearly[key].revenue += o.total_amount || 0;
      yearly[key].orders += 1;
    });
    const entries = Object.values(yearly).sort((a, b) => a.date.localeCompare(b.date));
    const last3 = entries.slice(-3);
    while (last3.length < 3) {
      const d = new Date();
      d.setFullYear(d.getFullYear() - (2 - last3.length));
      const key = String(d.getFullYear());
      last3.unshift({ date: key, revenue: 0, orders: 0 });
    }
    return last3;
  }

  const daily = {};
  paidOrders.forEach(o => {
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

function setFinanceFilter(period) {
  State.financeFilter = period;
  render();
}

function showNetProfitDetail() {
  const period = State.financeFilter || 'daily';
  const computedSales = getFinanceData(period);
  const totalRev = computedSales.reduce((s, d) => s + d.revenue, 0);

  let filteredExpenses = DB.expenses || [];
  if (period === 'daily') {
    const today = new Date().toISOString().split('T')[0];
    filteredExpenses = filteredExpenses.filter(e => (e.date || '').startsWith(today));
  } else if (period === 'monthly') {
    const prefix = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;
    filteredExpenses = filteredExpenses.filter(e => (e.date || '').startsWith(prefix));
  } else if (period === 'yearly') {
    filteredExpenses = filteredExpenses.filter(e => (e.date || '').startsWith(String(new Date().getFullYear())));
  }

  const totalExp = filteredExpenses.reduce((s, e) => s + e.amount, 0);
  const netProfit = totalRev - totalExp;
  const margin = totalRev > 0 ? ((netProfit / totalRev) * 100).toFixed(1) : '0';

  const cats = {};
  filteredExpenses.forEach(e => {
    cats[e.category] = (cats[e.category] || 0) + e.amount;
  });

  const periodLabel = { daily: 'Harian', monthly: 'Bulanan', yearly: 'Tahunan' }[period];

  showModal(`
    <div class="min-w-[320px]">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-display text-lg font-bold">Laba Bersih (${periodLabel})</h3>
        <button onclick="closeModal()" class="text-lg" style="color:var(--muted)"><i class="fas fa-times"></i></button>
      </div>
      <div class="grid grid-cols-2 gap-3 mb-4">
        <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Total Pendapatan</div><div class="text-base font-bold mt-1" style="color:var(--accent)">${formatCurrency(totalRev)}</div></div>
        <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Total Biaya</div><div class="text-base font-bold mt-1" style="color:var(--danger)">${formatCurrency(totalExp)}</div></div>
      </div>
      <div class="card mb-4" style="border-color:${netProfit >= 0 ? 'rgba(39,174,96,.4)' : 'rgba(231,76,60,.4)'}">
        <div class="text-center py-3">
          <div class="text-xs" style="color:var(--muted)">Laba Bersih</div>
          <div class="text-2xl font-bold" style="color:${netProfit >= 0 ? 'var(--success)' : 'var(--danger)'}">${formatCurrency(netProfit)}</div>
          <div class="text-xs mt-1" style="color:${margin >= 0 ? 'var(--success)' : 'var(--danger)'}">Margin: ${margin}%</div>
        </div>
      </div>
      ${Object.keys(cats).length ? `
      <h4 class="font-semibold text-sm mb-2">Rincian Biaya</h4>
      <div class="space-y-2 mb-3">
        ${Object.entries(cats).map(([cat, amount]) => `
        <div class="flex items-center justify-between text-sm py-2 px-3 rounded-lg" style="background:var(--bg2)">
          <span>${cat}</span>
          <span style="color:var(--danger)">${formatCurrency(amount)}</span>
        </div>`).join('')}
        <div class="flex items-center justify-between text-sm font-bold py-2 px-3 rounded-lg" style="background:var(--bg2)">
          <span>Total Biaya</span>
          <span style="color:var(--danger)">${formatCurrency(totalExp)}</span>
        </div>
      </div>` : ''}
      ${filteredExpenses.length ? `
      <h4 class="font-semibold text-sm mb-2">Daftar Transaksi Biaya</h4>
      <div class="space-y-2 max-h-48 overflow-y-auto">
        ${filteredExpenses.map(e => `
        <div class="flex justify-between items-center text-sm py-2 border-b" style="border-color:var(--border)">
          <div><span class="font-medium">${e.category}</span><span class="text-xs ml-2" style="color:var(--muted)">${e.date || ''}</span></div>
          <span style="color:var(--danger)">${formatCurrency(e.amount)}</span>
        </div>`).join('')}
      </div>` : '<div class="text-sm py-4 text-center" style="color:var(--muted)">Belum ada biaya</div>'}
    </div>
  `);
}

// ------------------------------------------------------------------
// FINANCE REPORT
// ------------------------------------------------------------------
function renderFinanceReport() {
  const period = State.financeFilter || 'daily';
  const computedSales = getFinanceData(period);
  const totalRev = computedSales.reduce((s, d) => s + d.revenue, 0);

  let filteredExpenses = DB.expenses || [];
  if (period === 'daily') {
    const today = new Date().toISOString().split('T')[0];
    filteredExpenses = filteredExpenses.filter(e => (e.date || '').startsWith(today));
  } else if (period === 'monthly') {
    const prefix = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;
    filteredExpenses = filteredExpenses.filter(e => (e.date || '').startsWith(prefix));
  } else if (period === 'yearly') {
    filteredExpenses = filteredExpenses.filter(e => (e.date || '').startsWith(String(new Date().getFullYear())));
  }

  const totalExp = filteredExpenses.reduce((s, e) => s + e.amount, 0);
  const netProfit = totalRev - totalExp;
  const current = computedSales[computedSales.length - 1];

  const labels = {
    daily: { current: 'Hari Ini', range: '7 Hari', avg: 'Rata-rata/Hari', trans: 'Transaksi Hari Ini' },
    monthly: { current: 'Bulan Ini', range: '6 Bulan', avg: 'Rata-rata/Bulan', trans: 'Transaksi Bulan Ini' },
    yearly: { current: 'Tahun Ini', range: '3 Tahun', avg: 'Rata-rata/Tahun', trans: 'Transaksi Tahun Ini' }
  };
  const lbl = labels[period];

  const prodCount = {};
  const paidOrders = DB.orders.filter(o => o.payment_status === 'paid');
  const periodOrders = paidOrders.filter(o => {
    if (!o.created_at) return false;
    if (period === 'daily') return o.created_at.split('T')[0] === new Date().toISOString().split('T')[0];
    if (period === 'monthly') {
      const d = new Date(o.created_at);
      return d.getFullYear() === new Date().getFullYear() && d.getMonth() === new Date().getMonth();
    }
    if (period === 'yearly') return o.created_at.startsWith(String(new Date().getFullYear()));
    return true;
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
    if (period === 'daily') return o.created_at.split('T')[0] === new Date().toISOString().split('T')[0];
    if (period === 'monthly') {
      const d = new Date(o.created_at);
      return d.getFullYear() === new Date().getFullYear() && d.getMonth() === new Date().getMonth();
    }
    if (period === 'yearly') return o.created_at.startsWith(String(new Date().getFullYear()));
    return true;
  }).slice(0, 8);

  const filterBtns = ['daily', 'monthly', 'yearly'].map(p =>
    `<button onclick="setFinanceFilter('${p}')" class="btn-sm ${period === p ? 'btn-primary' : 'btn-secondary'}" style="padding:4px 12px">${p === 'daily' ? 'Harian' : p === 'monthly' ? 'Bulanan' : 'Tahunan'}</button>`
  ).join('');

  return `
  <div class="animate-fade-up">
    <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
      <h2 class="font-display text-xl font-bold">Laporan Keuangan</h2>
      <div class="flex gap-2">${filterBtns}</div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-5 gap-3 mb-5">
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">${lbl.current}</div><div class="text-lg font-bold mt-1" style="color:var(--accent)">${formatCurrency(current.revenue)}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">${lbl.range}</div><div class="text-lg font-bold mt-1" style="color:var(--accent)">${formatCurrency(totalRev)}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">${lbl.avg}</div><div class="text-lg font-bold mt-1">${formatCurrency(Math.round(totalRev / computedSales.length))}</div></div>
      <div class="stat-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="showNetProfitDetail()"><div class="text-xs" style="color:var(--muted)">Laba Bersih</div><div class="text-lg font-bold mt-1" style="color:${netProfit >= 0 ? 'var(--success)' : 'var(--danger)'}">${formatCurrency(netProfit)}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">${lbl.trans}</div><div class="text-lg font-bold mt-1">${current.orders}</div></div>
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
        <h3 class="font-semibold text-sm mb-3">Produk Terlaris (${lbl.current})</h3>
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
        <h3 class="font-semibold text-sm mb-3">Rincian Transaksi (${lbl.current})</h3>
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

function renderNetProfitPage() {
  const period = State.financeFilter || 'daily';
  const computedSales = getFinanceData(period);
  const totalRev = computedSales.reduce((s, d) => s + d.revenue, 0);

  let filteredExpenses = DB.expenses || [];
  if (period === 'daily') {
    const today = new Date().toISOString().split('T')[0];
    filteredExpenses = filteredExpenses.filter(e => (e.date || '').startsWith(today));
  } else if (period === 'monthly') {
    const prefix = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;
    filteredExpenses = filteredExpenses.filter(e => (e.date || '').startsWith(prefix));
  } else if (period === 'yearly') {
    filteredExpenses = filteredExpenses.filter(e => (e.date || '').startsWith(String(new Date().getFullYear())));
  }

  const totalExp = filteredExpenses.reduce((s, e) => s + e.amount, 0);
  const netProfit = totalRev - totalExp;
  const margin = totalRev > 0 ? ((netProfit / totalRev) * 100).toFixed(1) : '0';

  const cats = {};
  filteredExpenses.forEach(e => { cats[e.category] = (cats[e.category] || 0) + e.amount; });

  const filterBtns = ['daily', 'monthly', 'yearly'].map(p =>
    `<button onclick="setFinanceFilter('${p}')" class="btn-sm ${period === p ? 'btn-primary' : 'btn-secondary'}" style="padding:4px 12px">${p === 'daily' ? 'Harian' : p === 'monthly' ? 'Bulanan' : 'Tahunan'}</button>`
  ).join('');

  return `
  <div class="animate-fade-up">
    <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
      <h2 class="font-display text-xl font-bold">Laba Bersih</h2>
      <div class="flex gap-2">${filterBtns}</div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Total Pendapatan</div><div class="text-lg font-bold mt-1" style="color:var(--accent)">${formatCurrency(totalRev)}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Total Biaya</div><div class="text-lg font-bold mt-1" style="color:var(--danger)">${formatCurrency(totalExp)}</div></div>
      <div class="stat-card" style="border-color:${netProfit >= 0 ? 'rgba(39,174,96,.4)' : 'rgba(231,76,60,.4)'}"><div class="text-xs" style="color:var(--muted)">Laba Bersih</div><div class="text-lg font-bold mt-1" style="color:${netProfit >= 0 ? 'var(--success)' : 'var(--danger)'}">${formatCurrency(netProfit)}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Margin</div><div class="text-lg font-bold mt-1" style="color:${margin >= 0 ? 'var(--success)' : 'var(--danger)'}">${margin}%</div></div>
    </div>
    ${Object.keys(cats).length ? `
    <div class="card mb-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-semibold text-sm">Rincian Biaya per Kategori</h3>
        <button onclick="showAddExpenseForm()" class="btn-sm btn-primary" style="padding:4px 10px;font-size:11px"><i class="fas fa-plus mr-1"></i>Tambah</button>
      </div>
      <div class="space-y-2">
        ${Object.entries(cats).map(([cat, amount]) => `
        <div class="flex items-center justify-between text-sm py-2 px-3 rounded-lg" style="background:var(--bg2)">
          <span>${cat}</span>
          <span style="color:var(--danger)">${formatCurrency(amount)}</span>
        </div>`).join('')}
        <div class="flex items-center justify-between text-sm font-bold py-2 px-3 rounded-lg" style="background:var(--bg2)">
          <span>Total Biaya</span>
          <span style="color:var(--danger)">${formatCurrency(totalExp)}</span>
        </div>
      </div>
    </div>` : `
    <div class="card mb-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-semibold text-sm">Rincian Biaya per Kategori</h3>
        <button onclick="showAddExpenseForm()" class="btn-sm btn-primary" style="padding:4px 10px;font-size:11px"><i class="fas fa-plus mr-1"></i>Tambah</button>
      </div>
      <div class="text-sm py-4 text-center" style="color:var(--muted)">Belum ada data biaya</div>
    </div>`}
    ${filteredExpenses.length ? `
    <div class="card">
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-semibold text-sm">Daftar Transaksi Biaya</h3>
        <button onclick="showAddExpenseForm()" class="btn-sm btn-primary" style="padding:4px 10px;font-size:11px"><i class="fas fa-plus mr-1"></i>Tambah</button>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead><tr class="text-left" style="color:var(--muted)"><th class="pb-2 pr-4">Tanggal</th><th class="pb-2 pr-4">Kategori</th><th class="pb-2 pr-4">Keterangan</th><th class="pb-2 pr-4 text-right">Jumlah</th><th class="pb-2 w-8"></th></tr></thead>
          <tbody>${filteredExpenses.map((e, idx) => `
            <tr class="border-t" style="border-color:var(--border)"><td class="py-2 pr-4" style="color:var(--muted)">${e.date || '-'}</td><td class="py-2 pr-4">${e.category}</td><td class="py-2 pr-4" style="color:var(--muted)">${e.note || '-'}</td><td class="py-2 pr-4 text-right" style="color:var(--danger)">${formatCurrency(e.amount)}</td><td class="py-2"><button onclick="deleteExpense(${idx})" class="text-xs w-6 h-6 rounded-full flex items-center justify-center" style="color:var(--danger);background:rgba(231,76,60,.15)"><i class="fas fa-trash-can"></i></button></td></tr>
          `).join('')}</tbody>
        </table>
      </div>
    </div>` : '<div class="card"><div class="text-sm py-4 text-center" style="color:var(--muted)">Belum ada data biaya</div></div>'}
  </div>`;
}

function showAddExpenseForm() {
  const today = new Date().toISOString().split('T')[0];
  const categories = ['Bahan Baku', 'Operasional', 'Gaji', 'Lainnya'];
  showModal(`
    <div class="min-w-[300px]">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-display text-lg font-bold">Tambah Biaya</h3>
        <button onclick="closeModal()" class="text-lg" style="color:var(--muted)"><i class="fas fa-times"></i></button>
      </div>
      <form onsubmit="event.preventDefault();saveExpense()">
        <div class="mb-3">
          <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Tanggal</label>
          <input id="exp-date" type="date" value="${today}" class="input-field text-sm w-full">
        </div>
        <div class="mb-3">
          <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Kategori</label>
          <select id="exp-category" class="input-field text-sm w-full">${categories.map(c => `<option value="${c}" ${c === 'Operasional' ? 'selected' : ''}>${c}</option>`).join('')}</select>
        </div>
        <div class="mb-3">
          <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Jumlah (Rp)</label>
          <input id="exp-amount" type="number" min="0" step="500" required placeholder="0" class="input-field text-sm w-full">
        </div>
        <div class="mb-4">
          <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Keterangan</label>
          <input id="exp-note" type="text" placeholder="Misal: Beli kopi dan susu" class="input-field text-sm w-full">
        </div>
        <button type="submit" class="btn-primary w-full flex items-center justify-center gap-2"><i class="fas fa-floppy-disk"></i> Simpan</button>
      </form>
    </div>
  `);
  setTimeout(() => document.getElementById('exp-amount')?.focus(), 100);
}

function saveExpense() {
  const date = document.getElementById('exp-date')?.value;
  const category = document.getElementById('exp-category')?.value;
  const amount = parseInt(document.getElementById('exp-amount')?.value) || 0;
  const note = document.getElementById('exp-note')?.value || '';
  if (!date || !category || amount <= 0) { showToast('Lengkapi semua data dengan benar', 'warning'); return; }
  DB.expenses.push({ date, category, amount, note });
  closeModal();
  render();
  showToast('Biaya berhasil ditambahkan', 'success');
}

function deleteExpense(idx) {
  const period = State.financeFilter || 'daily';
  let filtered = DB.expenses || [];
  if (period === 'daily') {
    const today = new Date().toISOString().split('T')[0];
    filtered = filtered.filter(e => (e.date || '').startsWith(today));
  } else if (period === 'monthly') {
    const prefix = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;
    filtered = filtered.filter(e => (e.date || '').startsWith(prefix));
  } else if (period === 'yearly') {
    filtered = filtered.filter(e => (e.date || '').startsWith(String(new Date().getFullYear())));
  }
  const target = filtered[idx];
  if (!target) return;
  const realIdx = DB.expenses.indexOf(target);
  if (realIdx === -1) return;
  DB.expenses.splice(realIdx, 1);
  render();
  showToast('Biaya berhasil dihapus', 'info');
}
