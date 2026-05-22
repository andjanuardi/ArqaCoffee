// ============================================================
// CUSTOMER VIEW
// ============================================================
function renderCustomerView() {
  const tab = State.currentTab.customer || "menu";
  if (tab === "menu") return renderCustomerMenu();
  if (tab === "cart") return renderCustomerCart();
  if (tab === "orders") return renderCustomerOrders();
  if (tab === "profile") return renderCustomerProfile();
  return renderCustomerMenu();
}

function renderCustomerMenu() {
  const cats = [
    { id: "all", label: "Semua" },
    { id: "coffee", label: "Kopi" },
    { id: "non-coffee", label: "Non-Kopi" },
    { id: "food", label: "Makanan" },
    { id: "snack", label: "Snack" },
  ];
  let items = DB.menuItems.filter((m) => m.is_available);
  if (State.selectedCategory !== "all")
    items = items.filter((m) => m.category === State.selectedCategory);
  if (State.searchQuery)
    items = items.filter((m) =>
      m.name.toLowerCase().includes(State.searchQuery.toLowerCase()),
    );

  return `
  <div class="animate-fade-up">
    ${
      State.selectedTable
        ? `<div class="mb-4 flex items-center gap-2"><span class="badge badge-ready"><i class="fas fa-qrcode mr-1"></i>Meja ${getTable(State.selectedTable)?.number || "-"}</span></div>`
        : `
    <div class="mb-6">
      <h2 class="font-display text-2xl md:text-3xl font-black mb-1">Good ${getGreeting()}, ${State.currentUser.name.split(" ")[0]}</h2>
      <p style="color:var(--muted)">It's time for a coffee break!</p>
    </div>`
    }

      <div class="flex items-center gap-3 mb-4">
        <div class="flex-1 relative">
          <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2" style="color:var(--muted);font-size:13px"></i>
          <input type="text" placeholder="Cari menu..." class="input-field pl-9 text-sm" value="${State.searchQuery}" oninput="State.searchQuery=this.value" onchange="render()" onkeypress="if(event.key==='Enter')render()">
        </div>
      </div>
      ${
        State.activePromoId
          ? (() => {
              const activeP = DB.promos.find(x => x.id === State.activePromoId);
              return activeP ? `
    <div class="flex items-center gap-2 mb-4 text-xs p-3 rounded-xl" style="background:rgba(39,174,96,.1);color:var(--success)">
      <i class="fas fa-tag"></i>
      <span class="flex-1">Promo <b>${activeP.title}</b> aktif — diskon otomatis di keranjang</span>
      <button onclick="State.activePromoId=null;showToast('Promo dibatalkan','info');render()" class="text-xs font-bold underline shrink-0" style="color:var(--danger)">Batalkan</button>
    </div>` : '';
            })()
          : ""
      }
      ${
        DB.promos && DB.promos.filter((p) => p.is_active && p.id !== State.activePromoId).length > 0
          ? `
    <div class="promo-carousel" id="promo-carousel">
      <div class="promo-track" id="promo-track">
        ${DB.promos
          .filter((p) => p.is_active && p.id !== State.activePromoId)
          .map(
            (p) => {
              const discLabel = p.discount_type === 'fixed' ? formatCurrency(p.discount_value) : p.discount_value + '%';
              const bgStyle = p.image ? `background:linear-gradient(135deg,rgba(0,0,0,.6),rgba(0,0,0,.3)),url('${p.image}') center/cover` : `background:linear-gradient(135deg,${p.color || '#E07A3A'},${p.color || '#E07A3A'}dd)`;
              const isActivePromo = State.activePromoId === p.id;
              return `
        <div class="rounded-2xl p-4 relative overflow-hidden cursor-pointer promo-card ${isActivePromo ? 'ring-2 ring-offset-2' : ''}" onclick="showPromoDetail('${p.id}')" style="${bgStyle};color:#fff;${isActivePromo ? '--tw-ring-color:var(--accent)' : ''}">
          ${isActivePromo ? '<div class="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full" style="background:rgba(39,174,96,.9);color:#fff">Aktif</div>' : ''}
          <div class="text-xs font-semibold mb-1 uppercase" style="opacity:.85;letter-spacing:1px">Diskon ${discLabel}</div>
          <div class="font-display text-lg font-black mb-1 promo-title">${p.title}</div>
          <div class="text-xs mb-3 promo-desc" style="opacity:.8">${p.desc}</div>
          <div class="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-lg" style="background:rgba(255,255,255,.25)">${isActivePromo ? 'Aktif' : 'Klaim'} <i class="fas fa-arrow-right" style="font-size:10px"></i></div>
        </div>`;
            }
          )
          .join("")}
      </div>
      ${DB.promos.filter((p) => p.is_active && p.id !== State.activePromoId).length > 1 ? '<div class="promo-dots" id="promo-dots"></div>' : ''}
    </div>`
          : ""
      }
    <div class="flex gap-2 mb-5 overflow-x-auto pb-2" style="-webkit-overflow-scrolling:touch;     scrollbar-width: none;">
      ${cats.map((c) => `<div class="category-chip ${State.selectedCategory === c.id ? "active" : ""}" onclick="State.selectedCategory='${c.id}';render()">${c.label}</div>`).join("")}
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      ${items
        .map(
          (m) => {
            const hasPromo = State.activePromoId && (() => {
              const p = DB.promos.find(x => x.id === State.activePromoId);
              if (!p || !p.is_active) return false;
              return !p.menu_ids || !p.menu_ids.length || p.menu_ids.includes(m.id);
            })();
            return `
      <div class="menu-card ${hasPromo ? 'ring-2' : ''}" onclick="showMenuItem('${m.id}')" ${hasPromo ? 'style="--tw-ring-color:var(--success)"' : ''}>
        <div class="relative">
          <img src="${m.image}" alt="${m.name}" loading="lazy" onerror="this.src='https://picsum.photos/seed/${m.id}/400/300'">
          ${hasPromo ? '<div class="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full" style="background:var(--success);color:#fff"><i class="fas fa-tag mr-1" style="font-size:8px"></i>Diskon</div>' : ''}
        </div>
        <div class="p-3">
          <div class="font-semibold text-sm mb-1 truncate">${m.name}</div>
          <div class="font-bold text-sm" style="color:var(--accent)">${formatCurrency(m.price)}</div>
        </div>
      </div>`;}
        )
        .join("")}
    </div>
    ${items.length === 0 ? '<div class="text-center py-12"><i class="fas fa-mug-saucer text-4xl mb-3" style="color:var(--border)"></i><p style="color:var(--muted)">Menu tidak ditemukan</p></div>' : ""}
  </div>`;
}

function getGreeting() {
  const h = new Date().getHours();
  return h < 12 ? "Pagi" : h < 17 ? "Siang" : "Malam";
}

let _promoInterval = null;

