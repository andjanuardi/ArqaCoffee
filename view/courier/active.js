// ============================================================
// COURIER VIEW — Active Delivery
// ============================================================
function renderCourierActive() {
  const active = DB.orders.filter(
    (o) => o.courier_id === State.currentUser.id && o.status === "delivering",
  );
  function getCafeToCustDist(o) {
    if (!o.delivery_location || !o.delivery_location.lat) return null;
    const cafe = DB.cafe.location;
    const d = calcDistance(cafe.lat, cafe.lng, o.delivery_location.lat, o.delivery_location.lng);
    const meter = Math.round(d).toLocaleString('id-ID');
    const km = (d / 1000).toFixed(1).replace('.', ',');
    if (d < 1000) return meter + ' meter';
    return meter + ' m (' + km + ' km)';
  }
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
          <div><span class="font-bold">#${o.id.slice(-5).toUpperCase()}</span><span class="badge badge-delivering ml-2">Dalam Perjalanan</span>${o.payment_status === 'paid' ? '<span class="badge badge-paid ml-2">Lunas</span>' : '<span class="badge badge-unpaid ml-2">Belum Bayar</span>'}</div>
          <span class="font-bold" style="color:var(--accent)">${formatCurrency(o.total_amount)}</span>
        </div>
        <div class="text-xs mb-1" style="color:var(--muted)">${formatDate(o.created_at)} ${formatTime(o.created_at)}</div>
        <div class="text-xs mb-1" style="color:var(--muted)"><i class="fas fa-user mr-1" style="color:var(--accent)"></i>${o.customer_name || (getUser(o.user_id)?.name || getUser(o.user_id)?.email || '—')}</div>
        <div class="text-xs mb-1" style="color:var(--muted)"><i class="fas fa-phone mr-1" style="color:var(--accent)"></i>${o.customer_phone || (getUser(o.user_id)?.phone || '—')}</div>
        <div class="text-sm mb-1"><i class="fas fa-map-marker-alt mr-1" style="color:var(--accent)"></i>${o.delivery_address}</div>
        ${o.delivery_detail ? `<div class="text-xs mb-2" style="color:var(--muted)"><i class="fas fa-info-circle mr-1"></i>${o.delivery_detail}</div>` : ""}
        ${o.shipping_cost && o.shipping_cost > 0 ? `<div class="text-xs mb-2" style="color:var(--accent)"><i class="fas fa-truck mr-1"></i>Ongkos Kirim: <b>${formatCurrency(o.shipping_cost)}</b></div>` : ""}
        ${(() => { const fee = calcCourierFee(o.shipping_cost); return fee > 0 ? `<div class="text-xs mb-2" style="color:var(--muted)"><i class="fas fa-hand-holding-dollar mr-1"></i>Jasa Aplikasi: <b style="color:var(--danger)">-${formatCurrency(fee)}</b></div>` : ''; })()}
        ${o.payment_status === "paid" && o.shipping_cost > 0 ? `<div class="text-xs mb-2" style="color:var(--success)"><i class="fas fa-hand-holding-dollar mr-1"></i>Ongkir dari kasir: <b>${formatCurrency((o.shipping_cost || 0) - calcCourierFee(o.shipping_cost))}</b></div>` : ""}
        ${(() => { const d = getCafeToCustDist(o); return d ? `<div class="text-xs mb-2" style="color:var(--accent)"><i class="fas fa-store mr-1"></i>Cafe → Pelanggan: ${d}</div>` : ''; })()}
        <div id="map-courier-${o.id}" class="mb-3" style="height:200px;border-radius:12px"></div>
        <div class="flex gap-2">
          <button onclick="openNavigation('${o.id}')" class="btn-secondary btn-sm flex-1 text-center"><i class="fas fa-map-signs mr-1"></i>Navigasi</button>
          <button onclick="openChatModal('${o.id}')" class="btn-secondary btn-sm flex-1 text-center" style="background:rgba(224,122,58,.1);color:var(--accent);border-color:transparent;position:relative"><i class="fas fa-comment-alt mr-1"></i>Chat${getOrderChatUnreadCount(o.id) > 0 ? `<span class="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold" style="background:var(--danger);color:#fff">${getOrderChatUnreadCount(o.id)}</span>` : ""}</button>
          <button onclick="completeDelivery('${o.id}')" class="btn-primary btn-sm flex-1 text-center"><i class="fas fa-check mr-1"></i>Selesai</button>
        </div>
      </div>`,
        )
        .join("")}
    </div>
  </div>`;
}

function openNavigation(orderId) {
  const o = DB.orders.find(x => x.id === orderId);
  if (!o) return;
  if (!o.delivery_location || !o.delivery_location.lat) {
    showToast("Lokasi pelanggan tidak tersedia", "error");
    return;
  }
  const courierPos = State.courierPosition || DB.cafe?.location;
  if (!courierPos) {
    showToast("Posisi kurir tidak diketahui", "error");
    return;
  }
  const origin = `${courierPos.lat},${courierPos.lng}`;
  const dest = `${o.delivery_location.lat},${o.delivery_location.lng}`;
  window.open(`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${dest}&travelmode=driving`, '_blank');
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
      targetRoles: ['cashier', 'admin', 'manager'],
      relatedOrderId: o.id
    });
    notifyDeliveryCompleted(o);
    showToast("Pesanan terkirim — setorkan uang ke kasir", "success");
  } else {
    o.status = "completed";
    o.ongkir_status = "unpaid";
    if (o.payment_method === "cod" || o.payment_method === "") o.payment_status = "paid";
    notifyDeliveryCompleted(o);
    showToast("Pengantaran selesai! Ongkir " + formatCurrency(o.shipping_cost) + " dari kasir — jangan lupa ambil ongkir", "info");
  }
  render();
}
