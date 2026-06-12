// ============================================================
// KITCHEN VIEW — Status Updates
// ============================================================
async function updateItemStatus(orderId, menuItemId, newStatus) {
  try {
    var ordersData = await API.getOrders();
    var o = ordersData.find(function(x) { return x.id === orderId; });
    if (!o) { showToast("Pesanan tidak ditemukan", "error"); return; }
    var item = o.items.find(function(i) { return i.menu_item_id === menuItemId; });
    if (!item) { showToast("Item tidak ditemukan di pesanan", "error"); return; }

    var updatedItems = o.items.map(function(i) {
      if (i.menu_item_id === menuItemId) {
        i.status = newStatus;
        if (State.currentUser?.role === 'mitra_juru_masak') {
          i.claimed_by = State.currentUser.name;
        }
      }
      return i;
    });

    var activeItems = updatedItems.filter(function(i) { return i.status !== "rejected"; });
    var newOrderStatus = o.status;
    if (activeItems.length > 0 && activeItems.every(function(i) { return i.status === "ready"; })) {
      newOrderStatus = "ready";
    } else if (activeItems.some(function(i) { return i.status === "cooking"; })) {
      newOrderStatus = "cooking";
    }

    await API.updateOrder(orderId, {
      items: updatedItems,
      status: newOrderStatus
    });

    if (newOrderStatus === "ready" && newOrderStatus !== o.status) {
      notifyStatusChange({ id: orderId, items: updatedItems, order_type: o.order_type, table_id: o.table_id, total_amount: o.total_amount }, 'ready');
    }
    showToast("Status diupdate: " + getStatusLabel(newStatus), "success");
    render();
  } catch (e) {
    console.error(e);
    showToast("Gagal mengupdate status", "error");
  }
}

async function updateOrderStatus(id, status) {
  try {
    var ordersData = await API.getOrders();
    var o = ordersData.find(function(x) { return x.id === id; });
    if (!o) { showToast("Pesanan tidak ditemukan", "error"); return; }

    var updateData = { status: status };
    if (status === "cooking") {
      var updatedItems = o.items.map(function(i) {
        if (i.status === "pending") i.status = "cooking";
        return i;
      });
      updateData.items = updatedItems;
    }

    await API.updateOrder(id, updateData);
    showToast(
      "Pesanan #" + o.id.slice(-5).toUpperCase() + " → " + getStatusLabel(status),
      "success",
    );
    render();
  } catch (e) {
    console.error(e);
    showToast("Gagal mengupdate status pesanan", "error");
  }
}
