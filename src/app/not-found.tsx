import Link from "next/link";
import { CATEGORIES } from "@/lib/data";
import { accentClasses } from "@/lib/helpers";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-10">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="grid h-10 w-10 place-items-center rounded-md bg-zinc-900 text-base font-semibold text-white"
          >
            校
          </span>
          <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            校園網路小學堂
          </div>
        </div>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
          找不到這個頁面
        </h1>
        <p className="mt-3 max-w-xl text-base leading-7 text-zinc-600">
          這個主題或分類目前不存在，可能是網址打錯了，或這個頁面已經被搬走。可以從下面的分類重新找看看。
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-md bg-zinc-900 px-4 py-2.5 text-base font-medium text-white hover:bg-zinc-800"
          >
            回首頁
          </Link>
          <Link
            href="/categories"
            className="rounded-md border border-zinc-200 bg-white px-4 py-2.5 text-base font-medium text-zinc-700 hover:bg-zinc-50"
          >
            瀏覽問題分類
          </Link>
        </div>

        <div className="mt-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            常見分類
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {CATEGORIES.map((c) => {
              const a = accentClasses(c.accent);
              return (
                <Link
                  key={c.slug}
                  href={`/categories/${c.slug}`}
                  className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-base text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50"
                >
                  <span aria-hidden className={`text-lg ${a.text}`}>
                    {c.iconEmoji}
                  </span>
                  <span className="truncate">{c.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
