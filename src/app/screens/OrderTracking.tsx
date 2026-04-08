import { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { useParams, useNavigate } from 'react-router';
import { BottomNav } from '../components/BottomNav';
import { GlassCard } from '../components/GlassCard';
import { Order } from '../data/mockData';

type OrderStatus = 'processing' | 'shipped' | 'delivered';

export function OrderTracking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>('processing');

  useEffect(() => {
    // Load order from localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const foundOrder = orders.find((o: Order) => o.id === id);
    if (foundOrder) {
      setOrder(foundOrder);
      setCurrentStatus(foundOrder.status);
    } else {
      // Fallback to mock data if not found
      setOrder({
        id: id || 'ORD-123456',
        date: 'April 7, 2026',
        status: 'processing',
        items: [
          {
            product: {
              id: '1',
              name: 'Toyota Camry Brake Pads 2010-2015',
              price: 12500,
              image: '',
              vendor: 'AutoParts Nigeria',
              vendorId: 'v1',
              rating: 4.8,
              reviews: 124,
              category: 'Brake Pads',
              description: '',
              stock: 45,
            },
            quantity: 2,
          },
          {
            product: {
              id: '2',
              name: 'Premium Car Engine Oil Filter',
              price: 3500,
              image: '',
              vendor: 'Quality Parts Ltd',
              vendorId: 'v2',
              rating: 4.6,
              reviews: 89,
              category: 'Engine',
              description: '',
              stock: 120,
            },
            quantity: 1,
          },
        ],
        total: 30500,
        deliveryAddress: 'Plot 123, Wuse Zone 4, Abuja, Nigeria',
      });
    }
  }, [id]);

  // Simulate status progression if order exists
  useEffect(() => {
    if (!order) return;

    const updateStatus = (status: OrderStatus) => {
      setCurrentStatus(status);
      // Update in localStorage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const updatedOrders = orders.map((o: Order) => 
        o.id === order.id ? { ...o, status } : o
      );
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      setOrder(prev => prev ? { ...prev, status } : null);
    };

    const timer1 = setTimeout(() => updateStatus('shipped'), 3000);
    const timer2 = setTimeout(() => updateStatus('delivered'), 6000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [order]);

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Order not found</h2>
          <button onClick={() => navigate('/')} className="text-green-400">
            Go back to home
          </button>
        </div>
      </div>
    );
  }

  const statusSteps = [
    { status: 'processing', label: 'Processing', icon: Package, time: 'Completed' },
    { status: 'shipped', label: 'Shipped', icon: Truck, time: currentStatus === 'processing' ? 'Pending' : 'In Progress' },
    { status: 'delivered', label: 'Delivered', icon: CheckCircle, time: currentStatus === 'delivered' ? 'Completed' : 'Pending' },
  ];

  const getStatusIndex = (status: OrderStatus) => {
    const map = { processing: 0, shipped: 1, delivered: 2 };
    return map[status];
  };

  const currentIndex = getStatusIndex(currentStatus);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white pb-32">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-800/50 rounded-xl transition-all">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold">Order Tracking</h1>
              <p className="text-sm text-gray-400">{order.id}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pt-6 space-y-6">
        {/* Success Message */}
        <GlassCard className="p-6 text-center bg-gradient-to-br from-green-500/10 to-blue-500/10 border-green-500/20">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
          <p className="text-gray-400">
            Thank you for your order. We'll notify you when it's on the way.
          </p>
        </GlassCard>

        {/* Map View (Mock) */}
        <GlassCard className="overflow-hidden">
          <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900">
            {/* Mock map with delivery route */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 mx-auto mb-2 text-green-400 animate-bounce" />
                <p className="text-sm text-gray-400">Live tracking available soon</p>
              </div>
            </div>
            {/* Mock route line */}
            <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 300">
              <path
                d="M 50 250 Q 200 50 350 250"
                stroke="url(#gradient)"
                strokeWidth="4"
                fill="none"
                strokeDasharray="10,5"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </GlassCard>

        {/* Order Status Timeline */}
        <GlassCard className="p-6">
          <h3 className="font-semibold mb-6">Order Status</h3>
          <div className="space-y-6">
            {statusSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index <= currentIndex;
              const isCurrent = index === currentIndex;

              return (
                <div key={step.status} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        isActive
                          ? 'bg-gradient-to-br from-green-500 to-blue-500'
                          : 'bg-gray-800 border-2 border-gray-700'
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    {index < statusSteps.length - 1 && (
                      <div
                        className={`w-0.5 h-12 mt-2 transition-all ${
                          index < currentIndex ? 'bg-gradient-to-b from-green-500 to-blue-500' : 'bg-gray-800'
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1 pt-2">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`font-semibold ${isActive ? 'text-white' : 'text-gray-500'}`}>
                        {step.label}
                      </h4>
                      {isCurrent && (
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-lg font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {step.time}
                        </span>
                      )}
                    </div>
                    {isActive && (
                      <p className="text-sm text-gray-400">
                        {step.status === 'processing' && 'Your order is being prepared'}
                        {step.status === 'shipped' && 'Your order is on the way'}
                        {step.status === 'delivered' && 'Your order has been delivered'}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>

        {/* Delivery Info */}
        <GlassCard className="p-4">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-xl">
              <MapPin className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Delivery Address</h3>
              <p className="text-sm text-gray-400">{order.deliveryAddress}</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-800">
            <span className="text-gray-400">Estimated Delivery</span>
            <span className="font-semibold text-green-400">
              {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}
            </span>
          </div>
        </GlassCard>

        {/* Order Summary */}
        <GlassCard className="p-4">
          <h3 className="font-semibold mb-4">Order Summary</h3>
          <div className="space-y-3 mb-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-gray-400">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold">₦{(item.product.price * item.quantity).toLocaleString()}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 pt-3 flex items-center justify-between">
            <span className="font-semibold">Total</span>
            <span className="text-xl font-bold text-green-400">₦{order.total.toLocaleString()}</span>
          </div>
        </GlassCard>

        {/* Vendor Info */}
        <GlassCard className="p-4">
          <h3 className="font-semibold mb-2">Vendor</h3>
          <p className="text-gray-400">{order.items[0]?.product.vendor || 'AutoParts Nigeria'}</p>
          <button className="mt-3 w-full py-2 bg-gray-800 border border-gray-700 rounded-xl text-sm font-medium hover:bg-gray-700 transition-all">
            Contact Vendor
          </button>
        </GlassCard>
      </div>

      <BottomNav />
    </div>
  );
}
