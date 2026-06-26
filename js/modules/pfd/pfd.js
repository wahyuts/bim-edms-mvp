import { renderCrudPage } from "../../utils/crud-page.js";
import { COLLECTIONS, DOCUMENT_EDITABLE_STATUSES, DOCUMENT_STATUS_FILTER_OPTIONS } from "../../utils/constants.js";

export function render(container) {
  renderCrudPage(container, {
    title: "PFD",
    itemName: "PFD",
    collection: COLLECTIONS.documents,
    apiResource: "pfd",
    stateKey: "documents:pfd",
    permissionModule: "document",
    description: "Filtered view from Document Register for PFD documents.",
    rowFilter: (documentItem) => documentItem.discipline === "PFD",
    prepareData: (data) => ({ ...data, discipline: "PFD" }),
    actions: ["view", "edit", "delete", "upload", "download"],
    inlineActions: true,
    searchPlaceholder: "Search document...",
    statusFilter: {
      key: "status",
      options: DOCUMENT_STATUS_FILTER_OPTIONS,
    },
    sortOptions: [
      { value: "documentNo", label: "Document Number" },
      { value: "description", label: "Description" },
      { value: "revision", label: "Revision" },
      { value: "status", label: "Status" },
    ],
    columns: [
      { key: "no", label: "No" },
      { key: "documentNo", label: "Document Number" },
      { key: "description", label: "Description" },
      { key: "revision", label: "Revision" },
      { key: "status", label: "Status", type: "badge" },
    ],
    fields: [
      { name: "fileName", label: "Upload Document", type: "file", accept: ".pdf,.dwg,.dxf", autoFillTarget: "documentNo", fullWidth: true },
      { name: "documentNo", label: "Document Number", required: true },
      { name: "description", label: "Description", required: true },
      { name: "area", label: "Area" },
      { name: "revision", label: "Revision", type: "number", required: true, min: 0 },
      { name: "status", label: "Status", required: true, options: DOCUMENT_EDITABLE_STATUSES },
      { name: "sla", label: "SLA Timer", type: "date", lang: "en-GB", placeholder: "dd/mm/yyyy" },
      { name: "nasLocation", label: "NAS Location" },
    ],
  });
}
