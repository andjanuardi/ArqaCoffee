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
                { role: 'customer', icon: 'fa-user', label: 'Pelanggan', color: '#1abc9c', desc: 'Pesan & lacak pesanan' },
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
        </div>
      </div>
      <p class="text-center mt-6 text-xs" style="color:var(--muted)">v1.0 MVP — ARQA Coffee Management System</p>
    </div>
  </div>`;
        }

        function quickLogin(role) {
            const u = DB.users.find(u => u.role === role);
            if (u) { State.currentUser = u; State.currentView = 'main'; State.currentTab[role] = getDefaultTab(role); render(); showToast(`Selamat datang, ${u.name}!`, 'success') }
        }
        function handleLogin() {
            const e = document.getElementById('login-email').value;
            const p = document.getElementById('login-pass').value;
            const u = DB.users.find(u => u.email === e && u.password === p);
            if (u) { State.currentUser = u; State.currentView = 'main'; State.currentTab[u.role] = getDefaultTab(u.role); render(); showToast(`Selamat datang, ${u.name}!`, 'success') }
            else showToast('Email atau password salah', 'error');
        }
        function getDefaultTab(role) {
            const m = { admin: 'overview', manager: 'dashboard', cashier: 'orders', kitchen: 'queue', courier: 'available', customer: 'menu' };
            return m[role] || 'menu';
        }
        function afterLoginRender() { }

