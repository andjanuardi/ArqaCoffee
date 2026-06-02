// ============================================================
// LOGIN SCREEN
// ============================================================
function renderLogin() {
  const roles = [
    { role: 'admin', icon: 'fa-shield-halved', label: 'Admin', color: '#e74c3c', desc: 'Akses penuh semua modul' },
    { role: 'manager', icon: 'fa-chart-line', label: 'Manager', color: '#3498db', desc: 'Monitoring & laporan' },
    { role: 'cashier', icon: 'fa-cash-register', label: 'Kasir', color: '#27ae60', desc: 'Kelola pesanan & bayar' },
    { role: 'kitchen', icon: 'fa-fire-burner', label: 'Juru Masak', color: '#e07a3a', desc: 'Proses pesanan dapur' },
    { role: 'courier', icon: 'fa-motorcycle', label: 'Kurir', color: '#9b59b6', desc: 'Antar pesanan delivery' },
    { role: 'waiter', icon: 'fa-bell-concierge', label: 'Waiters', color: '#f39c12', desc: 'Layanan pesanan meja' },
    { role: 'playground', icon: 'fa-people-group', label: 'Playground', color: '#e67e22', desc: 'Tiket bermain anak' },
    { role: 'customer', icon: 'fa-user', label: 'Pelanggan', color: '#1abc9c', desc: 'Pesan & lacak pesanan' },
    { role: 'mitra_juru_masak', icon: 'fa-handshake', label: 'Mitra Juru Masak', color: '#e84393', desc: 'Antrian, menu & laporan keuangan' },
  ];
  return `
  <div class="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style="background:linear-gradient(135deg,#0a1a1f 0%,#112830 40%,#162e38 70%,#0a1a1f 100%)">
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10" style="background:radial-gradient(circle,var(--accent),transparent)"></div>
      <div class="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-8" style="background:radial-gradient(circle,var(--accent2),transparent);opacity:.08"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5" style="background:radial-gradient(circle,var(--accent),transparent)"></div>
    </div>
    <div class="w-full max-w-5xl relative z-10">
      <div class="text-center mb-10 animate-fade-up">
        <div class="inline-flex items-center gap-3 mb-4">
          <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style="background:linear-gradient(135deg,var(--accent),var(--accent3))">
            <i class="fas fa-mug-hot text-white"></i>
          </div>
          <h1 class="font-display text-4xl md:text-5xl font-black tracking-tight" style="background:linear-gradient(135deg,var(--text),var(--accent2));-webkit-background-clip:text;-webkit-text-fill-color:transparent">ARQA Coffee</h1>
        </div>
        <p class="text-base" style="color:var(--muted)">Smart Cafe Management System</p>
      </div>
      <div class="glass-strong rounded-3xl p-8 md:p-10 animate-fade-up" style="animation-delay:.1s">
        <h2 class="text-xl font-bold mb-2 text-center">Pilih Peran & Masuk</h2>
        <p class="text-sm mb-8 text-center" style="color:var(--muted)">Demo — klik peran mana saja untuk langsung masuk</p>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          ${roles.map((r, i) => `
          <button onclick="quickLogin('${r.role}')" class="card text-center p-5 hover:scale-[1.03] transition-all cursor-pointer group" style="animation-delay:${i * 80}ms;border:1px solid var(--border)">
            <div class="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center text-xl transition-all" style="background:${r.color}22;color:${r.color}">
              <i class="fas ${r.icon}"></i>
            </div>
            <div class="font-semibold text-sm mb-1">${r.label}</div>
            <div class="text-xs" style="color:var(--muted)">${r.desc}</div>
          </button>`).join('')}
        </div>
        <div class="border-t pt-6" style="border-color:var(--border)">
          <p class="text-xs mb-4 text-center" style="color:var(--muted)">Atau masuk dengan akun</p>
          <div class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input id="login-email" type="email" placeholder="Email" class="input-field flex-1 text-sm" value="">
            <input id="login-pass" type="password" placeholder="Password" class="input-field flex-1 text-sm" value="">
            <button onclick="handleLogin()" class="btn-primary whitespace-nowrap">Masuk</button>
          </div>
          <div class="text-center mt-4">
            <button onclick="showCustomerRegisterModal()" class="text-sm font-semibold" style="color:var(--accent);background:none;border:none;cursor:pointer"><i class="fas fa-user-plus mr-1"></i>Register Pelanggan Baru</button>
            <div class="mt-2">
              <button onclick="showForgotPasswordModal()" class="text-xs font-medium" style="color:var(--muted);background:none;border:none;cursor:pointer;text-decoration:underline;text-underline-offset:3px"><i class="fas fa-lock mr-1"></i>Lupa Password?</button>
            </div>
            <div class="mt-1">
              <button onclick="showMitraRegistrationModal()" class="text-xs font-medium" style="color:var(--muted);background:none;border:none;cursor:pointer;text-decoration:underline;text-underline-offset:3px"><i class="fas fa-handshake mr-1"></i>Ingin Jadi Mitra Kami?</button>
            </div>
          </div>
        </div>
      </div>
      <p class="text-center mt-6 text-xs" style="color:var(--muted)">v1.0 MVP — ARQA Coffee Management System</p>
    </div>
  </div>`;
}

