// ============================================================
// CUSTOMER VIEW — Orders, Profile & Chat
// ============================================================
function renderCustomerOrders() {
  const myOrders = DB.orders
    .filter((o) => o.user_id === State.currentUser.id)
    .slice(0, 10);
  return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Pesanan Saya</h2>
    ${myOrders.length === 0 ? '<div class="text-center py-12"><i class="fas fa-receipt text-4xl mb-3" style="color:var(--border)"></i><p style="color:var(--muted)">Belum ada pesanan</p></div>' : ""}
    <div class="space-y-3">
      ${myOrders
        .map((o) => {
          const t = o.table_id ? getTable(o.table_id) : null;
          return `
        <div class="order-card" onclick="showOrderDetail('${o.id}')">
          <div class="flex justify-between items-start mb-2">
            <div>
              <span class="font-bold text-sm">#${o.id.slice(-5).toUpperCase()}</span>
              <span class="badge ${getStatusBadge(o.status)} ml-2">${getStatusLabel(o.status)}</span>
            </div>
            <span class="text-xs" style="color:var(--muted)">${formatTime(o.created_at)}</span>
          </div>
          <div class="flex justify-between items-center">
            <div class="text-xs" style="color:var(--muted)">
              <i class="fas ${o.order_type === "dine-in" ? "fa-chair" : "fa-motorcycle"} mr-1"></i>${getOrderTypeName(o.order_type)}
              ${t ? ` — Meja ${t.number}` : ""}
              ${o.order_type === "delivery" ? " — " + o.delivery_address.slice(0, 30) + "..." : ""}
            </div>
            <span class="font-bold text-sm" style="color:var(--accent)">${formatCurrency(o.total_amount)}</span>
          </div>
          <div class="mt-2 text-xs" style="color:var(--muted)">
            ${o.items
              .map((i) => {
                const mi = getMenuItem(i.menu_item_id);
                return mi ? mi.name + " x" + i.quantity : "";
              })
              .join(", ")}
          </div>
          ${o.status === "rejected" && o.reject_reason ? `<div class="mt-2 text-xs p-2 rounded" style="background:rgba(231,76,60,.1);color:var(--danger);border:1px solid rgba(231,76,60,.2)"><i class="fas fa-ban mr-1"></i><strong>Ditolak:</strong> ${o.reject_reason}</div>` : ""}
          ${o.order_type === "delivery" && o.status === "delivering" ? `<div class="mt-3 flex gap-2"><button onclick="event.stopPropagation();showTrackingMap('${o.id}')" class="btn-primary btn-sm flex-1"><i class="fas fa-map-marker-alt mr-1"></i>Lacak Kurir</button><button onclick="event.stopPropagation();openChatModal('${o.id}')" class="btn-secondary btn-sm flex-1" style="background:rgba(224,122,58,.1);color:var(--accent);border-color:transparent;position:relative"><i class="fas fa-comment-alt mr-1"></i>Chat Kurir${getUnreadCount(o.id) > 0 ? `<span class="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold" style="background:var(--danger);color:#fff">${getUnreadCount(o.id)}</span>` : ""}</button></div>` : ""}
          ${o.status === "pending" ? `<div class="mt-3 flex justify-end"><button onclick="event.stopPropagation();cancelOrder('${o.id}')" class="text-xs font-bold px-3 py-1.5 rounded-lg" style="color:var(--danger); background:rgba(231,76,60,.1)">Batal Pesanan</button></div>` : ""}
        </div>`;
        })
        .join("")}
    </div>
  </div>`;
}

function showOrderDetail(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  showModal(`
    <div>
      <div class="flex justify-between items-start mb-4">
        <h3 class="font-display text-lg font-bold">Pesanan #${o.id.slice(-5).toUpperCase()}</h3>
        <span class="badge ${getStatusBadge(o.status)}">${getStatusLabel(o.status)}</span>
      </div>
      <div class="text-xs mb-4" style="color:var(--muted)">
        <i class="fas ${o.order_type === "dine-in" ? "fa-chair" : "fa-motorcycle"} mr-1"></i>${getOrderTypeName(o.order_type)}
        ${o.table_id ? " — Meja " + (getTable(o.table_id)?.number || "") : ""}
        ${o.delivery_address ? "<br>" + o.delivery_address : ""}
      </div>
      ${o.status === "rejected" && o.reject_reason ? `<div class="card mb-4 text-sm" style="background:rgba(231,76,60,.08);border:1px solid rgba(231,76,60,.2)"><i class="fas fa-ban mr-1" style="color:var(--danger)"></i><strong>Pesanan Ditolak:</strong> ${o.reject_reason}</div>` : ""}
      <div class="space-y-2 mb-4">
        ${o.items
          .map((i) => {
            const mi = getMenuItem(i.menu_item_id);
            return mi
              ? `
        <div class="flex justify-between text-sm">
          <span>${mi.name} x${i.quantity} ${i.notes ? '<span style="color:var(--muted)">(' + i.notes + ")</span>" : ""}</span>
          <span>${formatCurrency(i.unit_price * i.quantity)}</span>
        </div>`
              : "";
          })
          .join("")}
      </div>
      <div class="border-t pt-3" style="border-color:var(--border)">
        <div class="flex justify-between font-bold"><span>Total</span><span style="color:var(--accent)">${formatCurrency(o.total_amount)}</span></div>
        <div class="flex justify-between text-xs mt-1" style="color:var(--muted)"><span>Pembayaran</span><span>${o.payment_method === "qris" ? "QRIS" : o.payment_method === "bank_transfer" ? "Transfer Bank" : o.payment_method === "cod" ? "COD" : o.payment_method === "" ? "Bayar Nanti" : "Tunai"}</span></div>
        ${!(o.order_type === "delivery" && o.payment_method === "cod") ? `<div class="flex justify-between text-xs mt-1" style="color:var(--muted)"><span>Status Bayar</span><span class="badge ${o.payment_status === "paid" ? "badge-paid" : "badge-unpaid"}">${o.payment_status === "paid" ? "Lunas" : "Belum Bayar"}</span></div>` : ""}
      </div>
      <button onclick="closeModal();printInvoice('${o.id}')" class="btn-primary w-full mt-4 text-center flex items-center justify-center gap-2"><i class="fas fa-print"></i> Cetak Invoice</button>
      ${o.payment_status === "unpaid" && o.status !== "completed" && !(o.order_type === "delivery" && o.payment_method === "cod") ? `<button onclick="payOrder('${o.id}')" class="btn-primary w-full mt-4 text-center">Bayar Sekarang</button>` : ""}
      ${o.status === "pending" ? `<button onclick="cancelOrder('${o.id}')" class="w-full mt-3 text-center text-sm font-bold" style="color:var(--danger); background:rgba(231,76,60,.1); padding:10px; border-radius:12px;">Batal Pesanan</button>` : ""}
    </div>
  `);
}

function printInvoice(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  const win = window.open('', '_blank');
  const statusLabel = o.payment_status === 'paid' ? 'Lunas' : 'Belum Bayar';
  win.document.write(`
    <html><head>
      <title>Invoice #${o.id.slice(-5).toUpperCase()}</title>
      <style>
        body { font-family: 'Segoe UI',sans-serif; padding:40px; max-width:400px; margin:0 auto; }
        .header { text-align:center; margin-bottom:24px; }
        .header h1 { font-size:22px; margin:0; }
        .header p { font-size:12px; color:#666; margin:2px 0; }
        .divider { border-top:2px dashed #333; margin:16px 0; }
        .item { display:flex; justify-content:space-between; font-size:13px; padding:4px 0; }
        .totals { margin-top:12px; font-size:13px; }
        .totals > div { display:flex; justify-content:space-between; padding:2px 0; }
        .footer { text-align:center; font-size:11px; color:#888; margin-top:24px; }
        @media print { body { padding:20px; } }
      </style>
    </head><body>
      <div class="header">
        <h1>ARQA Coffee</h1>
        <p>${o.order_type === 'dine-in' ? 'Makan di Tempat' : 'Pesan Antar'}</p>
        ${o.table_id ? '<p>Meja ' + (getTable(o.table_id)?.number || '') + '</p>' : ''}
        <p>#${o.id.slice(-5).toUpperCase()}</p>
        <p>${new Date(o.created_at).toLocaleString('id-ID')}</p>
      </div>
      <div class="divider"></div>
      ${o.items.map(i => {
        const mi = getMenuItem(i.menu_item_id);
        return `<div class="item"><span>${mi ? mi.name : 'Item'} x${i.quantity}</span><span>${formatCurrency(i.unit_price * i.quantity)}</span></div>`;
      }).join('')}
      <div class="divider"></div>
      <div class="totals">
        <div><span>Subtotal</span><span>${formatCurrency(o.total_amount)}</span></div>
        <div><span>Pajak (10%)</span><span>${formatCurrency(Math.round(o.total_amount * 0.1 / 1.1))}</span></div>
        <div style="font-weight:bold;font-size:15px"><span>Total</span><span>${formatCurrency(o.total_amount)}</span></div>
        <div style="margin-top:8px"><span>Pembayaran</span><span>${o.payment_method === 'qris' ? 'QRIS' : o.payment_method === 'bank_transfer' ? 'Transfer Bank' : o.payment_method === 'cod' ? 'COD' : o.payment_method === '' ? 'Bayar Nanti' : 'Tunai'}</span></div>
        <div><span>Status</span><span>${statusLabel}</span></div>
      </div>
      ${o.delivery_address ? `<div class="divider"></div><p style="font-size:12px"><strong>Alamat:</strong> ${o.delivery_address}</p>` : ''}
      <div class="footer">Terima kasih telah berbelanja di ARQA Coffee</div>
      <script>window.print()</script>
    </body></html>
  `);
  win.document.close();
}

function payOrder(id) {
  const o = DB.orders.find((x) => x.id === id);
  if (!o) return;
  o.payment_status = "paid";
  o.payment_method = "qris";
  closeModal();
  showToast("Pembayaran berhasil!", "success");
  render();
}

function cancelOrder(id) {
  showModal(`
    <div class="text-center">
      <div class="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl" style="background:rgba(231,76,60,.1);color:var(--danger)">
        <i class="fas fa-exclamation-triangle"></i>
      </div>
      <h3 class="font-display text-lg font-bold mb-2">Batalkan Pesanan?</h3>
      <p class="text-sm mb-4" style="color:var(--muted)">Apakah Anda yakin ingin membatalkan pesanan ini? Silakan pilih alasan pembatalan.</p>
      
      <div class="text-left mb-6">
        <label class="text-xs font-semibold mb-2 block" style="color:var(--muted)">Alasan Pembatalan</label>
        <select id="cancel-reason" class="input-field text-sm w-full mb-3" style="background:var(--bg2);" onchange="document.getElementById('cancel-reason-other-container').style.display = this.value === 'Lainnya' ? 'block' : 'none'">
          <option value="">-- Pilih Alasan --</option>
          <option value="Ingin mengubah pesanan">Ingin mengubah pesanan</option>
          <option value="Waktu tunggu terlalu lama">Waktu tunggu terlalu lama</option>
          <option value="Salah pilih lokasi/meja">Salah pilih lokasi/meja</option>
          <option value="Tidak jadi pesan">Tidak jadi pesan</option>
          <option value="Lainnya">Lainnya...</option>
        </select>
        
        <div id="cancel-reason-other-container" style="display:none;">
          <input type="text" id="cancel-reason-other" class="input-field text-sm w-full" placeholder="Ketik alasan spesifik di sini...">
        </div>
      </div>

      <div class="flex gap-3">
        <button onclick="closeModal()" class="btn-secondary flex-1">Batal</button>
        <button onclick="confirmCancelOrder('${id}')" class="btn-primary flex-1" style="background:var(--danger);border-color:var(--danger);">Hapus Pesanan</button>
      </div>
    </div>
  `);
}

function confirmCancelOrder(id) {
  const reasonEl = document.getElementById("cancel-reason");
  let reason = reasonEl ? reasonEl.value : "";

  if (reason === "Lainnya") {
    const otherEl = document.getElementById("cancel-reason-other");
    reason = otherEl ? otherEl.value.trim() : "";
  }

  if (!reason) {
    showToast("Silakan lengkapi alasan pembatalan", "warning");
    return;
  }

  const idx = DB.orders.findIndex((x) => x.id === id);
  if (idx === -1) {
    closeModal();
    return;
  }
  const o = DB.orders[idx];

  if (o.status !== "pending") {
    showToast(
      "Pesanan tidak dapat dibatalkan karena sudah diproses",
      "warning",
    );
    closeModal();
    return;
  }

  if (o.order_type === "dine-in" && o.table_id) {
    const hasOtherOrders = DB.orders.some(
      (x) =>
        x.id !== id &&
        x.table_id === o.table_id &&
        x.status !== "completed" &&
        x.status !== "cancelled",
    );
    if (!hasOtherOrders) {
      const t = getTable(o.table_id);
      if (t) t.status = "available";
    }
  }

  addNotification({
    title: 'Pesanan Dibatalkan',
    message: '#' + o.id.slice(-5).toUpperCase() + ' dibatalkan oleh pelanggan: ' + reason,
    type: 'warning',
    icon: 'fa-ban',
    targetRoles: ['cashier', 'kitchen'],
    relatedOrderId: o.id
  });
  DB.orders.splice(idx, 1);
  showToast("Pesanan berhasil dibatalkan dan dihapus", "success");
  closeModal();
  render();
}

function showTrackingMap(orderId) {
  const o = DB.orders.find((x) => x.id === orderId);
  if (!o) return;
  showModal(
    `
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Lacak Kurir</h3>
      <div id="map-tracking" class="mb-4"></div>
      <div class="flex items-center gap-3 mb-3">
        <div class="w-10 h-10 rounded-full flex items-center justify-center" style="background:var(--accent);color:#fff"><i class="fas fa-motorcycle"></i></div>
        <div><div class="font-semibold text-sm">${getUser(o.courier_id)?.name || "Kurir"}</div><div class="text-xs" style="color:var(--muted)">Sedang dalam perjalanan</div></div>
      </div>
      <button onclick="closeModal()" class="btn-secondary w-full text-center">Tutup</button>
    </div>
  `,
    () => {
      setTimeout(() => {
        const el = document.getElementById("map-tracking");
        if (!el) return;
        const lat = -6.9175,
          lng = 107.6191;
        const map = L.map(el).setView([lat, lng], 15);
        L.tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          { attribution: "Esri" },
        ).addTo(map);
        L.marker([lat, lng]).addTo(map).bindPopup("Posisi Kurir").openPopup();
        State.mapInstances["tracking"] = map;
      }, 200);
    },
  );
}

function renderCustomerProfile() {
  const u = State.currentUser;
  return `
  <div class="animate-fade-up">
    <div class="card text-center mb-4">
      <div class="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold" style="background:var(--accent);color:#fff">${u.avatar}</div>
      <h3 class="font-semibold text-lg">${u.name}</h3>
      <p class="text-sm" style="color:var(--muted)">${u.email}</p>
      <p class="text-sm" style="color:var(--muted)">${u.phone}</p>
    </div>
    <div class="card mb-3 flex items-center gap-3 cursor-pointer" onclick="switchTab('menu');State.selectedTable=null;State.orderType='dine-in'">
      <i class="fas fa-qrcode" style="color:var(--accent)"></i><span class="text-sm flex-1">Scan QR Meja</span><i class="fas fa-chevron-right" style="color:var(--muted);font-size:12px"></i>
    </div>
    <div class="card mb-3 flex items-center gap-3 cursor-pointer" onclick="handleLogout()">
      <i class="fas fa-right-from-bracket" style="color:var(--danger)"></i><span class="text-sm flex-1">Keluar</span><i class="fas fa-chevron-right" style="color:var(--muted);font-size:12px"></i>
    </div>
  </div>`;
}

function getUnreadCount(orderId) {
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
      openChatModal(orderId);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}
