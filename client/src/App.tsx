import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AccountCreation from './pages/AccountCreation';
import Dashboard from './pages/dashboard';

function App() {
  return (
    <Router>
      <main className="h-full min-h-screen mx-auto max-w-7xl mt-10 flex flex-col gap-y-24">
        <Routes>
          <Route path="/" element={<AccountCreation />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