function quickLogin(role) {
  const u = DB.users.find(u => u.role === role);
  if (u) {
    State.currentUser = u;
    State.currentView = 'main';
    State.currentTab[role] = getDefaultTab(role);
    render();
    showToast(`Selamat datang, ${u.name}!`, 'success');
  }
}

function handleLogin() {
  const e = document.getElementById('login-email').value;
  const p = document.getElementById('login-pass').value;
  const u = DB.users.find(u => u.email === e && u.password === p);
  if (u) {
    State.currentUser = u;
    State.currentView = 'main';
    State.currentTab[u.role] = getDefaultTab(u.role);
    render();
    showToast(`Selamat datang, ${u.name}!`, 'success');
  } else showToast('Email atau password salah', 'error');
}

function getDefaultTab(role) {
  const m = { admin: 'overview', manager: 'dashboard', cashier: 'orders', kitchen: 'queue', courier: 'available', waiter: 'menu', playground: 'tickets', customer: 'menu', mitra_juru_masak: 'queue' };
  return m[role] || 'menu';
}

function showCustomerRegisterModal() {
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Daftar Pelanggan Baru</h3>
      <div class="space-y-3">
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Nama Lengkap</label><input id="reg-name" class="input-field text-sm" placeholder="Nama Anda"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Email</label><input id="reg-email" type="email" class="input-field text-sm" placeholder="email@example.com"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Password</label><input id="reg-pass" type="password" class="input-field text-sm" placeholder="Min. 6 karakter"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Nomor Telepon</label><input id="reg-phone" class="input-field text-sm" placeholder="08xxxxxxxxxx"></div>
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Alamat</label><textarea id="reg-address" class="input-field text-sm min-h-[80px]" placeholder="Alamat lengkap"></textarea></div>
      </div>
      <button onclick="registerCustomer()" class="btn-primary w-full mt-4 text-center">Daftar & Masuk</button>
    </div>
  `);
}

function registerCustomer() {
  const name = document.getElementById('reg-name')?.value;
  const email = document.getElementById('reg-email')?.value;
  const pass = document.getElementById('reg-pass')?.value;
  const phone = document.getElementById('reg-phone')?.value;
  const address = document.getElementById('reg-address')?.value;
  if (!name || !name.trim() || !email || !email.trim()) { showToast('Nama dan email wajib diisi', 'warning'); return; }
  if (DB.users.find(u => u.email === email.trim())) { showToast('Email sudah terdaftar', 'error'); return; }
  const u = { id: 'u' + Date.now(), name: name.trim(), email: email.trim(), password: pass || 'password123', role: 'customer', phone: phone?.trim() || '', address: address?.trim() || '', avatar: name.trim()[0].toUpperCase() };
  DB.users.push(u);
  State.currentUser = u;
  State.currentView = 'main';
  State.currentTab.customer = 'menu';
  closeModal();
  render();
  showToast('Akun berhasil dibuat, selamat datang!', 'success');
}

function showForgotPasswordModal() {
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-4">Lupa Password</h3>
      <p class="text-sm mb-4" style="color:var(--muted)">Masukkan email Anda, kami akan mereset password ke <strong>password123</strong></p>
      <div class="space-y-3">
        <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Email</label><input id="forgot-email" type="email" class="input-field text-sm" placeholder="email@example.com"></div>
      </div>
      <div class="flex gap-2 mt-4">
        <button onclick="closeModal()" class="btn-sm flex-1 text-center" style="background:rgba(255,255,255,.05);border:1px solid var(--border);border-radius:10px;padding:10px">Batal</button>
        <button onclick="resetPassword()" class="btn-primary flex-1 text-center">Reset Password</button>
      </div>
    </div>
  `);
}

function resetPassword() {
  const email = document.getElementById('forgot-email')?.value;
  if (!email || !email.trim()) { showToast('Masukkan email Anda', 'warning'); return; }
  const u = DB.users.find(u => u.email === email.trim());
  if (!u) { showToast('Email tidak ditemukan', 'error'); return; }
  u.password = 'password123';
  closeModal();
  showToast('Password berhasil direset ke "password123"', 'success');
}

