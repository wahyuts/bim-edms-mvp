import { renderCrudPage } from "../../utils/crud-page.js";
import { COLLECTIONS } from "../../utils/constants.js";

export function render(container) {
  renderCrudPage(container, {
    title: "Audit Trail",
    itemName: "Audit Trail",
    collection: COLLECTIONS.auditTrail,
    apiResource: "audit",
    permissionModule: "audit",
    readOnly: true,
    columns: [
      { key: "no", label: "No" },
      { key: "time", label: "Time" },
      { key: "user", label: "User" },
      { key: "action", label: "Action" },
      { key: "document", label: "Document" },
      { key: "detail", label: "Detail" },
    ],
    fields: [],
  });
}
