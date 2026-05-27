# FlowMind AI — AI-Powered Multi-Agent Productivity Operating System

FlowMind AI is a premium, AI-native multi-agent productivity operating system built for the **OpenAI x Outskill AI Builders Hackathon**.

It transforms unstructured thought — messy notes, meeting transcripts, brainstorms, and raw ideas — into structured, execution-ready workflows through intelligent AI agent orchestration.

![FlowMind AI Landing](screenshots/landing-hero.png)

---

## 🚀 The Problem & Solution

Builders, founders, students, and professionals spend too much time organizing work instead of executing it.

Most AI tools generate information.
FlowMind AI generates execution.

Instead of returning long walls of text, FlowMind AI transforms raw intent into structured execution plans through coordinated multi-agent orchestration.

### How It Works

1. Users paste raw, unstructured text into the command workspace.
2. The **Research Agent** extracts insights, constraints, dependencies, and objectives.
3. The **Planner Agent** converts the research into structured action plans and execution timelines.
4. The **Workflow Orchestrator** combines outputs into an elegant, execution-ready workflow system.
5. The workflow is stored and rendered beautifully for future reference.

---

## ✨ Why FlowMind AI?

Most productivity AI tools stop at information generation.

FlowMind AI is designed to bridge the gap between:
- thinking
- planning
- execution

Through intelligent multi-agent orchestration, the platform automatically:
- extracts insights
- prioritizes actions
- structures workflows
- generates execution plans
- organizes productivity systems

The result is an AI-powered execution operating system for modern workflows.

---

## 🛠 Tech Stack & Architecture

### Frontend
- React
- Vite
- Tailwind CSS v4
- Framer Motion
- React Router

### Backend
- Python
- Flask
- Flask-CORS

### AI Engine
- Google Gemini 2.5 Flash for structured multi-agent workflow generation

### Database & Persistence
- Supabase
- PostgreSQL
- Anonymous Authentication

### Deployment Targets
- Vercel (Frontend)
- Render (Backend)

---

## 🧠 Multi-Agent Workflow Architecture

```text
User Input
    ↓
Research Agent
    ↓
Planner Agent
    ↓
Workflow Orchestrator
    ↓
Structured Execution Plan
    ↓
Supabase Persistence
```

The architecture strictly separates:
- frontend client
- orchestration backend
- AI workflow system
- persistence layer

This ensures a scalable and production-ready foundation.

---

## 📸 Product Screenshots

### Landing Experience

![Landing Hero](screenshots/landing-hero.png)

---

### Workflow Studio Dashboard

![Dashboard Input](screenshots/dashboard-input.png)

---

### Multi-Agent Workflow Execution

![Workflow Execution](screenshots/dashboard-workflow.png)

---

### Structured Results Interface

![Results Output](screenshots/results-output.png)

---

## 💻 Local Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/your-username/flowmind-ai.git
cd flowmind-ai
```

---

### 2. Backend Setup

```bash
cd backend

python -m venv .venv
```

Activate virtual environment:

#### Windows
```bash
.venv\Scripts\activate
```

#### Mac/Linux
```bash
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create environment file:

```bash
copy .env.example .env
```

Add your Gemini API key inside `.env`.

Start backend server:

```bash
python run.py
```

---

### 3. Frontend Setup

```bash
cd frontend

npm install
```

Create environment file:

```bash
copy .env.example .env
```

Add:
- Supabase URL
- Supabase Anon Key

Start frontend:

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## ☁️ Production Deployment

FlowMind AI is configured for modern cloud deployment.

### Frontend Deployment
- Platform: Vercel
- Configure:
  - `VITE_API_URL`
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

### Backend Deployment
- Platform: Render
- Configure:
  - `GEMINI_API_KEY`
  - `CORS_ORIGINS`

The project already includes:
- `vercel.json`
- `render.yaml`

for deployment readiness.

---

## 🎬 Demo Experience

FlowMind AI is designed to create a premium "AI operating system" experience.

### 1. Cinematic Interface
The interface uses:
- glassmorphism
- cinematic lighting
- premium typography
- ambient motion systems

to establish a calm and modern productivity environment.

### 2. AI Orchestration
Users can watch workflows evolve from:
- raw prompts
- research extraction
- planning systems
- structured execution outputs

through coordinated AI agents.

### 3. Execution-Focused Results
Instead of generic AI responses, FlowMind AI generates:
- execution timelines
- action plans
- insights
- workflow structures
- prioritized productivity systems

---

## 🔮 Future Scope

Post-hackathon, FlowMind AI will evolve into a full-scale AI Workflow Operating System.

### Planned Expansion
- Notion integration
- Jira integration
- Linear integration
- Multi-user collaborative workspaces
- Advanced workflow memory systems
- Autonomous execution agents
- AI-generated documents & email automation
- Persistent workflow intelligence

---

## 🏆 Hackathon Context

Built for:
**OpenAI x Outskill AI Builders Hackathon 2026**

Focus Areas:
- Multi-agent AI systems
- Workflow automation
- Productivity orchestration
- Real-world AI execution systems
- Full-stack AI product engineering

---

## 👨‍💻 Author

**Sujith Kumar**
AI Full Stack Developer

Building practical AI systems focused on workflow automation, productivity orchestration, and intelligent execution experiences.
