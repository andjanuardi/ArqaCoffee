// ============================================================
// PLAYGROUND — CREATE TICKET
// ============================================================

var pgChildCount = 0;
var pgCompanionCount = 0;

async function renderPlaygroundCreate() {
  try {
    showSkeleton('playground-create', 'list');
    var pgStock = await API.getPgStock();
    DB.pgStockItems = pgStock;
    pgChildCount = State._pgChildCount || 0;
    pgCompanionCount = State._pgCompanionCount || 0;
    var hours = State._pgHours || 1;
    var snackItems = (DB.pgStockItems || []).filter(function(s) { return s.current_quantity > 0 && (s.category === "Makanan" || s.category === "Minuman"); });
    var selectedSnacks = State._pgSelectedSnacks || [];

    var children = [];
    var childSocks = [];
    for (var i = 0; i < pgChildCount; i++) {
      var val = State["_pgChildName" + i] || "";
      children.push({ name: val || "Anak " + (i + 1) });
      childSocks.push(State["_pgChildHasSocks" + i] === true);
    }
    var companions = [];
    for (var i = 0; i < pgCompanionCount; i++) {
      var val = State["_pgCompanionName" + i] || "";
      companions.push({ name: val || "Pendamping " + (i + 1) });
    }
    var calc = calcPlaygroundTotal(children, companions, hours, childSocks, selectedSnacks);

    return `
    <div class="animate-fade-up pb-36">
      <h2 class="font-display text-xl font-bold mb-4">Buat Tiket Baru</h2>

      <div class="card mb-4">
        <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Nama Pelanggan</label>
        <input id="pg-customer-name" class="input-field text-sm" placeholder="Nama orang tua / pelanggan" value="${State._pgCustomerName || ""}" oninput="State._pgCustomerName=this.value">
      </div>

      <div class="card mb-4">
        <div class="flex justify-between items-center mb-3">
          <div>
            <label class="text-xs font-semibold" style="color:var(--muted)">Anak-anak</label>
            <div class="text-xs mt-0.5" style="color:var(--accent)">${formatCurrency(PG_CHILD_PRICE)}/anak/jam</div>
          </div>
          <div class="flex gap-1">
            <button onclick="pgAddChild()" class="btn-sm" style="background:rgba(39,174,96,.15);color:var(--success);border:none;padding:4px 10px;border-radius:6px;cursor:pointer;font-size:11px"><i class="fas fa-plus"></i> Tambah</button>
            ${pgChildCount > 0 ? '<button onclick="pgRemoveChild()" class="btn-sm" style="background:rgba(231,76,60,.15);color:var(--danger);border:none;padding:4px 10px;border-radius:6px;cursor:pointer;font-size:11px"><i class="fas fa-minus"></i></button>' : ""}
          </div>
        </div>
        ${Array.from({ length: pgChildCount }, function(_, i) { return `
        <div class="flex items-center gap-2 mb-2">
          <i class="fas fa-child" style="color:var(--accent);font-size:14px"></i>
          <input class="input-field text-sm flex-1" placeholder="Nama anak ${i + 1}" value="${State["_pgChildName" + i] || ""}" oninput="State['_pgChildName${i}']=this.value">
          <div class="flex items-center gap-1 cursor-pointer px-2 py-1 rounded text-xs whitespace-nowrap" onclick="pgToggleChildSocks(${i})" style="background:${State["_pgChildHasSocks" + i] === true ? "rgba(39,174,96,.15)" : "transparent"};border:1px solid ${State["_pgChildHasSocks" + i] === true ? "var(--success)" : "var(--border)"}">
            <div class="w-4 h-4 rounded flex items-center justify-center text-xs font-bold" style="background:${State["_pgChildHasSocks" + i] === true ? "var(--success)" : "var(--bg2)"};color:${State["_pgChildHasSocks" + i] === true ? "#fff" : "var(--muted)"}">
              ${State["_pgChildHasSocks" + i] === true ? '<i class="fas fa-check fa-xs"></i>' : ""}
            </div>
            <span style="color:${State["_pgChildHasSocks" + i] === true ? "var(--success)" : "var(--muted)"}">Kaos kaki</span>
          </div>
        </div>`; }).join("")}
      </div>

      <div class="card mb-4">
        <div class="flex justify-between items-center mb-3">
          <div>
            <label class="text-xs font-semibold" style="color:var(--muted)">Pendamping</label>
            <div class="text-xs mt-0.5" style="color:var(--accent)">${formatCurrency(PG_COMPANION_PRICE)}/orang/jam</div>
          </div>
          <div class="flex gap-1">
            <button onclick="pgAddCompanion()" class="btn-sm" style="background:rgba(39,174,96,.15);color:var(--success);border:none;padding:4px 10px;border-radius:6px;cursor:pointer;font-size:11px"><i class="fas fa-plus"></i> Tambah</button>
            ${pgCompanionCount > 0 ? '<button onclick="pgRemoveCompanion()" class="btn-sm" style="background:rgba(231,76,60,.15);color:var(--danger);border:none;padding:4px 10px;border-radius:6px;cursor:pointer;font-size:11px"><i class="fas fa-minus"></i></button>' : ""}
          </div>
        </div>
        ${Array.from({ length: pgCompanionCount }, function(_, i) { return `
        <div class="flex items-center gap-2 mb-2">
          <i class="fas fa-user" style="color:var(--accent);font-size:14px"></i>
          <input class="input-field text-sm flex-1" placeholder="Nama pendamping ${i + 1}" value="${State["_pgCompanionName" + i] || ""}" oninput="State['_pgCompanionName${i}']=this.value">
        </div>`; }).join("")}
      </div>

      <div class="grid grid-cols-2 gap-3 mb-4">
        <div class="card">
          <label class="text-xs font-semibold mb-3 block" style="color:var(--muted)">Durasi</label>
          <div class="flex items-center gap-3">
            <button onclick="pgAdjustHours(-1)" class="qty-btn">-</button>
            <span class="font-bold text-lg w-8 text-center">${hours}</span>
            <button onclick="pgAdjustHours(1)" class="qty-btn">+</button>
            <span class="text-xs" style="color:var(--muted)">Min. 1</span>
          </div>
        </div>
        <div class="card cursor-pointer text-center" onclick="showPgSnackModal()">
          <label class="text-xs font-semibold mb-2 block" style="color:var(--muted)">Makanan & minuman</label>
          ${selectedSnacks.length > 0 ? '<div style="color:var(--accent)"><i class="fas fa-utensils" style="font-size:18px"></i><div class="text-sm font-semibold mt-1">' + selectedSnacks.length + ' item</div></div>' : '<div style="color:var(--accent);padding-top:8px"><i class="fas fa-utensils" style="font-size:18px"></i><div class="text-xs mt-1" style="color:var(--muted)">Pilih</div></div>'}
        </div>
      </div>

      ${children.length > 0 || companions.length > 0 || calc.socks > 0 || calc.itemsTotal > 0 ? `
      <div class="card mb-4">
        <div class="text-xs font-semibold mb-2" style="color:var(--muted)">Rincian Harga</div>
        ${children.length > 0 ? '<div class="text-xs font-semibold mb-1" style="color:var(--muted)">Tiket anak-anak</div>' : ""}
        ${children.map(function(c, i) { return `
        <div class="flex justify-between text-sm mb-1.5 items-center">
          <span>
            <i class="fas fa-child mr-1" style="color:var(--accent);font-size:12px"></i>
            ${c.name}
          </span>
          <span>${formatCurrency(PG_CHILD_PRICE * calc.hours)}</span>
        </div>`; }).join("")}
        ${companions.length > 0 ? '<div class="text-xs font-semibold mb-1" style="color:var(--muted)">Tiket pendamping</div>' : ""}
        ${companions.map(function(c) { return `
        <div class="flex justify-between text-sm mb-1.5 items-center">
          <span>
            <i class="fas fa-user mr-1" style="color:var(--accent);font-size:12px"></i>
            ${c.name}
          </span>
          <span>${formatCurrency(PG_COMPANION_PRICE * calc.hours)}</span>
        </div>`; }).join("")}
        <div class="text-xs pt-1 pb-1" style="color:var(--muted)"><i class="fas fa-clock mr-1"></i>Durasi ${calc.hours} jam</div>
        <div class="border-t pt-2 mt-2" style="border-color:var(--border)"></div>
        ${calc.socks > 0 ? '<div class="flex justify-between text-sm mb-1"><span style="color:var(--muted)">Kaos kaki x' + calc.socksCount + '</span><span>' + formatCurrency(calc.socks) + '</span></div>' : ""}
        ${selectedSnacks.length > 0 ? '<div class="text-xs font-semibold mt-2 mb-1" style="color:var(--muted)">Pesanan</div>' : ""}
        ${selectedSnacks.map(function(s) { return `
        <div class="flex justify-between text-sm mb-1 items-center">
          <span style="color:var(--muted)"><i class="fas fa-utensils mr-1" style="font-size:12px"></i>${s.name}</span>
          <div class="flex items-center gap-2">
            <button onclick="pgDecSnack('${s.menu_item_id}')" class="qty-btn" style="width:24px;height:24px;font-size:12px;padding:0;line-height:24px">-</button>
            <span class="text-xs font-semibold w-4 text-center">${s.quantity}</span>
            <button onclick="pgIncSnack('${s.menu_item_id}')" class="qty-btn" style="width:24px;height:24px;font-size:12px;padding:0;line-height:24px">+</button>
            <span>${formatCurrency(s.unit_price * s.quantity)}</span>
          </div>
        </div>`; }).join("")}
        <div class="border-t pt-2 mt-2" style="border-color:var(--border)">
          <div class="flex justify-between font-bold">
            <span>Total</span>
            <span style="color:var(--accent)">${formatCurrency(calc.total)}</span>
          </div>
        </div>
      </div>` : ""}

      <div class="card mb-4">
        <label class="text-xs font-semibold mb-3 block" style="color:var(--muted)">Metode Pembayaran</label>
        <div class="grid grid-cols-3 gap-3">
          <div class="card text-center py-3 cursor-pointer text-sm" onclick="pgSelectMethod('qris')" style="${(State._pgPaymentMethod || "qris") === "qris" ? "border-color:var(--accent);background:rgba(224,122,58,.08)" : ""}"><i class="fas fa-qrcode mb-1" style="color:var(--accent)"></i><br>QRIS</div>
          <div class="card text-center py-3 cursor-pointer text-sm" onclick="pgSelectMethod('transfer')" style="${State._pgPaymentMethod === "transfer" ? "border-color:var(--accent);background:rgba(224,122,58,.08)" : ""}"><i class="fas fa-university mb-1" style="color:var(--accent)"></i><br>Transfer</div>
          <div class="card text-center py-3 cursor-pointer text-sm" onclick="pgSelectMethod('cash')" style="${State._pgPaymentMethod === "cash" ? "border-color:var(--accent);background:rgba(224,122,58,.08)" : ""}"><i class="fas fa-money-bill mb-1" style="color:var(--success)"></i><br>Tunai</div>
        </div>
      </div>

      <button onclick="createPlaygroundTicket()" class="btn-primary w-full text-center flex items-center justify-center gap-2">
        <i class="fas fa-ticket"></i> Buat Tiket — ${formatCurrency(calc.total)}
      </button>
    </div>`;
  } catch(e) { console.error(e); showToast('Gagal memuat form tiket', 'error'); return ''; }
  finally { hideSkeleton('playground-create'); }
}

