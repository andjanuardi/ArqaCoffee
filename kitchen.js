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
            <div class="flex items-center gap-2">
              <span class="badge ${getStatusBadge(i.status)}">${getStatusLabel(i.status)}</span>
              <span class="text-xs" style="color:var(--muted)">#${i.orderId.slice(-5).toUpperCase()}</span>
            </div>
            <span class="text-xs" style="color:var(--muted)"><i class="fas ${i.orderType === "dine-in" ? "fa-chair" : "fa-motorcycle"} mr-1"></i>${t ? "Meja " + t.number : "Delivery"}</span>
          </div>
          <div class="flex justify-between items-center">
            <div>
              <div class="font-semibold">${i.menu_item.name} <span style="color:var(--accent)">x${i.quantity}</span></div>
              ${i.notes ? `<div class="text-xs mt-1" style="color:var(--warning)"><i class="fas fa-note-sticky mr-1"></i>${i.notes}</div>` : ""}
            </div>
            <div>
              ${i.status === "pending" ? `<button onclick="updateItemStatus('${i.orderId}','${i.menu_item_id}','cooking')" class="btn-primary btn-sm">Masak</button>` : ""}
              ${i.status === "cooking" ? `<button onclick="updateItemStatus('${i.orderId}','${i.menu_item_id}','ready')" class="btn-primary btn-sm" style="background:linear-gradient(135deg,var(--success),#1e8449)">Siap</button>` : ""}
            </div>
          </div>
        </div>`;
        })
        .join("")}
    </div>
  </div>`;
}

function updateItemStatus(orderId, menuItemId, newStatus) {
  const o = DB.orders.find((x) => x.id === orderId);
  if (!o) return;
  const item = o.items.find((i) => i.menu_item_id === menuItemId);
  if (item) item.status = newStatus;
  // Check if all items are ready
  if (o.items.every((i) => i.status === "ready")) {
    o.status = "ready";
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

function renderKitchenHistory() {
  const done = DB.orders.filter((o) => o.status === "completed").slice(0, 10);
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
        <span class="badge badge-completed">${getStatusLabel(o.status)}</span>
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
    <span class="badge badge-completed">Selesai</span>
  </div>
  <div class="text-xs mb-4" style="color:var(--muted)">
    <i class="fas ${o.order_type === 'dine-in' ? 'fa-chair' : 'fa-motorcycle'} mr-1"></i>${getOrderTypeName(o.order_type)}
    ${t ? ' — Meja ' + t.number : ''}
    ${o.delivery_address ? '<br>' + o.delivery_address : ''}
  </div>
  <div class="space-y-2 mb-4">
    ${o.items.map(i => {
            const mi = getMenuItem(i.menu_item_id); return mi ? `
    <div class="flex justify-between text-sm">
      <span>${mi.name} x${i.quantity} ${i.notes ? '<span style="color:var(--muted)">(' + i.notes + ')</span>' : ''}</span>
    </div>`: ''
        }).join('')}
  </div>
  <div class="border-t pt-3" style="border-color:var(--border)">
    <div class="flex justify-between text-xs mt-1" style="color:var(--muted)"><span>Waktu Selesai</span><span>${formatTime(o.created_at)}</span></div>
  </div>
  <button onclick="closeModal()" class="btn-secondary w-full mt-4 text-center">Tutup</button>
</div>
`);
}
