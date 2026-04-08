import { useState, useEffect } from 'react';
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useNavigate, Link } from 'react-router';
import { BottomNav } from '../components/BottomNav';
import { GlassCard } from '../components/GlassCard';
import { getCart, updateCartQuantity, removeFromCart, CartItem } from '../data/mockData';
import { toast } from 'sonner';

export function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    setCartItems(getCart());
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateCartQuantity(productId, newQuantity);
    loadCart();
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleRemoveItem = (productId: string, productName: string) => {
    removeFromCart(productId);
    loadCart();
    window.dispatchEvent(new Event('cartUpdated'));
    toast.success(`Removed ${productName} from cart`);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = cartItems.length > 0 ? 2000 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white pb-40">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-800/50 rounded-xl transition-all">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold">Shopping Cart</h1>
            {cartItems.length > 0 && (
              <span className="ml-auto text-sm text-gray-400">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 pt-6">
        {cartItems.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-32 h-32 rounded-full bg-gray-800/50 flex items-center justify-center mb-6">
              <ShoppingBag className="w-16 h-16 text-gray-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Your cart is empty</h3>
            <p className="text-gray-400 text-center mb-6">
              Add some car parts to get started
            </p>
            <Link
              to="/products"
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl font-semibold hover:opacity-90 transition-all"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Cart Items */}
            {cartItems.map((item) => (
              <GlassCard key={item.product.id} className="p-4">
                <div className="flex gap-4">
                  <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-xl bg-gray-800 overflow-hidden">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.product.id}`}>
                      <h3 className="font-semibold mb-1 line-clamp-2">{item.product.name}</h3>
                    </Link>
                    <p className="text-sm text-gray-400 mb-2">{item.product.vendor}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-green-400">
                        ₦{(item.product.price * item.quantity).toLocaleString()}
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                          className="p-1.5 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          className="p-1.5 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.product.id, item.product.name)}
                    className="p-2 hover:bg-red-500/20 rounded-lg transition-all self-start"
                  >
                    <Trash2 className="w-5 h-5 text-red-400" />
                  </button>
                </div>
              </GlassCard>
            ))}

            {/* Order Summary */}
            <GlassCard className="p-4 space-y-3">
              <h3 className="font-semibold mb-3">Order Summary</h3>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Subtotal</span>
                <span className="font-semibold">₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Delivery Fee</span>
                <span className="font-semibold">₦{deliveryFee.toLocaleString()}</span>
              </div>
              <div className="border-t border-gray-800 pt-3 flex items-center justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-2xl font-bold text-green-400">₦{total.toLocaleString()}</span>
              </div>
            </GlassCard>
          </div>
        )}
      </div>

      {/* Bottom Checkout Button */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-16 left-0 right-0 z-60 pb-safe">
          <div className="mx-auto max-w-md px-4 pb-4">
            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl font-semibold text-lg hover:opacity-90 transition-all"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
