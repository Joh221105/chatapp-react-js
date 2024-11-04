import React from 'react';
import { Outlet } from 'react-router-dom';

const App = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <Outlet />
        </div>
    );
};

export default App;
