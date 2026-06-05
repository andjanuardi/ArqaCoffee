// ============================================================
// COURIER VIEW — Available & Reject
// ============================================================
function renderCourierView() {
  const tab = State.currentTab.courier || "available";
  if (tab === "available") return renderCourierAvailable();
  if (tab === "active") return renderCourierActive();
  if (tab === "history") return renderCourierHistory();
  if (tab === "profile") return renderCourierProfile();
  return renderCourierAvailable();
}

function renderCourierAvailable() {
  const hasActive = DB.orders.some(o => o.courier_id === State.currentUser.id && o.status === "delivering");
  const today = new Date().toISOString().split('T')[0];
  const hasCheckedIn = DB.attendances.some(a => a.user_id === State.currentUser.id && !a.check_out && new Date(a.check_in).toISOString().split('T')[0] === today);
  const available = DB.orders.filter(
    (o) =>
      o.order_type === "delivery" &&
      o.status === "ready" &&
      (!o.courier_id || o.courier_id === State.currentUser.id),
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
    <h2 class="font-display text-xl font-bold mb-4">Pesanan Tersedia</h2>
    <div class="space-y-3">
      ${!hasCheckedIn ? '<div class="card text-center py-6" style="border-color:rgba(231,76,60,.2)"><i class="fas fa-clipboard-list text-3xl mb-2" style="color:var(--danger)"></i><p class="text-sm font-semibold mb-1" style="color:var(--danger)">Belum Check-in Hari Ini</p><p class="text-xs mb-3" style="color:var(--muted)">Lakukan check-in di profil sebelum mengambil pesanan</p><button onclick="State.currentTab.courier=\'profile\';render()" class="btn-primary text-sm px-5 py-2" style="font-size:13px"><i class="fas fa-clock mr-1"></i>Check-in di Profil</button></div>' : hasActive ? '<div class="card text-center py-6" style="border-color:rgba(243,156,18,.2)"><i class="fas fa-route text-3xl mb-2" style="color:var(--warning)"></i><p class="text-sm font-semibold mb-1" style="color:var(--warning)">Ada Pengantaran Aktif</p><p class="text-xs" style="color:var(--muted)">Selesaikan pengantaran aktif sebelum mengambil pesanan baru</p></div>' : available.length === 0 ? '<div class="text-center py-12"><i class="fas fa-box-open text-4xl mb-3" style="color:var(--border)"></i><p style="color:var(--muted)">Belum ada pesanan siap diantar</p></div>' : available
        .map(
          (o) => {
          const distStr = getCafeToCustDist(o);
          return `
      <div class="card">
        <div class="flex justify-between items-start mb-1">
          <div>
            <span class="font-bold">#${o.id.slice(-5).toUpperCase()}</span>
            ${o.payment_status === 'paid' ? '<span class="badge badge-paid ml-2">Lunas</span>' : '<span class="badge badge-unpaid ml-2">Belum Bayar</span>'}
          </div>
          <span class="font-bold" style="color:var(--accent)">${formatCurrency(o.total_amount)}</span>
        </div>
        <div class="text-xs mb-1" style="color:var(--muted)">${formatDate(o.created_at)} ${formatTime(o.created_at)}</div>
        <div class="text-xs mb-1" style="color:var(--muted)"><i class="fas fa-user mr-1" style="color:var(--accent)"></i>${o.customer_name || (getUser(o.user_id)?.name || getUser(o.user_id)?.email || '—')}</div>
        <div class="text-xs mb-1" style="color:var(--muted)"><i class="fas fa-phone mr-1" style="color:var(--accent)"></i>${o.customer_phone || (getUser(o.user_id)?.phone || '—')}</div>
        <div class="text-sm mb-1"><i class="fas fa-map-marker-alt mr-1" style="color:var(--accent)"></i>${o.delivery_address}</div>
        ${o.delivery_detail ? `<div class="text-xs mb-1" style="color:var(--muted)"><i class="fas fa-info-circle mr-1"></i>${o.delivery_detail}</div>` : ""}
        ${o.shipping_cost && o.shipping_cost > 0 ? `<div class="text-xs mb-1" style="color:var(--accent)"><i class="fas fa-truck mr-1"></i>Ongkos Kirim: <b>${formatCurrency(o.shipping_cost)}</b></div>` : ""}
        ${o.payment_status === "paid" && o.shipping_cost > 0 ? `<div class="text-xs mb-1" style="color:var(--success)"><i class="fas fa-hand-holding-dollar mr-1"></i>Ongkir dari kasir: <b>${formatCurrency(o.shipping_cost)}</b></div>` : ""}
        ${distStr ? `<div class="text-xs mb-2" style="color:var(--accent)"><i class="fas fa-store mr-1"></i>Cafe → Pelanggan: ${distStr}</div>` : ''}
        <div class="space-y-1 mb-3">${o.items.filter(i => i.status !== "rejected")
          .map((i) => {
            const mi = getMenuItem(i.menu_item_id);
            if (!mi) return "";
            const isMitra = !!mi.submitted_by;
            const badge = isMitra
              ? `<span class="text-[10px] px-2 py-0.5 rounded font-medium" style="background:rgba(232,67,147,.15);color:#e84393"><i class="fas fa-handshake mr-0.5"></i>Mitra: ${mi.submitted_by}</span>`
              : `<span class="text-[10px] px-2 py-0.5 rounded font-medium" style="background:rgba(224,122,58,.15);color:var(--accent)"><i class="fas fa-store mr-0.5"></i>Arqa Coffee</span>`;
            return `<div class="flex items-center gap-2 text-xs" style="color:var(--muted)"><span>${mi.name} x${i.quantity}</span>${badge}</div>`;
          })
          .join("")}</div>
        <div class="flex gap-2">
          <button onclick="rejectCourierOrder('${o.id}')" class="btn-sm flex-1 text-center" style="background:rgba(231,76,60,.1);color:var(--danger);border:none;padding:10px;border-radius:10px;font-size:13px;font-weight:600"><i class="fas fa-times mr-1"></i>Tolak</button>
          <button onclick="acceptDelivery('${o.id}')" class="btn-primary flex-1 text-center">Ambil Pesanan</button>
        </div>
      </div>`;
        })
        .join("")}
    </div>
  </div>`;
}

function courierCheckIn() {
  DB.attendances.push({
    id: 'a' + Date.now(),
    user_id: State.currentUser.id,
    check_in: new Date().toISOString(),
    check_out: null,
    status: 'present',
  });
  showToast('Check-in berhasil', 'success');
  render();
}

function courierCheckOut() {
  const today = new Date().toISOString().split('T')[0];
  const att = DB.attendances.find(a => a.user_id === State.currentUser.id && !a.check_out && new Date(a.check_in).toISOString().split('T')[0] === today);
  if (!att) { showToast('Belum check-in hari ini', 'warning'); return; }
  att.check_out = new Date().toISOString();
  showToast('Check-out berhasil', 'success');
  render();
}

function updateCourierPosDisplay(lat, lng) {
  const cl = document.getElementById('courier-pos-coords');
  const dl = document.getElementById('courier-pos-distance');
  if (cl) cl.textContent = lat.toFixed(5) + ', ' + lng.toFixed(5);
  if (dl && DB.cafe) {
    const d = calcDistance(lat, lng, DB.cafe.location.lat, DB.cafe.location.lng);
    const meter = Math.round(d).toLocaleString('id-ID');
    const km = (d / 1000).toFixed(1).replace('.', ',');
    if (d < 1000) {
      dl.innerHTML = '<span style="color:var(--muted)">Jarak ke kafe: </span><span style="color:var(--accent)">' + meter + ' meter</span>';
    } else {
      dl.innerHTML = '<span style="color:var(--muted)">Jarak ke kafe: </span><span style="color:var(--accent)">' + meter + ' m (' + km + ' km)</span>';
    }
  }
}

function saveCourierPosition() {
  if (!State.courierPosition) {
    showToast('Seret marker untuk menentukan posisi terlebih dahulu', 'warning');
    return;
  }
  showToast('Posisi simulasi disimpan', 'success');
  render();
}

function resetCourierPosition() {
  State.courierPosition = null;
  showToast('Kembali menggunakan posisi GPS real', 'info');
  render();
}

function renderCourierProfile() {
  if (State.mapInstances['courier-position']) {
    State.mapInstances['courier-position'].remove();
    delete State.mapInstances['courier-position'];
  }
  const u = State.currentUser;
  const today = new Date().toISOString().split('T')[0];
  const att = DB.attendances.find(a => a.user_id === u.id && !a.check_out && new Date(a.check_in).toISOString().split('T')[0] === today);
  const cafe = DB.cafe.location;
  return `
  <div class="animate-fade-up">
    <div class="card text-center mb-4">
      <div class="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold" style="background:var(--accent);color:#fff">${u.avatar}</div>
      <h3 class="font-semibold text-lg">${u.name}</h3>
      <p class="text-sm" style="color:var(--muted)">${u.email}</p>
      <p class="text-sm" style="color:var(--muted)">${u.phone}</p>
      <div class="mt-4 space-y-3 text-left">
        <div class="card" style="border-color:rgba(39,174,96,.3)">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:${att ? 'rgba(39,174,96,.15)' : 'rgba(231,76,60,.15)'};color:${att ? 'var(--success)' : 'var(--danger)'}"><i class="fas fa-clock"></i></div>
            <div class="flex-1">
              <div class="font-semibold text-sm" style="color:${att ? 'var(--success)' : 'var(--danger)'}">${att ? 'Sedang Bekerja' : 'Belum Check-in'}</div>
              <div class="text-xs" style="color:var(--muted)">${att ? 'Check-in: ' + formatTime(att.check_in) : 'Lakukan check-in untuk mulai bertugas'}</div>
            </div>
          </div>
          ${att
            ? `<button onclick="courierCheckOut()" class="btn-secondary w-full text-center" style="background:rgba(231,76,60,.1);color:var(--danger);border-color:transparent;"><i class="fas fa-sign-out-alt mr-1"></i>Check Out</button>`
            : `<button onclick="courierCheckIn()" class="btn-primary w-full text-center"><i class="fas fa-sign-in-alt mr-1"></i>Check In</button>`}
        </div>
        <div class="card" style="border-color:rgba(52,152,219,.3)">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:rgba(52,152,219,.15);color:#3498db"><i class="fas fa-location-dot"></i></div>
            <div class="flex-1">
              <div class="font-semibold text-sm">Posisi Simulasi</div>
              <div class="text-xs" style="color:var(--muted)">Seret marker untuk menyesuaikan posisi</div>
            </div>
          </div>
          <div id="map-courier-position" style="height:220px;border-radius:12px;margin-bottom:10px;overflow:hidden"></div>
          <div class="flex items-center justify-between text-xs mb-2 px-1" style="color:var(--muted)">
            <span id="courier-pos-coords">Memuat...</span>
            <span id="courier-pos-distance"></span>
          </div>
          <div class="flex gap-2">
            <button onclick="saveCourierPosition()" class="btn-primary flex-1 text-center" style="font-size:13px"><i class="fas fa-floppy-disk mr-1"></i>Simpan</button>
            <button onclick="resetCourierPosition()" class="btn-secondary flex-1 text-center" style="font-size:13px"><i class="fas fa-rotate-left mr-1"></i>Reset GPS</button>
          </div>
        </div>
        <div class="card flex items-center gap-3 cursor-pointer" onclick="handleLogout()">
          <i class="fas fa-right-from-bracket" style="color:var(--danger)"></i>
          <span class="text-sm flex-1">Keluar dari Akun</span>
          <i class="fas fa-chevron-right" style="color:var(--muted);font-size:12px"></i>
        </div>
      </div>
    </div>
  </div>`;
}

function toggleCourierStatus() {
  State.courierStatus = State.courierStatus === "online" ? "offline" : "online";
  showToast(State.courierStatus === "online" ? 'Kamu sekarang Aktif — siap menerima pesanan' : 'Kamu sekarang Tidak Aktif', State.courierStatus === "online" ? 'success' : 'info');
  render();
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
