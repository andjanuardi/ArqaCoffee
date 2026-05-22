// ------------------------------------------------------------------
// STOCK MANAGEMENT
// ------------------------------------------------------------------
function renderStockManagement() {
  if (!State.stockSearch) State.stockSearch = '';
  const filterMenuId = State.stockMenuFilter || '';
  const menuOpts = DB.menuItems.filter(m => DB.menuStockMapping && DB.menuStockMapping[m.id]).map(m =>
    `<option value="${m.id}" ${filterMenuId === m.id ? 'selected' : ''}>${m.name}</option>`
  ).join('');
  const byMenu = filterMenuId && DB.menuStockMapping && DB.menuStockMapping[filterMenuId]
    ? DB.stockItems.filter(s => DB.menuStockMapping[filterMenuId].some(r => (typeof r === 'string' ? r : r.id) === s.id))
    : DB.stockItems;
  const bySearch = byMenu.filter(s => !State.stockSearch || s.name.toLowerCase().includes(State.stockSearch.toLowerCase()));
  const sorted = [...bySearch].sort((a, b) => {
    const aPct = a.min_quantity > 0 ? a.current_quantity / a.min_quantity : a.current_quantity;
    const bPct = b.min_quantity > 0 ? b.current_quantity / b.min_quantity : b.current_quantity;
    return aPct - bPct;
  });
  return `
  <div class="animate-fade-up">
    <div class="flex justify-between items-center mb-4">
      <h2 class="font-display text-xl font-bold">Stok Bahan Baku</h2>
      <button onclick="showAddStockModal()" class="btn-primary btn-sm"><i class="fas fa-plus mr-1"></i>Tambah</button>
    </div>
    <div class="card mb-4" style="padding:10px">
      <div class="flex gap-2 mb-2">
        <input type="text" class="input-field text-sm flex-1" placeholder="Cari bahan..." value="${State.stockSearch}" oninput="State.stockSearch=this.value;render()">
        <select onchange="State.stockMenuFilter=this.value;render()" class="input-field text-sm" style="width:auto">
          <option value="">Semua Menu</option>
          ${menuOpts}
        </select>
      </div>
    </div>
    <div class="space-y-3">
      ${sorted.map(s => {
        const pct = Math.min(100, Math.round(s.current_quantity / (s.min_quantity * 3) * 100));
        const isLow = s.current_quantity <= s.min_quantity;
        const usedIn = DB.menuItems.filter(m => DB.menuStockMapping && DB.menuStockMapping[m.id] && DB.menuStockMapping[m.id].some(r => (typeof r === 'string' ? r : r.id) === s.id));
        return `
        <div class="card ${isLow ? 'animate-breathe' : ''}">
          <div class="flex justify-between items-center mb-2">
            <div class="font-semibold text-sm">${s.name} ${isLow ? '<span style="color:var(--danger);font-size:11px"><i class="fas fa-exclamation-triangle"></i> Rendah</span>' : ''}</div>
            <div class="flex items-center gap-2">
              <div class="text-sm font-bold" style="color:${isLow ? 'var(--danger)' : 'var(--accent)'}">${s.current_quantity} ${s.unit}</div>
              <button onclick="showEditStockModal('${s.id}')" class="btn-sm" style="background:rgba(224,122,58,.12);color:var(--accent);border:none;padding:4px 7px;border-radius:6px;cursor:pointer;font-size:11px"><i class="fas fa-pen"></i></button>
              <button onclick="deleteStockItem('${s.id}')" class="btn-sm" style="background:rgba(231,76,60,.12);color:var(--danger);border:none;padding:4px 7px;border-radius:6px;cursor:pointer;font-size:11px"><i class="fas fa-trash"></i></button>
            </div>
          </div>
          <div class="stock-bar"><div class="stock-bar-fill" style="width:${pct}%;background:${isLow ? 'var(--danger)' : 'var(--accent)'}"></div></div>
          <div class="flex justify-between mt-2">
            <span class="text-xs" style="color:var(--muted)">Minimum: ${s.min_quantity} ${s.unit}</span>
            <div class="flex gap-1">
              <button onclick="adjustStock('${s.id}','in')" class="btn-sm" style="background:rgba(39,174,96,.15);color:var(--success);border:none;padding:4px 10px;border-radius:6px;cursor:pointer;font-size:11px"><i class="fas fa-plus"></i></button>
              <button onclick="adjustStock('${s.id}','out')" class="btn-sm" style="background:rgba(231,76,60,.15);color:var(--danger);border:none;padding:4px 10px;border-radius:6px;cursor:pointer;font-size:11px"><i class="fas fa-minus"></i></button>
            </div>
          </div>
          ${usedIn.length ? `<div class="flex flex-wrap gap-1 mt-2 pt-2 border-t" style="border-color:var(--border)">${usedIn.map(m => `<span class="text-[10px] px-2 py-0.5 rounded" style="background:rgba(224,122,58,.12);color:var(--accent)"><i class="fas fa-utensils mr-0.5"></i>${m.name}</span>`).join('')}</div>` : ''}
        </div>`;
      }).join('')}
      ${sorted.length === 0 ? '<div class="text-center py-6 text-sm" style="color:var(--muted)">Tidak ada bahan baku ditemukan</div>' : ''}
    </div>
  </div>`;
}

