// ============================================================
// PLAYGROUND — STOCK MAKANAN & MINUMAN
// ============================================================

function renderPlaygroundPgStock() {
  if (!State.pgStockSearch) State.pgStockSearch = '';
  const bySearch = (DB.pgStockItems || []).filter(s => !State.pgStockSearch || s.name.toLowerCase().includes(State.pgStockSearch.toLowerCase()));
  const sorted = [...bySearch].sort((a, b) => {
    const aPct = a.min_quantity > 0 ? a.current_quantity / a.min_quantity : a.current_quantity;
    const bPct = b.min_quantity > 0 ? b.current_quantity / b.min_quantity : b.current_quantity;
    return aPct - bPct;
  });
  return `
  <div class="animate-fade-up">
    <div class="flex justify-between items-center mb-4">
      <h2 class="font-display text-xl font-bold">Stok Makanan & Minuman</h2>
      <button onclick="showAddPgStockModal()" class="btn-primary btn-sm"><i class="fas fa-plus mr-1"></i>Tambah</button>
    </div>
    <div class="card mb-4" style="padding:10px">
      <input type="text" class="input-field text-sm w-full" placeholder="Cari item..." value="${State.pgStockSearch}" oninput="State.pgStockSearch=this.value;render()">
    </div>
    <div class="space-y-3">
      ${sorted.map(s => {
        const pct = Math.min(100, Math.round(s.current_quantity / (s.min_quantity * 3) * 100));
        const isLow = s.current_quantity <= s.min_quantity;
        return `
        <div class="card ${isLow ? 'animate-breathe' : ''}">
          <div class="flex gap-3">
            ${s.image ? `<img src="${s.image}" onerror="this.style.display='none'" style="width:56px;height:56px;object-fit:cover;border-radius:10px;flex-shrink:0">` : ''}
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-center mb-2">
                <div class="font-semibold text-sm truncate">${s.name} ${isLow ? '<span style="color:var(--danger);font-size:11px"><i class="fas fa-exclamation-triangle"></i> Rendah</span>' : ''}</div>
                <div class="flex items-center gap-2 flex-shrink-0">
                  <div class="text-right">
                    <div class="text-sm font-bold" style="color:${isLow ? 'var(--danger)' : 'var(--accent)'}">${s.current_quantity} ${s.unit}</div>
                    <div class="text-xs" style="color:var(--muted)">${formatCurrency(s.price || 0)}</div>
                  </div>
                  <button onclick="showEditPgStockModal('${s.id}')" class="btn-sm" style="background:rgba(224,122,58,.12);color:var(--accent);border:none;padding:4px 7px;border-radius:6px;cursor:pointer;font-size:11px"><i class="fas fa-pen"></i></button>
                  <button onclick="deletePgStockItem('${s.id}')" class="btn-sm" style="background:rgba(231,76,60,.12);color:var(--danger);border:none;padding:4px 7px;border-radius:6px;cursor:pointer;font-size:11px"><i class="fas fa-trash"></i></button>
                </div>
              </div>
              <div class="stock-bar"><div class="stock-bar-fill" style="width:${pct}%;background:${isLow ? 'var(--danger)' : 'var(--accent)'}"></div></div>
              <div class="flex justify-between mt-2">
                <span class="text-xs" style="color:var(--muted)">Minimum: ${s.min_quantity} ${s.unit}</span>
                <div class="flex gap-1">
                  <button onclick="adjustPgStock('${s.id}','in')" class="btn-sm" style="background:rgba(39,174,96,.15);color:var(--success);border:none;padding:4px 10px;border-radius:6px;cursor:pointer;font-size:11px"><i class="fas fa-plus"></i></button>
                  <button onclick="adjustPgStock('${s.id}','out')" class="btn-sm" style="background:rgba(231,76,60,.15);color:var(--danger);border:none;padding:4px 10px;border-radius:6px;cursor:pointer;font-size:11px"><i class="fas fa-minus"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>`;
      }).join('')}
      ${sorted.length === 0 ? '<div class="text-center py-6 text-sm" style="color:var(--muted)">Tidak ada item ditemukan</div>' : ''}
    </div>
  </div>`;
}

