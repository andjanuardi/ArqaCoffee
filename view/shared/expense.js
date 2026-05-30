// ------------------------------------------------------------------
// EXPENSE MANAGEMENT (shared: admin + manager)
// ------------------------------------------------------------------
const EXPENSE_CATS = ["Operasional", "Gaji", "Lainnya"];
const EXPENSE_COLORS = {
  Operasional: "#1abc9c",
  Gaji: "#e74c3c",
  Lainnya: "#f39c12",
};
const EXPENSE_ICONS = {
  Operasional: "fa-bolt",
  Gaji: "fa-hand-holding-dollar",
  Lainnya: "fa-receipt",
};

function renderExpenseManagement() {
  if (!State.expenseSearch) State.expenseSearch = "";
  if (!State.expenseCategory) State.expenseCategory = "all";
  if (!State.expenseStart) { const d = new Date(); d.setDate(d.getDate() - 30); State.expenseStart = d.toISOString().split("T")[0]; }
  if (!State.expenseEnd) State.expenseEnd = new Date().toISOString().split("T")[0];
  const expenses = DB.expenses || [];
  const now = new Date();
  const filtered = expenses.filter((e) => {
    if (!e.date) return false;
    if (e.date < State.expenseStart || e.date > State.expenseEnd) return false;
    if (State.expenseCategory !== "all" && e.category !== State.expenseCategory) return false;
    if (State.expenseSearch && !e.note?.toLowerCase().includes(State.expenseSearch.toLowerCase()) && !e.category?.toLowerCase().includes(State.expenseSearch.toLowerCase())) return false;
    return true;
  });
  const totalFiltered = filtered.reduce((s, e) => s + e.amount, 0);
  const dayCount = Math.max(1, Math.round((new Date(State.expenseEnd) - new Date(State.expenseStart)) / 86400000) + 1);
  return `
  <div class="animate-fade-up">
    <div class="flex justify-between items-center mb-4">
      <h2 class="font-display text-xl font-bold">Pengeluaran</h2>
      <button onclick="showAddExpenseModal()" class="btn-primary btn-sm"><i class="fas fa-plus mr-1"></i>Tambah</button>
    </div>
    <div class="flex flex-wrap items-center gap-2 mb-4">
      <input type="date" id="expense-start" value="${State.expenseStart}" class="input-field text-sm" style="flex:1;min-width:130px" onchange="State.expenseStart=this.value;render()">
      <span class="text-xs" style="color:var(--muted)">s/d</span>
      <input type="date" id="expense-end" value="${State.expenseEnd}" class="input-field text-sm" style="flex:1;min-width:130px" onchange="State.expenseEnd=this.value;render()">
    </div>
    <div class="grid grid-cols-3 gap-3 mb-4">
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Total Pengeluaran</div><div class="text-base font-bold mt-1" style="color:var(--danger)">${formatCurrency(totalFiltered)}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Jumlah Transaksi</div><div class="text-base font-bold mt-1">${filtered.length}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Rata-rata/Hari</div><div class="text-base font-bold mt-1" style="color:var(--accent)">${formatCurrency(filtered.length ? Math.round(totalFiltered / dayCount) : 0)}</div></div>
    </div>
    <div class="card mb-4" style="padding:10px">
      <input type="text" class="input-field text-sm w-full" placeholder="Cari pengeluaran..." value="${State.expenseSearch}" oninput="State.expenseSearch=this.value;render()">
    </div>
    <div class="flex flex-wrap gap-2 mb-4">
      <button class="category-chip ${State.expenseCategory === "all" ? "active" : ""}" onclick="State.expenseCategory='all';render()">Semua</button>
      ${EXPENSE_CATS.map(
        (c) => `
        <button class="category-chip ${State.expenseCategory === c ? "active" : ""}" onclick="State.expenseCategory='${c}';render()" style="${State.expenseCategory === c ? "background:" + EXPENSE_COLORS[c] + ";color:#fff" : ""}">${c}</button>
      `,
      ).join("")}
    </div>
    <div class="space-y-3">
      ${
        filtered.length
          ? filtered
              .sort(
                (a, b) =>
                  b.date.localeCompare(a.date) || b.id?.localeCompare(a.id),
              )
              .map((e) => {
                const color = EXPENSE_COLORS[e.category] || "var(--muted)";
                const icon = EXPENSE_ICONS[e.category] || "fa-receipt";
                return `
        <div class="card relative overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1" style="background:${color}"></div>
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-start gap-3 flex-1 min-w-0">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style="background:${color}22;color:${color}">
                <i class="fas ${icon}"></i>
              </div>
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="text-xs font-semibold px-2 py-0.5 rounded-full" style="background:${color}22;color:${color}">${e.category}</span>
                  <span class="text-xs" style="color:var(--muted)">${e.date || "-"}${e.time ? " " + e.time : ""}</span>
                </div>
                <div class="text-sm font-semibold mt-1" style="color:var(--success)">${formatCurrency(e.amount)}${e.volume && e.unitPrice ? ` <span class="text-xs font-normal" style="color:var(--muted)">(${e.volume} ${e.unit || "unit"} x ${formatCurrency(e.unitPrice)})</span>` : ""}</div>
                <div class="text-xs mt-0.5 truncate" style="color:var(--muted)">${e.note || "-"}</div>
              </div>
            </div>
            <div class="flex items-center gap-1 shrink-0">
              <button onclick="event.stopPropagation();showEditExpenseModal('${e.id}')" class="btn-sm" style="background:rgba(224,122,58,.12);color:var(--accent);border:none;padding:6px 8px;border-radius:8px;cursor:pointer;font-size:12px"><i class="fas fa-pen"></i></button>
              <button onclick="event.stopPropagation();deleteExpense('${e.id}')" class="btn-sm" style="background:rgba(231,76,60,.12);color:var(--danger);border:none;padding:6px 8px;border-radius:8px;cursor:pointer;font-size:12px"><i class="fas fa-trash"></i></button>
            </div>
          </div>
        </div>`;
              })
              .join("")
          : `<div class="text-sm py-10 text-center" style="color:var(--muted)"><i class="fas fa-receipt mr-2"></i>Tidak ada pengeluaran</div>`
      }
    </div>
  </div>`;
}

