export function notificationItem({ title, message, read, createdAt }) {
  return `<article class="rounded-xl border border-[#1E3A5F] bg-[#102B46] p-4 ${read ? "opacity-70" : ""}">
    <div class="flex items-center justify-between gap-3">
      <h3 class="font-semibold">${title}</h3>
      <span class="text-xs text-slate-400">${createdAt}</span>
    </div>
    <p class="mt-2 text-sm text-slate-300">${message}</p>
  </article>`;
}
