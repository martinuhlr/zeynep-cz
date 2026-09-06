import type { Metadata } from "next";
import { Caveat, Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import {
  contact,
  dictionaries,
  isLocale,
  locales,
  siteUrl,
} from "@/lib/i18n";
import "../globals.css";

const caveat = Caveat({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
  variable: "--font-poppins",
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
    <html lang={dict.htmlLang} className={`${caveat.variable} ${poppins.variable}`}>
      <body className="font-poppins">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:shadow"
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
