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
        const response = await fetch(`http://localhost:5000/rooms/${roomId}/users`);
        if (!response.ok) {
          console.error('Room not found:', response.status);
          return;
        }

        const userList = await response.json();
        setUsers(Object.values(userList));
      } catch (err) {
        console.error('Error fetching users:', err.message);
      }
    };

    fetchUsers();
  }, [roomId]); 

  const handleLeaveRoom = async () => {
    const userId = localStorage.getItem('userId');
    
    console.log("Leaving room with Room ID:", roomId);
    console.log("User ID:", userId);

    if (!userId) {
      console.error('User ID is not available in localStorage');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/rooms/leave', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roomId, userId }), 
      });
  
      if (response.ok) {
        console.log('User successfully left the room');
        navigate('/');
      } else {
        console.error('Failed to leave room, status code:', response.status);
      }
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
