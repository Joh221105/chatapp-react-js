import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RoomCard from "./RoomCard";
import JoinForm from "./JoinForm";

const AvailableRooms = () => {
  const [rooms, setRooms] = useState([]); // State for rooms from database
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // Fetch rooms from database
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("http://localhost:5001/rooms");
        if (!response.ok) {
          throw new Error("Failed to fetch rooms");
        }
        const data = await response.json();
        setRooms(data); // Set the rooms state with fetched data
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, []);

  const handleJoinRoom = (room) => {
    setSelectedRoom(room);
    setShowJoinForm(true);
  };

  const handleSubmit = async (username) => {
    // Save the username to sessionStorage as userId
    sessionStorage.setItem("userId", username);

    try {
      const response = await fetch("http://localhost:5001/rooms/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomId: selectedRoom.id, userId: username }),
      });

      if (!response.ok) {
        console.error("Failed to add user to room:", response.statusText);
        return;
      }

      console.log(
        `${username} successfully added to room ${selectedRoom.name}`
      );
      setShowJoinForm(false); // Hide the join form
      navigate(`/room/${selectedRoom.id}`);
    } catch (error) {
      console.error("Error adding user to room:", error.message);
    }
  };

  const handleCancel = () => {
    setShowJoinForm(false);
    setUsername("");
  };
  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center h-full mb-10">
        <h2 className="text-2xl font-bold uppercase">{"Available Rooms"}</h2>
        <button
          className="bg-red-300 rounded-lg py-2 px-6 text-slate-700 text-2xl font-bold"
          onClick={handleHomeClick}
        >
          Back
        </button>
      </div>

      <div className="space-y-4 overflow-y-auto max-h-[60vh]">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} onJoin={handleJoinRoom} />
        ))}
      </div>
      {showJoinForm && (
        <JoinForm
          room={selectedRoom}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          username={username}
          setUsername={setUsername}
          show={showJoinForm}
        />
      )}
    </div>
  );
};

export default AvailableRooms;
