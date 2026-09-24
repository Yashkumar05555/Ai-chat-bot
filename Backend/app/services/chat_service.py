from app.services.conversation_service import ConversationService
from app.services.llm_service import LLMService
from app.core.config import settings
from app.core.logging import logger


class ChatService:
    def __init__(self):
        self.llm = LLMService()

    async def process_message(
        self,
        message: str,
        mode: str = "general",
        course_id: str = None,
        session_id: str = "session_default",
    ) -> dict:
        logger.info("Request received (mode=%s, sessionId=%s)", mode, session_id)
        cleaned = (message or "").strip()
        if not cleaned:
            raise ValueError("Message must not be empty.")
        if len(cleaned) > settings.max_message_length:
            raise ValueError(
                f"Message exceeds {settings.max_message_length} characters."
            )
        if mode not in ("general", "course"):
            raise ValueError(f"Invalid mode: {mode!r}. Expected 'general' or 'course'.")
        if not (session_id or "").strip():
            raise ValueError("sessionId must not be empty.")
        logger.info("Question extracted (%d chars)", len(cleaned))

        await ConversationService.get_or_create_conversation(
            session_id, mode, course_id
        )

        await ConversationService.save_message(
            session_id, "user", cleaned
        )

        response = await self.llm.generate_response(cleaned, mode, course_id)

        await ConversationService.save_message(
            session_id, "bot", response["answer"], response["sources"]
        )

        logger.info("Response returned to frontend (mode=%s, sessionId=%s)", mode, session_id)
        return response

    async def get_history(self, session_id: str) -> list[dict]:
        return await ConversationService.get_conversation_history(session_id)

    async def clear_conversation(self, session_id: str) -> None:
        await ConversationService.clear_conversation(session_id)
