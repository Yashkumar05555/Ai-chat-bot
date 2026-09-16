import pytest
import json
import websockets
import subprocess
import sys
import os
import time

WS_URL = "ws://127.0.0.1:8000/ws"


@pytest.fixture(scope="module")
def server_process():
    env = os.environ.copy()
    env["DATABASE_URL"] = "sqlite+aiosqlite:///./data/test_chats.db"
    env["GEMINI_API_KEY"] = "TEST_KEY"
    proc = subprocess.Popen(
        [sys.executable, "-m", "uvicorn", "app.main:app", "--host", "127.0.0.1", "--port", "8000"],
        cwd=os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
        env=env,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    time.sleep(4)
    yield proc
    proc.terminate()
    proc.wait()


@pytest.mark.asyncio
async def test_websocket_ping_pong(server_process):
    async with websockets.connect(WS_URL) as ws:
        await ws.send(json.dumps({"type": "ping"}))
        data = json.loads(await ws.recv())
        assert data["type"] == "pong"


@pytest.mark.asyncio
async def test_websocket_chat(server_process):
    async with websockets.connect(WS_URL) as ws:
        await ws.send(json.dumps({"type": "chat", "message": "Hello", "mode": "general", "sessionId": "ws_001"}))
        typing_data = json.loads(await ws.recv())
        assert typing_data["type"] == "typing"
        assert typing_data["isTyping"] == True
        response_data = json.loads(await ws.recv())
        assert response_data["type"] == "message"
        assert "answer" in response_data
        assert "sources" in response_data
        assert "timestamp" in response_data


@pytest.mark.asyncio
async def test_websocket_course_mode(server_process):
    async with websockets.connect(WS_URL) as ws:
        await ws.send(json.dumps({"type": "chat", "message": "What topics?", "mode": "course", "courseId": "data-science-ai", "sessionId": "ws_002"}))
        typing_data = json.loads(await ws.recv())
        assert typing_data["type"] == "typing"
        response_data = json.loads(await ws.recv())
        assert response_data["type"] == "message"


@pytest.mark.asyncio
async def test_websocket_invalid_json(server_process):
    async with websockets.connect(WS_URL) as ws:
        await ws.send("{invalid json}")
        data = json.loads(await ws.recv())
        assert data["type"] == "error"


@pytest.mark.asyncio
async def test_websocket_unknown_type(server_process):
    async with websockets.connect(WS_URL) as ws:
        await ws.send(json.dumps({"type": "unknown"}))
        data = json.loads(await ws.recv())
        assert data["type"] == "error"


@pytest.mark.asyncio
async def test_websocket_multiple_messages(server_process):
    async with websockets.connect(WS_URL) as ws:
        await ws.send(json.dumps({"type": "chat", "message": "Msg 1", "mode": "general", "sessionId": "ws_003a"}))
        typing_data = json.loads(await ws.recv())
        assert typing_data["type"] == "typing"
        response_data = json.loads(await ws.recv())
        assert response_data["type"] == "message"
        await ws.send(json.dumps({"type": "chat", "message": "Msg 2", "mode": "general", "sessionId": "ws_003b"}))
        typing_data = json.loads(await ws.recv())
        assert typing_data["type"] == "typing"
        response_data = json.loads(await ws.recv())
        assert response_data["type"] == "message"


@pytest.mark.asyncio
async def test_websocket_chat_response_format(server_process):
    async with websockets.connect(WS_URL) as ws:
        await ws.send(json.dumps({"type": "chat", "message": "Test", "mode": "general", "sessionId": "ws_004"}))
        typing_data = json.loads(await ws.recv())
        assert typing_data["type"] == "typing"
        response_data = json.loads(await ws.recv())
        assert "answer" in response_data
        assert "sources" in response_data
        assert "timestamp" in response_data
        assert isinstance(response_data["answer"], str)
        assert isinstance(response_data["sources"], list)