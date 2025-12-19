Local Connect Hub — Backend scaffold

This folder contains a minimal Node + Express scaffold that uses Supabase for data and auth.

Quick start

1. Copy `.env.example` to `.env` and set values.
2. From `backend/` run:

```bash
npm install
npm run dev
```

Endpoints

- `GET /health` — health check
- `GET /providers` — list providers
- `POST /providers` — create provider
- `GET /services` — list services
- `POST /services` — create service
- `POST /bookings` — create booking (availability check placeholder)
- `POST /payments/webhook` — payments webhook (Flutterwave) — expects raw body for verification

Next steps

- Wire authentication via Supabase on the frontend and backend.
- Implement detailed availability logic and provider schedules.
- Implement payment verification logic and commission calculations.