function showAddExpenseModal() {
  showModal(`
    <div style="max-width:420px">
      <h3 class="font-display text-lg font-bold mb-4">Tambah Pengeluaran</h3>
      <div class="space-y-3">
        <div>
          <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Tanggal</label>
          <input id="new-expense-date" type="date" class="input-field text-sm w-full" value="${new Date().toISOString().split("T")[0]}">
        </div>
        <div>
          <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Jam</label>
          <input id="new-expense-time" type="time" class="input-field text-sm w-full" value="${new Date().toTimeString().slice(0,5)}">
        </div>
        <div>
          <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Kategori</label>
          <select id="new-expense-cat" class="input-field text-sm w-full">${EXPENSE_CATS.map((c) => `<option value="${c}">${c}</option>`).join("")}</select>
        </div>
        <div class="grid grid-cols-3 gap-2">
          <div>
            <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Volume</label>
            <input id="new-expense-volume" type="number" class="input-field text-sm w-full" placeholder="0" min="0" step="any" oninput="calcExpenseTotal('new')">
          </div>
          <div>
            <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Satuan</label>
            <input id="new-expense-unit" class="input-field text-sm w-full" placeholder="kg, ltr, pcs">
          </div>
          <div>
            <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Harga Satuan</label>
            <input id="new-expense-unitprice" type="number" class="input-field text-sm w-full" placeholder="0" min="0" oninput="calcExpenseTotal('new')">
          </div>
        </div>
        <div>
          <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Total</label>
          <input id="new-expense-amount" type="number" class="input-field text-sm w-full" placeholder="0" min="0" readonly style="color:var(--success);font-weight:600">
        </div>
        <div>
          <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Keterangan</label>
          <input id="new-expense-note" class="input-field text-sm w-full" placeholder="Misal: Bayar gaji dan token listrik">
        </div>
      </div>
      <button onclick="addExpense()" class="btn-primary w-full mt-4 text-center">Simpan</button>
    </div>
  `);
}

function calcExpenseTotal(prefix) {
  const vol = parseFloat(
    document.getElementById(prefix + "-expense-volume")?.value || "0",
  );
  const price = parseFloat(
    document.getElementById(prefix + "-expense-unitprice")?.value || "0",
  );
  const total = document.getElementById(prefix + "-expense-amount");
  if (total) total.value = Math.round(vol * price);
}

