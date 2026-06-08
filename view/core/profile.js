// ============================================================
// GENERIC PROFILE
// ============================================================
const ARQA_COORDS = DB.cafe?.location || { lat: -6.2088, lng: 106.8456 };
const ARQA_RADIUS = 200;

function calcDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function renderGenericProfile() {
  ['checkin-profile', 'checkin-preview'].forEach(k => {
    if (State.mapInstances[k]) { State.mapInstances[k].remove(); delete State.mapInstances[k]; }
  });
  const u = State.currentUser;
  const showAbsen = u.role !== 'admin';
  return `
  <div class="animate-fade-up">
    <div class="card text-center mb-4">
      <div class="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold" style="background:var(--accent);color:#fff">${u.avatar}</div>
      <h3 class="font-semibold text-lg">${u.name}</h3>
      ${u.business_name ? `<p class="text-xs mb-1" style="color:var(--accent)"><i class="fas fa-store mr-1"></i>${u.business_name}</p>` : ''}
      <p class="text-sm" style="color:var(--muted)">${u.email}</p>
      <p class="text-sm" style="color:var(--muted)">${u.phone}</p>
    </div>
    <div class="card mb-3 flex items-center gap-3 cursor-pointer" onclick="showEditProfileModal()">
      <i class="fas fa-pen-to-square" style="color:var(--accent)"></i>
      <span class="text-sm flex-1">Edit Profil</span>
      <i class="fas fa-chevron-right" style="color:var(--muted);font-size:12px"></i>
    </div>
    ${showAbsen ? `
    <div class="card mb-3 flex items-center gap-3 cursor-pointer" onclick="showGeoAttendanceModal()">
      <i class="fas fa-location-dot" style="color:#3498db"></i>
      <span class="text-sm flex-1">Absen Geospasial</span>
      <i class="fas fa-chevron-right" style="color:var(--muted);font-size:12px"></i>
    </div>` : ''}
    <div class="card mb-3 flex items-center gap-3 cursor-pointer" onclick="handleLogout()">
      <i class="fas fa-right-from-bracket" style="color:var(--danger)"></i>
      <span class="text-sm flex-1">Keluar dari Akun</span>
      <i class="fas fa-chevron-right" style="color:var(--muted);font-size:12px"></i>
    </div>
  </div>`;
}

function renderGeoAttendanceCard(u, att) {
  if (att) {
    return `
    <div class="card" style="border-color:rgba(39,174,96,.3)">
      <div class="flex items-center gap-3 mb-2">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:rgba(39,174,96,.15);color:var(--success)"><i class="fas fa-clock"></i></div>
        <div class="flex-1">
          <div class="font-semibold text-sm" style="color:var(--success)">Sedang Bekerja</div>
          <div class="text-xs" style="color:var(--muted)">Check-in: ${formatTime(att.check_in)}${att.lat ? ' — Lokasi tersimpan' : ''}</div>
        </div>
      </div>
      <button onclick="staffCheckOut()" class="btn-secondary w-full text-center" style="background:rgba(231,76,60,.1);color:var(--danger);border-color:transparent;">
        <i class="fas fa-sign-out-alt mr-1"></i>Check Out
      </button>
    </div>`;
  }
  return `
    <div class="card" style="border-color:rgba(52,152,219,.3)">
      <div class="flex items-center gap-3 mb-2">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:rgba(52,152,219,.15);color:#3498db"><i class="fas fa-location-dot"></i></div>
        <div class="flex-1">
          <div class="font-semibold text-sm">Absen Geospasial</div>
          <div class="text-xs" style="color:var(--muted)">Seret marker untuk menyesuaikan posisi</div>
        </div>
      </div>
      <div id="map-checkin-preview" style="height:220px;border-radius:12px;margin-bottom:10px;overflow:hidden"></div>
      <div class="flex items-center justify-between text-xs mb-2 px-1" style="color:var(--muted)">
        <span id="checkin-coords-label">Memuat lokasi...</span>
        <span id="checkin-radius-label"></span>
      </div>
      <button onclick="staffCheckIn()" class="btn-primary w-full text-center">
        <i class="fas fa-sign-in-alt mr-1"></i>Check In
      </button>
    </div>`;
}

