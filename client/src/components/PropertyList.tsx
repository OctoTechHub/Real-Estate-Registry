import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await axios.get('http://localhost:3000/properties-with-graph');
        const transformedData = response.data.map((property: any) => ({
          id: property._id,
          name: property.name,
          details: property.details,
          priceINR: property.priceINR,
          priceETH: property.priceETH,
          owner: property.owner,
        }));
        setProperties(transformedData);
        setError(null);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setError('Error occurred while fetching properties');
      }
    }

    fetchProperties();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Properties</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map(property => (
          <div key={property.id} className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">{property.name}</h2>
            <p className="text-gray-700 mb-2">{property.details}</p>
            <p className="text-gray-500 mb-2">Price in INR: {property.priceINR}</p>
            <p className="text-gray-500 mb-4">Price in ETH: {property.priceETH}</p>
            {property.owner && (
              <p className="text-gray-500 mb-4">Owner: {property.owner.walletAddress}</p>
            )}
            <Link to={`/properties/${property.id}`}>
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertyList;
