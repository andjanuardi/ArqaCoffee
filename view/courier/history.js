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
  const o = DB.orders.find(x => x.id === orderId);
  const tracks = DB.courierTracking.filter((t) => t.order_id === orderId);
  const last =
    tracks.length > 0
      ? tracks[tracks.length - 1]
      : { latitude: DB.cafe.location.lat, longitude: DB.cafe.location.lng };
  const map = L.map(el).setView([last.latitude, last.longitude], 19);
  L.tileLayer(
    "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
    { maxZoom: 20, attribution: "Google" },
  ).addTo(map);
  L.marker([last.latitude, last.longitude], {
    icon: L.divIcon({ html: '<i class="fas fa-motorcycle" style="color:#e07a3a;font-size:24px"></i>', className: '', iconSize: [24, 24], iconAnchor: [12, 12] })
  })
    .addTo(map)
    .bindPopup("Posisi Kurir")
    .openPopup();
  if (tracks.length > 1) {
    const polyline = tracks.map((t) => [t.latitude, t.longitude]);
    L.polyline(polyline, { color: "#e07a3a", weight: 3, opacity: 0.8 }).addTo(
      map,
    );
  }
  if (o && o.delivery_location && o.delivery_location.lat) {
    L.marker([o.delivery_location.lat, o.delivery_location.lng], {
      icon: L.divIcon({ html: '<i class="fas fa-map-marker-alt" style="color:#e74c3c;font-size:24px"></i>', className: '', iconSize: [24, 24], iconAnchor: [12, 24] })
    })
      .addTo(map)
      .bindPopup("Lokasi Pelanggan");
    if (tracks.length <= 1) {
      L.polyline(
        [[last.latitude, last.longitude], [o.delivery_location.lat, o.delivery_location.lng]],
        { color: "#e07a3a", weight: 2, opacity: 0.6, dashArray: "8, 8" }
      ).addTo(map);
    }
    const bounds = L.latLngBounds(
      [last.latitude, last.longitude],
      [o.delivery_location.lat, o.delivery_location.lng]
    );
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 19 });
  }

  const mitraNames = [...new Set((o?.items || []).map(i => {
    const mi = getMenuItem(i.menu_item_id);
    return mi?.submitted_by || null;
  }).filter(Boolean))];
  const mitraBounds = [];
  mitraNames.forEach(name => {
    const pos = State.mitraPositions[name] || DB.users.find(u => u.name === name)?.mitra_position;
    if (!pos) return;
    L.marker([pos.lat, pos.lng], {
      icon: L.divIcon({ html: '<div style="width:36px;height:36px;background:#e84393;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,.3);border:3px solid #fff"><i class="fas fa-hat-chef" style="color:#fff;font-size:16px"></i></div><div style="width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:7px solid #e84393;margin:-2px auto 0"></div>', className: '', iconSize: [36, 43], iconAnchor: [18, 25] })
    })
      .addTo(map)
      .bindPopup('Lokasi Mitra: ' + name);
    mitraBounds.push([pos.lat, pos.lng]);
  });
  if (mitraBounds.length > 0) {
    const allBounds = L.latLngBounds(mitraBounds);
    if (o && o.delivery_location && o.delivery_location.lat) {
      allBounds.extend([o.delivery_location.lat, o.delivery_location.lng]);
    }
    allBounds.extend([last.latitude, last.longitude]);
    map.fitBounds(allBounds, { padding: [40, 40], maxZoom: 19 });
  }

  State.mapInstances[orderId] = map;
}

