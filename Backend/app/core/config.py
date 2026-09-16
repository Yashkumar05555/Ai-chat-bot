import os
from dataclasses import dataclass


@dataclass
class Settings:
    gemini_api_key: str = os.getenv("GEMINI_API_KEY", "")
    database_url: str = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./data/chats.db")
    ws_host: str = os.getenv("WS_HOST", "0.0.0.0")
    ws_port: int = int(os.getenv("WS_PORT", "8000"))
    max_message_length: int = 4000
    ping_interval: int = 30
    ping_timeout: int = 10
    conversation_ttl_seconds: int = 3600


settings = Settings()
