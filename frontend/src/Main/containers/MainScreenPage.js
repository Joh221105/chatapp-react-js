import React from 'react';
import { Link } from 'react-router-dom';

const MainScreenPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-10">Welcome to Chat Rooms</h1>
            <div className="space-y-5">
                <Link 
                    to="/create" 
                    className="px-6 py-3 mx-5 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
                >
                    Create Room
                </Link>
                <Link 
                    to="/join" 
                    className="px-6 py-3 mx-5 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-200"
                >
                    Join Room
                </Link>
            </div>
        </div>
    );
};

export default MainScreenPage;
