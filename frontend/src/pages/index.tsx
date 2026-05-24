import { useState } from 'react';
import Link from 'next/link';

const products = [
  { id: 1, name: 'Wireless Headphones Pro', price: 79.99, oldPrice: 129.99, rating: 4.5, reviews: 234, emoji: '🎧', badge: 'Sale' },
  { id: 2, name: 'Smart Watch Series X', price: 299.99, oldPrice: null, rating: 4.8, reviews: 189, emoji: '⌚', badge: 'New' },
  { id: 3, name: 'Premium USB-C Cable', price: 12.99, oldPrice: 19.99, rating: 4.3, reviews: 567, emoji: '🔌', badge: null },
  { id: 4, name: 'Phone Case Ultra', price: 19.99, oldPrice: null, rating: 4.6, reviews: 123, emoji: '📱', badge: 'Hot' },
  { id: 5, name: 'Bluetooth Speaker', price: 49.99, oldPrice: 79.99, rating: 4.7, reviews: 445, emoji: '🔊', badge: 'Sale' },
  { id: 6, name: 'Laptop Stand Pro', price: 39.99, oldPrice: null, rating: 4.4, reviews: 98, emoji: '💻', badge: null },
  { id: 7, name: 'Mechanical Keyboard', price: 89.99, oldPrice: 119.99, rating: 4.9, reviews: 312, emoji: '⌨️', badge: 'Top' },
  { id: 8, name: 'Wireless Mouse', price: 29.99, oldPrice: null, rating: 4.5, reviews: 201, emoji: '🖱️', badge: null },
];

const categories = [
  { id: 'all', name: 'All', icon: '🌟' },
  { id: 'electronics', name: 'Electronics', icon: '⚡' },
  { id: 'clothing', name: 'Clothing', icon: '👕' },
  { id: 'home', name: 'Home', icon: '🏠' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'books', name: 'Books', icon: '📚' },
];

export default function ShopperHome() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartCount, setCartCount] = useState(0);
  const [search, setSearch] = useState('');

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setCartCount(c => c + 1);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/shopper" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            🛍️ ShopHub
          </Link>
          <div className="flex-1 max-w-md mx-6">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex items-center gap-4">
            <Link href="/shopper/cart" className="relative p-2">
              <span className="text-xl">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link href="/shopper/orders" className="text-gray-400 hover:text-white">📦</Link>
            <Link href="/shopper/profile" className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-sm font-bold">S</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-900 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-300 text-sm font-medium mb-2">🔥 Limited Time Offer</p>
              <h1 className="text-4xl font-bold text-white mb-3">Flash Sale<br/><span className="text-cyan-400">Up to 50% Off</span></h1>
              <p className="text-gray-300 mb-6">Shop the best deals before they expire</p>
              <div className="flex gap-3">
                <Link href="/shopper/flash-sale" className="px-6 py-3 bg-blue-500 hover:bg-blue-400 rounded-xl font-semibold transition">Shop Now →</Link>
                <Link href="/shopper/categories" className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold transition">Browse All</Link>
              </div>
            </div>
            <div className="hidden md:block text-8xl">🛍️</div>
          </div>
          {/* Timer */}
          <div className="flex gap-4 mt-8">
            {[['02', 'Hours'], ['34', 'Minutes'], ['59', 'Seconds']].map(([val, label]) => (
              <div key={label} className="bg-gray-900/50 rounded-xl px-4 py-3 text-center border border-gray-700">
                <div className="text-2xl font-bold text-blue-400">{val}</div>
                <div className="text-xs text-gray-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Categories */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl whitespace-nowrap text-sm font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span>{cat.icon}</span> {cat.name}
            </button>
          ))}
        </div>

        {/* Section Title */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Featured Products</h2>
          <Link href="/shopper/all" className="text-blue-400 text-sm hover:text-blue-300">View All →</Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(product => (
            <Link key={product.id} href={`/shopper/product/${product.id}`}>
              <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all cursor-pointer group">
                <div className="relative h-40 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">{product.emoji}</span>
                  {product.badge && (
                    <span className={`absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded-lg ${
                      product.badge === 'Sale' ? 'bg-red-500' :
                      product.badge === 'New' ? 'bg-green-500' :
                      product.badge === 'Hot' ? 'bg-orange-500' :
                      'bg-blue-500'
                    } text-white`}>
                      {product.badge}
                    </span>
                  )}
                  <button
                    onClick={addToCart}
                    className="absolute top-2 right-2 w-8 h-8 bg-gray-700 hover:bg-blue-600 rounded-lg flex items-center justify-center text-sm transition"
                  >
                    🤍
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-white text-sm mb-1 truncate">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-yellow-400 text-xs">⭐ {product.rating}</span>
                    <span className="text-gray-500 text-xs">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-blue-400 font-bold">${product.price}</span>
                      {product.oldPrice && (
                        <span className="text-gray-500 text-xs line-through ml-2">${product.oldPrice}</span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={addToCart}
                    className="w-full mt-3 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-medium transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Nav (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 flex justify-around py-3 md:hidden">
        {[['🏠', 'Home', '/shopper'], ['🔍', 'Search', '/shopper/search'], ['🛒', 'Cart', '/shopper/cart'], ['📦', 'Orders', '/shopper/orders'], ['👤', 'Profile', '/shopper/profile']].map(([icon, label, href]) => (
          <Link key={label} href={href} className="flex flex-col items-center gap-1">
            <span className="text-xl">{icon}</span>
            <span className="text-xs text-gray-400">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}