import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24">
      <div className="text-[0.7rem] font-semibold uppercase tracking-wider text-zinc-500">
        404
      </div>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">
        找不到這個頁面
      </h1>
      <p className="mt-2 text-sm leading-6 text-zinc-600">
        這個主題或分類目前不存在。請從首頁開始瀏覽。
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
      >
        回首頁
      </Link>
    </div>
  );
}
