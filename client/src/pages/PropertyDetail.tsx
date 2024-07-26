import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Property {
  id: string;
  name: string;
  details: string;
  priceINR: number;
  priceETH: number;
  owner?: {
    id: string;
    walletAddress: string;
  };
}

function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProperty() {
      try {
        const response = await axios.get(`http://localhost:3000/properties/${id}`);
        setProperty(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching property details:', error);
        setError('Error occurred while fetching property details');
      }
    }

    if (id) {
      fetchProperty();
    }
  }, [id]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{property.name}</h1>
      <p className="text-gray-700 mb-2">{property.details}</p>
      <p className="text-gray-500 mb-2">Price in INR: {property.priceINR}</p>
      <p className="text-gray-500 mb-4">Price in ETH: {property.priceETH}</p>
      {property.owner && (
        <p className="text-gray-500 mb-4">Owner: {property.owner.walletAddress}</p>
      )}
    </div>
  );
}

export default PropertyDetail;
