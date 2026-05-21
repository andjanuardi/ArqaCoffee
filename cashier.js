// ============================================================
// CASHIER VIEW
// ============================================================
function renderCashierView() {
  const tab = State.currentTab.cashier || "orders";
  if (tab === "orders") return renderCashierOrders();
  if (tab === "payment") return renderCashierPayment();
  if (tab === "report") return renderCashierReport();
  if (tab === "profile") return renderCashierProfile();
  if (tab === "create") return renderCashierCreateOrder();
  if (tab === "tables-mgmt") return renderAdminTablesMgmt();
  return renderCashierOrders();
}

function renderCashierOrders() {
  const pending = DB.orders.filter((o) =>
    ["pending", "cooking", "ready", "delivered"].includes(o.status)
  );
  const completed = DB.orders
    .filter((o) => o.status === "completed" || o.status === "rejected")
    .slice(0, 5);
  return `
  <div class="animate-fade-up">
    <div class="flex justify-between items-center mb-4">
      <h2 class="font-display text-xl font-bold">Pesanan Masuk</h2>
      <button onclick="State.currentTab.cashier='create';render()" class="btn-primary btn-sm"><i class="fas fa-plus mr-1"></i>Buat Pesanan</button>
    </div>
    <div class="grid grid-cols-3 gap-3 mb-5">
      <div class="stat-card text-center"><div class="text-2xl font-bold" style="color:var(--warning)">${pending.filter((o) => o.status === "pending").length}</div><div class="text-[10px]" style="color:var(--muted)">Menunggu</div></div>
      <div class="stat-card text-center"><div class="text-2xl font-bold" style="color:var(--accent)">${pending.filter((o) => o.status === "cooking").length}</div><div class="text-[10px]" style="color:var(--muted)">Dimasak</div></div>
      <div class="stat-card text-center"><div class="text-2xl font-bold" style="color:var(--success)">${pending.filter((o) => o.status === "ready").length}</div><div class="text-[10px]" style="color:var(--muted)">Siap Saji</div></div>
    </div>
    <h3 class="font-semibold text-sm mb-3">Aktif</h3>
    <div class="space-y-3 mb-6">
      ${pending.length === 0 ? '<p class="text-sm text-center py-8" style="color:var(--muted)">Tidak ada pesanan aktif</p>' : ""}
      ${pending
        .map((o) => {
          const t = o.table_id ? getTable(o.table_id) : null;
          return `
        <div class="order-card">
          <div class="flex justify-between items-start mb-2">
            <div>
              <span class="font-bold text-sm">#${o.id.slice(-5).toUpperCase()}</span>
              <span class="badge ${getStatusBadge(o.status)} ml-2">${getStatusLabel(o.status)}</span>
              <span class="badge ${o.payment_status === "paid" ? "badge-paid" : "badge-unpaid"} ml-1">${o.payment_status === "paid" ? "Lunas" : "Belum Bayar"}</span>
            </div>
            <span class="text-xs" style="color:var(--muted)">${formatTime(o.created_at)}</span>
          </div>
          <div class="text-xs mb-2" style="color:var(--muted)">
            <i class="fas ${o.order_type === "dine-in" ? "fa-chair" : "fa-motorcycle"} mr-1"></i>${getOrderTypeName(o.order_type)}${t ? " — Meja " + t.number : ""}${o.customer_name ? " — " + o.customer_name : ""}
          </div>
          <div class="text-xs mb-3">${o.items
            .map((i) => {
              const mi = getMenuItem(i.menu_item_id);
              return mi ? mi.name + " x" + i.quantity : "";
            })
            .join(", ")}</div>
          <div class="flex justify-between items-center">
            <span class="font-bold" style="color:var(--accent)">${formatCurrency(o.total_amount)}</span>
            <div class="flex gap-2">
              ${
                o.status === "pending" && !o.accepted
                  ? `
                <button onclick="cancelCashierOrder('${o.id}')" class="text-xs font-bold px-3 py-1.5 rounded" style="color:var(--danger); background:rgba(231,76,60,.1)">Batal</button>
                <button onclick="editCashierOrder('${o.id}')" class="text-xs font-bold px-3 py-1.5 rounded" style="color:var(--accent); background:rgba(224,122,58,.1)">Edit</button>
                <button onclick="acceptCashierOrder('${o.id}')" class="btn-primary btn-sm">Terima</button>
              `
                  : ""
              }
              ${o.status === "pending" && o.accepted ? `<span class="badge" style="background:rgba(46,204,113,.15);color:var(--success)">Diterima</span>` : ""}
              ${o.status === "ready" && o.payment_status === "unpaid" ? `<button onclick="processPayment('${o.id}')" class="btn-primary btn-sm">Bayar</button>` : ""}
              ${o.status === "ready" && o.payment_status === "paid" ? `<button onclick="updateOrderStatus('${o.id}','completed')" class="btn-primary btn-sm" style="background:linear-gradient(135deg,var(--success),#1e8449)">Selesai</button>` : ""}
              ${o.status === "delivered" && o.payment_status === "unpaid" ? `<button onclick="settleDelivery('${o.id}')" class="btn-primary btn-sm" style="background:linear-gradient(135deg,#3498db,#2980b9)"><i class="fas fa-hand-holding-dollar mr-1"></i>Terima Setoran</button>` : ""}
            </div>
          </div>
        </div>`;
        })
        .join("")}
    </div>
    <h3 class="font-semibold text-sm mb-3">Selesai Hari Ini</h3>
    <div class="space-y-2">
      ${completed
        .map(
          (o) => `
      <div class="card flex justify-between items-center py-3 cursor-pointer hover:scale-[1.02] transition-transform" onclick="showCashierOrderDetail('${o.id}')">
        <div class="text-sm">
          <span class="font-bold">#${o.id.slice(-5).toUpperCase()}</span> 
          <span style="color:var(--muted)">— ${getOrderTypeName(o.order_type)}</span>
          ${o.status === 'rejected' ? '<span class="badge badge-danger ml-2">Ditolak</span>' : ''}
        </div>
        <span class="font-semibold text-sm" style="color:var(--success)">${formatCurrency(o.total_amount)}</span>
      </div>`,
        )
        .join("")}
    </div>
  </div>`;
}

