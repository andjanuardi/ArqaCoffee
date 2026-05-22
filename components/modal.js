// ============================================================
// MODAL SYSTEM
// ============================================================
let modalCallback = null;

function showModal(html, callback) {
  closeModal();
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'modal-overlay';
  overlay.innerHTML = `<div class="modal-content">${html}</div>`;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  if (callback) {
    modalCallback = callback;
    setTimeout(() => {
      if (modalCallback) modalCallback();
    }, 50);
  }
}

function closeModal() {
  const modal = document.getElementById('modal-overlay');
  if (modal) modal.remove();
  modalCallback = null;
  Object.keys(State.mapInstances).forEach(key => {
    if (key.startsWith('modal-') || key === 'tracking') {
      try { State.mapInstances[key].remove(); } catch (e) { }
      delete State.mapInstances[key];
    }
  });
}

function showMenuItem(id) {
  const m = getMenuItem(id);
  if (!m) return;
  State._activeMenuItem = m;
  modalQty = 1;
  const activePromo = State.activePromoId ? DB.promos.find(x => x.id === State.activePromoId) : null;
  const hasPromo = activePromo && activePromo.is_active && (!activePromo.menu_ids || !activePromo.menu_ids.length || activePromo.menu_ids.includes(m.id));
  const discPrice = hasPromo && activePromo.discount_type === 'fixed'
    ? Math.max(0, m.price - activePromo.discount_value)
    : hasPromo
      ? Math.round(m.price * (1 - activePromo.discount_value / 100))
      : m.price;
  showModal(`
    <div>
      <div class="relative">
        <img src="${m.image}" alt="${m.name}" class="w-full h-48 object-cover rounded-xl mb-4" onerror="this.src='https://picsum.photos/seed/${m.id}/400/300'">
        ${hasPromo ? '<div class="absolute top-2 left-2 text-[10px] font-bold px-3 py-1 rounded-full" style="background:var(--success);color:#fff"><i class="fas fa-tag mr-1"></i>Diskon Promo</div>' : ''}
      </div>
      <div class="flex justify-between items-start mb-2">
        <h3 class="font-display text-xl font-bold">${m.name}</h3>
        <div class="text-right">
          ${hasPromo ? `<div class="text-xs line-through" style="color:var(--muted)">${formatCurrency(m.price)}</div><div class="font-bold text-lg" style="color:var(--success)">${formatCurrency(discPrice)}</div>` : `<span class="font-bold text-lg" style="color:var(--accent)">${formatCurrency(m.price)}</span>`}
        </div>
      </div>
      <p class="text-sm mb-4" style="color:var(--muted)">${m.description}</p>
      <div class="mb-4">
        <label class="text-xs font-semibold mb-2 block" style="color:var(--muted)">Catatan</label>
        <input id="item-notes" class="input-field text-sm" placeholder="Misal: kurangi gula, extra shot...">
      </div>
      <div class="flex items-center justify-between mb-6">
        <span class="text-sm font-semibold">Jumlah</span>
        <div class="flex items-center gap-3">
          <div class="qty-btn" onclick="updateModalQty(-1)">-</div>
          <span id="modal-qty" class="font-bold text-lg w-8 text-center">${modalQty}</span>
          <div class="qty-btn" onclick="updateModalQty(1)">+</div>
        </div>
      </div>
      <button onclick="addToCart('${m.id}')" class="btn-primary w-full flex items-center justify-center gap-2">
        <i class="fas fa-plus"></i> Tambah ke Keranjang — <span id="modal-total">${hasPromo ? formatCurrency(discPrice) : formatCurrency(m.price)}</span>
      </button>
    </div>
  `);
}

let modalQty = 1;
function updateModalQty(d) {
  modalQty = Math.max(1, modalQty + d);
  const el = document.getElementById('modal-qty');
  if (el) el.textContent = modalQty;
  const unitPrice = typeof State._activeDiscPrice === 'number' ? State._activeDiscPrice : (State._activeMenuItem && State._activeMenuItem.price) || 0;
  const t = document.getElementById('modal-total');
  if (t) t.textContent = formatCurrency(unitPrice * modalQty);
}
