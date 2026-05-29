// ============================================================
// GENERIC PROFILE
// ============================================================
const ARQA_COORDS = { lat: -6.2088, lng: 106.8456 };
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
  const isStaff = ['manager', 'cashier', 'kitchen', 'courier'].includes(u.role);
  const today = new Date().toISOString().split('T')[0];
  const att = DB.attendances.find(a => a.user_id === u.id && !a.check_out && new Date(a.check_in).toISOString().split('T')[0] === today);
  return `
  <div class="animate-fade-up">
    <div class="card text-center mb-4">
      <div class="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold" style="background:var(--accent);color:#fff">${u.avatar}</div>
      <h3 class="font-semibold text-lg">${u.name}</h3>
      <p class="text-sm" style="color:var(--muted)">${u.email}</p>
      <p class="text-sm" style="color:var(--muted)">${u.phone}</p>
      <div class="mt-4 space-y-3 text-left">
        ${isStaff ? renderGeoAttendanceCard(u, att) : ''}
        <div class="card flex items-center gap-3 cursor-pointer" onclick="handleLogout()">
          <i class="fas fa-right-from-bracket" style="color:var(--danger)"></i>
          <span class="text-sm flex-1">Keluar dari Akun</span>
          <i class="fas fa-chevron-right" style="color:var(--muted);font-size:12px"></i>
        </div>
      </div>
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
  const today = new Date().toISOString().split('T')[0];
  const att = DB.attendances.find(a => a.user_id === State.currentUser.id && !a.check_out && new Date(a.check_in).toISOString().split('T')[0] === today);
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
    att.check_out_lat = pos.coords.latitude;
    att.check_out_lng = pos.coords.longitude;
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