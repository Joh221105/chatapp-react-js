import { Server } from "socket.io";

export const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // Replace with your frontend URL
      methods: ["GET", "POST"],
    },
  });

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

    // // Handle user joining a room
    // socket.on("join_room", (roomId) => {
    //   socket.join(roomId); // Join the room
    // });

    // // Handle user disconnecting
    // socket.on("disconnect", () => {
    //   console.log(`User disconnected: ${socket.id}`);
    // });
  });
};
