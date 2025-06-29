import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, ArrowUp, ExternalLink, Users } from 'lucide-react';
import { EcoInvention } from '../types';
import { apiService } from '../services/api';

const EcoInventions: React.FC = () => {
  const [inventions, setInventions] = useState<EcoInvention[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInventions = async () => {
      try {
        const data = await apiService.getEcoInventions();
        setInventions(data);
      } catch (error) {
        console.error('Error loading eco inventions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInventions();
  }, []);

  const handleUpvote = (inventionId: string) => {
    setInventions(prev => 
      prev.map(inv => 
        inv.id === inventionId 
          ? { ...inv, upvotes: inv.upvotes + 1 }
          : inv
      )
    );
  };

  const categoryColors = {
    waste: 'earth-500',
    water: 'sky-500',
    energy: 'yellow-500',
    transport: 'forest-500',
    food: 'green-500'
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
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
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <Lightbulb className="h-6 w-6 mr-2 text-yellow-500" />
          Community Eco-Inventions
        </h3>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Users className="h-4 w-4" />
          <span>Reddit Integration</span>
        </div>
      </div>

      <div className="space-y-4">
        {inventions.map((invention, index) => (
          <motion.div
            key={invention.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-start space-x-4">
              {invention.imageUrl && (
                <img
                  src={invention.imageUrl}
                  alt={invention.title}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />
              )}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{invention.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{invention.description}</p>
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <span>by u/{invention.creator}</span>
                      <span className={`px-2 py-1 rounded-full bg-${categoryColors[invention.category]} bg-opacity-20 text-${categoryColors[invention.category]} font-semibold`}>
                        {invention.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <motion.button
                  className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleUpvote(invention.id)}
                >
                  <ArrowUp className="h-5 w-5 text-forest-600" />
                  <span className="text-sm font-semibold text-gray-700">{invention.upvotes}</span>
                </motion.button>
                {invention.redditPost && (
                  <motion.button
                    className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-purple-900 mb-1">💡 Share Your Eco-Invention!</h4>
            <p className="text-sm text-purple-700">
              Got a wacky idea to save the planet? Share it on our subreddit!
            </p>
          </div>
          <motion.button
            className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join r/GreenQuest
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EcoInventions;