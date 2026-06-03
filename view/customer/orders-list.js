// ============================================================
// CUSTOMER VIEW — Orders List, Order Detail, Pay Order
// ============================================================
function renderCustomerOrders() {
  let myOrders = DB.orders.filter((o) => o.user_id === State.currentUser.id);
  const dateFilter = State.customerOrderDateFilter || "";
  if (dateFilter) {
    myOrders = myOrders.filter((o) => o.created_at && o.created_at.split('T')[0] === dateFilter);
  }
  myOrders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Pesanan Saya</h2>
    <div class="flex gap-2 mb-4">
      <div class="flex-1">
        <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Filter Tanggal</label>
        <input type="date" id="customer-order-date" class="input-field w-full" value="${dateFilter}" onchange="State.customerOrderDateFilter=this.value;render()">
      </div>
      ${dateFilter ? '<button onclick="State.customerOrderDateFilter=\'\';render()" class="self-end btn-sm mb-0.5" style="background:rgba(231,76,60,.1);color:var(--danger);border:none;padding:8px 12px;border-radius:10px;height:40px"><i class="fas fa-times"></i></button>' : ""}
    </div>
    ${myOrders.length === 0 ? '<div class="text-center py-12"><i class="fas fa-receipt text-4xl mb-3" style="color:var(--border)"></i><p style="color:var(--muted)">Belum ada pesanan</p></div>' : ""}
    <div class="space-y-3">
      ${myOrders
        .map((o) => {
          const t = o.table_id ? getTable(o.table_id) : null;
          return `
        <div class="order-card" onclick="showOrderDetail('${o.id}')">
          <div class="flex justify-between items-start mb-2">
            <div>
              <span class="font-bold text-sm">#${o.id.slice(-5).toUpperCase()}</span>
              <span class="badge ${getStatusBadge(o.status)} ml-2">${getStatusLabel(o.status)}</span>
            </div>
            <span class="text-xs" style="color:var(--muted)">${formatDate(o.created_at)} ${formatTime(o.created_at)}</span>
          </div>
          <div class="flex justify-between items-center">
            <div class="text-xs" style="color:var(--muted)">
              <i class="fas ${o.order_type === "dine-in" ? "fa-chair" : "fa-motorcycle"} mr-1"></i>${getOrderTypeName(o.order_type)}
              ${t ? ` — Meja ${t.number}` : ""}
              ${o.order_type === "delivery" ? " — " + o.delivery_address.slice(0, 30) + "..." : ""}
            </div>
            <span class="font-bold text-sm" style="color:var(--accent)">${formatCurrency(o.total_amount)}</span>
          </div>
          <div class="mt-2 text-xs" style="color:var(--muted)">
            ${o.items
              .map((i) => {
                const mi = getMenuItem(i.menu_item_id);
                return mi ? mi.name + " x" + i.quantity : "";
              })
              .join(", ")}
          </div>
          ${o.status === "rejected" && o.reject_reason ? `<div class="mt-2 text-xs p-2 rounded" style="background:rgba(231,76,60,.1);color:var(--danger);border:1px solid rgba(231,76,60,.2)"><i class="fas fa-ban mr-1"></i><strong>Ditolak:</strong> ${o.reject_reason}</div>` : ""}
          ${o.status === "cancelled" && o.reject_reason ? `<div class="mt-2 text-xs p-2 rounded" style="background:rgba(231,76,60,.1);color:var(--danger);border:1px solid rgba(231,76,60,.2)"><i class="fas fa-ban mr-1"></i><strong>Dibatalkan:</strong> ${o.reject_reason}</div>` : ""}
          ${o.order_type === "delivery" && o.status === "delivering" ? `<div class="mt-3 flex gap-2"><button onclick="event.stopPropagation();showTrackingMap('${o.id}')" class="btn-primary btn-sm flex-1"><i class="fas fa-map-marker-alt mr-1"></i>Lacak Kurir</button><button onclick="event.stopPropagation();openChatModal('${o.id}')" class="btn-secondary btn-sm flex-1" style="background:rgba(224,122,58,.1);color:var(--accent);border-color:transparent;position:relative"><i class="fas fa-comment-alt mr-1"></i>Chat Kurir${getOrderChatUnreadCount(o.id) > 0 ? `<span class="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold" style="background:var(--danger);color:#fff">${getOrderChatUnreadCount(o.id)}</span>` : ""}</button></div>` : ""}
          ${o.order_type === "dine-in" && o.status !== "completed" ? `<div class="mt-3 flex gap-2"><button onclick="event.stopPropagation();changeOrderTable('${o.id}')" class="text-xs font-bold px-3 py-1.5 rounded-lg flex-1" style="color:var(--accent);background:rgba(224,122,58,.1)"><i class="fas fa-rotate mr-1"></i>Ganti Meja</button>${o.status === "pending" ? `<button onclick="event.stopPropagation();cancelOrder('${o.id}')" class="text-xs font-bold px-3 py-1.5 rounded-lg" style="color:var(--danger);background:rgba(231,76,60,.1)">Batal Pesanan</button>` : ""}</div>` : o.status === "pending" ? `<div class="mt-3 flex justify-end"><button onclick="event.stopPropagation();cancelOrder('${o.id}')" class="text-xs font-bold px-3 py-1.5 rounded-lg" style="color:var(--danger); background:rgba(231,76,60,.1)">Batal Pesanan</button></div>` : ""}
        </div>`;
        })
        .join("")}
    </div>
  </div>`;
}

function showOrderDetail(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  showModal(`
    <div>
      <div class="flex justify-between items-start mb-4">
        <h3 class="font-display text-lg font-bold">Pesanan #${o.id.slice(-5).toUpperCase()}</h3>
        <span class="badge ${getStatusBadge(o.status)}">${getStatusLabel(o.status)}</span>
      </div>
      <div class="text-xs mb-4" style="color:var(--muted)">
        <i class="fas ${o.order_type === "dine-in" ? "fa-chair" : "fa-motorcycle"} mr-1"></i>${getOrderTypeName(o.order_type)}
        ${o.table_id ? " — Meja " + (getTable(o.table_id)?.number || "") : ""}
        ${o.delivery_address ? "<br>" + o.delivery_address : ""}
      </div>
      ${o.status === "rejected" && o.reject_reason ? `<div class="card mb-4 text-sm" style="background:rgba(231,76,60,.08);border:1px solid rgba(231,76,60,.2)"><i class="fas fa-ban mr-1" style="color:var(--danger)"></i><strong>Pesanan Ditolak:</strong> ${o.reject_reason}</div>` : ""}
      ${o.status === "cancelled" && o.reject_reason ? `<div class="card mb-4 text-sm" style="background:rgba(231,76,60,.08);border:1px solid rgba(231,76,60,.2)"><i class="fas fa-ban mr-1" style="color:var(--danger)"></i><strong>Pesanan Dibatalkan:</strong> ${o.reject_reason}</div>` : ""}
      <div class="space-y-2 mb-4">
        ${o.items
          .map((i) => {
            const mi = getMenuItem(i.menu_item_id);
            return mi
              ? `
        <div class="flex justify-between text-sm">
          <span>${mi.name} x${i.quantity} ${i.notes ? '<span style="color:var(--muted)">(' + i.notes + ")</span>" : ""}</span>
          <span>${formatCurrency(i.unit_price * i.quantity)}</span>
        </div>`
              : "";
          })
          .join("")}
      </div>
      <div class="border-t pt-3" style="border-color:var(--border)">
        ${o.promo_discount ? `<div class="flex justify-between text-xs mb-1" style="color:var(--success)"><span><i class="fas fa-tag mr-1"></i>Diskon Promo</span><span>-${formatCurrency(o.promo_discount)}</span></div>` : ""}
        ${o.shipping_cost && o.shipping_cost > 0 ? `<div class="flex justify-between text-xs mb-1" style="color:var(--accent)"><span><i class="fas fa-truck mr-1"></i>Ongkos Kirim</span><span>${formatCurrency(o.shipping_cost)}</span></div>` : ""}
        <div class="flex justify-between text-xs mb-1" style="color:var(--accent)"><span><i class="fas fa-receipt mr-1"></i>Pajak</span><span>${formatCurrency(Math.round(calcItemTax(o.items)))}</span></div>
        <div class="flex justify-between font-bold"><span>Total</span><span style="color:var(--accent)">${formatCurrency(o.total_amount)}</span></div>
        <div class="flex justify-between text-xs mt-1" style="color:var(--muted)"><span>Pembayaran</span><span>${o.payment_method === "qris" ? "QRIS" : o.payment_method === "bank_transfer" ? "Transfer Bank" : o.payment_method === "cod" ? "COD" : o.payment_method === "" ? "Bayar Nanti" : "Tunai"}</span></div>
        ${!(o.order_type === "delivery" && o.payment_method === "cod") ? `<div class="flex justify-between text-xs mt-1" style="color:var(--muted)"><span>Status Bayar</span><span class="badge ${o.payment_status === "paid" ? "badge-paid" : "badge-unpaid"}">${o.payment_status === "paid" ? "Lunas" : "Belum Bayar"}</span></div>` : ""}
      </div>
      <div class="flex gap-2 mt-4">
        ${o.status !== "rejected" && o.status !== "cancelled" ? `<button onclick="closeModal();printInvoice('${o.id}')" class="btn-primary flex-1 text-center"><i class="fas fa-print mr-1"></i> Cetak Invoice</button>` : ""}
        <button onclick="closeModal()" class="btn-secondary flex-1 text-center">Tutup</button>
      </div>
      ${o.payment_status === "unpaid" && o.status !== "completed" && o.status !== "cancelled" && o.status !== "rejected" && !(o.order_type === "delivery" && o.payment_method === "cod") ? `<button onclick="payOrder('${o.id}')" class="btn-primary w-full mt-3 text-center">Bayar Sekarang</button>` : ""}
      ${o.status === "pending" ? `<button onclick="cancelOrder('${o.id}')" class="w-full mt-3 text-center text-sm font-bold" style="color:var(--danger); background:rgba(231,76,60,.1); padding:10px; border-radius:12px;">Batal Pesanan</button>` : ""}
    </div>
  `);
}

function printInvoice(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  const win = window.open('', '_blank');
  const statusLabel = o.payment_status === 'paid' ? 'Lunas' : 'Belum Bayar';
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
        .totals { margin-top:12px; font-size:13px; }
        .totals > div { display:flex; justify-content:space-between; padding:2px 0; }
        .footer { text-align:center; font-size:11px; color:#888; margin-top:24px; }
        @media print { body { padding:20px; } }
      </style>
    </head><body>
      <div class="header">
        <h1>ARQA Coffee</h1>
        <p>${o.order_type === 'dine-in' ? 'Makan di Tempat' : 'Pesan Antar'}</p>
        ${o.table_id ? '<p>Meja ' + (getTable(o.table_id)?.number || '') + '</p>' : ''}
        <p>#${o.id.slice(-5).toUpperCase()}</p>
        <p>${new Date(o.created_at).toLocaleString('id-ID')}</p>
      </div>
      <div class="divider"></div>
      ${o.items.map(i => {
        const mi = getMenuItem(i.menu_item_id);
        return `<div class="item"><span>${mi ? mi.name : 'Item'} x${i.quantity}</span><span>${formatCurrency(i.unit_price * i.quantity)}</span></div>`;
      }).join('')}
      <div class="divider"></div>
      <div class="totals">
        <div><span>Subtotal</span><span>${formatCurrency(o.total_amount)}</span></div>
        <div><span>Pajak</span><span>${formatCurrency(Math.round(calcItemTax(o.items)))}</span></div>
        ${o.shipping_cost && o.shipping_cost > 0 ? `<div><span>Ongkos Kirim</span><span>${formatCurrency(o.shipping_cost)}</span></div>` : ''}
        <div style="font-weight:bold;font-size:15px"><span>Total</span><span>${formatCurrency(o.total_amount)}</span></div>
        <div style="margin-top:8px"><span>Pembayaran</span><span>${o.payment_method === 'qris' ? 'QRIS' : o.payment_method === 'bank_transfer' ? 'Transfer Bank' : o.payment_method === 'cod' ? 'COD' : o.payment_method === '' ? 'Bayar Nanti' : 'Tunai'}</span></div>
        ${o.order_type !== 'delivery' ? `<div><span>Status</span><span>${statusLabel}</span></div>` : ''}
      </div>
      ${o.delivery_address ? `<div class="divider"></div><p style="font-size:12px"><strong>Alamat:</strong> ${o.delivery_address}</p>` : ''}
      <div class="footer">Terima kasih telah berbelanja di ARQA Coffee</div>
      <script>window.print()</script>
    </body></html>
  `);
  win.document.close();
}

