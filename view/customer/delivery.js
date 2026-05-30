// ============================================================
// CUSTOMER VIEW — Delivery Location
// ============================================================
function pickDeliveryLocation() {
  const addressInput = document.getElementById("delivery-address");
  if (addressInput) State.deliveryAddress = addressInput.value;

  showModal(
    `
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Pilih Titik Lokasi</h3>
      <div id="map-picker" class="mb-4" style="height: 300px; border-radius: 12px; overflow: hidden; background: #e5e7eb;"></div>
      <p class="text-xs mb-4" style="color:var(--muted)"><i class="fas fa-info-circle mr-1"></i>Geser peta untuk menentukan titik lokasi pengiriman yang tepat.</p>
      <button onclick="saveDeliveryLocation()" class="btn-primary w-full text-center mb-2">Simpan Lokasi</button>
      <button onclick="closeModal(); render();" class="btn-secondary w-full text-center">Batal</button>
    </div>
  `,
    () => {
      setTimeout(() => {
        const el = document.getElementById("map-picker");
        if (!el) return;

        let lat = State.deliveryLocation?.lat || DB.cafe.location.lat;
        let lng = State.deliveryLocation?.lng || DB.cafe.location.lng;

        if (!State.deliveryLocation && navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              lat = pos.coords.latitude;
              lng = pos.coords.longitude;
              initMap(lat, lng);
            },
            () => {
              initMap(lat, lng);
            },
          );
        } else {
          initMap(lat, lng);
        }

        function initMap(initialLat, initialLng) {
          const map = L.map(el).setView([initialLat, initialLng], 15);
          L.tileLayer(
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            { attribution: "Esri" },
          ).addTo(map);

          const marker = L.marker([initialLat, initialLng]).addTo(map);
          State.tempDeliveryLocation = { lat: initialLat, lng: initialLng };

          map.on("move", function () {
            marker.setLatLng(map.getCenter());
          });

          map.on("moveend", function () {
            const position = map.getCenter();
            marker.setLatLng(position);
            State.tempDeliveryLocation = {
              lat: position.lat,
              lng: position.lng,
            };
          });

          State.mapInstances = State.mapInstances || {};
          State.mapInstances["picker"] = map;

          setTimeout(() => map.invalidateSize(), 100);
        }
      }, 300);
    },
  );
}

function saveDeliveryLocation() {
  if (State.tempDeliveryLocation) {
    State.deliveryLocation = { ...State.tempDeliveryLocation };
    showToast("Mengambil data alamat dari lokasi...", "info");

    const { lat, lng } = State.deliveryLocation;
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.display_name) {
          State.deliveryAddress = data.display_name;
          showToast("Alamat berhasil disesuaikan dengan titik map", "success");
          render();
        }
      })
      .catch((err) => {
        console.error("Geocoding failed", err);
        showToast("Titik lokasi disimpan", "success");
      });
  }
  closeModal();
  render();
}
