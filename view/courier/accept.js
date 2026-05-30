// ============================================================
// COURIER VIEW — Confirm Reject & Accept Delivery
// ============================================================
function confirmRejectCourierOrder(orderId) {
  const reasonEl = document.getElementById("courier-reject-reason");
  let reason = reasonEl ? reasonEl.value : "";
  if (reason === "Lainnya") {
    const otherEl = document.getElementById("courier-reject-other");
    reason = otherEl ? otherEl.value.trim() : "";
  }
  if (!reason) {
    showToast("Silakan pilih atau isi alasan penolakan", "warning");
    return;
  }
  const o = DB.orders.find((x) => x.id === orderId);
  if (!o) { closeModal(); return; }
  if (o.courier_id !== State.currentUser.id && o.courier_id !== null) {
    showToast("Pesanan sudah diambil kurir lain", "warning");
    closeModal();
    return;
  }
  o.courier_id = null;
  o.status = "rejected";
  o.reject_reason = "Ditolak Kurir: " + reason;
  notifyRejected(o, o.reject_reason);
  showToast("Pesanan ditolak", "info");
  closeModal();
  render();
}

function acceptDelivery(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  o.courier_id = State.currentUser.id;
  o.status = "delivering";
  DB.courierTracking.push({
    id: "ct" + Date.now(),
    order_id: o.id,
    courier_id: State.currentUser.id,
    latitude: -6.9175,
    longitude: 107.6191,
    recorded_at: new Date().toISOString(),
  });
  notifyDeliveryTaken(o, State.currentUser.name);
  addNotification({
    title: 'Pesanan Diambil',
    message: '#' + o.id.slice(-5).toUpperCase() + ' — mulai pengantaran',
    type: 'delivery',
    icon: 'fa-motorcycle',
    targetRoles: ['courier'],
    relatedOrderId: o.id
  });
  showToast("Pesanan diambil — mulai pengantaran", "success");
  State.currentTab.courier = "active";
  render();
}