function showGeoAttendanceModal() {
  const u = State.currentUser;
  const today = new Date().toLocaleDateString('sv-SE');
  const att = DB.attendances.find(a => a.user_id === u.id && !a.check_out && new Date(a.check_in).toLocaleDateString('sv-SE') === today);
  if (att) {
    showModal(`
      <div class="text-center">
        <div class="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl" style="background:rgba(39,174,96,.15);color:var(--success)">
          <i class="fas fa-clock"></i>
        </div>
        <h3 class="font-semibold text-sm mb-1" style="color:var(--success)">Sedang di Tempat</h3>
        <p class="text-xs mb-4" style="color:var(--muted)">Check-in: ${formatTime(att.check_in)}${att.lat ? ' — Lokasi tersimpan' : ''}</p>
        <button onclick="modalCheckOut()" class="btn-secondary w-full text-center" style="background:rgba(231,76,60,.1);color:var(--danger);border-color:transparent;padding:10px;border-radius:10px;cursor:pointer">
          <i class="fas fa-sign-out-alt mr-1"></i>Check Out
        </button>
      </div>
    `);
  } else {
    State.pendingCheckinCoords = null;
    showModal(`
      <h3 class="font-semibold text-sm mb-3"><i class="fas fa-location-dot mr-1" style="color:#3498db"></i>Absen Geospasial</h3>
      <p class="text-xs mb-3" style="color:var(--muted)">Seret marker untuk menyesuaikan posisi Anda</p>
      <div id="modal-checkin-map" style="height:240px;border-radius:12px;margin-bottom:10px;overflow:hidden"></div>
      <div class="flex items-center justify-between text-xs mb-3 px-1" style="color:var(--muted)">
        <span id="modal-checkin-coords">Memuat lokasi...</span>
        <span id="modal-checkin-radius"></span>
      </div>
      <button onclick="modalCheckIn()" class="btn-primary w-full text-center">
        <i class="fas fa-sign-in-alt mr-1"></i>Check In
      </button>
    `, function() { initModalCheckinMap(); });
  }
}

function initModalCheckinMap() {
  const el = document.getElementById('modal-checkin-map');
  if (!el || State.mapInstances['modal-checkin']) return;
  const map = L.map(el, { zoomControl: false, attributionControl: false }).setView([ARQA_COORDS.lat, ARQA_COORDS.lng], 19);
  L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', { maxZoom: 20, attribution: 'Google' }).addTo(map);
  L.circle([ARQA_COORDS.lat, ARQA_COORDS.lng], { radius: ARQA_RADIUS, color: '#3498db', fillColor: '#3498db', fillOpacity: 0.08 }).addTo(map);
  L.marker([ARQA_COORDS.lat, ARQA_COORDS.lng], {
    icon: L.divIcon({ html: '<i class="fas fa-store" style="color:#e07a3a;font-size:22px"></i>', className: '', iconSize: [22, 22], iconAnchor: [11, 11] })
  }).addTo(map).bindPopup('ARQA Coffee');
  State.mapInstances['modal-checkin'] = map;
  const upd = function(lat, lng) {
    State.pendingCheckinCoords = { lat, lng };
    const cl = document.getElementById('modal-checkin-coords');
    const rl = document.getElementById('modal-checkin-radius');
    if (cl) cl.textContent = lat.toFixed(5) + ', ' + lng.toFixed(5);
    if (rl) {
      const d = calcDistance(lat, lng, ARQA_COORDS.lat, ARQA_COORDS.lng);
      rl.innerHTML = d <= ARQA_RADIUS
        ? '<span style="color:var(--success)">\u2713 Dalam radius (' + Math.round(d) + 'm)</span>'
        : '<span style="color:var(--danger)">\u2717 Di luar radius (' + Math.round(d) + 'm)</span>';
    }
  };
  const mkMarker = function(lat, lng) {
    const m = L.marker([lat, lng], {
      draggable: true,
      icon: L.divIcon({ html: '<i class="fas fa-circle" style="color:#27ae60;font-size:20px"></i>', className: '', iconSize: [20, 20], iconAnchor: [10, 10] })
    }).addTo(map).bindPopup('Lokasi Anda (seret)').openPopup();
    m.on('dragend', function() { const p = m.getLatLng(); upd(p.lat, p.lng); });
    upd(lat, lng);
    map.fitBounds([[ARQA_COORDS.lat, ARQA_COORDS.lng], [lat, lng]], { padding: [40, 40], maxZoom: 19 });
    setTimeout(function() { map.invalidateSize(); }, 200);
  };
  mkMarker(ARQA_COORDS.lat, ARQA_COORDS.lng);
}

function modalCheckIn() {
  const coords = State.pendingCheckinCoords;
  if (!coords) { showToast('Tunggu lokasi dimuat...', 'warning'); return; }
  const dist = calcDistance(coords.lat, coords.lng, ARQA_COORDS.lat, ARQA_COORDS.lng);
  if (dist > ARQA_RADIUS) {
    showToast('Anda di luar radius kafe (' + Math.round(dist) + 'm). Check-in hanya dalam ' + ARQA_RADIUS + 'm', 'warning');
    return;
  }
  DB.attendances.push({
    id: 'a' + Date.now(),
    user_id: State.currentUser.id,
    check_in: new Date().toISOString(),
    check_out: null,
    lat: coords.lat,
    lng: coords.lng,
    status: 'present',
  });
  delete State.pendingCheckinCoords;
  closeModal();
  showToast('Check-in berhasil — lokasi tersimpan', 'success');
  render();
}

