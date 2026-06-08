// ============================================================
// CASHIER VIEW — Accept, Payment, Settle, Report, Profile
// ============================================================
function acceptCashierOrder(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  o.accepted = true;
  if (o.payment_method === "cash" && o.payment_status === "unpaid") {
    o.payment_status = "paid";
  }
  addNotification({
    title: 'Pesanan Diterima Kasir',
    message: '#' + o.id.slice(-5).toUpperCase() + ' — diterima, menunggu dapur',
    type: 'order',
    icon: 'fa-check-circle',
    targetRoles: ['kitchen', 'customer', 'admin', 'manager'],
    relatedOrderId: o.id
  });
  showToast(
    `Pesanan #${o.id.slice(-5).toUpperCase()} diterima — menunggu dapur`,
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
  if (o.shipping_cost > 0) {
    const kurir = getUser(o.courier_id);
    const netOngkir = o.shipping_cost - calcCourierFee(o.shipping_cost);
    DB.expenses.push({
      id: "e" + Date.now(),
      date: new Date().toLocaleDateString('sv-SE'),
      time: new Date().toTimeString().slice(0, 5),
      category: "Operasional",
      amount: netOngkir,
      note: "Ongkir kurir — #" + o.id.slice(-5).toUpperCase() + " — " + (kurir ? kurir.name : "—"),
      source: "Cafe",
      orderType: "delivery",
      paymentMethod: "cod",
    });
  }
  notifyPayment(o, 'COD (Setoran Kurir)');
  showToast(
    `Setoran diterima — Pesanan #${o.id.slice(-5).toUpperCase()} selesai`,
    "success",
  );
  render();
}

function cashierSettleDineIn(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  o.status = "completed";
  o.payment_status = "paid";
  o.payment_method = "cash";
  if (o.table_id) {
    const hasOther = DB.orders.some(x =>
      x.table_id === o.table_id && x.id !== o.id &&
      !['completed', 'cancelled', 'rejected'].includes(x.status)
    );
    if (!hasOther) {
      const t = getTable(o.table_id);
      if (t) t.status = 'available';
    }
  }
  notifyPayment(o, 'Setoran Waiter');
  showToast(`Setoran diterima — Pesanan #${o.id.slice(-5).toUpperCase()} selesai, meja dikosongkan`, "success");
  render();
}

function payOngkir(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  o.ongkir_status = "paid";
  const kurir = getUser(o.courier_id);
  if (o.shipping_cost > 0) {
    const netOngkir = o.shipping_cost - calcCourierFee(o.shipping_cost);
    DB.expenses.push({
      id: "e" + Date.now(),
      date: new Date().toLocaleDateString('sv-SE'),
      time: new Date().toTimeString().slice(0, 5),
      category: "Operasional",
      amount: netOngkir,
      note: "Ongkir kurir — #" + o.id.slice(-5).toUpperCase() + " — " + (kurir ? kurir.name : "—"),
      source: "Cafe",
      orderType: "delivery",
      paymentMethod: o.payment_method || "digital",
    });
  }
  addNotification({
    title: 'Ongkir Dibayar',
    message: '#' + o.id.slice(-5).toUpperCase() + ' — Ongkir ' + formatCurrency(o.shipping_cost - calcCourierFee(o.shipping_cost)) + ' sudah dibayar, silakan konfirmasi',
    type: 'payment',
    icon: 'fa-hand-holding-dollar',
    targetRoles: ['courier'],
    relatedOrderId: o.id,
  });
  showToast("Ongkir " + formatCurrency(o.shipping_cost - calcCourierFee(o.shipping_cost)) + " dibayarkan ke " + (kurir ? kurir.name : 'kurir'), "success");
  render();
}

function renderCashTable() {
  const dateVal = State.cashierReportDate || new Date().toLocaleDateString('sv-SE');
  const orders = DB.orders.filter(o => {
    if (o.payment_status !== 'paid' || (o.payment_method !== 'cash' && o.payment_method !== 'cod') || !o.created_at) return false;
    const d = new Date(o.created_at).toLocaleDateString('sv-SE');
    return d === dateVal;
  }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const total = orders.reduce((s, o) => s + effectiveAmount(o), 0);
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
            const date = o.created_at ? new Date(o.created_at).toLocaleDateString('sv-SE') : '';
            const time = o.created_at ? new Date(o.created_at).toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'}) : '-';
            const menuCount = {};
            (o.items || []).forEach(item => {
              const mi = DB.menuItems.find(m => m.id === item.menu_item_id);
              if (mi) menuCount[mi.name] = (menuCount[mi.name] || 0) + item.quantity;
            });
            const menuList = Object.entries(menuCount).map(([name, qty]) => name + ' x' + qty).join(', ');
            const encoded = encodeURIComponent(o.id);
            const ea = effectiveAmount(o);
            return `<tr class="cursor-pointer hover:bg-white/5" onclick="${o.order_type === 'delivery' ? `showCashierActiveOrderDetail('${o.id}')` : `showFinanceOrderDetail('${encoded}')`}"><td style="border-bottom:1px solid var(--border);padding:8px 10px">${formatDate(date)}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">${time}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">#${o.id.slice(-5).toUpperCase()} (${getOrderTypeName(o.order_type)})${o.customer_name ? '<br><span style="font-size:10px">' + o.customer_name + '</span>' : ''}${o.user_id && o.user_id !== 'walk-in' && getUser(o.user_id) ? '<br><span style="font-size:10px;color:var(--accent)">' + getUser(o.user_id).email + '</span>' : ''}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">${menuList || '-'}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;text-align:right;color:var(--success)">${formatCurrency(ea)}</td></tr>`;
          }).join('')}</tbody>
          <tfoot><tr class="font-bold"><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)">Total</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent);text-align:right;color:var(--accent)">${formatCurrency(total)}</td></tr></tfoot>
        </table>
      </div>
    </div>`;
}

function renderDigitalTable() {
  const dateVal = State.cashierReportDate || new Date().toLocaleDateString('sv-SE');
  const orders = DB.orders.filter(o => {
    if (o.payment_status !== 'paid' || (o.payment_method !== 'digital' && o.payment_method !== 'qris' && o.payment_method !== 'bank_transfer') || !o.created_at) return false;
    const d = new Date(o.created_at).toLocaleDateString('sv-SE');
    return d === dateVal;
  }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const total = orders.reduce((s, o) => s + effectiveAmount(o), 0);
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
            const date = o.created_at ? new Date(o.created_at).toLocaleDateString('sv-SE') : '';
            const time = o.created_at ? new Date(o.created_at).toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'}) : '-';
            const menuCount = {};
            (o.items || []).forEach(item => {
              const mi = DB.menuItems.find(m => m.id === item.menu_item_id);
              if (mi) menuCount[mi.name] = (menuCount[mi.name] || 0) + item.quantity;
            });
            const menuList = Object.entries(menuCount).map(([name, qty]) => name + ' x' + qty).join(', ');
            const encoded = encodeURIComponent(o.id);
            const payLabel = o.payment_method === 'qris' ? 'QRIS' : o.payment_method === 'bank_transfer' ? 'Transfer' : 'Digital';
            const ea = effectiveAmount(o);
            return `<tr class="cursor-pointer hover:bg-white/5" onclick="${o.order_type === 'delivery' ? `showCashierActiveOrderDetail('${o.id}')` : `showFinanceOrderDetail('${encoded}')`}"><td style="border-bottom:1px solid var(--border);padding:8px 10px">${formatDate(date)}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">${time}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">#${o.id.slice(-5).toUpperCase()} (${getOrderTypeName(o.order_type)})${o.customer_name ? '<br><span style="font-size:10px">' + o.customer_name + '</span>' : ''}${o.user_id && o.user_id !== 'walk-in' && getUser(o.user_id) ? '<br><span style="font-size:10px;color:var(--accent)">' + getUser(o.user_id).email + '</span>' : ''}<br><span style="font-size:10px;color:var(--accent)">${payLabel}</span></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;color:var(--muted);font-size:12px">${menuList || '-'}</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;text-align:right;color:var(--accent)">${formatCurrency(ea)}</td></tr>`;
          }).join('')}</tbody>
          <tfoot><tr class="font-bold"><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)">Total</td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent)"></td><td style="border-bottom:1px solid var(--border);padding:8px 10px;border-top:2px solid var(--accent);text-align:right;color:var(--accent)">${formatCurrency(total)}</td></tr></tfoot>
        </table>
      </div>
    </div>`;
}

function renderCashierReport() {
  const dateVal = State.cashierReportDate || new Date().toLocaleDateString('sv-SE');
  const paidInRange = DB.orders.filter(o => {
    if (o.payment_status !== 'paid' || !o.created_at) return false;
    const d = new Date(o.created_at).toLocaleDateString('sv-SE');
    return d === dateVal;
  });
  const cashInRange = paidInRange.filter(o => o.payment_method === 'cash' || o.payment_method === 'cod');
  const cashTotal = cashInRange.reduce((s, o) => s + effectiveAmount(o), 0);
  const digitalInRange = paidInRange.filter(o => o.payment_method === 'digital' || o.payment_method === 'qris' || o.payment_method === 'bank_transfer');
  const digitalTotal = digitalInRange.reduce((s, o) => s + effectiveAmount(o), 0);
  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Laporan Harian</h2>
    <div class="mb-4">
      <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Filter Tanggal</label>
      <input type="date" id="cashier-report-date" class="input-field w-full" value="${dateVal}" onchange="State.cashierReportDate=this.value;render()">
    </div>
    <div class="grid grid-cols-2 gap-3 mb-5">
      <div class="stat-card cursor-pointer" onclick="State.showCashierCashTable=!State.showCashierCashTable;render()"><div class="flex items-center gap-2"><i class="fas fa-money-bill-wave" style="color:var(--success);font-size:18px"></i><span class="text-xs" style="color:var(--muted)">Bayar Tunai</span></div><div class="text-xl font-bold mt-1" style="color:var(--success)">${formatCurrency(cashTotal)}</div></div>
      <div class="stat-card cursor-pointer" onclick="State.showCashierDigitalTable=!State.showCashierDigitalTable;render()"><div class="flex items-center gap-2"><i class="fas fa-credit-card" style="color:var(--accent);font-size:18px"></i><span class="text-xs" style="color:var(--muted)">Bayar Digital</span></div><div class="text-xl font-bold mt-1" style="color:var(--accent)">${formatCurrency(digitalTotal)}</div></div>
      <div class="stat-card cursor-pointer" onclick="State.currentTab['cashier']='payment';State.showPaymentHistory=true;render()"><div class="flex items-center gap-2"><i class="fas fa-check-circle" style="color:var(--success);font-size:18px"></i><span class="text-xs" style="color:var(--muted)">Lunas</span></div><div class="text-xl font-bold mt-1" style="color:var(--success)">${paidInRange.length}</div></div>
      <div class="stat-card cursor-pointer" onclick="State.currentTab['cashier']='payment';render()"><div class="flex items-center gap-2"><i class="fas fa-exclamation-circle" style="color:var(--danger);font-size:18px"></i><span class="text-xs" style="color:var(--muted)">Belum Bayar</span></div><div class="text-xl font-bold mt-1" style="color:var(--danger)">${DB.orders.filter(o => {
        if (o.payment_status !== 'unpaid' || !o.created_at) return false;
        if (o.status === 'cancelled' || o.status === 'rejected') return false;
        const d = new Date(o.created_at).toLocaleDateString('sv-SE');
        return d === dateVal;
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
      <h3 class="font-semibold text-sm mb-3">Pesanan Hari Ini</h3>
      ${(() => {
        const todayOrders = DB.orders.filter(o => {
          if (!o.created_at) return false;
          const d = new Date(o.created_at).toLocaleDateString('sv-SE');
          return d === dateVal;
        }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 10);
        if (!todayOrders.length) return '<p class="text-sm text-center py-4" style="color:var(--muted)">Belum ada pesanan hari ini</p>';
        return `<div class="space-y-2 max-h-72 overflow-y-auto">${todayOrders.map(o => {
          const staffIcon = o.waiter_id && getUser(o.waiter_id) ? '<i class="fas fa-user-tie ml-2" style="color:var(--accent)"></i> ' + getUser(o.waiter_id).name : '';
          const courierIcon = o.courier_id && getUser(o.courier_id) ? '<i class="fas fa-motorcycle ml-2" style="color:var(--accent)"></i> ' + getUser(o.courier_id).name : '';
          return `
        <div class="flex items-center justify-between text-sm py-2.5 px-3 rounded-xl cursor-pointer hover:bg-white/5" style="border:1px solid var(--border)" onclick="${o.order_type === 'delivery' ? `showCashierActiveOrderDetail('${o.id}')` : `showFinanceOrderDetail('${encodeURIComponent(o.id)}')`}">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-1.5">
              <span class="font-medium text-xs">#${o.id.slice(-5).toUpperCase()}</span>
              <span class="badge ${getStatusBadge(o.status)}" style="font-size:8px">${getStatusLabel(o.status)}</span>
              ${o.promo_discount ? '<span class="text-[10px]" style="color:var(--success)"><i class="fas fa-tag"></i></span>' : ''}
            </div>
            <div class="text-[10px] truncate mt-0.5" style="color:var(--muted)">
              ${getOrderTypeName(o.order_type)}${o.customer_name ? ' — ' + o.customer_name : ''}${o.user_id && o.user_id !== 'walk-in' && getUser(o.user_id) ? ' (' + getUser(o.user_id).email + ')' : ''}${staffIcon}${courierIcon}
            </div>
          </div>
          <span class="font-semibold text-xs whitespace-nowrap ml-3" style="color:${o.payment_status === 'paid' ? 'var(--success)' : 'var(--muted)'}">${formatCurrency(effectiveAmount(o))}</span>
        </div>`;
        }).join('')}</div>`;
      })()}
    </div>
    <div class="card"><canvas id="chart-cashier" height="200"></canvas></div>
  </div>`;
}

function renderCashierProfile() {
  return renderGenericProfile();
}
