import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateRoomPage = () => {
  const [roomName, setRoomName] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    // Here, you can add logic to create a room
    // For now, we just navigate to the chat room page
    navigate(`/room/${roomName}`, { state: { username } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Create a Room</h1>
      <input
        type="text"
        placeholder="Enter Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        className="border border-gray-300 rounded p-2 mb-4 w-80"
      />
      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border border-gray-300 rounded p-2 mb-4 w-80"
      />
      <button
        onClick={handleCreateRoom}
        className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition duration-200"
      >
        Create Room
      </button>
    </div>
  );
};

export default CreateRoomPage;
