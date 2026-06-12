// ============================================================
// CUSTOMER VIEW — Chat
// ============================================================
var _chatPollInterval = null;
async function getOrderChatUnreadCount(orderId) {
  try {
    var ordersData = await API.getOrders();
    var o = ordersData.find(function(x) { return x.id === orderId; });
    if (!o || !o.messages || !o.messages.length) return 0;
    var myId = State.currentUser.id;
    var lastRead = o.lastReadAt?.[myId] || 0;
    if (State.currentUser.role === 'customer') {
      return o.messages.filter(function(m) { return m.sender_id !== myId && m.sender_id === o.courier_id && new Date(m.timestamp).getTime() > lastRead; }).length;
    }
    if (State.currentUser.role === 'courier') {
      return o.messages.filter(function(m) { return m.sender_id !== myId && m.sender_id === o.user_id && new Date(m.timestamp).getTime() > lastRead; }).length;
    }
    return 0;
  } catch (e) {
    console.error(e);
    return 0;
  }
}

function closeChatModal() {
  clearInterval(_chatPollInterval);
  _chatPollInterval = null;
  closeModal();
}

async function renderChatMessages(orderId, currentUserId) {
  try {
    var ordersData = await API.getOrders();
    var o = ordersData.find(function(x) { return x.id === orderId; });
    if (!o) return '';
    if (!o.messages) o.messages = [];
    if (o.messages.length === 0) return '<p class="text-center text-sm mt-10" style="color:var(--muted)">Mulai percakapan...</p>';
    return o.messages.map(function(m) {
      var imgClass = m.image ? 'p-1' : 'px-4 py-2';
      var timeClass = m.image ? 'px-2 pb-1' : '';
      var imgHtml = m.image ? '<img src="' + m.image + '" class="w-full rounded-xl object-cover cursor-pointer" style="max-height:200px" onclick="window.open(this.src)">' : m.text;
      return '<div class="flex ' + (m.sender_id === currentUserId ? 'justify-end' : 'justify-start') + '">' +
        '<div class="max-w-[80%] rounded-2xl ' + imgClass + ' text-sm" style="background:' + (m.sender_id === currentUserId ? 'var(--accent)' : 'var(--bg2)') + ';color:' + (m.sender_id === currentUserId ? '#fff' : 'inherit') + '">' +
        imgHtml +
        '<div class="text-[10px] mt-1 text-right ' + timeClass + '" style="opacity:0.7">' + formatTime(m.timestamp) + '</div>' +
        '</div></div>';
    }).join('');
  } catch (e) {
    console.error(e);
    return '<p class="text-center text-sm mt-10" style="color:var(--muted)">Gagal memuat pesan</p>';
  }
}

