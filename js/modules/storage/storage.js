import { renderCrudPage } from "../../utils/crud-page.js";
import { COLLECTIONS } from "../../utils/constants.js";

export function render(container) {
  renderCrudPage(container, {
    title: "Storage Repository NAS",
    itemName: "Storage Repository",
    collection: COLLECTIONS.storageRepository,
    apiResource: "storage",
    permissionModule: "storage",
    actions: ["view", "edit", "delete", "download"],
    columns: [
      { key: "no", label: "No" },
      { key: "name", label: "Repository" },
      { key: "status", label: "Status", type: "badge" },
      { key: "path", label: "Path" },
    ],
    fields: [
      { name: "name", label: "Repository Name", required: true },
      { name: "path", label: "Path", required: true },
      { name: "status", label: "Status", required: true, options: ["Online", "Offline", "Maintenance"] },
    ],
  });
}
