export function card({ title = "", body = "", extraClass = "" }) {
  return `<section class="rounded-2xl border border-[#1E3A5F] bg-[#0B2239] p-5 shadow-xl ${extraClass}">
    ${title ? `<h2 class="mb-4 text-lg font-semibold text-white">${title}</h2>` : ""}
    ${body}
  </section>`;
}

export function kpiCard({ label, value, tone = "blue", helper = "", valueAttribute = "" }) {
  const tones = {
    blue: "from-blue-500/20 to-blue-500/5 text-blue-200",
    green: "from-green-500/20 to-green-500/5 text-green-200",
    amber: "from-amber-500/20 to-amber-500/5 text-amber-200",
    atRisk: "from-amber-500/15 to-amber-500/15 text-amber-300",
    red: "from-red-500/20 to-red-500/5 text-red-200",
  };
  return `<section class="rounded-2xl border border-[#1E3A5F] bg-gradient-to-br ${tones[tone]} p-5 shadow-xl">
    <p class="text-sm text-slate-300">${label}</p>
    <p class="mt-2 text-4xl font-bold text-white" ${valueAttribute}>${value}</p>
    <p class="mt-2 text-xs text-slate-400">${helper}</p>
  </section>`;
}

export function revisionRequestedCard({ value }) {
  return kpiCard({
    label: "Revision Requested",
    value,
    tone: "atRisk",
    helper: "Documents needing revision",
  });
}
