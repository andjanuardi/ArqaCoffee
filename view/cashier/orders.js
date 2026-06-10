// ============================================================
// CASHIER VIEW — Orders & Payment
// ============================================================
function showPaymentModal(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  const t = o.table_id ? getTable(o.table_id) : null;
  const paySubtotal = o.items.reduce((s, i) => s + i.unit_price * i.quantity, 0);
  const dineInFee = calcCustomerFee(paySubtotal, o.order_type);
  showModal(`
    <div>
      <div class="flex justify-between items-start mb-4">
        <div><h3 class="font-display text-lg font-bold">Pembayaran</h3><p class="text-xs" style="color:var(--muted)">#${o.id.slice(-5).toUpperCase()} — ${getOrderTypeName(o.order_type)}${t ? " — Meja " + t.number : ""}${o.customer_name ? " — " + o.customer_name : ""}${o.user_id && o.user_id !== 'walk-in' && getUser(o.user_id) ? ' (' + getUser(o.user_id).email + ')' : ''}${o.delivery_address ? '<br>' + o.delivery_address : ''}</p></div>
        <span class="font-bold text-lg" style="color:var(--accent)">${formatCurrency(o.total_amount)}</span>
      </div>
      <div class="p-3 rounded-xl mb-3" style="background:var(--bg2)">
        <div class="flex items-center gap-2 mb-2 text-xs font-semibold" style="color:var(--muted)">
          <i class="fas fa-receipt"></i> Rincian Pesanan
        </div>
        <div class="space-y-1.5">
          ${o.items
            .map((i) => {
              const mi = getMenuItem(i.menu_item_id);
              return mi
                ? `<div class="flex justify-between text-xs"><span>${mi.name} x${i.quantity}${i.notes ? ' <span style="color:var(--muted)">(' + i.notes + ")</span>" : ""}</span><span style="color:var(--muted)">${formatCurrency(i.unit_price * i.quantity)}</span></div>`
                : "";
            })
            .join("")}
        </div>
        <div class="border-t my-2" style="border-color:var(--border)"></div>
        <div class="flex justify-between text-xs mb-1" style="color:var(--muted)"><span>Subtotal</span><span>${formatCurrency(paySubtotal)}</span></div>
        ${o.promo_discount ? `<div class="flex justify-between text-xs mb-1" style="color:var(--success)"><span><i class="fas fa-tag mr-1"></i>Diskon Promo</span><span>-${formatCurrency(o.promo_discount)}</span></div>` : ""}
        ${o.shipping_cost && o.shipping_cost > 0 ? `<div class="flex justify-between text-xs mb-1" style="color:var(--accent)"><span><i class="fas fa-truck mr-1"></i>Ongkos Kirim</span><span>${formatCurrency(o.shipping_cost)}</span></div>` : ""}
        ${dineInFee > 0 ? `<div class="flex justify-between text-xs mb-1" style="color:#e07a3a"><span><i class="fas fa-hand-holding-usd mr-1"></i>Biaya Layanan</span><span>${formatCurrency(dineInFee)}</span></div>` : ""}
        <div class="flex justify-between text-xs mb-1" style="color:var(--accent)"><span><i class="fas fa-receipt mr-1"></i>Pajak</span><span>${formatCurrency(Math.round(calcItemTax(o.items)))}</span></div>
        <div class="border-t my-2" style="border-color:var(--border)"></div>
        <div class="flex justify-between font-bold text-sm"><span>Total</span><span style="color:var(--accent)">${formatCurrency(o.total_amount)}</span></div>
      </div>
      <div class="grid grid-cols-3 gap-3 mb-3">
        <div class="card text-center py-4 cursor-pointer" onclick="closeModal();showCashierQRIS('${o.id}')" style="border-color:var(--accent)">
          <i class="fas fa-qrcode text-xl mb-2" style="color:var(--accent)"></i>
          <div class="text-sm font-semibold">QRIS</div>
        </div>
        <div class="card text-center py-4 cursor-pointer" onclick="closeModal();showCashierTransfer('${o.id}')">
          <i class="fas fa-university text-xl mb-2" style="color:var(--accent)"></i>
          <div class="text-sm font-semibold">Transfer</div>
        </div>
        <div class="card text-center py-4 cursor-pointer" onclick="closeModal();processCashPayment('${o.id}')">
          <i class="fas fa-money-bill text-xl mb-2" style="color:var(--success)"></i>
          <div class="text-sm font-semibold">Tunai</div>
        </div>
      </div>
      <button onclick="closeModal();printCashierInvoice('${o.id}')" class="btn-sm w-full text-center" style="background:transparent;border:1px solid var(--border);color:var(--muted);padding:8px;border-radius:10px"><i class="fas fa-print mr-1"></i>Cetak Invoice</button>
    </div>
  `);
}

function showCashierQRIS(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
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
        <button onclick="confirmCashierPayment('${o.id}','qris')" class="btn-primary btn-sm flex-1 text-center">Saya Sudah Bayar</button>
      </div>
    </div>
  `);
}

function showCashierTransfer(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-2 text-center">Transfer Bank</h3>
      <p class="text-xs text-center mb-4" style="color:var(--muted)">Transfer ke rekening berikut</p>
      <div class="card mb-4 space-y-3">
        <div class="flex justify-between text-sm"><span style="color:var(--muted)">Bank</span><span class="font-semibold">BCA</span></div>
        <div class="flex justify-between text-sm"><span style="color:var(--muted)">No. Rekening</span><span class="font-semibold">1234567890</span></div>
        <div class="flex justify-between text-sm"><span style="color:var(--muted)">Atas Nama</span><span class="font-semibold">ARQA Coffee</span></div>
        <div class="flex justify-between text-sm pt-2 border-t" style="border-color:var(--border)"><span style="color:var(--muted)">Total Transfer</span><span class="font-bold" style="color:var(--accent)">${formatCurrency(o.total_amount)}</span></div>
      </div>
      <div class="flex gap-2">
        <button onclick="closeModal()" class="btn-sm flex-1 text-center" style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:10px;cursor:pointer">Batal</button>
        <button onclick="confirmCashierPayment('${o.id}','bank_transfer')" class="btn-primary btn-sm flex-1 text-center">Saya Sudah Transfer</button>
      </div>
    </div>
  `);
}

function confirmCashierPayment(id, method) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  o.payment_status = "paid";
  o.payment_method = method;
  const label = method === "qris" ? "QRIS" : "Transfer Bank";
  notifyPayment(o, label);
  closeModal();
  showToast(`Pembayaran #${o.id.slice(-5).toUpperCase()} berhasil (${label})`, "success");
  render();
}

function confirmCompleteOrder(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  showModal(`
    <div>
      <div class="text-center mb-4">
        <i class="fas fa-check-circle text-4xl mb-3" style="color:var(--success)"></i>
        <h3 class="font-display text-lg font-bold">Selesaikan Pesanan</h3>
        <p class="text-sm mt-2" style="color:var(--muted)">Apakah Anda yakin ingin menyelesaikan pesanan #${o.id.slice(-5).toUpperCase()}?</p>
      </div>
      <div class="flex gap-2">
        <button onclick="closeModal()" class="btn-sm flex-1 text-center" style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:10px;cursor:pointer">Batal</button>
        <button onclick="closeModal();doCompleteOrder('${o.id}')" class="btn-primary btn-sm flex-1 text-center">Ya, Selesai</button>
      </div>
    </div>
  `);
}

