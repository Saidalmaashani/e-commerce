import Link from 'next/link';

const orders = [
  { id: 'ORD-001', date: '2026-05-20', status: 'Delivered', total: 379.97, items: ['🎧', '⌚'], statusColor: 'green' },
  { id: 'ORD-002', date: '2026-05-22', status: 'Shipped', total: 89.99, items: ['⌨️'], statusColor: 'blue' },
  { id: 'ORD-003', date: '2026-05-23', status: 'Processing', total: 49.99, items: ['🔊'], statusColor: 'yellow' },
  { id: 'ORD-004', date: '2026-05-24', status: 'Cancelled', total: 19.99, items: ['📱'], statusColor: 'red' },
];

export default function Orders() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center gap-4">
        <Link href="/shopper" className="text-blue-400">← Back</Link>
        <h1 className="text-xl font-bold">My Orders</h1>
      </nav>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-blue-500/30 transition">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-white">{order.id}</h3>
                <p className="text-gray-500 text-sm">{order.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.statusColor === 'green' ? 'bg-green-500/20 text-green-400' :
                order.statusColor === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                order.statusColor === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>{order.status}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {order.items.map((emoji, i) => (
                  <div key={i} className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-2xl">{emoji}</div>
                ))}
              </div>
              <div className="text-right">
                <p className="font-bold text-white text-lg">${order.total}</p>
                <button className="text-blue-400 text-sm hover:text-blue-300 mt-1">Track Order →</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
