import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Globe, Users, TrendingUp, Share2, Crown, Medal, Award } from 'lucide-react';
import { Leaderboard, LeaderboardEntry } from '../types';
import { socialService } from '../services/social';

const GlobalLeaderboard: React.FC = () => {
  const [leaderboards, setLeaderboards] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'global' | 'country' | 'friends'>('global');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeaderboards = async () => {
      try {
        const data = await socialService.getViralLeaderboards();
        setLeaderboards(data);
      } catch (error) {
        console.error('Error loading leaderboards:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboards();
  }, []);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-6 w-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
    if (rank === 3) return <Award className="h-6 w-6 text-amber-600" />;
    return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
  };

  const getCountryFlag = (country: string) => {
    const flags: { [key: string]: string } = {
      'Sweden': '🇸🇪',
      'Costa Rica': '🇨🇷',
      'Denmark': '🇩🇰',
      'Germany': '🇩🇪',
      'Japan': '🇯🇵',
      'Canada': '🇨🇦',
      'Netherlands': '🇳🇱',
      'Norway': '🇳🇴',
      'Finland': '🇫🇮',
      'Switzerland': '🇨🇭'
    };
    return flags[country] || '🌍';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <Trophy className="h-6 w-6 mr-2 text-yellow-500" />
          Global Impact Leaders
        </h3>
        <motion.button
          className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </motion.button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
        {[
          { key: 'global', label: 'Global', icon: Globe },
          { key: 'country', label: 'Country', icon: Users },
          { key: 'friends', label: 'Friends', icon: TrendingUp }
        ].map(({ key, label, icon: Icon }) => (
          <motion.button
            key={key}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md font-semibold transition-all ${
              activeTab === key
                ? 'bg-white text-forest-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
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

      {/* Leaderboard Content */}
      <div className="space-y-3">
        {activeTab === 'global' && leaderboards?.global?.top10.map((user: any, index: number) => (
          <motion.div
            key={user.username}
            className={`flex items-center space-x-4 p-4 rounded-lg transition-all ${
              index < 3 
                ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200' 
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-center w-12 h-12">
              {getRankIcon(index + 1)}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-900">{user.username}</span>
                <span className="text-lg">{getCountryFlag(user.country)}</span>
                {user.streak > 100 && (
                  <div className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-semibold">
                    🔥 {user.streak} days
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>{user.carbonSaved.toFixed(1)}kg CO₂ saved</span>
                <span>•</span>
                <span>{user.country}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-forest-600">
                {user.carbonSaved.toFixed(1)}
              </div>
              <div className="text-xs text-gray-500">kg CO₂</div>
            </div>
          </motion.div>
        ))}

        {activeTab === 'country' && (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🇺🇸</div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">United States Ranking</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-forest-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-forest-600">#{leaderboards?.country?.rank}</div>
                <div className="text-sm text-gray-600">Your Rank</div>
              </div>
              <div className="bg-sky-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-sky-600">{leaderboards?.country?.totalInCountry.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Users</div>
              </div>
              <div className="bg-earth-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-earth-600">{leaderboards?.country?.countryAverage}</div>
                <div className="text-sm text-gray-600">Avg. CO₂ Saved</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'friends' && (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">👥</div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">Friends Network</h4>
            <div className="grid grid-cols-3 gap-4 text-center mb-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{leaderboards?.friends?.connected}</div>
                <div className="text-sm text-gray-600">Connected</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{leaderboards?.friends?.ahead}</div>
                <div className="text-sm text-gray-600">Ahead of You</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{leaderboards?.friends?.behind}</div>
                <div className="text-sm text-gray-600">Behind You</div>
              </div>
            </div>
            <motion.button
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Invite More Friends
            </motion.button>
          </div>
        )}
      </div>

      {/* Global Stats Footer */}
      <motion.div
        className="mt-6 pt-6 border-t border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-forest-600">
              {leaderboards?.global?.totalUsers?.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Global EcoWarriors</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-sky-600">
              {leaderboards?.global?.userRank?.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Your Global Rank</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GlobalLeaderboard;