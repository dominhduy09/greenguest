import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Download, Twitter, Facebook, Instagram, Linkedin, Copy, Sparkles } from 'lucide-react';
import { socialService } from '../services/social';

interface ViralShareCardProps {
  type: 'achievement' | 'progress' | 'challenge';
  data: any;
  onClose: () => void;
}

const ViralShareCard: React.FC<ViralShareCardProps> = ({ type, data, onClose }) => {
  const [sharing, setSharing] = useState(false);
  const [shareResults, setShareResults] = useState<any>(null);

  const socialPlatforms = [
    { name: 'Twitter', icon: Twitter, color: 'bg-blue-500', handle: 'twitter' },
    { name: 'Facebook', icon: Facebook, color: 'bg-blue-600', handle: 'facebook' },
    { name: 'Instagram', icon: Instagram, color: 'bg-pink-500', handle: 'instagram' },
    { name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-700', handle: 'linkedin' }
  ];

  const handleShare = async (platforms: string[]) => {
    setSharing(true);
    try {
      let shareData;
      if (type === 'achievement') {
        shareData = await socialService.shareAchievement(data, platforms);
      } else if (type === 'progress') {
        shareData = await socialService.generateProgressCard('user-123', data);
      }
      setShareResults(shareData);
    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setSharing(false);
    }
  };

  const copyToClipboard = () => {
    const shareText = type === 'achievement' 
      ? `🏆 I just unlocked "${data.title}" on GreenQuest! ${data.description} Join me in making a sustainable impact! 🌱 #GreenQuest #EcoWarrior`
      : `🌍 My GreenQuest Impact: ${data.carbonSaved}kg CO₂ saved, Level ${data.level}! Join me at greenquest.app #EcoImpact`;
    
    navigator.clipboard.writeText(shareText);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {type === 'achievement' ? '🏆 Share Your Achievement!' : '📊 Share Your Impact!'}
          </h3>
          <p className="text-gray-600">
            Inspire others to join the eco-revolution and multiply your impact!
          </p>
        </div>

        {/* Preview Card */}
        <div className="bg-gradient-to-br from-forest-50 to-sky-50 rounded-xl p-4 mb-6 border-2 border-dashed border-forest-200">
          {type === 'achievement' ? (
            <div className="text-center">
              <div className="text-4xl mb-2">🏆</div>
              <h4 className="font-bold text-forest-800">{data.title}</h4>
              <p className="text-sm text-forest-600 mt-1">{data.description}</p>
              <div className="mt-3 flex justify-center space-x-2">
                <span className="bg-forest-100 text-forest-700 px-2 py-1 rounded-full text-xs font-semibold">
                  {data.rarity}
                </span>
                <span className="bg-sky-100 text-sky-700 px-2 py-1 rounded-full text-xs font-semibold">
                  GreenQuest
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-4xl mb-2">🌍</div>
              <h4 className="font-bold text-forest-800">My Eco Impact</h4>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <div className="text-lg font-bold text-forest-600">{data.carbonSaved}kg</div>
                  <div className="text-xs text-gray-600">CO₂ Saved</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-sky-600">Level {data.level}</div>
                  <div className="text-xs text-gray-600">{data.streak} day streak</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Social Platform Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {socialPlatforms.map((platform) => (
            <motion.button
              key={platform.name}
              className={`${platform.color} text-white p-3 rounded-lg flex items-center justify-center space-x-2 font-semibold hover:opacity-90 transition-opacity`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleShare([platform.handle])}
              disabled={sharing}
            >
              <platform.icon className="h-5 w-5" />
              <span>{platform.name}</span>
            </motion.button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <motion.button
            className="flex-1 bg-gray-100 text-gray-700 p-3 rounded-lg flex items-center justify-center space-x-2 font-semibold hover:bg-gray-200 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={copyToClipboard}
          >
            <Copy className="h-4 w-4" />
            <span>Copy Link</span>
          </motion.button>
          <motion.button
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-lg flex items-center justify-center space-x-2 font-semibold hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleShare(['twitter', 'facebook', 'instagram', 'linkedin'])}
            disabled={sharing}
          >
            <Share2 className="h-4 w-4" />
            <span>{sharing ? 'Sharing...' : 'Share All'}</span>
          </motion.button>
        </div>

        {shareResults && (
          <motion.div
            className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center space-x-2 text-green-700">
              <Sparkles className="h-4 w-4" />
              <span className="font-semibold">Shared successfully!</span>
            </div>
            <p className="text-sm text-green-600 mt-1">
              Viral score: {shareResults.viralScore}/100 🚀
            </p>
          </motion.div>
        )}

        <motion.button
          className="w-full mt-4 text-gray-500 hover:text-gray-700 transition-colors"
          onClick={onClose}
          whileHover={{ scale: 1.02 }}
        >
          Close
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ViralShareCard;