function showCashierOrderDetail(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  const t = o.table_id ? getTable(o.table_id) : null;
  showModal(`
<div>
  <div class="flex justify-between items-start mb-4">
    <h3 class="font-display text-lg font-bold">Pesanan #${o.id.slice(-5).toUpperCase()}</h3>
    <span class="badge ${o.status === 'rejected' ? 'badge-danger' : 'badge-completed'}">${o.status === 'rejected' ? 'Ditolak' : 'Selesai'}</span>
  </div>
  <div class="text-xs mb-4" style="color:var(--muted)">
    <i class="fas ${o.order_type === "dine-in" ? "fa-chair" : "fa-motorcycle"} mr-1"></i>${getOrderTypeName(o.order_type)}
    ${t ? " — Meja " + t.number : ""}
    ${o.delivery_address ? "<br>" + o.delivery_address : ""}
  </div>
  ${o.status === 'rejected' && o.reject_reason ? `<div class="card mb-4 text-sm" style="background:rgba(231,76,60,.08);border:1px solid rgba(231,76,60,.2)"><i class="fas fa-ban mr-1" style="color:var(--danger)"></i><strong>Alasan Penolakan:</strong> ${o.reject_reason}</div>` : ''}
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
    <div class="flex justify-between text-xs mt-1" style="color:var(--muted)"><span>Waktu Selesai</span><span>${formatTime(o.created_at)}</span></div>
  </div>
  <button onclick="closeModal()" class="btn-secondary w-full mt-4 text-center">Tutup</button>
</div>
`);
}

function renderCashierPayment() {
  const unpaid = DB.orders.filter(
    (o) =>
      o.payment_status === "unpaid" &&
      o.status !== "completed" &&
      o.status !== "cancelled" &&
      o.status !== "rejected",
  );
  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Pembayaran</h2>
    <div class="space-y-3">
      ${unpaid.length === 0 ? '<div class="text-center py-12"><i class="fas fa-check-circle text-4xl mb-3" style="color:var(--success)"></i><p style="color:var(--muted)">Semua pesanan sudah lunas</p></div>' : ""}
      ${unpaid
        .map(
          (o) => `
      <div class="card">
        <div class="flex justify-between items-start mb-3">
          <div><span class="font-bold">#${o.id.slice(-5).toUpperCase()}</span><span class="badge ${getStatusBadge(o.status)} ml-2">${getStatusLabel(o.status)}</span></div>
          <span class="font-bold text-lg" style="color:var(--accent)">${formatCurrency(o.total_amount)}</span>
        </div>
        <div class="text-xs mb-3" style="color:var(--muted)">${o.items
          .map((i) => {
            const mi = getMenuItem(i.menu_item_id);
            return mi ? mi.name + " x" + i.quantity : "";
          })
          .join(", ")}</div>
        <div class="flex gap-2">
          <button onclick="processPayment('${o.id}')" class="btn-primary btn-sm flex-1 text-center"><i class="fas fa-wallet mr-1"></i>Digital</button>
          <button onclick="processCashPayment('${o.id}')" class="btn-secondary btn-sm flex-1 text-center"><i class="fas fa-money-bill mr-1"></i>Tunai</button>
        </div>
      </div>`,
        )
        .join("")}
    </div>
  </div>`;
}

function acceptCashierOrder(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  o.accepted = true;
  addNotification({
    title: 'Pesanan Diterima Kasir',
    message: '#' + o.id.slice(-5).toUpperCase() + ' — diterima, menunggu dapur',
    type: 'order',
    icon: 'fa-check-circle',
    targetRoles: ['kitchen'],
    relatedOrderId: o.id
  });
  showToast(
    `Pesanan #${o.id.slice(-5).toUpperCase()} diterima — menunggu dapur`,
    "success",
  );
  render();
}

