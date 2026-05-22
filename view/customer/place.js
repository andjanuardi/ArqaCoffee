// ============================================================
// CUSTOMER VIEW — Place Order
// ============================================================
function confirmPlaceOrder() {
  const total = State.cart.reduce((s, c) => s + c.unit_price * c.quantity, 0);
  const discount = calcPromoDiscount();
  const afterDiscount = total - discount;
  const tax = Math.round(afterDiscount * 0.1);
  const grandTotal = Math.round(afterDiscount * 1.1);
  const itemsList = State.cart.map(c =>
    `${c.menu_item.name} x${c.quantity} = ${formatCurrency(c.unit_price * c.quantity)}`
  ).join('</div><div class="text-sm" style="color:var(--muted)">');
  const activePromo = State.activePromoId ? DB.promos.find(x => x.id === State.activePromoId) : null;

  showModal(`
    <div>
      <div class="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl" style="background:rgba(224,122,58,.1);color:var(--accent)">
        <i class="fas fa-receipt"></i>
      </div>
      <h3 class="font-display text-lg font-bold mb-1 text-center">Konfirmasi Pesanan</h3>
      <p class="text-xs text-center mb-4" style="color:var(--muted)">Pastikan pesanan Anda sudah benar</p>

      <div class="p-3 rounded-xl mb-4" style="background:var(--bg2)">
        <div class="text-xs font-semibold mb-2" style="color:var(--muted)">Rincian Pesanan</div>
        <div>${itemsList}</div>
        <div class="border-t pt-2 mt-2" style="border-color:var(--border)">
          <div class="flex justify-between text-sm"><span style="color:var(--muted)">Subtotal</span><span>${formatCurrency(total)}</span></div>
          ${discount > 0 ? `<div class="flex justify-between text-sm"><span style="color:var(--success)"><i class="fas fa-tag mr-1"></i>Diskon ${activePromo ? activePromo.title : ''}</span><span style="color:var(--success)">-${formatCurrency(discount)}</span></div>` : ''}
          <div class="flex justify-between text-sm"><span style="color:var(--muted)">Pajak (10%)</span><span>${formatCurrency(tax)}</span></div>
          <div class="flex justify-between font-bold mt-1"><span>Total</span><span style="color:var(--accent)">${formatCurrency(grandTotal)}</span></div>
        </div>
      </div>

      <div class="text-xs mb-4" style="color:var(--muted)">
        <i class="fas ${State.orderType === "dine-in" ? "fa-chair" : "fa-motorcycle"} mr-1"></i>
        ${State.orderType === "dine-in" ? "Makan di tempat" + (State.selectedTable ? " — Meja " + (getTable(State.selectedTable)?.number || "-") : "") : "Pesan Antar"}
        ${State.payTiming === "later" ? ' — <span style="color:var(--warning)">Bayar Nanti</span>' : ""}
      </div>

      <div class="flex gap-3">
        <button onclick="closeModal()" class="btn-secondary flex-1">Kembali</button>
        <button onclick="closeModal();placeOrder()" class="btn-primary flex-1">Pesan Sekarang</button>
      </div>
    </div>
  `);
}

function placeOrder() {
  if (State.cart.length === 0) {
    showToast("Keranjang masih kosong", "warning");
    return;
  }
  if (State.orderType === "dine-in" && !State.selectedTable) {
    showToast("Silakan pilih meja terlebih dahulu", "warning");
    startQRScan();
    return;
  }
  if (State.orderType === "delivery") {
    const address =
      document.getElementById("delivery-address")?.value ||
      State.deliveryAddress;
    if (!address || address.trim() === "") {
      showToast("Silakan masukkan alamat pengiriman", "warning");
      return;
    }
  }
  const total = State.cart.reduce((s, c) => s + c.unit_price * c.quantity, 0);
  const discount = calcPromoDiscount();
  const afterDiscount = total - discount;
  const grandTotal = Math.round(afterDiscount * 1.1);

  if (State.orderType === "dine-in" && State.payTiming === "later") {
    const existingOrder = DB.orders.find(
      (o) =>
        o.user_id === State.currentUser.id &&
        o.order_type === "dine-in" &&
        o.table_id === State.selectedTable &&
        o.payment_status === "unpaid" &&
        o.status !== "completed" &&
        o.status !== "cancelled",
    );

    if (existingOrder) {
      existingOrder.items.push(
        ...State.cart.map((c) => ({
          menu_item_id: c.menu_item_id,
          quantity: c.quantity,
          unit_price: c.unit_price,
          notes: c.notes,
          status: "pending",
        })),
      );
      existingOrder.total_amount += grandTotal;

      if (
        existingOrder.status === "served" ||
        existingOrder.status === "ready"
      ) {
        existingOrder.status = "pending"; // kembalikan ke pending agar dapur tahu ada item baru
      }

      State.cart = [];
      notifyOrderPlaced(existingOrder, State.currentUser.name);
      showToast(
        `Pesanan digabungkan ke #${existingOrder.id.slice(-5).toUpperCase()}`,
        "success",
      );
      switchTab("orders");
      return;
    }
  }
  const order = {
    id: genId(),
    user_id: State.currentUser.id,
    table_id: State.selectedTable,
    order_type: State.orderType,
    status: "pending",
    total_amount: grandTotal,
    payment_method: State.payTiming === "later" ? (State.orderType === "delivery" ? "cod" : "") : selectedPayment,
    payment_status:
      State.payTiming === "later"
        ? "unpaid"
        : isDigitalSelected()
          ? "paid"
          : "unpaid",
    delivery_address:
      State.orderType === "delivery"
        ? document.getElementById("delivery-address")?.value ||
          State.deliveryAddress ||
          ""
        : "",
    delivery_detail:
      State.orderType === "delivery"
        ? document.getElementById("delivery-detail")?.value ||
          State.deliveryDetail ||
          ""
        : "",
    delivery_location:
      State.orderType === "delivery" && State.deliveryLocation
        ? State.deliveryLocation
        : null,
    promo_id: State.activePromoId || null,
    promo_discount: discount || 0,
    created_at: new Date().toISOString(),
    items: State.cart.map((c) => ({
      menu_item_id: c.menu_item_id,
      quantity: c.quantity,
      unit_price: c.unit_price,
      notes: c.notes,
      status: "pending",
    })),
  };
  if (State.orderType === "delivery") order.courier_id = null;
  DB.orders.unshift(order);
  State.cart = [];
  State.activePromoId = null;
  State.deliveryLocation = null;
  State.deliveryAddress = "";
  State.deliveryDetail = "";
  notifyOrderPlaced(order, State.currentUser.name);
  showToast(
    `Pesanan #${order.id.slice(-5).toUpperCase()} berhasil dibuat!`,
    "success",
  );
  switchTab("orders");
}
