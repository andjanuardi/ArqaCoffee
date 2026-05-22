// ============================================================
// KITCHEN VIEW
// ============================================================
function renderKitchenView() {
  const tab = State.currentTab.kitchen || "queue";
  if (tab === "queue") return renderKitchenQueue();
  if (tab === "history") return renderKitchenHistory();
  if (tab === "profile") return renderGenericProfile();
  return renderKitchenQueue();
}

function renderKitchenQueue() {
  const active = DB.orders.filter((o) =>
    ["pending", "cooking", "ready"].includes(o.status),
  );
  const allItems = [];
  active.forEach((o) => {
    o.items.forEach((i) => {
      const mi = getMenuItem(i.menu_item_id);
      if (mi && i.status !== "ready")
        allItems.push({
          ...i,
          menu_item: mi,
          orderId: o.id,
          orderType: o.order_type,
          tableId: o.table_id,
          customerName: o.customer_name || "",
          paymentStatus: o.payment_status,
          createdAt: o.created_at,
          unitPrice: i.unit_price,
        });
    });
  });
  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Antrian Dapur</h2>
    <div class="grid grid-cols-2 gap-3 mb-5">
      <div class="stat-card text-center animate-breathe"><div class="text-3xl font-bold" style="color:var(--warning)">${allItems.filter((i) => i.status === "pending").length}</div><div class="text-xs" style="color:var(--muted)">Menunggu</div></div>
      <div class="stat-card text-center"><div class="text-3xl font-bold" style="color:var(--accent)">${allItems.filter((i) => i.status === "cooking").length}</div><div class="text-xs" style="color:var(--muted)">Dimasak</div></div>
    </div>
    <div class="space-y-3">
      ${allItems.length === 0 ? '<div class="text-center py-12"><i class="fas fa-fire-burner text-4xl mb-3" style="color:var(--border)"></i><p style="color:var(--muted)">Tidak ada antrian</p></div>' : ""}
      ${allItems
        .map((i) => {
          const t = i.tableId ? getTable(i.tableId) : null;
          return `
        <div class="card ${i.status === "pending" ? "animate-breathe" : ""}">
          <div class="flex justify-between items-start mb-2">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="badge ${getStatusBadge(i.status)}">${getStatusLabel(i.status)}</span>
              <span class="text-xs font-bold">#${i.orderId.slice(-5).toUpperCase()}</span>
              ${i.customerName ? `<span class="text-xs" style="color:var(--accent)"><i class="fas fa-user mr-1"></i>${i.customerName}</span>` : ""}
            </div>
            <span class="text-xs" style="color:var(--muted)">${formatTime(i.createdAt)}</span>
          </div>
          <div class="text-xs mb-2" style="color:var(--muted)">
            <i class="fas ${i.orderType === "dine-in" ? "fa-chair" : "fa-motorcycle"} mr-1"></i>${t ? "Meja " + t.number : i.orderType === "dine-in" ? "Dine-in" : "Delivery"}
            <span class="ml-2"><i class="fas fa-wallet mr-1"></i>${i.paymentStatus === "paid" ? "Lunas" : "Belum Bayar"}</span>
          </div>
          <div class="flex justify-between items-center">
            <div>
              <div class="font-semibold">${i.menu_item.name} <span style="color:var(--accent)">x${i.quantity}</span></div>
              <div class="text-xs mt-1" style="color:var(--muted)">${formatCurrency(i.unitPrice * i.quantity)}</div>
              ${i.notes ? `<div class="text-xs mt-1" style="color:var(--warning)"><i class="fas fa-note-sticky mr-1"></i>${i.notes}</div>` : ""}
              ${renderRecipeInfo(i.menu_item_id, i.quantity)}
            </div>
            <div class="flex gap-2">
              ${i.status === "pending" ? `
                <button onclick="rejectKitchenOrder('${i.orderId}')" class="text-xs font-bold px-3 py-1.5 rounded" style="color:var(--danger); background:rgba(231,76,60,.1)">Tolak</button>
                <button onclick="updateItemStatus('${i.orderId}','${i.menu_item_id}','cooking')" class="btn-primary btn-sm">Masak</button>
              ` : ""}
              ${i.status === "cooking" ? `<button onclick="updateItemStatus('${i.orderId}','${i.menu_item_id}','ready')" class="btn-primary btn-sm" style="background:linear-gradient(135deg,var(--success),#1e8449)">Siap</button>` : ""}
            </div>
          </div>
        </div>`;
        })
        .join("")}
    </div>
  </div>`;
}

function renderRecipeInfo(menuItemId, orderQty) {
  const recipe = DB.menuStockMapping && DB.menuStockMapping[menuItemId];
  if (!recipe || !recipe.length) return '';
  const items = recipe.map(r => {
    const sid = typeof r === 'string' ? r : r.id;
    const needQty = (typeof r === 'string' ? 1 : (r.qty || 1)) * orderQty;
    const s = DB.stockItems.find(x => x.id === sid);
    const cukup = s && s.current_quantity >= needQty;
    return `<span class="text-[10px] px-1.5 py-0.5 rounded" style="background:${cukup ? 'rgba(39,174,96,.12)' : 'rgba(231,76,60,.12)'};color:${cukup ? 'var(--success)' : 'var(--danger)'}">${s ? s.name : '?'} ${needQty}${s ? s.unit : ''}</span>`;
  }).join(' ');
  return `<div class="flex flex-wrap gap-1 mt-1.5">${items}</div>`;
}

function updateItemStatus(orderId, menuItemId, newStatus) {
  const o = DB.orders.find((x) => x.id === orderId);
  if (!o) return;
  const item = o.items.find((i) => i.menu_item_id === menuItemId);
  if (item) item.status = newStatus;
  if (newStatus === "cooking" && DB.menuStockMapping && DB.menuStockMapping[menuItemId]) {
    const orderQty = item ? item.quantity : 1;
    DB.menuStockMapping[menuItemId].forEach((r) => {
      const stockId = typeof r === 'string' ? r : r.id;
      const recipeQty = typeof r === 'string' ? 1 : (r.qty || 1);
      const s = DB.stockItems.find((x) => x.id === stockId);
      if (s) {
        const reduceAmt = recipeQty * orderQty;
        s.current_quantity = Math.max(0, s.current_quantity - reduceAmt);
        DB.stockMovements.push({
          id: "sm" + Date.now() + "_" + stockId,
          stock_item_id: stockId,
          user_id: State.currentUser.id,
          type: "out",
          quantity: reduceAmt,
          notes: "Pemakaian dapur: " + getMenuItem(menuItemId)?.name,
          created_at: new Date().toISOString(),
        });
        if (s.current_quantity <= s.min_quantity) notifyLowStock(s);
      }
    });
    autoUpdateMenuAvailability();
  }
  if (o.items.every((i) => i.status === "ready")) {
    o.status = "ready";
    notifyStatusChange(o, 'ready');
  } else if (o.items.some((i) => i.status === "cooking")) {
    o.status = "cooking";
  }
  showToast(`Status diupdate: ${getStatusLabel(newStatus)}`, "success");
  render();
}

function updateOrderStatus(id, status) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  o.status = status;
  if (status === "cooking")
    o.items.forEach((i) => {
      if (i.status === "pending") i.status = "cooking";
    });
  showToast(
    `Pesanan #${o.id.slice(-5).toUpperCase()} → ${getStatusLabel(status)}`,
    "success",
  );
  render();
}

