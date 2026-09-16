import pytest
from unittest.mock import AsyncMock, patch, MagicMock
from app.services.chat_service import ChatService
from app.services.conversation_service import ConversationService


@pytest.mark.asyncio
async def test_chat_service_process_message():
    service = ChatService()
    with patch.object(service.llm, 'generate_response', new_callable=AsyncMock) as mock_llm:
        mock_llm.return_value = {
            "answer": "Test response",
            "sources": ["src1"],
            "timestamp": "2024-01-01T00:00:00"
        }
        response = await service.process_message(
            message="What courses do you offer?",
            mode="general",
            session_id="test_session_chat"
        )
        assert "answer" in response
        assert "sources" in response
        assert "timestamp" in response
        assert isinstance(response["answer"], str)
        assert isinstance(response["sources"], list)


@pytest.mark.asyncio
async def test_chat_service_course_mode():
    service = ChatService()
    with patch.object(service.llm, 'generate_response', new_callable=AsyncMock) as mock_llm:
        mock_llm.return_value = {
            "answer": "Course response",
            "sources": ["course_src"],
            "timestamp": "2024-01-01T00:00:00"
        }
        response = await service.process_message(
            message="What topics?",
            mode="course",
            course_id="data-science-ai",
            session_id="test_session_course"
        )
        assert "answer" in response
        assert "sources" in response


@pytest.mark.asyncio
async def test_conversation_service_persistence():
    session_id = "test_persistence_session"
    await ConversationService.get_or_create_conversation(session_id, "general")
    await ConversationService.save_message(session_id, "user", "Hello world")
    history = await ConversationService.get_conversation_history(session_id)
    assert len(history) >= 1
    assert history[-1]["sender"] == "user"
    assert history[-1]["content"] == "Hello world"


@pytest.mark.asyncio
async def test_conversation_service_clear():
    session_id = "test_clear_session"
    await ConversationService.get_or_create_conversation(session_id, "general")
    await ConversationService.save_message(session_id, "user", "test")
    await ConversationService.clear_conversation(session_id)
    history = await ConversationService.get_conversation_history(session_id)
    assert len(history) == 0