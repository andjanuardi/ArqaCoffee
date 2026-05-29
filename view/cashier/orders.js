// ============================================================
// CASHIER VIEW — Orders & Payment
// ============================================================
function showPaymentModal(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  const t = o.table_id ? getTable(o.table_id) : null;
  showModal(`
    <div>
      <div class="flex justify-between items-start mb-4">
        <div><h3 class="font-display text-lg font-bold">Pembayaran</h3><p class="text-xs" style="color:var(--muted)">#${o.id.slice(-5).toUpperCase()} — ${getOrderTypeName(o.order_type)}${t ? " — Meja " + t.number : ""}${o.customer_name ? " — " + o.customer_name : ""}${o.user_id && o.user_id !== 'walk-in' && getUser(o.user_id) ? ' (' + getUser(o.user_id).email + ')' : ''}</p></div>
        <span class="font-bold text-lg" style="color:var(--accent)">${formatCurrency(o.total_amount)}</span>
      </div>
      <div class="card mb-4" style="background:var(--bg2)">
        <div class="space-y-2">
          ${o.items
            .map((i) => {
              const mi = getMenuItem(i.menu_item_id);
              return mi
                ? `<div class="flex justify-between text-sm"><span>${mi.name} x${i.quantity}${i.notes ? ' <span style="color:var(--muted)">(' + i.notes + ")</span>" : ""}</span><span style="color:var(--muted)">${formatCurrency(i.unit_price * i.quantity)}</span></div>`
                : "";
            })
            .join("")}
        </div>
        ${o.promo_discount ? `<div class="flex justify-between text-xs mt-2 pt-2" style="border-top:1px solid var(--border);color:var(--success)"><span><i class="fas fa-tag mr-1"></i>Diskon Promo</span><span>-${formatCurrency(o.promo_discount)}</span></div>` : ""}
      </div>
      <div class="flex gap-2 mb-3">
        <button onclick="closeModal();processPayment('${o.id}')" class="btn-primary flex-1 text-center py-3"><i class="fas fa-wallet mr-2"></i>Digital</button>
        <button onclick="closeModal();processCashPayment('${o.id}')" class="btn-secondary flex-1 text-center py-3" style="background:rgba(39,174,96,.1);border-color:rgba(39,174,96,.3);color:var(--success)"><i class="fas fa-money-bill-wave mr-2"></i>Tunai</button>
      </div>
      <button onclick="closeModal();printCashierInvoice('${o.id}')" class="btn-sm w-full text-center" style="background:transparent;border:1px solid var(--border);color:var(--muted);padding:8px;border-radius:10px"><i class="fas fa-print mr-1"></i>Cetak Invoice</button>
    </div>
  `);
}

function renderCashierView() {
  const tab = State.currentTab.cashier || "orders";
  if (tab === "orders") return renderCashierOrders();
  if (tab === "payment") return renderCashierPayment();
  if (tab === "report") return renderCashierReport();
  if (tab === "profile") return renderCashierProfile();
  if (tab === "create") return renderCashierCreateOrder();
  if (tab === "tables-mgmt") return renderAdminTablesMgmt();
  return renderCashierOrders();
}

