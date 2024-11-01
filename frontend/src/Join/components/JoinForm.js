import React, { useState } from "react";

const JoinForm = ({ room, onSubmit, onCancel, show }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username);
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onCancel} // Close form when clicking outside
    >
      <div
        className="bg-white p-8 rounded-lg shadow-md w-[35%] h-[30%] transition-transform duration-300 transform"
        onClick={(e) => e.stopPropagation()} 
      >
        <form onSubmit={handleSubmit} className="flex flex-col justify-between">
          <h2 className="text-center text-2xl font-semibold">
            Join Room: {room.name}
          </h2>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 p-3 rounded w-full my-10"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-200"
          >
            Enter Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinForm;
