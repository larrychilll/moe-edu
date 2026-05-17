type Node = { emoji: string; label: string; tone?: "default" | "alert" | "muted" };
type Edge = "arrow" | "dashed" | "broken";

type Props = {
  title: string;
  caption?: string;
  nodes: Node[];
  edge?: Edge;
  breakAt?: number;
};

const TONE: Record<NonNullable<Node["tone"]>, string> = {
  default: "bg-white ring-zinc-200 text-zinc-800",
  alert: "bg-rose-50 ring-rose-300 text-rose-800",
  muted: "bg-zinc-50 ring-zinc-200 text-zinc-500",
};

export function PathDiagram({ title, caption, nodes, edge = "arrow", breakAt }: Props) {
  return (
    <figure
      role="img"
      aria-label={`${title}${caption ? "：" + caption : ""}`}
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
          {nodes.map((n, i) => {
            const tone = TONE[n.tone ?? "default"];
            const isBreak = breakAt !== undefined && i === breakAt - 1;
            const localEdge: Edge = isBreak ? "broken" : edge;
            return (
              <span key={i} className="flex flex-1 items-center gap-2">
                <span className="flex flex-col items-center gap-1">
                  <span
                    aria-hidden
                    className={`grid h-12 w-12 place-items-center rounded-lg text-2xl ring-1 ${tone}`}
                  >
                    {n.emoji}
                  </span>
                  <span className="text-center text-sm text-zinc-700">{n.label}</span>
                </span>
                {i < nodes.length - 1 && (
                  <span className="relative flex-1">
                    {localEdge === "arrow" && (
                      <span className="flex items-center">
                        <span className="flex-1 border-t border-zinc-300" />
                        <span aria-hidden className="ml-0.5 text-zinc-400">→</span>
                      </span>
                    )}
                    {localEdge === "dashed" && (
                      <span className="block border-t border-dashed border-zinc-300" />
                    )}
                    {localEdge === "broken" && (
                      <span className="flex items-center justify-between gap-1">
                        <span className="flex-1 border-t-2 border-rose-400" />
                        <span aria-hidden className="text-rose-500">⚡</span>
                        <span className="flex-1 border-t-2 border-rose-400" />
                      </span>
                    )}
                  </span>
                )}
              </span>
            );
          })}
        </div>
      </div>
      {caption && (
        <figcaption className="border-t border-zinc-100 bg-zinc-50/60 px-4 py-2 text-sm text-zinc-600">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
