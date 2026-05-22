// ------------------------------------------------------------------
// MENU ITEM CRUD
// ------------------------------------------------------------------
function showEditMenuItemModal(id) {
  const m = DB.menuItems.find(x => x.id === id);
  if (!m) return;
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Edit Menu</h3>
      <div class="space-y-3">
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Nama Item</label><input id="edit-menu-name" class="input-field text-sm" value="${m.name}"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Deskripsi</label><textarea id="edit-menu-desc" class="input-field text-sm min-h-[60px]">${m.description || ''}</textarea></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Gambar</label>
          ${renderImageInput('edit', m.image)}
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Harga</label><input id="edit-menu-price" type="number" class="input-field text-sm" value="${m.price}"></div>
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Kategori</label>
            ${getCategoryOptions(m.category, 'edit')}
          </div>
        </div>
      </div>
      <div class="flex gap-2 mt-4">
        <button onclick="deleteMenuItem('${m.id}')" class="btn-sm flex-1 text-center" style="background:rgba(231,76,60,.15);color:var(--danger);border:1px solid rgba(231,76,60,.3);border-radius:10px;padding:10px"><i class="fas fa-trash mr-1"></i>Hapus</button>
        <button onclick="saveEditMenuItem('${m.id}')" class="btn-primary flex-1 text-center">Simpan Perubahan</button>
      </div>
    </div>
  `);
}

function deleteMenuItem(id) {
  const m = DB.menuItems.find(x => x.id === id);
  if (!m) return;
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Konfirmasi Hapus</h3>
      <p class="text-sm mb-4">Hapus menu "${m.name}"? Tindakan ini tidak dapat dibatalkan.</p>
      <div class="flex gap-2">
        <button onclick="closeModal()" class="btn-sm flex-1 text-center" style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:10px;cursor:pointer">Batal</button>
        <button onclick="confirmDeleteMenuItem('${id}')" class="btn-sm flex-1 text-center" style="background:rgba(231,76,60,.15);color:var(--danger);border:1px solid rgba(231,76,60,.3);border-radius:10px;padding:10px;cursor:pointer"><i class="fas fa-trash mr-1"></i>Hapus</button>
      </div>
    </div>
  `);
}

function confirmDeleteMenuItem(id) {
  DB.menuItems = DB.menuItems.filter(x => x.id !== id);
  closeModal(); showToast('Menu dihapus', 'info'); render();
}

function saveEditMenuItem(id) {
  const m = DB.menuItems.find(x => x.id === id);
  if (!m) return;
  const name = document.getElementById('edit-menu-name')?.value;
  const price = parseInt(document.getElementById('edit-menu-price')?.value || '0');
  const mode = document.getElementById('edit-img-mode')?.value;
  let image = document.getElementById('edit-img-url')?.value;
  if (mode === 'upload') {
    const preview = document.getElementById('edit-img-preview');
    const img = preview && preview.querySelector('img');
    if (img) image = img.src;
  }
  let cat = document.getElementById('edit-menu-cat')?.value;
  if (cat === '__new__' || !cat) {
    cat = document.getElementById('edit-menu-cat-custom')?.value.trim() || m.category;
  }
  if (!name) { showToast('Nama menu wajib diisi', 'warning'); return; }
  m.name = name;
  m.price = price;
  if (image) m.image = image;
  if (cat) m.category = cat;
  m.description = document.getElementById('edit-menu-desc')?.value || '';
  closeModal(); showToast('Menu berhasil diperbarui', 'success'); render();
}

function getCategoryOptions(selected, prefix) {
  prefix = prefix || 'new';
  const cats = [...new Set(DB.menuItems.map(m => m.category).filter(Boolean))];
  if (!cats.includes('coffee')) cats.unshift('coffee');
  if (!cats.includes('non-coffee')) cats.unshift('non-coffee');
  if (!cats.includes('food')) cats.push('food');
  if (!cats.includes('snack')) cats.push('snack');
  const unique = [...new Set(cats)];
  const labelMap = { coffee: 'Kopi', 'non-coffee': 'Non-Kopi', food: 'Makanan', snack: 'Snack' };
  const opts = unique.map(c => `<option value="${c}" ${selected === c ? 'selected' : ''}>${labelMap[c] || c}</option>`).join('');
  return `<select id="${prefix}-menu-cat" class="input-field text-sm" onchange="if(this.value==='__new__'){document.getElementById('${prefix}-cat-container').style.display='block';this.style.display='none'}">${opts}<option value="__new__">+ Tambah Baru...</option></select>
    <div id="${prefix}-cat-container" style="display:none"><input id="${prefix}-menu-cat-custom" class="input-field text-sm mt-1" placeholder="Nama kategori baru..."></div>`;
}

function showAddMenuItemModal() {
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Tambah Menu</h3>
      <div class="space-y-3">
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Nama Item</label><input id="add-menu-name" class="input-field text-sm" placeholder="Nama menu"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Deskripsi</label><textarea id="add-menu-desc" class="input-field text-sm min-h-[60px]" placeholder="Deskripsi menu"></textarea></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Gambar</label>
          ${renderImageInput('add', '')}
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Harga</label><input id="add-menu-price" type="number" class="input-field text-sm" placeholder="0"></div>
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Kategori</label>
            ${getCategoryOptions('', 'add')}
          </div>
        </div>
      </div>
      <button onclick="addMenuItem()" class="btn-primary w-full mt-4 text-center">Tambah</button>
    </div>
  `);
}

function addMenuItem() {
  const name = document.getElementById('add-menu-name')?.value;
  const price = parseInt(document.getElementById('add-menu-price')?.value || '0');
  if (!name) { showToast('Nama menu wajib diisi', 'warning'); return; }
  const id = 'm' + Date.now();
  const mode = document.getElementById('add-img-mode')?.value;
  let image = document.getElementById('add-img-url')?.value;
  if (mode === 'upload') {
    const preview = document.getElementById('add-img-preview');
    const img = preview && preview.querySelector('img');
    if (img) image = img.src;
  }
  if (!image) image = `https://picsum.photos/seed/${Date.now()}/400/300`;
  let cat = document.getElementById('add-menu-cat')?.value;
  if (cat === '__new__' || !cat) {
    cat = document.getElementById('add-menu-cat-custom')?.value.trim() || 'coffee';
  }
  DB.menuItems.push({ id, name, description: document.getElementById('add-menu-desc')?.value || '', price, category: cat, image, is_available: true });
  closeModal(); showToast('Menu ditambahkan', 'success'); render();
}
