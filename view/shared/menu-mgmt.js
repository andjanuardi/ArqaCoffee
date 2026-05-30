// ------------------------------------------------------------------
// MENU MANAGEMENT
// ------------------------------------------------------------------
function renderAdminMenuMgmt() {
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
    <div class="flex gap-2 mb-4 overflow-x-auto pb-2" style="-webkit-overflow-scrolling:touch;scrollbar-width:none;">
      <div class="category-chip ${!State.adminMenuFilter ? 'active' : ''}" onclick="State.adminMenuFilter='';render()">Semua</div>
      ${cats.map(c => `<div class="category-chip ${State.adminMenuFilter === c ? 'active' : ''}" onclick="State.adminMenuFilter='${c}';render()">${labelMap[c] || c}</div>`).join('')}
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
