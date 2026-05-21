// ============================================================
// COURIER VIEW
// ============================================================
function renderCourierView() {
  const tab = State.currentTab.courier || "available";
  if (tab === "available") return renderCourierAvailable();
  if (tab === "active") return renderCourierActive();
  if (tab === "history") return renderCourierHistory();
  if (tab === "profile") return renderGenericProfile();
  return renderCourierAvailable();
}

function renderCourierAvailable() {
  const available = DB.orders.filter(
    (o) =>
      o.order_type === "delivery" &&
      o.status === "ready" &&
      (!o.courier_id || o.courier_id === State.currentUser.id),
  );
  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Pesanan Tersedia</h2>
    <div class="space-y-3">
      ${available.length === 0 ? '<div class="text-center py-12"><i class="fas fa-box-open text-4xl mb-3" style="color:var(--border)"></i><p style="color:var(--muted)">Belum ada pesanan siap diantar</p></div>' : ""}
      ${available
        .map(
          (o) => `
      <div class="card">
        <div class="flex justify-between items-start mb-2">
          <span class="font-bold">#${o.id.slice(-5).toUpperCase()}</span>
          <span class="font-bold" style="color:var(--accent)">${formatCurrency(o.total_amount)}</span>
        </div>
        <div class="text-sm mb-1"><i class="fas fa-map-marker-alt mr-1" style="color:var(--accent)"></i>${o.delivery_address}</div>
        ${o.delivery_detail ? `<div class="text-xs mb-1" style="color:var(--muted)"><i class="fas fa-info-circle mr-1"></i>${o.delivery_detail}</div>` : ""}
        <div class="text-xs mb-3" style="color:var(--muted)">${o.items
          .map((i) => {
            const mi = getMenuItem(i.menu_item_id);
            return mi ? mi.name + " x" + i.quantity : "";
          })
          .join(", ")}</div>
        <div class="flex gap-2">
          <button onclick="rejectCourierOrder('${o.id}')" class="btn-sm flex-1 text-center" style="background:rgba(231,76,60,.1);color:var(--danger);border:none;padding:10px;border-radius:10px;font-size:13px;font-weight:600"><i class="fas fa-times mr-1"></i>Tolak</button>
          <button onclick="acceptDelivery('${o.id}')" class="btn-primary flex-1 text-center">Ambil Pesanan</button>
        </div>
      </div>`,
        )
        .join("")}
    </div>
  </div>`;
}

function rejectCourierOrder(orderId) {
  const o = DB.orders.find((x) => x.id === orderId);
  if (!o) return;
  showModal(`
    <div class="text-center">
      <div class="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl" style="background:rgba(231,76,60,.1);color:var(--danger)">
        <i class="fas fa-times-circle"></i>
      </div>
      <h3 class="font-display text-lg font-bold mb-2">Tolak Pesanan #${o.id.slice(-5).toUpperCase()}?</h3>
      <p class="text-sm mb-4" style="color:var(--muted)">Pilih alasan menolak pesanan ini.</p>
      <div class="text-left mb-4">
        <label class="text-xs font-semibold mb-2 block" style="color:var(--muted)">Alasan Penolakan</label>
        <select id="courier-reject-reason" class="input-field text-sm w-full mb-3" style="background:var(--bg2);" onchange="document.getElementById('courier-reject-other-container').style.display = this.value === 'Lainnya' ? 'block' : 'none'">
          <option value="">-- Pilih Alasan --</option>
          <option value="Jarak terlalu jauh">Jarak terlalu jauh</option>
          <option value="Sedang sibuk">Sedang sibuk</option>
          <option value="Kendala kendaraan">Kendala kendaraan</option>
          <option value="Alamat tidak jelas">Alamat tidak jelas</option>
          <option value="Pesanan terlalu banyak">Pesanan terlalu banyak</option>
          <option value="Lainnya">Lainnya...</option>
        </select>
        <div id="courier-reject-other-container" style="display:none;">
          <input type="text" id="courier-reject-other" class="input-field text-sm w-full" placeholder="Ketik alasan spesifik di sini...">
        </div>
      </div>
      <div class="flex gap-3">
        <button onclick="closeModal()" class="btn-secondary flex-1">Batal</button>
        <button onclick="confirmRejectCourierOrder('${orderId}')" class="btn-primary flex-1" style="background:var(--danger);border-color:var(--danger);">Tolak Pesanan</button>
      </div>
    </div>
  `);
}

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
  addNotification({
    title: 'Pesanan Ditolak Kurir',
    message: '#' + o.id.slice(-5).toUpperCase() + ' — Alasan: ' + reason,
    type: 'warning',
    icon: 'fa-ban',
    targetRoles: ['manager', 'admin'],
    relatedOrderId: o.id
  });
  showToast("Pesanan ditolak", "info");
  closeModal();
  render();
}

function acceptDelivery(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  o.courier_id = State.currentUser.id;
  o.status = "delivering";
  // Add tracking point
  DB.courierTracking.push({
    id: "ct" + Date.now(),
    order_id: o.id,
    courier_id: State.currentUser.id,
    latitude: -6.9175,
    longitude: 107.6191,
    recorded_at: new Date().toISOString(),
  });
  notifyDeliveryTaken(o, State.currentUser.name);
  showToast("Pesanan diambil — mulai pengantaran", "success");
  render();
}

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
        <div class="flex justify-between items-start mb-3">
          <div><span class="font-bold">#${o.id.slice(-5).toUpperCase()}</span><span class="badge badge-delivering ml-2">Dalam Perjalanan</span></div>
          <span class="font-bold" style="color:var(--accent)">${formatCurrency(o.total_amount)}</span>
        </div>
        <div class="text-sm mb-1"><i class="fas fa-map-marker-alt mr-1" style="color:var(--accent)"></i>${o.delivery_address}</div>
        ${o.delivery_detail ? `<div class="text-xs mb-2" style="color:var(--muted)"><i class="fas fa-info-circle mr-1"></i>${o.delivery_detail}</div>` : ""}
        <div id="map-courier-${o.id}" class="mb-3" style="height:200px;border-radius:12px"></div>
        <div class="flex gap-2">
          <button onclick="simulateMove('${o.id}')" class="btn-secondary btn-sm flex-1 text-center"><i class="fas fa-location-arrow mr-1"></i>Update</button>
          <button onclick="openChatModal('${o.id}')" class="btn-secondary btn-sm flex-1 text-center" style="background:rgba(224,122,58,.1);color:var(--accent);border-color:transparent;position:relative"><i class="fas fa-comment-alt mr-1"></i>Chat${getUnreadCount(o.id) > 0 ? `<span class="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold" style="background:var(--danger);color:#fff">${getUnreadCount(o.id)}</span>` : ""}</button>
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
  // Re-init map
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

function initCourierMap(orderId) {
  const el = document.getElementById(`map-courier-${orderId}`);
  if (!el) return;
  if (State.mapInstances[orderId]) {
    try {
      State.mapInstances[orderId].remove();
    } catch (e) {}
  }
  const tracks = DB.courierTracking.filter((t) => t.order_id === orderId);
  const last =
    tracks.length > 0
      ? tracks[tracks.length - 1]
      : { latitude: -6.9175, longitude: 107.6191 };
  const map = L.map(el).setView([last.latitude, last.longitude], 15);
  L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    { attribution: "Esri" },
  ).addTo(map);
  L.marker([last.latitude, last.longitude])
    .addTo(map)
    .bindPopup("Posisi Kurir")
    .openPopup();
  if (tracks.length > 1) {
    const polyline = tracks.map((t) => [t.latitude, t.longitude]);
    L.polyline(polyline, { color: "#e07a3a", weight: 3, opacity: 0.8 }).addTo(
      map,
    );
  }
  State.mapInstances[orderId] = map;
}

function renderCourierHistory() {
  const done = DB.orders
    .filter(
      (o) => o.courier_id === State.currentUser.id && o.status === "completed",
    )
    .slice(0, 10);
  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Riwayat Pengantaran</h2>
    <div class="space-y-2">
      ${done.length === 0 ? '<p class="text-center py-8 text-sm" style="color:var(--muted)">Belum ada riwayat</p>' : ""}
      ${done
        .map(
          (o) => `
      <div class="card flex justify-between items-center py-3 cursor-pointer hover:scale-[1.02] transition-transform" onclick="showCourierOrderDetail('${o.id}')">
         <div><span class="font-semibold text-sm">#${o.id.slice(-5).toUpperCase()}</span><div class="text-xs" style="color:var(--muted)">${o.delivery_address?.slice(0, 30) || ""}</div>${o.delivery_detail ? `<div class="text-xs" style="color:var(--muted)">${o.delivery_detail?.slice(0, 30) || ""}</div>` : ""}</div>
        <span class="font-bold text-sm" style="color:var(--success)">${formatCurrency(o.total_amount)}</span>
      </div>`,
        )
        .join("")}
    </div>
  </div>`;
}

