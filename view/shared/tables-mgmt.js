// ------------------------------------------------------------------
// TABLE MANAGEMENT
// ------------------------------------------------------------------
function renderAdminTablesMgmt() {
  return `
  <div class="animate-fade-up">
    <div class="flex justify-between items-center mb-4">
      <h2 class="font-display text-xl font-bold">Kelola Meja</h2>
      <button onclick="addTable()" class="btn-primary btn-sm"><i class="fas fa-plus mr-1"></i>Tambah</button>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      ${DB.tables.map(t => `
      <div class="card text-center" style="position:relative">
        <button onclick="event.stopPropagation(); confirmDeleteTable('${t.id}')" class="btn-sm" style="position:absolute;top:6px;left:6px;background:rgba(231,76,60,.12);color:var(--danger);border:none;padding:4px 7px;border-radius:6px;cursor:pointer;font-size:11px;line-height:1"><i class="fas fa-trash"></i></button>
        <div class="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center text-2xl" style="background:${t.status === 'available' ? 'rgba(39,174,96,.1)' : 'rgba(231,76,60,.1)'}">
          <i class="fas fa-chair" style="color:${t.status === 'available' ? 'var(--success)' : 'var(--danger)'}"></i>
        </div>
        <div class="font-bold text-lg">Meja ${t.number}</div>
        <div class="text-xs mb-2" style="color:var(--muted)">QR: ${t.qr_code}</div>
        <span class="badge ${t.status === 'available' ? 'badge-ready' : 'badge-cooking'}">${t.status === 'available' ? 'Tersedia' : 'Terisi'}</span>
        <div class="mt-3">
          <button onclick="toggleTableStatus('${t.id}')" class="btn-secondary btn-sm w-full text-center">Toggle Status</button>
        </div>
      </div>`).join('')}
    </div>
  </div>`;
}

function addTable() {
  const num = (DB.tables.length + 1).toString();
  DB.tables.push({ id: 't' + Date.now(), number: num, qr_code: 'ARQA-T' + num, status: 'available', capacity: 4 });
  showToast(`Meja ${num} ditambahkan`, 'success'); render();
}

function toggleTableStatus(id) {
  const t = DB.tables.find(x => x.id === id);
  if (t) { t.status = t.status === 'available' ? 'occupied' : 'available'; render(); }
}

function confirmDeleteTable(id) {
  const t = DB.tables.find(x => x.id === id);
  if (!t) return;
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Konfirmasi Hapus</h3>
      <p class="text-sm mb-4">Hapus Meja ${t.number}? Tindakan ini tidak dapat dibatalkan.</p>
      <div class="flex gap-2">
        <button onclick="closeModal()" class="btn-sm flex-1 text-center" style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:10px;cursor:pointer">Batal</button>
        <button onclick="confirmDeleteTableAction('${id}')" class="btn-sm flex-1 text-center" style="background:rgba(231,76,60,.15);color:var(--danger);border:1px solid rgba(231,76,60,.3);border-radius:10px;padding:10px;cursor:pointer"><i class="fas fa-trash mr-1"></i>Hapus</button>
      </div>
    </div>
  `);
}

function confirmDeleteTableAction(id) {
  DB.tables = DB.tables.filter(x => x.id !== id);
  closeModal(); showToast('Meja dihapus', 'info'); render();
}

function deleteTable(id) {
  const t = DB.tables.find(x => x.id === id);
  if (!t) return;
  DB.tables = DB.tables.filter(x => x.id !== id);
  showToast('Meja ' + t.number + ' dihapus', 'info'); render();
}
