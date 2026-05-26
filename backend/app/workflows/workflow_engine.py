from datetime import datetime, timezone
from uuid import uuid4

from app.agents.planner_agent import PlannerAgent
from app.agents.research_agent import ResearchAgent


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
        plan = self.planner_agent.run(text, research)

        return {
            "workflow_id": f"flow_{uuid4().hex[:12]}",
            "created_at": datetime.now(timezone.utc).isoformat(),
            "summary": research.get("summary", ""),
            "key_insights": research.get("key_insights", []),
            "action_items": plan.get("action_items", []),
            "workflow_steps": plan.get("workflow_steps", []),
            "research": {
                "constraints": research.get("constraints", []),
                "opportunities": research.get("opportunities", []),
            },
            "metadata": {
                "agents": ["Research Agent", "Planner Agent"],
                "version": "mvp-0.1",
            },
        }
