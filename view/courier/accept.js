// ============================================================
// COURIER VIEW — Confirm Reject & Accept Delivery
// ============================================================
async function confirmRejectCourierOrder(orderId) {
  try {
    var reasonEl = document.getElementById("courier-reject-reason");
    var reason = reasonEl ? reasonEl.value : "";
    if (reason === "Lainnya") {
      var otherEl = document.getElementById("courier-reject-other");
      reason = otherEl ? otherEl.value.trim() : "";
    }
    if (!reason) {
      showToast("Silakan pilih atau isi alasan penolakan", "warning");
      return;
    }
    var btn = document.querySelector('.btn-primary i.fa-check')?.closest('button');
    if (btn) showBtnSpinner(btn);
    var orders = await API.getOrders();
    var o = orders.find((x) => x.id === orderId);
    if (!o) { closeModal(); return; }
    if (o.courier_id !== State.currentUser.id && o.courier_id !== null) {
      showToast("Pesanan sudah diambil kurir lain", "warning");
      closeModal();
      return;
    }
    await API.updateOrder(orderId, { courier_id: null, status: "rejected", reject_reason: "Ditolak Kurir: " + reason });
    var payouts = await API.getMitraPayouts();
    var toDelete = payouts.filter(p => p.order_id === orderId && p.status !== 'paid');
    for (var i = 0; i < toDelete.length; i++) {
      await API.deleteMitraPayout(toDelete[i].id);
    }
    notifyRejected(o, "Ditolak Kurir: " + reason);
    showToast("Pesanan ditolak", "info");
    closeModal();
    await render();
  } catch(e) { console.error(e); showToast('Gagal menolak pesanan', 'error'); }
  finally { if (btn) hideBtnSpinner(btn); }
}

async function acceptDelivery(id) {
  try {
    var orders = await API.getOrders();
    var o = orders.find((x) => x.id === id);
    if (!o) return;
    var today = new Date().toLocaleDateString('sv-SE');
    var attendances = await API.getAttendances();
    var hasCheckedIn = attendances.some(a => a.user_id === State.currentUser.id && !a.check_out && new Date(a.check_in).toLocaleDateString('sv-SE') === today);
    if (!hasCheckedIn) { showToast("Belum check-in hari ini. Silakan check-in di profil terlebih dahulu", "warning"); return; }
    var hasActive = orders.some(o2 => o2.courier_id === State.currentUser.id && o2.status === "delivering");
    if (hasActive) { showToast("Selesaikan pengantaran aktif terlebih dahulu", "warning"); return; }

    var cafe = await API.getCafe();
    var cafeLoc = cafe.location;
    var maxDist = 5000;

    if (State.courierPosition) {
      var dist = calcDistance(State.courierPosition.lat, State.courierPosition.lng, cafeLoc.lat, cafeLoc.lng);
      return handleDistanceResult(o, id, dist);
    }

    if (!navigator.geolocation) {
      showToast("Browser tidak mendukung geolokasi", "warning");
      return;
    }

    navigator.geolocation.getCurrentPosition(function(pos) {
      var dist = calcDistance(pos.coords.latitude, pos.coords.longitude, cafeLoc.lat, cafeLoc.lng);
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
  } catch(e) { console.error(e); showToast('Gagal memeriksa jarak', 'error'); }
}

function handleDistanceResult(o, id, dist) {
  if (dist > 5000) {
    var meter = Math.round(dist).toLocaleString('id-ID');
    var km = (dist / 1000).toFixed(1).replace('.', ',');
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

async function doAcceptDelivery(o, id, dist) {
  try {
    var btn = document.querySelector('.btn-primary'); if (btn) showBtnSpinner(btn);
    await API.updateOrder(id, { courier_id: State.currentUser.id, status: "delivering" });
    var cafe = await API.getCafe();
    await API.createCourierTracking({
      id: "ct" + Date.now(),
      order_id: o.id,
      courier_id: State.currentUser.id,
      latitude: cafe.location.lat,
      longitude: cafe.location.lng,
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
    var meter = Math.round(dist).toLocaleString('id-ID');
    var km = (dist / 1000).toFixed(1).replace('.', ',');
    showToast("Pesanan diambil — jarak " + meter + "m (" + km + " km)", "success");
    State.currentTab.courier = "active";
    await render();
  } catch(e) { console.error(e); showToast('Gagal mengambil pesanan', 'error'); }
  finally { if (btn) hideBtnSpinner(btn); }
}