function initPromoCarousel() {
  var track = document.getElementById('promo-track');
  var dots = document.getElementById('promo-dots');
  if (!track) return;

  if (_promoInterval) { clearInterval(_promoInterval); _promoInterval = null; }

  var cards = track.querySelectorAll('.promo-card');
  if (cards.length < 2) return;

  var cardWidth = cards[0].offsetWidth + 12;
  var idx = 0;

  var carousel = track.closest('.promo-carousel');
  if (!carousel) return;

  function goTo(i) {
    idx = Math.max(0, Math.min(i, cards.length - 1));
    track.style.transform = 'translateX(-' + (idx * cardWidth) + 'px)';
    track.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    if (dots) dots.querySelectorAll('.promo-dot').forEach(function (d, j) { d.classList.toggle('active', j === idx); });
  }

  if (dots) {
    dots.innerHTML = '';
    cards.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.className = 'promo-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', function () { goTo(i); });
      dots.appendChild(dot);
    });
  }

  _promoInterval = setInterval(function () {
    goTo(idx + 1 >= cards.length ? 0 : idx + 1);
  }, 5000);

  carousel.addEventListener('mouseenter', function () {
    if (_promoInterval) { clearInterval(_promoInterval); _promoInterval = null; }
  });
  carousel.addEventListener('mouseleave', function () {
    if (!_promoInterval) {
      _promoInterval = setInterval(function () {
        goTo(idx + 1 >= cards.length ? 0 : idx + 1);
      }, 5000);
    }
  });

  /* ----- manual swipe / drag ----- */
  var startX = 0, currentX = 0, isDragging = false;

  function onStart(px) {
    if (_promoInterval) { clearInterval(_promoInterval); _promoInterval = null; }
    isDragging = true;
    startX = px; currentX = px;
    track.style.transition = 'none';
    track.style.cursor = 'grabbing';
  }

  function onMove(px) {
    if (!isDragging) return;
    currentX = px;
    track.style.transform = 'translateX(' + (-(idx * cardWidth) + (currentX - startX)) + 'px)';
  }

  function onEnd() {
    if (!isDragging) return;
    isDragging = false;
    track.style.cursor = '';
    var diff = currentX - startX;
    if (Math.abs(diff) > cardWidth * 0.25) {
      if (diff < 0) goTo(idx + 1); else goTo(idx - 1);
    } else {
      goTo(idx);
    }
  }

  track.addEventListener('touchstart', function (e) { onStart(e.touches[0].clientX); }, { passive: true });
  track.addEventListener('touchmove', function (e) { onMove(e.touches[0].clientX); }, { passive: true });
  track.addEventListener('touchend', onEnd, { passive: true });

  track.addEventListener('mousedown', function (e) { onStart(e.clientX); e.preventDefault(); });
  document.addEventListener('mousemove', function (e) { onMove(e.clientX); });
  document.addEventListener('mouseup', onEnd);
}

function showPromoDetail(promoId) {
  const p = DB.promos.find((x) => x.id === promoId);
  if (!p) return;
  const discLabel = p.discount_type === 'fixed' ? formatCurrency(p.discount_value) : p.discount_value + '%';
  const imgHtml = p.image ? `<img src="${p.image}" class="w-full h-40 object-cover rounded-xl mb-4" onerror="this.src='https://picsum.photos/seed/${p.id}/400/200'">` : `<div class="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl" style="background:${p.color || '#E07A3A'};color:#fff"><i class="fas ${p.icon || 'fa-tag'}"></i></div>`;
  const includedMenus = (p.menu_ids || []).map(id => DB.menuItems.find(m => m.id === id)).filter(Boolean);
  const isActive = State.activePromoId === p.id;
  showModal(`
    <div class="text-center">
      ${imgHtml}
      <h3 class="font-display text-xl font-bold mb-2">${p.title}</h3>
      <p class="text-sm mb-4" style="color:var(--muted)">${p.desc}</p>
      <div class="flex justify-center gap-4 mb-4">
        <div class="stat-card text-center">
          <div class="text-xs" style="color:var(--muted)">Diskon</div>
          <div class="text-lg font-bold mt-1" style="color:var(--accent)">${discLabel}</div>
        </div>
        ${p.start_date ? `<div class="stat-card text-center">
          <div class="text-xs" style="color:var(--muted)">Periode</div>
          <div class="text-sm font-bold mt-1">${formatDate(p.start_date)}</div>
          <div class="text-xs" style="color:var(--muted)">- ${p.end_date ? formatDate(p.end_date) : '...'}</div>
        </div>` : ''}
      </div>
      ${includedMenus.length ? `<div class="text-left mb-4 p-3 rounded-xl" style="background:var(--bg2)">
        <div class="text-xs font-semibold mb-2" style="color:var(--muted)">Menu yang Mendapat Diskon:</div>
        <div class="space-y-2">
          ${includedMenus.map(m => `
            <div class="flex items-center gap-2 text-sm">
              <img src="${m.image}" class="w-8 h-8 rounded-lg object-cover" onerror="this.src='https://picsum.photos/seed/${m.id}/60/60'">
              <span class="flex-1 text-left">${m.name}</span>
              <span style="color:var(--accent);font-weight:600">${discLabel}</span>
            </div>`).join('')}
        </div>
      </div>` : '<div class="text-left mb-4 p-3 rounded-xl" style="background:var(--bg2);font-size:12px;color:var(--muted)">Berlaku untuk semua menu</div>'}
      <div class="text-left mb-4 p-3 rounded-xl" style="background:var(--bg2)">
        <div class="text-xs font-semibold mb-2" style="color:var(--muted)">Syarat & Ketentuan:</div>
        <ul class="text-xs space-y-1" style="color:var(--muted)">
          ${(p.terms||[]).map((t) => `<li class="flex items-start gap-2"><i class="fas fa-check-circle mt-0.5" style="color:var(--success);font-size:10px"></i><span>${t}</span></li>`).join("")}
        </ul>
      </div>
      ${isActive ? `<button onclick="closeModal(); State.activePromoId=null; showToast('Promo dibatalkan','info'); render()" class="btn-sm w-full text-center" style="background:rgba(231,76,60,.15);color:var(--danger);border:1px solid rgba(231,76,60,.3);border-radius:10px;padding:10px;cursor:pointer">Batalkan Promo</button>` : `<button onclick="applyPromo('${p.id}')" class="btn-primary w-full text-center">Gunakan Promo</button>`}
    </div>
  `);
}

function applyPromo(promoId) {
  const p = DB.promos.find(x => x.id === promoId);
  if (!p) return;
  State.activePromoId = p.id;
  closeModal();
  showToast(`Promo ${p.title} diterapkan!`, 'success');
  render();
}

function startQRScan() {
  showModal(`
    <div class="text-center">
      <h3 class="font-display text-xl font-bold mb-2">Scan QR Code Meja</h3>
      <p class="text-sm mb-6" style="color:var(--muted)">Arahkan kamera ke kode QR di meja Anda</p>
      <div class="qr-scanner-area mb-6 flex items-center justify-center" style="background:rgba(0,0,0,.3)">
        <div class="qr-line"></div>
        <i class="fas fa-qrcode text-5xl" style="color:var(--accent);opacity:.3"></i>
      </div>
      <p class="text-xs mb-4" style="color:var(--muted)">Atau pilih meja secara manual:</p>
      <div class="grid grid-cols-4 gap-3 mb-6">
        ${DB.tables
          .map(
            (
              t,
            ) => `<button class="card text-center py-3 text-sm font-semibold ${t.status === "occupied" ? "opacity-40 cursor-not-allowed" : ""}" onclick="${t.status === "available" ? `selectTable('${t.id}')` : ""}" style="${t.status === "occupied" ? "pointer-events:none" : ""}">
          <i class="fas fa-chair mb-1" style="color:${t.status === "available" ? "var(--success)" : "var(--danger)"}"></i><br>${t.number}
        </button>`,
          )
          .join("")}
      </div>
      <button onclick="closeModal()" class="btn-secondary">Batal</button>
    </div>
  `);
}

