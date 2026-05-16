import Link from "next/link";
import { notFound } from "next/navigation";
import { QR_LANDINGS } from "@/lib/data";
import { getQrLanding, getTopic } from "@/lib/helpers";
import { TopicCard } from "@/components/TopicCard";

export async function generateStaticParams() {
  return QR_LANDINGS.map((q) => ({ qrId: q.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ qrId: string }>;
}) {
  const { qrId } = await params;
  const q = getQrLanding(qrId);
  return {
    title: q ? `${q.locationName} · QR 入口 | 校園網路小學堂` : "校園網路小學堂",
  };
}

const TYPE_LABEL: Record<string, string> = {
  classroom: "教室",
  office: "辦公室",
  printer: "印表機區",
  wifi: "Wi-Fi 區",
  admin: "行政區",
};

export default async function QrLandingPage({
  params,
}: {
  params: Promise<{ qrId: string }>;
}) {
  const { qrId } = await params;
  const q = getQrLanding(qrId);
  if (!q) notFound();
  const topics = q.topicSlugs.map(getTopic).filter(Boolean);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:py-10">
      <div className="rounded-xl border border-zinc-200 bg-white p-5">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-to-br from-sky-100 to-violet-100 text-xl">
            📍
          </span>
          <div>
            <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
              {TYPE_LABEL[q.locationType] ?? "現場"} · QR 入口
            </div>
            <h1 className="mt-0.5 text-xl font-semibold tracking-tight">
              {q.locationName}
            </h1>
          </div>
        </div>

        <div className="mt-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            這個地點常見狀況
          </div>
          <ul className="mt-2 space-y-1.5 text-[15px] leading-7 text-zinc-700">
            {q.commonIssues.map((c) => (
              <li key={c} className="flex gap-2">
                <span className="mt-2 h-1 w-1 flex-none rounded-full bg-zinc-400" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 rounded-lg bg-amber-50/80 p-4 text-sm leading-6 text-amber-900 ring-1 ring-amber-200">
          <strong className="font-semibold">如果簡單檢查仍無法解決：</strong>
          <span className="ml-1">{q.reportNote}</span>
        </div>
      </div>

      <section className="mt-6">
        <h2 className="mb-3 text-base font-semibold tracking-tight">
          推薦學習卡片
        </h2>
        <div className="grid grid-cols-1 gap-3">
          {topics.map(
            (t) => t && <TopicCard key={t.slug} topic={t} showCategory />
          )}
        </div>
      </section>

      <div className="mt-6 text-center text-xs text-zinc-500">
        <Link href="/" className="hover:text-zinc-900">
          回到首頁 →
        </Link>
      </div>
    </div>
  );
}
