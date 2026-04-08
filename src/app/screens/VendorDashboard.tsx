import { useState } from 'react';
import { ArrowLeft, Plus, Package, TrendingUp, DollarSign, Edit2, Trash2, X } from 'lucide-react';
import { useNavigate } from 'react-router';
import { BottomNav } from '../components/BottomNav';
import { GlassCard } from '../components/GlassCard';
import { Product } from '../data/mockData';
import { toast } from 'sonner';

export function VendorDashboard() {
  const navigate = useNavigate();
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [vendorProducts, setVendorProducts] = useState<Product[]>([
    {
      id: 'vp1',
      name: 'Premium Oil Filter',
      price: 3500,
      image: 'https://images.unsplash.com/photo-1764869427688-3e97480f4b82?w=400',
      vendor: 'My Store',
      vendorId: 'v-current',
      rating: 4.7,
      reviews: 45,
      category: 'Engine',
      description: 'High-quality oil filter',
      stock: 120,
    },
    {
      id: 'vp2',
      name: 'Brake Pads Set',
      price: 8500,
      image: 'https://images.unsplash.com/photo-1683811199384-60b7020f9bad?w=400',
      vendor: 'My Store',
      vendorId: 'v-current',
      rating: 4.8,
      reviews: 89,
      category: 'Brake Pads',
      description: 'Ceramic brake pads',
      stock: 65,
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    stock: '',
    category: 'Engine',
    description: '',
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      toast.error('Please fill all required fields');
      return;
    }

    const product: Product = {
      id: 'vp' + Date.now(),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
      vendor: 'My Store',
      vendorId: 'v-current',
      rating: 0,
      reviews: 0,
      category: newProduct.category,
      description: newProduct.description,
      stock: parseInt(newProduct.stock),
    };

    setVendorProducts([...vendorProducts, product]);
    setShowAddProduct(false);
    setNewProduct({ name: '', price: '', stock: '', category: 'Engine', description: '' });
    toast.success('Product added successfully!');
  };

  const handleDeleteProduct = (id: string, name: string) => {
    setVendorProducts(vendorProducts.filter(p => p.id !== id));
    toast.success(`Deleted ${name}`);
  };

  const handleUpdatePrice = (id: string, newPrice: number) => {
    setVendorProducts(vendorProducts.map(p => 
      p.id === id ? { ...p, price: newPrice } : p
    ));
    toast.success('Price updated in real-time!');
  };

  const stats = {
    totalProducts: vendorProducts.length,
    totalRevenue: 245000,
    ordersToday: 12,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white pb-32">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-800/50 rounded-xl transition-all">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-bold">Vendor Dashboard</h1>
            </div>
            <button
              onClick={() => setShowAddProduct(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl font-medium hover:opacity-90 transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 pt-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <GlassCard className="p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 bg-green-500/20 rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-2xl font-bold">{stats.totalProducts}</p>
            <p className="text-xs text-gray-400 mt-1">Products</p>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-2xl font-bold">₦{(stats.totalRevenue / 1000).toFixed(0)}k</p>
            <p className="text-xs text-gray-400 mt-1">Revenue</p>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-2xl font-bold">{stats.ordersToday}</p>
            <p className="text-xs text-gray-400 mt-1">Orders Today</p>
          </GlassCard>
        </div>

        {/* Products List */}
        <div>
          <h2 className="text-lg font-semibold mb-4">My Products</h2>
          {vendorProducts.length === 0 ? (
            <GlassCard className="p-8 text-center">
              <Package className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <h3 className="font-semibold mb-2">No products yet</h3>
              <p className="text-sm text-gray-400 mb-4">Add your first product to start selling</p>
              <button
                onClick={() => setShowAddProduct(true)}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl font-medium hover:opacity-90 transition-all"
              >
                Add Product
              </button>
            </GlassCard>
          ) : (
            <div className="space-y-3">
              {vendorProducts.map((product) => (
                <GlassCard key={product.id} className="p-4">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-xl bg-gray-800 overflow-hidden flex-shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-1 line-clamp-1">{product.name}</h3>
                      <p className="text-sm text-gray-400 mb-2">{product.category}</p>
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-xs text-gray-400">Price</p>
                          <input
                            type="number"
                            value={product.price}
                            onChange={(e) => handleUpdatePrice(product.id, parseFloat(e.target.value))}
                            className="w-24 px-2 py-1 bg-gray-800/50 border border-gray-700 rounded-lg text-sm font-semibold text-green-400 outline-none focus:border-green-500"
                          />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Stock</p>
                          <p className="text-sm font-semibold">{product.stock}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button className="p-2 hover:bg-blue-500/20 rounded-lg transition-all">
                        <Edit2 className="w-4 h-4 text-blue-400" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id, product.name)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-gray-900 rounded-t-3xl sm:rounded-3xl border border-gray-800 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Add New Product</h2>
              <button onClick={() => setShowAddProduct(false)} className="p-2 hover:bg-gray-800 rounded-xl transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Product Name *</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="e.g. Toyota Brake Pads"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl outline-none focus:border-green-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category *</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl outline-none focus:border-green-500 transition-all"
                >
                  <option value="Engine">Engine</option>
                  <option value="Tires">Tires</option>
                  <option value="Batteries">Batteries</option>
                  <option value="Brake Pads">Brake Pads</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Price (₦) *</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="5000"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl outline-none focus:border-green-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Stock *</label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    placeholder="50"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl outline-none focus:border-green-500 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Product description..."
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl outline-none focus:border-green-500 transition-all resize-none"
                  rows={3}
                />
              </div>
              <button
                onClick={handleAddProduct}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl font-semibold hover:opacity-90 transition-all"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
