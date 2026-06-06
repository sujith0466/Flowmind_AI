# Architecture

FlowMind AI 2.0 uses a separated frontend/backend architecture optimized for hackathon delivery speed and production scalability.

## Implemented Stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion, React Router DOM, Axios, Supabase JS Client.
- Backend: Flask, Flask-CORS, Gunicorn, Google Generative AI SDK, python-dotenv.
- AI: Google Gemini — multi-agent structured generation with `response_mime_type="application/json"`.
- Deployment targets: Vercel for frontend, Render for backend.
- Persistence/Auth: Supabase Anonymous Auth + `workflows` table for history.

## Frontend Architecture

The frontend lives in `frontend/` and is organized around the dashboard as the main product surface.

- `src/api`: Axios client (`client.js`) and workflow API wrapper (`workflow.js`).
- `src/components/common`: Navbar and Sidebar layout components.
- `src/components/dashboard`: AgentGrid, AgentMemory, LiveTerminal, StatCard.
- `src/components/workflow`: UploadPanel, WorkflowResultsPanel, WorkflowTimeline, ExecutionIntelligence, AIRecommendations, PriorityBadge, executionPhases.
- `src/layouts`: AppLayout — responsive app shell with sidebar, navbar, and Supabase session initialization.
- `src/pages`: Landing, Dashboard, WorkflowResults (preview), History.
- `src/animations`: Shared Framer Motion animation variants.
- `src/lib`: Supabase client and `ensureAnonymousSession` helper.
- `src/styles`: Global dark theme, gradients, glassmorphism, and typography.

## Backend Architecture

The backend lives in `backend/` and is organized around a clean Flask app factory.

- `app/core`: Flask app factory, CORS setup, and global error handlers.
- `app/config`: dotenv-backed settings dataclass (`Settings`).
- `app/api`: Blueprint registration hub.
- `app/routes`: Health check route (`/health`) and workflow route (`/api/workflow/generate`).
- `app/services`: `WorkflowService` — service boundary between route and engine.
- `app/agents`: `ResearchAgent` and `PlannerAgent` — each wraps a Gemini API call.
- `app/integrations/gemini`: `GeminiService` — centralized Gemini client with error handling and rate-limit detection.
- `app/workflows`: `WorkflowEngine` — sequential agent orchestration, priority normalization, and phase classification.
- `app/utils`: `ApiError` exception class for structured error propagation.

## Frontend-Backend Flow

```text
Dashboard text input
→ Axios POST /api/workflow/generate
→ Flask workflow route validates input
→ WorkflowService calls WorkflowEngine
→ Research Agent calls Gemini API (call #1) → returns { summary, key_insights, constraints, opportunities }
→ Planner Agent calls Gemini API (call #2) → returns { action_items[], workflow_steps[] }
→ WorkflowEngine normalizes priorities and execution phases
→ Flask returns unified structured JSON { success, data }
→ React renders summary, insights, action items, execution pipeline, intelligence scores, and AI recommendations
```

## AI Workflow Orchestration Flow

```text
Raw user notes
→ Research Agent
   → summary (2–4 sentence executive brief)
   → key_insights (strategic, tactical, operational)
   → constraints (risks and blockers)
   → opportunities (leverage points)
→ Planner Agent (receives original text + research output)
   → action_items (title, priority, execution_phase, owner, estimated_effort)
   → workflow_steps (step, title, description, priority, execution_phase, agent)
→ WorkflowEngine
   → normalizes priority labels: Critical | High Impact | Quick Win | Long Term
   → normalizes execution phases: Research | Planning | Execution | Optimization
   → groups items into execution_phases[]
   → returns unified response with workflow_id, created_at, metadata
```

## Agent Execution Pipeline

1. `WorkflowEngine.run(text, memory_context)` is called by `WorkflowService`.
2. `ResearchAgent.run(text, memory_context)` fires Gemini call #1 with a structured system prompt.
3. The research output (dict) is passed to `PlannerAgent.run(text, research_output, memory_context)`.
4. `PlannerAgent` fires Gemini call #2, incorporating both the original text and research insights.
5. `WorkflowEngine` normalizes all priority and phase fields using cue-based heuristics and alias maps.
6. The engine groups action items and workflow steps into their respective execution phases.
7. A stable, typed response dict is returned to the Flask route, serialized to JSON, and sent to the frontend.

## API Architecture Notes

- `GET /health` — confirms backend availability and environment.
- `POST /api/workflow/generate` — core MVP endpoint. Accepts `{ text, memory_context }`. Returns `{ success, data }`.
- All API responses follow `{ success: true, data: {} }` for success and `{ success: false, error: { code, message } }` for failures.
- Missing or empty `text` returns a 400 validation error.
- Missing `GEMINI_API_KEY` returns a 503 configuration error.
- Gemini rate limits return a 503 with a user-friendly retry message.
- Gemini request failures return a structured 502 error.
- Unknown routes return a 404 JSON response.
- Unhandled server errors return a 500 JSON response.

## Scalability Notes

The architecture is intentionally ready for expansion without adding complexity to the MVP. Future agents can be added inside `app/agents`, future orchestration layers can be added inside `app/workflows`, additional API routes can be added inside `app/routes`, and Supabase integration can be extended in the backend through `app/integrations/supabase` without rewriting the core workflow route.
