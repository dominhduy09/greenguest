import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Volume2, VolumeX, Share2 } from 'lucide-react';
import { DailyTip as DailyTipType } from '../types';

interface DailyTipProps {
  tip: DailyTipType;
}

const DailyTip: React.FC<DailyTipProps> = ({ tip }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayAudio = () => {
    if (tip.audioUrl) {
      setIsPlaying(!isPlaying);
      // In a real app, this would integrate with ElevenLabs API
      console.log('Playing audio tip with ElevenLabs voice AI');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: tip.title,
        text: tip.content,
        url: window.location.href
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(`${tip.title}\n\n${tip.content}`);
    }
  };

  return (
    <motion.div
      className="bg-gradient-to-r from-sky-400 to-sky-600 text-white rounded-xl p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-full">
            <Lightbulb className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">💡 Today's Eco Tip</h3>
            <p className="text-sky-100 text-sm">Powered by AI sustainability coach</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePlayAudio}
          >
            {isPlaying ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </motion.button>
          <motion.button
            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
          >
            <Share2 className="h-5 w-5" />
          </motion.button>
        </div>
      </div>

      <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
        <h4 className="font-bold text-lg mb-2">{tip.title}</h4>
        <p className="text-sky-50 leading-relaxed">{tip.content}</p>
      </div>

      {isPlaying && (
        <motion.div
          className="mt-4 flex items-center space-x-2 text-sky-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-4 bg-white rounded-full"
                animate={{ scaleY: [1, 2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
          <span className="text-sm">AI voice coach is speaking...</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DailyTip;