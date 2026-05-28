import unittest

from app.workflows.workflow_engine import EXECUTION_PHASES, PRIORITY_LABELS, WorkflowEngine


class StaticResearchAgent:
    def run(self, text):
        return {
            "summary": f"Executive summary for {text}.",
            "key_insights": ["Prioritize dependencies before execution."],
            "constraints": [],
            "opportunities": [],
        }


class StaticPlannerAgent:
    def __init__(self, plan):
        self.plan = plan

    def run(self, original_text, research_output):
        return self.plan


class WorkflowPriorityTests(unittest.TestCase):
    def build_workflow(self, plan, text):
        engine = WorkflowEngine(
            research_agent=StaticResearchAgent(),
            planner_agent=StaticPlannerAgent(plan),
        )
        return engine.run(text)

    def assert_priority_labels(self, workflow):
        allowed = set(PRIORITY_LABELS)
        for item in workflow["action_items"]:
            self.assertIn(item["priority"], allowed)
        for step in workflow["workflow_steps"]:
            self.assertIn(step["priority"], allowed)

    def assert_execution_phases(self, workflow):
        allowed = {phase["name"] for phase in EXECUTION_PHASES}
        grouped_names = {phase["name"] for phase in workflow["execution_phases"]}

        self.assertTrue(workflow["execution_phases"])
        self.assertTrue(grouped_names.issubset(allowed))
        for item in workflow["action_items"]:
            self.assertIn(item["execution_phase"], allowed)
        for step in workflow["workflow_steps"]:
            self.assertIn(step["execution_phase"], allowed)

    def test_priority_labels_and_phase_groups_for_requested_workflow_types(self):
        cases = [
            (
                "startup launch workflow",
                {
                    "action_items": [
                        {"title": "Research target market segments"},
                        {"title": "Define launch roadmap", "priority": "High"},
                        {"title": "Deploy MVP landing page before deadline"},
                    ],
                    "workflow_steps": [{"title": "Measure waitlist conversion after launch"}],
                },
            ),
            (
                "productivity workflow",
                {
                    "action_items": [
                        {"title": "Organize inbox tasks"},
                        {"title": "Improve weekly review system"},
                    ],
                    "workflow_steps": [{"title": "List daily planning rituals", "priority": "Medium"}],
                },
            ),
            (
                "exam preparation workflow",
                {
                    "action_items": [
                        {"title": "Review calculus chapters before exam"},
                        {"title": "Create revision outline"},
                    ],
                    "workflow_steps": [{"title": "Measure mock test performance", "priority": "Low"}],
                },
            ),
            (
                "hackathon execution workflow",
                {
                    "action_items": [
                        {"title": "Deploy demo before submission"},
                        {"title": "Optimize post-demo onboarding"},
                    ],
                    "workflow_steps": ["Submit final project assets"],
                },
            ),
            (
                "content strategy generation",
                {
                    "action_items": [
                        {"title": "Research audience search intent"},
                        {"title": "Define editorial calendar"},
                        {"title": "Publish launch article"},
                        {"title": "Measure content analytics"},
                    ],
                    "workflow_steps": [{"title": "Refine distribution cadence"}],
                },
            ),
        ]

        for text, plan in cases:
            with self.subTest(text=text):
                workflow = self.build_workflow(plan, text)
                self.assert_priority_labels(workflow)
                self.assert_execution_phases(workflow)

    def test_legacy_priorities_are_mapped_forward(self):
        workflow = self.build_workflow(
            {
                "action_items": [
                    {"title": "Ship the critical path", "priority": "High"},
                    {"title": "Create follow-up queue", "priority": "Low"},
                ],
                "workflow_steps": [
                    {"title": "Clarify scope", "priority": "Medium"},
                ],
            },
            "legacy workflow",
        )

        self.assertEqual(workflow["action_items"][0]["priority"], "High Impact")
        self.assertEqual(workflow["action_items"][1]["priority"], "Long Term")
        self.assertEqual(workflow["workflow_steps"][0]["priority"], "Quick Win")

    def test_legacy_workflows_without_phases_get_safe_phase_fallbacks(self):
        workflow = self.build_workflow(
            {
                "action_items": [
                    "Research competitors",
                    "Define weekly productivity system",
                    "Implement focus blocks",
                    "Measure weekly throughput",
                ],
                "workflow_steps": [
                    {"title": "Create roadmap", "phase": "Planning"},
                    {"title": "Scale review ritual", "execution_phase": "Optimization"},
                ],
            },
            "legacy workflow without explicit phases",
        )

        self.assert_execution_phases(workflow)
        self.assertEqual(workflow["action_items"][0]["execution_phase"], "Research")
        self.assertEqual(workflow["workflow_steps"][0]["execution_phase"], "Planning")


if __name__ == "__main__":
    unittest.main()
