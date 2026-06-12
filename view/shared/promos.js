// ------------------------------------------------------------------
// PROMO MANAGEMENT
// ------------------------------------------------------------------
async function renderAdminPromos() {
  try {
    showSkeleton('admin-promos', 'list');
    var promos = await API.getPromos();
    var menuItems = await API.getMenu();
    DB.promos = promos;
    DB.menuItems = menuItems;
    return `
    <div class="animate-fade-up">
      <div class="flex justify-between items-center mb-4">
        <h2 class="font-display text-xl font-bold">Kelola Promo</h2>
        <button onclick="showAddPromoModal()" class="btn-primary btn-sm"><i class="fas fa-plus mr-1"></i>Tambah</button>
      </div>
      <div class="space-y-3">
        ${(promos || []).map(function(p) {
          var now = new Date();
          var active = p.is_active && (!p.end_date || new Date(p.end_date) >= now);
          var discLabel = p.discount_type === 'fixed' ? formatCurrency(p.discount_value) : p.discount_value + '%';
          var menuNames = (p.menu_ids || []).map(function(id) { var m = menuItems.find(function(x) { return x.id === id; }); return m ? m.name : ''; }).filter(Boolean).join(', ');
          return `
        <div class="card flex flex-col gap-3">
          <div class="flex items-start gap-4 cursor-pointer hover:scale-[1.01] transition-transform" onclick="showEditPromoModal('${p.id}')">
            <img src="${p.image || 'https://picsum.photos/seed/' + p.id + '/100/100'}" class="w-14 h-14 rounded-xl object-cover" onerror="this.src='https://picsum.photos/seed/${p.id}/100/100'">
            <div class="flex-1 min-w-0">
              <div class="font-bold text-sm">${p.title}</div>
              <div class="text-xs mb-1" style="color:var(--muted)">${p.desc}</div>
              <div class="text-[10px] font-mono" style="color:var(--accent)">${p.code}</div>
              <div class="text-[10px] mt-1" style="color:var(--muted)">Diskon ${discLabel}</div>
              ${p.start_date ? '<div class="text-[10px]" style="color:var(--muted)">' + formatDate(p.start_date) + ' - ' + (p.end_date ? formatDate(p.end_date) : '...') + '</div>' : ''}
              ${menuNames ? '<div class="text-[10px] mt-1" style="color:var(--accent)">Menu: ' + menuNames + '</div>' : '<div class="text-[10px] mt-1" style="color:var(--muted)">Semua menu</div>'}
            </div>
            <button onclick="event.stopPropagation(); togglePromoStatus('${p.id}')" class="text-xs px-3 py-1 rounded-lg" style="background:${active ? 'rgba(39,174,96,.15)' : 'rgba(231,76,60,.15)'};color:${active ? 'var(--success)' : 'var(--danger)'}">${active ? 'Aktif' : 'Nonaktif'}</button>
          </div>
        </div>`;
        }).join('')}
        ${!(promos || []).length ? '<div class="text-center py-6 text-sm" style="color:var(--muted)">Belum ada promo</div>' : ''}
      </div>
    </div>`;
  } catch(e) { console.error(e); showToast('Gagal memuat promo', 'error'); return ''; }
  finally { hideSkeleton('admin-promos'); }
}

async function togglePromoStatus(id) {
  try {
    var p = DB.promos.find(function(x) { return x.id === id; });
    if (!p) return;
    if (!p.is_active && (p.start_date || p.end_date)) {
      var now = new Date();
      if (p.start_date && new Date(p.start_date) > now) {
        showToast('Promo belum bisa diaktifkan — tanggal mulai belum tiba', 'warning');
        return;
      }
      if (p.end_date && new Date(p.end_date) < now) {
        showToast('Promo tidak bisa diaktifkan — periode sudah berakhir', 'warning');
        return;
      }
    }
    var newActive = !p.is_active;
    await API.updatePromo(id, { is_active: newActive });
    DB.promos = await API.getPromos();
    showToast('Promo ' + p.title + ' ' + (newActive ? 'diaktifkan' : 'dinonaktifkan'), 'info');
    await render();
  } catch(e) { console.error(e); showToast('Gagal mengubah status promo', 'error'); }
}

function renderPromoMenuCheckboxes(prefix, selected) {
  selected = selected || [];
  return DB.menuItems.map(function(m) {
    return '<label class="flex items-center gap-2 text-sm py-1 cursor-pointer">' +
      '<input type="checkbox" id="' + prefix + '-menu-' + m.id + '" value="' + m.id + '" ' + (selected.indexOf(m.id) !== -1 ? 'checked' : '') + ' style="accent-color:var(--accent)">' +
      '<img src="' + m.image + '" class="w-6 h-6 rounded object-cover" onerror="this.src=\'https://picsum.photos/seed/' + m.id + '/40/40\'">' +
      '<span class="flex-1">' + m.name + '</span>' +
      '<span style="color:var(--muted);font-size:11px">' + formatCurrency(m.price) + '</span>' +
    '</label>';
  }).join('');
}

