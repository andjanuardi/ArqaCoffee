// ============================================================
// LOADING COMPONENTS — button spinners and skeleton loaders
// ============================================================

/* ──── BUTTON SPINNER ──── */

function showBtnSpinner(el) {
  if (!el) return;
  if (!el.dataset.originalText) {
    el.dataset.originalText = el.textContent;
  }
  el.disabled = true;
  el.style.opacity = '0.7';
  el.style.cursor = 'not-allowed';
  el.innerHTML = '<span class="btn-spinner"><i class="fas fa-circle-notch"></i></span> Memproses...';
}

function hideBtnSpinner(el) {
  if (!el) return;
  el.disabled = false;
  el.style.opacity = '';
  el.style.cursor = '';
  if (el.dataset.originalText) {
    el.textContent = el.dataset.originalText;
  }
}

/* ──── SKELETON LOADERS ──── */

function showSkeleton(containerId, type) {
  var el = document.getElementById(containerId);
  if (!el) return;
  var html = '';
  var count = 3;

  switch (type) {
    case 'cards':
      count = 4;
      html = '<div class="grid grid-cols-2 md:grid-cols-3 gap-4">';
      for (var i = 0; i < count; i++) {
        html += '<div class="skeleton" style="height:180px"><div class="skeleton-shimmer" style="width:100%;height:100%"></div></div>';
      }
      html += '</div>';
      break;

    case 'stats':
      count = 4;
      html = '<div class="grid grid-cols-2 md:grid-cols-4 gap-3">';
      for (var i = 0; i < count; i++) {
        html += '<div class="skeleton" style="height:80px"><div class="skeleton-shimmer" style="width:100%;height:100%"></div></div>';
      }
      html += '</div>';
      break;

    case 'list':
      count = 5;
      for (var i = 0; i < count; i++) {
        html += '<div class="skeleton" style="height:60px;margin-bottom:8px"><div class="skeleton-shimmer" style="width:100%;height:100%"></div></div>';
      }
      break;

    case 'table':
      html = '<div class="skeleton" style="height:200px"><div class="skeleton-shimmer" style="width:100%;height:100%"></div></div>';
      break;

    case 'chart':
      html = '<div class="skeleton" style="height:250px"><div class="skeleton-shimmer" style="width:100%;height:100%"></div></div>';
      break;

    default:
      html = '<div class="skeleton" style="height:120px"><div class="skeleton-shimmer" style="width:100%;height:100%"></div></div>';
  }

  el.innerHTML = html;
  el.dataset.skeleton = 'true';
}

function hideSkeleton(containerId) {
  var el = document.getElementById(containerId);
  if (el && el.dataset.skeleton === 'true') {
    el.innerHTML = '';
    delete el.dataset.skeleton;
  }
}
