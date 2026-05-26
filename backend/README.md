# Backend

FlowMind AI backend is a Flask API for the first working multi-agent workflow.

## MVP Workflow

```text
User notes/text
-> Research Agent extracts key insights
-> Planner Agent generates a structured action plan
-> API returns organized workflow JSON
```

## Setup

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
python run.py
```

Add your OpenAI key to `.env`:

```text
OPENAI_API_KEY=your_key_here
```

## Render Deployment

Render can use the root `render.yaml` blueprint or a manual web service.

Manual Render settings:

- Root directory: `backend`
- Build command: `pip install -r requirements.txt`
- Start command: `gunicorn wsgi:app --bind 0.0.0.0:$PORT --workers 2 --timeout 120`
- Health check path: `/health`

Required Render environment variables:

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

## Endpoints

- `GET /health`: service health check
- `POST /api/workflow/generate`: generate the first AI workflow

Example request:

```json
{
  "text": "We need to prepare the hackathon MVP, finish dashboard polish, deploy the backend, and record the final demo."
}
```

Example response shape:

```json
{
  "success": true,
  "data": {
    "summary": "...",
    "key_insights": [],
    "action_items": [],
    "workflow_steps": []
  }
}
```

## Architecture

- `app/core`: Flask app factory, CORS, and error handlers
- `app/config`: dotenv-backed environment config
- `app/routes`: health and workflow routes
- `app/services`: workflow service boundary
- `app/agents`: Research Agent and Planner Agent
- `app/integrations/openai`: OpenAI API wrapper
- `app/workflows`: workflow engine orchestration