function rejectKitchenOrder(orderId) {
  const o = DB.orders.find((x) => x.id === orderId);
  if (!o) return;
  if (o.status !== "pending") {
    showToast("Pesanan sudah diproses, tidak bisa ditolak", "warning");
    return;
  }
  showModal(`
    <div class="text-center">
      <div class="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl" style="background:rgba(231,76,60,.1);color:var(--danger)">
        <i class="fas fa-ban"></i>
      </div>
      <h3 class="font-display text-lg font-bold mb-2">Tolak Pesanan #${o.id.slice(-5).toUpperCase()}?</h3>
      <p class="text-sm mb-4" style="color:var(--muted)">Pilih alasan penolakan pesanan dari dapur.</p>
      
      <div class="text-left mb-4">
        <label class="text-xs font-semibold mb-2 block" style="color:var(--muted)">Alasan Penolakan</label>
        <select id="kitchen-reject-reason" class="input-field text-sm w-full mb-3" style="background:var(--bg2);" onchange="document.getElementById('kitchen-reject-other-container').style.display = this.value === 'Lainnya' ? 'block' : 'none'">
          <option value="">-- Pilih Alasan --</option>
          <option value="Bahan habis">Bahan habis</option>
          <option value="Peralatan bermasalah">Peralatan bermasalah</option>
          <option value="Menu tidak tersedia saat ini">Menu tidak tersedia saat ini</option>
          <option value="Pesanan tidak valid">Pesanan tidak valid</option>
          <option value="Antrian terlalu penuh">Antrian terlalu penuh</option>
          <option value="Lainnya">Lainnya...</option>
        </select>
        <div id="kitchen-reject-other-container" style="display:none;">
          <input type="text" id="kitchen-reject-other" class="input-field text-sm w-full" placeholder="Ketik alasan spesifik di sini...">
        </div>
      </div>

      <div class="flex gap-3">
        <button onclick="closeModal()" class="btn-secondary flex-1">Batal</button>
        <button onclick="confirmRejectKitchenOrder('${orderId}')" class="btn-primary flex-1" style="background:var(--danger);border-color:var(--danger);">Tolak Pesanan</button>
      </div>
    </div>
  `);
}

