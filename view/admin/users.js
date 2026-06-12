// ============================================================
// ADMIN VIEW — Users Management
// ============================================================
async function renderAdminUsers() {
  try {
    showSkeleton('admin-users', 'list');
    var users = await API.getUsers();
    DB.users = users;
    if (!State.adminRoleFilter) State.adminRoleFilter = '';
    var roleChips = [
      { id: '', label: 'Semua' },
      { id: 'admin', label: 'Admin' },
      { id: 'manager', label: 'Manager' },
      { id: 'cashier', label: 'Kasir' },
      { id: 'kitchen', label: 'Juru Masak' },
      { id: 'courier', label: 'Kurir' },
      { id: 'customer', label: 'Pelanggan' },
    ];
    var filtered = users.filter(function(u) { return !State.adminRoleFilter || u.role === State.adminRoleFilter; });
    return `
    <div class="animate-fade-up">
      <div class="flex justify-between items-center mb-4">
        <h2 class="font-display text-xl font-bold">Kelola Pengguna</h2>
        <button onclick="showAddUserModal()" class="btn-primary btn-sm"><i class="fas fa-plus mr-1"></i>Tambah</button>
      </div>
      <div class="flex gap-2 mb-4 overflow-x-auto pb-2" style="-webkit-overflow-scrolling:touch;scrollbar-width:none;">
        ${roleChips.map(function(c) { return '<div class="category-chip ' + (State.adminRoleFilter === c.id ? 'active' : '') + '" onclick="State.adminRoleFilter=\'' + c.id + '\';render()">' + c.label + '</div>'; }).join('')}
      </div>
      <div class="space-y-3">
        ${filtered.map(function(u) {
          return `
        <div class="card flex items-center gap-4">
          <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold" style="background:var(--accent);color:#fff">${u.avatar}</div>
          <div class="flex-1">
            <div class="font-semibold text-sm">${u.name}</div>
            <div class="text-xs" style="color:var(--muted)">${u.email} — ${u.phone}</div>
          </div>
          <span class="badge ${u.role === 'admin' ? 'badge-cooking' : u.role === 'manager' ? 'badge-delivering' : u.role === 'cashier' ? 'badge-ready' : u.role === 'waiter' ? 'badge-cooking' : 'badge-pending'}">${getRoleLabel(u.role)}</span>
          <div class="flex gap-1">
            <button onclick="showEditUserModal('${u.id}')" class="btn-sm" style="background:rgba(224,122,58,.12);color:var(--accent);border:none;padding:4px 8px;border-radius:6px;cursor:pointer;font-size:11px"><i class="fas fa-pen"></i></button>
            <button onclick="deleteUser('${u.id}')" class="btn-sm" style="background:rgba(231,76,60,.12);color:var(--danger);border:none;padding:4px 8px;border-radius:6px;cursor:pointer;font-size:11px"><i class="fas fa-trash"></i></button>
          </div>
        </div>`;
        }).join('')}
      </div>
    </div>`;
  } catch(e) { console.error(e); showToast('Gagal memuat pengguna', 'error'); return ''; }
  finally { hideSkeleton('admin-users'); }
}

