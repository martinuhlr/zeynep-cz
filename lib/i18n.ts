export const locales = ["cs", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "cs";

export const siteUrl = "https://zeynep.cz";

export const contact = {
  name: "Zeynep Uhlir",
  linkedin: "https://www.linkedin.com/in/zeynep-uhlir/",
  phoneDisplay: "+420 735 518 901",
  phoneHref: "tel:+420735518901",
  email: "ahoj@zeynep.cz",
};

export const projects = [
  {
    id: "kosik",
    name: "Vinařství Kosík",
    href: "https://www.kosikvinarstvi.cz/",
    image: "/images/project-kosik.webp",
  },
  {
    id: "penzion",
    name: "Penzion u Kosíků",
    href: "https://ukosiku.cz/",
    image: "/images/project-penzion.webp",
  },
] as const;

type Dictionary = {
  htmlLang: string;
  role: string;
  metaTitle: string;
  metaDescription: string;
  ogAlt: string;
  projectsLabel: string;
  projectAlt: Record<(typeof projects)[number]["id"], string>;
  projectDesc: Record<(typeof projects)[number]["id"], string>;
  langSwitchLabel: string;
  skipToContent: string;
  visitSite: string;
};

export const dictionaries: Record<Locale, Dictionary> = {
  cs: {
    htmlLang: "cs",
    role: "Marketing & webová designérka",
    metaTitle: "Zeynep Uhlir — Marketing & webová designérka",
    metaDescription:
      "Zeynep Uhlir — marketing a webový design. Správa sociálních sítí, tvorba obsahu a webdesign pro Vinařství Kosík a Penzion u Kosíků v Tvrdonicích.",
    ogAlt: "Zeynep Uhlir — Marketing & webová designérka",
    projectsLabel: "Projekty",
    projectAlt: {
      kosik: "Vinařství Kosík — láhev vína Saphira na vinici při západu slunce",
      penzion: "Penzion u Kosíků — sklenice a láhev vína na pokoji",
    },
    projectDesc: {
      kosik: "Správa sociálních sítí a obsahu",
      penzion: "Design webu",
    },
    langSwitchLabel: "Přepnout jazyk",
    skipToContent: "Přeskočit na obsah",
    visitSite: "Otevřít web v novém okně",
  },
  en: {
    htmlLang: "en",
    role: "Marketing & Web Designer",
    metaTitle: "Zeynep Uhlir — Marketing & Web Designer",
    metaDescription:
      "Zeynep Uhlir — marketing & web design. Social media management, content creation and website design for Vinařství Kosík and Penzion u Kosíků in Tvrdonice.",
    ogAlt: "Zeynep Uhlir — Marketing & Web Designer",
    projectsLabel: "Projects",
    projectAlt: {
      kosik: "Vinařství Kosík — Saphira wine bottle in the vineyard at sunset",
      penzion: "Penzion u Kosíků — wine glass and bottle in a guest room",
    },
    projectDesc: {
      kosik: "Social media & content management",
      penzion: "Website design",
    },
    langSwitchLabel: "Switch language",
    skipToContent: "Skip to content",
    visitSite: "Open website in a new tab",
  },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
