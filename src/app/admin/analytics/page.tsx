import { CATEGORIES, QR_LANDINGS, TOPICS } from "@/lib/data";

const SEARCH_TERMS = [
  { term: "印表機不能印", count: 142 },
  { term: "Wi-Fi 斷線", count: 118 },
  { term: "IP 衝突", count: 96 },
  { term: "網路很慢", count: 82 },
  { term: "電腦上不了網", count: 71 },
  { term: "印表機離線", count: 64 },
];

const QR_SCANS = [
  { id: "rm-201", scans: 286 },
  { id: "printer-2f", scans: 211 },
  { id: "wifi-library", scans: 158 },
  { id: "it-office", scans: 94 },
  { id: "office-admin", scans: 72 },
];

export default function AnalyticsPage() {
  const totalScans = QR_SCANS.reduce((s, q) => s + q.scans, 0);
  const totalSearches = SEARCH_TERMS.reduce((s, q) => s + q.count, 0);

  return (
    <div className="space-y-8">
      <header>
        <div className="text-[0.7rem] font-medium uppercase tracking-wider text-zinc-500">
          Analytics
        </div>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">使用分析</h1>
      </header>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="主題總數" value={TOPICS.length} />
        <Stat label="分類數" value={CATEGORIES.length} />
        <Stat label="QR 入口" value={QR_LANDINGS.length} />
        <Stat label="月搜尋次數" value={totalSearches} />
      </section>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <div className="mb-3 flex items-end justify-between">
            <h2 className="text-sm font-semibold tracking-tight">熱門搜尋詞</h2>
            <span className="text-[0.7rem] text-zinc-500">過去 30 天</span>
          </div>
          <ul className="space-y-2 text-sm">
            {SEARCH_TERMS.map((s) => {
              const max = Math.max(...SEARCH_TERMS.map((x) => x.count));
              return (
                <li key={s.term}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-zinc-700">{s.term}</span>
                    <span className="tabular-nums text-zinc-500">{s.count}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
                    <div
                      className="h-full bg-sky-500"
                      style={{ width: `${(s.count / max) * 100}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <div className="mb-3 flex items-end justify-between">
            <h2 className="text-sm font-semibold tracking-tight">QR 入口掃描</h2>
            <span className="text-[0.7rem] tabular-nums text-zinc-500">
              共 {totalScans} 次
            </span>
          </div>
          <ul className="space-y-2 text-sm">
            {QR_SCANS.map((q) => {
              const landing = QR_LANDINGS.find((l) => l.id === q.id);
              const max = Math.max(...QR_SCANS.map((x) => x.scans));
              return (
                <li key={q.id}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-zinc-700">
                      {landing?.locationName ?? q.id}
                    </span>
                    <span className="tabular-nums text-zinc-500">{q.scans}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
                    <div
                      className="h-full bg-violet-500"
                      style={{ width: `${(q.scans / max) * 100}%` }}
                    />
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
      <div className="text-[0.7rem] font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </div>
      <div className="mt-1 text-2xl font-semibold tabular-nums tracking-tight">
        {value.toLocaleString()}
      </div>
    </div>
  );
}
