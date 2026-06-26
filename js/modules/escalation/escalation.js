import { badge } from "../../components/badge.js";
import { modal } from "../../components/modal.js";
import { table } from "../../components/table.js";
import { visibleActions } from "../../services/access-control.js";
import { syncDocuments } from "../../services/backend-sync.js";
import { get } from "../../services/storage.js";
import { COLLECTIONS, DEFAULT_PAGE_SIZE } from "../../utils/constants.js";
import { closeActionMenus } from "../../utils/dom.js";
import { escapeHtml } from "../../utils/formatter.js";
import { formatDocumentSlaTimer, getDocumentEscalationLevel, isDocumentSlaOverdue } from "../../utils/sla-timer.js";

const actionClasses = {
  view: "bg-slate-700 text-white hover:bg-slate-600",
};

const columns = [
  { key: "no", label: "No" },
  { key: "documentNo", label: "Document Number" },
  { key: "level", label: "Level" },
  { key: "status", label: "Status", type: "badge" },
  { key: "slaTimer", label: "Remaining Time" },
];

function createEscalationRows(documents) {
  return documents
    .filter((documentItem) => isDocumentSlaOverdue(documentItem))
    .map((documentItem) => ({
      ...documentItem,
      level: getDocumentEscalationLevel(documentItem),
      status: "Overdue",
      slaTimer: formatDocumentSlaTimer(documentItem),
      cellClasses: {
        slaTimer: "text-red-300 font-semibold",
      },
    }));
}

function filterRows(rows, query) {
  const normalizedQuery = query.toLowerCase();
  return rows.filter((row) => Object.values(row).join(" ").toLowerCase().includes(normalizedQuery));
}

function renderControls(state) {
  return `<div class="grid gap-3 rounded-2xl border border-[#1E3A5F] bg-[#0B2239] p-4 md:grid-cols-[1fr_140px]">
    <label class="text-sm text-slate-300" for="escalation-search">Search
      <input id="escalation-search" value="${escapeHtml(state.query)}" class="mt-1 w-full rounded-[10px] border border-[#1E3A5F] bg-[#061726] px-3 py-2 text-white outline-none focus:border-blue-500" placeholder="Search overdue document..." />
    </label>
    <label class="text-sm text-slate-300" for="escalation-page-size">Page Size
      <select id="escalation-page-size" class="mt-1 w-full rounded-[10px] border border-[#1E3A5F] bg-[#061726] px-3 py-2 text-white">
        ${[5, 10, 20].map((size) => `<option value="${size}" ${state.pageSize === size ? "selected" : ""}>${size}</option>`).join("")}
      </select>
    </label>
  </div>`;
}

function renderDocumentDetail(documentItem) {
  return `<dl class="grid gap-3 text-sm md:grid-cols-2">
    <div class="rounded-xl bg-[#061726] p-3">
      <dt class="text-xs uppercase tracking-wide text-slate-500">Document Number</dt>
      <dd class="mt-1 text-slate-100">${escapeHtml(documentItem.documentNo)}</dd>
    </div>
    <div class="rounded-xl bg-[#061726] p-3">
      <dt class="text-xs uppercase tracking-wide text-slate-500">SLA Status</dt>
      <dd class="mt-1">${badge("Overdue")}</dd>
    </div>
    <div class="rounded-xl bg-[#061726] p-3">
      <dt class="text-xs uppercase tracking-wide text-slate-500">Escalation Level</dt>
      <dd class="mt-1 text-slate-100">${escapeHtml(documentItem.level)}</dd>
    </div>
    <div class="rounded-xl bg-[#061726] p-3">
      <dt class="text-xs uppercase tracking-wide text-slate-500">SLA Timer</dt>
      <dd class="mt-1 text-red-300 font-semibold">${escapeHtml(documentItem.slaTimer)}</dd>
    </div>
    <div class="rounded-xl bg-[#061726] p-3 md:col-span-2">
      <dt class="text-xs uppercase tracking-wide text-slate-500">Description</dt>
      <dd class="mt-1 text-slate-100">${escapeHtml(documentItem.description || "-")}</dd>
    </div>
  </dl>`;
}

export async function render(container) {
  try {
    await syncDocuments();
  } catch (error) {
    console.error(error);
  }

  const state = {
    query: "",
    currentPage: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  };

  function renderPage() {
    const escalationRows = filterRows(createEscalationRows(get(COLLECTIONS.documents)), state.query);
    const totalPages = Math.max(1, Math.ceil(escalationRows.length / state.pageSize));
    state.currentPage = Math.min(state.currentPage, totalPages);
    const pageRows = escalationRows.slice((state.currentPage - 1) * state.pageSize, state.currentPage * state.pageSize);
    const actions = visibleActions("escalation", ["view"]).map((name) => ({
      name,
      label: name[0].toUpperCase() + name.slice(1),
      className: actionClasses[name],
    }));

    container.innerHTML = `<section class="space-y-5">
      <div>
        <p class="text-sm text-slate-400">Documents with SLA Timer on day 8 or later.</p>
        <h2 class="text-2xl font-bold">Escalation Alert</h2>
      </div>
      ${renderControls(state)}
      ${table({ columns, rows: pageRows, actions, currentPage: state.currentPage, totalPages })}
      <div id="modal-root"></div>
    </section>`;
  }

  function restoreSearchFocus() {
    const searchInput = container.querySelector("#escalation-search");
    if (!searchInput) {
      return;
    }
    searchInput.focus();
    searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length);
  }

  container.addEventListener("input", (event) => {
    if (event.target.id === "escalation-search") {
      state.query = event.target.value;
      state.currentPage = 1;
      renderPage();
      restoreSearchFocus();
    }
  });

  container.addEventListener("change", (event) => {
    if (event.target.id === "escalation-page-size") {
      state.pageSize = Number(event.target.value) || DEFAULT_PAGE_SIZE;
      state.currentPage = 1;
      renderPage();
    }
  });

  container.addEventListener("click", (event) => {
    closeActionMenus(container, event);
    const actionElement = event.target.closest("[data-action]");
    if (!actionElement) {
      return;
    }
    const { action, id } = actionElement.dataset;
    if (action === "prev-page") {
      state.currentPage = Math.max(1, state.currentPage - 1);
      renderPage();
    }
    if (action === "next-page") {
      state.currentPage += 1;
      renderPage();
    }
    if (action === "view" && id) {
      const documentItem = createEscalationRows(get(COLLECTIONS.documents)).find((item) => Number(item.id) === Number(id));
      if (documentItem) {
        container.querySelector("#modal-root").innerHTML = modal({
          title: "View Escalation",
          body: renderDocumentDetail(documentItem),
        });
      }
    }
    if (action === "close-modal") {
      container.querySelector("#modal-root").innerHTML = "";
    }
  });

  renderPage();
}
