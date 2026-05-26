# Architecture

FlowMind AI uses a separated frontend/backend architecture optimized for hackathon speed and future scalability.

## Implemented Stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion, React Router DOM, Axios.
- Backend: Flask, Flask-CORS, OpenAI SDK, python-dotenv.
- AI: OpenAI-powered multi-agent orchestration.
- Deployment targets: Vercel for frontend, Render for backend.
- Persistence/Auth: intentionally deferred for the first MVP.

## Frontend Architecture

The frontend lives in `frontend/` and is organized around the dashboard as the main product surface.

- `src/api`: Axios client and workflow API wrapper.
- `src/components`: reusable UI pieces for navigation, dashboard cards, workflow input, timeline, and results.
- `src/layouts`: responsive app shell with sidebar and navbar.
- `src/pages`: landing, dashboard, workflow results, and history routes.
- `src/animations`: shared Framer Motion animation variants.
- `src/styles`: global dark theme, gradients, glassmorphism, and typography.

## Backend Architecture

The backend lives in `backend/` and is organized around a clean Flask app factory.

- `app/core`: app factory, CORS setup, and error handlers.
- `app/config`: dotenv-backed settings.
- `app/api`: blueprint registration.
- `app/routes`: health and workflow routes.
- `app/services`: service boundary for workflow generation.
- `app/agents`: Research Agent and Planner Agent.
- `app/integrations/openai`: OpenAI client wrapper.
- `app/workflows`: workflow engine orchestration.

## Frontend-Backend Flow

```text
Dashboard text input
-> Axios POST /api/workflow/generate
-> Flask workflow route validates input
-> WorkflowService calls WorkflowEngine
-> Research Agent calls OpenAI
-> Planner Agent calls OpenAI using research output
-> Flask returns unified structured JSON
-> React renders summary, insights, action items, and roadmap
```

## AI Workflow Orchestration Flow

```text
Raw notes
-> Research Agent
   -> summary
   -> key insights
   -> constraints
   -> opportunities
-> Planner Agent
   -> action items
   -> workflow steps
-> Unified FlowMind workflow response
```

## Agent Execution Pipeline

1. Research Agent receives raw user text.
2. Research Agent extracts the practical signal from the notes.
3. Planner Agent receives both original text and research output.
4. Planner Agent generates prioritized action items and workflow steps.
5. Workflow engine merges outputs into a stable frontend response shape.

## API Architecture Notes

- `GET /health` confirms backend availability.
- `POST /api/workflow/generate` is the core MVP endpoint.
- API responses follow `{ success, data }` for success and `{ success, error }` for failure.
- Missing text returns a validation error.
- Missing OpenAI key returns a clean service configuration error.
- OpenAI request failures return a structured API error.

## Scalability Notes

The architecture is intentionally ready for expansion without adding complexity to the first MVP. Future agents can be added inside `app/agents`, future orchestration can be added inside `app/workflows`, and persistence can be added later through Supabase without rewriting the core workflow route.
