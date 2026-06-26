import { table } from "../../components/table.js";
import { showToast } from "../../components/toast.js";
import { deleteNotification, fetchNotifications, markNotificationRead } from "../../services/notification.js";
import { closeActionMenus } from "../../utils/dom.js";
import { escapeHtml } from "../../utils/formatter.js";
import { navigateTo } from "../../utils/helper.js";

const typeOptions = ["all", "info", "success", "warning", "error"];
const statusOptions = ["all", "unread", "read"];

const actionClasses = {
  open: "bg-slate-700 text-white hover:bg-slate-600",
  "mark-read": "bg-blue-600 text-white hover:bg-blue-700",
  delete: "bg-red-600 text-white hover:bg-red-700",
};

function createActions(names) {
  return names.map((name) => ({
    name,
    label: name === "mark-read" ? "Mark Read" : name[0].toUpperCase() + name.slice(1),
    className: actionClasses[name],
  }));
}

function renderOptions(options, selectedValue) {
  return options.map((option) => `<option value="${escapeHtml(option)}" ${option === selectedValue ? "selected" : ""}>${escapeHtml(option === "all" ? "All" : option)}</option>`).join("");
}

function updateNotificationBadge(notifications) {
  const badge = document.querySelector("[data-notification-count]");
  if (badge) {
    badge.textContent = notifications.filter((notification) => !notification.read).length;
  }
}

export async function render(container) {
  let notifications = await fetchNotifications();
  const state = {
    query: "",
    type: "all",
    status: "all",
  };

  function filteredNotifications() {
    const normalizedQuery = state.query.toLowerCase();
    return notifications.filter((notification) => {
      const matchesQuery = [notification.title, notification.message, notification.module, notification.type].join(" ").toLowerCase().includes(normalizedQuery);
      const matchesType = state.type === "all" || notification.type === state.type;
      const matchesStatus = state.status === "all" || (state.status === "read" ? notification.read : !notification.read);
      return matchesQuery && matchesType && matchesStatus;
    });
  }

  function paint() {
    const unreadCount = notifications.filter((notification) => !notification.read).length;
    const rows = filteredNotifications().map((notification) => ({
      ...notification,
      status: notification.read ? "Read" : "Unread",
      type: notification.type[0].toUpperCase() + notification.type.slice(1),
      module: notification.module[0].toUpperCase() + notification.module.slice(1),
      cellClasses: {
        title: notification.read ? "text-slate-400" : "text-white font-semibold",
        status: notification.read ? "text-slate-400" : "text-blue-300 font-semibold",
      },
    }));

    container.innerHTML = `<section class="space-y-5">
      <div class="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p class="text-sm text-slate-400">Operational alerts for documents, SLA, transmittals, escalation, and storage.</p>
          <h2 class="text-2xl font-bold">Notifications</h2>
        </div>
        <div class="rounded-xl border border-[#1E3A5F] bg-[#102B46] px-4 py-3 text-sm text-slate-200">
          <span class="font-semibold text-white">${unreadCount}</span> unread
        </div>
      </div>
      <div class="grid gap-3 rounded-2xl border border-[#1E3A5F] bg-[#0B2239] p-4 md:grid-cols-[1fr_160px_160px]">
        <label class="text-sm text-slate-300" for="notification-search">Search
          <input id="notification-search" value="${escapeHtml(state.query)}" class="mt-1 w-full rounded-[10px] border border-[#1E3A5F] bg-[#061726] px-3 py-2 text-white outline-none focus:border-blue-500" placeholder="Search notifications..." />
        </label>
        <label class="text-sm text-slate-300" for="notification-type">Type
          <select id="notification-type" class="mt-1 w-full rounded-[10px] border border-[#1E3A5F] bg-[#061726] px-3 py-2 text-white">
            ${renderOptions(typeOptions, state.type)}
          </select>
        </label>
        <label class="text-sm text-slate-300" for="notification-status">Status
          <select id="notification-status" class="mt-1 w-full rounded-[10px] border border-[#1E3A5F] bg-[#061726] px-3 py-2 text-white">
            ${renderOptions(statusOptions, state.status)}
          </select>
        </label>
      </div>
      ${table({
        columns: [
          { key: "no", label: "No" },
          { key: "type", label: "Type", type: "badge" },
          { key: "module", label: "Module" },
          { key: "title", label: "Title" },
          { key: "message", label: "Message" },
          { key: "createdAt", label: "Created At" },
          { key: "status", label: "Status" },
        ],
        rows,
        actions: createActions(["open", "mark-read", "delete"]),
        inlineActions: true,
      })}
    </section>`;
    updateNotificationBadge(notifications);
  }

  function restoreSearchFocus() {
    const searchInput = container.querySelector("#notification-search");
    if (!searchInput) {
      return;
    }
    searchInput.focus();
    searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length);
  }

  container.addEventListener("input", (event) => {
    if (event.target.id === "notification-search") {
      state.query = event.target.value;
      paint();
      restoreSearchFocus();
    }
  });

  container.addEventListener("change", (event) => {
    if (event.target.id === "notification-type") {
      state.type = event.target.value;
      paint();
    }
    if (event.target.id === "notification-status") {
      state.status = event.target.value;
      paint();
    }
  });

  container.addEventListener("click", (event) => {
    closeActionMenus(container, event);
    const actionElement = event.target.closest("[data-action]");
    if (!actionElement) {
      return;
    }

    const notification = notifications.find((item) => Number(item.id) === Number(actionElement.dataset.id));
    if (!notification) {
      return;
    }

    if (actionElement.dataset.action === "open") {
      (async () => {
        const marked = await markNotificationRead(notification.id);
        if (!marked) {
          showToast("Failed to update notification", "error");
          return;
        }
        notifications = await fetchNotifications();
        updateNotificationBadge(notifications);
        navigateTo(notification.targetRoute);
      })();
    }
    if (actionElement.dataset.action === "mark-read") {
      (async () => {
        const marked = await markNotificationRead(notification.id);
        if (!marked) {
          showToast("Failed to update notification", "error");
          return;
        }
        notifications = await fetchNotifications();
        showToast("Notification marked as read", "success");
        paint();
      })();
    }
    if (actionElement.dataset.action === "delete" && window.confirm("Delete this notification?")) {
      (async () => {
        const deleted = await deleteNotification(notification.id);
        if (!deleted) {
          showToast("Failed to delete notification", "error");
          return;
        }
        notifications = await fetchNotifications();
        showToast("Notification deleted", "success");
        paint();
      })();
    }
  });

  paint();
}
