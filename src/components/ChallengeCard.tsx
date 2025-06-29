import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Award, Leaf, CheckCircle, Lock, Star, Zap, Target } from 'lucide-react';
import { Challenge } from '../types';
import { blockchainService } from '../services/blockchain';

interface ChallengeCardProps {
  challenge: Challenge;
  delay?: number;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, delay = 0 }) => {
  const [isCompleting, setIsCompleting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(challenge.completed);
  const [showSuccess, setShowSuccess] = useState(false);
  const [rewardEarned, setRewardEarned] = useState<any>(null);

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
      // Simulate blockchain verification with realistic delay
      const result = await blockchainService.verifyEcoAction(challenge.id, 'user-123', challenge.carbonImpact);
      
      setIsCompleted(true);
      setRewardEarned(result);
      setShowSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
      
    } catch (error) {
      console.error('Error completing challenge:', error);
    } finally {
      setIsCompleting(false);
    }
  };

  const handlePremiumUpgrade = () => {
    // Show premium upgrade modal or redirect
    console.log('Redirecting to premium upgrade...');
    // In a real app, this would open a subscription modal
  };

  const categoryColor = categoryColors[challenge.category];

  return (
    <motion.div
      className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-${categoryColor}-500 relative overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Success Animation Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="absolute inset-0 bg-green-500 bg-opacity-90 flex items-center justify-center z-10 rounded-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center text-white">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <CheckCircle className="h-16 w-16 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-xl font-bold mb-2">Challenge Complete! 🎉</h3>
              <div className="space-y-1 text-sm">
                <p>+{challenge.xpReward} XP Earned</p>
                <p>+{challenge.carbonImpact}kg CO₂ Saved</p>
                {rewardEarned?.tokenReward && (
                  <p>+{rewardEarned.tokenReward} ECO Tokens</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
        {isCompleted && !showSuccess && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
          </motion.div>
        )}
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <motion.div 
            className="flex items-center space-x-1"
            whileHover={{ scale: 1.05 }}
          >
            <Clock className="h-4 w-4" />
            <span>{challenge.timeEstimate}</span>
          </motion.div>
          <motion.div 
            className="flex items-center space-x-1"
            whileHover={{ scale: 1.05 }}
          >
            <Award className="h-4 w-4" />
            <span>{challenge.xpReward} XP</span>
          </motion.div>
          <motion.div 
            className="flex items-center space-x-1"
            whileHover={{ scale: 1.05 }}
          >
            <Leaf className="h-4 w-4" />
            <span>{challenge.carbonImpact}kg CO₂</span>
          </motion.div>
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
          {isCompleted && rewardEarned?.nftBadge && (
            <motion.div 
              className="flex items-center space-x-1 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Star className="h-3 w-3" />
              <span>NFT Earned!</span>
            </motion.div>
          )}
        </div>
        
        <motion.button
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
            isCompleted
              ? 'bg-green-100 text-green-700 cursor-not-allowed'
              : challenge.isPremium
              ? 'bg-gradient-earth text-white hover:opacity-90 hover:shadow-lg'
              : `bg-${categoryColor}-500 text-white hover:bg-${categoryColor}-600 hover:shadow-lg`
          }`}
          whileHover={!isCompleted ? { 
            scale: 1.05,
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
          } : {}}
          whileTap={!isCompleted ? { scale: 0.95 } : {}}
          onClick={challenge.isPremium ? handlePremiumUpgrade : handleCompleteChallenge}
          disabled={isCompleting || isCompleted}
        >
          {isCompleting ? (
            <>
              <motion.div 
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span>Verifying on Blockchain...</span>
            </>
          ) : isCompleted ? (
            <>
              <CheckCircle className="h-5 w-5" />
              <span>Completed</span>
            </>
          ) : challenge.isPremium ? (
            <>
              <Star className="h-5 w-5" />
              <span>Unlock Premium</span>
            </>
          ) : (
            <>
              <Target className="h-5 w-5" />
              <span>Start Challenge</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Progress indicator for completing challenge */}
      {isCompleting && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-400 to-blue-500"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.2 }}
        />
      )}
    </motion.div>
  );
};

export default ChallengeCard;