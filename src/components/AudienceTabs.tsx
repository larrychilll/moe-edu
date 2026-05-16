"use client";

import { useState } from "react";
import { audienceLabel } from "@/lib/helpers";
import type { AudienceContent, AudienceKey } from "@/lib/data";

const ORDER: AudienceKey[] = [
  "grade_4_6",
  "grade_7_9",
  "grade_10_12",
  "teacher",
  "it_staff",
];

export function AudienceTabs({ versions }: { versions: AudienceContent[] }) {
  const sorted = ORDER.map((k) => versions.find((v) => v.audience === k)).filter(
    (v): v is AudienceContent => Boolean(v)
  );
  const [active, setActive] = useState<AudienceKey>(sorted[0]?.audience ?? "teacher");
  const current = sorted.find((v) => v.audience === active);

  return (
    <div>
      <div className="flex flex-wrap gap-1.5 border-b border-zinc-200 pb-2">
        {sorted.map((v) => {
          const isActive = v.audience === active;
          return (
            <button
              key={v.audience}
              type="button"
              onClick={() => setActive(v.audience)}
              className={`rounded-md px-3 py-1.5 text-[0.825rem] font-medium transition ${
                isActive
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
              }`}
            >
              {audienceLabel(v.audience)}
            </button>
          );
        })}
      </div>
      <div className="prose-body mt-5 whitespace-pre-line text-base leading-8 text-zinc-700">
        {current?.body}
      </div>
    </div>
  );
}
