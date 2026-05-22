// ============================================================
// KITCHEN VIEW — Status Updates
// ============================================================
function updateItemStatus(orderId, menuItemId, newStatus) {
  const o = DB.orders.find((x) => x.id === orderId);
  if (!o) return;
  const item = o.items.find((i) => i.menu_item_id === menuItemId);
  if (item) item.status = newStatus;
  if (newStatus === "cooking" && DB.menuStockMapping && DB.menuStockMapping[menuItemId]) {
    const orderQty = item ? item.quantity : 1;
    DB.menuStockMapping[menuItemId].forEach((r) => {
      const stockId = typeof r === 'string' ? r : r.id;
      const recipeQty = typeof r === 'string' ? 1 : (r.qty || 1);
      const s = DB.stockItems.find((x) => x.id === stockId);
      if (s) {
        const reduceAmt = recipeQty * orderQty;
        s.current_quantity = Math.max(0, s.current_quantity - reduceAmt);
        DB.stockMovements.push({
          id: "sm" + Date.now() + "_" + stockId,
          stock_item_id: stockId,
          user_id: State.currentUser.id,
          type: "out",
          quantity: reduceAmt,
          notes: "Pemakaian dapur: " + getMenuItem(menuItemId)?.name,
          created_at: new Date().toISOString(),
        });
        if (s.current_quantity <= s.min_quantity) notifyLowStock(s);
      }
    });
    autoUpdateMenuAvailability();
  }
  if (o.items.every((i) => i.status === "ready")) {
    o.status = "ready";
    notifyStatusChange(o, 'ready');
  } else if (o.items.some((i) => i.status === "cooking")) {
    o.status = "cooking";
  }
  showToast(`Status diupdate: ${getStatusLabel(newStatus)}`, "success");
  render();
}

function updateOrderStatus(id, status) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  o.status = status;
  if (status === "cooking")
    o.items.forEach((i) => {
      if (i.status === "pending") i.status = "cooking";
    });
  showToast(
    `Pesanan #${o.id.slice(-5).toUpperCase()} → ${getStatusLabel(status)}`,
    "success",
  );
  render();
}
