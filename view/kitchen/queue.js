// ============================================================
// KITCHEN VIEW — Queue
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
    o.accepted === true && ["pending", "cooking", "ready"].includes(o.status),
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


