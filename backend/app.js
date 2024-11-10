import express from 'express';
import http from 'http';
import cors from 'cors';
import { createTables } from './database.js'; 
import roomRoutes from './roomRoutes.js';
import { setupSocket } from './socket.js';

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/rooms', roomRoutes); 

// Create database tables
createTables();

// Setup Socket.IO
setupSocket(server);

// Start the server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