function modalCheckOut() {
  closeModal();
  staffCheckOut();
}

function staffCheckIn() {
  const coords = State.pendingCheckinCoords;
  if (!coords) {
    showToast('Tunggu lokasi dimuat...', 'warning');
    return;
  }
  const dist = calcDistance(coords.lat, coords.lng, ARQA_COORDS.lat, ARQA_COORDS.lng);
  if (dist > ARQA_RADIUS) {
    showToast('Anda di luar radius kafe (' + Math.round(dist) + 'm). Check-in hanya dalam ' + ARQA_RADIUS + 'm', 'warning');
    return;
  }
  DB.attendances.push({
    id: 'a' + Date.now(),
    user_id: State.currentUser.id,
    check_in: new Date().toISOString(),
    check_out: null,
    lat: coords.lat,
    lng: coords.lng,
    status: 'present',
  });
  delete State.pendingCheckinCoords;
  showToast('Check-in berhasil — lokasi tersimpan', 'success');
  render();
}

function staffCheckOut() {
  const today = new Date().toLocaleDateString('sv-SE');
  const att = DB.attendances.find(a => a.user_id === State.currentUser.id && !a.check_out && new Date(a.check_in).toLocaleDateString('sv-SE') === today);
  if (!att) { showToast('Belum check-in hari ini', 'warning'); return; }
  var role = State.currentUser.role;
  if (!navigator.geolocation) {
    att.check_out = new Date().toISOString();
    addNotification({ title:'Check-Out', message:'Check-out berhasil', type:'info', icon:'fa-sign-out-alt', targetRoles:[role] });
    showToast('Check-out berhasil', 'success');
    render();
    return;
  }
  navigator.geolocation.getCurrentPosition(function(pos) {
    att.check_out = new Date().toISOString();
    addNotification({ title:'Check-Out', message:'Check-out berhasil — lokasi tersimpan', type:'info', icon:'fa-sign-out-alt', targetRoles:[role] });
    showToast('Check-out berhasil — lokasi tersimpan', 'success');
    render();
  }, function() {
    att.check_out = new Date().toISOString();
    addNotification({ title:'Check-Out', message:'Check-out berhasil', type:'info', icon:'fa-sign-out-alt', targetRoles:[role] });
    showToast('Check-out berhasil (tanpa lokasi)', 'success');
    render();
  }, { enableHighAccuracy: true, timeout: 10000 });
}

// ============================================================
// EDIT PROFILE
// ============================================================
function showEditProfileModal() {
  const u = State.currentUser;
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Edit Profil</h3>
      <div class="space-y-3">
        <div>
          <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Nama</label>
          <input id="edit-profile-name" class="input-field text-sm" value="${u.name}">
        </div>
        <div>
          <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Email</label>
          <input id="edit-profile-email" class="input-field text-sm" value="${u.email}">
        </div>
        <div>
          <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Telepon</label>
          <input id="edit-profile-phone" class="input-field text-sm" value="${u.phone || ''}">
        </div>
        <div>
          <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Alamat</label>
          <textarea id="edit-profile-address" class="input-field text-sm" rows="2">${u.address || ''}</textarea>
        </div>
        <hr style="border-color:var(--border);margin:12px 0">
        <div>
          <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Password Baru <span class="text-[10px]" style="color:var(--muted)">(kosongkan jika tidak diubah)</span></label>
          <input id="edit-profile-pass" type="password" class="input-field text-sm" placeholder="Password baru">
        </div>
        <div>
          <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Konfirmasi Password Baru</label>
          <input id="edit-profile-pass-confirm" type="password" class="input-field text-sm" placeholder="Ulangi password baru">
        </div>
      </div>
      <div class="flex gap-2 mt-4">
        <button onclick="closeModal()" class="btn-sm flex-1 text-center" style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:10px;cursor:pointer">Batal</button>
        <button onclick="saveEditProfile()" class="btn-primary flex-1 text-center">Simpan</button>
      </div>
    </div>
  `);
}

function saveEditProfile() {
  const u = State.currentUser;
  const name = document.getElementById('edit-profile-name')?.value?.trim();
  const email = document.getElementById('edit-profile-email')?.value?.trim();
  const phone = document.getElementById('edit-profile-phone')?.value?.trim();
  const address = document.getElementById('edit-profile-address')?.value?.trim();
  const pass = document.getElementById('edit-profile-pass')?.value;
  const passConfirm = document.getElementById('edit-profile-pass-confirm')?.value;
  if (!name || !email) { showToast('Nama dan email wajib diisi', 'warning'); return; }
  if (pass && pass !== passConfirm) { showToast('Konfirmasi password tidak cocok', 'warning'); return; }
  u.name = name;
  u.email = email;
  u.phone = phone;
  u.address = address;
  u.avatar = name[0].toUpperCase();
  if (pass) u.password = pass;
  closeModal();
  showToast('Profil berhasil diperbarui', 'success');
  render();
}