function payOrder(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  closeModal();
  const data = encodeURIComponent("ARQA-COFFEE:PAY:" + o.id.slice(-6) + ":" + o.total_amount);
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-2 text-center">Pembayaran QRIS</h3>
      <p class="text-xs text-center mb-4" style="color:var(--muted)">Scan kode QR berikut untuk membayar</p>
      <div class="flex justify-center mb-4">
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${data}" alt="QRIS Payment" style="border-radius:12px;max-width:100%">
      </div>
      <div class="text-center mb-4">
        <div class="text-sm" style="color:var(--muted)">Total Pembayaran</div>
        <div class="font-bold text-xl" style="color:var(--accent)">${formatCurrency(o.total_amount)}</div>
      </div>
      <div class="flex gap-2">
        <button onclick="closeModal()" class="btn-sm flex-1 text-center" style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:10px;cursor:pointer">Tutup</button>
        <button onclick="confirmPayOrder('${o.id}')" class="btn-primary btn-sm flex-1 text-center">Saya Sudah Bayar</button>
      </div>
    </div>
  `);
}

function confirmPayOrder(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  o.payment_status = "paid";
  o.payment_method = "qris";
  closeModal();
  showToast("Pembayaran berhasil!", "success");
  render();
}

let _qrScannerInstance = null;

function changeOrderTable(orderId) {
  const o = DB.orders.find((x) => x.id === orderId);
  if (!o) return;
  const currentTable = o.table_id ? getTable(o.table_id) : null;
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-2 text-center">Ganti Meja</h3>
      <p class="text-sm mb-4 text-center" style="color:var(--muted)">Scan QR code meja yang tersedia untuk pesanan #${o.id.slice(-5).toUpperCase()}</p>
      ${currentTable ? `<div class="mb-4 p-3 rounded-xl text-center text-sm" style="background:var(--bg2)"><span style="color:var(--muted)">Meja saat ini:</span> <strong>${currentTable.number}</strong></div>` : ""}
      <div id="qr-reader" class="qr-scanner-area mb-4 flex items-center justify-center" style="width:100%;min-height:220px;background:rgba(0,0,0,.3);border-radius:12px;overflow:hidden;position:relative">
        <div class="qr-line"></div>
        <i class="fas fa-qrcode text-5xl" style="color:var(--accent);opacity:.3"></i>
      </div>
      <div class="flex gap-2 mb-4">
        <input id="qr-manual-input" class="input-field flex-1 text-sm" placeholder="Atau masukkan kode QR manual (contoh: ARQA-T1)" onkeydown="if(event.key==='Enter')manualQRChange('${orderId}')">
        <button onclick="manualQRChange('${orderId}')" class="btn-sm" style="background:var(--accent);color:#fff;border:none;padding:8px 16px;border-radius:10px;cursor:pointer;white-space:nowrap"><i class="fas fa-arrow-right"></i></button>
      </div>
      <details class="mb-4">
        <summary class="text-xs font-semibold cursor-pointer" style="color:var(--accent)">Pilih manual dari daftar meja</summary>
        <div class="grid grid-cols-4 gap-2 mt-3">
          ${DB.tables
            .map(
              (t) => {
                const isCurrent = t.id === o.table_id;
                const isOccupied = t.status === "occupied" && !isCurrent;
                return `<button class="card text-center py-2 text-xs font-semibold ${isOccupied ? "opacity-40 cursor-not-allowed" : ""}" onclick="${!isOccupied ? `selectNewTable('${orderId}','${t.id}')` : ""}" style="${isOccupied ? "pointer-events:none" : ""} ${isCurrent ? "border:2px solid var(--accent)" : ""}">
              <i class="fas fa-chair mb-1" style="color:${isCurrent ? "var(--accent)" : isOccupied ? "var(--danger)" : "var(--success)"}"></i><br>${t.number}${isCurrent ? '<br><span style="font-size:8px;color:var(--accent)">Sekarang</span>' : ""}
            </button>`;
              },
            )
            .join("")}
        </div>
      </details>
      <button onclick="closeModal()" class="btn-secondary w-full text-center">Batal</button>
    </div>
  `, () => {
    initQRScanner(orderId);
  });
}