async function openChatModal(orderId) {
  try {
    var ordersData = await API.getOrders();
    var o = ordersData.find(function(x) { return x.id === orderId; });
    if (!o) { showToast("Pesanan tidak ditemukan", "error"); return; }
    if (!o.messages) o.messages = [];
    if (!o.lastReadAt) o.lastReadAt = {};
    o.lastReadAt[State.currentUser.id] = Date.now();

    await API.updateOrder(orderId, {
      lastReadAt: o.lastReadAt
    });

    State.notifications.forEach(function(n) {
      if (n.relatedOrderId === orderId && n.icon === 'fa-comment-alt') {
        n.read[State.currentUser.role] = true;
      }
    });

    render();

    var currentUserId = State.currentUser.id;
    var lastMsgCount = o.messages.length;

    showModal(
      `
      <div class="flex flex-col" style="height: 60vh;">
        <div class="flex justify-between items-center mb-4 pb-3 border-b" style="border-color:var(--border)">
          <h3 class="font-display text-lg font-bold">Chat ${State.currentUser.role === "courier" ? "Pelanggan" : "Kurir"}</h3>
          <button onclick="closeChatModal()" class="text-xl" style="color:var(--muted)"><i class="fas fa-times"></i></button>
        </div>
        <div id="chat-messages" class="flex-1 overflow-y-auto space-y-3 mb-4 pr-2" style="-webkit-overflow-scrolling:touch;">
          ${await renderChatMessages(orderId, currentUserId)}
        </div>
        <div class="flex gap-2 items-center">
          <input type="file" id="chat-image-input" accept="image/*" onchange="sendChatImage('${orderId}')" style="display:none">
          <button onclick="document.getElementById('chat-image-input').click()" class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style="background:var(--bg2);color:var(--muted)"><i class="fas fa-image"></i></button>
          <input type="text" id="chat-input" class="input-field flex-1 text-sm" placeholder="Tulis pesan..." onkeypress="if(event.key==='Enter') sendChatMessage('${orderId}')">
          <button onclick="sendChatMessage('${orderId}')" class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style="background:var(--accent);color:#fff"><i class="fas fa-paper-plane"></i></button>
        </div>
      </div>
    `,
      async function() {
        setTimeout(function() {
          var el = document.getElementById("chat-messages");
          if (el) el.scrollTop = el.scrollHeight;
          var input = document.getElementById("chat-input");
          if (input) input.focus();
        }, 100);

        clearInterval(_chatPollInterval);
        _chatPollInterval = setInterval(async function() {
          var container = document.getElementById("chat-messages");
          if (!container) { clearInterval(_chatPollInterval); _chatPollInterval = null; return; }
          try {
            var freshOrders = await API.getOrders();
            var order = freshOrders.find(function(x) { return x.id === orderId; });
            if (!order) { clearInterval(_chatPollInterval); _chatPollInterval = null; return; }
            if (!order.messages) order.messages = [];
            if (order.messages.length !== lastMsgCount) {
              lastMsgCount = order.messages.length;
              container.innerHTML = await renderChatMessages(orderId, currentUserId);
              container.scrollTop = container.scrollHeight;
            }
          } catch (e) {
            console.error("Chat poll error", e);
          }
        }, 2000);
      },
    );
  } catch (e) {
    console.error(e);
    showToast("Gagal membuka chat", "error");
  }
}

async function sendChatMessage(orderId) {
  try {
    var ordersData = await API.getOrders();
    var o = ordersData.find(function(x) { return x.id === orderId; });
    if (!o) { showToast("Pesanan tidak ditemukan", "error"); return; }
    var input = document.getElementById("chat-input");
    if (!input || !input.value.trim()) return;

    if (!o.messages) o.messages = [];
    o.messages.push({
      sender_id: State.currentUser.id,
      text: input.value.trim(),
      timestamp: new Date().toISOString(),
    });

    await API.updateOrder(orderId, {
      messages: o.messages
    });

    notifyNewChatMessage(orderId, State.currentUser.name);
    openChatModal(orderId);
  } catch (e) {
    console.error(e);
    showToast("Gagal mengirim pesan", "error");
  }
}

async function sendChatImage(orderId) {
  try {
    var ordersData = await API.getOrders();
    var o = ordersData.find(function(x) { return x.id === orderId; });
    if (!o) { showToast("Pesanan tidak ditemukan", "error"); return; }
    var input = document.getElementById("chat-image-input");
    if (!input || !input.files || !input.files[0]) return;

    var file = input.files[0];
    var reader = new FileReader();
    reader.onload = async function (e) {
      try {
        var img = new Image();
        img.onload = async function () {
          var canvas = document.createElement("canvas");
          var MAX_WIDTH = 600;
          var scaleSize = 1;
          if (img.width > MAX_WIDTH) {
            scaleSize = MAX_WIDTH / img.width;
          }
          canvas.width = img.width * scaleSize;
          canvas.height = img.height * scaleSize;

          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          var dataUrl = canvas.toDataURL("image/jpeg", 0.6);

          if (!o.messages) o.messages = [];
          o.messages.push({
            sender_id: State.currentUser.id,
            image: dataUrl,
            timestamp: new Date().toISOString(),
          });

          await API.updateOrder(orderId, {
            messages: o.messages
          });

          notifyNewChatMessage(orderId, State.currentUser.name);
          openChatModal(orderId);
        };
        img.src = e.target.result;
      } catch (err) {
        console.error(err);
        showToast("Gagal mengirim gambar", "error");
      }
    };
    reader.readAsDataURL(file);
  } catch (e) {
    console.error(e);
    showToast("Gagal mengirim gambar", "error");
  }
}
