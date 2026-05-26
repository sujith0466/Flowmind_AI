# FlowMind AI — The Multi-Agent Productivity OS

FlowMind AI is a premium, AI-native multi-agent productivity operating system built for the **OpenAI x Outskill AI Builders Hackathon**. 

It transforms unstructured thought (messy notes, meeting transcripts, brain dumps) into structured, execution-ready workflows through the coordinated effort of autonomous AI agents.

![Landing Page Placeholder](screenshots/submission/landing.png)

## 🚀 The Problem & Solution
Builders, founders, and operators spend too much time organizing work rather than executing it. Current AI chatbots return walls of text that still require manual extraction into task managers and roadmaps.

**FlowMind AI solves this via multi-agent orchestration:**
1. You paste raw, unstructured text into the command interface.
2. The **Research Agent** parses the context, extracting key insights, constraints, and dependencies.
3. The **Planner Agent** takes the research and generates a structured timeline, categorized action items, and prioritized tasks.
4. The system renders an elegant, actionable workflow.

## 🛠 Tech Stack & Architecture

- **Frontend:** React, Vite, Tailwind CSS (v4), Framer Motion, React Router.
- **Backend:** Python, Flask, Flask-CORS.
- **AI Engine:** Google Gemini (via OpenAI-compatible abstraction layer) for structured JSON generation.
- **Database (Auth/Persistence):** Supabase (Anonymous Auth + PostgreSQL).
- **Deployment Targets:** Vercel (Frontend) and Render (Backend).

The architecture strictly separates the frontend client, the backend orchestrator, and the AI agent logic to ensure a scalable, production-ready foundation.

## 💻 Local Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/flowmind-ai.git
cd flowmind-ai
```

### 2. Backend Setup
```bash
cd backend
python -m venv .venv
# Activate venv: .venv\Scripts\activate (Windows) or source .venv/bin/activate (Mac/Linux)

pip install -r requirements.txt
copy .env.example .env
```
*Edit `backend/.env` and insert your Gemini API Key.*

```bash
# Start backend server
python run.py
```

### 3. Frontend Setup
```bash
cd frontend
npm install
copy .env.example .env
```
*Edit `frontend/.env` with your Supabase URL/Anon Key if using persistence.*

```bash
# Start frontend server
npm run dev
```
Navigate to `http://localhost:5173`.

## ☁️ Production Deployment

FlowMind AI is configured for one-click deployment:

1. **Frontend (Vercel):** Connect your GitHub repository to Vercel and set the `VITE_API_URL` environment variable to point to your backend. The included `vercel.json` handles SPA routing.
2. **Backend (Render):** Connect your GitHub repository to Render as a Web Service. Select the `backend` directory. The included `render.yaml` handles the Gunicorn configuration automatically. Set your `GEMINI_API_KEY` and `CORS_ORIGINS`.

## 🎬 Demo Experience
The product is engineered to deliver a "wow" moment instantly:
1. **The Vibe:** The UI is designed with cinematic glassmorphism, deep layered shadows, and calm micro-interactions to establish immediate trust and premium quality.
2. **The Execution:** Watch the live terminal as the Orchestrator routes tasks between the Research and Planner agents.
3. **The Result:** Receive a perfectly structured execution plan with prioritized tags and visual timelines.

## 🔮 Future Scope
Post-hackathon, FlowMind AI will evolve into a full-scale Workflow OS:
- **Bi-directional sync:** Push generated action items directly into Linear, Notion, or Jira.
- **Agent Expansion:** Introduce Execution Agents that can automatically run code, send emails, or draft documents based on the Planner's roadmap.
- **Team Workspaces:** Introduce collaborative multiplayer orchestration.
