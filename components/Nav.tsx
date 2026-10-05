"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import LangSwitch from "./LangSwitch";

export default function Nav({
  locale,
  links,
  cta,
  langSwitchLabel,
}: {
  locale: Locale;
  links: { href: string; label: string }[];
  cta: string;
  langSwitchLabel: string;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={scrolled ? "nav scrolled" : "nav"}>
      <div className="wrap">
        <a href="#top" className="logo">
          zeynep<span>.</span>
        </a>
        <div className="nav-links">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <div className="nav-right">
          <LangSwitch locale={locale} label={langSwitchLabel} />
          <a href="#contact" className="btn butter">
            {cta}
          </a>
        </div>
      </div>
    </nav>
  );
}
