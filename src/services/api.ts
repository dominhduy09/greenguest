import { Challenge, Achievement, DailyTip, EcoInvention } from '../types';

// Mock data for demonstration
export const apiService = {
  // Challenges
  getChallenges: async (): Promise<Challenge[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            title: 'Plastic-Free Day',
            description: 'Go a full day without using single-use plastics',
            category: 'waste',
            difficulty: 'medium',
            xpReward: 150,
            carbonImpact: 2.5,
            timeEstimate: '1 day',
            completed: false,
            isPremium: false,
            icon: 'Recycle'
          },
          {
            id: '2',
            title: 'Walk or Bike to Work',
            description: 'Leave the car at home and use sustainable transport',
            category: 'transport',
            difficulty: 'easy',
            xpReward: 100,
            carbonImpact: 4.2,
            timeEstimate: '1 commute',
            completed: true,
            isPremium: false,
            icon: 'Bike'
          },
          {
            id: '3',
            title: 'Plant-Based Meal Prep',
            description: 'Prepare 5 plant-based meals for the week',
            category: 'food',
            difficulty: 'hard',
            xpReward: 200,
            carbonImpact: 8.5,
            timeEstimate: '2 hours',
            completed: false,
            isPremium: true,
            icon: 'Sprout'
          },
          {
            id: '4',
            title: 'Energy Audit Challenge',
            description: 'Conduct a full home energy audit and implement 3 improvements',
            category: 'energy',
            difficulty: 'hard',
            xpReward: 300,
            carbonImpact: 15.0,
            timeEstimate: '3 hours',
            completed: false,
            isPremium: true,
            icon: 'Zap'
          }
        ]);
      }, 500);
    });
  },

  // Achievements
  getAchievements: async (): Promise<Achievement[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            title: 'First Steps',
            description: 'Complete your first eco-challenge',
            icon: 'Footprints',
            rarity: 'common',
            unlockedAt: '2024-01-15T10:30:00Z'
          },
          {
            id: '2',
            title: 'Streak Master',
            description: 'Maintain a 7-day challenge streak',
            icon: 'Flame',
            rarity: 'rare'
          },
          {
            id: '3',
            title: 'Carbon Warrior',
            description: 'Save 100kg of CO2 through your actions',
            icon: 'Shield',
            rarity: 'epic'
          },
          {
            id: '4',
            title: 'Planet Guardian',
            description: 'Save 1000kg of CO2 and inspire 10 friends to join',
            icon: 'Crown',
            rarity: 'legendary'
          }
        ]);
      }, 300);
    });
  },

  // Daily Tips
  getDailyTip: async (): Promise<DailyTip> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: '1',
          title: 'Smart Water Usage',
          content: 'Taking shorter showers can save up to 25 gallons of water per day. Try the 5-minute shower challenge and see the difference!',
          category: 'water',
          date: new Date().toISOString(),
          audioUrl: 'https://api.elevenlabs.io/v1/text-to-speech/placeholder'
        });
      }, 200);
    });
  },

  // Eco Inventions (Reddit integration)
  getEcoInventions: async (): Promise<EcoInvention[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            title: 'Solar-Powered Compost Turner',
            description: 'A self-turning composter that uses solar energy to optimize decomposition',
            creator: 'EcoInventor_42',
            upvotes: 245,
            category: 'waste',
            imageUrl: 'https://images.pexels.com/photos/9324361/pexels-photo-9324361.jpeg'
          },
          {
            id: '2',
            title: 'Rainwater Collection Shoes',
            description: 'Footwear that collects rainwater while you walk for later use',
            creator: 'SustainableSteps',
            upvotes: 189,
            category: 'water',
            imageUrl: 'https://images.pexels.com/photos/6039245/pexels-photo-6039245.jpeg'
          }
        ]);
      }, 400);
    });
  }
};