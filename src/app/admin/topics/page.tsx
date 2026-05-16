import Link from "next/link";
import { TOPICS, CATEGORIES } from "@/lib/data";
import { accentClasses, getCategory } from "@/lib/helpers";

export default function AdminTopicsPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-[0.7rem] font-medium uppercase tracking-wider text-zinc-500">
            Content library
          </div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">主題列表</h1>
          <p className="mt-1 text-sm text-zinc-500">
            目前共 {TOPICS.length} 個已發佈主題。可依分類篩選或開啟新主題。
          </p>
        </div>
        <Link
          href="/admin/topics/new"
          className="rounded-md bg-zinc-900 px-3.5 py-2 text-sm font-medium text-white hover:bg-zinc-800"
        >
          + 建立新主題
        </Link>
      </header>

      <div className="flex flex-wrap gap-1.5">
        <FilterChip active>全部</FilterChip>
        {CATEGORIES.map((c) => (
          <FilterChip key={c.slug}>{c.name}</FilterChip>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 text-left text-[0.7rem] uppercase tracking-wider text-zinc-500">
            <tr>
              <th className="px-4 py-2.5 font-medium">標題</th>
              <th className="hidden px-4 py-2.5 font-medium sm:table-cell">分類</th>
              <th className="hidden px-4 py-2.5 font-medium md:table-cell">關鍵字</th>
              <th className="px-4 py-2.5 font-medium">狀態</th>
              <th className="px-4 py-2.5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {TOPICS.map((t) => {
              const c = getCategory(t.categorySlug);
              const a = accentClasses(c?.accent ?? "slate");
              return (
                <tr key={t.slug} className="hover:bg-zinc-50/60">
                  <td className="px-4 py-3">
                    <Link
                      href={`/topics/${t.slug}`}
                      className="font-medium text-zinc-900 hover:underline"
                    >
                      {t.title}
                    </Link>
                    <div className="mt-0.5 truncate text-xs text-zinc-500">
                      {t.summary}
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    {c && (
                      <span
                        className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[0.7rem] ${a.badge}`}
                      >
                        <span>{c.iconEmoji}</span>
                        {c.name}
                      </span>
                    )}
                  </td>
                  <td className="hidden px-4 py-3 md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {t.symptomKeywords.slice(0, 2).map((k) => (
                        <span
                          key={k}
                          className="rounded bg-zinc-100 px-1.5 py-0.5 text-[0.65rem] text-zinc-600"
                        >
                          {k}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2 py-0.5 text-[0.7rem] font-medium text-emerald-700 ring-1 ring-emerald-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      已發佈
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/topics/${t.slug}`}
                      className="text-xs text-zinc-600 hover:text-zinc-900"
                    >
                      預覽 →
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FilterChip({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs ${
        active
          ? "border-zinc-900 bg-zinc-900 text-white"
          : "border-zinc-200 bg-white text-zinc-600"
      }`}
    >
      {children}
    </span>
  );
}
