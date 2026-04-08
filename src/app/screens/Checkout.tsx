import { useState } from 'react';
import { ArrowLeft, MapPin, CreditCard, Building2, Check } from 'lucide-react';
import { useNavigate } from 'react-router';
import { BottomNav } from '../components/BottomNav';
import { GlassCard } from '../components/GlassCard';
import { getCart, clearCart, Order } from '../data/mockData';
import { toast } from 'sonner';

type PaymentMethod = 'card' | 'paystack' | 'transfer';

export function Checkout() {
  const navigate = useNavigate();
  const cartItems = getCart();
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = 2000;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = async () => {
    if (!deliveryAddress.trim()) {
      toast.error('Please enter delivery address');
      return;
    }
    if (!phoneNumber.trim()) {
      toast.error('Please enter phone number');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      const order: Order = {
        id: orderId,
        date: new Date().toLocaleDateString(),
        status: 'processing',
        items: cartItems,
        total: total,
        deliveryAddress: deliveryAddress,
      };

      // Store order in localStorage
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      existingOrders.push(order);
      localStorage.setItem('orders', JSON.stringify(existingOrders));

      clearCart();
      window.dispatchEvent(new Event('cartUpdated'));
      toast.success('Order placed successfully!');
      navigate(`/orders/${orderId}`);
      setIsProcessing(false);
    }, 2000);
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white pb-40">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-800/50 rounded-xl transition-all">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold">Checkout</h1>
          </div>
        </div>
      </div>

      <div className="px-4 pt-6 space-y-4">
        {/* Delivery Address */}
        <GlassCard className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-500/20 rounded-xl">
              <MapPin className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="font-semibold">Delivery Address</h3>
          </div>
          <textarea
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            placeholder="Enter your delivery address..."
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl outline-none focus:border-green-500 transition-all resize-none"
            rows={3}
          />
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone number"
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl outline-none focus:border-green-500 transition-all mt-3"
          />
        </GlassCard>

        {/* Payment Method */}
        <GlassCard className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-xl">
              <CreditCard className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="font-semibold">Payment Method</h3>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => setPaymentMethod('card')}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                paymentMethod === 'card'
                  ? 'border-green-500 bg-green-500/10'
                  : 'border-gray-700 bg-gray-800/30'
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === 'card' ? 'border-green-500' : 'border-gray-600'
              }`}>
                {paymentMethod === 'card' && <div className="w-3 h-3 bg-green-500 rounded-full" />}
              </div>
              <CreditCard className="w-5 h-5" />
              <span className="font-medium">Credit/Debit Card</span>
            </button>

            <button
              onClick={() => setPaymentMethod('paystack')}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                paymentMethod === 'paystack'
                  ? 'border-green-500 bg-green-500/10'
                  : 'border-gray-700 bg-gray-800/30'
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === 'paystack' ? 'border-green-500' : 'border-gray-600'
              }`}>
                {paymentMethod === 'paystack' && <div className="w-3 h-3 bg-green-500 rounded-full" />}
              </div>
              <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center text-xs font-bold">P</div>
              <span className="font-medium">Paystack</span>
            </button>

            <button
              onClick={() => setPaymentMethod('transfer')}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                paymentMethod === 'transfer'
                  ? 'border-green-500 bg-green-500/10'
                  : 'border-gray-700 bg-gray-800/30'
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === 'transfer' ? 'border-green-500' : 'border-gray-600'
              }`}>
                {paymentMethod === 'transfer' && <div className="w-3 h-3 bg-green-500 rounded-full" />}
              </div>
              <Building2 className="w-5 h-5" />
              <span className="font-medium">Bank Transfer</span>
            </button>
          </div>
        </GlassCard>

        {/* Order Summary */}
        <GlassCard className="p-4">
          <h3 className="font-semibold mb-4">Order Summary</h3>
          <div className="space-y-3 mb-4">
            {cartItems.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gray-800 overflow-hidden flex-shrink-0">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm line-clamp-1">{item.product.name}</p>
                  <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold">₦{(item.product.price * item.quantity).toLocaleString()}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2 border-t border-gray-800 pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Subtotal</span>
              <span className="font-semibold">₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Delivery Fee</span>
              <span className="font-semibold">₦{deliveryFee.toLocaleString()}</span>
            </div>
            <div className="border-t border-gray-800 pt-3 flex items-center justify-between">
              <span className="font-semibold text-lg">Total</span>
              <span className="text-2xl font-bold text-green-400">₦{total.toLocaleString()}</span>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Bottom Place Order Button */}
      <div className="fixed bottom-16 left-0 right-0 z-60 pb-safe">
        <div className="mx-auto max-w-md px-4 pb-4">
          <button
            onClick={handlePlaceOrder}
            disabled={isProcessing}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl font-semibold text-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            aria-label="Pay now and place order"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Check className="w-5 h-5" />
                Pay Now - ₦{total.toLocaleString()}
              </>
            )}
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
