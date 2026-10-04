---
name: deploying-zeynep-cz
description: Use when Zeynep wants a new design or content change live on zeynep.cz — a Claude Design handoff bundle to implement, "nasaď web", "deploy", "publish my design", "dej to na web", a pushed change that is not showing on the live site, a red Vercel status on a commit, or any urge to run a `vercel` command in this repo.
---

# Deploying zeynep.cz

## Overview

**Deploy = `git push` to `main`.** Nothing else. Vercel watches the GitHub repo and puts every
commit on `main` live on https://zeynep.cz within about a minute.

Zeynep is a GitHub collaborator on `martinuhlr/zeynep-cz`. She has **no Vercel account access** —
the Vercel project lives in Martin's team. So in this repo:

- Do not run `vercel`, `vercel --prod`, `vercel login`, `vercel link`. They fail or deploy somewhere else.
- Do not ask for a Vercel token. It is not needed.
- Vercel links (deployment pages, preview URLs) sit behind a Vercel login she does not have. Do not send her there.

Talk to Zeynep in the language she writes in. She is a designer, not a developer: say what
changed and what she will see, skip the tooling details.

## One-time setup

Run these checks before the first deploy on a machine; fix what fails.

| Check | Command | Needed result |
|---|---|---|
| GitHub login | `gh auth status` | logged in as Zeynep's account (`gh auth login` if not) |
| Push access | `gh api repos/martinuhlr/zeynep-cz --jq .permissions.push` | `true` — if `false`, she must accept Martin's invite at github.com/notifications |
| Repo | `gh repo clone martinuhlr/zeynep-cz` | then `npm install` |
| Commit identity | `git config user.email` | an email verified on her GitHub account |
| Node | `node -v` | 20.9 or newer (Vercel builds on 24) |

## Implementing a Claude Design bundle

1. Put the exported bundle into `_handoff/` (git-ignored — it never gets committed).
2. Read the bundle's `README.md`, then the main `.dc.html` file top to bottom, plus everything it imports.
3. Rebuild the design inside the existing Next.js app. The bundle is a prototype — do not copy its
   HTML/JS into the repo.

Read `CLAUDE.md` and `AGENTS.md` first (Next.js 16 differs from what you remember). Then hold these lines:

- **Every visible text goes into `lib/i18n.ts`, in both `cs` and `en`.** A design usually comes in
  one language; write the other one and show Zeynep the translation.
- **Both `/cs` and `/en` must render the new design.**
- **Keep the SEO wiring**: `generateMetadata`, JSON-LD, `robots.ts`, `sitemap.ts`, `opengraph-image.tsx`, icons, `proxy.ts`.
- **Images**: `.webp` in `public/images/`, referenced from `lib/i18n.ts`. Convert with the `sharp` that ships in `node_modules`:
  `node -e "require('sharp')('in.png').webp({quality:82}).toFile('public/images/out.webp')"`
- **Fonts**: load them with `next/font/google` in `app/[locale]/layout.tsx`, the way Caveat and Poppins are loaded now. No `<link>` tags.
- **Colors in `opengraph-image.tsx`, `icon.tsx`, `apple-icon.tsx` must be hex.** `oklch()` breaks the build there.
- **Tailwind v4**: a plain rule in `globals.css` (`a { color: … }`) beats utility classes. Put custom CSS in `@layer base`.
- If the new look changes the brand colors, update the OG image and icons to match.

## Deploy flow

`main` is production. There is no staging and no preview she can open, so the local check is the
only check.

1. Work on a branch: `git switch -c design/<short-name>`.
2. `npm run lint && npm run build` — both must pass. A build that fails locally fails on Vercel.
3. `npm run dev` and look at `/cs` and `/en`, at phone width (375px) and desktop. Use `PORT=3100 npm run dev` if 3000 is busy.
4. Show Zeynep the result and get an explicit "yes, publish it". Being in a hurry does not replace the yes.
5. Commit and publish:
   ```bash
   git add -A && git commit -m "<what changed>"
   git switch main && git pull
   git merge --no-ff design/<short-name>
   git push origin main
   ```
6. Verify — see below. The deploy is not done until both checks pass.

## Verify the deploy

```bash
# 1. Vercel's verdict on the commit: pending -> success | failure (poll every ~20 s, up to 3 min)
gh api repos/martinuhlr/zeynep-cz/commits/$(git rev-parse HEAD)/status \
  --jq '.statuses[] | select(.context=="Vercel") | .state'

# 2. The live site really serves the new version — grep for a string that only the new design has
curl -s https://zeynep.cz/cs | grep -c "<unique new text>"
curl -s -o /dev/null -w "%{http_code}\n" https://zeynep.cz/en   # 200
```

Then tell Zeynep it is live and to hard-refresh (Cmd+Shift+R).

## When it goes wrong

| Symptom | Cause | Fix |
|---|---|---|
| Status `failure` | Build broke on Vercel. Logs are not visible to her. | Re-run `npm run build` on a clean checkout of `main` (`rm -rf .next node_modules && npm ci`), fix, push again. |
| No `Vercel` status at all after 3 min | Vercel did not accept the commit | Check `git log -1 --format=%ae` is an email verified on her GitHub. If it is, this is Martin's to fix — send him the commit SHA. |
| `git push` rejected (403 / permission) | Invite not accepted, or wrong GitHub account | `gh auth status`, accept the invite. |
| `git push` rejected (non-fast-forward) | Martin pushed in the meantime | `git pull --rebase origin main`, rebuild, push. Never force-push `main`. |
| Live site looks broken | Bad commit is in production | `git revert <sha> && git push origin main` — a revert redeploys the previous version. |

**Only Martin can do these** — stop and ask him, do not look for a workaround: domain and DNS
(`zeynep.cz`, e-mail `ahoj@zeynep.cz`), Vercel project settings, environment variables, build
logs, a rollback from the Vercel dashboard.
