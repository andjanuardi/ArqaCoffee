// ============================================================
// KITCHEN VIEW — Status Updates
// ============================================================
function updateItemStatus(orderId, menuItemId, newStatus) {
  const o = DB.orders.find((x) => x.id === orderId);
  if (!o) return;
  const item = o.items.find((i) => i.menu_item_id === menuItemId);
  if (item) {
    item.status = newStatus;
    if (State.currentUser?.role === 'mitra_juru_masak') {
      item.claimed_by = State.currentUser.name;
    }
  }

  const activeItems = o.items.filter((i) => i.status !== "rejected");
  if (activeItems.length > 0 && activeItems.every((i) => i.status === "ready")) {
    o.status = "ready";
    notifyStatusChange(o, 'ready');
  } else if (activeItems.some((i) => i.status === "cooking")) {
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