function showAddUserModal() {
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Tambah Pengguna</h3>
      <div class="space-y-3">
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Nama</label><input id="new-user-name" class="input-field text-sm" placeholder="Nama lengkap"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Email</label><input id="new-user-email" class="input-field text-sm" placeholder="email@arqa.coffee"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Password</label><input id="new-user-pass" type="password" class="input-field text-sm" placeholder="Minimal 6 karakter"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Telepon</label><input id="new-user-phone" class="input-field text-sm" placeholder="Nomor telepon"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Peran</label>
          <select id="new-user-role" class="input-field text-sm">
            <option value="cashier">Kasir</option><option value="kitchen">Juru Masak</option><option value="courier">Kurir</option><option value="waiter">Waiters</option><option value="manager">Manager</option><option value="customer">Pelanggan</option>
          </select>
        </div>
      </div>
      <button onclick="addUser()" class="btn-primary w-full mt-4 text-center">Simpan</button>
    </div>
  `);
}

async function addUser() {
  try {
    var name = document.getElementById('new-user-name')?.value;
    var email = document.getElementById('new-user-email')?.value;
    var pass = document.getElementById('new-user-pass')?.value;
    var role = document.getElementById('new-user-role')?.value;
    var phone = document.getElementById('new-user-phone')?.value || '';
    if (!name || !email) { showToast('Nama dan email wajib diisi', 'warning'); return; }
    await API.createUser({
      id: 'u' + Date.now(),
      name: name,
      email: email,
      password: pass || 'password123',
      role: role,
      phone: phone,
      avatar: name[0].toUpperCase()
    });
    closeModal();
    showToast('Pengguna ditambahkan', 'success');
    await render();
  } catch(e) { console.error(e); showToast('Gagal menambah pengguna', 'error'); }
}

function showEditUserModal(id) {
  var u = DB.users.find(function(x) { return x.id === id; });
  if (!u) return;
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Edit Pengguna</h3>
      <div class="space-y-3">
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Nama</label><input id="edit-user-name" class="input-field text-sm" value="${u.name}"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Email</label><input id="edit-user-email" class="input-field text-sm" value="${u.email}"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Telepon</label><input id="edit-user-phone" class="input-field text-sm" value="${u.phone || ''}"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Password <span class="text-[10px]" style="color:var(--muted)">(kosongkan jika tidak diubah)</span></label><input id="edit-user-pass" type="password" class="input-field text-sm" placeholder="Password baru"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Peran</label>
          <select id="edit-user-role" class="input-field text-sm">
            <option value="admin" ${u.role === 'admin' ? 'selected' : ''}>Admin</option>
            <option value="manager" ${u.role === 'manager' ? 'selected' : ''}>Manager</option>
            <option value="cashier" ${u.role === 'cashier' ? 'selected' : ''}>Kasir</option>
            <option value="kitchen" ${u.role === 'kitchen' ? 'selected' : ''}>Juru Masak</option>
            <option value="courier" ${u.role === 'courier' ? 'selected' : ''}>Kurir</option>
            <option value="waiter" ${u.role === 'waiter' ? 'selected' : ''}>Waiters</option>
            <option value="customer" ${u.role === 'customer' ? 'selected' : ''}>Pelanggan</option>
          </select>
        </div>
      </div>
      <div class="flex gap-2 mt-4">
        <button onclick="deleteUser('${u.id}')" class="btn-sm flex-1 text-center" style="background:rgba(231,76,60,.15);color:var(--danger);border:1px solid rgba(231,76,60,.3);border-radius:10px;padding:10px"><i class="fas fa-trash mr-1"></i>Hapus</button>
        <button onclick="saveEditUser('${u.id}')" class="btn-primary flex-1 text-center">Simpan</button>
      </div>
    </div>
  `);
}

async function saveEditUser(id) {
  try {
    var u = DB.users.find(function(x) { return x.id === id; });
    if (!u) return;
    var name = document.getElementById('edit-user-name')?.value;
    var email = document.getElementById('edit-user-email')?.value;
    var phone = document.getElementById('edit-user-phone')?.value;
    var pass = document.getElementById('edit-user-pass')?.value;
    var role = document.getElementById('edit-user-role')?.value;
    if (!name || !email) { showToast('Nama dan email wajib diisi', 'warning'); return; }
    var updateData = { name: name, email: email, phone: phone, role: role, avatar: name[0].toUpperCase() };
    if (pass) updateData.password = pass;
    await API.updateUser(id, updateData);
    DB.users = await API.getUsers();
    closeModal();
    showToast('Pengguna berhasil diperbarui', 'success');
    await render();
  } catch(e) { console.error(e); showToast('Gagal memperbarui pengguna', 'error'); }
}

function deleteUser(id) {
  var u = DB.users.find(function(x) { return x.id === id; });
  if (!u) return;
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Konfirmasi Hapus</h3>
      <p class="text-sm mb-4">Hapus pengguna "${u.name}"? Tindakan ini tidak dapat dibatalkan.</p>
      <div class="flex gap-2">
        <button onclick="closeModal()" class="btn-sm flex-1 text-center" style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:10px;cursor:pointer">Batal</button>
        <button onclick="confirmDeleteUser('${id}')" class="btn-sm flex-1 text-center" style="background:rgba(231,76,60,.15);color:var(--danger);border:1px solid rgba(231,76,60,.3);border-radius:10px;padding:10px;cursor:pointer"><i class="fas fa-trash mr-1"></i>Hapus</button>
      </div>
    </div>
  `);
}

async function confirmDeleteUser(id) {
  try {
    await API.deleteUser(id);
    DB.users = DB.users.filter(function(x) { return x.id !== id; });
    closeModal();
    showToast('Pengguna dihapus', 'info');
    await render();
  } catch(e) { console.error(e); showToast('Gagal menghapus pengguna', 'error'); }
}
