import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Web3Provider } from '@ethersproject/providers';
import Navbar from '../components/Navbar';

declare global {
  interface Window {
    ethereum: any;
  }
}

export default function AccountCreate() {
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAccount = localStorage.getItem('walletAddress');
    if (storedAccount) {
      setAccount(storedAccount);
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        console.log('Connected MetaMask Wallet Address:', address);
        setAccount(address);
        localStorage.setItem('walletAddress', address);

        // Register the user in the backend
        await registerUser(address);

        navigate('/dashboard');
      } catch (err) {
        console.error(err);
        setError('Failed to connect wallet. Please try again.');
      }
    } else {
      setError('MetaMask is not installed. Please install it to use this feature.');
    }
  };

  const registerUser = async (walletAddress: string) => {
    try {
      const response = await fetch('http://localhost:3000/register-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ walletAddress }),
      });

      if (!response.ok) {
        throw new Error('Failed to register user');
      }

      const data = await response.json();
      console.log('User registered:', data);
    } catch (error) {
      console.error('Error registering user:', error);
      setError('Failed to register user. Please try again.');
    }
  };

  return (
    <>
    <Navbar/>
    
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://plus.unsplash.com/premium_photo-1678903964473-1271ecfb0288?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D')`, 
      }}
    >
      <div className="bg-opacity-60 bg-gray-800 p-6 rounded-md shadow-lg">
        <h1 className="text-3xl text-white mb-6">Get Started With GP Registry</h1>
        {account ? (
          <p className="text-lg text-white">Connected account: {account}</p>
        ) : (
          <>
            <button
              onClick={connectWallet}
              className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-500 mb-4"
            >
              Connect MetaMask Wallet
            </button>
          </>
        )}
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {account && (
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 mt-4"
          >
            Go to Dashboard
          </button>
        )}
      </div>
    </div>
    </>
  );
}
