// ============================================================
// SHARED VIEWS — used by both admin.js and manager.js
// ============================================================

// ------------------------------------------------------------------
// FINANCE HELPERS
// ------------------------------------------------------------------
function getFinanceData(startDate, endDate) {
  var paidOrders = DB.orders.filter(function(o) { return o.payment_status === "paid" && o.status !== "cancelled" && o.status !== "rejected"; });
  if (!startDate) {
    var end = new Date();
    var start = new Date();
    start.setDate(start.getDate() - 6);
    startDate = start.toLocaleDateString('sv-SE');
    endDate = end.toLocaleDateString('sv-SE');
  }
  var filtered = paidOrders.filter(function(o) {
    if (!o.created_at) return false;
    var d = new Date(o.created_at).toLocaleDateString('sv-SE');
    return d >= startDate && d <= endDate;
  });
  var grouped = {};
  filtered.forEach(function(o) {
    var dateKey = new Date(o.created_at).toLocaleDateString('sv-SE');
    if (!grouped[dateKey])
      grouped[dateKey] = { date: dateKey, revenue: 0, orders: 0 };
    grouped[dateKey].revenue += effectiveAmount(o) || 0;
    grouped[dateKey].orders += 1;
  });
  var entries = Object.values(grouped).sort(function(a, b) {
    return a.date.localeCompare(b.date);
  });
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

function showFinanceOrderDetail(orderId) {
  var o = DB.orders.find(function(x) { return x.id === orderId; });
  if (!o) return;
  var t = o.table_id ? getTable(o.table_id) : null;
  var tax = Math.round(calcItemTax(o.items));
  var subtotal = o.items.reduce(function(s, i) { return s + i.unit_price * i.quantity; }, 0);
  var dineInFee = calcCustomerFee(subtotal, o.order_type);
  var isDelivery = o.order_type === "delivery";
  var isDelivered = o.status === "delivered" && isDelivery;
  var isCompletedDelivery = o.status === "completed" && isDelivery;
  var kurir = (isDelivered || isCompletedDelivery) ? getUser(o.courier_id) : null;
  var netOngkir = (isDelivered || isCompletedDelivery) && o.shipping_cost > 0 ? o.shipping_cost - calcCourierFee(o.shipping_cost) : 0;
  showModal(`
<div>
  ${isDelivery ? `
  <div class="flex justify-between items-start mb-4">
    <h3 class="font-display text-lg font-bold">Pesanan #${o.id.slice(-5).toUpperCase()}</h3>
    ${isDelivered && o.payment_status === 'unpaid' ? '<span class="badge" style="background:rgba(52,152,219,.15);color:#3498db">Belum Setor</span>' : '<span class="badge" style="background:rgba(46,204,113,.15);color:var(--success)">Selesai</span>'}
  </div>
  <div class="text-sm mb-4">
    <div class="mb-1"><i class="fas fa-user mr-2" style="color:var(--accent)"></i>${o.customer_name || (getUser(o.user_id)?.name || getUser(o.user_id)?.email || '—')}</div>
    <div class="mb-1"><i class="fas fa-phone mr-2" style="color:var(--accent)"></i>${o.customer_phone || (getUser(o.user_id)?.phone || '—')}</div>
    <div class="mb-1"><i class="fas fa-map-marker-alt mr-2" style="color:var(--accent)"></i>${o.delivery_address || '—'}</div>
    ${o.delivery_detail ? `<div class="text-xs mt-1" style="color:var(--muted)"><i class="fas fa-info-circle mr-1"></i>${o.delivery_detail}</div>` : ''}
    <div class="mt-2 text-xs" style="color:var(--muted)">
      <i class="far fa-clock mr-1"></i>${formatDate(o.created_at)} ${formatTime(o.created_at)}
      ${kurir ? '— <i class="fas fa-motorcycle mr-1" style="color:var(--accent)"></i>' + kurir.name : ''}
    </div>
  </div>
  ` : `
  <div class="flex justify-between items-start mb-4">
    <h3 class="font-display text-lg font-bold">Pesanan #${o.id.slice(-5).toUpperCase()}</h3>
    <span class="badge ${getStatusBadge(o.status)}">${getStatusLabel(o.status)}</span>
  </div>
  <div class="text-xs mb-4" style="color:var(--muted)">
    <i class="fas ${o.order_type === "dine-in" ? "fa-chair" : "fa-motorcycle"} mr-1"></i>${getOrderTypeName(o.order_type)}
    ${t ? " — Meja " + t.number : ""}
    ${o.customer_name ? " — " + o.customer_name : ""}${o.user_id && o.user_id !== 'walk-in' && getUser(o.user_id) ? ' (' + getUser(o.user_id).email + ')' : ''}
    ${o.delivery_address ? "<br>" + o.delivery_address : ""}
  </div>
  `}
  <div class="p-3 rounded-xl mb-3" style="background:var(--bg2)">
    <div class="flex items-center gap-2 mb-2 text-xs font-semibold" style="color:var(--muted)">
      <i class="fas fa-receipt"></i> Rincian Pesanan
    </div>
    <div class="space-y-1.5">
      ${(isDelivered ? o.items.filter(function(i) { return i.status !== "rejected"; }) : o.items).map(function(i) {
        var mi = getMenuItem(i.menu_item_id);
        return mi ? `
      <div class="flex justify-between text-xs">
        <span>${mi.name} x${i.quantity}${i.notes ? ' <span style="color:var(--muted)">(' + i.notes + ')</span>' : ''}</span>
        <span style="color:var(--muted)">${formatCurrency(i.unit_price * i.quantity)}</span>
      </div>` : '';
      }).join('')}
    </div>
    <div class="border-t my-2" style="border-color:var(--border)"></div>
    <div class="flex justify-between text-xs mb-1" style="color:var(--muted)"><span>Subtotal</span><span>${formatCurrency(subtotal)}</span></div>
    ${o.promo_discount ? `<div class="flex justify-between text-xs mb-1" style="color:var(--success)"><span><i class="fas fa-tag mr-1"></i>Diskon Promo</span><span>-${formatCurrency(o.promo_discount)}</span></div>` : ''}
    ${o.shipping_cost && o.shipping_cost > 0 ? `<div class="flex justify-between text-xs mb-1" style="color:var(--accent)"><span><i class="fas fa-truck mr-1"></i>Ongkos Kirim</span><span>${formatCurrency(o.shipping_cost)}</span></div>` : ''}
    ${isDelivered && o.service_fee > 0 ? `<div class="flex justify-between text-xs mb-1" style="color:#e07a3a"><span><i class="fas fa-hand-holding-usd mr-1"></i>Biaya Layanan</span><span>${formatCurrency(o.service_fee)}</span></div>` : ''}
    ${!isDelivered && dineInFee > 0 ? `<div class="flex justify-between text-xs mb-1" style="color:#e07a3a"><span><i class="fas fa-hand-holding-usd mr-1"></i>Biaya Layanan</span><span>${formatCurrency(dineInFee)}</span></div>` : ''}
    <div class="flex justify-between text-xs mb-1" style="color:var(--accent)"><span><i class="fas fa-receipt mr-1"></i>Pajak</span><span>${formatCurrency(Math.round(tax))}</span></div>
    <div class="border-t my-2" style="border-color:var(--border)"></div>
    <div class="flex justify-between font-bold text-sm"><span>Total</span><span style="color:var(--accent)">${formatCurrency(o.total_amount)}</span></div>
  </div>
  ${isDelivery ? `
  <div class="flex justify-between text-xs mb-1" style="color:var(--muted)"><span>Metode Pembayaran</span><span>${o.payment_method === 'qris' ? 'QRIS' : o.payment_method === 'bank_transfer' ? 'Transfer Bank' : o.payment_method === 'digital' ? 'Digital' : o.payment_method === '' ? 'Bayar Nanti (COD)' : 'Tunai/COD'}</span></div>
  <div class="flex justify-between text-xs mb-1" style="color:var(--muted)"><span>Status Bayar</span><span class="badge" style="${o.payment_status === 'paid' ? 'background:rgba(46,204,113,.15);color:var(--success)' : 'background:rgba(52,152,219,.15);color:#3498db'}">${o.payment_status === 'paid' ? 'Lunas' : 'Belum Setor'}</span></div>
  <div class="border-t pt-3 mt-3" style="border-color:var(--border)">
    ${o.shipping_cost && o.shipping_cost > 0 ? `
    <div class="flex justify-between text-xs mb-1" style="color:var(--muted)"><span><i class="fas fa-hand-holding-dollar mr-1"></i>Jasa Aplikasi</span><span style="color:var(--success)">${formatCurrency(calcCourierFee(o.shipping_cost))}</span></div>
    <div class="flex justify-between text-xs mb-2 pb-2" style="border-bottom:1px dashed var(--border);color:var(--danger)"><span><i class="fas fa-wallet mr-1"></i>Pendapatan Kurir</span><span>-${formatCurrency(netOngkir)}</span></div>
    ` : ''}
    <div class="flex justify-between text-xs" style="color:var(--muted)"><span>Waktu Selesai</span><span>${formatTime(o.created_at)}</span></div>
    ${o.delivery_location && o.delivery_location.lat ? (function() {
      var d = calcDistance(DB.cafe.location.lat, DB.cafe.location.lng, o.delivery_location.lat, o.delivery_location.lng);
      var meter = Math.round(d).toLocaleString('id-ID');
      var km = (d / 1000).toFixed(1).replace('.', ',');
      var label = d < 1000 ? meter + ' meter' : meter + ' m (' + km + ' km)';
      return `<div class="flex justify-between text-xs mt-1" style="color:var(--accent)"><span><i class="fas fa-store mr-1"></i>Cafe → Pelanggan</span><span>${label}</span></div>`;
    })() : ''}
  </div>
  ` : `
  <div class="flex justify-between text-xs mb-1 mt-3" style="color:var(--muted)"><span>Pembayaran</span><span>${o.payment_method === "qris" ? "QRIS" : o.payment_method === "bank_transfer" ? "Transfer Bank" : o.payment_method === "digital" ? "Digital" : o.payment_method === "cod" ? "COD" : o.payment_method === "" ? "Bayar Nanti" : "Tunai"}</span></div>
  <div class="flex justify-between text-xs mb-4" style="color:var(--muted)"><span>Status Bayar</span><span class="badge ${o.payment_status === "paid" ? "badge-paid" : "badge-unpaid"}">${o.payment_status === "paid" ? "Lunas" : "Belum Bayar"}</span></div>
  `}
  <div class="flex gap-2 mt-4">
    ${o.status !== "cancelled" && o.status !== "rejected" ? `<button onclick="printCashierInvoice('${o.id}')" class="btn-primary flex-1 text-center"><i class="fas fa-print mr-1"></i>Cetak Invoice</button>` : ''}
    <button onclick="closeModal()" class="btn-secondary flex-1 text-center">Tutup</button>
  </div>
</div>
  `);
}

function printRevenueDetail() {
  var startDate =
    State.financeStartDate ||
    (function() {
      var d = new Date();
      d.setDate(d.getDate() - 6);
      return d.toLocaleDateString('sv-SE');
    })();
  var endDate =
    State.financeEndDate || new Date().toLocaleDateString('sv-SE');

  var isPlayground = State._showPendapatan === 'playground';
  var title = isPlayground ? 'Detail Pendapatan Playground' : 'Detail Pendapatan Cafe';
  var headerLabel = isPlayground ? 'Pendapatan Playground' : 'Detail Pendapatan Cafe';

  var filtered, totalRev, ticketCount;

  if (isPlayground) {
    filtered = getPlaygroundPeriodEntries(startDate, endDate);
    totalRev = filtered.reduce(function(s, e) { return s + (e.total_amount || 0); }, 0);
    ticketCount = filtered.filter(function(e) { return !e._isExtra; }).length;
  } else {
    var paidOrders = DB.orders.filter(
      function(o) { return o.payment_status === "paid" && o.created_at && o.status !== "cancelled" && o.status !== "rejected"; },
    );
    filtered = paidOrders.filter(function(o) {
      var d = new Date(o.created_at).toLocaleDateString('sv-SE');
      return d >= startDate && d <= endDate;
    });
    totalRev = filtered.reduce(function(s, o) { return s + effectiveAmount(o); }, 0);
  }

  var rows = isPlayground
    ? filtered.map(function(e) {
        var date = e.created_at ? new Date(e.created_at).toLocaleDateString('sv-SE') : "";
        var time = e.created_at ? new Date(e.created_at).toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'}) : "-";
        if (e._isExtra) {
          var methodBadge = getPgMethodBadge(e._paymentMethod);
          return `<tr style="opacity:.65;font-style:italic"><td>${formatDate(date)}</td><td class="muted">${time}</td><td>${e.customer_name || "-"} <em style="color:#999;font-size:10px">(Extra)</em> ${methodBadge}</td><td class="muted" style="color:#e67e22">${e._desc || "-"}</td><td class="right green">${formatCurrency(e.total_amount || 0)}</td></tr>`;
        }
        var kidList = (e.children || []).map(function(c) { return c.name; }).join(", ");
        var durasi = e.hours ? e.hours + " jam" : "-";
        var keterangan = durasi + (kidList ? " (" + kidList + ")" : "");
        var methodBadge = getPgMethodBadge(e._paymentMethod);
        var statusLabel = e.status === "active" ? "Aktif" : "Selesai";
        var statusColor = statusLabel === "Aktif" ? "#f39c12" : "#27ae60";
        return `<tr><td>${formatDate(date)}</td><td class="muted">${time}</td><td>${e.customer_name || "-"} <span style="font-size:10px;color:${statusColor}">${statusLabel}</span> ${methodBadge}</td><td class="muted">${keterangan}</td><td class="right green">${formatCurrency(e.total_amount || 0)}</td></tr>`;
      }).join("")
    : filtered
        .map(function(o) {
          var date = o.created_at ? new Date(o.created_at).toLocaleDateString('sv-SE') : "";
          var time = o.created_at ? new Date(o.created_at).toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'}) : "-";
          var menuCount = {};
          (o.items || []).forEach(function(item) {
            var mi = DB.menuItems.find(function(m) { return m.id === item.menu_item_id; });
            if (mi)
              menuCount[mi.name] = (menuCount[mi.name] || 0) + item.quantity;
          });
          var menuList = Object.entries(menuCount)
            .map(function(e) { return e[0] + " x" + e[1]; })
            .join(", ");
          return `<tr><td>${formatDate(date)}</td><td class="muted">${time}</td><td class="muted">#${o.id.slice(-5).toUpperCase()} (${getOrderTypeName(o.order_type)})<br><span style="font-size:10px;color:${o.payment_method === "cash" || o.payment_method === "cod" ? "#27ae60" : "#e07a3a"}">${o.payment_method === "cash" || o.payment_method === "cod" ? "Tunai" : "Digital"}</span></td><td class="muted">${menuList || "-"}</td><td class="right green">${formatCurrency(effectiveAmount(o))}</td></tr>`;
        })
        .join("");

  var headerCols = isPlayground
    ? '<th>Tanggal</th><th>Jam</th><th>Pelanggan</th><th>Keterangan</th><th class="right">Total</th>'
    : '<th>Tanggal</th><th>Jam</th><th>Order</th><th>Menu</th><th class="right">Pendapatan</th>';
  var footColspan = isPlayground ? '4' : '4';

  var w = window.open("", "_blank");
  w.document.write(`
    <html><head><title>${title}</title>
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
    <h2>${headerLabel}</h2>
    <div class="meta">Periode: ${startDate} s/d ${endDate}</div>
    <div class="flex">
      <div class="box"><div class="lbl">Total Pendapatan</div><div class="val">${formatCurrency(totalRev)}</div></div>
      <div class="box"><div class="lbl">Total Transaksi</div><div class="val">${isPlayground ? ticketCount : filtered.length}</div></div>
    </div>
    <table>
      <thead><tr>${headerCols}</tr></thead>
      <tbody>${rows}</tbody>
      <tfoot><tr class="tfoot"><td colspan="${footColspan}">Total</td><td class="right green">${formatCurrency(totalRev)}</td></tr></tfoot>
    </table>
    <script>window.print()<${"/"}script></body></html>
  `);
  w.document.close();
}

function printExpenseDetail() {
  var startDate =
    State.financeStartDate ||
    (function() {
      var d = new Date();
      d.setDate(d.getDate() - 6);
      return d.toLocaleDateString('sv-SE');
    })();
  var endDate =
    State.financeEndDate || new Date().toLocaleDateString('sv-SE');
  var expenses = (DB.expenses || []).filter(
    function(e) { return e.date && e.date >= startDate && e.date <= endDate; },
  );
  var totalExp = expenses.reduce(function(s, e) { return s + e.amount; }, 0);
  var catTotals = {};
  expenses.forEach(function(e) {
    catTotals[e.category] = (catTotals[e.category] || 0) + e.amount;
  });
  var w = window.open("", "_blank");
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
      <tbody>${expenses.map(function(e) { return `<tr><td>${e.date}</td><td class="muted">${e.time || "-"}</td><td>${e.category}</td><td>${e.note && e.note.startsWith('Ongkir kurir') ? `[${e.paymentMethod === 'cod' ? 'Tunai/COD' : 'Digital'}] Ongkir Kurir` : (e.note || "-")}</td><td class="right red">${formatCurrency(e.amount)}</td></tr>`; }).join("")}</tbody>
      <tfoot><tr class="tfoot"><td colspan="4">Total</td><td class="right red">${formatCurrency(totalExp)}</td></tr></tfoot>
    </table>
    <script>window.print()<${"/"}script></body></html>
  `);
  w.document.close();
}

function printAvgDetail() {
  var startDate =
    State.financeStartDate ||
    (function() {
      var d = new Date();
      d.setDate(d.getDate() - 6);
      return d.toLocaleDateString('sv-SE');
    })();
  var endDate =
    State.financeEndDate || new Date().toLocaleDateString('sv-SE');
  var data = getMergedDailyEntries(startDate, endDate);
  var totalRev = data.reduce(function(s, d) { return s + d.revenue; }, 0);
  var dayCount = Math.max(
    1,
    Math.round((new Date(endDate) - new Date(startDate)) / 86400000) + 1,
  );
  var w = window.open("", "_blank");
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
      <thead><tr><th>Tanggal</th><th>Sumber</th><th class="right">Pendapatan</th><th class="right">Rata-rata Kumulatif</th></tr></thead>
      <tbody>${data
        .map(function(d, i) {
          var cumAvg = Math.round(
            data.slice(0, i + 1).reduce(function(s, x) { return s + x.revenue; }, 0) / (i + 1),
          );
          var tag = d.source === "playground"
            ? '<span style="color:#8e44ad;font-size:12px">Playground</span>'
            : '<span style="color:#27ae60;font-size:12px">Cafe</span>';
          return `<tr><td>${formatDate(d.date)}</td><td>${tag}</td><td class="right green">${formatCurrency(d.revenue)}</td><td class="right">${formatCurrency(cumAvg)}</td></tr>`;
        })
        .join("")}</tbody>
      <tfoot><tr class="tfoot"><td>Total</td><td></td><td class="right green">${formatCurrency(totalRev)}</td><td class="right">${formatCurrency(Math.round(totalRev / dayCount))}</td></tr></tfoot>
    </table>
    <script>window.print()<${"/"}script></body></html>
  `);
  w.document.close();
}