function doCompleteOrder(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  o.status = "completed";
  if (o.table_id && o.order_type !== "delivery") {
    const hasOther = DB.orders.some(x =>
      x.id !== id && x.table_id === o.table_id &&
      !['completed', 'cancelled', 'rejected'].includes(x.status)
    );
    if (!hasOther) {
      const t = getTable(o.table_id);
      if (t) t.status = "available";
    }
  }
  notifyStatusChange(o, "completed");
  showToast("Pesanan #" + o.id.slice(-5).toUpperCase() + " selesai", "success");
  render();
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
  if (!isCheckedIn()) {
    return `
    <div class="animate-fade-up">
      <div class="card text-center py-6" style="border-color:rgba(231,76,60,.2)">
        <i class="fas fa-cash-register text-3xl mb-2" style="color:var(--danger)"></i>
        <p class="text-sm font-semibold mb-1" style="color:var(--danger)">Belum Check-in Hari Ini</p>
        <p class="text-xs mb-3" style="color:var(--muted)">Lakukan check-in di profil sebelum melihat pesanan</p>
        <button onclick="showGeoAttendanceModal()" class="btn-primary text-sm px-5 py-2" style="font-size:13px">
          <i class="fas fa-clock mr-1"></i>Check-in
        </button>
      </div>
  </div>`;
  }
  const pending = DB.orders.filter((o) =>
    ["pending", "cooking", "ready", "delivering", "delivered"].includes(o.status)
    && !(o.status === "delivered" && o.order_type === "delivery")
    && o.payment_status !== "collected",
  );
  const mitraPending = getMitraPendingPayouts();
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
          const tax = Math.round(calcItemTax(o.items));
          const itemTotal = o.items.reduce((s, i) => s + i.unit_price * i.quantity, 0);
          const dineInFee = calcCustomerFee(itemTotal, o.order_type);
          const displayServiceFee = dineInFee || o.service_fee || 0;
          const netOngkir = o.shipping_cost ? o.shipping_cost - calcCourierFee(o.shipping_cost) : 0;
          const isDelivered = o.status === "delivered" && o.order_type === "delivery";
          const breakdownHtml = isDelivered
            ? `<div class="text-[10px] mb-1 flex items-center gap-1" style="color:var(--danger)"><i class="fas fa-wallet"></i>Pendapatan Kurir: <b>${formatCurrency(netOngkir)}</b></div>`
            : `${o.promo_discount ? `<div class="text-[10px] mb-1 flex items-center gap-1" style="color:var(--success)"><i class="fas fa-tag"></i>Diskon promo: <b>-${formatCurrency(o.promo_discount)}</b></div>` : ""}${o.shipping_cost && o.shipping_cost > 0 ? `<div class="text-[10px] mb-1 flex items-center gap-1" style="color:var(--accent)"><i class="fas fa-truck"></i>Ongkos Kirim: <b>${formatCurrency(o.shipping_cost)}</b></div>` : ""}${displayServiceFee > 0 ? `<div class="text-[10px] mb-1 flex items-center gap-1" style="color:#e07a3a"><i class="fas fa-hand-holding-usd"></i>Biaya Layanan: <b>${formatCurrency(displayServiceFee)}</b></div>` : ""}${tax > 0 ? `<div class="text-[10px] mb-1 flex items-center gap-1" style="color:var(--accent)"><i class="fas fa-receipt"></i>Pajak: <b>${formatCurrency(tax)}</b></div>` : ""}`;
          const amountColor = isDelivered ? 'var(--success)' : 'var(--accent)';
          const amountValue = isDelivered ? formatCurrency(o.total_amount - netOngkir) : formatCurrency(o.total_amount);
          return `
        <div class="order-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="showCashierActiveOrderDetail('${o.id}')">
          <div class="flex justify-between items-start mb-2">
            <div>
              <span class="font-bold text-sm">#${o.id.slice(-5).toUpperCase()}</span>
              <span class="badge ${getStatusBadge(o.status)} ml-2">${getStatusLabel(o.status)}</span>
              <span class="badge ${o.payment_status === "paid" ? "badge-paid" : o.payment_status === "collected" ? "" : "badge-unpaid"} ml-1">${o.payment_status === "paid" ? "Lunas" : o.payment_status === "collected" ? "Menunggu Setoran" : "Belum Bayar"}</span>
              ${o.payment_status === "collected" && o.order_type === "dine-in" ? `<span class="badge ml-1" style="background:rgba(241,196,15,.15);color:#f1c40f">Dikumpulkan Waiter</span>` : isDelivered ? `<span class="badge ml-1" style="background:rgba(52,152,219,.15);color:#3498db">Belum Setor</span>` : ""}
            </div>
            <span class="text-xs" style="color:var(--muted)">${formatTime(o.created_at)}</span>
          </div>
          <div class="text-xs mb-2" style="color:var(--muted)">
            <i class="fas ${o.order_type === "dine-in" ? "fa-chair" : "fa-motorcycle"} mr-1"></i>${getOrderTypeName(o.order_type)}${t && o.order_type !== "delivery" ? " — Meja " + t.number : ""}${isDelivered ? " — " + (o.customer_name || (getUser(o.user_id)?.name || getUser(o.user_id)?.email || '—')) : o.customer_name ? " — " + o.customer_name : ""}${!isDelivered && o.user_id && o.user_id !== 'walk-in' && getUser(o.user_id) ? ' (' + getUser(o.user_id).email + ')' : ''}${o.waiter_id && getUser(o.waiter_id) ? ' <span style="color:var(--accent);font-size:10px"><i class="fas fa-user-tie"></i> ' + getUser(o.waiter_id).name + '</span>' : ''}${o.courier_id && getUser(o.courier_id) ? ' <span style="color:var(--accent);font-size:10px"><i class="fas fa-motorcycle"></i> ' + getUser(o.courier_id).name + '</span>' : ''}
          </div>
          <div class="text-xs mb-3">${(() => {
            const items = o.items.map(i => {
              const mi = getMenuItem(i.menu_item_id);
              if (!mi) return null;
              return { name: mi.name, qty: i.quantity, submitted_by: mi.submitted_by };
            }).filter(Boolean);
            const display = items.length <= 3 ? items : items.slice(0, 3);
            const extra = items.length - display.length;
            return display.map(item => {
              const badge = item.submitted_by ? '<span style="color:#e84393;font-size:10px"> (Mitra ' + item.submitted_by + ')</span>' : '<span style="color:var(--accent);font-size:10px"> (Arqa)</span>';
              return '<div class="mb-1">' + item.name + ' x' + item.qty + badge + '</div>';
            }).join('') + (extra ? '<div style="color:var(--muted)">+' + extra + ' lainnya</div>' : '');
          })()}</div>
          ${breakdownHtml}
          <div class="flex justify-between items-center">
            <span class="font-bold" style="color:${amountColor}">${amountValue}</span>
            <div class="flex gap-2">
              ${
                o.status === "pending" && !o.accepted
                  ? `
                <button onclick="event.stopPropagation();cancelCashierOrder('${o.id}')" class="text-xs font-bold px-3 py-1.5 rounded" style="color:var(--danger); background:rgba(231,76,60,.1)">Batal</button>
                <button onclick="event.stopPropagation();editCashierOrder('${o.id}')" class="text-xs font-bold px-3 py-1.5 rounded" style="color:var(--accent); background:rgba(224,122,58,.1)">Edit</button>
                <button onclick="event.stopPropagation();acceptCashierOrder('${o.id}')" class="btn-primary btn-sm">Terima</button>
              `
                  : ""
              }
              ${o.status === "pending" && o.accepted ? `<span class="badge" style="background:rgba(46,204,113,.15);color:var(--success)">Diterima</span>` : ""}
              ${(o.status === "ready" || (o.status === "delivered" && o.order_type !== "delivery")) && o.payment_status === "unpaid" ? `<button onclick="event.stopPropagation();showPaymentModal('${o.id}')" class="btn-primary btn-sm">Bayar</button>` : ""}
              ${(o.status === "ready" || (o.status === "delivered" && o.order_type !== "delivery")) && o.payment_status === "paid" ? `<button onclick="event.stopPropagation();confirmCompleteOrder('${o.id}')" class="btn-primary btn-sm" style="background:linear-gradient(135deg,var(--success),#1e8449)">Selesai</button>` : ""}
              ${o.status === "delivered" && o.payment_status === "unpaid" && o.order_type === "delivery" ? `<button onclick="event.stopPropagation();settleDelivery('${o.id}')" class="btn-primary btn-sm" style="background:linear-gradient(135deg,#3498db,#2980b9)"><i class="fas fa-hand-holding-dollar mr-1"></i>Terima Setoran</button>` : ""}
              ${o.status === "delivered" && o.payment_status === "collected" && o.order_type === "dine-in" ? `<button onclick="event.stopPropagation();confirmSettleDineIn('${o.id}')" class="btn-primary btn-sm" style="background:linear-gradient(135deg,#27ae60,#1e8449)"><i class="fas fa-hand-holding-dollar mr-1"></i>Terima Setoran Waiter</button>` : ""}
            </div>
          </div>
        </div>`;
        })
        .join("")}
    </div>
    <h3 class="font-semibold text-sm mb-3 mt-6">Bayar / Terima Setoran</h3>
    <div class="space-y-3 mb-6">
      ${mitraPending.length > 0 ? `
    <div class="card mb-4" style="border-color:rgba(232,67,147,.3)">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:rgba(232,67,147,.15);color:#e84393"><i class="fas fa-hat-chef"></i></div>
        <div class="flex-1">
          <div class="font-semibold text-sm">Pembayaran Mitra <span class="badge" style="background:rgba(232,67,147,.15);color:#e84393;font-size:10px">${mitraPending.length} Menunggu</span></div>
          <div class="text-xs" style="color:var(--muted)">Bayar pendapatan mitra juru masak yang sudah tersedia</div>
        </div>
        <button onclick="document.getElementById('mitra-payout-list').classList.toggle('hidden')" class="btn-secondary btn-sm" style="padding:6px 12px;font-size:12px"><i class="fas fa-chevron-down"></i></button>
      </div>
      <div id="mitra-payout-list" class="hidden space-y-2">
        ${mitraPending.map(p => {
          const o = DB.orders.find(x => x.id === p.order_id);
          return `
        <div class="p-3 rounded-xl" style="background:var(--bg2)">
          <div class="flex justify-between items-start mb-1">
            <div>
              <span class="font-semibold text-sm">${p.mitra_name}</span>
              <span class="text-xs ml-2" style="color:var(--muted)">#${p.order_id.slice(-5).toUpperCase()}</span>
            </div>
            <span class="font-bold text-sm" style="color:var(--success)">${formatCurrency(p.amount)}</span>
          </div>
          <div class="text-xs mb-2" style="color:var(--muted)">
            ${o ? `<i class="fas ${o.order_type === 'dine-in' ? 'fa-chair' : 'fa-motorcycle'} mr-1"></i>${getOrderTypeName(o.order_type)} — ${o.customer_name || '—'}` : ''}
          </div>
          <div class="flex justify-between text-[10px] mb-2" style="color:var(--muted)">
            <span>Item: ${formatCurrency(p.total_items)}</span>
            <span>Pajak: -${formatCurrency(p.tax)}</span>
            <span>Biaya: -${formatCurrency(p.fee)}</span>
          </div>
          <button onclick="payMitraPayout('${p.id}')" class="btn-primary w-full text-center" style="font-size:13px"><i class="fas fa-hand-holding-dollar mr-1"></i>Bayar ${formatCurrency(p.amount)}</button>
        </div>`;
        }).join('')}
      </div>
    </div>` : ''}
      ${(() => {
        const setoranOrders = DB.orders.filter(o => {
          if (o.ongkir_status !== "confirmed" && o.courier_id && o.shipping_cost > 0 && o.status === "completed" && o.payment_method !== "cod") return true;
          if (o.status === "delivered" && o.payment_status === "unpaid" && o.order_type === "delivery" && o.shipping_cost > 0) return true;
          if (o.status === "delivered" && o.payment_status === "paid" && o.order_type === "delivery" && o.shipping_cost > 0) return true;
          if (o.status === "delivered" && o.payment_status === "collected" && o.order_type === "dine-in") return true;
          return false;
        });
        if (setoranOrders.length === 0) return '<p class="text-sm text-center py-4" style="color:var(--muted)">Tidak ada bayar/terima setoran</p>';
        return setoranOrders.map(o => {
          const kurir = getUser(o.courier_id);
          const netOngkir = o.shipping_cost - calcCourierFee(o.shipping_cost);
          const isDeliveredOngkir = o.status === "delivered" && o.order_type === "delivery";
          const isUnpaidDelivery = isDeliveredOngkir && o.payment_status === "unpaid";
          const isCollectedDineIn = o.status === "delivered" && o.payment_status === "collected" && o.order_type === "dine-in";
          if (isCollectedDineIn) {
            const t = o.table_id ? getTable(o.table_id) : null;
            const waiter = o.waiter_id ? getUser(o.waiter_id) : null;
            return `
        <div class="order-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="showCashierActiveOrderDetail('${o.id}')">
          <div class="flex justify-between items-start mb-2">
            <div>
              <span class="font-bold text-sm">#${o.id.slice(-5).toUpperCase()}</span>
              <span class="badge ml-1" style="background:rgba(241,196,15,.15);color:#f1c40f">Menunggu Setoran</span>
              <span class="badge ml-1" style="background:rgba(224,122,58,.1);color:var(--accent)"><i class="fas fa-user-tie mr-1"></i>${waiter ? waiter.name : '—'}</span>
            </div>
            <span class="text-xs" style="color:var(--muted)">${formatTime(o.created_at)}</span>
          </div>
          <div class="text-xs mb-2" style="color:var(--muted)">
            <i class="fas fa-chair mr-1"></i>Dine-In${t ? ' — Meja ' + t.number : ''}${waiter ? ' — ' + waiter.name : ''}
          </div>
          <div class="text-xs mb-3">${(() => {
            const names = o.items.map(i => { const mi = getMenuItem(i.menu_item_id); return mi ? mi.name + " x" + i.quantity : ""; }).filter(Boolean);
            return names.length <= 3 ? names.join(", ") : names.slice(0, 3).join(", ") + ' <span style="color:var(--muted)">+' + (names.length - 3) + ' lainnya</span>';
          })()}</div>
          <div class="flex justify-between items-center">
            <span class="font-bold" style="color:var(--accent)">${formatCurrency(o.total_amount)}</span>
            <button onclick="event.stopPropagation();confirmSettleDineIn('${o.id}')" class="btn-primary btn-sm" style="background:linear-gradient(135deg,#27ae60,#1e8449)"><i class="fas fa-hand-holding-dollar mr-1"></i>Terima Setoran Waiter</button>
          </div>
        </div>`;
          }
          if (isUnpaidDelivery) {
            return `
        <div class="order-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="showCashierActiveOrderDetail('${o.id}')">
          <div class="flex justify-between items-start mb-2">
            <div>
              <span class="font-bold text-sm">#${o.id.slice(-5).toUpperCase()}</span>
              <span class="badge ${getStatusBadge(o.status)} ml-2">${getStatusLabel(o.status)}</span>
              <span class="badge badge-unpaid ml-1">Belum Bayar</span>
              <span class="badge ml-1" style="background:rgba(52,152,219,.15);color:#3498db">Belum Setor</span>
            </div>
            <span class="text-xs" style="color:var(--muted)">${formatTime(o.created_at)}</span>
          </div>
          <div class="text-xs mb-2" style="color:var(--muted)">
            <i class="fas fa-motorcycle mr-1"></i>Delivery — ${o.customer_name || (getUser(o.user_id)?.name || getUser(o.user_id)?.email || '—')}${kurir ? ' <span style="color:var(--accent);font-size:10px"><i class="fas fa-motorcycle"></i> ' + kurir.name + '</span>' : ''}
          </div>
          <div class="text-xs mb-3">${(() => {
            const names = o.items.map(i => { const mi = getMenuItem(i.menu_item_id); return mi ? mi.name + " x" + i.quantity : ""; }).filter(Boolean);
            return names.length <= 3 ? names.join(", ") : names.slice(0, 3).join(", ") + ' <span style="color:var(--muted)">+' + (names.length - 3) + ' lainnya</span>';
          })()}</div>
          <div class="text-[10px] mb-1 flex items-center gap-1" style="color:var(--danger)"><i class="fas fa-wallet"></i>Pendapatan Kurir: <b>${formatCurrency(netOngkir)}</b></div>
          <div class="flex justify-between items-center">
            <span class="font-bold" style="color:var(--success)">${formatCurrency(o.total_amount - netOngkir)}</span>
            <button onclick="event.stopPropagation();confirmSettleDelivery('${o.id}')" class="btn-primary btn-sm" style="background:linear-gradient(135deg,#3498db,#2980b9)"><i class="fas fa-hand-holding-dollar mr-1"></i>Terima Setoran</button>
          </div>
        </div>`;
          }
          return `
        <div class="order-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="showOngkirPaymentModal('${o.id}')">
          <div class="flex justify-between items-start mb-2">
            <div>
              <span class="font-bold text-sm">#${o.id.slice(-5).toUpperCase()}</span>
              <span class="badge ml-1" style="font-size:9px;background:rgba(52,152,219,.15);color:#3498db">Telah Diantar</span>
              <span class="badge ml-1" style="${o.ongkir_status === "paid" ? 'background:rgba(52,152,219,.15);color:#3498db' : 'background:rgba(241,196,15,.15);color:#f1c40f'}">${o.ongkir_status === "paid" ? "Siap Diambil" : "Belum Diambil"}</span>
            </div>
            <span class="text-xs" style="color:var(--muted)">${formatTime(o.created_at)}</span>
          </div>
          <div class="text-xs mb-2" style="color:var(--muted)">
            <i class="fas fa-motorcycle mr-1"></i>Delivery — ${o.customer_name || (getUser(o.user_id)?.name || getUser(o.user_id)?.email || '—')}${kurir ? ' <span style="color:var(--accent);font-size:10px"><i class="fas fa-motorcycle"></i> ' + kurir.name + '</span>' : ''}
          </div>
          <div class="text-xs mb-3">${(() => {
            const names = o.items.map(i => { const mi = getMenuItem(i.menu_item_id); return mi ? mi.name + " x" + i.quantity : ""; }).filter(Boolean);
            return names.length <= 3 ? names.join(", ") : names.slice(0, 3).join(", ") + ' <span style="color:var(--muted)">+' + (names.length - 3) + ' lainnya</span>';
          })()}</div>
          <div class="text-[10px] mb-1 flex items-center gap-1" style="color:var(--danger)"><i class="fas fa-wallet"></i>Pendapatan Kurir: <b>${formatCurrency(netOngkir)}</b></div>
          <div class="flex justify-between items-center">
            <span class="font-bold" style="color:var(--success)">${formatCurrency(o.total_amount - netOngkir)}</span>
            <div>
              ${o.ongkir_status === "paid"
                ? `<span class="text-xs font-medium px-3 py-1.5 rounded" style="background:rgba(52,152,219,.15);color:#3498db"><i class="fas fa-clock mr-1"></i>Menunggu Konfirmasi Kurir</span>`
                : `<button onclick="event.stopPropagation();confirmPayOngkir('${o.id}')" class="btn-primary btn-sm"><i class="fas fa-hand-holding-dollar mr-1"></i>Bayar Ongkir</button>`}
            </div>
          </div>
        </div>`;
        }).join('');
      })()}
    </div>
  </div>`;
}

function showOngkirPaymentModal(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  const kurir = getUser(o.courier_id);
  const netOngkir = o.shipping_cost - calcCourierFee(o.shipping_cost);
  const statusOngkir = o.ongkir_status === "unpaid" ? "Belum Diambil" : o.ongkir_status === "paid" ? "Siap Diambil" : o.ongkir_status === "confirmed" ? "Sudah Diterima" : "—";
  const statusColor = o.ongkir_status === "confirmed" ? "var(--success)" : o.ongkir_status === "paid" ? "#3498db" : o.ongkir_status === "unpaid" ? "#f1c40f" : "var(--muted)";
  const statusBg = o.ongkir_status === "confirmed" ? "rgba(46,204,113,.15)" : o.ongkir_status === "paid" ? "rgba(52,152,219,.15)" : o.ongkir_status === "unpaid" ? "rgba(241,196,15,.15)" : "rgba(150,150,150,.15)";
  const tax = Math.round(calcItemTax(o.items));
  const subtotal = o.items.reduce((s, i) => s + i.unit_price * i.quantity, 0);
  showModal(`
