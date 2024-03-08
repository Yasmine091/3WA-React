import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-5">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-8 text-center">Welcome to <u>Chocolate Universe</u>!</h1>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-3xl font-semibold mb-4">Get started</h2>
          <p className="mb-4">If you're new here, why not <Link to="/register" className="text-blue-400 hover:text-blue-300">register an account</Link>? It's free, and it allows you to keep track of your chocolate collection, rate your favorites, and more!</p>
          <p>Already a member? <Link to="/login" className="text-blue-400 hover:text-blue-300">Log in to continue</Link>.</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-4">About <u>Chocolate Universe</u></h2>
          <p className="mb-4"><u>Chocolate Universe</u> is a community of chocolate lovers. We offer a platform for our users to explore various types of chocolates, share their experiences, and connect with other chocolate enthusiasts.</p>
          <p>Whether you're a casual fan or a connoisseur, you'll find something to love here at <u>Chocolate Universe</u>.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;