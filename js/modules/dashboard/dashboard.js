import { badge } from "../../components/badge.js";
import { card, kpiCard, revisionRequestedCard } from "../../components/card.js";
import { form } from "../../components/form.js";
import { modal } from "../../components/modal.js";
import { table } from "../../components/table.js";
import { showToast } from "../../components/toast.js";
import { createAudit } from "../../services/audit.js";
import { downloadResource, updateResource } from "../../services/api-resources.js";
import { syncDashboardData } from "../../services/backend-sync.js";
import { visibleActions } from "../../services/access-control.js";
import { get } from "../../services/storage.js";
import { COLLECTIONS, DEFAULT_PAGE_SIZE, DOCUMENT_EDITABLE_STATUSES, DOCUMENT_STATUS_FILTER_OPTIONS, ROUTES } from "../../utils/constants.js";
import { closeActionMenus, enforceMinimumNumberInput, handleFileInputChange, serializeForm } from "../../utils/dom.js";
import { applyDocumentReviewFields, normalizeDocumentFormData } from "../../utils/document-form.js";
import { escapeHtml, formatCount } from "../../utils/formatter.js";
import { formatDocumentSlaTimer, getDocumentEscalationLevel, getDocumentSlaOverviewStatus, getDocumentSlaTimerClass, isDocumentSlaOverdue } from "../../utils/sla-timer.js";

const SLA_TIMER_REFRESH_INTERVAL = 60 * 1000;

const actionClasses = {
  view: "bg-slate-700 text-white hover:bg-slate-600",
  edit: "bg-blue-600 text-white hover:bg-blue-700",
  download: "bg-green-600 text-white hover:bg-green-700",
};

const documentColumns = [
  { key: "no", label: "No" },
  { key: "documentNo", label: "Document Number" },
  { key: "description", label: "Description" },
  { key: "discipline", label: "Discipline" },
  { key: "area", label: "Area" },
  { key: "revision", label: "Revision" },
  { key: "status", label: "Status", type: "badge" },
  { key: "sla", label: "SLA Timer" },
];

const documentDetailColumns = [
  ...documentColumns,
  { key: "verifyDeadlineDate", label: "Verify deadline date" },
  { key: "reviewComment", label: "Review Comment" },
  { key: "nasLocation", label: "NAS Location" },
];

const sortOptions = [
  { value: "documentNo", label: "Document Number" },
  { value: "discipline", label: "Discipline" },
  { value: "status", label: "Status" },
  { value: "createdAt", label: "Created Date" },
];

const documentFields = [
  { name: "fileName", label: "Attachment", type: "file", accept: ".pdf,.dwg,.dxf", autoFillTarget: "documentNo", fullWidth: true },
  { name: "documentNo", label: "Document Number", required: true },
  { name: "description", label: "Description", required: true },
  { name: "discipline", label: "Discipline", required: true, options: ["PFD", "PID"] },
  { name: "area", label: "Area" },
  { name: "revision", label: "Revision", type: "number", required: true, min: 0 },
  { name: "status", label: "Status", required: true, options: DOCUMENT_EDITABLE_STATUSES },
  { name: "sla", label: "SLA Timer", type: "date", lang: "en-US", placeholder: "mm/dd/yyyy" },
  { name: "nasLocation", label: "NAS Location" },
];

function createDashboardRows(documents) {
  return documents.map((documentItem) => ({
    ...documentItem,
    sla: formatDocumentSlaTimer(documentItem),
    cellClasses: {
      sla: getDocumentSlaTimerClass(documentItem),
    },
  }));
}

function countByStatus(documents, status) {
  return documents.filter((documentItem) => documentItem.status === status).length;
}

function getOverdueDocuments(documents) {
  return documents.filter((documentItem) => isDocumentSlaOverdue(documentItem));
}

function countEscalationByLevel(documents, level) {
  return getOverdueDocuments(documents).filter((documentItem) => getDocumentEscalationLevel(documentItem) === level).length;
}

function countSlaOverviewStatus(documents, status) {
  return documents.filter((documentItem) => getDocumentSlaOverviewStatus(documentItem) === status).length;
}

function filterDocuments(documents, state) {
  const normalizedQuery = state.query.toLowerCase();
  return documents
    .filter((documentItem) => (state.status ? documentItem.status === state.status : true))
    .filter((documentItem) => Object.values(documentItem).join(" ").toLowerCase().includes(normalizedQuery))
    .sort((firstItem, secondItem) => String(firstItem[state.sortBy] ?? "").localeCompare(String(secondItem[state.sortBy] ?? "")));
}

