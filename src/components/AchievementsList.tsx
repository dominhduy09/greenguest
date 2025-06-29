import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Share2, Lock } from 'lucide-react';
import { Achievement } from '../types';
import { apiService } from '../services/api';

const AchievementsList: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAchievements = async () => {
      try {
        const data = await apiService.getAchievements();
        setAchievements(data);
      } catch (error) {
        console.error('Error loading achievements:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAchievements();
  }, []);

  const rarityColors = {
    common: 'gray-400',
    rare: 'blue-500',
    epic: 'purple-500',
    legendary: 'yellow-500'
  };

  const rarityGradients = {
    common: 'from-gray-400 to-gray-600',
    rare: 'from-blue-400 to-blue-600',
    epic: 'from-purple-400 to-purple-600',
    legendary: 'from-yellow-400 to-yellow-600'
  };

  const handleShareAchievement = (achievement: Achievement) => {
    const shareText = `🏆 I just unlocked "${achievement.title}" on GreenQuest! ${achievement.description} Join me in making a sustainable impact! #GreenQuest #EcoFriendly`;
    
    if (navigator.share) {
      navigator.share({
        title: `Achievement Unlocked: ${achievement.title}`,
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-lg"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <Trophy className="h-6 w-6 mr-2 text-yellow-500" />
          Achievements
        </h3>
        <span className="text-sm text-gray-600">
          {achievements.filter(a => a.unlockedAt).length}/{achievements.length}
        </span>
      </div>

      <div className="space-y-3">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            className={`p-4 rounded-lg border-2 transition-all duration-300 ${
              achievement.unlockedAt
                ? `border-${rarityColors[achievement.rarity]} bg-gradient-to-r ${rarityGradients[achievement.rarity]} bg-opacity-10`
                : 'border-gray-200 bg-gray-50'
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: achievement.unlockedAt ? 1.02 : 1 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  achievement.unlockedAt 
                    ? `bg-${rarityColors[achievement.rarity]} bg-opacity-20` 
                    : 'bg-gray-200'
                }`}>
                  {achievement.unlockedAt ? (
                    <Trophy className={`h-5 w-5 text-${rarityColors[achievement.rarity]}`} />
                  ) : (
                    <Lock className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold ${
                    achievement.unlockedAt ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {achievement.title}
                  </h4>
                  <p className={`text-sm ${
                    achievement.unlockedAt ? 'text-gray-700' : 'text-gray-400'
                  }`}>
                    {achievement.description}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      achievement.unlockedAt
                        ? `bg-${rarityColors[achievement.rarity]} bg-opacity-20 text-${rarityColors[achievement.rarity]}`
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {achievement.rarity}
                    </span>
                    {achievement.unlockedAt && (
                      <span className="text-xs text-gray-500">
                        {new Date(achievement.unlockedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {achievement.unlockedAt && (
                <motion.button
                  className={`p-2 rounded-full bg-${rarityColors[achievement.rarity]} bg-opacity-20 text-${rarityColors[achievement.rarity]} hover:bg-opacity-30 transition-colors`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleShareAchievement(achievement)}
                >
                  <Share2 className="h-4 w-4" />
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p className="text-sm text-gray-600">
          Complete challenges to unlock more achievements!
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AchievementsList;