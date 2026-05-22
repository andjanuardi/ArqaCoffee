// ------------------------------------------------------------------
// ATTENDANCE
// ------------------------------------------------------------------
function renderAttendance() {
  const today = new Date().toISOString().split('T')[0];
  const staff = DB.users.filter(u => ['manager', 'cashier', 'kitchen', 'courier'].includes(u.role));
  return `
  <div class="animate-fade-up">
    <div class="flex justify-between items-center mb-4">
      <h2 class="font-display text-xl font-bold">Presensi</h2>
      <span class="text-sm" style="color:var(--muted)">${formatDate(today)}</span>
    </div>
    <div class="space-y-3">
      ${staff.map(s => {
        const att = DB.attendances.find(a => a.user_id === s.id && !a.check_out);
        const isCheckedIn = !!att;
        return `
        <div class="card flex items-center gap-4 cursor-pointer hover:scale-[1.01] transition-transform" onclick="showAttendanceReport('${s.id}')">
          <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold" style="background:var(--accent);color:#fff">${s.avatar}</div>
          <div class="flex-1 min-w-0">
            <div class="font-semibold text-sm">${s.name}</div>
            <div class="text-xs" style="color:var(--muted)">${getRoleLabel(s.role)}</div>
            ${att ? `<div class="text-xs mt-1" style="color:var(--success)"><i class="fas fa-clock mr-1"></i>Check-in: ${formatTime(att.check_in)}</div>` : ''}
            ${att && att.lat ? `<div class="text-[10px] mt-0.5" style="color:var(--muted)"><i class="fas fa-map-pin mr-1"></i>${att.lat.toFixed(4)}, ${att.lng.toFixed(4)}</div>` : ''}
          </div>
          <div class="flex-shrink-0">
            ${isCheckedIn ? `<span class="badge badge-cooking">Aktif</span>` : `<span class="badge badge-pending">Off</span>`}
          </div>
        </div>`;
      }).join('')}
    </div>
  </div>`;
}

function showAttendanceReport(id) {
  const u = DB.users.find(x => x.id === id);
  if (!u) return;
  const today = new Date().toISOString().split('T')[0];
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
  const dailyRecords = DB.attendances.filter(a => a.user_id === id && a.check_in.startsWith(today));
  const monthlyRecords = DB.attendances.filter(a => a.user_id === id && a.check_in >= monthStart);
  const dailyTotalMin = dailyRecords.reduce((sum, r) => {
    if (r.check_out) return sum + Math.round((new Date(r.check_out) - new Date(r.check_in)) / 60000);
    return sum + Math.round((Date.now() - new Date(r.check_in)) / 60000);
  }, 0);
  const monthlyTotalMin = monthlyRecords.reduce((sum, r) => {
    if (r.check_out) return sum + Math.round((new Date(r.check_out) - new Date(r.check_in)) / 60000);
    return sum + Math.round((Date.now() - new Date(r.check_in)) / 60000);
  }, 0);
  const dailyH = Math.floor(dailyTotalMin / 60), dailyM = dailyTotalMin % 60;
  const monthlyH = Math.floor(monthlyTotalMin / 60), monthlyM = monthlyTotalMin % 60;
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">${u.avatar} ${u.name}</h3>
      <p class="text-xs mb-4" style="color:var(--muted)">${getRoleLabel(u.role)}</p>
      <div class="grid grid-cols-2 gap-3 mb-4">
        <div class="stat-card text-center">
          <div class="text-xs" style="color:var(--muted)">Presensi Hari Ini</div>
          <div class="text-lg font-bold mt-1" style="color:var(--accent)">${dailyRecords.length}</div>
          <div class="text-xs mt-1" style="color:var(--muted)">${dailyH}j ${dailyM}m</div>
        </div>
        <div class="stat-card text-center">
          <div class="text-xs" style="color:var(--muted)">Presensi Bulan Ini</div>
          <div class="text-lg font-bold mt-1" style="color:var(--accent)">${monthlyRecords.length}</div>
          <div class="text-xs mt-1" style="color:var(--muted)">${monthlyH}j ${monthlyM}m</div>
        </div>
      </div>
      <h4 class="font-semibold text-sm mb-2">Riwayat Harian</h4>
      <div class="space-y-1 max-h-48 overflow-y-auto">
        ${monthlyRecords.slice(-10).reverse().map(r => {
          const min = r.check_out ? Math.round((new Date(r.check_out) - new Date(r.check_in)) / 60000) : Math.round((Date.now() - new Date(r.check_in)) / 60000);
          const h = Math.floor(min / 60), m = min % 60;
          return `
        <div class="flex justify-between items-center text-xs py-1 border-b" style="border-color:var(--border)">
          <span>${formatDate(r.check_in)}</span>
          <span style="color:var(--muted)">${formatTime(r.check_in)} - ${r.check_out ? formatTime(r.check_out) : '...'}</span>
          <span style="color:var(--accent)">${h}j ${m}m</span>
        </div>`;
        }).join('')}
        ${monthlyRecords.length === 0 ? '<div class="text-xs py-4 text-center" style="color:var(--muted)">Belum ada data presensi bulan ini</div>' : ''}
      </div>
    </div>
  `);
}
