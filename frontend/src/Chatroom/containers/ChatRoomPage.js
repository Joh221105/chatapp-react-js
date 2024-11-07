import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RoomHeader from '../components/RoomHeader';
import UserList from '../components/UserList';

const ChatRoomPage = () => {
  const { roomId } = useParams(); // Room Id from the URL
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log("Fetching users for room ID:", roomId);
        const response = await fetch(`http://localhost:5000/rooms/${roomId}/users`);
        if (!response.ok) {
          console.error('Room not found:', response.status);
          return;
        }

        const userList = await response.json();
        console.log("Fetched users:", Object.values(userList));
        setUsers(Object.values(userList));
      } catch (err) {
        console.error('Error fetching users:', err.message);
      }
    };

    fetchUsers();
  }, [roomId]); 

  const handleLeaveRoom = async () => {
    try {
      // Update to use roomId instead of roomName
      await fetch('/leave', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roomId}),
      });
  
      // Redirect user after leaving the room
      navigate('/'); // Navigate back to the home page or other desired location
    } catch (err) {
      console.error('Error leaving room:', err.message);
    }
  };
  
  return (
    <div className="chat-room-page min-h-screen bg-gray-100 flex flex-col">
      <RoomHeader roomId={roomId} onLeaveRoom={handleLeaveRoom} />
      <UserList users={users} />
    </div>
  );
};

export default ChatRoomPage;
