import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Coins, TrendingUp, ShoppingCart, Award, Globe, Zap, Shield, Star } from 'lucide-react';
import { blockchainService } from '../services/blockchain';

const BlockchainMarketplace: React.FC = () => {
  const [marketplace, setMarketplace] = useState<any>(null);
  const [userBalance, setUserBalance] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [trading, setTrading] = useState<string | null>(null);

  useEffect(() => {
    const loadMarketplaceData = async () => {
      try {
        const [marketData, balanceData] = await Promise.all([
          blockchainService.getMarketplace(),
          blockchainService.getTokenBalance('user-123')
        ]);
        setMarketplace(marketData);
        setUserBalance(balanceData);
      } catch (error) {
        console.error('Error loading marketplace:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMarketplaceData();
  }, []);

  const handleTrade = async (listingId: string, tokenAmount: number) => {
    setTrading(listingId);
    try {
      const result = await blockchainService.tradeTokens(listingId, 'user-123', tokenAmount);
      if (result.success) {
        // Update user balance
        setUserBalance(prev => ({
          ...prev,
          balance: prev.balance + tokenAmount,
          carbonCredits: prev.carbonCredits + result.carbonCredits
        }));
        
        // Remove listing from marketplace
        setMarketplace(prev => ({
          ...prev,
          listings: prev.listings.filter((listing: any) => listing.id !== listingId)
        }));
      }
    } catch (error) {
      console.error('Error trading tokens:', error);
    } finally {
      setTrading(null);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
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
          <Coins className="h-6 w-6 mr-2 text-yellow-500" />
          Carbon Credit Marketplace
        </h3>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Shield className="h-4 w-4" />
          <span>Algorand Verified</span>
        </div>
      </div>

      {/* User Portfolio */}
      <motion.div
        className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-6 border border-green-200"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">{userBalance?.balance}</div>
            <div className="text-xs text-gray-600">ECO Tokens</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">${userBalance?.usdValue}</div>
            <div className="text-xs text-gray-600">USD Value</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">{userBalance?.carbonCredits}</div>
            <div className="text-xs text-gray-600">Carbon Credits</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">{userBalance?.nftBadges?.length || 0}</div>
            <div className="text-xs text-gray-600">NFT Badges</div>
          </div>
        </div>
      </motion.div>

      {/* Market Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <div className="text-lg font-bold text-gray-900">${marketplace?.marketStats?.averagePrice}</div>
          <div className="text-xs text-gray-600">Avg. Price</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <div className="text-lg font-bold text-gray-900">{marketplace?.marketStats?.activeListings}</div>
          <div className="text-xs text-gray-600">Active Listings</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <div className="text-lg font-bold text-gray-900">${marketplace?.marketStats?.totalVolume?.toLocaleString()}</div>
          <div className="text-xs text-gray-600">Total Volume</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <div className="text-lg font-bold text-gray-900">{marketplace?.marketStats?.totalCarbonTraded}</div>
          <div className="text-xs text-gray-600">CO₂ Traded</div>
        </div>
      </div>

      {/* Active Listings */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2" />
          Active Carbon Credit Listings
        </h4>
        
        {marketplace?.listings?.map((listing: any, index: number) => (
          <motion.div
            key={listing.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">{listing.seller}</h5>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className="capitalize">{listing.actionType.replace('_', ' ')}</span>
                      <span>•</span>
                      <span>{listing.location}</span>
                      {listing.verified && (
                        <>
                          <span>•</span>
                          <div className="flex items-center space-x-1 text-green-600">
                            <Shield className="h-3 w-3" />
                            <span>Verified</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-gray-900">{listing.tokenAmount} ECO</div>
                    <div className="text-gray-600">Tokens</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{listing.carbonCredits}kg</div>
                    <div className="text-gray-600">CO₂ Credits</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">${listing.pricePerToken}</div>
                    <div className="text-gray-600">Per Token</div>
                  </div>
                </div>
              </div>
              
              <div className="text-right ml-4">
                <div className="text-xl font-bold text-green-600 mb-2">
                  ${listing.totalPrice}
                </div>
                <motion.button
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    trading === listing.id
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:opacity-90'
                  }`}
                  whileHover={trading !== listing.id ? { scale: 1.05 } : {}}
                  whileTap={trading !== listing.id ? { scale: 0.95 } : {}}
                  onClick={() => handleTrade(listing.id, listing.tokenAmount)}
                  disabled={trading === listing.id}
                >
                  {trading === listing.id ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Trading...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <ShoppingCart className="h-4 w-4" />
                      <span>Buy Credits</span>
                    </div>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* NFT Badges Showcase */}
      {userBalance?.nftBadges && userBalance.nftBadges.length > 0 && (
        <motion.div
          className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h4 className="font-bold text-purple-900 mb-4 flex items-center">
            <Award className="h-5 w-5 mr-2" />
            🏆 Your NFT Achievement Badges
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userBalance.nftBadges.map((badge: any, index: number) => (
              <div key={badge.id} className="bg-white rounded-lg p-4 border border-purple-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-gray-900">{badge.name}</h5>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        badge.rarity === 'epic' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {badge.rarity}
                      </span>
                      <span>{badge.carbonSaved}kg CO₂</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Blockchain Info */}
      <motion.div
        className="mt-6 text-center text-sm text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center justify-center space-x-2">
          <Zap className="h-4 w-4" />
          <span>Powered by Algorand blockchain for transparent, verified carbon credits</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BlockchainMarketplace;