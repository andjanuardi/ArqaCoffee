// ------------------------------------------------------------------
// MENU MANAGEMENT
// ------------------------------------------------------------------
function renderAdminMenuMgmt() {
  if (!State.adminMenuFilter) State.adminMenuFilter = '';
  const isMitra = State.currentUser?.role === 'mitra_juru_masak';
  const menuSource = isMitra
    ? DB.menuItems.filter(m => m.submitted_by === State.currentUser.name)
    : DB.menuItems;
  const cats = [...new Set(menuSource.map(m => m.category).filter(Boolean))];
  const labelMap = { coffee: 'Kopi', 'non-coffee': 'Non-Kopi', food: 'Makanan', snack: 'Snack' };
  const pending = menuSource.filter(m => m.is_approved === false);
  const approved = menuSource.filter(m => m.is_approved !== false);
  const filtered = approved.filter(m => !State.adminMenuFilter || m.category === State.adminMenuFilter);
  const isAdmin = State.currentUser?.role === 'admin' || State.currentUser?.role === 'manager';
  return `
  <div class="animate-fade-up">
    <div class="flex justify-between items-center mb-4">
      <h2 class="font-display text-xl font-bold">Kelola Menu</h2>
      <button onclick="showAddMenuItemModal()" class="btn-primary btn-sm"><i class="fas fa-plus mr-1"></i>Tambah</button>
    </div>
    ${pending.length > 0 ? `
    <div class="mb-4 p-3 rounded-xl flex items-center gap-2 text-xs" style="background:rgba(243,156,18,.1);border:1px solid rgba(243,156,18,.2);color:var(--warning)">
      <i class="fas fa-clock"></i>
      <span class="font-semibold">${pending.length} menu menunggu persetujuan</span>
    </div>
    <div class="mb-6">
      <h3 class="font-semibold text-sm mb-3 flex items-center gap-2"><span class="w-2 h-2 rounded-full" style="background:var(--warning)"></span>Menunggu Persetujuan</h3>
      <div class="space-y-2">
        ${pending.map(m => `
        <div class="card flex items-center gap-3 p-3" style="border-color:rgba(243,156,18,.3)">
          <img src="${m.image}" class="w-12 h-12 rounded-xl object-cover" onerror="this.src='https://picsum.photos/seed/${m.id}/100/100'">
          <div class="flex-1 min-w-0">
            <div class="font-semibold text-sm truncate">${m.name}</div>
            <div class="text-xs" style="color:var(--muted)">${m.category} — ${formatCurrency(m.price)}</div>
            <div class="text-[10px]" style="color:var(--muted)"><i class="fas fa-user mr-1"></i>${m.submitted_by || 'Mitra'}</div>
          </div>
          ${isAdmin ? `
          <div class="flex gap-2 shrink-0">
            <button onclick="event.stopPropagation();approveMenuItem('${m.id}')" class="btn-sm text-xs" style="background:linear-gradient(135deg,var(--success),#1e8449);color:#fff;border:none;padding:6px 12px;border-radius:8px;cursor:pointer"><i class="fas fa-check mr-1"></i>Setujui</button>
            <button onclick="event.stopPropagation();rejectMenuItem('${m.id}')" class="btn-sm text-xs" style="background:rgba(231,76,60,.1);color:var(--danger);border:none;padding:6px 12px;border-radius:8px;cursor:pointer"><i class="fas fa-times mr-1"></i>Tolak</button>
          </div>` : `
          <button onclick="event.stopPropagation();cancelOwnMenuItem('${m.id}')" class="btn-sm text-xs" style="background:rgba(231,76,60,.1);color:var(--danger);border:none;padding:6px 12px;border-radius:8px;cursor:pointer"><i class="fas fa-ban mr-1"></i>Batalkan</button>`}
        </div>`).join('')}
      </div>
    </div>` : ''}
    <div class="flex gap-2 mb-4 overflow-x-auto pb-2" style="-webkit-overflow-scrolling:touch;scrollbar-width:none;">
      <div class="category-chip ${!State.adminMenuFilter ? 'active' : ''}" onclick="State.adminMenuFilter='';render()">Semua</div>
      ${cats.map(c => `<div class="category-chip ${State.adminMenuFilter === c ? 'active' : ''}" onclick="State.adminMenuFilter='${c}';render()">${labelMap[c] || c}</div>`).join('')}
    </div>
    <div class="space-y-3">
      <h3 class="font-semibold text-xs mb-2" style="color:var(--muted)">${pending.length > 0 ? 'Menu Aktif' : ''}</h3>
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

function approveMenuItem(id) {
  const m = DB.menuItems.find(x => x.id === id);
  if (!m) return;
  m.is_approved = true;
  showToast(`Menu "${m.name}" disetujui!`, 'success');
  render();
}

function rejectMenuItem(id) {
  const m = DB.menuItems.find(x => x.id === id);
  if (!m) return;
  DB.menuItems = DB.menuItems.filter(x => x.id !== id);
  showToast(`Menu "${m.name}" ditolak`, 'info');
  render();
}

function cancelOwnMenuItem(id) {
  const m = DB.menuItems.find(x => x.id === id);
  if (!m) return;
  DB.menuItems = DB.menuItems.filter(x => x.id !== id);
  showToast(`Menu "${m.name}" dibatalkan`, 'info');
  render();
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
