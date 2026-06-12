// ============================================================
// CUSTOMER VIEW — Delivery Location
// ============================================================
function pickDeliveryLocation() {
  var addressInput = document.getElementById("delivery-address");
  if (addressInput) State.deliveryAddress = addressInput.value;

  var cafeData = State._cafe || {};
  var defaultLat = cafeData.location ? cafeData.location.lat : -6.2088;
  var defaultLng = cafeData.location ? cafeData.location.lng : 106.8456;

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
    function() {
      setTimeout(function() {
        var el = document.getElementById("map-picker");
        if (!el) return;

        var lat = State.deliveryLocation?.lat || defaultLat;
        var lng = State.deliveryLocation?.lng || defaultLng;

        if (!State.deliveryLocation && navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            function(pos) {
              lat = pos.coords.latitude;
              lng = pos.coords.longitude;
              initMap(lat, lng);
            },
            function() {
              initMap(lat, lng);
            },
          );
        } else {
          initMap(lat, lng);
        }

        function initMap(initialLat, initialLng) {
          var map = L.map(el).setView([initialLat, initialLng], 19);
          L.tileLayer(
            "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
            { maxZoom: 20, attribution: "Google" },
          ).addTo(map);

          var marker = L.marker([initialLat, initialLng]).addTo(map);
          State.tempDeliveryLocation = { lat: initialLat, lng: initialLng };

          map.on("move", function() {
            marker.setLatLng(map.getCenter());
          });

          map.on("moveend", function() {
            var position = map.getCenter();
            marker.setLatLng(position);
            State.tempDeliveryLocation = {
              lat: position.lat,
              lng: position.lng,
            };
          });

          State.mapInstances = State.mapInstances || {};
          State.mapInstances["picker"] = map;

          setTimeout(function() { map.invalidateSize(); }, 100);
        }
      }, 300);
    },
  );
}

function saveDeliveryLocation() {
  if (State.tempDeliveryLocation) {
    State.deliveryLocation = Object.assign({}, State.tempDeliveryLocation);
    showToast("Mengambil data alamat dari lokasi...", "info");

    var lat = State.deliveryLocation.lat;
    var lng = State.deliveryLocation.lng;
    fetch(
      "https://nominatim.openstreetmap.org/reverse?format=json&lat=" + lat + "&lon=" + lng,
    )
      .then(function(res) { return res.json(); })
      .then(function(data) {
        if (data && data.display_name) {
          State.deliveryAddress = data.display_name;
          showToast("Alamat berhasil disesuaikan dengan titik map", "success");
          render();
        }
      })
      .catch(function(err) {
        console.error("Geocoding failed", err);
        showToast("Titik lokasi disimpan", "success");
      });
  }
  closeModal();
  render();
}
