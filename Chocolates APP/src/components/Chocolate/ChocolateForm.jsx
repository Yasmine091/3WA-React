import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createChocolate, updateChocolate, fetchChocolateById } from '../../services/chocolateService';

const ChocolateForm = ({ chocolate: initialChocolate }) => {
  const [chocolate, setChocolate] = useState({
    name: '',
    description: '',
    brand: '',
    price: 0,
    weight: 0,
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchChocolate = async () => {
        const fetchedChocolate = await fetchChocolateById(id);
        setChocolate(fetchedChocolate);
      };
      fetchChocolate();
    } else if (initialChocolate) {
      setChocolate(initialChocolate);
    }
  }, [id, initialChocolate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChocolate(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      id || initialChocolate ? await updateChocolate(chocolate._id, chocolate) : await createChocolate(chocolate);
      alert(`Chocolate ${id || initialChocolate ? 'updated' : 'added'} successfully!`);
      navigate('/chocolates');
    } catch (error) {
      console.error('Failed to submit chocolate:', error);
      alert('Failed to submit chocolate.');
    }
  };

  return (
    <div className="flex flex-col items-center pt-20 min-h-screen bg-gray-900">
      <div className="w-full max-w-lg">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">{id || initialChocolate ? 'Update chocolate' : 'Add chocolate'}</h1>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-md">
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">Name:</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="name" value={chocolate.name} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">Description:</label>
            <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="description" value={chocolate.description} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">Brand:</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="brand" value={chocolate.brand} onChange={handleChange} required />
          </div>
          <div className="mb-4 flex gap-4">
            <div className="flex-1">
              <label className="block text-white text-sm font-bold mb-2">Price (€):</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="price" value={chocolate.price} onChange={handleChange} required />
            </div>
            <div className="flex-1">
              <label className="block text-white text-sm font-bold mb-2">Weight (g):</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="weight" value={chocolate.weight} onChange={handleChange} required />
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              {id || initialChocolate ? 'Update chocolate' : 'Add chocolate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChocolateForm;