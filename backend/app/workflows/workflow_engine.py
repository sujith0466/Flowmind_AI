from datetime import datetime, timezone
from uuid import uuid4

from app.agents.planner_agent import PlannerAgent
from app.agents.research_agent import ResearchAgent


PRIORITY_LABELS = ("Critical", "High Impact", "Quick Win", "Long Term")
EXECUTION_PHASES = (
    {
        "id": "research",
        "label": "Phase 1 - Research",
        "name": "Research",
        "description": "Clarify the context, signals, constraints, and leverage points.",
    },
    {
        "id": "planning",
        "label": "Phase 2 - Planning",
        "name": "Planning",
        "description": "Turn insight into sequence, ownership, scope, and operating priorities.",
    },
    {
        "id": "execution",
        "label": "Phase 3 - Execution",
        "name": "Execution",
        "description": "Deliver the core work, ship the artifacts, and create visible momentum.",
    },
    {
        "id": "optimization",
        "label": "Phase 4 - Optimization",
        "name": "Optimization",
        "description": "Measure outcomes, improve the system, and prepare the next iteration.",
    },
)

PRIORITY_ALIASES = {
    "critical": "Critical",
    "urgent": "Critical",
    "blocker": "Critical",
    "high": "High Impact",
    "high impact": "High Impact",
    "important": "High Impact",
    "medium": "Quick Win",
    "normal": "Quick Win",
    "quick": "Quick Win",
    "quick win": "Quick Win",
    "low": "Long Term",
    "long": "Long Term",
    "long term": "Long Term",
    "future": "Long Term",
}

CRITICAL_CUES = ("deadline", "blocker", "launch", "submit", "deploy", "exam", "due")
QUICK_WIN_CUES = ("draft", "outline", "quick", "review", "organize", "clarify", "list")
LONG_TERM_CUES = ("optimize", "measure", "scale", "improve", "iterate", "follow", "post")
RESEARCH_CUES = (
    "research",
    "market",
    "customer",
    "user",
    "competitor",
    "analyze",
    "analysis",
    "insight",
    "requirement",
    "risk",
    "constraint",
    "survey",
)
PLANNING_CUES = (
    "plan",
    "roadmap",
    "strategy",
    "scope",
    "prioritize",
    "define",
    "schedule",
    "outline",
    "architecture",
    "calendar",
    "curriculum",
)
EXECUTION_CUES = (
    "build",
    "create",
    "implement",
    "launch",
    "deploy",
    "ship",
    "submit",
    "record",
    "publish",
    "write",
    "practice",
    "deliver",
)
OPTIMIZATION_CUES = (
    "optimize",
    "measure",
    "analytics",
    "improve",
    "iterate",
    "scale",
    "refine",
    "retrospective",
    "post-launch",
    "follow-up",
)

PHASE_ALIASES = {
    "phase 1": "Research",
    "phase 1 research": "Research",
    "research": "Research",
    "discovery": "Research",
    "analysis": "Research",
    "phase 2": "Planning",
    "phase 2 planning": "Planning",
    "planning": "Planning",
    "plan": "Planning",
    "strategy": "Planning",
    "phase 3": "Execution",
    "phase 3 execution": "Execution",
    "execution": "Execution",
    "execute": "Execution",
    "implementation": "Execution",
    "delivery": "Execution",
    "phase 4": "Optimization",
    "phase 4 optimization": "Optimization",
    "optimization": "Optimization",
    "optimisation": "Optimization",
    "iteration": "Optimization",
    "improvement": "Optimization",
}


def _priority_from_text(text: str, index: int) -> str:
    normalized = text.lower()
    if any(cue in normalized for cue in CRITICAL_CUES):
        return "Critical"
    if any(cue in normalized for cue in QUICK_WIN_CUES):
        return "Quick Win"
    if any(cue in normalized for cue in LONG_TERM_CUES):
        return "Long Term"
    if index == 0:
        return "Critical"
    return "High Impact"


def _normalize_priority(value: object, fallback: str) -> str:
    if isinstance(value, str):
        normalized = value.strip().lower().replace("_", " ").replace("-", " ")
        return PRIORITY_ALIASES.get(normalized, value.strip() if value.strip() in PRIORITY_LABELS else fallback)
    return fallback


def _phase_from_text(text: str, index: int) -> str:
    normalized = text.lower()
    if any(cue in normalized for cue in OPTIMIZATION_CUES):
        return "Optimization"
    if any(cue in normalized for cue in EXECUTION_CUES):
        return "Execution"
    if any(cue in normalized for cue in PLANNING_CUES):
        return "Planning"
    if any(cue in normalized for cue in RESEARCH_CUES):
        return "Research"
    if index == 0:
        return "Research"
    if index == 1:
        return "Planning"
    return "Execution"


