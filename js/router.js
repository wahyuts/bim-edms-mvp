import { menuGroups, sidebar } from "./components/sidebar.js";
import { topbar } from "./components/topbar.js";
import { canView } from "./services/access-control.js";
import { showToast } from "./components/toast.js";
import { currentUser, isLoggedIn, logout } from "./services/auth.js";
import { getUnreadNotificationCount } from "./services/notification.js";
import { ROUTES } from "./utils/constants.js";
import { getRoutePath, navigateTo } from "./utils/helper.js";

const routes = {
  [ROUTES.dashboard]: () => import("./modules/dashboard/dashboard.js"),
  [ROUTES.documentRegister]: () => import("./modules/register/register.js"),
  [ROUTES.pfd]: () => import("./modules/pfd/pfd.js"),
  [ROUTES.pid]: () => import("./modules/pid/pid.js"),
  [ROUTES.incoming]: () => import("./modules/transmittal/incoming.js"),
  [ROUTES.outgoing]: () => import("./modules/transmittal/outgoing.js"),
  [ROUTES.escalation]: () => import("./modules/escalation/escalation.js"),
  [ROUTES.auditTrail]: () => import("./modules/audit/audit.js"),
  [ROUTES.storage]: () => import("./modules/storage/storage.js"),
  [ROUTES.sla]: () => import("./modules/sla/sla.js"),
  [ROUTES.notifications]: () => import("./modules/notifications/notifications.js"),
  [ROUTES.profile]: () => import("./modules/auth/profile.js"),
  [ROUTES.createNewUser]: () => import("./modules/auth/create-new-user.js"),
  [ROUTES.editUserProfile]: () => import("./modules/auth/edit-user-profile.js"),
  [ROUTES.changePassword]: () => import("./modules/auth/change-password.js"),
};

const routeModules = {
  [ROUTES.documentRegister]: "document",
  [ROUTES.pfd]: "document",
  [ROUTES.pid]: "document",
  [ROUTES.incoming]: "transmittal",
  [ROUTES.outgoing]: "transmittal",
  [ROUTES.escalation]: "escalation",
  [ROUTES.auditTrail]: "audit",
  [ROUTES.storage]: "storage",
  [ROUTES.notifications]: "notification",
  [ROUTES.createNewUser]: "user-management",
  [ROUTES.editUserProfile]: "user-management",
};

function pageTitle(route) {
  return route
    .replace("/", "")
    .replaceAll("/", " / ")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (character) => character.toUpperCase()) || "Dashboard";
}

function canViewMenuItem(item) {
  return item.moduleName === "dashboard" || canView(item.moduleName);
}

function visibleMenuItems(items) {
  return items
    .map((item) => {
      const children = item.children ? visibleMenuItems(item.children) : [];
      if (!canViewMenuItem(item) && !children.length) {
        return null;
      }
      return { ...item, children };
    })
    .filter(Boolean);
}

async function renderShell(route) {
  const unreadCount = await getUnreadNotificationCount();
  const visibleMenuGroups = visibleMenuItems(menuGroups);
  document.body.removeEventListener("click", handleShellClick);
  document.body.addEventListener("click", handleShellClick);
  return `${sidebar(route, visibleMenuGroups)}${topbar({ title: pageTitle(route), user: currentUser(), unreadCount })}<main id="page" class="min-h-screen p-4 lg:ml-72 lg:p-6"></main>`;
}

function closeDropdownMenus(exceptDropdown = null) {
  document.querySelectorAll("[data-dropdown-menu]").forEach((dropdownMenu) => {
    if (!exceptDropdown || !exceptDropdown.contains(dropdownMenu)) {
      dropdownMenu.classList.add("hidden");
    }
  });
}

function handleShellClick(event) {
  const dropdownElement = event.target.closest("[data-dropdown]");
  if (!dropdownElement) {
    closeDropdownMenus();
  }

  const action = event.target.closest("[data-action]")?.dataset.action;
  if (!action) {
    return;
  }
  if (action === "toggle-dropdown") {
    const dropdownMenu = dropdownElement?.querySelector("[data-dropdown-menu]");
    const shouldOpen = dropdownMenu?.classList.contains("hidden");
    closeDropdownMenus(dropdownElement);
    dropdownMenu?.classList.toggle("hidden", !shouldOpen);
  }
  if (action === "go-profile") {
    navigateTo(ROUTES.profile);
  }
  if (action === "go-create-new-user") {
    navigateTo(ROUTES.createNewUser);
  }
  if (action === "go-edit-user-profile") {
    navigateTo(ROUTES.editUserProfile);
  }
  if (action === "go-change-password") {
    navigateTo(ROUTES.changePassword);
  }
  if (action === "logout" && window.confirm("Are you sure you want to log out?")) {
    logout();
  }
}

async function loadRoute() {
  if (!isLoggedIn()) {
    window.location.href = "./login.html";
    return;
  }
  const route = routes[getRoutePath()] ? getRoutePath() : ROUTES.dashboard;
  const permissionModule = routeModules[route];
  if (permissionModule && !canView(permissionModule)) {
    showToast("Unauthorized route", "warning");
    navigateTo(ROUTES.dashboard);
    return;
  }
  if (route !== getRoutePath()) {
    navigateTo(route);
  }
  const app = document.getElementById("app");
  app.innerHTML = await renderShell(route);
  const page = document.getElementById("page");
  try {
    const module = await routes[route]();
    await module.render(page);
  } catch (error) {
    page.innerHTML = `<section class="rounded-2xl border border-red-500/40 bg-red-500/10 p-5 text-red-100">Failed to load page.</section>`;
    showToast("Failed to load page", "error");
    console.error(error);
  }
}

export function initRouter() {
  if (!window.location.hash) {
    navigateTo(ROUTES.dashboard);
  }
  window.addEventListener("hashchange", loadRoute);
  loadRoute();
}
