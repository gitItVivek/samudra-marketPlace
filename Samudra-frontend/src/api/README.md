# API layer

Wire backend endpoints here when ready (`/v1/...`, no `/api` prefix).

- `listings.ts` — GET /v1/listings, GET /v1/listings/:id, POST /v1/listings
- `profiles.ts` — GET /v1/profiles/:id
- `messaging.ts` — GET /v1/conversations/:id/messages

Use `client.ts` and `VITE_API_BASE_URL` from `.env`.