<div>
  <div class="flex justify-between items-start mb-4">
    <h3 class="font-display text-lg font-bold">Pesanan #${o.id.slice(-5).toUpperCase()}</h3>
    <span class="badge" style="background:${statusBg};color:${statusColor}">${statusOngkir}</span>
  </div>
  <div class="text-sm mb-4">
    <div class="mb-1"><i class="fas fa-user mr-2" style="color:var(--accent)"></i>${o.customer_name || (getUser(o.user_id)?.name || getUser(o.user_id)?.email || '—')}</div>
    <div class="mb-1"><i class="fas fa-phone mr-2" style="color:var(--accent)"></i>${o.customer_phone || (getUser(o.user_id)?.phone || '—')}</div>
    <div class="mb-1"><i class="fas fa-map-marker-alt mr-2" style="color:var(--accent)"></i>${o.delivery_address || '—'}</div>
    ${o.delivery_detail ? `<div class="text-xs mt-1" style="color:var(--muted)"><i class="fas fa-info-circle mr-1"></i>${o.delivery_detail}</div>` : ""}
    <div class="mt-2 text-xs" style="color:var(--muted)"><i class="far fa-clock mr-1"></i>${formatDate(o.created_at)} ${formatTime(o.created_at)} ${kurir ? '— <i class="fas fa-motorcycle mr-1" style="color:var(--accent)"></i>' + kurir.name : ''}</div>
  </div>
  <div class="p-3 rounded-xl mb-3" style="background:var(--bg2)">
    <div class="text-xs font-semibold mb-2" style="color:var(--muted)"><i class="fas fa-receipt mr-1"></i>Rincian Pesanan</div>
    ${o.items.filter(i => i.status !== "rejected").map(i => {
      const mi = getMenuItem(i.menu_item_id);
      return mi ? `<div class="flex justify-between text-xs mb-1"><span>${mi.name} x${i.quantity}</span><span>${formatCurrency(i.unit_price * i.quantity)}</span></div>` : '';
    }).join('')}
    <div class="border-t pt-2 mt-2" style="border-color:var(--border)">
      <div class="flex justify-between text-xs mb-1" style="color:var(--muted)"><span>Subtotal</span><span>${formatCurrency(subtotal)}</span></div>
      ${o.promo_discount > 0 ? `<div class="flex justify-between text-xs mb-1" style="color:var(--success)"><span><i class="fas fa-tag mr-1"></i>Diskon Promo</span><span>-${formatCurrency(o.promo_discount)}</span></div>` : ''}
      <div class="flex justify-between text-xs mb-1" style="color:var(--muted)"><span><i class="fas fa-receipt mr-1"></i>Pajak</span><span>${formatCurrency(tax)}</span></div>
      ${o.service_fee > 0 ? `<div class="flex justify-between text-xs mb-1" style="color:var(--muted)"><span><i class="fas fa-hand-holding-dollar mr-1"></i>Biaya Layanan</span><span>${formatCurrency(o.service_fee)}</span></div>` : ''}
      ${o.shipping_cost && o.shipping_cost > 0 ? `<div class="flex justify-between text-xs mb-1" style="color:var(--muted)"><span><i class="fas fa-truck mr-1"></i>Ongkos Kirim</span><span style="color:var(--accent)">${formatCurrency(o.shipping_cost)}</span></div>` : ''}
      <div class="flex justify-between font-bold text-sm mt-1"><span>Total</span><span style="color:var(--accent)">${formatCurrency(o.total_amount)}</span></div>
    </div>
  </div>
  <div class="flex justify-between text-xs mb-1" style="color:var(--muted)"><span>Metode Pembayaran</span><span>${o.payment_method === 'qris' ? 'QRIS' : o.payment_method === 'bank_transfer' ? 'Transfer Bank' : o.payment_method === 'digital' ? 'Digital' : o.payment_method === "" ? 'Bayar Nanti (COD)' : 'Tunai/COD'}</span></div>
  <div class="flex justify-between text-xs mb-1" style="color:var(--muted)"><span>Status Bayar</span><span class="badge ${o.status === "delivered" ? "badge-unpaid" : o.payment_status === "paid" ? "badge-paid" : "badge-unpaid"}" ${o.status === "delivered" ? 'style="background:rgba(241,196,15,.15);color:#f1c40f"' : ""}>${o.status === "delivered" ? "Belum Setor" : o.payment_status === "paid" ? "Lunas" : "Belum Bayar"}</span></div>
  <div class="border-t pt-3 mt-3" style="border-color:var(--border)">
    ${o.shipping_cost > 0 && o.ongkir_status ? `<div class="flex justify-between text-xs mb-1" style="color:${statusColor}"><span><i class="fas fa-hand-holding-dollar mr-1"></i>Status Ongkir</span><span>${statusOngkir}</span></div>` : ""}
    ${o.shipping_cost && o.shipping_cost > 0 ? `<div class="flex justify-between text-xs mb-1" style="color:var(--muted)"><span><i class="fas fa-hand-holding-dollar mr-1"></i>Jasa Aplikasi</span><span style="color:var(--success)">${formatCurrency(calcCourierFee(o.shipping_cost))}</span></div>
    <div class="flex justify-between text-xs mb-2 pb-2" style="border-bottom:1px dashed var(--border);color:var(--danger)"><span><i class="fas fa-wallet mr-1"></i>Pendapatan Kurir</span><span>-${formatCurrency(netOngkir)}</span></div>` : ""}
    <div class="flex justify-between text-xs" style="color:var(--muted)"><span>Waktu Selesai</span><span>${formatTime(o.created_at)}</span></div>
    ${o.delivery_location && o.delivery_location.lat ? (function() {
      const d = calcDistance(DB.cafe.location.lat, DB.cafe.location.lng, o.delivery_location.lat, o.delivery_location.lng);
      const meter = Math.round(d).toLocaleString('id-ID');
      const km = (d / 1000).toFixed(1).replace('.', ',');
      const label = d < 1000 ? meter + ' meter' : meter + ' m (' + km + ' km)';
      return `<div class="flex justify-between text-xs mt-1" style="color:var(--accent)"><span><i class="fas fa-store mr-1"></i>Cafe → Pelanggan</span><span>${label}</span></div>`;
    })() : ""}
  </div>
  <div class="flex gap-2 mt-4">
    <button onclick="closeModal();printOngkirInvoice('${o.id}')" class="btn-primary flex-1 text-center"><i class="fas fa-print mr-1"></i>Cetak</button>
    <button onclick="closeModal()" class="btn-secondary flex-1 text-center">Tutup</button>
  </div>
