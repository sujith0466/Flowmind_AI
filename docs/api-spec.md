# API Specification

FlowMind AI 2.0 API — all endpoints served from the Flask backend.

## Implemented Endpoints

### `GET /health`

Backend health check. Returns service status and environment.

**Response:**
```json
{
  "success": true,
  "service": "FlowMind AI Backend",
  "status": "healthy",
  "environment": "production",
  "timestamp": "2026-06-06T13:00:00+00:00"
}
```

---

### `POST /api/workflow/generate`

Core workflow generation endpoint. Accepts raw text input, runs the multi-agent pipeline, and returns a structured execution plan.

**Request:**
```json
{
  "text": "Your raw notes, meeting transcript, or goal description here.",
  "memory_context": "Optional: comma-separated titles of recent workflows for context."
}
```

**Success Response:**
```json
{
  "success": true,
  "data": {
    "workflow_id": "flow_abc123def456",
    "created_at": "2026-06-06T13:00:00+00:00",
    "summary": "2–4 sentence executive summary of the core objective.",
    "key_insights": ["Strategic insight", "Tactical insight", "Operational insight"],
    "action_items": [
      {
        "title": "Action-oriented title",
        "priority": "Critical | High Impact | Quick Win | Long Term",
        "execution_phase": "Research | Planning | Execution | Optimization",
        "owner": "Engineering | Design | Product | Marketing",
        "estimated_effort": "2 hours | 1 sprint | 1 day"
      }
    ],
    "workflow_steps": [
      {
        "step": 1,
        "title": "Step title",
        "description": "Step objective description",
        "priority": "Critical | High Impact | Quick Win | Long Term",
        "execution_phase": "Research | Planning | Execution | Optimization",
        "agent": "Research Agent | Planner Agent"
      }
    ],
    "execution_phases": [
      {
        "id": "research",
        "label": "Phase 1 - Research",
        "name": "Research",
        "description": "Clarify the context, signals, constraints, and leverage points.",
        "action_items": [],
        "workflow_steps": []
      }
    ],
    "research": {
      "constraints": ["Risk or constraint"],
      "opportunities": ["Leverage point or opportunity"]
    },
    "metadata": {
      "agents": ["Research Agent", "Planner Agent"],
      "priority_labels": ["Critical", "High Impact", "Quick Win", "Long Term"],
      "execution_phases": ["Phase 1 - Research", "Phase 2 - Planning", "Phase 3 - Execution", "Phase 4 - Optimization"],
      "version": "mvp-0.3"
    }
  }
}
```

**Error Responses:**

| Status | Code | Condition |
|---|---|---|
| 400 | `validation_error` | `text` field is missing or empty |
| 413 | `input_too_large` | Input exceeds `MAX_WORKFLOW_INPUT_CHARS` (default 12,000) |
| 502 | `invalid_ai_json` | Gemini returned non-JSON response |
| 502 | `gemini_request_failed` | Gemini API request failed |
| 503 | `missing_gemini_api_key` | `GEMINI_API_KEY` environment variable not set |
| 503 | `ai_rate_limited` | Gemini API rate limit hit — retry after a delay |
| 404 | `not_found` | Route not found |
| 500 | `server_error` | Unexpected server error |

All error responses follow:
```json
{
  "success": false,
  "error": {
    "code": "error_code",
    "message": "Human-readable error message."
  }
}
```

## Environment Variables

### Backend (Render)

| Variable | Required | Default | Description |
|---|---|---|---|
| `GEMINI_API_KEY` | ✅ Yes | — | Google Gemini API key from AI Studio |
| `SECRET_KEY` | ✅ Yes | `flowmind-dev-secret` | Flask session secret — use a random string in production |
| `FLASK_ENV` | No | `production` | Flask environment |
| `FLASK_DEBUG` | No | `false` | Debug mode — must be `false` in production |
| `FRONTEND_URL` | No | `http://localhost:5173` | Primary CORS origin |
| `CORS_ORIGINS` | No | Derived from `FRONTEND_URL` | Comma-separated list of allowed origins |
| `PORT` | No | `5000` | Server port (Render sets this automatically) |
| `GEMINI_MODEL` | No | `gemini-2.5-flash` | Gemini model to use |
| `GEMINI_TEMPERATURE` | No | `0.2` | Generation temperature |
| `MAX_WORKFLOW_INPUT_CHARS` | No | `12000` | Maximum input length |

### Frontend (Vercel)

| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | ✅ Yes | Render backend URL, e.g. `https://flowmind-ai-backend.onrender.com` |
| `VITE_SUPABASE_URL` | No | Supabase project URL (required for history persistence) |
| `VITE_SUPABASE_ANON_KEY` | No | Supabase anon key (required for history persistence) |
