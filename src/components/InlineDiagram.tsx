type Props = {
  title: string;
  caption: string;
  nodes: { emoji: string; label: string }[];
};

export function InlineDiagram({ title, caption, nodes }: Props) {
  return (
    <figure
      role="img"
      aria-label={`${title}：${caption}`}
      className="mt-6 overflow-hidden rounded-xl border border-zinc-200 bg-white"
    >
      <div className="border-b border-zinc-100 px-4 py-2">
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          情境圖解
        </div>
        <div className="mt-0.5 text-base font-medium text-zinc-800">{title}</div>
      </div>
      <div
        className="relative px-4 py-6"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(0,0,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      >
        <div className="flex items-center justify-between gap-2">
          {nodes.map((n, i) => (
            <span key={i} className="flex flex-1 items-center gap-2">
              <span className="flex flex-col items-center gap-1">
                <span
                  className="grid h-12 w-12 place-items-center rounded-lg bg-white text-2xl ring-1 ring-zinc-200"
                  aria-hidden
                >
                  {n.emoji}
                </span>
                <span className="text-center text-sm text-zinc-700">
                  {n.label}
                </span>
              </span>
              {i < nodes.length - 1 && (
                <span className="flex-1 border-t border-dashed border-zinc-300" />
              )}
            </span>
          ))}
        </div>
      </div>
      <figcaption className="border-t border-zinc-100 bg-zinc-50/60 px-4 py-2 text-sm text-zinc-600">
        {caption}
      </figcaption>
    </figure>
  );
}
