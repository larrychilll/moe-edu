"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const ITEMS = [
  { href: "/", label: "首頁" },
  { href: "/categories", label: "問題分類" },
  { href: "/qr/rm-201", label: "QR 範例" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        aria-label={open ? "關閉選單" : "開啟選單"}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((v) => !v)}
        className="grid h-9 w-9 place-items-center rounded-md border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
      >
        <span aria-hidden className="relative block h-3 w-4">
          <span
            className={`absolute left-0 top-0 h-0.5 w-4 bg-current transition ${
              open ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`absolute left-0 top-[5px] h-0.5 w-4 bg-current transition ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`absolute bottom-0 left-0 h-0.5 w-4 bg-current transition ${
              open ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      {open && (
        <button
          type="button"
          aria-label="關閉選單背景"
          tabIndex={-1}
          onClick={() => setOpen(false)}
          className="fixed inset-0 top-14 z-30 bg-zinc-900/30"
        />
      )}

      <div
        id="mobile-nav-panel"
        role="dialog"
        aria-label="導覽選單"
        hidden={!open}
        className="fixed inset-x-0 top-14 z-40 border-b border-zinc-200 bg-white shadow-lg"
      >
        <nav className="mx-auto flex max-w-6xl flex-col px-4 py-3">
          {ITEMS.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-base font-medium text-zinc-800 hover:bg-zinc-100"
            >
              {it.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
