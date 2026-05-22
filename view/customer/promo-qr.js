// ============================================================
// CUSTOMER VIEW — Promo & QR
// ============================================================
function showPromoDetail(promoId) {
  const p = DB.promos.find((x) => x.id === promoId);
  if (!p) return;
  const discLabel = p.discount_type === 'fixed' ? formatCurrency(p.discount_value) : p.discount_value + '%';
  const imgHtml = p.image ? `<img src="${p.image}" class="w-full h-40 object-cover rounded-xl mb-4" onerror="this.src='https://picsum.photos/seed/${p.id}/400/200'">` : `<div class="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl" style="background:${p.color || '#E07A3A'};color:#fff"><i class="fas ${p.icon || 'fa-tag'}"></i></div>`;
  const includedMenus = (p.menu_ids || []).map(id => DB.menuItems.find(m => m.id === id)).filter(Boolean);
  const isActive = State.activePromoId === p.id;
  showModal(`
    <div class="text-center">
      ${imgHtml}
      <h3 class="font-display text-xl font-bold mb-2">${p.title}</h3>
      <p class="text-sm mb-4" style="color:var(--muted)">${p.desc}</p>
      <div class="flex justify-center gap-4 mb-4">
        <div class="stat-card text-center">
          <div class="text-xs" style="color:var(--muted)">Diskon</div>
          <div class="text-lg font-bold mt-1" style="color:var(--accent)">${discLabel}</div>
        </div>
        ${p.start_date ? `<div class="stat-card text-center">
          <div class="text-xs" style="color:var(--muted)">Periode</div>
          <div class="text-sm font-bold mt-1">${formatDate(p.start_date)}</div>
          <div class="text-xs" style="color:var(--muted)">- ${p.end_date ? formatDate(p.end_date) : '...'}</div>
        </div>` : ''}
      </div>
      ${includedMenus.length ? `<div class="text-left mb-4 p-3 rounded-xl" style="background:var(--bg2)">
        <div class="text-xs font-semibold mb-2" style="color:var(--muted)">Menu yang Mendapat Diskon:</div>
        <div class="space-y-2">
          ${includedMenus.map(m => `
            <div class="flex items-center gap-2 text-sm">
              <img src="${m.image}" class="w-8 h-8 rounded-lg object-cover" onerror="this.src='https://picsum.photos/seed/${m.id}/60/60'">
              <span class="flex-1 text-left">${m.name}</span>
              <span style="color:var(--accent);font-weight:600">${discLabel}</span>
            </div>`).join('')}
        </div>
      </div>` : '<div class="text-left mb-4 p-3 rounded-xl" style="background:var(--bg2);font-size:12px;color:var(--muted)">Berlaku untuk semua menu</div>'}
      <div class="text-left mb-4 p-3 rounded-xl" style="background:var(--bg2)">
        <div class="text-xs font-semibold mb-2" style="color:var(--muted)">Syarat & Ketentuan:</div>
        <ul class="text-xs space-y-1" style="color:var(--muted)">
          ${(p.terms||[]).map((t) => `<li class="flex items-start gap-2"><i class="fas fa-check-circle mt-0.5" style="color:var(--success);font-size:10px"></i><span>${t}</span></li>`).join("")}
        </ul>
      </div>
      ${isActive ? `<button onclick="closeModal(); State.activePromoId=null; showToast('Promo dibatalkan','info'); render()" class="btn-sm w-full text-center" style="background:rgba(231,76,60,.15);color:var(--danger);border:1px solid rgba(231,76,60,.3);border-radius:10px;padding:10px;cursor:pointer">Batalkan Promo</button>` : isPromoUsedByUser(p.id) ? `<button disabled class="btn-sm w-full text-center" style="background:rgba(100,100,100,.15);color:var(--muted);border:1px solid rgba(100,100,100,.3);border-radius:10px;padding:10px;cursor:not-allowed"><i class="fas fa-check-circle mr-1"></i>Sudah Digunakan</button>` : `<button onclick="applyPromo('${p.id}')" class="btn-primary w-full text-center">Gunakan Promo</button>`}
    </div>
  `);
}

function applyPromo(promoId) {
  const p = DB.promos.find(x => x.id === promoId);
  if (!p) return;
  if (isPromoUsedByUser(promoId)) { showToast('Promo sudah pernah digunakan', 'warning'); return; }
  State.activePromoId = p.id;
  closeModal();
  showToast(`Promo ${p.title} diterapkan!`, 'success');
  render();
}

function startQRScan() {
  showModal(`
    <div class="text-center">
      <h3 class="font-display text-xl font-bold mb-2">Scan QR Code Meja</h3>
      <p class="text-sm mb-6" style="color:var(--muted)">Arahkan kamera ke kode QR di meja Anda</p>
      <div class="qr-scanner-area mb-6 flex items-center justify-center" style="background:rgba(0,0,0,.3)">
        <div class="qr-line"></div>
        <i class="fas fa-qrcode text-5xl" style="color:var(--accent);opacity:.3"></i>
      </div>
      <p class="text-xs mb-4" style="color:var(--muted)">Atau pilih meja secara manual:</p>
      <div class="grid grid-cols-4 gap-3 mb-6">
        ${DB.tables
          .map(
            (
              t,
            ) => `<button class="card text-center py-3 text-sm font-semibold ${t.status === "occupied" ? "opacity-40 cursor-not-allowed" : ""}" onclick="${t.status === "available" ? `selectTable('${t.id}')` : ""}" style="${t.status === "occupied" ? "pointer-events:none" : ""}">
          <i class="fas fa-chair mb-1" style="color:${t.status === "available" ? "var(--success)" : "var(--danger)"}"></i><br>${t.number}
        </button>`,
          )
          .join("")}
      </div>
      <button onclick="closeModal()" class="btn-secondary">Batal</button>
    </div>
  `);
}

function selectTable(tid) {
  State.selectedTable = tid;
  State.orderType = "dine-in";
  const t = getTable(tid);
  if (t) t.status = "occupied";
  closeModal();
  showToast(`Meja ${t?.number} dipilih — silakan pesan!`, "success");
  render();
}

function startDeliveryOrder() {
  State.orderType = "delivery";
  State.selectedTable = null;
  if (selectedPayment === "cash") selectedPayment = "qris";
  showToast("Mode Pesan Antar aktif", "info");
  render();
}
