import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import RoomHeader from "../components/RoomHeader";
import UserList from "../components/UserList";
import MessageInput from "../components/MessageInput";
import MessageBox from "../components/MessageBox";

const ChatRoomPage = () => {
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const socket = React.useRef(null);

  useEffect(() => {
    // Initialize socket connection
    socket.current = io("http://localhost:5001");

    // Fetch room details on load
    const fetchRoomDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5001/rooms/${roomId}`);
        if (!response.ok) {
          console.error("Room not found:", response.status);
          return;
        }
        const roomData = await response.json();
        setRoomName(roomData.name);
      } catch (err) {
        console.error("Error fetching room details:", err.message);
      }
    };

    fetchRoomDetails();

    // Emit join_room event to server
    const userId = sessionStorage.getItem("userId");
    console.log(`User ${userId} is joining room ${roomId}`); // Debug log for username
    if (userId) {
      socket.current.emit("join_room", { roomId, username: userId });
    }

    // Listen for real-time updates of the user list
    socket.current.on("update_user_list", (updatedUsers) => {
      console.log("Updated user list:", updatedUsers); // Debug log for user list
      setUsers(updatedUsers.map((user) => ({ user_id: user.username })));
    });

    // Listen for real-time messages
    socket.current.on("receive_message", (messageData) => {
      console.log("Received message:", messageData); // Debug log for received message
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    // Cleanup on component 
    return () => {
      socket.current.emit("leave_room", roomId); // Notify server about leaving
      socket.current.disconnect(); // Disconnect the socket
    };
  }, [roomId]);

  const handleSendMessage = (messageContent) => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) return;

    const messageData = {
      roomId,
      username: userId,
      message: messageContent,
    };

    console.log(`Sending message from ${userId}: ${messageContent}`); // Debug log for sent message
    socket.current.emit("send_message", messageData);

    setMessages((prevMessages) => [
      ...prevMessages,
      { username: userId, message: messageContent },
    ]);
  };

  const handleLeaveRoom = async () => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      console.error("User ID is not available in sessionStorage");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/rooms/leave", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomId, userId }),
      });

      if (!response.ok) {
        console.error("Failed to leave room, status code:", response.status);
        return;
      }

      // Remove username from sessionStorage
      sessionStorage.removeItem("userId");

      // Navigate back to the home page
      navigate("/");
    } catch (err) {
      console.error("Error leaving room:", err.message);
    }
  };

  return (
    <div className="chat-room-page h-screen w-screen flex flex-col bg-gray-100">
      <RoomHeader roomName={roomName} onLeaveRoom={handleLeaveRoom} />

      <div className="flex-grow flex flex-row">
        {/* User List Panel */}
        <div className="w-1/4 bg-white border-r border-gray-200 p-4">
          <UserList users={users} />
        </div>

        {/* Chat Messages Panel */}
        <div className="w-3/4 flex flex-col justify-between">
          <MessageBox messages={messages} />
          <div className="mb-10 p-10">
            <MessageInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoomPage;
