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
        <div class="p-3 rounded-xl mb-3" style="background:var(--bg2)">
          <div class="text-xs font-semibold mb-2" style="color:var(--muted)"><i class="fas fa-user-circle mr-1"></i>Informasi Pelanggan</div>
          <div class="space-y-1.5">
            <div class="flex items-center gap-2 text-xs"><div class="w-6 text-center"><i class="fas fa-user" style="color:var(--accent)"></i></div><span>${o.customer_name || (getUser(o.user_id)?.name || getUser(o.user_id)?.email || '—')}</span></div>
            <div class="flex items-center gap-2 text-xs"><div class="w-6 text-center"><i class="fas fa-phone" style="color:var(--accent)"></i></div><span>${o.customer_phone || (getUser(o.user_id)?.phone || '—')}</span></div>
            <div class="flex items-center gap-2 text-xs"><div class="w-6 text-center"><i class="fas fa-map-marker-alt" style="color:var(--accent)"></i></div><span>${o.delivery_address}</span></div>
            ${o.delivery_detail ? `<div class="flex items-center gap-2 text-xs"><div class="w-6 text-center"><i class="fas fa-info-circle" style="color:var(--accent)"></i></div><span>${o.delivery_detail}</span></div>` : ""}
          </div>
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
            ${o.shipping_cost && o.shipping_cost > 0 ? `<div class="flex justify-between text-xs mb-1"><span style="color:var(--muted)"><i class="fas fa-truck mr-1"></i>Ongkos Kirim</span><span style="color:var(--accent)">${formatCurrency(o.shipping_cost)}</span></div>` : ""}
            <div class="flex justify-between font-bold text-sm mt-1"><span>Total</span><span style="color:var(--accent)">${formatCurrency(o.total_amount)}</span></div>
          </div>
        </div>
        <div class="p-3 rounded-xl mb-3" style="background:var(--bg2)">
          <div class="text-xs font-semibold mb-2" style="color:var(--muted)"><i class="fas fa-truck mr-1"></i>Biaya Pengiriman</div>
          ${(() => { const fee = calcCourierFee(o.shipping_cost); return fee > 0 ? `<div class="flex justify-between text-xs mb-1"><span style="color:var(--muted)">Jasa Aplikasi</span><span style="color:var(--danger)">-${formatCurrency(fee)}</span></div>` : ''; })()}
          ${o.shipping_cost > 0 ? `<div class="flex justify-between text-xs mb-1"><span style="color:var(--muted)">Pendapatan Ongkir</span><span style="color:var(--success)">${formatCurrency((o.shipping_cost || 0) - calcCourierFee(o.shipping_cost))}</span></div>` : ""}
          ${(() => { const d = getCafeToCustDist(o); return d ? `<div class="flex justify-between text-xs"><span style="color:var(--muted)">Cafe → Pelanggan</span><span style="color:var(--accent)">${d}</span></div>` : ''; })()}
        </div>
        ${(() => {
          const mitraItems = o.items.filter(i => {
            const mi = getMenuItem(i.menu_item_id);
            return mi && mi.submitted_by;
          });
          const mitraNames = [...new Set(mitraItems.map(i => getMenuItem(i.menu_item_id).submitted_by))];
          const mitraPosHtml = mitraNames.map(name => {
            const pos = State.mitraPositions[name];
            let distHtml = '';
            if (pos && DB.cafe) {
              const d = calcDistance(DB.cafe.location.lat, DB.cafe.location.lng, pos.lat, pos.lng);
              const meter = Math.round(d).toLocaleString('id-ID');
              const km = (d / 1000).toFixed(1).replace('.', ',');
              const label = d < 1000 ? meter + ' meter' : meter + ' m (' + km + ' km)';
              distHtml = `<span style="color:var(--muted)">Cafe → Mitra: </span><span style="color:var(--accent)">${label}</span>`;
            }
            return `<div class="flex items-center gap-2 text-xs" style="color:var(--muted)"><i class="fas fa-hat-chef" style="color:#e84393;width:16px"></i><span onclick="focusMitraOnMap('${o.id}','${name}')" style="cursor:pointer;color:var(--accent);font-weight:600" title="Klik untuk fokus di peta">${name} <i class="fas fa-location-crosshairs" style="font-size:9px"></i></span>${pos ? `<span class="text-[10px] px-1.5 py-0.5 rounded" style="background:rgba(232,67,147,.1);color:#e84393">${pos.lat.toFixed(4)}, ${pos.lng.toFixed(4)}</span>` : '<span style="color:var(--danger)">Posisi belum diset</span>'}</div>${distHtml ? `<div class="text-xs ml-6 mb-1">${distHtml}</div>` : ''}`;
          }).join('');
          return mitraNames.length > 0 ? `<div class="p-3 rounded-xl mb-3" style="background:var(--bg2)"><div class="text-xs font-semibold mb-2" style="color:var(--muted)"><i class="fas fa-handshake mr-1"></i>Lokasi Ambil Pesanan Mitra</div>${mitraPosHtml}</div>` : '';
        })()}
        <div id="map-courier-${o.id}" class="mb-3" style="height:200px;border-radius:12px"></div>
        <div class="flex gap-2">
          <button onclick="showNavigationModal('${o.id}')" class="btn-secondary btn-sm flex-1 text-center"><i class="fas fa-map-signs mr-1"></i>Navigasi</button>
          <button onclick="openChatModal('${o.id}')" class="btn-secondary btn-sm flex-1 text-center" style="background:rgba(224,122,58,.1);color:var(--accent);border-color:transparent;position:relative"><i class="fas fa-comment-alt mr-1"></i>Chat${getOrderChatUnreadCount(o.id) > 0 ? `<span class="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold" style="background:var(--danger);color:#fff">${getOrderChatUnreadCount(o.id)}</span>` : ""}</button>
          <button onclick="completeDelivery('${o.id}')" class="btn-primary btn-sm flex-1 text-center"><i class="fas fa-check mr-1"></i>Selesai</button>
        </div>
      </div>`,
        )
        .join("")}
    </div>
  </div>`;
}

