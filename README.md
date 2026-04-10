# jm-portfolio-v2

Interactive portfolio with a BIOS-style boot sequence, then a 2D showcase (work, about, contact). Built with Vite, React, and TypeScript.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview   # optional local preview of dist/
```

## Deploy on Vercel (recommended)

1. Push this repo to GitHub (or GitLab / Bitbucket).
2. In [Vercel](https://vercel.com), create a **New Project** and import the repository.
3. Vercel should detect **Vite** automatically. Confirm:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
   - **Install command:** `npm install` (default)
4. No environment variables are required for this app.
5. Deploy. Every push to the connected branch triggers a new production build (unless you change Git settings).

[`vercel.json`](vercel.json) includes SPA-style rewrites so deep links keep working if you add client-side routes later.

Optional: attach a custom domain under the project’s **Settings → Domains**.

Set `og:url` and other absolute URLs in `index.html` once you know your production URL.

## Deploy (other static hosts)

`dist/` is plain static files.

- **Netlify:** build `npm run build`, publish `dist`.
- **S3 + CloudFront:** upload `dist/` contents; configure SPA fallback to `index.html` if you use client routing.

## Replay intro

After you complete the boot (Start, Skip, or Esc), the app sets `localStorage` key **`portfolio_intro_completed`** to `1`. The next visit opens the showcase directly.

**Replay boot intro** in the footer clears that key and returns to the boot sequence.

## Content

- Site copy, social links, bio: [`src/content/site.ts`](src/content/site.ts) — set `email` to a string to show a mailto line, or leave `null`.
- Resume (education, experience, certs, skills): [`src/content/resume.ts`](src/content/resume.ts)
- Projects and links: [`src/content/projects.ts`](src/content/projects.ts) — preview images live in [`public/projects/`](public/projects/) (referenced as `/projects/...` in each project’s `image` field).
