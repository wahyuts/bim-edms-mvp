import { renderCrudPage } from "../../utils/crud-page.js";
import { COLLECTIONS } from "../../utils/constants.js";

export function render(container) {
  renderCrudPage(container, {
    title: "Incoming Transmittal",
    itemName: "Incoming Transmittal",
    collection: COLLECTIONS.incomingTransmittal,
    permissionModule: "transmittal",
    actions: ["view", "edit", "delete", "download"],
    columns: [
      { key: "no", label: "No" },
      { key: "transmittalNo", label: "Transmittal Number" },
      { key: "sender", label: "Sender" },
      { key: "date", label: "Receive Date" },
      { key: "documents", label: "Document Count" },
      { key: "status", label: "Status", type: "badge" },
    ],
    fields: [
      { name: "transmittalNo", label: "Transmittal Number", required: true },
      { name: "sender", label: "Sender", required: true },
      { name: "date", label: "Receive Date", type: "date", required: true },
      { name: "documents", label: "Document Count", type: "number", required: true },
      { name: "status", label: "Status", required: true, options: ["Received", "In Review", "Closed"] },
    ],
  });
}
