import os
from dataclasses import dataclass
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parents[2]
load_dotenv(BASE_DIR / ".env")


def _as_bool(value: str | None, default: bool = False) -> bool:
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "on"}


def _as_float(value: str | None, default: float) -> float:
    if value is None:
        return default
    try:
        return float(value)
    except ValueError:
        return default


def _as_int(value: str | None, default: int) -> int:
    if value is None:
        return default
    try:
        return int(value)
    except ValueError:
        return default


def _as_csv(value: str | None, default: list[str]) -> list[str]:
    if not value:
        return default
    return [item.strip() for item in value.split(",") if item.strip()]


@dataclass(frozen=True)
class Settings:
    env: str = os.getenv("FLASK_ENV", "production")
    debug: bool = _as_bool(os.getenv("FLASK_DEBUG"), default=False)
    host: str = os.getenv("BACKEND_HOST", "0.0.0.0")
    port: int = _as_int(os.getenv("PORT") or os.getenv("BACKEND_PORT"), 5000)
    secret_key: str = os.getenv("SECRET_KEY", "flowmind-dev-secret")
    frontend_url: str = os.getenv("FRONTEND_URL", "http://localhost:5173")
    cors_origins: list[str] = None
    gemini_api_key: str = os.getenv("GEMINI_API_KEY", "")
    gemini_model: str = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
    gemini_temperature: float = _as_float(os.getenv("GEMINI_TEMPERATURE"), 0.2)
    max_workflow_input_chars: int = _as_int(os.getenv("MAX_WORKFLOW_INPUT_CHARS"), 12000)

    def __post_init__(self):
        default_origins = [
            self.frontend_url,
            "http://localhost:5173",
            "http://127.0.0.1:5173",
        ]
        object.__setattr__(self, "cors_origins", _as_csv(os.getenv("CORS_ORIGINS"), default_origins))


settings = Settings()
