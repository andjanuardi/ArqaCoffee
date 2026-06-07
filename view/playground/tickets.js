// ============================================================
// PLAYGROUND — TICKETS VIEW
// ============================================================

function renderPlaygroundTickets() {
  if (!isCheckedIn()) {
    return `
    <div class="animate-fade-up">
      <div class="card text-center py-6" style="border-color:rgba(231,76,60,.2)">
        <i class="fas fa-ticket text-3xl mb-2" style="color:var(--danger)"></i>
        <p class="text-sm font-semibold mb-1" style="color:var(--danger)">Belum Check-in Hari Ini</p>
        <p class="text-xs mb-3" style="color:var(--muted)">Lakukan check-in di profil sebelum mengelola tiket</p>
        <button onclick="showGeoAttendanceModal()" class="btn-primary text-sm px-5 py-2" style="font-size:13px">
          <i class="fas fa-clock mr-1"></i>Check-in
        </button>
      </div>
    </div>`;
  }
  const tickets = (DB.playgroundTickets || [])
    .filter((t) => t.status === "active")
    .sort((a, b) => new Date(a.end_time) - new Date(b.end_time));
  const historyDate = State._pgHistoryDate || new Date().toISOString().split('T')[0];
  const allCompleted = (DB.playgroundTickets || [])
    .filter((t) => t.status !== "active")
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const completed = allCompleted.filter((t) => {
    if (!t.created_at) return false;
    return t.created_at.split('T')[0] === historyDate;
  });
  const completedCount = allCompleted.filter(t => t.status === "completed").length;
  const cancelledCount = allCompleted.filter(t => t.status === "cancelled").length;
  const now = Date.now();
  const overtimeCount = tickets.filter(t => new Date(t.end_time).getTime() <= now).length;

  return `
  <div class="animate-fade-up">
    <div class="flex items-center justify-between mb-4">
      <h2 class="font-display text-xl font-bold">Tiket Aktif</h2>
      <button onclick="switchTab('create')" class="btn-primary btn-sm flex items-center gap-1.5"><i class="fas fa-plus fa-xs"></i> Buat Tiket</button>
    </div>
    <div class="grid grid-cols-4 gap-3 mb-5">
      <div class="stat-card text-center" style="cursor:default">
        <div class="text-lg font-bold" style="color:var(--accent)">${tickets.length}</div>
        <div class="text-[10px]" style="color:var(--muted)">Tiket Aktif</div>
      </div>
      <div class="stat-card text-center" style="cursor:default">
        <div class="text-lg font-bold" style="color:#3498db">${completedCount}</div>
        <div class="text-[10px]" style="color:var(--muted)">Tiket Terjual</div>
      </div>
      <div class="stat-card text-center" style="cursor:default">
        <div class="text-lg font-bold" style="color:var(--danger)">${cancelledCount}</div>
        <div class="text-[10px]" style="color:var(--muted)">Tiket Dibatalkan</div>
      </div>
      <div class="stat-card text-center" style="cursor:default">
        <div class="text-lg font-bold" style="color:var(--danger)">${overtimeCount}</div>
        <div class="text-[10px]" style="color:var(--muted)">Over Time</div>
      </div>
    </div>
    ${tickets.length === 0 ? '<div class="text-center py-12"><i class="fas fa-ticket text-4xl mb-3" style="color:var(--border)"></i><p style="color:var(--muted)">Tidak ada tiket aktif</p></div>' : ""}
    <div class="space-y-3 mb-8">
      ${tickets
        .map((t) => {
          const start = new Date(t.start_time).getTime();
          const end = new Date(t.end_time).getTime();
          const total = end - start;
          const remaining = end - now;
          const elapsed = Math.max(0, Math.min(100, ((now - start) / total) * 100));
          const remainingPct = Math.max(0, Math.min(100, (remaining / total) * 100));
          const isUrgent = remaining > 0 && remaining < 600000;
          const isExpired = remaining <= 0;
          const barColor = isExpired ? "var(--danger)" : isUrgent ? "var(--warning)" : "var(--success)";
          return `
        <div class="card ${isUrgent ? "animate-breathe" : ""}" onclick="showPlaygroundTicketDetail('${t.id}')" style="cursor:pointer;${isExpired ? "border-color:var(--danger)" : isUrgent ? "border-color:var(--warning)" : ""}">
          <div class="flex justify-between items-start mb-2">
            <div>
              <span class="font-bold text-sm">${t.customer_name}</span>
              <span class="badge ${isExpired ? "badge-pending" : "badge-cooking"} ml-2">${isExpired ? "Over Time" : "Aktif"}</span>${t.payment_status === "paid" ? '<span class="badge badge-paid ml-1">Lunas</span>' : ""}
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
              <span class="pg-remaining" data-start="${t.start_time}" data-end="${t.end_time}" data-over="${isExpired}" style="color:${barColor};font-weight:600">${isExpired ? "-" + formatRemaining(Math.abs(remaining)) : formatRemaining(remaining)}</span>
              <span>${formatTime(new Date(t.end_time))}</span>
            </div>
            <div class="time-bar-bg">
              <div class="time-bar-fill" style="width:${remainingPct}%;background:${barColor}"></div>
            </div>
          </div>
          <div class="flex gap-2 mb-2">
            <button onclick="event.stopPropagation();showAddTimeModal('${t.id}')" class="btn-sm flex-1 text-center" style="background:rgba(52,152,219,.1);color:#3498db;border:none;border-radius:10px;padding:8px"><i class="fas fa-clock mr-1"></i>+ Waktu</button>
            <button onclick="event.stopPropagation();showAddItemsModal('${t.id}')" class="btn-sm flex-1 text-center" style="background:rgba(224,122,58,.1);color:var(--accent);border:none;border-radius:10px;padding:8px"><i class="fas fa-utensils mr-1"></i>+ Pesanan</button>
          </div>
          <div class="flex gap-2">
            ${t.payment_status === "paid" ? `<button onclick="event.stopPropagation();confirmCompletePlaygroundTicket('${t.id}')" class="btn-primary btn-sm flex-1 text-center"><i class="fas fa-check mr-1"></i>Selesaikan</button>` : ""}
            <button onclick="event.stopPropagation();confirmCancelPlaygroundTicket('${t.id}')" class="btn-sm flex-1 text-center" style="background:rgba(231,76,60,.1);color:var(--danger);border:none;border-radius:10px;padding:8px"><i class="fas fa-times mr-1"></i>Batalkan</button>
          </div>
        </div>`;
        })
        .join("")}
    </div>

    <div class="flex items-center gap-1.5 mb-3" style="padding:4px 0">
      <span class="text-sm font-medium" style="color:var(--muted)">Riwayat</span>
      <span class="text-xs" style="color:var(--muted)">(${completed.length})</span>
      <input type="date" class="input-field text-xs" style="width:fit-content;padding:4px 8px" value="${historyDate}" onchange="State._pgHistoryDate=this.value;render()">
      <i class="fas fa-chevron-${State._pgHistoryOpen ? "up" : "down"} text-xs" style="color:var(--muted);cursor:pointer" onclick="State._pgHistoryOpen=!State._pgHistoryOpen;render()"></i>
    </div>
    ${State._pgHistoryOpen ? renderPlaygroundHistory(completed) : ''}
  </div>`;
}