function pgAddChild() {
  State._pgChildCount = (State._pgChildCount || 0) + 1;
  render();
}

function pgRemoveChild() {
  var c = State._pgChildCount || 0;
  if (c > 0) {
    delete State["_pgChildName" + (c - 1)];
    State._pgChildCount = c - 1;
  }
  render();
}

function pgAddCompanion() {
  State._pgCompanionCount = (State._pgCompanionCount || 0) + 1;
  render();
}

function pgRemoveCompanion() {
  var c = State._pgCompanionCount || 0;
  if (c > 0) {
    delete State["_pgCompanionName" + (c - 1)];
    State._pgCompanionCount = c - 1;
  }
  render();
}

function pgAdjustHours(d) {
  State._pgHours = Math.max(1, (State._pgHours || 1) + d);
  render();
}

function pgToggleChildSocks(i) {
  var currentlyChecked = State["_pgChildHasSocks" + i] === true;
  if (!currentlyChecked) {
    var sockStock = (DB.pgStockItems || []).find(function(s) { return s.category === "Perlengkapan"; });
    var totalChecked = 0;
    for (var j = 0; j < (State._pgChildCount || 0); j++) {
      if (State["_pgChildHasSocks" + j] === true) totalChecked++;
    }
    if (!sockStock || totalChecked >= sockStock.current_quantity) {
      showModal(`
        <div class="text-center">
          <div class="text-4xl mb-3" style="color:var(--warning)"><i class="fas fa-exclamation-triangle"></i></div>
          <h3 class="font-display text-lg font-bold mb-2">Stok Kaos Kaki Habis</h3>
          <p class="text-sm" style="color:var(--muted)">Maaf, stok kaos kaki sedang kosong. Silakan hubungi staf untuk pengisian ulang.</p>
          <button onclick="closeModal();render()" class="btn-primary w-full mt-4 text-center">Mengerti</button>
        </div>
      `);
      return;
    }
  }
  State["_pgChildHasSocks" + i] = !currentlyChecked;
  render();
}