function renderCashierOrders() {
  const pending = DB.orders.filter((o) =>
    ["pending", "cooking", "ready", "delivered"].includes(o.status),
  );
  const completed = DB.orders
    .filter((o) => o.status === "completed" || o.status === "rejected" || o.status === "cancelled")
    .slice(0, 5);
  return `
  <div class="animate-fade-up">
    <div class="flex justify-between items-center mb-4">
      <h2 class="font-display text-xl font-bold">Pesanan Masuk</h2>
      <button onclick="State.currentTab.cashier='create';render()" class="btn-primary btn-sm"><i class="fas fa-plus mr-1"></i>Buat Pesanan</button>
    </div>
    <div class="grid grid-cols-3 gap-3 mb-5">
      <div class="stat-card text-center"><div class="text-2xl font-bold" style="color:var(--warning)">${pending.filter((o) => o.status === "pending").length}</div><div class="text-[10px]" style="color:var(--muted)">Menunggu</div></div>
      <div class="stat-card text-center"><div class="text-2xl font-bold" style="color:var(--accent)">${pending.filter((o) => o.status === "cooking").length}</div><div class="text-[10px]" style="color:var(--muted)">Dimasak</div></div>
      <div class="stat-card text-center"><div class="text-2xl font-bold" style="color:var(--success)">${pending.filter((o) => o.status === "ready").length}</div><div class="text-[10px]" style="color:var(--muted)">Siap Saji</div></div>
    </div>
    <h3 class="font-semibold text-sm mb-3">Aktif</h3>
    <div class="space-y-3 mb-6">
      ${pending.length === 0 ? '<p class="text-sm text-center py-8" style="color:var(--muted)">Tidak ada pesanan aktif</p>' : ""}
      ${pending
        .map((o) => {
          const t = o.table_id ? getTable(o.table_id) : null;
          return `
        <div class="order-card">
          <div class="flex justify-between items-start mb-2">
            <div>
              <span class="font-bold text-sm">#${o.id.slice(-5).toUpperCase()}</span>
              <span class="badge ${getStatusBadge(o.status)} ml-2">${getStatusLabel(o.status)}</span>
              <span class="badge ${o.payment_status === "paid" ? "badge-paid" : "badge-unpaid"} ml-1">${o.payment_status === "paid" ? "Lunas" : "Belum Bayar"}</span>
            </div>
            <span class="text-xs" style="color:var(--muted)">${formatTime(o.created_at)}</span>
          </div>
          <div class="text-xs mb-2" style="color:var(--muted)">
            <i class="fas ${o.order_type === "dine-in" ? "fa-chair" : "fa-motorcycle"} mr-1"></i>${getOrderTypeName(o.order_type)}${t ? " — Meja " + t.number : ""}${o.customer_name ? " — " + o.customer_name : ""}${o.user_id && o.user_id !== 'walk-in' && getUser(o.user_id) ? ' (' + getUser(o.user_id).email + ')' : ''}
          </div>
          <div class="text-xs mb-3">${o.items
            .map((i) => {
              const mi = getMenuItem(i.menu_item_id);
              return mi ? mi.name + " x" + i.quantity : "";
            })
            .join(", ")}</div>
          ${o.promo_discount ? `<div class="text-[10px] mb-2 flex items-center gap-1" style="color:var(--success)"><i class="fas fa-tag"></i>Diskon promo: <b>-${formatCurrency(o.promo_discount)}</b></div>` : ""}
          <div class="flex justify-between items-center">
            <span class="font-bold" style="color:var(--accent)">${formatCurrency(o.total_amount)}</span>
            <div class="flex gap-2">
              ${
                o.status === "pending" && !o.accepted
                  ? `
                <button onclick="cancelCashierOrder('${o.id}')" class="text-xs font-bold px-3 py-1.5 rounded" style="color:var(--danger); background:rgba(231,76,60,.1)">Batal</button>
                <button onclick="editCashierOrder('${o.id}')" class="text-xs font-bold px-3 py-1.5 rounded" style="color:var(--accent); background:rgba(224,122,58,.1)">Edit</button>
                <button onclick="acceptCashierOrder('${o.id}')" class="btn-primary btn-sm">Terima</button>
              `
                  : ""
              }
              ${o.status === "pending" && o.accepted ? `<span class="badge" style="background:rgba(46,204,113,.15);color:var(--success)">Diterima</span>` : ""}
              ${o.status === "ready" && o.payment_status === "unpaid" ? `<button onclick="showPaymentModal('${o.id}')" class="btn-primary btn-sm">Bayar</button>` : ""}
              ${o.status === "ready" && o.payment_status === "paid" ? `<button onclick="updateOrderStatus('${o.id}','completed')" class="btn-primary btn-sm" style="background:linear-gradient(135deg,var(--success),#1e8449)">Selesai</button>` : ""}
              ${o.status === "delivered" && o.payment_status === "unpaid" ? `<button onclick="settleDelivery('${o.id}')" class="btn-primary btn-sm" style="background:linear-gradient(135deg,#3498db,#2980b9)"><i class="fas fa-hand-holding-dollar mr-1"></i>Terima Setoran</button>` : ""}
            </div>
          </div>
        </div>`;
        })
        .join("")}
    </div>
    <h3 class="font-semibold text-sm mb-3">Selesai Hari Ini</h3>
    <div class="space-y-2">
      ${completed
        .map(
          (o) => `
      <div class="card flex justify-between items-center py-3 cursor-pointer hover:scale-[1.02] transition-transform" onclick="showCashierOrderDetail('${o.id}')">
        <div class="text-sm">
          <span class="font-bold">#${o.id.slice(-5).toUpperCase()}</span> 
          <span style="color:${o.status === "rejected" || o.status === "cancelled" ? "var(--danger)" : "var(--muted)"}">— ${getOrderTypeName(o.order_type)}${o.customer_name ? " — " + o.customer_name : ""}${o.user_id && o.user_id !== 'walk-in' && getUser(o.user_id) ? ' (' + getUser(o.user_id).email + ')' : ''}</span>
          ${o.status === "rejected" ? '<span class="badge badge-danger ml-2">Ditolak</span>' : ""}${o.status === "cancelled" ? '<span class="badge badge-danger ml-2">Dibatalkan</span>' : ""}
        </div>
        <span class="font-semibold text-sm" style="color:${o.status === "rejected" || o.status === "cancelled" ? "var(--danger)" : "var(--success)"}">${formatCurrency(o.total_amount)}</span>
      </div>`,
        )
        .join("")}
    </div>
  </div>`;
}

