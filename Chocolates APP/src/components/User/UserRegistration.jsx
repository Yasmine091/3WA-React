import React, { useState } from 'react';
import { register } from '../../services/userService';

const UserRegistration = () => {
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phone: '',
    addressLine1: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const handleChange = (e) => {
    const sanitizedValue = e.target.value.trim();
    setUserData({ ...userData, [e.target.name]: sanitizedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userData.email || !userData.password) {
      alert('Email and password are required.');
      return;
    }
    try {
      await register(userData);
      alert('Registration successful');
    } catch (error) {
      alert('Registration failed: ' + error.response.data.error);
      console.log(error)
    }
  };

  return (
    <div className="flex flex-col items-center pt-20 min-h-screen bg-gray-900">
      <div className="w-full max-w-md">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Register</h1>
        <form onSubmit={handleSubmit} className="bg-gray-800 shadow-lg rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">First name:</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="firstname" value={userData.firstname} onChange={handleChange} placeholder="John" required />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">Last name:</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="lastname" value={userData.lastname} onChange={handleChange} placeholder="Doe" required />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">Email:</label>
            <input type="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" value={userData.email} onChange={handleChange} placeholder="john.doe@example.com" required />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">Password:</label>
            <input type="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="password" value={userData.password} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">Phone:</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="phone" value={userData.phone} onChange={handleChange} placeholder="+1234567890" />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">Address:</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="addressLine1" value={userData.addressLine1} onChange={handleChange} placeholder="1234 Main St" required />
          </div>
          <div className="mb-4 flex justify-between gap-4">
            <div className="flex-1">
              <label className="block text-white text-sm font-bold mb-2">City:</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="city" value={userData.city} onChange={handleChange} placeholder="Anytown" required />
            </div>
            <div className="flex-1">
              <label className="block text-white text-sm font-bold mb-2">Postal code:</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="postalCode" value={userData.postalCode} onChange={handleChange} placeholder="123456" required />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">Country:</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="country" value={userData.country} onChange={handleChange} placeholder="Countryland" required />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegistration;
