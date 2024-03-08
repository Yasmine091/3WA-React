import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { register, login, updateUser } from './services/userService';
import { fetchChocolates, createChocolate, updateChocolate, deleteChocolate } from './services/chocolateService';
import { jwtDecode } from "jwt-decode";
import Navbar from './components/partials/Navbar';
import Home from './components/Home';
import Register from './components/User/UserRegistration';
import Login from './components/User/UserLogin';
import UserList from './components/User/UserList';
import UserProfile from './components/User/UserProfile';
import UserSettings from './components/User/UserSettings';
import ChocolateList from './components/Chocolate/ChocolateList';
import ChocolateForm from './components/Chocolate/ChocolateForm';
import ChocolateDetails from './components/Chocolate/ChocolateDetails';
import './App.css';

function App() {
    const [user, setUser] = useState(null);
    const [UID, setUID] = useState(null);
    const [chocolates, setChocolates] = useState([]);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('userToken');
        if (loggedInUser) {
            setUser(loggedInUser);
            const decoded = jwtDecode(loggedInUser);
            setUID(decoded.userId);
        }
        loadChocolates();
    }, []);

    const handleRegister = async (userData) => {
        const registeredUser = await register(userData);
        setUser(registeredUser);
    };

    const handleLogin = async (credentials) => {
        const loggedInUser = await login(credentials);
        localStorage.setItem('userToken', JSON.stringify(loggedInUser));
        setUser(loggedInUser);
    };

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        setUser(null);
    };

    const handleUpdateUser = async (userData) => {
        const updatedUser = await updateUser(user._id, userData);
        setUser(updatedUser);
        localStorage.setItem('userToken', JSON.stringify(updatedUser));
    };

    const loadChocolates = async () => {
        const fetchedChocolates = await fetchChocolates();
        setChocolates(fetchedChocolates);
    };

    return (
        <Router>
            <Navbar UID={UID} user={user} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={!user ? <Register onRegister={handleRegister} /> : <Navigate replace to="/" />} />
                <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate replace to="/" />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/profile/:id" element={user ? <UserProfile /> : <Navigate replace to="/login" />} />
                <Route path="/settings" element={user ? <UserSettings UID={UID} onUpdateUser={handleUpdateUser} /> : <Navigate replace to="/login" />} />
                <Route path="/chocolates" element={<ChocolateList chocolates={chocolates} isLoggedIn={user} />} />
                <Route path="/chocolates/:id" element={<ChocolateDetails />} />
                <Route path="/chocolates/new" element={user ? <ChocolateForm /> : <Navigate replace to="/login" />} />
                <Route path="/chocolates/edit/:id" element={user ? <ChocolateForm chocolates={chocolates} /> : <Navigate replace to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;