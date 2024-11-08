import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RoomHeader from '../components/RoomHeader';
import UserList from '../components/UserList';

const ChatRoomPage = () => {
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    // Fetch room name
    const fetchRoomDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/rooms/${roomId}`);
        if (!response.ok) {
          console.error('Room not found:', response.status);
          return;
        }

        const roomData = await response.json();
        setRoomName(roomData.name);
      } catch (err) {
        console.error('Error fetching room details:', err.message);
      }
    };

    // Fetch users in the room
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

    fetchRoomDetails();
    fetchUsers();
  }, [roomId]);

  const handleLeaveRoom = async () => {
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
      console.error('User ID is not available in localStorage');
      return;
    }
  
    try {
      // Remove user from the room
      const response = await fetch('http://localhost:5000/rooms/leave', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roomId, userId }), 
      });
      
      if (!response.ok) {
        console.error('Failed to leave room, status code:', response.status);
        return;
      }
  
      console.log('User successfully left the room');
  
      // Call the backend to check if room is empty and delete it if necessary
      const checkRoomResponse = await fetch(`http://localhost:5000/rooms/${roomId}/users`);
      
      if (checkRoomResponse.ok) {
        const usersInRoom = await checkRoomResponse.json();
  
        // If no users are left in the room, delete the room
        if (usersInRoom.length === 0) {
          const deleteRoomResponse = await fetch(`http://localhost:5000/rooms/${roomId}`, {
            method: 'DELETE',
          });
  
          if (deleteRoomResponse.ok) {
            console.log('Room has been deleted');
          } else {
            console.error('Failed to delete room, status code:', deleteRoomResponse.status);
          }
        }
      } else {
        console.error('Failed to fetch users in room, status code:', checkRoomResponse.status);
      }
  
      // Navigate to home
      navigate('/');
    } catch (err) {
      console.error('Error leaving room:', err.message);
    }
  };
  
  
  
  
  

  return (
    <div className="chat-room-page min-h-screen bg-gray-100 flex flex-col">
      <RoomHeader roomName={roomName} onLeaveRoom={handleLeaveRoom} />
      <UserList users={users} />
    </div>
  );
};

export default ChatRoomPage;