function selectTable(tid) {
  State.selectedTable = tid;
  State.orderType = "dine-in";
  const t = getTable(tid);
  if (t) t.status = "occupied";
  closeModal();
  showToast(`Meja ${t?.number} dipilih — silakan pesan!`, "success");
  render();
}

function startDeliveryOrder() {
  State.orderType = "delivery";
  State.selectedTable = null;
  if (selectedPayment === "cash") selectedPayment = "qris";
  showToast("Mode Pesan Antar aktif", "info");
  render();
}

function showMenuItem(id) {
  const m = getMenuItem(id);
  if (!m) return;
  let qty = 1;
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
          <span id="modal-qty" class="font-bold text-lg w-8 text-center">${qty}</span>
          <div class="qty-btn" onclick="updateModalQty(1)">+</div>
        </div>
      </div>
      <button onclick="addToCart('${m.id}')" class="btn-primary w-full flex items-center justify-center gap-2">
        <i class="fas fa-plus"></i> Tambah ke Keranjang — <span id="modal-total">${formatCurrency(m.price)}</span>
      </button>
    </div>
  `);
}

let modalQty = 1;
function updateModalQty(d) {
  modalQty = Math.max(1, modalQty + d);
  const el = document.getElementById("modal-qty");
  if (el) el.textContent = modalQty;
  // update total
  const activeItem = State._activeMenuItem;
  if (activeItem) {
    const t = document.getElementById("modal-total");
    if (t) t.textContent = formatCurrency(activeItem.price * modalQty);
  }
}
function addToCart(id) {
  const m = getMenuItem(id);
  if (!m) return;
  const notes = document.getElementById("item-notes")?.value || "";
  const existing = State.cart.find(
    (c) => c.menu_item_id === id && c.notes === notes,
  );
  if (existing) {
    existing.quantity += modalQty;
  } else {
    State.cart.push({
      menu_item_id: id,
      quantity: modalQty,
      unit_price: m.price,
      notes,
      menu_item: m,
    });
  }
  modalQty = 1;
  closeModal();
  showToast(`${m.name} ditambahkan ke keranjang`, "success");
  render();
}

function renderCustomerCart() {
  const total = State.cart.reduce((s, c) => s + c.unit_price * c.quantity, 0);
  const discount = calcPromoDiscount();
  const afterDiscount = total - discount;
  const activePromo = State.activePromoId ? DB.promos.find(x => x.id === State.activePromoId) : null;
  if (State.cart.length === 0) {
    return `<div class="text-center py-16 animate-fade-up">
      <i class="fas fa-shopping-bag text-5xl mb-4" style="color:var(--border)"></i>
      <h3 class="font-semibold text-lg mb-2">Keranjang Kosong</h3>
      <p class="text-sm mb-6" style="color:var(--muted)">Tambahkan menu dari daftar menu</p>
      <button onclick="switchTab('menu')" class="btn-primary">Lihat Menu</button>
    </div>`;
  }
  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Keranjang Anda</h2>
    <div class="space-y-3 mb-6">
      ${State.cart
        .map(
          (c, i) => {
            const eligible = activePromo && activePromo.is_active && (!activePromo.menu_ids || !activePromo.menu_ids.length || activePromo.menu_ids.includes(c.menu_item_id));
            return `
      <div class="card flex items-center gap-4">
        <img src="${c.menu_item.image}" class="w-16 h-16 rounded-xl object-cover" onerror="this.src='https://picsum.photos/seed/${c.menu_item.id}/100/100'">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2">
            <div class="font-semibold text-sm truncate">${c.menu_item.name}</div>
            ${eligible ? '<span class="text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0" style="background:rgba(39,174,96,.15);color:var(--success)">Diskon</span>' : ''}
          </div>
          <div class="text-xs" style="color:var(--muted)">${c.notes || "Tanpa catatan"}</div>
          <div class="flex items-center gap-2 mt-1">
            <div class="qty-btn" style="width:26px;height:26px;font-size:12px" onclick="updateCartQty(${i},-1)">-</div>
            <span class="text-sm font-semibold w-6 text-center">${c.quantity}</span>
            <div class="qty-btn" style="width:26px;height:26px;font-size:12px" onclick="updateCartQty(${i},1)">+</div>
          </div>
        </div>
        <div class="text-right">
          <div class="font-bold text-sm" style="color:var(--accent)">${formatCurrency(c.unit_price * c.quantity)}</div>
          <button onclick="removeCartItem(${i})" class="text-xs mt-1" style="color:var(--danger)"><i class="fas fa-trash"></i></button>
        </div>
      </div>`;}
        )
        .join("")}
    </div>
    ${activePromo ? `<div class="flex items-center gap-2 mb-3 text-xs p-3 rounded-xl" style="background:rgba(39,174,96,.1);color:var(--success)">
      <i class="fas fa-tag"></i>
      <span class="flex-1">Promo <b>${activePromo.title}</b> aktif</span>
      <button onclick="State.activePromoId=null;render()" class="text-xs underline" style="color:var(--muted)">Batalkan</button>
    </div>` : ''}
    <div class="card mb-4">
      <div class="flex justify-between mb-2 text-sm"><span style="color:var(--muted)">Subtotal</span><span>${formatCurrency(total)}</span></div>
      ${discount > 0 ? `<div class="flex justify-between mb-2 text-sm"><span style="color:var(--success)"><i class="fas fa-tag mr-1"></i>Diskon ${activePromo ? activePromo.title : ''}</span><span style="color:var(--success)">-${formatCurrency(discount)}</span></div>` : ''}
      <div class="flex justify-between mb-2 text-sm"><span style="color:var(--muted)">Pajak (10%)</span><span>${formatCurrency(Math.round(afterDiscount * 0.1))}</span></div>
      <div class="border-t pt-2 mt-2" style="border-color:var(--border)">
        <div class="flex justify-between font-bold"><span>Total</span><span style="color:var(--accent)">${formatCurrency(Math.round(afterDiscount * 1.1))}</span></div>
      </div>
    </div>
    <div class="card mb-4">
      <label class="text-xs font-semibold mb-3 block" style="color:var(--muted)">Tipe Pesanan</label>
      <div class="grid grid-cols-2 gap-3">
        <div class="card text-center py-3 cursor-pointer text-sm" onclick="selectOrderType('dine-in')" style="${State.orderType === "dine-in" ? "border-color:var(--accent);background:rgba(224,122,58,.08)" : ""}">
          <i class="fas fa-utensils mb-1" style="color:var(--accent)"></i><br><span class="font-semibold">Pesan di Tempat</span>
          <div class="text-[10px] mt-1" style="color:var(--muted)">Makan di kafe</div>
        </div>
        <div class="card text-center py-3 cursor-pointer text-sm" onclick="selectOrderType('delivery')" style="${State.orderType === "delivery" ? "border-color:var(--accent);background:rgba(224,122,58,.08)" : ""}">
          <i class="fas fa-motorcycle mb-1" style="color:var(--success)"></i><br><span class="font-semibold">Pesan Antar</span>
          <div class="text-[10px] mt-1" style="color:var(--muted)">Diantar ke rumah</div>
        </div>
      </div>
      ${
        State.orderType === "dine-in" && State.selectedTable
          ? `
      <div class="flex items-center gap-2 mt-3 p-3 rounded-xl text-xs" style="background:rgba(39,174,96,.1);color:var(--success)">
        <i class="fas fa-check-circle"></i>
        <span>Meja <b>${getTable(State.selectedTable)?.number || "-"}</b> dipilih</span>
        <button onclick="State.selectedTable=null;render()" class="ml-auto text-xs underline" style="color:var(--muted)">Ganti</button>
      </div>`
          : ""
      }
      ${
        State.orderType === "dine-in" && !State.selectedTable
          ? `
      <div class="flex items-center gap-2 mt-3 p-3 rounded-xl text-xs cursor-pointer" onclick="startQRScan()" style="background:rgba(224,122,58,.1);color:var(--accent)">
        <i class="fas fa-qrcode"></i>
        <span>Belum pilih meja — <b>Tap untuk scan QR</b></span>
        <i class="fas fa-chevron-right ml-auto" style="font-size:10px"></i>
      </div>`
          : ""
      }
    </div>
    ${
      State.orderType === "delivery"
        ? `
    <div class="card mb-4">
      <div class="flex justify-between items-center mb-2">
        <label class="text-xs font-semibold block" style="color:var(--muted)">Alamat Pengiriman</label>
        <button onclick="pickDeliveryLocation()" class="text-xs font-bold flex items-center gap-1" style="color:var(--accent)"><i class="fas fa-map-marker-alt"></i> Pilih Titik Lokasi</button>
      </div>
      <input id="delivery-address" class="input-field text-sm mb-2" placeholder="Masukkan alamat lengkap..." value="${State.deliveryAddress || ""}" readonly style="cursor:not-allowed;opacity:.7">
      <label class="text-xs font-semibold mt-2 mb-1 block" style="color:var(--muted)">Detail Alamat</label>
      <input id="delivery-detail" class="input-field text-sm mb-2" placeholder="Nomor rumah, blok, patokan, dll..." value="${State.deliveryDetail || ""}" oninput="State.deliveryDetail = this.value">
      ${State.deliveryLocation ? `<div class="text-[10px] flex items-center gap-1" style="color:var(--success)"><i class="fas fa-check-circle"></i> Titik koordinat lokasi tersimpan</div>` : ""}
    </div>`
        : ""
    }
    <div class="card mb-4">
      <label class="text-xs font-semibold mb-3 block" style="color:var(--muted)">Kapan Membayar?</label>
      <div class="grid grid-cols-2 gap-3 mb-4">
        <div class="card text-center py-3 cursor-pointer text-sm" onclick="selectPayTiming('now')" id="pay-timing-now" style="${State.payTiming === "later" ? "" : "border-color:var(--accent);background:rgba(224,122,58,.08)"}">
          <i class="fas fa-bolt mb-1" style="color:var(--accent)"></i><br><span class="font-semibold">Bayar Sekarang</span>
          <div class="text-[10px] mt-1" style="color:var(--muted)">Langsung selesai</div>
        </div>
        <div class="card text-center py-3 cursor-pointer text-sm" onclick="selectPayTiming('later')" id="pay-timing-later" style="${State.payTiming === "later" ? "border-color:var(--accent);background:rgba(224,122,58,.08)" : ""}">
          <i class="fas fa-clock mb-1" style="color:var(--warning)"></i><br><span class="font-semibold">Bayar Nanti</span>
          <div class="text-[10px] mt-1" style="color:var(--muted)">Bayar di kasir</div>
        </div>
      </div>
      ${
        State.payTiming !== "later"
          ? `
      <label class="text-xs font-semibold mb-3 block" style="color:var(--muted)">Metode Pembayaran</label>
      <div class="grid grid-cols-${State.orderType === "delivery" ? "2" : "3"} gap-3">
        <div class="card text-center py-3 cursor-pointer text-sm" onclick="selectPayment('qris')" style="${selectedPayment === "qris" ? "border-color:var(--accent);background:rgba(224,122,58,.08)" : ""}"><i class="fas fa-qrcode mb-1" style="color:var(--accent)"></i><br>QRIS</div>
        <div class="card text-center py-3 cursor-pointer text-sm" onclick="selectPayment('bank_transfer')" style="${selectedPayment === "bank_transfer" ? "border-color:var(--accent);background:rgba(224,122,58,.08)" : ""}"><i class="fas fa-university mb-1" style="color:var(--accent)"></i><br>Transfer Bank</div>
        ${State.orderType !== "delivery" ? `<div class="card text-center py-3 cursor-pointer text-sm" onclick="selectPayment('cash')" style="${selectedPayment === "cash" ? "border-color:var(--accent);background:rgba(224,122,58,.08)" : ""}"><i class="fas fa-money-bill mb-1" style="color:var(--success)"></i><br>Tunai</div>` : ""}
      </div>`
          : `
      <div class="flex items-center gap-2 p-3 rounded-xl text-xs" style="background:rgba(243,156,18,.1);color:var(--warning)">
        <i class="fas fa-info-circle"></i>
        <span>${State.orderType === "delivery" ? "Pesanan akan diantar kurir. Siapkan uang tunai." : "Pesanan akan dibuat dengan status <b>Belum Bayar</b>. Silakan bayar di kasir."}</span>
      </div>`
      }
    </div>
    <button onclick="confirmPlaceOrder()" class="btn-primary w-full text-center flex items-center justify-center gap-2">
      <i class="fas fa-check"></i> ${State.payTiming === "later" ? "Pesan Sekarang, Bayar Nanti" : "Bayar & Proses Pesanan"}
    </button>
  </div>`;
}

