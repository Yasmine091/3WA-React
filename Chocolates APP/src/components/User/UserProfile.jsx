import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserById } from '../../services/userService';

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await fetchUserById(id);
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    loadUserData();
  }, [id]);

  return (
    <div className="flex flex-col pt-20 items-center min-h-screen bg-gray-900">
    <h1 className="text-4xl font-semibold text-center text-white mb-8">User profile</h1>
      <div className="max-w-xl w-full bg-gray-800 rounded-lg shadow-md p-6">
        {user ? (
          <div className="text-white space-y-4">
            <div>
              <h3 className="text-xl font-medium">First name:</h3>
              <p className="text-lg">{user.firstname || 'Not available'}</p>
            </div>
            <div>
              <h3 className="text-xl font-medium">Last name:</h3>
              <p className="text-lg">{user.lastname || 'Not available'}</p>
            </div>
            <div>
              <h3 className="text-xl font-medium">Email:</h3>
              <p className="text-lg">{user.email || 'Not available'}</p>
            </div>
            <div>
              <h3 className="text-xl font-medium">Phone:</h3>
              <p className="text-lg">{user.phone || 'Not available'}</p>
            </div>
            <div>
              <h3 className="text-xl font-medium">Address:</h3>
              <p className="text-lg">{user.addressLine1 || 'Not available'}</p>
            </div>
            <div>
              <h3 className="text-xl font-medium">City:</h3>
              <p className="text-lg">{user.city || 'Not available'}</p>
            </div>
            <div>
              <h3 className="text-xl font-medium">Postal code:</h3>
              <p className="text-lg">{user.postalCode || 'Not available'}</p>
            </div>
            <div>
              <h3 className="text-xl font-medium">Country:</h3>
              <p className="text-lg">{user.country || 'Not available'}</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-white">Loading user profile...</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;