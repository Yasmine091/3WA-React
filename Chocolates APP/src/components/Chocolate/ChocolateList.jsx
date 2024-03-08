import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchChocolates, deleteChocolate as deleteChocolateService } from '../../services/chocolateService';

const ChocolateList = ({ isLoggedIn }) => {
  const [chocolates, setChocolates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getChocolates = async () => {
      try {
        const data = await fetchChocolates();
        setChocolates(data);
      } catch (error) {
        console.error('Failed to fetch chocolates', error);
      }
    };

    getChocolates();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteChocolateService(id);
      setChocolates(chocolates.filter(chocolate => chocolate._id !== id));
      console.log('Chocolate deleted successfully');
    } catch (error) {
      console.error('Failed to delete chocolate', error);
    }
  };

  return (
    <div className="flex pt-20 justify-center min-h-screen bg-gray-900">
      <div className="w-4/5">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-bold text-white">Chocolates</h2>
          {isLoggedIn && (
            <button onClick={() => navigate('/chocolates/new')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add chocolate
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chocolates.map(chocolate => (
            <Link key={chocolate._id} to={`/chocolates/${chocolate._id}`} className="no-underline hover:no-underline">
              <div key={chocolate._id} className="bg-gray-800 rounded-lg p-5 shadow-lg space-y-3 hover:bg-gray-700">
                <h3 className="text-xl font-semibold text-white">{chocolate.name}</h3>
                <p className="text-sm text-gray-400">{chocolate.description}</p>
                <p className="text-sm text-white">Brand: {chocolate.brand}</p>
                <p className="text-sm text-white">Price: {chocolate.price.toFixed(2)} €</p>
                <p className="text-sm text-white">Weight: {chocolate.weight}g</p>
                {isLoggedIn && (
                  <div className="flex justify-between items-center mt-4">
                    <button onClick={() => navigate(`/chocolates/edit/${chocolate._id}`)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(chocolate._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChocolateList;