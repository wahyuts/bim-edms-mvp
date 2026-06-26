import { badge } from "./badge.js";
import { pagination } from "./pagination.js";
import { escapeHtml } from "../utils/formatter.js";

function actionButton(action, rowId, extraClass = "") {
  return `<button class="rounded-lg px-2.5 py-1 text-xs font-semibold ${action.className} ${extraClass}" data-action="${action.name}" data-id="${rowId}" aria-label="${escapeHtml(action.label)}">${escapeHtml(action.label)}</button>`;
}

function actionMenu(actions, rowId) {
  if (!actions.length) {
    return "";
  }
  return `<details class="relative z-[1001]" data-action-menu>
    <summary class="flex h-7 w-8 cursor-pointer list-none items-center justify-center rounded-lg bg-slate-700 text-sm font-semibold text-white hover:bg-slate-600" aria-label="Open row actions">
      <span aria-hidden="true">...</span>
    </summary>
    <div class="absolute right-0 z-[1001] mt-2 min-w-32 rounded-xl border border-[#1E3A5F] bg-[#102B46] p-1 shadow-xl">
      ${actions.map((action) => actionButton(action, rowId, "w-full justify-start text-left")).join("")}
    </div>
  </details>`;
}

function actionColumn(actions, rowId) {
  const primaryAction = actions.find((action) => action.name === "view") || actions[0];
  const menuActions = actions.filter((action) => action !== primaryAction);
  return `<td class="sticky right-0 z-20 overflow-visible bg-[#0B2239] px-4 py-3" data-action-cell>
    <div class="flex items-start justify-end gap-2">
      ${primaryAction ? actionButton(primaryAction, rowId) : ""}
      ${actionMenu(menuActions, rowId)}
    </div>
  </td>`;
}

function inlineActionColumn(actions, rowId) {
  return `<td class="sticky right-0 z-20 bg-[#0B2239] px-4 py-3">
    <div class="flex flex-wrap items-center justify-start gap-2">
      ${actions.map((action) => actionButton(action, rowId)).join("")}
    </div>
  </td>`;
}

export function table({ columns, rows, actions = [], currentPage = 1, totalPages = 1, loading = false, inlineActions = false }) {
  if (loading) {
    return `<div class="rounded-2xl border border-[#1E3A5F] bg-[#0B2239] p-8 text-center text-slate-300">Loading data...</div>`;
  }
  const body = rows.length
    ? rows
        .map(
          (row, rowIndex) => `<tr class="border-b border-[#1E3A5F]/60 hover:bg-white/5" data-row-id="${escapeHtml(row.id ?? "")}">
            ${columns
              .map((column) => {
                const value = column.key === "no" ? rowIndex + 1 : row[column.key];
                const cellClass = row.cellClasses?.[column.key] || "text-slate-200";
                return `<td class="px-4 py-3 align-top text-sm ${escapeHtml(cellClass)}" data-column-key="${escapeHtml(column.key)}">${column.type === "badge" ? badge(value) : escapeHtml(value ?? "-")}</td>`;
              })
              .join("")}
            ${
              actions.length
                ? inlineActions
                  ? inlineActionColumn(actions, row.id)
                  : actionColumn(actions, row.id)
                : ""
            }
          </tr>`,
        )
        .join("")
    : `<tr><td colspan="${columns.length + (actions.length ? 1 : 0)}" class="px-4 py-10 text-center text-slate-400">No data available.</td></tr>`;
  return `<div class="overflow-hidden rounded-2xl border border-[#1E3A5F] bg-[#0B2239] shadow-xl">
    <div class="max-h-[560px] overflow-auto edms-scrollbar">
      <table class="min-w-full table-auto">
        <thead class="sticky top-0 z-10 bg-[#102B46]">
          <tr>
            ${columns.map((column) => `<th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-300">${column.label}</th>`).join("")}
            ${actions.length ? `<th class="sticky right-0 bg-[#102B46] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-300">Actions</th>` : ""}
          </tr>
        </thead>
        <tbody>${body}</tbody>
      </table>
    </div>
    ${pagination({ currentPage, totalPages })}
  </div>`;
}
