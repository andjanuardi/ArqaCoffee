// ============================================================
// CASHIER VIEW — Orders & Payment
// ============================================================
function showPaymentModal(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  const t = o.table_id ? getTable(o.table_id) : null;
  const paySubtotal = o.items.reduce((s, i) => s + i.unit_price * i.quantity, 0);
  const dineInFee = o.order_type === 'dine-in'
    ? (() => {
        const cfg = DB.cafe?.rates?.customer?.service_fee;
        if (!cfg || !cfg.value) return 0;
        return cfg.type === 'percent' ? Math.round(paySubtotal * cfg.value / 100) : cfg.value;
      })()
    : 0;
  showModal(`
    <div>
      <div class="flex justify-between items-start mb-4">
        <div><h3 class="font-display text-lg font-bold">Pembayaran</h3><p class="text-xs" style="color:var(--muted)">#${o.id.slice(-5).toUpperCase()} — ${getOrderTypeName(o.order_type)}${t ? " — Meja " + t.number : ""}${o.customer_name ? " — " + o.customer_name : ""}${o.user_id && o.user_id !== 'walk-in' && getUser(o.user_id) ? ' (' + getUser(o.user_id).email + ')' : ''}</p></div>
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
        <div class="card text-center py-4 cursor-pointer" onclick="closeModal();processQRISPayment('${o.id}')" style="border-color:var(--accent)">
          <i class="fas fa-qrcode text-xl mb-2" style="color:var(--accent)"></i>
          <div class="text-sm font-semibold">QRIS</div>
        </div>
        <div class="card text-center py-4 cursor-pointer" onclick="closeModal();processTransferPayment('${o.id}')">
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
    ["pending", "cooking", "ready", "delivering", "delivered"].includes(o.status),
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
          const tax = Math.round(calcItemTax(o.items));
          const itemTotal = o.items.reduce((s, i) => s + i.unit_price * i.quantity, 0);
          const dineInFee = o.order_type === 'dine-in'
            ? (() => {
                const cfg = DB.cafe?.rates?.customer?.service_fee;
                if (!cfg || !cfg.value) return 0;
                return cfg.type === 'percent' ? Math.round(itemTotal * cfg.value / 100) : cfg.value;
              })()
            : 0;
          const displayServiceFee = dineInFee || o.service_fee || 0;
          return `
        <div class="order-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="showCashierActiveOrderDetail('${o.id}')">
          <div class="flex justify-between items-start mb-2">
            <div>
              <span class="font-bold text-sm">#${o.id.slice(-5).toUpperCase()}</span>
              <span class="badge ${getStatusBadge(o.status)} ml-2">${getStatusLabel(o.status)}</span>
              <span class="badge ${o.payment_status === "paid" ? "badge-paid" : "badge-unpaid"} ml-1">${o.payment_status === "paid" ? "Lunas" : "Belum Bayar"}</span>
            </div>
            <span class="text-xs" style="color:var(--muted)">${formatTime(o.created_at)}</span>
          </div>
          <div class="text-xs mb-2" style="color:var(--muted)">
            <i class="fas ${o.order_type === "dine-in" ? "fa-chair" : "fa-motorcycle"} mr-1"></i>${getOrderTypeName(o.order_type)}${t && o.order_type !== "delivery" ? " — Meja " + t.number : ""}${o.customer_name ? " — " + o.customer_name : ""}${o.user_id && o.user_id !== 'walk-in' && getUser(o.user_id) ? ' (' + getUser(o.user_id).email + ')' : ''}${o.waiter_id && getUser(o.waiter_id) ? ' <span style="color:var(--accent);font-size:10px"><i class="fas fa-user-tie"></i> ' + getUser(o.waiter_id).name + '</span>' : ''}${o.courier_id && getUser(o.courier_id) ? ' <span style="color:var(--accent);font-size:10px"><i class="fas fa-motorcycle"></i> ' + getUser(o.courier_id).name + '</span>' : ''}
          </div>
          <div class="text-xs mb-3">${(() => {
            const names = o.items.map(i => { const mi = getMenuItem(i.menu_item_id); return mi ? mi.name + " x" + i.quantity : ""; }).filter(Boolean);
            return names.length <= 3 ? names.join(", ") : names.slice(0, 3).join(", ") + ' <span style="color:var(--muted)">+' + (names.length - 3) + ' lainnya</span>';
          })()}</div>
          ${o.promo_discount ? `<div class="text-[10px] mb-1 flex items-center gap-1" style="color:var(--success)"><i class="fas fa-tag"></i>Diskon promo: <b>-${formatCurrency(o.promo_discount)}</b></div>` : ""}
          ${o.shipping_cost && o.shipping_cost > 0 ? `<div class="text-[10px] mb-1 flex items-center gap-1" style="color:var(--accent)"><i class="fas fa-truck"></i>Ongkos Kirim: <b>${formatCurrency(o.shipping_cost)}</b></div>` : ""}
          ${displayServiceFee > 0 ? `<div class="text-[10px] mb-1 flex items-center gap-1" style="color:#e07a3a"><i class="fas fa-hand-holding-usd"></i>Biaya Layanan: <b>${formatCurrency(displayServiceFee)}</b></div>` : ""}
          ${tax > 0 ? `<div class="text-[10px] mb-1 flex items-center gap-1" style="color:var(--accent)"><i class="fas fa-receipt"></i>Pajak: <b>${formatCurrency(tax)}</b></div>` : ""}
          <div class="flex justify-between items-center">
            <span class="font-bold" style="color:var(--accent)">${formatCurrency(o.total_amount)}</span>
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
              ${o.status === "ready" && o.payment_status === "unpaid" ? `<button onclick="event.stopPropagation();showPaymentModal('${o.id}')" class="btn-primary btn-sm">Bayar</button>` : ""}
              ${o.status === "ready" && o.payment_status === "paid" && o.order_type !== "delivery" ? `<button onclick="event.stopPropagation();updateOrderStatus('${o.id}','completed')" class="btn-primary btn-sm" style="background:linear-gradient(135deg,var(--success),#1e8449)">Selesai</button>` : ""}
              ${o.status === "delivered" && o.payment_status === "unpaid" && o.order_type === "delivery" ? `<button onclick="event.stopPropagation();settleDelivery('${o.id}')" class="btn-primary btn-sm" style="background:linear-gradient(135deg,#3498db,#2980b9)"><i class="fas fa-hand-holding-dollar mr-1"></i>Terima Setoran</button>` : ""}
              ${o.status === "delivered" && o.payment_status === "unpaid" && o.order_type === "dine-in" ? `<button onclick="event.stopPropagation();cashierSettleDineIn('${o.id}')" class="btn-primary btn-sm" style="background:linear-gradient(135deg,#27ae60,#1e8449)"><i class="fas fa-hand-holding-dollar mr-1"></i>Terima Setoran Waiter</button>` : ""}
            </div>
          </div>
        </div>`;
        })
        .join("")}
    </div>
    <h3 class="font-semibold text-sm mb-3 mt-6">Ongkir Kurir</h3>
    <div class="space-y-3 mb-6">
      ${(() => {
        const ongkirOrders = DB.orders.filter(o =>
          o.ongkir_status !== "confirmed" && o.courier_id && o.shipping_cost > 0 && o.status === "completed" && o.payment_method !== "cod"
        );
        if (ongkirOrders.length === 0) return '<p class="text-sm text-center py-4" style="color:var(--muted)">Tidak ada ongkir yang perlu dibayar</p>';
        return ongkirOrders.map(o => {
          const kurir = getUser(o.courier_id);
          const netOngkir = o.shipping_cost - calcCourierFee(o.shipping_cost);
          const jasaAplikasi = calcCourierFee(o.shipping_cost);
          return `
        <div class="order-card cursor-pointer hover:scale-[1.02] transition-transform" onclick="showOngkirPaymentModal('${o.id}')">
          <div class="flex justify-between items-start mb-2">
            <div>
              <span class="font-bold text-sm">#${o.id.slice(-5).toUpperCase()}</span>
              <span class="badge badge-completed ml-1" style="font-size:9px">Selesai</span>
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
            <span class="font-bold" style="color:var(--success)">${formatCurrency(o.total_amount - netOngkir + jasaAplikasi)}</span>
            <div>
              ${o.ongkir_status === "paid"
                ? `<span class="text-xs font-medium px-3 py-1.5 rounded" style="background:rgba(52,152,219,.15);color:#3498db"><i class="fas fa-clock mr-1"></i>Menunggu Konfirmasi Kurir</span>`
                : `<button onclick="event.stopPropagation();payOngkir('${o.id}')" class="btn-primary btn-sm"><i class="fas fa-hand-holding-dollar mr-1"></i>Bayar Ongkir</button>`}
            </div>
          </div>
        </div>`;
        }).join('');
      })()}
    </div>
    <h3 class="font-semibold text-sm mb-3">Selesai Hari Ini</h3>
    <div class="space-y-2">
      ${completed
        .map(
          (o) => `
      <div class="card flex justify-between items-center py-3 cursor-pointer hover:scale-[1.02] transition-transform" onclick="showCashierOrderDetail('${o.id}')">
        <div class="text-sm">
          <span class="font-bold">#${o.id.slice(-5).toUpperCase()}</span> 
          <span style="color:${o.status === "rejected" || o.status === "cancelled" ? "var(--danger)" : "var(--muted)"}">— ${getOrderTypeName(o.order_type)}${o.customer_name ? " — " + o.customer_name : ""}${o.user_id && o.user_id !== 'walk-in' && getUser(o.user_id) ? ' (' + getUser(o.user_id).email + ')' : ''}${o.waiter_id && getUser(o.waiter_id) ? ' <span style="font-size:10px;color:var(--accent)"><i class="fas fa-user-tie"></i> ' + getUser(o.waiter_id).name + '</span>' : ''}${o.courier_id && getUser(o.courier_id) ? ' <span style="font-size:10px;color:var(--accent)"><i class="fas fa-motorcycle"></i> ' + getUser(o.courier_id).name + '</span>' : ''}</span>
          ${o.status === "rejected" ? '<span class="badge badge-danger ml-2">Ditolak</span>' : ""}${o.status === "cancelled" ? '<span class="badge badge-danger ml-2">Dibatalkan</span>' : ""}
        </div>
        <span class="font-semibold text-sm" style="color:${o.status === "rejected" || o.status === "cancelled" ? "var(--danger)" : "var(--success)"}">${formatCurrency(o.total_amount)}</span>
      </div>`,
        )
        .join("")}
    </div>
  </div>`;
}

function showOngkirPaymentModal(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  const kurir = getUser(o.courier_id);
  const netOngkir = o.shipping_cost - calcCourierFee(o.shipping_cost);
  const statusOngkir = o.ongkir_status === "unpaid" ? "Belum Diambil" : o.ongkir_status === "paid" ? "Siap Diambil" : "Sudah Diterima";
  const statusColor = o.ongkir_status === "confirmed" ? "var(--success)" : o.ongkir_status === "paid" ? "#3498db" : "#f1c40f";
  const statusBg = o.ongkir_status === "confirmed" ? "rgba(46,204,113,.15)" : o.ongkir_status === "paid" ? "rgba(52,152,219,.15)" : "rgba(241,196,15,.15)";
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
        <div><span>Status</span><span>${o.ongkir_status === "paid" ? "Dibayar" : "Belum Dibayar"}</span></div>
      </div>
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
  const paidLabel = o.payment_status === "paid" ? "Lunas" : "Belum Bayar";
  let paymentMethodLabel = "Tunai";
  if (o.payment_method === "digital") paymentMethodLabel = "Digital";
  else if (o.payment_method === "cod") paymentMethodLabel = "COD";
  else if (o.payment_method === "qris") paymentMethodLabel = "QRIS";
  const subtotal = o.items.reduce(
    (sum, i) => sum + i.unit_price * i.quantity,
    0,
  );
  const tax = Math.round(calcItemTax(o.items));
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
        ${o.shipping_cost && o.shipping_cost > 0 ? `<div><span>Ongkos Kirim</span><span>${formatCurrency(o.shipping_cost)}</span></div>` : ""}
        ${o.service_fee && o.service_fee > 0 ? `<div style="color:#e07a3a"><span>Biaya Layanan</span><span>${formatCurrency(o.service_fee)}</span></div>` : ""}
        <div><span>Pajak</span><span>${formatCurrency(Math.round(tax))}</span></div>
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

function showCashierActiveOrderDetail(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  const t = o.table_id ? getTable(o.table_id) : null;
  const tax = Math.round(calcItemTax(o.items));
  const subtotal = o.items.reduce((s, i) => s + i.unit_price * i.quantity, 0);
  const dineInFee = o.order_type === 'dine-in'
    ? (() => {
        const cfg = DB.cafe?.rates?.customer?.service_fee;
        if (!cfg || !cfg.value) return 0;
        return cfg.type === 'percent' ? Math.round(subtotal * cfg.value / 100) : cfg.value;
      })()
    : 0;
  showModal(`
<div>
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
  <div class="p-3 rounded-xl mb-3" style="background:var(--bg2)">
    <div class="flex items-center gap-2 mb-2 text-xs font-semibold" style="color:var(--muted)">
      <i class="fas fa-receipt"></i> Rincian Pesanan
    </div>
    <div class="space-y-1.5">
      ${o.items.map((i) => {
        const mi = getMenuItem(i.menu_item_id);
        return mi ? `
      <div class="flex justify-between text-xs">
        <span>${mi.name} x${i.quantity}${i.notes ? ' <span style="color:var(--muted)">(' + i.notes + ")</span>" : ""}</span>
        <span style="color:var(--muted)">${formatCurrency(i.unit_price * i.quantity)}</span>
      </div>` : "";
      }).join("")}
    </div>
    <div class="border-t my-2" style="border-color:var(--border)"></div>
    <div class="flex justify-between text-xs mb-1" style="color:var(--muted)"><span>Subtotal</span><span>${formatCurrency(subtotal)}</span></div>
    ${o.promo_discount ? `<div class="flex justify-between text-xs mb-1" style="color:var(--success)"><span><i class="fas fa-tag mr-1"></i>Diskon Promo</span><span>-${formatCurrency(o.promo_discount)}</span></div>` : ""}
    ${o.shipping_cost && o.shipping_cost > 0 ? `<div class="flex justify-between text-xs mb-1" style="color:var(--accent)"><span><i class="fas fa-truck mr-1"></i>Ongkos Kirim</span><span>${formatCurrency(o.shipping_cost)}</span></div>` : ""}
    ${dineInFee > 0 ? `<div class="flex justify-between text-xs mb-1" style="color:#e07a3a"><span><i class="fas fa-hand-holding-usd mr-1"></i>Biaya Layanan</span><span>${formatCurrency(dineInFee)}</span></div>` : ""}
    <div class="flex justify-between text-xs mb-1" style="color:var(--accent)"><span><i class="fas fa-receipt mr-1"></i>Pajak</span><span>${formatCurrency(Math.round(tax))}</span></div>
    <div class="border-t my-2" style="border-color:var(--border)"></div>
    <div class="flex justify-between font-bold text-sm"><span>Total</span><span style="color:var(--accent)">${formatCurrency(o.total_amount)}</span></div>
  </div>
  <div class="flex justify-between text-xs mb-4" style="color:var(--muted)">
    <span>Pembayaran</span>
    <span class="badge ${o.payment_status === "paid" ? "badge-paid" : "badge-unpaid"} ml-1">${o.payment_status === "paid" ? "Lunas" : "Belum Bayar"}</span>
  </div>
  <div class="flex flex-wrap gap-2 mt-4">
    ${o.status === "ready" && o.payment_status === "unpaid" ? `<button onclick="closeModal();showPaymentModal('${o.id}')" class="btn-primary flex-1 text-center">Bayar</button>` : ""}
    ${o.status === "ready" && o.payment_status === "paid" && o.order_type !== "delivery" ? `<button onclick="closeModal();updateOrderStatus('${o.id}','completed')" class="btn-primary flex-1 text-center" style="background:linear-gradient(135deg,var(--success),#1e8449)">Selesai</button>` : ""}
    <button onclick="closeModal();printCashierInvoice('${o.id}')" class="btn-secondary flex-1 text-center"><i class="fas fa-print mr-1"></i>Cetak</button>
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
        <span>${mi.name} x${i.quantity} ${i.notes ? '<span style="color:var(--muted)">(' + i.notes + ")</span>" : ""}</span>
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
      (x) => x.id !== o.id && x.table_id === o.table_id && x.status !== "completed" && x.status !== "cancelled",
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
            const oTime = o.created_at ? new Date(o.created_at).toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'}) : '-';
            const oTable = o.table_id ? getTable(o.table_id) : null;
            return `
      <div class="card">
        <div class="flex justify-between items-start mb-3">
          <div><span class="font-bold">#${o.id.slice(-5).toUpperCase()}</span><span class="badge ${getStatusBadge(o.status)} ml-2">${getStatusLabel(o.status)}</span></div>
          <span class="font-bold text-lg" style="color:var(--accent)">${formatCurrency(o.total_amount)}</span>
        </div>
        <div class="flex items-center gap-3 text-[11px] mb-2" style="color:var(--muted)"><span><i class="far fa-clock mr-1"></i>${oTime}</span>${oTable ? `<span><i class="fas fa-chair mr-1"></i>Meja ${oTable.number}</span>` : ''}${o.order_type === 'delivery' ? '<span><i class="fas fa-truck mr-1"></i>Delivery</span>' : ''}${o.customer_name ? '<span><i class="fas fa-user mr-1"></i>' + o.customer_name + '</span>' : ''}${o.user_id && o.user_id !== 'walk-in' && getUser(o.user_id) ? '<span style="font-size:10px;color:var(--accent)">' + getUser(o.user_id).email + '</span>' : ''}${o.waiter_id && getUser(o.waiter_id) ? '<span style="font-size:10px;color:var(--accent)"><i class="fas fa-user-tie"></i> ' + getUser(o.waiter_id).name + '</span>' : ''}${o.courier_id && getUser(o.courier_id) ? '<span style="font-size:10px;color:var(--accent)"><i class="fas fa-motorcycle"></i> ' + getUser(o.courier_id).name + '</span>' : ''}</div>
        <div class="text-xs mb-3" style="color:var(--muted)">${o.items
          .map((i) => {
            const mi = getMenuItem(i.menu_item_id);
            return mi ? mi.name + " x" + i.quantity : "";
          })
          .join(", ")}</div>
        ${o.promo_discount ? `<div class="text-[10px] mb-2 flex items-center gap-1" style="color:var(--success)"><i class="fas fa-tag"></i>Diskon promo: <b>-${formatCurrency(o.promo_discount)}</b></div>` : ""}
        ${o.shipping_cost && o.shipping_cost > 0 ? `<div class="text-[10px] mb-2 flex items-center gap-1" style="color:var(--accent)"><i class="fas fa-truck"></i>Ongkos Kirim: <b>${formatCurrency(o.shipping_cost)}</b></div>` : ""}
        ${o.service_fee && o.service_fee > 0 ? `<div class="text-[10px] mb-2 flex items-center gap-1" style="color:#e07a3a"><i class="fas fa-hand-holding-usd"></i>Biaya Layanan: <b>${formatCurrency(o.service_fee)}</b></div>` : ""}
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
          const time = o.created_at ? new Date(o.created_at).toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'}) : '-';
          const date = o.created_at ? new Date(o.created_at).toLocaleDateString('sv-SE') : '';
          return `
        <div class="card cursor-pointer" onclick="showFinanceOrderDetail('${encodeURIComponent(o.id)}')">
          <div class="flex justify-between items-center">
            <div><span class="font-bold text-sm">#${o.id.slice(-5).toUpperCase()}</span><span class="text-[10px] ml-2" style="color:var(--muted)">${formatDate(date)} ${time}</span><span class="text-[10px] ml-1" style="color:${o.payment_method === 'cash' ? 'var(--success)' : 'var(--accent)'}">(${o.payment_method === 'cash' ? 'Tunai' : 'Digital'})</span>${o.customer_name ? '<span class="text-[10px] ml-1" style="color:var(--muted)">— ' + o.customer_name + '</span>' : ''}${o.user_id && o.user_id !== 'walk-in' && getUser(o.user_id) ? '<span class="text-[10px] ml-1" style="color:var(--accent)">(' + getUser(o.user_id).email + ')</span>' : ''}${o.shipping_cost && o.shipping_cost > 0 ? '<span class="text-[10px] ml-1" style="color:var(--accent)"><i class="fas fa-truck"></i></span>' : ''}</div>
            <span class="font-bold" style="color:var(--success)">${formatCurrency(o.total_amount)}</span>
          </div>
        </div>`;
        }).join('')}
      </div>` : ''}
    </div>
  </div>`;
}
