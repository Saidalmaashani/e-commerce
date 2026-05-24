import { useState } from 'react';
import Link from 'next/link';

const initialCart = [
  { id: 1, name: 'Wireless Headphones Pro', price: 79.99, qty: 1, emoji: '🎧' },
  { id: 2, name: 'Smart Watch Series X', price: 299.99, qty: 2, emoji: '⌚' },
  { id: 3, name: 'Phone Case Ultra', price: 19.99, qty: 1, emoji: '📱' },
];

export default function Cart() {
  const [cart, setCart] = useState(initialCart);
  const [coupon, setCoupon] = useState('');

  const updateQty = (id: number, delta: number) => {
    setCart(cart.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };
  const remove = (id: number) => setCart(cart.filter(i => i.id !== id));
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center gap-4">
        <Link href="/shopper" className="text-blue-400">← Back</Link>
        <h1 className="text-xl font-bold">My Cart ({cart.length})</h1>
      </nav>
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-800 rounded-xl flex items-center justify-center text-4xl">{item.emoji}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1">{item.name}</h3>
                <p className="text-blue-400 font-bold">${item.price}</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 bg-gray-800 rounded-lg hover:bg-gray-700 flex items-center justify-center">-</button>
                <span className="w-8 text-center font-bold">{item.qty}</span>
                <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 bg-gray-800 rounded-lg hover:bg-gray-700 flex items-center justify-center">+</button>
              </div>
              <div className="text-right">
                <p className="font-bold text-white">${(item.price * item.qty).toFixed(2)}</p>
                <button onClick={() => remove(item.id)} className="text-red-400 text-sm hover:text-red-300 mt-1">Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 h-fit space-y-4">
          <h2 className="text-lg font-bold">Order Summary</h2>
          <div className="flex gap-2">
            <input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Coupon code" className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            <button className="px-4 py-2 bg-blue-600 rounded-xl text-sm font-medium hover:bg-blue-500">Apply</button>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-400"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-gray-400"><span>Shipping</span><span>{shipping === 0 ? <span className="text-green-400">Free</span> : `$${shipping}`}</span></div>
            <div className="border-t border-gray-800 pt-2 flex justify-between font-bold text-white text-lg"><span>Total</span><span>${total.toFixed(2)}</span></div>
          </div>
          <Link href="/shopper/checkout" className="block w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-semibold text-center hover:from-blue-500 hover:to-cyan-500 transition">Checkout →</Link>
          <Link href="/shopper" className="block w-full py-3 bg-gray-800 rounded-xl font-semibold text-center hover:bg-gray-700 transition text-sm">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}
