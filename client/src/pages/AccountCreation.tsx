import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Web3Provider, InfuraProvider } from '@ethersproject/providers';

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
        console.log('Connected MetaMask Wallet Address:', address); // Log wallet address
        setAccount(address);
        localStorage.setItem('walletAddress', address);
        navigate('/dashboard');
      } catch (err) {
        console.error(err);
        setError('Failed to connect wallet. Please try again.');
      }
    } else {
      setError('MetaMask is not installed. Please install it to use this feature.');
    }
  };

  const connectWithInfura = async () => {
    try {
      const infuraProvider = new InfuraProvider('homestead', process.env.REACT_APP_INFURA_PROJECT_ID);
      const address = await infuraProvider.getSigner().getAddress(); // Simulating account connection
      console.log('Connected Infura Wallet Address:', address); // Log wallet address
      setAccount(address);
      localStorage.setItem('walletAddress', address);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Failed to connect to Infura. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl mb-6">Get Started With GP Registry</h1>
      {account ? (
        <>
          <p className="text-lg">Connected account: {account}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-4"
          >
            Get On to Dashboard
          </button>
        </>
      ) : (
        <>
          <button
            onClick={connectWallet}
            className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-500 mb-4"
          >
            Connect MetaMask Wallet
          </button>
          <button
            onClick={connectWithInfura}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Connect with Infura
          </button>
        </>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
