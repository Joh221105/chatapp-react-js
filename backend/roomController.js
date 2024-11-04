import { getDatabase } from '../database.js';

// Create a new room
export const createRoom = async (req, res) => {
    const { roomName } = req.body;
    const db = await getDatabase();
    const sql = 'INSERT INTO rooms (name) VALUES (?)';

    try {
        const result = await db.run(sql, [roomName]);
        res.status(201).json({ roomId: result.lastID, message: 'Room created successfully' });
    } catch (err) {
        console.error('Error creating room:', err.message);
        res.status(500).json({ error: 'Failed to create room' });
    }
};

// Get a specific room by ID
export const getRoom = async (req, res) => {
    const { roomId } = req.params;
    const db = await getDatabase();
    const sql = 'SELECT * FROM rooms WHERE id = ?';

    try {
        const room = await db.get(sql, [roomId]);
        if (room) {
            res.status(200).json(room);
        } else {
            res.status(404).json({ error: 'Room not found' });
        }
    } catch (err) {
        console.error('Error fetching room:', err.message);
        res.status(500).json({ error: 'Failed to fetch room' });
    }
};

// Get all rooms
export const getRooms = async (req, res) => {
    const db = await getDatabase();
    const sql = 'SELECT * FROM rooms';

    try {
        const rooms = await db.all(sql);
        res.status(200).json(rooms);
    } catch (err) {
        console.error('Error fetching rooms:', err.message);
        res.status(500).json({ error: 'Failed to fetch rooms' });
    }
};

// Add a user to a room
export const addUserToRoom = async (req, res) => {
    const { roomId, userId } = req.body;
    const db = await getDatabase();
    const sql = 'INSERT INTO room_users (room_id, user_id) VALUES (?, ?)';

    try {
        await db.run(sql, [roomId, userId]);
        res.status(200).json({ message: `User ${userId} added to room ${roomId}` });
    } catch (err) {
        console.error('Error adding user to room:', err.message);
        res.status(500).json({ error: 'Failed to add user to room' });
    }
};

// Get users in a room
export const getUsersInRoom = async (req, res) => {
    const { roomId } = req.params;
    const db = await getDatabase();
    const sql = 'SELECT user_id FROM room_users WHERE room_id = ?';

    try {
        const users = await db.all(sql, [roomId]);
        res.status(200).json(users.map(user => user.user_id)); // Return just the user IDs
    } catch (err) {
        console.error('Error fetching users in room:', err.message);
        res.status(500).json({ error: 'Failed to fetch users in room' });
    }
};
