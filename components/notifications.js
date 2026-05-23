// ============================================================
// NOTIFICATION SYSTEM
// ============================================================

function addNotification(opts) {
  const n = {
    id: 'n' + Date.now() + Math.random().toString(36).slice(2, 6),
    title: opts.title || '',
    message: opts.message || '',
    type: opts.type || 'info',
    icon: opts.icon || 'fa-bell',
    targetRoles: opts.targetRoles || [],
    relatedOrderId: opts.relatedOrderId || null,
    read: {},
    timestamp: new Date().toISOString()
  };
  State.notifications.unshift(n);
}

function getRoleNotifications() {
  const role = State.currentUser?.role;
  if (!role) return [];
  return State.notifications.filter(function(n) {
    return n.targetRoles.includes(role) || n.targetRoles.includes('all');
  });
}

function getUnreadCount() {
  const role = State.currentUser?.role;
  if (!role) return 0;
  return getRoleNotifications().filter(function(n) { return !n.read[role]; }).length;
}

function getChatUnreadCount() {
  const me = State.currentUser;
  if (!me) return 0;
  if (me.role !== 'customer' && me.role !== 'courier') return 0;
  let total = 0;
  DB.orders.forEach(function(o) {
    if (!o.messages || !o.messages.length) return;
    if (me.role === 'customer' && o.user_id !== me.id) return;
    if (me.role === 'courier' && o.courier_id !== me.id) return;
    var lastRead = o.lastReadAt?.[me.id] || 0;
    o.messages.forEach(function(m) {
      if (m.sender_id !== me.id && new Date(m.timestamp).getTime() > lastRead) total++;
    });
  });
  return total;
}

function markAllChatAsRead() {
  const me = State.currentUser;
  if (!me) return;
  DB.orders.forEach(function(o) {
    if (me.role === 'customer' && o.user_id !== me.id) return;
    if (me.role === 'courier' && o.courier_id !== me.id) return;
    if (!o.lastReadAt) o.lastReadAt = {};
    o.lastReadAt[me.id] = Date.now();
  });
}

function markAsRead(notifId) {
  const role = State.currentUser?.role;
  if (!role) return;
  var n = State.notifications.find(function(x) { return x.id === notifId; });
  if (n) n.read[role] = true;
}

function markAllAsRead() {
  const role = State.currentUser?.role;
  if (!role) return;
  getRoleNotifications().forEach(function(n) { n.read[role] = true; });
}

function getNotifColor(type) {
  var m = {
    order: '#E07A3A',
    payment: '#27ae60',
    stock: '#e74c3c',
    delivery: '#3498db',
    warning: '#f39c12',
    info: '#95a5a6'
  };
  return m[type] || '#E07A3A';
}

function renderNotifPanel() {
  const role = State.currentUser?.role;
  if (!role) return;
  var notifs = getRoleNotifications().slice(0, 20);
  var hasUnread = notifs.some(function(n) { return !n.read[role]; });
  showModal(`
    <div class="flex flex-col" style="height: 65vh;">
      <div class="flex justify-between items-center mb-4 pb-3 border-b" style="border-color:var(--border)">
        <h3 class="font-display text-lg font-bold">Notifikasi</h3>
        <div class="flex items-center gap-2">
          ${hasUnread ? '<button onclick="event.stopPropagation();markAllAsRead();renderNotifPanel()" class="text-xs font-semibold px-3 py-1.5 rounded-lg" style="color:var(--accent);background:rgba(224,122,58,.1)">Baca Semua</button>' : ''}
          <button onclick="closeModal()" class="text-xl" style="color:var(--muted)"><i class="fas fa-times"></i></button>
        </div>
      </div>
      <div id="notif-list" class="flex-1 overflow-y-auto space-y-2 pr-1" style="-webkit-overflow-scrolling:touch;">
        ${notifs.length === 0 ? '<div class="text-center py-12"><i class="fas fa-bell-slash text-4xl mb-3" style="color:var(--border)"></i><p style="color:var(--muted)">Tidak ada notifikasi</p></div>' : ''}
        ${notifs.map(function(n) {
          var unread = !n.read[role];
          var isChat = n.icon === 'fa-comment-alt' && n.relatedOrderId;
          var clickHandler = isChat ? "markAsRead('" + n.id + "');closeModal();setTimeout(function(){openChatModal('" + n.relatedOrderId + "')},300)" : (unread ? "markAsRead('" + n.id + "');closeModal();" : '');
          return `
        <div class="card p-3 ${unread ? 'cursor-pointer' : (isChat ? 'cursor-pointer' : 'opacity-60')}" style="${unread ? 'border-left:3px solid var(--accent)' : ''}" onclick="${clickHandler}">
          <div class="flex gap-3">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style="background:${getNotifColor(n.type)};color:#fff">
              <i class="fas ${n.icon}" style="font-size:13px"></i>
            </div>
            <div class="flex-1 min-w-0">
              <div class="font-semibold text-sm">${n.title}</div>
              <div class="text-xs mt-0.5" style="color:var(--muted)">${n.message}</div>
              <div class="text-[10px] mt-1" style="color:var(--muted);opacity:0.7">${formatTime(n.timestamp)}</div>
            </div>
            ${unread ? '<div class="w-2 h-2 rounded-full flex-shrink-0" style="background:var(--accent);margin-top:6px"></div>' : ''}
          </div>
        </div>`;
        }).join('')}
      </div>
    </div>
  `, function() {
    markAllAsRead();
  });
}

