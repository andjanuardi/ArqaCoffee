// ============================================================
        // INITIAL RENDER + AUTO-SAVE
        // ============================================================
        if ("Notification" in window && Notification.permission === "default") {
          Notification.requestPermission();
        }
        loadNotifications();
        try {
          const raw = sessionStorage.getItem('arqa_session');
          if (raw) {
            const sesh = JSON.parse(raw);
            const u = DB.users.find(u => u.id === sesh.userId);
            if (u) {
              State.currentUser = u;
              State.currentView = 'main';
              if (sesh.currentTab) State.currentTab = sesh.currentTab;
            }
          }
        } catch (e) {}
        render();
        setInterval(saveDB, 1000);

        window.addEventListener('storage', function(e) {
          if (e.key === 'arqa_db' && e.newValue) {
            var fresh = JSON.parse(e.newValue);
            Object.keys(fresh).forEach(function(k) { DB[k] = fresh[k]; });
            loadNotifications();
            if (!document.getElementById('modal-overlay')) render();
          }
          if (e.key === 'arqa_notifications' && e.newValue) {
            var oldCount = getUnreadCount();
            loadNotifications();
            var newCount = getUnreadCount();
            var badge = document.getElementById('notif-badge');
            if (badge) {
              if (newCount > 0) { badge.textContent = newCount; badge.style.display = 'flex'; }
              else badge.style.display = 'none';
            }
            if (!document.getElementById('modal-overlay')) render();
            if (newCount > oldCount) showToast('Notifikasi baru', 'info');
          }
        });

