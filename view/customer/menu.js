// ============================================================
// CUSTOMER VIEW — Menu
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
      <h2 class="font-display text-2xl md:text-3xl font-black mb-1">Selamat ${getGreeting()}, ${State.currentUser.name.split(" ")[0]}</h2>
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
        DB.promos && DB.promos.filter((p) => p.is_active && isPromoActiveByDate(p) && !isPromoUsedByUser(p.id) && p.id !== State.activePromoId).length > 0
          ? `
    <div class="promo-carousel" id="promo-carousel">
      <div class="promo-track" id="promo-track">
        ${DB.promos
          .filter((p) => p.is_active && isPromoActiveByDate(p) && !isPromoUsedByUser(p.id) && p.id !== State.activePromoId)
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
      ${DB.promos.filter((p) => p.is_active && isPromoActiveByDate(p) && !isPromoUsedByUser(p.id) && p.id !== State.activePromoId).length > 1 ? '<div class="promo-dots" id="promo-dots"></div>' : ''}
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

function isPromoUsedByUser(promoId) {
  return DB.orders.some(o => o.user_id === State.currentUser.id && o.promo_id === promoId);
}

function isPromoActiveByDate(p) {
  if (!p.start_date && !p.end_date) return true;
  const now = new Date();
  if (p.start_date && new Date(p.start_date) > now) return false;
  if (p.end_date && new Date(p.end_date) < now) return false;
  return true;
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
