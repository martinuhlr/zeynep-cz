"use client";

import Link from "next/link";
import { Fragment } from "react";
import { locales, type Locale } from "@/lib/i18n";

function setLocaleCookie(locale: Locale) {
  document.cookie = `NEXT_LOCALE=${locale}; max-age=${60 * 60 * 24 * 365}; path=/`;
}

/** The "CS / EN" pill in the nav. */
export default function LangSwitch({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  return (
    <div className="lang" role="group" aria-label={label}>
      {locales.map((code, i) => (
        <Fragment key={code}>
          {i > 0 && <span aria-hidden="true">&nbsp;/&nbsp;</span>}
          <Link
            href={`/${code}`}
            hrefLang={code}
            lang={code}
            onClick={() => setLocaleCookie(code)}
            aria-current={code === locale ? "true" : undefined}
          >
            {code.toUpperCase()}
          </Link>
        </Fragment>
      ))}
    </div>
  );
}
