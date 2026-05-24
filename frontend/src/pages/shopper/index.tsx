import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://e-commerce-t702.onrender.com/api/v1';

const demoProducts = [
  { _id:'1', name:'Wireless Headphones Pro', basePrice:79.99, salePrice:129.99, rating:4.5, totalReviews:2341, category:'Electronics', tags:['Sale'], baseStock:45, totalSold:1250, description:'Premium wireless headphones with ANC' },
  { _id:'2', name:'Smart Watch Series X', basePrice:299.99, salePrice:399.99, rating:4.8, totalReviews:1893, category:'Electronics', tags:['New'], baseStock:12, totalSold:890, description:'Next-gen smartwatch with GPS' },
  { _id:'3', name:'Premium USB-C Cable', basePrice:12.99, salePrice:24.99, rating:4.3, totalReviews:5672, category:'Electronics', tags:['Best Seller'], baseStock:200, totalSold:5450, description:'100W fast charging cable' },
  { _id:'4', name:'iPhone 15 Case Ultra', basePrice:19.99, salePrice:null, rating:4.6, totalReviews:1234, category:'Accessories', tags:[], baseStock:78, totalSold:1180, description:'Military-grade protection case' },
  { _id:'5', name:'JBL Bluetooth Speaker', basePrice:49.99, salePrice:79.99, rating:4.7, totalReviews:4451, category:'Electronics', tags:['Hot'], baseStock:5, totalSold:4420, description:'20W waterproof speaker' },
  { _id:'6', name:'Ergonomic Laptop Stand', basePrice:39.99, salePrice:null, rating:4.4, totalReviews:987, category:'Accessories', tags:[], baseStock:33, totalSold:940, description:'Adjustable aluminum stand' },
  { _id:'7', name:'Mechanical Keyboard RGB', basePrice:89.99, salePrice:119.99, rating:4.9, totalReviews:3120, category:'Electronics', tags:['Hot'], baseStock:0, totalSold:3100, description:'Cherry MX switches with RGB' },
  { _id:'8', name:'Wireless Mouse Silent', basePrice:29.99, salePrice:44.99, rating:4.5, totalReviews:2018, category:'Electronics', tags:[], baseStock:67, totalSold:1980, description:'90% quieter click mechanism' },
];

const emojiMap: Record<string, string> = {
  'Electronics': '⚡', 'Accessories': '💎', 'Clothing': '👕',
  'Home': '🏠', 'Sports': '⚽', 'Books': '📚', 'General': '📦',
};

const productEmojis: Record<string, string> = {
  'headphone': '🎧', 'watch': '⌚', 'cable': '🔌', 'case': '📱',
  'speaker': '🔊', 'laptop': '💻', 'keyboard': '⌨️', 'mouse': '🖱️',
  'phone': '📱', 'camera': '📷', 'tablet': '📱', 'charger': '🔋',
};

const getEmoji = (name: string) => {
  const lower = name.toLowerCase();
  for (const [key, emoji] of Object.entries(productEmojis)) {
    if (lower.includes(key)) return emoji;
  }
  return '📦';
};

const categories = [
  { id:'all', name:'All', icon:'✦' },
  { id:'Electronics', name:'Electronics', icon:'⚡' },
  { id:'Accessories', name:'Accessories', icon:'💎' },
  { id:'Clothing', name:'Clothing', icon:'👕' },
  { id:'Home', name:'Home', icon:'🏠' },
  { id:'Sports', name:'Sports', icon:'⚽' },
];

