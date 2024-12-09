import React, { useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5001");

const MessageInput = ({ roomId }) => {
  const [message, setMessage] = useState("");
  const username = sessionStorage.getItem("userId"); // Get username from sessionStorage

  const handleSend = () => {
    if (message.trim() !== "") {
      // Emit the message to the server with username and roomId
      socket.emit("send_message", {
        username: username,
        message: message,
        roomId: roomId, // Pass the roomId to broadcast to the correct room
      });

      // Clear the message input
      setMessage("");
    } else {
      console.log("Message is empty, not sending.");
    }
  };

  return (
    <div className="flex items-center space-x-2 p-2 border-t border-gray-200">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 border rounded focus:outline-none"
      />
      <button
        onClick={handleSend}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
