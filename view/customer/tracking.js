// ============================================================
// CUSTOMER VIEW — Tracking Map
// ============================================================
function showTrackingMap(orderId) {
  const o = DB.orders.find((x) => x.id === orderId);
  if (!o) return;
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
    () => {
      setTimeout(() => {
        const el = document.getElementById("map-tracking");
        if (!el) return;
        const lat = DB.cafe.location.lat,
          lng = DB.cafe.location.lng;
        const map = L.map(el).setView([lat, lng], 15);
        L.tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          { attribution: "Esri" },
        ).addTo(map);
        L.marker([lat, lng]).addTo(map).bindPopup("Posisi Kurir").openPopup();
        State.mapInstances["tracking"] = map;
      }, 200);
    },
  );
}
