import json
import uuid
import asyncio
from fastapi import WebSocket, WebSocketDisconnect
from app.websocket.connection_manager import manager
from app.services.chat_service import ChatService
from app.core.config import settings
from app.core.logging import logger

chat_service = ChatService()


async def handle_websocket(websocket: WebSocket):
    client_id = str(uuid.uuid4())
    try:
        await manager.connect(websocket, client_id)
        await _handle_messages(client_id, websocket)
    except WebSocketDisconnect:
        pass
    except Exception as e:
        logger.error(f"WebSocket error for {client_id}: {e}")
    finally:
        manager.disconnect(client_id)


async def _handle_messages(client_id: str, websocket: WebSocket):
    while True:
        try:
            data = await asyncio.wait_for(
                websocket.receive_text(),
                timeout=settings.ping_interval + settings.ping_timeout
            )
        except asyncio.TimeoutError:
            await manager.send_message(client_id, {"type": "pong"})
            continue

        try:
            message = json.loads(data)
        except json.JSONDecodeError:
            await manager.send_message(client_id, {
                "type": "error",
                "error": "Invalid JSON"
            })
            continue

        msg_type = message.get("type", "")

        if msg_type == "ping":
            await manager.send_message(client_id, {"type": "pong"})
        elif msg_type == "chat":
            await _handle_chat(client_id, message)
        else:
            await manager.send_message(client_id, {
                "type": "error",
                "error": f"Unknown message type: {msg_type}"
            })


async def _handle_chat(client_id: str, message: dict):
    try:
        await manager.send_message(client_id, {"type": "typing", "isTyping": True})

        response = await chat_service.process_message(
            message=message.get("message", ""),
            mode=message.get("mode", "general"),
            course_id=message.get("courseId"),
            session_id=message.get("sessionId", "session_default"),
        )

        await manager.send_message(client_id, {"type": "typing", "isTyping": False})
        await manager.send_message(client_id, {
            "type": "message",
            "answer": response["answer"],
            "sources": response["sources"],
            "timestamp": response["timestamp"],
        })
    except Exception as e:
        logger.error(f"Chat error for {client_id}: {e}")
        await manager.send_message(client_id, {"type": "typing", "isTyping": False})
        await manager.send_message(client_id, {
            "type": "error",
            "error": str(e)
        })
