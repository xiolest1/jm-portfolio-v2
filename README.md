# Portfolio (v2)

Personal portfolio site for **Joan Morillo** — a recruiter- and accessibility-minded presentation of background, projects, and contact paths. The experience is intentionally memorable: a short **BIOS-style boot sequence** (inspired by retro POST screens) leads into a **single-page showcase** with resume-style sections and project cards with imagery.

## Purpose

- **First impression:** A deliberate, engineering-flavored intro that signals attention to craft without sacrificing clarity.
- **Content:** About narrative, education, experience, certifications, technical skills, and featured projects with live links and previews.
- **Return visits:** Optional “skip intro” via `localStorage`, with a **Replay boot intro** control in the footer.
- **Motion:** Respects `prefers-reduced-motion` (shortened boot, static asteroid field).

## Planning and structure

```text
Boot sequence (fullscreen, skippable)
        → START / Skip / Esc
Showcase: hero + in-page nav
        → About (bio, education, experience, certs, skills)
        → Projects (grid, images, outbound links)
        → Contact (social + optional email)
```

Content is **data-driven** so copy and links stay easy to update without touching layout code:

| Area | File |
|------|------|
| Name, avatar, bio, socials | `src/content/site.ts` |
| Education, jobs, certs, skills | `src/content/resume.ts` |
| Projects + image paths | `src/content/projects.ts` |
| Static assets | `public/` (e.g. `profile.jpg`, `projects/*`) |

Visual layers: a **fixed canvas asteroid field** sits behind **frosted-glass-style** panels (boot + showcase) over a **warm cosmic gradient** on `body`.

## Tech stack

| Layer | Choice |
|--------|--------|
| UI | **React 19** (function components, hooks) |
| Language | **TypeScript** |
| Build / dev | **Vite 8** |
| Styling | **CSS Modules** + shared **CSS custom properties** in `src/index.css` |
| Background | **Canvas 2D** (`AsteroidField`) — lightweight, no extra dependencies |
| Lint | ESLint + TypeScript ESLint (dev) |

## Local development

```bash
npm install
npm run dev
```

```bash
npm run build    # production bundle in dist/
npm run preview  # serve dist/ locally
npm run lint
```

## Deployment

The site is a **static SPA** after `vite build`. **Vercel** works out of the box: import the Git repo, use build command `npm run build` and output directory `dist`. See [`vercel.json`](vercel.json) for SPA-friendly rewrites. Other hosts can publish `dist/` the same way.

No environment variables or server runtime are required.

## Intro preference (`localStorage`)

After you finish the boot flow once, the key **`portfolio_intro_completed`** is set to `1` so the next visit opens the showcase directly. **Replay boot intro** clears it for this browser.
