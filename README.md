# zeynep.cz

Portfolio site for Zeynep Uhlir — Marketing & Web Designer. Built with Next.js (App Router) and deployed on Vercel.

## Stack

- Next.js 16 (App Router, Turbopack)
- TypeScript
- Tailwind CSS v4
- Bilingual (cs/en) via a lightweight `/[locale]` route, no i18n library

## Language detection

`proxy.ts` redirects `/` to `/cs` or `/en` based on the visitor's `Accept-Language` header (falls back to `cs`) and remembers the choice in a `NEXT_LOCALE` cookie. Both locales are real, separately indexable, server-rendered routes — the manual CZ/EN switch in the header just links between them.

## SEO

- Per-locale metadata, canonical + hreflang alternates (`app/[locale]/layout.tsx`)
- `Person` JSON-LD
- Generated OG image, favicon, and Apple touch icon (`app/icon.tsx`, `app/apple-icon.tsx`, `app/[locale]/opengraph-image.tsx`)
- `app/robots.ts` + `app/sitemap.ts`

## Development

```bash
npm install
npm run dev
```

## Deployment

Deployed on Vercel from the `main` branch. Run the `predeploy-check` skill before any production deploy.
