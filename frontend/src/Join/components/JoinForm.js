import React from "react";

const JoinForm = ({ room, onSubmit, onCancel, username, setUsername, show }) => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username);
    }
  };

  // Render null or an empty fragment if room is null
  if (!room) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onCancel} // Close form when clicking outside
    >
      <div
        className="bg-white p-8 rounded shadow-md w-[35%] h-[30%] transition-transform duration-300 transform"
        onClick={(e) => e.stopPropagation()} // Prevent click events from propagating to the overlay
      >
        <form onSubmit={handleSubmit} className="flex flex-col justify-between">
          <h2 className="text-center text-2xl font-semibold">
            Join Room: {room.name}
          </h2>
          <input
            type="text"
            placeholder="Enter your username"
            value={username} // Use the passed username state
            onChange={(e) => setUsername(e.target.value)} // Use the passed setUsername function
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
