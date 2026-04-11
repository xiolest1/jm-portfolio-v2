# Portfolio v2

Hi. This repo is my personal site. It opens with a fake BIOS boot screen because I grew up watching machines POST and I still think that little moment of “the computer is waking up” feels honest. After that you get the normal stuff: who I am, what I studied, where I worked, certs, skills, and projects with real screenshots and links.

If you are here to hire or review work, skim the showcase and click through the demos. If you are here to fork or borrow ideas, the content lives in plain TypeScript files so you are not hunting through JSX to fix a typo.

## What it does

The first screen pretends to be firmware: lines scroll, fake resources load, then you hit Start (or skip with Esc if you are in a hurry). The main page is one long scroll with anchors for About, Projects, and Contact. Project cards pull images from `public/` and send people out to GitHub or live demos.

Come back later and the intro can auto skip. I stash a flag in `localStorage` (`portfolio_intro_completed`). The footer has “Replay boot intro” if you want the drama again. If your OS asks for reduced motion, the boot shortens and the floating rocks in the background freeze. That is not an afterthought; nobody should get seasick from a portfolio.

## How it is laid out

```
Boot  →  Start / Skip / Esc
Showcase  →  hero, then About, Projects, Contact
```

Most copy is not buried in components. Edit these and you are done:

| What you are changing | Open this |
|------------------------|-----------|
| Name, photo, bio, social links | `src/content/site.ts` |
| School, jobs, certificates, skills | `src/content/resume.ts` |
| Projects, thumbnails, URLs | `src/content/projects.ts` |
| Images on disk | `public/` (`profile.jpg`, `projects/…`) |

Behind the UI there is a canvas layer with slow drifting “asteroids” and a warm gradient on the body. The panels on top use blur and transparency so you still see a hint of motion without fighting the text.

## Stack (the boring but useful part)

React 19 and TypeScript, Vite for dev and builds, CSS Modules plus a shared token file in `src/index.css`. The space junk is hand rolled Canvas 2D, no extra animation library. ESLint keeps me from shipping obvious footguns during refactors.

## Run it locally

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
npm run lint
```

## Ship it

`npm run build` drops a static site into `dist/`. I deploy on Vercel: connect the repo, build command `npm run build`, output `dist`. [`vercel.json`](vercel.json) has SPA style rewrites if routes grow later. No secrets, no server, no env vars to remember.

## That intro flag again

Finish the boot once and this browser remembers. Clear it anytime with **Replay boot intro** in the footer. The key name is `portfolio_intro_completed` if you are poking around in devtools.

Thanks for reading. If something looks off, open an issue or message me on the links in the site.
