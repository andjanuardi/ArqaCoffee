// ============================================================
// CASHIER VIEW — Cancel & Edit Order
// ============================================================
function cancelCashierOrder(id) {
  showModal(`
    <div class="text-center">
      <div class="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl" style="background:rgba(231,76,60,.1);color:var(--danger)">
        <i class="fas fa-exclamation-triangle"></i>
      </div>
      <h3 class="font-display text-lg font-bold mb-2">Batalkan Pesanan?</h3>
      <p class="text-sm mb-4" style="color:var(--muted)">Apakah Anda yakin ingin membatalkan pesanan ini?</p>

      <div class="text-left mb-6">
        <label class="text-xs font-semibold mb-2 block" style="color:var(--muted)">Alasan Pembatalan</label>
        <select id="cashier-cancel-reason" class="input-field text-sm w-full mb-3" style="background:var(--bg2);" onchange="document.getElementById('cashier-cancel-other-container').style.display = this.value === 'Lainnya' ? 'block' : 'none'">
          <option value="">-- Pilih Alasan --</option>
          <option value="Pelanggan tidak jadi pesan">Pelanggan tidak jadi pesan</option>
          <option value="Pesanan duplikat">Pesanan duplikat</option>
          <option value="Pesanan salah">Pesanan salah</option>
          <option value="Stok bahan habis">Stok bahan habis</option>
          <option value="Pelanggan sudah pergi">Pelanggan sudah pergi</option>
          <option value="Lainnya">Lainnya...</option>
        </select>
        <div id="cashier-cancel-other-container" style="display:none;">
          <input type="text" id="cashier-cancel-reason-other" class="input-field text-sm w-full" placeholder="Ketik alasan spesifik di sini...">
        </div>
      </div>

      <div class="flex gap-3">
        <button onclick="closeModal()" class="btn-secondary flex-1">Tidak</button>
        <button onclick="confirmCancelCashierOrder('${id}')" class="btn-primary flex-1" style="background:var(--danger);border-color:var(--danger);">Ya, Batalkan</button>
      </div>
    </div>
  `);
}

async function confirmCancelCashierOrder(id) {
  var reasonEl = document.getElementById("cashier-cancel-reason");
  var reason = reasonEl ? reasonEl.value : "";
  if (reason === "Lainnya") {
    var otherEl = document.getElementById("cashier-cancel-reason-other");
    reason = otherEl ? otherEl.value.trim() : "";
  }
  if (!reason) {
    showToast("Silakan pilih alasan pembatalan", "warning");
    return;
  }

  try {
    var ordersData = await API.getOrders();
    var o = ordersData.find(function(x) { return x.id === id; });
    if (!o) {
      closeModal();
      return;
    }

    if (o.status !== "pending") {
      showToast(
        "Pesanan tidak dapat dibatalkan karena sudah diproses",
        "warning",
      );
      closeModal();
      return;
    }

    if (o.order_type === "dine-in" && o.table_id) {
      var allOrdersData = await API.getOrders();
      var hasOtherOrders = allOrdersData.some(
        function(x) {
          return x.id !== id &&
            x.table_id === o.table_id &&
            x.status !== "completed" &&
            x.status !== "cancelled" &&
            x.status !== "rejected";
        }
      );
      if (!hasOtherOrders) {
        await API.updateTable(o.table_id, { status: "available" });
      }
    }

    var customer = getUser(o.user_id);
    if (customer) {
      addNotification({
        title: 'Pesanan Dibatalkan',
        message: '#' + o.id.slice(-5).toUpperCase() + ' — Pesanan Anda dibatalkan oleh kasir. Alasan: ' + reason,
        type: 'order',
        icon: 'fa-ban',
        targetRoles: ['customer', 'kitchen', 'admin', 'manager'],
        relatedOrderId: o.id
      });
    }

    await API.updateOrder(id, {
      status: "cancelled",
      reject_reason: reason
    });

    showToast("Pesanan berhasil dibatalkan", "success");
    closeModal();
    render();
  } catch (e) {
    console.error(e);
    showToast("Gagal membatalkan pesanan", "error");
  }
}

async function editCashierOrder(id) {
  try {
    var ordersData = await API.getOrders();
    var o = ordersData.find(function(x) { return x.id === id; });
    if (!o) { showToast("Pesanan tidak ditemukan", "error"); return; }
    if (o.status !== "pending") {
      showToast("Pesanan yang sudah diproses tidak bisa diedit", "warning");
      return;
    }

    State.cashierCart = o.items.filter(function(i) { return i.status !== "rejected"; }).map(function(i) {
      var m = getMenuItem(i.menu_item_id);
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
  } catch (e) {
    console.error(e);
    showToast("Gagal memuat data pesanan", "error");
  }
}
