import { getDatabase } from "./database.js";

// Create a new room
export const createRoom = async (req, res) => {
  const { roomName, userId } = req.body;
  const db = await getDatabase();

  try {
    // Insert room
    const roomResult = await db.run("INSERT INTO rooms (name) VALUES (?)", [
      roomName,
    ]);
    const roomId = roomResult.lastID;

    // adds creator id into room's user list
    await db.run("INSERT INTO room_users (room_id, user_id) VALUES (?, ?)", [
      roomId,
      userId,
    ]);

    res.status(201).json({ roomId, message: "Room created successfully" });
  } catch (error) {
    console.error("Error creating room:", error.message);
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

  try {
    const sql = `
      SELECT rooms.id, rooms.name, COUNT(room_users.user_id) AS user_count
      FROM rooms
      LEFT JOIN room_users ON rooms.id = room_users.room_id
      GROUP BY rooms.id;
    `;
    const rooms = await db.all(sql);
    res.status(200).json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error.message);
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
};

// Add a user to a room
export const addUserToRoom = async (req, res) => {
  const { roomId, userId } = req.body;
  const db = await getDatabase();

  try {
    // Check if the user is already in the room
    const existingUser = await db.get("SELECT * FROM room_users WHERE room_id = ? AND user_id = ?", [roomId, userId]);

    if (existingUser) {
      return res.status(200).json({ message: "User already in the room" });
    }

    // Insert user into room_users
    await db.run("INSERT INTO room_users (room_id, user_id) VALUES (?, ?)", [roomId, userId]);
    res.status(200).json({ message: `User ${userId} added to room ${roomId}` });
  } catch (error) {
    console.error("Error adding user to room:", error.message);
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

    // return an empty array if no users found
    if (!users.length) {
      return res.status(200).json([]);
    }

    res.status(200).json(users); // Return the list of users if there are any
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

// deletes all rooms and users
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

// Function to delete a room if it has no users
export const deleteRoomById = async (req, res) => {
  const { roomId } = req.params;

  const db = await getDatabase();

  try {
    // Check if there are any users in the room
    const usersInRoom = await db.all(
      "SELECT * FROM room_users WHERE room_id = ?",
      [roomId]
    );

    if (usersInRoom.length === 0) {
      // If no users are left in the room, delete the room
      await db.run("DELETE FROM rooms WHERE id = ?", [roomId]);
      console.log(`Room ${roomId} deleted because it has no users`);

      res.status(200).json({ message: `Room ${roomId} deleted` });
    } else {
      res.status(400).json({ message: "Room still has users" });
    }
  } catch (err) {
    console.error("Error deleting room:", err.message);
    res.status(500).json({ error: "Error deleting room" });
  }
};
