// ============================================================
// CUSTOMER VIEW — Cancel Order
// ============================================================
function cancelOrder(id) {
  showModal(`
    <div class="text-center">
      <div class="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl" style="background:rgba(231,76,60,.1);color:var(--danger)">
        <i class="fas fa-exclamation-triangle"></i>
      </div>
      <h3 class="font-display text-lg font-bold mb-2">Batalkan Pesanan?</h3>
      <p class="text-sm mb-4" style="color:var(--muted)">Apakah Anda yakin ingin membatalkan pesanan ini? Silakan pilih alasan pembatalan.</p>
      
      <div class="text-left mb-6">
        <label class="text-xs font-semibold mb-2 block" style="color:var(--muted)">Alasan Pembatalan</label>
        <select id="cancel-reason" class="input-field text-sm w-full mb-3" style="background:var(--bg2);" onchange="document.getElementById('cancel-reason-other-container').style.display = this.value === 'Lainnya' ? 'block' : 'none'">
          <option value="">-- Pilih Alasan --</option>
          <option value="Ingin mengubah pesanan">Ingin mengubah pesanan</option>
          <option value="Waktu tunggu terlalu lama">Waktu tunggu terlalu lama</option>
          <option value="Salah pilih lokasi/meja">Salah pilih lokasi/meja</option>
          <option value="Tidak jadi pesan">Tidak jadi pesan</option>
          <option value="Lainnya">Lainnya...</option>
        </select>
        
        <div id="cancel-reason-other-container" style="display:none;">
          <input type="text" id="cancel-reason-other" class="input-field text-sm w-full" placeholder="Ketik alasan spesifik di sini...">
        </div>
      </div>

      <div class="flex gap-3">
        <button onclick="closeModal()" class="btn-secondary flex-1">Batal</button>
        <button onclick="confirmCancelOrder('${id}')" class="btn-primary flex-1" style="background:var(--danger);border-color:var(--danger);">Hapus Pesanan</button>
      </div>
    </div>
  `);
}

function confirmCancelOrder(id) {
  const reasonEl = document.getElementById("cancel-reason");
  let reason = reasonEl ? reasonEl.value : "";

  if (reason === "Lainnya") {
    const otherEl = document.getElementById("cancel-reason-other");
    reason = otherEl ? otherEl.value.trim() : "";
  }

  if (!reason) {
    showToast("Silakan lengkapi alasan pembatalan", "warning");
    return;
  }

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

  addNotification({
    title: 'Pesanan Dibatalkan',
    message: '#' + o.id.slice(-5).toUpperCase() + ' dibatalkan oleh pelanggan: ' + reason,
    type: 'warning',
    icon: 'fa-ban',
    targetRoles: ['cashier', 'kitchen'],
    relatedOrderId: o.id
  });
  DB.orders.splice(idx, 1);
  showToast("Pesanan berhasil dibatalkan dan dihapus", "success");
  closeModal();
  render();
}
