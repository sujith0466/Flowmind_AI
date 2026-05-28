from app.integrations.gemini.client import GeminiService

PLANNER_SYSTEM_PROMPT = """
You are the FlowMind AI Planner Agent.
Your job is to convert research insights into a highly structured, professional execution workflow for a top-tier startup.
Return ONLY valid JSON with this exact shape:
{
  "action_items": [
    {
      "title": "Action-oriented title starting with a strong verb",
      "priority": "Critical | High Impact | Quick Win | Long Term",
      "execution_phase": "Research | Planning | Execution | Optimization",
      "owner": "Suggested role (e.g. Engineering, Design, Product)",
      "estimated_effort": "Short effort estimate (e.g. 2 hours, 1 sprint)"
    }
  ],
  "workflow_steps": [
    {
      "step": 1,
      "title": "Clear step title",
      "description": "Concise description of the step's objective",
      "priority": "Critical | High Impact | Quick Win | Long Term",
      "execution_phase": "Research | Planning | Execution | Optimization",
      "agent": "Research Agent | Planner Agent | Organizer Agent"
    }
  ]
}
Use priorities intelligently:
- Critical: urgent blockers, deadlines, dependencies, or work that unlocks execution.
- High Impact: strategically important work with meaningful leverage.
- Quick Win: low-effort work that creates immediate momentum or clarity.
- Long Term: foundational, follow-up, optimization, or compounding work.
Assign priorities based on urgency, dependency order, execution importance, and immediate value.
Group every action item and workflow step into the best execution phase:
- Research: market research, user/customer discovery, requirements, analysis, risks, facts, constraints.
- Planning: roadmap definition, prioritization, scope, strategy, scheduling, resource planning.
- Execution: implementation, creation, launch, deployment, submission, delivery, operations.
- Optimization: analytics, improvements, iteration, scaling, retrospectives, post-launch refinement.
Make the plan extremely clear, believable, and ready for immediate execution by a product team. Do not include markdown blocks outside the JSON.
""".strip()


class PlannerAgent:
    def __init__(self, ai_service: GeminiService | None = None):
        self.ai_service = ai_service or GeminiService()

    def run(self, original_text: str, research_output: dict) -> dict:
        user_prompt = f"""
Create a structured workflow plan from the original notes and research output.

Original notes:
{original_text}

Research output:
{research_output}
""".strip()
        return self.ai_service.json_completion(
            system_prompt=PLANNER_SYSTEM_PROMPT,
            user_prompt=user_prompt,
        )
