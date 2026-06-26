export function pagination({ currentPage, totalPages }) {
  return `<div class="flex items-center justify-between gap-3 border-t border-[#1E3A5F] px-4 py-3 text-sm text-slate-300">
    <span>Page ${currentPage} of ${Math.max(totalPages, 1)}</span>
    <div class="flex gap-2">
      <button class="rounded-lg bg-slate-700 px-3 py-1.5 disabled:opacity-40" data-action="prev-page" ${currentPage <= 1 ? "disabled" : ""}>Previous</button>
      <button class="rounded-lg bg-slate-700 px-3 py-1.5 disabled:opacity-40" data-action="next-page" ${currentPage >= totalPages ? "disabled" : ""}>Next</button>
    </div>
  </div>`;
}
