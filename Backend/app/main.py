from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.core.config import settings
from app.core.logging import setup_logging, logger
from app.models.database import init_db
from app.websocket.connection_manager import manager
from app.websocket.handlers import handle_websocket


@asynccontextmanager
async def lifespan(app: FastAPI):
    setup_logging()
    logger.info("Initializing database...")
    await init_db()
    logger.info(f"Server starting on ws://{settings.ws_host}:{settings.ws_port}/ws")
    yield
    logger.info("Server shutting down...")


app = FastAPI(title="Cranes Varsity AI Chatbot Backend", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await handle_websocket(websocket)


@app.get("/health")
async def health():
    return {"status": "ok", "connections": manager.get_connection_count()}