function showEditPgStockModal(id) {
  const s = (DB.pgStockItems || []).find(x => x.id === id);
  if (!s) return;
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Edit Item</h3>
      <div class="space-y-3">
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Nama</label><input id="edit-pgstock-name" class="input-field text-sm" value="${s.name}"></div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Jumlah</label><input id="edit-pgstock-qty" type="number" class="input-field text-sm" value="${s.current_quantity}"></div>
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Satuan</label><input id="edit-pgstock-unit" class="input-field text-sm" value="${s.unit}"></div>
        </div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Harga</label><input id="edit-pgstock-price" type="number" class="input-field text-sm" value="${s.price || 0}" step="500"></div>
        <div>
          <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Gambar</label>
          ${(() => {
            const hasImage = s.image && s.image !== 'https://picsum.photos/seed/';
            return `
          <div class="flex gap-2 mb-2">
            <button type="button" onclick="document.getElementById('edit-pgstock-img-mode').value='upload';document.getElementById('edit-pgstock-img-file').click()" class="btn-sm flex-1 text-center" style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:8px"><i class="fas fa-upload mr-1"></i>Upload</button>
            <button type="button" onclick="document.getElementById('edit-pgstock-img-mode').value='url';document.getElementById('edit-pgstock-img-url').style.display='block';this.style.background='rgba(224,122,58,.1)';this.style.borderColor='var(--accent)'" class="btn-sm flex-1 text-center" style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:8px"><i class="fas fa-link mr-1"></i>URL</button>
          </div>
          <input type="hidden" id="edit-pgstock-img-mode" value="${hasImage ? 'url' : 'upload'}">
          <input type="file" id="edit-pgstock-img-file" accept="image/*" style="display:none" onchange="previewImage(this,'edit-pgstock-img-preview')">
          <input type="text" id="edit-pgstock-img-url" class="input-field text-sm" placeholder="https://..." value="${s.image || ''}" style="${hasImage ? '' : 'display:none'}">
          <div id="edit-pgstock-img-preview" class="${hasImage ? '' : 'hidden'}" style="${hasImage ? '' : 'display:none'}">${hasImage ? '<img src="' + s.image + '" style="width:80px;height:80px;object-fit:cover;border-radius:10px">' : ''}</div>`; })()}
        </div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Batas Minimum</label><input id="edit-pgstock-min" type="number" class="input-field text-sm" value="${s.min_quantity}"></div>
      </div>
      <button onclick="saveEditPgStock('${s.id}')" class="btn-primary w-full mt-4 text-center">Simpan</button>
    </div>
  `);
}

function saveEditPgStock(id) {
  const s = (DB.pgStockItems || []).find(x => x.id === id);
  if (!s) return;
  const name = document.getElementById('edit-pgstock-name')?.value;
  if (!name) { showToast('Nama item wajib diisi', 'warning'); return; }
  const mode = document.getElementById('edit-pgstock-img-mode')?.value;
  let image = document.getElementById('edit-pgstock-img-url')?.value || '';
  if (mode === 'upload') {
    const preview = document.getElementById('edit-pgstock-img-preview');
    const img = preview && preview.querySelector('img');
    if (img) image = img.src;
  }
  s.name = name;
  s.current_quantity = parseInt(document.getElementById('edit-pgstock-qty')?.value || '0');
  s.unit = document.getElementById('edit-pgstock-unit')?.value || 'pcs';
  s.price = parseInt(document.getElementById('edit-pgstock-price')?.value || '0');
  if (image) s.image = image;
  s.min_quantity = parseInt(document.getElementById('edit-pgstock-min')?.value || '3');
  s.updated_at = new Date().toISOString();
  closeModal(); showToast('Item diperbarui', 'success'); render();
}

function deletePgStockItem(id) {
  const s = (DB.pgStockItems || []).find(x => x.id === id);
  if (!s) return;
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Konfirmasi Hapus</h3>
      <p class="text-sm mb-4">Hapus item "${s.name}"? Tindakan ini tidak dapat dibatalkan.</p>
      <div class="flex gap-2">
        <button onclick="closeModal()" class="btn-sm flex-1 text-center" style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:10px;cursor:pointer">Batal</button>
        <button onclick="confirmDeletePgStockItem('${id}')" class="btn-sm flex-1 text-center" style="background:rgba(231,76,60,.15);color:var(--danger);border:1px solid rgba(231,76,60,.3);border-radius:10px;padding:10px;cursor:pointer"><i class="fas fa-trash mr-1"></i>Hapus</button>
      </div>
    </div>
  `);
}

