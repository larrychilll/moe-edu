type Props = {
  interfaceName: string;
  description?: string;
  aspect?: "16/9" | "4/3" | "1/1";
};

const ASPECT: Record<NonNullable<Props["aspect"]>, string> = {
  "16/9": "aspect-[16/9]",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
};

export function ScreenshotBlock({ interfaceName, description, aspect = "16/9" }: Props) {
  return (
    <figure
      role="img"
      aria-label={`截圖示意：${interfaceName}`}
      className="mt-6 overflow-hidden rounded-xl border border-zinc-200 bg-white"
    >
      <div className="border-b border-zinc-100 px-4 py-2">
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          畫面示意
        </div>
        <div className="mt-0.5 text-base font-medium text-zinc-800">{interfaceName}</div>
      </div>
      <div
        className={`relative ${ASPECT[aspect]} w-full bg-zinc-100`}
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(0,0,0,0.05) 25%, transparent 25%, transparent 50%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.05) 75%, transparent 75%, transparent)",
          backgroundSize: "16px 16px",
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-zinc-500">
          <span aria-hidden className="text-3xl opacity-70">🖥️</span>
          <div className="text-sm font-medium">截圖示意 · {interfaceName}</div>
          <div className="text-xs">日後可換成真實畫面</div>
        </div>
      </div>
      {description && (
        <figcaption className="border-t border-zinc-100 bg-zinc-50/60 px-4 py-2 text-sm text-zinc-600">
          {description}
        </figcaption>
      )}
    </figure>
  );
}
