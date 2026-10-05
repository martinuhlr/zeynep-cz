export const locales = ["cs", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "cs";

export const siteUrl = "https://zeynep.cz";

export const contact = {
  name: "Zeynep Uhlir",
  linkedin: "https://www.linkedin.com/in/zeynep-uhlir/",
  linkedinDisplay: "in/zeynep-uhlir",
  phoneDisplay: "+420 735 518 901",
  phoneHref: "tel:+420735518901",
  email: "ahoj@zeynep.cz",
};

/* ---------- Images (language-independent) ---------- */

type Img = { src: string; width: number; height: number; position?: string };

/** The fanned-out pile of thumbnails under the hero. */
export const heroPile: (Img & { rotate: string; y: string })[] = [
  { src: "/images/reels/most-reel.webp", width: 506, height: 900, position: "center 20%", rotate: "-9deg", y: "18px" },
  { src: "/images/ostraticky-home.webp", width: 733, height: 2000, position: "top", rotate: "-4deg", y: "-6px" },
  { src: "/images/social/post-black-friday.webp", width: 576, height: 720, rotate: "3deg", y: "10px" },
  { src: "/images/penzion-site.webp", width: 800, height: 1294, position: "top", rotate: "-2deg", y: "-14px" },
  { src: "/images/social/post-valentyn-brand-hearts.webp", width: 576, height: 720, rotate: "6deg", y: "6px" },
  { src: "/images/reels/frizante-rose.webp", width: 720, height: 900, rotate: "10deg", y: "22px" },
];

export const kosikMedia = {
  reelLeft: {
    href: "https://www.instagram.com/kosikvinarstvi/reel/Dc_hczLI2nI/",
    img: { src: "/images/reels/most-reel.webp", width: 506, height: 900 } as Img,
  },
  video: {
    src: "/images/reels/nature-walk.mp4",
    poster: "/images/reels/nature-walk-poster.webp",
  },
  reelRight: {
    href: "https://www.instagram.com/kosikvinarstvi/p/DcyBW8AIdcy/",
    img: { src: "/images/reels/frizante-rose.webp", width: 720, height: 900, position: "62% center" } as Img,
  },
  /** Order matches `kosikSocialAlt` in each dictionary. */
  social: [
    "post-saphira-pairing-board",
    "post-reviews",
    "post-valentyn-brand-hearts",
    "post-black-friday",
    "post-hibernal-food-pairing",
    "post-christmas-gift-box",
    "post-sylvanske-salon-2026",
    "post-new-year-frizante-blanc",
    "post-frizante-strawberries",
  ].map((name): Img => ({ src: `/images/social/${name}.webp`, width: 576, height: 720 })),
};

/* ---------- Projects ---------- */

export const projects = [
  {
    id: "ostraticky",
    name: "Ostratický",
    href: null,
    domain: "ostraticky.cz",
    screenshot: { src: "/images/ostraticky-home.webp", width: 733, height: 2000 } as Img,
  },
  {
    id: "kosik",
    name: "Vinařství Kosík",
    href: "https://www.kosikvinarstvi.cz/",
    domain: "kosikvinarstvi.cz",
    screenshot: null,
  },
  {
    id: "penzion",
    name: "Penzion u Kosíků",
    href: "https://ukosiku.cz/",
    domain: "ukosiku.cz",
    screenshot: { src: "/images/penzion-site.webp", width: 800, height: 1294 } as Img,
  },
] as const;

export const penzionRoom: Img = { src: "/images/penzion-room.webp", width: 592, height: 444 };

export type ProjectId = (typeof projects)[number]["id"];

/* ---------- Text ---------- */

type ProjectText = {
  type: string;
  description: string;
  /** Four label/value pairs shown under the description. */
  meta: [string, string][];
  screenshotAlt?: string;
};

type Dictionary = {
  htmlLang: string;
  role: string;
  metaTitle: string;
  metaDescription: string;
  ogAlt: string;
  langSwitchLabel: string;
  skipToContent: string;

  nav: { work: string; services: string; about: string; contact: string; cta: string };

  hero: {
    availability: string;
    /** Three lines; the `accent` word inside line 2 is highlighted. */
    titleLines: [string, string, string];
    titleAccent: string;
    introBefore: string;
    introAfter: string;
    seeWork: string;
    pileLabel: string;
    stickerRing: string;
    stickerHi: string;
  };

  work: {
    titleTop: string;
    titleAccent: string;
    intro: string;
    visit: string;
    hoverHint: string;
    projects: Record<ProjectId, ProjectText>;
    kosikReelLeftAlt: string;
    kosikReelRightAlt: string;
    kosikVideoLabel: string;
    reelBadge: string;
    kosikSocialAlt: string[];
    penzionRoomAlt: string;
    penzionStatLines: [string, string];
    penzionStatText: string;
  };

  services: {
    titleLines: [string, string];
    intro: string;
    items: { title: string; text: string; points: [string, string, string] }[];
  };

  about: {
    title: string;
    leadBefore: string;
    leadAccent: string;
    leadAfter: string;
    paragraphs: string[];
    languagesLabel: string;
    languages: { name: string; level: string }[];
    jobs: { title: string; when: string; where: string; text: string }[];
    toolsLabel: string;
    tools: string[];
  };

  contactSection: {
    bigLines: [string, string];
    email: string;
    phone: string;
    linkedin: string;
  };

  footerPlace: string;
};

const tools = ["Figma", "Canva", "WordPress", "Google Workspace", "MS Office", "ChatGPT", "Claude", "Gemini"];
const stickerRing = "MERHABA · AHOJ · HELLO · MERHABA · AHOJ · HELLO ·";

export const dictionaries: Record<Locale, Dictionary> = {
  cs: {
    htmlLang: "cs",
    role: "Marketingová, webová a grafická designérka",
    metaTitle: "Zeynep Uhlir — marketingová, webová a grafická designérka",
    metaDescription:
      "Zeynep Uhlir — marketingová, webová a grafická designérka se zaměřením na UX/UI, působí nedaleko Brna.",
    ogAlt: "Zeynep Uhlir — marketingová, webová a grafická designérka",
    langSwitchLabel: "Přepnout jazyk",
    skipToContent: "Přeskočit na obsah",

    nav: { work: "Projekty", services: "Služby", about: "O mně", contact: "Kontakt", cta: "Napište mi" },

    hero: {
      availability: "Otevřená novým projektům i pozicím v Brně",
      titleLines: ["Design, ve kterém", "se značka cítí", "dobře."],
      titleAccent: "cítí",
      introBefore: "Merhaba, ahoj! Jsem",
      introAfter:
        ", marketingová, webová a grafická designérka se zaměřením na UX/UI. Navrhuji weby, vizuální identity a obsah na sociální sítě pro značky v Česku, Turecku i jinde.",
      seeWork: "Moje práce",
      pileLabel: "Přejít na moje projekty",
      stickerRing,
      stickerHi: "Ahoj!",
    },

    work: {
      titleTop: "Nedávné",
      titleAccent: "projekty.",
      intro:
        "Tři projekty pro tři klienty: kompletní redesign webu, rok obsahu na sociální sítě pro vinařství a web pro rodinný penzion.",
      visit: "Navštívit",
      hoverHint: "Najeďte myší pro posun ↓",
      projects: {
        ostraticky: {
          type: "Redesign webu · UX/UI",
          description:
            "Kompletní redesign pro českého výrobce techniky pro vinice, sady a údržbu zeleně. Začala jsem wireframy, promyslela strukturu rozsáhlého produktového katalogu a nad ní navrhla moderní rozhraní postavené na fotografiích.",
          meta: [
            ["Role", "UX & UI design"],
            ["Nástroj", "Figma"],
            ["Rozsah", "7 šablon stránek"],
            ["Zařízení", "Desktop + mobil"],
          ],
          screenshotAlt:
            "Návrh homepage Ostratický: rozdělený úvod pro vinohradnickou a komunální techniku, klíčová čísla, nejprodávanější stroje, kategorie, novinky a poptávkový formulář",
        },
        kosik: {
          type: "Sociální sítě · Tvorba obsahu",
          description:
            "Dlouhodobá správa sociálních sítí pro rodinné vinařství v Tvrdonicích. Plánuji obsahový kalendář a navrhuji každý příspěvek i story – od uvedení nových vín a tipů na párování s jídlem až po sezónní kampaně na Valentýna, Velikonoce, Vánoce nebo Black Friday – a hlídám, aby vše odpovídalo značce.",
          meta: [
            ["Role", "Obsah & design"],
            ["Nástroje", "Figma, Canva"],
            ["Kanály", "Instagram, Facebook"],
            ["Formáty", "Příspěvky, stories, reels"],
          ],
        },
        penzion: {
          type: "Design webu",
          description:
            "Web pro rodinný penzion s vinným sklepem uprostřed moravských vinic. Cíl byl jednoduchý: ukázat pokoje i okolí, usnadnit hledání cen a každého návštěvníka dovést k jediné jasné akci – rezervaci pobytu.",
          meta: [
            ["Role", "Webdesign"],
            ["Zaměření", "Rezervace"],
            ["Sekce", "Pokoje, informace, galerie, recenze"],
            ["Zařízení", "Desktop + mobil"],
          ],
          screenshotAlt:
            "Homepage Penzionu u Kosíků: úvod s tlačítkem pro rezervaci, uvítací sekce a sekce o dovolené s fotografiemi",
        },
      },
      kosikReelLeftAlt: "Obálka reelu: majitel drží vnučku vedle láhve Kosík Mošt",
      kosikReelRightAlt: "Láhev Frizzanté ROSE ležící na slunci na kravské kůži",
      kosikVideoLabel: "Reel z procházky přírodou",
      reelBadge: "Reel",
      kosikSocialAlt: [
        "Příspěvek o párování vína Saphira s jídlem",
        "Příspěvek s recenzemi zákazníků v bublinách kolem sklenky vína Kosík",
        "Valentýnský příspěvek značky",
        "Příspěvek k výprodeji Black Friday",
        "Příspěvek o párování Hibernalu s jídlem",
        "Vánoční příspěvek s dárkovou krabicí",
        "Příspěvek o zlaté medaili pro Sylvánské zelené na Salonu vín 2026",
        "Novoroční příspěvek s vínem Frizzante Blanc",
        "Láhev a sklenka Frizzante s jahodami na stole ve vinici",
      ],
      penzionRoomAlt: "Světlý dvoulůžkový pokoj v penzionu",
      penzionStatLines: ["4 pokoje,", "1 akce."],
      penzionStatText: "Každá sekce vede k tlačítku „Rezervovat“.",
    },

    services: {
      titleLines: ["Jedna designérka,", "ucelená značka."],
      intro:
        "Od loga přes web až po pondělní příspěvek na Instagram – hlídám, aby všechno vypadalo a znělo jako jedna značka.",
      items: [
        {
          title: "Web & UX/UI design",
          text: "Nejdřív promyslím strukturu, pak navrhnu stránky, ve kterých se lidé snadno vyznají.",
          points: ["Wireframy & struktura", "UI design ve Figmě", "Stránky ve WordPressu"],
        },
        {
          title: "Vizuální identita",
          text: "Barvy, písma a pravidla pro logo sepsaná ve Figma manuálu, aby značka všude vypadala stejně.",
          points: ["Barevné palety & typografie", "Používání loga", "Brand manuály ve Figmě"],
        },
        {
          title: "Sociální sítě & obsah",
          text: "Příspěvky, stories a kampaně naplánované dopředu a navržené v duchu značky.",
          points: ["Karusely & stories", "Grafika ke kampaním", "Obsahové kalendáře"],
        },
        {
          title: "Marketingová podpora",
          text: "Komunikuji s klienty, před zveřejněním zkontroluji každý detail a píšu texty v turečtině.",
          points: ["Koordinace s klienty a týmem", "Vizuální kontrola & korektury", "Turecké texty & tón"],
        },
      ],
    },

    about: {
      title: "O mně",
      leadBefore: "Narozená v Istanbulu, doma na Moravě, navrhuji pro značky ",
      leadAccent: "odkudkoliv",
      leadAfter: ".",
      paragraphs: [
        "Než jsem se začala věnovat designu, pět let jsem vedla vlastní byznys a učila turečtinu klienty z celého světa. Naučilo mě to pozorně naslouchat, srozumitelně vysvětlovat a vnímat tón i kontext. Stejně dnes přistupuji k designu.",
        "Dnes pracuji jako marketingová specialistka v OnTarget v Brně – buduji vizuální identity, navrhuji obsah na sociální sítě a starám se o weby několika klientů. Rychle se učím, než odpovím, udělám si průzkum, a AI nástroje mi každý den pomáhají pracovat chytřeji. Taky se učím česky.",
      ],
      languagesLabel: "Jazyky",
      languages: [
        { name: "Turečtina", level: "Rodilá mluvčí" },
        { name: "Angličtina", level: "Profesionální úroveň" },
        { name: "Čeština", level: "Učím se" },
      ],
      jobs: [
        {
          title: "Marketingová specialistka",
          when: "říj 2025 — dosud",
          where: "OnTarget · Freelance · Brno, na dálku",
          text: "Tvořím a publikuji obsah na sociální sítě (grafiku, texty a vizuály) ve Figmě a Canvě. Vytvářím, aktualizuji a spravuji stránky ve WordPressu tak, aby obsah i rozvržení odpovídaly značce. Při rešerších a psaní textů využívám ChatGPT a Gemini.",
        },
        {
          title: "Online lektorka",
          when: "led 2020 — led 2025",
          where: "TurkishwithZey · Freelance · Istanbul, na dálku",
          text: "Pět let jsem online učila turečtinu a tureckou kulturu studenty z celého světa. Celý freelance byznys jsem vedla sama: rozvrh, oslovování nových klientů i komunikaci se studenty.",
        },
        {
          title: "Koordinátorka prodeje & sociálních sítí",
          when: "lis 2021 — srp 2022",
          where: "Solita Jewels · Plný úvazek · Istanbul",
          text: "Spravovala jsem sociální sítě a web značky, tvořila vizuální obsah a psala produktové texty. Pomáhala jsem zákazníkům vybrat správné produkty a připravovala produktové certifikáty a informace o produktech.",
        },
      ],
      toolsLabel: "Nástroje",
      tools,
    },

    contactSection: {
      bigLines: ["Pojďme spolu", "něco vytvořit"],
      email: "E-mail",
      phone: "Telefon",
      linkedin: "LinkedIn",
    },

    footerPlace: "Jižní Morava · Otevřená práci v Brně",
  },

  en: {
    htmlLang: "en",
    role: "Marketing, Web & Graphic Designer",
    metaTitle: "Zeynep Uhlir — Marketing, Web & Graphic Designer",
    metaDescription:
      "Zeynep Uhlir — marketing, web and graphic designer with a UX/UI focus, based near Brno.",
    ogAlt: "Zeynep Uhlir — Marketing, Web & Graphic Designer",
    langSwitchLabel: "Switch language",
    skipToContent: "Skip to content",

    nav: { work: "Work", services: "Services", about: "About", contact: "Contact", cta: "Let's talk" },

    hero: {
      availability: "Open to projects & roles in Brno",
      titleLines: ["Design that", "makes brands feel", "right."],
      titleAccent: "feel",
      introBefore: "Merhaba, ahoj! I'm",
      introAfter:
        ", a marketing, web and graphic designer with a UX/UI focus. I design websites, brand systems and social content for brands in Czechia, Türkiye and beyond.",
      seeWork: "See my work",
      pileLabel: "Jump to my projects",
      stickerRing,
      stickerHi: "Hi!",
    },

    work: {
      titleTop: "Recent",
      titleAccent: "projects.",
      intro:
        "Three projects for three clients: a full website redesign, a year of social content for a winery, and a website for a family guesthouse.",
      visit: "Visit",
      hoverHint: "Hover to scroll ↓",
      projects: {
        ostraticky: {
          type: "Website redesign · UX/UI",
          description:
            "A full redesign for a Czech maker of vineyard, orchard and landscaping machinery. I started from wireframes, worked out the structure of a large product catalogue, then designed a modern, image-led interface on top of it.",
          meta: [
            ["Role", "UX & UI design"],
            ["Tool", "Figma"],
            ["Scope", "7 page templates"],
            ["Devices", "Desktop + mobile"],
          ],
          screenshotAlt:
            "Ostratický homepage design: split hero for vineyard and landscaping machinery, key numbers, best-selling machines, categories, news and an enquiry form",
        },
        kosik: {
          type: "Social media · Content design",
          description:
            "Ongoing social media for a family winery in Tvrdonice. I plan the content calendar and design every post and story, from product launches and food pairings to seasonal campaigns like Valentine's Day, Easter, Christmas and Black Friday, while keeping it all on brand.",
          meta: [
            ["Role", "Content & design"],
            ["Tools", "Figma, Canva"],
            ["Channels", "Instagram, Facebook"],
            ["Formats", "Posts, stories, reels"],
          ],
        },
        penzion: {
          type: "Website design",
          description:
            "A website for a family guesthouse and wine cellar in the Moravian vineyards. The goal was simple: show off the rooms and the setting, make prices easy to find, and lead every visitor to one clear action, which is booking a stay.",
          meta: [
            ["Role", "Web design"],
            ["Focus", "Bookings"],
            ["Sections", "Rooms, info, gallery, reviews"],
            ["Devices", "Desktop + mobile"],
          ],
          screenshotAlt:
            "Penzion u Kosíků homepage: hero with booking button, welcome section and holiday section with photos",
        },
      },
      kosikReelLeftAlt: "Reel cover: owner holding his granddaughter beside a bottle of Kosík Mošt",
      kosikReelRightAlt: "Frizzanté ROSE bottle lying on a cowhide rug in the sun",
      kosikVideoLabel: "Nature walk reel",
      reelBadge: "Reel",
      kosikSocialAlt: [
        "Saphira wine food pairing post",
        "Customer reviews post with speech bubbles around a Kosík wine glass",
        "Valentine's Day brand post",
        "Black Friday sale post",
        "Hibernal food pairing post",
        "Christmas gift box post",
        "Sylvánské zelené gold medal at Salon vín 2026 post",
        "New Year's resolution post featuring Frizzante Blanc",
        "Frizzante bottle and glass with strawberries on a table in the vineyard",
      ],
      penzionRoomAlt: "A bright double room at the guesthouse",
      penzionStatLines: ["4 rooms,", "1 action."],
      penzionStatText: "Every section points to “Rezervovat”.",
    },

    services: {
      titleLines: ["One designer,", "the whole picture."],
      intro:
        "From the logo to the website to Monday's Instagram post, I keep everything looking and sounding like one brand.",
      items: [
        {
          title: "Web & UX/UI design",
          text: "I plan the structure first, then design pages people can find their way around.",
          points: ["Wireframes & structure", "UI design in Figma", "WordPress pages"],
        },
        {
          title: "Brand identity",
          text: "Colours, fonts and logo rules, collected in a Figma manual so the brand looks the same everywhere.",
          points: ["Palettes & typography", "Logo usage", "Figma brand manuals"],
        },
        {
          title: "Social & content",
          text: "Posts, stories and campaigns planned ahead and designed to match the brand.",
          points: ["Carousels & stories", "Campaign graphics", "Content calendars"],
        },
        {
          title: "Marketing support",
          text: "I talk to clients, check every detail before it goes out, and write Turkish copy.",
          points: ["Stakeholder coordination", "Visual QC & proofing", "Turkish copy & tone"],
        },
      ],
    },

    about: {
      title: "About me",
      leadBefore: "Born in Istanbul, based in Moravia, designing for brands ",
      leadAccent: "anywhere",
      leadAfter: ".",
      paragraphs: [
        "Before design, I spent five years running my own business teaching Turkish to clients all over the world. It taught me to listen carefully, explain things clearly and pay attention to tone and context. That's still how I approach design.",
        "Today I work as a marketing specialist at OnTarget in Brno, building brand systems, designing social content and keeping websites up to date for several clients. I learn quickly, research before I answer, and use AI tools every day to work smarter. I'm also learning Czech.",
      ],
      languagesLabel: "Languages",
      languages: [
        { name: "Turkish", level: "Native" },
        { name: "English", level: "Professional" },
        { name: "Czech", level: "Learning" },
      ],
      jobs: [
        {
          title: "Marketing Specialist",
          when: "Oct 2025 — Now",
          where: "OnTarget · Freelance · Brno, remote",
          text: "Create and publish social media content (graphics, copy and visuals) in Figma and Canva. Build, update and maintain website pages in WordPress, keeping content and layouts on brand. Use ChatGPT and Gemini to support content research and copywriting.",
        },
        {
          title: "Online Tutor",
          when: "Jan 2020 — Jan 2025",
          where: "TurkishwithZey · Freelance · Istanbul, remote",
          text: "Taught Turkish language and culture to international students online for five years. Ran the whole freelance business myself: scheduling, outreach and student relations.",
        },
        {
          title: "Sales & Social Media Coordinator",
          when: "Nov 2021 — Aug 2022",
          where: "Solita Jewels · Full-time · Istanbul",
          text: "Managed the brand's social media accounts and website, creating visual content and writing product copy. Matched customers to the right products, and prepared product certificates and product information.",
        },
      ],
      toolsLabel: "Tools",
      tools,
    },

    contactSection: {
      bigLines: ["Let's make", "something"],
      email: "Email",
      phone: "Phone",
      linkedin: "LinkedIn",
    },

    footerPlace: "South Moravia · Open to Brno",
  },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
