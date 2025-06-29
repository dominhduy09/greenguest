import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TreePine, Zap, Droplets, Flame, TrendingUp, Calendar } from 'lucide-react';
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
    { key: 'challenges', label: 'Challenges', icon: Zap },
    { key: 'ai', label: 'AI Coach', icon: TreePine },
    { key: 'workshops', label: 'Workshops', icon: Droplets },
    { key: 'marketplace', label: 'Marketplace', icon: Flame },
    { key: 'leaderboard', label: 'Leaderboard', icon: TrendingUp }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-forest-50 to-sky-50 flex items-center justify-center">
        <motion.div
          className="flex items-center space-x-3"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <TreePine className="h-8 w-8 text-forest-600" />
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
          <div className="bg-white rounded-2xl p-6 shadow-xl bg-gradient-nature text-white">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold mb-2">Welcome back, EcoWarrior! 🌱</h2>
                <p className="text-forest-100 text-lg">
                  You're making a real difference! Let's continue your sustainability journey.
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="h-5 w-5" />
                  <span className="font-semibold">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-full">
                  <span className="font-bold">Impact Score: 847</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
                <div className="flex items-center space-x-1 text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-semibold">{stat.trend}</span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 mb-8 shadow-lg overflow-x-auto">
          {tabs.map(({ key, label, icon: Icon }) => (
            <motion.button
              key={key}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md font-semibold transition-all whitespace-nowrap ${
                activeTab === key
                  ? 'bg-gradient-nature text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab(key as any)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </motion.button>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Daily Tip */}
            {dailyTip && <DailyTip tip={dailyTip} />}

            {/* Tab Content */}
            {activeTab === 'challenges' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
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

            {activeTab === 'ai' && <AIPersonalizedChallenges />}
            {activeTab === 'workshops' && <VirtualWorkshops />}
            {activeTab === 'marketplace' && <BlockchainMarketplace />}
            {activeTab === 'leaderboard' && <GlobalLeaderboard />}

            {/* Eco Inventions - Always visible */}
            <EcoInventions />
          </div>

          {/* Right Column - Achievements & Premium */}
          <div className="space-y-8">
            <AchievementsList />
            
            {/* Premium Upgrade Card */}
            <motion.div
              className="bg-gradient-earth text-white rounded-xl p-6 shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Upgrade Now - $9.99/mo
              </motion.button>
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
          <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-semibold text-gray-700">Built with Bolt.new</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;