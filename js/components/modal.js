export function modal({ title, body, footer = "" }) {
  return `<div class="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4" data-modal>
    <section class="w-full max-w-2xl rounded-2xl border border-[#1E3A5F] bg-[#0B2239] p-5 shadow-xl">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-xl font-semibold">${title}</h2>
        <button class="rounded-lg p-2 hover:bg-white/10" data-action="close-modal" aria-label="Close modal">✕</button>
      </div>
      ${body}
      ${footer ? `<div class="mt-5 flex justify-end gap-3">${footer}</div>` : ""}
    </section>
  </div>`;
}
