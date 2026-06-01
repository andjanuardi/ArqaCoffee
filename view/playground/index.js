// ============================================================
// PLAYGROUND VIEW
// ============================================================
const PG_CHILD_PRICE = 20000;
const PG_COMPANION_PRICE = 10000;
const PG_SOCKS_PRICE = 10000;

function renderPlaygroundView() {
  const tab = State.currentTab.playground || "tickets";
  if (tab === "tickets") return renderPlaygroundTickets();
  if (tab === "create") return renderPlaygroundCreate();
  if (tab === "stock") return renderPlaygroundStock();
  if (tab === "report") return renderPlaygroundFinance();
  if (tab === "profile") return renderPlaygroundProfile();
  return renderPlaygroundTickets();
}

function calcPlaygroundTotal(children, companions, hours, childSocks, items) {
  const subtotal =
    (children.length * PG_CHILD_PRICE + companions.length * PG_COMPANION_PRICE) *
    Math.max(1, hours);
  const socks = childSocks.filter(s => s).length * PG_SOCKS_PRICE;
  const itemsTotal = items.reduce((s, i) => s + i.unit_price * i.quantity, 0);
  return { subtotal, socks, itemsTotal, total: subtotal + socks + itemsTotal };
}

function formatRemaining(ms) {
  if (ms <= 0) return "Habis";
  const min = Math.floor(ms / 60000);
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h > 0) return h + "j " + m + "m";
  return m + "m";
}

