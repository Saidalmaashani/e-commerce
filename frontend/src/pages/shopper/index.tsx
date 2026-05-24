import { useState, useEffect } from 'react';
import Link from 'next/link';

const products = [
  { id:1, name:'Wireless Headphones Pro', price:79.99, oldPrice:129.99, rating:4.5, reviews:2341, emoji:'🎧', badge:'50% OFF', category:'electronics' },
  { id:2, name:'Smart Watch Series X', price:299.99, oldPrice:399.99, rating:4.8, reviews:1893, emoji:'⌚', badge:'NEW', category:'electronics' },
  { id:3, name:'Premium USB-C Cable 2m', price:12.99, oldPrice:24.99, rating:4.3, reviews:5672, emoji:'🔌', badge:'BEST SELLER', category:'electronics' },
  { id:4, name:'iPhone 15 Case Ultra', price:19.99, oldPrice:null, rating:4.6, reviews:1234, emoji:'📱', badge:null, category:'accessories' },
  { id:5, name:'JBL Bluetooth Speaker', price:49.99, oldPrice:79.99, rating:4.7, reviews:4451, emoji:'🔊', badge:'37% OFF', category:'electronics' },
  { id:6, name:'Ergonomic Laptop Stand', price:39.99, oldPrice:null, rating:4.4, reviews:987, emoji:'💻', badge:'TOP RATED', category:'accessories' },
  { id:7, name:'Mechanical Keyboard RGB', price:89.99, oldPrice:119.99, rating:4.9, reviews:3120, emoji:'⌨️', badge:'HOT', category:'electronics' },
  { id:8, name:'Wireless Mouse Silent', price:29.99, oldPrice:44.99, rating:4.5, reviews:2018, emoji:'🖱️', badge:null, category:'electronics' },
];

const categories = [
  { id:'all', name:'All', icon:'✦' },
  { id:'electronics', name:'Electronics', icon:'⚡' },
  { id:'accessories', name:'Accessories', icon:'💎' },
  { id:'clothing', name:'Clothing', icon:'👕' },
  { id:'home', name:'Home', icon:'🏠' },
  { id:'sports', name:'Sports', icon:'⚽' },
];

const flashDeals = [
  { id:1, name:'AirPods Pro 2nd Gen', price:189.99, oldPrice:249.99, emoji:'🎵', timeLeft:'02:34:12', discount:24 },
  { id:2, name:'Samsung 4K Monitor', price:299.99, oldPrice:499.99, emoji:'🖥️', timeLeft:'02:34:12', discount:40 },
  { id:3, name:'Gaming Chair Pro', price:199.99, oldPrice:349.99, emoji:'🪑', timeLeft:'02:34:12', discount:43 },
];

