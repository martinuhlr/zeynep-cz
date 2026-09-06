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
| Kód | [github.com/martinuhlr/zeynep-cz](https://github.com/martinuhlr/zeynep-cz) | soukromý repo pod Martinovým GitHub účtem |
| Hosting/deploy | Vercel, projekt `zeynep-cz` | pod Martinovým osobním Vercel účtem, napojený na GitHub (push do `main` = automatický deploy) |
| Doména | `zeynep.cz` | registrovaná u WEDOS na Martinovo jméno, DNS ukazuje na Vercel |
| E-mail `ahoj@zeynep.cz` | WEDOS mail (Seznam Email Profi) | funguje nezávisle na webu, nic jsme na tom neměnili |
| Obsah stránky | `lib/i18n.ts` v repu | jméno, texty, kontakty, popisy projektů — vše na jednom místě, česky i anglicky vedle sebe |

## Co potřebuje Zeynep, aby mohla web sama spravovat

Tohle musí odsouhlasit/udělat Martin (nejde to udělat z tohoto sezení automaticky):

1. **GitHub** — buď přidat Zeynep jako collaboratora do `martinuhlr/zeynep-cz` (Settings →
   Collaborators), nebo repo převést na její vlastní GitHub účet (Settings → Transfer
   ownership). Collaborator je jednodušší a nemění vlastnictví.
2. **Vercel** — přidat Zeynep jako člena projektu (Project Settings → Members), nebo časem
   projekt přesunout do jejího vlastního Vercel týmu. Bez toho nemůže sama dělat manuální
   deploy ani vidět logy/analytics — ale auto-deploy z GitHubu jí půjde, jakmile bude mít
   push přístup do repa.
3. **Doména/DNS** — `zeynep.cz` zůstává registrovaná u WEDOS na Martina. Pokud bude Zeynep
   chtít sama měnit DNS (např. přidat e-mailovou službu, subdoménu apod.), potřebuje buď
   přístup do Martinova WEDOS účtu, nebo časem převod domény na její vlastní WEDOS účet.
   Než k tomu dojde, DNS změny bude muset dělat Martin na její žádost.
4. **Žádné hesla/klíče se nikam nekopírují** — web nepoužívá žádné API klíče ani proměnné
   prostředí, takže tady není co předávat.

## Jak to funguje pro každodenní úpravy

Až bude mít přístup do GitHubu, stačí:

```bash
git clone https://github.com/martinuhlr/zeynep-cz.git
cd zeynep-cz
npm install
npm run dev
```

Otevře se lokální verze na `http://localhost:3000`. Editace textů/kontaktů/projektů je
v jednom souboru — `lib/i18n.ts` (popsáno detailně v `CLAUDE.md`). Po commitu a pushi do
`main` se web sám nasadí na `zeynep.cz` během chvilky (žádný ruční krok navíc).

## Stav ke dni předání

- Web běží na `https://zeynep.cz`, `www.zeynep.cz` přesměrovává na hlavní doménu.
- SEO: metadata, sitemap, robots.txt, structured data — hotové pro obě jazykové verze.
- Lighthouse (mobil): výkon 93–96, SEO/přístupnost/best practices 100/100/100.
- Žádné otevřené resty ani rozpracované věci — web je hotový a funkční.
