import { useState } from 'react';
import Link from 'next/link';

const initialCart = [
  { id:1, name:'Wireless Headphones Pro', price:79.99, qty:1, emoji:'🎧', color:'Black' },
  { id:2, name:'Smart Watch Series X', price:299.99, qty:2, emoji:'⌚', color:'Silver' },
  { id:3, name:'Phone Case Ultra', price:19.99, qty:1, emoji:'📱', color:'Clear' },
];

export default function Cart() {
  const [cart, setCart] = useState(initialCart);
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  const updateQty = (id: number, delta: number) => setCart(cart.map(i => i.id===id ? {...i, qty:Math.max(1,i.qty+delta)} : i));
  const remove = (id: number) => setCart(cart.filter(i => i.id!==id));

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = couponApplied ? subtotal * 0.2 : 0;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal - discount + shipping;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'WELCOME20') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
      setCouponApplied(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/shopper" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center text-sm font-black">S</div>
            <span className="text-xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">ShopHub</span>
          </Link>
          <div className="flex-1"/>
          <h1 className="text-lg font-bold">Shopping Cart ({cart.length})</h1>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {cart.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-2xl font-black text-white mb-2">Your cart is empty</h2>
            <p className="text-gray-400 mb-8">Add some products to get started</p>
            <Link href="/shopper" className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl font-bold hover:from-blue-500 hover:to-cyan-500 transition">
              Continue Shopping →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => (
                <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center gap-5 hover:border-gray-700 transition group">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl flex items-center justify-center text-5xl flex-shrink-0 group-hover:scale-105 transition-transform">{item.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white mb-1 truncate">{item.name}</h3>
                    <p className="text-gray-500 text-sm mb-3">Color: {item.color}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-gray-800 rounded-xl border border-gray-700">
                        <button onClick={() => updateQty(item.id, -1)} className="w-9 h-9 flex items-center justify-center hover:bg-gray-700 rounded-l-xl transition font-bold text-lg">-</button>
                        <span className="w-8 text-center font-bold">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="w-9 h-9 flex items-center justify-center hover:bg-gray-700 rounded-r-xl transition font-bold text-lg">+</button>
                      </div>
                      <button onClick={() => remove(item.id)} className="text-red-400 hover:text-red-300 text-sm transition flex items-center gap-1">
                        🗑 Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-2xl font-black text-white">${(item.price * item.qty).toFixed(2)}</p>
                    <p className="text-gray-500 text-sm">${item.price} each</p>
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center pt-2">
                <Link href="/shopper" className="text-blue-400 hover:text-blue-300 transition text-sm flex items-center gap-1">
                  ← Continue Shopping
                </Link>
                <button onClick={() => setCart([])} className="text-red-400 hover:text-red-300 transition text-sm">
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-4">
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <h2 className="text-lg font-black mb-6 text-white">Order Summary</h2>

                {/* Coupon */}
                <div className="mb-5">
                  <p className="text-sm text-gray-400 mb-2">Promo Code</p>
                  <div className="flex gap-2">
                    <input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Enter code" className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition" />
                    <button onClick={applyCoupon} className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-bold transition">Apply</button>
                  </div>
                  {couponError && <p className="text-red-400 text-xs mt-1">{couponError}</p>}
                  {couponApplied && <p className="text-emerald-400 text-xs mt-1">✓ 20% discount applied!</p>}
                </div>

                <div className="space-y-3 text-sm border-t border-gray-800 pt-4">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal ({cart.reduce((s,i)=>s+i.qty,0)} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Discount (WELCOME20)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-400">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? <span className="text-emerald-400 font-medium">FREE</span> : `$${shipping}`}</span>
                  </div>
                  {shipping > 0 && <p className="text-xs text-gray-500">Add ${(100 - subtotal).toFixed(2)} more for free shipping</p>}
                  <div className="border-t border-gray-800 pt-3 flex justify-between font-black text-lg text-white">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Link href="/shopper/checkout" className="block w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-2xl font-black text-center mt-5 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 text-lg">
                  Checkout →
                </Link>

                <div className="flex items-center justify-center gap-4 mt-4">
                  {['💳','🔒','✓'].map((icon, i) => (
                    <div key={i} className="flex items-center gap-1 text-gray-500 text-xs">
                      <span>{icon}</span>
                      <span>{['Secure','Encrypted','Protected'][i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-3">
                {[['🚚','Standard Delivery','3-5 business days • FREE over $100'],['⚡','Express Delivery','1-2 business days • $14.99'],['📅','Scheduled Delivery','Choose your date • $9.99']].map(([icon,title,desc]) => (
                  <div key={title} className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-xl border border-gray-700/50">
                    <span className="text-xl">{icon}</span>
                    <div>
                      <p className="font-bold text-white text-sm">{title}</p>
                      <p className="text-gray-500 text-xs">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
