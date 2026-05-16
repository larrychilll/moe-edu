import Link from "next/link";
import { accentClasses, getCategory } from "@/lib/helpers";
import type { Topic } from "@/lib/data";

export function TopicCard({ topic, showCategory = false }: { topic: Topic; showCategory?: boolean }) {
  const category = getCategory(topic.categorySlug);
  const a = accentClasses(category?.accent ?? "slate");
  return (
    <Link
      href={`/topics/${topic.slug}`}
      className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-4 transition hover:border-zinc-300 hover:shadow-sm"
    >
      {showCategory && category && (
        <span className={`inline-flex w-fit items-center gap-1 rounded-md border px-2 py-0.5 text-[0.7rem] font-medium ${a.badge}`}>
          <span>{category.iconEmoji}</span>
          {category.name}
        </span>
      )}
      <h3 className="text-base font-semibold leading-snug tracking-tight">{topic.title}</h3>
      <p className="text-sm leading-6 text-zinc-600 line-clamp-2">{topic.summary}</p>
      <div className="mt-1 flex flex-wrap gap-1.5">
        {topic.symptomKeywords.slice(0, 3).map((k) => (
          <span
            key={k}
            className="rounded-md bg-zinc-100 px-2 py-0.5 text-[0.7rem] text-zinc-600"
          >
            {k}
          </span>
        ))}
      </div>
    </Link>
  );
}
