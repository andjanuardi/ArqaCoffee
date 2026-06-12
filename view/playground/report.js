// ============================================================
// PLAYGROUND — FINANCE REPORT
// ============================================================

async function renderPlaygroundFinance() {
  try {
    showSkeleton('playground-finance', 'list');
    var tickets = await API.getPlaygroundTickets();
    var pgStock = await API.getPgStock();
    DB.playgroundTickets = tickets;
    DB.pgStockItems = pgStock;
    var dateVal = State.pgFinanceDate || new Date().toLocaleDateString('sv-SE');
    var paidTickets = (DB.playgroundTickets || []).filter(function(t) {
      if (t.payment_status !== 'paid' || !t.created_at) return false;
      var d = new Date(t.created_at).toLocaleDateString('sv-SE');
      return d === dateVal;
    });
    var cashTickets = paidTickets.filter(function(t) { return t.payment_method === 'cash'; });
    var cashExtra = getPgExtraTx(dateVal, 'cash');
    var cashTotal = cashTickets.reduce(function(s, t) { return s + t.total_amount; }, 0) + cashExtra.reduce(function(s, tx) { return s + tx.amount; }, 0);
    var digitalTickets = paidTickets.filter(function(t) { return t.payment_method === 'qris' || t.payment_method === 'transfer'; });
    var digitalExtra = getPgExtraTx(dateVal, 'qris').concat(getPgExtraTx(dateVal, 'transfer'));
    var digitalTotal = digitalTickets.reduce(function(s, t) { return s + t.total_amount; }, 0) + digitalExtra.reduce(function(s, tx) { return s + tx.amount; }, 0);

    return `
    <div class="animate-fade-up">
      <h2 class="font-display text-xl font-bold mb-4">Laporan Harian</h2>
      <div class="mb-4">
        <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Filter Tanggal</label>
        <input type="date" class="input-field w-full" value="${dateVal}" onchange="State.pgFinanceDate=this.value;render()">
      </div>
      <div class="grid grid-cols-2 gap-3 mb-5">
        <div class="stat-card cursor-pointer" onclick="State.pgShowCashTable=!State.pgShowCashTable;render()"><div class="flex items-center gap-2"><i class="fas fa-money-bill-wave" style="color:var(--success);font-size:18px"></i><span class="text-xs" style="color:var(--muted)">Bayar Tunai</span></div><div class="text-xl font-bold mt-1" style="color:var(--success)">${formatCurrency(cashTotal)}</div></div>
        <div class="stat-card cursor-pointer" onclick="State.pgShowDigitalTable=!State.pgShowDigitalTable;render()"><div class="flex items-center gap-2"><i class="fas fa-credit-card" style="color:var(--accent);font-size:18px"></i><span class="text-xs" style="color:var(--muted)">Bayar Digital</span></div><div class="text-xl font-bold mt-1" style="color:var(--accent)">${formatCurrency(digitalTotal)}</div></div>
      </div>
      ${State.pgShowCashTable ? renderPgCashTable(dateVal) : ''}
      ${State.pgShowDigitalTable ? renderPgDigitalTable(dateVal) : ''}
      ${(function() {
        var lowStock = (DB.pgStockItems || []).filter(function(s) { return s.current_quantity <= s.min_quantity; });
        if (!lowStock.length) return '';
        return `
      <div class="card mb-4" style="border-color:rgba(231,76,60,.3)">
        <h3 class="font-semibold text-sm mb-2" style="color:var(--danger)"><i class="fas fa-exclamation-triangle mr-1"></i>Peringatan Stok Rendah</h3>
        <div class="space-y-2">
          ${lowStock.map(function(s) { return '<div class="flex justify-between text-sm"><span>' + s.name + '</span><span style="color:var(--danger)">' + s.current_quantity + ' / ' + s.min_quantity + ' ' + s.unit + '</span></div>'; }).join('')}
        </div>
        <button onclick="State.currentTab.playground='stock';render()" class="text-xs font-bold mt-2 flex items-center gap-1" style="color:var(--accent)">Selengkapnya <i class="fas fa-arrow-right" style="font-size:10px"></i></button>
      </div>`})()}
      <div class="card mb-4">
        <h3 class="font-semibold text-sm mb-3">Tiket Terkini</h3>
        <div class="space-y-2 max-h-64 overflow-y-auto">
          ${(DB.playgroundTickets || []).sort(function(a, b) { return new Date(b.created_at) - new Date(a.created_at); }).slice(0, 10).map(function(t) { return `
          <div class="flex justify-between items-center text-sm py-2 border-b" style="border-color:var(--border)">
            <div>
              <span class="font-medium">${t.customer_name}</span>
              <span class="badge ${t.status === 'active' ? 'badge-cooking' : t.status === 'completed' ? 'badge-completed' : 'badge-pending'} ml-2">${t.status === 'active' ? 'Aktif' : t.status === 'completed' ? 'Selesai' : 'Dibatalkan'}</span>
            </div>
            <span>${formatCurrency(t.total_amount)}</span>
          </div>`; }).join('')}
        </div>
      </div>
      <div class="card"><canvas id="chart-playground" height="200"></canvas></div>
    </div>`;
  } catch(e) { console.error(e); showToast('Gagal memuat laporan playground', 'error'); return ''; }
  finally { hideSkeleton('playground-finance'); }
}