function initQRScanner(orderId) {
  const readerEl = document.getElementById('qr-reader');
  if (!readerEl || typeof Html5Qrcode === 'undefined') return;
  try {
    _qrScannerInstance = new Html5Qrcode("qr-reader");
    _qrScannerInstance.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: { width: 220, height: 220 } },
      (decodedText) => {
        handleQRScanResult(decodedText, orderId);
      },
      () => {}
    ).catch(() => {});
  } catch (e) {}
}

function handleQRScanResult(code, orderId) {
  const table = DB.tables.find((t) => t.qr_code === code);
  if (!table) {
    showToast("QR code tidak dikenal!", "error");
    return;
  }
  stopQRScanner();
  selectNewTable(orderId, table.id);
}

function stopQRScanner() {
  if (_qrScannerInstance) {
    try { _qrScannerInstance.stop(); } catch (e) {}
    try { _qrScannerInstance.clear(); } catch (e) {}
    _qrScannerInstance = null;
  }
}

function manualQRChange(orderId) {
  const input = document.getElementById('qr-manual-input');
  if (!input || !input.value.trim()) {
    showToast("Masukkan kode QR meja", "warning");
    return;
  }
  handleQRScanResult(input.value.trim(), orderId);
}

function selectNewTable(orderId, newTableId) {
  const o = DB.orders.find((x) => x.id === orderId);
  if (!o) return;
  const oldTable = o.table_id ? getTable(o.table_id) : null;
  const newTable = getTable(newTableId);
  if (!newTable) return;
  if (newTable.status === "occupied" && newTable.id !== o.table_id) {
    showToast("Meja sedang ditempati!", "error");
    return;
  }
  if (oldTable) {
    const hasOtherOrders = DB.orders.some(
      (x) => x.id !== orderId && x.table_id === oldTable.id && x.status !== "completed" && x.status !== "cancelled" && x.status !== "rejected",
    );
    if (!hasOtherOrders) oldTable.status = "available";
  }
  o.table_id = newTableId;
  newTable.status = "occupied";
  closeModal();
  showToast(`Pesanan dipindahkan ke Meja ${newTable.number}`, "success");
  render();
}
