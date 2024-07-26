import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

const ManagePropertyPage: React.FC = () => {
  const [properties, setProperties] = useState<Array<any>>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);

  const walletAddress = localStorage.getItem('walletAddress');

  useEffect(() => {
    const fetchProperties = async () => {
      if (!walletAddress) {
        setError('Wallet address not found in localStorage');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/properties-by-wallet/${walletAddress}`);
        if (Array.isArray(response.data)) {
          setProperties(response.data);
        } else {
          console.error('Unexpected data format:', response.data);
          setError('Unexpected data format');
        }
      } catch (err) {
        const error = err as AxiosError;
        console.error('Error fetching properties:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        }
        setError('Failed to fetch properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [walletAddress]);

  const fetchAllPropertiesWithGraph = async () => {
    try {
      const response = await axios.get('http://localhost:3000/properties-with-graph');
      if (Array.isArray(response.data)) {
        setProperties(response.data);
      } else {
        console.error('Unexpected data format:', response.data);
        setError('Unexpected data format');
      }
    } catch (err) {
      const error = err as AxiosError;
      console.error('Error fetching properties with graph:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
      setError('Failed to fetch properties with graph');
    }
  };

  const fetchPropertyById = async (propertyId: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/properties/${propertyId}`);
      setSelectedProperty(response.data);
    } catch (err) {
      const error = err as AxiosError;
      console.error('Error fetching property by ID:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
      setError('Failed to fetch property by ID');
    }
  };

  if (loading) return (
    <div className="container mx-auto p-4">
      <div className="spinner"></div>
    </div>
  );

  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Properties</h1>
      <p className="mb-4">Wallet Address: {walletAddress}</p>
      <button onClick={fetchAllPropertiesWithGraph} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        Fetch All Properties with Graph
      </button>
      {properties.length > 0 ? (
        <ul>
          {properties.map(property => (
            <li key={property._id} className="border p-4 mb-2 rounded">
              <h2 className="text-xl font-semibold">{property.name}</h2>
              <p>{property.details}</p>
              <p>Price: ₹{property.priceINR} / {property.priceETH} ETH</p>
              <button onClick={() => fetchPropertyById(property._id)} className="bg-green-500 text-white px-2 py-1 rounded mt-2">
                View Details
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No properties found for this wallet address.</p>
      )}
      {selectedProperty && (
        <div className="mt-4 p-4 border rounded">
          <h2 className="text-xl font-semibold">{selectedProperty.name}</h2>
          <p>{selectedProperty.details}</p>
          <p>Price: ₹{selectedProperty.priceINR} / {selectedProperty.priceETH} ETH</p>
        </div>
      )}
    </div>
  );
};

export default ManagePropertyPage;
