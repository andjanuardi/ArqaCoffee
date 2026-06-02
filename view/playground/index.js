// ============================================================
// PLAYGROUND — ROUTER & SHARED HELPERS
// ============================================================

const PG_CHILD_PRICE = 20000;
const PG_COMPANION_PRICE = 10000;
const PG_SOCKS_PRICE = 10000;

function renderPlaygroundView() {
  const tab = State.currentTab.playground || "tickets";
  if (tab === "tickets") return renderPlaygroundTickets();
  if (tab === "create") return renderPlaygroundCreate();
  if (tab === "stock") return renderPlaygroundStock();
  if (tab === "report") return renderPlaygroundFinance();
  if (tab === "profile") return renderPlaygroundProfile();
  return renderPlaygroundTickets();
}

function calcPlaygroundTotal(children, companions, hours, childSocks, items) {
  const baseRate =
    children.length * PG_CHILD_PRICE + companions.length * PG_COMPANION_PRICE;
  const subtotal = baseRate * Math.max(1, hours);
  const socks = childSocks.filter((s) => s).length * PG_SOCKS_PRICE;
  const socksCount = childSocks.filter((s) => s).length;
  const itemsTotal = items.reduce((s, i) => s + i.unit_price * i.quantity, 0);
  return {
    baseRate,
    subtotal,
    socks,
    socksCount,
    itemsTotal,
    total: subtotal + socks + itemsTotal,
    hours: Math.max(1, hours),
  };
}

function formatRemaining(ms) {
  if (ms <= 0) return "Habis";
  const min = Math.floor(ms / 60000);
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h > 0) return h + "j " + m + "m";
  return m + "m";
}

function renderPlaygroundStock() {
  return renderPlaygroundPgStock();
}

function renderPlaygroundProfile() {
  return renderGenericProfile();
}