function showEditStockModal(id) {
  const s = DB.stockItems.find(x => x.id === id);
  if (!s) return;
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Edit Bahan Baku</h3>
      <div class="space-y-3">
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Nama</label><input id="edit-stock-name" class="input-field text-sm" value="${s.name}"></div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Jumlah</label><input id="edit-stock-qty" type="number" class="input-field text-sm" value="${s.current_quantity}"></div>
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Satuan</label><input id="edit-stock-unit" class="input-field text-sm" value="${s.unit}"></div>
        </div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Batas Minimum</label><input id="edit-stock-min" type="number" class="input-field text-sm" value="${s.min_quantity}"></div>
      </div>
      <button onclick="saveEditStock('${s.id}')" class="btn-primary w-full mt-4 text-center">Simpan</button>
    </div>
  `);
}

function saveEditStock(id) {
  const s = DB.stockItems.find(x => x.id === id);
  if (!s) return;
  const name = document.getElementById('edit-stock-name')?.value;
  if (!name) { showToast('Nama bahan wajib diisi', 'warning'); return; }
  s.name = name;
  s.current_quantity = parseInt(document.getElementById('edit-stock-qty')?.value || '0');
  s.unit = document.getElementById('edit-stock-unit')?.value || 'kg';
  s.min_quantity = parseInt(document.getElementById('edit-stock-min')?.value || '3');
  s.updated_at = new Date().toISOString();
  closeModal(); showToast('Bahan baku diperbarui', 'success'); render();
}

function deleteStockItem(id) {
  const s = DB.stockItems.find(x => x.id === id);
  if (!s) return;
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Konfirmasi Hapus</h3>
      <p class="text-sm mb-4">Hapus bahan "${s.name}"? Tindakan ini tidak dapat dibatalkan.</p>
      <div class="flex gap-2">
        <button onclick="closeModal()" class="btn-sm flex-1 text-center" style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:10px;cursor:pointer">Batal</button>
        <button onclick="confirmDeleteStockItem('${id}')" class="btn-sm flex-1 text-center" style="background:rgba(231,76,60,.15);color:var(--danger);border:1px solid rgba(231,76,60,.3);border-radius:10px;padding:10px;cursor:pointer"><i class="fas fa-trash mr-1"></i>Hapus</button>
      </div>
    </div>
  `);
}

function confirmDeleteStockItem(id) {
  DB.stockItems = DB.stockItems.filter(x => x.id !== id);
  closeModal(); showToast('Bahan baku dihapus', 'info'); render();
}

function adjustStock(id, type) {
  const s = DB.stockItems.find(x => x.id === id);
  if (!s) return;
  const qty = type === 'in' ? 5 : 2;
  s.current_quantity = type === 'in' ? s.current_quantity + qty : Math.max(0, s.current_quantity - qty);
  DB.stockMovements.push({ id: 'sm' + Date.now(), stock_item_id: id, user_id: State.currentUser.id, type, quantity: qty, notes: type === 'in' ? 'Restok' : 'Pemakaian', created_at: new Date().toISOString() });
  if (s.current_quantity <= s.min_quantity) notifyLowStock(s);
  autoUpdateMenuAvailability();
  showToast(`${s.name}: ${type === 'in' ? '+' + qty : '-' + qty} ${s.unit}`, 'success');
  render();
}

function showAddStockModal() {
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Tambah Bahan Baku</h3>
      <div class="space-y-3">
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Nama</label><input id="new-stock-name" class="input-field text-sm" placeholder="Misal: Susu Oat"></div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Jumlah</label><input id="new-stock-qty" type="number" class="input-field text-sm" value="10"></div>
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Satuan</label><input id="new-stock-unit" class="input-field text-sm" value="kg"></div>
        </div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Batas Minimum</label><input id="new-stock-min" type="number" class="input-field text-sm" value="3"></div>
      </div>
      <button onclick="addStockItem()" class="btn-primary w-full mt-4 text-center">Simpan</button>
    </div>
  `);
}

function addStockItem() {
  const name = document.getElementById('new-stock-name')?.value;
  if (!name) { showToast('Nama bahan wajib diisi', 'warning'); return; }
  DB.stockItems.push({ id: 's' + Date.now(), name, unit: document.getElementById('new-stock-unit')?.value || 'kg', current_quantity: parseInt(document.getElementById('new-stock-qty')?.value || '10'), min_quantity: parseInt(document.getElementById('new-stock-min')?.value || '3'), updated_at: new Date().toISOString() });
  closeModal(); showToast('Bahan baku ditambahkan', 'success'); render();
}