function getSelectedMenuIds(prefix) {
  return DB.menuItems.filter(function(m) { return document.getElementById(prefix + '-menu-' + m.id)?.checked; }).map(function(m) { return m.id; });
}

function showAddPromoModal() {
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Tambah Promo</h3>
      <div class="space-y-3">
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Judul Promo</label><input id="new-promo-title" class="input-field text-sm" placeholder="Misal: Diskon 50%"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Kode Promo</label><input id="new-promo-code" class="input-field text-sm" placeholder="Misal: diskon50"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Deskripsi</label><input id="new-promo-desc" class="input-field text-sm" placeholder="Penjelasan singkat promo"></div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Tipe Diskon</label>
            <select id="new-promo-disc-type" class="input-field text-sm">
              <option value="percent">Persentase (%)</option>
              <option value="fixed">Nominal (Rp)</option>
            </select>
          </div>
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Nilai Diskon</label><input id="new-promo-disc-value" type="number" class="input-field text-sm" placeholder="50" min="0"></div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Tanggal Mulai</label><input id="new-promo-start" type="date" class="input-field text-sm"></div>
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Tanggal Berakhir</label><input id="new-promo-end" type="date" class="input-field text-sm"></div>
        </div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Gambar Promo</label>${renderImageInput('new-promo', '')}</div>
        <div>
          <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Pilih Menu yang Mendapat Diskon</label>
          <div class="max-h-40 overflow-y-auto space-y-1 p-2 rounded-xl" style="background:var(--bg2)">${renderPromoMenuCheckboxes('new-promo', [])}</div>
        </div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Syarat & Ketentuan (pisahkan dgn koma)</label><textarea id="new-promo-terms" class="input-field text-sm min-h-[60px]" placeholder="Berlaku hari Senin, Minimal order 50rb..."></textarea></div>
      </div>
      <button onclick="addPromo()" class="btn-primary w-full mt-4 text-center">Simpan Promo</button>
    </div>
  `);
}

async function addPromo() {
  try {
    var title = document.getElementById('new-promo-title')?.value;
    var code = document.getElementById('new-promo-code')?.value;
    var desc = document.getElementById('new-promo-desc')?.value;
    var discount_type = document.getElementById('new-promo-disc-type')?.value || 'percent';
    var discount_value = parseInt(document.getElementById('new-promo-disc-value')?.value || '0');
    var start_date = document.getElementById('new-promo-start')?.value || '';
    var end_date = document.getElementById('new-promo-end')?.value || '';
    var termsStr = document.getElementById('new-promo-terms')?.value || '';
    if (!title || !code) { showToast('Judul dan kode promo wajib diisi', 'warning'); return; }
    if (!discount_value) { showToast('Nilai diskon wajib diisi', 'warning'); return; }
    if (start_date && end_date && end_date <= start_date) { showToast('Tanggal berakhir harus setelah tanggal mulai', 'warning'); return; }
    var modeEl = document.getElementById('new-promo-img-mode');
    var mode = modeEl ? modeEl.value : null;
    var imgEl = document.getElementById('new-promo-img-url');
    var image = imgEl ? imgEl.value : null;
    if (mode === 'upload') {
      var preview = document.getElementById('new-promo-img-preview');
      var img = preview && preview.querySelector('img');
      if (img) image = img.src;
    }
    if (!image) image = 'https://picsum.photos/seed/' + Date.now() + '/400/300';
    var promoData = {
      id: 'p' + Date.now(),
      code: code,
      title: title,
      desc: desc,
      discount_type: discount_type,
      discount_value: discount_value,
      start_date: start_date,
      end_date: end_date,
      image: image,
      menu_ids: getSelectedMenuIds('new-promo'),
      terms: termsStr.split(',').map(function(t) { return t.trim(); }).filter(Boolean),
      is_active: true
    };
    await API.createPromo(promoData);
    DB.promos = await API.getPromos();
    closeModal();
    showToast('Promo berhasil ditambahkan', 'success');
    await render();
  } catch(e) { console.error(e); showToast('Gagal menambah promo', 'error'); }
}

function showEditPromoModal(id) {
  var p = DB.promos.find(function(x) { return x.id === id; });
  if (!p) return;
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Edit Promo</h3>
      <div class="space-y-3">
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Judul Promo</label><input id="edit-promo-title" class="input-field text-sm" value="${p.title.replace(/"/g, '&quot;')}"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Kode Promo</label><input id="edit-promo-code" class="input-field text-sm" value="${p.code}"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Deskripsi</label><input id="edit-promo-desc" class="input-field text-sm" value="${(p.desc||'').replace(/"/g, '&quot;')}"></div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Tipe Diskon</label>
            <select id="edit-promo-disc-type" class="input-field text-sm">
              <option value="percent" ${p.discount_type === 'percent' ? 'selected' : ''}>Persentase (%)</option>
              <option value="fixed" ${p.discount_type === 'fixed' ? 'selected' : ''}>Nominal (Rp)</option>
            </select>
          </div>
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Nilai Diskon</label><input id="edit-promo-disc-value" type="number" class="input-field text-sm" value="${p.discount_value || 0}" min="0"></div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Tanggal Mulai</label><input id="edit-promo-start" type="date" class="input-field text-sm" value="${p.start_date || ''}"></div>
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Tanggal Berakhir</label><input id="edit-promo-end" type="date" class="input-field text-sm" value="${p.end_date || ''}"></div>
        </div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Gambar Promo</label>${renderImageInput('edit-promo', p.image || '')}</div>
        <div>
          <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Pilih Menu yang Mendapat Diskon</label>
          <div class="max-h-40 overflow-y-auto space-y-1 p-2 rounded-xl" style="background:var(--bg2)">${renderPromoMenuCheckboxes('edit-promo', p.menu_ids || [])}</div>
        </div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Syarat & Ketentuan (pisahkan dgn koma)</label><textarea id="edit-promo-terms" class="input-field text-sm min-h-[60px]">${(p.terms||[]).join(', ')}</textarea></div>
      </div>
      <div class="flex gap-2 mt-4">
        <button onclick="deletePromo('${p.id}')" class="btn-sm flex-1 text-center" style="background:rgba(231,76,60,.15);color:var(--danger);border:1px solid rgba(231,76,60,.3);border-radius:10px;padding:10px"><i class="fas fa-trash mr-1"></i>Hapus</button>
        <button onclick="saveEditPromo('${p.id}')" class="btn-primary flex-1 text-center">Simpan</button>
      </div>
    </div>
  `);
}

