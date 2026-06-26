import { escapeHtml } from "../utils/formatter.js";

export function badge(label) {
  const normalizedLabel = String(label || "Draft");
  const classes = {
    Approved: "bg-green-500/15 text-green-300 ring-green-500/30",
    "Client Review": "bg-orange-500/15 text-orange-300 ring-orange-500/30",
    Draft: "bg-blue-500/15 text-blue-300 ring-blue-500/30",
    "Internal Draft": "bg-blue-500/15 text-blue-300 ring-blue-500/30",
    "Internal Review": "bg-cyan-500/15 text-cyan-300 ring-cyan-500/30",
    "Revision Requested": "bg-yellow-500/15 text-yellow-300 ring-yellow-500/30",
    Overdue: "bg-red-500/15 text-red-300 ring-red-500/30",
    "At Risk": "bg-amber-500/15 text-amber-300 ring-amber-500/30",
    "On Track": "bg-green-500/15 text-green-300 ring-green-500/30",
    "Final As-Built": "bg-blue-500/15 text-blue-300 ring-blue-500/30",
    Online: "bg-green-500/15 text-green-300 ring-green-500/30",
    Sent: "bg-green-500/15 text-green-300 ring-green-500/30",
    Received: "bg-cyan-500/15 text-cyan-300 ring-cyan-500/30",
    Info: "bg-blue-500/15 text-blue-300 ring-blue-500/30",
    Success: "bg-green-500/15 text-green-300 ring-green-500/30",
    Warning: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
    Error: "bg-red-500/15 text-red-300 ring-red-500/30",
  };
  return `<span class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${classes[normalizedLabel] || classes.Draft}">${escapeHtml(normalizedLabel)}</span>`;
}
