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
        <input type="text" placeholder="Cari menu..." class="input-field pl-9 text-sm" value="${State.searchQuery}" oninput="State.searchQuery=this.value;render()">
      </div>
    </div>
    ${
      DB.promos && DB.promos.filter((p) => p.is_active).length > 0
        ? `
    <div class="flex gap-3 mb-5 overflow-x-auto pb-2" style="-webkit-overflow-scrolling:touch;scrollbar-width:none">
      ${DB.promos
        .filter((p) => p.is_active)
        .map(
          (p) => `
      <div class="flex-shrink-0 rounded-2xl p-4 relative overflow-hidden cursor-pointer" onclick="showPromoDetail('${p.id}')" style="background:linear-gradient(135deg,${p.color},${p.color}dd);min-width:260px;color:#fff">
        <div style="position:absolute;right:-10px;top:-10px;font-size:80px;opacity:.12"><i class="fas ${p.icon}"></i></div>
        <div class="text-xs font-semibold mb-1 uppercase" style="opacity:.85;letter-spacing:1px">Promo Spesial</div>
        <div class="font-display text-lg font-black mb-1">${p.title}</div>
        <div class="text-xs mb-3" style="opacity:.8">${p.desc}</div>
        <div class="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-lg" style="background:rgba(255,255,255,.25)">Klaim <i class="fas fa-arrow-right" style="font-size:10px"></i></div>
      </div>`,
        )
        .join("")}
    </div>`
        : ""
    }
    <div class="flex gap-2 mb-5 overflow-x-auto pb-2" style="-webkit-overflow-scrolling:touch;     scrollbar-width: none;">
      ${cats.map((c) => `<div class="category-chip ${State.selectedCategory === c.id ? "active" : ""}" onclick="State.selectedCategory='${c.id}';render()">${c.label}</div>`).join("")}
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      ${items
        .map(
          (m) => `
      <div class="menu-card" onclick="showMenuItem('${m.id}')">
        <img src="${m.image}" alt="${m.name}" loading="lazy" onerror="this.src='https://picsum.photos/seed/${m.id}/400/300'">
        <div class="p-3">
          <div class="font-semibold text-sm mb-1 truncate">${m.name}</div>
          <div class="font-bold text-sm" style="color:var(--accent)">${formatCurrency(m.price)}</div>
        </div>
      </div>`,
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

function showPromoDetail(promoId) {
  const p = DB.promos.find((x) => x.id === promoId);
  if (!p) return;
  showModal(`
    <div class="text-center">
      <div class="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl" style="background:${p.color};color:#fff"><i class="fas ${p.icon}"></i></div>
      <h3 class="font-display text-xl font-bold mb-2">${p.title}</h3>
      <p class="text-sm mb-4" style="color:var(--muted)">${p.desc}</p>
      <div class="text-left mb-4 p-3 rounded-xl" style="background:var(--bg2)">
        <div class="text-xs font-semibold mb-2" style="color:var(--muted)">Syarat & Ketentuan:</div>
        <ul class="text-xs space-y-1" style="color:var(--muted)">
          ${p.terms.map((t) => `<li class="flex items-start gap-2"><i class="fas fa-check-circle mt-0.5" style="color:var(--success);font-size:10px"></i><span>${t}</span></li>`).join("")}
        </ul>
      </div>
      <button onclick="closeModal(); showToast('Promo akan otomatis diterapkan saat checkout','success')" class="btn-primary w-full text-center">Gunakan Promo</button>
    </div>
  `);
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
  showToast("Mode Pesan Antar aktif", "info");
  render();
}

function showMenuItem(id) {
  const m = getMenuItem(id);
  if (!m) return;
  let qty = 1;
  showModal(`
    <div>
      <img src="${m.image}" alt="${m.name}" class="w-full h-48 object-cover rounded-xl mb-4" onerror="this.src='https://picsum.photos/seed/${m.id}/400/300'">
      <div class="flex justify-between items-start mb-2">
        <h3 class="font-display text-xl font-bold">${m.name}</h3>
        <span class="font-bold text-lg" style="color:var(--accent)">${formatCurrency(m.price)}</span>
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
          (c, i) => `
      <div class="card flex items-center gap-4">
        <img src="${c.menu_item.image}" class="w-16 h-16 rounded-xl object-cover" onerror="this.src='https://picsum.photos/seed/${c.menu_item.id}/100/100'">
        <div class="flex-1 min-w-0">
          <div class="font-semibold text-sm truncate">${c.menu_item.name}</div>
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
      </div>`,
        )
        .join("")}
    </div>
    <div class="card mb-4">
      <div class="flex justify-between mb-2 text-sm"><span style="color:var(--muted)">Subtotal</span><span>${formatCurrency(total)}</span></div>
      <div class="flex justify-between mb-2 text-sm"><span style="color:var(--muted)">Pajak (10%)</span><span>${formatCurrency(Math.round(total * 0.1))}</span></div>
      <div class="border-t pt-2 mt-2" style="border-color:var(--border)">
        <div class="flex justify-between font-bold"><span>Total</span><span style="color:var(--accent)">${formatCurrency(Math.round(total * 1.1))}</span></div>
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
      <label class="text-xs font-semibold mb-2 block" style="color:var(--muted)">Alamat Pengiriman</label>
      <input id="delivery-address" class="input-field text-sm" placeholder="Masukkan alamat lengkap..." value="">
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
      <div class="grid grid-cols-2 gap-3">
        <div class="card text-center py-3 cursor-pointer text-sm" onclick="selectPayment('digital')" style="${selectedPayment === "digital" ? "border-color:var(--accent);background:rgba(224,122,58,.08)" : ""}"><i class="fas fa-wallet mb-1" style="color:var(--accent)"></i><br>Digital</div>
        <div class="card text-center py-3 cursor-pointer text-sm" onclick="selectPayment('cash')" style="${selectedPayment === "cash" ? "border-color:var(--accent);background:rgba(224,122,58,.08)" : ""}"><i class="fas fa-money-bill mb-1" style="color:var(--success)"></i><br>Tunai / COD</div>
      </div>`
          : `
      <div class="flex items-center gap-2 p-3 rounded-xl text-xs" style="background:rgba(243,156,18,.1);color:var(--warning)">
        <i class="fas fa-info-circle"></i>
        <span>Pesanan akan dibuat dengan status <b>Belum Bayar</b>. Silakan bayar di kasir.</span>
      </div>`
      }
    </div>
    <button onclick="placeOrder()" class="btn-primary w-full text-center flex items-center justify-center gap-2">
      <i class="fas fa-check"></i> ${State.payTiming === "later" ? "Pesan Sekarang, Bayar Nanti" : "Bayar & Proses Pesanan"}
    </button>
  </div>`;
}

let selectedPayment = "digital";
if (!State.payTiming) State.payTiming = "now";
function selectPayment(p) {
  selectedPayment = p;
  render();
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
  const total = State.cart.reduce((s, c) => s + c.unit_price * c.quantity, 0);
  const grandTotal = Math.round(total * 1.1);
  const order = {
    id: genId(),
    user_id: State.currentUser.id,
    table_id: State.selectedTable,
    order_type: State.orderType,
    status: "pending",
    total_amount: grandTotal,
    payment_method: State.payTiming === "later" ? "" : selectedPayment,
    payment_status:
      State.payTiming === "later"
        ? "unpaid"
        : selectedPayment === "digital"
          ? "paid"
          : "unpaid",
    delivery_address:
      State.orderType === "delivery"
        ? document.getElementById("delivery-address")?.value || ""
        : "",
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
          ${o.order_type === "delivery" && o.status === "delivering" ? `<div class="mt-3"><button onclick="event.stopPropagation();showTrackingMap('${o.id}')" class="btn-primary btn-sm"><i class="fas fa-map-marker-alt mr-1"></i>Lacak Kurir</button></div>` : ""}
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
        <div class="flex justify-between text-xs mt-1" style="color:var(--muted)"><span>Pembayaran</span><span>${o.payment_method === "digital" ? "Digital" : "Tunai/COD"}</span></div>
        <div class="flex justify-between text-xs mt-1" style="color:var(--muted)"><span>Status Bayar</span><span class="badge ${o.payment_status === "paid" ? "badge-paid" : "badge-unpaid"}">${o.payment_status === "paid" ? "Lunas" : "Belum Bayar"}</span></div>
      </div>
      ${o.payment_status === "unpaid" && o.status !== "completed" ? `<button onclick="payOrder('${o.id}')" class="btn-primary w-full mt-4 text-center">Bayar Sekarang</button>` : ""}
    </div>
  `);
}

function payOrder(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  o.payment_status = "paid";
  o.payment_method = "digital";
  closeModal();
  showToast("Pembayaran berhasil!", "success");
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
