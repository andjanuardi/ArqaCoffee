// ============================================================
// PERMISSION GATE + INITIAL RENDER + AUTO-SAVE
// ============================================================
(function init() {
  var notifOk =
    !("Notification" in window) || Notification.permission === "granted";
  var notifDenied =
    "Notification" in window && Notification.permission === "denied";

  if (notifDenied) {
    renderPermissionGate();
    return;
  }

  if (notifOk) {
    checkRemainingSilently();
    return;
  }

  renderPermissionGate();
})();

function renderPermissionGate() {
  startApp();
  return;
  var gate = document.getElementById("permission-gate");
  var notifOk =
    !("Notification" in window) || Notification.permission === "granted";
  var geoOk = State._geoGranted === true;
  var camOk = State._cameraGranted === true;
  var bothOk = notifOk && geoOk && camOk;

  var html = [
    '<div id="permission-gate" class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" style="background:var(--bg)">',
    '<div class="w-full max-w-md text-center py-8">',
    '<div class="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl" style="background:linear-gradient(135deg,var(--accent),var(--accent3))">',
    '<i class="fas fa-mug-hot text-white"></i>',
    "</div>",
    '<h1 class="font-display text-2xl font-black mb-1">ARQA Coffee</h1>',
    '<p class="text-sm mb-8" style="color:var(--muted)">Akses diperlukan untuk melanjutkan</p>',
    '<div class="space-y-3 mb-6">',
    '<div class="flex items-center justify-between p-4 rounded-xl" style="background:var(--card)">',
    '<div class="flex items-center gap-3">',
    '<div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background:rgba(39,174,96,.12)"><i class="fas fa-location-dot" style="color:var(--success)"></i></div>',
    '<div class="text-left"><div class="font-semibold text-sm">Lokasi</div><div class="text-xs" style="color:var(--muted)">Untuk lacak pengantaran & absensi</div></div>',
    "</div>",
    '<div class="text-2xl ' +
      (geoOk ? "text-green-400" : "text-red-400") +
      '"><i class="fas ' +
      (geoOk ? "fa-check-circle" : "fa-times-circle") +
      '"></i></div>',
    "</div>",
    '<div class="flex items-center justify-between p-4 rounded-xl" style="background:var(--card)">',
    '<div class="flex items-center gap-3">',
    '<div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background:rgba(155,89,182,.12)"><i class="fas fa-camera" style="color:#9b59b6"></i></div>',
    '<div class="text-left"><div class="font-semibold text-sm">Kamera</div><div class="text-xs" style="color:var(--muted)">Untuk scan QR code pesanan</div></div>',
    "</div>",
    '<div class="text-2xl ' +
      (camOk ? "text-green-400" : "text-red-400") +
      '"><i class="fas ' +
      (camOk ? "fa-check-circle" : "fa-times-circle") +
      '"></i></div>',
    "</div>",
    '<div class="flex items-center justify-between p-4 rounded-xl" style="background:var(--card)">',
    '<div class="flex items-center gap-3">',
    '<div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background:rgba(224,122,58,.12)"><i class="fas fa-bell" style="color:var(--accent)"></i></div>',
    '<div class="text-left"><div class="font-semibold text-sm">Notifikasi</div><div class="text-xs" style="color:var(--muted)">Untuk notifikasi pesanan & status</div></div>',
    "</div>",
    '<div class="text-2xl ' +
      (notifOk ? "text-green-400" : "text-red-400") +
      '"><i class="fas ' +
      (notifOk ? "fa-check-circle" : "fa-times-circle") +
      '"></i></div>',
    "</div>",
    "</div>",
    bothOk
      ? '<div class="text-sm font-semibold" style="color:var(--success)"><i class="fas fa-check-circle mr-1"></i>Semua akses tersedia, memuat aplikasi...</div>'
      : '<button onclick="requestBothPermissions()" class="btn-primary w-full flex items-center justify-center gap-2 mb-4"><i class="fas fa-shield"></i> Berikan Akses</button>',
    bothOk
      ? ""
      : '<div class="text-xs px-4 leading-relaxed" style="color:var(--muted)"><i class="fas fa-info-circle mr-1"></i>Jika akses ditolak, buka <b>Pengaturan Browser</b> → <b>Privasi & Keamanan</b> → Izinkan akses <b>Lokasi</b>, <b>Kamera</b>, dan <b>Notifikasi</b>, reload halaman lalu klik tombol di atas</div>',
    "</div>",
    "</div>",
  ].join("");

  if (gate) {
    gate.outerHTML = html;
  } else {
    document.body.insertAdjacentHTML("beforeend", html);
  }

  if (bothOk) {
    setTimeout(function () {
      var el = document.getElementById("permission-gate");
      if (el) el.remove();
      startApp();
    }, 600);
  }
}