def _normalize_phase(value: object, fallback: str) -> str:
    if isinstance(value, str):
        normalized = (
            value.strip()
            .lower()
            .replace("\u2013", " ")
            .replace("\u2014", " ")
            .replace("_", " ")
            .replace("-", " ")
        )
        compact = " ".join(normalized.split())
        return PHASE_ALIASES.get(compact, value.strip() if value.strip() in PHASE_ALIASES.values() else fallback)
    return fallback


def _normalize_work_item(item: object, index: int, default_title: str) -> dict:
    if isinstance(item, dict):
        title = str(item.get("title") or item.get("name") or default_title).strip()
        description = str(item.get("description", "")).strip()
        item_text = f"{title} {description}"
        fallback_priority = _priority_from_text(item_text, index)
        fallback_phase = _phase_from_text(item_text, index)
        return {
            **item,
            "title": title,
            "priority": _normalize_priority(item.get("priority"), fallback_priority),
            "execution_phase": _normalize_phase(item.get("execution_phase") or item.get("phase"), fallback_phase),
        }

    title = str(item).strip() or default_title
    return {
        "title": title,
        "priority": _priority_from_text(title, index),
        "execution_phase": _phase_from_text(title, index),
    }


def _normalize_workflow_step(step: object, index: int) -> dict:
    if isinstance(step, dict):
        title = str(step.get("title") or step.get("name") or f"Step {index + 1}").strip()
        description = str(step.get("description", "")).strip()
        step_text = f"{title} {description}"
        fallback_priority = _priority_from_text(step_text, index)
        fallback_phase = _phase_from_text(step_text, index)
        return {
            **step,
            "step": step.get("step", index + 1),
            "title": title,
            "priority": _normalize_priority(step.get("priority"), fallback_priority),
            "execution_phase": _normalize_phase(step.get("execution_phase") or step.get("phase"), fallback_phase),
        }

    title = str(step).strip() or f"Step {index + 1}"
    return {
        "step": index + 1,
        "title": title,
        "priority": _priority_from_text(title, index),
        "execution_phase": _phase_from_text(title, index),
    }


def _as_list(value: object) -> list:
    return value if isinstance(value, list) else []


def _group_execution_phases(action_items: list, workflow_steps: list) -> list:
    grouped = []
    for phase in EXECUTION_PHASES:
        name = phase["name"]
        phase_actions = [item for item in action_items if item.get("execution_phase") == name]
        phase_steps = [step for step in workflow_steps if step.get("execution_phase") == name]
        if phase_actions or phase_steps:
            grouped.append(
                {
                    **phase,
                    "action_items": phase_actions,
                    "workflow_steps": phase_steps,
                }
            )
    return grouped


class WorkflowEngine:
    def __init__(
        self,
        research_agent: ResearchAgent | None = None,
        planner_agent: PlannerAgent | None = None,
    ):
        self.research_agent = research_agent or ResearchAgent()
        self.planner_agent = planner_agent or PlannerAgent()

    def run(self, text: str) -> dict:
        research = self.research_agent.run(text)
        if not isinstance(research, dict):
            research = {}

        plan = self.planner_agent.run(text, research)
        if not isinstance(plan, dict):
            plan = {}

        raw_action_items = plan.get("action_items", []) if isinstance(plan, dict) else []
        raw_workflow_steps = plan.get("workflow_steps", []) if isinstance(plan, dict) else []
        action_items = [
            _normalize_work_item(item, index, f"Action item {index + 1}")
            for index, item in enumerate(_as_list(raw_action_items))
        ]
        workflow_steps = [
            _normalize_workflow_step(step, index)
            for index, step in enumerate(_as_list(raw_workflow_steps))
        ]

        return {
            "workflow_id": f"flow_{uuid4().hex[:12]}",
            "created_at": datetime.now(timezone.utc).isoformat(),
            "summary": research.get("summary", ""),
            "key_insights": research.get("key_insights", []),
            "action_items": action_items,
            "workflow_steps": workflow_steps,
            "execution_phases": _group_execution_phases(action_items, workflow_steps),
            "research": {
                "constraints": research.get("constraints", []),
                "opportunities": research.get("opportunities", []),
            },
            "metadata": {
                "agents": ["Research Agent", "Planner Agent"],
                "priority_labels": list(PRIORITY_LABELS),
                "execution_phases": [phase["label"] for phase in EXECUTION_PHASES],
                "version": "mvp-0.3",
            },
        }
