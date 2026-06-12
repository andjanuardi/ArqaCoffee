// ============================================================
// WEBSOCKET CLIENT — realtime notifications + chat
// ============================================================
var WS = (function () {
  var ws = null;
  var handlers = {};
  var reconnectTimer = null;
  var pendingIdentify = null;

  function connect() {
    if (ws && ws.readyState === WebSocket.OPEN) return;

    var apiHost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === '' ? 'localhost:3001' : window.location.host;
    ws = new WebSocket((window.location.protocol === 'https:' ? 'wss:' : 'ws:') + '//' + apiHost);

    ws.onopen = function () {
      console.log('[WS] connected');
      if (pendingIdentify) {
        ws.send(JSON.stringify(pendingIdentify));
        pendingIdentify = null;
      }
    };

    ws.onmessage = function (e) {
      try {
        var event = JSON.parse(e.data);
        console.log('[WS] event', event.type);
        if (handlers[event.type]) {
          handlers[event.type].forEach(function (fn) { fn(event.payload, event); });
        }
        if (handlers['*']) {
          handlers['*'].forEach(function (fn) { fn(event.payload, event); });
        }
      } catch (err) { console.error('[WS] parse error', err); }
    };

    ws.onclose = function () {
      console.log('[WS] disconnected, reconnecting in 3s');
      clearTimeout(reconnectTimer);
      reconnectTimer = setTimeout(connect, 3000);
    };

    ws.onerror = function (err) {
      console.error('[WS] error', err);
    };
  }

  function send(msg) {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(msg));
    } else {
      pendingIdentify = msg;
      if (!ws || ws.readyState === WebSocket.CLOSED) connect();
    }
  }

  function on(eventType, fn) {
    if (!handlers[eventType]) handlers[eventType] = [];
    handlers[eventType].push(fn);
  }

  function off(eventType, fn) {
    if (!handlers[eventType]) return;
    if (fn) {
      handlers[eventType] = handlers[eventType].filter(function (f) { return f !== fn; });
    } else {
      delete handlers[eventType];
    }
  }

  function identify() {
    if (!State.currentUser) return;
    send({ type: 'identify', userId: State.currentUser.id, role: State.currentUser.role });
  }

  function disconnect() {
    clearTimeout(reconnectTimer);
    pendingIdentify = null;
    if (ws) { ws.close(); ws = null; }
  }

  return { connect: connect, on: on, off: off, identify: identify, disconnect: disconnect };
})();

// Built-in event handlers
WS.on('new_order', function (payload) {
  showToast('Pesanan baru! #' + payload.orderId + ' — ' + payload.customerName, 'info');
  if (State.currentUser && ['cashier', 'admin', 'manager', 'kitchen'].indexOf(State.currentUser.role) >= 0) {
    render();
  }
});

WS.on('status_change', function (payload) {
  showToast('Status pesanan #' + payload.orderId + ': ' + payload.statusLabel, 'info');
  render();
});

WS.on('payment_received', function (payload) {
  showToast('Pembayaran diterima #' + payload.orderId, 'success');
  if (State.currentUser && ['cashier', 'admin', 'manager'].indexOf(State.currentUser.role) >= 0) {
    render();
  }
});

WS.on('order_ready', function (payload) {
  showToast('Pesanan siap diantar #' + payload.orderId, 'success');
  if (State.currentUser && State.currentUser.role === 'courier') render();
});

WS.on('chat_message', function (payload) {
  showToast('Pesan baru dari ' + payload.senderName, 'info');
  if (typeof openChatModal === 'function') {
    var activeChat = document.getElementById('chat-messages');
    if (activeChat) openChatModal(payload.orderId);
  }
});

WS.on('stock_alert', function (payload) {
  showToast('Stok rendah: ' + payload.itemName + ' (' + payload.currentQty + ' ' + payload.unit + ')', 'warning');
});
