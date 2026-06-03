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
  const today = new Date().toISOString().split('T')[0];
  const hasCheckedIn = DB.attendances.some(a => a.user_id === State.currentUser.id && !a.check_out && new Date(a.check_in).toISOString().split('T')[0] === today);
  if (!hasCheckedIn) { showToast("Belum check-in hari ini. Silakan check-in di profil terlebih dahulu", "warning"); return; }
  const hasActive = DB.orders.some(o2 => o2.courier_id === State.currentUser.id && o2.status === "delivering");
  if (hasActive) { showToast("Selesaikan pengantaran aktif terlebih dahulu", "warning"); return; }
  o.courier_id = State.currentUser.id;
  o.status = "delivering";
  DB.courierTracking.push({
    id: "ct" + Date.now(),
    order_id: o.id,
    courier_id: State.currentUser.id,
    latitude: DB.cafe.location.lat,
    longitude: DB.cafe.location.lng,
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
