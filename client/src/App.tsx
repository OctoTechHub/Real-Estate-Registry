import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import AccountCreation from './pages/AccountCreation';
import PropertyDetail from './components/PropertyList';
import { GraphQueries } from './pages/GraphQueries';
import Dashboard from './pages/dashboard';
import ManageProperty from './pages/ManageProperty';

const ProtectedRoute = () => {
  const walletAddress = localStorage.getItem('walletAddress');

  return walletAddress ? <Outlet /> : <Navigate to="/" />;
};


function App() {
   
    return (
      <Router>
        <main className="h-full min-h-screen mx-auto max-w-7xl mt-10 flex flex-col gap-y-24">
          <Routes>
            <Route path="/" element={<AccountCreation />} />
            
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/queries" element={<GraphQueries />} />
              <Route path="/manage-property" element={<ManageProperty />} />
              <Route path="/properties/:id" element={<PropertyDetail />} />
              </Route>
            
          </Routes>
        </main>
      </Router>
  );
}

export default App;
