import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Volume2, VolumeX, Share2, Heart, Bookmark, ExternalLink } from 'lucide-react';
import { DailyTip as DailyTipType } from '../types';

interface DailyTipProps {
  tip: DailyTipType;
}

const DailyTip: React.FC<DailyTipProps> = ({ tip }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [likeCount, setLikeCount] = useState(tip.likes || 42);

  const handlePlayAudio = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      console.log('🎵 Playing audio tip with ElevenLabs voice AI');
      // Simulate audio playing
      setTimeout(() => setIsPlaying(false), 3000);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    console.log(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
  };

  const handleShare = (platform?: string) => {
    const shareText = `💡 ${tip.title}\n\n${tip.content}\n\nDiscover more eco-tips on GreenQuest! 🌱 #EcoTips #Sustainability`;
    
    if (platform) {
      const urls = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
      };
      window.open(urls[platform as keyof typeof urls], '_blank');
    } else if (navigator.share) {
      navigator.share({
        title: tip.title,
        text: tip.content,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      console.log('Tip copied to clipboard!');
    }
    setShowShareOptions(false);
  };

  return (
    <motion.div
      className="bg-gradient-to-r from-sky-400 to-sky-600 text-white rounded-xl p-6 shadow-lg relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 text-6xl">💡</div>
        <div className="absolute bottom-4 left-4 text-4xl">🌱</div>
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <motion.div 
              className="p-2 bg-white/20 rounded-full"
              whileHover={{ rotate: 15, scale: 1.1 }}
              whileTap={{ rotate: -15, scale: 0.9 }}
            >
              <Lightbulb className="h-6 w-6" />
            </motion.div>
            <div>
              <h3 className="text-xl font-bold">💡 Today's Eco Tip</h3>
              <p className="text-sky-100 text-sm">Powered by AI sustainability coach</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Audio Button */}
            <motion.button
              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePlayAudio}
            >
              {isPlaying ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </motion.button>

            {/* Share Button */}
            <motion.button
              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowShareOptions(!showShareOptions)}
            >
              <Share2 className="h-5 w-5" />
            </motion.button>

            {/* Share Options Dropdown */}
            <AnimatePresence>
              {showShareOptions && (
                <motion.div
                  className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl p-3 z-20"
                  initial={{ opacity: 0, scale: 0.8, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex space-x-2">
                    <motion.button
                      className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleShare('twitter')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleShare('facebook')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      className="p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleShare('linkedin')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <motion.div 
          className="bg-white/10 rounded-lg p-4 backdrop-blur-sm mb-4"
          whileHover={{ backgroundColor: "rgba(255,255,255,0.15)" }}
          transition={{ duration: 0.3 }}
        >
          <h4 className="font-bold text-lg mb-2">{tip.title}</h4>
          <p className="text-sky-50 leading-relaxed">{tip.content}</p>
        </motion.div>

        {/* Audio Playing Animation */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              className="flex items-center space-x-3 text-sky-100 mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="flex space-x-1">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-6 bg-white rounded-full"
                    animate={{ 
                      scaleY: [1, 2, 1.5, 1],
                      opacity: [0.5, 1, 0.7, 0.5]
                    }}
                    transition={{ 
                      duration: 0.8, 
                      repeat: Infinity, 
                      delay: i * 0.1 
                    }}
                  />
                ))}
              </div>
              <span className="text-sm">🎙️ AI voice coach is speaking...</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Like Button */}
            <motion.button
              className="flex items-center space-x-2 text-sky-100 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLike}
            >
              <motion.div
                animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current text-red-300' : ''}`} />
              </motion.div>
              <span className="text-sm font-semibold">{likeCount}</span>
            </motion.button>

            {/* Bookmark Button */}
            <motion.button
              className="flex items-center space-x-2 text-sky-100 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBookmark}
            >
              <motion.div
                animate={isBookmarked ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current text-yellow-300' : ''}`} />
              </motion.div>
              <span className="text-sm">{isBookmarked ? 'Saved' : 'Save'}</span>
            </motion.button>
          </div>

          <div className="text-xs text-sky-200">
            Category: {tip.category} • {new Date(tip.date).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Click outside to close share options */}
      {showShareOptions && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => setShowShareOptions(false)}
        />
      )}
    </motion.div>
  );
};

export default DailyTip;