</div>
`);
}

function printOngkirInvoice(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  const kurir = getUser(o.courier_id);
  const netOngkir = o.shipping_cost - calcCourierFee(o.shipping_cost);
  const win = window.open("", "_blank");
  win.document.write(`
    <html><head>
      <title>Ongkir #${o.id.slice(-5).toUpperCase()}</title>
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
        <p>Pembayaran Ongkir Kurir</p>
        <p>#${o.id.slice(-5).toUpperCase()}</p>
        <p>${new Date().toLocaleString("id-ID")}</p>
      </div>
      <div class="divider"></div>
      <div class="item"><span>Ongkos Kirim</span><span>${formatCurrency(o.shipping_cost)}</span></div>
      <div class="item" style="color:#e74c3c"><span>Jasa Aplikasi</span><span>-${formatCurrency(calcCourierFee(o.shipping_cost))}</span></div>
      <div class="divider"></div>
      <div class="totals">
        <div style="font-weight:bold;font-size:15px;color:#27ae60"><span>Pendapatan Ongkir</span><span>${formatCurrency(netOngkir)}</span></div>
        <div style="margin-top:8px"><span>Kurir</span><span>${kurir ? kurir.name : '—'}</span></div>
        <div><span>Pelanggan</span><span>${o.customer_name || (getUser(o.user_id)?.name || getUser(o.user_id)?.email || '—')}</span></div>
        <div><span>Status</span><span>${o.ongkir_status === "paid" || o.ongkir_status === "confirmed" ? "Dibayar" : "Belum Dibayar"}</span></div>
      </div>
      <div class="divider"></div>
      <p style="font-size:11px;text-align:left;margin:0 0 4px 0"><strong>ARQA Coffee</strong><br>${DB.cafe.address || ''}</p>
      <div class="footer">Terima kasih telah menggunakan ARQA Coffee</div>
      <script>window.print()</script>
    </body></html>
  `);
  win.document.close();
}

function printCashierInvoice(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  const win = window.open("", "_blank");
  const isDelivered = o.status === "delivered" && o.order_type === "delivery";
  const paidLabel = o.status === "delivered" ? "Belum Setor" : o.payment_status === "paid" ? "Lunas" : "Belum Bayar";
  const payStatusClass = o.status === "delivered" ? "color:#f1c40f" : o.payment_status === "paid" ? "" : "color:#e74c3c";
  let paymentMethodLabel = "Tunai";
  if (o.payment_method === "digital") paymentMethodLabel = "Digital";
  else if (o.payment_method === "cod" || o.payment_method === "") paymentMethodLabel = "COD";
  else if (o.payment_method === "qris") paymentMethodLabel = "QRIS";
  else if (o.payment_method === "bank_transfer") paymentMethodLabel = "Transfer Bank";
  const subtotal = o.items.reduce(
    (sum, i) => sum + i.unit_price * i.quantity,
    0,
  );
  const tax = Math.round(calcItemTax(o.items));
  const kurir = isDelivered && o.courier_id ? getUser(o.courier_id) : null;
  const netOngkir = isDelivered && o.shipping_cost ? o.shipping_cost - calcCourierFee(o.shipping_cost) : 0;
  const dineInFee = isDelivered ? (o.service_fee || 0) : calcCustomerFee(subtotal, o.order_type);
  const items = isDelivered ? o.items.filter(i => i.status !== "rejected") : o.items;
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
        .info { font-size:11px; color:#555; margin-bottom:4px; }
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
        ${isDelivered ? `
        <p>${o.customer_name || (getUser(o.user_id)?.name || getUser(o.user_id)?.email || '—')}</p>
        ${o.customer_phone || (getUser(o.user_id)?.phone || '') ? `<p>${o.customer_phone || getUser(o.user_id)?.phone || ''}</p>` : ''}
        ${o.delivery_detail ? `<p style="font-size:11px">${o.delivery_detail}</p>` : ''}
        ${kurir ? `<p style="font-size:11px">Kurir: ${kurir.name}</p>` : ''}
        ` : (o.customer_name ? `<p>${o.customer_name}</p>` : "")}
        ${o.user_id && o.user_id !== 'walk-in' && getUser(o.user_id) ? `<p>${getUser(o.user_id).email}</p>` : ""}
        <p>#${o.id.slice(-5).toUpperCase()}</p>
        <p>${new Date(o.created_at).toLocaleString("id-ID")}</p>
      </div>
      <div class="divider"></div>
      ${items
        .map((i) => {
          const mi = getMenuItem(i.menu_item_id);
          return `<div class="item"><span class="name">${mi ? mi.name : "Item"}</span><span class="qty">x${i.quantity}</span><span class="price">${formatCurrency(i.unit_price * i.quantity)}</span></div>`;
        })
        .join("")}
      <div class="divider"></div>
      <div class="totals">
        <div><span>Subtotal</span><span>${formatCurrency(subtotal)}</span></div>
        ${o.promo_discount ? `<div style="color:#27ae60"><span>Diskon Promo</span><span>-${formatCurrency(o.promo_discount)}</span></div>` : ""}
        ${o.shipping_cost && o.shipping_cost > 0 ? `<div><span>Ongkos Kirim</span><span>${formatCurrency(o.shipping_cost)}</span></div>` : ""}
        ${dineInFee > 0 ? `<div style="color:#e07a3a"><span>Biaya Layanan</span><span>${formatCurrency(dineInFee)}</span></div>` : ""}
        <div><span>Pajak</span><span>${formatCurrency(Math.round(tax))}</span></div>
        <div style="font-weight:bold;font-size:15px"><span>Total</span><span>${formatCurrency(o.total_amount)}</span></div>
        <div style="margin-top:8px"><span>Pembayaran</span><span>${paymentMethodLabel}</span></div>
        <div><span>Status</span><span style="${payStatusClass}">${paidLabel}</span></div>
      </div>
      ${isDelivered && o.shipping_cost && o.shipping_cost > 0 ? `
      <div class="divider"></div>
      <div class="info">Pendapatan Kurir: ${formatCurrency(netOngkir)}</div>
      <div class="info">Jasa Aplikasi: ${formatCurrency(calcCourierFee(o.shipping_cost))}</div>
      ` : ""}
      ${isDelivered && o.delivery_location && o.delivery_location.lat ? (function() {
        const d = calcDistance(DB.cafe.location.lat, DB.cafe.location.lng, o.delivery_location.lat, o.delivery_location.lng);
        const label = d < 1000 ? Math.round(d).toLocaleString('id-ID') + ' meter' : (d / 1000).toFixed(1).replace('.', ',') + ' km';
        return `<div class="info">Jarak: ${label}</div>`;
      })() : ""}
      <div class="divider"></div>
      <p style="font-size:11px;text-align:left;margin:0 0 4px 0"><strong>ARQA Coffee</strong><br>${DB.cafe.address || ''}</p>
      <div class="footer">Terima kasih telah berbelanja di ARQA Coffee</div>
      <script>window.print()</script>
    </body></html>
  `);
  win.document.close();
}

