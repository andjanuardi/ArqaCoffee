// ============================================================
// CASHIER VIEW — Orders & Payment
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
          ${o.promo_discount ? `<div class="text-[10px] mb-2 flex items-center gap-1" style="color:var(--success)"><i class="fas fa-tag"></i>Diskon promo: <b>-${formatCurrency(o.promo_discount)}</b></div>` : ''}
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
    ${o.promo_discount ? `<div class="flex justify-between text-xs mb-1" style="color:var(--success)"><span><i class="fas fa-tag mr-1"></i>Diskon Promo</span><span>-${formatCurrency(o.promo_discount)}</span></div>` : ''}
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
        ${o.promo_discount ? `<div class="text-[10px] mb-2 flex items-center gap-1" style="color:var(--success)"><i class="fas fa-tag"></i>Diskon promo: <b>-${formatCurrency(o.promo_discount)}</b></div>` : ''}
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
    ${(() => {
      const lowStock = DB.stockItems.filter(s => s.current_quantity <= s.min_quantity);
      if (!lowStock.length) return '';
      return `
    <div class="card mb-4" style="border-color:rgba(231,76,60,.3)">
      <h3 class="font-semibold text-sm mb-2" style="color:var(--danger)"><i class="fas fa-exclamation-triangle mr-1"></i>Peringatan Stok Rendah</h3>
      <div class="space-y-2">
        ${lowStock.map(s => `<div class="flex justify-between text-sm"><span>${s.name}</span><span style="color:var(--danger)">${s.current_quantity} / ${s.min_quantity} ${s.unit}</span></div>`).join('')}
      </div>
    </div>`})()}
    <div class="card mb-4">
      <h3 class="font-semibold text-sm mb-3">Pesanan Terkini</h3>
      <div class="space-y-2 max-h-64 overflow-y-auto">
        ${DB.orders.slice(0, 6).map(o => `
        <div class="flex justify-between items-center text-sm py-2 border-b" style="border-color:var(--border)">
          <div><span class="font-medium">#${o.id.slice(-5).toUpperCase()}</span><span class="badge ${getStatusBadge(o.status)} ml-2">${getStatusLabel(o.status)}</span>${o.promo_discount ? '<span class="text-[10px] ml-1" style="color:var(--success)"><i class="fas fa-tag"></i></span>' : ''}</div>
          <span>${formatCurrency(o.total_amount)}</span>
        </div>`).join('')}
      </div>
    </div>
    <div class="card"><canvas id="chart-cashier" height="200"></canvas></div>
  </div>`;
}

function renderCashierProfile() {
  return renderGenericProfile();
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
