# Deployment Guide — Local Connect Hub

This document lists minimal steps to deploy the frontend and backend and the environment variables required.

Environment (required)
- `SUPABASE_URL` — your Supabase project URL
- `SUPABASE_KEY` — server key used by backend (service role or server key)
- `SUPABASE_SERVICE_ROLE_KEY` — (optional) service role key for migrations or admin tasks
- `FLUTTERWAVE_SECRET_KEY` — Flutterwave secret used for webhook verification
- `FLUTTERWAVE_PUBLIC_KEY` — Flutterwave public/client id

Frontend (recommended: Vercel / Netlify)
1. Add project to Vercel (or Netlify) connected to this repository.
2. Set environment variables in the platform using values above (prefix public keys with `VITE_` if needed, e.g. `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
3. Build command: `npm run build`. Output directory: `dist` (Vite default)

Backend (recommended: Heroku / Render / Docker)
- Option A (Platform-as-a-Service):
  1. Create a Node service and set `PORT` to desired port (defaults to 3000).
  2. Add environment variables from the list above in the service settings.
  3. Deploy using the repository; the backend `start` script runs `node src/index.js`.

- Option B (Docker):
  1. Create a `Dockerfile` that installs Node, copies `backend/` and runs `npm ci && npm start` in the `backend` folder.
  2. Use `docker run -e SUPABASE_URL=... -e SUPABASE_KEY=... -p 3000:3000 <image>` to run.

Webhooks and Secrets
- Configure your payment provider (e.g. Flutterwave) webhook endpoint to point to `https://<your-backend>/api/payments/webhook` or appropriate route.
- Add the provider secret to `FLUTTERWAVE_SECRET_KEY` so the backend can verify signatures.

CI
- The repository contains a GitHub Actions workflow in `.github/workflows/ci.yml` which runs lint/build for the frontend and lint/tests for the backend.

Notes
- Do not commit real secrets. Use the `.env.example` as reference and add `.env` or configure secrets in your hosting platform.
- Ensure Supabase RLS policies and migrations are applied before production traffic.
