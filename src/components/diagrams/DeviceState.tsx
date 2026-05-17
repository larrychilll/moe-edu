type Indicator = {
  label: string;
  status: "on" | "off" | "warn";
};

type Props = {
  title: string;
  device: { emoji: string; name: string };
  state: "ok" | "warning" | "error";
  indicators: Indicator[];
  caption?: string;
};

const STATE_LABEL: Record<Props["state"], string> = {
  ok: "運作正常",
  warning: "需要注意",
  error: "離線 / 故障",
};

const STATE_RING: Record<Props["state"], string> = {
  ok: "ring-emerald-200 bg-emerald-50",
  warning: "ring-amber-200 bg-amber-50",
  error: "ring-rose-200 bg-rose-50",
};

const STATE_DOT: Record<Props["state"], string> = {
  ok: "bg-emerald-500",
  warning: "bg-amber-500",
  error: "bg-rose-500",
};

const IND_TONE: Record<Indicator["status"], { dot: string; label: string }> = {
  on: { dot: "bg-emerald-500", label: "text-zinc-800" },
  off: { dot: "bg-zinc-300", label: "text-zinc-500" },
  warn: { dot: "bg-rose-500 animate-pulse", label: "text-rose-700" },
};

export function DeviceState({ title, device, state, indicators, caption }: Props) {
  return (
    <figure
      role="img"
      aria-label={`設備狀態：${device.name} ${STATE_LABEL[state]}`}
      className="mt-6 overflow-hidden rounded-xl border border-zinc-200 bg-white"
    >
      <div className="border-b border-zinc-100 px-4 py-2">
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          設備狀態
        </div>
        <div className="mt-0.5 text-base font-medium text-zinc-800">{title}</div>
      </div>
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-[auto_1fr] sm:items-center">
        <div className={`flex flex-col items-center justify-center rounded-xl p-5 ring-1 ${STATE_RING[state]}`}>
          <span aria-hidden className="text-5xl">{device.emoji}</span>
          <div className="mt-2 text-sm font-semibold text-zinc-800">{device.name}</div>
          <div className="mt-1 inline-flex items-center gap-1.5 text-xs text-zinc-600">
            <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${STATE_DOT[state]}`} />
            {STATE_LABEL[state]}
          </div>
        </div>
        <ul className="space-y-2">
          {indicators.map((ind, i) => {
            const t = IND_TONE[ind.status];
            return (
              <li key={i} className="flex items-center gap-2 text-base">
                <span aria-hidden className={`h-2 w-2 flex-none rounded-full ${t.dot}`} />
                <span className={t.label}>{ind.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
      {caption && (
        <figcaption className="border-t border-zinc-100 bg-zinc-50/60 px-4 py-2 text-sm text-zinc-600">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