function printCashierInvoice(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  const win = window.open("", "_blank");
  const paidLabel = o.payment_status === "paid" ? "Lunas" : "Belum Bayar";
  let paymentMethodLabel = "Tunai";
  if (o.payment_method === "digital") paymentMethodLabel = "Digital";
  else if (o.payment_method === "cod") paymentMethodLabel = "COD";
  else if (o.payment_method === "qris") paymentMethodLabel = "QRIS";
  const subtotal = o.items.reduce(
    (sum, i) => sum + i.unit_price * i.quantity,
    0,
  );
  const tax = o.total_amount - (subtotal - (o.promo_discount || 0));
  win.document.write(`
    <html><head>
      <title>Invoice #${o.id.slice(-5).toUpperCase()}</title>
      <style>
        body { font-family: 'Segoe UI',sans-serif; padding:40px; max-width:400px; margin:0 auto; }
        .header { text-align:center; margin-bottom:24px; }
        .header h1 { font-size:22px; margin:0; }
        .header p { font-size:12px; color:#666; margin:2px 0; }
        .divider { border-top:2px dashed #333; margin:16px 0; }
        .item { display:flex; justify-content:space-between; font-size:13px; padding:4px 0; }
        .item .name { flex:1; }
        .item .qty { margin:0 12px; color:#666; }
        .item .price { text-align:right; }
        .totals { margin-top:12px; font-size:13px; }
        .totals > div { display:flex; justify-content:space-between; padding:2px 0; }
        .footer { text-align:center; font-size:11px; color:#888; margin-top:24px; }
        @media print { body { padding:20px; } }
      </style>
    </head><body>
      <div class="header">
        <h1>ARQA Coffee</h1>
        <p>${getOrderTypeName(o.order_type)}</p>
        ${o.table_id ? "<p>Meja " + (getTable(o.table_id)?.number || "") + "</p>" : ""}
        ${o.customer_name ? "<p>" + o.customer_name + "</p>" : ""}
        <p>#${o.id.slice(-5).toUpperCase()}</p>
        <p>${new Date(o.created_at).toLocaleString("id-ID")}</p>
      </div>
      <div class="divider"></div>
      ${o.items
        .map((i) => {
          const mi = getMenuItem(i.menu_item_id);
          return `<div class="item"><span class="name">${mi ? mi.name : "Item"}</span><span class="qty">x${i.quantity}</span><span class="price">${formatCurrency(i.unit_price * i.quantity)}</span></div>`;
        })
        .join("")}
      <div class="divider"></div>
      <div class="totals">
        <div><span>Subtotal</span><span>${formatCurrency(subtotal)}</span></div>
        ${o.promo_discount ? `<div style="color:#27ae60"><span>Diskon Promo</span><span>-${formatCurrency(o.promo_discount)}</span></div>` : ""}
        <div><span>Pajak (10%)</span><span>${formatCurrency(Math.round(tax))}</span></div>
        <div style="font-weight:bold;font-size:15px"><span>Total</span><span>${formatCurrency(o.total_amount)}</span></div>
        <div style="margin-top:8px"><span>Pembayaran</span><span>${paymentMethodLabel}</span></div>
        <div><span>Status</span><span>${paidLabel}</span></div>
      </div>
      <div class="footer">Terima kasih telah berbelanja di ARQA Coffee</div>
      <script>window.print()</script>
    </body></html>
  `);
  win.document.close();
}

