import pytest
import asyncio
import json
import websockets
from app.main import app
from app.websocket.connection_manager import manager


@pytest.fixture
def client():
    from fastapi.testclient import TestClient
    with TestClient(app) as c:
        yield c


def test_health_endpoint():
    from fastapi.testclient import TestClient
    with TestClient(app) as client:
        response = client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "ok"


def test_app_starts():
    from fastapi.testclient import TestClient
    with TestClient(app) as client:
        response = client.get("/health")
        assert response.status_code == 200