// ============================================================
// CASHIER VIEW — Finalize Order
// ============================================================
function submitCashierOrder() {
  if (!State.cashierCart || State.cashierCart.length === 0) return;

  let editingOrder = null;
  if (State.editingOrderId) {
    editingOrder = DB.orders.find((o) => o.id === State.editingOrderId);
  }

  showModal(`
    <div class="text-left">
      <h3 class="font-display text-lg font-bold mb-4 text-center">${editingOrder ? "Perbarui Pesanan" : "Selesaikan Pesanan"}</h3>
      <div class="mb-3">
        <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Nama Pelanggan (Opsional)</label>
        <input type="text" id="manual-customer-info" class="input-field w-full text-sm" placeholder="Contoh: Budi" value="${editingOrder ? editingOrder.customer_name || "" : ""}">
      </div>
      <div class="mb-3">
        <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Tipe Pesanan</label>
        <select id="manual-order-type" class="input-field w-full text-sm" onchange="document.getElementById('manual-table-container').style.display = this.value === 'dine-in' ? 'block' : 'none'">
          <option value="dine-in" ${editingOrder && editingOrder.order_type === "dine-in" ? "selected" : ""}>Makan di Tempat (Dine-in)</option>
          <option value="takeaway" ${editingOrder && editingOrder.order_type === "takeaway" ? "selected" : ""}>Bawa Pulang (Takeaway)</option>
        </select>
      </div>
      <div class="mb-4" id="manual-table-container" style="${editingOrder && editingOrder.order_type === "takeaway" ? "display:none;" : ""}">
        <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Pilih Meja</label>
        <select id="manual-table-id" class="input-field w-full text-sm">
          <option value="">-- Tanpa Meja / Pilih Nanti --</option>
          ${DB.tables.map((t) => {
            const isSelected = editingOrder && editingOrder.table_id === t.id;
            const isOccupied = t.status === "occupied" && !isSelected;
            return `<option value="${t.id}" ${isSelected ? "selected" : ""} ${isOccupied ? "disabled" : ""}>Meja ${t.number} (${t.capacity} orang) ${isOccupied ? "(Terisi)" : ""}</option>`;
          }).join("")}
        </select>
      </div>
      <div class="mb-6">
        <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Status Pembayaran</label>
        <select id="manual-payment-status" class="input-field w-full text-sm">
          <option value="paid" ${editingOrder && editingOrder.payment_status === "paid" ? "selected" : ""}>Sudah Lunas</option>
          <option value="unpaid" ${editingOrder && editingOrder.payment_status === "unpaid" ? "selected" : ""}>Belum Bayar</option>
        </select>
      </div>
      <div class="flex gap-3">
        <button onclick="closeModal();State.editingOrderId=null;" class="btn-secondary flex-1">Batal</button>
        <button onclick="finalizeManualOrder()" class="btn-primary flex-1">${editingOrder ? "Simpan Perubahan" : "Buat Pesanan"}</button>
      </div>
    </div>
  `);
}

function finalizeManualOrder() {
  const info =
    document.getElementById("manual-customer-info")?.value ||
    "Pelanggan Offline";
  const type = document.getElementById("manual-order-type")?.value || "dine-in";
  const payStatus =
    document.getElementById("manual-payment-status")?.value || "paid";
  const tableId = document.getElementById("manual-table-id")?.value || null;

  const total = State.cashierCart.reduce(
    (s, c) => s + c.unit_price * c.quantity,
    0,
  );
  const grandTotal = total + Math.round(calcItemTax(State.cashierCart));

  if (type === "dine-in" && tableId) {
    const t = getTable(tableId);
    if (t) t.status = "occupied";
  }

  if (State.editingOrderId) {
    const idx = DB.orders.findIndex((x) => x.id === State.editingOrderId);
    if (idx !== -1) {
      const o = DB.orders[idx];
      if (o.table_id && o.table_id !== tableId) {
        const oldT = getTable(o.table_id);
        const hasOtherOrders = DB.orders.some(
          (x) =>
            x.id !== o.id &&
            x.table_id === o.table_id &&
            x.status !== "completed" &&
            x.status !== "cancelled",
        );
        if (oldT && !hasOtherOrders) oldT.status = "available";
      }
      o.customer_name = info;
      o.table_id = type === "dine-in" ? tableId : null;
      o.order_type = type;
      o.total_amount = grandTotal;
      o.payment_method = payStatus === "paid" ? "cash" : "";
      o.payment_status = payStatus;
      o.items = State.cashierCart.map((c) => ({
        menu_item_id: c.menu_item_id,
        quantity: c.quantity,
        unit_price: c.unit_price,
        notes: c.notes || "",
        status: "pending",
      }));
      showToast("Pesanan berhasil diperbarui!", "success");
    }
    State.editingOrderId = null;
  } else {
    const order = {
      id: genId(),
      user_id: "walk-in",
      customer_name: info,
      table_id: type === "dine-in" ? tableId : null,
      order_type: type,
      status: "pending",
      accepted: true,
      total_amount: grandTotal,
      payment_method: payStatus === "paid" ? "cash" : "",
      payment_status: payStatus,
      created_at: new Date().toISOString(),
      items: State.cashierCart.map((c) => ({
        menu_item_id: c.menu_item_id,
        quantity: c.quantity,
        unit_price: c.unit_price,
        notes: c.notes || "",
        status: "pending",
      })),
    };
    DB.orders.unshift(order);
    notifyOrderPlaced(order, info);
    showToast("Pesanan manual berhasil dibuat!", "success");
  }

  State.cashierCart = [];
  State.currentTab.cashier = "orders";
  closeModal();
  render();
}

function filterCashierMenu(q) {
  State.cashierSearchQuery = q;
  const lowerQ = q.toLowerCase();
  document.querySelectorAll(".cashier-menu-item").forEach((el) => {
    const name = el.getAttribute("data-name").toLowerCase();
    if (name.includes(lowerQ)) el.style.display = "";
    else el.style.display = "none";
  });
}