let selectedPayment = "qris";
if (!State.payTiming) State.payTiming = "now";
function selectPayment(p) {
  selectedPayment = p;
  render();
}
function isDigitalSelected() {
  return selectedPayment === "qris" || selectedPayment === "bank_transfer";
}
function selectPayTiming(t) {
  State.payTiming = t;
  render();
}
function selectOrderType(t) {
  State.orderType = t;
  if (t === "dine-in" && !State.selectedTable) {
    startQRScan();
  }
  if (t === "delivery" && selectedPayment === "cash") {
    selectedPayment = "qris";
  }
  render();
}

function updateCartQty(i, d) {
  State.cart[i].quantity = Math.max(1, State.cart[i].quantity + d);
  render();
}
function removeCartItem(i) {
  State.cart.splice(i, 1);
  render();
}

function calcPromoDiscount() {
  if (!State.activePromoId) return 0;
  const p = DB.promos.find(x => x.id === State.activePromoId);
  const now = new Date();
  if (!p || !p.is_active) return 0;
  if (p.end_date && new Date(p.end_date) < now) { State.activePromoId = null; return 0; }
  if (p.start_date && new Date(p.start_date) > now) { State.activePromoId = null; return 0; }
  const eligible = p.menu_ids && p.menu_ids.length
    ? State.cart.filter(c => p.menu_ids.includes(c.menu_item_id))
    : State.cart;
  const eligibleTotal = eligible.reduce((s, c) => s + c.unit_price * c.quantity, 0);
  if (p.discount_type === 'fixed') return Math.min(p.discount_value, eligibleTotal);
  return Math.round(eligibleTotal * p.discount_value / 100);
}

