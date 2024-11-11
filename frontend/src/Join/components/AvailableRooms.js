import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoomCard from './RoomCard';
import JoinForm from './JoinForm';

const AvailableRooms = () => {
    const [rooms, setRooms] = useState([]); // State for rooms from database
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [showJoinForm, setShowJoinForm] = useState(false);
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    // Fetch rooms from database 
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch('http://localhost:5001/rooms'); 
                if (!response.ok) {
                    throw new Error('Failed to fetch rooms');
                }
                const data = await response.json();
                setRooms(data); // Set the rooms state with fetched data
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };
        fetchRooms();
    }, []);

    const handleJoinRoom = (room) => {
        setSelectedRoom(room);
        setShowJoinForm(true);
    };

    const handleSubmit = (username) => {
        setShowJoinForm(false);
        navigate(`/room/${selectedRoom.id}`);
    };

    const handleCancel = () => {
        setShowJoinForm(false);
        setUsername("");
    };

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-4">Available Rooms</h2>
            <div className="space-y-4">
                {rooms.map((room) => (
                    <RoomCard 
                        key={room.id} 
                        room={room} 
                        onJoin={handleJoinRoom}
                    />
                ))}
            </div>
            {showJoinForm && (
                <JoinForm 
                    room={selectedRoom} 
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    username={username}
                    setUsername={setUsername}
                    show={showJoinForm} 
                />
            )}
        </div>
    );
};

export default AvailableRooms;