// ============================================================
// TICKETS LIST
// ============================================================
function renderPlaygroundTickets() {
  const tickets = (DB.playgroundTickets || [])
    .filter((t) => t.status === "active")
    .sort((a, b) => new Date(a.end_time) - new Date(b.end_time));
  const completed = (DB.playgroundTickets || [])
    .filter((t) => t.status !== "active")
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const now = Date.now();

  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Tiket Aktif</h2>
    ${tickets.length === 0 ? '<div class="text-center py-12"><i class="fas fa-ticket text-4xl mb-3" style="color:var(--border)"></i><p style="color:var(--muted)">Tidak ada tiket aktif</p></div>' : ""}
    <div class="space-y-3 mb-8">
      ${tickets
        .map((t) => {
          const remaining = new Date(t.end_time) - now;
          const isUrgent = remaining > 0 && remaining < 600000;
          const isExpired = remaining <= 0;
          return `
        <div class="card ${isUrgent ? "animate-breathe" : ""}" style="${isExpired ? "border-color:var(--danger)" : isUrgent ? "border-color:var(--warning)" : ""}">
          <div class="flex justify-between items-start mb-2">
            <div>
              <span class="font-bold text-sm">${t.customer_name}</span>
              <span class="badge ${isExpired ? "badge-pending" : "badge-cooking"} ml-2">${isExpired ? "Over Time" : "Aktif"}</span>
            </div>
            <span class="font-bold text-sm" style="color:var(--accent)">${formatCurrency(t.total_amount)}</span>
          </div>
          <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs mb-2" style="color:var(--muted)">
            <span><i class="fas fa-child mr-1"></i>${t.children.map((c) => c.name).join(", ")}</span>
            ${t.companions && t.companions.length > 0 ? `<span><i class="fas fa-user mr-1"></i>${t.companions.map(c => c.name).join(', ')}</span>` : t.companion_count > 0 ? `<span><i class="fas fa-user mr-1"></i>${t.companion_count} pendamping</span>` : ''}
            <span><i class="fas fa-clock mr-1"></i>${t.hours} jam</span>
            <span><i class="fas fa-hourglass-half mr-1"></i><span style="color:${isExpired ? "var(--danger)" : isUrgent ? "var(--warning)" : "var(--success)"}">${isExpired ? "Waktu habis" : "Sisa " + formatRemaining(remaining)}</span></span>
          </div>
          ${t.items.length > 0 ? `<div class="text-xs mb-2" style="color:var(--muted)"><i class="fas fa-utensils mr-1"></i>${t.items.map((i) => i.name + " x" + i.quantity).join(", ")}</div>` : ""}
          <div class="flex gap-2 mt-2">
            <button onclick="completePlaygroundTicket('${t.id}')" class="btn-primary btn-sm flex-1 text-center"><i class="fas fa-check mr-1"></i>Selesaikan</button>
            <button onclick="cancelPlaygroundTicket('${t.id}')" class="btn-sm flex-1 text-center" style="background:rgba(231,76,60,.1);color:var(--danger);border:none;border-radius:10px;padding:8px"><i class="fas fa-times mr-1"></i>Batalkan</button>
          </div>
        </div>`;
        })
        .join("")}
    </div>

    ${
      completed.length > 0
        ? `
    <h2 class="font-display text-lg font-bold mb-3" style="color:var(--muted)">Riwayat</h2>
    <div class="space-y-2">
      ${completed
        .slice(0, 10)
        .map(
          (t) => `
        <div class="card flex items-center justify-between" style="opacity:.7">
          <div>
            <span class="font-semibold text-sm">${t.customer_name}</span>
            <span class="badge ${t.status === "completed" ? "badge-completed" : "badge-pending"} ml-2">${t.status === "completed" ? "Selesai" : "Dibatalkan"}</span>
            <div class="text-xs mt-1" style="color:var(--muted)">${t.children.map((c) => c.name).join(", ")} — ${t.hours} jam</div>
          </div>
          <div class="text-right">
            <div class="font-bold text-sm" style="color:var(--accent)">${formatCurrency(t.total_amount)}</div>
            <div class="text-xs" style="color:var(--muted)">${t.payment_status === "paid" ? "Lunas" : "Belum"}</div>
          </div>
        </div>`,
        )
        .join("")}
    </div>`
        : ""
    }
  </div>`;
}

// ============================================================
// CREATE TICKET
// ============================================================
let pgChildCount = 1;
let pgCompanionCount = 1;

function renderPlaygroundCreate() {
  pgChildCount = State._pgChildCount || 1;
  pgCompanionCount = State._pgCompanionCount || 1;
  const hours = State._pgHours || 1;
  const snackItems = DB.menuItems.filter(
    (m) => m.is_available && (m.category === "snack" || m.category === "food"),
  );
  const selectedSnacks = State._pgSelectedSnacks || [];

  const children = [];
  const childSocks = [];
  for (let i = 0; i < pgChildCount; i++) {
    const val = State["_pgChildName" + i] || "";
    children.push({ name: val || "Anak " + (i + 1) });
    childSocks.push(State["_pgChildHasSocks" + i] !== false);
  }
  const companions = [];
  for (let i = 0; i < pgCompanionCount; i++) {
    const val = State["_pgCompanionName" + i] || "";
    companions.push({ name: val || "Pendamping " + (i + 1) });
  }
  const calc = calcPlaygroundTotal(
    children,
    companions,
    hours,
    childSocks,
    selectedSnacks,
  );

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
          <label class="text-xs font-semibold" style="color:var(--muted)">Nama Anak-anak</label>
          <div class="text-xs mt-0.5" style="color:var(--accent)">${formatCurrency(PG_CHILD_PRICE)}/anak/jam</div>
        </div>
        <div class="flex gap-1">
          <button onclick="pgAddChild()" class="btn-sm" style="background:rgba(39,174,96,.15);color:var(--success);border:none;padding:4px 10px;border-radius:6px;cursor:pointer;font-size:11px"><i class="fas fa-plus"></i> Tambah</button>
          ${pgChildCount > 1 ? `<button onclick="pgRemoveChild()" class="btn-sm" style="background:rgba(231,76,60,.15);color:var(--danger);border:none;padding:4px 10px;border-radius:6px;cursor:pointer;font-size:11px"><i class="fas fa-minus"></i></button>` : ""}
        </div>
      </div>
      ${Array.from(
        { length: pgChildCount },
        (_, i) => `
        <div class="flex items-center gap-2 mb-2">
          <i class="fas fa-child" style="color:var(--accent);font-size:14px"></i>
          <input class="input-field text-sm flex-1" placeholder="Nama anak ${i + 1}" value="${State["_pgChildName" + i] || ""}" oninput="State['_pgChildName${i}']=this.value">
          <div class="flex items-center gap-1 cursor-pointer px-2 py-1 rounded text-xs whitespace-nowrap" onclick="State['_pgChildHasSocks${i}']=!(State['_pgChildHasSocks${i}']!==false);render()" style="background:${(State["_pgChildHasSocks" + i] !== false) ? "rgba(39,174,96,.15)" : "transparent"};border:1px solid ${(State["_pgChildHasSocks" + i] !== false) ? "var(--success)" : "var(--border)"}">
            <div class="w-4 h-4 rounded flex items-center justify-center text-xs font-bold" style="background:${(State["_pgChildHasSocks" + i] !== false) ? "var(--success)" : "var(--bg2)"};color:${(State["_pgChildHasSocks" + i] !== false) ? "#fff" : "var(--muted)"}">
              ${(State["_pgChildHasSocks" + i] !== false) ? '<i class="fas fa-check fa-xs"></i>' : ""}
            </div>
            <span style="color:${(State["_pgChildHasSocks" + i] !== false) ? "var(--success)" : "var(--muted)"}">Kaos</span>
          </div>
        </div>`,
      ).join("")}
    </div>

    <div class="card mb-4">
      <div class="flex justify-between items-center mb-3">
        <div>
          <label class="text-xs font-semibold" style="color:var(--muted)">Pendamping</label>
          <div class="text-xs mt-0.5" style="color:var(--accent)">${formatCurrency(PG_COMPANION_PRICE)}/orang/jam</div>
        </div>
        <div class="flex gap-1">
          <button onclick="pgAddCompanion()" class="btn-sm" style="background:rgba(39,174,96,.15);color:var(--success);border:none;padding:4px 10px;border-radius:6px;cursor:pointer;font-size:11px"><i class="fas fa-plus"></i> Tambah</button>
          ${pgCompanionCount > 1 ? `<button onclick="pgRemoveCompanion()" class="btn-sm" style="background:rgba(231,76,60,.15);color:var(--danger);border:none;padding:4px 10px;border-radius:6px;cursor:pointer;font-size:11px"><i class="fas fa-minus"></i></button>` : ""}
        </div>
      </div>
      ${Array.from(
        { length: pgCompanionCount },
        (_, i) => `
        <div class="flex items-center gap-2 mb-2">
          <i class="fas fa-user" style="color:var(--accent);font-size:14px"></i>
          <input class="input-field text-sm flex-1" placeholder="Nama pendamping ${i + 1}" value="${State["_pgCompanionName" + i] || ""}" oninput="State['_pgCompanionName${i}']=this.value">
        </div>`,
      ).join("")}
    </div>

    <div class="card mb-4">
      <label class="text-xs font-semibold mb-3 block" style="color:var(--muted)">Durasi</label>
      <div class="flex items-center gap-3">
        <button onclick="pgAdjustHours(-1)" class="qty-btn">-</button>
        <span class="font-bold text-lg w-8 text-center">${hours}</span>
        <button onclick="pgAdjustHours(1)" class="qty-btn">+</button>
        <span class="text-sm" style="color:var(--muted)">jam (min 1)</span>
      </div>
    </div>

    <div class="card mb-4">
      <label class="text-xs font-semibold mb-3 block" style="color:var(--muted)">Snack Tambahan</label>
      <div class="flex gap-2 mb-3 overflow-x-auto pb-2" style="-webkit-overflow-scrolling:touch;scrollbar-width:none;">
        ${snackItems
          .map((m) => {
            const inCart = selectedSnacks.find((s) => s.menu_item_id === m.id);
            return `
          <div class="card text-center py-2 px-3 cursor-pointer text-xs ${inCart ? "ring-2" : ""}" onclick="pgToggleSnack('${m.id}')" style="${inCart ? "--tw-ring-color:var(--success);border-color:var(--success)" : "border-color:var(--border)"};min-width:80px">
            <div class="font-semibold truncate">${m.name}</div>
            <div style="color:var(--accent)">${formatCurrency(m.price)}</div>
            ${inCart ? '<div style="color:var(--success)">x' + inCart.quantity + "</div>" : ""}
          </div>`;
          })
          .join("")}
      </div>
    </div>

    <div class="card mb-4">
      <div class="flex justify-between text-sm mb-1"><span style="color:var(--muted)">Subtotal tiket</span><span>${formatCurrency(calc.subtotal)}</span></div>
      ${calc.socks > 0 ? `<div class="flex justify-between text-sm mb-1"><span style="color:var(--muted)">Kaos kaki</span><span>${formatCurrency(calc.socks)}</span></div>` : ""}
      ${calc.itemsTotal > 0 ? `<div class="flex justify-between text-sm mb-1"><span style="color:var(--muted)">Snack</span><span>${formatCurrency(calc.itemsTotal)}</span></div>` : ""}
      <div class="border-t pt-2 mt-2" style="border-color:var(--border)">
        <div class="flex justify-between font-bold"><span>Total</span><span style="color:var(--accent)">${formatCurrency(calc.total)}</span></div>
      </div>
    </div>

    <div class="card mb-4">
      <label class="text-xs font-semibold mb-3 block" style="color:var(--muted)">Pembayaran</label>
      <div class="grid grid-cols-3 gap-3">
        <div class="card text-center py-3 cursor-pointer text-sm" onclick="pgSelectPayment('qris')" style="${State._pgPayment === "qris" || !State._pgPayment ? "border-color:var(--accent);background:rgba(224,122,58,.08)" : ""}"><i class="fas fa-qrcode mb-1" style="color:var(--accent)"></i><br>QRIS</div>
        <div class="card text-center py-3 cursor-pointer text-sm" onclick="pgSelectPayment('cash')" style="${State._pgPayment === "cash" ? "border-color:var(--accent);background:rgba(224,122,58,.08)" : ""}"><i class="fas fa-money-bill mb-1" style="color:var(--success)"></i><br>Tunai</div>
        <div class="card text-center py-3 cursor-pointer text-sm" onclick="pgSelectPayment('unpaid')" style="${State._pgPayment === "unpaid" ? "border-color:var(--accent);background:rgba(224,122,58,.08)" : ""}"><i class="fas fa-clock mb-1" style="color:var(--warning)"></i><br>Bayar Nanti</div>
      </div>
    </div>

    <button onclick="createPlaygroundTicket()" class="btn-primary w-full text-center flex items-center justify-center gap-2">
      <i class="fas fa-ticket"></i> Buat Tiket — ${formatCurrency(calc.total)}
    </button>
  </div>`;
}

