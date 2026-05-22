// ============================================================
// RENDER ENGINE
// ============================================================
function render() {
  const app = document.getElementById('app');
  if (State.currentUser) {
    app.innerHTML = renderMainApp();
    afterRender();
  } else {
    app.innerHTML = renderLogin();
    afterLoginRender();
  }
}
