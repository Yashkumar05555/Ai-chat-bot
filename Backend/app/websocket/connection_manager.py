import asyncio
import json
from typing import Set, Dict
from fastapi import WebSocket, WebSocketDisconnect
from app.core.logging import logger


class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}

    async def connect(self, websocket: WebSocket, client_id: str) -> None:
        await websocket.accept()
        self.active_connections[client_id] = websocket
        logger.info(f"Client connected: {client_id} (total: {len(self.active_connections)})")

    def disconnect(self, client_id: str) -> None:
        if client_id in self.active_connections:
            del self.active_connections[client_id]
            logger.info(f"Client disconnected: {client_id} (total: {len(self.active_connections)})")

    async def send_message(self, client_id: str, data: dict) -> None:
        websocket = self.active_connections.get(client_id)
        if websocket and not websocket.client_closed:
            try:
                await websocket.send_json(data)
            except Exception as e:
                logger.error(f"Error sending to {client_id}: {e}")
                self.disconnect(client_id)

    async def broadcast(self, data: dict) -> None:
        disconnected = []
        for client_id, websocket in self.active_connections.items():
            try:
                if not websocket.client_closed:
                    await websocket.send_json(data)
            except Exception as e:
                logger.error(f"Broadcast error to {client_id}: {e}")
                disconnected.append(client_id)
        for cid in disconnected:
            self.disconnect(cid)

    def get_connection_count(self) -> int:
        return len(self.active_connections)

    def is_connected(self, client_id: str) -> bool:
        return client_id in self.active_connections and not self.active_connections[client_id].client_closed


manager = ConnectionManager()
