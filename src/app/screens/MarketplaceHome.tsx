import { Search, MapPin, Bell, ChevronRight, Star, TrendingUp } from 'lucide-react';
import { Link } from 'react-router';
import { BottomNav } from '../components/BottomNav';
import { GlassCard } from '../components/GlassCard';
import { products, vendors, categories } from '../data/mockData';

export function MarketplaceHome() {
  const featuredProducts = products.filter(p => p.featured);
  const trendingProducts = products.filter(p => p.trending);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white pb-32">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Car Rescue
              </h1>
              <div className="flex items-center gap-1 text-sm text-gray-400 mt-1">
                <MapPin className="w-4 h-4" />
                <span>Abuja, Nigeria</span>
              </div>
            </div>
            <button className="relative p-3 bg-gray-900/50 backdrop-blur-md border border-gray-800/50 rounded-2xl">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full"></span>
            </button>
          </div>

          {/* Search Bar */}
          <Link to="/products">
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-900/50 backdrop-blur-md border border-gray-800/50 rounded-2xl">
              <Search className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400">Search car parts...</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="px-4 pt-6 space-y-6">
        {/* Categories */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Categories</h2>
          <div className="grid grid-cols-5 gap-3">
            {categories.map((category) => (
              <Link key={category.id} to="/products">
                <GlassCard className="p-4 text-center hover:bg-gray-800/50 transition-all cursor-pointer">
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <p className="text-xs text-gray-300">{category.name}</p>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Products Carousel */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Featured Products</h2>
            <Link to="/products" className="text-sm text-green-400 flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {featuredProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="flex-shrink-0 w-64">
                <GlassCard className="overflow-hidden hover:scale-105 transition-transform cursor-pointer">
                  <div className="relative h-40 bg-gray-800">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.originalPrice && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-lg">
                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm mb-1 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-400">{product.rating} ({product.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-bold text-green-400">₦{product.price.toLocaleString()}</p>
                        {product.originalPrice && (
                          <p className="text-xs text-gray-500 line-through">₦{product.originalPrice.toLocaleString()}</p>
                        )}
                      </div>
                      <span className="text-xs text-gray-400">{product.distance}</span>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>

        {/* Nearby Vendors */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Nearby Vendors</h2>
            <button className="text-sm text-green-400 flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {vendors.slice(0, 3).map((vendor) => (
              <GlassCard key={vendor.id} className="p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-800/50 transition-all">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-2xl font-bold">
                  {vendor.name[0]}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{vendor.name}</h3>
                  <p className="text-sm text-gray-400">{vendor.location}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-400">{vendor.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-400">{vendor.products} products</span>
                  </div>
                </div>
                <div className="text-sm text-green-400 font-medium">{vendor.distance}</div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Trending Products */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <h2 className="text-lg font-semibold">Trending / Best Sellers</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {trendingProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <GlassCard className="overflow-hidden hover:scale-105 transition-transform cursor-pointer">
                  <div className="relative h-32 bg-gray-800">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-xs mb-1 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-400">{product.rating}</span>
                    </div>
                    <p className="text-sm font-bold text-green-400">₦{product.price.toLocaleString()}</p>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
