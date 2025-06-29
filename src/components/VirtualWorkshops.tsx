import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Video, Users, Clock, Star, Play, Calendar, Award, ExternalLink } from 'lucide-react';
import { Workshop } from '../types';
import { workshopService } from '../services/workshops';

const VirtualWorkshops: React.FC = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);

  useEffect(() => {
    const loadWorkshops = async () => {
      try {
        const data = await workshopService.getWorkshops();
        setWorkshops(data);
      } catch (error) {
        console.error('Error loading workshops:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWorkshops();
  }, []);

  const handleJoinWorkshop = async (workshop: Workshop) => {
    try {
      const result = await workshopService.joinWorkshop(workshop.id, 'user-123');
      if (result.success) {
        window.open(result.accessUrl, '_blank');
      }
    } catch (error) {
      console.error('Error joining workshop:', error);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'green';
      case 'intermediate': return 'yellow';
      case 'advanced': return 'red';
      default: return 'gray';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      waste: 'earth',
      energy: 'sky',
      community: 'forest',
      transport: 'purple',
      water: 'blue',
      food: 'green'
    };
    return colors[category] || 'gray';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
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
          <Video className="h-6 w-6 mr-2 text-purple-500" />
          Virtual Sustainability Workshops
        </h3>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span>Powered by Tavus AI Agents</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workshops.map((workshop, index) => (
          <motion.div
            key={workshop.id}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Workshop Header */}
            <div className={`bg-gradient-to-r from-${getCategoryColor(workshop.category)}-400 to-${getCategoryColor(workshop.category)}-600 text-white p-4`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-1">{workshop.title}</h4>
                  <p className="text-sm opacity-90">with {workshop.instructor}</p>
                </div>
                {workshop.isPremium && (
                  <div className="bg-white/20 px-2 py-1 rounded-full text-xs font-semibold">
                    Premium
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{workshop.duration} min</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{workshop.participants}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4" />
                  <span>{workshop.rating}</span>
                </div>
              </div>
            </div>

            {/* Workshop Content */}
            <div className="p-4">
              <p className="text-gray-700 text-sm mb-4">{workshop.description}</p>
              
              <div className="flex items-center space-x-2 mb-4">
                <span className={`px-2 py-1 rounded-full bg-${getDifficultyColor(workshop.difficulty)}-100 text-${getDifficultyColor(workshop.difficulty)}-700 text-xs font-semibold`}>
                  {workshop.difficulty}
                </span>
                <span className={`px-2 py-1 rounded-full bg-${getCategoryColor(workshop.category)}-100 text-${getCategoryColor(workshop.category)}-700 text-xs font-semibold capitalize`}>
                  {workshop.category}
                </span>
              </div>

              {workshop.scheduledAt && (
                <div className="flex items-center space-x-2 mb-4 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Scheduled: {new Date(workshop.scheduledAt).toLocaleDateString()}</span>
                </div>
              )}

              {/* Materials Preview */}
              {workshop.materials.length > 0 && (
                <div className="mb-4">
                  <h5 className="font-semibold text-sm text-gray-800 mb-2">Included Materials:</h5>
                  <div className="space-y-1">
                    {workshop.materials.slice(0, 2).map((material, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs text-gray-600">
                        <ExternalLink className="h-3 w-3" />
                        <span>{material.title}</span>
                      </div>
                    ))}
                    {workshop.materials.length > 2 && (
                      <div className="text-xs text-gray-500">
                        +{workshop.materials.length - 2} more materials
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <motion.button
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                  workshop.isPremium
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90'
                    : `bg-${getCategoryColor(workshop.category)}-500 text-white hover:bg-${getCategoryColor(workshop.category)}-600`
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleJoinWorkshop(workshop)}
              >
                <Play className="h-4 w-4" />
                <span>{workshop.isPremium ? 'Join Premium Workshop' : 'Join Workshop'}</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Agent Features */}
      <motion.div
        className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-purple-900 mb-2 flex items-center">
              <Video className="h-5 w-5 mr-2" />
              🤖 AI-Powered Interactive Learning
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-purple-700">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Personalized instruction</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4" />
                <span>Real-time Q&A</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4" />
                <span>Completion certificates</span>
              </div>
            </div>
          </div>
          <motion.button
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore All Workshops
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VirtualWorkshops;