function processPayment(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  o.payment_status = "paid";
  o.payment_method = "digital";
  notifyPayment(o, 'Digital');
  showToast(
    `Pembayaran #${o.id.slice(-5).toUpperCase()} berhasil (Digital)`,
    "success",
  );
  render();
}
function processCashPayment(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  o.payment_status = "paid";
  o.payment_method = "cash";
  notifyPayment(o, 'Tunai');
  showToast(
    `Pembayaran #${o.id.slice(-5).toUpperCase()} berhasil (Tunai)`,
    "success",
  );
  render();
}

function settleDelivery(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  o.status = "completed";
  o.payment_status = "paid";
  o.payment_method = "cod";
  notifyPayment(o, 'COD (Setoran Kurir)');
  showToast(
    `Setoran diterima — Pesanan #${o.id.slice(-5).toUpperCase()} selesai`,
    "success",
  );
  render();
}

function renderCashierReport() {
  const today = DB.dailySales[DB.dailySales.length - 1];
  const completedToday = DB.orders.filter((o) => o.status === "completed");
  const todayRev =
    completedToday.reduce((s, o) => s + o.total_amount, 0) + today.revenue;
  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Laporan Harian</h2>
    <div class="grid grid-cols-2 gap-3 mb-5">
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Pendapatan Hari Ini</div><div class="text-xl font-bold mt-1" style="color:var(--accent)">${formatCurrency(todayRev)}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Total Pesanan</div><div class="text-xl font-bold mt-1">${today.orders + completedToday.length}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Lunas</div><div class="text-xl font-bold mt-1" style="color:var(--success)">${DB.orders.filter((o) => o.payment_status === "paid").length}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Belum Bayar</div><div class="text-xl font-bold mt-1" style="color:var(--danger)">${DB.orders.filter((o) => o.payment_status === "unpaid").length}</div></div>
    </div>
    <div class="card"><canvas id="chart-cashier" height="200"></canvas></div>
  </div>`;
}

function renderCashierProfile() {
  return renderGenericProfile();
}

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
      // Jika meja diubah, kosongkan meja lama jika tidak ada order lain
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

function cancelCashierOrder(id) {
  showModal(`
    <div class="text-center">
      <div class="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl" style="background:rgba(231,76,60,.1);color:var(--danger)">
        <i class="fas fa-exclamation-triangle"></i>
      </div>
      <h3 class="font-display text-lg font-bold mb-2">Batalkan Pesanan?</h3>
      <p class="text-sm mb-4" style="color:var(--muted)">Apakah Anda yakin ingin membatalkan pesanan ini secara permanen?</p>
      
      <div class="flex gap-3">
        <button onclick="closeModal()" class="btn-secondary flex-1">Tidak</button>
        <button onclick="confirmCancelCashierOrder('${id}')" class="btn-primary flex-1" style="background:var(--danger);border-color:var(--danger);">Ya, Batalkan</button>
      </div>
    </div>
  `);
}

function confirmCancelCashierOrder(id) {
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

  DB.orders.splice(idx, 1);
  showToast("Pesanan berhasil dibatalkan", "success");
  closeModal();
  render();
}

function editCashierOrder(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  if (o.status !== "pending") {
    showToast("Pesanan yang sudah diproses tidak bisa diedit", "warning");
    return;
  }

  State.cashierCart = o.items.map((i) => {
    const m = getMenuItem(i.menu_item_id);
    return {
      menu_item_id: i.menu_item_id,
      quantity: i.quantity,
      unit_price: i.unit_price,
      notes: i.notes || "",
      menu_item: m,
    };
  });

  State.editingOrderId = id;
  State.currentTab.cashier = "create";
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
