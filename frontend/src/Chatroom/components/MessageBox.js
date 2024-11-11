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
    socket.on("receive_message", (formattedMessage) => {
      setMessages((prevMessages) => [...prevMessages, formattedMessage]); // Update message list
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
          {msg}
        </div>
      ))}
    </div>
  );
};

export default MessageBox;
