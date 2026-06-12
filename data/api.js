// ============================================================
// ASYNC DATA LAYER — API wrappers for all DB operations
// ============================================================

// Set up global error handlers
api.onError(function (err) {
  console.error('[API Error]', err.message);
});

api.onAuthError(function () {
  if (State.currentView === 'login') return;
  api.clearToken();
  State.currentUser = null;
  State.currentView = 'login';
  State.cart = [];
  sessionStorage.removeItem('arqa_session');
  render();
});

var API = {};

/* ──── AUTH ──── */

API.login = async function (email, password) {
  var res = await api.post('/auth/login', { email: email, password: password });
  api.setToken(res.token);
  return res;
};

API.register = async function (data) {
  return await api.post('/auth/register', data);
};

API.registerMitra = async function (data) {
  return await api.post('/auth/register/mitra', data);
};

API.forgotPassword = async function (email) {
  return await api.post('/auth/forgot-password', { email: email });
};

/* ──── USERS ──── */

API.getUsers = async function () {
  return await api.get('/admin/users');
};

API.createUser = async function (data) {
  return await api.post('/admin/users', data);
};

API.updateUser = async function (id, data) {
  return await api.put('/admin/users/' + id, data);
};

API.deleteUser = async function (id) {
  return await api.del('/admin/users/' + id);
};

/* ──── TABLES ──── */

API.getTables = async function () {
  return await api.get('/admin/tables');
};

API.createTable = async function (data) {
  return await api.post('/admin/tables', data);
};

API.updateTable = async function (id, data) {
  return await api.put('/admin/tables/' + id, data);
};

API.deleteTable = async function (id) {
  return await api.del('/admin/tables/' + id);
};

/* ──── MENU ──── */

API.getMenu = async function () {
  return await api.get('/customer/menu');
};

API.createMenuItem = async function (data) {
  return await api.post('/admin/menu', data);
};

API.updateMenuItem = async function (id, data) {
  return await api.put('/admin/menu/' + id, data);
};

API.deleteMenuItem = async function (id) {
  return await api.del('/admin/menu/' + id);
};

/* ──── ORDERS ──── */

API.getOrders = async function () {
  return await api.get('/admin/orders');
};

API.createOrder = async function (data) {
  return await api.post('/admin/orders', data);
};

API.updateOrder = async function (id, data) {
  return await api.put('/admin/orders/' + id, data);
};

API.deleteOrder = async function (id) {
  return await api.del('/admin/orders/' + id);
};

/* ──── STOCK ──── */

API.getStock = async function () {
  return await api.get('/admin/stock');
};

API.createStockItem = async function (data) {
  return await api.post('/admin/stock', data);
};

API.updateStockItem = async function (id, data) {
  return await api.put('/admin/stock/' + id, data);
};

API.deleteStockItem = async function (id) {
  return await api.del('/admin/stock/' + id);
};

/* ──── STOCK MOVEMENTS ──── */

API.getStockMovements = async function () {
  return await api.get('/admin/stock/movements');
};

API.createStockMovement = async function (data) {
  return await api.post('/admin/stock/movements', data);
};

/* ──── PROMOS ──── */

API.getPromos = async function () {
  return await api.get('/customer/promos');
};

API.createPromo = async function (data) {
  return await api.post('/admin/promos', data);
};

API.updatePromo = async function (id, data) {
  return await api.put('/admin/promos/' + id, data);
};

API.deletePromo = async function (id) {
  return await api.del('/admin/promos/' + id);
};

/* ──── CAFE ──── */

API.getCafe = async function () {
  return await api.get('/customer/cafe');
};

API.updateCafe = async function (data) {
  return await api.put('/admin/cafe', data);
};

/* ──── SALES ──── */

API.getSales = async function () {
  return await api.get('/admin/sales');
};

API.createSale = async function (data) {
  return await api.post('/admin/sales', data);
};

/* ──── EXPENSES ──── */

API.getExpenses = async function () {
  return await api.get('/admin/expenses');
};

API.createExpense = async function (data) {
  return await api.post('/admin/expenses', data);
};

