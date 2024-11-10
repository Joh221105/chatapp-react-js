import React, { useState } from 'react';

const MessageInput = () => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    // placeholder
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
