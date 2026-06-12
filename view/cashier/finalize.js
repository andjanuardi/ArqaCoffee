// ============================================================
// CASHIER VIEW — Finalize Order
// ============================================================
async function submitCashierOrder() {
  if (!State.cashierCart || State.cashierCart.length === 0) return;

  try {
    var ordersData = await API.getOrders();
    var editingOrder = null;
    if (State.editingOrderId) {
      editingOrder = ordersData.find(function(o) { return o.id === State.editingOrderId; });
    }
    var tablesData = await API.getTables();

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
            ${tablesData.map(function(t) {
              var isSelected = editingOrder && editingOrder.table_id === t.id;
              var isOccupied = t.status === "occupied" && !isSelected;
              return '<option value="' + t.id + '" ' + (isSelected ? "selected" : "") + ' ' + (isOccupied ? "disabled" : "") + '>Meja ' + t.number + ' (' + t.capacity + ' orang) ' + (isOccupied ? "(Terisi)" : "") + '</option>';
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
  } catch (e) {
    console.error(e);
    showToast("Gagal memuat data", "error");
  }
}

async function finalizeManualOrder() {
  var info = document.getElementById("manual-customer-info")?.value || "Pelanggan Offline";
  var type = document.getElementById("manual-order-type")?.value || "dine-in";
  var payStatus = document.getElementById("manual-payment-status")?.value || "paid";
  var tableId = document.getElementById("manual-table-id")?.value || null;

  var total = State.cashierCart.reduce(function(s, c) { return s + c.unit_price * c.quantity; }, 0);
  var shippingCost = 0;

  try {
    if (State.editingOrderId) {
      var existingOrders = await API.getOrders();
      var existing = existingOrders.find(function(o) { return o.id === State.editingOrderId; });
      if (existing && existing.shipping_cost) shippingCost = existing.shipping_cost;
    }

    var grandTotal = total + Math.round(calcItemTax(State.cashierCart)) + shippingCost;

    if (type === "dine-in" && tableId) {
      await API.updateTable(tableId, { status: "occupied" });
    }

    if (State.editingOrderId) {
      var allOrders = await API.getOrders();
      var o = allOrders.find(function(x) { return x.id === State.editingOrderId; });
      if (o) {
        if (o.table_id && o.table_id !== tableId) {
          var hasOtherOrders = allOrders.some(
            function(x) {
              return x.id !== o.id &&
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

        var updateData = {
          customer_name: info,
          table_id: type === "dine-in" ? tableId : null,
          order_type: type,
          total_amount: grandTotal,
          payment_method: payStatus === "paid" ? "cash" : "",
          payment_status: payStatus,
          items: State.cashierCart.map(function(c) {
            return {
              menu_item_id: c.menu_item_id,
              quantity: c.quantity,
              unit_price: c.unit_price,
              notes: c.notes || "",
              status: "pending",
            };
          })
        };

        await API.updateOrder(State.editingOrderId, updateData);
        if (payStatus === 'paid') createMitraPayouts(State.editingOrderId);
        showToast("Pesanan berhasil diperbarui!", "success");
      }
      State.editingOrderId = null;
    } else {
      var order = {
        id: genId(),
        user_id: "walk-in",
        customer_name: info,
        table_id: type === "dine-in" ? tableId : null,
        order_type: type,
        status: "pending",
        accepted: true,
        total_amount: grandTotal,
        payment_method: payStatus === "paid" ? "cash" : "",
        payment_status: payStatus,
        created_at: new Date().toISOString(),
        items: State.cashierCart.map(function(c) {
          return {
            menu_item_id: c.menu_item_id,
            quantity: c.quantity,
            unit_price: c.unit_price,
            notes: c.notes || "",
            status: "pending",
          };
        }),
      };

      await API.createOrder(order);
      if (payStatus === 'paid') createMitraPayouts(order.id);
      notifyOrderPlaced(order, info);
      showToast("Pesanan manual berhasil dibuat!", "success");
    }

    State.cashierCart = [];
    State.currentTab.cashier = "orders";
    closeModal();
    render();
  } catch (e) {
    console.error(e);
    showToast("Gagal menyelesaikan pesanan", "error");
  }
}

function filterCashierMenu(q) {
  State.cashierSearchQuery = q;
  var lowerQ = q.toLowerCase();
  document.querySelectorAll(".cashier-menu-item").forEach(function(el) {
    var name = el.getAttribute("data-name").toLowerCase();
    if (name.indexOf(lowerQ) !== -1) el.style.display = "";
    else el.style.display = "none";
  });
}
