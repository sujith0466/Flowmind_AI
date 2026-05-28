from flask import Blueprint, jsonify, request

from app.config.settings import settings
from app.services.workflow_service import WorkflowService
from app.utils.errors import ApiError

workflow_bp = Blueprint("workflow", __name__)


@workflow_bp.post("/generate")
def generate_workflow():
    payload = request.get_json(silent=True) or {}
    text = str(payload.get("text", "")).strip()

    if not text:
        raise ApiError(
            "validation_error",
            "Please provide a non-empty `text` field.",
            status_code=400,
        )

    if len(text) > settings.max_workflow_input_chars:
        raise ApiError(
            "input_too_large",
            f"Please keep workflow input under {settings.max_workflow_input_chars} characters.",
            status_code=413,
        )

    workflow = WorkflowService().generate(text)
    return jsonify({"success": True, "data": workflow})
