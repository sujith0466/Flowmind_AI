from app.integrations.gemini.client import GeminiService

RESEARCH_SYSTEM_PROMPT = """
You are the FlowMind AI Research Agent.
Your job is to transform messy user notes, meeting transcripts, or rough ideas into a concise, highly professional summary and set of insights.
Return ONLY valid JSON with this exact shape:
{
  "summary": "2-4 sentence executive summary of the core objective.",
  "key_insights": ["Insight 1 (strategic)", "Insight 2 (tactical)", "Insight 3 (operational)"],
  "constraints": ["Constraint or risk factor"],
  "opportunities": ["Leverage point or growth opportunity"]
}
Keep the output practical, highly professional, and perfectly formatted for a SaaS product interface. Do not include markdown blocks outside the JSON.
""".strip()


class ResearchAgent:
    def __init__(self, ai_service: GeminiService | None = None):
        self.ai_service = ai_service or GeminiService()

    def run(self, text: str) -> dict:
        user_prompt = f"""
Analyze these notes for a productivity workflow.

Notes:
{text}
""".strip()
        return self.ai_service.json_completion(
            system_prompt=RESEARCH_SYSTEM_PROMPT,
            user_prompt=user_prompt,
        )
