import { TOAST_DURATION } from "../utils/constants.js";
import { escapeHtml } from "../utils/formatter.js";

const toneClass = {
  success: "border-green-500/40 bg-green-500/15 text-green-100",
  warning: "border-amber-500/40 bg-amber-500/15 text-amber-100",
  error: "border-red-500/40 bg-red-500/15 text-red-100",
  info: "border-cyan-500/40 bg-cyan-500/15 text-cyan-100",
};

export function showToast(message, type = "info") {
  const root = document.getElementById("toast-root");
  if (!root) {
    return;
  }
  const toast = document.createElement("div");
  toast.className = `pointer-events-auto w-full rounded-xl border px-4 py-3 text-center text-sm font-medium shadow-xl ${toneClass[type] || toneClass.info}`;
  toast.textContent = escapeHtml(message);
  root.appendChild(toast);
  window.setTimeout(() => toast.remove(), TOAST_DURATION);
}
