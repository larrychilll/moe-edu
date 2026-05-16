import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/lib/data";
import { accentClasses, getCategory, getTopicsByCategory } from "@/lib/helpers";
import { TopicCard } from "@/components/TopicCard";

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCategory(slug);
  return {
    title: c ? `${c.name} | 校園網路小學堂` : "校園網路小學堂",
  };
}

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const topics = getTopicsByCategory(category.slug);
  const a = accentClasses(category.accent);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link href="/categories" className="text-sm text-zinc-500 hover:text-zinc-900">
        ← 所有分類
      </Link>
      <header className={`mt-4 rounded-xl border border-zinc-200 ${a.soft} p-6`}>
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-lg bg-white text-2xl">
            {category.iconEmoji}
          </span>
          <div>
            <div className={`text-xs font-medium ${a.text}`}>{category.tagline}</div>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">
              {category.name}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
              {category.description}
            </p>
          </div>
        </div>
      </header>

      <section className="mt-8">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-lg font-semibold tracking-tight">本分類主題</h2>
          <span className="text-xs text-zinc-500">{topics.length} 個主題</span>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((t) => (
            <TopicCard key={t.slug} topic={t} />
          ))}
        </div>
      </section>
    </div>
  );
}
