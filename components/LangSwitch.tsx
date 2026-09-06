"use client";

import Link from "next/link";
import { locales, type Locale } from "@/lib/i18n";

function setLocaleCookie(locale: Locale) {
  document.cookie = `NEXT_LOCALE=${locale}; max-age=${60 * 60 * 24 * 365}; path=/`;
}

export default function LangSwitch({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  return (
    <div
      className="absolute top-5 right-4 z-10 flex gap-2 sm:top-6 sm:right-8"
      role="group"
      aria-label={label}
    >
      {locales.map((code) => {
        const active = code === locale;
        return (
          <Link
            key={code}
            href={`/${code}`}
            onClick={() => setLocaleCookie(code)}
            aria-current={active ? "true" : undefined}
            className={
              "rounded-full border px-3.5 py-1.5 text-[13px] font-semibold tracking-wide uppercase transition-colors " +
              (active
                ? "border-transparent bg-[oklch(0.5_0.16_35)] text-white"
                : "border-[oklch(0.5_0.16_35)] bg-transparent text-[oklch(0.5_0.16_35)] hover:bg-[oklch(0.5_0.16_35)]/10")
            }
          >
            {code}
          </Link>
        );
      })}
    </div>
  );
}