function addExpense() {
  const date = document.getElementById("new-expense-date")?.value;
  if (!date) {
    showToast("Tanggal wajib diisi", "warning");
    return;
  }
  const time = document.getElementById("new-expense-time")?.value || "";
  const volume = parseFloat(
    document.getElementById("new-expense-volume")?.value || "0",
  );
  const unit = document.getElementById("new-expense-unit")?.value || "";
  const unitPrice = parseFloat(
    document.getElementById("new-expense-unitprice")?.value || "0",
  );
  const amount = Math.round(volume * unitPrice);
  if (amount <= 0) {
    showToast("Total harus lebih dari 0", "warning");
    return;
  }
  const category =
    document.getElementById("new-expense-cat")?.value || "Lainnya";
  const note = document.getElementById("new-expense-note")?.value || "";
  DB.expenses.push({
    id: "e" + Date.now(),
    date,
    time,
    category,
    amount,
    note,
    volume,
    unit,
    unitPrice,
  });
  closeModal();
  showToast("Pengeluaran ditambahkan", "success");
  render();
}

function showEditExpenseModal(id) {
  const e = DB.expenses.find((x) => x.id === id);
  if (!e) return;
  showModal(`
    <div style="max-width:420px">
      <h3 class="font-display text-lg font-bold mb-4">Edit Pengeluaran</h3>
      <div class="space-y-3">
        <div>
          <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Tanggal</label>
          <input id="edit-expense-date" type="date" class="input-field text-sm w-full" value="${e.date}">
        </div>
        <div>
          <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Jam</label>
          <input id="edit-expense-time" type="time" class="input-field text-sm w-full" value="${e.time || "08:00"}">
        </div>
        <div>
          <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Kategori</label>
          <select id="edit-expense-cat" class="input-field text-sm w-full">${EXPENSE_CATS.map((c) => `<option value="${c}" ${c === e.category ? "selected" : ""}>${c}</option>`).join("")}</select>
        </div>
        <div class="grid grid-cols-3 gap-2">
          <div>
            <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Volume</label>
            <input id="edit-expense-volume" type="number" class="input-field text-sm w-full" value="${e.volume || 0}" min="0" step="any" oninput="calcExpenseTotal('edit')">
          </div>
          <div>
            <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Satuan</label>
            <input id="edit-expense-unit" class="input-field text-sm w-full" value="${e.unit || ""}">
          </div>
          <div>
            <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Harga Satuan</label>
            <input id="edit-expense-unitprice" type="number" class="input-field text-sm w-full" value="${e.unitPrice || 0}" min="0" oninput="calcExpenseTotal('edit')">
          </div>
        </div>
        <div>
          <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Total</label>
          <input id="edit-expense-amount" type="number" class="input-field text-sm w-full" value="${e.amount}" min="0" readonly style="color:var(--success);font-weight:600">
        </div>
        <div>
          <label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Keterangan</label>
          <input id="edit-expense-note" class="input-field text-sm w-full" value="${e.note || ""}">
        </div>
      </div>
      <button onclick="saveEditExpense('${e.id}')" class="btn-primary w-full mt-4 text-center">Simpan</button>
    </div>
  `);
}

function saveEditExpense(id) {
  const e = DB.expenses.find((x) => x.id === id);
  if (!e) return;
  const date = document.getElementById("edit-expense-date")?.value;
  if (!date) {
    showToast("Tanggal wajib diisi", "warning");
    return;
  }
  const volume = parseFloat(
    document.getElementById("edit-expense-volume")?.value || "0",
  );
  const unit = document.getElementById("edit-expense-unit")?.value || "";
  const unitPrice = parseFloat(
    document.getElementById("edit-expense-unitprice")?.value || "0",
  );
  const amount = Math.round(volume * unitPrice);
  if (amount <= 0) {
    showToast("Total harus lebih dari 0", "warning");
    return;
  }
  e.date = date;
  e.time = document.getElementById("edit-expense-time")?.value || "";
  e.category = document.getElementById("edit-expense-cat")?.value || "Lainnya";
  e.amount = amount;
  e.volume = volume;
  e.unit = unit;
  e.unitPrice = unitPrice;
  e.note = document.getElementById("edit-expense-note")?.value || "";
  closeModal();
  showToast("Pengeluaran diperbarui", "success");
  render();
}

function deleteExpense(id) {
  const e = DB.expenses.find((x) => x.id === id);
  if (!e) return;
  showModal(`
    <div style="max-width:380px">
      <h3 class="font-display text-lg font-bold mb-4">Konfirmasi Hapus</h3>
      <p class="text-sm mb-4">Hapus pengeluaran <strong>${formatCurrency(e.amount)}</strong> (${e.category})? Tindakan ini tidak dapat dibatalkan.</p>
      <div class="flex gap-2">
        <button onclick="closeModal()" class="btn-sm flex-1 text-center" style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:10px;cursor:pointer">Batal</button>
        <button onclick="confirmDeleteExpense('${id}')" class="btn-sm flex-1 text-center" style="background:rgba(231,76,60,.15);color:var(--danger);border:1px solid rgba(231,76,60,.3);border-radius:10px;padding:10px;cursor:pointer"><i class="fas fa-trash mr-1"></i>Hapus</button>
      </div>
    </div>
  `);
}

