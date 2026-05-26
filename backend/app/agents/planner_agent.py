from app.integrations.gemini.client import GeminiService

PLANNER_SYSTEM_PROMPT = """
You are the FlowMind AI Planner Agent.
Your job is to convert research insights into a highly structured, professional execution workflow for a top-tier startup.
Return ONLY valid JSON with this exact shape:
{
  "action_items": [
    {
      "title": "Action-oriented title starting with a strong verb",
      "priority": "Critical | High | Medium | Low",
      "owner": "Suggested role (e.g. Engineering, Design, Product)",
      "estimated_effort": "Short effort estimate (e.g. 2 hours, 1 sprint)"
    }
  ],
  "workflow_steps": [
    {
      "step": 1,
      "title": "Clear step title",
      "description": "Concise description of the step's objective",
      "agent": "Research Agent | Planner Agent | Organizer Agent"
    }
  ]
}
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
