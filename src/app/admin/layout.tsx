import Link from "next/link";

export const metadata = {
  title: "管理後台 | 校園網路小學堂",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6">
      <aside className="hidden w-52 shrink-0 lg:block">
        <div className="sticky top-20 rounded-xl border border-zinc-200 bg-white p-3">
          <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            管理後台
          </div>
          <nav className="mt-2 flex flex-col gap-0.5 text-sm">
            <AdminNav href="/admin" label="儀表板" />
            <AdminNav href="/admin/topics" label="主題列表" />
            <AdminNav href="/admin/topics/new" label="建立新主題" />
            <AdminNav href="/admin/qr" label="QR 管理" />
            <AdminNav href="/admin/analytics" label="使用分析" />
          </nav>
          <div className="mt-4 rounded-lg bg-amber-50 p-3 text-[11px] leading-5 text-amber-800 ring-1 ring-amber-200">
            Phase 0.1 模擬。建立、生成、發佈動作僅為前端示意，尚未連接資料庫。
          </div>
          <Link
            href="/"
            className="mt-3 block rounded-md border border-zinc-200 px-3 py-1.5 text-center text-xs text-zinc-600 hover:bg-zinc-50"
          >
            ← 回公開站台
          </Link>
        </div>
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

function AdminNav({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-md px-2 py-1.5 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
    >
      {label}
    </Link>
  );
}
