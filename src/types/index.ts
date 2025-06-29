export interface User {
  id: string;
  email: string;
  username: string;
  level: number;
  xp: number;
  carbonSaved: number;
  streak: number;
  achievements: Achievement[];
  isPremium: boolean;
  globalRank: number;
  country: string;
  timezone: string;
  preferences: UserPreferences;
  socialConnections: SocialConnection[];
  createdAt: string;
}

export interface UserPreferences {
  voiceEnabled: boolean;
  notifications: boolean;
  language: string;
  units: 'metric' | 'imperial';
  privacy: 'public' | 'friends' | 'private';
  challengeTypes: string[];
}

export interface SocialConnection {
  platform: 'twitter' | 'facebook' | 'instagram' | 'linkedin' | 'discord';
  connected: boolean;
  username?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: 'energy' | 'transport' | 'waste' | 'water' | 'food' | 'community';
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  xpReward: number;
  carbonImpact: number;
  timeEstimate: string;
  completed: boolean;
  isPremium: boolean;
  isPersonalized: boolean;
  aiGenerated: boolean;
  verificationMethod: 'photo' | 'location' | 'blockchain' | 'self-report';
  icon: string;
  tags: string[];
  globalParticipants: number;
  successRate: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  unlockedAt?: string;
  shareUrl?: string;
  shareCount: number;
  category: string;
  requirements: AchievementRequirement[];
}

export interface AchievementRequirement {
  type: 'challenges_completed' | 'carbon_saved' | 'streak_days' | 'social_shares' | 'community_impact';
  value: number;
  current: number;
}

export interface DailyTip {
  id: string;
  title: string;
  content: string;
  category: string;
  audioUrl?: string;
  videoUrl?: string;
  voicePersonality: 'motivational' | 'educational' | 'friendly' | 'expert';
  personalizedFor?: string;
  interactionPrompts: string[];
  date: string;
  likes: number;
  shares: number;
}

export interface EcoInvention {
  id: string;
  title: string;
  description: string;
  creator: string;
  upvotes: number;
  category: string;
  imageUrl?: string;
  redditPost?: string;
  feasibilityScore: number;
  impactPotential: 'low' | 'medium' | 'high' | 'revolutionary';
  tags: string[];
  comments: number;
  featured: boolean;
}

export interface Leaderboard {
  id: string;
  type: 'global' | 'country' | 'friends' | 'weekly' | 'monthly';
  users: LeaderboardEntry[];
  lastUpdated: string;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatar?: string;
  score: number;
  rank: number;
  carbonSaved: number;
  streak: number;
  country: string;
  badge?: string;
}

export interface Workshop {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: number;
  difficulty: string;
  category: string;
  videoUrl: string;
  tavusAgentId: string;
  isPremium: boolean;
  participants: number;
  rating: number;
  scheduledAt?: string;
  materials: WorkshopMaterial[];
}

export interface WorkshopMaterial {
  type: 'pdf' | 'link' | 'video' | 'checklist';
  title: string;
  url: string;
  description: string;
}

export interface BlockchainReward {
  id: string;
  userId: string;
  actionType: string;
  carbonImpact: number;
  tokenAmount: number;
  transactionHash: string;
  verified: boolean;
  createdAt: string;
  tradeable: boolean;
  marketValue: number;
}

export interface CommunityPost {
  id: string;
  userId: string;
  username: string;
  content: string;
  imageUrl?: string;
  category: string;
  likes: number;
  comments: number;
  shares: number;
  createdAt: string;
  tags: string[];
}