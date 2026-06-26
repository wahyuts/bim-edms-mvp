import { ROUTES } from "../utils/constants.js";

export const menuGroups = [
  { label: "Dashboard", route: ROUTES.dashboard, moduleName: "dashboard", icon: "dashboard" },
  {
    label: "Document Register",
    route: ROUTES.documentRegister,
    moduleName: "document",
    icon: "document",
    children: [
      { label: "PFD", route: ROUTES.pfd, moduleName: "document" },
      { label: "P&ID", route: ROUTES.pid, moduleName: "document" },
    ],
  },
  {
    label: "Transmittal",
    moduleName: "transmittal",
    icon: "transmittal",
    children: [
      { label: "Incoming", route: ROUTES.incoming, moduleName: "transmittal" },
      { label: "Outgoing", route: ROUTES.outgoing, moduleName: "transmittal" },
    ],
  },
  { label: "SLA Monitoring", route: ROUTES.sla, moduleName: "dashboard", icon: "sla" },
  { label: "Escalation", route: ROUTES.escalation, moduleName: "escalation", icon: "escalation" },
  { label: "Audit Trail", route: ROUTES.auditTrail, moduleName: "audit", icon: "audit" },
  { label: "Storage NAS", route: ROUTES.storage, moduleName: "storage", icon: "storage" },
  { label: "Notifications", route: ROUTES.notifications, moduleName: "notification", icon: "notification" },
];

function icon(name) {
  const icons = {
    dashboard: `<svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 13h8V3H3v10Z"/><path d="M13 21h8V11h-8v10Z"/><path d="M13 3v6h8V3h-8Z"/><path d="M3 21h8v-6H3v6Z"/></svg>`,
    document: `<svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6 2h8l4 4v16H6V2Z"/><path d="M14 2v5h5"/><path d="M9 13h6"/><path d="M9 17h6"/><path d="M9 9h2"/></svg>`,
    transmittal: `<svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="M22 2 11 13"/></svg>`,
    sla: `<svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="9"/></svg>`,
    escalation: `<svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m12 3 10 18H2L12 3Z"/><path d="M12 9v5"/><path d="M12 18h.01"/></svg>`,
    audit: `<svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 3v6h6"/><path d="M12 7v5l3 2"/></svg>`,
    storage: `<svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></svg>`,
    notification: `<svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg>`,
  };
  return icons[name] || "";
}

function chevron() {
  return `<svg viewBox="0 0 24 24" class="h-4 w-4 transition-transform group-open:-rotate-180" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 15 6-6 6 6"/></svg>`;
}

function isActive(item, activeRoute) {
  return item.route === activeRoute || item.children?.some((child) => child.route === activeRoute);
}

function menuLink(item, activeRoute, className = "") {
  const activeClass = activeRoute === item.route ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-white/10";
  return `<a href="#${item.route}" class="flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${activeClass} ${className}">
    ${item.icon ? icon(item.icon) : ""}
    <span>${item.label}</span>
  </a>`;
}

function menuGroup(item, activeRoute) {
  if (!item.children?.length) {
    return menuLink(item, activeRoute);
  }
  const expanded = isActive(item, activeRoute);
  const parentActiveClass = expanded ? "text-white" : "text-slate-300 hover:bg-white/10";
  return `<details class="group" ${expanded ? "open" : ""}>
    <summary class="flex cursor-pointer list-none items-center justify-between rounded-xl px-3 py-2 text-sm transition ${parentActiveClass}">
      <span class="flex items-center gap-3">
        ${icon(item.icon)}
        <span>${item.label}</span>
      </span>
      ${chevron()}
    </summary>
    <div class="ml-[1.35rem] mt-1 space-y-1 border-l border-[#1E3A5F] py-1 pl-4">
      ${item.children.map((child) => menuLink(child, activeRoute, "py-2")).join("")}
    </div>
  </details>`;
}

export function sidebar(activeRoute, visibleMenuGroups = menuGroups) {
  return `<aside class="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-[#1E3A5F] bg-[#0B2239] p-5 lg:block">
    <div class="mb-8">
      <p class="text-xs uppercase tracking-[0.35em] text-blue-300">BIM</p>
      <h1 class="text-2xl font-bold">EDMS</h1>
    </div>
    <nav class="space-y-1">
      ${visibleMenuGroups.map((item) => menuGroup(item, activeRoute)).join("")}
    </nav>
  </aside>`;
}
