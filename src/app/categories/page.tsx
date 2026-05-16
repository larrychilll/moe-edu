import { CATEGORIES } from "@/lib/data";
import { getTopicsByCategory } from "@/lib/helpers";
import { CategoryCard } from "@/components/CategoryCard";

export const metadata = {
  title: "問題分類 | 校園網路小學堂",
};

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <div className="text-[0.7rem] font-medium uppercase tracking-wider text-zinc-500">
          Categories
        </div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">問題分類</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
          從常見症狀開始找。每個分類底下都有給老師、學生、資訊人員的不同版本內容。
        </p>
      </header>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((c) => (
          <CategoryCard
            key={c.slug}
            category={c}
            topicCount={getTopicsByCategory(c.slug).length}
          />
        ))}
      </div>
    </div>
  );
}
