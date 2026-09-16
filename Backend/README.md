# Cranes Varsity AI Chatbot — FastAPI Backend

FastAPI WebSocket backend for the Cranes Varsity AI Chatbot frontend.

## Architecture

```
Frontend (WebSocket)
       │
       │ ws://localhost:8000/ws
       ▼
FastAPI WebSocket Server
       │
       ├── WebSocket Handler (connection_manager.py, handlers.py)
       ├── Chat Service
       ├── Conversation Service
       ├── LLM Service (Google Gemini)
       ├── Database Service (SQLite via SQLAlchemy + aiosqlite)
       └── Core Config
```

## Communication Protocol

All communication happens via WebSocket at `ws://localhost:8000/ws`.

### Client → Server Messages

| Type | Fields | Description |
|------|--------|-------------|
| `chat` | `message`, `mode`, `courseId`, `sessionId` | Send a chat message |
| `ping` | — | Heartbeat |

### Server → Client Messages

| Type | Fields | Description |
|------|--------|-------------|
| `message` | `answer`, `sources`, `timestamp` | AI response |
| `typing` | `isTyping` | Typing indicator |
| `error` | `error` | Error message |
| `pong` | — | Heartbeat response |

## Running

```bash
cp .env.example .env
pip install -r requirements.txt
python -m app.main
```

Server starts at `ws://localhost:8000/ws`.

## Tests

```bash
pytest tests/ -v
```
