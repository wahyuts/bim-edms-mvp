import { form } from "../components/form.js";
import { badge } from "../components/badge.js";
import { modal } from "../components/modal.js";
import { table } from "../components/table.js";
import { showToast } from "../components/toast.js";
import { createAudit } from "../services/audit.js";
import { createResource, deleteResource, downloadResource, listResource, updateResource } from "../services/api-resources.js";
import { visibleActions, can } from "../services/access-control.js";
import { createNotification } from "../services/notification.js";
import { create, get, getSetting, remove, replace, setSetting, update } from "../services/storage.js";
import { DEFAULT_PAGE_SIZE, ROUTES } from "./constants.js";
import { closeActionMenus, enforceMinimumNumberInput, handleFileInputChange, serializeForm } from "./dom.js";
import { escapeHtml } from "./formatter.js";

const actionClasses = {
  view: "bg-slate-700 text-white hover:bg-slate-600",
  edit: "bg-blue-600 text-white hover:bg-blue-700",
  delete: "bg-red-600 text-white hover:bg-red-700",
  download: "bg-green-600 text-white hover:bg-green-700",
  upload: "bg-amber-600 text-white hover:bg-amber-700",
};

function createActions(names) {
  return names.map((name) => ({ name, label: name[0].toUpperCase() + name.slice(1), className: actionClasses[name] }));
}

function filterRows(rows, query) {
  const normalizedQuery = query.toLowerCase();
  return rows.filter((row) => Object.values(row).join(" ").toLowerCase().includes(normalizedQuery));
}

function sortRows(rows, sortKey) {
  if (!sortKey) {
    return rows;
  }
  return [...rows].sort((firstRow, secondRow) => {
    const firstValue = firstRow[sortKey];
    const secondValue = secondRow[sortKey];
    if (typeof firstValue === "number" && typeof secondValue === "number") {
      return firstValue - secondValue;
    }
    return String(firstValue ?? "").localeCompare(String(secondValue ?? ""), undefined, {
      numeric: true,
      sensitivity: "base",
    });
  });
}

function createControlOptions(options, selectedValue) {
  return options.map((option) => `<option value="${escapeHtml(option.value)}" ${option.value === selectedValue ? "selected" : ""}>${escapeHtml(option.label)}</option>`).join("");
}

const documentViewFields = [
  { key: "documentNo", label: "Document Number" },
  { key: "description", label: "Description" },
  { key: "discipline", label: "Discipline" },
  { key: "area", label: "Area" },
  { key: "revision", label: "Revision" },
  { key: "status", label: "Status", type: "badge" },
  { key: "sla", label: "SLA Timer" },
  { key: "verifyDeadlineDate", label: "Verify deadline date" },
  { key: "reviewComment", label: "Review Comment" },
  { key: "nasLocation", label: "NAS Location" },
];

function renderDetailValue(record, fieldConfig) {
  const value = record[fieldConfig.key] ?? "-";
  if (fieldConfig.type === "badge") {
    return badge(value);
  }
  return `<p class="mt-1 break-words text-sm font-medium text-slate-100">${escapeHtml(value || "-")}</p>`;
}

function renderRecordDetail(record, config) {
  const fields = config.viewFields || (record.documentNo ? documentViewFields : config.fields.map((fieldConfig) => ({ key: fieldConfig.name, label: fieldConfig.label })));
  return `<dl class="grid gap-3 md:grid-cols-2">
    ${fields
      .filter((fieldConfig) => fieldConfig.key && fieldConfig.key !== "fileName")
      .map(
        (fieldConfig) => `<div class="rounded-xl bg-[#061726] p-3">
          <dt class="text-[10px] font-semibold uppercase tracking-wide text-slate-500">${escapeHtml(fieldConfig.label)}</dt>
          <dd>${renderDetailValue(record, fieldConfig)}</dd>
        </div>`,
      )
      .join("")}
  </dl>`;
}

function notificationTarget(config) {
  const targets = {
    documents: { module: "document", targetRoute: ROUTES.documentRegister, targetLabel: "Open Document Register" },
    pfd: { module: "document", targetRoute: ROUTES.pfd, targetLabel: "Open PFD" },
    pid: { module: "document", targetRoute: ROUTES.pid, targetLabel: "Open P&ID" },
    incomingTransmittal: { module: "transmittal", targetRoute: ROUTES.incoming, targetLabel: "Open Incoming" },
    outgoingTransmittal: { module: "transmittal", targetRoute: ROUTES.outgoing, targetLabel: "Open Outgoing" },
    storageRepository: { module: "storage", targetRoute: ROUTES.storage, targetLabel: "Open Storage" },
  };
  return targets[config.stateKey] || targets[config.apiResource] || targets[config.collection] || { module: "system", targetRoute: ROUTES.dashboard, targetLabel: "Open Dashboard" };
}

