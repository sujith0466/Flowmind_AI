# Deployment Checklist

Use this checklist to get FlowMind AI publicly demo-ready quickly and safely.

## Pre-Deployment

- [ ] Confirm frontend build passes locally with `npm run build`.
- [ ] Confirm backend imports and health route work locally.
- [ ] Confirm `backend/.env` contains a valid `OPENAI_API_KEY` locally.
- [ ] Confirm no real `.env` files are committed.
- [ ] Confirm `frontend/.env.production.example` and `backend/.env.production.example` are placeholders only.

## Render Backend

- [ ] Create Render web service or use `render.yaml` blueprint.
- [ ] Set root directory to `backend` if configuring manually.
- [ ] Set build command: `pip install -r requirements.txt`.
- [ ] Set start command: `gunicorn wsgi:app --bind 0.0.0.0:$PORT --workers 2 --timeout 120`.
- [ ] Set health check path: `/health`.
- [ ] Add `OPENAI_API_KEY`.
- [ ] Add `SECRET_KEY`.
- [ ] Add `FLASK_ENV=production`.
- [ ] Add `FLASK_DEBUG=false`.
- [ ] Add temporary `FRONTEND_URL=http://localhost:5173` if Vercel URL is not ready yet.
- [ ] Deploy backend.
- [ ] Verify `/health` returns `status: healthy`.

## Vercel Frontend

- [ ] Create Vercel project from the repo.
- [ ] Set root directory to `frontend`.
- [ ] Confirm build command is `npm run build`.
- [ ] Confirm output directory is `dist`.
- [ ] Add `VITE_API_URL=https://your-flowmind-backend.onrender.com`.
- [ ] Deploy frontend.
- [ ] Verify `/dashboard` loads publicly.
- [ ] Verify refresh works on `/dashboard` because of `vercel.json` rewrites.

## Final CORS Pass

- [ ] Copy Vercel production URL.
- [ ] Set Render `FRONTEND_URL` to the Vercel URL.
- [ ] Set Render `CORS_ORIGINS` to the Vercel URL.
- [ ] Redeploy backend.
- [ ] Test public dashboard workflow generation.

## Demo Safety

- [ ] Save one successful generated workflow as backup text.
- [ ] Capture screenshots of dashboard input, loading state, and final output.
- [ ] Test once in an incognito/private window.
- [ ] Test shortly before recording or submitting.
- [ ] Keep Render backend URL and Vercel frontend URL ready for submission.