function pgIncSnack(id) {
  if (!State._pgSelectedSnacks) State._pgSelectedSnacks = [];
  var stock = (DB.pgStockItems || []).find(function(x) { return x.id === id; });
  if (!stock) return;
  var idx = State._pgSelectedSnacks.findIndex(function(s) { return s.menu_item_id === id; });
  var currentQty = idx >= 0 ? State._pgSelectedSnacks[idx].quantity : 0;
  if (currentQty >= stock.current_quantity) {
    showModal(`
      <div class="text-center">
        <div class="text-4xl mb-3" style="color:var(--warning)"><i class="fas fa-exclamation-triangle"></i></div>
        <h3 class="font-display text-lg font-bold mb-2">Stok Tidak Cukup</h3>
        <p class="text-sm" style="color:var(--muted)">Stok <strong>${stock.name}</strong> tersisa <strong>${stock.current_quantity}</strong>. Tidak bisa menambah lagi.</p>
        <button onclick="closeModal();render()" class="btn-primary w-full mt-4 text-center">Mengerti</button>
      </div>
    `);
    return;
  }
  if (idx >= 0) {
    State._pgSelectedSnacks[idx].quantity++;
  } else {
    State._pgSelectedSnacks.push({
      menu_item_id: id,
      name: stock.name,
      quantity: 1,
      unit_price: stock.price,
    });
  }
  render();
}

