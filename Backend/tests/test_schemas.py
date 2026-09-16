import pytest
from app.schemas.chat import ChatMessage, PingMessage, ChatResponse, TypingResponse, ErrorResponse


def test_chat_message_valid():
    msg = ChatMessage(
        type="chat",
        message="Hello",
        mode="general",
        sessionId="session_1"
    )
    assert msg.message == "Hello"
    assert msg.mode == "general"
    assert msg.sessionId == "session_1"


def test_chat_message_course():
    msg = ChatMessage(
        type="chat",
        message="What topics?",
        mode="course",
        courseId="data-science-ai",
        sessionId="session_1"
    )
    assert msg.mode == "course"
    assert msg.courseId == "data-science-ai"


def test_ping_message():
    msg = PingMessage(type="ping")
    assert msg.type == "ping"


def test_chat_response():
    resp = ChatResponse(answer="Hello!", sources=["src1"], timestamp="2024-01-01T00:00:00")
    assert resp.answer == "Hello!"
    assert resp.sources == ["src1"]


def test_chat_response_defaults():
    resp = ChatResponse(answer="Hi")
    assert resp.sources == []
    assert resp.type == "message"


def test_typing_response():
    resp = TypingResponse(isTyping=True)
    assert resp.type == "typing"
    assert resp.isTyping == True


def test_error_response():
    resp = ErrorResponse(error="Something went wrong")
    assert resp.type == "error"
    assert resp.error == "Something went wrong"


def test_chat_message_invalid_mode():
    with pytest.raises(Exception):
        ChatMessage(type="chat", message="Hi", mode="invalid")


def test_chat_message_empty():
    with pytest.raises(Exception):
        ChatMessage(type="chat", message="")
