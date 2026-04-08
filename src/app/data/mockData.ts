export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  vendor: string;
  vendorId: string;
  rating: number;
  reviews: number;
  category: string;
  description: string;
  stock: number;
  distance?: string;
  featured?: boolean;
  trending?: boolean;
}

export interface Vendor {
  id: string;
  name: string;
  location: string;
  rating: number;
  distance: string;
  image: string;
  products: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered';
  items: CartItem[];
  total: number;
  deliveryAddress: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Toyota Camry Brake Pads 2010-2015',
    price: 12500,
    originalPrice: 15000,
    image: 'https://images.unsplash.com/photo-1683811199384-60b7020f9bad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBicmFrZSUyMHBhZHN8ZW58MXx8fHwxNzc1NTUzOTAzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    vendor: 'AutoParts Nigeria',
    vendorId: 'v1',
    rating: 4.8,
    reviews: 124,
    category: 'Brake Pads',
    description: 'High-quality ceramic brake pads specifically designed for Toyota Camry models from 2010 to 2015. Provides excellent stopping power and reduced brake dust. Includes installation hardware and anti-squeal shims.',
    stock: 45,
    distance: '2.3 km',
    featured: true,
    trending: true,
  },
  {
    id: '2',
    name: 'Premium Car Engine Oil Filter',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1764869427688-3e97480f4b82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBvaWwlMjBmaWx0ZXJ8ZW58MXx8fHwxNzc1NDc0MzA2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    vendor: 'Quality Parts Ltd',
    vendorId: 'v2',
    rating: 4.6,
    reviews: 89,
    category: 'Engine',
    description: 'Universal premium oil filter compatible with most car models. Advanced filtration technology removes 99% of contaminants. Extends engine life and improves performance.',
    stock: 120,
    distance: '1.8 km',
    featured: true,
  },
  {
    id: '3',
    name: 'Michelin All-Season Tire Set (4pcs)',
    price: 85000,
    originalPrice: 95000,
    image: 'https://images.unsplash.com/photo-1645437042703-5c3249a70550?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjB0aXJlJTIwd2hlZWx8ZW58MXx8fHwxNzc1NDg3NzE5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    vendor: 'Abuja Tires Hub',
    vendorId: 'v3',
    rating: 4.9,
    reviews: 256,
    category: 'Tires',
    description: 'Set of 4 premium Michelin all-season tires. Size: 205/55R16. Excellent grip in all weather conditions. 60,000 km warranty included.',
    stock: 16,
    distance: '4.5 km',
    trending: true,
  },
  {
    id: '4',
    name: 'Bosch S4 Car Battery 12V 60Ah',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1597766325363-f5576d851d6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBiYXR0ZXJ5fGVufDF8fHx8MTc3NTQ2MTk5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    vendor: 'PowerCell Batteries',
    vendorId: 'v4',
    rating: 4.7,
    reviews: 178,
    category: 'Batteries',
    description: 'Reliable Bosch S4 battery with 60Ah capacity. Maintenance-free design. Perfect for sedans and small SUVs. 24-month warranty included.',
    stock: 28,
    distance: '3.2 km',
    featured: true,
    trending: true,
  },
  {
    id: '5',
    name: 'LED Headlight Bulb Set H7',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1549207107-2704df6b92ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBoZWFkbGlnaHRzfGVufDF8fHx8MTc3NTU1MzkwNXww&ixlib=rb-4.1.0&q=80&w=1080',
    vendor: 'BrightLight Auto',
    vendorId: 'v5',
    rating: 4.5,
    reviews: 92,
    category: 'Accessories',
    description: 'Ultra-bright LED headlight bulbs. 6000K white light. 300% brighter than halogen. Easy plug-and-play installation. IP67 waterproof.',
    stock: 67,
    distance: '5.1 km',
  },
  {
    id: '6',
    name: 'Honda Civic Engine Air Filter',
    price: 4200,
    image: 'https://images.unsplash.com/photo-1762139258224-236877b2c571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBlbmdpbmUlMjBwYXJ0c3xlbnwxfHx8fDE3NzU1NDI4NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    vendor: 'AutoParts Nigeria',
    vendorId: 'v1',
    rating: 4.6,
    reviews: 56,
    category: 'Engine',
    description: 'High-flow engine air filter for Honda Civic 2016-2021. Improves fuel efficiency and engine performance. Washable and reusable.',
    stock: 38,
    distance: '2.3 km',
  },
  {
    id: '7',
    name: 'Premium Car Tool Kit 121pcs',
    price: 22000,
    originalPrice: 28000,
    image: 'https://images.unsplash.com/photo-1770656505713-b0fd2f5751e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbW90aXZlJTIwbWVjaGFuaWMlMjB0b29sc3xlbnwxfHx8fDE3NzU1NTM5MDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    vendor: 'Quality Parts Ltd',
    vendorId: 'v2',
    rating: 4.8,
    reviews: 203,
    category: 'Accessories',
    description: 'Complete 121-piece automotive tool kit. Includes sockets, wrenches, screwdrivers, and more. Durable carrying case included. Perfect for DIY repairs.',
    stock: 24,
    distance: '1.8 km',
    trending: true,
  },
  {
    id: '8',
    name: 'Leather Steering Wheel Cover',
    price: 5500,
    image: 'https://images.unsplash.com/photo-1772903789023-370243b27258?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBhY2Nlc3NvcmllcyUyMGludGVyaW9yfGVufDF8fHx8MTc3NTU1MzkwNHww&ixlib=rb-4.1.0&q=80&w=1080',
    vendor: 'BrightLight Auto',
    vendorId: 'v5',
    rating: 4.4,
    reviews: 67,
    category: 'Accessories',
    description: 'Premium genuine leather steering wheel cover. Universal fit for 37-39cm steering wheels. Anti-slip design. Available in multiple colors.',
    stock: 89,
    distance: '5.1 km',
  },
];