export default function ShopperHome() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartCount, setCartCount] = useState(0);
  const [search, setSearch] = useState('');
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState({ h:2, m:34, s:12 });
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t.s > 0) return { ...t, s: t.s - 1 };
        if (t.m > 0) return { ...t, m: t.m - 1, s: 59 };
        if (t.h > 0) return { h: t.h - 1, m: 59, s: 59 };
        return t;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const addToCart = (name: string, e: React.MouseEvent) => {
    e.preventDefault();
    setCartCount(c => c + 1);
    setNotification(`${name} added to cart!`);
    setTimeout(() => setNotification(''), 2500);
  };

  const toggleWishlist = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    setWishlist(w => w.includes(id) ? w.filter(i => i !== id) : [...w, id]);
  };

  const filtered = products.filter(p =>
    (selectedCategory === 'all' || p.category === selectedCategory) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const pad = (n: number) => String(n).padStart(2, '0');

  const badgeColor: Record<string, string> = {
    'BEST SELLER': 'bg-amber-500',
    'NEW': 'bg-emerald-500',
    'HOT': 'bg-red-500',
    'TOP RATED': 'bg-blue-500',
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Toast */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-pulse">
          <span>✓</span> {notification}
        </div>
      )}

      {/* Top Bar */}
      <div className="bg-gray-900 border-b border-gray-800/50 px-4 py-2 text-xs text-gray-400 flex justify-between items-center">
        <span>🚚 Free shipping on orders over $50</span>
        <div className="flex gap-4">
          <Link href="/shopper/orders" className="hover:text-white transition">Track Order</Link>
          <Link href="/shopper/profile" className="hover:text-white transition">My Account</Link>
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-40 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-6">
          {/* Logo */}
          <Link href="/shopper" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center text-sm font-black">S</div>
            <span className="text-xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">ShopHub</span>
          </Link>

          {/* Search */}
          <div className="flex-1 relative">
            <div className="flex items-center bg-gray-800 border border-gray-700 hover:border-blue-500/50 rounded-2xl overflow-hidden transition-all">
              <select className="bg-transparent text-gray-400 text-sm px-3 py-3 border-r border-gray-700 focus:outline-none cursor-pointer">
                <option>All</option>
                <option>Electronics</option>
                <option>Clothing</option>
              </select>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search for products, brands and more..."
                className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none"
              />
              <button className="px-5 py-3 bg-blue-600 hover:bg-blue-500 transition text-sm font-medium">
                🔍
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link href="/shopper/wishlist" className="flex flex-col items-center gap-0.5 text-gray-400 hover:text-white transition p-2">
              <span className="text-xl">♡</span>
              <span className="text-xs">Wishlist</span>
            </Link>
            <Link href="/shopper/cart" className="relative flex flex-col items-center gap-0.5 text-gray-400 hover:text-white transition p-2">
              <span className="text-xl">🛒</span>
              <span className="text-xs">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-0 -right-0 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">{cartCount}</span>
              )}
            </Link>
            <Link href="/shopper/profile" className="flex flex-col items-center gap-0.5 text-gray-400 hover:text-white transition p-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xs font-bold">S</div>
              <span className="text-xs">Account</span>
            </Link>
          </div>
        </div>

        {/* Category Nav */}
        <div className="border-t border-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
            {categories.map(cat => (
              <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-sm whitespace-nowrap transition-all ${selectedCategory === cat.id ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
                <span>{cat.icon}</span><span>{cat.name}</span>
              </button>
            ))}
            <div className="ml-auto flex items-center gap-4 text-sm text-gray-400 flex-shrink-0">
              <button className="hover:text-white transition">Today's Deals</button>
              <button className="hover:text-white transition">New Arrivals</button>
              <button className="hover:text-white transition">Best Sellers</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-gray-900 to-cyan-900/40"/>
        <div className="absolute inset-0" style={{backgroundImage:'radial-gradient(circle at 20% 50%, rgba(59,130,246,0.15) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(6,182,212,0.1) 0%, transparent 60%)'}}/>
        <div className="relative max-w-7xl mx-auto px-4 py-16 flex items-center justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 text-blue-300 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"/>
              Limited Time Offer — Ends Soon
            </div>
            <h1 className="text-5xl font-black text-white mb-4 leading-tight">
              Shop the <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Future</span><br/>of Shopping
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">Discover thousands of products from verified sellers.<br/>Best prices, fast delivery, guaranteed satisfaction.</p>
            <div className="flex gap-3">
              <Link href="/shopper/flash-sale" className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-2xl font-bold text-white transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105">
                Shop Flash Deals →
              </Link>
              <Link href="/shopper/categories" className="px-8 py-3.5 bg-gray-800 hover:bg-gray-700 rounded-2xl font-medium text-gray-300 hover:text-white transition-all border border-gray-700">
                Browse All
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <div className="grid grid-cols-2 gap-3">
              {['🎧','⌚','💻','📱'].map((e,i) => (
                <div key={i} className={`w-24 h-24 rounded-2xl flex items-center justify-center text-4xl shadow-xl border border-gray-700/50 ${i===0?'bg-blue-900/50':i===1?'bg-purple-900/50':i===2?'bg-teal-900/50':'bg-indigo-900/50'}`}>{e}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="relative border-t border-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-4 gap-4">
            {[['50K+','Products'],['10K+','Sellers'],['500K+','Customers'],['4.9★','Rating']].map(([val, label]) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{val}</p>
                <p className="text-gray-400 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Flash Deals */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-orange-500 rounded-full"/>
                <h2 className="text-2xl font-black text-white">⚡ Flash Deals</h2>
              </div>
              <div className="flex items-center gap-1 bg-red-500/20 border border-red-500/30 px-3 py-1.5 rounded-xl">
                <span className="text-red-400 text-sm font-medium">Ends in:</span>
                {[pad(timeLeft.h), pad(timeLeft.m), pad(timeLeft.s)].map((t, i) => (
                  <span key={i} className="flex items-center gap-1">
                    <span className="bg-red-500 text-white text-sm font-black px-2 py-0.5 rounded-lg">{t}</span>
                    {i < 2 && <span className="text-red-400 font-bold">:</span>}
                  </span>
                ))}
              </div>
            </div>
            <Link href="/shopper/flash-sale" className="text-blue-400 hover:text-blue-300 text-sm font-medium transition">View All →</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {flashDeals.map(deal => (
              <div key={deal.id} className="relative bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/50 rounded-2xl p-5 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/5 transition-all group overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full -translate-y-1/2 translate-x-1/2"/>
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-black px-2 py-1 rounded-lg">{deal.discount}% OFF</div>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gray-800 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">{deal.emoji}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-sm mb-1">{deal.name}</h3>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-2xl font-black text-blue-400">${deal.price}</span>
                      <span className="text-gray-500 text-sm line-through">${deal.oldPrice}</span>
                    </div>
                    <button onClick={(e) => addToCart(deal.name, e)} className="w-full py-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 rounded-xl text-sm font-bold transition-all">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"/>
              <h2 className="text-2xl font-black text-white">Featured Products</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm">{filtered.length} products</span>
              <Link href="/shopper/all" className="text-blue-400 hover:text-blue-300 text-sm font-medium transition">View All →</Link>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-xl font-medium">No products found</p>
              <p className="text-sm mt-2">Try a different search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map(product => (
                <Link key={product.id} href={`/shopper/product/${product.id}`}>
                  <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/5 transition-all group cursor-pointer h-full flex flex-col">
                    {/* Image */}
                    <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 h-44 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"/>
                      <span className="text-7xl group-hover:scale-110 transition-transform duration-300">{product.emoji}</span>
                      {product.badge && (
                        <span className={`absolute top-2.5 left-2.5 text-xs font-black px-2.5 py-1 rounded-lg text-white ${badgeColor[product.badge] || 'bg-red-500'}`}>
                          {product.badge}
                        </span>
                      )}
                      <button onClick={(e) => toggleWishlist(product.id, e)} className="absolute top-2.5 right-2.5 w-8 h-8 bg-gray-900/80 backdrop-blur rounded-xl flex items-center justify-center text-sm hover:bg-gray-800 transition">
                        {wishlist.includes(product.id) ? '❤️' : '🤍'}
                      </button>
                    </div>

                    {/* Info */}
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-semibold text-white text-sm mb-2 line-clamp-2 leading-snug">{product.name}</h3>
                      <div className="flex items-center gap-1.5 mb-3">
                        <div className="flex">
                          {[1,2,3,4,5].map(s => (
                            <span key={s} className={`text-xs ${s <= Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-600'}`}>★</span>
                          ))}
                        </div>
                        <span className="text-amber-400 text-xs font-medium">{product.rating}</span>
                        <span className="text-gray-500 text-xs">({product.reviews.toLocaleString()})</span>
                      </div>
                      <div className="mt-auto">
                        <div className="flex items-baseline gap-2 mb-3">
                          <span className="text-xl font-black text-white">${product.price}</span>
                          {product.oldPrice && (
                            <>
                              <span className="text-gray-500 text-xs line-through">${product.oldPrice}</span>
                              <span className="text-emerald-400 text-xs font-bold">{Math.round((1 - product.price/product.oldPrice)*100)}% off</span>
                            </>
                          )}
                        </div>
                        <button onClick={(e) => addToCart(product.name, e)} className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-bold transition-all hover:shadow-lg hover:shadow-blue-500/25">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Banner */}
        <div className="mt-12 bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-900 rounded-3xl p-8 flex items-center justify-between overflow-hidden relative">
          <div className="absolute inset-0" style={{backgroundImage:'radial-gradient(circle at 70% 50%, rgba(6,182,212,0.2) 0%, transparent 50%)'}}/>
          <div className="relative">
            <p className="text-blue-300 font-medium mb-1">Exclusive Member Offer</p>
            <h3 className="text-3xl font-black text-white mb-2">Get 20% OFF<br/>Your First Order</h3>
            <p className="text-gray-300 text-sm mb-4">Use code: <span className="bg-white/20 px-2 py-0.5 rounded font-mono font-bold">WELCOME20</span></p>
            <Link href="/login" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-900 rounded-xl font-bold hover:bg-gray-100 transition">
              Sign Up Now →
            </Link>
          </div>
          <div className="relative hidden md:block text-9xl opacity-20">🛍️</div>
        </div>
      </div>

      {/* Footer Nav Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-xl border-t border-gray-800 flex justify-around py-3 md:hidden z-40">
        {[['🏠','Home','/shopper'],['🔍','Search','/shopper/search'],['🛒','Cart','/shopper/cart'],['📦','Orders','/shopper/orders'],['👤','Me','/shopper/profile']].map(([icon,label,href]) => (
          <Link key={label} href={href} className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-400 transition">
            <span className="text-xl">{icon}</span>
            <span className="text-xs">{label}</span>
          </Link>
        ))}
      </div>

      <div className="h-16 md:h-0"/>
    </div>
  );
}