function notifyOrderPlaced(order, customerName) {
  var shortId = '#' + order.id.slice(-5).toUpperCase();
  addNotification({
    title: 'Pesanan Baru',
    message: shortId + ' — ' + customerName + ' memesan ' + order.items.length + ' item',
    type: 'order',
    icon: 'fa-shopping-bag',
    targetRoles: ['cashier', 'kitchen'],
    relatedOrderId: order.id,
  });
  addNotification({
    title: 'Pesanan Dibuat',
    message: shortId + ' berhasil dibuat. Status: ' + getStatusLabel(order.status),
    type: 'order',
    icon: 'fa-check-circle',
    targetRoles: ['customer'],
    relatedOrderId: order.id,
  });
}

function notifyStatusChange(order, newStatus) {
  var shortId = '#' + order.id.slice(-5).toUpperCase();
  var label = getStatusLabel(newStatus);
  var roles = [];
  if (newStatus === 'cooking') roles = ['customer', 'cashier'];
  else if (newStatus === 'ready') roles = ['customer', 'cashier'];
  else if (newStatus === 'delivering') roles = ['customer', 'cashier', 'courier'];
  else if (newStatus === 'completed') roles = ['customer', 'cashier', 'courier'];
  else roles = ['customer', 'cashier'];
  addNotification({
    title: 'Status Pesanan',
    message: shortId + ' — ' + label,
    type: 'order',
    icon: newStatus === 'ready' ? 'fa-circle-check' : newStatus === 'cooking' ? 'fa-fire' : newStatus === 'delivering' ? 'fa-motorcycle' : 'fa-check',
    targetRoles: roles,
    relatedOrderId: order.id,
  });
}

function notifyPayment(order, method) {
  var shortId = '#' + order.id.slice(-5).toUpperCase();
  addNotification({
    title: 'Pembayaran Diterima',
    message: shortId + ' — Lunas via ' + method,
    type: 'payment',
    icon: 'fa-credit-card',
    targetRoles: ['cashier', 'manager', 'admin'],
    relatedOrderId: order.id,
  });
  addNotification({
    title: 'Pembayaran Berhasil',
    message: shortId + ' — Pembayaran ' + method + ' berhasil',
    type: 'payment',
    icon: 'fa-check-circle',
    targetRoles: ['customer'],
    relatedOrderId: order.id,
  });
}

function notifyRejected(order, reason) {
  var shortId = '#' + order.id.slice(-5).toUpperCase();
  addNotification({
    title: 'Pesanan Ditolak',
    message: shortId + ' — Alasan: ' + reason,
    type: 'warning',
    icon: 'fa-ban',
    targetRoles: ['customer', 'cashier'],
    relatedOrderId: order.id,
  });
}

function notifyDeliveryTaken(order, courierName) {
  var shortId = '#' + order.id.slice(-5).toUpperCase();
  addNotification({
    title: 'Pesanan Diambil Kurir',
    message: shortId + ' — ' + courierName + ' sedang mengantar',
    type: 'delivery',
    icon: 'fa-motorcycle',
    targetRoles: ['customer', 'cashier'],
    relatedOrderId: order.id,
  });
}

function notifyDeliveryCompleted(order) {
  var shortId = '#' + order.id.slice(-5).toUpperCase();
  addNotification({
    title: 'Pesanan Selesai',
    message: shortId + ' — Pengantaran selesai',
    type: 'delivery',
    icon: 'fa-circle-check',
    targetRoles: ['customer', 'cashier', 'courier'],
    relatedOrderId: order.id,
  });
}

function notifyNewChatMessage(orderId, senderName) {
  const o = DB.orders.find(x => x.id === orderId);
  if (!o) return;
  const shortId = '#' + orderId.slice(-5).toUpperCase();
  const senderRole = o.user_id === State.currentUser.id ? 'customer' : 'courier';
  const targetRoles = senderRole === 'customer' ? ['courier'] : ['customer'];
  addNotification({
    title: 'Pesan Baru',
    message: 'Dari ' + senderName + ' — ' + shortId,
    type: 'info',
    icon: 'fa-comment-alt',
    targetRoles: targetRoles,
    relatedOrderId: orderId,
  });
}

function notifyLowStock(item) {
  addNotification({
    title: 'Stok Rendah',
    message: item.name + ' tersisa ' + item.current_quantity + ' ' + item.unit + ' (min: ' + item.min_quantity + ')',
    type: 'stock',
    icon: 'fa-exclamation-triangle',
    targetRoles: ['manager', 'admin'],
  });
}