export default function ShopperHome() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartCount, setCartCount] = useState(0);
  const [search, setSearch] = useState('');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [notification, setNotification] = useState('');
  const [timeLeft, setTimeLeft] = useState({ h:2, m:34, s:12 });

  useEffect(() => {
    fetchProducts();
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

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/shopper/products`);
      if (res.data.products && res.data.products.length > 0) {
        setProducts(res.data.products);
      } else {
        setProducts(demoProducts);
      }
    } catch {
      setProducts(demoProducts);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (name: string, e: React.MouseEvent) => {
    e.preventDefault();
    setCartCount(c => c + 1);
    setNotification(`${name} added to cart!`);
    setTimeout(() => setNotification(''), 2500);
  };

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setWishlist(w => w.includes(id) ? w.filter(i => i !== id) : [...w, id]);
  };

  const filtered = products.filter(p =>
    (selectedCategory === 'all' || p.category === selectedCategory) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const pad = (n: number) => String(n).padStart(2, '0');

  const getBadgeColor = (tag: string) => {
    const colors: Record<string, string> = {
      'Sale': 'bg-red-500', 'New': 'bg-emerald-500', 'Hot': 'bg-orange-500',
      'Best Seller': 'bg-amber-500', 'Top': 'bg-blue-500',
    };
    return colors[tag] || 'bg-purple-500';
  };

  const getDiscount = (p: any) => p.salePrice ? Math.round((1 - p.basePrice / p.salePrice) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-2">
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
          <Link href="/shopper" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center text-sm font-black">S</div>
            <span className="text-xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">ShopHub</span>
          </Link>
          <div className="flex-1 relative">
            <div className="flex items-center bg-gray-800 border border-gray-700 hover:border-blue-500/50 rounded-2xl overflow-hidden transition-all">
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search for products, brands and more..." className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none" />
              <button className="px-5 py-3 bg-blue-600 hover:bg-blue-500 transition text-sm font-medium">🔍</button>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link href="/shopper/wishlist" className="flex flex-col items-center gap-0.5 text-gray-400 hover:text-white transition p-2">
              <span className="text-xl">♡</span>
              <span className="text-xs">Wishlist</span>
            </Link>
            <Link href="/shopper/cart" className="relative flex flex-col items-center gap-0.5 text-gray-400 hover:text-white transition p-2">
              <span className="text-xl">🛒</span>
              <span className="text-xs">Cart</span>
              {cartCount > 0 && <span className="absolute -top-0 -right-0 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">{cartCount}</span>}
            </Link>
            <Link href="/shopper/profile" className="flex flex-col items-center gap-0.5 text-gray-400 hover:text-white transition p-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xs font-bold">S</div>
              <span className="text-xs">Account</span>
            </Link>
          </div>
        </div>
        <div className="border-t border-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 overflow-x-auto py-2">
            {categories.map(cat => (
              <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-sm whitespace-nowrap transition-all ${selectedCategory===cat.id?'bg-blue-600 text-white':'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
                <span>{cat.icon}</span><span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-gray-900 to-cyan-900/40"/>
        <div className="absolute inset-0" style={{backgroundImage:'radial-gradient(circle at 20% 50%, rgba(59,130,246,0.15) 0%, transparent 60%)'}}/>
        <div className="relative max-w-7xl mx-auto px-4 py-16 flex items-center justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 text-blue-300 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"/>
              Limited Time Offer — Ends Soon
            </div>
            <h1 className="text-5xl font-black text-white mb-4 leading-tight">
              Shop the <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Future</span><br/>of Shopping
            </h1>
            <p className="text-gray-300 text-lg mb-8">Discover thousands of products from verified sellers.</p>
            <div className="flex gap-3">
              <Link href="/shopper/search" className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-2xl font-bold text-white transition-all shadow-lg shadow-blue-500/25 hover:scale-105">
                Shop Now →
              </Link>
              <Link href="/shopper/search" className="px-8 py-3.5 bg-gray-800 hover:bg-gray-700 rounded-2xl font-medium text-gray-300 hover:text-white transition-all border border-gray-700">
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
        {/* Flash Timer */}
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.filter(p => p.salePrice).slice(0, 3).map((deal: any) => (
              <Link key={deal._id} href={`/shopper/product/${deal._id}`}>
                <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/50 rounded-2xl p-5 hover:border-red-500/30 hover:shadow-lg transition-all group overflow-hidden cursor-pointer">
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-black px-2 py-1 rounded-lg">{getDiscount(deal)}% OFF</div>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-800 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">{getEmoji(deal.name)}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-sm mb-1 line-clamp-2">{deal.name}</h3>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-xl font-black text-blue-400">${deal.basePrice}</span>
                        <span className="text-gray-500 text-sm line-through">${deal.salePrice}</span>
                      </div>
                      <button onClick={(e) => addToCart(deal.name, e)} className="w-full py-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 rounded-xl text-sm font-bold transition-all">Add to Cart</button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"/>
              <h2 className="text-2xl font-black text-white">
                {loading ? 'Loading...' : `${filtered.length} Products`}
              </h2>
            </div>
            <Link href="/shopper/search" className="text-blue-400 hover:text-blue-300 text-sm font-medium transition">View All →</Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1,2,3,4,5,6,7,8].map(i => (
                <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-44 bg-gray-800"/>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-800 rounded"/>
                    <div className="h-3 bg-gray-800 rounded w-2/3"/>
                    <div className="h-6 bg-gray-800 rounded w-1/2"/>
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-xl font-medium">No products found</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map(product => (
                <Link key={product._id} href={`/shopper/product/${product._id}`}>
                  <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/5 transition-all group cursor-pointer h-full flex flex-col">
                    <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 h-44 flex items-center justify-center overflow-hidden">
                      <span className="text-7xl group-hover:scale-110 transition-transform duration-300">{getEmoji(product.name)}</span>
                      {product.tags?.[0] && (
                        <span className={`absolute top-2.5 left-2.5 text-xs font-black px-2.5 py-1 rounded-lg text-white ${getBadgeColor(product.tags[0])}`}>{product.tags[0]}</span>
                      )}
                      {product.baseStock === 0 && (
                        <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center">
                          <span className="bg-gray-800 text-gray-400 text-xs font-bold px-3 py-1.5 rounded-xl border border-gray-700">Out of Stock</span>
                        </div>
                      )}
                      <button onClick={(e) => toggleWishlist(product._id, e)} className="absolute top-2.5 right-2.5 w-8 h-8 bg-gray-900/80 backdrop-blur rounded-xl flex items-center justify-center text-sm hover:bg-gray-800 transition">
                        {wishlist.includes(product._id) ? '❤️' : '🤍'}
                      </button>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-semibold text-white text-sm mb-2 line-clamp-2 leading-snug">{product.name}</h3>
                      <div className="flex items-center gap-1.5 mb-3">
                        <div className="flex">
                          {[1,2,3,4,5].map(s => <span key={s} className={`text-xs ${s <= Math.floor(product.rating||0) ? 'text-amber-400' : 'text-gray-600'}`}>★</span>)}
                        </div>
                        <span className="text-amber-400 text-xs font-medium">{product.rating||'New'}</span>
                        <span className="text-gray-500 text-xs">({(product.totalReviews||0).toLocaleString()})</span>
                      </div>
                      <div className="mt-auto">
                        <div className="flex items-baseline gap-2 mb-3">
                          <span className="text-xl font-black text-white">${product.basePrice}</span>
                          {product.salePrice && (
                            <>
                              <span className="text-gray-500 text-xs line-through">${product.salePrice}</span>
                              <span className="text-emerald-400 text-xs font-bold">{getDiscount(product)}% off</span>
                            </>
                          )}
                        </div>
                        <button onClick={(e) => addToCart(product.name, e)} disabled={product.baseStock === 0} className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all ${product.baseStock===0?'bg-gray-800 text-gray-500 cursor-not-allowed':'bg-blue-600 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25'}`}>
                          {product.baseStock === 0 ? 'Out of Stock' : 'Add to Cart'}
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
            <Link href="/login" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-900 rounded-xl font-bold hover:bg-gray-100 transition">Sign Up Now →</Link>
          </div>
          <div className="relative hidden md:block text-9xl opacity-20">🛍️</div>
        </div>
      </div>

      {/* Mobile Nav */}
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
