type Device = {
  emoji: string;
  label: string;
  tone?: "default" | "alert" | "muted";
};

type Segment = {
  label: string;
  sublabel?: string;
  devices: Device[];
  tone?: "default" | "danger" | "trusted";
};

type Props = {
  title: string;
  segments: Segment[];
  caption?: string;
};

const SEGMENT_TONE: Record<NonNullable<Segment["tone"]>, string> = {
  default: "border-zinc-200 bg-zinc-50/60",
  danger: "border-rose-200 bg-rose-50/50",
  trusted: "border-emerald-200 bg-emerald-50/40",
};

const DEVICE_TONE: Record<NonNullable<Device["tone"]>, string> = {
  default: "ring-zinc-200 text-zinc-700",
  alert: "ring-rose-300 text-rose-700 bg-rose-50",
  muted: "ring-zinc-200 text-zinc-400",
};

export function NetworkSegment({ title, segments, caption }: Props) {
  return (
    <figure
      role="img"
      aria-label={`網路分區圖：${title}`}
      className="mt-6 overflow-hidden rounded-xl border border-zinc-200 bg-white"
    >
      <div className="border-b border-zinc-100 px-4 py-2">
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          網路分區
        </div>
        <div className="mt-0.5 text-base font-medium text-zinc-800">{title}</div>
      </div>
      <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2">
        {segments.map((seg, i) => (
          <div
            key={i}
            className={`rounded-lg border-2 border-dashed p-3 ${SEGMENT_TONE[seg.tone ?? "default"]}`}
          >
            <div className="flex items-baseline justify-between">
              <div className="text-sm font-semibold text-zinc-800">{seg.label}</div>
              {seg.sublabel && (
                <div className="text-xs text-zinc-500">{seg.sublabel}</div>
              )}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {seg.devices.map((d, j) => (
                <span
                  key={j}
                  className={`inline-flex items-center gap-1.5 rounded-md bg-white px-2 py-1 text-sm ring-1 ${DEVICE_TONE[d.tone ?? "default"]}`}
                >
                  <span aria-hidden>{d.emoji}</span>
                  {d.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {caption && (
        <figcaption className="border-t border-zinc-100 bg-zinc-50/60 px-4 py-2 text-sm text-zinc-600">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
