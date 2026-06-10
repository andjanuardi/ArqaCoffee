// ============================================================
// WAITER VIEW
// ============================================================
function renderWaiterView() {
  const tab = State.currentTab.waiter || "menu";
  if (tab === "menu") return renderWaiterMenu();
  if (tab === "cart") return renderWaiterCart();
  if (tab === "orders") return renderWaiterOrders();
  if (tab === "profile") return renderWaiterProfile();
  return renderWaiterMenu();
}

function renderWaiterMenu() {
  if (!isCheckedIn()) {
    return `
    <div class="animate-fade-up">
      <div class="card text-center py-6" style="border-color:rgba(231,76,60,.2)">
        <i class="fas fa-hand-peace text-3xl mb-2" style="color:var(--danger)"></i>
        <p class="text-sm font-semibold mb-1" style="color:var(--danger)">Belum Check-in Hari Ini</p>
        <p class="text-xs mb-3" style="color:var(--muted)">Lakukan check-in di profil sebelum mulai melayani</p>
        <button onclick="showGeoAttendanceModal()" class="btn-primary text-sm px-5 py-2" style="font-size:13px">
          <i class="fas fa-clock mr-1"></i>Check-in
        </button>
      </div>
    </div>`;
  }
  const cats = [
    { id: "all", label: "Semua" },
    { id: "coffee", label: "Kopi" },
    { id: "non-coffee", label: "Non-Kopi" },
    { id: "food", label: "Makanan" },
    { id: "snack", label: "Snack" },
  ];
  let items = DB.menuItems.filter((m) => m.is_available && m.is_approved !== false);
  if (State.selectedCategory !== "all")
    items = items.filter((m) => m.category === State.selectedCategory);
  if (State.searchQuery)
    items = items.filter((m) =>
      m.name.toLowerCase().includes(State.searchQuery.toLowerCase()),
    );

  return `
  <div class="animate-fade-up">
    <div class="mb-6">
      <h2 class="font-display text-2xl md:text-3xl font-black mb-1">Halo, ${State.currentUser.name.split(" ")[0]}</h2>
      <p style="color:var(--muted)">Siap melayani pesanan meja</p>
    </div>

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
              return `
        <div class="rounded-2xl p-4 relative overflow-hidden cursor-pointer promo-card" onclick="showPromoDetail('${p.id}')" style="${bgStyle};color:#fff">
          <div class="text-xs font-semibold mb-1 uppercase" style="opacity:.85;letter-spacing:1px">Diskon ${discLabel}</div>
          <div class="font-display text-lg font-black mb-1 promo-title">${p.title}</div>
          <div class="text-xs mb-3 promo-desc" style="opacity:.8">${p.desc}</div>
          <div class="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-lg" style="background:rgba(255,255,255,.25)">Klaim <i class="fas fa-arrow-right" style="font-size:10px"></i></div>
        </div>`;
            }
          )
          .join("")}
      </div>
      ${DB.promos.filter((p) => p.is_active && isPromoActiveByDate(p) && !isPromoUsedByUser(p.id) && p.id !== State.activePromoId).length > 1 ? '<div class="promo-dots" id="promo-dots"></div>' : ''}
    </div>`
        : ""
    }
    <div class="flex gap-2 mb-5 overflow-x-auto pb-2" style="-webkit-overflow-scrolling:touch;scrollbar-width:none;">
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
          ${m.submitted_by ? (() => { const u = DB.users.find(x => x.name === m.submitted_by); const lbl = u?.business_name || m.submitted_by; return '<div class="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full" style="background:rgba(232,67,147,.9);color:#fff"><i class="fas fa-handshake mr-1" style="font-size:8px"></i>' + lbl + '</div>'; })() : '<div class="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full" style="background:rgba(224,122,58,.9);color:#fff"><i class="fas fa-check-circle mr-1" style="font-size:8px"></i>Arqa</div>'}
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

