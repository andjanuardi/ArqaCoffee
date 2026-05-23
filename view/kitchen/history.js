// ============================================================
// KITCHEN VIEW — Reject & History
// ============================================================
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
          (o) => {
            const t = o.table_id ? getTable(o.table_id) : null;
            const itemsStr = (o.items || []).map(i => {
              const mi = getMenuItem(i.menu_item_id);
              return mi ? mi.name + ' x' + i.quantity : '';
            }).filter(Boolean).join(', ');
            return `
      <div class="card cursor-pointer hover:scale-[1.02] transition-transform" onclick="showKitchenOrderDetail('${o.id}')">
        <div class="flex justify-between items-start mb-1">
          <div class="flex items-center gap-2">
            <span class="font-semibold text-sm">#${o.id.slice(-5).toUpperCase()}</span>
            <span class="text-xs" style="color:var(--muted)">${getOrderTypeName(o.order_type)}</span>
          </div>
          <span class="badge ${o.status === 'rejected' ? 'badge-danger' : 'badge-completed'}">${o.status === 'rejected' ? 'Ditolak' : getStatusLabel(o.status)}</span>
        </div>
        <div class="text-xs mb-1" style="color:var(--muted)">
          ${o.customer_name ? '<i class="fas fa-user mr-1"></i>' + o.customer_name : '<i class="fas fa-chair mr-1"></i>Walk-in'}${t ? ' — Meja ' + t.number : ''}
        </div>
        <div class="text-xs truncate" style="color:var(--muted)">${itemsStr || '-'}</div>
        <div class="flex justify-between items-center mt-1">
          <span class="text-xs" style="color:var(--muted)"><i class="far fa-clock mr-1"></i>${formatTime(o.created_at)}</span>
          <span class="text-sm font-semibold" style="color:var(--accent)">${formatCurrency(o.total_amount)}</span>
        </div>
      </div>`;
          },
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
