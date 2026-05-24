import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiChevronRight, FiStar, FiHeart } from 'react-icons/fi';
import ShopperNav from '@/components/ShopperNav';
import CartSidebar from '@/components/CartSidebar';
import { useCartStore } from '@/store/cartStore';

const categories = [
  { id: 'all', name: 'All', icon: '🎯' },
  { id: 'electronics', name: 'Electronics', icon: '📱' },
  { id: 'clothing', name: 'Clothing', icon: '👕' },
  { id: 'home', name: 'Home', icon: '🏠' },
  { id: 'books', name: 'Books', icon: '📚' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'beauty', name: 'Beauty', icon: '💄' },
  { id: 'toys', name: 'Toys', icon: '🎮' },
];

const products = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    category: 'electronics',
    price: 129.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviews: 2543,
    image: '🎧',
    badge: 'Popular',
    inStock: true,
  },
  {
    id: 2,
    name: 'Smart Watch Pro',
    category: 'electronics',
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.6,
    reviews: 1832,
    image: '⌚',
    badge: 'Trending',
    inStock: true,
  },
  {
    id: 3,
    name: 'USB-C Fast Charger',
    category: 'electronics',
    price: 24.99,
    originalPrice: 39.99,
    rating: 4.7,
    reviews: 5123,
    image: '🔌',
    badge: null,
    inStock: true,
  },
  {
    id: 4,
    name: 'Designer Phone Case',
    category: 'clothing',
    price: 34.99,
    originalPrice: 49.99,
    rating: 4.5,
    reviews: 892,
    image: '📱',
    badge: null,
    inStock: true,
  },
  {
    id: 5,
    name: 'Minimalist Backpack',
    category: 'clothing',
    price: 79.99,
    originalPrice: 129.99,
    rating: 4.9,
    reviews: 3241,
    image: '🎒',
    badge: 'Hot Deal',
    inStock: true,
  },
  {
    id: 6,
    name: 'Wireless Charging Pad',
    category: 'electronics',
    price: 39.99,
    originalPrice: 59.99,
    rating: 4.4,
    reviews: 1205,
    image: '🔋',
    badge: null,
    inStock: true,
  },
  {
    id: 7,
    name: 'Premium Coffee Maker',
    category: 'home',
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.7,
    reviews: 2156,
    image: '☕',
    badge: 'New',
    inStock: true,
  },
  {
    id: 8,
    name: 'Gaming Controller',
    category: 'toys',
    price: 69.99,
    originalPrice: 99.99,
    rating: 4.8,
    reviews: 4521,
    image: '🎮',
    badge: 'Popular',
    inStock: true,
  },
  {
    id: 9,
    name: 'Bestseller Book',
    category: 'books',
    price: 18.99,
    originalPrice: 24.99,
    rating: 4.9,
    reviews: 8234,
    image: '📖',
    badge: null,
    inStock: true,
  },
  {
    id: 10,
    name: 'Yoga Mat Premium',
    category: 'sports',
    price: 44.99,
    originalPrice: 64.99,
    rating: 4.6,
    reviews: 1543,
    image: '🧘',
    badge: null,
    inStock: true,
  },
  {
    id: 11,
    name: 'Skincare Set',
    category: 'beauty',
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.7,
    reviews: 3892,
    image: '✨',
    badge: 'Best Seller',
    inStock: true,
  },
  {
    id: 12,
    name: 'Running Shoes',
    category: 'sports',
    price: 119.99,
    originalPrice: 169.99,
    rating: 4.8,
    reviews: 5234,
    image: '👟',
    badge: 'Trending',
    inStock: true,
  },
];

export default function ShopperHome() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartOpen, setCartOpen] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const addItem = useCartStore((state) => state.addItem);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const toggleFavorite = (id: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const discount = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <ShopperNav />

      {/* Cart Sidebar */}
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
      >
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute w-96 h-96 bg-white rounded-full -top-48 -right-48"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute w-96 h-96 bg-white rounded-full -bottom-48 -left-48"
          />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                Discover Amazing Deals
              </h1>
              <p className="text-lg text-blue-100 mb-6">
                Shop the latest products with exclusive discounts and premium quality. Fast delivery, hassle-free returns.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-purple-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-all duration-200 flex items-center gap-2"
              >
                Shop Now <FiChevronRight />
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-6xl sm:text-7xl"
            >
              🛍️
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Categories</h2>
          <div className="flex overflow-x-auto pb-4 gap-3 sm:gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 border border-slate-600/50'
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                <span className="hidden sm:inline">{category.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-between items-center mb-8"
        >
          <h2 className="text-2xl font-bold text-white">
            {selectedCategory === 'all' ? 'Trending Products' : `${categories.find((c) => c.id === selectedCategory)?.name}`}
          </h2>
          <span className="text-slate-400 text-sm">{filteredProducts.length} products</span>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <div className="relative bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600/50 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm h-full flex flex-col"
              >
                {/* Image Container */}
                <div className="relative bg-gradient-to-br from-blue-500/10 to-purple-600/10 aspect-square flex items-center justify-center text-6xl overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: 'spring', damping: 10, stiffness: 100 }}
                  >
                    {product.image}
                  </motion.div>

                  {/* Badges */}
                  {product.badge && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full"
                    >
                      {product.badge}
                    </motion.div>
                  )}

                  {discount(product.originalPrice, product.price) > 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-lg"
                    >
                      -{discount(product.originalPrice, product.price)}%
                    </motion.div>
                  )}

                  {/* Favorite Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                    className="absolute bottom-3 right-3 w-10 h-10 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200"
                  >
                    <FiHeart
                      size={18}
                      className={favorites.has(product.id) ? 'fill-red-500 text-red-500' : 'text-white'}
                    />
                  </motion.button>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col">
                  {/* Name */}
                  <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors duration-200 line-clamp-2 mb-2 text-sm sm:text-base">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          size={14}
                          className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-slate-400">
                      ({product.reviews.toLocaleString()})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-lg sm:text-xl font-bold text-white">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-xs sm:text-sm text-slate-500 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 rounded-lg transition-all duration-200 mt-auto"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white font-bold rounded-lg border border-slate-500/50 transition-all duration-200"
          >
            Load More Products
          </motion.button>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="border-t border-slate-700/50 mt-16 py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800/50 to-slate-900"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: 'About', items: ['About Us', 'Careers', 'Blog'] },
            { title: 'Help', items: ['Contact Us', 'FAQ', 'Support'] },
            { title: 'Legal', items: ['Privacy', 'Terms', 'Cookies'] },
            { title: 'Follow', items: ['Twitter', 'Facebook', 'Instagram'] },
          ].map((section) => (
            <div key={section.title}>
              <h4 className="font-bold text-white mb-3">{section.title}</h4>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-700/50 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">© 2026 ShopHub. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <span className="text-2xl">🔒</span>
            <span className="text-2xl">✓</span>
            <span className="text-2xl">🚀</span>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-indigo-600">${product.price}</span>
                    <span className="text-sm text-gray-600">⭐ {product.rating}</span>
                  </div>
                  <button className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
