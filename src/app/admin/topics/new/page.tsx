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
        <div className="mt-2 text-[0.7rem] font-medium uppercase tracking-wider text-zinc-500">
          New topic
        </div>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">建立新主題</h1>
        <p className="mt-1 text-sm text-zinc-500">
          貼上技術說明，AI 產生草稿後可直接編輯與發佈。
        </p>
      </header>

      <ol className="grid grid-cols-1 gap-2 text-xs text-zinc-600 sm:grid-cols-3">
        <StepItem n={1} label="輸入技術說明" />
        <StepItem n={2} label="一鍵產生草稿" />
        <StepItem n={3} label="編輯後發佈" />
      </ol>

      <GenerateDraftForm />
    </div>
  );
}

function StepItem({ n, label }: { n: number; label: string }) {
  return (
    <li className="flex items-center gap-2 whitespace-nowrap rounded-lg border border-zinc-200 bg-white px-3 py-2.5">
      <span
        aria-hidden
        className="grid h-6 w-6 flex-none place-items-center rounded-full bg-zinc-900 text-xs font-semibold text-white"
      >
        {n}
      </span>
      <span className="truncate">{label}</span>
    </li>
  );
}
