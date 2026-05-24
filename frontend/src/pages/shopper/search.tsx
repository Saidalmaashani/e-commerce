import { useState } from 'react';
import Link from 'next/link';

const allProducts = [
  { id:1, name:'Wireless Headphones Pro', price:79.99, oldPrice:129.99, rating:4.5, reviews:2341, emoji:'🎧', category:'Electronics' },
  { id:2, name:'Smart Watch Series X', price:299.99, oldPrice:399.99, rating:4.8, reviews:1893, emoji:'⌚', category:'Electronics' },
  { id:3, name:'Premium USB-C Cable', price:12.99, oldPrice:24.99, rating:4.3, reviews:5672, emoji:'🔌', category:'Electronics' },
  { id:4, name:'iPhone 15 Case Ultra', price:19.99, oldPrice:null, rating:4.6, reviews:1234, emoji:'📱', category:'Accessories' },
  { id:5, name:'JBL Bluetooth Speaker', price:49.99, oldPrice:79.99, rating:4.7, reviews:4451, emoji:'🔊', category:'Electronics' },
  { id:6, name:'Ergonomic Laptop Stand', price:39.99, oldPrice:null, rating:4.4, reviews:987, emoji:'💻', category:'Accessories' },
  { id:7, name:'Mechanical Keyboard RGB', price:89.99, oldPrice:119.99, rating:4.9, reviews:3120, emoji:'⌨️', category:'Electronics' },
  { id:8, name:'Wireless Mouse Silent', price:29.99, oldPrice:44.99, rating:4.5, reviews:2018, emoji:'🖱️', category:'Electronics' },
];

export default function Search() {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [maxPrice, setMaxPrice] = useState(500);
  const [cartCount, setCartCount] = useState(0);
  const [notification, setNotification] = useState('');

  const addToCart = (name: string, e: React.MouseEvent) => {
    e.preventDefault();
    setCartCount(c => c + 1);
    setNotification(`${name} added!`);
    setTimeout(() => setNotification(''), 2000);
  };

  const results = allProducts
    .filter(p => p.name.toLowerCase().includes(query.toLowerCase()) && p.price <= maxPrice)
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-2xl">✓ {notification}</div>
      )}
      <nav className="bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/shopper" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center text-sm font-black">S</div>
            <span className="text-xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">ShopHub</span>
          </Link>
          <div className="flex-1">
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products..." autoFocus className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-5 py-3 text-white focus:outline-none focus:border-blue-500 transition" />
          </div>
          <Link href="/shopper/cart" className="relative p-2 text-gray-400 hover:text-white">
            <span className="text-xl">🛒</span>
            {cartCount > 0 && <span className="absolute -top-0 -right-0 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>}
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* Filters Sidebar */}
        <div className="w-64 flex-shrink-0 space-y-5">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <h3 className="font-black text-white mb-4">Sort By</h3>
            <div className="space-y-2">
              {[['relevance','Relevance'],['price-low','Price: Low to High'],['price-high','Price: High to Low'],['rating','Top Rated']].map(([val, label]) => (
                <button key={val} onClick={() => setSortBy(val)} className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition ${sortBy===val?'bg-blue-600 text-white font-bold':'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>{label}</button>
              ))}
            </div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <h3 className="font-black text-white mb-4">Max Price: <span className="text-blue-400">${maxPrice}</span></h3>
            <input type="range" min="10" max="500" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="w-full accent-blue-500" />
            <div className="flex justify-between text-xs text-gray-500 mt-2"><span>$10</span><span>$500</span></div>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-400">{results.length} results {query && `for "${query}"`}</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map(product => (
              <Link key={product.id} href={`/shopper/product/${product.id}`}>
                <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-blue-500/40 hover:shadow-xl transition group cursor-pointer">
                  <div className="h-40 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">{product.emoji}</div>
                  <div className="p-4">
                    <h3 className="font-bold text-white text-sm mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center gap-1 mb-3">
                      <span className="text-amber-400 text-xs">★ {product.rating}</span>
                      <span className="text-gray-500 text-xs">({product.reviews.toLocaleString()})</span>
                    </div>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-xl font-black text-white">${product.price}</span>
                      {product.oldPrice && <span className="text-gray-500 text-xs line-through">${product.oldPrice}</span>}
                    </div>
                    <button onClick={(e) => addToCart(product.name, e)} className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-bold transition">Add to Cart</button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {results.length === 0 && (
            <div className="text-center py-20">
              <div className="text-7xl mb-4">🔍</div>
              <h3 className="text-xl font-black text-white mb-2">No results found</h3>
              <p className="text-gray-400">Try different keywords or adjust filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
