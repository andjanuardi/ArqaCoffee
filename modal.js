// ============================================================
        // MODAL SYSTEM
        // ============================================================
        let modalCallback = null;

        function showModal(html, callback) {
            // Hapus modal lama jika ada
            closeModal();

            const overlay = document.createElement('div');
            overlay.className = 'modal-overlay';
            overlay.id = 'modal-overlay';
            overlay.innerHTML = `<div class="modal-content">${html}</div>`;
            document.body.appendChild(overlay);

            // Tutup modal saat klik overlay di luar konten
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) closeModal();
            });

            if (callback) {
                modalCallback = callback;
                // Timeout agar DOM siap sebelum inisialisasi peta/chart
                setTimeout(() => {
                    if (modalCallback) modalCallback();
                }, 50);
            }
        }

        function closeModal() {
            const modal = document.getElementById('modal-overlay');
            if (modal) modal.remove();
            modalCallback = null;

            // Bersihkan instance peta di dalam modal
            Object.keys(State.mapInstances).forEach(key => {
                if (key.startsWith('modal-') || key === 'tracking') {
                    try { State.mapInstances[key].remove(); } catch (e) { }
                    delete State.mapInstances[key];
                }
            });
        }

        // Perbaikan fungsi showMenuItem untuk menyimpan state item aktif
        function showMenuItem(id) {
            const m = getMenuItem(id);
            if (!m) return;
            State._activeMenuItem = m; // Simpan item untuk kalkulasi qty
            modalQty = 1;
            showModal(`
    <div>
      <img src="${m.image}" alt="${m.name}" class="w-full h-48 object-cover rounded-xl mb-4" onerror="this.src='https://picsum.photos/seed/${m.id}/400/300'">
      <div class="flex justify-between items-start mb-2">
        <h3 class="font-display text-xl font-bold">${m.name}</h3>
        <span class="font-bold text-lg" style="color:var(--accent)">${formatCurrency(m.price)}</span>
      </div>
      <p class="text-sm mb-4" style="color:var(--muted)">${m.description}</p>
      <div class="mb-4">
        <label class="text-xs font-semibold mb-2 block" style="color:var(--muted)">Catatan</label>
        <input id="item-notes" class="input-field text-sm" placeholder="Misal: kurangi gula, extra shot...">
      </div>
      <div class="flex items-center justify-between mb-6">
        <span class="text-sm font-semibold">Jumlah</span>
        <div class="flex items-center gap-3">
          <div class="qty-btn" onclick="updateModalQty(-1)">-</div>
          <span id="modal-qty" class="font-bold text-lg w-8 text-center">${modalQty}</span>
          <div class="qty-btn" onclick="updateModalQty(1)">+</div>
        </div>
      </div>
      <button onclick="addToCart('${m.id}')" class="btn-primary w-full flex items-center justify-center gap-2">
        <i class="fas fa-plus"></i> Tambah ke Keranjang — <span id="modal-total">${formatCurrency(m.price)}</span>
      </button>
    </div>
  `);
        }

