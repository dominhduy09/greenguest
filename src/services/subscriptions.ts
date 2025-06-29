// RevenueCat integration for subscription management
export const subscriptionService = {
  getSubscriptionPlans: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'eco_premium_monthly',
            name: 'EcoPlus Monthly',
            price: '$9.99',
            features: [
              'Advanced AI challenges',
              'Personal sustainability coach',
              'Carbon offset marketplace',
              'Premium analytics dashboard',
              'Video workshops library'
            ],
            popular: false
          },
          {
            id: 'eco_premium_yearly',
            name: 'EcoPlus Yearly',
            price: '$99.99',
            originalPrice: '$119.88',
            features: [
              'All EcoPlus Monthly features',
              'Exclusive eco-invention contests',
              'Direct access to sustainability experts',
              'Custom challenge creation',
              'Priority customer support'
            ],
            popular: true,
            savings: '17% off'
          }
        ]);
      }, 300);
    });
  },

  subscribeToPlan: async (planId: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          subscriptionId: `sub_${Math.random().toString(36).substr(2, 9)}`,
          status: 'active',
          nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        });
      }, 1500);
    });
  }
};