function renderPlaygroundHistory(completed) {
  if (!completed || completed.length === 0) {
    return '<div class="text-center py-8"><p class="text-sm" style="color:var(--muted)">Belum ada riwayat untuk tanggal ini</p></div>';
  }
  return `
    <div class="space-y-2">
      ${completed.slice(0, 10).map((t) => `
        <div class="card flex items-center justify-between" onclick="showPlaygroundTicketDetail('${t.id}')" style="opacity:.7;cursor:pointer">
          <div>
            <span class="font-semibold text-sm">${t.customer_name}</span>
            <span class="badge ${t.status === "completed" ? "badge-completed" : "badge-pending"} ml-2">${t.status === "completed" ? "Selesai" : "Dibatalkan"}</span>${t.was_overtime ? '<span class="badge badge-pending ml-1" style="background:rgba(231,76,60,.15);color:var(--danger)">Over Time</span>' : ''}
            <div class="text-xs mt-1" style="color:var(--muted)">${t.children.map((c) => c.name).join(", ")} — ${t.hours} jam${t.cancel_reason ? ' <span style="color:var(--danger)">· ' + t.cancel_reason + '</span>' : ''}${t.was_overtime && t.overtime_minutes ? ' <span style="color:var(--danger)">· +' + Math.floor(t.overtime_minutes / 60) + 'j ' + (t.overtime_minutes % 60) + 'm overtime</span>' : ''}</div>
          </div>
          <div class="text-right">
            <div class="font-bold text-sm" style="color:var(--accent)">${formatCurrency(t.total_amount)}</div>
            <div class="text-xs" style="color:var(--muted)">${t.payment_status === "paid" ? "Lunas" : "Belum"}</div>
          </div>
        </div>`).join('')}
    </div>`;
}