function confirmDeleteExpense(id) {
  DB.expenses = DB.expenses.filter((x) => x.id !== id);
  closeModal();
  showToast("Pengeluaran dihapus", "info");
  render();
}

// ------------------------------------------------------------------
// ACTIVE ORDERS (shared: admin + manager)
// ------------------------------------------------------------------
function renderActiveOrders() {
  if (!State.activeOrderStart) {
    const d = new Date(); d.setDate(d.getDate() - 30);
    State.activeOrderStart = d.toISOString().split('T')[0];
  }
  if (!State.activeOrderEnd) State.activeOrderEnd = new Date().toISOString().split('T')[0];
  const raw = DB.orders.filter(o => !['completed', 'cancelled', 'rejected'].includes(o.status));
  const dateFiltered = raw.filter(o => {
    if (!o.created_at) return false;
    const d = o.created_at.split('T')[0];
    return d >= State.activeOrderStart && d <= State.activeOrderEnd;
  });
  const countByStatus = {
    pending: dateFiltered.filter(o => o.status === 'pending').length,
    cooking: dateFiltered.filter(o => o.status === 'cooking').length,
    ready: dateFiltered.filter(o => o.status === 'ready').length,
    delivering: dateFiltered.filter(o => o.status === 'delivering').length,
    delivered: dateFiltered.filter(o => o.status === 'delivered').length,
  };
  const q = (State.activeOrderSearch || '').toLowerCase();
  const filtered = dateFiltered.filter(o => {
    if (!q) return true;
    const idMatch = o.id.toLowerCase().includes(q);
    const nameMatch = (o.customer_name || '').toLowerCase().includes(q);
    const statusMatch = getStatusLabel(o.status).toLowerCase().includes(q);
    return idMatch || nameMatch || statusMatch;
  });
  const cancelled = DB.orders.filter(o =>
    ['cancelled', 'rejected'].includes(o.status) && o.created_at
  ).filter(o => {
    const d = o.created_at.split('T')[0];
    return d >= State.activeOrderStart && d <= State.activeOrderEnd;
  }).sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
  const history = DB.orders.filter(o =>
    o.status === 'completed' && o.created_at
  ).filter(o => {
    const d = o.created_at.split('T')[0];
    return d >= State.activeOrderStart && d <= State.activeOrderEnd;
  }).sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
  return `
  <div class="animate-fade-up">
    <div class="flex justify-between items-center mb-4">
      <h2 class="font-display text-xl font-bold">Pesanan Aktif</h2>
      <span class="text-xs" style="color:var(--muted)">${dateFiltered.length} pesanan</span>
    </div>
    <div class="grid grid-cols-5 gap-2 mb-5">
      <div class="stat-card text-center"><div class="text-lg font-bold" style="color:var(--warning)">${countByStatus.pending}</div><div class="text-[10px]" style="color:var(--muted)">Menunggu</div></div>
      <div class="stat-card text-center"><div class="text-lg font-bold" style="color:var(--accent)">${countByStatus.cooking}</div><div class="text-[10px]" style="color:var(--muted)">Dimasak</div></div>
      <div class="stat-card text-center"><div class="text-lg font-bold" style="color:var(--success)">${countByStatus.ready}</div><div class="text-[10px]" style="color:var(--muted)">Siap Saji</div></div>
      <div class="stat-card text-center" style="border-color:rgba(52,152,219,.3)"><div class="text-lg font-bold" style="color:#3498db">${countByStatus.delivering}</div><div class="text-[10px]" style="color:var(--muted)">Diantar</div></div>
      <div class="stat-card text-center" style="border-color:rgba(155,89,182,.3)"><div class="text-lg font-bold" style="color:#9b59b6">${countByStatus.delivered}</div><div class="text-[10px]" style="color:var(--muted)">Diterima</div></div>
    </div>
    <div class="flex flex-wrap items-center gap-2 mb-3">
      <input type="date" id="active-order-start" value="${State.activeOrderStart}" class="input-field text-sm" style="flex:1;min-width:130px" onchange="State.activeOrderStart=this.value;render()">
      <span class="text-xs" style="color:var(--muted)">s/d</span>
      <input type="date" id="active-order-end" value="${State.activeOrderEnd}" class="input-field text-sm" style="flex:1;min-width:130px" onchange="State.activeOrderEnd=this.value;render()">
    </div>
    <div class="card mb-4" style="padding:10px">
      <input type="text" class="input-field text-sm w-full" placeholder="Cari ID, nama pelanggan, atau status..." value="${State.activeOrderSearch || ''}" oninput="State.activeOrderSearch=this.value;render()">
    </div>
    <div class="space-y-3">
      ${filtered.length === 0 ? '<p class="text-sm text-center py-10" style="color:var(--muted)"><i class="fas fa-inbox mr-2"></i>Tidak ada pesanan aktif</p>' : ''}
      ${filtered.sort((a, b) => (b.created_at || '').localeCompare(a.created_at || '')).map(o => {
        const t = o.table_id ? getTable(o.table_id) : null;
        return `
      <div class="order-card" onclick="showOrderDetail('${o.id}')">
        <div class="flex justify-between items-start mb-2">
          <div>
            <span class="font-bold text-sm">#${o.id.slice(-5).toUpperCase()}</span>
            <span class="badge ${getStatusBadge(o.status)} ml-2">${getStatusLabel(o.status)}</span>
            <span class="badge ${o.payment_status === 'paid' ? 'badge-paid' : 'badge-unpaid'} ml-1">${o.payment_status === 'paid' ? 'Lunas' : 'Belum Bayar'}</span>
          </div>
          <span class="text-xs" style="color:var(--muted)">${formatTime(o.created_at)}</span>
        </div>
        <div class="text-xs mb-1" style="color:var(--muted)"><i class="fas fa-user mr-1" style="color:var(--accent)"></i>${o.customer_name || (getUser(o.user_id)?.name || getUser(o.user_id)?.email || '—')}</div>
        <div class="text-xs mb-1" style="color:var(--muted)"><i class="fas fa-phone mr-1" style="color:var(--accent)"></i>${o.customer_phone || (getUser(o.user_id)?.phone || '—')}</div>
        <div class="text-xs mb-2" style="color:var(--muted)">
          <i class="fas ${o.order_type === 'dine-in' ? 'fa-chair' : 'fa-motorcycle'} mr-1"></i>${getOrderTypeName(o.order_type)}${t ? ' — Meja ' + t.number : ''}
        </div>
        <div class="text-xs mb-3">${(o.items || []).map(i => {
          const mi = getMenuItem(i.menu_item_id);
          return mi ? mi.name + ' x' + i.quantity : '';
        }).filter(Boolean).join(', ') || '-'}</div>
        ${o.promo_discount ? `<div class="text-[10px] mb-2 flex items-center gap-1" style="color:var(--success)"><i class="fas fa-tag"></i>Diskon: -${formatCurrency(o.promo_discount)}</div>` : ''}
        ${o.shipping_cost && o.shipping_cost > 0 ? `<div class="text-[10px] mb-2 flex items-center gap-1" style="color:var(--accent)"><i class="fas fa-truck"></i>Ongkos Kirim: <b>${formatCurrency(o.shipping_cost)}</b></div>` : ''}
        <div class="flex justify-between items-center">
          <span class="font-bold" style="color:var(--accent)">${formatCurrency(o.total_amount)}</span>
        </div>
      </div>`;
      }).join('')}
    </div>
    ${history.length > 0 ? `
    <div class="mt-6">
      <div class="flex items-center gap-2 mb-3 cursor-pointer" onclick="this.nextElementSibling.classList.toggle('hidden')" style="user-select:none">
        <h3 class="font-semibold text-sm" style="color:var(--success)">Riwayat Pesanan</h3>
        <span class="text-xs" style="color:var(--muted)">${history.length}</span>
        <div class="text-xs transition-transform" style="color:var(--muted)"><i class="fas fa-chevron-down"></i></div>
      </div>
      <div class="space-y-2 hidden">
        ${history.map(o => {
          const t = o.table_id ? getTable(o.table_id) : null;
          return `
        <div class="card cursor-pointer hover:scale-[1.02] transition-transform" onclick="showOrderDetail('${o.id}')" style="border-color:rgba(39,174,96,.2)">
          <div class="flex justify-between items-start mb-1">
            <div>
              <span class="font-bold text-sm">#${o.id.slice(-5).toUpperCase()}</span>
              <span class="badge badge-completed ml-2">${getStatusLabel(o.status)}</span>
              <span class="badge ${o.payment_status === 'paid' ? 'badge-paid' : 'badge-unpaid'} ml-1">${o.payment_status === 'paid' ? 'Lunas' : 'Belum Bayar'}</span>
            </div>
            <span class="text-xs" style="color:var(--muted)">${formatTime(o.created_at)}</span>
          </div>
          <div class="text-xs mb-1" style="color:var(--muted)"><i class="fas fa-user mr-1" style="color:var(--accent)"></i>${o.customer_name || (getUser(o.user_id)?.name || getUser(o.user_id)?.email || '—')}</div>
          <div class="text-xs mb-1" style="color:var(--muted)"><i class="fas fa-phone mr-1" style="color:var(--accent)"></i>${o.customer_phone || (getUser(o.user_id)?.phone || '—')}</div>
          <div class="text-xs mb-2" style="color:var(--muted)">${getOrderTypeName(o.order_type)}${t ? ' — Meja ' + t.number : ''}</div>
          <div class="flex justify-between items-center">
            <span class="text-xs" style="color:var(--muted)">${formatDate(o.created_at)}</span>
            <span class="font-bold text-sm" style="color:var(--success)">${formatCurrency(o.total_amount)}</span>
          </div>
        </div>`;}).join('')}
      </div>
    </div>` : ''}
    ${cancelled.length > 0 ? `
    <div class="mt-6">
      <div class="flex items-center gap-2 mb-3 cursor-pointer" onclick="this.nextElementSibling.classList.toggle('hidden')" style="user-select:none">
        <h3 class="font-semibold text-sm" style="color:var(--danger)">Riwayat Pembatalan</h3>
        <span class="text-xs" style="color:var(--muted)">${cancelled.length}</span>
        <div class="text-xs transition-transform" style="color:var(--muted)"><i class="fas fa-chevron-down"></i></div>
      </div>
      <div class="space-y-2 hidden">
        ${cancelled.map(o => {
          const t = o.table_id ? getTable(o.table_id) : null;
          let label = 'Ditolak';
          let pelaku = 'Dapur';
          if (o.status === 'cancelled') {
            label = 'Dibatalkan';
            pelaku = o.reject_reason && o.reject_reason.startsWith('Dibatalkan Pelanggan:') ? 'Pelanggan' : 'Kasir';
          }
          else if (o.reject_reason && o.reject_reason.startsWith('Ditolak Kurir:')) pelaku = 'Kurir';
          return `
        <div class="card cursor-pointer hover:scale-[1.02] transition-transform" onclick="showOrderDetail('${o.id}')" style="border-color:rgba(231,76,60,.3)">
          <div class="flex justify-between items-start mb-1">
            <div>
              <span class="font-bold text-sm">#${o.id.slice(-5).toUpperCase()}</span>
              <span class="badge badge-danger ml-2">${label}</span>
              <span class="text-xs ml-1 px-2 py-0.5 rounded" style="background:rgba(231,76,60,.1);color:var(--danger)"><i class="fas fa-user mr-1"></i>${pelaku}</span>
            </div>
            <span class="text-xs" style="color:var(--muted)">${formatTime(o.created_at)}</span>
          </div>
          <div class="text-xs mb-1" style="color:var(--muted)"><i class="fas fa-user mr-1" style="color:var(--accent)"></i>${o.customer_name || (getUser(o.user_id)?.name || getUser(o.user_id)?.email || '—')}</div>
          <div class="text-xs mb-1" style="color:var(--muted)"><i class="fas fa-phone mr-1" style="color:var(--accent)"></i>${o.customer_phone || (getUser(o.user_id)?.phone || '—')}</div>
          <div class="text-xs mb-2" style="color:var(--muted)">${getOrderTypeName(o.order_type)}${t ? ' — Meja ' + t.number : ''}</div>
          ${o.reject_reason ? `<div class="text-xs mb-2 p-2 rounded" style="background:rgba(231,76,60,.08);color:var(--danger)"><i class="fas fa-ban mr-1"></i>${o.reject_reason}</div>` : ''}
          <div class="flex justify-between items-center">
            <span class="text-xs" style="color:var(--muted)">${formatDate(o.created_at)}</span>
            <span class="font-bold text-sm" style="color:var(--danger)">${formatCurrency(o.total_amount)}</span>
          </div>
        </div>`;}).join('')}
      </div>
    </div>` : ''}
  </div>`;
}
