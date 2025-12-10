# Van Dyk Website (React/Vite) Documentation

## Overview
- Location: `G:\Interns\Ajith Srikanth\Van Dyk Website Final - V2`
- Stack: Vite + React 18 + TypeScript + TailwindCSS
- Purpose: Marketing/education site showcasing Van Dyk capabilities, case studies, and interactive sections (timeline, process flows, media).
- Deployment: Vercel (`vercel.json`, `.vercelignore`, `.vercel/`), static builds in `dist/`.

## Project Layout
| Path | Description |
| --- | --- |
| `src/App.tsx` | Top-level page composition (hero, navigation, sections). |
| `src/components/` | Reusable hero sections, cards, sliders, CTA blocks, navigation, timeline, FAQ accordions. |
| `src/pages/` | Legacy multi-page structure (if re-enabled). |
| `src/data/` | JSON/TS objects feeding content (service lists, testimonials, timelines). |
| `src/config/` | SEO metadata, navigation config. |
| `Images/` | Optimised media (webp/video). |
| `dist/` | Production build output. |
| `VDRS Website - 06192025/` | Older snapshot for reference. |

## Key Technologies
- TailwindCSS (via `tailwind.config.js` and PostCSS).
- Flowbite/Tailwind UI patterns for responsive design.
- Vite build pipeline (`vite.config.ts`).
- React hooks, framer-motion animations, Swiper carousels (check `package.json` for dependencies).
- Forms integrated with HubSpot or email (depending on `src/components/forms` usage).

## Development Scripts (`package.json`)
```bash
npm install
npm run dev        # Vite dev server
npm run build      # Optimised production build
npm run preview    # Preview production build locally
npm run lint       # ESLint (if configured)
```

## Deployment Flow
1. Update `.env` (if any environment-specific config required). Most content static.
2. Run `npm run build` → `dist/` folder.
3. Deploy via Vercel CLI or UI (config already present).
4. For manual hosting copy `dist/` to static server.

## Custom Sections (examples)
- **Hero**: `HeroSection` component with background video, CTA buttons.
- **Industries/Case Studies**: `CaseStudiesGrid`, `IndustriesCarousel` with data from `src/data/caseStudies.ts`.
- **Process Timeline**: `ProcessTimeline` plus `timelineData.ts`.
- **FAQ**: Accordion built with headless UI components.
- **Resources**: Integration of PDF downloads and embedded videos (YouTube/Vimeo).

## Styling / Theme
- Tailwind theme overrides for brand colours, fonts (see `tailwind.config.js`).
- Global styles in `src/index.css` (includes animations, CSS variables).
- Mobile-first layout tested across breakpoints (Tailwind classes). Ensure new components remain responsive.

## Assets
- `Images/` and `public/` contain compressed assets; prefer `.webp` for performance.
- Video backgrounds stored as `.mp4`—ensure compression for faster load.
- Use `src/utils/getAssetUrl` (if present) when referencing assets to work with Vite bundling.

## Next Steps / Improvements
- Add CMS integration (Contentful/Strapi) to manage content without rebuilds.
- Implement Lighthouse performance audits (optimise video lazy loading, code splitting).
- Add unit tests for interactive components (Jest/React Testing Library).
- Automate deployment pipeline (GitHub Actions -> Vercel).

Updated: November 2025  
Maintainer: Van Dyk Marketing Web Team

