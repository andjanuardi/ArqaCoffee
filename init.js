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
        setInterval(saveDB, 3000);

