import Link from "next/link";
import { GenerateDraftForm } from "@/components/admin/GenerateDraftForm";

export default function NewTopicPage() {
  return (
    <div className="space-y-6">
      <header>
        <Link
          href="/admin/topics"
          className="text-xs text-zinc-500 hover:text-zinc-900"
        >
          ← 主題列表
        </Link>
        <div className="mt-2 text-[11px] font-medium uppercase tracking-wider text-zinc-500">
          New topic
        </div>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">建立新主題</h1>
        <p className="mt-1 text-sm text-zinc-500">
          貼上技術說明 → 一鍵產生草稿 → 人工審核 → 發佈到公開站台。
        </p>
      </header>

      <ol className="grid grid-cols-1 gap-2 text-[12px] text-zinc-600 sm:grid-cols-4">
        <StepItem n={1} label="輸入技術說明" />
        <StepItem n={2} label="一鍵產生草稿" />
        <StepItem n={3} label="人工審核 / 編輯" />
        <StepItem n={4} label="送審 → 發佈" />
      </ol>

      <GenerateDraftForm />
    </div>
  );
}

function StepItem({ n, label }: { n: number; label: string }) {
  return (
    <li className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2">
      <span className="grid h-5 w-5 place-items-center rounded-full bg-zinc-900 text-[10px] font-medium text-white">
        {n}
      </span>
      {label}
    </li>
  );
}
