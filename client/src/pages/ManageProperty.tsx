import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
const ManagePropertyPage: React.FC = () => {
    const [properties, setProperties] = useState<Array<any>>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
  
    const walletAddress = localStorage.getItem('walletAddress');
  
    useEffect(() => {
      const fetchProperties = async () => {
        if (!walletAddress) {
          setError('Wallet address not found in localStorage');
          setLoading(false);
          return;
        }
  
        try {
          const response = await axios.get(`/properties-by-wallet/${walletAddress}`);
          if (Array.isArray(response.data)) {
            setProperties(response.data);
          } else {
            console.error('Unexpected data format:', response.data);
            setError('Unexpected data format');
          }
        } catch (err) {
          console.error('Error fetching properties:', err);
          setError('Failed to fetch properties');
        } finally {
          setLoading(false);
        }
      };
  
      fetchProperties();
    }, [walletAddress]);
  
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
        {properties.length > 0 ? (
          <ul>
            {properties.map(property => (
              <li key={property._id} className="border p-4 mb-2 rounded">
                <h2 className="text-xl font-semibold">{property.name}</h2>
                <p>{property.details}</p>
                <p>Price: ₹{property.priceINR} / {property.priceETH} ETH</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No properties found for this wallet address.</p>
        )}
      </div>
    );
  };
  
  export default ManagePropertyPage;
