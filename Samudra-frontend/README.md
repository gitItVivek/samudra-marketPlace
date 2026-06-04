# Samudra Frontend

Community-first P2P marketplace UI — Vite + React + TypeScript.

## Quick start

```bash
cd samudra-frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

```bash
npm run build    # production build
npm run preview  # preview production build
```

## Environment

Copy `.env.example` to `.env`:

```
VITE_API_BASE_URL=http://localhost:8080
```

Backend APIs are not wired yet; screens use mock data under `src/features/*/mock.ts`.

## Design screens

Reference PNGs (not bundled):

| File | Route |
|------|-------|
| screen1.png | `/` Home |
| screen2.png | `/listings/:listingId` |
| screen3.png | `/sell` Post listing (step 2) |
| screen4.png | `/chats/:conversationId` |
| screen5.png | `/profiles/:profileId` |
| facebookMarketPlace screeen.png | `/` Grid feed (toggle) |

**Feed views (home):** **Discover** (sections) vs **Grid** (marketplace-style dense grid + See more). Toggle on desktop nav (next to Sell) or mobile feed toolbar.

**Communities:** `/communities`, `/communities/:communityId` — suggested on both feeds, See all to browse & join.

## Project structure

```text
src/
  app/           # Router, providers
  api/           # HTTP client (wire /v1/ later)
  features/      # home, listing, messaging, identity, browse, profile
  shared/        # Layout, reusable components, types, utils
  styles/        # tokens.css, global.css
```

## Responsive layout

- **Mobile (&lt;1024px):** Bottom navigation, 2-column listing grids (design-screen layout).
- **Tablet (768px+):** Wider grids (3 columns on home).
- **Desktop (1024px+):** Full-width shell up to **1280px** (1400px on very wide screens), top **DesktopNav** (replaces bottom nav), 4–5 column grids, listing detail **two-column** (gallery + info).
- **Wide (1440px+):** Up to 5–6 columns on home/profile grids.

## Principles

- Feature-based modules — no flat component dump
- Mock data until backend `/v1/` endpoints exist
- No payment/checkout UI