API.updateExpense = async function (id, data) {
  return await api.put('/admin/expenses/' + id, data);
};

API.deleteExpense = async function (id) {
  return await api.del('/admin/expenses/' + id);
};

/* ──── ATTENDANCES ──── */

API.getAttendances = async function () {
  return await api.get('/admin/attendances');
};

API.createAttendance = async function (data) {
  return await api.post('/admin/attendances', data);
};

API.updateAttendance = async function (id, data) {
  return await api.put('/admin/attendances/' + id, data);
};

/* ──── COURIER TRACKING ──── */

API.getCourierTracking = async function (params) {
  var q = '';
  if (params) {
    var parts = [];
    if (params.courier_id) parts.push('courier_id=' + encodeURIComponent(params.courier_id));
    if (params.order_id) parts.push('order_id=' + encodeURIComponent(params.order_id));
    if (parts.length) q = '?' + parts.join('&');
  }
  return await api.get('/admin/courier/tracking' + q);
};

API.createCourierTracking = async function (data) {
  return await api.post('/admin/courier/tracking', data);
};

/* ──── MITRA PAYOUTS ──── */

API.getMitraPayouts = async function () {
  return await api.get('/admin/mitra/payouts');
};

API.createMitraPayout = async function (data) {
  return await api.post('/admin/mitra/payouts', data);
};

API.updateMitraPayout = async function (id, data) {
  return await api.put('/admin/mitra/payouts/' + id, data);
};

API.deleteMitraPayout = async function (id) {
  return await api.del('/admin/mitra/payouts/' + id);
};

/* ──── MITRA REGISTRATIONS ──── */

API.getMitraRegistrations = async function (status) {
  var q = status ? '?status=' + encodeURIComponent(status) : '';
  return await api.get('/admin/mitra/registrations' + q);
};

API.createMitraRegistration = async function (data) {
  return await api.post('/admin/mitra/registrations', data);
};

API.updateMitraRegistration = async function (id, data) {
  return await api.put('/admin/mitra/registrations/' + id, data);
};

API.deleteMitraRegistration = async function (id) {
  return await api.del('/admin/mitra/registrations/' + id);
};

/* ──── PLAYGROUND TICKETS ──── */

API.getPlaygroundTickets = async function () {
  return await api.get('/playground/tickets');
};

API.createPlaygroundTicket = async function (data) {
  return await api.post('/playground/tickets', data);
};

API.updatePlaygroundTicket = async function (id, data) {
  return await api.put('/playground/tickets/' + id, data);
};

API.deletePlaygroundTicket = async function (id) {
  return await api.del('/playground/tickets/' + id);
};

/* ──── PLAYGROUND STOCK ──── */

API.getPgStock = async function () {
  return await api.get('/playground/stock');
};

API.createPgStockItem = async function (data) {
  return await api.post('/playground/stock', data);
};

API.updatePgStockItem = async function (id, data) {
  return await api.put('/playground/stock/' + id, data);
};

API.deletePgStockItem = async function (id) {
  return await api.del('/playground/stock/' + id);
};

/* ──── PLAYGROUND STOCK MOVEMENTS ──── */

API.getPgStockMovements = async function () {
  return await api.get('/playground/stock/movements');
};

API.createPgStockMovement = async function (data) {
  return await api.post('/playground/stock/movements', data);
};

/* ──── NOTIFICATIONS ──── */

API.getNotifications = async function (params) {
  var q = '';
  if (params) {
    var parts = [];
    if (params.user_id) parts.push('user_id=' + encodeURIComponent(params.user_id));
    if (params.target_role) parts.push('target_role=' + encodeURIComponent(params.target_role));
    if (parts.length) q = '?' + parts.join('&');
  }
  return await api.get('/notifications' + q);
};

API.createNotification = async function (data) {
  return await api.post('/notifications', data);
};

API.updateNotification = async function (id, data) {
  return await api.put('/notifications/' + id, data);
};

API.deleteNotification = async function (id) {
  return await api.del('/notifications/' + id);
};
