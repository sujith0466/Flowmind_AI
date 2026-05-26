# Deployment

FlowMind AI is prepared for a simple hackathon production deployment:

- Frontend: Vercel
- Backend: Render
- AI: OpenAI API through backend only

Do not expose `OPENAI_API_KEY` in the frontend. The frontend should only know the public Render backend URL through `VITE_API_URL`.

## Production Flow

```text
Vercel React app
-> Axios VITE_API_URL
-> Render Flask API
-> OpenAI Research Agent + Planner Agent
-> Structured JSON response
-> Dashboard renders workflow output
```

## Frontend: Vercel

Project location:

```text
frontend/
```

Vercel settings:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

Environment variable:

```text
VITE_API_URL=https://your-flowmind-backend.onrender.com
```

Deployment files:

- `frontend/vercel.json`
- `frontend/.env.production.example`

The Vercel config includes a SPA rewrite so `/dashboard`, `/results`, and `/history` work on refresh.

## Backend: Render

Project location:

```text
backend/
```

Render settings:

- Runtime: Python
- Build command: `pip install -r requirements.txt`
- Start command: `gunicorn wsgi:app --bind 0.0.0.0:$PORT --workers 2 --timeout 120`
- Health check path: `/health`

Environment variables:

```text
FLASK_ENV=production
FLASK_DEBUG=false
SECRET_KEY=replace-with-a-long-random-secret
FRONTEND_URL=https://your-flowmind-frontend.vercel.app
CORS_ORIGINS=https://your-flowmind-frontend.vercel.app
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4.1-mini
OPENAI_TEMPERATURE=0.2
```

Deployment files:

- `backend/wsgi.py`
- `backend/Procfile`
- `backend/.python-version`
- `backend/.env.production.example`
- `render.yaml`

## Recommended Deployment Order

1. Deploy backend to Render first.
2. Confirm `https://your-backend.onrender.com/health` returns healthy JSON.
3. Add the Render backend URL to Vercel as `VITE_API_URL`.
4. Deploy frontend to Vercel.
5. Add the Vercel URL to Render as `FRONTEND_URL` and `CORS_ORIGINS`.
6. Redeploy backend after updating CORS.
7. Test `/dashboard` end-to-end from the public Vercel URL.

## Production Safety Notes

- Keep `OPENAI_API_KEY` only in Render.
- Keep `FLASK_DEBUG=false` in production.
- Keep CORS restricted to the Vercel URL.
- Use the backend health route before demo recording.
- Prepare backup screenshots and one generated output in case the free Render service cold-starts.