function showCourierOrderDetail(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  showModal(`
    <div>
      <div class="flex justify-between items-start mb-4">
        <h3 class="font-display text-lg font-bold">Pesanan #${o.id.slice(-5).toUpperCase()}</h3>
        <span class="badge badge-completed">Selesai</span>
      </div>
      <div class="text-sm mb-4">
        <i class="fas fa-map-marker-alt mr-2" style="color:var(--accent)"></i>${o.delivery_address}
        ${o.delivery_detail ? `<div class="text-xs mt-1" style="color:var(--muted)"><i class="fas fa-info-circle mr-1"></i>${o.delivery_detail}</div>` : ""}
      </div>
      <div class="space-y-2 mb-4">
        ${o.items
          .map((i) => {
            const mi = getMenuItem(i.menu_item_id);
            return mi
              ? `
        <div class="flex justify-between text-sm">
          <span>${mi.name} x${i.quantity}</span>
        </div>`
              : "";
          })
          .join("")}
      </div>
      <div class="border-t pt-3" style="border-color:var(--border)">
        <div class="flex justify-between font-bold"><span>Total Pendapatan</span><span style="color:var(--accent)">${formatCurrency(o.total_amount)}</span></div>
        <div class="flex justify-between text-xs mt-1" style="color:var(--muted)"><span>Metode Pembayaran</span><span>${o.payment_method === 'qris' ? 'QRIS' : o.payment_method === 'bank_transfer' ? 'Transfer Bank' : o.payment_method === 'digital' ? 'Digital' : o.payment_method === "" ? 'Bayar Nanti' : 'Tunai/COD'}</span></div>
        <div class="flex justify-between text-xs mt-1" style="color:var(--muted)"><span>Status Bayar</span><span class="badge ${o.payment_status === "paid" ? "badge-paid" : "badge-unpaid"}">${o.payment_status === "paid" ? "Lunas" : "Belum Bayar"}</span></div>
        <div class="flex justify-between text-xs mt-1" style="color:var(--muted)"><span>Waktu Selesai</span><span>${formatTime(o.created_at)}</span></div>
      </div>
      <button onclick="closeModal()" class="btn-secondary w-full mt-4 text-center">Tutup</button>
    </div>
  `);
}