// ============================================================
// COMPLETE / CANCEL TICKET
// ============================================================

function confirmCompletePlaygroundTicket(id) {
  const t = (DB.playgroundTickets || []).find((x) => x.id === id);
  if (!t) return;
  showModal(`
    <div class="text-center">
      <div class="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style="background:rgba(39,174,96,.15)">
        <i class="fas fa-check-circle text-3xl" style="color:var(--success)"></i>
      </div>
      <h3 class="font-display text-lg font-bold mb-2">Selesaikan Tiket</h3>
      <p class="text-sm mb-4" style="color:var(--muted)">Yakin ingin menyelesaikan tiket atas nama <span class="font-semibold" style="color:var(--text)">${t.customer_name}</span>?</p>
      <div class="card mb-4 text-left text-sm" style="background:var(--bg2)">
        <div class="flex justify-between mb-1"><span style="color:var(--muted)">Status</span><span>Aktif</span></div>
        <div class="flex justify-between mb-1"><span style="color:var(--muted)">Total</span><span style="color:var(--accent)">${formatCurrency(t.total_amount)}</span></div>
        <div class="flex justify-between"><span style="color:var(--muted)">Pembayaran</span><span>Lunas</span></div>
      </div>
      <div class="flex gap-3">
        <button onclick="closeModal()" class="btn-secondary btn-sm flex-1 text-center">Kembali</button>
        <button onclick="closeModal();completePlaygroundTicket('${id}')" class="btn-sm flex-1 text-center" style="background:var(--success);color:#fff;border:none;border-radius:10px;padding:10px"><i class="fas fa-check mr-1"></i>Ya, Selesaikan</button>
      </div>
    </div>
  `);
}

