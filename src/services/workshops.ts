// Tavus Video Agent Integration for Virtual Workshops
export const workshopService = {
  getWorkshops: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'workshop_1',
            title: 'Zero Waste Kitchen Mastery',
            description: 'Learn to eliminate food waste with AI-powered meal planning and composting techniques',
            instructor: 'Dr. Sarah Green',
            duration: 45,
            difficulty: 'Beginner',
            category: 'waste',
            videoUrl: 'https://tavus.io/workshop/zero-waste-kitchen',
            tavusAgentId: 'agent_sarah_green_eco',
            isPremium: false,
            participants: 1247,
            rating: 4.8,
            materials: [
              {
                type: 'pdf',
                title: 'Zero Waste Kitchen Checklist',
                url: '/materials/zero-waste-checklist.pdf',
                description: 'Complete guide to setting up your zero-waste kitchen'
              },
              {
                type: 'link',
                title: 'Recommended Composting Systems',
                url: 'https://greenquest.app/composting-guide',
                description: 'Curated list of home composting solutions'
              }
            ]
          },
          {
            id: 'workshop_2',
            title: 'Renewable Energy for Renters',
            description: 'Discover portable solar solutions and energy-saving hacks for apartment living',
            instructor: 'Marcus Solar',
            duration: 60,
            difficulty: 'Intermediate',
            category: 'energy',
            videoUrl: 'https://tavus.io/workshop/renewable-energy-renters',
            tavusAgentId: 'agent_marcus_solar_tech',
            isPremium: true,
            participants: 892,
            rating: 4.9,
            scheduledAt: '2024-01-20T18:00:00Z',
            materials: [
              {
                type: 'video',
                title: 'Solar Panel Installation Demo',
                url: 'https://tavus.io/demo/solar-installation',
                description: 'Step-by-step portable solar setup'
              },
              {
                type: 'checklist',
                title: 'Energy Audit Checklist',
                url: '/materials/energy-audit.pdf',
                description: 'Complete your own home energy assessment'
              }
            ]
          },
          {
            id: 'workshop_3',
            title: 'Community Climate Action',
            description: 'Build local environmental initiatives with AI-powered community organizing tools',
            instructor: 'Elena Community',
            duration: 90,
            difficulty: 'Advanced',
            category: 'community',
            videoUrl: 'https://tavus.io/workshop/community-action',
            tavusAgentId: 'agent_elena_community_leader',
            isPremium: true,
            participants: 456,
            rating: 4.7,
            materials: [
              {
                type: 'pdf',
                title: 'Community Organizing Toolkit',
                url: '/materials/community-toolkit.pdf',
                description: 'Templates and strategies for local climate action'
              }
            ]
          }
        ]);
      }, 600);
    });
  },

  joinWorkshop: async (workshopId: string, userId: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          accessUrl: `https://tavus.io/workshop/${workshopId}/join?user=${userId}`,
          personalizedAgent: {
            greeting: 'Welcome to the workshop! I\'ve reviewed your GreenQuest profile and prepared some personalized tips.',
            adaptations: [
              'Adjusted examples for your climate zone',
              'Included resources for your experience level',
              'Added follow-up challenges based on your interests'
            ]
          },
          materials: true,
          certificate: true
        });
      }, 800);
    });
  }
};