async function saveEditPromo(id) {
  try {
    var p = DB.promos.find(function(x) { return x.id === id; });
    if (!p) return;
    var title = document.getElementById('edit-promo-title')?.value;
    var code = document.getElementById('edit-promo-code')?.value;
    var discount_value = parseInt(document.getElementById('edit-promo-disc-value')?.value || '0');
    if (!title || !code) { showToast('Judul dan kode promo wajib diisi', 'warning'); return; }
    if (!discount_value) { showToast('Nilai diskon wajib diisi', 'warning'); return; }
    var start_date = document.getElementById('edit-promo-start')?.value || '';
    var end_date = document.getElementById('edit-promo-end')?.value || '';
    if (start_date && end_date && end_date <= start_date) { showToast('Tanggal berakhir harus setelah tanggal mulai', 'warning'); return; }
    var updateData = {
      title: title,
      code: code,
      desc: document.getElementById('edit-promo-desc')?.value,
      discount_type: document.getElementById('edit-promo-disc-type')?.value || 'percent',
      discount_value: discount_value,
      start_date: start_date,
      end_date: end_date
    };
    var modeEl = document.getElementById('edit-promo-img-mode');
    var mode = modeEl ? modeEl.value : null;
    var imgEl = document.getElementById('edit-promo-img-url');
    var image = imgEl ? imgEl.value : null;
    if (mode === 'upload') {
      var preview = document.getElementById('edit-promo-img-preview');
      var img = preview && preview.querySelector('img');
      if (img) image = img.src;
    }
    if (image) updateData.image = image;
    updateData.menu_ids = getSelectedMenuIds('edit-promo');
    var termsStr = document.getElementById('edit-promo-terms')?.value || '';
    updateData.terms = termsStr.split(',').map(function(t) { return t.trim(); }).filter(Boolean);
    await API.updatePromo(id, updateData);
    DB.promos = await API.getPromos();
    closeModal();
    showToast('Promo berhasil diperbarui', 'success');
    await render();
  } catch(e) { console.error(e); showToast('Gagal memperbarui promo', 'error'); }
}

function deletePromo(id) {
  var p = DB.promos.find(function(x) { return x.id === id; });
  if (!p) return;
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Konfirmasi Hapus</h3>
      <p class="text-sm mb-4">Hapus promo "${p.title}"? Tindakan ini tidak dapat dibatalkan.</p>
      <div class="flex gap-2">
        <button onclick="closeModal()" class="btn-sm flex-1 text-center" style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:10px;cursor:pointer">Batal</button>
        <button onclick="confirmDeletePromo('${id}')" class="btn-sm flex-1 text-center" style="background:rgba(231,76,60,.15);color:var(--danger);border:1px solid rgba(231,76,60,.3);border-radius:10px;padding:10px;cursor:pointer"><i class="fas fa-trash mr-1"></i>Hapus</button>
      </div>
    </div>
  `);
}

async function confirmDeletePromo(id) {
  try {
    await API.deletePromo(id);
    DB.promos = DB.promos.filter(function(x) { return x.id !== id; });
    closeModal();
    showToast('Promo dihapus', 'info');
    await render();
  } catch(e) { console.error(e); showToast('Gagal menghapus promo', 'error'); }
}
