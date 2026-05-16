import Link from "next/link";
import { accentClasses } from "@/lib/helpers";
import type { Category } from "@/lib/data";

export function CategoryCard({ category, topicCount }: { category: Category; topicCount: number }) {
  const a = accentClasses(category.accent);
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-sm"
    >
      <span className={`absolute left-0 top-0 h-full w-1 rounded-l-xl ${a.bar}`} />
      <div className="flex items-start justify-between">
        <span className={`grid h-10 w-10 place-items-center rounded-lg text-xl ${a.soft}`}>
          {category.iconEmoji}
        </span>
        <span className="text-[0.7rem] text-zinc-500">{topicCount} 個主題</span>
      </div>
      <div>
        <div className="text-base font-semibold tracking-tight">{category.name}</div>
        <div className={`mt-0.5 text-xs ${a.text}`}>{category.tagline}</div>
      </div>
      <p className="text-sm leading-6 text-zinc-600">{category.description}</p>
      <div className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-zinc-700 group-hover:text-zinc-900">
        瀏覽主題 <span aria-hidden>→</span>
      </div>
    </Link>
  );
}
