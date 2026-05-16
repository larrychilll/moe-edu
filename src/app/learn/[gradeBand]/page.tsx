import Link from "next/link";
import { notFound } from "next/navigation";
import { GRADE_BANDS, TOPICS } from "@/lib/data";
import { getGradeBand } from "@/lib/helpers";
import { TopicCard } from "@/components/TopicCard";

export async function generateStaticParams() {
  return GRADE_BANDS.map((g) => ({ gradeBand: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ gradeBand: string }>;
}) {
  const { gradeBand } = await params;
  const g = getGradeBand(gradeBand);
  return { title: g ? `${g.name} · 分眾學習 | 校園網路小學堂` : "校園網路小學堂" };
}

export default async function LearnPage({
  params,
}: {
  params: Promise<{ gradeBand: string }>;
}) {
  const { gradeBand } = await params;
  const g = getGradeBand(gradeBand);
  if (!g) notFound();

  const topics = TOPICS.filter((t) =>
    t.audienceVersions.some((v) => v.audience === g.audienceKey)
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
        <Link href="/" className="hover:text-zinc-900">
          首頁
        </Link>
        <span>·</span>
        <span>分眾學習</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 border-b border-zinc-200 pb-3">
        {GRADE_BANDS.map((gb) => {
          const active = gb.slug === g.slug;
          return (
            <Link
              key={gb.slug}
              href={`/learn/${gb.slug}`}
              className={`rounded-md px-3 py-1.5 text-[13px] font-medium ${
                active
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
              }`}
            >
              {gb.name}
            </Link>
          );
        })}
      </div>

      <header className="mt-6">
        <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
          Learning track
        </div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">{g.name}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">{g.tagline}</p>
      </header>

      <section className="mt-8">
        <h2 className="mb-4 text-lg font-semibold tracking-tight">
          適合 {g.name} 的主題
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((t) => (
            <TopicCard key={t.slug} topic={t} showCategory />
          ))}
        </div>
      </section>
    </div>
  );
}
