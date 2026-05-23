// ============================================================
// CUSTOMER VIEW — Chat
// ============================================================
function getOrderChatUnreadCount(orderId) {
  const o = DB.orders.find(x => x.id === orderId);
  if (!o || !o.messages || !o.messages.length) return 0;
  const myId = State.currentUser.id;
  const lastRead = o.lastReadAt?.[myId] || 0;
  if (State.currentUser.role === 'customer') {
    return o.messages.filter(m => m.sender_id !== myId && m.sender_id === o.courier_id && new Date(m.timestamp).getTime() > lastRead).length;
  }
  if (State.currentUser.role === 'courier') {
    return o.messages.filter(m => m.sender_id !== myId && m.sender_id === o.user_id && new Date(m.timestamp).getTime() > lastRead).length;
  }
  return 0;
}

function openChatModal(orderId) {
  const o = DB.orders.find((x) => x.id === orderId);
  if (!o) return;
  if (!o.messages) o.messages = [];
  if (!o.lastReadAt) o.lastReadAt = {};
  o.lastReadAt[State.currentUser.id] = Date.now();

  State.notifications.forEach(function(n) {
    if (n.relatedOrderId === orderId && n.icon === 'fa-comment-alt') {
      n.read[State.currentUser.role] = true;
    }
  });

  render();

  const currentUserId = State.currentUser.id;

  showModal(
    `
    <div class="flex flex-col" style="height: 60vh;">
      <div class="flex justify-between items-center mb-4 pb-3 border-b" style="border-color:var(--border)">
        <h3 class="font-display text-lg font-bold">Chat ${State.currentUser.role === "courier" ? "Pelanggan" : "Kurir"}</h3>
        <button onclick="closeModal()" class="text-xl" style="color:var(--muted)"><i class="fas fa-times"></i></button>
      </div>
      <div id="chat-messages" class="flex-1 overflow-y-auto space-y-3 mb-4 pr-2" style="-webkit-overflow-scrolling:touch;">
        ${o.messages.length === 0 ? '<p class="text-center text-sm mt-10" style="color:var(--muted)">Mulai percakapan...</p>' : ""}
        ${o.messages
          .map(
            (m) => `
          <div class="flex ${m.sender_id === currentUserId ? "justify-end" : "justify-start"}">
            <div class="max-w-[80%] rounded-2xl ${m.image ? "p-1" : "px-4 py-2"} text-sm" style="background:${m.sender_id === currentUserId ? "var(--accent)" : "var(--bg2)"}; color:${m.sender_id === currentUserId ? "#fff" : "inherit"}">
              ${m.image ? `<img src="${m.image}" class="w-full rounded-xl object-cover cursor-pointer" style="max-height:200px" onclick="window.open(this.src)">` : m.text}
              <div class="text-[10px] mt-1 text-right ${m.image ? "px-2 pb-1" : ""}" style="opacity:0.7">${formatTime(m.timestamp)}</div>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
      <div class="flex gap-2 items-center">
        <input type="file" id="chat-image-input" accept="image/*" onchange="sendChatImage('${orderId}')" style="display:none">
        <button onclick="document.getElementById('chat-image-input').click()" class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style="background:var(--bg2);color:var(--muted)"><i class="fas fa-image"></i></button>
        <input type="text" id="chat-input" class="input-field flex-1 text-sm" placeholder="Tulis pesan..." onkeypress="if(event.key==='Enter') sendChatMessage('${orderId}')">
        <button onclick="sendChatMessage('${orderId}')" class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style="background:var(--accent);color:#fff"><i class="fas fa-paper-plane"></i></button>
      </div>
    </div>
  `,
    () => {
      setTimeout(() => {
        const el = document.getElementById("chat-messages");
        if (el) el.scrollTop = el.scrollHeight;
        document.getElementById("chat-input")?.focus();
      }, 100);
    },
  );
}

function sendChatMessage(orderId) {
  const o = DB.orders.find((x) => x.id === orderId);
  if (!o) return;
  const input = document.getElementById("chat-input");
  if (!input || !input.value.trim()) return;

  if (!o.messages) o.messages = [];
  o.messages.push({
    sender_id: State.currentUser.id,
    text: input.value.trim(),
    timestamp: new Date().toISOString(),
  });

  notifyNewChatMessage(orderId, State.currentUser.name);
  openChatModal(orderId);
}

function sendChatImage(orderId) {
  const o = DB.orders.find((x) => x.id === orderId);
  if (!o) return;
  const input = document.getElementById("chat-image-input");
  if (!input || !input.files || !input.files[0]) return;

  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement("canvas");
      const MAX_WIDTH = 600;
      let scaleSize = 1;
      if (img.width > MAX_WIDTH) {
        scaleSize = MAX_WIDTH / img.width;
      }
      canvas.width = img.width * scaleSize;
      canvas.height = img.height * scaleSize;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const dataUrl = canvas.toDataURL("image/jpeg", 0.6);

      if (!o.messages) o.messages = [];
      o.messages.push({
        sender_id: State.currentUser.id,
        image: dataUrl,
        timestamp: new Date().toISOString(),
      });
      notifyNewChatMessage(orderId, State.currentUser.name);
      openChatModal(orderId);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}
