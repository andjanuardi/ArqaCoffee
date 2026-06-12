// ------------------------------------------------------------------
// MENU ITEM CRUD
// ------------------------------------------------------------------
function showEditMenuItemModal(id) {
  var m = DB.menuItems.find(function(x) { return x.id === id; });
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
        <div class="grid grid-cols-3 gap-3">
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Harga</label><input id="edit-menu-price" type="number" class="input-field text-sm" value="${m.price}"></div>
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Pajak (%)</label><input id="edit-menu-tax" type="number" class="input-field text-sm" value="${m.tax_percentage ?? 0}" min="0" max="100"></div>
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
  var m = DB.menuItems.find(function(x) { return x.id === id; });
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

async function confirmDeleteMenuItem(id) {
  try {
    await API.deleteMenuItem(id);
    DB.menuItems = DB.menuItems.filter(function(x) { return x.id !== id; });
    closeModal();
    showToast('Menu dihapus', 'info');
    await render();
  } catch(e) { console.error(e); showToast('Gagal menghapus menu', 'error'); }
}

async function saveEditMenuItem(id) {
  try {
    var m = DB.menuItems.find(function(x) { return x.id === id; });
    if (!m) return;
    var name = document.getElementById('edit-menu-name')?.value;
    var price = parseInt(document.getElementById('edit-menu-price')?.value || '0');
    var modeEl = document.getElementById('edit-img-mode');
    var mode = modeEl ? modeEl.value : null;
    var imgEl = document.getElementById('edit-img-url');
    var image = imgEl ? imgEl.value : null;
    if (mode === 'upload') {
      var preview = document.getElementById('edit-img-preview');
      var img = preview && preview.querySelector('img');
      if (img) image = img.src;
    }
    var catEl = document.getElementById('edit-menu-cat');
    var cat = catEl ? catEl.value : null;
    if (cat === '__new__' || !cat) {
      var catCustomEl = document.getElementById('edit-menu-cat-custom');
      cat = catCustomEl ? catCustomEl.value.trim() : m.category;
      if (!cat) cat = m.category;
    }
    if (!name) { showToast('Nama menu wajib diisi', 'warning'); return; }
    var updateData = { name: name, price: price };
    if (image) updateData.image = image;
    if (cat) updateData.category = cat;
    updateData.tax_percentage = parseFloat(document.getElementById('edit-menu-tax')?.value) || 0;
    updateData.description = document.getElementById('edit-menu-desc')?.value || '';
    await API.updateMenuItem(id, updateData);
    DB.menuItems = await API.getMenu();
    closeModal();
    showToast('Menu berhasil diperbarui', 'success');
    await render();
  } catch(e) { console.error(e); showToast('Gagal memperbarui menu', 'error'); }
}

function getCategoryOptions(selected, prefix) {
  prefix = prefix || 'new';
  var cats = [...new Set(DB.menuItems.map(function(m) { return m.category; }).filter(Boolean))];
  if (cats.indexOf('coffee') === -1) cats.unshift('coffee');
  if (cats.indexOf('non-coffee') === -1) cats.unshift('non-coffee');
  if (cats.indexOf('food') === -1) cats.push('food');
  if (cats.indexOf('snack') === -1) cats.push('snack');
  var unique = [...new Set(cats)];
  var labelMap = { coffee: 'Kopi', 'non-coffee': 'Non-Kopi', food: 'Makanan', snack: 'Snack' };
  var opts = unique.map(function(c) { return '<option value="' + c + '" ' + (selected === c ? 'selected' : '') + '>' + (labelMap[c] || c) + '</option>'; }).join('');
  return '<select id="' + prefix + '-menu-cat" class="input-field text-sm" onchange="if(this.value===\'__new__\'){document.getElementById(\'' + prefix + '-cat-container\').style.display=\'block\';this.style.display=\'none\'}">' + opts + '<option value="__new__">+ Tambah Baru...</option></select>'
    + '<div id="' + prefix + '-cat-container" style="display:none"><input id="' + prefix + '-menu-cat-custom" class="input-field text-sm mt-1" placeholder="Nama kategori baru..."></div>';
}

function showAddMenuItemModal() {
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Tambah Menu</h3>
      ${State.currentUser?.role === 'mitra_juru_masak' ? '<div class="mb-4 p-3 rounded-xl flex items-start gap-2 text-xs" style="background:rgba(243,156,18,.1);border:1px solid rgba(243,156,18,.2);color:var(--warning)"><i class="fas fa-info-circle mt-0.5"></i><span>Menu baru akan dikirim ke Admin untuk persetujuan terlebih dahulu.</span></div>' : ''}
      <div class="space-y-3">
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Nama Item</label><input id="add-menu-name" class="input-field text-sm" placeholder="Nama menu"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Deskripsi</label><textarea id="add-menu-desc" class="input-field text-sm min-h-[60px]" placeholder="Deskripsi menu"></textarea></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Gambar</label>
          ${renderImageInput('add', '')}
        </div>
        <div class="grid grid-cols-3 gap-3">
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Harga</label><input id="add-menu-price" type="number" class="input-field text-sm" placeholder="0"></div>
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Pajak (%)</label><input id="add-menu-tax" type="number" class="input-field text-sm" value="0" min="0" max="100"></div>
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Kategori</label>
            ${getCategoryOptions('', 'add')}
          </div>
        </div>
      </div>
      <button onclick="addMenuItem()" class="btn-primary w-full mt-4 text-center">Tambah</button>
    </div>
  `);
}

async function addMenuItem() {
  try {
    var name = document.getElementById('add-menu-name')?.value;
    var price = parseInt(document.getElementById('add-menu-price')?.value || '0');
    if (!name) { showToast('Nama menu wajib diisi', 'warning'); return; }
    var id = 'm' + Date.now();
    var modeEl = document.getElementById('add-img-mode');
    var mode = modeEl ? modeEl.value : null;
    var imgEl = document.getElementById('add-img-url');
    var image = imgEl ? imgEl.value : null;
    if (mode === 'upload') {
      var preview = document.getElementById('add-img-preview');
      var img = preview && preview.querySelector('img');
      if (img) image = img.src;
    }
    if (!image) image = 'https://picsum.photos/seed/' + Date.now() + '/400/300';
    var catEl = document.getElementById('add-menu-cat');
    var cat = catEl ? catEl.value : null;
    if (cat === '__new__' || !cat) {
      var catCustomEl = document.getElementById('add-menu-cat-custom');
      cat = catCustomEl ? catCustomEl.value.trim() : 'coffee';
      if (!cat) cat = 'coffee';
    }
    var tax_percentage = parseFloat(document.getElementById('add-menu-tax')?.value) || 0;
    var isMitra = State.currentUser?.role === 'mitra_juru_masak';
    var menuData = {
      id: id,
      name: name,
      description: document.getElementById('add-menu-desc')?.value || '',
      price: price,
      category: cat,
      image: image,
      is_available: true,
      tax_percentage: tax_percentage,
      is_approved: !isMitra
    };
    if (isMitra) menuData.submitted_by = State.currentUser.name;
    await API.createMenuItem(menuData);
    DB.menuItems = await API.getMenu();
    var msg = isMitra ? 'Menu dikirim untuk persetujuan Admin' : 'Menu ditambahkan';
    closeModal();
    showToast(msg, 'success');
    await render();
  } catch(e) { console.error(e); showToast('Gagal menambah menu', 'error'); }
}