function getPgExtraTx(dateVal, methodFilter) {
  var r = [];
  (DB.playgroundTickets || []).forEach(function(t) {
    (t.pgTransactions || []).forEach(function(tx) {
      if (!tx.created_at || new Date(tx.created_at).toLocaleDateString('sv-SE') !== dateVal) return;
      if (tx.method !== methodFilter) return;
      r.push({ ...tx, _cust: t.customer_name, _kids: t.children, _ticketId: t.id, _isExtra: true });
    });
  });
  return r.sort(function(a, b) { return (a.created_at || '').localeCompare(b.created_at || ''); });
}

function renderPgCashTable(dateVal) {
  var tickets = (DB.playgroundTickets || []).filter(function(t) {
    if (t.payment_status !== 'paid' || t.payment_method !== 'cash' || !t.created_at) return false;
    return new Date(t.created_at).toLocaleDateString('sv-SE') === dateVal;
  }).sort(function(a, b) { return new Date(b.created_at) - new Date(a.created_at); });
  var extras = getPgExtraTx(dateVal, 'cash');
  var entries = [...tickets.map(function(t) { return { ...t, _isExtra: false }; }), ...extras]
    .sort(function(a, b) { return (b.created_at || '').localeCompare(a.created_at || ''); });
  var total = tickets.reduce(function(s, t) { return s + t.total_amount; }, 0) + extras.reduce(function(s, tx) { return s + tx.amount; }, 0);
  return `
    <div class="card mb-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-semibold text-sm">Detail Bayar Tunai</h3>
        <button onclick="State.pgShowCashTable=false;render()" class="text-xs" style="color:var(--muted)"><i class="fas fa-times mr-1"></i>Tutup</button>
      </div>
      <div class="grid grid-cols-2 gap-3 mb-3">
        <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Total Tunai</div><div class="text-base font-bold mt-1" style="color:var(--success)">${formatCurrency(total)}</div></div>
        <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Jumlah Transaksi</div><div class="text-base font-bold mt-1">${entries.length}</div></div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm" style="border-collapse:collapse">
          <thead><tr style="color:var(--muted)"><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Tanggal</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Jam</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Pelanggan</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Keterangan</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:right">Total</th></tr></thead>
          <tbody>${entries.length === 0 ? '<tr><td style="padding:8px 10px;text-align:center;color:var(--muted)" colspan="5">Belum ada transaksi tunai</td></tr>' : entries.map(function(e) {
            if (e._isExtra) {
              var d = e.created_at ? new Date(e.created_at).toLocaleDateString('sv-SE') : '-';
              var tm = e.created_at ? new Date(e.created_at).toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'}) : '-';
              return '<tr style="border-bottom:1px solid var(--border);opacity:.65;font-style:italic">' +
                '<td style="padding:8px 10px;color:var(--muted);font-size:12px">' + d + '</td>' +
                '<td style="padding:8px 10px;color:var(--muted);font-size:12px">' + tm + '</td>' +
                '<td style="padding:8px 10px;font-size:12px">' + e._cust + '</td>' +
                '<td style="padding:8px 10px;color:var(--warning);font-size:12px">' + e.description + '</td>' +
                '<td style="padding:8px 10px;text-align:right;color:var(--success);font-size:12px">' + formatCurrency(e.amount) + '</td></tr>';
            }
            var d = e.created_at ? new Date(e.created_at).toLocaleDateString('sv-SE') : '-';
            var tm = e.created_at ? new Date(e.created_at).toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'}) : '-';
            return '<tr class="cursor-pointer hover:bg-white/5" onclick="showPlaygroundTicketDetail(\'' + e.id + '\')" style="border-bottom:1px solid var(--border)">' +
              '<td style="padding:8px 10px;color:var(--muted);font-size:12px">' + d + '</td>' +
              '<td style="padding:8px 10px;color:var(--muted);font-size:12px">' + tm + '</td>' +
              '<td style="padding:8px 10px;font-size:12px">' + e.customer_name + '</td>' +
              '<td style="padding:8px 10px;color:var(--muted);font-size:12px">' + (e.children || []).map(function(c) { return c.name; }).join(', ') + '</td>' +
              '<td style="padding:8px 10px;text-align:right;color:var(--success);font-size:12px">' + formatCurrency(e.total_amount) + '</td></tr>';
          }).join('')}</tbody>
          <tfoot><tr class="font-bold"><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)">Total</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent);text-align:right;color:var(--accent)">${formatCurrency(total)}</td></tr></tfoot>
        </table>
      </div>
    </div>`;
}

