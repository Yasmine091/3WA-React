import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllUsers } from '../../services/userService'; // Make sure to implement this function

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const fetchedUsers = await fetchAllUsers(); // Fetch all users
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    getUsers();
  }, []);

  return (
    <div className="flex flex-col items-center pt-20 min-h-screen bg-gray-900 p-5">
      <h1 className="text-3xl font-bold text-white mb-6">Users list</h1>
      <div className="w-full max-w-4xl">
        {users.length ? (
          <ul className="bg-gray-800 text-white rounded-lg shadow-md p-4">
            {users.map((user) => (
              <li key={user._id} className="border-b border-gray-700 last:border-0 py-2 flex justify-between items-center">
                <span>{user.name} - {user.email}</span>
                <Link to={`/profile/${user._id}`} className="text-blue-400 hover:text-blue-300">View profile</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white text-center">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default UsersList;
