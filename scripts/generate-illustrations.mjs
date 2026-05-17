#!/usr/bin/env node
import { writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "illustrations");

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error("OPENAI_API_KEY required");
  process.exit(1);
}

const MODEL = process.env.OPENAI_IMAGE_MODEL || "gpt-image-2";
const SIZE = process.env.OPENAI_IMAGE_SIZE || "1536x1024";

const JOBS = [
  {
    slug: "ip-conflict-printer",
    prompt:
      "Minimal editorial vector illustration of two identical paper name tags overlapping in mid-air above a calm pastel desk surface, soft dawn lighting. Off-white background with a subtle sky-blue gradient corner. Flat geometric shapes, gentle paper-cut texture, generous negative space. No text, no people, no devices. Quiet curious mood. Taiwan school stationery aesthetic.",
  },
  {
    slug: "heavy-traffic-pc",
    prompt:
      "Minimal editorial vector illustration: one oversized water tap overflows its own glass while four small adjacent taps only trickle. Warm amber-cream palette on off-white background. Flat shapes, gentle grain, generous negative space. No text, no people. Mood: a single user quietly hogging a shared resource. Taiwan school calm tone.",
  },
  {
    slug: "ap-overload",
    prompt:
      "Minimal editorial vector illustration: a small cloud of folded paper devices crowds around a single tall slender antenna in the middle. Lavender and violet on a cream background. Flat geometric shapes, soft shadows, generous negative space. No text, no people. Quietly busy mood, like rush hour around one transmitter. Taiwan school aesthetic.",
  },
  {
    slug: "printer-offline",
    prompt:
      "Minimal editorial vector illustration: a single sheet of paper hovers above a stylized small printer, connected by a thin broken thread that drifts mid-air. Dusty rose and cream palette, off-white background. Flat shapes, generous negative space. No text, no people. Calm waiting mood, gentle stillness. Taiwan school stationery aesthetic.",
  },
  {
    slug: "phishing-link",
    prompt:
      "Minimal editorial vector illustration: a small fishing hook quietly peeks out from inside a closed paper envelope, almost playful. Sage and emerald palette on a cream background. Flat shapes, soft shadows, generous negative space. No text, no people. Cautious but calm mood, gentle warning. Taiwan school aesthetic.",
  },
];

async function gen(job) {
  console.log(`[${job.slug}] requesting ${MODEL} (${SIZE})…`);
  const t0 = Date.now();
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      prompt: job.prompt,
      size: SIZE,
      n: 1,
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`OpenAI ${res.status}: ${txt}`);
  }
  const data = await res.json();
  const item = data.data?.[0];
  if (!item) throw new Error(`no image in response: ${JSON.stringify(data).slice(0, 200)}`);

  let bytes;
  if (item.b64_json) {
    bytes = Buffer.from(item.b64_json, "base64");
  } else if (item.url) {
    const dl = await fetch(item.url);
    bytes = Buffer.from(await dl.arrayBuffer());
  } else {
    throw new Error("no b64_json or url");
  }

  const outPath = join(OUT_DIR, `${job.slug}.png`);
  await writeFile(outPath, bytes);
  const dt = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`[${job.slug}] wrote ${outPath} (${bytes.length} bytes, ${dt}s)`);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const results = [];
  for (const job of JOBS) {
    try {
      await gen(job);
      results.push({ slug: job.slug, ok: true });
    } catch (e) {
      console.error(`[${job.slug}] FAILED:`, e.message);
      results.push({ slug: job.slug, ok: false, err: e.message });
    }
  }
  console.log("\nSummary:");
  for (const r of results) {
    console.log(`  ${r.ok ? "✓" : "✗"} ${r.slug}${r.err ? " — " + r.err : ""}`);
  }
  const fails = results.filter((r) => !r.ok).length;
  process.exit(fails > 0 ? 2 : 0);
}

main();