function confirmPlaceOrder() {
  const total = State.cart.reduce((s, c) => s + c.unit_price * c.quantity, 0);
  const discount = calcPromoDiscount();
  const afterDiscount = total - discount;
  const tax = Math.round(afterDiscount * 0.1);
  const grandTotal = Math.round(afterDiscount * 1.1);
  const itemsList = State.cart.map(c =>
    `${c.menu_item.name} x${c.quantity} = ${formatCurrency(c.unit_price * c.quantity)}`
  ).join('</div><div class="text-sm" style="color:var(--muted)">');
  const activePromo = State.activePromoId ? DB.promos.find(x => x.id === State.activePromoId) : null;

  showModal(`
    <div>
      <div class="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl" style="background:rgba(224,122,58,.1);color:var(--accent)">
        <i class="fas fa-receipt"></i>
      </div>
      <h3 class="font-display text-lg font-bold mb-1 text-center">Konfirmasi Pesanan</h3>
      <p class="text-xs text-center mb-4" style="color:var(--muted)">Pastikan pesanan Anda sudah benar</p>

      <div class="p-3 rounded-xl mb-4" style="background:var(--bg2)">
        <div class="text-xs font-semibold mb-2" style="color:var(--muted)">Rincian Pesanan</div>
        <div>${itemsList}</div>
        <div class="border-t pt-2 mt-2" style="border-color:var(--border)">
          <div class="flex justify-between text-sm"><span style="color:var(--muted)">Subtotal</span><span>${formatCurrency(total)}</span></div>
          ${discount > 0 ? `<div class="flex justify-between text-sm"><span style="color:var(--success)"><i class="fas fa-tag mr-1"></i>Diskon ${activePromo ? activePromo.title : ''}</span><span style="color:var(--success)">-${formatCurrency(discount)}</span></div>` : ''}
          <div class="flex justify-between text-sm"><span style="color:var(--muted)">Pajak (10%)</span><span>${formatCurrency(tax)}</span></div>
          <div class="flex justify-between font-bold mt-1"><span>Total</span><span style="color:var(--accent)">${formatCurrency(grandTotal)}</span></div>
        </div>
      </div>

      <div class="text-xs mb-4" style="color:var(--muted)">
        <i class="fas ${State.orderType === "dine-in" ? "fa-chair" : "fa-motorcycle"} mr-1"></i>
        ${State.orderType === "dine-in" ? "Makan di tempat" + (State.selectedTable ? " — Meja " + (getTable(State.selectedTable)?.number || "-") : "") : "Pesan Antar"}
        ${State.payTiming === "later" ? ' — <span style="color:var(--warning)">Bayar Nanti</span>' : ""}
      </div>

      <div class="flex gap-3">
        <button onclick="closeModal()" class="btn-secondary flex-1">Kembali</button>
        <button onclick="closeModal();placeOrder()" class="btn-primary flex-1">Pesan Sekarang</button>
      </div>
    </div>
  `);
}

function placeOrder() {
  if (State.cart.length === 0) {
    showToast("Keranjang masih kosong", "warning");
    return;
  }
  if (State.orderType === "dine-in" && !State.selectedTable) {
    showToast("Silakan pilih meja terlebih dahulu", "warning");
    startQRScan();
    return;
  }
  if (State.orderType === "delivery") {
    const address =
      document.getElementById("delivery-address")?.value ||
      State.deliveryAddress;
    if (!address || address.trim() === "") {
      showToast("Silakan masukkan alamat pengiriman", "warning");
      return;
    }
  }
  const total = State.cart.reduce((s, c) => s + c.unit_price * c.quantity, 0);
  const discount = calcPromoDiscount();
  const afterDiscount = total - discount;
  const grandTotal = Math.round(afterDiscount * 1.1);

  if (State.orderType === "dine-in" && State.payTiming === "later") {
    const existingOrder = DB.orders.find(
      (o) =>
        o.user_id === State.currentUser.id &&
        o.order_type === "dine-in" &&
        o.table_id === State.selectedTable &&
        o.payment_status === "unpaid" &&
        o.status !== "completed" &&
        o.status !== "cancelled",
    );

    if (existingOrder) {
      existingOrder.items.push(
        ...State.cart.map((c) => ({
          menu_item_id: c.menu_item_id,
          quantity: c.quantity,
          unit_price: c.unit_price,
          notes: c.notes,
          status: "pending",
        })),
      );
      existingOrder.total_amount += grandTotal;

      if (
        existingOrder.status === "served" ||
        existingOrder.status === "ready"
      ) {
        existingOrder.status = "pending"; // kembalikan ke pending agar dapur tahu ada item baru
      }

      State.cart = [];
      notifyOrderPlaced(existingOrder, State.currentUser.name);
      showToast(
        `Pesanan digabungkan ke #${existingOrder.id.slice(-5).toUpperCase()}`,
        "success",
      );
      switchTab("orders");
      return;
    }
  }
  const order = {
    id: genId(),
    user_id: State.currentUser.id,
    table_id: State.selectedTable,
    order_type: State.orderType,
    status: "pending",
    total_amount: grandTotal,
    payment_method: State.payTiming === "later" ? (State.orderType === "delivery" ? "cod" : "") : selectedPayment,
    payment_status:
      State.payTiming === "later"
        ? "unpaid"
        : isDigitalSelected()
          ? "paid"
          : "unpaid",
    delivery_address:
      State.orderType === "delivery"
        ? document.getElementById("delivery-address")?.value ||
          State.deliveryAddress ||
          ""
        : "",
    delivery_detail:
      State.orderType === "delivery"
        ? document.getElementById("delivery-detail")?.value ||
          State.deliveryDetail ||
          ""
        : "",
    delivery_location:
      State.orderType === "delivery" && State.deliveryLocation
        ? State.deliveryLocation
        : null,
    promo_id: State.activePromoId || null,
    promo_discount: discount || 0,
    created_at: new Date().toISOString(),
    items: State.cart.map((c) => ({
      menu_item_id: c.menu_item_id,
      quantity: c.quantity,
      unit_price: c.unit_price,
      notes: c.notes,
      status: "pending",
    })),
  };
  if (State.orderType === "delivery") order.courier_id = null;
  DB.orders.unshift(order);
  State.cart = [];
  State.activePromoId = null;
  State.deliveryLocation = null;
  State.deliveryAddress = "";
  State.deliveryDetail = "";
  notifyOrderPlaced(order, State.currentUser.name);
  showToast(
    `Pesanan #${order.id.slice(-5).toUpperCase()} berhasil dibuat!`,
    "success",
  );
  switchTab("orders");
}

