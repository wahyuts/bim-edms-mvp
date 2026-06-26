export function setHtml(element, html) {
  if (element) {
    element.innerHTML = html;
  }
}

export function documentNumberFromFileName(fileName) {
  return fileName.replace(/\.[^/.]+$/, "");
}

export function formatFileSize(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return "0 KB";
  }
  const units = ["B", "KB", "MB", "GB"];
  const unitIndex = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** unitIndex;
  return `${value.toFixed(value >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

export function updateSelectedFileDetail(input) {
  if (input.type !== "file") {
    return;
  }
  const detailElement = input.form?.querySelector(`[data-file-detail-for="${input.name}"]`);
  if (!detailElement) {
    return;
  }
  const selectedFile = input.files?.[0];
  detailElement.textContent = selectedFile ? `${selectedFile.name} - ${formatFileSize(selectedFile.size)}` : "No file selected.";
}

export function autoFillDocumentNumberFromFile(event) {
  const autoFillTarget = event.target.dataset.autofillTarget;
  if (event.target.type !== "file" || !autoFillTarget) {
    return;
  }
  const selectedFile = event.target.files?.[0];
  const targetInput = event.target.form?.elements.namedItem(autoFillTarget);
  if (selectedFile && targetInput) {
    targetInput.value = documentNumberFromFileName(selectedFile.name);
  }
}

export function handleFileInputChange(event) {
  if (event.target.type !== "file") {
    return;
  }
  autoFillDocumentNumberFromFile(event);
  updateSelectedFileDetail(event.target);
}

export function enforceMinimumNumberInput(event) {
  if (event.target.type !== "number" || event.target.min === "" || event.target.value === "") {
    return;
  }
  const minValue = Number(event.target.min);
  const currentValue = Number(event.target.value);
  if (!Number.isNaN(minValue) && !Number.isNaN(currentValue) && currentValue < minValue) {
    event.target.value = String(minValue);
  }
}

export function closeActionMenus(container, event) {
  if (event.target.closest("[data-action-menu]")) {
    return;
  }
  container.querySelectorAll("[data-action-menu][open]").forEach((menu) => {
    menu.open = false;
  });
}

export function serializeForm(form) {
  const data = {};
  new FormData(form).forEach((value, key) => {
    if (typeof File !== "undefined" && value instanceof File) {
      if (value.name) {
        data[key] = value.name;
      }
      return;
    }
    data[key] = value;
  });
  return data;
}
