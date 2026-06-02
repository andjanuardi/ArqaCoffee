// ============================================================
// PLAYGROUND — TICKETS VIEW
// ============================================================

function renderPlaygroundTickets() {
  const tickets = (DB.playgroundTickets || [])
    .filter((t) => t.status === "active")
    .sort((a, b) => new Date(a.end_time) - new Date(b.end_time));
  const completed = (DB.playgroundTickets || [])
    .filter((t) => t.status !== "active")
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const now = Date.now();

  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Tiket Aktif</h2>
    ${tickets.length === 0 ? '<div class="text-center py-12"><i class="fas fa-ticket text-4xl mb-3" style="color:var(--border)"></i><p style="color:var(--muted)">Tidak ada tiket aktif</p></div>' : ""}
    <div class="space-y-3 mb-8">
      ${tickets
        .map((t) => {
          const start = new Date(t.start_time).getTime();
          const end = new Date(t.end_time).getTime();
          const total = end - start;
          const remaining = end - now;
          const elapsed = Math.max(0, Math.min(100, ((now - start) / total) * 100));
          const isUrgent = remaining > 0 && remaining < 600000;
          const isExpired = remaining <= 0;
          const barColor = isExpired ? "var(--danger)" : isUrgent ? "var(--warning)" : "var(--success)";
          return `
        <div class="card ${isUrgent ? "animate-breathe" : ""}" onclick="showPlaygroundTicketDetail('${t.id}')" style="cursor:pointer;${isExpired ? "border-color:var(--danger)" : isUrgent ? "border-color:var(--warning)" : ""}">
          <div class="flex justify-between items-start mb-2">
            <div>
              <span class="font-bold text-sm">${t.customer_name}</span>
              <span class="badge ${isExpired ? "badge-pending" : "badge-cooking"} ml-2">${isExpired ? "Over Time" : "Aktif"}</span>
            </div>
            <span class="font-bold text-sm" style="color:var(--accent)">${formatCurrency(t.total_amount)}</span>
          </div>
          <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs mb-3" style="color:var(--muted)">
            <span><i class="fas fa-child mr-1"></i>${t.children.map((c) => c.name).join(", ")}</span>
            ${t.companions && t.companions.length > 0 ? `<span><i class="fas fa-user mr-1"></i>${t.companions.map((c) => c.name).join(", ")}</span>` : t.companion_count > 0 ? `<span><i class="fas fa-user mr-1"></i>${t.companion_count} pendamping</span>` : ""}
            <span><i class="fas fa-clock mr-1"></i>${t.hours} jam</span>
          </div>
          ${t.items.length > 0 ? `<div class="text-xs mb-3" style="color:var(--muted)"><i class="fas fa-utensils mr-1"></i>${t.items.map((i) => i.name + " x" + i.quantity).join(", ")}</div>` : ""}
          <div class="time-bar-container mb-3">
            <div class="flex justify-between text-xs mb-1" style="color:var(--muted)">
              <span>${formatTime(new Date(t.start_time))}</span>
              <span style="color:${barColor};font-weight:600">${isExpired ? "-" + formatRemaining(Math.abs(remaining)) : formatRemaining(remaining)}</span>
              <span>${formatTime(new Date(t.end_time))}</span>
            </div>
            <div class="time-bar-bg">
              <div class="time-bar-fill" style="width:${Math.min(100, elapsed)}%;background:${barColor}"></div>
            </div>
          </div>
          <div class="flex gap-2">
            <button onclick="event.stopPropagation();completePlaygroundTicket('${t.id}')" class="btn-primary btn-sm flex-1 text-center"><i class="fas fa-check mr-1"></i>Selesaikan</button>
            <button onclick="event.stopPropagation();confirmCancelPlaygroundTicket('${t.id}')" class="btn-sm flex-1 text-center" style="background:rgba(231,76,60,.1);color:var(--danger);border:none;border-radius:10px;padding:8px"><i class="fas fa-times mr-1"></i>Batalkan</button>
          </div>
        </div>`;
        })
        .join("")}
    </div>

    ${
      completed.length > 0
        ? `
    <h2 class="font-display text-lg font-bold mb-3" style="color:var(--muted)">Riwayat</h2>
    <div class="space-y-2">
      ${completed
        .slice(0, 10)
        .map(
          (t) => `
        <div class="card flex items-center justify-between" onclick="showPlaygroundTicketDetail('${t.id}')" style="opacity:.7;cursor:pointer">
          <div>
            <span class="font-semibold text-sm">${t.customer_name}</span>
            <span class="badge ${t.status === "completed" ? "badge-completed" : "badge-pending"} ml-2">${t.status === "completed" ? "Selesai" : "Dibatalkan"}</span>
            <div class="text-xs mt-1" style="color:var(--muted)">${t.children.map((c) => c.name).join(", ")} — ${t.hours} jam${t.cancel_reason ? ' <span style="color:var(--danger)">· ' + t.cancel_reason + '</span>' : ""}</div>
          </div>
          <div class="text-right">
            <div class="font-bold text-sm" style="color:var(--accent)">${formatCurrency(t.total_amount)}</div>
            <div class="text-xs" style="color:var(--muted)">${t.payment_status === "paid" ? "Lunas" : "Belum"}</div>
          </div>
        </div>`,
        )
        .join("")}
    </div>`
        : ""
    }
  </div>`;
}

// ============================================================
// COMPLETE / CANCEL TICKET
// ============================================================

function completePlaygroundTicket(id) {
  const t = (DB.playgroundTickets || []).find((x) => x.id === id);
  if (!t) return;
  t.status = "completed";
  if (t.payment_status === "unpaid") {
    t.payment_status = "paid";
    t.payment_method = "cash";
  }
  showToast("Tiket " + t.customer_name + " selesai", "success");
  render();
}

function confirmCancelPlaygroundTicket(id) {
  const t = (DB.playgroundTickets || []).find((x) => x.id === id);
  if (!t) return;
  showModal(`
    <div class="text-center">
      <div class="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style="background:rgba(231,76,60,.15)">
        <i class="fas fa-times-circle text-3xl" style="color:var(--danger)"></i>
      </div>
      <h3 class="font-display text-lg font-bold mb-2">Batalkan Tiket</h3>
      <p class="text-sm mb-4" style="color:var(--muted)">Yakin ingin membatalkan tiket atas nama <span class="font-semibold" style="color:var(--text)">${t.customer_name}</span>? Silakan pilih alasan.</p>
      <div class="text-left mb-6">
        <label class="text-xs font-semibold mb-2 block" style="color:var(--muted)">Alasan Pembatalan</label>
        <select id="pg-cancel-reason" class="input-field text-sm w-full mb-3" style="background:var(--bg2);" onchange="document.getElementById('pg-cancel-other-container').style.display = this.value === 'Lainnya' ? 'block' : 'none'">
          <option value="">-- Pilih Alasan --</option>
          <option value="Anak sudah selesai bermain">Anak sudah selesai bermain</option>
          <option value="Anak rewel/menangis">Anak rewel/menangis</option>
          <option value="Pindah ke tempat lain">Pindah ke tempat lain</option>
          <option value="Waktu sudah habis">Waktu sudah habis</option>
          <option value="Lainnya">Lainnya...</option>
        </select>
        <div id="pg-cancel-other-container" style="display:none;">
          <input type="text" id="pg-cancel-other" class="input-field text-sm w-full" placeholder="Ketik alasan spesifik...">
        </div>
      </div>
      <div class="flex gap-3">
        <button onclick="closeModal()" class="btn-secondary btn-sm flex-1 text-center">Kembali</button>
        <button onclick="cancelPlaygroundTicket('${id}')" class="btn-sm flex-1 text-center" style="background:var(--danger);color:#fff;border:none;border-radius:10px;padding:10px"><i class="fas fa-times mr-1"></i>Ya, Batalkan</button>
      </div>
    </div>
  `);
}

function cancelPlaygroundTicket(id) {
  const t = (DB.playgroundTickets || []).find((x) => x.id === id);
  if (!t) return;
  const reasonEl = document.getElementById("pg-cancel-reason");
  let reason = reasonEl ? reasonEl.value : "";
  if (reason === "Lainnya") {
    const otherEl = document.getElementById("pg-cancel-other");
    reason = otherEl ? otherEl.value.trim() : "";
  }
  if (!reason) {
    showToast("Silakan pilih alasan pembatalan", "warning");
    return;
  }
  closeModal();
  t.status = "cancelled";
  t.cancel_reason = reason;
  showToast("Tiket " + t.customer_name + " dibatalkan", "info");
  render();
}

// ============================================================
// TICKET DETAIL MODAL
// ============================================================

function showPlaygroundTicketDetail(id) {
  const t = (DB.playgroundTickets || []).find((x) => x.id === id);
  if (!t) return;
  const socksCount = (t.socks_per_child || []).filter(Boolean).length;
  const childNames = t.children.map((c) => c.name).join(", ");
  const companionNames = t.companions && t.companions.length > 0
    ? t.companions.map((c) => c.name).join(", ")
    : t.companion_count > 0 ? t.companion_count + " org" : "";
  const statusBadge = t.status === "active"
    ? '<span class="badge badge-cooking">Aktif</span>'
    : t.status === "completed"
      ? '<span class="badge badge-completed">Selesai</span>'
      : '<span class="badge badge-pending">Dibatalkan</span>';
  const methodLabel = t.payment_method === "qris" ? "QRIS"
    : t.payment_method === "cash" ? "Tunai" : t.payment_method || "-";
  const isCancelled = t.status === "cancelled";

  showModal(`
    <div>
      <div class="flex justify-between items-start mb-3">
        <h3 class="font-display text-lg font-bold">Tiket #${t.id.slice(-4).toUpperCase()}</h3>
        ${statusBadge}
      </div>

      <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs mb-4" style="color:var(--muted)">
        <span><i class="fas fa-user mr-1"></i>${t.customer_name}</span>
        <span><i class="fas fa-child mr-1"></i>${t.children.length} anak (${childNames})</span>
        ${companionNames ? '<span><i class="fas fa-user-friends mr-1"></i>' + companionNames + '</span>' : ""}
        <span><i class="fas fa-clock mr-1"></i>${formatTime(new Date(t.start_time))} — ${formatTime(new Date(t.end_time))} (${t.hours} jam)</span>
      </div>

      ${isCancelled && t.cancel_reason ? '<div class="card mb-4 text-sm" style="background:rgba(231,76,60,.08);border:1px solid rgba(231,76,60,.2)"><i class="fas fa-ban mr-1" style="color:var(--danger)"></i><strong>Dibatalkan:</strong> ' + t.cancel_reason + '</div>' : ""}

      <div style="border:1px solid var(--border);border-radius:12px;padding:12px;margin-bottom:12px">
        <div class="text-xs font-semibold mb-2" style="color:var(--accent)">RINCIAN TIKET MASUK</div>
        <div class="flex justify-between text-sm mb-1">
          <span>${t.children.length} anak × ${formatCurrency(PG_CHILD_PRICE)}/jam × ${t.hours} jam</span>
          <span>${formatCurrency(PG_CHILD_PRICE * t.children.length * t.hours)}</span>
        </div>
        ${t.companion_count > 0 ? `<div class="flex justify-between text-sm mb-1">
          <span>${t.companion_count} pendamping × ${formatCurrency(PG_COMPANION_PRICE)}/jam × ${t.hours} jam</span>
          <span>${formatCurrency(PG_COMPANION_PRICE * t.companion_count * t.hours)}</span>
        </div>` : ""}
        ${socksCount > 0 ? `<div class="flex justify-between text-sm mb-1">
          <span>Kaos kaki ${socksCount} pasang × ${formatCurrency(PG_SOCKS_PRICE)}</span>
          <span>${formatCurrency(t.socks_total)}</span>
        </div>` : ""}
        <div class="border-t pt-2 mt-2 flex justify-between font-bold text-sm" style="border-color:var(--border)">
          <span>Subtotal Tiket</span>
          <span style="color:var(--accent)">${formatCurrency(t.subtotal)}</span>
        </div>
      </div>

      ${t.items && t.items.length > 0 ? `
      <div style="border:1px solid var(--border);border-radius:12px;padding:12px;margin-bottom:12px">
        <div class="text-xs font-semibold mb-2" style="color:var(--accent)">PESANAN</div>
        ${t.items.map((i) => `
        <div class="flex justify-between text-sm mb-1">
          <span>${i.name} ×${i.quantity}</span>
          <span>${formatCurrency(i.unit_price * i.quantity)}</span>
        </div>`).join("")}
      </div>` : ""}

      <div style="border:1px solid var(--border);border-radius:12px;padding:12px;margin-bottom:16px">
        <div class="flex justify-between text-sm mb-1"><span>Subtotal Tiket</span><span>${formatCurrency(t.subtotal)}</span></div>
        ${t.socks_total > 0 ? `<div class="flex justify-between text-sm mb-1"><span>Kaos Kaki</span><span>${formatCurrency(t.socks_total)}</span></div>` : ""}
        ${t.items_total > 0 ? `<div class="flex justify-between text-sm mb-1"><span>Pesanan</span><span>${formatCurrency(t.items_total)}</span></div>` : ""}
        <div class="border-t pt-2 mt-2 flex justify-between font-bold" style="border-color:var(--border)">
          <span>Total</span>
          <span style="color:var(--accent);font-size:16px">${formatCurrency(t.total_amount)}</span>
        </div>
        <div class="flex justify-between text-xs mt-2" style="color:var(--muted)">
          <span>Pembayaran</span>
          <span>${methodLabel}</span>
        </div>
        <div class="flex justify-between text-xs" style="color:var(--muted)">
          <span>Status Bayar</span>
          <span class="badge ${t.payment_status === "paid" ? "badge-paid" : "badge-unpaid"}">${t.payment_status === "paid" ? "Lunas" : "Belum Bayar"}</span>
        </div>
      </div>

      <div class="flex gap-2">
        ${!isCancelled ? `<button onclick="closeModal();printPlaygroundInvoice('${id}')" class="btn-primary flex-1 text-center"><i class="fas fa-print mr-1"></i> Cetak Invoice</button>` : ""}
        <button onclick="closeModal()" class="btn-secondary flex-1 text-center">Tutup</button>
      </div>
    </div>
  `);
}

// ============================================================
// PRINT INVOICE
// ============================================================

function printPlaygroundInvoice(id) {
  const t = (DB.playgroundTickets || []).find((x) => x.id === id);
  if (!t) return;
  const socksCount = (t.socks_per_child || []).filter(Boolean).length;
  const childNames = t.children.map((c) => c.name).join(", ");
  const companionNames = t.companions && t.companions.length > 0
    ? t.companions.map((c) => c.name).join(", ")
    : t.companion_count > 0 ? t.companion_count + " orang" : "";
  const methodLabel = t.payment_method === "qris" ? "QRIS"
    : t.payment_method === "cash" ? "Tunai" : t.payment_method || "-";

  const win = window.open("", "_blank");
  win.document.write(`
    <html><head>
      <title>Invoice Tiket #${t.id.slice(-4).toUpperCase()}</title>
      <style>
        body { font-family:'Segoe UI',sans-serif; padding:40px; max-width:400px; margin:0 auto; }
        .header { text-align:center; margin-bottom:24px; }
        .header h1 { font-size:22px; margin:0; }
        .header p { font-size:12px; color:#666; margin:2px 0; }
        .divider { border-top:2px dashed #333; margin:16px 0; }
        .item { display:flex; justify-content:space-between; font-size:13px; padding:4px 0; }
        .totals { margin-top:12px; font-size:13px; }
        .totals > div { display:flex; justify-content:space-between; padding:2px 0; }
        .footer { text-align:center; font-size:11px; color:#888; margin-top:24px; }
        .section-label { font-size:11px; font-weight:bold; color:#e07a3a; margin:8px 0 4px; text-transform:uppercase; }
        @media print { body { padding:20px; } }
      </style>
    </head><body>
      <div class="header">
        <h1>ARQA Coffee</h1>
        <p>Playground — Tiket Masuk</p>
        <p>#${t.id.slice(-4).toUpperCase()}</p>
        <p>${new Date(t.created_at).toLocaleString("id-ID")}</p>
      </div>
      <div class="divider"></div>
      <p style="font-size:13px"><strong>Pelanggan:</strong> ${t.customer_name}</p>
      <p style="font-size:13px">Anak: ${childNames} (${t.children.length} anak)</p>
      ${companionNames ? '<p style="font-size:13px">Pendamping: ' + companionNames + "</p>" : ""}
      <p style="font-size:13px">Durasi: ${formatTime(new Date(t.start_time))} — ${formatTime(new Date(t.end_time))} (${t.hours} jam)</p>
      <div class="divider"></div>
      <div class="section-label">Tiket Masuk</div>
      <div class="item"><span>${t.children.length} anak × ${formatCurrency(PG_CHILD_PRICE)}/jam</span><span>${formatCurrency(PG_CHILD_PRICE * t.children.length * t.hours)}</span></div>
      ${t.companion_count > 0 ? '<div class="item"><span>' + t.companion_count + " pendamping × " + formatCurrency(PG_COMPANION_PRICE) + "/jam</span><span>" + formatCurrency(PG_COMPANION_PRICE * t.companion_count * t.hours) + "</span></div>" : ""}
      ${socksCount > 0 ? '<div class="item"><span>Kaos kaki ' + socksCount + " pasang</span><span>" + formatCurrency(t.socks_total) + "</span></div>" : ""}
      <div class="item" style="font-weight:bold"><span>Subtotal Tiket</span><span>${formatCurrency(t.subtotal)}</span></div>
      ${t.items && t.items.length > 0 ? `
      <div class="section-label">Pesanan</div>
      ${t.items.map((i) => '<div class="item"><span>' + i.name + " ×" + i.quantity + "</span><span>" + formatCurrency(i.unit_price * i.quantity) + "</span></div>").join("")}` : ""}
      <div class="divider"></div>
      <div class="totals">
        <div><span>Subtotal Tiket</span><span>${formatCurrency(t.subtotal)}</span></div>
        ${t.socks_total > 0 ? '<div><span>Kaos Kaki</span><span>' + formatCurrency(t.socks_total) + "</span></div>" : ""}
        ${t.items_total > 0 ? '<div><span>Pesanan</span><span>' + formatCurrency(t.items_total) + "</span></div>" : ""}
        <div style="font-weight:bold;font-size:15px"><span>Total</span><span>${formatCurrency(t.total_amount)}</span></div>
        <div style="margin-top:8px"><span>Pembayaran</span><span>${methodLabel}</span></div>
        <div><span>Status</span><span>${t.payment_status === "paid" ? "Lunas" : "Belum Bayar"}</span></div>
      </div>
      <div class="divider"></div>
      <div class="footer">Terima kasih telah bermain di ARQA Coffee Playground</div>
      <script>window.print()</script>
    </body></html>
  `);
  win.document.close();
}
