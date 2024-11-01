import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import rooms from '../../data'; 
import RoomCard from './RoomCard'; 
import JoinForm from './JoinForm'; 

const AvailableRooms = () => {
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [showJoinForm, setShowJoinForm] = useState(false);
    const navigate = useNavigate();

    const handleJoinRoom = (room) => {
        setSelectedRoom(room); // Store the selected room
        setShowJoinForm(true); // Show the join form
    };

    const handleSubmit = (username) => {
        console.log(`${username} joined room: ${selectedRoom.name}`);
        setShowJoinForm(false); // Hide the join form
        navigate(`/room/${selectedRoom.id}`);
    };

    const handleCancel = () => {
        setShowJoinForm(false); // Hide the join form when canceling
    };

    return (
        <div className="p-5 bg-red-200 rounded-lg">
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
            <JoinForm 
                room={selectedRoom} 
                onSubmit={handleSubmit} 
                onCancel={handleCancel} 
                show={showJoinForm} 
            />
        </div>
    );
};

export default AvailableRooms;
