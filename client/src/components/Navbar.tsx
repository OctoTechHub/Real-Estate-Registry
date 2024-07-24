import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="bg-gray-800 fixed w-full top-0 left-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-start">
            <div className="text-white text-lg font-semibold">
              Real Estate Registry
            </div>
          </div>

          <div className="flex-1 flex items-center justify-end space-x-4">
            <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            
            <Link to="/dashboard" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Dashboard
            </Link>

            <Link to="/queries" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Graph Queries
            </Link>

            <Link to="/manage-property" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Manage Property
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
