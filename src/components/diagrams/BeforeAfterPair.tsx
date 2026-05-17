type Side = {
  label: string;
  emoji: string;
  note: string;
};

type Props = {
  title: string;
  before: Side;
  after: Side;
  caption?: string;
};

export function BeforeAfterPair({ title, before, after, caption }: Props) {
  return (
    <figure
      role="img"
      aria-label={`${title}：${before.label} ${before.note}；${after.label} ${after.note}`}
      className="mt-6 overflow-hidden rounded-xl border border-zinc-200 bg-white"
    >
      <div className="border-b border-zinc-100 px-4 py-2">
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          狀態對照
        </div>
        <div className="mt-0.5 text-base font-medium text-zinc-800">{title}</div>
      </div>
      <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <Card side={before} accent="rose" />
        <span
          aria-hidden
          className="grid h-8 w-8 place-self-center place-items-center rounded-full bg-zinc-900 text-base text-white sm:h-10 sm:w-10"
        >
          →
        </span>
        <Card side={after} accent="emerald" />
      </div>
      {caption && (
        <figcaption className="border-t border-zinc-100 bg-zinc-50/60 px-4 py-2 text-sm text-zinc-600">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function Card({ side, accent }: { side: Side; accent: "rose" | "emerald" }) {
  const tone =
    accent === "rose"
      ? "bg-rose-50 ring-rose-200 text-rose-900"
      : "bg-emerald-50 ring-emerald-200 text-emerald-900";
  const label =
    accent === "rose" ? "問題狀態" : "改善後";
  return (
    <div className={`rounded-lg p-4 ring-1 ${tone}`}>
      <div className="text-xs font-semibold uppercase tracking-wider opacity-80">
        {label}
      </div>
      <div className="mt-2 flex items-start gap-3">
        <span aria-hidden className="text-4xl">{side.emoji}</span>
        <div className="min-w-0">
          <div className="text-base font-semibold">{side.label}</div>
          <p className="mt-1 text-sm leading-6 opacity-90">{side.note}</p>
        </div>
      </div>
    </div>
  );
}
