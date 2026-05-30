// ============================================================
// COURIER VIEW — History
// ============================================================
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
  let done = DB.orders.filter(
    (o) =>
      o.courier_id === State.currentUser.id &&
      (o.status === "completed" || o.status === "delivered"),
  );
  const startVal = State.courierDateStart || "";
  const endVal = State.courierDateEnd || "";
  if (startVal) {
    const s = new Date(startVal);
    s.setHours(0, 0, 0, 0);
    done = done.filter((o) => new Date(o.created_at) >= s);
  }
  if (endVal) {
    const e = new Date(endVal);
    e.setHours(23, 59, 59, 999);
    done = done.filter((o) => new Date(o.created_at) <= e);
  }
  done.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Riwayat Pengantaran</h2>
    <div class="flex gap-2 mb-4">
      <div class="flex-1">
        <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Dari Tanggal</label>
        <input type="date" id="courier-history-start" class="input-field w-full" value="${startVal}" onchange="State.courierDateStart=this.value;render()">
      </div>
      <div class="flex-1">
        <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Sampai Tanggal</label>
        <input type="date" id="courier-history-end" class="input-field w-full" value="${endVal}" onchange="State.courierDateEnd=this.value;render()">
      </div>
      ${startVal || endVal ? '<button onclick="State.courierDateStart=\'\';State.courierDateEnd=\'\';render()" class="self-end btn-sm mb-0.5" style="background:rgba(231,76,60,.1);color:var(--danger);border:none;padding:8px 12px;border-radius:10px;height:40px"><i class="fas fa-times"></i></button>' : ""}
    </div>
    <div class="space-y-2">
      ${done.length === 0 ? '<p class="text-center py-8 text-sm" style="color:var(--muted)">Belum ada riwayat</p>' : ""}
      ${done
        .map(
          (o) => `
      <div class="card flex justify-between items-center py-3 cursor-pointer hover:scale-[1.02] transition-transform" onclick="showCourierOrderDetail('${o.id}')">
        <div>
          <div><span class="font-semibold text-sm">#${o.id.slice(-5).toUpperCase()}</span> ${o.status === "delivered" ? '<span class="badge badge-unpaid" style="background:rgba(241,196,15,.15);color:#f1c40f">Belum Setor</span>' : '<span class="badge badge-completed">Selesai</span>'}</div>
          <div class="text-xs" style="color:var(--muted)"><i class="fas fa-user mr-1" style="color:var(--accent)"></i>${o.customer_name || (getUser(o.user_id)?.name || getUser(o.user_id)?.email || '—')}</div>
          <div class="text-xs" style="color:var(--muted)"><i class="fas fa-phone mr-1" style="color:var(--accent)"></i>${o.customer_phone || (getUser(o.user_id)?.phone || '—')}</div>
          <div class="text-xs" style="color:var(--muted)">${formatDate(o.created_at)} ${formatTime(o.created_at)}</div>
          <div class="text-xs" style="color:var(--muted)">${o.delivery_address?.slice(0, 30) || ""}</div>${o.delivery_detail ? `<div class="text-xs" style="color:var(--muted)">${o.delivery_detail?.slice(0, 30) || ""}</div>` : ""}</div>
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
        ${o.status === "delivered" ? '<span class="badge badge-unpaid" style="background:rgba(241,196,15,.15);color:#f1c40f">Menunggu Setoran</span>' : '<span class="badge badge-completed">Selesai</span>'}
      </div>
      <div class="text-sm mb-4">
        <div class="mb-2"><i class="fas fa-user mr-2" style="color:var(--accent)"></i>${o.customer_name || (getUser(o.user_id)?.name || getUser(o.user_id)?.email || '—')}</div>
        <div class="mb-1"><i class="fas fa-phone mr-2" style="color:var(--accent)"></i>${o.customer_phone || (getUser(o.user_id)?.phone || '—')}</div>
        <div class="mb-1"><i class="fas fa-map-marker-alt mr-2" style="color:var(--accent)"></i>${o.delivery_address}</div>
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
        <div class="flex justify-between text-xs mt-1" style="color:var(--muted)"><span>Metode Pembayaran</span><span>${o.payment_method === 'qris' ? 'QRIS' : o.payment_method === 'bank_transfer' ? 'Transfer Bank' : o.payment_method === 'digital' ? 'Digital' : o.payment_method === "" ? 'Bayar Nanti (COD)' : 'Tunai/COD'}</span></div>
        <div class="flex justify-between text-xs mt-1" style="color:var(--muted)"><span>Status Bayar</span><span class="badge ${o.status === "delivered" ? "badge-unpaid" : o.payment_status === "paid" ? "badge-paid" : "badge-unpaid"}" ${o.status === "delivered" ? 'style="background:rgba(241,196,15,.15);color:#f1c40f"' : ""}>${o.status === "delivered" ? "Belum Setor" : o.payment_status === "paid" ? "Lunas" : "Belum Bayar"}</span></div>
        <div class="flex justify-between text-xs mt-1" style="color:var(--muted)"><span>Waktu Selesai</span><span>${formatTime(o.created_at)}</span></div>
      </div>
      <button onclick="closeModal()" class="btn-secondary w-full mt-4 text-center">Tutup</button>
    </div>
  `);
}
