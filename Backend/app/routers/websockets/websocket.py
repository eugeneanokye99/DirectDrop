from fastapi import WebSocket, APIRouter
from app.websocket_handler import websocket_manager

router = APIRouter(
    tags=["Websocket"]
)

@router.websocket("/ws/{email}")
async def websocket_endpoint(websocket: WebSocket, email: str):
    """WebSocket endpoint for file transfer signaling."""
    await websocket_manager(websocket, email)
