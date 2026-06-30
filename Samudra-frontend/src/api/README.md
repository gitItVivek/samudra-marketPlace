# API layer

Paths live in `paths.ts` — change them there when wiring the backend.

- `auth.ts` — register, login, Google OAuth, logout, email verification
- `client.ts` — shared `fetch` wrapper + `ApiError`

Set `VITE_API_BASE_URL` and `VITE_GOOGLE_CLIENT_ID` in `.env`.

Still to wire:

- `listings.ts` — GET /v1/listings, GET /v1/listings/:id, POST /v1/listings
- `profiles.ts` — GET /v1/profiles/:id
- `messaging.ts` — GET /v1/conversations/:id/messages
