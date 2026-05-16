"use client";

import { useState } from "react";
import { CATEGORIES } from "@/lib/data";
import type { CategorySlug } from "@/lib/data";

const AUDIENCES = [
  { key: "grade_1_3", label: "低年級 1-3" },
  { key: "grade_4_6", label: "中年級 4-6" },
  { key: "grade_7_9", label: "國中 7-9" },
  { key: "grade_10_12", label: "高中 10-12" },
  { key: "teacher", label: "老師" },
  { key: "it_staff", label: "資訊組老師" },
];

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
  audienceBody: string;
  keywords: string[];
  imagePrompt: string;
};

const STAGES = [
  "讀取技術說明",
  "歸納症狀與情境",
  "撰寫分眾說明",
  "產生圖片提示與關鍵字",
];

export function GenerateDraftForm() {
  const [source, setSource] = useState(
    "校內出現多台設備網路間歇性中斷，部分共用印表機顯示離線。資訊組懷疑為 IP 衝突或私接 IP 分享器造成 DHCP 衝突。"
  );
  const [category, setCategory] = useState<CategorySlug>(CATEGORIES[0].slug);
  const [audience, setAudience] = useState("teacher");
  const [stage, setStage] = useState<number>(-1);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [generating, setGenerating] = useState(false);

  async function handleGenerate() {
    setDraft(null);
    setGenerating(true);
    for (let i = 0; i < STAGES.length; i++) {
      setStage(i);
      await new Promise((r) => setTimeout(r, 450));
    }
    setDraft(buildMockDraft(source, audience));
    setGenerating(false);
    setStage(-1);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-zinc-200 bg-white p-5">
        <h2 className="text-sm font-semibold tracking-tight">技術來源說明</h2>
        <p className="mt-1 text-[12px] text-zinc-500">
          貼上資訊組備忘、廠商回報或現場觀察。AI 會以此產生草稿，仍需人工審核後才能發佈。
        </p>
        <textarea
          value={source}
          onChange={(e) => setSource(e.target.value)}
          rows={4}
          className="mt-3 w-full rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm leading-6 focus:border-zinc-400 focus:bg-white focus:outline-none"
          placeholder="例：教室 201 多台電腦連線中斷，懷疑 IP 衝突..."
        />

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
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
          <Field label="目標受眾">
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus:border-zinc-400 focus:outline-none"
            >
              {AUDIENCES.map((a) => (
                <option key={a.key} value={a.key}>
                  {a.label}
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
            className="inline-flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60"
          >
            <span aria-hidden>✨</span>
            {generating ? "生成中…" : "一鍵產生草稿"}
          </button>
          {stage >= 0 && (
            <span className="text-[12px] text-zinc-500">
              {STAGES[stage]}…
            </span>
          )}
          {draft && !generating && (
            <span className="text-[12px] text-emerald-700">草稿已產生 · 請審核後送出。</span>
          )}
        </div>
      </section>

      {draft && (
        <section className="rounded-xl border border-zinc-200 bg-white p-5">
          <div className="mb-1 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                AI 草稿 · 待審核
              </div>
              <h2 className="mt-1 text-lg font-semibold tracking-tight">
                {draft.title}
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
              >
                重新生成
              </button>
              <button
                type="button"
                className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700"
              >
                送出審核
              </button>
            </div>
          </div>
          <p className="mt-1 text-sm leading-6 text-zinc-600">{draft.summary}</p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Block title="教室情境">{draft.scenario}</Block>
            <Block title="為什麼會這樣">{draft.why}</Block>
            <Block title="可能觀察到">
              <ul className="list-disc pl-5">
                {draft.symptoms.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </Block>
            <Block title="安全先檢查">
              <ul className="list-disc pl-5">
                {draft.safeChecks.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </Block>
            <Block title="請不要做">
              <ul className="list-disc pl-5">
                {draft.doNotDo.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </Block>
            <Block title="何時通報">{draft.escalate}</Block>
          </div>

          <div className="mt-4">
            <Block title={`分眾版本 · ${AUDIENCES.find((a) => a.key === audience)?.label}`}>
              {draft.audienceBody}
            </Block>
          </div>

          <div className="mt-4 rounded-lg border border-zinc-300 bg-zinc-900 p-4 text-zinc-100">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              資訊組備註
            </div>
            <p className="mt-1 text-[13px] leading-6">{draft.technicalNote}</p>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Block title="關鍵字">
              <div className="flex flex-wrap gap-1.5">
                {draft.keywords.map((k) => (
                  <span
                    key={k}
                    className="rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] text-zinc-700"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </Block>
            <Block title="圖片提示（GPT-Image-2）">
              <code className="text-[12px] text-zinc-600">{draft.imagePrompt}</code>
            </Block>
          </div>
        </section>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-zinc-100 bg-zinc-50/60 p-3">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
        {title}
      </div>
      <div className="mt-1 text-[14px] leading-7 text-zinc-700">{children}</div>
    </div>
  );
}

function buildMockDraft(source: string, audience: string): Draft {
  const isStudent = audience.startsWith("grade_");
  const isJunior = audience === "grade_1_3" || audience === "grade_4_6";
  return {
    title: "IP 衝突：為什麼有人上不了網，印表機也突然不能印？",
    summary:
      "校內兩台設備拿到相同的 IP 位址，網路就不知道資料要送給誰，常造成連線中斷或共用印表機失效。",
    scenario:
      "201 教室有兩台筆電同時無法上網，三樓共用印表機顯示離線。重開機後其中一台恢復，另一台仍斷線。",
    why:
      "IP 就像每台設備在校園網路裡的座位號碼。如果同一個座號被兩台設備同時拿到，網路系統會無法正確投遞資料，造成兩台設備互相搶資源。",
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
    audienceBody: isJunior
      ? "想像每個人都有自己的座號。如果有兩個同學拿到一樣的座號，老師發作業就會搞錯，網路也是這樣。請告訴老師，讓資訊組老師幫忙。"
      : isStudent
      ? "校園網路裡每台設備都有一組 IP 位址，就像座號。若兩台設備拿到同一個座號，資料就會送錯。發現連不上線時，先告訴老師，不要自己改設定。"
      : audience === "it_staff"
      ? "Most cases trace back to a rogue DHCP from a personal Wi-Fi router plugged into a classroom port. Check switch port logs, disable rogue port if confirmed, and consider enabling DHCP snooping on access switches."
      : "當教室出現多台設備同時連線不穩、共用印表機離線時，建議先收集症狀資訊（哪幾台、是否同時發生），再通知資訊組老師。不要自行更改 IP 或重置印表機，避免造成更難排查的問題。",
    keywords: ["IP 衝突", "印表機離線", "連不上網", "DHCP", "私接分享器"],
    imagePrompt:
      "Friendly modern vector illustration of a Taiwanese classroom where two laptops accidentally hold the same network address (shown as duplicated seat-number cards), a teacher looks puzzled while a printer shows an error icon. Clean, school-safe, warm palette.",
  };
}