function showNavigationModal(orderId) {
  const o = DB.orders.find(x => x.id === orderId);
  if (!o) return;
  const courierPos = State.courierPosition || DB.cafe?.location;
  if (!courierPos) { showToast("Posisi kurir tidak diketahui", "error"); return; }
  const origin = `${courierPos.lat},${courierPos.lng}`;
  const dest = o.delivery_location?.lat ? `${o.delivery_location.lat},${o.delivery_location.lng}` : null;
  const mitraList = [...new Set((o.items || []).map(i => {
    const mi = getMenuItem(i.menu_item_id);
    return mi?.submitted_by || null;
  }).filter(Boolean))].map(name => ({ name, pos: State.mitraPositions[name] }));
  const hasDest = !!dest;
  const hasMitra = mitraList.some(m => m.pos);
  const waypoints = mitraList.filter(m => m.pos).map(m => `${m.pos.lat},${m.pos.lng}`);
  const routeUrl = waypoints.length > 0 && hasDest
    ? `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${dest}&waypoints=${waypoints.join('|')}&travelmode=driving`
    : hasDest
    ? `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${dest}&travelmode=driving`
    : null;
  const posSayaDist = courierPos && DB.cafe ? (() => {
    const d = calcDistance(courierPos.lat, courierPos.lng, DB.cafe.location.lat, DB.cafe.location.lng);
    const m = Math.round(d).toLocaleString('id-ID');
    return d < 1000 ? m + ' meter' : m + ' m (' + (d/1000).toFixed(1).replace('.',',') + ' km)';
  })() : '';
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4"><i class="fas fa-map-signs mr-2" style="color:var(--accent)"></i>Navigasi</h3>
      <div class="p-3 rounded-xl mb-4 flex items-center gap-3" style="background:rgba(39,174,96,.1);border:1px solid rgba(39,174,96,.2)">
        <div style="width:36px;height:36px;border-radius:50%;background:#27ae60;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fas fa-motorcycle" style="color:#fff;font-size:16px"></i></div>
        <div class="flex-1">
          <div class="text-sm font-semibold" style="color:var(--success)">Posisi Saya</div>
          <div class="text-xs" style="color:var(--muted)">${courierPos.lat.toFixed(5)}, ${courierPos.lng.toFixed(5)}</div>
          ${posSayaDist ? `<div class="text-xs" style="color:var(--muted)">Jarak ke kafe: <span style="color:var(--accent)">${posSayaDist}</span></div>` : ''}
        </div>
      </div>
      <p class="text-xs mb-3" style="color:var(--muted)">Pilih tujuan navigasi:</p>
      <div class="space-y-2">
        ${mitraList.map(m => m.pos ? `
        <button onclick="window.open('https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${m.pos.lat},${m.pos.lng}&travelmode=driving','_blank');closeModal()" class="btn-secondary w-full text-left flex items-center gap-3" style="padding:12px;border-radius:12px;font-size:13px">
          <div style="width:36px;height:36px;border-radius:50%;background:#e84393;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fas fa-hat-chef" style="color:#fff;font-size:14px"></i></div>
          <div class="flex-1"><span class="font-semibold">${m.name}</span><br><span style="color:var(--muted);font-size:11px">Lokasi ambil pesanan mitra</span></div>
          <i class="fas fa-chevron-right" style="color:var(--muted);font-size:12px"></i>
        </button>` : `<div class="flex items-center gap-3 p-3 rounded-xl" style="background:var(--bg2);font-size:13px"><div style="width:36px;height:36px;border-radius:50%;background:rgba(232,67,147,.15);display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fas fa-hat-chef" style="color:#e84393;font-size:14px"></i></div><div class="flex-1"><span class="font-semibold">${m.name}</span><br><span style="color:var(--danger);font-size:11px">Posisi belum diset mitra</span></div></div>`).join('')}
        ${hasDest ? `
        <button onclick="window.open('https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${dest}&travelmode=driving','_blank');closeModal()" class="btn-secondary w-full text-left flex items-center gap-3" style="padding:12px;border-radius:12px;font-size:13px">
          <div style="width:36px;height:36px;border-radius:50%;background:#e74c3c;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fas fa-map-marker-alt" style="color:#fff;font-size:14px"></i></div>
          <div class="flex-1"><span class="font-semibold">Lokasi Pelanggan</span><br><span style="color:var(--muted);font-size:11px">${o.delivery_address?.slice(0, 40) || ''}</span></div>
          <i class="fas fa-chevron-right" style="color:var(--muted);font-size:12px"></i>
        </button>` : ''}
        ${routeUrl ? `
        <div class="border-t pt-3 mt-3" style="border-color:var(--border)">
          <button onclick="window.open('${routeUrl}','_blank');closeModal()" class="btn-primary w-full text-center"><i class="fas fa-route mr-1"></i>Rute Lengkap (Mitra → Pelanggan)</button>
        </div>` : ''}
      </div>
      <button onclick="closeModal()" class="btn-secondary w-full mt-3 text-center">Tutup</button>
    </div>
  `);
}

function focusMitraOnMap(orderId, mitraName) {
  const map = State.mapInstances[orderId];
  const pos = State.mitraPositions[mitraName];
  if (!map || !pos) return;
  map.flyTo([pos.lat, pos.lng], 19, { duration: 1 });
  setTimeout(() => map.invalidateSize(), 300);
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
    notifyDeliveryCompleted(o);
    showToast("Pengantaran selesai! Ongkir " + formatCurrency(o.shipping_cost) + " dari kasir — jangan lupa ambil ongkir", "info");
  }
  render();
}
