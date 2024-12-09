import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5001");

const MessageBox = ({ roomId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Join the room when the component mounts
    if (roomId) {
      socket.emit("join_room", roomId); // Join the room
    }

    // Listen for incoming messages
    socket.on("receive_message", (messageData) => {
      // Only update if messageData is an object with 'username' and 'message'
      if (messageData && messageData.username && messageData.message) {
        setMessages((prevMessages) => [...prevMessages, messageData]); // Update message list
      }
    });

    // Cleanup the socket listener when the component is unmounted
    return () => {
      socket.off("receive_message");
    };
  }, [roomId]);

  return (
    <div className="h-96 overflow-y-auto p-4 border-b border-gray-200">
      {messages.map((msg, index) => (
        <div key={index} className="mb-2">
          <strong>{msg.username}:</strong> <span>{msg.message}</span>
        </div>
      ))}
    </div>
  );
};

export default MessageBox;
