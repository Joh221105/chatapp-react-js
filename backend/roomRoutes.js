import express from 'express';
import {
    createRoom,
    getRoom,
    getRooms,
    addUserToRoom,
    getUsersInRoom,
    removeUserFromRoom
} from './roomController.js';

const app = express.Router();

// Create a new room
app.post('/create', createRoom);

// Get a specific room by ID
app.get('/:roomId', getRoom);

// Get all rooms
app.get('/', getRooms);

// Add a user to a room
app.post('/addUser', addUserToRoom);

// Get all users in a specific room
app.get('/:roomId/users', getUsersInRoom);

// Remove user from room user list when leaving room
app.post('/leave', removeUserFromRoom);

export default app;
