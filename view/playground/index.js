// ============================================================
// PLAYGROUND — ROUTER & SHARED HELPERS
// ============================================================

var PG_CHILD_PRICE = 20000;
var PG_COMPANION_PRICE = 10000;
var PG_SOCKS_PRICE = 10000;

async function renderPlaygroundView() {
  try {
    var tab = State.currentTab.playground || "tickets";
    if (tab === "tickets") return await renderPlaygroundTickets();
    if (tab === "create") return await renderPlaygroundCreate();
    if (tab === "stock") return await renderPlaygroundStock();
    if (tab === "report") return await renderPlaygroundFinance();
    if (tab === "profile") return renderPlaygroundProfile();
    return await renderPlaygroundTickets();
  } catch(e) { console.error(e); showToast('Gagal memuat playground', 'error'); return ''; }
}

function calcPlaygroundTotal(children, companions, hours, childSocks, items) {
  var baseRate = children.length * PG_CHILD_PRICE + companions.length * PG_COMPANION_PRICE;
  var subtotal = baseRate * Math.max(1, hours);
  var sockItem = (DB.pgStockItems || []).find(function(s) { return s.category === "Perlengkapan"; });
  var sockPrice = sockItem ? sockItem.price : PG_SOCKS_PRICE;
  var socks = childSocks.filter(function(s) { return s; }).length * sockPrice;
  var socksCount = childSocks.filter(function(s) { return s; }).length;
  var itemsTotal = items.reduce(function(s, i) { return s + i.unit_price * i.quantity; }, 0);
  return {
    baseRate: baseRate,
    subtotal: subtotal,
    socks: socks,
    socksCount: socksCount,
    itemsTotal: itemsTotal,
    total: subtotal + socks + itemsTotal,
    hours: Math.max(1, hours),
  };
}

function formatRemaining(ms) {
  if (ms <= 0) return "Habis";
  var sec = Math.floor(ms / 1000);
  var h = Math.floor(sec / 3600);
  var m = Math.floor((sec % 3600) / 60);
  var s = sec % 60;
  if (h > 0) return h + "j " + m + "m " + s + "d";
  return m + "m " + s + "d";
}

async function renderPlaygroundStock() {
  return await renderPlaygroundPgStock();
}

function renderPlaygroundProfile() {
  return renderGenericProfile();
}
