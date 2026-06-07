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
  const today = new Date().toLocaleDateString('sv-SE');
  const hasCheckedIn = DB.attendances.some(a => a.user_id === State.currentUser.id && !a.check_out && new Date(a.check_in).toLocaleDateString('sv-SE') === today);
  if (!hasCheckedIn) { showToast("Belum check-in hari ini. Silakan check-in di profil terlebih dahulu", "warning"); return; }
  const hasActive = DB.orders.some(o2 => o2.courier_id === State.currentUser.id && o2.status === "delivering");
  if (hasActive) { showToast("Selesaikan pengantaran aktif terlebih dahulu", "warning"); return; }

  const cafe = DB.cafe.location;
  const maxDist = 5000;

  if (State.courierPosition) {
    const dist = calcDistance(State.courierPosition.lat, State.courierPosition.lng, cafe.lat, cafe.lng);
    return handleDistanceResult(o, id, dist);
  }

  if (!navigator.geolocation) {
    showToast("Browser tidak mendukung geolokasi", "warning");
    return;
  }

  navigator.geolocation.getCurrentPosition(function(pos) {
    const dist = calcDistance(pos.coords.latitude, pos.coords.longitude, cafe.lat, cafe.lng);
    handleDistanceResult(o, id, dist);
  }, function() {
    showModal(`
      <div class="text-center">
        <div class="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl" style="background:rgba(243,156,18,.1);color:var(--warning)">
          <i class="fas fa-map-pin"></i>
        </div>
        <h3 class="font-display text-lg font-bold mb-2">Aktifkan Lokasi</h3>
        <p class="text-sm mb-4" style="color:var(--muted)">Aktifkan lokasi perangkat untuk memeriksa jarak Anda ke kafe sebelum mengambil pesanan.</p>
        <button onclick="closeModal()" class="btn-primary w-full">Tutup</button>
      </div>
    `);
  }, { enableHighAccuracy: true, timeout: 10000 });
}

function handleDistanceResult(o, id, dist) {
  if (dist > 5000) {
    const meter = Math.round(dist).toLocaleString('id-ID');
    const km = (dist / 1000).toFixed(1).replace('.', ',');
    showModal(`
      <div class="text-center">
        <div class="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl" style="background:rgba(231,76,60,.1);color:var(--danger)">
          <i class="fas fa-location-dot"></i>
        </div>
        <h3 class="font-display text-lg font-bold mb-2">Terlalu Jauh</h3>
        <p class="text-sm mb-2" style="color:var(--muted)">Kamu berada</p>
        <p class="text-2xl font-bold mb-1" style="color:var(--danger)">${meter} meter</p>
        <p class="text-sm mb-4" style="color:var(--muted)">(${km} km) dari ARQA Coffee</p>
        <p class="text-xs mb-4" style="color:var(--muted)">Mendekatlah ke kafe (maks 5 km) untuk mengambil pesanan.</p>
        <button onclick="closeModal()" class="btn-primary w-full">Tutup</button>
      </div>
    `);
    return;
  }
  doAcceptDelivery(o, id, dist);
}

function doAcceptDelivery(o, id, dist) {
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
  const meter = Math.round(dist).toLocaleString('id-ID');
  const km = (dist / 1000).toFixed(1).replace('.', ',');
  showToast("Pesanan diambil — jarak " + meter + "m (" + km + " km)", "success");
  State.currentTab.courier = "active";
  render();
}
