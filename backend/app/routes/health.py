from datetime import datetime, timezone

from flask import Blueprint, jsonify

from app.config.settings import settings

health_bp = Blueprint("health", __name__)


@health_bp.get("/health")
def health_check():
    return jsonify(
        {
            "success": True,
            "service": "FlowMind AI Backend",
            "status": "healthy",
            "environment": settings.env,
            "timestamp": datetime.now(timezone.utc).isoformat(),
        }
    )
