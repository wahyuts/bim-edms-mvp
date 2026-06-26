import { dropdown } from "./dropdown.js";

export function topbar({ title, user, unreadCount }) {
  const isAdministrator = user?.role === "Administrator";
  return `<header class="sticky top-0 z-20 border-b border-[#1E3A5F] bg-[#061726]/90 px-4 py-4 backdrop-blur lg:ml-72">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <p class="text-xs uppercase tracking-[0.25em] text-slate-400">BIM Engineering</p>
        <h1 class="text-2xl font-bold">${title}</h1>
      </div>
      <div class="flex items-center gap-3">
        <a href="#/notifications" class="rounded-xl bg-[#102B46] px-3 py-2 text-sm hover:bg-[#163554]" aria-label="Open notifications">Notifications <span class="ml-1 rounded-full bg-blue-600 px-2 py-0.5 text-xs" data-notification-count>${unreadCount}</span></a>
        ${dropdown({
          label: user?.name || "Profile",
          items: [
            { label: "Create New User", action: "go-create-new-user", disabled: !isAdministrator },
            { label: "Edit User Profile", action: "go-edit-user-profile", disabled: !isAdministrator },
            { label: "Profile", action: "go-profile" },
            { label: "Change Password", action: "go-change-password" },
            { label: "Logout", action: "logout" },
          ],
        })}
      </div>
    </div>
  </header>`;
}
