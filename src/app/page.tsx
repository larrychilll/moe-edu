import Link from "next/link";
import { CATEGORIES, GRADE_BANDS, TOPICS } from "@/lib/data";
import { getTopicsByCategory } from "@/lib/helpers";
import { CategoryCard } from "@/components/CategoryCard";
import { TopicCard } from "@/components/TopicCard";

export default function HomePage() {
  const popularTopics = [
    "ip-conflict-printer",
    "ap-overload",
    "wifi-weak-signal",
    "broadcast-storm",
    "printer-offline",
    "find-ip-device",
  ]
    .map((s) => TOPICS.find((t) => t.slug === s))
    .filter(Boolean);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-200 bg-white">
        <div className="absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_top,rgba(125,211,252,0.18),transparent_55%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-[11px] font-medium text-zinc-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Gentrice 校園網路素養平台 · Phase 0.1
            </div>
            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
              校園網路問題，
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-sky-600 to-violet-600 bg-clip-text text-transparent">
                看得懂才好處理
              </span>
              。
            </h1>
            <p className="mt-4 text-base leading-7 text-zinc-600 sm:text-lg">
              把複雜的校園網路問題 — IP 衝突、AP 過載、廣播風暴、線材老化 — 變成老師、學生、行政人員都看得懂的小知識。
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/categories"
                className="rounded-md bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-zinc-800"
              >
                瀏覽問題分類
              </Link>
              <Link
                href="/learn/teacher"
                className="rounded-md border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
              >
                我是老師
              </Link>
              <Link
                href="/qr/rm-201"
                className="rounded-md border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
              >
                掃 QR 範例
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick role entry */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-6">
          {GRADE_BANDS.map((g) => (
            <Link
              key={g.slug}
              href={`/learn/${g.slug}`}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-3 text-center text-sm font-medium text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50"
            >
              <div className="text-[13px]">{g.name}</div>
              <div className="mt-0.5 text-[11px] text-zinc-500">{g.tagline}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">問題分類</h2>
            <p className="mt-1 text-sm text-zinc-500">先從你看到的症狀開始找。</p>
          </div>
          <Link href="/categories" className="text-sm text-zinc-600 hover:text-zinc-900">
            全部 →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => (
            <CategoryCard
              key={c.slug}
              category={c}
              topicCount={getTopicsByCategory(c.slug).length}
            />
          ))}
        </div>
      </section>

      {/* Popular */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-5">
          <h2 className="text-xl font-semibold tracking-tight">熱門主題</h2>
          <p className="mt-1 text-sm text-zinc-500">老師最常遇到的網路問題。</p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {popularTopics.map(
            (t) => t && <TopicCard key={t.slug} topic={t} showCategory />
          )}
        </div>
      </section>
    </div>
  );
}