function pgDecSnack(id) {
  if (!State._pgSelectedSnacks) return;
  var idx = State._pgSelectedSnacks.findIndex(function(s) { return s.menu_item_id === id; });
  if (idx < 0) return;
  var s = State._pgSelectedSnacks[idx];
  if (s.quantity > 1) {
    s.quantity--;
  } else {
    State._pgSelectedSnacks.splice(idx, 1);
  }
  render();
}

function showPgSnackModal() {
  if (!State.pgModalCategory) State.pgModalCategory = 'all';
  var categories = ['all', 'Makanan', 'Minuman'];
  var allItems = (DB.pgStockItems || []).filter(function(s) { return s.current_quantity > 0 && (s.category === "Makanan" || s.category === "Minuman"); });
  var items = State.pgModalCategory === 'all' ? allItems : allItems.filter(function(s) { return s.category === State.pgModalCategory; });
  var selected = State._pgSelectedSnacks || [];
  showModal(`
    <div>
      <div class="flex justify-between items-center mb-4">
        <h3 class="font-display text-lg font-bold">Pilih Item</h3>
        <button onclick="closeModal();render()" style="background:none;border:none;color:var(--muted);font-size:20px;cursor:pointer"><i class="fas fa-times"></i></button>
      </div>
      <div class="card mb-2" style="padding:10px">
        <input type="text" class="input-field text-sm w-full" placeholder="Cari item..." oninput="pgFilterModalItems(this.value)">
      </div>
      <div class="flex gap-2 mb-3 overflow-x-auto pb-1" style="-webkit-overflow-scrolling:touch;scrollbar-width:none">
        ${categories.map(function(c) { return `
          <button onclick="State.pgModalCategory='${c}';closeModal();showPgSnackModal()" class="btn-sm px-3 py-1.5 text-xs font-semibold whitespace-nowrap" style="background:${State.pgModalCategory === c ? 'var(--accent)' : 'var(--bg2)'};color:${State.pgModalCategory === c ? '#fff' : 'var(--muted)'};border:1px solid ${State.pgModalCategory === c ? 'var(--accent)' : 'var(--border)'};border-radius:20px;cursor:pointer">${c === 'all' ? 'Semua' : c}</button>`;
        }).join('')}
      </div>
      <div class="grid grid-cols-2 gap-3" id="pg-modal-grid" style="max-height:60vh;overflow-y:auto;padding-bottom:12px">
        ${items.map(function(s) {
          var inCart = selected.find(function(x) { return x.menu_item_id === s.id; });
          return `
          <div id="pg-modal-item-${s.id}" class="card text-center py-3 px-2 cursor-pointer ${inCart ? "ring-2" : ""}" onclick="pgIncSnackFromModal('${s.id}')" style="${inCart ? "--tw-ring-color:var(--success);border-color:var(--success)" : ""}">
            ${s.image ? '<img src="' + s.image + '" onerror="this.style.display=\'none\'" style="width:56px;height:56px;object-fit:cover;border-radius:8px;margin:0 auto 6px">' : '<div style="width:56px;height:56px;border-radius:8px;margin:0 auto 6px;background:var(--bg2);display:flex;align-items:center;justify-content:center;color:var(--muted);font-size:20px"><i class="fas fa-utensils"></i></div>'}
            <div class="font-semibold text-sm truncate">${s.name}</div>
            <div style="color:var(--accent);font-size:12px">${formatCurrency(s.price)}</div>
            ${inCart ? '<div class="flex items-center justify-center gap-2 mt-2 pg-modal-controls"><button onclick="event.stopPropagation();pgDecSnackFromModal(\'' + s.id + '\')" class="qty-btn" style="width:24px;height:24px;font-size:12px;padding:0;line-height:24px">-</button><span class="font-bold text-xs w-4 text-center pg-modal-qty" data-id="' + s.id + '">' + inCart.quantity + '</span><button onclick="event.stopPropagation();pgIncSnackFromModal(\'' + s.id + '\')" class="qty-btn" style="width:24px;height:24px;font-size:12px;padding:0;line-height:24px">+</button></div>' : '<div class="text-xs mt-2 pg-modal-add" data-id="' + s.id + '" style="color:var(--success)">+ Tambah</div>'}
          </div>`; }).join("")}
        ${items.length === 0 ? '<div class="col-span-2 text-center py-6 text-sm" style="color:var(--muted)">Tidak ada item tersedia</div>' : ""}
      </div>
      <button onclick="closeModal();render()" class="btn-secondary w-full mt-3 text-center">Selesai</button>
    </div>
  `);
}

