export function button({ label, type = "button", variant = "primary", action = "", extraClass = "", icon = "" }) {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-slate-700 hover:bg-slate-600 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    ghost: "bg-transparent hover:bg-white/10 text-slate-200",
  };
  return `<button type="${type}" data-action="${action}" class="inline-flex items-center justify-center gap-2 rounded-[10px] px-4 py-2 text-sm font-semibold ${variants[variant]} ${extraClass}" aria-label="${label}">${icon}${label}</button>`;
}