function renderWaiterCart() {
  if (State.cart.length === 0) return renderWaiterEmptyCart();
  const activePromo = getActivePromo();
  const total = State.cart.reduce((s, c) => s + c.unit_price * c.quantity, 0);
  const discount = calcPromoDiscount();
  const afterDiscount = total - discount;
  const tax = Math.round(calcItemTax(State.cart));
  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Keranjang Pesanan</h2>
    <div class="space-y-3 mb-6">${State.cart.map((c, i) => {
      const eligible = isItemEligible(c, activePromo);
      const discUnitPrice = calcItemDiscount(c, activePromo);
      return renderWaiterCartItem(c, i, eligible, discUnitPrice);
    }).join("")}</div>
    ${activePromo ? renderWaiterPromoBanner(activePromo) : ""}
    <div class="card mb-4">
      <div class="flex justify-between mb-2 text-sm"><span style="color:var(--muted)">Subtotal</span><span>${formatCurrency(total)}</span></div>
      ${discount > 0 ? `<div class="flex justify-between mb-2 text-sm"><span style="color:var(--success)"><i class="fas fa-tag mr-1"></i>Diskon</span><span style="color:var(--success)">-${formatCurrency(discount)}</span></div>` : ""}
      <div class="flex justify-between mb-2 text-sm"><span style="color:var(--muted)">Pajak</span><span>${formatCurrency(tax)}</span></div>
      <div class="border-t pt-2 mt-2" style="border-color:var(--border)">
        <div class="flex justify-between font-bold"><span>Total</span><span style="color:var(--accent)">${formatCurrency(afterDiscount + tax)}</span></div>
      </div>
    </div>
    <div class="card mb-4">
      <label class="text-xs font-semibold mb-3 block" style="color:var(--muted)">Meja</label>
      ${State.selectedTable
        ? `<div class="flex items-center gap-2 p-3 rounded-xl text-xs" style="background:rgba(39,174,96,.1);color:var(--success)">
            <i class="fas fa-check-circle"></i>
            <span>Meja <b>${getTable(State.selectedTable)?.number || "-"}</b> dipilih</span>
            <button onclick="State.selectedTable=null;render()" class="ml-auto text-xs underline" style="color:var(--muted)">Ganti</button>
          </div>`
        : `<button onclick="showWaiterTableSelector()" class="btn-secondary w-full text-center flex items-center justify-center gap-2">
            <i class="fas fa-chair"></i> Pilih Meja
          </button>`}
    </div>
    <div class="card mb-4">
      <label class="text-xs font-semibold mb-3 block" style="color:var(--muted)">Kapan Membayar?</label>
      <div class="grid grid-cols-2 gap-3 mb-4">
        <div class="card text-center py-3 cursor-pointer text-sm" onclick="selectPayTiming('now')" style="${State.payTiming === "later" ? "" : "border-color:var(--accent);background:rgba(224,122,58,.08)"}">
          <i class="fas fa-bolt mb-1" style="color:var(--accent)"></i><br><span class="font-semibold">Bayar Sekarang</span>
          <div class="text-[10px] mt-1" style="color:var(--muted)">Langsung selesai</div>
        </div>
        <div class="card text-center py-3 cursor-pointer text-sm" onclick="selectPayTiming('later')" style="${State.payTiming === "later" ? "border-color:var(--accent);background:rgba(224,122,58,.08)" : ""}">
          <i class="fas fa-clock mb-1" style="color:var(--warning)"></i><br><span class="font-semibold">Bayar Nanti</span>
          <div class="text-[10px] mt-1" style="color:var(--muted)">Bayar di kasir</div>
        </div>
      </div>
      ${State.payTiming !== "later"
        ? `<label class="text-xs font-semibold mb-3 block" style="color:var(--muted)">Metode Pembayaran</label>
      <div class="grid grid-cols-3 gap-3">
        <div class="card text-center py-3 cursor-pointer text-sm" onclick="selectPayment('qris')" style="${selectedPayment === "qris" ? "border-color:var(--accent);background:rgba(224,122,58,.08)" : ""}"><i class="fas fa-qrcode mb-1" style="color:var(--accent)"></i><br>QRIS</div>
        <div class="card text-center py-3 cursor-pointer text-sm" onclick="selectPayment('bank_transfer')" style="${selectedPayment === "bank_transfer" ? "border-color:var(--accent);background:rgba(224,122,58,.08)" : ""}"><i class="fas fa-university mb-1" style="color:var(--accent)"></i><br>Transfer</div>
        <div class="card text-center py-3 cursor-pointer text-sm" onclick="selectPayment('cash')" style="${selectedPayment === "cash" ? "border-color:var(--accent);background:rgba(224,122,58,.08)" : ""}"><i class="fas fa-money-bill mb-1" style="color:var(--success)"></i><br>Tunai</div>
      </div>`
        : `<div class="flex items-center gap-2 p-3 rounded-xl text-xs" style="background:rgba(243,156,18,.1);color:var(--warning)">
            <i class="fas fa-info-circle"></i>
            <span>Pesanan akan dibuat dengan status <b>Belum Bayar</b>. Silakan arahkan pelanggan ke kasir.</span>
          </div>`}
    </div>
    <button onclick="confirmWaiterPlaceOrder()" class="btn-primary w-full text-center flex items-center justify-center gap-2">
      <i class="fas fa-check"></i> ${State.payTiming === "later" ? "Pesan Sekarang, Bayar Nanti" : "Proses Pesanan"}
    </button>
  </div>`;
}

function renderWaiterCartItem(c, i, eligible, discUnitPrice) {
  const mi = getMenuItem(c.menu_item_id);
  const taxRate = mi ? mi.tax_percentage : 0;
  return `
  <div class="card">
    <div class="flex items-center gap-4">
      <img src="${c.menu_item.image}" class="w-16 h-16 rounded-xl object-cover" onerror="this.src='https://picsum.photos/seed/${c.menu_item.id}/100/100'">
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2">
          <div class="font-semibold text-sm truncate">${c.menu_item.name}</div>
          ${taxRate > 0 ? `<span class="text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0" style="background:rgba(224,122,58,.12);color:var(--accent)">Pajak ${taxRate}%</span>` : ""}
          ${eligible ? '<span class="text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0" style="background:rgba(39,174,96,.15);color:var(--success)">Diskon</span>' : ""}
        </div>
        <div class="flex items-center gap-2 mt-1">
          <div class="qty-btn" style="width:26px;height:26px;font-size:12px" onclick="updateCartQty(${i},-1)">-</div>
          <span class="text-sm font-semibold w-6 text-center">${c.quantity}</span>
          <div class="qty-btn" style="width:26px;height:26px;font-size:12px" onclick="updateCartQty(${i},1)">+</div>
        </div>
      </div>
      <div class="text-right">
        ${eligible
          ? `<div class="text-xs line-through" style="color:var(--muted)">${formatCurrency(c.unit_price * c.quantity)}</div><div class="font-bold text-sm" style="color:var(--success)">${formatCurrency(discUnitPrice * c.quantity)}</div>`
          : `<div class="font-bold text-sm" style="color:var(--accent)">${formatCurrency(c.unit_price * c.quantity)}</div>`}
        <button onclick="removeCartItem(${i})" class="text-xs mt-1" style="color:var(--danger);border:1px solid rgba(231,76,60,.2);border-radius:8px;padding:6px 8px;background:rgba(231,76,60,.06)"><i class="fas fa-trash"></i></button>
      </div>
    </div>
    <div class="border-t mt-3 pt-2" style="border-color:var(--border)"></div>
    <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Catatan</label>
    <input class="input-field text-sm" placeholder="Misal: kurang gula, extra shot..." value="${c.notes || ""}" onblur="updateCartNotes(${i}, this.value)">
  </div>`;
}

function renderWaiterPromoBanner(activePromo) {
  return `<div class="flex items-center gap-2 mb-3 text-xs p-3 rounded-xl" style="background:rgba(39,174,96,.1);color:var(--success)">
    <i class="fas fa-tag"></i>
    <span class="flex-1">Promo <b>${activePromo.title}</b> aktif</span>
    <button onclick="State.activePromoId=null;render()" class="text-xs underline" style="color:var(--muted)">Batalkan</button>
  </div>`;
}

function renderWaiterEmptyCart() {
  return `<div class="text-center py-16 animate-fade-up">
    <i class="fas fa-shopping-bag text-5xl mb-4" style="color:var(--border)"></i>
    <h3 class="semibold text-lg mb-2">Keranjang Kosong</h3>
    <p class="text-sm mb-6" style="color:var(--muted)">Tambahkan menu dari daftar menu</p>
    <button onclick="switchTab('menu')" class="btn-primary">Lihat Menu</button>
  </div>`;
}

function showWaiterTableSelector() {
  syncTableStatus();
  showModal(`
    <div class="text-center">
      <h3 class="font-display text-xl font-bold mb-2">Pilih Meja</h3>
      <p class="text-sm mb-6" style="color:var(--muted)">Pilih meja untuk pesanan pelanggan</p>
      <div class="grid grid-cols-4 gap-3 mb-6">
        ${DB.tables
          .map(
            (t) => `<button class="card text-center py-3 text-sm font-semibold ${t.status === "occupied" ? "opacity-40 cursor-not-allowed" : ""}" onclick="${t.status === "available" ? `selectWaiterTable('${t.id}')` : ""}" style="${t.status === "occupied" ? "pointer-events:none" : ""}">
          <i class="fas fa-chair mb-1" style="color:${t.status === "available" ? "var(--success)" : "var(--danger)"}"></i><br>${t.number}
          ${t.status === "occupied" ? '<br><span style="font-size:9px;color:var(--danger)">Terisi</span>' : '<br><span style="font-size:9px;color:var(--success)">Kosong</span>'}
        </button>`,
          )
          .join("")}
      </div>
      <button onclick="closeModal()" class="btn-secondary">Batal</button>
    </div>
  `);
}

function selectWaiterTable(tid) {
  State.selectedTable = tid;
  State.orderType = "dine-in";
  closeModal();
  const t = getTable(tid);
  showToast(`Meja ${t?.number} dipilih`, "success");
  render();
}

function confirmWaiterPlaceOrder() {
  if (!State.selectedTable) {
    showToast("Silakan pilih meja terlebih dahulu", "warning");
    return;
  }
  const total = State.cart.reduce((s, c) => s + c.unit_price * c.quantity, 0);
  const discount = calcPromoDiscount();
  const afterDiscount = total - discount;
  const tax = Math.round(calcItemTax(State.cart));
  const grandTotal = afterDiscount + tax;
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
      <p class="text-xs text-center mb-4" style="color:var(--muted)">Pastikan pesanan pelanggan sudah benar</p>

      <div class="p-3 rounded-xl mb-4" style="background:var(--bg2)">
        <div class="text-xs font-semibold mb-2" style="color:var(--muted)">Rincian Pesanan</div>
        <div>${itemsList}</div>
        <div class="border-t pt-2 mt-2" style="border-color:var(--border)">
          <div class="flex justify-between text-sm"><span style="color:var(--muted)">Subtotal</span><span>${formatCurrency(total)}</span></div>
          ${discount > 0 ? `<div class="flex justify-between text-sm"><span style="color:var(--success)"><i class="fas fa-tag mr-1"></i>Diskon ${activePromo ? activePromo.title : ''}</span><span style="color:var(--success)">-${formatCurrency(discount)}</span></div>` : ""}
          <div class="flex justify-between text-sm"><span style="color:var(--muted)">Pajak</span><span>${formatCurrency(tax)}</span></div>
          <div class="flex justify-between font-bold mt-1"><span>Total</span><span style="color:var(--accent)">${formatCurrency(grandTotal)}</span></div>
        </div>
      </div>

      <div class="text-xs mb-4" style="color:var(--muted)">
        <i class="fas fa-chair mr-1"></i>Makan di tempat — Meja ${getTable(State.selectedTable)?.number || "-"}
        ${State.payTiming === "later" ? ' — <span style="color:var(--warning)">Bayar Nanti</span>' : ""}
      </div>

      <div class="flex gap-3">
        <button onclick="closeModal()" class="btn-secondary flex-1">Kembali</button>
        <button onclick="closeModal();placeWaiterOrder()" class="btn-primary flex-1">Pesan Sekarang</button>
      </div>
    </div>
  `);
}