export const vendors: Vendor[] = [
  {
    id: 'v1',
    name: 'AutoParts Nigeria',
    location: 'Wuse Zone 4, Abuja',
    rating: 4.8,
    distance: '2.3 km',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
    products: 245,
  },
  {
    id: 'v2',
    name: 'Quality Parts Ltd',
    location: 'Garki Area 11, Abuja',
    rating: 4.7,
    distance: '1.8 km',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
    products: 189,
  },
  {
    id: 'v3',
    name: 'Abuja Tires Hub',
    location: 'Maitama District, Abuja',
    rating: 4.9,
    distance: '4.5 km',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400',
    products: 78,
  },
  {
    id: 'v4',
    name: 'PowerCell Batteries',
    location: 'Asokoro, Abuja',
    rating: 4.7,
    distance: '3.2 km',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
    products: 156,
  },
  {
    id: 'v5',
    name: 'BrightLight Auto',
    location: 'Gwarinpa Estate, Abuja',
    rating: 4.6,
    distance: '5.1 km',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400',
    products: 312,
  },
];

export const categories = [
  { id: 'engine', name: 'Engine', icon: '⚙️' },
  { id: 'tires', name: 'Tires', icon: '🚗' },
  { id: 'batteries', name: 'Batteries', icon: '🔋' },
  { id: 'brakes', name: 'Brake Pads', icon: '🛑' },
  { id: 'accessories', name: 'Accessories', icon: '✨' },
];

// Store cart in localStorage
export const getCart = (): CartItem[] => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart: CartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const addToCart = (product: Product, quantity: number = 1) => {
  const cart = getCart();
  const existingItem = cart.find(item => item.product.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }
  
  saveCart(cart);
  return cart;
};

export const removeFromCart = (productId: string) => {
  const cart = getCart().filter(item => item.product.id !== productId);
  saveCart(cart);
  return cart;
};

export const updateCartQuantity = (productId: string, quantity: number) => {
  const cart = getCart();
  const item = cart.find(item => item.product.id === productId);
  
  if (item) {
    item.quantity = quantity;
    saveCart(cart);
  }
  
  return cart;
};

export const clearCart = () => {
  localStorage.removeItem('cart');
};
