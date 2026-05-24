import { useState } from 'react';
import Link from 'next/link';

const orders = [
  { id:'ORD-2026-001', date:'May 24, 2026', status:'Delivered', total:379.97, items:[{emoji:'🎧',name:'Wireless Headphones Pro'},{emoji:'⌚',name:'Smart Watch Series X'}], tracking:'TRK-789456123', deliveredDate:'May 22, 2026' },
  { id:'ORD-2026-002', date:'May 23, 2026', status:'Shipped', total:89.99, items:[{emoji:'⌨️',name:'Mechanical Keyboard RGB'}], tracking:'TRK-456789012', estimatedDate:'May 26, 2026' },
  { id:'ORD-2026-003', date:'May 24, 2026', status:'Processing', total:49.99, items:[{emoji:'🔊',name:'JBL Bluetooth Speaker'}], tracking:null, estimatedDate:'May 28, 2026' },
  { id:'ORD-2026-004', date:'May 20, 2026', status:'Cancelled', total:19.99, items:[{emoji:'📱',name:'iPhone 15 Case Ultra'}], tracking:null, deliveredDate:null },
];

const statusConfig: Record<string, {color:string, bg:string, icon:string, steps:number}> = {
  Processing: { color:'text-amber-400', bg:'bg-amber-500/20 border-amber-500/30', icon:'⏳', steps:1 },
  Shipped: { color:'text-blue-400', bg:'bg-blue-500/20 border-blue-500/30', icon:'🚚', steps:2 },
  Delivered: { color:'text-emerald-400', bg:'bg-emerald-500/20 border-emerald-500/30', icon:'✓', steps:4 },
  Cancelled: { color:'text-red-400', bg:'bg-red-500/20 border-red-500/30', icon:'✕', steps:0 },
};

export default function Orders() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<any>(null);

  const filters = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  const filtered = filter === 'All' ? orders : orders.filter(o => o.status === filter);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/shopper" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center text-sm font-black">S</div>
            <span className="text-xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">ShopHub</span>
          </Link>
          <div className="flex-1"/>
          <h1 className="text-lg font-bold">My Orders</h1>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition ${filter===f?'bg-blue-600 text-white shadow-lg shadow-blue-500/25':'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white border border-gray-700'}`}>{f}</button>
          ))}
        </div>

        {/* Orders */}
        <div className="space-y-4">
          {filtered.map(order => {
            const config = statusConfig[order.status];
            return (
              <div key={order.id} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition">
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-800">
                  <div>
                    <p className="font-black text-white">{order.id}</p>
                    <p className="text-gray-500 text-sm">{order.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1.5 rounded-xl text-sm font-bold border ${config.bg} ${config.color}`}>
                      {config.icon} {order.status}
                    </span>
                    <span className="font-black text-white text-lg">${order.total}</span>
                  </div>
                </div>

                {/* Items */}
                <div className="p-5">
                  <div className="flex gap-3 mb-4">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 bg-gray-800 rounded-xl px-4 py-3 border border-gray-700">
                        <span className="text-2xl">{item.emoji}</span>
                        <span className="text-sm text-gray-300 font-medium">{item.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  {order.status !== 'Cancelled' && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-2">
                        {['Placed','Confirmed','Shipped','Delivered'].map((step, i) => (
                          <span key={step} className={i < config.steps ? 'text-blue-400 font-medium' : ''}>{step}</span>
                        ))}
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transition-all" style={{width:`${(config.steps/4)*100}%`}}/>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button onClick={() => setSelected(order)} className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-bold transition">
                      Track Order
                    </button>
                    {order.status === 'Delivered' && (
                      <button className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-xl text-sm font-bold transition border border-gray-700">
                        Return / Refund
                      </button>
                    )}
                    <button className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-xl text-sm font-bold transition border border-gray-700">
                      Reorder
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <div className="text-8xl mb-4">📦</div>
              <h3 className="text-xl font-black text-white mb-2">No orders found</h3>
              <p className="text-gray-400 mb-6">You haven't placed any {filter !== 'All' ? filter.toLowerCase() : ''} orders yet</p>
              <Link href="/shopper" className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl font-bold hover:from-blue-500 hover:to-cyan-500 transition inline-block">
                Start Shopping →
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Track Order Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-3xl p-8 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black">Track Order</h2>
              <button onClick={() => setSelected(null)} className="w-9 h-9 bg-gray-800 hover:bg-gray-700 rounded-xl flex items-center justify-center transition">✕</button>
            </div>
            <p className="text-gray-400 text-sm mb-4">{selected.id}</p>
            {selected.tracking && (
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4 mb-6">
                <p className="text-gray-400 text-xs mb-1">Tracking Number</p>
                <p className="text-blue-400 font-mono font-bold">{selected.tracking}</p>
              </div>
            )}
            <div className="space-y-4">
              {['Order Placed','Order Confirmed','Out for Delivery','Delivered'].map((step, i) => {
                const config = statusConfig[selected.status];
                const done = i < config.steps;
                return (
                  <div key={step} className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${done?'bg-blue-600 text-white':'bg-gray-800 text-gray-600 border border-gray-700'}`}>
                      {done ? '✓' : i+1}
                    </div>
                    <div className="flex-1">
                      <p className={`font-bold text-sm ${done?'text-white':'text-gray-500'}`}>{step}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <button onClick={() => setSelected(null)} className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl font-bold mt-6 hover:from-blue-500 hover:to-cyan-500 transition">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
