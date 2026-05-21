// ============================================================
        // ADMIN VIEW
        // ============================================================
        function renderAdminView() {
            const tab = State.currentTab.admin || 'overview';
            if (tab === 'overview') return renderAdminOverview();
            if (tab === 'wizard') return renderAdminWizard();
            if (tab === 'users') return renderAdminUsers();
            if (tab === 'menu-mgmt') return renderAdminMenuMgmt();
            if (tab === 'tables-mgmt') return renderAdminTablesMgmt();
            if (tab === 'promos') return renderAdminPromos();
            if (tab === 'finance') return renderFinanceReport();
            if (tab === 'stock') return renderStockManagement();
            if (tab === 'attendance') return renderAttendance();
            return renderAdminOverview();
        }

        function renderAdminOverview() {
            const totalRev = DB.dailySales.reduce((s, d) => s + d.revenue, 0);
            const activeOrders = DB.orders.filter(o => !['completed', 'cancelled'].includes(o.status)).length;
            return `
  <div class="animate-fade-up">
    <div class="mb-6">
      <h2 class="font-display text-2xl font-bold mb-1">Admin Overview</h2>
      <p class="text-sm" style="color:var(--muted)">Kontrol penuh seluruh operasional ARQA Coffee</p>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Total Pendapatan</div><div class="text-lg font-bold mt-1" style="color:var(--accent)">${formatCurrency(totalRev)}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Pesanan Aktif</div><div class="text-lg font-bold mt-1" style="color:var(--warning)">${activeOrders}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Total Menu</div><div class="text-lg font-bold mt-1">${DB.menuItems.length}</div></div>
      <div class="stat-card"><div class="text-xs" style="color:var(--muted)">Pengguna</div><div class="text-lg font-bold mt-1">${DB.users.length}</div></div>
    </div>
    ${(() => {
      const lowStock = DB.stockItems.filter(s => s.current_quantity <= s.min_quantity);
      if (!lowStock.length) return '';
      return `
    <div class="card mb-4" style="border-color:rgba(231,76,60,.3)">
      <h3 class="font-semibold text-sm mb-2" style="color:var(--danger)"><i class="fas fa-exclamation-triangle mr-1"></i>Peringatan Stok Rendah</h3>
      <div class="space-y-2">
        ${lowStock.map(s => `<div class="flex justify-between text-sm"><span>${s.name}</span><span style="color:var(--danger)">${s.current_quantity} / ${s.min_quantity} ${s.unit}</span></div>`).join('')}
      </div>
    </div>`})()}
    <div class="grid md:grid-cols-2 gap-4 mb-6">
      <div class="card"><canvas id="chart-admin-revenue" height="200"></canvas></div>
      <div class="card">
        <h3 class="font-semibold text-sm mb-3">Pesanan Terkini</h3>
        <div class="space-y-2 max-h-64 overflow-y-auto">
          ${DB.orders.slice(0, 6).map(o => `
          <div class="flex justify-between items-center text-sm py-2 border-b" style="border-color:var(--border)">
            <div><span class="font-medium">#${o.id.slice(-5).toUpperCase()}</span><span class="badge ${getStatusBadge(o.status)} ml-2">${getStatusLabel(o.status)}</span></div>
            <span>${formatCurrency(o.total_amount)}</span>
          </div>`).join('')}
        </div>
      </div>
    </div>
    <div class="card">
      <h3 class="font-semibold text-sm mb-3">Status Meja</h3>
      <div class="grid grid-cols-4 md:grid-cols-8 gap-2">
        ${DB.tables.map(t => `
        <div class="text-center py-3 rounded-xl" style="background:${t.status === 'available' ? 'rgba(39,174,96,.1)' : 'rgba(231,76,60,.1)'}">
          <i class="fas fa-chair mb-1" style="color:${t.status === 'available' ? 'var(--success)' : 'var(--danger)'}"></i>
          <div class="text-xs font-semibold">${t.number}</div>
        </div>`).join('')}
      </div>
    </div>
  </div>`;
        }

        function renderAdminWizard() {
            const steps = ['Menu', 'Meja', 'Akun Kasir', 'Selesai'];
            return `
  <div class="animate-fade-up">
    <h2 class="font-display text-xl font-bold mb-4">Setup Wizard</h2>
    <p class="text-sm mb-6" style="color:var(--muted)">Konfigurasi awal kafe Anda dalam hitungan menit</p>
    <div class="flex items-center gap-2 mb-8">
      ${steps.map((s, i) => `
        <div class="flex items-center ${i > 0 ? 'flex-1' : ''}">
          ${i > 0 ? `<div class="flex-1 h-1 rounded" style="background:${i <= State.wizardStep ? 'var(--accent)' : 'var(--border)'}"></div>` : ''}
          <div class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${i <= State.wizardStep ? '' : 'opacity-40'}" style="background:${i <= State.wizardStep ? 'var(--accent)' : 'var(--card)'};color:${i <= State.wizardStep ? '#fff' : 'var(--muted)'}">${i + 1}</div>
        </div>`).join('')}
    </div>
    ${State.wizardStep === 0 ? renderWizardMenu() : ''}
    ${State.wizardStep === 1 ? renderWizardTables() : ''}
    ${State.wizardStep === 2 ? renderWizardAccount() : ''}
    ${State.wizardStep === 3 ? renderWizardDone() : ''}
  </div>`;
        }

        function renderWizardMenu() {
            return `
  <div class="card mb-4">
    <h3 class="font-semibold mb-3">Menu Saat Ini</h3>
    <div class="space-y-2 max-h-48 overflow-y-auto mb-4">
      ${DB.menuItems.slice(0, 5).map(m => `<div class="flex justify-between text-sm py-2 border-b" style="border-color:var(--border)"><span>${m.name}</span><span style="color:var(--accent)">${formatCurrency(m.price)}</span></div>`).join('')}
      ${DB.menuItems.length > 5 ? `<div class="text-xs text-center" style="color:var(--muted)">+${DB.menuItems.length - 5} menu lainnya</div>` : ''}
    </div>
    <button onclick="nextWizardStep()" class="btn-primary w-full text-center">Menu Sudah Siap — Lanjut</button>
  </div>`;
        }

        function renderWizardTables() {
            return `
  <div class="card mb-4">
    <h3 class="font-semibold mb-3">Meja Kafe</h3>
    <div class="grid grid-cols-4 gap-3 mb-4">
      ${DB.tables.map(t => `
      <div class="text-center py-4 rounded-xl" style="background:var(--bg2);border:1px solid var(--border)">
        <i class="fas fa-chair text-lg mb-1" style="color:var(--accent)"></i>
        <div class="font-bold text-sm">${t.number}</div>
        <div class="text-[10px]" style="color:var(--muted)">${t.qr_code}</div>
      </div>`).join('')}
    </div>
    <button onclick="addTable()" class="btn-secondary w-full text-center mb-3"><i class="fas fa-plus mr-1"></i>Tambah Meja</button>
    <button onclick="nextWizardStep()" class="btn-primary w-full text-center">Meja Siap — Lanjut</button>
  </div>`;
        }

        function renderWizardAccount() {
            return `
  <div class="card mb-4">
    <h3 class="font-semibold mb-3">Akun Kasir</h3>
    <div class="space-y-3 mb-4">
      ${DB.users.filter(u => u.role === 'cashier').map(u => `
      <div class="flex items-center gap-3 p-3 rounded-xl" style="background:var(--bg2)">
        <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold" style="background:var(--success);color:#fff">${u.avatar}</div>
        <div><div class="font-semibold text-sm">${u.name}</div><div class="text-xs" style="color:var(--muted)">${u.email}</div></div>
      </div>`).join('')}
    </div>
    <button onclick="nextWizardStep()" class="btn-primary w-full text-center">Akun Siap — Selesai</button>
  </div>`;
        }

        function renderWizardDone() {
            return `
  <div class="card text-center py-8">
    <div class="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl" style="background:rgba(39,174,96,.15);color:var(--success)"><i class="fas fa-check"></i></div>
    <h3 class="font-display text-2xl font-bold mb-2">Siap Operasional!</h3>
    <p class="text-sm mb-6" style="color:var(--muted)">Kafe Anda sudah dikonfigurasi dan siap melayani pelanggan.</p>
    <button onclick="State.wizardStep=0;switchTab('overview')" class="btn-primary">Ke Dashboard</button>
  </div>`;
        }

        function nextWizardStep() { State.wizardStep = Math.min(3, State.wizardStep + 1); render() }
        function addTable() {
            const num = (DB.tables.length + 1).toString();
            DB.tables.push({ id: 't' + Date.now(), number: num, qr_code: 'ARQA-T' + num, status: 'available' });
            showToast(`Meja ${num} ditambahkan`, 'success'); render();
        }

        function renderAdminUsers() {
            return `
  <div class="animate-fade-up">
    <div class="flex justify-between items-center mb-4">
      <h2 class="font-display text-xl font-bold">Kelola Pengguna</h2>
      <button onclick="showAddUserModal()" class="btn-primary btn-sm"><i class="fas fa-plus mr-1"></i>Tambah</button>
    </div>
    <div class="space-y-3">
      ${DB.users.map(u => `
      <div class="card flex items-center gap-4 cursor-pointer hover:scale-[1.01] transition-transform" onclick="showEditUserModal('${u.id}')">
        <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold" style="background:var(--accent);color:#fff">${u.avatar}</div>
        <div class="flex-1">
          <div class="font-semibold text-sm">${u.name}</div>
          <div class="text-xs" style="color:var(--muted)">${u.email} — ${u.phone}</div>
        </div>
        <span class="badge ${u.role === 'admin' ? 'badge-cooking' : u.role === 'manager' ? 'badge-delivering' : u.role === 'cashier' ? 'badge-ready' : 'badge-pending'}">${getRoleLabel(u.role)}</span>
      </div>`).join('')}
    </div>
  </div>`;
        }

        function showAddUserModal() {
            showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Tambah Pengguna</h3>
      <div class="space-y-3">
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Nama</label><input id="new-user-name" class="input-field text-sm" placeholder="Nama lengkap"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Email</label><input id="new-user-email" class="input-field text-sm" placeholder="email@arqa.coffee"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Password</label><input id="new-user-pass" type="password" class="input-field text-sm" placeholder="Minimal 6 karakter"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Peran</label>
          <select id="new-user-role" class="input-field text-sm">
            <option value="cashier">Kasir</option><option value="kitchen">Juru Masak</option><option value="courier">Kurir</option><option value="manager">Manager</option><option value="customer">Pelanggan</option>
          </select>
        </div>
      </div>
      <button onclick="addUser()" class="btn-primary w-full mt-4 text-center">Simpan</button>
    </div>
  `);
        }

        function addUser() {
            const name = document.getElementById('new-user-name')?.value;
            const email = document.getElementById('new-user-email')?.value;
            const pass = document.getElementById('new-user-pass')?.value;
            const role = document.getElementById('new-user-role')?.value;
            if (!name || !email) { showToast('Nama dan email wajib diisi', 'warning'); return }
            DB.users.push({ id: 'u' + Date.now(), name, email, password: pass || 'password123', role, phone: '', avatar: name[0].toUpperCase() });
            closeModal(); showToast('Pengguna ditambahkan', 'success'); render();
        }

        function showEditUserModal(id) {
            const u = DB.users.find(x => x.id === id);
            if (!u) return;
            showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Edit Pengguna</h3>
      <div class="space-y-3">
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Nama</label><input id="edit-user-name" class="input-field text-sm" value="${u.name}"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Email</label><input id="edit-user-email" class="input-field text-sm" value="${u.email}"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Telepon</label><input id="edit-user-phone" class="input-field text-sm" value="${u.phone || ''}"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Peran</label>
          <select id="edit-user-role" class="input-field text-sm">
            <option value="admin" ${u.role === 'admin' ? 'selected' : ''}>Admin</option>
            <option value="manager" ${u.role === 'manager' ? 'selected' : ''}>Manager</option>
            <option value="cashier" ${u.role === 'cashier' ? 'selected' : ''}>Kasir</option>
            <option value="kitchen" ${u.role === 'kitchen' ? 'selected' : ''}>Juru Masak</option>
            <option value="courier" ${u.role === 'courier' ? 'selected' : ''}>Kurir</option>
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

        function saveEditUser(id) {
            const u = DB.users.find(x => x.id === id);
            if (!u) return;
            const name = document.getElementById('edit-user-name')?.value;
            const email = document.getElementById('edit-user-email')?.value;
            const phone = document.getElementById('edit-user-phone')?.value;
            const role = document.getElementById('edit-user-role')?.value;
            if (!name || !email) { showToast('Nama dan email wajib diisi', 'warning'); return }
            u.name = name; u.email = email; u.phone = phone; u.role = role; u.avatar = name[0].toUpperCase();
            closeModal(); showToast('Pengguna berhasil diperbarui', 'success'); render();
        }

        function deleteUser(id) {
            const u = DB.users.find(x => x.id === id);
            if (!u) return;
            if (!confirm('Hapus pengguna "' + u.name + '"? Tindakan ini tidak dapat dibatalkan.')) return;
            DB.users = DB.users.filter(x => x.id !== id);
            closeModal(); showToast('Pengguna dihapus', 'info'); render();
        }


        function renderAdminMenuMgmt() {
            return `
  <div class="animate-fade-up">
    <div class="flex justify-between items-center mb-4">
      <h2 class="font-display text-xl font-bold">Kelola Menu</h2>
      <button onclick="showAddMenuItemModal()" class="btn-primary btn-sm"><i class="fas fa-plus mr-1"></i>Tambah</button>
    </div>
    <div class="space-y-3">
      ${DB.menuItems.map(m => `
      <div class="card flex items-center gap-4 cursor-pointer hover:scale-[1.01] transition-transform" onclick="showEditMenuItemModal('${m.id}')">
        <img src="${m.image}" class="w-14 h-14 rounded-xl object-cover" onerror="this.src='https://picsum.photos/seed/${m.id}/100/100'">
        <div class="flex-1 min-w-0">
          <div class="font-semibold text-sm truncate">${m.name}</div>
          <div class="text-xs" style="color:var(--muted)">${m.category} — ${formatCurrency(m.price)}</div>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="event.stopPropagation(); toggleMenuAvail('${m.id}')" class="text-xs px-3 py-1 rounded-lg" style="background:${m.is_available ? 'rgba(39,174,96,.15)' : 'rgba(231,76,60,.15)'};color:${m.is_available ? 'var(--success)' : 'var(--danger)'}">${m.is_available ? 'Tersedia' : 'Habis'}</button>
        </div>
      </div>`).join('')}
    </div>
  </div>`;
        }

        function toggleMenuAvail(id) {
            const m = DB.menuItems.find(x => x.id === id); if (m) { m.is_available = !m.is_available; showToast(`${m.name}: ${m.is_available ? 'Tersedia' : 'Habis'}`, 'info'); render() }
            if (m && !m.is_available) {
              addNotification({
                title: 'Menu Habis',
                message: m.name + ' — ditandai tidak tersedia',
                type: 'warning',
                icon: 'fa-circle-exclamation',
                targetRoles: ['cashier', 'kitchen']
              });
            }
        }

        function showEditMenuItemModal(id) {
            const m = DB.menuItems.find(x => x.id === id);
            if (!m) return;
            showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Edit Menu</h3>
      <div class="space-y-3">
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Nama Item</label><input id="edit-menu-name" class="input-field text-sm" value="${m.name}"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">URL Gambar</label><input id="edit-menu-image" class="input-field text-sm" value="${m.image}"></div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Harga</label><input id="edit-menu-price" type="number" class="input-field text-sm" value="${m.price}"></div>
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Kategori</label>
            <select id="edit-menu-cat" class="input-field text-sm">
              <option value="coffee" ${m.category === 'coffee' ? 'selected' : ''}>Kopi</option>
              <option value="non-coffee" ${m.category === 'non-coffee' ? 'selected' : ''}>Non-Kopi</option>
              <option value="food" ${m.category === 'food' ? 'selected' : ''}>Makanan</option>
              <option value="snack" ${m.category === 'snack' ? 'selected' : ''}>Snack</option>
            </select>
          </div>
        </div>
      </div>
      <button onclick="saveEditMenuItem('${m.id}')" class="btn-primary w-full mt-4 text-center">Simpan Perubahan</button>
    </div>
  `);
        }

        function saveEditMenuItem(id) {
            const m = DB.menuItems.find(x => x.id === id);
            if (!m) return;
            const name = document.getElementById('edit-menu-name')?.value;
            const price = parseInt(document.getElementById('edit-menu-price')?.value || '0');
            const image = document.getElementById('edit-menu-image')?.value;
            const cat = document.getElementById('edit-menu-cat')?.value;
            if (!name) { showToast('Nama menu wajib diisi', 'warning'); return }
            m.name = name;
            m.price = price;
            if (image) m.image = image;
            if (cat) m.category = cat;
            closeModal(); showToast('Menu berhasil diperbarui', 'success'); render();
        }

        function showAddMenuItemModal() {
            showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Tambah Menu</h3>
      <div class="space-y-3">
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Nama</label><input id="new-menu-name" class="input-field text-sm" placeholder="Nama item"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Deskripsi</label><input id="new-menu-desc" class="input-field text-sm" placeholder="Deskripsi singkat"></div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Harga</label><input id="new-menu-price" type="number" class="input-field text-sm" placeholder="25000"></div>
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Kategori</label>
            <select id="new-menu-cat" class="input-field text-sm"><option value="coffee">Kopi</option><option value="non-coffee">Non-Kopi</option><option value="food">Makanan</option><option value="snack">Snack</option></select>
          </div>
        </div>
      </div>
      <button onclick="addMenuItem()" class="btn-primary w-full mt-4 text-center">Simpan</button>
    </div>
  `);
        }

        function addMenuItem() {
            const name = document.getElementById('new-menu-name')?.value;
            const price = parseInt(document.getElementById('new-menu-price')?.value || '0');
            if (!name) { showToast('Nama menu wajib diisi', 'warning'); return }
            DB.menuItems.push({ id: 'm' + Date.now(), name, description: document.getElementById('new-menu-desc')?.value || '', price, category: document.getElementById('new-menu-cat')?.value || 'coffee', image: `https://picsum.photos/seed/${Date.now()}/400/300`, is_available: true });
            closeModal(); showToast('Menu ditambahkan', 'success'); render();
        }

        function renderAdminTablesMgmt() {
            return `
  <div class="animate-fade-up">
    <div class="flex justify-between items-center mb-4">
      <h2 class="font-display text-xl font-bold">Kelola Meja</h2>
      <button onclick="addTable()" class="btn-primary btn-sm"><i class="fas fa-plus mr-1"></i>Tambah</button>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      ${DB.tables.map(t => `
      <div class="card text-center">
        <div class="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center text-2xl" style="background:${t.status === 'available' ? 'rgba(39,174,96,.1)' : 'rgba(231,76,60,.1)'}">
          <i class="fas fa-chair" style="color:${t.status === 'available' ? 'var(--success)' : 'var(--danger)'}"></i>
        </div>
        <div class="font-bold text-lg">Meja ${t.number}</div>
        <div class="text-xs mb-2" style="color:var(--muted)">QR: ${t.qr_code}</div>
        <span class="badge ${t.status === 'available' ? 'badge-ready' : 'badge-cooking'}">${t.status === 'available' ? 'Tersedia' : 'Terisi'}</span>
        <div class="mt-3">
          <button onclick="toggleTableStatus('${t.id}')" class="btn-secondary btn-sm w-full text-center">Toggle Status</button>
        </div>
      </div>`).join('')}
    </div>
  </div>`;
        }

        function toggleTableStatus(id) {
            const t = DB.tables.find(x => x.id === id); if (t) { t.status = t.status === 'available' ? 'occupied' : 'available'; render() }
        }


        function renderAdminPromos() {
            return `
  <div class="animate-fade-up">
    <div class="flex justify-between items-center mb-4">
      <h2 class="font-display text-xl font-bold">Kelola Promo</h2>
      <button onclick="showAddPromoModal()" class="btn-primary btn-sm"><i class="fas fa-plus mr-1"></i>Tambah</button>
    </div>
    <div class="space-y-3">
      ${(DB.promos || []).map(p => `
      <div class="card flex flex-col gap-3">
        <div class="flex items-start gap-4 cursor-pointer hover:scale-[1.01] transition-transform" onclick="showEditPromoModal('${p.id}')">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center text-xl text-white" style="background:${p.color}"><i class="fas ${p.icon}"></i></div>
          <div class="flex-1">
            <div class="font-bold text-sm">${p.title}</div>
            <div class="text-xs mb-1" style="color:var(--muted)">${p.desc}</div>
            <div class="text-[10px] text-gray-500 font-mono">${p.code}</div>
          </div>
          <button onclick="event.stopPropagation(); togglePromoStatus('${p.id}')" class="text-xs px-3 py-1 rounded-lg" style="background:${p.is_active ? 'rgba(39,174,96,.15)' : 'rgba(231,76,60,.15)'};color:${p.is_active ? 'var(--success)' : 'var(--danger)'}">${p.is_active ? 'Aktif' : 'Nonaktif'}</button>
        </div>
      </div>`).join('')}
      ${!(DB.promos || []).length ? '<div class="text-center py-6 text-sm" style="color:var(--muted)">Belum ada promo</div>' : ''}
    </div>
  </div>`;
        }

        function togglePromoStatus(id) {
            const p = DB.promos.find(x => x.id === id);
            if (p) {
                p.is_active = !p.is_active;
                showToast(`Promo ${p.title} ${p.is_active ? 'diaktifkan' : 'dinonaktifkan'}`, 'info');
                render();
            }
        }

        function showAddPromoModal() {
            showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Tambah Promo</h3>
      <div class="space-y-3">
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Judul Promo</label><input id="new-promo-title" class="input-field text-sm" placeholder="Misal: Diskon 50%"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Kode Promo</label><input id="new-promo-code" class="input-field text-sm" placeholder="Misal: diskon50"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Deskripsi</label><input id="new-promo-desc" class="input-field text-sm" placeholder="Penjelasan singkat promo"></div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Ikon (FontAwesome)</label><input id="new-promo-icon" class="input-field text-sm" placeholder="fa-percent"></div>
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Warna Tema</label><input id="new-promo-color" type="color" class="input-field text-sm h-10 p-1" value="#E07A3A"></div>
        </div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Syarat & Ketentuan (pisahkan dgn koma)</label><textarea id="new-promo-terms" class="input-field text-sm min-h-[60px]" placeholder="Berlaku hari Senin, Minimal order 50rb..."></textarea></div>
      </div>
      <button onclick="addPromo()" class="btn-primary w-full mt-4 text-center">Simpan Promo</button>
    </div>
  `);
        }

        function addPromo() {
            const title = document.getElementById('new-promo-title')?.value;
            const code = document.getElementById('new-promo-code')?.value;
            const desc = document.getElementById('new-promo-desc')?.value;
            const icon = document.getElementById('new-promo-icon')?.value || 'fa-tag';
            const color = document.getElementById('new-promo-color')?.value || '#E07A3A';
            const termsStr = document.getElementById('new-promo-terms')?.value || '';
            
            if (!title || !code) { showToast('Judul dan kode promo wajib diisi', 'warning'); return; }
            
            if (!DB.promos) DB.promos = [];
            DB.promos.push({
                id: 'p' + Date.now(),
                code,
                title,
                desc,
                icon,
                color,
                terms: termsStr.split(',').map(t => t.trim()).filter(Boolean),
                is_active: true
            });
            
            closeModal();
            showToast('Promo berhasil ditambahkan', 'success');
            render();
        }

        function showEditPromoModal(id) {
            const p = DB.promos.find(x => x.id === id);
            if (!p) return;
            showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Edit Promo</h3>
      <div class="space-y-3">
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Judul Promo</label><input id="edit-promo-title" class="input-field text-sm" value="${p.title}"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Kode Promo</label><input id="edit-promo-code" class="input-field text-sm" value="${p.code}"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Deskripsi</label><input id="edit-promo-desc" class="input-field text-sm" value="${p.desc}"></div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Ikon (FontAwesome)</label><input id="edit-promo-icon" class="input-field text-sm" value="${p.icon}"></div>
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Warna Tema</label><input id="edit-promo-color" type="color" class="input-field text-sm h-10 p-1" value="${p.color}"></div>
        </div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Syarat & Ketentuan (pisahkan dgn koma)</label><textarea id="edit-promo-terms" class="input-field text-sm min-h-[60px]">${(p.terms||[]).join(', ')}</textarea></div>
      </div>
      <div class="flex gap-2 mt-4">
        <button onclick="deletePromo('${p.id}')" class="btn-sm flex-1 text-center" style="background:rgba(231,76,60,.15);color:var(--danger);border:1px solid rgba(231,76,60,.3);border-radius:10px;padding:10px"><i class="fas fa-trash mr-1"></i>Hapus</button>
        <button onclick="saveEditPromo('${p.id}')" class="btn-primary flex-1 text-center">Simpan</button>
      </div>
    </div>
  `);
        }

        function saveEditPromo(id) {
            const p = DB.promos.find(x => x.id === id);
            if (!p) return;
            
            const title = document.getElementById('edit-promo-title')?.value;
            const code = document.getElementById('edit-promo-code')?.value;
            if (!title || !code) { showToast('Judul dan kode promo wajib diisi', 'warning'); return; }
            
            p.title = title;
            p.code = code;
            p.desc = document.getElementById('edit-promo-desc')?.value;
            p.icon = document.getElementById('edit-promo-icon')?.value;
            p.color = document.getElementById('edit-promo-color')?.value;
            
            const termsStr = document.getElementById('edit-promo-terms')?.value || '';
            p.terms = termsStr.split(',').map(t => t.trim()).filter(Boolean);
            
            closeModal();
            showToast('Promo berhasil diperbarui', 'success');
            render();
        }

        function deletePromo(id) {
            const p = DB.promos.find(x => x.id === id);
            if (!p) return;
            if (!confirm(`Hapus promo "${p.title}"? Tindakan ini tidak dapat dibatalkan.`)) return;
            
            DB.promos = DB.promos.filter(x => x.id !== id);
            closeModal();
            showToast('Promo dihapus', 'info');
            render();
        }