function confirmDeletePgStockItem(id) {
  DB.pgStockItems = (DB.pgStockItems || []).filter(x => x.id !== id);
  closeModal(); showToast('Item dihapus', 'info'); render();
}

function adjustPgStock(id, type) {
  const s = (DB.pgStockItems || []).find(x => x.id === id);
  if (!s) return;
  const qty = type === 'in' ? 5 : 2;
  s.current_quantity = type === 'in' ? s.current_quantity + qty : Math.max(0, s.current_quantity - qty);
  (DB.pgStockMovements || (DB.pgStockMovements = [])).push({ id: 'psm' + Date.now(), stock_item_id: id, user_id: State.currentUser.id, type, quantity: qty, notes: type === 'in' ? 'Restok' : 'Terjual', created_at: new Date().toISOString() });
  if (s.current_quantity <= s.min_quantity) notifyLowStock(s);
  showToast(`${s.name}: ${type === 'in' ? '+' + qty : '-' + qty} ${s.unit}`, 'success');
  render();
}

function showAddPgStockModal() {
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Tambah Item</h3>
      <div class="space-y-3">
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Nama</label><input id="new-pgstock-name" class="input-field text-sm" placeholder="Misal: Air Mineral"></div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Jumlah</label><input id="new-pgstock-qty" type="number" class="input-field text-sm" value="10"></div>
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Satuan</label><input id="new-pgstock-unit" class="input-field text-sm" value="pcs"></div>
        </div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Harga</label><input id="new-pgstock-price" type="number" class="input-field text-sm" value="5000" step="500"></div>
        <div>
          <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Gambar</label>
          <div class="flex gap-2 mb-2">
            <button type="button" onclick="document.getElementById('new-pgstock-img-mode').value='upload';document.getElementById('new-pgstock-img-file').click()" class="btn-sm flex-1 text-center" style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:8px"><i class="fas fa-upload mr-1"></i>Upload</button>
            <button type="button" onclick="document.getElementById('new-pgstock-img-mode').value='url';document.getElementById('new-pgstock-img-url').style.display='block';this.style.background='rgba(224,122,58,.1)';this.style.borderColor='var(--accent)'" class="btn-sm flex-1 text-center" style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:8px"><i class="fas fa-link mr-1"></i>URL</button>
          </div>
          <input type="hidden" id="new-pgstock-img-mode" value="url">
          <input type="file" id="new-pgstock-img-file" accept="image/*" style="display:none" onchange="previewImage(this,'new-pgstock-img-preview')">
          <input type="text" id="new-pgstock-img-url" class="input-field text-sm" placeholder="https://picsum.photos/seed/..." value="https://picsum.photos/seed/pg/400/400">
          <div id="new-pgstock-img-preview" style="display:none"></div>
        </div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Batas Minimum</label><input id="new-pgstock-min" type="number" class="input-field text-sm" value="3"></div>
      </div>
      <button onclick="addPgStockItem()" class="btn-primary w-full mt-4 text-center">Simpan</button>
    </div>
  `);
}

function addPgStockItem() {
  const name = document.getElementById('new-pgstock-name')?.value;
  if (!name) { showToast('Nama item wajib diisi', 'warning'); return; }
  const mode = document.getElementById('new-pgstock-img-mode')?.value;
  let image = document.getElementById('new-pgstock-img-url')?.value || '';
  if (mode === 'upload') {
    const preview = document.getElementById('new-pgstock-img-preview');
    const img = preview && preview.querySelector('img');
    if (img) image = img.src;
  }
  if (!DB.pgStockItems) DB.pgStockItems = [];
  DB.pgStockItems.push({ id: 'ps' + Date.now(), name, unit: document.getElementById('new-pgstock-unit')?.value || 'pcs', current_quantity: parseInt(document.getElementById('new-pgstock-qty')?.value || '10'), price: parseInt(document.getElementById('new-pgstock-price')?.value || '0'), image, min_quantity: parseInt(document.getElementById('new-pgstock-min')?.value || '3'), updated_at: new Date().toISOString() });
  closeModal(); showToast('Item ditambahkan', 'success'); render();
}
