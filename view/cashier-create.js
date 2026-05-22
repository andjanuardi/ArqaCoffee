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

function submitCashierOrder() {
  if (!State.cashierCart || State.cashierCart.length === 0) return;

  let editingOrder = null;
  if (State.editingOrderId) {
    editingOrder = DB.orders.find((o) => o.id === State.editingOrderId);
  }

  showModal(`
    <div class="text-left">
      <h3 class="font-display text-lg font-bold mb-4 text-center">${editingOrder ? "Perbarui Pesanan" : "Selesaikan Pesanan"}</h3>
      <div class="mb-3">
        <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Nama Pelanggan (Opsional)</label>
        <input type="text" id="manual-customer-info" class="input-field w-full text-sm" placeholder="Contoh: Budi" value="${editingOrder ? editingOrder.customer_name || "" : ""}">
      </div>
      <div class="mb-3">
        <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Tipe Pesanan</label>
        <select id="manual-order-type" class="input-field w-full text-sm" onchange="document.getElementById('manual-table-container').style.display = this.value === 'dine-in' ? 'block' : 'none'">
          <option value="dine-in" ${editingOrder && editingOrder.order_type === "dine-in" ? "selected" : ""}>Makan di Tempat (Dine-in)</option>
          <option value="takeaway" ${editingOrder && editingOrder.order_type === "takeaway" ? "selected" : ""}>Bawa Pulang (Takeaway)</option>
        </select>
      </div>
      <div class="mb-4" id="manual-table-container" style="${editingOrder && editingOrder.order_type === "takeaway" ? "display:none;" : ""}">
        <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Pilih Meja</label>
        <select id="manual-table-id" class="input-field w-full text-sm">
          <option value="">-- Tanpa Meja / Pilih Nanti --</option>
          ${DB.tables.map((t) => {
            const isSelected = editingOrder && editingOrder.table_id === t.id;
            const isOccupied = t.status === "occupied" && !isSelected;
            return `<option value="${t.id}" ${isSelected ? "selected" : ""} ${isOccupied ? "disabled" : ""}>Meja ${t.number} (${t.capacity} orang) ${isOccupied ? "(Terisi)" : ""}</option>`;
          }).join("")}
        </select>
      </div>
      <div class="mb-6">
        <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Status Pembayaran</label>
        <select id="manual-payment-status" class="input-field w-full text-sm">
          <option value="paid" ${editingOrder && editingOrder.payment_status === "paid" ? "selected" : ""}>Sudah Lunas</option>
          <option value="unpaid" ${editingOrder && editingOrder.payment_status === "unpaid" ? "selected" : ""}>Belum Bayar</option>
        </select>
      </div>
      <div class="flex gap-3">
        <button onclick="closeModal();State.editingOrderId=null;" class="btn-secondary flex-1">Batal</button>
        <button onclick="finalizeManualOrder()" class="btn-primary flex-1">${editingOrder ? "Simpan Perubahan" : "Buat Pesanan"}</button>
      </div>
    </div>
  `);
}

function finalizeManualOrder() {
  const info =
    document.getElementById("manual-customer-info")?.value ||
    "Pelanggan Offline";
  const type = document.getElementById("manual-order-type")?.value || "dine-in";
  const payStatus =
    document.getElementById("manual-payment-status")?.value || "paid";
  const tableId = document.getElementById("manual-table-id")?.value || null;

  const total = State.cashierCart.reduce(
    (s, c) => s + c.unit_price * c.quantity,
    0,
  );
  const grandTotal = Math.round(total * 1.1);

  if (type === "dine-in" && tableId) {
    const t = getTable(tableId);
    if (t) t.status = "occupied";
  }

  if (State.editingOrderId) {
    const idx = DB.orders.findIndex((x) => x.id === State.editingOrderId);
    if (idx !== -1) {
      const o = DB.orders[idx];
      if (o.table_id && o.table_id !== tableId) {
        const oldT = getTable(o.table_id);
        const hasOtherOrders = DB.orders.some(
          (x) =>
            x.id !== o.id &&
            x.table_id === o.table_id &&
            x.status !== "completed" &&
            x.status !== "cancelled",
        );
        if (oldT && !hasOtherOrders) oldT.status = "available";
      }
      o.customer_name = info;
      o.table_id = type === "dine-in" ? tableId : null;
      o.order_type = type;
      o.total_amount = grandTotal;
      o.payment_method = payStatus === "paid" ? "cash" : "";
      o.payment_status = payStatus;
      o.items = State.cashierCart.map((c) => ({
        menu_item_id: c.menu_item_id,
        quantity: c.quantity,
        unit_price: c.unit_price,
        notes: c.notes || "",
        status: "pending",
      }));
      showToast("Pesanan berhasil diperbarui!", "success");
    }
    State.editingOrderId = null;
  } else {
    const order = {
      id: genId(),
      user_id: "walk-in",
      customer_name: info,
      table_id: type === "dine-in" ? tableId : null,
      order_type: type,
      status: "pending",
      total_amount: grandTotal,
      payment_method: payStatus === "paid" ? "cash" : "",
      payment_status: payStatus,
      created_at: new Date().toISOString(),
      items: State.cashierCart.map((c) => ({
        menu_item_id: c.menu_item_id,
        quantity: c.quantity,
        unit_price: c.unit_price,
        notes: c.notes || "",
        status: "pending",
      })),
    };
    DB.orders.unshift(order);
    notifyOrderPlaced(order, info);
    showToast("Pesanan manual berhasil dibuat!", "success");
  }

  State.cashierCart = [];
  State.currentTab.cashier = "orders";
  closeModal();
  render();
}

function filterCashierMenu(q) {
  State.cashierSearchQuery = q;
  const lowerQ = q.toLowerCase();
  document.querySelectorAll(".cashier-menu-item").forEach((el) => {
    const name = el.getAttribute("data-name").toLowerCase();
    if (name.includes(lowerQ)) el.style.display = "";
    else el.style.display = "none";
  });
}
