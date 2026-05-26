from flask import Blueprint, jsonify, request

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

    workflow = WorkflowService().generate(text)
    return jsonify({"success": True, "data": workflow})
