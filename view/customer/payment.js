// ============================================================
// CUSTOMER VIEW — Payment & Promo Calc
// ============================================================
let selectedPayment = "qris";
if (!State.payTiming) State.payTiming = "now";
function selectPayment(p) {
  selectedPayment = p;
  render();
}
function isDigitalSelected() {
  return selectedPayment === "qris" || selectedPayment === "bank_transfer";
}
function selectPayTiming(t) {
  State.payTiming = t;
  render();
}
function selectOrderType(t) {
  State.orderType = t;
  if (t === "dine-in" && !State.selectedTable) {
    startQRScan();
  }
  if (t === "delivery" && selectedPayment === "cash") {
    selectedPayment = "qris";
  }
  render();
}

function updateCartQty(i, d) {
  State.cart[i].quantity = Math.max(1, State.cart[i].quantity + d);
  render();
}
function removeCartItem(i) {
  State.cart.splice(i, 1);
  render();
}
function updateCartNotes(i, val) {
  if (State.cart[i]) State.cart[i].notes = val;
}

function getActivePromo() {
  return State.activePromoId ? DB.promos.find((x) => x.id === State.activePromoId) : null;
}
function isItemEligible(item, promo) {
  return promo && promo.is_active && (!promo.menu_ids || !promo.menu_ids.length || promo.menu_ids.includes(item.menu_item_id));
}
function calcItemDiscount(item, promo) {
  if (!promo || !promo.is_active) return item.unit_price;
  if (promo.discount_type === "fixed") return Math.max(0, item.unit_price - promo.discount_value);
  return Math.round(item.unit_price * (1 - promo.discount_value / 100));
}

function calcPromoDiscount() {
  if (!State.activePromoId) return 0;
  const p = DB.promos.find(x => x.id === State.activePromoId);
  const now = new Date();
  if (!p || !p.is_active) return 0;
  if (p.end_date && new Date(p.end_date) < now) { State.activePromoId = null; return 0; }
  if (p.start_date && new Date(p.start_date) > now) { State.activePromoId = null; return 0; }
  const eligible = p.menu_ids && p.menu_ids.length
    ? State.cart.filter(c => p.menu_ids.includes(c.menu_item_id))
    : State.cart;
  const eligibleTotal = eligible.reduce((s, c) => s + c.unit_price * c.quantity, 0);
  if (p.discount_type === 'fixed') return Math.min(p.discount_value, eligibleTotal);
  return Math.round(eligibleTotal * p.discount_value / 100);
}
