import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://127.0.0.1:5000', {
    transports: ['websocket'], 
});



const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);  // holds all the messages in the chat

    useEffect(() => {
        socket.on('receive_message', (data) => {    // listens to receive_message events from server - located in the send_message block, updates messages array
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socket.off('receive_message');    // cleans up event listener
        };
    }, []);

    const sendMessage = () => {
        socket.emit('send_message', message);  // triggers the send_message code block in app.py/server
        setMessage('');  // clears input field
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