function pgIncSnackFromModal(id) {
  if (!State._pgSelectedSnacks) State._pgSelectedSnacks = [];
  var stock = (DB.pgStockItems || []).find(function(x) { return x.id === id; });
  if (!stock) return;
  var idx = State._pgSelectedSnacks.findIndex(function(s) { return s.menu_item_id === id; });
  var currentQty = idx >= 0 ? State._pgSelectedSnacks[idx].quantity : 0;
  if (currentQty >= stock.current_quantity) {
    var overlay = document.querySelector(".modal-overlay");
    if (!overlay) return;
    var warnBg = document.createElement("div");
    warnBg.id = "pg-stock-warning";
    warnBg.style.cssText = "position:absolute;inset:0;z-index:10;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;border-radius:16px";
    warnBg.innerHTML = `
      <div class="text-center p-8" style="background:var(--card);border-radius:16px;max-width:360px;width:85vw;margin:0 16px">
        <div class="text-4xl mb-3" style="color:var(--warning)"><i class="fas fa-exclamation-triangle"></i></div>
        <h3 class="font-display text-lg font-bold mb-2">Stok Tidak Cukup</h3>
        <p class="text-sm" style="color:var(--muted)">Stok <strong>${stock.name}</strong> tersisa <strong>${stock.current_quantity}</strong>.</p>
        <button onclick="document.getElementById('pg-stock-warning').remove()" class="btn-primary w-full mt-4 text-center">Mengerti</button>
      </div>`;
    overlay.appendChild(warnBg);
    return;
  }
  if (idx >= 0) {
    State._pgSelectedSnacks[idx].quantity++;
  } else {
    State._pgSelectedSnacks.push({
      menu_item_id: id,
      name: stock.name,
      quantity: 1,
      unit_price: stock.price,
    });
  }
  var card = document.getElementById("pg-modal-item-" + id);
  if (!card) return;
  card.classList.add("ring-2");
  card.style.borderColor = "var(--success)";
  card.style.setProperty("--tw-ring-color", "var(--success)");
  var addEl = card.querySelector(".pg-modal-add");
  if (addEl) {
    var qty = State._pgSelectedSnacks.find(function(x) { return x.menu_item_id === id; }).quantity;
    addEl.outerHTML = '<div class="flex items-center justify-center gap-2 mt-2 pg-modal-controls">' +
      '<button onclick="event.stopPropagation();pgDecSnackFromModal(\'' + id + '\')" class="qty-btn" style="width:24px;height:24px;font-size:12px;padding:0;line-height:24px">-</button>' +
      '<span class="font-bold text-xs w-4 text-center pg-modal-qty" data-id="' + id + '">' + qty + '</span>' +
      '<button onclick="event.stopPropagation();pgIncSnackFromModal(\'' + id + '\')" class="qty-btn" style="width:24px;height:24px;font-size:12px;padding:0;line-height:24px">+</button>' +
      '</div>';
  } else {
    var qtyEl = card.querySelector(".pg-modal-qty");
    if (qtyEl) qtyEl.textContent = parseInt(qtyEl.textContent) + 1;
  }
}