function placeWaiterOrder() {
  if (State.cart.length === 0) {
    showToast("Keranjang masih kosong", "warning");
    return;
  }
  if (!State.selectedTable) {
    showToast("Silakan pilih meja terlebih dahulu", "warning");
    return;
  }
  const total = State.cart.reduce((s, c) => s + c.unit_price * c.quantity, 0);
  const discount = calcPromoDiscount();
  const afterDiscount = total - discount;
  const tax = Math.round(calcItemTax(State.cart));
  const grandTotal = afterDiscount + tax;

  const order = {
    id: genId(),
    user_id: State.currentUser.id,
    waiter_id: State.currentUser.id,
    table_id: State.selectedTable,
    order_type: "dine-in",
    status: "pending",
    total_amount: grandTotal,
    shipping_cost: 0,
    payment_method: State.payTiming === "later" ? "" : selectedPayment,
    payment_status: State.payTiming === "later" ? "unpaid" : (selectedPayment === "qris" || selectedPayment === "bank_transfer" ? "paid" : "unpaid"),
    delivery_address: "",
    delivery_detail: "",
    delivery_location: null,
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
  DB.orders.unshift(order);
  if (order.table_id) {
    const t = getTable(order.table_id);
    if (t) t.status = "occupied";
  }
  State.cart = [];
  State.selectedTable = null;
  State.activePromoId = null;
  notifyOrderPlaced(order, "Waiters: " + State.currentUser.name);
  showToast(
    `Pesanan #${order.id.slice(-5).toUpperCase()} berhasil dibuat!`,
    "success",
  );
  switchTab("orders");
}

function renderWaiterOrders() {
  let myOrders = DB.orders.filter(function(o) {
    if (o.user_id === State.currentUser.id) return true;
    if (o.waiter_id === State.currentUser.id) return true;
    if (o.order_type === 'dine-in' && ['ready', 'delivered'].includes(o.status)) return true;
    return false;
  });
  const dateFilter = State.waiterOrderDateFilter !== undefined ? State.waiterOrderDateFilter : new Date().toLocaleDateString('sv-SE');
  if (dateFilter) {
    myOrders = myOrders.filter((o) => o.created_at && new Date(o.created_at).toLocaleDateString('sv-SE') === dateFilter);
  }
  myOrders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Pesanan Saya</h2>
    <div class="flex gap-2 mb-4">
      <div class="flex-1">
        <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Filter Tanggal</label>
        <input type="date" id="waiter-order-date" class="input-field w-full" value="${dateFilter}" onchange="State.waiterOrderDateFilter=this.value;render()">
      </div>
    </div>
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
            <span class="text-xs" style="color:var(--muted)">${formatDate(o.created_at)} ${formatTime(o.created_at)}</span>
          </div>
          <div class="flex justify-between items-center">
            <div class="text-xs" style="color:var(--muted)">
              <i class="fas fa-chair mr-1"></i>Dine-In
              ${t ? ` — Meja ${t.number}` : ""}
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
          <div class="mt-3 flex justify-end gap-2">
            ${o.status === "pending" ? `<button onclick="event.stopPropagation();cancelOrder('${o.id}')" class="text-xs font-bold px-3 py-1.5 rounded-lg" style="color:var(--danger);background:rgba(231,76,60,.1)">Batal Pesanan</button>` : ""}
            ${o.status === "ready" && o.order_type === "dine-in" ? `<button onclick="event.stopPropagation();serveWaiterOrder('${o.id}')" class="text-xs font-bold px-3 py-1.5 rounded-lg" style="color:#fff;background:var(--accent)"><i class="fas fa-utensils mr-1"></i>Antarkan</button>` : ""}
            ${o.status === "delivered" && o.order_type === "dine-in" && o.payment_status === "unpaid" ? `<button onclick="event.stopPropagation();showWaiterPaymentModal('${o.id}')" class="text-xs font-bold px-3 py-1.5 rounded-lg" style="color:#fff;background:var(--accent)"><i class="fas fa-money-bill-wave mr-1"></i>Bayar</button>` : ""}
            ${o.status === "delivered" && o.order_type === "dine-in" && o.payment_status === "collected" ? `<span class="text-xs font-bold px-3 py-1.5 rounded-lg" style="background:rgba(243,156,18,.1);color:var(--warning)"><i class="fas fa-clock mr-1"></i>Menunggu Setoran</span>` : ""}
            ${o.status === "delivered" && o.order_type === "dine-in" && o.payment_status === "paid" ? `<button onclick="event.stopPropagation();completeWaiterOrder('${o.id}')" class="text-xs font-bold px-3 py-1.5 rounded-lg" style="color:#fff;background:var(--success)"><i class="fas fa-check mr-1"></i>Selesaikan</button>` : ""}
          </div>
        </div>`;
        })
        .join("")}
    </div>
  </div>`;
}

function renderWaiterProfile() {
  return renderGenericProfile();
}

function serveWaiterOrder(orderId) {
  const o = DB.orders.find(x => x.id === orderId);
  if (!o || o.order_type !== 'dine-in') return;
  o.waiter_id = State.currentUser.id;
  o.status = 'delivered';
  notifyStatusChange(o, 'delivered');
  showToast('Pesanan telah diantarkan ke meja', 'success');
  render();
}

function showWaiterPaymentModal(orderId) {
  const o = DB.orders.find((x) => x.id === orderId);
  if (!o) return;
  const t = o.table_id ? getTable(o.table_id) : null;
  showModal(`
    <div>
      <div class="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl" style="background:rgba(224,122,58,.1);color:var(--accent)">
        <i class="fas fa-money-bill-wave"></i>
      </div>
      <h3 class="font-display text-lg font-bold mb-1 text-center">Pembayaran Meja ${t ? t.number : ''}</h3>
      <p class="text-xs text-center mb-3" style="color:var(--muted)">#${o.id.slice(-5).toUpperCase()} — Total ${formatCurrency(o.total_amount)}</p>
      <div class="p-3 rounded-xl mb-4 text-center" style="background:var(--bg2)">
        <div class="text-xs" style="color:var(--muted)">Total Pembayaran</div>
        <div class="font-bold text-xl" style="color:var(--accent)">${formatCurrency(o.total_amount)}</div>
      </div>
      <div class="grid grid-cols-3 gap-3 mb-3">
        <div class="card text-center py-4 cursor-pointer" onclick="closeModal();processWaiterPayment('${o.id}','qris')" style="border-color:var(--accent)">
          <i class="fas fa-qrcode text-xl mb-2" style="color:var(--accent)"></i>
          <div class="text-sm font-semibold">QRIS</div>
        </div>
        <div class="card text-center py-4 cursor-pointer" onclick="closeModal();showWaiterTransfer('${o.id}')">
          <i class="fas fa-university text-xl mb-2" style="color:var(--accent)"></i>
          <div class="text-sm font-semibold">Transfer</div>
        </div>
        <div class="card text-center py-4 cursor-pointer" onclick="closeModal();waiterCollectCash('${o.id}')">
          <i class="fas fa-money-bill text-xl mb-2" style="color:var(--success)"></i>
          <div class="text-sm font-semibold">Tunai</div>
        </div>
      </div>
      <button onclick="closeModal()" class="btn-secondary w-full text-center">Batal</button>
    </div>
  `);
}

function showWaiterTransfer(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-2 text-center">Transfer Bank</h3>
      <p class="text-xs text-center mb-4" style="color:var(--muted)">Transfer ke rekening berikut</p>
      <div class="card mb-4 space-y-3">
        <div class="flex justify-between text-sm"><span style="color:var(--muted)">Bank</span><span class="font-semibold">BCA</span></div>
        <div class="flex justify-between text-sm"><span style="color:var(--muted)">No. Rekening</span><span class="font-semibold">1234567890</span></div>
        <div class="flex justify-between text-sm"><span style="color:var(--muted)">Atas Nama</span><span class="font-semibold">ARQA Coffee</span></div>
        <div class="flex justify-between text-sm pt-2 border-t" style="border-color:var(--border)"><span style="color:var(--muted)">Total Transfer</span><span class="font-bold" style="color:var(--accent)">${formatCurrency(o.total_amount)}</span></div>
      </div>
      <div class="flex gap-2">
        <button onclick="closeModal();processWaiterPayment('${o.id}','bank_transfer')" class="btn-primary btn-sm flex-1 text-center">Saya Sudah Transfer</button>
        <button onclick="closeModal()" class="btn-sm flex-1 text-center" style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:10px;cursor:pointer">Batal</button>
      </div>
    </div>
  `);
}

function processWaiterPayment(id, method) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  o.payment_status = "paid";
  o.payment_method = method;
  o.status = "completed";
  if (o.table_id) {
    const hasOther = DB.orders.some(x =>
      x.table_id === o.table_id && x.id !== o.id &&
      !['completed', 'cancelled', 'rejected'].includes(x.status)
    );
    if (!hasOther) {
      const t = getTable(o.table_id);
      if (t) t.status = 'available';
    }
  }
  const label = method === "qris" ? "QRIS" : "Transfer Bank";
  notifyPayment(o, label);
  createMitraPayouts(id);
  closeModal();
  showToast(`Pembayaran #${o.id.slice(-5).toUpperCase()} berhasil (${label})`, "success");
  render();
}

function waiterCollectCash(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  o.payment_status = "collected";
  o.payment_method = "cash";
  addNotification({
    title: 'Setoran Waiter',
    message: '#' + o.id.slice(-5).toUpperCase() + ' — Uang tunai sudah dikumpulkan waiter, silakan terima setoran',
    type: 'payment',
    icon: 'fa-hand-holding-dollar',
    targetRoles: ['cashier', 'admin', 'manager'],
    relatedOrderId: o.id
  });
  closeModal();
  showToast(`Pembayaran tunai dikumpulkan — Setorkan ke kasir`, "success");
  render();
}

function completeWaiterOrder(orderId) {
  const o = DB.orders.find(x => x.id === orderId);
  if (!o || o.order_type !== 'dine-in') return;
  o.status = 'completed';
  if (o.table_id) {
    const hasOther = DB.orders.some(x =>
      x.table_id === o.table_id && x.id !== o.id &&
      !['completed', 'cancelled', 'rejected'].includes(x.status)
    );
    if (!hasOther) {
      const t = getTable(o.table_id);
      if (t) t.status = 'available';
    }
  }
  notifyStatusChange(o, 'completed');
  showToast('Pesanan selesai, meja telah dikosongkan', 'success');
  render();
}
