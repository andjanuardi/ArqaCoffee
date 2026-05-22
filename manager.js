// ============================================================
        // MANAGER VIEW
        // ============================================================
        function renderManagerView() {
            const tab = State.currentTab.manager || 'dashboard';
            if (tab === 'dashboard') return renderManagerDashboard();
            if (tab === 'finance') return renderFinanceReport();
            if (tab === 'stock') return renderStockManagement();
            if (tab === 'attendance') return renderAttendance();
            if (tab === 'promos') return renderAdminPromos(); // Reuse admin promo view
            if (tab === 'tables-mgmt') return renderAdminTablesMgmt();
            if (tab === 'menu-mgmt') return renderAdminMenuMgmt();
            if (tab === 'users') return renderManagerUsers();
            if (tab === 'profile') return renderGenericProfile();
            return renderManagerDashboard();
        }

        function renderManagerDashboard() {
            const totalRev = DB.dailySales.reduce((s, d) => s + d.revenue, 0);
            const totalOrders = DB.dailySales.reduce((s, d) => s + d.orders, 0);
            const lowStock = DB.stockItems.filter(s => s.current_quantity <= s.min_quantity);
            return `
  <div class="animate-fade-up">
    <div class="mb-6">
      <h2 class="font-display text-2xl font-bold mb-1">Dashboard</h2>
      <p class="text-sm" style="color:var(--muted)">Ringkasan operasional hari ini</p>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Pendapatan 7 Hari</div><div class="text-lg font-bold mt-1" style="color:var(--accent)">${formatCurrency(totalRev)}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Total Pesanan</div><div class="text-lg font-bold mt-1">${totalOrders}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Pesanan Aktif</div><div class="text-lg font-bold mt-1" style="color:var(--warning)">${DB.orders.filter(o => !['completed', 'cancelled'].includes(o.status)).length}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Stok Rendah</div><div class="text-lg font-bold mt-1" style="color:var(--danger)">${lowStock.length}</div></div>
    </div>
    ${lowStock.length > 0 ? `
    <div class="card mb-4" style="border-color:rgba(231,76,60,.3)">
      <h3 class="font-semibold text-sm mb-2" style="color:var(--danger)"><i class="fas fa-exclamation-triangle mr-1"></i>Peringatan Stok Rendah</h3>
      <div class="space-y-2">
        ${lowStock.map(s => `<div class="flex justify-between text-sm"><span>${s.name}</span><span style="color:var(--danger)">${s.current_quantity} / ${s.min_quantity} ${s.unit}</span></div>`).join('')}
      </div>
    </div>`: ''}
    <div class="card mb-4">
      <h3 class="font-semibold text-sm mb-3">Pesanan Terkini</h3>
      <div class="space-y-2 max-h-64 overflow-y-auto">
        ${DB.orders.slice(0, 6).map(o => `
        <div class="flex justify-between items-center text-sm py-2 border-b" style="border-color:var(--border)">
          <div><span class="font-medium">#${o.id.slice(-5).toUpperCase()}</span><span class="badge ${getStatusBadge(o.status)} ml-2">${getStatusLabel(o.status)}</span></div>
          <span>${formatCurrency(o.total_amount)}</span>
        </div>`).join('')}
      </div>
    </div>
    <div class="card mb-4">
      <h3 class="font-semibold text-sm mb-3">Status Meja</h3>
      <div class="grid grid-cols-4 md:grid-cols-8 gap-2">
        ${DB.tables.map(t => `
        <div class="text-center py-3 rounded-xl" style="background:${t.status === 'available' ? 'rgba(39,174,96,.1)' : 'rgba(231,76,60,.1)'}">
          <i class="fas fa-chair mb-1" style="color:${t.status === 'available' ? 'var(--success)' : 'var(--danger)'}"></i>
          <div class="text-xs font-semibold">${t.number}</div>
        </div>`).join('')}
      </div>
    </div>
    <div class="card mb-4"><canvas id="chart-revenue" height="200"></canvas></div>
    <div class="card"><canvas id="chart-orders" height="160"></canvas></div>
  </div>`;
        }

        function renderFinanceReport() {
            const totalRev = DB.dailySales.reduce((s, d) => s + d.revenue, 0);
            const today = DB.dailySales[DB.dailySales.length - 1];
            return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Laporan Keuangan</h2>
    <div class="grid grid-cols-2 gap-3 mb-5">
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Hari Ini</div><div class="text-lg font-bold mt-1" style="color:var(--accent)">${formatCurrency(today.revenue)}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">7 Hari</div><div class="text-lg font-bold mt-1" style="color:var(--accent)">${formatCurrency(totalRev)}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Rata-rata/Hari</div><div class="text-lg font-bold mt-1">${formatCurrency(Math.round(totalRev / 7))}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Transaksi Hari Ini</div><div class="text-lg font-bold mt-1">${today.orders}</div></div>
    </div>
    <div class="card mb-4"><canvas id="chart-finance-detail" height="250"></canvas></div>
    <div class="card">
      <h3 class="font-semibold text-sm mb-3">Rincian Transaksi Hari Ini</h3>
      <div class="space-y-2">
        ${DB.orders.filter(o => o.payment_status === 'paid').slice(0, 8).map(o => `
        <div class="flex justify-between items-center text-sm py-2 border-b" style="border-color:var(--border)">
          <div><span class="font-medium">#${o.id.slice(-5).toUpperCase()}</span><span class="text-xs ml-2" style="color:var(--muted)">${getOrderTypeName(o.order_type)}</span></div>
          <span style="color:var(--success)">${formatCurrency(o.total_amount)}</span>
        </div>`).join('')}
      </div>
    </div>
  </div>`;
        }

        function renderStockManagement() {
            if (!State.stockSearch) State.stockSearch = '';
            const filterMenuId = State.stockMenuFilter || '';
            const menuOpts = DB.menuItems.filter(m => DB.menuStockMapping && DB.menuStockMapping[m.id]).map(m =>
              `<option value="${m.id}" ${filterMenuId === m.id ? 'selected' : ''}>${m.name}</option>`
            ).join('');
            const byMenu = filterMenuId && DB.menuStockMapping && DB.menuStockMapping[filterMenuId]
              ? DB.stockItems.filter(s => DB.menuStockMapping[filterMenuId].some(r => (typeof r === 'string' ? r : r.id) === s.id))
              : DB.stockItems;
            const bySearch = byMenu.filter(s => !State.stockSearch || s.name.toLowerCase().includes(State.stockSearch.toLowerCase()));
            const sorted = [...bySearch].sort((a, b) => {
                const aPct = a.min_quantity > 0 ? a.current_quantity / a.min_quantity : a.current_quantity;
                const bPct = b.min_quantity > 0 ? b.current_quantity / b.min_quantity : b.current_quantity;
                return aPct - bPct;
            });
            return `
  <div class="animate-fade-up">
    <div class="flex justify-between items-center mb-4">
      <h2 class="font-display text-xl font-bold">Stok Bahan Baku</h2>
      <button onclick="showAddStockModal()" class="btn-primary btn-sm"><i class="fas fa-plus mr-1"></i>Tambah</button>
    </div>
    <div class="card mb-4" style="padding:10px">
      <div class="flex gap-2 mb-2">
        <input type="text" class="input-field text-sm flex-1" placeholder="Cari bahan..." value="${State.stockSearch}" oninput="State.stockSearch=this.value;render()">
        <select onchange="State.stockMenuFilter=this.value;render()" class="input-field text-sm" style="width:auto">
          <option value="">Semua Menu</option>
          ${menuOpts}
        </select>
      </div>
    </div>
    <div class="space-y-3">
      ${sorted.map(s => {
                const pct = Math.min(100, Math.round(s.current_quantity / (s.min_quantity * 3) * 100));
                const isLow = s.current_quantity <= s.min_quantity;
                const usedIn = DB.menuItems.filter(m => DB.menuStockMapping && DB.menuStockMapping[m.id] && DB.menuStockMapping[m.id].some(r => (typeof r === 'string' ? r : r.id) === s.id));
                return `
        <div class="card ${isLow ? 'animate-breathe' : ''}">
          <div class="flex justify-between items-center mb-2">
            <div class="font-semibold text-sm">${s.name} ${isLow ? '<span style="color:var(--danger);font-size:11px"><i class="fas fa-exclamation-triangle"></i> Rendah</span>' : ''}</div>
            <div class="flex items-center gap-2">
              <div class="text-sm font-bold" style="color:${isLow ? 'var(--danger)' : 'var(--accent)'}">${s.current_quantity} ${s.unit}</div>
              <button onclick="showEditStockModal('${s.id}')" class="btn-sm" style="background:rgba(224,122,58,.12);color:var(--accent);border:none;padding:4px 7px;border-radius:6px;cursor:pointer;font-size:11px"><i class="fas fa-pen"></i></button>
              <button onclick="deleteStockItem('${s.id}')" class="btn-sm" style="background:rgba(231,76,60,.12);color:var(--danger);border:none;padding:4px 7px;border-radius:6px;cursor:pointer;font-size:11px"><i class="fas fa-trash"></i></button>
            </div>
          </div>
          <div class="stock-bar"><div class="stock-bar-fill" style="width:${pct}%;background:${isLow ? 'var(--danger)' : 'var(--accent)'}"></div></div>
          <div class="flex justify-between mt-2">
            <span class="text-xs" style="color:var(--muted)">Minimum: ${s.min_quantity} ${s.unit}</span>
            <div class="flex gap-1">
              <button onclick="adjustStock('${s.id}','in')" class="btn-sm" style="background:rgba(39,174,96,.15);color:var(--success);border:none;padding:4px 10px;border-radius:6px;cursor:pointer;font-size:11px"><i class="fas fa-plus"></i></button>
              <button onclick="adjustStock('${s.id}','out')" class="btn-sm" style="background:rgba(231,76,60,.15);color:var(--danger);border:none;padding:4px 10px;border-radius:6px;cursor:pointer;font-size:11px"><i class="fas fa-minus"></i></button>
            </div>
          </div>
          ${usedIn.length ? `<div class="flex flex-wrap gap-1 mt-2 pt-2 border-t" style="border-color:var(--border)">${usedIn.map(m => `<span class="text-[10px] px-2 py-0.5 rounded" style="background:rgba(224,122,58,.12);color:var(--accent)"><i class="fas fa-utensils mr-0.5"></i>${m.name}</span>`).join('')}</div>` : ''}
        </div>`;
            }).join('')}
      ${sorted.length === 0 ? '<div class="text-center py-6 text-sm" style="color:var(--muted)">Tidak ada bahan baku ditemukan</div>' : ''}
    </div>
  </div>`;
        }

        function showEditStockModal(id) {
            const s = DB.stockItems.find(x => x.id === id);
            if (!s) return;
            showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Edit Bahan Baku</h3>
      <div class="space-y-3">
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Nama</label><input id="edit-stock-name" class="input-field text-sm" value="${s.name}"></div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Jumlah</label><input id="edit-stock-qty" type="number" class="input-field text-sm" value="${s.current_quantity}"></div>
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Satuan</label><input id="edit-stock-unit" class="input-field text-sm" value="${s.unit}"></div>
        </div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Batas Minimum</label><input id="edit-stock-min" type="number" class="input-field text-sm" value="${s.min_quantity}"></div>
      </div>
      <button onclick="saveEditStock('${s.id}')" class="btn-primary w-full mt-4 text-center">Simpan</button>
    </div>
  `);
        }

        function saveEditStock(id) {
            const s = DB.stockItems.find(x => x.id === id);
            if (!s) return;
            const name = document.getElementById('edit-stock-name')?.value;
            if (!name) { showToast('Nama bahan wajib diisi', 'warning'); return }
            s.name = name;
            s.current_quantity = parseInt(document.getElementById('edit-stock-qty')?.value || '0');
            s.unit = document.getElementById('edit-stock-unit')?.value || 'kg';
            s.min_quantity = parseInt(document.getElementById('edit-stock-min')?.value || '3');
            s.updated_at = new Date().toISOString();
            closeModal(); showToast('Bahan baku diperbarui', 'success'); render();
        }

        function deleteStockItem(id) {
            const s = DB.stockItems.find(x => x.id === id);
            if (!s) return;
            showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Konfirmasi Hapus</h3>
      <p class="text-sm mb-4">Hapus bahan "${s.name}"? Tindakan ini tidak dapat dibatalkan.</p>
      <div class="flex gap-2">
        <button onclick="closeModal()" class="btn-sm flex-1 text-center" style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:10px;cursor:pointer">Batal</button>
        <button onclick="confirmDeleteStockItem('${id}')" class="btn-sm flex-1 text-center" style="background:rgba(231,76,60,.15);color:var(--danger);border:1px solid rgba(231,76,60,.3);border-radius:10px;padding:10px;cursor:pointer"><i class="fas fa-trash mr-1"></i>Hapus</button>
      </div>
    </div>
  `);
        }

        function confirmDeleteStockItem(id) {
            DB.stockItems = DB.stockItems.filter(x => x.id !== id);
            closeModal(); showToast('Bahan baku dihapus', 'info'); render();
        }

        function adjustStock(id, type) {
            const s = DB.stockItems.find(x => x.id === id); if (!s) return;
            const qty = type === 'in' ? 5 : 2;
  s.current_quantity = type === 'in' ? s.current_quantity + qty : Math.max(0, s.current_quantity - qty);
  DB.stockMovements.push({ id: 'sm' + Date.now(), stock_item_id: id, user_id: State.currentUser.id, type, quantity: qty, notes: type === 'in' ? 'Restok' : 'Pemakaian', created_at: new Date().toISOString() });
  if (s.current_quantity <= s.min_quantity) notifyLowStock(s);
  autoUpdateMenuAvailability();
  showToast(`${s.name}: ${type === 'in' ? '+' + qty : '-' + qty} ${s.unit}`, 'success'); render();
        }

        function showAddStockModal() {
            showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Tambah Bahan Baku</h3>
      <div class="space-y-3">
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Nama</label><input id="new-stock-name" class="input-field text-sm" placeholder="Misal: Susu Oat"></div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Jumlah</label><input id="new-stock-qty" type="number" class="input-field text-sm" value="10"></div>
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Satuan</label><input id="new-stock-unit" class="input-field text-sm" value="kg"></div>
        </div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Batas Minimum</label><input id="new-stock-min" type="number" class="input-field text-sm" value="3"></div>
      </div>
      <button onclick="addStockItem()" class="btn-primary w-full mt-4 text-center">Simpan</button>
    </div>
  `);
        }

        function addStockItem() {
            const name = document.getElementById('new-stock-name')?.value;
            if (!name) { showToast('Nama bahan wajib diisi', 'warning'); return }
            DB.stockItems.push({ id: 's' + Date.now(), name, unit: document.getElementById('new-stock-unit')?.value || 'kg', current_quantity: parseInt(document.getElementById('new-stock-qty')?.value || '10'), min_quantity: parseInt(document.getElementById('new-stock-min')?.value || '3'), updated_at: new Date().toISOString() });
            closeModal(); showToast('Bahan baku ditambahkan', 'success'); render();
        }

        function renderManagerUsers() {
            const users = DB.users.filter(u => u.role !== 'admin');
            return `
  <div class="animate-fade-up">
    <div class="flex justify-between items-center mb-4">
      <h2 class="font-display text-xl font-bold">Kelola Pengguna</h2>
      <button onclick="showAddUserModal()" class="btn-primary btn-sm"><i class="fas fa-plus mr-1"></i>Tambah</button>
    </div>
    <div class="space-y-3">
      ${users.map(u => `
      <div class="card flex items-center gap-4">
        <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold" style="background:var(--accent);color:#fff">${u.avatar}</div>
        <div class="flex-1">
          <div class="font-semibold text-sm">${u.name}</div>
          <div class="text-xs" style="color:var(--muted)">${u.email} — ${u.phone || '-'}</div>
        </div>
        <span class="badge ${u.role === 'manager' ? 'badge-delivering' : u.role === 'cashier' ? 'badge-ready' : u.role === 'kitchen' ? 'badge-cooking' : 'badge-pending'}">${getRoleLabel(u.role)}</span>
        <div class="flex gap-1">
          <button onclick="showEditUserManagerModal('${u.id}')" class="btn-sm" style="background:rgba(224,122,58,.12);color:var(--accent);border:none;padding:4px 8px;border-radius:6px;cursor:pointer;font-size:11px"><i class="fas fa-pen"></i></button>
          <button onclick="deleteUserManager('${u.id}')" class="btn-sm" style="background:rgba(231,76,60,.12);color:var(--danger);border:none;padding:4px 8px;border-radius:6px;cursor:pointer;font-size:11px"><i class="fas fa-trash"></i></button>
        </div>
      </div>`).join('')}
    </div>
  </div>`;
        }

        function showEditUserManagerModal(id) {
            const u = DB.users.find(x => x.id === id);
            if (!u || u.role === 'admin') { showToast('Tidak dapat mengedit admin', 'warning'); return; }
            showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Edit Pengguna</h3>
      <div class="space-y-3">
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Nama</label><input id="edit-user-name" class="input-field text-sm" value="${u.name}"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Email</label><input id="edit-user-email" class="input-field text-sm" value="${u.email}"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Telepon</label><input id="edit-user-phone" class="input-field text-sm" value="${u.phone || ''}"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Peran</label>
          <select id="edit-user-role" class="input-field text-sm">
            <option value="manager" ${u.role === 'manager' ? 'selected' : ''}>Manager</option>
            <option value="cashier" ${u.role === 'cashier' ? 'selected' : ''}>Kasir</option>
            <option value="kitchen" ${u.role === 'kitchen' ? 'selected' : ''}>Juru Masak</option>
            <option value="courier" ${u.role === 'courier' ? 'selected' : ''}>Kurir</option>
            <option value="customer" ${u.role === 'customer' ? 'selected' : ''}>Pelanggan</option>
          </select>
        </div>
      </div>
      <div class="flex gap-2 mt-4">
        <button onclick="deleteUserManager('${u.id}')" class="btn-sm flex-1 text-center" style="background:rgba(231,76,60,.15);color:var(--danger);border:1px solid rgba(231,76,60,.3);border-radius:10px;padding:10px"><i class="fas fa-trash mr-1"></i>Hapus</button>
        <button onclick="saveEditUserManager('${u.id}')" class="btn-primary flex-1 text-center">Simpan</button>
      </div>
    </div>
  `);
        }

        function saveEditUserManager(id) {
            const u = DB.users.find(x => x.id === id);
            if (!u || u.role === 'admin') { showToast('Tidak dapat mengedit admin', 'warning'); return; }
            const name = document.getElementById('edit-user-name')?.value;
            const email = document.getElementById('edit-user-email')?.value;
            const phone = document.getElementById('edit-user-phone')?.value;
            const role = document.getElementById('edit-user-role')?.value;
            if (!name || !email) { showToast('Nama dan email wajib diisi', 'warning'); return; }
            u.name = name; u.email = email; u.phone = phone; u.role = role; u.avatar = name[0].toUpperCase();
            closeModal(); showToast('Pengguna berhasil diperbarui', 'success'); render();
        }

        function deleteUserManager(id) {
            const u = DB.users.find(x => x.id === id);
            if (!u) return;
            if (u.role === 'admin') { showToast('Tidak dapat menghapus admin', 'warning'); return; }
            showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Konfirmasi Hapus</h3>
      <p class="text-sm mb-4">Hapus pengguna "${u.name}"? Tindakan ini tidak dapat dibatalkan.</p>
      <div class="flex gap-2">
        <button onclick="closeModal()" class="btn-sm flex-1 text-center" style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:10px;cursor:pointer">Batal</button>
        <button onclick="confirmDeleteUserManager('${id}')" class="btn-sm flex-1 text-center" style="background:rgba(231,76,60,.15);color:var(--danger);border:1px solid rgba(231,76,60,.3);border-radius:10px;padding:10px;cursor:pointer"><i class="fas fa-trash mr-1"></i>Hapus</button>
      </div>
    </div>
  `);
        }

        function confirmDeleteUserManager(id) {
            DB.users = DB.users.filter(x => x.id !== id);
            closeModal(); showToast('Pengguna dihapus', 'info'); render();
        }

        function renderAttendance() {
            const today = new Date().toISOString().split('T')[0];
            const staff = DB.users.filter(u => ['manager', 'cashier', 'kitchen', 'courier'].includes(u.role));
            return `
  <div class="animate-fade-up">
    <div class="flex justify-between items-center mb-4">
      <h2 class="font-display text-xl font-bold">Presensi</h2>
      <span class="text-sm" style="color:var(--muted)">${formatDate(today)}</span>
    </div>
    
    <div class="space-y-3">
      ${staff.map(s => {
                const att = DB.attendances.find(a => a.user_id === s.id && !a.check_out);
                const isCheckedIn = !!att;
                return `
        <div class="card flex items-center gap-4 cursor-pointer hover:scale-[1.01] transition-transform" onclick="showAttendanceReport('${s.id}')">
          <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold" style="background:var(--accent);color:#fff">${s.avatar}</div>
          <div class="flex-1 min-w-0">
            <div class="font-semibold text-sm">${s.name}</div>
            <div class="text-xs" style="color:var(--muted)">${getRoleLabel(s.role)}</div>
            ${att ? `<div class="text-xs mt-1" style="color:var(--success)"><i class="fas fa-clock mr-1"></i>Check-in: ${formatTime(att.check_in)}</div>` : ''}
            ${att && att.lat ? `<div class="text-[10px] mt-0.5" style="color:var(--muted)"><i class="fas fa-map-pin mr-1"></i>${att.lat.toFixed(4)}, ${att.lng.toFixed(4)}</div>` : ''}
          </div>
          <div class="flex-shrink-0">
            ${isCheckedIn ? `<span class="badge badge-cooking">Aktif</span>` : `<span class="badge badge-pending">Off</span>`}
          </div>
        </div>`;
            }).join('')}
    </div>
  </div>`;
        }

        function showAttendanceReport(id) {
            const u = DB.users.find(x => x.id === id);
            if (!u) return;
            const today = new Date().toISOString().split('T')[0];
            const now = new Date();
            const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
            const dailyRecords = DB.attendances.filter(a => a.user_id === id && a.check_in.startsWith(today));
            const monthlyRecords = DB.attendances.filter(a => a.user_id === id && a.check_in >= monthStart);
            const dailyTotalMin = dailyRecords.reduce((sum, r) => {
                if (r.check_out) return sum + Math.round((new Date(r.check_out) - new Date(r.check_in)) / 60000);
                return sum + Math.round((Date.now() - new Date(r.check_in)) / 60000);
            }, 0);
            const monthlyTotalMin = monthlyRecords.reduce((sum, r) => {
                if (r.check_out) return sum + Math.round((new Date(r.check_out) - new Date(r.check_in)) / 60000);
                return sum + Math.round((Date.now() - new Date(r.check_in)) / 60000);
            }, 0);
            const dailyH = Math.floor(dailyTotalMin / 60), dailyM = dailyTotalMin % 60;
            const monthlyH = Math.floor(monthlyTotalMin / 60), monthlyM = monthlyTotalMin % 60;
            showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">${u.avatar} ${u.name}</h3>
      <p class="text-xs mb-4" style="color:var(--muted)">${getRoleLabel(u.role)}</p>
      <div class="grid grid-cols-2 gap-3 mb-4">
        <div class="stat-card text-center">
          <div class="text-xs" style="color:var(--muted)">Presensi Hari Ini</div>
          <div class="text-lg font-bold mt-1" style="color:var(--accent)">${dailyRecords.length}</div>
          <div class="text-xs mt-1" style="color:var(--muted)">${dailyH}j ${dailyM}m</div>
        </div>
        <div class="stat-card text-center">
          <div class="text-xs" style="color:var(--muted)">Presensi Bulan Ini</div>
          <div class="text-lg font-bold mt-1" style="color:var(--accent)">${monthlyRecords.length}</div>
          <div class="text-xs mt-1" style="color:var(--muted)">${monthlyH}j ${monthlyM}m</div>
        </div>
      </div>
      <h4 class="font-semibold text-sm mb-2">Riwayat Harian</h4>
      <div class="space-y-1 max-h-48 overflow-y-auto">
        ${monthlyRecords.slice(-10).reverse().map(r => {
                const min = r.check_out ? Math.round((new Date(r.check_out) - new Date(r.check_in)) / 60000) : Math.round((Date.now() - new Date(r.check_in)) / 60000);
                const h = Math.floor(min / 60), m = min % 60;
                return `
        <div class="flex justify-between items-center text-xs py-1 border-b" style="border-color:var(--border)">
          <span>${formatDate(r.check_in)}</span>
          <span style="color:var(--muted)">${formatTime(r.check_in)} - ${r.check_out ? formatTime(r.check_out) : '...'}</span>
          <span style="color:var(--accent)">${h}j ${m}m</span>
        </div>`;
            }).join('')}
        ${monthlyRecords.length === 0 ? '<div class="text-xs py-4 text-center" style="color:var(--muted)">Belum ada data presensi bulan ini</div>' : ''}
      </div>
    </div>
  `);
        }



