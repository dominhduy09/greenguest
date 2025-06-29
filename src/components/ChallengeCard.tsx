import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Award, Leaf, CheckCircle, Lock, Star } from 'lucide-react';
import { Challenge } from '../types';
import { blockchainService } from '../services/blockchain';

interface ChallengeCardProps {
  challenge: Challenge;
  delay?: number;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, delay = 0 }) => {
  const [isCompleting, setIsCompleting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(challenge.completed);

  const categoryColors = {
    energy: 'sky',
    transport: 'forest',
    waste: 'earth',
    water: 'sky',
    food: 'forest'
  };

  const difficultyColors = {
    easy: 'green-500',
    medium: 'yellow-500',
    hard: 'red-500'
  };

  const handleCompleteChallenge = async () => {
    if (isCompleted || challenge.isPremium) return;
    
    setIsCompleting(true);
    try {
      // Simulate blockchain verification
      await blockchainService.verifyEcoAction(challenge.id, 'user-123', challenge.carbonImpact);
      setIsCompleted(true);
      
      // Show success notification
      console.log(`Challenge completed! Earned ${challenge.xpReward} XP and ${challenge.carbonImpact}kg CO₂ saved`);
    } catch (error) {
      console.error('Error completing challenge:', error);
    } finally {
      setIsCompleting(false);
    }
  };

  const categoryColor = categoryColors[challenge.category];

  return (
    <motion.div
      className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-${categoryColor}-500`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className={`p-2 rounded-full bg-${categoryColor}-100`}>
              <Leaf className={`h-5 w-5 text-${categoryColor}-600`} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900 flex items-center">
                {challenge.title}
                {challenge.isPremium && (
                  <Star className="h-4 w-4 text-yellow-500 ml-2" />
                )}
              </h4>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className={`px-2 py-1 rounded-full bg-${difficultyColors[challenge.difficulty]} bg-opacity-20 text-${difficultyColors[challenge.difficulty]} font-semibold`}>
                  {challenge.difficulty}
                </span>
                <span className="capitalize">{challenge.category}</span>
              </div>
            </div>
          </div>
          <p className="text-gray-700 mb-4">{challenge.description}</p>
        </div>
        {isCompleted && (
          <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
        )}
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{challenge.timeEstimate}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Award className="h-4 w-4" />
            <span>{challenge.xpReward} XP</span>
          </div>
          <div className="flex items-center space-x-1">
            <Leaf className="h-4 w-4" />
            <span>{challenge.carbonImpact}kg CO₂</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {challenge.isPremium && (
            <div className="flex items-center space-x-1 text-xs bg-gradient-earth text-white px-2 py-1 rounded-full">
              <Lock className="h-3 w-3" />
              <span>Premium</span>
            </div>
          )}
        </div>
        
        <motion.button
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
            isCompleted
              ? 'bg-green-100 text-green-700 cursor-not-allowed'
              : challenge.isPremium
              ? 'bg-gradient-earth text-white hover:opacity-90'
              : `bg-${categoryColor}-500 text-white hover:bg-${categoryColor}-600`
          }`}
          whileHover={!isCompleted && !challenge.isPremium ? { scale: 1.05 } : {}}
          whileTap={!isCompleted && !challenge.isPremium ? { scale: 0.95 } : {}}
          onClick={challenge.isPremium ? undefined : handleCompleteChallenge}
          disabled={isCompleting || isCompleted}
        >
          {isCompleting ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Verifying...</span>
            </div>
          ) : isCompleted ? (
            'Completed'
          ) : challenge.isPremium ? (
            'Unlock Premium'
          ) : (
            'Start Challenge'
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ChallengeCard;