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
          const remaining = new Date(t.end_time) - now;
          const isUrgent = remaining > 0 && remaining < 600000;
          const isExpired = remaining <= 0;
          return `
        <div class="card ${isUrgent ? "animate-breathe" : ""}" style="${isExpired ? "border-color:var(--danger)" : isUrgent ? "border-color:var(--warning)" : ""}">
          <div class="flex justify-between items-start mb-2">
            <div>
              <span class="font-bold text-sm">${t.customer_name}</span>
              <span class="badge ${isExpired ? "badge-pending" : "badge-cooking"} ml-2">${isExpired ? "Over Time" : "Aktif"}</span>
            </div>
            <span class="font-bold text-sm" style="color:var(--accent)">${formatCurrency(t.total_amount)}</span>
          </div>
          <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs mb-2" style="color:var(--muted)">
            <span><i class="fas fa-child mr-1"></i>${t.children.map((c) => c.name).join(", ")}</span>
            ${t.companions && t.companions.length > 0 ? `<span><i class="fas fa-user mr-1"></i>${t.companions.map((c) => c.name).join(", ")}</span>` : t.companion_count > 0 ? `<span><i class="fas fa-user mr-1"></i>${t.companion_count} pendamping</span>` : ""}
            <span><i class="fas fa-clock mr-1"></i>${t.hours} jam</span>
            <span><i class="fas fa-hourglass-half mr-1"></i><span style="color:${isExpired ? "var(--danger)" : isUrgent ? "var(--warning)" : "var(--success)"}">${isExpired ? "Waktu habis" : "Sisa " + formatRemaining(remaining)}</span></span>
          </div>
          ${t.items.length > 0 ? `<div class="text-xs mb-2" style="color:var(--muted)"><i class="fas fa-utensils mr-1"></i>${t.items.map((i) => i.name + " x" + i.quantity).join(", ")}</div>` : ""}
          <div class="flex gap-2 mt-2">
            <button onclick="completePlaygroundTicket('${t.id}')" class="btn-primary btn-sm flex-1 text-center"><i class="fas fa-check mr-1"></i>Selesaikan</button>
            <button onclick="cancelPlaygroundTicket('${t.id}')" class="btn-sm flex-1 text-center" style="background:rgba(231,76,60,.1);color:var(--danger);border:none;border-radius:10px;padding:8px"><i class="fas fa-times mr-1"></i>Batalkan</button>
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
        <div class="card flex items-center justify-between" style="opacity:.7">
          <div>
            <span class="font-semibold text-sm">${t.customer_name}</span>
            <span class="badge ${t.status === "completed" ? "badge-completed" : "badge-pending"} ml-2">${t.status === "completed" ? "Selesai" : "Dibatalkan"}</span>
            <div class="text-xs mt-1" style="color:var(--muted)">${t.children.map((c) => c.name).join(", ")} — ${t.hours} jam</div>
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

function cancelPlaygroundTicket(id) {
  const t = (DB.playgroundTickets || []).find((x) => x.id === id);
  if (!t) return;
  t.status = "cancelled";
  showToast("Tiket " + t.customer_name + " dibatalkan", "info");
  render();
}