function pgAddChild() {
  State._pgChildCount = (State._pgChildCount || 1) + 1;
  render();
}

function pgRemoveChild() {
  const c = State._pgChildCount || 1;
  if (c > 1) {
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
  const c = State._pgCompanionCount || 0;
  if (c > 1) {
    delete State["_pgCompanionName" + (c - 1)];
    State._pgCompanionCount = c - 1;
  }
  render();
}

function pgAdjustHours(d) {
  State._pgHours = Math.max(1, (State._pgHours || 1) + d);
  render();
}

function pgToggleSnack(id) {
  if (!State._pgSelectedSnacks) State._pgSelectedSnacks = [];
  const idx = State._pgSelectedSnacks.findIndex((s) => s.menu_item_id === id);
  if (idx >= 0) {
    const s = State._pgSelectedSnacks[idx];
    if (s.quantity >= 2) {
      s.quantity--;
    } else {
      State._pgSelectedSnacks.splice(idx, 1);
    }
  } else {
    const m = getMenuItem(id);
    if (m)
      State._pgSelectedSnacks.push({
        menu_item_id: id,
        name: m.name,
        quantity: 1,
        unit_price: m.price,
      });
  }
  render();
}

function pgSelectPayment(val) {
  State._pgPayment = val;
  render();
}

function createPlaygroundTicket() {
  const name = State._pgCustomerName;
  if (!name || !name.trim()) {
    showToast("Masukkan nama pelanggan", "warning");
    return;
  }
  const childCount = State._pgChildCount || 1;
  const children = [];
  for (let i = 0; i < childCount; i++) {
    const n = State["_pgChildName" + i];
    if (!n || !n.trim()) {
      showToast("Isi nama anak ke-" + (i + 1), "warning");
      return;
    }
    children.push({ name: n.trim() });
  }
  const companionCount = State._pgCompanionCount || 1;
  const companions = [];
  for (let i = 0; i < companionCount; i++) {
    const n = State["_pgCompanionName" + i];
    if (!n || !n.trim()) {
      showToast("Isi nama pendamping ke-" + (i + 1), "warning");
      return;
    }
    companions.push({ name: n.trim() });
  }
  const hours = State._pgHours || 1;
  const childSocks = [];
  for (let i = 0; i < children.length; i++) {
    childSocks.push(State["_pgChildHasSocks" + i] !== false);
  }
  const selectedSnacks = State._pgSelectedSnacks || [];
  const calc = calcPlaygroundTotal(
    children,
    companions,
    hours,
    childSocks,
    selectedSnacks,
  );
  const payment = State._pgPayment || "qris";

  const now = new Date();
  const ticket = {
    id: "pg" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    user_id: State.currentUser.id,
    customer_name: name.trim(),
    children,
    companions,
    companion_count: companions.length,
    socks_per_child: childSocks,
    socks_total: calc.socks,
    items: selectedSnacks.map((s) => ({
      menu_item_id: s.menu_item_id,
      name: s.name,
      quantity: s.quantity,
      unit_price: s.unit_price,
    })),
    hours,
    start_time: now.toISOString(),
    end_time: new Date(now.getTime() + hours * 3600000).toISOString(),
    subtotal: calc.subtotal,
    items_total: calc.itemsTotal,
    total_amount: calc.total,
    payment_status: payment === "unpaid" ? "unpaid" : "paid",
    payment_method: payment === "unpaid" ? "" : payment,
    status: "active",
    created_at: now.toISOString(),
  };
  if (!DB.playgroundTickets) DB.playgroundTickets = [];
  DB.playgroundTickets.unshift(ticket);

  State._pgCustomerName = "";
  State._pgChildCount = 1;
  State._pgCompanionCount = 1;
  State._pgHours = 1;
  State._pgSelectedSnacks = [];
  State._pgPayment = "qris";
  for (let i = 0; i < 10; i++) delete State["_pgChildName" + i];
  for (let i = 0; i < 10; i++) delete State["_pgChildHasSocks" + i];
  for (let i = 0; i < 10; i++) delete State["_pgCompanionName" + i];

  showToast("Tiket " + name.trim() + " berhasil dibuat!", "success");
  switchTab("tickets");
}

// ============================================================
// COMPLETE / CANCEL TICKET
// ============================================================
function completePlaygroundTicket(id) {
  const t = (DB.playgroundTickets || []).find((x) => x.id === id);
  if (!t) return;
  t.status = "completed";
  if (t.payment_status === "unpaid") {
    t.payment_status = "paid";
    t.payment_method = "cash";
  }
  showToast("Tiket " + t.customer_name + " selesai", "success");
  render();
}

function cancelPlaygroundTicket(id) {
  const t = (DB.playgroundTickets || []).find((x) => x.id === id);
  if (!t) return;
  t.status = "cancelled";
  showToast("Tiket " + t.customer_name + " dibatalkan", "info");
  render();
}

// ============================================================
// STOCK
// ============================================================
function renderPlaygroundStock() {
  return renderStockManagement();
}

// ============================================================
// FINANCE REPORT
// ============================================================
function renderPlaygroundFinance() {
  const startDate =
    State.pgFinanceStart ||
    new Date(new Date().setDate(new Date().getDate() - 6))
      .toISOString()
      .split("T")[0];
  const endDate = State.pgFinanceEnd || new Date().toISOString().split("T")[0];
  const tickets = (DB.playgroundTickets || []).filter((t) => {
    if (!t.created_at) return false;
    const d = t.created_at.split("T")[0];
    return d >= startDate && d <= endDate;
  });
  const paidTickets = tickets.filter((t) => t.payment_status === "paid");
  const totalRev = paidTickets.reduce((s, t) => s + t.total_amount, 0);
  const activeCount = (DB.playgroundTickets || []).filter(
    (t) => t.status === "active",
  ).length;
  const todayStr = new Date().toISOString().split("T")[0];
  const todayPaid = paidTickets.filter(
    (t) => t.created_at.split("T")[0] === todayStr,
  );
  const todayRev = todayPaid.reduce((s, t) => s + t.total_amount, 0);

  return `
  <div class="animate-fade-up">
    <div class="flex justify-between items-center mb-4">
      <h2 class="font-display text-xl font-bold">Laporan Playground</h2>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      <div class="stat-card text-center">
        <div class="text-xs" style="color:var(--muted)">Tiket Aktif</div>
        <div class="text-2xl font-bold mt-1" style="color:var(--accent)">${activeCount}</div>
      </div>
      <div class="stat-card text-center">
        <div class="text-xs" style="color:var(--muted)">Pendapatan Hari Ini</div>
        <div class="text-lg font-bold mt-1" style="color:var(--success)">${formatCurrency(todayRev)}</div>
        <div class="text-xs mt-1" style="color:var(--muted)">${todayPaid.length} transaksi</div>
      </div>
      <div class="stat-card text-center">
        <div class="text-xs" style="color:var(--muted)">Total Pendapatan</div>
        <div class="text-lg font-bold mt-1" style="color:var(--success)">${formatCurrency(totalRev)}</div>
        <div class="text-xs mt-1" style="color:var(--muted)">${paidTickets.length} tiket</div>
      </div>
      <div class="stat-card text-center">
        <div class="text-xs" style="color:var(--muted)">Total Tiket</div>
        <div class="text-lg font-bold mt-1" style="color:var(--accent)">${tickets.length}</div>
      </div>
    </div>
    <div class="flex gap-2 mb-4">
      <div class="flex-1">
        <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Dari</label>
        <input type="date" class="input-field w-full text-sm" value="${startDate}" onchange="State.pgFinanceStart=this.value;render()">
      </div>
      <div class="flex-1">
        <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Sampai</label>
        <input type="date" class="input-field w-full text-sm" value="${endDate}" onchange="State.pgFinanceEnd=this.value;render()">
      </div>
    </div>
    <div class="space-y-2">
      ${paidTickets.length === 0 ? '<div class="text-center py-8 text-sm" style="color:var(--muted)">Belum ada transaksi</div>' : ""}
      ${paidTickets
        .map(
          (t) => `
        <div class="card flex justify-between items-center">
          <div>
            <div class="font-semibold text-sm">${t.customer_name}</div>
            <div class="text-xs" style="color:var(--muted)">${t.children.map((c) => c.name).join(", ")} — ${t.hours} jam</div>
            <div class="text-xs" style="color:var(--muted)">${formatDate(t.created_at)}</div>
          </div>
          <div class="text-right">
            <div class="font-bold text-sm" style="color:var(--accent)">${formatCurrency(t.total_amount)}</div>
            <span class="text-[10px] badge ${t.payment_method === "cash" ? "badge-ready" : "badge-completed"}">${t.payment_method === "cash" ? "Tunai" : t.payment_method === "qris" ? "QRIS" : "-"}</span>
          </div>
        </div>`,
        )
        .join("")}
    </div>
  </div>`;
}

// ============================================================
// PROFILE
// ============================================================
function renderPlaygroundProfile() {
  return renderGenericProfile();
}
