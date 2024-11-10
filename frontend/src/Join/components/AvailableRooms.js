import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import rooms from '../../data'; 
import RoomCard from './RoomCard'; 
import JoinForm from './JoinForm'; 

const AvailableRooms = () => {
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [showJoinForm, setShowJoinForm] = useState(false);
    const [username, setUsername] = useState(""); 
    const navigate = useNavigate();

    const handleJoinRoom = (room) => {
        setSelectedRoom(room); // Store the selected room
        setShowJoinForm(true); // Show the join form
    };

    const handleSubmit = (username) => {
        setShowJoinForm(false); // Hide the join form
        navigate(`/room/${selectedRoom.id}`)
    };

    const handleCancel = () => {
        setShowJoinForm(false); // Hide the join form
        setUsername(""); // Reset username when the form is canceled
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
                    onSubmit={handleSubmit} // Pass the submit handler to JoinForm
                    onCancel={handleCancel} // Pass cancel handler to JoinForm
                    username={username} // Pass username to JoinForm
                    setUsername={setUsername} // Pass setUsername function to JoinForm
                    show={showJoinForm} 
                />
            )}
        </div>
    );
};

export default AvailableRooms;