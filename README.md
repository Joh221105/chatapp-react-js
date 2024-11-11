# Chat Room Application

A real-time chat room application built with React (frontend) and Flask-SocketIO (backend). This application allows users to join chat rooms, send messages, and interact in with real-time communication facilitated by WebSockets.

## Features
- Join and create rooms: Users can create and join rooms to chat with others.
- Real-time messaging: Messages are sent and received in real-time using Socket.IO.
- Room management: Users can leave rooms, and rooms can be dynamically updated with new users.
- User management: Each user has a unique username, and their messages are tagged with it.

## Tech Stack
Frontend: React, Tailwind CSS, React Router
Backend: Flask, Flask-SocketIO, SQLite (for room and user management)

## Setup & Installation
1. Clone the repository
```
git clone git@github.com:Joh221105/chatapp-react-js.git
cd chat-room-app
```
2. Install backend dependencies

```
cd backend
npm install
```

3. Install frontend dependencies

```
cd frontend
npm install
```

4. Run the backend
```
nodemon app.js
```
5. Run the frontend

```
npm start
```

Frontend: The React app will be available at http://localhost:3000.
Backend: The Flask API will be available at http://localhost:5001.

## How It Works

### Frontend 
The user is able to create and join rooms through the UI.
On room selection, users can enter a username and join the room.
The user can send and receive messages in real-time using Socket.IO.
The chat interface dynamically updates as messages are received.

### Backend 
The backend listens for WebSocket connections on /socket.io.
When a user joins a room, the backend manages the connection and allows real-time communication within the room.
Messages sent by users are broadcasted to other clients in the same room.
