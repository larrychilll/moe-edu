import Link from "next/link";
import { QR_LANDINGS } from "@/lib/data";

const TYPE_LABEL: Record<string, string> = {
  classroom: "教室",
  office: "辦公室",
  printer: "印表機區",
  wifi: "Wi-Fi 區",
  admin: "行政區",
};

export default function AdminQrPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-[0.7rem] font-medium uppercase tracking-wider text-zinc-500">
            QR Manager
          </div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">QR 管理</h1>
          <p className="mt-1 text-sm text-zinc-500">
            為教室、辦公室、印表機區、Wi-Fi 區建立 QR 入口，連結對應的學習卡片。
          </p>
        </div>
        <button
          type="button"
          className="rounded-md bg-zinc-900 px-3.5 py-2 text-sm font-medium text-white hover:bg-zinc-800"
        >
          + 新增 QR 入口
        </button>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {QR_LANDINGS.map((q) => (
          <div
            key={q.id}
            className="rounded-xl border border-zinc-200 bg-white p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[0.7rem] font-medium uppercase tracking-wider text-zinc-500">
                  {TYPE_LABEL[q.locationType] ?? q.locationType}
                </div>
                <div className="mt-1 text-base font-semibold tracking-tight">
                  {q.locationName}
                </div>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-md border border-zinc-200 bg-[conic-gradient(at_top_left,#27272a_25%,#fff_25%_50%,#27272a_50%_75%,#fff_75%)] [background-size:6px_6px]" />
            </div>
            <div className="mt-3 text-xs text-zinc-500">連結主題</div>
            <ul className="mt-1 space-y-0.5 text-sm">
              {q.topicSlugs.map((s) => (
                <li key={s} className="truncate text-zinc-700">
                  · {s}
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center justify-between text-xs">
              <Link
                href={`/qr/${q.id}`}
                className="text-zinc-700 hover:text-zinc-900"
              >
                預覽公開頁 →
              </Link>
              <button
                type="button"
                className="rounded-md border border-zinc-200 bg-white px-2 py-1 text-[0.7rem] text-zinc-600 hover:bg-zinc-50"
              >
                列印海報
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