function printProfitDetail() {
  var startDate =
    State.financeStartDate ||
    (function() {
      var d = new Date();
      d.setDate(d.getDate() - 6);
      return d.toLocaleDateString('sv-SE');
    })();
  var endDate =
    State.financeEndDate || new Date().toLocaleDateString('sv-SE');
  var data = getCombinedDailyRevenue(startDate, endDate);
  var totalRev = data.reduce(function(s, d) { return s + d.revenue; }, 0);
  var expenses = (DB.expenses || []).filter(
    function(e) { return e.date && e.date >= startDate && e.date <= endDate; },
  );
  var totalExp = expenses.reduce(function(s, e) { return s + e.amount; }, 0);
  var netProfit = totalRev - totalExp;
  var expByDate = {};
  expenses.forEach(function(e) {
    if (!expByDate[e.date]) expByDate[e.date] = 0;
    expByDate[e.date] += e.amount;
  });
  var w = window.open("", "_blank");
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
      <div class="box"><div class="lbl">Laba Bersih</div><div class="val" style="color:${netProfit >= 0 ? "#27ae60" : "#e74c3c"}">${formatCurrency(netProfit)}</div></div>
    </div>
    <table>
      <thead><tr><th>Tanggal</th><th class="right">Pendapatan</th><th class="right">Pengeluaran</th><th class="right">Laba</th></tr></thead>
      <tbody>${data
        .map(function(d) {
          var exp = expByDate[d.date] || 0;
          var profit = d.revenue - exp;
          return `<tr><td>${formatDate(d.date)}</td><td class="right green">${formatCurrency(d.revenue)}</td><td class="right red">${formatCurrency(exp)}</td><td class="right" style="color:${profit >= 0 ? "#27ae60" : "#e74c3c"}">${formatCurrency(profit)}</td></tr>`;
        })
        .join("")}</tbody>
      <tfoot><tr class="tfoot"><td>Total</td><td class="right green">${formatCurrency(totalRev)}</td><td class="right red">${formatCurrency(totalExp)}</td><td class="right" style="color:${netProfit >= 0 ? "#27ae60" : "#e74c3c"}">${formatCurrency(netProfit)}</td></tr></tfoot>
    </table>
    <script>window.print()<${"/"}script></body></html>
  `);
  w.document.close();
}

function showPendapatanModal() {
  showModal(`
<div class="p-4">
  <h3 class="font-display text-lg font-bold mb-4 text-center">Pilih Sumber Pendapatan</h3>
  <div class="flex gap-4">
    <div class="flex-1 stat-card cursor-pointer text-center p-4" onclick="State._showPendapatan='cafe';State.showRevenueTable=true;closeModal();render()">
      <div class="text-3xl mb-2">☕</div>
      <div class="font-semibold">Pendapatan Cafe</div>
      <div class="text-xs mt-1" style="color:var(--muted)">Pesanan makanan &amp; minuman</div>
    </div>
    <div class="flex-1 stat-card cursor-pointer text-center p-4" onclick="State._showPendapatan='playground';State.showRevenueTable=true;closeModal();render()">
      <div class="text-3xl mb-2">🎠</div>
      <div class="font-semibold">Pendapatan Playground</div>
      <div class="text-xs mt-1" style="color:var(--muted)">Tiket bermain anak</div>
    </div>
  </div>
  <div class="mt-4 text-center">
    <button onclick="closeModal()" class="btn-secondary text-sm">Tutup</button>
  </div>
</div>
  `);
}

function getPlaygroundPeriodOrders(startDate, endDate) {
  return (DB.playgroundTickets || []).filter(function(t) {
    if (t.payment_status !== "paid" || !t.created_at) return false;
    var d = new Date(t.created_at).toLocaleDateString('sv-SE');
    return d >= startDate && d <= endDate;
  });
}

function getPlaygroundPeriodEntries(startDate, endDate) {
  var entries = [];
  var tickets = getPlaygroundPeriodOrders(startDate, endDate);
  tickets.forEach(function(t) {
    entries.push({ ...t, _isExtra: false, _paymentMethod: t.payment_method });
    (t.pgTransactions || []).forEach(function(tx) {
      if (!tx.created_at) return;
      var d = new Date(tx.created_at).toLocaleDateString('sv-SE');
      if (d >= startDate && d <= endDate) {
        entries.push({
          _isExtra: true,
          _paymentMethod: tx.method,
          _parentCust: t.customer_name,
          _desc: tx.description,
          created_at: tx.created_at,
          total_amount: tx.amount,
          customer_name: t.customer_name,
        });
      }
    });
  });
  return entries.sort(function(a, b) { return (b.created_at || "").localeCompare(a.created_at || ""); });
}

function getPgMethodBadge(method) {
  if (method === "cash") return '<span style="color:var(--success);font-size:10px">Tunai</span>';
  return '<span style="color:var(--accent);font-size:10px">Digital</span>';
}

function getMergedDailyEntries(startDate, endDate) {
  var cafeData = getFinanceData(startDate, endDate);
  var cafeByDate = {};
  cafeData.forEach(function(d) { cafeByDate[d.date] = d.revenue; });

  var pgEntries = getPlaygroundPeriodEntries(startDate, endDate);
  var pgByDate = {};
  pgEntries.forEach(function(e) {
    var d = e.created_at ? new Date(e.created_at).toLocaleDateString('sv-SE') : "";
    pgByDate[d] = (pgByDate[d] || 0) + (e.total_amount || 0);
  });

  var allDates = new Set([...Object.keys(cafeByDate), ...Object.keys(pgByDate)]);
  var merged = [];
  [...allDates].sort().forEach(function(date) {
    if (cafeByDate[date] !== undefined) {
      merged.push({ date: date, source: "cafe", revenue: cafeByDate[date] });
    }
    if (pgByDate[date] !== undefined) {
      merged.push({ date: date, source: "playground", revenue: pgByDate[date] });
    }
  });
  if (!merged.length) merged.push({ date: startDate, source: "cafe", revenue: 0 });
  return merged;
}

function getCombinedDailyRevenue(startDate, endDate) {
  var cafeData = getFinanceData(startDate, endDate);
  var cafeByDate = {};
  cafeData.forEach(function(d) { cafeByDate[d.date] = d.revenue; });
  var pgEntries = getPlaygroundPeriodEntries(startDate, endDate);
  var pgByDate = {};
  pgEntries.forEach(function(e) {
    var d = e.created_at ? new Date(e.created_at).toLocaleDateString('sv-SE') : "";
    pgByDate[d] = (pgByDate[d] || 0) + (e.total_amount || 0);
  });
  var allDates = new Set([...Object.keys(cafeByDate), ...Object.keys(pgByDate)]);
  var merged = [];
  [...allDates].sort().forEach(function(date) {
    merged.push({ date: date, revenue: (cafeByDate[date] || 0) + (pgByDate[date] || 0) });
  });
  if (!merged.length) merged.push({ date: startDate, revenue: 0 });
  return merged;
}

// ------------------------------------------------------------------
// EXPENSE DETAIL MODAL
// ------------------------------------------------------------------
function showExpenseDetail(id) {
  var e = DB.expenses.find(function(x) { return x.id === id; });
  if (!e) return;
  var color = EXPENSE_COLORS[e.category] || "var(--muted)";
  var icon = EXPENSE_ICONS[e.category] || "fa-receipt";
  showModal(`
<div style="max-width:420px">
  <h3 class="font-display text-lg font-bold mb-4">Detail Pengeluaran</h3>
  <div class="flex items-center gap-3 mb-4 p-3 rounded-xl" style="background:${color}15">
    <div class="w-12 h-12 rounded-xl flex items-center justify-center" style="background:${color}22;color:${color}">
      <i class="fas ${icon} text-xl"></i>
    </div>
    <div>
      <div class="text-sm font-semibold">${e.category}</div>
      <div class="text-2xl font-bold" style="color:var(--danger)">${formatCurrency(e.amount)}</div>
    </div>
  </div>
  <div class="space-y-2 text-sm">
    <div class="flex justify-between"><span style="color:var(--muted)">Tanggal</span><span>${e.date || "-"}${e.time ? " " + e.time : ""}</span></div>
    <div class="flex justify-between"><span style="color:var(--muted)">Keterangan</span><span>${e.note || "-"}</span></div>
    ${e.volume && e.unitPrice ? `<div class="flex justify-between"><span style="color:var(--muted)">Volume</span><span>${e.volume} ${e.unit || "unit"} x ${formatCurrency(e.unitPrice)}</span></div>` : ""}
    ${e.source ? `<div class="flex justify-between"><span style="color:var(--muted)">Sumber</span><span>${e.source}</span></div>` : ""}
    ${e.note && e.note.startsWith('Ongkir kurir') ? `
    <div class="flex justify-between"><span style="color:var(--muted)">Metode Bayar</span><span>${e.paymentMethod === 'cod' ? 'Tunai/COD' : 'Digital'}</span></div>
    <div class="flex justify-between"><span style="color:var(--muted)">Jenis</span><span><span class="text-[10px] px-1.5 py-0.5 rounded" style="background:rgba(52,152,219,.15);color:#3498db"><i class="fas fa-truck mr-0.5"></i>Delivery</span></span></div>` : ""}
  </div>
  <button onclick="closeModal()" class="btn-primary w-full mt-4 text-center">Tutup</button>
</div>
  `);
}

// ------------------------------------------------------------------
// FINANCE REPORT
// ------------------------------------------------------------------
async function renderFinanceReport() {
  try {
    showSkeleton('finance-report', 'list');
    DB.orders = await API.getOrders();
    DB.expenses = await API.getExpenses();
    DB.playgroundTickets = await API.getPlaygroundTickets();
    DB.menuItems = await API.getMenu();
    var startDate =
      State.financeStartDate ||
      (function() {
        var d = new Date();
        d.setDate(d.getDate() - 6);
        return d.toLocaleDateString('sv-SE');
      })();
    var endDate =
      State.financeEndDate || new Date().toLocaleDateString('sv-SE');
    var computedSales = getFinanceData(startDate, endDate);
    var totalRev = computedSales.reduce(function(s, d) { return s + d.revenue; }, 0);
    var pgRevEntries = getPlaygroundPeriodEntries(startDate, endDate);
    var pgTotalRev = pgRevEntries.reduce(function(s, e) { return s + (e.total_amount || 0); }, 0);
    var pgTicketCount = pgRevEntries.filter(function(e) { return !e._isExtra; }).length;
    var combinedRev = totalRev + pgTotalRev;

    var filteredExpenses = (DB.expenses || []).filter(function(e) {
      if (!e.date) return false;
      return e.date >= startDate && e.date <= endDate;
    });
    var totalExp = filteredExpenses.reduce(function(s, e) { return s + e.amount; }, 0);
    var netProfit = combinedRev - totalExp;
    var dayCount = Math.max(
      1,
      Math.round((new Date(endDate) - new Date(startDate)) / 86400000) + 1,
    );

    var paidOrders = DB.orders.filter(function(o) { return o.payment_status === "paid"; });
    var periodOrders = paidOrders.filter(function(o) {
      if (!o.created_at) return false;
      var d = new Date(o.created_at).toLocaleDateString('sv-SE');
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
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <div class="stat-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="showPendapatanModal()"><div class="text-xs" style="color:var(--muted)">Total Pendapatan</div><div class="text-xs" style="color:var(--muted);font-size:10px">Cafe + Playground</div><div class="text-lg font-bold mt-1" style="color:var(--accent)">${formatCurrency(combinedRev)}</div></div>
        <div class="stat-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="State.showExpenseTable=!State.showExpenseTable;render()"><div class="text-xs" style="color:var(--muted)">Total Pengeluaran</div><div class="text-lg font-bold mt-1" style="color:var(--danger)">${formatCurrency(totalExp)}</div></div>
        <div class="stat-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="State.showAvgTable=!State.showAvgTable;render()"><div class="text-xs" style="color:var(--muted)">Rata-rata/Hari</div><div class="text-lg font-bold mt-1">${formatCurrency(Math.round(combinedRev / dayCount))}</div></div>
        <div class="stat-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="State.showProfitTable=!State.showProfitTable;render()"><div class="text-xs" style="color:var(--muted)">Laba Bersih</div><div class="text-lg font-bold mt-1" style="color:${netProfit >= 0 ? "var(--success)" : "var(--danger)"}">${formatCurrency(netProfit)}</div></div>
      </div>
      ${
        State.showRevenueTable
          ? (function() {
            var isPlayground = State._showPendapatan === 'playground';
            if (isPlayground) {
              var pgEntries = getPlaygroundPeriodEntries(startDate, endDate);
              var pgTotalRev = pgEntries.reduce(function(s, e) { return s + (e.total_amount || 0); }, 0);
              var pgTicketCount = pgEntries.filter(function(e) { return !e._isExtra; }).length;
              return `
      <div class="card mb-4">
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-semibold text-sm">Detail Pendapatan Playground</h3>
          <button onclick="State.showRevenueTable=false;State._showPendapatan=null;render()" class="text-xs" style="color:var(--muted)"><i class="fas fa-times mr-1"></i>Tutup</button>
        </div>
        <div class="grid grid-cols-2 gap-3 mb-3">
          <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Total Pendapatan</div><div class="text-base font-bold mt-1" style="color:var(--accent)">${formatCurrency(pgTotalRev)}</div></div>
          <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Total Transaksi</div><div class="text-base font-bold mt-1">${pgTicketCount}</div></div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm" style="border-collapse:collapse">
            <thead><tr style="color:var(--muted)"><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Tanggal</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Jam</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Pelanggan</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Keterangan</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:right">Total</th></tr></thead>
            <tbody>${pgEntries
              .map(function(e) {
                var date = e.created_at ? new Date(e.created_at).toLocaleDateString('sv-SE') : "";
                var time = e.created_at ? new Date(e.created_at).toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'}) : "-";
                if (e._isExtra) {
                  var methodBadge = getPgMethodBadge(e._paymentMethod);
                  return `<tr style="border-bottom:1px solid var(--border);opacity:.65;font-style:italic"><td style="border-bottom:1px solid var(--border);padding:8px 10px">${formatDate(date)}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">${time}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;font-size:12px">${e.customer_name || "-"} <em style="color:var(--muted);font-size:10px">(Extra)</em> ${methodBadge}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--warning);font-size:12px">${e._desc || "-"}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;text-align:right;color:var(--success)">${formatCurrency(e.total_amount || 0)}</td></tr>`;
                }
                var kidList = (e.children || []).map(function(c) { return c.name; }).join(", ");
                var durasi = e.hours ? e.hours + " jam" : "-";
                var keterangan = durasi + (kidList ? " (" + kidList + ")" : "");
                var statusLabel = e.status === "active" ? "Aktif" : "Selesai";
                var statusColor = statusLabel === "Aktif" ? "var(--warning)" : "var(--success)";
                var methodBadge = getPgMethodBadge(e._paymentMethod);
                return `<tr class="cursor-pointer hover:bg-white/5" style="border-bottom:1px solid var(--border)" onclick="showPlaygroundTicketDetail('${e.id}')"><td style="border-bottom:1px solid var(--border);padding:8px 10px">${formatDate(date)}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">${time}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;font-size:12px">${e.customer_name || "-"} <span style="color:${statusColor};font-size:10px">${statusLabel}</span> ${methodBadge}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">${keterangan}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;text-align:right;color:var(--success)">${formatCurrency(e.total_amount || 0)}</td></tr>`;
              })
              .join("")}</tbody>
            <tfoot><tr class="font-bold"><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)" colspan="4">Total</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent);text-align:right;color:var(--accent)">${formatCurrency(pgTotalRev)}</td></tr></tfoot>
          </table>
        </div>
        <div class="mt-3">
          <button onclick="printRevenueDetail()" class="btn-sm btn-secondary" style="padding:4px 12px;font-size:11px"><i class="fas fa-print mr-1"></i>Cetak</button>
        </div>
      </div>`;
            }
            return `
      <div class="card mb-4">
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-semibold text-sm">Detail Pendapatan Cafe</h3>
          <button onclick="State.showRevenueTable=false;State._showPendapatan=null;render()" class="text-xs" style="color:var(--muted)"><i class="fas fa-times mr-1"></i>Tutup</button>
        </div>
        <div class="grid grid-cols-2 gap-3 mb-3">
          <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Total Pendapatan</div><div class="text-base font-bold mt-1" style="color:var(--accent)">${formatCurrency(totalRev)}</div></div>
          <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Total Transaksi</div><div class="text-base font-bold mt-1">${periodOrders.length}</div></div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm" style="border-collapse:collapse">
            <thead><tr style="color:var(--muted)"><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Tanggal</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Jam</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Orders</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Menu</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:right">Pendapatan</th></tr></thead>
            <tbody>${periodOrders
              .map(function(o) {
                var date = o.created_at ? new Date(o.created_at).toLocaleDateString('sv-SE') : "";
                var time = o.created_at ? new Date(o.created_at).toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'}) : "-";
                var menuCount = {};
                (o.items || []).forEach(function(item) {
                  var mi = DB.menuItems.find(function(m) { return m.id === item.menu_item_id; });
                  if (mi)
                    menuCount[mi.name] =
                      (menuCount[mi.name] || 0) + item.quantity;
                });
                var menuList = Object.entries(menuCount)
                  .map(function(e) { return e[0] + " x" + e[1]; })
                  .join(", ");
                var encoded = encodeURIComponent(o.id);
                return `<tr class="cursor-pointer hover:bg-white/5" onclick="showFinanceOrderDetail('${encoded}')"><td style="border-bottom:1px solid var(--border);padding:8px 10px">${formatDate(date)}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">${time}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">#${o.id.slice(-5).toUpperCase()} (${getOrderTypeName(o.order_type)})<br><span style="font-size:10px;color:${o.payment_method === "cash" || o.payment_method === "cod" ? "var(--success)" : "var(--accent)"}">${o.payment_method === "cash" || o.payment_method === "cod" ? "Tunai" : "Digital"}</span></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">${menuList || "-"}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;text-align:right;color:var(--success)">${formatCurrency(effectiveAmount(o))}</td></tr>`;
              })
              .join("")}</tbody>
            <tfoot><tr class="font-bold"><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)">Total</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent);text-align:right;color:var(--accent)">${formatCurrency(totalRev)}</td></tr></tfoot>
          </table>
        </div>
        <div class="mt-3">
          <button onclick="printRevenueDetail()" class="btn-sm btn-secondary" style="padding:4px 12px;font-size:11px"><i class="fas fa-print mr-1"></i>Cetak</button>
        </div>
      </div>`;
          })()
          : ""
      }
      ${
        State.showExpenseTable
          ? `
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
            <tbody>${[...filteredExpenses]
              .sort(function(a, b) { return (b.date + (b.time || ""))
                .localeCompare(a.date + (a.time || "")); })
              .map(
                function(e) {
                  return `
              <tr class="cursor-pointer hover:bg-white/5" onclick="showExpenseDetail('${e.id}')"><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted)">${e.date || "-"}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">${e.time || "-"}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px">${e.category}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted)">${e.note && e.note.startsWith('Ongkir kurir') ? `<div class="flex items-center gap-1 flex-wrap mb-1"><span style="background:rgba(52,152,219,.15);color:#3498db;font-size:10px;padding:1px 6px;border-radius:4px;white-space:nowrap"><i class="fas fa-truck mr-0.5"></i>Delivery</span><span style="background:${e.paymentMethod === 'cod' ? 'rgba(39,174,96,.15);color:#27ae60' : 'rgba(155,89,182,.15);color:#9b59b6'};font-size:10px;padding:1px 6px;border-radius:4px;white-space:nowrap"><i class="fas ${e.paymentMethod === 'cod' ? 'fa-money-bill' : 'fa-wallet'} mr-0.5"></i>${e.paymentMethod === 'cod' ? 'Tunai/COD' : 'Digital'}</span></div><span style="color:var(--muted)">Ongkir Kurir</span>` : (e.note || "-")}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;text-align:right;color:var(--danger)">${formatCurrency(e.amount)}</td></tr>
            `;
                },
              )
              .join("")}</tbody>
            <tfoot><tr class="font-bold"><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--danger)" colspan="4">Total</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--danger);text-align:right;color:var(--danger)">${formatCurrency(totalExp)}</td></tr></tfoot>
          </table>
        </div>
        <div class="mt-3">
          <button onclick="printExpenseDetail()" class="btn-sm btn-secondary" style="padding:4px 12px;font-size:11px"><i class="fas fa-print mr-1"></i>Cetak</button>
        </div>
      </div>`
          : ""
      }
      ${
        State.showAvgTable
          ? `
      <div class="card mb-4">
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-semibold text-sm">Detail Rata-rata per Hari</h3>
          <button onclick="State.showAvgTable=false;render()" class="text-xs" style="color:var(--muted)"><i class="fas fa-times mr-1"></i>Tutup</button>
        </div>
        <div class="flex gap-3 mb-3">
          <div class="stat-card flex-1 text-center p-4">
            <div class="text-xs mb-2" style="color:var(--muted)">Rata-rata Cafe</div>
            <div class="text-base font-bold" style="color:var(--accent)">${formatCurrency(Math.round(totalRev / dayCount))}</div>
          </div>
          <div class="stat-card flex-1 text-center p-4">
            <div class="text-xs mb-2" style="color:var(--muted)">Rata-rata Playground</div>
            <div class="text-base font-bold" style="color:#8e44ad">${formatCurrency(Math.round(pgTotalRev / dayCount))}</div>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm" style="border-collapse:collapse">
            <thead><tr style="color:var(--muted)"><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Tanggal</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Sumber</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:right">Pendapatan</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:right">Rata-rata Kumulatif</th></tr></thead>
            <tbody>${
              (function() {
                var merged = getMergedDailyEntries(startDate, endDate);
                return merged
                  .map(function(d, i) {
                    var cumAvg = Math.round(
                      merged
                        .slice(0, i + 1)
                        .reduce(function(s, x) { return s + x.revenue; }, 0) /
                        (i + 1),
                    );
                    var tag = d.source === "playground"
                      ? '<span style="color:#8e44ad;font-size:10px">Playground</span>'
                      : '<span style="color:var(--accent);font-size:10px">Cafe</span>';
                    return `<tr><td style="border-bottom:1px solid var(--border);padding:8px 10px">${formatDate(d.date)}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;font-size:12px">${tag}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;text-align:right;color:var(--success)">${formatCurrency(d.revenue)}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;text-align:right;color:var(--muted)">${formatCurrency(cumAvg)}</td></tr>`;
                  })
                  .join("");
              })()
            }</tbody>
            <tfoot><tr class="font-bold"><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)">Total</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent);text-align:right;color:var(--success)">${formatCurrency(combinedRev)}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent);text-align:right;color:var(--accent)">${formatCurrency(Math.round(combinedRev / dayCount))}</td></tr></tfoot>
          </table>
        </div>
        <div class="mt-3">
          <button onclick="printAvgDetail()" class="btn-sm btn-secondary" style="padding:4px 12px;font-size:11px"><i class="fas fa-print mr-1"></i>Cetak</button>
        </div>
      </div>`
          : ""
      }
      ${
        State.showProfitTable
          ? `
      <div class="card mb-4">
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-semibold text-sm">Detail Laba Bersih</h3>
          <button onclick="State.showProfitTable=false;render()" class="text-xs" style="color:var(--muted)"><i class="fas fa-times mr-1"></i>Tutup</button>
        </div>
        <div class="grid grid-cols-3 gap-3 mb-3">
          <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Pendapatan</div><div class="text-base font-bold mt-1" style="color:var(--accent)">${formatCurrency(combinedRev)}</div></div>
          <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Pengeluaran</div><div class="text-base font-bold mt-1" style="color:var(--danger)">${formatCurrency(totalExp)}</div></div>
          <div class="stat-card" style="border-color:${netProfit >= 0 ? "rgba(39,174,96,.4)" : "rgba(231,76,60,.4)"}"><div class="text-xs" style="color:var(--muted)">Laba Bersih</div><div class="text-base font-bold mt-1" style="color:${netProfit >= 0 ? "var(--success)" : "var(--danger)"}">${formatCurrency(netProfit)}</div></div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm" style="border-collapse:collapse">
            <thead><tr style="color:var(--muted)"><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:left">Tanggal</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:right">Pendapatan</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:right">Pengeluaran</th><th style="border-bottom:2px solid var(--border);padding:8px 10px;text-align:right">Laba</th></tr></thead>
             <tbody>${(function() {
              var expByDate = {};
              filteredExpenses.forEach(function(e) {
                if (!expByDate[e.date]) expByDate[e.date] = 0;
                expByDate[e.date] += e.amount;
              });
              return getCombinedDailyRevenue(startDate, endDate)
                .map(function(d) {
                  var exp = expByDate[d.date] || 0;
                  var profit = d.revenue - exp;
                  return `<tr><td style="border-bottom:1px solid var(--border);padding:8px 10px">${formatDate(d.date)}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;text-align:right;color:var(--success)">${formatCurrency(d.revenue)}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;text-align:right;color:var(--danger)">${formatCurrency(exp)}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;text-align:right;color:${profit >= 0 ? "var(--success)" : "var(--danger)"}">${formatCurrency(profit)}</td></tr>`;
                })
                .join("");
            })()}</tbody>
            <tfoot><tr class="font-bold"><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)">Total</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent);text-align:right;color:var(--success)">${formatCurrency(totalRev)}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent);text-align:right;color:var(--danger)">${formatCurrency(totalExp)}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent);text-align:right;color:${netProfit >= 0 ? "var(--success)" : "var(--danger)"}">${formatCurrency(netProfit)}</td></tr></tfoot>
          </table>
        </div>
        <div class="mt-3">
          <button onclick="printProfitDetail()" class="btn-sm btn-secondary" style="padding:4px 12px;font-size:11px"><i class="fas fa-print mr-1"></i>Cetak</button>
        </div>
      </div>`
          : ""
      }

      <div class="grid md:grid-cols-2 gap-4 mb-4">
        <div class="card"><canvas id="chart-finance-detail" height="200"></canvas></div>
        <div class="card">
          <h3 class="font-semibold text-sm mb-3">Pengeluaran per Kategori</h3>
          <canvas id="chart-expense-category" height="180"></canvas>
        </div>
      </div>
      <div class="card mb-4"><canvas id="chart-cashflow" height="180"></canvas></div>
    </div>`;
  } catch(e) { console.error(e); showToast('Gagal memuat laporan keuangan', 'error'); return ''; }
  finally { hideSkeleton('finance-report'); }
}
