import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, UID, onLogout }) => {

    return (
        <nav className="bg-gray-800 text-white p-4 w-full flex justify-between items-center shadow-md">
        <div className="flex items-center">
            <Link to="/" className="text-xl font-semibold mr-8 hover:text-blue-400">Chocolate Universe</Link>
            <Link to="/chocolates" className="mr-6 hover:text-blue-400">Chocolates</Link>
            {user && (
            <>
                <Link to="/users" className="mr-6 hover:text-blue-400">Users</Link>
                <Link to={`/profile/${UID}`} className="mr-6 hover:text-blue-400">Profile</Link>
                <Link to="/settings" className="mr-6 hover:text-blue-400">Settings</Link>
            </>
            )}
        </div>
        <div>
            {user ? (
            <>
                <button onClick={onLogout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Logout
                </button>
            </>
            ) : (
            <>
                <Link to="/register" className="mr-6 hover:text-blue-400">Register</Link>
                <Link to="/login" className="hover:text-blue-400">Login</Link>
            </>
            )}
        </div>
        </nav>
    );
};  

export default Navbar;