import { Home, Search, ShoppingCart, User, Store } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { getCart } from '../data/mockData';
import { useState, useEffect } from 'react';

export function BottomNav() {
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = getCart();
      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pb-safe">
      <div className="mx-auto max-w-md px-4 pb-4">
        <nav className="bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 rounded-3xl shadow-2xl px-4 py-3">
          <div className="flex items-center justify-around">
            <Link
              to="/"
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${
                isActive('/') ? 'bg-green-500/20 text-green-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Home className="w-6 h-6" />
              <span className="text-xs">Home</span>
            </Link>

            <Link
              to="/products"
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${
                isActive('/products') ? 'bg-green-500/20 text-green-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Search className="w-6 h-6" />
              <span className="text-xs">Browse</span>
            </Link>

            <Link
              to="/cart"
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all relative ${
                isActive('/cart') ? 'bg-green-500/20 text-green-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              <span className="text-xs">Cart</span>
            </Link>

            <Link
              to="/vendor"
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${
                isActive('/vendor') ? 'bg-green-500/20 text-green-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Store className="w-6 h-6" />
              <span className="text-xs">Vendor</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
