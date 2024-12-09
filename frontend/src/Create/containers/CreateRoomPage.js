import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateRoomPage = () => {
  const [roomName, setRoomName] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleCreateRoom = async () => {
    try {
      // Create the room
      const createRoomResponse = await fetch(
        "http://localhost:5001/rooms/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ roomName }),
        }
      );

      if (createRoomResponse.ok) {
        const { roomId } = await createRoomResponse.json();
        console.log("Room created with ID:", roomId);

        // Store the userId (username) in sessionStorage
        sessionStorage.setItem("userId", username);

        // Add the creator to the room's user list
        const addUserResponse = await fetch(
          "http://localhost:5001/rooms/addUser",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ roomId, userId: username }),
          }
        );

        if (addUserResponse.ok) {
          console.log(`User ${username} added to room ${roomId}`);
          navigate(`/room/${roomId}`, { state: { username } });
        } else {
          console.error("Failed to add user to room");
        }
      } else {
        console.error("Failed to create room");
      }
    } catch (err) {
      console.error("Error creating room or adding user:", err.message);
    }
  };
  
  const handleBack = () => {
    navigate('/');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Create a Room</h1>
      <input
        type="text"
        placeholder="Enter Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        className="border border-gray-300 rounded p-2 mb-4 w-80"
      />
      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border border-gray-300 rounded p-2 mb-4 w-80"
      />
      <div className="flex justify-between w-full flex-col">
        <button
          onClick={handleCreateRoom}
          className="bg-blue-500 text-white rounded p-3 hover:bg-blue-600 transition duration-200 my-5"
        >
          Create Room
        </button>
        <button onClick={handleBack} className="bg-red-500 text-white rounded p-3 hover:bg-red-600 transition duration-200">
          Back
        </button>
      </div>
    </div>
  );
};

export default CreateRoomPage;
