// ------------------------------------------------------------------
// MENU MANAGEMENT
// ------------------------------------------------------------------
function renderAdminMenuMgmt() {
  autoUpdateMenuAvailability();
  if (!State.adminMenuFilter) State.adminMenuFilter = '';
  const cats = [...new Set(DB.menuItems.map(m => m.category).filter(Boolean))];
  const labelMap = { coffee: 'Kopi', 'non-coffee': 'Non-Kopi', food: 'Makanan', snack: 'Snack' };
  const filtered = DB.menuItems.filter(m => !State.adminMenuFilter || m.category === State.adminMenuFilter);
  return `
  <div class="animate-fade-up">
    <div class="flex justify-between items-center mb-4">
      <h2 class="font-display text-xl font-bold">Kelola Menu</h2>
      <button onclick="showAddMenuItemModal()" class="btn-primary btn-sm"><i class="fas fa-plus mr-1"></i>Tambah</button>
    </div>
    <div class="mb-4">
      <select id="admin-menu-filter" class="input-field text-sm" onchange="State.adminMenuFilter=this.value;render()">
        <option value="">Semua Kategori</option>
        ${cats.map(c => `<option value="${c}" ${State.adminMenuFilter === c ? 'selected' : ''}>${labelMap[c] || c}</option>`).join('')}
      </select>
    </div>
    <div class="space-y-3">
      ${filtered.map(m => `
      <div class="card flex items-center gap-4 cursor-pointer hover:scale-[1.01] transition-transform" onclick="showEditMenuItemModal('${m.id}')">
        <img src="${m.image}" class="w-14 h-14 rounded-xl object-cover" onerror="this.src='https://picsum.photos/seed/${m.id}/100/100'">
        <div class="flex-1 min-w-0">
          <div class="font-semibold text-sm truncate">${m.name}</div>
          <div class="text-xs" style="color:var(--muted)">${m.category} — ${formatCurrency(m.price)}</div>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="event.stopPropagation(); toggleMenuAvail('${m.id}')" class="text-xs px-3 py-1 rounded-lg" style="background:${m.is_available ? 'rgba(39,174,96,.15)' : 'rgba(231,76,60,.15)'};color:${m.is_available ? 'var(--success)' : 'var(--danger)'}">${m.is_available ? 'Tersedia' : 'Tidak Tersedia'}</button>
        </div>
      </div>`).join('')}
      ${filtered.length === 0 ? '<div class="text-center py-6 text-sm" style="color:var(--muted)">Tidak ada menu di kategori ini</div>' : ''}
    </div>
  </div>`;
}

function autoUpdateMenuAvailability() {
  if (!DB.menuStockMapping) return;
  let changed = [];
  DB.menuItems.forEach(m => {
    const deps = DB.menuStockMapping[m.id];
    if (!deps || deps.length === 0) return;
    const insufficient = deps.some(r => {
      const sid = typeof r === 'string' ? r : r.id;
      const needQty = typeof r === 'string' ? 1 : (r.qty || 1);
      const s = DB.stockItems.find(x => x.id === sid);
      return !s || s.current_quantity < needQty;
    });
    const newAvail = !insufficient;
    if (m.is_available !== newAvail) {
      m.is_available = newAvail;
      changed.push(m.name + ': ' + (newAvail ? 'Tersedia' : 'Tidak Tersedia'));
      if (!newAvail) {
        addNotification({
          title: 'Menu Otomatis Tidak Tersedia',
          message: m.name + ' — bahan baku tidak mencukupi',
          type: 'warning',
          icon: 'fa-circle-exclamation',
          targetRoles: ['cashier', 'kitchen'],
        });
      }
    }
  });
  if (changed.length) showToast('Status menu diperbarui: ' + changed.join(', '), 'info');
}

function toggleMenuAvail(id) {
  const m = DB.menuItems.find(x => x.id === id);
  if (m) { m.is_available = !m.is_available; showToast(`${m.name}: ${m.is_available ? 'Tersedia' : 'Tidak Tersedia'}`, 'info'); render(); }
  if (m && !m.is_available) {
    addNotification({
      title: 'Menu Tidak Tersedia',
      message: m.name + ' — ditandai tidak tersedia',
      type: 'warning',
      icon: 'fa-circle-exclamation',
      targetRoles: ['cashier', 'kitchen'],
    });
  }
}
