export function dropdown({ label, items }) {
  return `<div class="relative" data-dropdown>
    <button class="rounded-xl bg-[#102B46] px-3 py-2 text-sm hover:bg-[#163554]" data-action="toggle-dropdown">${label}</button>
    <div class="absolute right-0 top-11 hidden min-w-48 overflow-hidden rounded-xl border border-[#1E3A5F] bg-[#0B2239] shadow-xl" data-dropdown-menu>
      ${items
        .map((item) => {
          const disabledClass = item.disabled ? "cursor-not-allowed text-slate-500" : "text-white hover:bg-white/10";
          const disabledAttributes = item.disabled ? " disabled aria-disabled=\"true\"" : "";
          return `<button class="block w-full px-4 py-2 text-left text-sm ${disabledClass}" data-action="${item.action}"${disabledAttributes}>${item.label}</button>`;
        })
        .join("")}
    </div>
  </div>`;
}
