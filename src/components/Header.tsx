import React, { useState } from 'react';
import { Leaf, User, Bell, Coins, Settings, LogOut, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    { id: 1, text: "New challenge available!", type: "challenge" },
    { id: 2, text: "You're in the top 10% this week!", type: "achievement" },
    { id: 3, text: "Friend completed a challenge", type: "social" }
  ]);

  const xpToNextLevel = ((user.level + 1) * 1000) - user.xp;
  const progressPercentage = (user.xp % 1000) / 10;

  const handleTokenClick = () => {
    console.log('Opening token details...');
    // In a real app, this would show token history/details
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setShowUserMenu(false);
  };

  const handleUserMenuClick = () => {
    setShowUserMenu(!showUserMenu);
    setShowNotifications(false);
  };

  return (
    <header className="bg-white shadow-lg border-b border-forest-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3 cursor-pointer"
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
            <motion.button 
              className="flex items-center space-x-2 bg-earth-50 px-4 py-2 rounded-full hover:bg-earth-100 transition-colors"
              whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleTokenClick}
            >
              <Coins className="h-5 w-5 text-earth-600" />
              <span className="font-semibold text-earth-800">{tokenBalance.toLocaleString()} ECO</span>
              <motion.div
                className="w-2 h-2 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>

            {/* Level Progress */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-forest-800">Level {user.level}</p>
                <p className="text-xs text-forest-600">{xpToNextLevel} XP to next level</p>
              </div>
              <motion.div 
                className="w-16 h-16 relative cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
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
              </motion.div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-3 relative">
              {/* Notifications */}
              <motion.button
                className="p-2 text-forest-600 hover:text-forest-800 hover:bg-forest-50 rounded-full transition-colors relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNotificationClick}
              >
                <Bell className="h-5 w-5" />
                {notifications.length > 0 && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {notifications.length}
                  </motion.div>
                )}
              </motion.button>

              {/* User Profile */}
              <motion.button
                className="flex items-center space-x-2 p-2 text-forest-600 hover:text-forest-800 hover:bg-forest-50 rounded-full transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUserMenuClick}
              >
                <User className="h-5 w-5" />
                <span className="font-semibold">{user.username}</span>
                {user.level >= 10 && <Crown className="h-4 w-4 text-yellow-500" />}
              </motion.button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Notifications</h3>
                      <div className="space-y-3">
                        {notifications.map((notification, index) => (
                          <motion.div
                            key={notification.id}
                            className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                          >
                            <p className="text-sm text-gray-700">{notification.text}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              notification.type === 'challenge' ? 'bg-blue-100 text-blue-700' :
                              notification.type === 'achievement' ? 'bg-green-100 text-green-700' :
                              'bg-purple-100 text-purple-700'
                            }`}>
                              {notification.type}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* User Menu Dropdown */}
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-4">
                      <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-gray-200">
                        <div className="w-12 h-12 bg-gradient-nature rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{user.username}</p>
                          <p className="text-sm text-gray-600">Level {user.level} • {user.carbonSaved}kg CO₂ saved</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <motion.button
                          className="w-full flex items-center space-x-3 p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Settings className="h-4 w-4" />
                          <span>Settings</span>
                        </motion.button>
                        
                        <motion.button
                          className="w-full flex items-center space-x-3 p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Crown className="h-4 w-4" />
                          <span>Upgrade to Premium</span>
                        </motion.button>
                        
                        <motion.button
                          className="w-full flex items-center space-x-3 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sign Out</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showNotifications || showUserMenu) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setShowNotifications(false);
            setShowUserMenu(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;