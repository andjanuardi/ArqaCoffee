// ============================================================
// RENDER ENGINE (async)
// ============================================================
async function render() {
  var app = document.getElementById('app');
  try {
    if (State.currentUser) {
      app.innerHTML = '<div class="min-h-screen flex items-center justify-center" style="background:var(--bg)"><div class="loading-overlay" style="position:static"><div class="spinner-big"></div></div></div>';
      app.innerHTML = await renderMainApp();
      afterRender();
    } else {
      app.innerHTML = renderLogin();
      afterLoginRender();
    }
  } catch (e) {
    console.error('[render]', e);
    app.innerHTML = '<div class="error-state" style="min-height:100vh;display:flex;align-items:center;justify-content:center"><div><i class="fas fa-exclamation-circle"></i><p>Gagal memuat halaman</p><p style="font-size:0.75rem;margin-top:0.5rem">' + e.message + '</p><button onclick="render()" class="btn-primary">Coba Lagi</button></div></div>';
  }
}