function renderKpiSummary(documents) {
  const overdueDocuments = getOverdueDocuments(documents);
  return `<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
    ${kpiCard({ label: "Total Documents", value: formatCount(documents.length), helper: "All engineering documents" })}
    ${kpiCard({ label: "Client Review", value: formatCount(countByStatus(documents, "Client Review")), tone: "amber", helper: "Waiting client review" })}
    ${revisionRequestedCard({ value: formatCount(countByStatus(documents, "Revision Requested")) })}
    ${kpiCard({ label: "Escalation Alert", value: formatCount(overdueDocuments.length), tone: "red", helper: "Overdue SLA documents", valueAttribute: "data-kpi-escalation-total" })}
    ${kpiCard({ label: "Final As-Built", value: formatCount(countByStatus(documents, "Approved")), tone: "green", helper: "Approved documents" })}
  </div>`;
}

function renderSlaOverview(documents) {
  const statuses = ["On Track", "At Risk", "Overdue", "Final As-Built"];
  const statusRoutes = {
    "At Risk": ROUTES.sla,
    Overdue: ROUTES.escalation,
  };
  return card({
    title: "SLA Overview",
    body: `<div class="space-y-3">
      ${statuses
        .map((status) => {
          const content = `
            ${badge(status)}
            <span class="text-lg font-semibold text-white" data-sla-overview-status="${escapeHtml(status)}">${formatCount(countSlaOverviewStatus(documents, status))}</span>`;
          const route = statusRoutes[status];
          if (route) {
            return `<a href="#${route}" class="flex items-center justify-between gap-3 rounded-xl bg-[#102B46] p-3 outline-none transition hover:bg-[#163554] focus-visible:ring-2 focus-visible:ring-blue-400" aria-label="Open ${escapeHtml(status)} documents">${content}</a>`;
          }
          return `<div class="flex items-center justify-between gap-3 rounded-xl bg-[#102B46] p-3">${content}</div>`;
        })
        .join("")}
    </div>`,
  });
}

function renderEscalationAlert(documents) {
  const overdueDocuments = getOverdueDocuments(documents);
  return `<a href="#/escalation" class="block rounded-2xl outline-none transition hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-red-400" aria-label="Open Escalation Alert page">
  ${card({
    title: "Escalation Alert",
    body: `<div class="space-y-3">
      <div class="flex items-center justify-between rounded-xl bg-[#102B46] p-3">
        <span class="text-sm text-slate-300">Total Escalation</span>
        <span class="text-lg font-semibold text-white" data-escalation-total>${formatCount(overdueDocuments.length)}</span>
      </div>
      ${[1, 2, 3, 4]
        .map(
          (level) => `<div class="flex items-center justify-between rounded-xl bg-[#102B46] p-3">
            <span class="text-sm text-slate-300">Level ${level}</span>
            <span class="rounded-full bg-red-500/15 px-2.5 py-1 text-xs font-semibold text-red-300 ring-1 ring-red-500/30" data-escalation-level="${level}">${formatCount(countEscalationByLevel(documents, level))}</span>
          </div>`,
        )
        .join("")}
    </div>`,
  })}</a>`;
}

function renderStorageRepository(storageRepository) {
  return card({
    title: "Storage Repository",
    body: `<div class="space-y-3">
      <div class="flex items-center justify-between rounded-xl bg-[#102B46] p-3">
        <span class="text-sm text-slate-300">Total Storage</span>
        <span class="text-lg font-semibold text-white">${formatCount(storageRepository.length)}</span>
      </div>
      ${storageRepository
        .map(
          (item) => `<div class="rounded-xl bg-[#102B46] p-3">
            <div class="flex items-center justify-between gap-3">
              <span class="font-semibold text-white">${escapeHtml(item.name)}</span>
              ${badge(item.status)}
            </div>
            <p class="mt-2 break-all text-sm text-slate-300">${escapeHtml(item.path)}</p>
          </div>`,
        )
        .join("")}
    </div>`,
  });
}

