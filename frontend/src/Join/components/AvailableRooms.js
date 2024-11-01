import React from "react";
import rooms from "../../data";
import RoomCard from "./RoomCard";

const AvailableRooms = () => {
  const handleJoinRoom = (room) => {
    console.log(`Joining room: ${room.name}`); //probably navigate to /room/id
  };

  return (
    <div className="p-5 bg-red-200 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 uppercase">Available Rooms</h2>
      <div className="space-y-4">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} onJoin={handleJoinRoom} />
        ))}
      </div>
    </div>
  );
};

export default AvailableRooms;
