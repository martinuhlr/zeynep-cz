import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import {
  contact,
  dictionaries,
  isLocale,
  locales,
  siteUrl,
} from "@/lib/i18n";
import "../globals.css";

// Variable fonts (no `weight`) so the optical-size axis can be included.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz"],
  variable: "--font-bricolage",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz"],
  variable: "--font-dm-sans",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = dictionaries[locale];

  return {
    metadataBase: new URL(siteUrl),
    title: dict.metaTitle,
    description: dict.metaDescription,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        cs: "/cs",
        en: "/en",
        "x-default": "/cs",
      },
    },
    openGraph: {
      title: dict.metaTitle,
      description: dict.metaDescription,
      url: `${siteUrl}/${locale}`,
      siteName: contact.name,
      locale: locale === "cs" ? "cs_CZ" : "en_US",
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metaTitle,
      description: dict.metaDescription,
    },
    icons: {
      icon: "/icon",
      apple: "/apple-icon",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = dictionaries[locale];

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: contact.name,
    jobTitle: dict.role,
    url: `${siteUrl}/${locale}`,
    email: `mailto:${contact.email}`,
    telephone: contact.phoneHref.replace("tel:", ""),
    sameAs: [contact.linkedin],
  };

  return (
    <html lang={dict.htmlLang} className={`${bricolage.variable} ${dmSans.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:rounded-md focus:bg-[#ffd98a] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#16131c] focus:shadow"
        >
          {dict.skipToContent}
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