function confirmRejectKitchenOrder(orderId) {
  const reasonEl = document.getElementById("kitchen-reject-reason");
  let reason = reasonEl ? reasonEl.value : "";

  if (reason === "Lainnya") {
    const otherEl = document.getElementById("kitchen-reject-other");
    reason = otherEl ? otherEl.value.trim() : "";
  }

  if (!reason) {
    showToast("Silakan pilih atau isi alasan penolakan", "warning");
    return;
  }

  const o = DB.orders.find((x) => x.id === orderId);
  if (!o) { closeModal(); return; }

  if (o.status !== "pending") {
    showToast("Pesanan sudah diproses, tidak bisa ditolak", "warning");
    closeModal();
    return;
  }

  o.status = "rejected";
  o.reject_reason = reason;

  if (o.order_type === "dine-in" && o.table_id) {
    const hasOtherOrders = DB.orders.some(
      (x) => x.id !== orderId && x.table_id === o.table_id &&
        x.status !== "completed" && x.status !== "cancelled" && x.status !== "rejected"
    );
    if (!hasOtherOrders) {
      const t = getTable(o.table_id);
      if (t) t.status = "available";
    }
  }

  notifyRejected(o, reason);
  showToast(`Pesanan #${o.id.slice(-5).toUpperCase()} ditolak: ${reason}`, "info");
  closeModal();
  render();
}

function renderKitchenHistory() {
  const done = DB.orders.filter((o) => ["ready", "completed", "rejected"].includes(o.status)).slice(0, 15);
  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Riwayat</h2>
    <div class="space-y-2">
      ${done.length === 0 ? '<p class="text-center py-8 text-sm" style="color:var(--muted)">Belum ada riwayat</p>' : ''}
      ${done
        .map(
          (o) => `
      <div class="card flex justify-between items-center py-3 cursor-pointer hover:scale-[1.02] transition-transform" onclick="showKitchenOrderDetail('${o.id}')">
        <div><span class="font-semibold text-sm">#${o.id.slice(-5).toUpperCase()}</span><span class="text-xs ml-2" style="color:var(--muted)">${getOrderTypeName(o.order_type)}</span></div>
        <span class="badge ${o.status === 'rejected' ? 'badge-danger' : 'badge-completed'}">${o.status === 'rejected' ? 'Ditolak' : getStatusLabel(o.status)}</span>
      </div>`,
        )
        .join("")}
    </div>
  </div>`;
}

function showKitchenOrderDetail(id) {
    const o = DB.orders.find(x => x.id === id); if (!o) return;
    const t = o.table_id ? getTable(o.table_id) : null;
    showModal(`
<div>
  <div class="flex justify-between items-start mb-4">
    <h3 class="font-display text-lg font-bold">Pesanan #${o.id.slice(-5).toUpperCase()}</h3>
    <span class="badge ${o.status === 'rejected' ? 'badge-danger' : 'badge-completed'}">${o.status === 'rejected' ? 'Ditolak' : 'Selesai'}</span>
  </div>
  <div class="text-xs mb-4" style="color:var(--muted)">
    <i class="fas ${o.order_type === 'dine-in' ? 'fa-chair' : 'fa-motorcycle'} mr-1"></i>${getOrderTypeName(o.order_type)}
    ${t ? ' — Meja ' + t.number : ''}
    ${o.customer_name ? ' — ' + o.customer_name : ''}
    ${o.delivery_address ? '<br>' + o.delivery_address : ''}
  </div>
  ${o.reject_reason ? `<div class="card mb-4 text-sm" style="background:rgba(231,76,60,.08);border:1px solid rgba(231,76,60,.2)"><i class="fas fa-ban mr-1" style="color:var(--danger)"></i><strong>Alasan Tolak:</strong> ${o.reject_reason}</div>` : ''}
  <div class="space-y-2 mb-4">
    ${o.items.map(i => {
            const mi = getMenuItem(i.menu_item_id); return mi ? `
    <div class="flex justify-between text-sm">
      <div>
        <span>${mi.name} x${i.quantity} ${i.notes ? '<span style="color:var(--muted)">(' + i.notes + ')</span>' : ''}</span>
        ${renderRecipeInfo(i.menu_item_id, i.quantity)}
      </div>
      <span style="color:var(--muted)">${formatCurrency(i.unit_price * i.quantity)}</span>
    </div>`: ''
        }).join('')}
  </div>
  <div class="border-t pt-3" style="border-color:var(--border)">
    <div class="flex justify-between font-bold text-sm"><span>Total</span><span style="color:var(--accent)">${formatCurrency(o.total_amount)}</span></div>
    <div class="flex justify-between text-xs mt-1" style="color:var(--muted)"><span>Waktu</span><span>${formatTime(o.created_at)}</span></div>
  </div>
  <button onclick="closeModal()" class="btn-secondary w-full mt-4 text-center">Tutup</button>
</div>
`);
}
