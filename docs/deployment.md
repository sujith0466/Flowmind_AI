# Deployment Guide

FlowMind AI 2.0 is prepared for production deployment on:

- **Frontend:** Vercel
- **Backend:** Render
- **AI:** Google Gemini API (backend only — key is never exposed to the client)
- **Persistence:** Supabase (frontend direct connection via anon key)

Do not expose `GEMINI_API_KEY` in the frontend. The frontend communicates only with the public Render backend URL via `VITE_API_URL`.

## Production Flow

```text
Vercel React App (Browser)
→ Axios → VITE_API_URL (Render backend)
→ Flask → Research Agent + Planner Agent (Gemini API)
→ Structured JSON response
→ Dashboard renders workflow output, scores, and recommendations

Browser → Supabase JS Client (direct)
→ Anonymous session + workflows table
→ History persistence and Agent Memory context
```

## Step 1 — Deploy Backend to Render

**Project location:** `backend/`

**Render settings:**
- Runtime: Python
- Build command: `pip install -r requirements.txt`
- Start command: `gunicorn wsgi:app --bind 0.0.0.0:$PORT --workers 2 --timeout 120`
- Health check path: `/health`

**Alternatively, use the `render.yaml` blueprint** in the repo root — Render will auto-configure the service.

**Required environment variables in Render dashboard:**

```text
GEMINI_API_KEY=your_gemini_api_key_from_google_ai_studio
SECRET_KEY=replace-with-a-long-random-secret-string
FLASK_ENV=production
FLASK_DEBUG=false
FRONTEND_URL=https://your-flowmind-frontend.vercel.app
CORS_ORIGINS=https://your-flowmind-frontend.vercel.app
```

> **Note:** Set `FRONTEND_URL=http://localhost:5173` temporarily if deploying backend before the frontend URL is known. Update after Vercel deployment.

**Verify backend:**
```
GET https://your-flowmind-backend.onrender.com/health
→ { "success": true, "status": "healthy" }
```

---

## Step 2 — Deploy Frontend to Vercel

**Project location:** `frontend/`

**Vercel settings:**
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

**Required environment variables in Vercel dashboard:**

```text
VITE_API_URL=https://your-flowmind-backend.onrender.com
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> **Note:** If Supabase is not configured, the app still works — history and persistence features degrade gracefully.

The `frontend/vercel.json` SPA rewrite ensures `/dashboard`, `/results`, and `/history` work correctly on page refresh.

---

## Step 3 — Final CORS Update

After Vercel deployment:

1. Copy the Vercel production URL (e.g., `https://flowmind-ai-six.vercel.app`).
2. Update `FRONTEND_URL` and `CORS_ORIGINS` in Render to the Vercel URL.
3. Redeploy backend on Render.
4. Test full workflow end-to-end from the public Vercel URL.

---

## Recommended Deployment Order

1. Deploy backend to Render first.
2. Confirm `/health` returns healthy.
3. Set `VITE_API_URL` in Vercel to the Render URL.
4. Deploy frontend to Vercel.
5. Copy the Vercel URL. Update `FRONTEND_URL` + `CORS_ORIGINS` in Render.
6. Redeploy backend.
7. Test `/dashboard` end-to-end from the public Vercel URL in an incognito window.

---

## Production Safety Notes

- Keep `GEMINI_API_KEY` only in Render environment variables — never in the frontend.
- Keep `FLASK_DEBUG=false` in production.
- Keep CORS restricted to the Vercel URL only.
- The `render.yaml` lists `GEMINI_API_KEY`, `SECRET_KEY`, and `CORS_ORIGINS` as `sync: false` — set them manually in the Render dashboard.
- Use the backend health route to verify the service is warm before demo recording.
- Render free tier services sleep after inactivity — wake the backend up before the demo by visiting `/health`.
- Prepare one pre-generated workflow result as a backup in case of Render cold start during judging.
