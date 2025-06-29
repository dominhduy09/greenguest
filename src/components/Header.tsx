import React from 'react';
import { Leaf, User, Bell, Coins } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  user: {
    username: string;
    level: number;
    xp: number;
    carbonSaved: number;
  };
  tokenBalance: number;
}

const Header: React.FC<HeaderProps> = ({ user, tokenBalance }) => {
  const xpToNextLevel = ((user.level + 1) * 1000) - user.xp;
  const progressPercentage = (user.xp % 1000) / 10;

  return (
    <header className="bg-white shadow-lg border-b border-forest-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-10 h-10 bg-gradient-nature rounded-full flex items-center justify-center">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-forest-800">GreenQuest</h1>
              <p className="text-xs text-forest-600">Gamified Eco Living</p>
            </div>
          </motion.div>

          {/* User Stats */}
          <div className="flex items-center space-x-6">
            {/* Token Balance */}
            <motion.div 
              className="flex items-center space-x-2 bg-earth-50 px-3 py-2 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <Coins className="h-5 w-5 text-earth-600" />
              <span className="font-semibold text-earth-800">{tokenBalance} ECO</span>
            </motion.div>

            {/* Level Progress */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-forest-800">Level {user.level}</p>
                <p className="text-xs text-forest-600">{xpToNextLevel} XP to next level</p>
              </div>
              <div className="w-16 h-16 relative">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#dcfce7"
                    strokeWidth="8"
                    fill="none"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#16a34a"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${progressPercentage * 2.51} 251`}
                    initial={{ strokeDasharray: "0 251" }}
                    animate={{ strokeDasharray: `${progressPercentage * 2.51} 251` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-forest-800">{user.level}</span>
                </div>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <motion.button
                className="p-2 text-forest-600 hover:text-forest-800 hover:bg-forest-50 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Bell className="h-5 w-5" />
              </motion.button>
              <motion.button
                className="flex items-center space-x-2 p-2 text-forest-600 hover:text-forest-800 hover:bg-forest-50 rounded-full transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="h-5 w-5" />
                <span className="font-semibold">{user.username}</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;