function pgDecSnackFromModal(id) {
  if (!State._pgSelectedSnacks) return;
  var idx = State._pgSelectedSnacks.findIndex(function(s) { return s.menu_item_id === id; });
  if (idx < 0) return;
  var s = State._pgSelectedSnacks[idx];
  if (s.quantity > 1) {
    s.quantity--;
  } else {
    State._pgSelectedSnacks.splice(idx, 1);
  }
  var card = document.getElementById("pg-modal-item-" + id);
  if (!card) return;
  var stillInCart = State._pgSelectedSnacks.find(function(x) { return x.menu_item_id === id; });
  if (stillInCart) {
    var qtyEl = card.querySelector(".pg-modal-qty");
    if (qtyEl) qtyEl.textContent = stillInCart.quantity;
  } else {
    card.classList.remove("ring-2");
    card.style.borderColor = "";
    var ctrl = card.querySelector(".pg-modal-controls");
    if (ctrl) ctrl.outerHTML = '<div class="text-xs mt-2 pg-modal-add" data-id="' + id + '" style="color:var(--success)">+ Tambah</div>';
  }
}

function pgSelectMethod(val) {
  State._pgPaymentMethod = val;
  render();
}

function createPlaygroundTicket() {
  var name = State._pgCustomerName;
  if (!name || !name.trim()) {
    showToast("Masukkan nama pelanggan", "warning");
    return;
  }
  var childCount = State._pgChildCount || 0;
  var children = [];
  for (var i = 0; i < childCount; i++) {
    var n = State["_pgChildName" + i];
    if (!n || !n.trim()) {
      showToast("Isi nama anak ke-" + (i + 1), "warning");
      return;
    }
    children.push({ name: n.trim() });
  }
  var companionCount = State._pgCompanionCount || 0;
  var companions = [];
  for (var i = 0; i < companionCount; i++) {
    var n = State["_pgCompanionName" + i];
    if (!n || !n.trim()) {
      showToast("Isi nama pendamping ke-" + (i + 1), "warning");
      return;
    }
    companions.push({ name: n.trim() });
  }
  var hours = State._pgHours || 1;
  var childSocks = [];
  for (var i = 0; i < children.length; i++) {
    childSocks.push(State["_pgChildHasSocks" + i] === true);
  }
  var selectedSnacks = State._pgSelectedSnacks || [];
  var calc = calcPlaygroundTotal(children, companions, hours, childSocks, selectedSnacks);
  var paymentMethod = State._pgPaymentMethod || "qris";

  if (paymentMethod === "cash") {
    finalizePlaygroundTicket();
    return;
  }

  var totalStr = formatCurrency(calc.total);

  if (paymentMethod === "qris") {
    var data = encodeURIComponent("ARQA-COFFEE:PAY:PG:" + calc.total);
    showModal(`
      <div>
        <h3 class="font-display text-lg font-bold mb-2 text-center">Pembayaran QRIS</h3>
        <p class="text-xs text-center mb-4" style="color:var(--muted)">Scan kode QR berikut untuk membayar</p>
        <div class="flex justify-center mb-4">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${data}" alt="QRIS Payment" style="border-radius:12px;max-width:100%">
        </div>
        <div class="text-center mb-4">
          <div class="text-sm" style="color:var(--muted)">Total Pembayaran</div>
          <div class="font-bold text-xl" style="color:var(--accent)">${totalStr}</div>
        </div>
        <div class="flex gap-2">
          <button onclick="closeModal()" class="btn-sm flex-1 text-center" style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:10px;cursor:pointer">Batal</button>
          <button onclick="closeModal();finalizePlaygroundTicket()" class="btn-primary btn-sm flex-1 text-center">Saya Sudah Bayar</button>
        </div>
      </div>
    `);
  } else if (paymentMethod === "transfer") {
    showModal(`
      <div>
        <h3 class="font-display text-lg font-bold mb-2 text-center">Transfer Bank</h3>
        <p class="text-xs text-center mb-4" style="color:var(--muted)">Transfer ke rekening berikut</p>
        <div class="card mb-4 space-y-3">
          <div class="flex justify-between text-sm"><span style="color:var(--muted)">Bank</span><span class="font-semibold">BCA</span></div>
          <div class="flex justify-between text-sm"><span style="color:var(--muted)">No. Rekening</span><span class="font-semibold">1234567890</span></div>
          <div class="flex justify-between text-sm"><span style="color:var(--muted)">Atas Nama</span><span class="font-semibold">ARQA Coffee</span></div>
          <div class="flex justify-between text-sm pt-2 border-t" style="border-color:var(--border)"><span style="color:var(--muted)">Total Transfer</span><span class="font-bold" style="color:var(--accent)">${totalStr}</span></div>
        </div>
        <div class="flex gap-2">
          <button onclick="closeModal()" class="btn-sm flex-1 text-center" style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:10px;cursor:pointer">Batal</button>
          <button onclick="closeModal();finalizePlaygroundTicket()" class="btn-primary btn-sm flex-1 text-center">Saya Sudah Transfer</button>
        </div>
      </div>
    `);
  }
}

