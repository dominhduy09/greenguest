import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, Target, TrendingUp, Clock, Award } from 'lucide-react';
import { Challenge } from '../types';
import { aiService } from '../services/ai';
import ChallengeCard from './ChallengeCard';

const AIPersonalizedChallenges: React.FC = () => {
  const [personalizedChallenges, setPersonalizedChallenges] = useState<Challenge[]>([]);
  const [aiInsights, setAiInsights] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    loadPersonalizedContent();
  }, []);

  const loadPersonalizedContent = async () => {
    try {
      const [challenges, insights] = await Promise.all([
        aiService.generatePersonalizedChallenges('user-123', {}, []),
        aiService.analyzeProgress('user-123', [])
      ]);
      setPersonalizedChallenges(challenges);
      setAiInsights(insights);
    } catch (error) {
      console.error('Error loading AI content:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateNewChallenges = async () => {
    setGenerating(true);
    try {
      const newChallenges = await aiService.generatePersonalizedChallenges('user-123', {}, []);
      setPersonalizedChallenges(newChallenges);
    } catch (error) {
      console.error('Error generating new challenges:', error);
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* AI Insights Panel */}
      <motion.div
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-6 shadow-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-full">
              <Brain className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">🤖 AI Eco Coach</h3>
              <p className="text-purple-100 text-sm">Personalized insights just for you</p>
            </div>
          </div>
          <motion.button
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-semibold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateNewChallenges}
            disabled={generating}
          >
            {generating ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Generating...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4" />
                <span>New Challenges</span>
              </div>
            )}
          </motion.button>
        </div>

        {aiInsights && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5" />
                <span className="font-semibold">Progress Insights</span>
              </div>
              <div className="space-y-1 text-sm">
                {aiInsights.insights.map((insight: string, index: number) => (
                  <p key={index} className="text-purple-100">• {insight}</p>
                ))}
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="h-5 w-5" />
                <span className="font-semibold">AI Recommendations</span>
              </div>
              <div className="space-y-1 text-sm">
                {aiInsights.recommendations.slice(0, 2).map((rec: string, index: number) => (
                  <p key={index} className="text-purple-100">• {rec}</p>
                ))}
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="h-5 w-5" />
                <span className="font-semibold">Projected Impact</span>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{aiInsights.projectedImpact.nextMonth}kg</div>
                <div className="text-xs text-purple-200">CO₂ next month</div>
                <div className="text-xs text-purple-200 mt-1">
                  {Math.round(aiInsights.projectedImpact.confidence * 100)}% confidence
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Personalized Challenges */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-forest-800 flex items-center">
            <Sparkles className="h-6 w-6 mr-2 text-purple-500" />
            AI-Powered Challenges
          </h3>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Brain className="h-4 w-4" />
            <span>Tailored for your lifestyle</span>
          </div>
        </div>

        <div className="space-y-4">
          {personalizedChallenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="relative">
                <ChallengeCard challenge={challenge} />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                  <Brain className="h-3 w-3" />
                  <span>AI Generated</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Features Showcase */}
      <motion.div
        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-blue-900 mb-2 flex items-center">
              <Sparkles className="h-5 w-5 mr-2" />
              🚀 Unlock Premium AI Features
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-700">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Real-time habit tracking</span>
              </div>
              <div className="flex items-center space-x-2">
                <Brain className="h-4 w-4" />
                <span>Advanced behavior analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <span>Predictive goal setting</span>
              </div>
            </div>
          </div>
          <motion.button
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Upgrade Now
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AIPersonalizedChallenges;