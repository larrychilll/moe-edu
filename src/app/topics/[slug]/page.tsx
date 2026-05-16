import Link from "next/link";
import { notFound } from "next/navigation";
import { TOPICS } from "@/lib/data";
import type { CategorySlug } from "@/lib/data";
import {
  accentClasses,
  getCategory,
  getRelatedTopics,
  getTopic,
} from "@/lib/helpers";
import { TopicCard } from "@/components/TopicCard";
import { TopicHero } from "@/components/TopicHero";
import { InlineDiagram } from "@/components/InlineDiagram";

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

type DiagramPreset = {
  title: string;
  caption: string;
  nodes: { emoji: string; label: string }[];
};

const DIAGRAM_BY_CATEGORY: Record<CategorySlug, DiagramPreset> = {
  "network-unavailable": {
    title: "問題發生在這一段",
    caption: "從教室到機房之間，任何一個節點出問題，連線就會斷。",
    nodes: [
      { emoji: "💻", label: "教室電腦" },
      { emoji: "🔌", label: "教室交換器" },
      { emoji: "🏢", label: "機房核心" },
      { emoji: "🌐", label: "外部網路" },
    ],
  },
  "network-slow": {
    title: "網路速度是大家共用的",
    caption: "如果有一台設備吃掉大部分網路速度，其他人就會跟著變慢。",
    nodes: [
      { emoji: "👥", label: "多位使用者" },
      { emoji: "📡", label: "共用設備" },
      { emoji: "🚦", label: "塞車路口" },
      { emoji: "🐢", label: "其他人變慢" },
    ],
  },
  "wifi-issues": {
    title: "Wi-Fi 訊號需要傳到位",
    caption: "Wi-Fi 基地台容量、距離、干擾，加上選錯網路，都會影響連線品質。",
    nodes: [
      { emoji: "📱", label: "你的裝置" },
      { emoji: "📶", label: "Wi-Fi 訊號" },
      { emoji: "🛰️", label: "Wi-Fi 基地台" },
      { emoji: "🏫", label: "校園網路" },
    ],
  },
  "printer-sharing": {
    title: "列印要經過好幾關",
    caption: "電腦把工作送到印表機，途中任何一段有問題都會卡住。",
    nodes: [
      { emoji: "💻", label: "電腦送印" },
      { emoji: "📨", label: "排隊清單" },
      { emoji: "🌐", label: "網路傳輸" },
      { emoji: "🖨️", label: "印表機" },
    ],
  },
  "security-traffic": {
    title: "資安事件常從一點開始",
    caption: "一台被感染的電腦會引發整段網路的異常與風險。",
    nodes: [
      { emoji: "💻", label: "受感染裝置" },
      { emoji: "⚠️", label: "異常流量" },
      { emoji: "🛡️", label: "偵測警示" },
      { emoji: "🔒", label: "隔離處理" },
    ],
  },
  "device-location": {
    title: "從位址找回實體位置",
    caption: "從網路位址、設備編號、機房線路一層層追蹤，才找得到實際在哪間教室。",
    nodes: [
      { emoji: "🔢", label: "網路位址" },
      { emoji: "🏷️", label: "設備編號" },
      { emoji: "🔌", label: "機房線路" },
      { emoji: "📍", label: "實際教室" },
    ],
  },
};

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
  const diagram = DIAGRAM_BY_CATEGORY[topic.categorySlug];

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
          className={`mt-4 inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[0.7rem] font-medium ${a.badge}`}
        >
          <span>{category.iconEmoji}</span>
          {category.name}
        </span>
      )}
      <h1 className="mt-3 text-3xl font-semibold tracking-tight leading-snug sm:text-4xl">
        {topic.title}
      </h1>
      <p className="mt-3 text-lg leading-8 text-zinc-700">{topic.summary}</p>

      {/* Visual break 1: hero illustration */}
      {category && (
        <TopicHero
          emoji={category.iconEmoji}
          accent={category.accent}
          caption={topic.scenario}
        />
      )}

      {/* Scenario */}
      <section className={`mt-6 rounded-xl border border-zinc-200 ${a.soft} p-5`}>
        <div className={`flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-wider ${a.text}`}>
          <span aria-hidden>🎬</span>
          教室情境
        </div>
        <p className="prose-body mt-2 text-base leading-8 text-zinc-700">
          {topic.scenario}
        </p>
      </section>

      {/* Why */}
      <SectionBlock title="為什麼會這樣？" emoji="💡">
        <p>{topic.whyItHappens}</p>
      </SectionBlock>

      {/* Visual break 2: inline diagram */}
      <InlineDiagram
        title={diagram.title}
        caption={diagram.caption}
        nodes={diagram.nodes}
      />

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SectionBlock title="你可能會看到" emoji="👀">
          <ul className="prose-body list-disc space-y-1 pl-5 text-base text-zinc-700">
            {topic.commonSymptoms.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </SectionBlock>
        <SectionBlock title="可以先安全檢查" emoji="✅">
          <ul className="prose-body list-disc space-y-1 pl-5 text-base text-zinc-700">
            {topic.safeFirstChecks.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </SectionBlock>
      </div>

      <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50/70 p-5">
        <div className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-wider text-rose-700">
          <span aria-hidden>⛔</span>
          請不要這樣做
        </div>
        <ul className="prose-body mt-2 list-disc space-y-1 pl-5 text-base text-rose-900">
          {topic.doNotDo.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/60 p-5">
        <div className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-wider text-amber-800">
          <span aria-hidden>📣</span>
          什麼時候需要通報？
        </div>
        <p className="prose-body mt-2 text-base leading-8 text-amber-950">
          {topic.whenToEscalate}
        </p>
      </div>

      {/* Technical detail */}
      <section className="mt-6 rounded-2xl border border-zinc-300 bg-zinc-900 p-5 text-zinc-100">
        <div className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-wider text-zinc-400">
          <span aria-hidden>🛠️</span>
          技術細節
        </div>
        <p className="prose-body mt-2 text-sm leading-7 text-zinc-200">
          {topic.technicalNote}
        </p>
      </section>

      {/* Keywords */}
      <div className="mt-6 flex flex-wrap gap-1.5">
        {topic.symptomKeywords.map((k) => (
          <span
            key={k}
            className="rounded-md bg-white px-2 py-1 text-xs text-zinc-600 ring-1 ring-zinc-200"
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

function SectionBlock({
  title,
  emoji,
  children,
}: {
  title: string;
  emoji?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-4 rounded-xl border border-zinc-200 bg-white p-5">
      <div className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-wider text-zinc-500">
        {emoji && <span aria-hidden>{emoji}</span>}
        {title}
      </div>
      <div className="prose-body mt-2 text-base leading-8 text-zinc-700">
        {children}
      </div>
    </section>
  );
}
