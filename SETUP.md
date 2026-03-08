# Portfolio Setup Guide

## Why the Black Screen Happened

The repo was serving the **source** `index.html` directly.
That file references `/src/index.tsx` — a TypeScript file browsers cannot run.

Vite replaces that reference with compiled/hashed JS during `npm run build`, but only in the `dist/` folder. The repo root still had the old source file.

The two fixes below solve this permanently.

---

## Option A — Recommended: GitHub Actions (Auto-Deploy)

Every time you `git push`, GitHub builds and deploys automatically.
You never need to run a deploy command manually.

### One-Time Setup (5 minutes)

**Step 1 — Push this repo with the new files:**
```bash
git add .
git commit -m "fix: add github actions deploy"
git push origin main
```
The Actions workflow will immediately run and create a `gh-pages` branch.

**Step 2 — Set GitHub Pages source to `gh-pages` branch:**
1. Go to your repo on GitHub
2. Click **Settings → Pages** (left sidebar)
3. Under "Branch", select `gh-pages` and folder `/` (root)
4. Click **Save**

Wait ~60 seconds, then visit https://kpkaustubhkp.github.io

**That's it.** From now on just push your changes — no manual deploy step.

---

## Option B — Manual Deploy (no GitHub Actions)

If you don't want GitHub Actions, run this whenever you want to deploy:

```bash
npm run deploy
```

This builds the project and commits the compiled output to the repo root.
GitHub Pages is served directly from the `main` branch root.

### Setup for Option B:
1. Go to **Settings → Pages**
2. Set Branch: `main`, Folder: `/` (root)
3. Click **Save**

---

## Day-to-Day Development Workflow

### First time (clone fresh or new machine):
```bash
npm install
```

### Run dev server locally (hot reload):
```bash
npm run dev
```
Opens at http://localhost:5173

### Preview the production build locally:
```bash
npm run build
npm run preview
```
Opens at http://localhost:4173 — this is exactly what GitHub Pages serves.

### Deploy (Option A — push changes):
```bash
git add .
git commit -m "feat: describe your change"
git push
```
GitHub Actions builds and deploys automatically.

### Deploy (Option B — manual):
```bash
npm run deploy
```

---

## Making Content Changes

All portfolio content lives in **one file**:
```
src/data/content.ts
```

To update anything — bio, projects, timeline, blog posts — edit only that file.

### Add a blog post:
```ts
// In src/data/content.ts → BLOG_POSTS array:
{
  id: 4,
  title: 'Your Post Title',
  date: 'March 2026',
  tags: ['VLSI', 'Analog'],
  summary: 'One paragraph summary...',
  readTime: '5 min',
  link: 'https://your-blog-url.com',   // optional — omit for "coming soon"
},
```

### Add a project:
Add an entry to `PROJECTS` in `content.ts`. Status options:
`'ONGOING' | 'PUBLISHED' | 'BUILT' | 'RESEARCH' | 'AWARD WINNING'`

---

## File Structure

```
.
├── index.html                    ← Vite entry (do not edit script tag)
├── vite.config.ts                ← Build config
├── package.json                  ← Dependencies & scripts
├── .github/workflows/deploy.yml  ← Auto-deploy CI
├── scripts/deploy.mjs            ← Manual deploy helper
└── src/
    ├── index.tsx                 ← React entry point
    ├── App.tsx                   ← Splash ↔ Portfolio routing
    ├── data/
    │   └── content.ts            ← ✏️  EDIT THIS for all content
    ├── components/
    │   ├── Portfolio.tsx         ← Main page layout
    │   ├── InteractiveTerminal.tsx
    │   ├── Timeline.tsx
    │   ├── ProjectCard.tsx
    │   ├── Splash.tsx
    │   └── ...
    └── utils/
        └── sounds.ts
```

---

## Terminal Easter Eggs

Type these in the terminal on the home page:

| Command | Effect |
|---------|--------|
| `love` | Rose/pink mode for 8s |
| `hate` | Restore normal colors |
| `matrix` | Matrix green filter for 10s |
| `exit matrix` | Escape the matrix |
| `coffee` | ASCII coffee |
| `hack` | Fake hacking sequence |
| `vim` | Trapped in vim joke |
| `:q!` | Escape vim |
| `git log` | Funny fake commits |
| `git diff` | Life changes |
| `fortune` | Random engineering quote |
| `cowsay hello` | ASCII cow |
| `man kp` | Manual page |
| `ping kp` | Ping Kaustubh |
| `top` | Fake system monitor |

Tab autocomplete works. Arrow keys cycle history.