async function finalizePlaygroundTicket() {
  try {
    var name = State._pgCustomerName ? State._pgCustomerName.trim() : "";
    var childCount = State._pgChildCount || 0;
    var children = [];
    for (var i = 0; i < childCount; i++) {
      var n = State["_pgChildName" + i];
      children.push({ name: n ? n.trim() : "Anak " + (i + 1) });
    }
    var companions = [];
    for (var i = 0; i < (State._pgCompanionCount || 0); i++) {
      var n = State["_pgCompanionName" + i];
      companions.push({ name: n ? n.trim() : "Pendamping " + (i + 1) });
    }
    var hours = State._pgHours || 1;
    var childSocks = [];
    for (var i = 0; i < children.length; i++) {
      childSocks.push(State["_pgChildHasSocks" + i] === true);
    }
    var selectedSnacks = State._pgSelectedSnacks || [];
    var calc = calcPlaygroundTotal(children, companions, hours, childSocks, selectedSnacks);
    var paymentMethod = State._pgPaymentMethod || "cash";

    var now = new Date();
    var ticket = {
      id: "pg" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      user_id: State.currentUser.id,
      customer_name: name,
      children: children,
      companions: companions,
      companion_count: companions.length,
      socks_per_child: childSocks,
      socks_total: calc.socks,
      items: selectedSnacks.map(function(s) { return {
        menu_item_id: s.menu_item_id,
        name: s.name,
        quantity: s.quantity,
        unit_price: s.unit_price,
      }; }),
      hours: calc.hours,
      start_time: now.toISOString(),
      end_time: new Date(now.getTime() + calc.hours * 3600000).toISOString(),
      subtotal: calc.subtotal,
      items_total: calc.itemsTotal,
      total_amount: calc.total,
      payment_status: "paid",
      payment_method: paymentMethod,
      status: "active",
      created_at: now.toISOString(),
    };

    await API.createPlaygroundTicket(ticket);

    for (var si = 0; si < selectedSnacks.length; si++) {
      var s = selectedSnacks[si];
      var stockItem = (DB.pgStockItems || []).find(function(x) { return x.id === s.menu_item_id; });
      if (stockItem) {
        var newQty = Math.max(0, stockItem.current_quantity - s.quantity);
        await API.updatePgStockItem(stockItem.id, { current_quantity: newQty, updated_at: new Date().toISOString() });
        await API.createPgStockMovement({
          id: "psm" + Date.now() + Math.random().toString(36).slice(2, 6),
          stock_item_id: stockItem.id,
          user_id: State.currentUser.id,
          type: "out",
          quantity: s.quantity,
          notes: "Terjual via tiket",
          created_at: new Date().toISOString()
        });
        if (newQty <= stockItem.min_quantity) notifyLowStock(stockItem);
      }
    }

    var sockCount = childSocks.filter(Boolean).length;
    if (sockCount > 0) {
      var sockStock = (DB.pgStockItems || []).find(function(s) { return s.category === "Perlengkapan"; });
      if (sockStock) {
        var newSockQty = Math.max(0, sockStock.current_quantity - sockCount);
        await API.updatePgStockItem(sockStock.id, { current_quantity: newSockQty, updated_at: new Date().toISOString() });
        await API.createPgStockMovement({
          id: "psm" + Date.now() + Math.random().toString(36).slice(2, 6),
          stock_item_id: sockStock.id,
          user_id: State.currentUser.id,
          type: "out",
          quantity: sockCount,
          notes: "Kaos kaki via tiket",
          created_at: new Date().toISOString()
        });
        if (newSockQty <= sockStock.min_quantity) notifyLowStock(sockStock);
      }
    }

    DB.pgStockItems = await API.getPgStock();

    State._pgCustomerName = "";
    State._pgChildCount = 0;
    State._pgCompanionCount = 0;
    State._pgHours = 1;
    State._pgSelectedSnacks = [];
    State._pgPaymentMethod = "qris";
    for (var j = 0; j < 10; j++) delete State["_pgChildName" + j];
    for (var j = 0; j < 10; j++) delete State["_pgChildHasSocks" + j];
    for (var j = 0; j < 10; j++) delete State["_pgCompanionName" + j];

    showToast("Tiket " + name + " berhasil dibuat!", "success");
    switchTab("tickets");
  } catch(e) { console.error(e); showToast('Gagal membuat tiket', 'error'); }
}

function pgFilterModalItems(q) {
  var grid = document.getElementById('pg-modal-grid');
  if (!grid) return;
  var val = (q || '').toLowerCase();
  grid.querySelectorAll('.card.text-center').forEach(function(card) {
    var name = card.querySelector('.font-semibold')?.textContent?.toLowerCase() || '';
    card.style.display = !val || name.indexOf(val) !== -1 ? '' : 'none';
  });
}
