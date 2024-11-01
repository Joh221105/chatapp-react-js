import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://127.0.0.1:5000', {
    transports: ['websocket'], 
});

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socket.off('receive_message');
        };
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit('send_message', message);
            setMessage('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="flex flex-col h-screen w-screen p-4 bg-gray-100">
            <div className="flex-1 overflow-auto p-4 bg-red-50 rounded-lg shadow-md mb-4">
                {messages.map((msg, index) => (
                    <div key={index} className="p-2 border-b last:border-b-0">
                        {msg}
                    </div>
                ))}
            </div>
            <div className="flex">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown} 
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your message..."
                />
                <button
                    onClick={sendMessage}
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
