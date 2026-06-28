# HASSAN — Portfolio

A simple, fast, call-to-action–focused one-page portfolio for **Hassan**, bilingual emcee & host. Built with React + Vite and styled to the HASSAN brand guidelines (minimal / modern · ink + paper + Signal blue · Space Grotesk / Inter / IBM Plex Sans Arabic).

## Run it

```bash
npm install
npm run dev        # local dev server
npm run build      # production build → /dist
npm run preview    # preview the production build
```

Requires Node 18+.

## Make it yours (no component edits needed)

Everything you'll normally change lives in two data files:

| Want to change… | Edit |
| --- | --- |
| Headline, nav, highlights, about, booking details | `src/data/site.js` |
| The 3 projects (add/remove/reorder) | `src/data/projects.js` |
| Brand colours, fonts, spacing, radius | `src/index.css` (`:root` tokens) |

### Add your media
Drop files into `public/media/` — see `public/media/README.txt`:
- `hero.mp4` + `hero-poster.jpg` → hero background video
- `projects/*.jpg` → project images (branded placeholders show until then)

### Fill in booking info
In `src/data/site.js → contact`, add `email` and `phone`. The primary button
automatically links to email (falling back to Instagram), and the placeholders disappear.

## Structure

```
src/
  data/            # ← content & projects (edit here)
    site.js
    projects.js
  components/       # one folder-free component + its CSS module each
    Hero · Nav · Wordmark · Highlights
    Projects · ProjectCard
    About · Contact · Footer
    ArrowButton · Icon
  index.css         # design tokens + base
  App.jsx
```

Design notes:
- **Tokens, not magic numbers** — colours/spacing/type come from CSS variables in `index.css`.
- **Data-driven** — sections render from `site.js` / `projects.js`, so scaling content never means touching JSX.
- **CSS Modules** — styles are scoped per component; no global collisions.
- **Accessible & responsive** — semantic landmarks, focus styles, reduced-motion support, mobile-first.
