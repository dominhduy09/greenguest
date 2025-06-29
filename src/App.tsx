import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import { blockchainService } from './services/blockchain';

function App() {
  const [tokenBalance, setTokenBalance] = useState(0);

  // Mock user data
  const user = {
    username: 'EcoWarrior',
    level: 7,
    xp: 2350,
    carbonSaved: 127.5
  };

  useEffect(() => {
    const loadTokenBalance = async () => {
      try {
        const balance = await blockchainService.getTokenBalance('user-123');
        setTokenBalance(balance.balance);
      } catch (error) {
        console.error('Error loading token balance:', error);
      }
    };

    loadTokenBalance();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-50 to-sky-50">
      <Header user={user} tokenBalance={tokenBalance} />
      <Dashboard />
    </div>
  );
}

export default App;