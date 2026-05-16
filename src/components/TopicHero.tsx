import { accentClasses } from "@/lib/helpers";

type Props = {
  emoji: string;
  accent: string;
  caption: string;
};

export function TopicHero({ emoji, accent, caption }: Props) {
  const a = accentClasses(accent);
  return (
    <figure
      className={`relative mt-6 overflow-hidden rounded-2xl border border-zinc-200 ${a.soft}`}
    >
      <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 22%, rgba(255,255,255,0.85), transparent 38%), radial-gradient(circle at 82% 78%, rgba(255,255,255,0.7), transparent 42%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.0) 49%, rgba(0,0,0,0.04) 50%, rgba(255,255,255,0.0) 51%, rgba(255,255,255,0.0) 100%), repeating-linear-gradient(45deg, transparent 0 14px, rgba(0,0,0,0.025) 14px 15px)",
          }}
        />
        <div className="absolute inset-0 flex flex-col items-start justify-between p-5 sm:p-7">
          <span
            className={`rounded-md bg-white/85 px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wider ring-1 ring-zinc-200 ${a.text}`}
          >
            情境插圖
          </span>
          <div className="flex w-full items-end justify-between gap-3">
            <span className="text-5xl drop-shadow-sm sm:text-6xl" aria-hidden>
              {emoji}
            </span>
            <p className="hidden max-w-md text-xs leading-5 text-zinc-700/80 sm:block">
              {caption}
            </p>
          </div>
        </div>
      </div>
    </figure>
  );
}
