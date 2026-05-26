# Frontend

FlowMind AI frontend is a Vite React app built with Tailwind CSS, Framer Motion, React Router DOM, and Axios.

## Scripts

```bash
npm install
npm run dev
npm run build
```

## Vercel Deployment

Set this environment variable in Vercel:

```text
VITE_API_URL=https://your-flowmind-backend.onrender.com
```

Vercel should use:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- SPA rewrites: configured in `vercel.json`

## Architecture

- `src/api`: Axios client setup for future backend integration
- `src/animations`: shared Framer Motion variants
- `src/components`: reusable UI sections, cards, navigation, and workflow components
- `src/layouts`: app shell and responsive sidebar layout
- `src/pages`: route-level screens
- `src/styles`: global Tailwind theme styles
- `src/utils`: shared helpers

Backend integration is intentionally not wired yet. The current app is a polished dashboard foundation for the hackathon MVP.
