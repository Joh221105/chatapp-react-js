import { getDatabase } from "./database.js";

// Create a new room
export const createRoom = async (req, res) => {
  const { roomName } = req.body;
  const db = await getDatabase();
  const sql = "INSERT INTO rooms (name) VALUES (?)";

  try {
    const result = await db.run(sql, [roomName]);
    res
      .status(201)
      .json({ roomId: result.lastID, message: "Room created successfully" });
  } catch (err) {
    console.error("Error creating room:", err.message);
    res.status(500).json({ error: "Failed to create room" });
  }
};

// Get a specific room by ID
export const getRoom = async (req, res) => {
  const { roomId } = req.params;
  const db = await getDatabase();
  const sql = "SELECT * FROM rooms WHERE id = ?";

  try {
    const room = await db.get(sql, [roomId]);
    if (room) {
      res.status(200).json(room);
    } else {
      res.status(404).json({ error: "Room not found" });
    }
  } catch (err) {
    console.error("Error fetching room:", err.message);
    res.status(500).json({ error: "Failed to fetch room" });
  }
};

// Get all rooms
export const getRooms = async (req, res) => {
  const db = await getDatabase();
  const sql = "SELECT * FROM rooms";

  try {
    const rooms = await db.all(sql);
    res.status(200).json(rooms);
  } catch (err) {
    console.error("Error fetching rooms:", err.message);
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
};

// Add a user to a room
export const addUserToRoom = async (req, res) => {
  const { roomId, userId } = req.body;
  const db = await getDatabase();
  const sql = "INSERT INTO room_users (room_id, user_id) VALUES (?, ?)";

  try {
    await db.run(sql, [roomId, userId]);
    res.status(200).json({ message: `User ${userId} added to room ${roomId}` });
  } catch (err) {
    console.error("Error adding user to room:", err.message);
    res.status(500).json({ error: "Failed to add user to room" });
  }
};

// Get users in a room
export const getUsersInRoom = async (req, res) => {
  const { roomId } = req.params; // Extract roomId
  const db = await getDatabase();
  const sql = "SELECT user_id FROM room_users WHERE room_id = ?";
  try {
    const users = await db.all(sql, [roomId]);
    if (!users.length) {
      return res.status(404).json({ error: "Room not found" });
    }
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Removes user from user list
export const removeUserFromRoom = async (req, res) => {
  const roomId = parseInt(req.body.roomId);
  const userId = req.body.userId;
  const db = await getDatabase();
  const sql = "DELETE FROM room_users WHERE room_id = ? AND user_id = ?";

  try {
    const result = await db.run(sql, [roomId, userId]);
    console.log(result);
    res
      .status(200)
      .json({ message: `User ${userId} removed from room ${roomId}` });
  } catch (err) {
    console.error("Error removing user from room:", err.message);
    res.status(500).json({ error: "Error removing user from room" });
  }
};

export const deleteAllRoomsAndUsers = async (req, res) => {
  const db = await getDatabase();

  try {
    // Start a transaction to ensure both deletes happen together
    await db.exec("BEGIN TRANSACTION");

    // Delete all users from room_users table
    await db.run("DELETE FROM room_users");

    // Delete all rooms from rooms table
    await db.run("DELETE FROM rooms");

    // Reset room_id count back to 1
    await db.run('DELETE FROM sqlite_sequence WHERE name = "rooms"');

    // Commit the transaction
    await db.exec("COMMIT");
    res
      .status(200)
      .json({ message: "All rooms and users deleted successfully" });
  } catch (err) {
    // Rollback transaction in case of error
    await db.exec("ROLLBACK");
    res.status(500).json({ error: "Error deleting all rooms and users" });
  }
};
