import Link from "next/link";
import { CATEGORIES, QR_LANDINGS, TOPICS } from "@/lib/data";
import { getTopicsByCategory } from "@/lib/helpers";

export default function AdminDashboardPage() {
  const published = TOPICS.length;
  const draftMock = 4;
  const pendingReviewMock = 2;
  const mostViewed = [
    { slug: "ip-conflict-printer", views: 1820 },
    { slug: "wifi-weak-signal", views: 1240 },
    { slug: "ap-overload", views: 1102 },
    { slug: "printer-offline", views: 904 },
    { slug: "broadcast-storm", views: 712 },
  ]
    .map((m) => ({
      topic: TOPICS.find((t) => t.slug === m.slug),
      views: m.views,
    }))
    .filter((m) => m.topic);

  return (
    <div className="space-y-8">
      <header>
        <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
          Dashboard
        </div>
        <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">儀表板</h1>
          <Link
            href="/admin/topics/new"
            className="rounded-md bg-zinc-900 px-3.5 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          >
            + 建立新主題
          </Link>
        </div>
        <p className="mt-1 text-sm text-zinc-500">
          Phase 0.1 模擬資料。實際數字將於串接資料庫後顯示。
        </p>
      </header>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="已發佈" value={published} />
        <Stat label="草稿" value={draftMock} />
        <Stat label="待審核" value={pendingReviewMock} />
        <Stat label="QR 入口" value={QR_LANDINGS.length} />
      </section>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-zinc-200 bg-white p-5">
          <div className="mb-3 flex items-end justify-between">
            <h2 className="text-sm font-semibold tracking-tight">瀏覽量最高主題</h2>
            <span className="text-[11px] text-zinc-500">過去 30 天（模擬）</span>
          </div>
          <ul className="divide-y divide-zinc-100 text-sm">
            {mostViewed.map(
              ({ topic, views }) =>
                topic && (
                  <li key={topic.slug} className="flex items-center justify-between py-2.5">
                    <Link
                      href={`/topics/${topic.slug}`}
                      className="truncate pr-4 text-zinc-800 hover:text-zinc-900"
                    >
                      {topic.title}
                    </Link>
                    <span className="text-xs tabular-nums text-zinc-500">
                      {views.toLocaleString()} views
                    </span>
                  </li>
                )
            )}
          </ul>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <h2 className="mb-3 text-sm font-semibold tracking-tight">各分類內容數</h2>
          <ul className="space-y-2 text-sm">
            {CATEGORIES.map((c) => {
              const n = getTopicsByCategory(c.slug).length;
              const pct = Math.round((n / TOPICS.length) * 100);
              return (
                <li key={c.slug}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-700">
                      {c.iconEmoji} {c.name}
                    </span>
                    <span className="tabular-nums text-zinc-500">{n}</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
                    <div className="h-full bg-zinc-700" style={{ width: `${pct}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4">
      <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </div>
      <div className="mt-1 text-2xl font-semibold tabular-nums tracking-tight">
        {value}
      </div>
    </div>
  );
}
