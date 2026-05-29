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
        <div class="mt-3 flex gap-2">
          <button onclick="toggleTableStatus('${t.id}')" class="btn-secondary btn-sm flex-1 text-center">Toggle Status</button>
          <button onclick="showTableQR('${t.id}')" class="btn-sm text-center" style="flex:0 0 auto;background:rgba(224,122,58,.12);color:var(--accent);border:1px solid rgba(224,122,58,.2);border-radius:8px;padding:6px 10px;cursor:pointer;font-size:11px" title="Cetak QR"><i class="fas fa-qrcode mr-1"></i>QR</button>
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

function showTableQR(id) {
  const t = DB.tables.find(x => x.id === id);
  if (!t) return;
  const data = encodeURIComponent(t.qr_code);
  showModal(`
    <div id="qr-print-area">
      <h3 class="font-display text-lg font-bold mb-2 text-center">Meja ${t.number}</h3>
      <p class="text-xs text-center mb-4" style="color:var(--muted)">${t.qr_code}</p>
      <div class="flex justify-center mb-4">
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${data}" alt="QR ${t.qr_code}" style="border-radius:12px;max-width:100%">
      </div>
      <p class="text-xs text-center mb-4" style="color:var(--muted)">Scan kode QR untuk memesan dari meja ini</p>
      <div class="flex gap-2">
        <button onclick="closeModal()" class="btn-sm flex-1 text-center" style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:10px;cursor:pointer">Tutup</button>
        <button onclick="downloadTableQR()" class="btn-primary btn-sm flex-1 text-center"><i class="fas fa-download mr-1"></i>Download</button>
      </div>
    </div>
  `);
}

function downloadTableQR() {
  const img = document.querySelector('#qr-print-area img');
  const label = document.querySelector('#qr-print-area h3')?.textContent || 'QR-Meja';
  if (!img) return;
  const c = document.createElement('canvas');
  c.width = 400; c.height = 430;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height);
  const i = new Image();
  i.crossOrigin = 'anonymous';
  i.src = img.src;
  i.onload = () => {
    ctx.drawImage(i, 60, 50, 280, 280);
    ctx.fillStyle = '#000';
    ctx.font = 'bold 18px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(label, 200, 380);
    const a = document.createElement('a');
    a.download = label.replace(/\s+/g, '-') + '.png';
    a.href = c.toDataURL('image/png');
    a.click();
  };
}

function deleteTable(id) {
  const t = DB.tables.find(x => x.id === id);
  if (!t) return;
  DB.tables = DB.tables.filter(x => x.id !== id);
  showToast('Meja ' + t.number + ' dihapus', 'info'); render();
}
