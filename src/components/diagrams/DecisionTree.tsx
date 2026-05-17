type Branch = {
  condition: string;
  outcome: string;
  tone?: "ok" | "warn" | "stop";
};

type Props = {
  question: string;
  branches: Branch[];
  caption?: string;
};

const TONE: Record<NonNullable<Branch["tone"]>, { ring: string; bg: string; tag: string; tagText: string }> = {
  ok: { ring: "ring-emerald-200", bg: "bg-emerald-50/60", tag: "bg-emerald-100", tagText: "text-emerald-700" },
  warn: { ring: "ring-amber-200", bg: "bg-amber-50/60", tag: "bg-amber-100", tagText: "text-amber-800" },
  stop: { ring: "ring-rose-200", bg: "bg-rose-50/60", tag: "bg-rose-100", tagText: "text-rose-700" },
};

export function DecisionTree({ question, branches, caption }: Props) {
  return (
    <figure
      role="img"
      aria-label={`判斷樹：${question}${branches.map((b) => `；${b.condition}→${b.outcome}`).join("")}`}
      className="mt-6 overflow-hidden rounded-xl border border-zinc-200 bg-white"
    >
      <div className="border-b border-zinc-100 px-4 py-2">
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          判斷樹
        </div>
        <div className="mt-0.5 text-base font-medium text-zinc-800">{question}</div>
      </div>
      <ul className="divide-y divide-zinc-100">
        {branches.map((b, i) => {
          const t = TONE[b.tone ?? "ok"];
          return (
            <li key={i} className={`grid grid-cols-[auto_1fr] gap-3 px-4 py-3 ${t.bg}`}>
              <span
                className={`mt-0.5 inline-flex items-start rounded-md px-2 py-1 text-xs font-medium ${t.tag} ${t.tagText}`}
              >
                {b.condition}
              </span>
              <div className={`rounded-md bg-white p-3 text-base leading-7 text-zinc-800 ring-1 ${t.ring}`}>
                {b.outcome}
              </div>
            </li>
          );
        })}
      </ul>
      {caption && (
        <figcaption className="border-t border-zinc-100 bg-zinc-50/60 px-4 py-2 text-sm text-zinc-600">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
