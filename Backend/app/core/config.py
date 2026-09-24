import os
from dataclasses import dataclass
from pathlib import Path

from dotenv import load_dotenv

# Load Backend/.env into the environment (real env vars take precedence).
load_dotenv(Path(__file__).resolve().parent.parent.parent / ".env")


def _parse_fallback_models() -> list:
    raw = os.getenv("GEMINI_FALLBACK_MODELS", "")
    if raw.strip():
        return [m.strip() for m in raw.split(",") if m.strip()]
    return [
        "gemini-3.5-flash-lite",
        "gemini-3-flash-preview",
        "gemini-3.6-flash",
    ]


@dataclass
class Settings:
    gemini_api_key: str = os.getenv("GEMINI_API_KEY", "")
    gemini_model: str = os.getenv("GEMINI_MODEL", "gemini-flash-lite-latest")
    gemini_fallback_models: list = None
    database_url: str = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./data/chats.db")
    ws_host: str = os.getenv("WS_HOST", "0.0.0.0")
    ws_port: int = int(os.getenv("WS_PORT", "8000"))
    max_message_length: int = 4000
    ping_interval: int = 30
    ping_timeout: int = 10
    conversation_ttl_seconds: int = 3600

    def __post_init__(self):
        if self.gemini_fallback_models is None:
            self.gemini_fallback_models = _parse_fallback_models()

    @property
    def gemini_model_chain(self) -> list:
        """Primary model followed by fallbacks (deduplicated, order preserved)."""
        chain = [self.gemini_model] + list(self.gemini_fallback_models or [])
        seen = set()
        ordered = []
        for m in chain:
            if m and m not in seen:
                seen.add(m)
                ordered.append(m)
        return ordered


settings = Settings()
