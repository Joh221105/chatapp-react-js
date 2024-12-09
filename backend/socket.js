import { Server } from "socket.io";

export const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  const roomUsers = {}; // tracks user in each room

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle message sending
    socket.on("send_message", (data) => {
      const formattedMessage = `${data.username}: ${data.message}`;

      // Broadcast the message to all clients if room id not provided
      if (data.roomId) {
        io.to(data.roomId).emit("receive_message", formattedMessage); // Send to the room
      } else {
        io.emit("receive_message", formattedMessage); // Send to all connected clients
      }
    });

    // handle user joining a room
    socket.on("join_room", ({ roomId, username }) => {
      socket.join(roomId);

      // add user to roomUsers
      if (!roomUsers[roomId]) {
        roomUsers[roomId] = [];
      }
      roomUsers[roomId].push({ socketId: socket.id, username });

      // notify all clients in the room of the updated user list
      io.to(roomId).emit("update_user_list", roomUsers[roomId]);
    });

    // handle user leaving or disconnecting
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
      for (const roomId in roomUsers) {
        roomUsers[roomId] = roomUsers[roomId].filter(
          (user) => user.socketId !== socket.id
        );

        // notify the room of the updated user list
        io.to(roomId).emit("update_user_list", roomUsers[roomId]);
      }
    });
  });
};


