import { useState } from 'react';
import { ArrowLeft, Star, MapPin, Truck, ShoppingCart, Store, ChevronRight, Minus, Plus } from 'lucide-react';
import { useParams, useNavigate } from 'react-router';
import { BottomNav } from '../components/BottomNav';
import { GlassCard } from '../components/GlassCard';
import { products, vendors, addToCart } from '../data/mockData';
import { toast } from 'sonner';

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = products.find(p => p.id === id);
  const vendor = product ? vendors.find(v => v.id === product.vendorId) : null;

  if (!product || !vendor) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Product not found</h2>
          <button onClick={() => navigate('/')} className="text-green-400">
            Go back to home
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`Added ${quantity}x ${product.name} to cart`);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    window.dispatchEvent(new Event('cartUpdated'));
    navigate('/checkout');
  };

  // Mock gallery images (same image for demo)
  const galleryImages = [product.image, product.image, product.image];

  // Mock reviews
  const reviews = [
    { id: 1, author: 'John D.', rating: 5, date: '2 days ago', comment: 'Excellent quality! Fast delivery and great price.' },
    { id: 2, author: 'Sarah M.', rating: 4, date: '1 week ago', comment: 'Good product, works perfectly with my car.' },
    { id: 3, author: 'Mike T.', rating: 5, date: '2 weeks ago', comment: 'Highly recommended! Professional vendor.' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white pb-40">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="px-4 py-4 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-800/50 rounded-xl transition-all">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">Product Details</h1>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative">
        <div className="h-80 bg-gray-900">
          <img
            src={galleryImages[selectedImage]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.originalPrice && (
            <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-2 rounded-xl font-semibold">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </div>
          )}
        </div>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-12 h-12 rounded-lg border-2 overflow-hidden transition-all ${
                selectedImage === index ? 'border-green-400 scale-110' : 'border-gray-700'
              }`}
            >
              <img src={product.image} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-6 space-y-4">
        {/* Product Info */}
        <GlassCard className="p-4">
          <h2 className="text-xl font-bold mb-2">{product.name}</h2>
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{product.rating}</span>
              <span className="text-gray-400 text-sm">({product.reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>{product.distance} away</span>
            </div>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div>
              <p className="text-3xl font-bold text-green-400">₦{product.price.toLocaleString()}</p>
              {product.originalPrice && (
                <p className="text-sm text-gray-500 line-through">₦{product.originalPrice.toLocaleString()}</p>
              )}
            </div>
            <div className="flex-1"></div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Truck className="w-4 h-4 text-green-400" />
            <span className="text-gray-300">Delivery in 1-3 days</span>
            <span className="text-gray-500">•</span>
            <span className="text-green-400">{product.stock} in stock</span>
          </div>
        </GlassCard>

        {/* Vendor Info */}
        <GlassCard className="p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-800/50 transition-all">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-xl font-bold">
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
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </GlassCard>

        {/* Description */}
        <GlassCard className="p-4">
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-sm text-gray-300 leading-relaxed">{product.description}</p>
        </GlassCard>

        {/* Reviews */}
        <GlassCard className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Customer Reviews</h3>
            <button className="text-sm text-green-400 flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-t border-gray-800 pt-4 first:border-0 first:pt-0">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-sm">{review.author}</p>
                    <p className="text-xs text-gray-400">{review.date}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-300">{review.comment}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-16 left-0 right-0 z-60 pb-safe">
        <div className="mx-auto max-w-md px-4 pb-4">
          <GlassCard className="p-4 flex gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-800 border border-gray-700 rounded-2xl font-semibold hover:bg-gray-700 transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 py-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl font-semibold hover:opacity-90 transition-all"
            >
              Buy Now
            </button>
          </GlassCard>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