function showCashierActiveOrderDetail(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  const t = o.table_id ? getTable(o.table_id) : null;
  const tax = Math.round(calcItemTax(o.items));
  const subtotal = o.items.reduce((s, i) => s + i.unit_price * i.quantity, 0);
  const dineInFee = calcCustomerFee(subtotal, o.order_type);
  const isDeliverOrder = o.order_type === "delivery";
  const isDelivered = o.status === "delivered" && isDeliverOrder;
  const isCompletedDelivery = o.status === "completed" && isDeliverOrder;
  const kurir = (isDelivered || isCompletedDelivery) ? getUser(o.courier_id) : null;
  const netOngkir = (isDelivered || isCompletedDelivery) && o.shipping_cost ? o.shipping_cost - calcCourierFee(o.shipping_cost) : 0;
  showModal(`
<div>
  ${isDeliverOrder ? `
  <div class="flex justify-between items-start mb-4">
    <h3 class="font-display text-lg font-bold">Pesanan #${o.id.slice(-5).toUpperCase()}</h3>
    ${isDelivered && o.payment_status === 'unpaid' ? '<span class="badge" style="background:rgba(52,152,219,.15);color:#3498db">Belum Setor</span>' : '<span class="badge" style="background:rgba(46,204,113,.15);color:var(--success)">Selesai</span>'}
  </div>
  <div class="text-sm mb-4">
    <div class="mb-1"><i class="fas fa-user mr-2" style="color:var(--accent)"></i>${o.customer_name || (getUser(o.user_id)?.name || getUser(o.user_id)?.email || '—')}</div>
    <div class="mb-1"><i class="fas fa-phone mr-2" style="color:var(--accent)"></i>${o.customer_phone || (getUser(o.user_id)?.phone || '—')}</div>
    <div class="mb-1"><i class="fas fa-map-marker-alt mr-2" style="color:var(--accent)"></i>${o.delivery_address || '—'}</div>
    ${o.delivery_detail ? `<div class="text-xs mt-1" style="color:var(--muted)"><i class="fas fa-info-circle mr-1"></i>${o.delivery_detail}</div>` : ""}
    <div class="mt-2 text-xs" style="color:var(--muted)"><i class="far fa-clock mr-1"></i>${formatDate(o.created_at)} ${formatTime(o.created_at)} ${kurir ? '— <i class="fas fa-motorcycle mr-1" style="color:var(--accent)"></i>' + kurir.name : ''}</div>
  </div>
  ` : `
  <div class="flex justify-between items-start mb-4">
    <div>
      <h3 class="font-display text-lg font-bold">#${o.id.slice(-5).toUpperCase()}</h3>
      <p class="text-xs" style="color:var(--muted)">${formatTime(o.created_at)}</p>
    </div>
    <span class="badge ${getStatusBadge(o.status)}">${getStatusLabel(o.status)}</span>
  </div>
  <div class="text-xs mb-4" style="color:var(--muted)">
    <i class="fas ${o.order_type === "dine-in" ? "fa-chair" : o.order_type === "delivery" ? "fa-motorcycle" : "fa-bag-shopping"} mr-1"></i>${getOrderTypeName(o.order_type)}
    ${t ? " — Meja " + t.number : ""}
    ${o.customer_name ? " — " + o.customer_name : ""}${o.user_id && o.user_id !== 'walk-in' && getUser(o.user_id) ? ' (' + getUser(o.user_id).email + ')' : ''}
    ${o.order_type === "dine-in" && o.status !== "completed" ? ` <button onclick="closeModal();changeOrderTable('${o.id}')" class="text-xs inline-flex items-center" style="color:var(--accent)"><i class="fas fa-pen"></i> Ubah Meja</button>` : ""}
    ${o.waiter_id && getUser(o.waiter_id) ? '<br><span style="font-size:10px;color:var(--accent)"><i class="fas fa-user-tie"></i> ' + getUser(o.waiter_id).name + '</span>' : ''}
    ${o.courier_id && getUser(o.courier_id) ? '<br><span style="font-size:10px;color:var(--accent)"><i class="fas fa-motorcycle"></i> ' + getUser(o.courier_id).name + '</span>' : ''}
    ${o.delivery_address ? "<br>" + o.delivery_address : ""}
  </div>
  `}
  <div class="p-3 rounded-xl mb-3" style="background:var(--bg2)">
    <div class="flex items-center gap-2 mb-2 text-xs font-semibold" style="color:var(--muted)">
      <i class="fas fa-receipt"></i> Rincian Pesanan
    </div>
    <div class="space-y-1.5">
      ${(isDelivered ? o.items.filter(i => i.status !== "rejected") : o.items).map((i) => {
        const mi = getMenuItem(i.menu_item_id);
        return mi ? `
      <div class="flex justify-between text-xs">
        <span>${mi.name} x${i.quantity}${i.notes ? ' <span style="color:var(--muted)">(' + i.notes + ")</span>" : ""} ${mi.submitted_by ? '<span style="color:#e84393;font-size:10px">(Mitra ' + mi.submitted_by + ')</span>' : '<span style="color:var(--accent);font-size:10px">(Arqa)</span>'}</span>
        <span style="color:var(--muted)">${formatCurrency(i.unit_price * i.quantity)}</span>
      </div>` : "";
      }).join("")}
    </div>
    <div class="border-t my-2" style="border-color:var(--border)"></div>
    <div class="flex justify-between text-xs mb-1" style="color:var(--muted)"><span>Subtotal</span><span>${formatCurrency(subtotal)}</span></div>
    ${o.promo_discount ? `<div class="flex justify-between text-xs mb-1" style="color:var(--success)"><span><i class="fas fa-tag mr-1"></i>Diskon Promo</span><span>-${formatCurrency(o.promo_discount)}</span></div>` : ""}
    ${o.shipping_cost && o.shipping_cost > 0 ? `<div class="flex justify-between text-xs mb-1" style="color:var(--accent)"><span><i class="fas fa-truck mr-1"></i>Ongkos Kirim</span><span>${formatCurrency(o.shipping_cost)}</span></div>` : ""}
    ${!isDelivered && dineInFee > 0 ? `<div class="flex justify-between text-xs mb-1" style="color:#e07a3a"><span><i class="fas fa-hand-holding-usd mr-1"></i>Biaya Layanan</span><span>${formatCurrency(dineInFee)}</span></div>` : ""}
    <div class="flex justify-between text-xs mb-1" style="color:var(--accent)"><span><i class="fas fa-receipt mr-1"></i>Pajak</span><span>${formatCurrency(Math.round(tax))}</span></div>
    <div class="border-t my-2" style="border-color:var(--border)"></div>
    <div class="flex justify-between font-bold text-sm"><span>Total</span><span style="color:var(--accent)">${formatCurrency(o.total_amount)}</span></div>
  </div>
    <div class="border-t my-2" style="border-color:var(--border)"></div>
    <div class="flex justify-between text-xs mb-1" style="color:var(--muted)"><span>Subtotal</span><span>${formatCurrency(subtotal)}</span></div>
    ${o.promo_discount ? `<div class="flex justify-between text-xs mb-1" style="color:var(--success)"><span><i class="fas fa-tag mr-1"></i>Diskon Promo</span><span>-${formatCurrency(o.promo_discount)}</span></div>` : ""}
    ${o.shipping_cost && o.shipping_cost > 0 ? `<div class="flex justify-between text-xs mb-1" style="color:var(--accent)"><span><i class="fas fa-truck mr-1"></i>Ongkos Kirim</span><span>${formatCurrency(o.shipping_cost)}</span></div>` : ""}
    ${isDelivered && o.service_fee > 0 ? `<div class="flex justify-between text-xs mb-1" style="color:#e07a3a"><span><i class="fas fa-hand-holding-usd mr-1"></i>Biaya Layanan</span><span>${formatCurrency(o.service_fee)}</span></div>` : ""}
    ${!isDelivered && dineInFee > 0 ? `<div class="flex justify-between text-xs mb-1" style="color:#e07a3a"><span><i class="fas fa-hand-holding-usd mr-1"></i>Biaya Layanan</span><span>${formatCurrency(dineInFee)}</span></div>` : ""}
    <div class="flex justify-between text-xs mb-1" style="color:var(--accent)"><span><i class="fas fa-receipt mr-1"></i>Pajak</span><span>${formatCurrency(Math.round(tax))}</span></div>
    <div class="border-t my-2" style="border-color:var(--border)"></div>
    <div class="flex justify-between font-bold text-sm"><span>Total</span><span style="color:var(--accent)">${formatCurrency(o.total_amount)}</span></div>
  </div>
  ${isDeliverOrder ? `
  <div class="flex justify-between text-xs mb-1" style="color:var(--muted)"><span>Metode Pembayaran</span><span>${o.payment_method === 'qris' ? 'QRIS' : o.payment_method === 'bank_transfer' ? 'Transfer Bank' : o.payment_method === 'digital' ? 'Digital' : o.payment_method === "" ? 'Bayar Nanti (COD)' : 'Tunai/COD'}</span></div>
  <div class="flex justify-between text-xs mb-1" style="color:var(--muted)"><span>Status Bayar</span><span class="badge" style="${o.payment_status === 'paid' ? 'background:rgba(46,204,113,.15);color:var(--success)' : 'background:rgba(52,152,219,.15);color:#3498db'}">${o.payment_status === 'paid' ? 'Lunas' : 'Belum Setor'}</span></div>
  <div class="border-t pt-3 mt-3" style="border-color:var(--border)">
    ${o.shipping_cost && o.shipping_cost > 0 ? `
    <div class="flex justify-between text-xs mb-1" style="color:var(--muted)"><span><i class="fas fa-hand-holding-dollar mr-1"></i>Jasa Aplikasi</span><span style="color:var(--success)">${formatCurrency(calcCourierFee(o.shipping_cost))}</span></div>
    <div class="flex justify-between text-xs mb-2 pb-2" style="border-bottom:1px dashed var(--border);color:var(--danger)"><span><i class="fas fa-wallet mr-1"></i>Pendapatan Kurir</span><span>-${formatCurrency(netOngkir)}</span></div>
    ` : ""}
    <div class="flex justify-between text-xs" style="color:var(--muted)"><span>Waktu Selesai</span><span>${formatTime(o.created_at)}</span></div>
    ${o.delivery_location && o.delivery_location.lat ? (function() {
      const d = calcDistance(DB.cafe.location.lat, DB.cafe.location.lng, o.delivery_location.lat, o.delivery_location.lng);
      const meter = Math.round(d).toLocaleString('id-ID');
      const km = (d / 1000).toFixed(1).replace('.', ',');
      const label = d < 1000 ? meter + ' meter' : meter + ' m (' + km + ' km)';
      return `<div class="flex justify-between text-xs mt-1" style="color:var(--accent)"><span><i class="fas fa-store mr-1"></i>Cafe → Pelanggan</span><span>${label}</span></div>`;
    })() : ""}
  </div>
  ` : `
  <div class="flex justify-between text-xs mb-4" style="color:var(--muted)">
    <span>Pembayaran</span>
    <span class="badge ${o.payment_status === "paid" ? "badge-paid" : "badge-unpaid"} ml-1">${o.payment_status === "paid" ? "Lunas" : "Belum Bayar"}</span>
  </div>
  `}
  <div class="flex flex-wrap gap-2 mt-4">
    ${isDeliverOrder ? `
    ${o.payment_status === 'unpaid' ? `<button onclick="closeModal();printOngkirInvoice('${o.id}')" class="btn-primary flex-1 text-center"><i class="fas fa-print mr-1"></i>Cetak</button>` : `<button onclick="closeModal();printCashierInvoice('${o.id}')" class="btn-primary flex-1 text-center"><i class="fas fa-print mr-1"></i>Cetak</button>`}
    ` : `
    ${(o.status === "ready" || (o.status === "delivered" && o.order_type !== "delivery")) && o.payment_status === "unpaid" ? `<button onclick="closeModal();showPaymentModal('${o.id}')" class="btn-primary flex-1 text-center">Bayar</button>` : ""}
    ${(o.status === "ready" || (o.status === "delivered" && o.order_type !== "delivery")) && o.payment_status === "paid" ? `<button onclick="closeModal();confirmCompleteOrder('${o.id}')" class="btn-primary flex-1 text-center" style="background:linear-gradient(135deg,var(--success),#1e8449)">Selesai</button>` : ""}
    <button onclick="closeModal();printCashierInvoice('${o.id}')" class="btn-secondary flex-1 text-center"><i class="fas fa-print mr-1"></i>Cetak</button>
    `}
    <button onclick="closeModal()" class="btn-secondary flex-1 text-center">Tutup</button>
  </div>
</div>
`);
}