function renderPgDigitalTable(dateVal) {
  var tickets = (DB.playgroundTickets || []).filter(function(t) {
    if (t.payment_status !== 'paid' || (t.payment_method !== 'qris' && t.payment_method !== 'transfer') || !t.created_at) return false;
    return new Date(t.created_at).toLocaleDateString('sv-SE') === dateVal;
  }).sort(function(a, b) { return new Date(b.created_at) - new Date(a.created_at); });
  var extras = getPgExtraTx(dateVal, 'qris').concat(getPgExtraTx(dateVal, 'transfer'));
  var entries = [...tickets.map(function(t) { return { ...t, _isExtra: false }; }), ...extras]
    .sort(function(a, b) { return (b.created_at || '').localeCompare(a.created_at || ''); });
  var total = tickets.reduce(function(s, t) { return s + t.total_amount; }, 0) + extras.reduce(function(s, tx) { return s + tx.amount; }, 0);
  return `
    <div class="card mb-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-semibold text-sm">Detail Bayar Digital</h3>
        <button onclick="State.pgShowDigitalTable=false;render()" class="text-xs" style="color:var(--muted)"><i class="fas fa-times mr-1"></i>Tutup</button>
      </div>
      <div class="grid grid-cols-2 gap-3 mb-3">
        <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Total Digital</div><div class="text-base font-bold mt-1" style="color:var(--accent)">${formatCurrency(total)}</div></div>
        <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Jumlah Transaksi</div><div class="text-base font-bold mt-1">${entries.length}</div></div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm" style="border-collapse:collapse">
          <thead><tr style="color:var(--muted)"><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Tanggal</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Jam</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Pelanggan</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Keterangan</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:right">Total</th></tr></thead>
          <tbody>${entries.length === 0 ? '<tr><td style="padding:8px 10px;text-align:center;color:var(--muted)" colspan="5">Belum ada transaksi digital</td></tr>' : entries.map(function(e) {
            if (e._isExtra) {
              var d = e.created_at ? new Date(e.created_at).toLocaleDateString('sv-SE') : '-';
              var tm = e.created_at ? new Date(e.created_at).toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'}) : '-';
              return '<tr style="border-bottom:1px solid var(--border);opacity:.65;font-style:italic">' +
                '<td style="padding:8px 10px;color:var(--muted);font-size:12px">' + d + '</td>' +
                '<td style="padding:8px 10px;color:var(--muted);font-size:12px">' + tm + '</td>' +
                '<td style="padding:8px 10px;font-size:12px">' + e._cust + '</td>' +
                '<td style="padding:8px 10px;color:var(--warning);font-size:12px">' + e.description + '</td>' +
                '<td style="padding:8px 10px;text-align:right;color:var(--accent);font-size:12px">' + formatCurrency(e.amount) + '</td></tr>';
            }
            var d = e.created_at ? new Date(e.created_at).toLocaleDateString('sv-SE') : '-';
            var tm = e.created_at ? new Date(e.created_at).toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'}) : '-';
            var payLabel = e.payment_method === 'qris' ? 'QRIS' : 'Transfer';
            return '<tr class="cursor-pointer hover:bg-white/5" onclick="showPlaygroundTicketDetail(\'' + e.id + '\')" style="border-bottom:1px solid var(--border)">' +
              '<td style="padding:8px 10px;color:var(--muted);font-size:12px">' + d + '</td>' +
              '<td style="padding:8px 10px;color:var(--muted);font-size:12px">' + tm + '</td>' +
              '<td style="padding:8px 10px;font-size:12px">' + e.customer_name + '</td>' +
              '<td style="padding:8px 10px;color:var(--accent);font-size:12px">' + payLabel + '</td>' +
              '<td style="padding:8px 10px;text-align:right;color:var(--accent);font-size:12px">' + formatCurrency(e.total_amount) + '</td></tr>';
          }).join('')}</tbody>
          <tfoot><tr class="font-bold"><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)">Total</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent);text-align:right;color:var(--accent)">${formatCurrency(total)}</td></tr></tfoot>
        </table>
      </div>
    </div>`;
}
