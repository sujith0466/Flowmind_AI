# Deployment Checklist

Use this checklist to get FlowMind AI 2.0 publicly demo-ready quickly and safely.

## Pre-Deployment

- [ ] Confirm frontend build passes locally: `cd frontend && npm run build`
- [ ] Confirm backend starts cleanly locally: `cd backend && python run.py`
- [ ] Confirm `/health` returns `status: healthy` locally.
- [ ] Confirm `backend/.env` contains a valid `GEMINI_API_KEY` locally.
- [ ] Confirm no real `.env` files are committed to Git (`.gitignore` covers `.env` and `.env.*`).
- [ ] Confirm `frontend/.env.example` and `backend/.env.example` are placeholders only.
- [ ] Check `requirements.txt` has no Windows CRLF line endings (save as LF for Render/Linux).
- [ ] Check `Procfile` has no Windows CRLF line endings.

## Render Backend

- [ ] Create Render web service or use `render.yaml` blueprint from repo root.
- [ ] Set root directory to `backend` if configuring manually.
- [ ] Set build command: `pip install -r requirements.txt`.
- [ ] Set start command: `gunicorn wsgi:app --bind 0.0.0.0:$PORT --workers 2 --timeout 120`.
- [ ] Set health check path: `/health`.
- [ ] Add `GEMINI_API_KEY` (from Google AI Studio).
- [ ] Add `SECRET_KEY` (a long random string — not the default `flowmind-dev-secret`).
- [ ] Add `FLASK_ENV=production`.
- [ ] Add `FLASK_DEBUG=false`.
- [ ] Add temporary `FRONTEND_URL=http://localhost:5173` if Vercel URL is not ready yet.
- [ ] Deploy backend.
- [ ] Verify `GET /health` returns `{ "success": true, "status": "healthy" }`.

## Vercel Frontend

- [ ] Create Vercel project from the repository.
- [ ] Set root directory to `frontend`.
- [ ] Confirm build command is `npm run build`.
- [ ] Confirm output directory is `dist`.
- [ ] Add `VITE_API_URL=https://your-flowmind-backend.onrender.com`.
- [ ] Add `VITE_SUPABASE_URL=https://your-supabase-project.supabase.co`.
- [ ] Add `VITE_SUPABASE_ANON_KEY=your_supabase_anon_key`.
- [ ] Deploy frontend.
- [ ] Verify `/dashboard` loads publicly.
- [ ] Verify page refresh works on `/dashboard`, `/history` (SPA rewrites in `vercel.json`).

## Final CORS Pass

- [ ] Copy Vercel production URL (e.g. `https://flowmind-ai-six.vercel.app`).
- [ ] Set Render `FRONTEND_URL` to the Vercel URL.
- [ ] Set Render `CORS_ORIGINS` to the Vercel URL.
- [ ] Redeploy backend.
- [ ] Test full workflow generation from the public Vercel URL.

## Demo Safety

- [ ] Wake up Render backend by visiting `/health` 5 minutes before demo.
- [ ] Generate one complete workflow and save the TXT export as a backup.
- [ ] Capture screenshots of: landing page, dashboard input, loading state, workflow output.
- [ ] Test once in an incognito/private window to verify fresh session flow.
- [ ] Test shortly before recording or submitting.
- [ ] Keep Render backend URL and Vercel frontend URL ready for submission form.
