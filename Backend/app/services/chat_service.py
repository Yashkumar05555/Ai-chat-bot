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
        await ConversationService.get_or_create_conversation(
            session_id, mode, course_id
        )

        await ConversationService.save_message(
            session_id, "user", message
        )

        response = await self.llm.generate_response(message, mode, course_id)

        await ConversationService.save_message(
            session_id, "bot", response["answer"], response["sources"]
        )

        return response

    async def get_history(self, session_id: str) -> list[dict]:
        return await ConversationService.get_conversation_history(session_id)

    async def clear_conversation(self, session_id: str) -> None:
        await ConversationService.clear_conversation(session_id)