function showMitraRegistrationModal() {
  showModal(`
    <div>
      <h3 class="font-display text-lg font-bold mb-2 text-center">Daftar Mitra ARQA Coffee</h3>
      <p class="text-sm mb-5 text-center" style="color:var(--muted)">Pilih peran mitra yang kamu inginkan</p>
      <div class="grid grid-cols-2 gap-4 mb-5">
        <div class="card text-center p-5 cursor-pointer hover:scale-[1.03] transition-all" style="border:2px solid var(--border)" id="mitra-role-courier" onclick="selectMitraRole('courier')">
          <div class="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center text-xl" style="background:rgba(155,89,182,.15);color:#9b59b6"><i class="fas fa-motorcycle"></i></div>
          <div class="font-semibold text-sm">Kurir</div>
          <div class="text-xs mt-1" style="color:var(--muted)">Antar pesanan delivery</div>
        </div>
        <div class="card text-center p-5 cursor-pointer hover:scale-[1.03] transition-all" style="border:2px solid var(--border)" id="mitra-role-mitra" onclick="selectMitraRole('mitra_juru_masak')">
          <div class="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center text-xl" style="background:rgba(232,67,147,.15);color:#e84393"><i class="fas fa-handshake"></i></div>
          <div class="font-semibold text-sm">Mitra Juru Masak</div>
          <div class="text-xs mt-1" style="color:var(--muted)">Antrian, menu & laporan</div>
        </div>
      </div>
      <div id="mitra-reg-form" style="display:none">
        <div class="space-y-3">
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Nama Lengkap</label><input id="mitra-reg-name" class="input-field text-sm w-full" placeholder="Nama Anda"></div>
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Email</label><input id="mitra-reg-email" type="email" class="input-field text-sm w-full" placeholder="email@example.com"></div>
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Nomor Telepon</label><input id="mitra-reg-phone" class="input-field text-sm w-full" placeholder="08xxxxxxxxxx"></div>
          <div><label class="text-xs font-semibold mb-1 block" style="color:var(--muted)">Alamat</label><textarea id="mitra-reg-address" class="input-field text-sm w-full min-h-[80px]" placeholder="Alamat lengkap"></textarea></div>
          <div id="mitra-selected-role" class="text-xs font-semibold" style="color:var(--accent)"></div>
        </div>
        <button onclick="submitMitraRegistration()" class="btn-primary w-full mt-4 text-center"><i class="fas fa-paper-plane mr-1"></i>Kirim Pendaftaran</button>
      </div>
      <button onclick="closeModal()" class="btn-secondary w-full mt-3 text-center">Batal</button>
    </div>
  `);
}

let _selectedMitraRole = '';

function selectMitraRole(role) {
  _selectedMitraRole = role;
  const c = document.getElementById('mitra-role-courier');
  const m = document.getElementById('mitra-role-mitra');
  if (c) c.style.borderColor = role === 'courier' ? '#9b59b6' : 'var(--border)';
  if (m) m.style.borderColor = role === 'mitra_juru_masak' ? '#e84393' : 'var(--border)';
  const form = document.getElementById('mitra-reg-form');
  if (form) form.style.display = 'block';
  const label = document.getElementById('mitra-selected-role');
  if (label) label.textContent = 'Terpilih: ' + (role === 'courier' ? 'Kurir' : 'Mitra Juru Masak');
}

function submitMitraRegistration() {
  const name = document.getElementById('mitra-reg-name')?.value?.trim();
  const email = document.getElementById('mitra-reg-email')?.value?.trim();
  const phone = document.getElementById('mitra-reg-phone')?.value?.trim();
  const address = document.getElementById('mitra-reg-address')?.value?.trim();
  if (!_selectedMitraRole) { showToast('Pilih peran mitra terlebih dahulu', 'warning'); return; }
  if (!name) { showToast('Nama wajib diisi', 'warning'); return; }
  if (!email) { showToast('Email wajib diisi', 'warning'); return; }
  if (DB.users.find(u => u.email === email)) { showToast('Email sudah terdaftar sebagai pengguna', 'error'); return; }
  if (!DB.mitraRegistrations) DB.mitraRegistrations = [];
  DB.mitraRegistrations.push({
    id: 'mr' + Date.now(),
    name, email, phone, address,
    role: _selectedMitraRole,
    status: 'pending',
    created_at: new Date().toISOString(),
  });
  closeModal();
  showModal(`
    <div class="text-center">
      <div class="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl" style="background:rgba(232,67,147,.12);color:#e84393"><i class="fas fa-clock"></i></div>
      <h3 class="font-display text-lg font-bold mb-2">Pendaftaran Terkirim!</h3>
      <p class="text-sm mb-2" style="color:var(--muted)">Terima kasih, <strong>${name}</strong>!</p>
      <p class="text-sm mb-4" style="color:var(--muted)">Pendaftaran kamu sebagai <strong>${_selectedMitraRole === 'courier' ? 'Kurir' : 'Mitra Juru Masak'}</strong> sedang kami proses.</p>
      <div class="card mb-4 text-sm" style="background:rgba(232,67,147,.06);border:1px solid rgba(232,67,147,.15)">
        <i class="fas fa-info-circle mr-1" style="color:var(--accent)"></i>
        Mohon tunggu konfirmasi dari Admin. Kami akan menghubungi kamu melalui <strong>${email}</strong> atau nomor telepon yang didaftarkan.
      </div>
      <button onclick="closeModal()" class="btn-primary w-full text-center">Tutup</button>
    </div>
  `);
  showToast('Pendaftaran mitra berhasil dikirim!', 'success');
}

function afterLoginRender() { }
