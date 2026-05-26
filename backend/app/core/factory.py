from flask import Flask, jsonify
from flask_cors import CORS

from app.api import api_bp
from app.config.settings import settings
from app.utils.errors import ApiError


def create_app() -> Flask:
    app = Flask(__name__)
    app.config["SECRET_KEY"] = settings.secret_key

    CORS(
        app,
        resources={
            r"/api/*": {"origins": settings.cors_origins},
            r"/health": {"origins": settings.cors_origins},
        },
    )

    app.register_blueprint(api_bp)
    register_error_handlers(app)

    return app


def register_error_handlers(app: Flask) -> None:
    @app.errorhandler(ApiError)
    def handle_api_error(error: ApiError):
        return jsonify(error.to_response()), error.status_code

    @app.errorhandler(404)
    def handle_not_found(_error):
        return jsonify({"success": False, "error": {"code": "not_found", "message": "Route not found."}}), 404

    @app.errorhandler(500)
    def handle_server_error(_error):
        return jsonify({"success": False, "error": {"code": "server_error", "message": "Unexpected server error."}}), 500