function showCashierOrderDetail(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  const t = o.table_id ? getTable(o.table_id) : null;
  const subtotal = o.items.reduce((s, i) => s + i.unit_price * i.quantity, 0);
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
    ${o.waiter_id && getUser(o.waiter_id) ? '<br><span style="font-size:10px;color:var(--accent)"><i class="fas fa-user-tie"></i> ' + getUser(o.waiter_id).name + '</span>' : ''}${o.courier_id && getUser(o.courier_id) ? ' <span style="font-size:10px;color:var(--accent)"><i class="fas fa-motorcycle"></i> ' + getUser(o.courier_id).name + '</span>' : ''}
    ${o.delivery_address ? "<br>" + o.delivery_address : ""}
  </div>
  ${(o.status === "rejected" || o.status === "cancelled") && o.reject_reason ? `<div class="card mb-4 text-sm" style="background:rgba(231,76,60,.08);border:1px solid rgba(231,76,60,.2)"><i class="fas fa-ban mr-1" style="color:var(--danger)"></i><strong>${o.status === "cancelled" ? "Alasan Pembatalan:" : "Alasan Penolakan:"}</strong> ${o.reject_reason}</div>` : ""}
  <div class="p-3 rounded-xl mb-3" style="background:var(--bg2)">
    <div class="flex items-center gap-2 mb-2 text-xs font-semibold" style="color:var(--muted)">
      <i class="fas fa-receipt"></i> Rincian Pesanan
    </div>
    <div class="space-y-1.5">
      ${o.items
        .map((i) => {
          const mi = getMenuItem(i.menu_item_id);
          return mi
            ? `
      <div class="flex justify-between text-xs" style="color:${o.status === "rejected" || o.status === "cancelled" ? "var(--danger)" : "inherit"}">
        <span>${mi.name} x${i.quantity} ${i.notes ? '<span style="color:var(--muted)">(' + i.notes + ")</span>" : ""} ${mi.submitted_by ? '<span style="color:#e84393;font-size:10px">(Mitra ' + mi.submitted_by + ')</span>' : '<span style="color:var(--accent);font-size:10px">(Arqa)</span>'}</span>
        <span style="color:${o.status === "rejected" || o.status === "cancelled" ? "var(--danger)" : "var(--muted)"}">${formatCurrency(i.unit_price * i.quantity)}</span>
      </div>`
            : "";
        })
        .join("")}
    </div>
    <div class="border-t my-2" style="border-color:var(--border)"></div>
    <div class="flex justify-between text-xs mb-1" style="color:var(--muted)"><span>Subtotal</span><span>${formatCurrency(subtotal)}</span></div>
    ${o.promo_discount ? `<div class="flex justify-between text-xs mb-1" style="color:var(--success)"><span><i class="fas fa-tag mr-1"></i>Diskon Promo</span><span>-${formatCurrency(o.promo_discount)}</span></div>` : ""}
    ${o.shipping_cost && o.shipping_cost > 0 ? `<div class="flex justify-between text-xs mb-1" style="color:var(--accent)"><span><i class="fas fa-truck mr-1"></i>Ongkos Kirim</span><span>${formatCurrency(o.shipping_cost)}</span></div>` : ""}
    ${o.service_fee && o.service_fee > 0 ? `<div class="flex justify-between text-xs mb-1" style="color:#e07a3a"><span><i class="fas fa-hand-holding-usd mr-1"></i>Biaya Layanan</span><span>${formatCurrency(o.service_fee)}</span></div>` : ""}
    <div class="flex justify-between text-xs mb-1" style="color:var(--accent)"><span><i class="fas fa-receipt mr-1"></i>Pajak</span><span>${formatCurrency(Math.round(calcItemTax(o.items)))}</span></div>
    <div class="border-t my-2" style="border-color:var(--border)"></div>
    <div class="flex justify-between font-bold text-sm"><span>Total</span><span style="color:${o.status === "rejected" || o.status === "cancelled" ? "var(--danger)" : "var(--accent)"}">${formatCurrency(o.total_amount)}</span></div>
  </div>
  <div class="flex justify-between text-xs mb-4" style="color:var(--muted)"><span>Pembayaran</span><span>${o.payment_method === "digital" ? "Digital" : "Tunai/COD"}</span></div>
  <div class="flex justify-between text-xs mb-4" style="color:var(--muted)"><span>Waktu Selesai</span><span>${formatTime(o.created_at)}</span></div>
  <div class="flex gap-2 mt-4">
    ${o.status === "completed" ? `<button onclick="printCashierInvoice('${o.id}')" class="btn-primary flex-1 text-center"><i class="fas fa-print mr-1"></i>Cetak</button>` : ""}
    <button onclick="closeModal()" class="btn-secondary flex-1 text-center">Tutup</button>
  </div>
</div>
`);
}

function changeOrderTable(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o || o.status === "completed" || o.status === "cancelled" || o.status === "rejected") return;
  const currentTable = o.table_id ? getTable(o.table_id) : null;
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-2 text-center">Ubah Meja</h3>
      <p class="text-xs mb-4 text-center" style="color:var(--muted)">Pesanan #${o.id.slice(-5).toUpperCase()}</p>
      ${currentTable ? `<div class="mb-4 p-3 rounded-xl text-center text-sm" style="background:var(--bg2)"><span style="color:var(--muted)">Meja saat ini:</span> <strong>${currentTable.number}</strong></div>` : ""}
      <div id="qr-reader" class="qr-scanner-area mb-4 flex items-center justify-center" style="width:100%;min-height:220px;background:rgba(0,0,0,.3);border-radius:12px;overflow:hidden;position:relative">
        <div class="qr-line"></div>
        <i class="fas fa-qrcode text-5xl" style="color:var(--accent);opacity:.3"></i>
      </div>
      <p class="text-xs mb-3 text-center" style="color:var(--muted)">Atau pilih meja secara manual:</p>
      <div class="grid grid-cols-4 gap-3 mb-4">
        ${DB.tables.map((t) => {
          const isCurrent = t.id === o.table_id;
          const isOccupied = t.status === "occupied" && !isCurrent;
          const canSelect = !isOccupied;
          return `<button class="card text-center py-3 text-sm font-semibold ${!canSelect ? "opacity-40 cursor-not-allowed" : ""}" onclick="${canSelect ? `selectCashierTable('${o.id}','${t.id}')` : ""}" style="${!canSelect ? "pointer-events:none" : ""} ${isCurrent ? "border:2px solid var(--accent)" : ""}">
            <i class="fas fa-chair mb-1" style="color:${isCurrent ? "var(--accent)" : isOccupied ? "var(--danger)" : "var(--success)"}"></i><br>${t.number}${isCurrent ? '<br><span style="font-size:8px;color:var(--accent)">Sekarang</span>' : ""}
          </button>`;
        }).join("")}
      </div>
      <button onclick="closeModal()" class="btn-secondary w-full text-center">Batal</button>
    </div>
  `, () => {
    initCashierQRScanner(id);
  });
}

