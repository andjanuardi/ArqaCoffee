// ============================================================
// CASHIER VIEW — Cancel & Edit Order
// ============================================================
function cancelCashierOrder(id) {
  showModal(`
    <div class="text-center">
      <div class="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl" style="background:rgba(231,76,60,.1);color:var(--danger)">
        <i class="fas fa-exclamation-triangle"></i>
      </div>
      <h3 class="font-display text-lg font-bold mb-2">Batalkan Pesanan?</h3>
      <p class="text-sm mb-4" style="color:var(--muted)">Apakah Anda yakin ingin membatalkan pesanan ini secara permanen?</p>
      
      <div class="flex gap-3">
        <button onclick="closeModal()" class="btn-secondary flex-1">Tidak</button>
        <button onclick="confirmCancelCashierOrder('${id}')" class="btn-primary flex-1" style="background:var(--danger);border-color:var(--danger);">Ya, Batalkan</button>
      </div>
    </div>
  `);
}

function confirmCancelCashierOrder(id) {
  const idx = DB.orders.findIndex((x) => x.id === id);
  if (idx === -1) {
    closeModal();
    return;
  }
  const o = DB.orders[idx];

  if (o.status !== "pending") {
    showToast(
      "Pesanan tidak dapat dibatalkan karena sudah diproses",
      "warning",
    );
    closeModal();
    return;
  }

  if (o.order_type === "dine-in" && o.table_id) {
    const hasOtherOrders = DB.orders.some(
      (x) =>
        x.id !== id &&
        x.table_id === o.table_id &&
        x.status !== "completed" &&
        x.status !== "cancelled",
    );
    if (!hasOtherOrders) {
      const t = getTable(o.table_id);
      if (t) t.status = "available";
    }
  }

  DB.orders.splice(idx, 1);
  showToast("Pesanan berhasil dibatalkan", "success");
  closeModal();
  render();
}

function editCashierOrder(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  if (o.status !== "pending") {
    showToast("Pesanan yang sudah diproses tidak bisa diedit", "warning");
    return;
  }

  State.cashierCart = o.items.map((i) => {
    const m = getMenuItem(i.menu_item_id);
    return {
      menu_item_id: i.menu_item_id,
      quantity: i.quantity,
      unit_price: i.unit_price,
      notes: i.notes || "",
      menu_item: m,
    };
  });

  State.editingOrderId = id;
  State.currentTab.cashier = "create";
  render();
}
