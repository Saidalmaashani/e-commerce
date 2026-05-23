import React, { useState } from 'react';
import Link from 'next/link';

export default function ShopperHome() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'home', name: 'Home & Kitchen' },
    { id: 'books', name: 'Books' },
    { id: 'sports', name: 'Sports' },
  ];

  const products = [
    { id: 1, name: 'Wireless Headphones', price: 79.99, rating: 4.5, image: '🎧' },
    { id: 2, name: 'Smart Watch', price: 299.99, rating: 4.8, image: '⌚' },
    { id: 3, name: 'USB-C Cable', price: 12.99, rating: 4.3, image: '🔌' },
    { id: 4, name: 'Phone Case', price: 19.99, rating: 4.6, image: '📱' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-2xl font-bold text-indigo-600">
                🛍️ ECommerce
              </Link>
              <div className="hidden md:flex gap-6">
                <Link href="/shopper/home" className="text-gray-700 hover:text-indigo-600">Home</Link>
                <Link href="/shopper/search" className="text-gray-700 hover:text-indigo-600">Browse</Link>
                <Link href="/shopper/orders" className="text-gray-700 hover:text-indigo-600">Orders</Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/shopper/cart" className="relative">
                🛒 Cart <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </Link>
              <Link href="/account" className="text-gray-700 hover:text-indigo-600">👤</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Shop Your Favorites</h1>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 px-4 py-2 rounded-lg text-gray-900 max-w-md"
            />
            <button className="px-6 py-2 bg-indigo-500 hover:bg-indigo-700 rounded-lg font-medium">
              🔍 Search
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2 rounded-full whitespace-nowrap font-medium transition ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Featured Banner */}
        <div className="mb-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-2">🔥 Flash Sale</h2>
          <p className="mb-4">Up to 50% off on selected items - Ends in 2:34:12</p>
          <Link href="/shopper/flash-sale" className="inline-block px-6 py-2 bg-white text-orange-600 rounded-lg font-semibold hover:bg-gray-100">
            View Flash Sale →
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/shopper/product/${product.id}`}>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer">
                <div className="h-48 bg-gray-100 flex items-center justify-center text-6xl">
                  {product.image}
                </div>
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
