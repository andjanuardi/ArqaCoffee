// ============================================================
// PLAYGROUND — FINANCE REPORT
// ============================================================

function renderPlaygroundFinance() {
  const startDate =
    State.pgFinanceStart ||
    new Date(new Date().setDate(new Date().getDate() - 6))
      .toISOString()
      .split("T")[0];
  const endDate = State.pgFinanceEnd || new Date().toISOString().split("T")[0];
  const tickets = (DB.playgroundTickets || []).filter((t) => {
    if (!t.created_at) return false;
    const d = t.created_at.split("T")[0];
    return d >= startDate && d <= endDate;
  });
  const paidTickets = tickets.filter((t) => t.payment_status === "paid");
  const totalRev = paidTickets.reduce((s, t) => s + t.total_amount, 0);
  const activeCount = (DB.playgroundTickets || []).filter(
    (t) => t.status === "active",
  ).length;
  const todayStr = new Date().toISOString().split("T")[0];
  const todayPaid = paidTickets.filter(
    (t) => t.created_at.split("T")[0] === todayStr,
  );
  const todayRev = todayPaid.reduce((s, t) => s + t.total_amount, 0);

  return `
  <div class="animate-fade-up">
    <div class="flex justify-between items-center mb-4">
      <h2 class="font-display text-xl font-bold">Laporan Playground</h2>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      <div class="stat-card text-center">
        <div class="text-xs" style="color:var(--muted)">Tiket Aktif</div>
        <div class="text-2xl font-bold mt-1" style="color:var(--accent)">${activeCount}</div>
      </div>
      <div class="stat-card text-center">
        <div class="text-xs" style="color:var(--muted)">Pendapatan Hari Ini</div>
        <div class="text-lg font-bold mt-1" style="color:var(--success)">${formatCurrency(todayRev)}</div>
        <div class="text-xs mt-1" style="color:var(--muted)">${todayPaid.length} transaksi</div>
      </div>
      <div class="stat-card text-center">
        <div class="text-xs" style="color:var(--muted)">Total Pendapatan</div>
        <div class="text-lg font-bold mt-1" style="color:var(--success)">${formatCurrency(totalRev)}</div>
        <div class="text-xs mt-1" style="color:var(--muted)">${paidTickets.length} tiket</div>
      </div>
      <div class="stat-card text-center">
        <div class="text-xs" style="color:var(--muted)">Total Tiket</div>
        <div class="text-lg font-bold mt-1" style="color:var(--accent)">${tickets.length}</div>
      </div>
    </div>
    <div class="flex gap-2 mb-4">
      <div class="flex-1">
        <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Dari</label>
        <input type="date" class="input-field w-full text-sm" value="${startDate}" onchange="State.pgFinanceStart=this.value;render()">
      </div>
      <div class="flex-1">
        <label class="text-xs font-medium mb-1 block" style="color:var(--muted)">Sampai</label>
        <input type="date" class="input-field w-full text-sm" value="${endDate}" onchange="State.pgFinanceEnd=this.value;render()">
      </div>
    </div>
    <div class="space-y-2">
      ${paidTickets.length === 0 ? '<div class="text-center py-8 text-sm" style="color:var(--muted)">Belum ada transaksi</div>' : ""}
      ${paidTickets
        .map(
          (t) => `
        <div class="card flex justify-between items-center">
          <div>
            <div class="font-semibold text-sm">${t.customer_name}</div>
            <div class="text-xs" style="color:var(--muted)">${t.children.map((c) => c.name).join(", ")} — ${t.hours} jam</div>
            <div class="text-xs" style="color:var(--muted)">${formatDate(t.created_at)}</div>
          </div>
          <div class="text-right">
            <div class="font-bold text-sm" style="color:var(--accent)">${formatCurrency(t.total_amount)}</div>
            <span class="text-[10px] badge ${t.payment_method === "cash" ? "badge-ready" : "badge-completed"}">${t.payment_method === "cash" ? "Tunai" : t.payment_method === "qris" ? "QRIS" : "-"}</span>
          </div>
        </div>`,
        )
        .join("")}
    </div>
  </div>`;
}
