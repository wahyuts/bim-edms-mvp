import { form } from "../../components/form.js";
import { modal } from "../../components/modal.js";
import { table } from "../../components/table.js";
import { showToast } from "../../components/toast.js";
import { createAudit } from "../../services/audit.js";
import { updateResource } from "../../services/api-resources.js";
import { syncDocuments } from "../../services/backend-sync.js";
import { get } from "../../services/storage.js";
import { visibleActions } from "../../services/access-control.js";
import { COLLECTIONS, DOCUMENT_EDITABLE_STATUSES } from "../../utils/constants.js";
import { closeActionMenus, enforceMinimumNumberInput, handleFileInputChange, serializeForm } from "../../utils/dom.js";
import { applyDocumentReviewFields, normalizeDocumentFormData } from "../../utils/document-form.js";
import { formatCount } from "../../utils/formatter.js";
import { formatDocumentSlaTimer, getDocumentSlaOverviewStatus, getDocumentSlaTimerClass } from "../../utils/sla-timer.js";

const SLA_TIMER_REFRESH_INTERVAL = 60 * 1000;

const actionClasses = {
  edit: "bg-blue-600 text-white hover:bg-blue-700",
};

const slaStatuses = ["On Track", "At Risk", "Overdue", "Final As-Built"];

const documentColumns = [
  { key: "no", label: "No" },
  { key: "documentNo", label: "Document Number" },
  { key: "description", label: "Description" },
  { key: "discipline", label: "Discipline" },
  { key: "revision", label: "Revision" },
  { key: "status", label: "Document Status", type: "badge" },
  { key: "slaStatus", label: "SLA Status", type: "badge" },
  { key: "slaTimer", label: "SLA Timer" },
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

function createActions(names) {
  return names.map((name) => ({ name, label: name[0].toUpperCase() + name.slice(1), className: actionClasses[name] }));
}

function createSlaRows(documents) {
  return documents.map((documentItem) => ({
    ...documentItem,
    slaStatus: getDocumentSlaOverviewStatus(documentItem) || "-",
    slaTimer: formatDocumentSlaTimer(documentItem),
    cellClasses: {
      slaTimer: getDocumentSlaTimerClass(documentItem),
    },
  }));
}

function getAtRiskDocuments() {
  return get(COLLECTIONS.documents).filter((documentItem) => getDocumentSlaOverviewStatus(documentItem) === "At Risk");
}

function countBySlaStatus(documents, status) {
  return documents.filter((documentItem) => getDocumentSlaOverviewStatus(documentItem) === status).length;
}

function renderSummary(documents) {
  return `<div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
    ${slaStatuses
      .map(
        (status) => `<div class="rounded-2xl border border-[#1E3A5F] bg-[#0B2239] p-5">
          <p class="text-sm text-slate-400">${status}</p>
          <p class="mt-2 text-4xl font-bold">${formatCount(countBySlaStatus(documents, status))}</p>
        </div>`,
      )
      .join("")}
  </div>`;
}

function renderEditDocumentForm(documentItem) {
  const fields = applyDocumentReviewFields(documentFields, documentItem).map((fieldConfig) => ({ ...fieldConfig, value: fieldConfig.value ?? documentItem[fieldConfig.name] ?? "" }));
  return form({ id: "sla-document-form", fields });
}

export async function render(container) {
  try {
    await syncDocuments();
  } catch (error) {
    showToast(error.message || "Failed to sync SLA data", "error");
  }

  let slaTimerInterval = null;

  function refreshVisibleSlaTimers() {
    container.querySelectorAll('[data-column-key="slaTimer"]').forEach((cell) => {
      const rowId = cell.closest("[data-row-id]")?.dataset.rowId;
      const documentItem = rowId ? get(COLLECTIONS.documents).find((item) => Number(item.id) === Number(rowId)) : null;
      if (documentItem) {
        cell.textContent = formatDocumentSlaTimer(documentItem);
        cell.classList.remove("text-slate-200", "text-green-300", "text-amber-300", "text-red-300", "text-blue-300", "font-semibold");
        cell.classList.add(...getDocumentSlaTimerClass(documentItem).split(" "));
      }
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
    }, SLA_TIMER_REFRESH_INTERVAL);
  }

  function renderPage() {
    const documents = get(COLLECTIONS.documents);
    const atRiskRows = createSlaRows(getAtRiskDocuments());
    container.innerHTML = `<section class="space-y-5">
      <div>
        <p class="text-sm text-slate-400">Monitoring SLA dokumen engineering dari Document Register.</p>
        <h2 class="text-2xl font-bold">SLA Monitoring</h2>
      </div>
      ${renderSummary(documents)}
      <section class="space-y-4">
        <div>
          <p class="text-sm text-slate-400">Seluruh dokumen dengan SLA status At Risk.</p>
          <h3 class="text-xl font-semibold">At Risk Documents</h3>
        </div>
        ${table({
          columns: documentColumns,
          rows: atRiskRows,
          actions: createActions(visibleActions("document", ["edit"])),
          currentPage: 1,
          totalPages: 1,
          inlineActions: true,
        })}
      </section>
      <div id="modal-root"></div>
    </section>`;
    startSlaTimerRefresh();
  }

  container.addEventListener("change", handleFileInputChange);

  container.addEventListener("input", enforceMinimumNumberInput);

  container.addEventListener("click", (event) => {
    closeActionMenus(container, event);
    const actionElement = event.target.closest("[data-action]");
    if (!actionElement) {
      return;
    }

    const { action, id } = actionElement.dataset;
    const documentItem = id ? get(COLLECTIONS.documents).find((item) => Number(item.id) === Number(id)) : null;

    if (action === "edit" && documentItem) {
      container.querySelector("#modal-root").innerHTML = modal({
        title: "Edit Document",
        body: renderEditDocumentForm(documentItem),
      });
      container.querySelector("#sla-document-form").addEventListener("submit", (submitEvent) => {
        submitEvent.preventDefault();
        const data = normalizeDocumentFormData(serializeForm(submitEvent.currentTarget), documentItem);
        updateResource("documents", documentItem.id, data, submitEvent.currentTarget)
          .then(async (updatedDocument) => {
            await syncDocuments();
            createAudit({ action: "Edit Document", document: updatedDocument.documentNo, detail: "Document updated from SLA Monitoring" });
            showToast("Document updated", "success");
            renderPage();
          })
          .catch((error) => showToast(error.message || "Failed to update document", "error"));
      });
    }

    if (action === "close-modal") {
      container.querySelector("#modal-root").innerHTML = "";
    }
  });

  renderPage();
}
