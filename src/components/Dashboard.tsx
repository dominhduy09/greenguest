import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TreePine, Zap, Droplets, Flame, TrendingUp, Calendar, Sparkles, Video, Globe, ShoppingCart } from 'lucide-react';
import ChallengeCard from './ChallengeCard';
import DailyTip from './DailyTip';
import AchievementsList from './AchievementsList';
import EcoInventions from './EcoInventions';
import AIPersonalizedChallenges from './AIPersonalizedChallenges';
import VirtualWorkshops from './VirtualWorkshops';
import GlobalLeaderboard from './GlobalLeaderboard';
import BlockchainMarketplace from './BlockchainMarketplace';
import { Challenge, DailyTip as DailyTipType } from '../types';
import { apiService } from '../services/api';

const Dashboard: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [dailyTip, setDailyTip] = useState<DailyTipType | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'challenges' | 'ai' | 'workshops' | 'marketplace' | 'leaderboard'>('challenges');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [challengesData, tipData] = await Promise.all([
          apiService.getChallenges(),
          apiService.getDailyTip()
        ]);
        setChallenges(challengesData);
        setDailyTip(tipData);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const stats = [
    { label: 'CO₂ Saved', value: '127.5 kg', icon: TreePine, color: 'forest', trend: '+12%' },
    { label: 'Energy Saved', value: '450 kWh', icon: Zap, color: 'sky', trend: '+8%' },
    { label: 'Water Saved', value: '1,234 L', icon: Droplets, color: 'sky', trend: '+15%' },
    { label: 'Current Streak', value: '12 days', icon: Flame, color: 'earth', trend: '+3 days' }
  ];

  const tabs = [
    { key: 'challenges', label: 'Challenges', icon: Zap, description: 'Daily eco-challenges' },
    { key: 'ai', label: 'AI Coach', icon: Sparkles, description: 'Personalized guidance' },
    { key: 'workshops', label: 'Workshops', icon: Video, description: 'Virtual learning' },
    { key: 'marketplace', label: 'Marketplace', icon: ShoppingCart, description: 'Trade carbon credits' },
    { key: 'leaderboard', label: 'Leaderboard', icon: TrendingUp, description: 'Global rankings' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-forest-50 to-sky-50 flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center space-y-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <TreePine className="h-12 w-12 text-forest-600" />
          </motion.div>
          <span className="text-xl font-semibold text-forest-800">Loading your eco-journey...</span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-50 to-sky-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-2xl p-6 shadow-xl bg-gradient-nature text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 opacity-20">
              <div className="text-8xl">🌍</div>
            </div>
            
            <div className="flex justify-between items-center relative z-10">
              <div>
                <motion.h2 
                  className="text-3xl font-bold mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Welcome back, EcoWarrior! 🌱
                </motion.h2>
                <motion.p 
                  className="text-forest-100 text-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  You're making a real difference! Let's continue your sustainability journey.
                </motion.p>
              </div>
              <motion.div 
                className="text-right"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="h-5 w-5" />
                  <span className="font-semibold">{new Date().toLocaleDateString()}</span>
                </div>
                <motion.div 
                  className="bg-white/20 px-4 py-2 rounded-full"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.3)" }}
                >
                  <span className="font-bold">Impact Score: 847</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between mb-4">
                <motion.div 
                  className={`p-3 rounded-full bg-${stat.color}-100`}
                  whileHover={{ rotate: 15, scale: 1.1 }}
                >
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </motion.div>
                <div className="flex items-center space-x-1 text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-semibold">{stat.trend}</span>
                </div>
              </div>
              <div>
                <motion.p 
                  className="text-2xl font-bold text-gray-900 mb-1"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tab Navigation */}
        <motion.div 
          className="flex space-x-1 bg-white rounded-lg p-1 mb-8 shadow-lg overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {tabs.map(({ key, label, icon: Icon, description }) => (
            <motion.button
              key={key}
              className={`flex-1 flex flex-col items-center justify-center space-y-1 py-4 px-4 rounded-md font-semibold transition-all whitespace-nowrap min-w-[120px] ${
                activeTab === key
                  ? 'bg-gradient-nature text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab(key as any)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                animate={activeTab === key ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Icon className="h-5 w-5" />
              </motion.div>
              <span className="text-sm">{label}</span>
              <span className={`text-xs ${activeTab === key ? 'text-white/80' : 'text-gray-500'}`}>
                {description}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Daily Tip */}
            {dailyTip && <DailyTip tip={dailyTip} />}

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'challenges' && (
                <motion.div
                  key="challenges"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-forest-800 mb-6 flex items-center">
                    <Zap className="h-6 w-6 mr-2" />
                    Today's Challenges
                  </h3>
                  <div className="space-y-4">
                    {challenges.map((challenge, index) => (
                      <ChallengeCard 
                        key={challenge.id} 
                        challenge={challenge}
                        delay={index * 0.1}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'ai' && (
                <motion.div
                  key="ai"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <AIPersonalizedChallenges />
                </motion.div>
              )}

              {activeTab === 'workshops' && (
                <motion.div
                  key="workshops"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <VirtualWorkshops />
                </motion.div>
              )}

              {activeTab === 'marketplace' && (
                <motion.div
                  key="marketplace"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <BlockchainMarketplace />
                </motion.div>
              )}

              {activeTab === 'leaderboard' && (
                <motion.div
                  key="leaderboard"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <GlobalLeaderboard />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Eco Inventions - Always visible */}
            <EcoInventions />
          </div>

          {/* Right Column - Achievements & Premium */}
          <div className="space-y-8">
            <AchievementsList />
            
            {/* Premium Upgrade Card */}
            <motion.div
              className="bg-gradient-earth text-white rounded-xl p-6 shadow-lg relative overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 opacity-20">
                <div className="text-6xl">🚀</div>
              </div>
              
              <div className="relative z-10">
                <h4 className="text-xl font-bold mb-3">🚀 Unlock EcoPlus</h4>
                <p className="text-earth-100 mb-4">
                  Get access to advanced AI challenges, personal coaching, and premium analytics.
                </p>
                <ul className="space-y-2 mb-4 text-sm">
                  <li>✨ AI-powered personalized challenges</li>
                  <li>🎥 Exclusive video workshops</li>
                  <li>📊 Advanced carbon tracking</li>
                  <li>🏆 Premium achievement badges</li>
                  <li>💰 Carbon credit marketplace access</li>
                </ul>
                <motion.button
                  className="w-full bg-white text-earth-700 font-bold py-3 px-4 rounded-lg hover:bg-earth-50 transition-colors"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Upgrade Now - $9.99/mo
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Built with Bolt Badge */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md cursor-pointer"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Zap className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-semibold text-gray-700">Built with Bolt.new</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;