import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoomHeader = ({ roomName, onLeaveRoom }) => {
  const navigate = useNavigate();

  const handleLeave = () => {
    onLeaveRoom(); // Call the leave room function - passed as a prop
    navigate('/'); // Navigate back to the homepage
  };

  return (
    <div className="room-header bg-blue-500 text-white p-8 flex justify-between items-center rounded-t">
      <h1 className=" my-5 text-2xl">Room: {roomName}</h1>
      <button
        onClick={handleLeave}
        className="bg-red-500 p-2 rounded text-sm"
      >
        Leave Room
      </button>
    </div>
  );
};

export default RoomHeader;
