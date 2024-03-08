import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchChocolateById } from '../../services/chocolateService';

const ChocolateDetail = () => {
  const [chocolate, setChocolate] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadChocolateDetail = async () => {
      try {
        const fetchedChocolate = await fetchChocolateById(id);
        setChocolate(fetchedChocolate);
      } catch (error) {
        console.error('Failed to fetch chocolate details', error);
        navigate('/chocolates');
      }
    };

    loadChocolateDetail();
  }, [id, navigate]);

  if (!chocolate) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pt-20 bg-gray-900 text-white p-5 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-12">{chocolate.name}</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-4xl">
        <p><strong>Description:</strong> {chocolate.description}</p>
        <p><strong>Brand:</strong> {chocolate.brand}</p>
        <p><strong>Price:</strong> ${chocolate.price}</p>
        <p><strong>Weight:</strong> {chocolate.weight}g</p>
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
};

export default ChocolateDetail;