function renderTableControls(state) {
  return `<div class="grid gap-3 rounded-2xl border border-[#1E3A5F] bg-[#0B2239] p-4 md:grid-cols-[1fr_180px_180px_140px]">
    <label class="text-sm text-slate-300" for="dashboard-search">Search
      <input id="dashboard-search" value="${escapeHtml(state.query)}" class="mt-1 w-full rounded-[10px] border border-[#1E3A5F] bg-[#061726] px-3 py-2 text-white outline-none focus:border-blue-500" placeholder="Search document..." />
    </label>
    <label class="text-sm text-slate-300" for="dashboard-status">Filter Status
      <select id="dashboard-status" class="mt-1 w-full rounded-[10px] border border-[#1E3A5F] bg-[#061726] px-3 py-2 text-white">
        <option value="">All Status</option>
        ${DOCUMENT_STATUS_FILTER_OPTIONS.map((status) => `<option value="${status}" ${state.status === status ? "selected" : ""}>${status}</option>`).join("")}
      </select>
    </label>
    <label class="text-sm text-slate-300" for="dashboard-sort">Sort By
      <select id="dashboard-sort" class="mt-1 w-full rounded-[10px] border border-[#1E3A5F] bg-[#061726] px-3 py-2 text-white">
        ${sortOptions.map((option) => `<option value="${option.value}" ${state.sortBy === option.value ? "selected" : ""}>${option.label}</option>`).join("")}
      </select>
    </label>
    <label class="text-sm text-slate-300" for="dashboard-page-size">Page Size
      <select id="dashboard-page-size" class="mt-1 w-full rounded-[10px] border border-[#1E3A5F] bg-[#061726] px-3 py-2 text-white">
        ${[5, 10, 20].map((size) => `<option value="${size}" ${state.pageSize === size ? "selected" : ""}>${size}</option>`).join("")}
      </select>
    </label>
  </div>`;
}

function renderRightSidebar({ documents, storageRepository }) {
  return `<aside class="space-y-5 xl:sticky xl:top-24 xl:self-start">
    ${renderSlaOverview(documents)}
    ${renderEscalationAlert(documents)}
    ${renderStorageRepository(storageRepository)}
  </aside>`;
}

function renderDocumentDetail(documentItem) {
  return `<dl class="grid gap-3 text-sm md:grid-cols-2">
    ${documentDetailColumns
      .filter((column) => column.key !== "no")
      .map(
        (column) => `<div class="rounded-xl bg-[#061726] p-3">
          <dt class="text-xs uppercase tracking-wide text-slate-500">${column.label}</dt>
          <dd class="mt-1 text-slate-100">${column.type === "badge" ? badge(documentItem[column.key]) : escapeHtml(documentItem[column.key] ?? "-")}</dd>
        </div>`,
      )
      .join("")}
  </dl>`;
}

function renderEditDocumentForm(documentItem) {
  const fields = applyDocumentReviewFields(documentFields, documentItem).map((fieldConfig) => ({ ...fieldConfig, value: fieldConfig.value ?? documentItem[fieldConfig.name] ?? "" }));
  return form({ id: "dashboard-document-form", fields });
}

