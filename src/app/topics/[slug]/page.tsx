import Link from "next/link";
import { notFound } from "next/navigation";
import { TOPICS } from "@/lib/data";
import {
  accentClasses,
  getCategory,
  getRelatedTopics,
  getTopic,
} from "@/lib/helpers";
import { AudienceTabs } from "@/components/AudienceTabs";
import { TopicCard } from "@/components/TopicCard";

export async function generateStaticParams() {
  return TOPICS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = getTopic(slug);
  return {
    title: topic ? `${topic.title} | 校園網路小學堂` : "校園網路小學堂",
    description: topic?.summary,
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();
  const category = getCategory(topic.categorySlug);
  const a = accentClasses(category?.accent ?? "slate");
  const related = getRelatedTopics(topic);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="text-sm text-zinc-500">
        <Link href="/" className="hover:text-zinc-900">
          首頁
        </Link>{" "}
        ·{" "}
        {category && (
          <Link
            href={`/categories/${category.slug}`}
            className="hover:text-zinc-900"
          >
            {category.name}
          </Link>
        )}
      </div>

      {category && (
        <span
          className={`mt-4 inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-medium ${a.badge}`}
        >
          <span>{category.iconEmoji}</span>
          {category.name}
        </span>
      )}
      <h1 className="mt-3 text-3xl font-semibold tracking-tight leading-snug">
        {topic.title}
      </h1>
      <p className="mt-3 text-base leading-7 text-zinc-600">{topic.summary}</p>

      {/* Scenario */}
      <section className={`mt-7 rounded-xl border border-zinc-200 ${a.soft} p-5`}>
        <div className={`text-[11px] font-semibold uppercase tracking-wider ${a.text}`}>
          教室情境
        </div>
        <p className="prose-body mt-2 text-[15px] leading-8 text-zinc-700">
          {topic.scenario}
        </p>
      </section>

      {/* Why */}
      <SectionBlock title="為什麼會這樣？">
        <p>{topic.whyItHappens}</p>
      </SectionBlock>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <SectionBlock title="你可能會看到">
          <ul className="prose-body list-disc space-y-1 pl-5 text-[15px] text-zinc-700">
            {topic.commonSymptoms.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </SectionBlock>
        <SectionBlock title="可以先安全檢查">
          <ul className="prose-body list-disc space-y-1 pl-5 text-[15px] text-zinc-700">
            {topic.safeFirstChecks.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </SectionBlock>
      </div>

      <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50/70 p-5">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-rose-700">
          請不要這樣做
        </div>
        <ul className="prose-body mt-2 list-disc space-y-1 pl-5 text-[15px] text-rose-900">
          {topic.doNotDo.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>

      <SectionBlock title="什麼時候需要通報？">
        <p>{topic.whenToEscalate}</p>
      </SectionBlock>

      {/* Audience versions */}
      <section className="mt-10 rounded-xl border border-zinc-200 bg-white p-5">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
          分眾版本
        </div>
        <h2 className="mt-1 text-lg font-semibold tracking-tight">
          選擇你的身分，看適合你的說明
        </h2>
        <div className="mt-4">
          <AudienceTabs versions={topic.audienceVersions} />
        </div>
      </section>

      {/* IT technical note */}
      <section className="mt-6 rounded-xl border border-zinc-300 bg-zinc-900 p-5 text-zinc-100">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
          資訊組備註 · Technical note
        </div>
        <p className="prose-body mt-2 text-[14px] leading-7 text-zinc-200">
          {topic.technicalNote}
        </p>
      </section>

      {/* Keywords */}
      <div className="mt-6 flex flex-wrap gap-1.5">
        {topic.symptomKeywords.map((k) => (
          <span
            key={k}
            className="rounded-md bg-white px-2 py-1 text-[12px] text-zinc-600 ring-1 ring-zinc-200"
          >
            #{k}
          </span>
        ))}
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-lg font-semibold tracking-tight">相關主題</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((t) => (
              <TopicCard key={t.slug} topic={t} showCategory />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function SectionBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 rounded-xl border border-zinc-200 bg-white p-5">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
        {title}
      </div>
      <div className="prose-body mt-2 text-[15px] leading-8 text-zinc-700">
        {children}
      </div>
    </section>
  );
}
