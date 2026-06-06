# Agent System

FlowMind AI 2.0 is organized around a sequential multi-agent pipeline powered by Google Gemini.

## Implemented Agents

### Research Agent (`app/agents/research_agent.py`)

- **Role:** Context extraction and signal analysis.
- **Input:** Raw user text + optional memory context (recent workflow titles from history).
- **Output:** Structured JSON — `summary`, `key_insights`, `constraints`, `opportunities`.
- **How it works:** Sends a structured system prompt to Gemini with `response_mime_type="application/json"` to guarantee parseable output. The system prompt constrains the model to extract practical, professional signals from messy input.

### Planner Agent (`app/agents/planner_agent.py`)

- **Role:** Action synthesis and execution planning.
- **Input:** Original user text + Research Agent output + optional memory context.
- **Output:** Structured JSON — `action_items[]` (with title, priority, execution_phase, owner, estimated_effort) and `workflow_steps[]` (with step, title, description, priority, execution_phase, agent).
- **How it works:** Sends both the original text and the research output to Gemini, enabling the model to plan with full context. The system prompt defines the priority taxonomy (Critical, High Impact, Quick Win, Long Term) and phase taxonomy (Research, Planning, Execution, Optimization) explicitly.

### Workflow Engine (`app/workflows/workflow_engine.py`)

- **Role:** Orchestration, normalization, and output structuring.
- **Not an AI agent** — pure Python logic that coordinates agent calls and guarantees output consistency.
- **Responsibilities:**
  - Calls Research Agent, then Planner Agent sequentially.
  - Normalizes all priority labels using alias maps and cue-based heuristics.
  - Normalizes all execution phase labels with alias maps and content-based inference.
  - Groups action items and workflow steps into their respective execution phases.
  - Returns a stable, typed response with `workflow_id`, `created_at`, `metadata`, and all agent outputs.

## Agent Handoff

```text
User Input + Memory Context
        ↓
  ResearchAgent.run()
  [Gemini API call #1]
        ↓
  { summary, key_insights, constraints, opportunities }
        ↓
  PlannerAgent.run(original_text, research_output)
  [Gemini API call #2]
        ↓
  { action_items[], workflow_steps[] }
        ↓
  WorkflowEngine normalization
        ↓
  Unified structured response
```

## Priority System

All action items and workflow steps are normalized to one of four priority labels:

| Label | Meaning |
|---|---|
| Critical | Urgent blockers, hard deadlines, or dependencies that unlock execution |
| High Impact | Strategically important work with significant leverage |
| Quick Win | Low-effort work that creates immediate momentum or clarity |
| Long Term | Foundational, follow-up, or compounding work for later |

## Execution Phase System

All items are categorized into one of four execution phases:

| Phase | Scope |
|---|---|
| Research | Market research, user discovery, requirements, analysis, risks, constraints |
| Planning | Roadmap definition, prioritization, scope, strategy, scheduling |
| Execution | Implementation, creation, launch, deployment, submission, delivery |
| Optimization | Analytics, improvements, iteration, scaling, retrospectives, post-launch refinement |

## Agent Visibility in the UI

The frontend makes the multi-agent pipeline visible through:

- **AgentGrid**: Shows Research, Planner, Productivity, and Summary agent cards with active state during generation.
- **LiveTerminal**: Displays real-time loading phase narration (Researching → Planning → Prioritizing → Summarizing → Structuring).
- **WorkflowTimeline**: Shows agent-attributed workflow steps with phase and priority labels.
- **ExecutionIntelligence**: Heuristic-based scoring derived from the generated workflow structure.
- **AIRecommendations**: Contextual guidance based on workflow content and history patterns.