export async function render(container) {
  try {
    await syncDashboardData();
  } catch (error) {
    showToast(error.message || "Failed to sync dashboard data", "error");
  }

  let slaTimerInterval = null;
  const state = {
    query: "",
    status: "",
    sortBy: "documentNo",
    currentPage: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  };

  function refreshVisibleSlaTimers() {
    container.querySelectorAll('[data-column-key="sla"]').forEach((cell) => {
      const rowId = cell.closest("[data-row-id]")?.dataset.rowId;
      const documentItem = rowId ? get(COLLECTIONS.documents).find((item) => Number(item.id) === Number(rowId)) : null;
      if (documentItem) {
        cell.textContent = formatDocumentSlaTimer(documentItem);
        cell.classList.remove("text-slate-200", "text-green-300", "text-amber-300", "text-red-300", "text-blue-300", "font-semibold");
        cell.classList.add(...getDocumentSlaTimerClass(documentItem).split(" "));
      }
    });
  }

  function refreshSlaOverviewCounts() {
    const documents = get(COLLECTIONS.documents);
    container.querySelectorAll("[data-sla-overview-status]").forEach((element) => {
      element.textContent = formatCount(countSlaOverviewStatus(documents, element.dataset.slaOverviewStatus));
    });
    const escalationTotal = container.querySelector("[data-escalation-total]");
    if (escalationTotal) {
      escalationTotal.textContent = formatCount(getOverdueDocuments(documents).length);
    }
    const kpiEscalationTotal = container.querySelector("[data-kpi-escalation-total]");
    if (kpiEscalationTotal) {
      kpiEscalationTotal.textContent = formatCount(getOverdueDocuments(documents).length);
    }
    container.querySelectorAll("[data-escalation-level]").forEach((element) => {
      element.textContent = formatCount(countEscalationByLevel(documents, Number(element.dataset.escalationLevel)));
    });
  }

  function startSlaTimerRefresh() {
    if (slaTimerInterval) {
      return;
    }
    slaTimerInterval = window.setInterval(() => {
      if (!container.isConnected) {
        window.clearInterval(slaTimerInterval);
        slaTimerInterval = null;
        return;
      }
      refreshVisibleSlaTimers();
      refreshSlaOverviewCounts();
    }, SLA_TIMER_REFRESH_INTERVAL);
  }

  function renderDashboard() {
    const documents = get(COLLECTIONS.documents);
    const storageRepository = get(COLLECTIONS.storageRepository);
    const filteredDocuments = filterDocuments(documents, state);
    const totalPages = Math.max(1, Math.ceil(filteredDocuments.length / state.pageSize));
    state.currentPage = Math.min(state.currentPage, totalPages);
    const pageRows = createDashboardRows(filteredDocuments.slice((state.currentPage - 1) * state.pageSize, state.currentPage * state.pageSize));

    container.innerHTML = `<section class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_17.6rem]">
      <div class="min-w-0 space-y-6">
        ${renderKpiSummary(documents)}
        <section class="space-y-4">
          <div>
            <p class="text-sm text-slate-400">Monitoring utama seluruh dokumen engineering dari Document Register.</p>
            <h2 class="text-2xl font-bold">Document Register Table</h2>
          </div>
          ${renderTableControls(state)}
          ${table({
            columns: documentColumns,
            rows: pageRows,
            actions: visibleActions("document", ["view", "edit", "download"]).map((name) => ({
              name,
              label: name[0].toUpperCase() + name.slice(1),
              className: actionClasses[name],
            })),
            currentPage: state.currentPage,
            totalPages,
            inlineActions: true,
          })}
        </section>
      </div>
      ${renderRightSidebar({ documents, storageRepository })}
      <div id="modal-root"></div>
    </section>`;
    startSlaTimerRefresh();
  }

  function restoreSearchFocus() {
    const searchInput = container.querySelector("#dashboard-search");
    if (!searchInput) {
      return;
    }
    searchInput.focus();
    const cursorPosition = searchInput.value.length;
    searchInput.setSelectionRange(cursorPosition, cursorPosition);
  }

  container.addEventListener("input", (event) => {
    enforceMinimumNumberInput(event);
    if (event.target.id === "dashboard-search") {
      state.query = event.target.value;
      state.currentPage = 1;
      renderDashboard();
      restoreSearchFocus();
    }
  });

  container.addEventListener("change", (event) => {
    handleFileInputChange(event);
    if (event.target.id === "dashboard-status") {
      state.status = event.target.value;
      state.currentPage = 1;
      renderDashboard();
    }
    if (event.target.id === "dashboard-sort") {
      state.sortBy = event.target.value;
      state.currentPage = 1;
      renderDashboard();
    }
    if (event.target.id === "dashboard-page-size") {
      state.pageSize = Number(event.target.value) || DEFAULT_PAGE_SIZE;
      state.currentPage = 1;
      renderDashboard();
    }
  });

  container.addEventListener("click", (event) => {
    closeActionMenus(container, event);
    const actionElement = event.target.closest("[data-action]");
    if (!actionElement) {
      return;
    }
    const { action, id } = actionElement.dataset;
    const documentItem = id ? get(COLLECTIONS.documents).find((item) => Number(item.id) === Number(id)) : null;
    if (action === "prev-page") {
      state.currentPage = Math.max(1, state.currentPage - 1);
      renderDashboard();
    }
    if (action === "next-page") {
      state.currentPage += 1;
      renderDashboard();
    }
    if (action === "view" && documentItem) {
      container.querySelector("#modal-root").innerHTML = modal({
        title: "View Document",
        body: renderDocumentDetail(documentItem),
      });
    }
    if (action === "edit" && documentItem) {
      container.querySelector("#modal-root").innerHTML = modal({
        title: "Edit Document",
        body: renderEditDocumentForm(documentItem),
      });
      container.querySelector("#dashboard-document-form").addEventListener("submit", (submitEvent) => {
        submitEvent.preventDefault();
        const data = normalizeDocumentFormData(serializeForm(submitEvent.currentTarget), documentItem);
        updateResource("documents", documentItem.id, data, submitEvent.currentTarget)
          .then(async (updatedDocument) => {
            await syncDashboardData();
            createAudit({ action: "Edit Document", document: updatedDocument.documentNo, detail: "Document updated from Dashboard" });
            showToast("Document updated", "success");
            renderDashboard();
          })
          .catch((error) => showToast(error.message || "Failed to update document", "error"));
      });
    }
    if (action === "download" && documentItem) {
      downloadResource("documents", documentItem)
        .then(() => {
          createAudit({ action: "Download Document", document: documentItem.documentNo, detail: "Download action triggered from Dashboard" });
          showToast("Download started", "success");
        })
        .catch((error) => showToast(error.message || "Download failed", "error"));
    }
    if (action === "close-modal") {
      container.querySelector("#modal-root").innerHTML = "";
    }
  });

  renderDashboard();
}
