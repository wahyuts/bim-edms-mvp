import { renderCrudPage } from "../../utils/crud-page.js";
import { COLLECTIONS } from "../../utils/constants.js";

export function render(container) {
  renderCrudPage(container, {
    title: "Outgoing Transmittal",
    itemName: "Outgoing Transmittal",
    collection: COLLECTIONS.outgoingTransmittal,
    permissionModule: "transmittal",
    actions: ["view", "edit", "delete", "download"],
    columns: [
      { key: "no", label: "No" },
      { key: "transmittalNo", label: "Transmittal Number" },
      { key: "destination", label: "Destination" },
      { key: "date", label: "Send Date" },
      { key: "documents", label: "Document Count" },
      { key: "status", label: "Status", type: "badge" },
    ],
    fields: [
      { name: "transmittalNo", label: "Transmittal Number", required: true },
      { name: "destination", label: "Destination", required: true },
      { name: "date", label: "Send Date", type: "date", required: true },
      { name: "documents", label: "Document Count", type: "number", required: true },
      { name: "status", label: "Status", required: true, options: ["Draft", "Sent", "Closed"] },
    ],
  });
}
