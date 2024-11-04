import express from 'express';
import {
    createRoom,
    getRoom,
    getRooms,
    addUserToRoom,
    getUsersInRoom
} from './roomController.js';

const router = express.Router();

// Create a new room
router.post('/create', createRoom);

// Get a specific room by ID
router.get('/:roomId', getRoom);

// Get all rooms
router.get('/', getRooms);

// Add a user to a room
router.post('/addUser', addUserToRoom);

// Get all users in a specific room
router.get('/:roomId/users', getUsersInRoom);

export default router;
