import json
import google.generativeai as genai
from google.generativeai.types import GenerationConfig

from app.config.settings import settings
from app.utils.errors import ApiError


class GeminiService:
    def __init__(self):
        if not settings.gemini_api_key:
            raise ApiError(
                "missing_gemini_api_key",
                "GEMINI_API_KEY is not configured. Copy .env.example to .env and add your key.",
                status_code=503,
            )
        genai.configure(api_key=settings.gemini_api_key)
        self.model = genai.GenerativeModel(settings.gemini_model)

    def json_completion(self, *, system_prompt: str, user_prompt: str) -> dict:
        try:
            full_prompt = f"System Instruction:\n{system_prompt}\n\nUser Input:\n{user_prompt}"
            
            response = self.model.generate_content(
                full_prompt,
                generation_config=GenerationConfig(
                    temperature=settings.gemini_temperature,
                    response_mime_type="application/json",
                ),
            )
            return json.loads(response.text)
        except json.JSONDecodeError as exc:
            raise ApiError(
                "invalid_ai_json",
                "The AI returned a response that could not be parsed as JSON.",
                status_code=502,
            ) from exc
        except Exception as exc:
            reason = str(exc).lower()
            if "429" in reason or "quota" in reason or "rate" in reason:
                raise ApiError(
                    "ai_rate_limited",
                    "The AI service is temporarily rate limited. Please wait a moment and try again.",
                    status_code=503,
                ) from exc

            raise ApiError(
                "gemini_request_failed",
                "The Gemini API request failed while generating the workflow.",
                status_code=502,
            ) from exc
