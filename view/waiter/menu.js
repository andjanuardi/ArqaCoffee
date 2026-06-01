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

    <div class="flex gap-2 mb-5 overflow-x-auto pb-2" style="-webkit-overflow-scrolling:touch;scrollbar-width:none;">
      ${cats.map((c) => `<div class="category-chip ${State.selectedCategory === c.id ? "active" : ""}" onclick="State.selectedCategory='${c.id}';render()">${c.label}</div>`).join("")}
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      ${items
        .map(
          (m) => `
      <div class="menu-card" onclick="showMenuItem('${m.id}')">
        <div class="relative">
          <img src="${m.image}" alt="${m.name}" loading="lazy" onerror="this.src='https://picsum.photos/seed/${m.id}/400/300'">
        </div>
        <div class="p-3">
          <div class="font-semibold text-sm mb-1 truncate">${m.name}</div>
          <div class="font-bold text-sm" style="color:var(--accent)">${formatCurrency(m.price)}</div>
        </div>
      </div>`
        )
        .join("")}
    </div>
    ${items.length === 0 ? '<div class="text-center py-12"><i class="fas fa-mug-saucer text-4xl mb-3" style="color:var(--border)"></i><p style="color:var(--muted)">Menu tidak ditemukan</p></div>' : ""}
  </div>`;
}

function renderWaiterCart() {
  if (State.cart.length === 0) return renderWaiterEmptyCart();
  const total = State.cart.reduce((s, c) => s + c.unit_price * c.quantity, 0);
  const discount = 0;
  const afterDiscount = total - discount;
  const tax = Math.round(calcItemTax(State.cart));
  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Keranjang Pesanan</h2>
    <div class="space-y-3 mb-6">${State.cart.map((c, i) => renderWaiterCartItem(c, i)).join("")}</div>
    <div class="card mb-4">
      <div class="flex justify-between mb-2 text-sm"><span style="color:var(--muted)">Subtotal</span><span>${formatCurrency(total)}</span></div>
      <div class="flex justify-between mb-2 text-sm"><span style="color:var(--muted)">Pajak</span><span>${formatCurrency(tax)}</span></div>
      <div class="border-t pt-2 mt-2" style="border-color:var(--border)">
        <div class="flex justify-between font-bold"><span>Total</span><span style="color:var(--accent)">${formatCurrency(total + tax)}</span></div>
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

function renderWaiterCartItem(c, i) {
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
        </div>
        <div class="flex items-center gap-2 mt-1">
          <div class="qty-btn" style="width:26px;height:26px;font-size:12px" onclick="updateCartQty(${i},-1)">-</div>
          <span class="text-sm font-semibold w-6 text-center">${c.quantity}</span>
          <div class="qty-btn" style="width:26px;height:26px;font-size:12px" onclick="updateCartQty(${i},1)">+</div>
        </div>
      </div>
      <div class="text-right">
        <div class="font-bold text-sm" style="color:var(--accent)">${formatCurrency(c.unit_price * c.quantity)}</div>
        <button onclick="removeCartItem(${i})" class="text-xs mt-1" style="color:var(--danger);border:1px solid rgba(231,76,60,.2);border-radius:8px;padding:6px 8px;background:rgba(231,76,60,.06)"><i class="fas fa-trash"></i></button>
      </div>
    </div>
    <div class="border-t mt-3 pt-2" style="border-color:var(--border)"></div>
    <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Catatan</label>
    <input class="input-field text-sm" placeholder="Misal: kurang gula, extra shot..." value="${c.notes || ""}" onblur="updateCartNotes(${i}, this.value)">
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
  const t = getTable(tid);
  if (t) t.status = "occupied";
  closeModal();
  showToast(`Meja ${t?.number} dipilih`, "success");
  render();
}

function confirmWaiterPlaceOrder() {
  if (!State.selectedTable) {
    showToast("Silakan pilih meja terlebih dahulu", "warning");
    return;
  }
  const total = State.cart.reduce((s, c) => s + c.unit_price * c.quantity, 0);
  const discount = 0;
  const afterDiscount = total - discount;
  const tax = Math.round(calcItemTax(State.cart));
  const grandTotal = afterDiscount + tax;
  const itemsList = State.cart.map(c =>
    `${c.menu_item.name} x${c.quantity} = ${formatCurrency(c.unit_price * c.quantity)}`
  ).join('</div><div class="text-sm" style="color:var(--muted)">');

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
  const discount = 0;
  const afterDiscount = total - discount;
  const tax = Math.round(calcItemTax(State.cart));
  const grandTotal = afterDiscount + tax;

  const order = {
    id: genId(),
    user_id: State.currentUser.id,
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
    promo_id: null,
    promo_discount: 0,
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
  State.cart = [];
  State.activePromoId = null;
  notifyOrderPlaced(order, "Waiters: " + State.currentUser.name);
  showToast(
    `Pesanan #${order.id.slice(-5).toUpperCase()} berhasil dibuat!`,
    "success",
  );
  switchTab("orders");
}

function renderWaiterOrders() {
  let myOrders = DB.orders.filter((o) => o.user_id === State.currentUser.id);
  const startVal = State.waiterOrderDateStart || "";
  const endVal = State.waiterOrderDateEnd || "";
  if (startVal) {
    const s = new Date(startVal);
    s.setHours(0, 0, 0, 0);
    myOrders = myOrders.filter((o) => new Date(o.created_at) >= s);
  }
  if (endVal) {
    const e = new Date(endVal);
    e.setHours(23, 59, 59, 999);
    myOrders = myOrders.filter((o) => new Date(o.created_at) <= e);
  }
  myOrders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Pesanan Saya</h2>
    <div class="flex gap-2 mb-4">
      <div class="flex-1">
        <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Dari Tanggal</label>
        <input type="date" id="waiter-order-start" class="input-field w-full" value="${startVal}" onchange="State.waiterOrderDateStart=this.value;render()">
      </div>
      <div class="flex-1">
        <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Sampai Tanggal</label>
        <input type="date" id="waiter-order-end" class="input-field w-full" value="${endVal}" onchange="State.waiterOrderDateEnd=this.value;render()">
      </div>
      ${startVal || endVal ? '<button onclick="State.waiterOrderDateStart=\'\';State.waiterOrderDateEnd=\'\';render()" class="self-end btn-sm mb-0.5" style="background:rgba(231,76,60,.1);color:var(--danger);border:none;padding:8px 12px;border-radius:10px;height:40px"><i class="fas fa-times"></i></button>' : ""}
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
          ${o.status === "pending" ? `<div class="mt-3 flex justify-end"><button onclick="event.stopPropagation();cancelOrder('${o.id}')" class="text-xs font-bold px-3 py-1.5 rounded-lg" style="color:var(--danger);background:rgba(231,76,60,.1)">Batal Pesanan</button></div>` : ""}
        </div>`;
        })
        .join("")}
    </div>
  </div>`;
}

function renderWaiterProfile() {
  return renderGenericProfile();
}
