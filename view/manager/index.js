// ============================================================
// MANAGER VIEW — Dashboard & Users
// ============================================================
function renderManagerView() {
  const tab = State.currentTab.manager || 'dashboard';
  if (tab === 'dashboard') return renderManagerDashboard();
  if (tab === 'finance') return renderFinanceReport();
  if (tab === 'stock') return renderStockManagement();
  if (tab === 'attendance') return renderAttendance();
  if (tab === 'promos') return renderAdminPromos();
  if (tab === 'tables-mgmt') return renderAdminTablesMgmt();
  if (tab === 'menu-mgmt') return renderAdminMenuMgmt();
  if (tab === 'users') return renderManagerUsers();
  if (tab === 'profile') return renderGenericProfile();
  return renderManagerDashboard();
}

function renderManagerDashboard() {
  const computedSales = getComputedDailySales();
  const totalRev = computedSales.reduce((s, d) => s + d.revenue, 0);
  const totalExp = (DB.expenses || []).reduce((s, e) => s + e.amount, 0);
  const totalOrders = computedSales.reduce((s, d) => s + d.orders, 0);
  const lowStock = DB.stockItems.filter(s => s.current_quantity <= s.min_quantity);
  const activeEmployees = DB.attendances.filter(a => !a.check_out).length;
  return `
  <div class="animate-fade-up">
    <div class="mb-6">
      <h2 class="font-display text-2xl font-bold mb-1">Dashboard</h2>
      <p class="text-sm" style="color:var(--muted)">Ringkasan operasional hari ini</p>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
      <div class="stat-card" style="cursor:pointer" onclick="State.currentTab.manager='finance';render()"><div class="text-xs" style="color:var(--muted)">Pendapatan 7 Hari</div><div class="text-lg font-bold mt-1" style="color:var(--accent)">${formatCurrency(totalRev)}</div></div>
      <div class="stat-card" style="cursor:pointer" onclick="State.currentTab.manager='finance';render()"><div class="text-xs" style="color:var(--muted)">Total Pengeluaran</div><div class="text-lg font-bold mt-1" style="color:var(--danger)">${formatCurrency(totalExp)}</div></div>
      <div class="stat-card" style="cursor:pointer" onclick="State.currentTab.manager='finance';render()"><div class="text-xs" style="color:var(--muted)">Total Pesanan</div><div class="text-lg font-bold mt-1">${totalOrders}</div></div>
      <div class="stat-card" style="cursor:pointer" onclick="State.currentTab.manager='finance';render()"><div class="text-xs" style="color:var(--muted)">Pesanan Aktif</div><div class="text-lg font-bold mt-1" style="color:var(--warning)">${DB.orders.filter(o => !['completed', 'cancelled'].includes(o.status)).length}</div></div>
      <div class="stat-card" style="cursor:pointer" onclick="State.currentTab.manager='attendance';render()"><div class="text-xs" style="color:var(--muted)">Pegawai Aktif</div><div class="text-lg font-bold mt-1" style="color:var(--success)">${activeEmployees}</div></div>
      <div class="stat-card" style="cursor:pointer" onclick="State.currentTab.manager='stock';render()"><div class="text-xs" style="color:var(--muted)">Stok Rendah</div><div class="text-lg font-bold mt-1" style="color:var(--danger)">${lowStock.length}</div></div>
    </div>
    ${lowStock.length > 0 ? `
    <div class="card mb-4" style="border-color:rgba(231,76,60,.3)">
      <h3 class="font-semibold text-sm mb-2" style="color:var(--danger)"><i class="fas fa-exclamation-triangle mr-1"></i>Peringatan Stok Rendah</h3>
      <div class="space-y-2">
        ${lowStock.map(s => `<div class="flex justify-between text-sm"><span>${s.name}</span><span style="color:var(--danger)">${s.current_quantity} / ${s.min_quantity} ${s.unit}</span></div>`).join('')}
      </div>
      <button onclick="State.currentTab.manager='stock';render()" class="text-xs font-bold mt-2 flex items-center gap-1" style="color:var(--accent)">Selengkapnya <i class="fas fa-arrow-right" style="font-size:10px"></i></button>
    </div>`: ''}
    <div class="card mb-4">
      <h3 class="font-semibold text-sm mb-3">Pesanan Terkini</h3>
      <div class="space-y-2 max-h-64 overflow-y-auto">
        ${DB.orders.slice(0, 6).map(o => {
          const tableInfo = o.order_type === 'dine-in' && o.table_id ? 'Meja ' + (getTable(o.table_id)?.number || '-') : '';
          const addrInfo = o.order_type === 'delivery' ? (o.delivery_address || '').slice(0, 30) + '...' : '';
          return `
        <div class="flex justify-between items-center text-sm py-2 border-b" style="border-color:var(--border)">
          <div>
            <span class="font-medium">#${o.id.slice(-5).toUpperCase()}</span>
            <span class="badge ${getStatusBadge(o.status)} ml-2">${getStatusLabel(o.status)}</span>
            <div class="text-[10px] mt-0.5" style="color:var(--muted)">${tableInfo || addrInfo}</div>
          </div>
          <span>${formatCurrency(o.total_amount)}</span>
        </div>`;
        }).join('')}
      </div>
      <button onclick="State.currentTab.manager='finance';render()" class="text-xs font-bold mt-2 flex items-center gap-1" style="color:var(--accent)">Selengkapnya <i class="fas fa-arrow-right" style="font-size:10px"></i></button>
    </div>
    <div class="card mb-4">
      <h3 class="font-semibold text-sm mb-3">Status Meja</h3>
      <div class="grid grid-cols-4 md:grid-cols-8 gap-2">
        ${DB.tables.map(t => `
        <div class="text-center py-3 rounded-xl cursor-pointer hover:scale-105 transition-transform" style="background:${t.status === 'available' ? 'rgba(39,174,96,.1)' : 'rgba(231,76,60,.1)'}" onclick="showTableDetail('${t.id}')">
          <i class="fas fa-chair mb-1" style="color:${t.status === 'available' ? 'var(--success)' : 'var(--danger)'}"></i>
          <div class="text-xs font-semibold">${t.number}</div>
        </div>`).join('')}
      </div>
    </div>
    <div class="card mb-4"><canvas id="chart-revenue" height="200"></canvas></div>
    <div class="card"><canvas id="chart-orders" height="160"></canvas></div>
  </div>`;
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
