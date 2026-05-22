// ============================================================
// CASHIER VIEW — Create / Edit Order
// ============================================================
if (!State.cashierCart) State.cashierCart = [];

function renderCashierCreateOrder() {
  const cats = [
    { id: "all", label: "Semua" },
    { id: "coffee", label: "Kopi" },
    { id: "non-coffee", label: "Non-Kopi" },
    { id: "food", label: "Makanan" },
    { id: "snack", label: "Snack" },
  ];
  let items = DB.menuItems.filter((m) => m.is_available);
  if (State.cashierSelectedCategory && State.cashierSelectedCategory !== "all")
    items = items.filter((m) => m.category === State.cashierSelectedCategory);

  if (State.cashierSearchQuery) {
    const q = State.cashierSearchQuery.toLowerCase();
    items = items.filter((m) => m.name.toLowerCase().includes(q));
  }

  const total = State.cashierCart.reduce(
    (s, c) => s + c.unit_price * c.quantity,
    0,
  );

  return `
  <div class="animate-fade-up pb-36">
    <div class="flex items-center mb-4 gap-3">
      <button onclick="State.currentTab.cashier='orders';State.editingOrderId=null;State.cashierCart=[];render()" class="text-xl" style="color:var(--muted)"><i class="fas fa-arrow-left"></i></button>
      <h2 class="font-display text-xl font-bold">${State.editingOrderId ? "Edit Pesanan" : "Buat Pesanan Manual"}</h2>
    </div>
    
    <div class="mb-4 relative">
      <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2" style="color:var(--muted)"></i>
      <input type="text" placeholder="Cari menu..." class="input-field w-full text-sm" style="padding-left:36px" value="${State.cashierSearchQuery || ""}" oninput="filterCashierMenu(this.value)">
    </div>
    
    <div class="flex gap-2 mb-4 overflow-x-auto pb-2" style="-webkit-overflow-scrolling:touch; scrollbar-width: none;">
      ${cats.map((c) => `<div class="category-chip ${State.cashierSelectedCategory === c.id || (!State.cashierSelectedCategory && c.id === "all") ? "active" : ""}" onclick="State.cashierSelectedCategory='${c.id}';render()">${c.label}</div>`).join("")}
    </div>
    
    <div class="grid grid-cols-2 gap-3 mb-6">
      ${items
        .map(
          (m) => `
        <div class="card p-3 cursor-pointer transition-transform hover:scale-[1.02] cashier-menu-item" data-name="${m.name}" style="border: 1px solid var(--border)" onclick="addCashierCart('${m.id}')">
          <div class="font-semibold text-sm mb-1 truncate">${m.name}</div>
          <div class="font-bold text-sm" style="color:var(--accent)">${formatCurrency(m.price)}</div>
        </div>
      `,
        )
        .join("")}
    </div>
    
    ${
      State.cashierCart.length > 0
        ? `
    <div class="card mb-6">
      <h3 class="font-bold mb-3 text-sm">Pesanan (${State.cashierCart.reduce((a, b) => a + b.quantity, 0)} item)</h3>
      ${State.cashierCart
        .map(
          (c, i) => `
        <div class="flex justify-between items-center mb-2 text-sm border-b pb-2" style="border-color:var(--border)">
          <div class="flex-1 truncate pr-2">${c.menu_item.name}</div>
          <div class="flex items-center gap-2">
            <button onclick="updateCashierCartQty(${i}, -1)" class="w-6 h-6 rounded flex items-center justify-center font-bold" style="background:var(--bg2);color:var(--text)">-</button>
            <span class="w-4 text-center">${c.quantity}</span>
            <button onclick="updateCashierCartQty(${i}, 1)" class="w-6 h-6 rounded flex items-center justify-center font-bold" style="background:var(--bg2);color:var(--text)">+</button>
          </div>
        </div>
      `,
        )
        .join("")}
      <div class="flex justify-between font-bold mt-3 text-sm">
        <span>Total (inc. Pajak)</span>
        <span style="color:var(--accent)">${formatCurrency(total * 1.1)}</span>
      </div>
    </div>
    `
        : '<div class="text-center text-sm py-8" style="color:var(--muted)"><i class="fas fa-utensils text-2xl mb-2"></i><br>Pilih menu untuk menambahkan ke pesanan</div>'
    }
    
    <div class="fixed bottom-[70px] left-0 right-0 p-4 border-t" style="z-index:40; max-width:768px; margin:0 auto; background:var(--bg); border-color:var(--border)">
      <button onclick="submitCashierOrder()" class="btn-primary w-full flex justify-between items-center ${State.cashierCart.length === 0 ? "opacity-50 cursor-not-allowed" : ""}">
        <span><i class="fas fa-check mr-1"></i> Proses Pesanan</span>
        <span>${formatCurrency(total * 1.1)}</span>
      </button>
    </div>
  </div>
  `;
}

function addCashierCart(id) {
  const m = getMenuItem(id);
  if (!m) return;
  if (!State.cashierCart) State.cashierCart = [];
  const existing = State.cashierCart.find((c) => c.menu_item_id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    State.cashierCart.push({
      menu_item_id: id,
      quantity: 1,
      unit_price: m.price,
      notes: "",
      menu_item: m,
    });
  }
  showToast(m.name + " ditambahkan", "success");
  render();
}

function updateCashierCartQty(idx, d) {
  State.cashierCart[idx].quantity += d;
  if (State.cashierCart[idx].quantity <= 0) {
    State.cashierCart.splice(idx, 1);
  }
  render();
}