function renderCustomerOrders() {
  const myOrders = DB.orders
    .filter((o) => o.user_id === State.currentUser.id)
    .slice(0, 10);
  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Pesanan Saya</h2>
    ${myOrders.length === 0 ? '<div class="text-center py-12"><i class="fas fa-receipt text-4xl mb-3" style="color:var(--border)"></i><p style="color:var(--muted)">Belum ada pesanan</p></div>' : ""}
    <div class="space-y-3">
      ${myOrders
        .map((o) => {
          const t = o.table_id ? getTable(o.table_id) : null;
          return `
        <div class="order-card" onclick="showOrderDetail('${o.id}')">
          <div class="flex justify-between items-start mb-2">
            <div>
              <span class="font-bold text-sm">#${o.id.slice(-5).toUpperCase()}</span>
              <span class="badge ${getStatusBadge(o.status)} ml-2">${getStatusLabel(o.status)}</span>
            </div>
            <span class="text-xs" style="color:var(--muted)">${formatTime(o.created_at)}</span>
          </div>
          <div class="flex justify-between items-center">
            <div class="text-xs" style="color:var(--muted)">
              <i class="fas ${o.order_type === "dine-in" ? "fa-chair" : "fa-motorcycle"} mr-1"></i>${getOrderTypeName(o.order_type)}
              ${t ? ` — Meja ${t.number}` : ""}
              ${o.order_type === "delivery" ? " — " + o.delivery_address.slice(0, 30) + "..." : ""}
            </div>
            <span class="font-bold text-sm" style="color:var(--accent)">${formatCurrency(o.total_amount)}</span>
          </div>
          <div class="mt-2 text-xs" style="color:var(--muted)">
            ${o.items
              .map((i) => {
                const mi = getMenuItem(i.menu_item_id);
                return mi ? mi.name + " x" + i.quantity : "";
              })
              .join(", ")}
          </div>
          ${o.status === "rejected" && o.reject_reason ? `<div class="mt-2 text-xs p-2 rounded" style="background:rgba(231,76,60,.1);color:var(--danger);border:1px solid rgba(231,76,60,.2)"><i class="fas fa-ban mr-1"></i><strong>Ditolak:</strong> ${o.reject_reason}</div>` : ""}
          ${o.order_type === "delivery" && o.status === "delivering" ? `<div class="mt-3 flex gap-2"><button onclick="event.stopPropagation();showTrackingMap('${o.id}')" class="btn-primary btn-sm flex-1"><i class="fas fa-map-marker-alt mr-1"></i>Lacak Kurir</button><button onclick="event.stopPropagation();openChatModal('${o.id}')" class="btn-secondary btn-sm flex-1" style="background:rgba(224,122,58,.1);color:var(--accent);border-color:transparent;position:relative"><i class="fas fa-comment-alt mr-1"></i>Chat Kurir${getUnreadCount(o.id) > 0 ? `<span class="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold" style="background:var(--danger);color:#fff">${getUnreadCount(o.id)}</span>` : ""}</button></div>` : ""}
          ${o.status === "pending" ? `<div class="mt-3 flex justify-end"><button onclick="event.stopPropagation();cancelOrder('${o.id}')" class="text-xs font-bold px-3 py-1.5 rounded-lg" style="color:var(--danger); background:rgba(231,76,60,.1)">Batal Pesanan</button></div>` : ""}
        </div>`;
        })
        .join("")}
    </div>
  </div>`;
}

function showOrderDetail(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  showModal(`
    <div>
      <div class="flex justify-between items-start mb-4">
        <h3 class="font-display text-lg font-bold">Pesanan #${o.id.slice(-5).toUpperCase()}</h3>
        <span class="badge ${getStatusBadge(o.status)}">${getStatusLabel(o.status)}</span>
      </div>
      <div class="text-xs mb-4" style="color:var(--muted)">
        <i class="fas ${o.order_type === "dine-in" ? "fa-chair" : "fa-motorcycle"} mr-1"></i>${getOrderTypeName(o.order_type)}
        ${o.table_id ? " — Meja " + (getTable(o.table_id)?.number || "") : ""}
        ${o.delivery_address ? "<br>" + o.delivery_address : ""}
      </div>
      ${o.status === "rejected" && o.reject_reason ? `<div class="card mb-4 text-sm" style="background:rgba(231,76,60,.08);border:1px solid rgba(231,76,60,.2)"><i class="fas fa-ban mr-1" style="color:var(--danger)"></i><strong>Pesanan Ditolak:</strong> ${o.reject_reason}</div>` : ""}
      <div class="space-y-2 mb-4">
        ${o.items
          .map((i) => {
            const mi = getMenuItem(i.menu_item_id);
            return mi
              ? `
        <div class="flex justify-between text-sm">
          <span>${mi.name} x${i.quantity} ${i.notes ? '<span style="color:var(--muted)">(' + i.notes + ")</span>" : ""}</span>
          <span>${formatCurrency(i.unit_price * i.quantity)}</span>
        </div>`
              : "";
          })
          .join("")}
      </div>
      <div class="border-t pt-3" style="border-color:var(--border)">
        <div class="flex justify-between font-bold"><span>Total</span><span style="color:var(--accent)">${formatCurrency(o.total_amount)}</span></div>
        <div class="flex justify-between text-xs mt-1" style="color:var(--muted)"><span>Pembayaran</span><span>${o.payment_method === "qris" ? "QRIS" : o.payment_method === "bank_transfer" ? "Transfer Bank" : o.payment_method === "cod" ? "COD" : o.payment_method === "" ? "Bayar Nanti" : "Tunai"}</span></div>
        ${!(o.order_type === "delivery" && o.payment_method === "cod") ? `<div class="flex justify-between text-xs mt-1" style="color:var(--muted)"><span>Status Bayar</span><span class="badge ${o.payment_status === "paid" ? "badge-paid" : "badge-unpaid"}">${o.payment_status === "paid" ? "Lunas" : "Belum Bayar"}</span></div>` : ""}
      </div>
      <button onclick="closeModal();printInvoice('${o.id}')" class="btn-primary w-full mt-4 text-center flex items-center justify-center gap-2"><i class="fas fa-print"></i> Cetak Invoice</button>
      ${o.payment_status === "unpaid" && o.status !== "completed" && !(o.order_type === "delivery" && o.payment_method === "cod") ? `<button onclick="payOrder('${o.id}')" class="btn-primary w-full mt-4 text-center">Bayar Sekarang</button>` : ""}
      ${o.status === "pending" ? `<button onclick="cancelOrder('${o.id}')" class="w-full mt-3 text-center text-sm font-bold" style="color:var(--danger); background:rgba(231,76,60,.1); padding:10px; border-radius:12px;">Batal Pesanan</button>` : ""}
    </div>
  `);
}

function printInvoice(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  const win = window.open('', '_blank');
  const statusLabel = o.payment_status === 'paid' ? 'Lunas' : 'Belum Bayar';
  win.document.write(`
    <html><head>
      <title>Invoice #${o.id.slice(-5).toUpperCase()}</title>
      <style>
        body { font-family: 'Segoe UI',sans-serif; padding:40px; max-width:400px; margin:0 auto; }
        .header { text-align:center; margin-bottom:24px; }
        .header h1 { font-size:22px; margin:0; }
        .header p { font-size:12px; color:#666; margin:2px 0; }
        .divider { border-top:2px dashed #333; margin:16px 0; }
        .item { display:flex; justify-content:space-between; font-size:13px; padding:4px 0; }
        .totals { margin-top:12px; font-size:13px; }
        .totals > div { display:flex; justify-content:space-between; padding:2px 0; }
        .footer { text-align:center; font-size:11px; color:#888; margin-top:24px; }
        @media print { body { padding:20px; } }
      </style>
    </head><body>
      <div class="header">
        <h1>ARQA Coffee</h1>
        <p>${o.order_type === 'dine-in' ? 'Makan di Tempat' : 'Pesan Antar'}</p>
        ${o.table_id ? '<p>Meja ' + (getTable(o.table_id)?.number || '') + '</p>' : ''}
        <p>#${o.id.slice(-5).toUpperCase()}</p>
        <p>${new Date(o.created_at).toLocaleString('id-ID')}</p>
      </div>
      <div class="divider"></div>
      ${o.items.map(i => {
        const mi = getMenuItem(i.menu_item_id);
        return `<div class="item"><span>${mi ? mi.name : 'Item'} x${i.quantity}</span><span>${formatCurrency(i.unit_price * i.quantity)}</span></div>`;
      }).join('')}
      <div class="divider"></div>
      <div class="totals">
        <div><span>Subtotal</span><span>${formatCurrency(o.total_amount)}</span></div>
        <div><span>Pajak (10%)</span><span>${formatCurrency(Math.round(o.total_amount * 0.1 / 1.1))}</span></div>
        <div style="font-weight:bold;font-size:15px"><span>Total</span><span>${formatCurrency(o.total_amount)}</span></div>
        <div style="margin-top:8px"><span>Pembayaran</span><span>${o.payment_method === 'qris' ? 'QRIS' : o.payment_method === 'bank_transfer' ? 'Transfer Bank' : o.payment_method === 'cod' ? 'COD' : o.payment_method === '' ? 'Bayar Nanti' : 'Tunai'}</span></div>
        <div><span>Status</span><span>${statusLabel}</span></div>
      </div>
      ${o.delivery_address ? `<div class="divider"></div><p style="font-size:12px"><strong>Alamat:</strong> ${o.delivery_address}</p>` : ''}
      <div class="footer">Terima kasih telah berbelanja di ARQA Coffee</div>
      <script>window.print()</script>
    </body></html>
  `);
  win.document.close();
}

function payOrder(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  o.payment_status = "paid";
  o.payment_method = "qris";
  closeModal();
  showToast("Pembayaran berhasil!", "success");
  render();
}

function cancelOrder(id) {
  showModal(`
    <div class="text-center">
      <div class="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl" style="background:rgba(231,76,60,.1);color:var(--danger)">
        <i class="fas fa-exclamation-triangle"></i>
      </div>
      <h3 class="font-display text-lg font-bold mb-2">Batalkan Pesanan?</h3>
      <p class="text-sm mb-4" style="color:var(--muted)">Apakah Anda yakin ingin membatalkan pesanan ini? Silakan pilih alasan pembatalan.</p>
      
      <div class="text-left mb-6">
        <label class="text-xs font-semibold mb-2 block" style="color:var(--muted)">Alasan Pembatalan</label>
        <select id="cancel-reason" class="input-field text-sm w-full mb-3" style="background:var(--bg2);" onchange="document.getElementById('cancel-reason-other-container').style.display = this.value === 'Lainnya' ? 'block' : 'none'">
          <option value="">-- Pilih Alasan --</option>
          <option value="Ingin mengubah pesanan">Ingin mengubah pesanan</option>
          <option value="Waktu tunggu terlalu lama">Waktu tunggu terlalu lama</option>
          <option value="Salah pilih lokasi/meja">Salah pilih lokasi/meja</option>
          <option value="Tidak jadi pesan">Tidak jadi pesan</option>
          <option value="Lainnya">Lainnya...</option>
        </select>
        
        <div id="cancel-reason-other-container" style="display:none;">
          <input type="text" id="cancel-reason-other" class="input-field text-sm w-full" placeholder="Ketik alasan spesifik di sini...">
        </div>
      </div>

      <div class="flex gap-3">
        <button onclick="closeModal()" class="btn-secondary flex-1">Batal</button>
        <button onclick="confirmCancelOrder('${id}')" class="btn-primary flex-1" style="background:var(--danger);border-color:var(--danger);">Hapus Pesanan</button>
      </div>
    </div>
  `);
}

function confirmCancelOrder(id) {
  const reasonEl = document.getElementById("cancel-reason");
  let reason = reasonEl ? reasonEl.value : "";

  if (reason === "Lainnya") {
    const otherEl = document.getElementById("cancel-reason-other");
    reason = otherEl ? otherEl.value.trim() : "";
  }

  if (!reason) {
    showToast("Silakan lengkapi alasan pembatalan", "warning");
    return;
  }

  const idx = DB.orders.findIndex((x) => x.id === id);
  if (idx === -1) {
    closeModal();
    return;
  }
  const o = DB.orders[idx];

  if (o.status !== "pending") {
    showToast(
      "Pesanan tidak dapat dibatalkan karena sudah diproses",
      "warning",
    );
    closeModal();
    return;
  }

  if (o.order_type === "dine-in" && o.table_id) {
    const hasOtherOrders = DB.orders.some(
      (x) =>
        x.id !== id &&
        x.table_id === o.table_id &&
        x.status !== "completed" &&
        x.status !== "cancelled",
    );
    if (!hasOtherOrders) {
      const t = getTable(o.table_id);
      if (t) t.status = "available";
    }
  }

  addNotification({
    title: 'Pesanan Dibatalkan',
    message: '#' + o.id.slice(-5).toUpperCase() + ' dibatalkan oleh pelanggan: ' + reason,
    type: 'warning',
    icon: 'fa-ban',
    targetRoles: ['cashier', 'kitchen'],
    relatedOrderId: o.id
  });
  DB.orders.splice(idx, 1);
  showToast("Pesanan berhasil dibatalkan dan dihapus", "success");
  closeModal();
  render();
}

function showTrackingMap(orderId) {
  const o = DB.orders.find((x) => x.id === orderId);
  if (!o) return;
  showModal(
    `
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Lacak Kurir</h3>
      <div id="map-tracking" class="mb-4"></div>
      <div class="flex items-center gap-3 mb-3">
        <div class="w-10 h-10 rounded-full flex items-center justify-center" style="background:var(--accent);color:#fff"><i class="fas fa-motorcycle"></i></div>
        <div><div class="font-semibold text-sm">${getUser(o.courier_id)?.name || "Kurir"}</div><div class="text-xs" style="color:var(--muted)">Sedang dalam perjalanan</div></div>
      </div>
      <button onclick="closeModal()" class="btn-secondary w-full text-center">Tutup</button>
    </div>
  `,
    () => {
      setTimeout(() => {
        const el = document.getElementById("map-tracking");
        if (!el) return;
        const lat = -6.9175,
          lng = 107.6191;
        const map = L.map(el).setView([lat, lng], 15);
        L.tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          { attribution: "Esri" },
        ).addTo(map);
        L.marker([lat, lng]).addTo(map).bindPopup("Posisi Kurir").openPopup();
        State.mapInstances["tracking"] = map;
      }, 200);
    },
  );
}

function pickDeliveryLocation() {
  // Save current address input to state before opening modal
  const addressInput = document.getElementById("delivery-address");
  if (addressInput) State.deliveryAddress = addressInput.value;

  showModal(
    `
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Pilih Titik Lokasi</h3>
      <div id="map-picker" class="mb-4" style="height: 300px; border-radius: 12px; overflow: hidden; background: #e5e7eb;"></div>
      <p class="text-xs mb-4" style="color:var(--muted)"><i class="fas fa-info-circle mr-1"></i>Geser peta untuk menentukan titik lokasi pengiriman yang tepat.</p>
      <button onclick="saveDeliveryLocation()" class="btn-primary w-full text-center mb-2">Simpan Lokasi</button>
      <button onclick="closeModal(); render();" class="btn-secondary w-full text-center">Batal</button>
    </div>
  `,
    () => {
      setTimeout(() => {
        const el = document.getElementById("map-picker");
        if (!el) return;

        let lat = State.deliveryLocation?.lat || -6.9175;
        let lng = State.deliveryLocation?.lng || 107.6191;

        // Try to get user's current location if no location saved
        if (!State.deliveryLocation && navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              lat = pos.coords.latitude;
              lng = pos.coords.longitude;
              initMap(lat, lng);
            },
            () => {
              initMap(lat, lng);
            },
          );
        } else {
          initMap(lat, lng);
        }

        function initMap(initialLat, initialLng) {
          const map = L.map(el).setView([initialLat, initialLng], 15);
          L.tileLayer(
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            { attribution: "Esri" },
          ).addTo(map);

          const marker = L.marker([initialLat, initialLng]).addTo(map);
          State.tempDeliveryLocation = { lat: initialLat, lng: initialLng };

          map.on("move", function () {
            marker.setLatLng(map.getCenter());
          });

          map.on("moveend", function () {
            const position = map.getCenter();
            marker.setLatLng(position);
            State.tempDeliveryLocation = {
              lat: position.lat,
              lng: position.lng,
            };
          });

          State.mapInstances = State.mapInstances || {};
          State.mapInstances["picker"] = map;

          // Invalidate size to ensure correct rendering inside modal
          setTimeout(() => map.invalidateSize(), 100);
        }
      }, 300);
    },
  );
}

function saveDeliveryLocation() {
  if (State.tempDeliveryLocation) {
    State.deliveryLocation = { ...State.tempDeliveryLocation };
    showToast("Mengambil data alamat dari lokasi...", "info");

    const { lat, lng } = State.deliveryLocation;
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.display_name) {
          State.deliveryAddress = data.display_name;
          showToast("Alamat berhasil disesuaikan dengan titik map", "success");
          render();
        }
      })
      .catch((err) => {
        console.error("Geocoding failed", err);
        showToast("Titik lokasi disimpan", "success");
      });
  }
  closeModal();
  render();
}

function renderCustomerProfile() {
  const u = State.currentUser;
  return `
  <div class="animate-fade-up">
    <div class="card text-center mb-4">
      <div class="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold" style="background:var(--accent);color:#fff">${u.avatar}</div>
      <h3 class="font-semibold text-lg">${u.name}</h3>
      <p class="text-sm" style="color:var(--muted)">${u.email}</p>
      <p class="text-sm" style="color:var(--muted)">${u.phone}</p>
    </div>
    <div class="card mb-3 flex items-center gap-3 cursor-pointer" onclick="switchTab('menu');State.selectedTable=null;State.orderType='dine-in'">
      <i class="fas fa-qrcode" style="color:var(--accent)"></i><span class="text-sm flex-1">Scan QR Meja</span><i class="fas fa-chevron-right" style="color:var(--muted);font-size:12px"></i>
    </div>
    <div class="card mb-3 flex items-center gap-3 cursor-pointer" onclick="handleLogout()">
      <i class="fas fa-right-from-bracket" style="color:var(--danger)"></i><span class="text-sm flex-1">Keluar</span><i class="fas fa-chevron-right" style="color:var(--muted);font-size:12px"></i>
    </div>
  </div>`;
}

function getUnreadCount(orderId) {
  const o = DB.orders.find(x => x.id === orderId);
  if (!o || !o.messages || !o.messages.length) return 0;
  const myId = State.currentUser.id;
  const lastRead = o.lastReadAt?.[myId] || 0;
  if (State.currentUser.role === 'customer') {
    return o.messages.filter(m => m.sender_id !== myId && m.sender_id === o.courier_id && new Date(m.timestamp).getTime() > lastRead).length;
  }
  if (State.currentUser.role === 'courier') {
    return o.messages.filter(m => m.sender_id !== myId && m.sender_id === o.user_id && new Date(m.timestamp).getTime() > lastRead).length;
  }
  return 0;
}

// Fitur Chat
function openChatModal(orderId) {
  const o = DB.orders.find((x) => x.id === orderId);
  if (!o) return;
  if (!o.messages) o.messages = [];
  if (!o.lastReadAt) o.lastReadAt = {};
  o.lastReadAt[State.currentUser.id] = Date.now();

  const currentUserId = State.currentUser.id;

  showModal(
    `
    <div class="flex flex-col" style="height: 60vh;">
      <div class="flex justify-between items-center mb-4 pb-3 border-b" style="border-color:var(--border)">
        <h3 class="font-display text-lg font-bold">Chat ${State.currentUser.role === "courier" ? "Pelanggan" : "Kurir"}</h3>
        <button onclick="closeModal()" class="text-xl" style="color:var(--muted)"><i class="fas fa-times"></i></button>
      </div>
      <div id="chat-messages" class="flex-1 overflow-y-auto space-y-3 mb-4 pr-2" style="-webkit-overflow-scrolling:touch;">
        ${o.messages.length === 0 ? '<p class="text-center text-sm mt-10" style="color:var(--muted)">Mulai percakapan...</p>' : ""}
        ${o.messages
          .map(
            (m) => `
          <div class="flex ${m.sender_id === currentUserId ? "justify-end" : "justify-start"}">
            <div class="max-w-[80%] rounded-2xl ${m.image ? "p-1" : "px-4 py-2"} text-sm" style="background:${m.sender_id === currentUserId ? "var(--accent)" : "var(--bg2)"}; color:${m.sender_id === currentUserId ? "#fff" : "inherit"}">
              ${m.image ? `<img src="${m.image}" class="w-full rounded-xl object-cover cursor-pointer" style="max-height:200px" onclick="window.open(this.src)">` : m.text}
              <div class="text-[10px] mt-1 text-right ${m.image ? "px-2 pb-1" : ""}" style="opacity:0.7">${formatTime(m.timestamp)}</div>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
      <div class="flex gap-2 items-center">
        <input type="file" id="chat-image-input" accept="image/*" onchange="sendChatImage('${orderId}')" style="display:none">
        <button onclick="document.getElementById('chat-image-input').click()" class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style="background:var(--bg2);color:var(--muted)"><i class="fas fa-image"></i></button>
        <input type="text" id="chat-input" class="input-field flex-1 text-sm" placeholder="Tulis pesan..." onkeypress="if(event.key==='Enter') sendChatMessage('${orderId}')">
        <button onclick="sendChatMessage('${orderId}')" class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style="background:var(--accent);color:#fff"><i class="fas fa-paper-plane"></i></button>
      </div>
    </div>
  `,
    () => {
      setTimeout(() => {
        const el = document.getElementById("chat-messages");
        if (el) el.scrollTop = el.scrollHeight;
        document.getElementById("chat-input")?.focus();
      }, 100);
    },
  );
}

function sendChatMessage(orderId) {
  const o = DB.orders.find((x) => x.id === orderId);
  if (!o) return;
  const input = document.getElementById("chat-input");
  if (!input || !input.value.trim()) return;

  if (!o.messages) o.messages = [];
  o.messages.push({
    sender_id: State.currentUser.id,
    text: input.value.trim(),
    timestamp: new Date().toISOString(),
  });

  openChatModal(orderId);
}

function sendChatImage(orderId) {
  const o = DB.orders.find((x) => x.id === orderId);
  if (!o) return;
  const input = document.getElementById("chat-image-input");
  if (!input || !input.files || !input.files[0]) return;

  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement("canvas");
      // Resize to avoid huge base64 strings
      const MAX_WIDTH = 600;
      let scaleSize = 1;
      if (img.width > MAX_WIDTH) {
        scaleSize = MAX_WIDTH / img.width;
      }
      canvas.width = img.width * scaleSize;
      canvas.height = img.height * scaleSize;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const dataUrl = canvas.toDataURL("image/jpeg", 0.6);

      if (!o.messages) o.messages = [];
      o.messages.push({
        sender_id: State.currentUser.id,
        image: dataUrl,
        timestamp: new Date().toISOString(),
      });
      openChatModal(orderId);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}
