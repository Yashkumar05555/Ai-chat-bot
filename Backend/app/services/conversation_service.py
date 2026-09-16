from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete
from app.models.database import Conversation, Message, async_session_maker
from typing import Optional
import uuid
from datetime import datetime


class ConversationService:
    @staticmethod
    async def get_or_create_conversation(
        session_id: str, conversation_type: str = "general", course_id: Optional[str] = None
    ) -> str:
        async with async_session_maker() as db:
            result = await db.execute(
                select(Conversation).where(Conversation.id == session_id)
            )
            conv = result.scalar_one_or_none()
            if not conv:
                conv = Conversation(
                    id=session_id,
                    type=conversation_type,
                    course_id=course_id,
                )
                db.add(conv)
                await db.commit()
            return session_id

    @staticmethod
    async def save_message(
        conversation_id: str, sender: str, content: str, sources: Optional[list] = None
    ) -> None:
        async with async_session_maker() as db:
            msg = Message(
                conversation_id=conversation_id,
                sender=sender,
                content=content,
                sources=", ".join(sources) if sources else None,
            )
            db.add(msg)
            await db.commit()

    @staticmethod
    async def get_conversation_history(
        conversation_id: str, limit: int = 50
    ) -> list[dict]:
        async with async_session_maker() as db:
            result = await db.execute(
                select(Message)
                .where(Message.conversation_id == conversation_id)
                .order_by(Message.timestamp.asc())
                .limit(limit)
            )
            messages = result.scalars().all()
            return [
                {
                    "id": m.id,
                    "sender": m.sender,
                    "content": m.content,
                    "sources": m.sources.split(", ") if m.sources else [],
                    "timestamp": m.timestamp.isoformat() if m.timestamp else None,
                }
                for m in messages
            ]

    @staticmethod
    async def clear_conversation(conversation_id: str) -> None:
        async with async_session_maker() as db:
            await db.execute(
                delete(Message).where(Message.conversation_id == conversation_id)
            )
            await db.execute(
                delete(Conversation).where(Conversation.id == conversation_id)
            )
            await db.commit()
