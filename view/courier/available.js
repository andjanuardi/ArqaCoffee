// ============================================================
// COURIER VIEW — Available & Reject
// ============================================================
function renderCourierView() {
  const tab = State.currentTab.courier || "available";
  if (tab === "available") return renderCourierAvailable();
  if (tab === "active") return renderCourierActive();
  if (tab === "history") return renderCourierHistory();
  if (tab === "profile") return renderGenericProfile();
  return renderCourierAvailable();
}

function renderCourierAvailable() {
  const available = DB.orders.filter(
    (o) =>
      o.order_type === "delivery" &&
      o.status === "ready" &&
      (!o.courier_id || o.courier_id === State.currentUser.id),
  );
  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Pesanan Tersedia</h2>
    <div class="space-y-3">
      ${available.length === 0 ? '<div class="text-center py-12"><i class="fas fa-box-open text-4xl mb-3" style="color:var(--border)"></i><p style="color:var(--muted)">Belum ada pesanan siap diantar</p></div>' : ""}
      ${available
        .map(
          (o) => `
      <div class="card">
        <div class="flex justify-between items-start mb-2">
          <span class="font-bold">#${o.id.slice(-5).toUpperCase()}</span>
          <span class="font-bold" style="color:var(--accent)">${formatCurrency(o.total_amount)}</span>
        </div>
        <div class="text-sm mb-1"><i class="fas fa-map-marker-alt mr-1" style="color:var(--accent)"></i>${o.delivery_address}</div>
        ${o.delivery_detail ? `<div class="text-xs mb-1" style="color:var(--muted)"><i class="fas fa-info-circle mr-1"></i>${o.delivery_detail}</div>` : ""}
        <div class="text-xs mb-3" style="color:var(--muted)">${o.items
          .map((i) => {
            const mi = getMenuItem(i.menu_item_id);
            return mi ? mi.name + " x" + i.quantity : "";
          })
          .join(", ")}</div>
        <div class="flex gap-2">
          <button onclick="rejectCourierOrder('${o.id}')" class="btn-sm flex-1 text-center" style="background:rgba(231,76,60,.1);color:var(--danger);border:none;padding:10px;border-radius:10px;font-size:13px;font-weight:600"><i class="fas fa-times mr-1"></i>Tolak</button>
          <button onclick="acceptDelivery('${o.id}')" class="btn-primary flex-1 text-center">Ambil Pesanan</button>
        </div>
      </div>`,
        )
        .join("")}
    </div>
  </div>`;
}

function rejectCourierOrder(orderId) {
  const o = DB.orders.find((x) => x.id === orderId);
  if (!o) return;
  showModal(`
    <div class="text-center">
      <div class="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl" style="background:rgba(231,76,60,.1);color:var(--danger)">
        <i class="fas fa-times-circle"></i>
      </div>
      <h3 class="font-display text-lg font-bold mb-2">Tolak Pesanan #${o.id.slice(-5).toUpperCase()}?</h3>
      <p class="text-sm mb-4" style="color:var(--muted)">Pilih alasan menolak pesanan ini.</p>
      <div class="text-left mb-4">
        <label class="text-xs font-semibold mb-2 block" style="color:var(--muted)">Alasan Penolakan</label>
        <select id="courier-reject-reason" class="input-field text-sm w-full mb-3" style="background:var(--bg2);" onchange="document.getElementById('courier-reject-other-container').style.display = this.value === 'Lainnya' ? 'block' : 'none'">
          <option value="">-- Pilih Alasan --</option>
          <option value="Jarak terlalu jauh">Jarak terlalu jauh</option>
          <option value="Sedang sibuk">Sedang sibuk</option>
          <option value="Kendala kendaraan">Kendala kendaraan</option>
          <option value="Alamat tidak jelas">Alamat tidak jelas</option>
          <option value="Pesanan terlalu banyak">Pesanan terlalu banyak</option>
          <option value="Lainnya">Lainnya...</option>
        </select>
        <div id="courier-reject-other-container" style="display:none;">
          <input type="text" id="courier-reject-other" class="input-field text-sm w-full" placeholder="Ketik alasan spesifik di sini...">
        </div>
      </div>
      <div class="flex gap-3">
        <button onclick="closeModal()" class="btn-secondary flex-1">Batal</button>
        <button onclick="confirmRejectCourierOrder('${orderId}')" class="btn-primary flex-1" style="background:var(--danger);border-color:var(--danger);">Tolak Pesanan</button>
      </div>
    </div>
  `);
}