function showCashierOrderDetail(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  const t = o.table_id ? getTable(o.table_id) : null;
  showModal(`
<div>
  <div class="flex justify-between items-start mb-4">
    <h3 class="font-display text-lg font-bold">Pesanan #${o.id.slice(-5).toUpperCase()}</h3>
    <span class="badge ${o.status === "rejected" || o.status === "cancelled" ? "badge-danger" : "badge-completed"}">${o.status === "rejected" ? "Ditolak" : o.status === "cancelled" ? "Dibatalkan" : "Selesai"}</span>
  </div>
  <div class="text-xs mb-4" style="color:${o.status === "rejected" || o.status === "cancelled" ? "var(--danger)" : "var(--muted)"}">
    <i class="fas ${o.order_type === "dine-in" ? "fa-chair" : "fa-motorcycle"} mr-1"></i>${getOrderTypeName(o.order_type)}
    ${t ? " — Meja " + t.number : ""}
    ${o.customer_name ? " — " + o.customer_name : ""}${o.user_id && o.user_id !== 'walk-in' && getUser(o.user_id) ? ' (' + getUser(o.user_id).email + ')' : ''}
    ${o.delivery_address ? "<br>" + o.delivery_address : ""}
  </div>
  ${(o.status === "rejected" || o.status === "cancelled") && o.reject_reason ? `<div class="card mb-4 text-sm" style="background:rgba(231,76,60,.08);border:1px solid rgba(231,76,60,.2)"><i class="fas fa-ban mr-1" style="color:var(--danger)"></i><strong>${o.status === "cancelled" ? "Alasan Pembatalan:" : "Alasan Penolakan:"}</strong> ${o.reject_reason}</div>` : ""}
  <div class="space-y-2 mb-4">
    ${o.items
      .map((i) => {
        const mi = getMenuItem(i.menu_item_id);
        return mi
          ? `
    <div class="flex justify-between text-sm" style="color:${o.status === "rejected" || o.status === "cancelled" ? "var(--danger)" : "inherit"}">
      <span>${mi.name} x${i.quantity} ${i.notes ? '<span style="color:var(--muted)">(' + i.notes + ")</span>" : ""}</span>
      <span style="color:${o.status === "rejected" || o.status === "cancelled" ? "var(--danger)" : "var(--muted)"}">${formatCurrency(i.unit_price * i.quantity)}</span>
    </div>`
          : "";
      })
      .join("")}
  </div>
  <div class="border-t pt-3" style="border-color:var(--border)">
    ${o.promo_discount ? `<div class="flex justify-between text-xs mb-1" style="color:var(--success)"><span><i class="fas fa-tag mr-1"></i>Diskon Promo</span><span>-${formatCurrency(o.promo_discount)}</span></div>` : ""}
    <div class="flex justify-between font-bold"><span>Total</span><span style="color:${o.status === "rejected" || o.status === "cancelled" ? "var(--danger)" : "var(--accent)"}">${formatCurrency(o.total_amount)}</span></div>
    <div class="flex justify-between text-xs mt-1" style="color:var(--muted)"><span>Pembayaran</span><span>${o.payment_method === "digital" ? "Digital" : "Tunai/COD"}</span></div>
    <div class="flex justify-between text-xs mt-1" style="color:var(--muted)"><span>Waktu Selesai</span><span>${formatTime(o.created_at)}</span></div>
  </div>
  <div class="flex gap-2 mt-4">
    ${o.status === "completed" ? `<button onclick="printCashierInvoice('${o.id}')" class="btn-primary flex-1 text-center"><i class="fas fa-print mr-1"></i>Cetak</button>` : ""}
    <button onclick="closeModal()" class="btn-secondary flex-1 text-center">Tutup</button>
  </div>
</div>
`);
}

