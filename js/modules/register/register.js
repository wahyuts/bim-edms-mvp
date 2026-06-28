import { renderCrudPage } from "../../utils/crud-page.js";
import { COLLECTIONS, DOCUMENT_EDITABLE_STATUSES, DOCUMENT_STATUSES } from "../../utils/constants.js";
import { applyDocumentReviewFields, normalizeDocumentFormData } from "../../utils/document-form.js";

export function render(container) {
  renderCrudPage(container, {
    title: "Document Register",
    itemName: "Document",
    collection: COLLECTIONS.documents,
    apiResource: "documents",
    permissionModule: "document",
    description: "Search, filter, paginate, and manage master document register.",
    prepareData: (data, record) => (record ? normalizeDocumentFormData(data, record) : data),
    prepareFields: (fields, record) => (record ? applyDocumentReviewFields(fields, record, { includeOnCreate: false }) : fields),
    actions: ["view", "edit", "delete", "download"],
    searchPlaceholder: "Search document...",
    statusFilter: {
      key: "status",
      options: DOCUMENT_STATUSES,
    },
    sortOptions: [
      { value: "documentNo", label: "Document Number" },
      { value: "description", label: "Description" },
      { value: "discipline", label: "Discipline" },
      { value: "area", label: "Area" },
      { value: "revision", label: "Revision" },
      { value: "status", label: "Status" },
    ],
    columns: [
      { key: "no", label: "No" },
      { key: "documentNo", label: "Document Number" },
      { key: "description", label: "Description" },
      { key: "discipline", label: "Discipline" },
      { key: "area", label: "Area" },
      { key: "revision", label: "Revision" },
      { key: "status", label: "Status", type: "badge" },
      { key: "sla", label: "SLA Timer" },
      { key: "nasLocation", label: "NAS Location" },
    ],
    fields: [
      { name: "fileName", label: "Attachment", type: "file", accept: ".pdf,.dwg,.dxf", autoFillTarget: "documentNo", fullWidth: true },
      { name: "documentNo", label: "Document Number", required: true },
      { name: "description", label: "Description", required: true },
      { name: "discipline", label: "Discipline", required: true, options: ["PFD", "PID"] },
      { name: "area", label: "Area" },
      { name: "revision", label: "Revision", type: "number", required: true, min: 0 },
      { name: "status", label: "Status", required: true, options: DOCUMENT_EDITABLE_STATUSES },
      { name: "sla", label: "SLA Timer", type: "date", lang: "en-US", placeholder: "mm/dd/yyyy" },
      { name: "nasLocation", label: "NAS Location" },
    ],
  });
}
