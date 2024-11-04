import { Server } from 'socket.io';

export const setupSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000", // Replace with your frontend URL
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        // Handle message sending
        socket.on('send_message', (data) => {
            console.log(`Message received: ${data.message}`);
            io.emit('receive_message', data); // Broadcast the message to all clients
        });

        // Handle user joining a room
        socket.on('join_room', (roomId) => {
            socket.join(roomId);
            console.log(`User ${socket.id} joined room: ${roomId}`);
        });

        // Handle user disconnecting
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
};
