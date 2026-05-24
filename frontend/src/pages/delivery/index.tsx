import { useState } from 'react';
import Link from 'next/link';

const activeOrders = [
  { id: 'DEL-001', customer: 'Ahmed Al-Said', address: '123 Main St, Muscat', distance: '2.3 km', amount: 5.50, status: 'Pickup' },
  { id: 'DEL-002', customer: 'Sara Mohammed', address: '456 Ocean Rd, Salalah', distance: '4.1 km', amount: 7.00, status: 'On the way' },
];

export default function DeliveryDashboard() {
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">🚗 DeliveryHub</div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">{isOnline ? 'Online' : 'Offline'}</span>
          <button onClick={() => setIsOnline(!isOnline)} className={`w-12 h-6 rounded-full transition-all ${isOnline ? 'bg-green-500' : 'bg-gray-700'} relative`}>
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isOnline ? 'left-7' : 'left-1'}`}/>
          </button>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[['💰', '$48.50', "Today's Earnings"], ['📦', '6', 'Deliveries'], ['⭐', '4.9', 'Rating']].map(([icon, val, label]) => (
            <div key={label} className="bg-gray-900 border border-gray-800 rounded-2xl p-4 text-center">
              <span className="text-2xl">{icon}</span>
              <p className="text-xl font-bold text-white mt-1">{val}</p>
              <p className="text-gray-400 text-xs">{label}</p>
            </div>
          ))}
        </div>

        {/* Active Orders */}
        <h2 className="text-lg font-bold mb-4">Active Orders</h2>
        <div className="space-y-4">
          {activeOrders.map(order => (
            <div key={order.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-white">{order.id}</span>
                <span className={`px-3 py-1 rounded-full text-sm ${order.status === 'Pickup' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'}`}>{order.status}</span>
              </div>
              <p className="text-white font-medium">{order.customer}</p>
              <p className="text-gray-400 text-sm mb-3">📍 {order.address}</p>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">🗺️ {order.distance}</span>
                <span className="text-green-400 font-bold">+${order.amount}</span>
              </div>
              <div className="flex gap-3 mt-4">
                <button className="flex-1 py-2.5 bg-green-600 hover:bg-green-500 rounded-xl font-medium transition">Accept</button>
                <button className="flex-1 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-xl font-medium transition text-gray-400">Decline</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
