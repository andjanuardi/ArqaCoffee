// ============================================================
// COURIER VIEW — Active Delivery
// ============================================================
function renderCourierActive() {
  const active = DB.orders.filter(
    (o) => o.courier_id === State.currentUser.id && o.status === "delivering",
  );
  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Pengantaran Aktif</h2>
    <div class="space-y-3">
      ${active.length === 0 ? '<div class="text-center py-12"><i class="fas fa-route text-4xl mb-3" style="color:var(--border)"></i><p style="color:var(--muted)">Tidak ada pengantaran aktif</p></div>' : ""}
      ${active
        .map(
          (o) => `
      <div class="card">
        <div class="flex justify-between items-start mb-1">
          <div><span class="font-bold">#${o.id.slice(-5).toUpperCase()}</span><span class="badge badge-delivering ml-2">Dalam Perjalanan</span></div>
          <span class="font-bold" style="color:var(--accent)">${formatCurrency(o.total_amount)}</span>
        </div>
        <div class="text-xs mb-1" style="color:var(--muted)">${formatDate(o.created_at)} ${formatTime(o.created_at)}</div>
        <div class="text-xs mb-1" style="color:var(--muted)"><i class="fas fa-user mr-1" style="color:var(--accent)"></i>${o.customer_name || (getUser(o.user_id)?.name || getUser(o.user_id)?.email || '—')}</div>
        <div class="text-xs mb-1" style="color:var(--muted)"><i class="fas fa-phone mr-1" style="color:var(--accent)"></i>${o.customer_phone || (getUser(o.user_id)?.phone || '—')}</div>
        <div class="text-sm mb-1"><i class="fas fa-map-marker-alt mr-1" style="color:var(--accent)"></i>${o.delivery_address}</div>
        ${o.delivery_detail ? `<div class="text-xs mb-2" style="color:var(--muted)"><i class="fas fa-info-circle mr-1"></i>${o.delivery_detail}</div>` : ""}
        <div id="map-courier-${o.id}" class="mb-3" style="height:200px;border-radius:12px"></div>
        <div class="flex gap-2">
          <button onclick="simulateMove('${o.id}')" class="btn-secondary btn-sm flex-1 text-center"><i class="fas fa-location-arrow mr-1"></i>Update</button>
          <button onclick="openChatModal('${o.id}')" class="btn-secondary btn-sm flex-1 text-center" style="background:rgba(224,122,58,.1);color:var(--accent);border-color:transparent;position:relative"><i class="fas fa-comment-alt mr-1"></i>Chat${getOrderChatUnreadCount(o.id) > 0 ? `<span class="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold" style="background:var(--danger);color:#fff">${getOrderChatUnreadCount(o.id)}</span>` : ""}</button>
          <button onclick="completeDelivery('${o.id}')" class="btn-primary btn-sm flex-1 text-center"><i class="fas fa-check mr-1"></i>Selesai</button>
        </div>
      </div>`,
        )
        .join("")}
    </div>
  </div>`;
}

function simulateMove(orderId) {
  const tracks = DB.courierTracking.filter((t) => t.order_id === orderId);
  if (tracks.length > 0) {
    const last = tracks[tracks.length - 1];
    const newLat = last.latitude + (Math.random() - 0.5) * 0.005;
    const newLng = last.longitude + (Math.random() - 0.5) * 0.005;
    DB.courierTracking.push({
      id: "ct" + Date.now(),
      order_id: orderId,
      courier_id: State.currentUser.id,
      latitude: newLat,
      longitude: newLng,
      recorded_at: new Date().toISOString(),
    });
  }
  showToast("Lokasi diupdate", "info");
  render();
  setTimeout(() => initCourierMap(orderId), 300);
}

function completeDelivery(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  if (o.payment_status === "unpaid" && !["digital", "qris", "bank_transfer"].includes(o.payment_method)) {
    o.status = "delivered";
    addNotification({
      title: 'Pesanan Telah Diantar',
      message: '#' + o.id.slice(-5).toUpperCase() + ' — menunggu setoran dari kurir',
      type: 'delivery',
      icon: 'fa-hand-holding-dollar',
      targetRoles: ['cashier'],
      relatedOrderId: o.id
    });
    notifyDeliveryCompleted(o);
    showToast("Pesanan terkirim — setorkan uang ke kasir", "success");
  } else {
    o.status = "completed";
    if (o.payment_method === "cod" || o.payment_method === "") o.payment_status = "paid";
    notifyDeliveryCompleted(o);
    showToast("Pengantaran selesai!", "success");
  }
  render();
}