function initCashierQRScanner(orderId) {
  const readerEl = document.getElementById('qr-reader');
  if (!readerEl || typeof Html5Qrcode === 'undefined') return;
  try {
    _qrScannerInstance = new Html5Qrcode("qr-reader");
    _qrScannerInstance.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: { width: 220, height: 220 } },
      (decodedText) => {
        handleCashierQRResult(decodedText, orderId);
      },
      () => {}
    ).catch(() => {});
  } catch (e) {}
}

function handleCashierQRResult(code, orderId) {
  const table = DB.tables.find((t) => t.qr_code === code);
  if (!table) {
    showToast("QR code tidak dikenal!", "error");
    return;
  }
  stopQRScanner();
  selectCashierTable(orderId, table.id);
}

function selectCashierTable(orderId, tableId) {
  const o = DB.orders.find((x) => x.id === orderId);
  if (!o) return;
  if (o.table_id === tableId) { closeModal(); return; }
  if (o.table_id) {
    const oldT = getTable(o.table_id);
    const hasOtherOrders = DB.orders.some(
      (x) => x.id !== o.id && x.table_id === o.table_id && x.status !== "completed" && x.status !== "cancelled" && x.status !== "rejected",
    );
    if (oldT && !hasOtherOrders) oldT.status = "available";
  }
  o.table_id = tableId;
  if (tableId) {
    const newT = getTable(tableId);
    if (newT) newT.status = "occupied";
  }
  showToast(`Meja pesanan #${o.id.slice(-5).toUpperCase()} berhasil diubah`, "success");
  closeModal();
  render();
}

