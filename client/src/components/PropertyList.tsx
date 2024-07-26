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
        setProperties(response.data);
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center mt-7">Properties 🏢</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {properties.map(property => (
          <div key={property.id} className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
            <Link to={`/properties/${property.id}`}>
              <h2 className="text-xl font-semibold mb-2">{property.name}</h2>
            </Link>
            <p className="text-gray-700 mb-2">{property.details}</p>
            <p className="text-gray-500 mb-1">Price in INR: {property.priceINR}</p>
            <p className="text-gray-500 mb-2">Price in ETH: {property.priceETH}</p>
            {property.owner && (
              <p className="text-gray-500 mb-4">Owner: {property.owner.walletAddress}</p>
            )}
<Link to={`/properties/${property.id}`} className="block w-full text-center py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
  View Details
</Link>

          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertyList;