function renderCourierHistory() {
  let done = DB.orders.filter(
    (o) =>
      o.courier_id === State.currentUser.id &&
      (o.status === "completed" || o.status === "delivered"),
  );
  const dateFilter = State.courierDateFilter || new Date().toLocaleDateString('sv-SE');
  if (dateFilter) {
    const s = new Date(dateFilter);
    s.setHours(0, 0, 0, 0);
    const e = new Date(dateFilter);
    e.setHours(23, 59, 59, 999);
    done = done.filter((o) => new Date(o.created_at) >= s && new Date(o.created_at) <= e);
  }
  const totalSetor = done.filter(o => o.status === "delivered").reduce((s, o) => s + (o.total_amount || 0), 0);
  const totalOngkir = done.reduce((s, o) => {
    const fee = calcCourierFee(o.shipping_cost);
    return s + (o.shipping_cost || 0) - fee;
  }, 0);
  const totalSemuaAmount = done.reduce((s, o) => s + (o.total_amount || 0), 0);
  const totalTransaksi = totalSemuaAmount + totalOngkir;
  const totalOngkirBelum = done.filter(o => o.ongkir_status === "unpaid").reduce((s, o) => s + (o.shipping_cost || 0), 0);
  done.sort((a, b) => {
    const aHasBtn = a.payment_method !== "cod" && a.ongkir_status === "paid";
    const bHasBtn = b.payment_method !== "cod" && b.ongkir_status === "paid";
    if (aHasBtn && !bHasBtn) return -1;
    if (!aHasBtn && bHasBtn) return 1;
    if (a.status === "delivered" && b.status !== "delivered") return -1;
    if (a.status !== "delivered" && b.status === "delivered") return 1;
    return new Date(b.created_at) - new Date(a.created_at);
  });
  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Riwayat Pengantaran</h2>
    <div class="flex gap-2 mb-4">
      <div class="flex-1">
        <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Tanggal</label>
        <input type="date" id="courier-date-filter" class="input-field w-full" value="${dateFilter}" onchange="State.courierDateFilter=this.value;render()">
      </div>
    </div>
    <div class="grid grid-cols-4 gap-2 mb-4">
      <div class="stat-card text-center">
        <div class="text-xs" style="color:var(--muted)">Total Transaksi</div>
        <div class="text-sm font-bold mt-1" style="color:var(--accent)">${formatCurrency(totalTransaksi)}</div>
      </div>
      <div class="stat-card text-center">
        <div class="text-xs" style="color:var(--muted)">Harus Disetor</div>
        <div class="text-sm font-bold mt-1" style="color:${totalSetor > 0 ? 'var(--danger)' : 'var(--success)'}">${formatCurrency(totalSetor)}</div>
      </div>
      <div class="stat-card text-center">
        <div class="text-xs" style="color:var(--muted)">Ongkir Pesanan</div>
        <div class="text-sm font-bold mt-1" style="color:${totalOngkirBelum > 0 ? 'var(--warning)' : 'var(--success)'}">${totalOngkirBelum > 0 ? formatCurrency(totalOngkirBelum) : 'Rp 0'}</div>
      </div>
      <div class="stat-card text-center">
        <div class="text-xs" style="color:var(--muted)">Total Pendapatan</div>
        <div class="text-sm font-bold mt-1" style="color:var(--success)">${formatCurrency(totalOngkir)}</div>
      </div>
    </div>
    <div class="space-y-2">
      ${done.length === 0 ? '<p class="text-center py-8 text-sm" style="color:var(--muted)">Belum ada riwayat</p>' : ""}
      ${done
        .map(
          (o) => `
      <div class="card cursor-pointer hover:scale-[1.02] transition-transform" onclick="showCourierOrderDetail('${o.id}')">
        <div class="flex justify-between items-start pb-1">
          <div class="flex-1 min-w-0">
            <div class="flex flex-wrap items-center gap-1">
              <span class="font-semibold text-sm">#${o.id.slice(-5).toUpperCase()}</span>
              ${o.status === "delivered" ? '<span class="badge badge-unpaid" style="background:rgba(241,196,15,.15);color:#f1c40f;font-size:9px">Belum Setor</span>' : (o.payment_method === "cod" ? '<span class="badge" style="background:rgba(46,204,113,.15);color:var(--success);font-size:9px">Setoran Selesai</span>' : '<span class="badge badge-completed" style="font-size:9px">Selesai</span>')}
              ${o.shipping_cost > 0 && o.ongkir_status === "unpaid" ? '<span class="badge" style="background:rgba(241,196,15,.15);color:#f1c40f;font-size:9px">Ongkir Blm Diambil</span>' : ''}
              ${o.shipping_cost > 0 && o.ongkir_status === "paid" ? (o.payment_method === "cod" ? '<span class="badge" style="background:rgba(52,152,219,.15);color:#3498db;font-size:9px">Ongkir Siap</span>' : '<span class="badge" style="background:rgba(52,152,219,.15);color:#3498db;font-size:9px">Ongkir Diterima</span>') : ''}
              ${o.shipping_cost > 0 && o.ongkir_status === "confirmed" ? '<span class="badge" style="background:rgba(46,204,113,.15);color:var(--success);font-size:9px">Ongkir Diterima</span>' : ''}
            </div>
            <div class="text-xs" style="color:var(--muted)"><i class="fas fa-user mr-1" style="color:var(--accent)"></i>${o.customer_name || (getUser(o.user_id)?.name || getUser(o.user_id)?.email || '—')}</div>
            <div class="text-xs" style="color:var(--muted)"><i class="fas fa-map-marker-alt mr-1" style="color:var(--accent)"></i>${o.delivery_address?.slice(0, 30) || ""}</div>${o.delivery_detail ? `<div class="text-xs" style="color:var(--muted)">${o.delivery_detail?.slice(0, 30) || ""}</div>` : ""}
          </div>
          <div class="flex flex-col items-end gap-1.5 flex-shrink-0">
            <div class="text-[10px] whitespace-nowrap" style="color:var(--muted)">${formatDate(o.created_at)} ${formatTime(o.created_at)}</div>
            ${o.payment_method === "cod" ? `<span class="font-bold text-sm" style="color:var(--accent)">${formatCurrency(o.total_amount)}</span>` : `<span class="font-bold text-sm" style="color:var(--accent)">${formatCurrency(o.total_amount)}</span>`}
          </div>
        </div>
        ${o.shipping_cost > 0 ? `<div class="border-t pt-1.5 mt-1.5" style="border-color:var(--border)">
          ${o.payment_method === "cod" && o.status === "delivered" ? `<div class="text-xs mb-0.5" style="color:var(--danger)"><i class="fas fa-hand-holding-dollar mr-1"></i>Total Setor: ${formatCurrency(o.total_amount - o.shipping_cost + calcCourierFee(o.shipping_cost))}</div>` : (o.payment_method === "cod" && o.status !== "delivered" ? `<div class="flex items-center justify-between">
            <span class="text-xs" style="color:var(--success)"><i class="fas fa-wallet mr-1"></i>Pendapatan: ${formatCurrency(o.shipping_cost - calcCourierFee(o.shipping_cost))}</span>
            <span class="text-xs" style="color:var(--success)"><i class="fas fa-check-circle mr-1"></i>Setor Selesai</span>
          </div>` : (o.ongkir_status === "unpaid" ? `<div class="text-xs mb-0.5" style="color:#f1c40f"><i class="fas fa-hand-holding-dollar mr-1"></i>Ongkir Belum Diambil: ${formatCurrency(o.shipping_cost - calcCourierFee(o.shipping_cost))}</div>` : ""))}
          ${o.payment_method !== "cod" && o.ongkir_status === "paid" ? `<div class="flex items-center justify-between">
            <span class="text-xs" style="color:var(--muted)"><i class="fas fa-info-circle mr-1"></i>Ongkir Telah Diberikan Kasir</span>
            <button onclick="event.stopPropagation();confirmOngkir('${o.id}')" class="btn-primary btn-sm text-center whitespace-nowrap" style="font-size:11px;padding:5px 12px"><i class="fas fa-check mr-1"></i>Konfirmasi Terima</button>
          </div>` : ""}
          ${o.payment_method !== "cod" && o.ongkir_status === "confirmed"
            ? `<div class="flex items-center justify-between">
            <span class="text-xs" style="color:var(--success)"><i class="fas fa-wallet mr-1"></i>Pendapatan: ${formatCurrency(o.shipping_cost - calcCourierFee(o.shipping_cost))}</span>
            <span class="text-xs" style="color:var(--success)"><i class="fas fa-check-circle mr-1"></i>Ongkir Diterima</span>
          </div>`
            : (!(o.payment_method === "cod" && o.status !== "delivered")
              ? `<div class="text-xs" style="color:var(--success)"><i class="fas fa-wallet mr-1"></i>Pendapatan: ${formatCurrency(o.shipping_cost - calcCourierFee(o.shipping_cost))}</div>`
              : "")}
        </div>` : ""}
      </div>`,
        )
        .join("")}
    </div>
  </div>`;
}

function confirmOngkir(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  o.ongkir_status = "confirmed";
  if (o.shipping_cost > 0) {
    var kurir = getUser(o.courier_id);
    DB.expenses.push({
      id: 'e' + Date.now(),
      date: new Date().toLocaleDateString('sv-SE'),
      time: new Date().toTimeString().slice(0, 5),
      category: 'Operasional',
      amount: o.shipping_cost - calcCourierFee(o.shipping_cost),
      note: 'Ongkir kurir #' + o.id.slice(-5).toUpperCase() + ' — ' + (kurir ? kurir.name : 'Kurir'),
      source: 'Cafe',
      orderType: 'delivery',
      paymentMethod: 'digital',
    });
  }
  addNotification({
    title: 'Ongkir Dikonfirmasi',
    message: '#' + o.id.slice(-5).toUpperCase() + ' — Kurir telah menerima ongkir ' + formatCurrency(o.shipping_cost - calcCourierFee(o.shipping_cost)),
    type: 'payment',
    icon: 'fa-check-circle',
    targetRoles: ['cashier', 'admin', 'manager'],
    relatedOrderId: o.id,
  });
  showToast("Ongkir " + formatCurrency(o.shipping_cost - calcCourierFee(o.shipping_cost)) + " telah diterima", "success");
  render();
}

function showCourierOrderDetail(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  showModal(`
    <div>
      <div class="flex justify-between items-start mb-4">
        <h3 class="font-display text-lg font-bold">Pesanan #${o.id.slice(-5).toUpperCase()}</h3>
        ${o.status === "delivered" ? '<span class="badge badge-unpaid" style="background:rgba(241,196,15,.15);color:#f1c40f">Menunggu Setoran</span>' : (o.payment_method === "cod" ? '<span class="badge" style="background:rgba(46,204,113,.15);color:var(--success)">Setoran Selesai</span>' : '<span class="badge badge-completed">Selesai</span>')}
      </div>
      <div class="text-sm mb-4">
        <div class="mb-2"><i class="fas fa-user mr-2" style="color:var(--accent)"></i>${o.customer_name || (getUser(o.user_id)?.name || getUser(o.user_id)?.email || '—')}</div>
        <div class="mb-1"><i class="fas fa-phone mr-2" style="color:var(--accent)"></i>${o.customer_phone || (getUser(o.user_id)?.phone || '—')}</div>
        <div class="mb-1"><i class="fas fa-map-marker-alt mr-2" style="color:var(--accent)"></i>${o.delivery_address}</div>
        ${o.delivery_detail ? `<div class="text-xs mt-1" style="color:var(--muted)"><i class="fas fa-info-circle mr-1"></i>${o.delivery_detail}</div>` : ""}
      </div>
      <div class="p-3 rounded-xl mb-3" style="background:var(--bg2)">
        <div class="text-xs font-semibold mb-2" style="color:var(--muted)"><i class="fas fa-receipt mr-1"></i>Rincian Pesanan</div>
        ${o.items.filter(i => i.status !== "rejected").map(i => {
          const mi = getMenuItem(i.menu_item_id);
          return mi ? `<div class="flex justify-between text-xs mb-1"><span>${mi.name} x${i.quantity}</span><span>${formatCurrency(i.unit_price * i.quantity)}</span></div>` : '';
        }).join('')}
        <div class="border-t pt-2 mt-2" style="border-color:var(--border)">
          <div class="flex justify-between text-xs mb-1"><span style="color:var(--muted)">Subtotal</span><span>${formatCurrency(o.items.reduce((s, i) => s + i.unit_price * i.quantity, 0))}</span></div>
          ${o.promo_discount > 0 ? `<div class="flex justify-between text-xs mb-1" style="color:var(--success)"><span><i class="fas fa-tag mr-1"></i>Diskon Promo</span><span>-${formatCurrency(o.promo_discount)}</span></div>` : ''}
          <div class="flex justify-between text-xs mb-1"><span style="color:var(--muted)"><i class="fas fa-receipt mr-1"></i>Pajak</span><span>${formatCurrency(Math.round(calcItemTax(o.items)))}</span></div>
          ${o.service_fee > 0 ? `<div class="flex justify-between text-xs mb-1"><span style="color:var(--muted)"><i class="fas fa-hand-holding-dollar mr-1"></i>Biaya Layanan</span><span>${formatCurrency(o.service_fee)}</span></div>` : ''}
          ${o.shipping_cost && o.shipping_cost > 0 ? `<div class="flex justify-between text-xs mb-1"><span style="color:var(--muted)"><i class="fas fa-truck mr-1"></i>Ongkos Kirim</span><span style="color:var(--accent)">${formatCurrency(o.shipping_cost)}</span></div>` : ''}
          <div class="flex justify-between font-bold text-sm mt-1"><span>Total</span><span style="color:var(--accent)">${formatCurrency(o.total_amount)}</span></div>
        </div>
      </div>
      <div class="flex justify-between text-xs mb-1" style="color:var(--muted)"><span>Metode Pembayaran</span><span>${o.payment_method === 'qris' ? 'QRIS' : o.payment_method === 'bank_transfer' ? 'Transfer Bank' : o.payment_method === 'digital' ? 'Digital' : o.payment_method === "" ? 'Bayar Nanti (COD)' : 'Tunai/COD'}</span></div>
      <div class="flex justify-between text-xs mb-1" style="color:var(--muted)"><span>Status Bayar</span><span class="badge ${o.status === "delivered" ? "badge-unpaid" : o.payment_status === "paid" ? "badge-paid" : "badge-unpaid"}" ${o.status === "delivered" ? 'style="background:rgba(241,196,15,.15);color:#f1c40f"' : ""}>${o.status === "delivered" ? "Belum Setor" : o.payment_status === "paid" ? "Lunas" : "Belum Bayar"}</span></div>
      <div class="border-t pt-3 mt-3" style="border-color:var(--border)">
        ${o.shipping_cost > 0 && o.ongkir_status ? `<div class="flex justify-between text-xs mb-1" style="color:${o.ongkir_status === "confirmed" ? "var(--success)" : o.ongkir_status === "paid" ? "#3498db" : "#f1c40f"}"><span><i class="fas fa-hand-holding-dollar mr-1"></i>Status Ongkir</span><span>${o.ongkir_status === "unpaid" ? "Belum Diambil" : o.ongkir_status === "paid" ? "Siap Diambil" : "Sudah Diterima"}</span></div>` : ""}
        ${o.shipping_cost && o.shipping_cost > 0 ? `<div class="flex justify-between text-xs mb-1" style="color:var(--muted)"><span><i class="fas fa-hand-holding-dollar mr-1"></i>Jasa Aplikasi</span><span style="color:var(--danger)">-${formatCurrency(calcCourierFee(o.shipping_cost))}</span></div>
        <div class="flex justify-between text-xs mb-2 pb-2" style="border-bottom:1px dashed var(--border);color:var(--success)"><span><i class="fas fa-wallet mr-1"></i>Pendapatan Ongkir</span><span>${formatCurrency(o.shipping_cost - calcCourierFee(o.shipping_cost))}</span></div>` : ""}
        <div class="flex justify-between text-xs" style="color:var(--muted)"><span>Waktu Selesai</span><span>${formatTime(o.created_at)}</span></div>
        ${o.delivery_location && o.delivery_location.lat ? (function() {
          const d = calcDistance(DB.cafe.location.lat, DB.cafe.location.lng, o.delivery_location.lat, o.delivery_location.lng);
          const meter = Math.round(d).toLocaleString('id-ID');
          const km = (d / 1000).toFixed(1).replace('.', ',');
          const label = d < 1000 ? meter + ' meter' : meter + ' m (' + km + ' km)';
          return `<div class="flex justify-between text-xs mt-1" style="color:var(--accent)"><span><i class="fas fa-store mr-1"></i>Cafe → Pelanggan</span><span>${label}</span></div>`;
        })() : ""}
      </div>
      <button onclick="closeModal()" class="btn-secondary w-full mt-4 text-center">Tutup</button>
    </div>
  `);
}
