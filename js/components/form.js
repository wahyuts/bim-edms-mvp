import { escapeHtml } from "../utils/formatter.js";

function dataAttribute(name, value) {
  return value ? ` data-${name}="${escapeHtml(value)}"` : "";
}

export function field({
  name,
  label,
  type = "text",
  value = "",
  required = false,
  options = [],
  accept = "",
  autoFillTarget = "",
  fullWidth = false,
  disabled = false,
  readonly = false,
  list = "",
  lang = "",
  placeholder = "",
  min = "",
  max = "",
  step = "",
}) {
  const requiredMark = required ? "<span class=\"text-red-300\">*</span>" : "";
  const baseClass =
    "mt-1 w-full rounded-[10px] border border-[#1E3A5F] bg-[#061726] px-3 py-2 text-sm text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500";
  const acceptAttribute = accept ? ` accept="${escapeHtml(accept)}"` : "";
  const autoFillAttribute = dataAttribute("autofill-target", autoFillTarget);
  const disabledAttribute = disabled ? " disabled" : "";
  const readonlyAttribute = readonly ? " readonly" : "";
  const listAttribute = list ? ` list="${escapeHtml(list)}"` : "";
  const langAttribute = lang ? ` lang="${escapeHtml(lang)}"` : "";
  const placeholderAttribute = placeholder ? ` placeholder="${escapeHtml(placeholder)}"` : "";
  const minAttribute = min !== "" ? ` min="${escapeHtml(min)}"` : "";
  const maxAttribute = max !== "" ? ` max="${escapeHtml(max)}"` : "";
  const stepAttribute = step !== "" ? ` step="${escapeHtml(step)}"` : "";
  const placeholderOption = placeholder
    ? `<option value="" ${value ? "" : "selected"} disabled>${escapeHtml(placeholder)}</option>`
    : "";
  const control = options.length
    ? `<select id="${name}" name="${name}" class="${baseClass}" ${required ? "required" : ""}${disabledAttribute}${langAttribute}>${placeholderOption}${options.map((option) => `<option value="${escapeHtml(option)}" ${option === value ? "selected" : ""}>${escapeHtml(option)}</option>`).join("")}</select>`
    : `<input id="${name}" name="${name}" type="${type}" ${type === "file" ? "" : `value="${escapeHtml(value)}"`} class="${baseClass}" ${required ? "required" : ""}${acceptAttribute}${autoFillAttribute}${disabledAttribute}${readonlyAttribute}${listAttribute}${langAttribute}${placeholderAttribute}${minAttribute}${maxAttribute}${stepAttribute} />`;
  const helper = type === "file" ? `<p class="mt-1 text-xs text-slate-400" data-file-detail-for="${name}">No file selected.</p>` : "";
  return `<label class="block text-sm font-medium text-slate-200 ${fullWidth ? "md:col-span-2" : ""}" for="${name}">${label} ${requiredMark}${control}${helper}</label>`;
}

export function form({ id, fields, submitLabel = "Save", cancelLabel = "Cancel" }) {
  return `<form id="${id}" class="space-y-4">
    <div class="grid gap-4 md:grid-cols-2">${fields.map(field).join("")}</div>
    <div class="flex justify-end gap-3 pt-2">
      <button type="button" data-action="close-modal" class="rounded-[10px] bg-slate-700 px-4 py-2 text-sm font-semibold hover:bg-slate-600">${cancelLabel}</button>
      <button type="submit" class="rounded-[10px] bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-700">${submitLabel}</button>
    </div>
  </form>`;
}
