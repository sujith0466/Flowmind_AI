from flask import Blueprint

from app.routes.health import health_bp
from app.routes.workflow import workflow_bp

api_bp = Blueprint("api", __name__)
api_bp.register_blueprint(health_bp)
api_bp.register_blueprint(workflow_bp, url_prefix="/api/workflow")
