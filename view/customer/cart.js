// ============================================================
// CUSTOMER VIEW — Cart
// ============================================================
function showMenuItem(id) {
  const m = getMenuItem(id);
  if (!m) return;
  State._activeMenuItem = m;
  const activePromo = getActivePromo();
  const hasPromo = isItemEligible({ menu_item_id: m.id }, activePromo);
  const discPrice = calcItemDiscount({ unit_price: m.price }, activePromo);
  State._activeDiscPrice = discPrice;
  showModal(`
    <div>
      <div class="relative">
        <img src="${m.image}" alt="${m.name}" class="w-full h-48 object-cover rounded-xl mb-4" onerror="this.src='https://picsum.photos/seed/${m.id}/400/300'">
        ${hasPromo ? '<div class="absolute top-2 left-2 text-[10px] font-bold px-3 py-1 rounded-full" style="background:var(--success);color:#fff"><i class="fas fa-tag mr-1"></i>Diskon Promo</div>' : ""}
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
          <span id="modal-qty" class="font-bold text-lg w-8 text-center">1</span>
          <div class="qty-btn" onclick="updateModalQty(1)">+</div>
        </div>
      </div>
      <button onclick="addToCart('${m.id}')" class="btn-primary w-full flex items-center justify-center gap-2">
        <i class="fas fa-plus"></i> Tambah ke Keranjang — <span id="modal-total">${formatCurrency(discPrice)}</span>
      </button>
    </div>
  `);
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

function renderEmptyCart() {
  return `<div class="text-center py-16 animate-fade-up">
    <i class="fas fa-shopping-bag text-5xl mb-4" style="color:var(--border)"></i>
    <h3 class="semibold text-lg mb-2">Keranjang Kosong</h3>
    <p class="text-sm mb-6" style="color:var(--muted)">Tambahkan menu dari daftar menu</p>
    <button onclick="switchTab('menu')" class="btn-primary">Lihat Menu</button>
  </div>`;
}
function renderCartItem(c, i, eligible, discUnitPrice) {
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
function renderCartItems(cart, activePromo) {
  return `<div class="space-y-3 mb-6">${cart.map((c, i) => {
    const eligible = isItemEligible(c, activePromo);
    const discUnitPrice = calcItemDiscount(c, activePromo);
    return renderCartItem(c, i, eligible, discUnitPrice);
  }).join("")}</div>`;
}
function renderPromoBanner(activePromo) {
  return `<div class="flex items-center gap-2 mb-3 text-xs p-3 rounded-xl" style="background:rgba(39,174,96,.1);color:var(--success)">
    <i class="fas fa-tag"></i>
    <span class="flex-1">Promo <b>${activePromo.title}</b> aktif</span>
    <button onclick="State.activePromoId=null;render()" class="text-xs underline" style="color:var(--muted)">Batalkan</button>
  </div>`;
}
function renderOrderSummary(total, discount, afterDiscount) {
  const tax = Math.round(calcItemTax(State.cart));
  return `<div class="card mb-4">
    <div class="flex justify-between mb-2 text-sm"><span style="color:var(--muted)">Subtotal</span><span>${formatCurrency(total)}</span></div>
    ${discount > 0 ? `<div class="flex justify-between mb-2 text-sm"><span style="color:var(--success)"><i class="fas fa-tag mr-1"></i>Diskon</span><span style="color:var(--success)">-${formatCurrency(discount)}</span></div>` : ""}
    <div class="flex justify-between mb-2 text-sm"><span style="color:var(--muted)">Pajak</span><span>${formatCurrency(tax)}</span></div>
    <div class="border-t pt-2 mt-2" style="border-color:var(--border)">
      <div class="flex justify-between font-bold"><span>Total</span><span style="color:var(--accent)">${formatCurrency(afterDiscount + tax)}</span></div>
    </div>
  </div>`;
}
function renderOrderTypeSelector() {
  return `<div class="card mb-4">
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
    ${State.orderType === "dine-in" && State.selectedTable
      ? `<div class="flex items-center gap-2 mt-3 p-3 rounded-xl text-xs" style="background:rgba(39,174,96,.1);color:var(--success)">
      <i class="fas fa-check-circle"></i>
      <span>Meja <b>${getTable(State.selectedTable)?.number || "-"}</b> dipilih</span>
      <button onclick="State.selectedTable=null;render()" class="ml-auto text-xs underline" style="color:var(--muted)">Ganti</button>
    </div>`
      : ""}
    ${State.orderType === "dine-in" && !State.selectedTable
      ? `<div class="flex items-center gap-2 mt-3 p-3 rounded-xl text-xs cursor-pointer" onclick="startQRScan()" style="background:rgba(224,122,58,.1);color:var(--accent)">
      <i class="fas fa-qrcode"></i>
      <span>Belum pilih meja — <b>Tap untuk scan QR</b></span>
      <i class="fas fa-chevron-right ml-auto" style="font-size:10px"></i>
    </div>`
      : ""}
  </div>`;
}
function renderDeliveryAddress() {
  return `<div class="card mb-4">
    <div class="flex justify-between items-center mb-2">
      <label class="text-xs font-semibold block" style="color:var(--muted)">Alamat Pengiriman</label>
      <button onclick="pickDeliveryLocation()" class="text-xs font-bold flex items-center gap-1" style="color:var(--accent)"><i class="fas fa-map-marker-alt"></i> Pilih Titik Lokasi</button>
    </div>
    <input id="delivery-address" class="input-field text-sm mb-2" placeholder="Masukkan alamat lengkap..." value="${State.deliveryAddress || ""}" readonly style="cursor:not-allowed;opacity:.7">
    <label class="text-xs font-semibold mt-2 mb-1 block" style="color:var(--muted)">Detail Alamat</label>
    <input id="delivery-detail" class="input-field text-sm mb-2" placeholder="Nomor rumah, blok, patokan, dll..." value="${State.deliveryDetail || ""}" oninput="State.deliveryDetail = this.value">
    ${State.deliveryLocation ? `<div class="text-[10px] flex items-center gap-1" style="color:var(--success)"><i class="fas fa-check-circle"></i> Titik koordinat lokasi tersimpan</div>` : ""}
  </div>`;
}
function renderPaymentTiming() {
  return `<div class="card mb-4">
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
    <div class="grid grid-cols-${State.orderType === "delivery" ? "2" : "3"} gap-3">
      <div class="card text-center py-3 cursor-pointer text-sm" onclick="selectPayment('qris')" style="${selectedPayment === "qris" ? "border-color:var(--accent);background:rgba(224,122,58,.08)" : ""}"><i class="fas fa-qrcode mb-1" style="color:var(--accent)"></i><br>QRIS</div>
      <div class="card text-center py-3 cursor-pointer text-sm" onclick="selectPayment('bank_transfer')" style="${selectedPayment === "bank_transfer" ? "border-color:var(--accent);background:rgba(224,122,58,.08)" : ""}"><i class="fas fa-university mb-1" style="color:var(--accent)"></i><br>Transfer Bank</div>
      ${State.orderType !== "delivery" ? `<div class="card text-center py-3 cursor-pointer text-sm" onclick="selectPayment('cash')" style="${selectedPayment === "cash" ? "border-color:var(--accent);background:rgba(224,122,58,.08)" : ""}"><i class="fas fa-money-bill mb-1" style="color:var(--success)"></i><br>Tunai</div>` : ""}
    </div>`
      : `<div class="flex items-center gap-2 p-3 rounded-xl text-xs" style="background:rgba(243,156,18,.1);color:var(--warning)">
      <i class="fas fa-info-circle"></i>
      <span>${State.orderType === "delivery" ? "Pesanan akan diantar kurir. Siapkan uang tunai." : "Pesanan akan dibuat dengan status <b>Belum Bayar</b>. Silakan bayar di kasir."}</span>
    </div>`}
  </div>`;
}
function renderPlaceOrderButton() {
  return `<button onclick="confirmPlaceOrder()" class="btn-primary w-full text-center flex items-center justify-center gap-2">
    <i class="fas fa-check"></i> ${State.payTiming === "later" ? "Pesan Sekarang, Bayar Nanti" : "Bayar & Proses Pesanan"}
  </button>`;
}

function renderCustomerCart() {
  if (State.cart.length === 0) return renderEmptyCart();
  const activePromo = getActivePromo();
  const total = State.cart.reduce((s, c) => s + c.unit_price * c.quantity, 0);
  const discount = calcPromoDiscount();
  const afterDiscount = total - discount;
  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Keranjang Anda</h2>
    ${renderCartItems(State.cart, activePromo)}
    ${activePromo ? renderPromoBanner(activePromo) : ""}
    ${renderOrderSummary(total, discount, afterDiscount)}
    ${renderOrderTypeSelector()}
    ${State.orderType === "delivery" ? renderDeliveryAddress() : ""}
    ${renderPaymentTiming()}
    ${renderPlaceOrderButton()}
  </div>`;
}