export function renderCrudPage(container, config) {
  const stateKey = config.stateKey || config.collection;
  const statusFilter = config.statusFilter || null;
  const sortOptions = config.sortOptions || [];
  const defaultSortBy = sortOptions[0]?.value || "";
  const state = {
    query: "",
    status: statusFilter ? getSetting(`${stateKey}:status`, "all") : "all",
    sortBy: sortOptions.length ? getSetting(`${stateKey}:sortBy`, defaultSortBy) : "",
    currentPage: 1,
    pageSize: Number(getSetting(`${stateKey}:pageSize`, DEFAULT_PAGE_SIZE)) || DEFAULT_PAGE_SIZE,
  };
  let records = [];
  let isLoading = true;
  if (statusFilter && state.status !== "all" && !statusFilter.options.includes(state.status)) {
    state.status = "all";
    setSetting(`${stateKey}:status`, state.status);
  }

  async function loadRecords() {
    isLoading = true;
    renderPage();
    try {
      records = config.apiResource ? await listResource(config.apiResource) : get(config.collection);
      if (config.collection) {
        replace(config.collection, records);
      }
    } catch (error) {
      showToast(error.message || "Failed to load data from API", "error");
      records = get(config.collection);
    } finally {
      isLoading = false;
      renderPage();
    }
  }

  function rows() {
    const collectionRows = records;
    const scopedRows = typeof config.rowFilter === "function" ? collectionRows.filter(config.rowFilter) : collectionRows;
    const statusRows = statusFilter && state.status !== "all" ? scopedRows.filter((row) => row[statusFilter.key] === state.status) : scopedRows;
    return sortRows(filterRows(statusRows, state.query), state.sortBy);
  }

  function renderPage() {
    if (isLoading) {
      container.innerHTML = `<section class="rounded-2xl border border-[#1E3A5F] bg-[#0B2239] p-5 text-slate-200">Loading ${escapeHtml(config.title)}...</section>`;
      return;
    }

    const filteredRows = rows();
    const totalPages = Math.max(1, Math.ceil(filteredRows.length / state.pageSize));
    const pageRows = filteredRows.slice((state.currentPage - 1) * state.pageSize, state.currentPage * state.pageSize);
    const statusOptions = statusFilter
      ? [{ value: "all", label: statusFilter.allLabel || "All Status" }, ...statusFilter.options.map((option) => ({ value: option, label: option }))]
      : [];
    container.innerHTML = `<section class="space-y-5">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p class="text-sm text-slate-400">${config.description || "Manage EDMS data from LocalStorage."}</p>
          <h2 class="text-2xl font-bold">${config.title}</h2>
        </div>
        ${config.readOnly || !can(config.permissionModule, "create") ? "" : `<button class="rounded-[10px] bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-700" data-action="create">Create</button>`}
      </div>
      <div class="grid gap-3 rounded-2xl border border-[#1E3A5F] bg-[#0B2239] p-4 md:grid-cols-2 xl:grid-cols-[1fr_180px_180px_140px]">
        <label class="text-sm text-slate-300" for="search">Search
          <input id="search" value="${escapeHtml(state.query)}" class="mt-1 w-full rounded-[10px] border border-[#1E3A5F] bg-[#061726] px-3 py-2 text-white outline-none focus:border-blue-500" placeholder="${escapeHtml(config.searchPlaceholder || "Search records...")}" />
        </label>
        ${
          statusFilter
            ? `<label class="text-sm text-slate-300" for="status-filter">Filter Status
          <select id="status-filter" class="mt-1 w-full rounded-[10px] border border-[#1E3A5F] bg-[#061726] px-3 py-2 text-white">
            ${createControlOptions(statusOptions, state.status)}
          </select>
        </label>`
            : ""
        }
        ${
          sortOptions.length
            ? `<label class="text-sm text-slate-300" for="sort-by">Sort By
          <select id="sort-by" class="mt-1 w-full rounded-[10px] border border-[#1E3A5F] bg-[#061726] px-3 py-2 text-white">
            ${createControlOptions(sortOptions, state.sortBy)}
          </select>
        </label>`
            : ""
        }
        <label class="text-sm text-slate-300" for="page-size">Page Size
          <select id="page-size" class="mt-1 w-full rounded-[10px] border border-[#1E3A5F] bg-[#061726] px-3 py-2 text-white">
            ${[5, 10, 20].map((size) => `<option value="${size}" ${state.pageSize === size ? "selected" : ""}>${size}</option>`).join("")}
          </select>
        </label>
      </div>
      ${table({ columns: config.columns, rows: pageRows, actions: createActions(config.readOnly ? visibleActions(config.permissionModule, ["view"]) : visibleActions(config.permissionModule, config.actions)), currentPage: state.currentPage, totalPages, inlineActions: config.inlineActions })}
      <div id="modal-root"></div>
    </section>`;
  }

  function restoreSearchFocus() {
    const searchInput = container.querySelector("#search");
    if (!searchInput) {
      return;
    }
    searchInput.focus();
    const cursorPosition = searchInput.value.length;
    searchInput.setSelectionRange(cursorPosition, cursorPosition);
  }

  function openForm(record = null) {
    const baseFields = typeof config.prepareFields === "function" ? config.prepareFields(config.fields, record) : config.fields;
    const fields = baseFields.map((fieldConfig) => ({ ...fieldConfig, value: fieldConfig.value ?? record?.[fieldConfig.name] ?? "" }));
    container.querySelector("#modal-root").innerHTML = modal({
      title: record ? `Edit ${config.itemName}` : `Create ${config.itemName}`,
      body: form({ id: "record-form", fields }),
    });
    container.querySelector("#record-form").addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = serializeForm(event.currentTarget);
      const data = typeof config.prepareData === "function" ? config.prepareData(formData, record) : formData;
      const documentLabel = data.documentNo || data.transmittalNo || data.name || config.itemName;

      try {
        if (record) {
          if (config.apiResource) {
            await updateResource(config.apiResource, record.id, data, event.currentTarget);
            await loadRecords();
          } else {
            update(config.collection, record.id, data);
            records = get(config.collection);
          }
          createAudit({ action: `Edit ${config.itemName}`, document: documentLabel, detail: `${config.itemName} updated` });
          showToast(`${config.itemName} updated`, "success");
        } else {
          if (config.apiResource) {
            await createResource(config.apiResource, data, event.currentTarget);
            await loadRecords();
          } else {
            create(config.collection, data);
            records = get(config.collection);
          }
          createAudit({ action: `Create ${config.itemName}`, document: documentLabel, detail: `${config.itemName} created` });
          await createNotification({
            title: `${config.itemName} Created`,
            message: `${documentLabel} has been created.`,
            type: "success",
            ...notificationTarget(config),
          });
          showToast(`${config.itemName} created`, "success");
        }
      } catch (error) {
        showToast(error.message || `Failed to save ${config.itemName}`, "error");
        return;
      }
      renderPage();
    });
  }

  container.addEventListener("input", (event) => {
    enforceMinimumNumberInput(event);
    if (event.target.id === "search") {
      state.query = event.target.value;
      state.currentPage = 1;
      renderPage();
      restoreSearchFocus();
    }
  });
  container.addEventListener("change", (event) => {
    handleFileInputChange(event);
    if (event.target.id === "status-filter") {
      state.status = event.target.value;
      setSetting(`${stateKey}:status`, state.status);
      state.currentPage = 1;
      renderPage();
    }
    if (event.target.id === "sort-by") {
      state.sortBy = event.target.value;
      setSetting(`${stateKey}:sortBy`, state.sortBy);
      state.currentPage = 1;
      renderPage();
    }
    if (event.target.id === "page-size") {
      state.pageSize = Number(event.target.value);
      setSetting(`${stateKey}:pageSize`, state.pageSize);
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
    const record = id ? records.find((item) => Number(item.id) === Number(id)) : null;
    if (action === "create") {
      openForm();
    }
    if (action === "edit" && record) {
      openForm(record);
    }
    if (action === "view" && record) {
      container.querySelector("#modal-root").innerHTML = modal({
        title: `View ${config.itemName}`,
        body: renderRecordDetail(record, config),
      });
    }
    if (action === "delete" && record && window.confirm("Are you sure you want to delete this record?")) {
      (async () => {
        try {
          if (config.apiResource) {
            await deleteResource(config.apiResource, record.id);
            await loadRecords();
          } else {
            remove(config.collection, record.id);
            records = get(config.collection);
          }
          createAudit({ action: `Delete ${config.itemName}`, document: record.documentNo || record.transmittalNo || record.name, detail: `${config.itemName} deleted` });
          await createNotification({
            title: `${config.itemName} Deleted`,
            message: `${config.itemName} was deleted.`,
            type: "warning",
            ...notificationTarget(config),
          });
          showToast(`${config.itemName} deleted`, "success");
          renderPage();
        } catch (error) {
          showToast(error.message || `Failed to delete ${config.itemName}`, "error");
        }
      })();
    }
    if (action === "download" && record) {
      (async () => {
        try {
          if (config.apiResource) {
            await downloadResource(config.apiResource, record);
          }
          createAudit({ action: `download ${config.itemName}`, document: record.documentNo || record.transmittalNo || record.name, detail: "download action triggered" });
          showToast("Download started", "success");
        } catch (error) {
          showToast(error.message || "Download failed", "error");
        }
      })();
    }
    if (action === "upload" && record) {
      createAudit({ action: `${action} ${config.itemName}`, document: record.documentNo || record.transmittalNo || record.name, detail: `${action} action triggered` });
      showToast(`${action} action recorded`, "info");
    }
    if (action === "close-modal") {
      container.querySelector("#modal-root").innerHTML = "";
    }
    if (action === "prev-page") {
      state.currentPage = Math.max(1, state.currentPage - 1);
      renderPage();
    }
    if (action === "next-page") {
      state.currentPage += 1;
      renderPage();
    }
  });

  loadRecords();
}
