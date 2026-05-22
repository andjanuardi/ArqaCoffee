// ============================================================
// GENERIC PROFILE
// ============================================================
function renderGenericProfile() {
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
          <div class="text-xs" style="color:var(--muted)">Check-in dengan lokasi Anda</div>
        </div>
      </div>
      <button onclick="staffCheckIn()" class="btn-primary w-full text-center">
        <i class="fas fa-sign-in-alt mr-1"></i>Check In
      </button>
    </div>`;
}

function staffCheckIn() {
  if (!navigator.geolocation) {
    showToast('Geolokasi tidak didukung browser', 'error');
    return;
  }
  showToast('Mendapatkan lokasi...', 'info');
  navigator.geolocation.getCurrentPosition(function(pos) {
    DB.attendances.push({
      id: 'a' + Date.now(),
      user_id: State.currentUser.id,
      check_in: new Date().toISOString(),
      check_out: null,
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
      status: 'present',
    });
    showToast('Check-in berhasil — lokasi tersimpan', 'success');
    render();
  }, function(err) {
    showToast('Gagal mendapat lokasi: ' + err.message, 'error');
  }, { enableHighAccuracy: true, timeout: 10000 });
}

function staffCheckOut() {
  const today = new Date().toISOString().split('T')[0];
  const att = DB.attendances.find(a => a.user_id === State.currentUser.id && !a.check_out && new Date(a.check_in).toISOString().split('T')[0] === today);
  if (!att) { showToast('Belum check-in hari ini', 'warning'); return; }
  if (!navigator.geolocation) {
    att.check_out = new Date().toISOString();
    showToast('Check-out berhasil', 'success');
    render();
    return;
  }
  navigator.geolocation.getCurrentPosition(function(pos) {
    att.check_out = new Date().toISOString();
    att.check_out_lat = pos.coords.latitude;
    att.check_out_lng = pos.coords.longitude;
    showToast('Check-out berhasil — lokasi tersimpan', 'success');
    render();
  }, function() {
    att.check_out = new Date().toISOString();
    showToast('Check-out berhasil (tanpa lokasi)', 'success');
    render();
  }, { enableHighAccuracy: true, timeout: 10000 });
}
