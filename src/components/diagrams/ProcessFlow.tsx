type Step = {
  label: string;
  detail?: string;
};

type Props = {
  title: string;
  steps: Step[];
  caption?: string;
};

export function ProcessFlow({ title, steps, caption }: Props) {
  return (
    <figure
      role="img"
      aria-label={`處理步驟：${title}`}
      className="mt-6 overflow-hidden rounded-xl border border-zinc-200 bg-white"
    >
      <div className="border-b border-zinc-100 px-4 py-2">
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          處理步驟
        </div>
        <div className="mt-0.5 text-base font-medium text-zinc-800">{title}</div>
      </div>
      <ol className="space-y-0 p-4">
        {steps.map((s, i) => (
          <li key={i} className="grid grid-cols-[auto_1fr] gap-3 pb-3 last:pb-0">
            <span className="relative flex flex-col items-center">
              <span
                aria-hidden
                className="grid h-8 w-8 flex-none place-items-center rounded-full bg-zinc-900 text-sm font-semibold text-white"
              >
                {i + 1}
              </span>
              {i < steps.length - 1 && (
                <span aria-hidden className="mt-1 w-px flex-1 bg-zinc-200" />
              )}
            </span>
            <div className="min-w-0 pb-2">
              <div className="text-base font-medium text-zinc-900">{s.label}</div>
              {s.detail && (
                <p className="mt-1 text-sm leading-6 text-zinc-600">{s.detail}</p>
              )}
            </div>
          </li>
        ))}
      </ol>
      {caption && (
        <figcaption className="border-t border-zinc-100 bg-zinc-50/60 px-4 py-2 text-sm text-zinc-600">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
