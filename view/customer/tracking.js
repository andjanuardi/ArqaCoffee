// ============================================================
// CUSTOMER VIEW — Tracking Map
// ============================================================
async function showTrackingMap(orderId) {
  try {
    var ordersData = await API.getOrders();
    var o = ordersData.find(function(x) { return x.id === orderId; });
    if (!o) { showToast("Pesanan tidak ditemukan", "error"); return; }
    var cafeData = await API.getCafe();
    showModal(
      `
      <div>
        <h3 class="font-display text-lg font-bold mb-4">Lacak Kurir</h3>
        <div id="map-tracking" class="mb-4"></div>
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 rounded-full flex items-center justify-center" style="background:var(--accent);color:#fff"><i class="fas fa-motorcycle"></i></div>
          <div><div class="font-semibold text-sm">${getUser(o.courier_id)?.name || "Kurir"}</div><div class="text-xs" style="color:var(--muted)">Sedang dalam perjalanan</div></div>
        </div>
        <button onclick="closeModal()" class="btn-secondary w-full text-center">Tutup</button>
      </div>
    `,
      function() {
        setTimeout(function() {
          var el = document.getElementById("map-tracking");
          if (!el) return;
          var lat = cafeData.location.lat,
            lng = cafeData.location.lng;
          var map = L.map(el).setView([lat, lng], 19);
          L.tileLayer(
            "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
            { maxZoom: 20, attribution: "Google" },
          ).addTo(map);
          L.marker([lat, lng]).addTo(map).bindPopup("Posisi Kurir").openPopup();
          State.mapInstances["tracking"] = map;
        }, 200);
      },
    );
  } catch (e) {
    console.error(e);
    showToast("Gagal memuat peta pelacakan", "error");
  }
}
