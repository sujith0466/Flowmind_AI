# Launch Readiness Notes

FlowMind AI is production-prepped for a fast Vercel + Render hackathon launch. The goal is not enterprise infrastructure; the goal is a stable public demo that makes the MVP easy to judge.

## Launch Readiness Status

| Area | Status | Notes |
| --- | --- | --- |
| Frontend build | Ready | Vite build configured for Vercel. |
| Frontend routing | Ready | `vercel.json` handles SPA rewrites. |
| Backend runtime | Ready | `wsgi.py`, `gunicorn`, `Procfile`, and Render blueprint added. |
| Environment examples | Ready | Production examples added for frontend and backend. |
| CORS | Ready | Backend supports `CORS_ORIGINS` for deployed frontend URL. |
| Secrets | Ready | OpenAI key stays backend-only. |
| Deployment docs | Ready | Deployment guide and checklist added. |
| Public URLs | Pending | Requires Vercel and Render deployment. |
| Final demo validation | Pending | Requires public workflow generation test. |

## Stable Demo Experience

For a reliable hackathon demo:

- Deploy backend first and verify `/health`.
- Deploy frontend second with `VITE_API_URL` pointing to Render.
- Update Render CORS after Vercel gives the final frontend URL.
- Keep one successful output as fallback in case of cold start or API latency.
- Avoid adding new features before deployment is stable.

## Production Configuration Summary

Frontend:

```text
VITE_API_URL=https://your-flowmind-backend.onrender.com
```

Backend:

```text
FLASK_ENV=production
FLASK_DEBUG=false
FRONTEND_URL=https://your-flowmind-frontend.vercel.app
CORS_ORIGINS=https://your-flowmind-frontend.vercel.app
OPENAI_API_KEY=your_openai_api_key
```

## Launch Priorities

1. Deploy Render backend.
2. Deploy Vercel frontend.
3. Validate public end-to-end workflow.
4. Capture screenshots.
5. Record demo or prepare live walkthrough.
6. Freeze feature work and focus on pitch clarity.

## Things To Avoid Before Launch

- Do not add authentication.
- Do not add Supabase.
- Do not add file uploads.
- Do not refactor the working workflow engine.
- Do not expose OpenAI keys in frontend variables.
- Do not submit without testing the deployed Vercel URL from a fresh browser session.