function renderCashierPayment() {
  const unpaid = DB.orders.filter(
    (o) =>
      o.payment_status === "unpaid" &&
      o.status !== "completed" &&
      o.status !== "cancelled" &&
      o.status !== "rejected",
  );
  const paid = DB.orders.filter(o => o.payment_status === "paid" && o.created_at)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 20);
  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Pembayaran</h2>
    <div class="space-y-3">
      ${unpaid.length === 0 ? '<div class="text-center py-12"><i class="fas fa-check-circle text-4xl mb-3" style="color:var(--success)"></i><p style="color:var(--muted)">Semua pesanan sudah lunas</p></div>' : ""}
      ${unpaid
        .map(
          (o) => {
            const oTime = o.created_at?.split('T')[1]?.slice(0, 5) || '-';
            const oTable = o.table_id ? getTable(o.table_id) : null;
            return `
      <div class="card">
        <div class="flex justify-between items-start mb-3">
          <div><span class="font-bold">#${o.id.slice(-5).toUpperCase()}</span><span class="badge ${getStatusBadge(o.status)} ml-2">${getStatusLabel(o.status)}</span></div>
          <span class="font-bold text-lg" style="color:var(--accent)">${formatCurrency(o.total_amount)}</span>
        </div>
        <div class="flex items-center gap-3 text-[11px] mb-2" style="color:var(--muted)"><span><i class="far fa-clock mr-1"></i>${oTime}</span>${oTable ? `<span><i class="fas fa-chair mr-1"></i>Meja ${oTable.number}</span>` : ''}${o.order_type === 'delivery' ? '<span><i class="fas fa-truck mr-1"></i>Delivery</span>' : ''}${o.customer_name ? '<span><i class="fas fa-user mr-1"></i>' + o.customer_name + '</span>' : ''}${o.user_id && o.user_id !== 'walk-in' && getUser(o.user_id) ? '<span style="font-size:10px;color:var(--accent)">' + getUser(o.user_id).email + '</span>' : ''}</div>
        <div class="text-xs mb-3" style="color:var(--muted)">${o.items
          .map((i) => {
            const mi = getMenuItem(i.menu_item_id);
            return mi ? mi.name + " x" + i.quantity : "";
          })
          .join(", ")}</div>
        ${o.promo_discount ? `<div class="text-[10px] mb-2 flex items-center gap-1" style="color:var(--success)"><i class="fas fa-tag"></i>Diskon promo: <b>-${formatCurrency(o.promo_discount)}</b></div>` : ""}
        <div class="flex gap-2">
          <button onclick="processPayment('${o.id}')" class="btn-primary btn-sm flex-1 text-center"><i class="fas fa-wallet mr-1"></i>Digital</button>
          <button onclick="processCashPayment('${o.id}')" class="btn-secondary btn-sm flex-1 text-center"><i class="fas fa-money-bill mr-1"></i>Tunai</button>
        </div>
      </div>`;
        })
        .join("")}
    </div>
    <div class="mt-6">
      <button onclick="State.showPaymentHistory=!State.showPaymentHistory;render()" class="flex items-center gap-2 text-sm font-medium" style="color:var(--muted)">
        <i class="fas ${State.showPaymentHistory ? 'fa-chevron-down' : 'fa-chevron-right'}"></i>
        Riwayat Lunas (${paid.length})
      </button>
      ${State.showPaymentHistory ? `
      <div class="mt-3 space-y-2">
        ${paid.length === 0 ? '<div class="text-center py-6"><p style="color:var(--muted)">Belum ada riwayat</p></div>' : paid.map(o => {
          const time = o.created_at?.split('T')[1]?.slice(0, 5) || '-';
          const date = o.created_at?.split('T')[0] || '';
          return `
        <div class="card cursor-pointer" onclick="showOrderDetail('${encodeURIComponent(o.id)}')">
          <div class="flex justify-between items-center">
            <div><span class="font-bold text-sm">#${o.id.slice(-5).toUpperCase()}</span><span class="text-[10px] ml-2" style="color:var(--muted)">${formatDate(date)} ${time}</span><span class="text-[10px] ml-1" style="color:${o.payment_method === 'cash' ? 'var(--success)' : 'var(--accent)'}">(${o.payment_method === 'cash' ? 'Tunai' : 'Digital'})</span>${o.customer_name ? '<span class="text-[10px] ml-1" style="color:var(--muted)">— ' + o.customer_name + '</span>' : ''}${o.user_id && o.user_id !== 'walk-in' && getUser(o.user_id) ? '<span class="text-[10px] ml-1" style="color:var(--accent)">(' + getUser(o.user_id).email + ')</span>' : ''}</div>
            <span class="font-bold" style="color:var(--success)">${formatCurrency(o.total_amount)}</span>
          </div>
        </div>`;
        }).join('')}
      </div>` : ''}
    </div>
  </div>`;
}
