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
  const sockItem = (DB.pgStockItems || []).find((s) => s.category === "Perlengkapan");
  const sockPrice = sockItem ? sockItem.price : PG_SOCKS_PRICE;
  const socks = childSocks.filter((s) => s).length * sockPrice;
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
  const sec = Math.floor(ms / 1000);
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0) return h + "j " + m + "m " + s + "d";
  return m + "m " + s + "d";
}

function renderPlaygroundStock() {
  return renderPlaygroundPgStock();
}

function renderPlaygroundProfile() {
  return renderGenericProfile();
}
