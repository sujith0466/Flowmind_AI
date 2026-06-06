from app.workflows.workflow_engine import WorkflowEngine


class WorkflowService:
    def __init__(self, workflow_engine: WorkflowEngine | None = None):
        self.workflow_engine = workflow_engine or WorkflowEngine()

    def generate(self, text: str, memory_context: str = "") -> dict:
        return self.workflow_engine.run(text, memory_context)