function checkRemainingSilently() {
  var pending = 0;
  var allGranted = true;

  function done() {
    if (pending > 0) return;
    if (allGranted && State._geoGranted && State._cameraGranted) startApp();
    else renderPermissionGate();
  }

  // Geo
  pending++;
  checkPermission(
    "geolocation",
    function () {
      State._geoGranted = true;
      pending--;
      done();
    },
    function () {
      allGranted = false;
      pending--;
      done();
    },
  );

  // Camera
  pending++;
  checkPermission(
    "camera",
    function () {
      State._cameraGranted = true;
      pending--;
      done();
    },
    function () {
      allGranted = false;
      pending--;
      done();
    },
  );

  if (pending === 0) done();
}

function checkPermission(name, onGranted, onDenied) {
  if (navigator.permissions && navigator.permissions.query) {
    navigator.permissions
      .query({ name: name })
      .then(function (result) {
        if (result.state === "granted") {
          onGranted();
        } else if (result.state === "denied") {
          onDenied();
        } else {
          requestActualAPI(name, onGranted, onDenied);
        }
      })
      .catch(function () {
        requestActualAPI(name, onGranted, onDenied);
      });
  } else {
    requestActualAPI(name, onGranted, onDenied);
  }
}

function requestActualAPI(name, onGranted, onDenied) {
  if (name === "geolocation") {
    if (!navigator.geolocation) {
      onGranted();
      return;
    }
    navigator.geolocation.getCurrentPosition(
      function () {
        onGranted();
      },
      function (err) {
        if (err.code === err.PERMISSION_DENIED) onDenied();
        else onGranted();
      },
      { timeout: 5000, enableHighAccuracy: true },
    );
  } else if (name === "camera") {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      onGranted();
      return;
    }
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        stream.getTracks().forEach(function (t) {
          t.stop();
        });
        onGranted();
      })
      .catch(function (err) {
        if (
          err.name === "NotAllowedError" ||
          err.name === "PermissionDeniedError"
        )
          onDenied();
        else onGranted();
      });
  } else {
    onGranted();
  }
}

function requestBothPermissions() {
  var done = 0;
  var total = 0;

  if ("Notification" in window && Notification.permission === "default") {
    total++;
    Notification.requestPermission().then(function () {
      done++;
      if (done === total) checkPermissions();
    });
  }

  if (navigator.geolocation) {
    total++;
    navigator.geolocation.getCurrentPosition(
      function () {
        State._geoGranted = true;
        done++;
        if (done === total) checkPermissions();
      },
      function (err) {
        if (err.code === err.PERMISSION_DENIED) State._geoGranted = false;
        else State._geoGranted = true;
        done++;
        if (done === total) checkPermissions();
      },
      { timeout: 5000, enableHighAccuracy: true },
    );
  } else {
    State._geoGranted = true;
  }

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    total++;
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        State._cameraGranted = true;
        stream.getTracks().forEach(function (t) {
          t.stop();
        });
        done++;
        if (done === total) checkPermissions();
      })
      .catch(function (err) {
        if (
          err.name === "NotAllowedError" ||
          err.name === "PermissionDeniedError"
        )
          State._cameraGranted = false;
        else State._cameraGranted = true;
        done++;
        if (done === total) checkPermissions();
      });
  } else {
    State._cameraGranted = true;
  }

  if (total === 0) checkPermissions();
}

function checkPermissions() {
  renderPermissionGate();
}

function startApp() {
  loadNotifications();
  try {
    const raw = sessionStorage.getItem("arqa_session");
    if (raw) {
      const sesh = JSON.parse(raw);
      const u = DB.users.find((u) => u.id === sesh.userId);
      if (u) {
        State.currentUser = u;
        State.currentView = "main";
        if (sesh.currentTab) State.currentTab = sesh.currentTab;
      }
    }
  } catch (e) {}
  render();
  setInterval(saveDB, 1000);

  window.addEventListener("storage", function (e) {
    if (e.key === "arqa_db" && e.newValue) {
      if (e.newValue === JSON.stringify(DB)) return;
      var fresh = JSON.parse(e.newValue);
      var incomingTime = fresh._updatedAt || 0;
      var currentTime = DB._updatedAt || 0;
      if (incomingTime <= currentTime) return;
      Object.keys(DB).forEach(function (k) {
        if (!(k in fresh)) delete DB[k];
      });
      Object.keys(fresh).forEach(function (k) {
        DB[k] = fresh[k];
      });
      loadNotifications();
      if (!document.getElementById("modal-overlay")) render();
    }
    if (e.key === "arqa_notifications" && e.newValue) {
      if (e.newValue === JSON.stringify(State.notifications)) return;
      var oldCount = getUnreadCount();
      loadNotifications();
      var newCount = getUnreadCount();
      var badge = document.getElementById("notif-badge");
      if (badge) {
        if (newCount > 0) {
          badge.textContent = newCount;
          badge.style.display = "flex";
        } else badge.style.display = "none";
      }
      if (!document.getElementById("modal-overlay")) render();
      if (newCount > oldCount) showToast("Notifikasi baru", "info");
    }
  });
}