function confirmSettleDelivery(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  const netOngkir = o.shipping_cost - calcCourierFee(o.shipping_cost);
  showModal(`
    <div>
      <div class="text-center mb-4">
        <i class="fas fa-hand-holding-dollar text-4xl mb-3" style="color:#3498db"></i>
        <h3 class="font-display text-lg font-bold">Konfirmasi Setoran</h3>
      </div>
      <p class="text-sm text-center mb-4" style="color:var(--muted)">
        Terima setoran dari kurir untuk pesanan <strong>#${o.id.slice(-5).toUpperCase()}</strong>?
      </p>
      <div class="p-3 rounded-xl mb-4" style="background:var(--bg2)">
        <div class="flex justify-between text-xs mb-2"><span style="color:var(--muted)">Total Pesanan</span><span>${formatCurrency(o.total_amount)}</span></div>
        <div class="flex justify-between text-xs mb-2" style="color:var(--danger)"><span>Pendapatan Kurir</span><span>-${formatCurrency(netOngkir)}</span></div>
        <div class="border-t pt-2" style="border-color:var(--border)"></div>
        <div class="flex justify-between font-bold text-sm" style="color:var(--success)"><span>Pemasukan Bersih</span><span>${formatCurrency(o.total_amount - netOngkir)}</span></div>
      </div>
      <div class="flex gap-3">
        <button onclick="closeModal();settleDelivery('${id}')" class="btn-primary flex-1 text-center" style="background:linear-gradient(135deg,#3498db,#2980b9)"><i class="fas fa-check mr-1"></i>Ya, Terima</button>
        <button onclick="closeModal()" class="btn-secondary flex-1 text-center">Batal</button>
      </div>
    </div>
  `);
}

function confirmPayOngkir(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  const netOngkir = o.shipping_cost - calcCourierFee(o.shipping_cost);
  showModal(`
    <div>
      <div class="text-center mb-4">
        <i class="fas fa-hand-holding-dollar text-4xl mb-3" style="color:#f1c40f"></i>
        <h3 class="font-display text-lg font-bold">Konfirmasi Pembayaran Ongkir</h3>
      </div>
      <p class="text-sm text-center mb-4" style="color:var(--muted)">
        Bayar ongkir kurir untuk pesanan <strong>#${o.id.slice(-5).toUpperCase()}</strong>?
      </p>
      <div class="p-3 rounded-xl mb-4" style="background:var(--bg2)">
        <div class="flex justify-between text-xs mb-2"><span style="color:var(--muted)">Total Pesanan</span><span>${formatCurrency(o.total_amount)}</span></div>
        <div class="flex justify-between text-xs mb-2" style="color:var(--danger)"><span>Pendapatan Kurir</span><span>-${formatCurrency(netOngkir)}</span></div>
        <div class="border-t pt-2" style="border-color:var(--border)"></div>
        <div class="flex justify-between font-bold text-sm" style="color:var(--success)"><span>Pemasukan Bersih</span><span>${formatCurrency(o.total_amount - netOngkir)}</span></div>
      </div>
      <div class="flex gap-3">
        <button onclick="closeModal();payOngkir('${id}')" class="btn-primary flex-1 text-center" style="background:linear-gradient(135deg,#e67e22,#d35400)"><i class="fas fa-check mr-1"></i>Ya, Bayar</button>
        <button onclick="closeModal()" class="btn-secondary flex-1 text-center">Batal</button>
      </div>
    </div>
  `);
}

function renderCashierPayment() {
  const dateVal = State.cashierPaymentDate || new Date().toLocaleDateString('sv-SE');
  const completedToday = DB.orders.filter(o => {
    if (!['completed', 'rejected', 'cancelled'].includes(o.status)) return false;
    if (!o.created_at) return false;
    const d = new Date(o.created_at).toLocaleDateString('sv-SE');
    return d === dateVal;
  }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const totalRevenue = completedToday
    .filter(o => o.status === 'completed')
    .reduce((s, o) => s + (typeof effectiveAmount === 'function' ? effectiveAmount(o) : (o.total_amount || 0)), 0);
  const totalSelesai = completedToday.filter(o => o.status === 'completed').length;
  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Selesai Hari Ini</h2>
    <div class="mb-4">
      <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Filter Tanggal</label>
      <input type="date" id="cashier-payment-date" class="input-field w-full" value="${dateVal}" onchange="State.cashierPaymentDate=this.value;render()">
    </div>
    <div class="grid grid-cols-2 gap-3 mb-5">
      <div class="stat-card text-center"><div class="text-2xl font-bold" style="color:var(--success)">${totalSelesai}</div><div class="text-[10px]" style="color:var(--muted)">Pesanan Selesai</div></div>
      <div class="stat-card text-center"><div class="text-2xl font-bold" style="color:var(--accent)">${formatCurrency(totalRevenue)}</div><div class="text-[10px]" style="color:var(--muted)">Total Pendapatan</div></div>
    </div>
    <div class="space-y-3">
      ${completedToday.length === 0 ? '<p class="text-sm text-center py-8" style="color:var(--muted)">Belum ada pesanan selesai hari ini</p>' : ''}
      ${completedToday.map(o => {
        const oTime = o.created_at ? new Date(o.created_at).toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'}) : '-';
        const statusBadge = o.status === "completed" ? '<span class="badge badge-completed">Selesai</span>' : o.status === "rejected" ? '<span class="badge badge-danger">Ditolak</span>' : '<span class="badge badge-danger">Dibatalkan</span>';
        const staffInfo = (o.waiter_id && getUser(o.waiter_id) ? ' <span style="font-size:10px;color:var(--accent)"><i class="fas fa-user-tie"></i> ' + getUser(o.waiter_id).name + '</span>' : '') + (o.courier_id && getUser(o.courier_id) ? ' <span style="font-size:10px;color:var(--accent)"><i class="fas fa-motorcycle"></i> ' + getUser(o.courier_id).name + '</span>' : '');
        return `
      <div class="order-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="${o.order_type === 'delivery' ? `showCashierActiveOrderDetail('${o.id}')` : `showCashierOrderDetail('${o.id}')`}">
        <div class="flex justify-between items-start mb-2">
          <span class="font-bold text-sm">#${o.id.slice(-5).toUpperCase()}</span>
          <span class="text-xs" style="color:var(--muted)">${oTime}</span>
        </div>
        <div class="text-xs mb-2" style="color:var(--muted)">
          <i class="fas ${o.order_type === "dine-in" ? "fa-chair" : "fa-motorcycle"} mr-1"></i>${getOrderTypeName(o.order_type)}${o.customer_name ? " — " + o.customer_name : ""}${o.user_id && o.user_id !== 'walk-in' && getUser(o.user_id) ? ' (' + getUser(o.user_id).email + ')' : ''}${staffInfo}
        </div>
        <div class="flex justify-between items-center pt-2" style="border-top:1px solid var(--border)">
          ${statusBadge}
          <span class="font-bold text-sm" style="color:${o.status === "rejected" || o.status === "cancelled" ? "var(--danger)" : "var(--success)"}">${formatCurrency(typeof effectiveAmount === 'function' ? effectiveAmount(o) : o.total_amount)}</span>
        </div>
      </div>`;
      }).join('')}
    </div>
  </div>`;
}

function payMitraPayout(payoutId) {
  const p = DB.mitraPayouts.find(x => x.id === payoutId);
  if (!p || p.status !== 'unpaid') return;
  p.status = 'paid';
  p.paid_at = new Date().toISOString();
  p.paid_by = State.currentUser.id;
  DB.expenses.push({
    id: 'e' + Date.now(),
    date: new Date().toLocaleDateString('sv-SE'),
    time: new Date().toTimeString().slice(0, 5),
    category: 'Mitra',
    amount: p.amount,
    note: 'Pembayaran mitra #' + p.order_id.slice(-5).toUpperCase() + ' — ' + p.mitra_name,
    source: 'Cafe',
    orderType: 'mitra_payout',
    paymentMethod: 'cash',
  });
  addNotification({
    title: 'Pembayaran Mitra',
    message: formatCurrency(p.amount) + ' telah dibayarkan ke ' + p.mitra_name + ' — #' + p.order_id.slice(-5).toUpperCase(),
    type: 'payment',
    icon: 'fa-hat-chef',
    targetRoles: ['admin', 'manager'],
    relatedOrderId: p.order_id,
  });
  showToast('Pembayaran ' + formatCurrency(p.amount) + ' ke ' + p.mitra_name + ' berhasil', 'success');
  render();
}
