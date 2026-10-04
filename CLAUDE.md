@AGENTS.md

# CLAUDE.md

Guidance for Claude Code when working in this repo. `AGENTS.md` (imported above, auto-generated
by `create-next-app`) has Next.js 16-specific breaking-change notes — read it before assuming
anything about Next.js APIs from training data.

## What this is

Portfolio/vizitka site for Zeynep Uhlir (Marketing & Web Designer). One page, two languages, deployed on Vercel at **zeynep.cz**.

## Stack

- Next.js 16 (App Router, Turbopack)
- TypeScript
- Tailwind CSS v4 (utility classes, no separate component library)
- No database, no backend, no env vars — fully static content, server-rendered per request

## How it's structured

```
app/
  [locale]/
    layout.tsx          # <html>/<body>, fonts, per-locale <head> metadata, JSON-LD
    page.tsx             # the whole page (hero card + projects grid)
    opengraph-image.tsx  # generated OG image per locale
  icon.tsx, apple-icon.tsx  # generated favicon / apple touch icon
  robots.ts, sitemap.ts
  globals.css
proxy.ts                 # redirects "/" -> "/cs" or "/en" by Accept-Language, sets a cookie
lib/i18n.ts               # ALL text content + contact info + project data lives here
components/LangSwitch.tsx # the CZ/EN pills in the top-right corner
components/Sparkle.tsx    # the little 4-point star decoration
public/images/            # project thumbnails (webp)
```

**There is no CMS.** To change any text, contact info, or project data, edit `lib/i18n.ts` — it's the single source of truth, with a `cs` and `en` object side by side.

## Editing content

- **Name / hero text**: `contact` object in `lib/i18n.ts`.
- **Contact pills** (LinkedIn/phone/email): also `contact` in `lib/i18n.ts`. Phone/email format matters — `phoneHref` needs a `tel:` link with no spaces, `phoneDisplay` is what's shown.
- **Project cards**: `projects` array in `lib/i18n.ts` (name, external link, image path) + `projectDesc`/`projectAlt` per locale in the `dictionaries` object.
- **Project images**: drop a new file in `public/images/`, reference it from the `projects` array. Keep them as `.webp`, landscape-ish (they're shown at a fixed 160px height with `object-fit: cover`, so exact aspect ratio doesn't matter much).
- **Adding a project**: add an entry to `projects` in `lib/i18n.ts`, plus a matching `projectDesc`/`projectAlt` entry for both `cs` and `en` — TypeScript will tell you if you miss one (the dictionary type is derived from the `projects` list).
- **Colors/fonts**: the palette is inline Tailwind arbitrary values (`bg-[oklch(0.5_0.16_35)]` etc.) directly in `app/[locale]/page.tsx` — there's no separate design-token file. Caveat (headline) and Poppins (body) are loaded via `next/font/google` in `app/[locale]/layout.tsx`.

## i18n / language detection

Two locales only: `cs` (default) and `en`. `proxy.ts` picks a locale from the `Accept-Language` header on first visit to `/`, redirects to `/cs` or `/en`, and remembers the choice in a `NEXT_LOCALE` cookie. Both routes are real, separately indexable pages — not client-side-only switching. If you ever add a third locale, update `locales` in `lib/i18n.ts` and add a `dictionaries` entry; everything else (metadata, sitemap, hreflang) derives from that list automatically.

Next.js 16 renamed `middleware.ts` to `proxy.ts` (same mechanism, new file name/export name) — don't rename it back.

## SEO (already wired up, don't remove)

- Per-locale `<title>`/description/canonical/hreflang in `generateMetadata` (`app/[locale]/layout.tsx`)
- `Person` JSON-LD (same file)
- `app/robots.ts` + `app/sitemap.ts` — both derive from `locales`/`siteUrl` in `lib/i18n.ts`
- Generated OG image, favicon, apple-icon — pure code (`ImageResponse`), no static image files to keep in sync

If you change `contact.name` or add a locale, these all update automatically — no need to touch them separately.

## Local development

```bash
npm install
npm run dev      # if port 3000 is already busy: PORT=3100 npm run dev
npm run lint
npm run build     # do this before every deploy — catches most issues
```

## Deployment

- **Git**: push to `main` on GitHub → Vercel auto-deploys to production (project is Git-linked). This is the only deploy path for Zeynep — follow the `deploying-zeynep-cz` skill (`.claude/skills/`).
- **Access**: the Vercel project lives in Martin's `ontarget` team (Pro). Zeynep is a GitHub collaborator only, with no Vercel seat; the repo is public so her commits deploy without one.
- **Manual deploy** (Martin only): `vercel --prod` from this directory.
- **Domain**: `zeynep.cz` (apex) is canonical; `www.zeynep.cz` 308-redirects to it automatically (Vercel-managed). DNS is at WEDOS — apex `A` record → `216.198.79.1`, `www` is a Vercel-managed `CNAME`. Email (MX) for `ahoj@zeynep.cz` is separate and untouched by any of this.
- There are no environment variables to configure — the build reads nothing from `process.env`.

## Conventions

- Keep it simple: this is a one-page site, resist adding a CMS/database/auth for it unless the scope genuinely grows.
- All copy lives in `lib/i18n.ts`, not scattered across components — keep it that way so both languages stay in sync.
- Run `npm run build` before considering any change done — it's fast and catches broken metadata/types immediately.
