import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const DATABASE_FILE = 'chat_app.db';

// Connect with DATABASE_FILE database
const getDatabase = async () => {
    const db = await open({
        filename: DATABASE_FILE,
        driver: sqlite3.Database
    });
    return db;
};

// Creates table if it does not exist
const createTables = async () => {
    const db = await getDatabase();
    
    // can generate random ids if needed, instead of auto increment
    const createRoomsTableSQL = `
        CREATE TABLE IF NOT EXISTS rooms (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE
        );`;

    const createRoomUsersTableSQL = `
        CREATE TABLE IF NOT EXISTS room_users (
            room_id INTEGER,
            user_id TEXT,
            PRIMARY KEY (room_id, user_id),
            FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
        );`;

    await db.exec(createRoomsTableSQL);
    await db.exec(createRoomUsersTableSQL);
    console.log('Tables created');
};

export { getDatabase, createTables };
