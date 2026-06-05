// ============================================================
        // INITIAL RENDER + AUTO-SAVE
        // ============================================================
        if ("Notification" in window && Notification.permission === "default") {
          Notification.requestPermission();
        }
        loadNotifications();
        render();
        setInterval(saveDB, 3000);

