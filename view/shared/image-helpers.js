// ------------------------------------------------------------------
// IMAGE HELPERS
// ------------------------------------------------------------------
function renderImageInput(prefix, currentVal) {
  const hasImage = currentVal && currentVal !== 'https://picsum.photos/seed/';
  return `
    <div class="flex gap-2 mb-2">
      <button type="button" onclick="document.getElementById('${prefix}-img-mode').value='upload';document.getElementById('${prefix}-img-file').click()" class="btn-sm flex-1 text-center" style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:8px"><i class="fas fa-upload mr-1"></i>Upload</button>
      <button type="button" onclick="document.getElementById('${prefix}-img-mode').value='url';document.getElementById('${prefix}-img-url').style.display='block';this.style.background='rgba(224,122,58,.1)';this.style.borderColor='var(--accent)'" class="btn-sm flex-1 text-center" style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:8px"><i class="fas fa-link mr-1"></i>URL</button>
    </div>
    <input type="hidden" id="${prefix}-img-mode" value="${hasImage ? 'url' : 'upload'}">
    <input type="file" id="${prefix}-img-file" accept="image/*" style="display:none" onchange="previewImage(this,'${prefix}-img-preview')">
    <input type="text" id="${prefix}-img-url" class="input-field text-sm" placeholder="https://..." value="${currentVal || ''}" style="${hasImage ? '' : 'display:none'}">
    <div id="${prefix}-img-preview" class="mt-2 ${hasImage ? '' : 'hidden'}" style="${hasImage ? '' : 'display:none'}">${hasImage ? `<img src="${currentVal}" style="width:80px;height:80px;object-fit:cover;border-radius:10px">` : ''}</div>`;
}

function previewImage(input, previewId) {
  const file = input.files && input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const el = document.getElementById(previewId);
    if (el) { el.innerHTML = '<img src="' + e.target.result + '" style="width:80px;height:80px;object-fit:cover;border-radius:10px">'; el.style.display = 'block'; }
  };
  reader.readAsDataURL(file);
}

function getImageValue(prefix) {
  const mode = document.getElementById(prefix + '-img-mode')?.value;
  if (mode === 'upload') {
    const fileInput = document.getElementById(prefix + '-img-file');
    if (fileInput && fileInput.files && fileInput.files[0]) return '';
  }
  return document.getElementById(prefix + '-img-url')?.value || '';
}