function completePlaygroundTicket(id) {
  const t = (DB.playgroundTickets || []).find((x) => x.id === id);
  if (!t) return;
  t.status = "completed";
  const now = Date.now();
  const end = new Date(t.end_time).getTime();
  t.was_overtime = end <= now;
  if (t.was_overtime) {
    t.overtime_minutes = Math.round((now - end) / 60000);
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
    : t.payment_method === "transfer" ? "Transfer"
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
          <span class="badge badge-paid">Lunas</span>
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
    : t.payment_method === "transfer" ? "Transfer"
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
        <div><span>Status</span><span>Lunas</span></div>
      </div>
      <div class="divider"></div>
      <div class="footer">Terima kasih telah bermain di ARQA Coffee Playground</div>
      <script>window.print()</script>
    </body></html>
  `);
  win.document.close();
}

// ============================================================
// EXTRA PAYMENT CONFIRMATION
// ============================================================

let _pgPendingPayment = null;

function showPgExtraPaymentConfirm(label, amount, method) {
  const totalStr = formatCurrency(amount);
  if (method === "qris") {
    const qrData = encodeURIComponent("ARQA-COFFEE:PG:" + label + ":" + amount);
    showModal(`
      <div class="p-6 text-center">
        <h3 class="font-display text-xl mb-4">Pembayaran QRIS</h3>
        <p class="text-sm" style="color:var(--muted);margin-bottom:16px">Scan kode QR di bawah untuk membayar</p>
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrData}" alt="QRIS" class="mx-auto rounded-xl mb-4" style="max-width:200px">
        <p class="text-lg font-semibold mb-6">Total: ${totalStr}</p>
        <div class="flex gap-3 justify-center">
          <button onclick="closeModal()" class="btn-secondary btn-sm">Batal</button>
          <button onclick="closeModal();pgConfirmExtraPayment()" class="btn-primary btn-sm">Saya Sudah Bayar</button>
        </div>
      </div>
    `);
  } else if (method === "transfer") {
    showModal(`
      <div class="p-6">
        <h3 class="font-display text-xl mb-4 text-center">Transfer Bank</h3>
        <div class="card p-4 space-y-2 mb-4" style="background:var(--bg2)">
          <div class="flex justify-between text-sm"><span style="color:var(--muted)">Bank</span><span class="font-semibold">BCA</span></div>
          <div class="flex justify-between text-sm"><span style="color:var(--muted)">No. Rekening</span><span class="font-semibold">1234567890</span></div>
          <div class="flex justify-between text-sm"><span style="color:var(--muted)">A/N</span><span class="font-semibold">ARQA Coffee</span></div>
        </div>
        <p class="text-lg font-semibold mb-6 text-center">Total: ${totalStr}</p>
        <div class="flex gap-3 justify-center">
          <button onclick="closeModal()" class="btn-secondary btn-sm">Batal</button>
          <button onclick="closeModal();pgConfirmExtraPayment()" class="btn-primary btn-sm">Saya Sudah Transfer</button>
        </div>
      </div>
    `);
  }
}

function pgConfirmExtraPayment() {
  const p = _pgPendingPayment;
  if (!p) return;
  _pgPendingPayment = null;
  if (p.type === "time") {
    const t = (DB.playgroundTickets || []).find((x) => x.id === p.id);
    if (!t) return;
    t.hours = (t.hours || 0) + p.hours;
    const end = new Date(t.end_time);
    end.setTime(end.getTime() + p.hours * 3600000);
    t.end_time = end.toISOString();
    t.subtotal = (t.subtotal || 0) + p.cost;
    t.total_amount = (t.total_amount || 0) + p.cost;
    t.pgTransactions = t.pgTransactions || [];
    t.pgTransactions.push({
      id: 'pgtx' + Date.now() + Math.random().toString(36).slice(2,6),
      type: 'extra_time',
      description: '+' + p.hours + ' jam',
      amount: p.cost,
      method: p.method,
      created_at: new Date().toISOString()
    });
    showToast("Waktu ditambah " + p.hours + " jam — " + formatCurrency(p.cost) + " (" + (p.method === "qris" ? "QRIS" : p.method === "transfer" ? "Transfer" : "Tunai") + ")", "success");
    render();
  } else if (p.type === "items") {
    const t = (DB.playgroundTickets || []).find((x) => x.id === p.id);
    if (!t) return;
    let total = 0;
    const descParts = [];
    (p.entries || []).forEach(([itemId, qty]) => {
      const item = (DB.pgStockItems || []).find(x => x.id === itemId);
      if (!item) return;
      t.items.push({ menu_item_id: itemId, name: item.name, quantity: qty, unit_price: item.price });
      total += item.price * qty;
      descParts.push(item.name + ' x' + qty);
    });
    t.items_total = (t.items_total || 0) + total;
    t.total_amount = (t.total_amount || 0) + total;
    t.pgTransactions = t.pgTransactions || [];
    t.pgTransactions.push({
      id: 'pgtx' + Date.now() + Math.random().toString(36).slice(2,6),
      type: 'extra_items',
      description: descParts.join(', '),
      amount: total,
      method: p.method,
      created_at: new Date().toISOString()
    });
    showToast("Pesanan ditambahkan — " + formatCurrency(total) + " (" + (p.method === "qris" ? "QRIS" : p.method === "transfer" ? "Transfer" : "Tunai") + ")", "success");
    render();
  }
}

// ============================================================
// ADD TIME
// ============================================================

function showAddTimeModal(id) {
  const t = (DB.playgroundTickets || []).find((x) => x.id === id);
  if (!t) return;
  window._pgExtraDuration = 1;
  window._pgExtraPayMethod = "qris";
  const children = t.children || [];
  const companions = t.companions || [];
  const companionCount = t.companion_count || companions.length;
  const pricePerHour = children.length * PG_CHILD_PRICE + companionCount * PG_COMPANION_PRICE;
  showModal(`
    <div>
      <div class="text-center mb-4">
        <div class="w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center text-2xl" style="background:rgba(52,152,219,.15);color:#3498db">
          <i class="fas fa-clock"></i>
        </div>
        <h3 class="font-display text-lg font-bold">Tambah Waktu</h3>
        <p class="text-xs mt-1" style="color:var(--muted)">${t.customer_name} — ${t.hours} jam saat ini</p>
      </div>
      <label class="text-xs font-semibold mb-2 block" style="color:var(--muted)">Durasi Tambahan</label>
      <div class="grid grid-cols-4 gap-2 mb-4">
        ${[1, 2, 3].map((h, i) => `
        <div class="pg-dur-card card text-center py-3 cursor-pointer text-sm" onclick="document.querySelectorAll('.pg-dur-card').forEach(e=>e.style.borderColor='var(--border)');this.style.borderColor='#3498db';window._pgExtraDuration=${h};window._pgExtraDurationCustom=0;document.getElementById('pg-custom-val').textContent='0';document.getElementById('pg-extra-cost').textContent='${formatCurrency(Math.round(h * pricePerHour))}'" style="border-color:${i === 0 ? '#3498db' : 'var(--border)'}">
          <div class="font-bold" style="color:#3498db">${h} Jam</div>
          <div class="text-xs mt-1" style="color:var(--muted)">${formatCurrency(Math.round(h * pricePerHour))}</div>
        </div>`).join('')}
        <div class="card text-center py-3" style="border-color:var(--border)">
          <div class="text-xs mb-1" style="color:var(--muted)">Custom</div>
          <div class="flex items-center justify-center gap-1">
            <button onclick="var cur=window._pgExtraDurationCustom;if(cur==null||cur<0)cur=0;var v=Math.max(0,cur-1);window._pgExtraDurationCustom=v;window._pgExtraDuration=v||0;document.getElementById('pg-custom-val').textContent=v;document.querySelectorAll('.pg-dur-card').forEach(e=>e.style.borderColor='var(--border)');document.getElementById('pg-extra-cost').textContent=v<1?'Rp 0':'Rp '+(v*${pricePerHour}).toLocaleString('id-ID')" class="qty-btn" style="width:24px;height:24px;font-size:14px;padding:0;line-height:24px">−</button>
            <span id="pg-custom-val" class="text-sm font-bold" style="min-width:20px">0</span>
            <button onclick="var cur=window._pgExtraDurationCustom;if(cur==null||cur<0)cur=0;var v=cur+1;window._pgExtraDurationCustom=v;window._pgExtraDuration=v;document.getElementById('pg-custom-val').textContent=v;document.querySelectorAll('.pg-dur-card').forEach(e=>e.style.borderColor='var(--border)');document.getElementById('pg-extra-cost').textContent='Rp '+(v*${pricePerHour}).toLocaleString('id-ID')" class="qty-btn" style="width:24px;height:24px;font-size:14px;padding:0;line-height:24px">+</button>
          </div>
        </div>
      </div>
      <div class="flex justify-between items-center mb-4 py-2 px-3 rounded-xl" style="background:var(--bg2)">
        <span class="text-sm" style="color:var(--muted)">Biaya Tambahan</span>
        <span class="font-bold" style="color:var(--accent);font-size:16px" id="pg-extra-cost">${formatCurrency(Math.round(1 * pricePerHour))}</span>
      </div>
      <label class="text-xs font-semibold mb-2 block" style="color:var(--muted)">Metode Pembayaran</label>
      <div class="grid grid-cols-3 gap-2 mb-4">
        <div class="pg-pay-card card text-center py-2.5 cursor-pointer text-xs" onclick="document.querySelectorAll('.pg-pay-card').forEach(e=>e.style.borderColor='var(--border)');this.style.borderColor='var(--success)';window._pgExtraPayMethod='qris'" style="border-color:var(--success)"><i class="fas fa-qrcode mb-1" style="color:var(--accent)"></i><br>QRIS</div>
        <div class="pg-pay-card card text-center py-2.5 cursor-pointer text-xs" onclick="document.querySelectorAll('.pg-pay-card').forEach(e=>e.style.borderColor='var(--border)');this.style.borderColor='var(--success)';window._pgExtraPayMethod='transfer'" style="border-color:var(--border)"><i class="fas fa-university mb-1" style="color:var(--accent)"></i><br>Transfer</div>
        <div class="pg-pay-card card text-center py-2.5 cursor-pointer text-xs" onclick="document.querySelectorAll('.pg-pay-card').forEach(e=>e.style.borderColor='var(--border)');this.style.borderColor='var(--success)';window._pgExtraPayMethod='cash'" style="border-color:var(--border)"><i class="fas fa-money-bill mb-1" style="color:var(--success)"></i><br>Tunai</div>
      </div>
      <div class="flex gap-2">
        <button onclick="closeModal()" class="btn-secondary btn-sm flex-1 text-center">Batal</button>
        <button onclick="confirmAddTime('${id}', ${pricePerHour})" class="btn-primary btn-sm flex-1 text-center"><i class="fas fa-check mr-1"></i>Konfirmasi</button>
      </div>
    </div>
  `);
}

function confirmAddTime(id, pricePerHour) {
  const h = window._pgExtraDuration;
  if (!h || h <= 0) { showToast("Pilih durasi tambahan", "warning"); return; }
  const t = (DB.playgroundTickets || []).find((x) => x.id === id);
  if (!t) return;
  const cost = Math.round(h * pricePerHour);
  const method = window._pgExtraPayMethod || "qris";
  if (method === "cash") {
    t.hours = (t.hours || 0) + h;
    const end = new Date(t.end_time);
    end.setTime(end.getTime() + h * 3600000);
    t.end_time = end.toISOString();
    t.subtotal = (t.subtotal || 0) + cost;
    t.total_amount = (t.total_amount || 0) + cost;
    t.pgTransactions = t.pgTransactions || [];
    t.pgTransactions.push({
      id: 'pgtx' + Date.now() + Math.random().toString(36).slice(2,6),
      type: 'extra_time',
      description: '+' + h + ' jam',
      amount: cost,
      method: method,
      created_at: new Date().toISOString()
    });
    closeModal();
    showToast("Waktu ditambah " + h + " jam — " + formatCurrency(cost) + " (Tunai)", "success");
    render();
  } else {
    _pgPendingPayment = { type: "time", id, hours: h, cost, method };
    closeModal();
    showPgExtraPaymentConfirm("Tambah Waktu", cost, method);
  }
}

// ============================================================
// ADD ITEMS
// ============================================================

function showAddItemsModal(id) {
  const t = (DB.playgroundTickets || []).find((x) => x.id === id);
  if (!t) return;
  window._pgExtraTicketId = id;
  window._pgExtraItems = {};
  window._pgExtraPayMethod = "qris";
  window._pgExtraSearch = "";
  showModal(`
    <div>
      <div class="text-center mb-3">
        <div class="w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center text-2xl" style="background:rgba(224,122,58,.15);color:var(--accent)">
          <i class="fas fa-utensils"></i>
        </div>
        <h3 class="font-display text-lg font-bold">Tambah Pesanan</h3>
        <p class="text-xs mt-1" style="color:var(--muted)">${t.customer_name}</p>
      </div>
      <div class="card mb-3" style="padding:8px">
        <input type="text" class="input-field text-sm w-full" placeholder="Cari makanan/minuman..." oninput="window._pgExtraSearch=this.value;document.getElementById('pg-items-modal').innerHTML=pgRenderExtraItems()">
      </div>
      <div id="pg-items-modal" class="space-y-1.5 max-h-48 overflow-y-auto mb-3">
        ${pgRenderExtraItems()}
      </div>
      <div class="flex justify-between items-center py-2 px-3 rounded-xl mb-3" style="background:var(--bg2)">
        <span class="text-sm" style="color:var(--muted)">Total Pesanan</span>
        <span class="font-bold" style="color:var(--accent);font-size:16px" id="pg-items-total">Rp 0</span>
      </div>
      <label class="text-xs font-semibold mb-2 block" style="color:var(--muted)">Metode Pembayaran</label>
      <div class="grid grid-cols-3 gap-2 mb-4">
        <div class="pg-pay-card2 card text-center py-2.5 cursor-pointer text-xs" onclick="document.querySelectorAll('.pg-pay-card2').forEach(e=>e.style.borderColor='var(--border)');this.style.borderColor='var(--success)';window._pgExtraPayMethod='qris'" style="border-color:var(--success)"><i class="fas fa-qrcode mb-1" style="color:var(--accent)"></i><br>QRIS</div>
        <div class="pg-pay-card2 card text-center py-2.5 cursor-pointer text-xs" onclick="document.querySelectorAll('.pg-pay-card2').forEach(e=>e.style.borderColor='var(--border)');this.style.borderColor='var(--success)';window._pgExtraPayMethod='transfer'" style="border-color:var(--border)"><i class="fas fa-university mb-1" style="color:var(--accent)"></i><br>Transfer</div>
        <div class="pg-pay-card2 card text-center py-2.5 cursor-pointer text-xs" onclick="document.querySelectorAll('.pg-pay-card2').forEach(e=>e.style.borderColor='var(--border)');this.style.borderColor='var(--success)';window._pgExtraPayMethod='cash'" style="border-color:var(--border)"><i class="fas fa-money-bill mb-1" style="color:var(--success)"></i><br>Tunai</div>
      </div>
      <div class="flex gap-2">
        <button onclick="closeModal()" class="btn-secondary btn-sm flex-1 text-center">Batal</button>
        <button onclick="confirmAddItems('${id}')" class="btn-primary btn-sm flex-1 text-center"><i class="fas fa-check mr-1"></i>Konfirmasi</button>
      </div>
    </div>
  `);
}

function pgRenderExtraItems() {
  const all = (DB.pgStockItems || []).filter(s => s.category !== "Perlengkapan");
  const q = (window._pgExtraSearch || "").toLowerCase();
  const filtered = !q ? all : all.filter(s => s.name.toLowerCase().includes(q));
  return filtered.map(s => {
    const cq = window._pgExtraItems[s.id] || 0;
    return '<div class="flex items-center justify-between py-2 px-3 rounded-xl" style="background:var(--bg2)">' +
      '<div class="flex-1 min-w-0">' +
      '<div class="text-sm font-medium truncate">' + s.name + '</div>' +
      '<div class="text-xs" style="color:var(--accent)">' + formatCurrency(s.price) + '</div>' +
      '</div>' +
      '<div class="flex items-center gap-1.5 ml-2">' +
      '<button onclick="pgDecExtraItem(\'' + s.id + '\')" class="qty-btn" style="width:28px;height:28px;font-size:14px">−</button>' +
      '<span class="text-sm font-bold" style="width:20px;text-align:center;color:var(--text)">' + (cq || '-') + '</span>' +
      '<button onclick="pgIncExtraItem(\'' + s.id + '\')" class="qty-btn" style="width:28px;height:28px;font-size:14px">+</button>' +
      '</div></div>';
  }).join('');
}

function pgIncExtraItem(id) {
  window._pgExtraItems[id] = (window._pgExtraItems[id] || 0) + 1;
  const el = document.getElementById('pg-items-modal');
  if (el) el.innerHTML = pgRenderExtraItems();
  pgUpdateExtraTotal();
}

function pgDecExtraItem(id) {
  window._pgExtraItems[id] = Math.max(0, (window._pgExtraItems[id] || 0) - 1);
  const el = document.getElementById('pg-items-modal');
  if (el) el.innerHTML = pgRenderExtraItems();
  pgUpdateExtraTotal();
}

function pgUpdateExtraTotal() {
  const total = Object.entries(window._pgExtraItems || {}).reduce((s, [id, qty]) => {
    const item = (DB.pgStockItems || []).find(x => x.id === id);
    return s + (item ? item.price * qty : 0);
  }, 0);
  const el = document.getElementById('pg-items-total');
  if (el) el.textContent = formatCurrency(total);
}

function confirmAddItems(id) {
  const t = (DB.playgroundTickets || []).find((x) => x.id === id);
  if (!t) return;
  const entries = Object.entries(window._pgExtraItems || {}).filter(([_, q]) => q > 0);
  if (entries.length === 0) { showToast("Pilih minimal satu item", "warning"); return; }
  const method = window._pgExtraPayMethod || "qris";
  if (method === "cash") {
    let total = 0;
    const descParts = [];
    entries.forEach(([itemId, qty]) => {
      const item = (DB.pgStockItems || []).find(x => x.id === itemId);
      if (!item) return;
      t.items.push({ menu_item_id: itemId, name: item.name, quantity: qty, unit_price: item.price });
      total += item.price * qty;
      descParts.push(item.name + ' x' + qty);
    });
    t.items_total = (t.items_total || 0) + total;
    t.total_amount = (t.total_amount || 0) + total;
    t.pgTransactions = t.pgTransactions || [];
    t.pgTransactions.push({
      id: 'pgtx' + Date.now() + Math.random().toString(36).slice(2,6),
      type: 'extra_items',
      description: descParts.join(', '),
      amount: total,
      method: method,
      created_at: new Date().toISOString()
    });
    closeModal();
    showToast("Pesanan ditambahkan — " + formatCurrency(total) + " (Tunai)", "success");
    render();
  } else {
    const preTotal = entries.reduce((s, [itemId, qty]) => {
      const item = (DB.pgStockItems || []).find(x => x.id === itemId);
      return s + (item ? item.price * qty : 0);
    }, 0);
    _pgPendingPayment = { type: "items", id, entries, method };
    closeModal();
    showPgExtraPaymentConfirm("Pesanan", preTotal, method);
  }
}


