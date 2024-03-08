import React, { useState, useEffect } from 'react';
import { deleteUser, fetchUserById, updateUser } from '../../services/userService';
import { useNavigate } from 'react-router-dom';

const UserSettings = ({UID}) => {

  const navigate = useNavigate();

  const [editFormData, setEditFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    addressLine1: '',
    city: '',
    postalCode: '',
    country: '',
  });

  useEffect(() => {

    const loadUserData = async () => {
      try {
        const userData = await fetchUserById(UID);
        if (userData) {
          setEditFormData({
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.email,
            phone: userData.phone || '',
            addressLine1: userData.addressLine1 || '',
            city: userData.city || '',
            postalCode: userData.postalCode || '',
            country: userData.country || '',
          });
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }

    }
    loadUserData();
  }, [UID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(UID, editFormData);
      alert('Profile updated successfully.');
      navigate(`/profile/${UID}`);
    } catch (error) {
      console.error('Failed to update user profile:', error);
      alert('Failed to update profile.');
    }
  };

  const handleAccountDeletion = async () => {
    const confirmDeletion = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (confirmDeletion) {
      try {
        await deleteUser(UID);
        localStorage.removeItem('userToken');
        navigate('/');
        alert('Account successfully deleted.');
      } catch (error) {
        console.error('Failed to delete account:', error);
        alert('Failed to delete account.');
      }
    }
  };

  return (
    <div className="bg-gray-900 pt-20 text-white p-5 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-xl">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-semibold text-center mb-8">Account settings</h1>
          <button onClick={handleAccountDeletion} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Delete account
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-xl bg-gray-800 p-6 rounded-lg shadow-md">
        <TextField label="First name" name="firstname" value={editFormData.firstname} handleChange={handleChange} />
        <TextField label="Last lame" name="lastname" value={editFormData.lastname} handleChange={handleChange} />
        <TextField label="Email" name="email" value={editFormData.email} handleChange={handleChange} />
        <TextField label="Phone" name="phone" value={editFormData.phone} handleChange={handleChange} />
        <TextField label="Address" name="addressLine1" value={editFormData.addressLine1} handleChange={handleChange} />
        <div className="mb-4 flex justify-between gap-4">
          <div className="flex-1">
            <TextField label="City" name="city" value={editFormData.city} handleChange={handleChange} />
          </div>
          <div className="flex-1">
            <TextField label="Postal code" name="postalCode" value={editFormData.postalCode} handleChange={handleChange} />
          </div>
        </div>
        <TextField label="Country" name="country" value={editFormData.country} handleChange={handleChange} />
        <button type="submit" className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Save changes
        </button>
      </form>
    </div>
  );
};

const TextField = ({ label, name, value, handleChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-2">{label}:</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={handleChange}
      className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
);

export default UserSettings;