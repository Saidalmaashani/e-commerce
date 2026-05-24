import { useState } from 'react';
import Link from 'next/link';

const initialWishlist = [
  { id:1, name:'Wireless Headphones Pro', price:79.99, oldPrice:129.99, rating:4.5, reviews:2341, emoji:'🎧', inStock:true },
  { id:2, name:'Smart Watch Series X', price:299.99, oldPrice:399.99, rating:4.8, reviews:1893, emoji:'⌚', inStock:true },
  { id:3, name:'JBL Bluetooth Speaker', price:49.99, oldPrice:79.99, rating:4.7, reviews:4451, emoji:'🔊', inStock:false },
  { id:4, name:'Mechanical Keyboard RGB', price:89.99, oldPrice:119.99, rating:4.9, reviews:3120, emoji:'⌨️', inStock:true },
  { id:5, name:'Ergonomic Laptop Stand', price:39.99, oldPrice:null, rating:4.4, reviews:987, emoji:'💻', inStock:true },
];

export default function Wishlist() {
  const [wishlist, setWishlist] = useState(initialWishlist);
  const [cartCount, setCartCount] = useState(0);
  const [notification, setNotification] = useState('');

  const remove = (id: number) => setWishlist(w => w.filter(i => i.id !== id));

  const addToCart = (name: string, e: React.MouseEvent) => {
    e.preventDefault();
    setCartCount(c => c + 1);
    setNotification(`${name} added to cart!`);
    setTimeout(() => setNotification(''), 2500);
  };

  const addAllToCart = () => {
    const inStock = wishlist.filter(i => i.inStock);
    setCartCount(c => c + inStock.length);
    setNotification(`${inStock.length} items added to cart!`);
    setTimeout(() => setNotification(''), 2500);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-2">
          <span>✓</span> {notification}
        </div>
      )}

      <nav className="bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/shopper" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center text-sm font-black">S</div>
            <span className="text-xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">ShopHub</span>
          </Link>
          <div className="flex-1"/>
          <Link href="/shopper/cart" className="relative p-2 text-gray-400 hover:text-white transition">
            <span className="text-xl">🛒</span>
            {cartCount > 0 && <span className="absolute -top-0 -right-0 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">{cartCount}</span>}
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-white mb-1">My Wishlist ♡</h1>
            <p className="text-gray-400">{wishlist.length} saved items</p>
          </div>
          {wishlist.length > 0 && (
            <button onClick={addAllToCart} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-2xl font-bold transition shadow-lg shadow-blue-500/25">
              Add All to Cart
            </button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-8xl mb-6">♡</div>
            <h2 className="text-2xl font-black text-white mb-2">Your wishlist is empty</h2>
            <p className="text-gray-400 mb-8">Save items you love to your wishlist</p>
            <Link href="/shopper" className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl font-bold hover:from-blue-500 hover:to-cyan-500 transition inline-block">
              Discover Products →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {wishlist.map(item => (
              <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/5 transition-all group">
                <div className="relative h-40 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">{item.emoji}</span>
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-gray-900/70 flex items-center justify-center">
                      <span className="bg-gray-800 text-gray-400 text-xs font-bold px-3 py-1.5 rounded-xl border border-gray-700">Out of Stock</span>
                    </div>
                  )}
                  <button onClick={() => remove(item.id)} className="absolute top-2 right-2 w-8 h-8 bg-gray-900/80 backdrop-blur rounded-xl flex items-center justify-center text-red-400 hover:bg-red-500/20 transition">
                    ✕
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white text-sm mb-2 line-clamp-2">{item.name}</h3>
                  <div className="flex items-center gap-1 mb-3">
                    <span className="text-amber-400 text-xs">★ {item.rating}</span>
                    <span className="text-gray-500 text-xs">({item.reviews.toLocaleString()})</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-lg font-black text-white">${item.price}</span>
                    {item.oldPrice && (
                      <span className="text-gray-500 text-xs line-through">${item.oldPrice}</span>
                    )}
                  </div>
                  {item.oldPrice && (
                    <p className="text-emerald-400 text-xs font-bold mb-3">
                      Save ${(item.oldPrice - item.price).toFixed(2)} ({Math.round((1-item.price/item.oldPrice)*100)}% off)
                    </p>
                  )}
                  <button
                    onClick={(e) => item.inStock && addToCart(item.name, e)}
                    disabled={!item.inStock}
                    className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all ${item.inStock ? 'bg-blue-600 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25' : 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'}`}
                  >
                    {item.inStock ? 'Add to Cart' : 'Notify Me'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Nav Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-xl border-t border-gray-800 flex justify-around py-3 md:hidden z-40">
        {[['🏠','Home','/shopper'],['🔍','Search','/shopper/search'],['🛒','Cart','/shopper/cart'],['📦','Orders','/shopper/orders'],['👤','Me','/shopper/profile']].map(([icon,label,href]) => (
          <Link key={label} href={href} className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-400 transition">
            <span className="text-xl">{icon}</span>
            <span className="text-xs">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
