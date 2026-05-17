"use client";

import { useState } from "react";
import { CATEGORIES } from "@/lib/data";
import type { CategorySlug } from "@/lib/data";

type Draft = {
  title: string;
  summary: string;
  scenario: string;
  why: string;
  symptoms: string[];
  safeChecks: string[];
  doNotDo: string[];
  escalate: string;
  technicalNote: string;
  keywords: string[];
};

const STAGES = [
  "讀取技術說明",
  "歸納症狀與情境",
  "撰寫白話說明",
  "整理關鍵字",
];

export function GenerateDraftForm() {
  const [source, setSource] = useState(
    "校內出現多台設備網路間歇性中斷，部分共用印表機顯示離線。資訊組懷疑為 IP 衝突或私接 IP 分享器造成 DHCP 衝突。"
  );
  const [category, setCategory] = useState<CategorySlug>(CATEGORIES[0].slug);
  const [stage, setStage] = useState<number>(-1);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [generating, setGenerating] = useState(false);
  const [savedAs, setSavedAs] = useState<"draft" | "published" | null>(null);

  async function handleGenerate() {
    setDraft(null);
    setSavedAs(null);
    setGenerating(true);
    for (let i = 0; i < STAGES.length; i++) {
      setStage(i);
      await new Promise((r) => setTimeout(r, 450));
    }
    setDraft(buildDraft(source));
    setGenerating(false);
    setStage(-1);
  }

  function patch<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((d) => (d ? { ...d, [key]: value } : d));
    setSavedAs(null);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-zinc-200 bg-white p-5">
        <h2 className="text-sm font-semibold tracking-tight">技術來源說明</h2>
        <p className="mt-1 text-xs text-zinc-500">
          貼上資訊組備忘、廠商回報或現場觀察。AI 會產生初版草稿，發佈前可逐段編輯。
        </p>
        <textarea
          value={source}
          onChange={(e) => setSource(e.target.value)}
          rows={4}
          className="mt-3 w-full rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm leading-6 focus:border-zinc-400 focus:bg-white focus:outline-none"
          placeholder="例：教室 201 多台電腦連線中斷，懷疑 IP 衝突..."
        />

        <div className="mt-4">
          <Field label="分類">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as CategorySlug)}
              className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus:border-zinc-400 focus:outline-none"
            >
              {CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.iconEmoji} {c.name}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={generating}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60"
          >
            <span aria-hidden>✨</span>
            {generating ? "生成中…" : "一鍵產生草稿"}
          </button>
          {stage >= 0 && (
            <span className="text-xs text-zinc-500">{STAGES[stage]}…</span>
          )}
          {draft && !generating && savedAs === null && (
            <span className="text-xs text-zinc-500">草稿已產生 · 可逐段編輯後發佈。</span>
          )}
        </div>
      </section>

      {draft && (
        <section className="rounded-xl border border-zinc-200 bg-white p-5">
          <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="text-[0.7rem] font-semibold uppercase tracking-wider text-zinc-500">
                草稿
              </div>
              <input
                type="text"
                value={draft.title}
                onChange={(e) => patch("title", e.target.value)}
                className="mt-1 w-full rounded-md border border-transparent bg-transparent text-lg font-semibold tracking-tight text-zinc-900 hover:border-zinc-200 hover:bg-zinc-50 focus:border-zinc-300 focus:bg-white focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={generating}
                className="whitespace-nowrap rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-60"
              >
                重新生成
              </button>
              <button
                type="button"
                onClick={() => setSavedAs("draft")}
                className="whitespace-nowrap rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
              >
                儲存為草稿
              </button>
              <button
                type="button"
                onClick={() => setSavedAs("published")}
                className="whitespace-nowrap rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700"
              >
                發佈上線
              </button>
            </div>
          </div>
          {savedAs && (
            <div
              className={`mb-3 rounded-md px-3 py-2 text-xs ${
                savedAs === "published"
                  ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200"
                  : "bg-zinc-50 text-zinc-700 ring-1 ring-zinc-200"
              }`}
            >
              {savedAs === "published"
                ? "已發佈 — 本主題已公開上線。日後可在主題列表中重新開啟編輯。"
                : "已儲存為草稿 — 之後可繼續編輯，準備好再發佈。"}
            </div>
          )}

          <EditableBlock
            title="摘要"
            value={draft.summary}
            onChange={(v) => patch("summary", v)}
            rows={2}
          />

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <EditableBlock
              title="教室情境"
              value={draft.scenario}
              onChange={(v) => patch("scenario", v)}
              rows={3}
            />
            <EditableBlock
              title="為什麼會這樣"
              value={draft.why}
              onChange={(v) => patch("why", v)}
              rows={3}
            />
            <EditableListBlock
              title="可能觀察到"
              items={draft.symptoms}
              onChange={(items) => patch("symptoms", items)}
            />
            <EditableListBlock
              title="安全先檢查"
              items={draft.safeChecks}
              onChange={(items) => patch("safeChecks", items)}
            />
            <EditableListBlock
              title="請不要做"
              items={draft.doNotDo}
              onChange={(items) => patch("doNotDo", items)}
            />
            <EditableBlock
              title="何時通報"
              value={draft.escalate}
              onChange={(v) => patch("escalate", v)}
              rows={3}
            />
          </div>

          <div className="mt-3 rounded-lg border border-zinc-300 bg-zinc-900 p-4 text-zinc-100">
            <div className="text-[0.7rem] font-semibold uppercase tracking-wider text-zinc-400">
              技術細節
            </div>
            <textarea
              value={draft.technicalNote}
              onChange={(e) => patch("technicalNote", e.target.value)}
              rows={3}
              className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-900 p-2 text-[0.825rem] leading-6 text-zinc-100 focus:border-zinc-500 focus:outline-none"
            />
            <p className="mt-1 text-[0.7rem] text-zinc-500">
              AI 產出的英文/技術摘要僅供資訊組參考，發佈時會以中文呈現。
            </p>
          </div>

          <div className="mt-3">
            <EditableListBlock
              title="關鍵字"
              items={draft.keywords}
              onChange={(items) => patch("keywords", items)}
              inline
            />
          </div>
        </section>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[0.7rem] font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function EditableBlock({
  title,
  value,
  onChange,
  rows = 3,
}: {
  title: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div className="rounded-lg border border-zinc-100 bg-zinc-50/60 p-3">
      <div className="text-[0.7rem] font-semibold uppercase tracking-wider text-zinc-500">
        {title}
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="mt-1 w-full resize-y rounded-md border border-transparent bg-transparent p-1 text-sm leading-7 text-zinc-800 hover:border-zinc-200 hover:bg-white focus:border-zinc-300 focus:bg-white focus:outline-none"
      />
    </div>
  );
}

function EditableListBlock({
  title,
  items,
  onChange,
  inline = false,
}: {
  title: string;
  items: string[];
  onChange: (items: string[]) => void;
  inline?: boolean;
}) {
  const text = items.join("\n");
  const rows = Math.max(3, items.length);
  return (
    <div className="rounded-lg border border-zinc-100 bg-zinc-50/60 p-3">
      <div className="text-[0.7rem] font-semibold uppercase tracking-wider text-zinc-500">
        {title}
        <span className="ml-1 font-normal normal-case tracking-normal text-zinc-400">
          (一行一個項目)
        </span>
      </div>
      <textarea
        value={text}
        onChange={(e) => {
          const next = e.target.value
            .split("\n")
            .map((s) => s.trim())
            .filter((s) => s.length > 0);
          onChange(next);
        }}
        rows={inline ? 2 : rows}
        className="mt-1 w-full resize-y rounded-md border border-transparent bg-transparent p-1 text-sm leading-7 text-zinc-800 hover:border-zinc-200 hover:bg-white focus:border-zinc-300 focus:bg-white focus:outline-none"
      />
      {inline && items.length > 0 && (
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {items.map((k) => (
            <span
              key={k}
              className="whitespace-nowrap rounded-md bg-zinc-100 px-2 py-0.5 text-[0.7rem] text-zinc-700"
            >
              {k}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function buildDraft(_source: string): Draft {
  return {
    title: "IP 衝突：為什麼有人上不了網，印表機也突然不能印？",
    summary:
      "校內兩台設備拿到相同的網路位址，網路就不知道資料要送給誰，常造成連線中斷或共用印表機失效。",
    scenario:
      "201 教室有兩台筆電同時無法上網，三樓共用印表機顯示離線。重開機後其中一台恢復，另一台仍斷線。",
    why:
      "網路位址就像每台設備在校園裡的座號。如果同一個座號被兩台設備同時拿到，網路系統會無法正確投遞資料，造成兩台設備互相搶資源。",
    symptoms: [
      "電腦提示「網路 IP 設定衝突」",
      "印表機顯示離線或無回應",
      "部分設備時通時斷",
      "重開機後問題在另一台出現",
    ],
    safeChecks: [
      "確認是一台還是整間教室都有問題",
      "重新啟動電腦或印表機看是否暫時恢復",
      "保留錯誤訊息畫面或拍照",
    ],
    doNotDo: [
      "不要自行更改 IP 設定",
      "不要自行插拔教室外的網路設備",
      "不要重置印表機網路設定",
    ],
    escalate:
      "若多台設備同時異常，或重開機後仍無法恢復，請通知學校資訊組老師處理。",
    technicalNote:
      "Possible causes: duplicate static IP, rogue DHCP server (常為私接 IP 分享器), incorrect subnet, legacy device. Check ARP table on the L3 switch and trace MAC to switch port. Verify DHCP scope and look for unauthorized DHCP servers via dhcpdump.",
    keywords: ["IP 衝突", "印表機離線", "連不上網", "DHCP", "私接分享器"],
  };
}
