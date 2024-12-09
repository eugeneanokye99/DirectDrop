import json
from fastapi import WebSocket, WebSocketDisconnect

# Store connected clients
clients = {}

async def websocket_manager(websocket: WebSocket, email: str):
    """Handles WebSocket connection, communication, and cleanup."""
    await websocket.accept()
    clients[email] = websocket  # Add the client to the list
    print(f"Client {email} connected.")

    try:
        while True:
            try:
                message = await websocket.receive_text()
                data = json.loads(message)

                if data["type"] == "ping":
                    # Respond to ping to keep the connection alive
                    await websocket.send_text(json.dumps({"type": "pong"}))
                elif data["type"] == "offer":
                    recipient = data["email"]
                    offer = data["offer"]
                    if recipient in clients:
                        await clients[recipient].send_text(json.dumps({
                            "type": "offer",
                            "offer": offer,
                            "sender": email
                        }))
                elif data["type"] == "answer":
                    recipient = data["email"]
                    answer = data["answer"]
                    if recipient in clients:
                        await clients[recipient].send_text(json.dumps({
                            "type": "answer",
                            "answer": answer,
                            "sender": email
                        }))
            except Exception as e:
                print(f"Error handling message from {email}: {e}")
                break  # Exit loop on error

    except WebSocketDisconnect:
        print(f"Client {email} disconnected.")
    finally:
        # Always remove the client on disconnect
        clients.pop(email, None)
        print(f"Cleaned up client {email}.")
