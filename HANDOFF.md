# Předání webu zeynep.cz

Tenhle dokument je pro Zeynep (a její Claude Code) — shrnuje, co web je, kde všude žije a co
je potřeba k tomu, aby si ho mohla dál sama upravovat. Technický popis kódu je v `CLAUDE.md`
vedle tohohle souboru — Claude Code si ho při práci v tomhle repu načte automaticky.

## Co web je

Jednostránková vizitka/portfolio — jméno, kontakty (LinkedIn, telefon, e-mail) a dva
odkazované projekty (Vinařství Kosík, Penzion u Kosíků). Česky/anglicky podle jazyka
prohlížeče, s ručním přepínačem CZ/EN. Postavené v Next.js, hostované na Vercelu.

## Kde to všechno je

| Co | Kde | Poznámka |
|---|---|---|
| Kód | [github.com/martinuhlr/zeynep-cz](https://github.com/martinuhlr/zeynep-cz) | veřejný repo pod Martinovým GitHub účtem, Zeynep je collaborator |
| Hosting/deploy | Vercel, projekt `zeynep-cz` | v Martinově Vercel týmu OnTarget, napojený na GitHub (push do `main` = automatický deploy) |
| Doména | `zeynep.cz` | registrovaná u WEDOS na Martinovo jméno, DNS ukazuje na Vercel |
| E-mail `ahoj@zeynep.cz` | WEDOS mail (Seznam Email Profi) | funguje nezávisle na webu, nic jsme na tom neměnili |
| Obsah stránky | `lib/i18n.ts` v repu | jméno, texty, kontakty, popisy projektů — vše na jednom místě, česky i anglicky vedle sebe |

## Co potřebuje Zeynep, aby mohla web sama spravovat

Zeynep nasazuje web **pushem do větve `main` na GitHubu**. Vercel účet k tomu nepotřebuje:
repo je veřejné a Vercel nasadí každý commit, který se v `main` objeví.

1. **GitHub** — Zeynep je collaborator v `martinuhlr/zeynep-cz`. Pozvánku od Martina musí
   jednou přijmout (přijde e-mailem, nebo na [github.com/notifications](https://github.com/notifications)).
2. **Vercel** — přístup nemá a nepotřebuje. Projekt zůstává v Martinově týmu. Build logy,
   nastavení projektu a rollback z dashboardu proto vidí a dělá jen Martin.
3. **Doména/DNS** — `zeynep.cz` zůstává registrovaná u WEDOS na Martina. DNS změny (e-mailová
   služba, subdoména apod.) dělá Martin na její žádost.
4. **Žádná hesla ani klíče** — web nepoužívá API klíče ani proměnné prostředí, není co předávat.

## První spuštění u Zeynep (jednou)

1. Nainstalovat [Node.js](https://nodejs.org) (LTS), [GitHub CLI](https://cli.github.com)
   a [Claude Code](https://claude.com/claude-code).
2. Přijmout pozvánku do repa na GitHubu.
3. V terminálu:

```bash
gh auth login                      # přihlášení ke GitHubu, stačí odklikat v prohlížeči
gh repo clone martinuhlr/zeynep-cz
cd zeynep-cz
npm install
claude                             # spustí Claude Code v této složce
```

## Nasazení nového designu z Claude Design

1. V Claude Design návrh exportovat jako handoff pro Claude Code (stáhne se složka
   s `README.md` a podsložkou `project/`) a tu přesunout do `zeynep-cz/_handoff/`.
2. V Claude Code (spuštěném ve složce `zeynep-cz`) napsat třeba:
   *„V `_handoff/` je nový design z Claude Design. Předělej podle něj web a nasaď ho."*
3. Claude si sám načte skill `deploying-zeynep-cz` (je součástí repa), design přenese do webu,
   ukáže ho lokálně na `http://localhost:3000` a zeptá se, jestli ho má zveřejnit.
4. Po potvrzení ho pushne do `main` a ověří, že nová verze na `https://zeynep.cz` opravdu běží.

Drobné úpravy textů, kontaktů a projektů fungují stejně: říct Claudovi, co změnit. Všechen
obsah je v jednom souboru `lib/i18n.ts` (detailně v `CLAUDE.md`).

**Pozor:** `main` je rovnou produkce, žádná zkušební verze mezi tím není. Co se pushne, je
do minuty na webu. Když se něco pokazí, Claude umí poslední změnu vrátit (`git revert`).

## Stav ke dni předání

- Web běží na `https://zeynep.cz`, `www.zeynep.cz` přesměrovává na hlavní doménu.
- SEO: metadata, sitemap, robots.txt, structured data — hotové pro obě jazykové verze.
- Lighthouse (mobil): výkon 93–96, SEO/přístupnost/best practices 100/100/100.
- Žádné otevřené resty ani rozpracované věci — web je hotový a funkční.
