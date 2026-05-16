import { CATEGORIES, TOPICS, QR_LANDINGS } from "./data";
import type { Category, CategorySlug, Topic, QrLanding } from "./data";

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getTopicsByCategory(slug: CategorySlug): Topic[] {
  return TOPICS.filter((t) => t.categorySlug === slug);
}

export function getTopic(slug: string): Topic | undefined {
  return TOPICS.find((t) => t.slug === slug);
}

export function getRelatedTopics(topic: Topic): Topic[] {
  return topic.relatedSlugs
    .map((s) => TOPICS.find((t) => t.slug === s))
    .filter((t): t is Topic => Boolean(t));
}

export function getQrLanding(id: string): QrLanding | undefined {
  return QR_LANDINGS.find((q) => q.id === id);
}

type AccentClasses = {
  badge: string;
  ring: string;
  bar: string;
  soft: string;
  text: string;
};

export function accentClasses(accent: string): AccentClasses {
  switch (accent) {
    case "sky":
      return {
        badge: "bg-sky-50 text-sky-700 border-sky-200",
        ring: "ring-sky-200",
        bar: "bg-sky-500",
        soft: "bg-sky-50",
        text: "text-sky-700",
      };
    case "amber":
      return {
        badge: "bg-amber-50 text-amber-800 border-amber-200",
        ring: "ring-amber-200",
        bar: "bg-amber-500",
        soft: "bg-amber-50",
        text: "text-amber-800",
      };
    case "violet":
      return {
        badge: "bg-violet-50 text-violet-700 border-violet-200",
        ring: "ring-violet-200",
        bar: "bg-violet-500",
        soft: "bg-violet-50",
        text: "text-violet-700",
      };
    case "rose":
      return {
        badge: "bg-rose-50 text-rose-700 border-rose-200",
        ring: "ring-rose-200",
        bar: "bg-rose-500",
        soft: "bg-rose-50",
        text: "text-rose-700",
      };
    case "emerald":
      return {
        badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
        ring: "ring-emerald-200",
        bar: "bg-emerald-500",
        soft: "bg-emerald-50",
        text: "text-emerald-700",
      };
    case "slate":
    default:
      return {
        badge: "bg-slate-100 text-slate-700 border-slate-200",
        ring: "ring-slate-200",
        bar: "bg-slate-500",
        soft: "bg-slate-50",
        text: "text-slate-700",
      };
  }
}
