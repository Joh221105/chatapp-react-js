import React from "react";

const RoomCard = ({ room, onJoin }) => {
  return (
    <div className="flex align-center justify-between p-6 border border-gray-300 bg-slate-100 rounded-lg shadow-md mb-4">
      <div>
        <h3 className="text-lg font-semibold">{room.name}</h3>
        <p className="text-gray-600">
          {room.currentUsers.length}{" "}
          {room.currentUsers.length === 1 ? "user" : "users"} currently in room
        </p>
      </div>
      <button
        className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
        onClick={() => onJoin(room)}
      >
        Join
      </button>
    </div>
  );
};

export default RoomCard;
