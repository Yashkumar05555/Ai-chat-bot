from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime, timezone


class ChatMessage(BaseModel):
    type: str = Field(..., pattern=r"^(chat|ping)$")
    message: str = Field(..., min_length=1, max_length=4000)
    mode: str = Field(default="general", pattern=r"^(general|course)$")
    courseId: Optional[str] = None
    sessionId: str = Field(default="session_default")


class PingMessage(BaseModel):
    type: str = Field(..., pattern=r"^ping$")


class ChatResponse(BaseModel):
    type: str = "message"
    answer: str
    sources: List[str] = Field(default_factory=list)
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class TypingResponse(BaseModel):
    type: str = "typing"
    isTyping: bool


class ErrorResponse(BaseModel):
    type: str = "error"
    error: str


class PongResponse(BaseModel):
    type: str = "pong"
