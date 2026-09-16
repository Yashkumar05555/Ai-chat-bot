import pytest
from app.websocket.connection_manager import manager


def test_manager_initialization():
    assert manager.get_connection_count() == 0


def test_manager_is_connected_false():
    assert manager.is_connected("nonexistent") == False


def test_manager_disconnect():
    assert manager.disconnect("nonexistent") is None


def test_manager_get_connection_count():
    count = manager.get_connection_count()
    assert isinstance(count, int)
    assert count >= 0