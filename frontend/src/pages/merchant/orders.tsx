import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

const Sidebar = ({ active }: { active: string }) => (
  <div className="w-64 bg-gray-900 border-r border-gray-800 p-6 flex flex-col min-h-screen">
    <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">🏪 MerchantHub</div>
    <nav className="space-y-2 flex-1">
      {[['📊','Dashboard','/merchant'],['🏷️','Products','/merchant/products'],['📦','Orders','/merchant/orders'],['💬','Messages','/merchant/messages'],['💰','Finance','/merchant/finance'],['⚙️','Settings','/merchant/settings']].map(([icon,label,href])=>(
        <Link key={label} href={href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${active===href?'bg-purple-600 text-white':'hover:bg-gray-800 text-gray-400 hover:text-white'}`}>
          <span>{icon}</span><span>{label}</span>
        </Link>
      ))}
    </nav>
    <Link href="/login" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800 text-gray-400 hover:text-white transition">
      <span>🚪</span><span>Logout</span>
    </Link>
  </div>
);

type Order = {
  id: string;
  customer: string;
  product: string;
  amount: number;
  date: string;
  status: string;
  address: string;
  phone: string;
  items: number;
};

const demoOrders: Order[] = [
  { id:'ORD-101', customer:'Ahmed Al-Said', product:'Wireless Headphones', amount:79.99, date:'2026-05-24', status:'New', address:'123 Main St, Muscat', phone:'+968 9123 4567', items:1 },
  { id:'ORD-102', customer:'Sara Mohammed', product:'Smart Watch', amount:299.99, date:'2026-05-23', status:'Processing', address:'456 Ocean Rd, Salalah', phone:'+968 9234 5678', items:1 },
  { id:'ORD-103', customer:'Khalid Omar', product:'USB-C Cable', amount:12.99, date:'2026-05-23', status:'Shipped', address:'789 Hill Ave, Muscat', phone:'+968 9345 6789', items:2 },
  { id:'ORD-104', customer:'Fatima Hassan', product:'Phone Case', amount:19.99, date:'2026-05-22', status:'Delivered', address:'321 Park Rd, Nizwa', phone:'+968 9456 7890', items:1 },
  { id:'ORD-105', customer:'Mohammed Ali', product:'Bluetooth Speaker', amount:49.99, date:'2026-05-22', status:'Cancelled', address:'654 Coast Blvd, Sohar', phone:'+968 9567 8901', items:1 },
];

const statusColors: Record<string, string> = {
  New: 'bg-blue-500/20 text-blue-400',
  Processing: 'bg-yellow-500/20 text-yellow-400',
  Shipped: 'bg-purple-500/20 text-purple-400',
  Delivered: 'bg-green-500/20 text-green-400',
  Cancelled: 'bg-red-500/20 text-red-400',
};

const nextStatus: Record<string, string> = {
  New: 'Processing',
  Processing: 'Shipped',
  Shipped: 'Delivered',
};

export default function MerchantOrders() {
  const [orders, setOrders] = useState<Order[]>(demoOrders);
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<Order | null>(null);
  const [search, setSearch] = useState('');

  const statuses = ['All','New','Processing','Shipped','Delivered','Cancelled'];

  const filtered = orders.filter(o =>
    (filter === 'All' || o.status === filter) &&
    (o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase()))
  );

  const updateStatus = (id: string, newStatus: string) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status: newStatus } : null);
  };

  const cancelOrder = (id: string) => {
    if (!confirm('Cancel this order?')) return;
    updateStatus(id, 'Cancelled');
  };

  const counts = statuses.reduce((acc, s) => {
    acc[s] = s === 'All' ? orders.length : orders.filter(o => o.status === s).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      <Sidebar active="/merchant/orders" />
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Orders</h1>
            <p className="text-gray-400">{orders.length} orders total</p>
          </div>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search orders..." className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-purple-500 text-white w-64" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {statuses.map(s => (
            <button key={s} onClick={() => setFilter(s)} className={`p-3 rounded-xl text-center transition ${filter === s ? 'bg-purple-600 text-white' : 'bg-gray-900 border border-gray-800 hover:border-purple-500/50'}`}>
              <p className="text-xl font-bold">{counts[s]}</p>
              <p className="text-xs text-gray-400">{s}</p>
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                {['Order ID','Customer','Product','Amount','Date','Status','Actions'].map(h=>(
                  <th key={h} className="text-left px-6 py-4 text-gray-400 text-sm font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(order=>(
                <tr key={order.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition">
                  <td className="px-6 py-4">
                    <button onClick={()=>setSelected(order)} className="font-mono text-blue-400 hover:text-blue-300">{order.id}</button>
                  </td>
                  <td className="px-6 py-4 font-medium text-white">{order.customer}</td>
                  <td className="px-6 py-4 text-gray-300">{order.product}</td>
                  <td className="px-6 py-4 font-bold text-white">${order.amount}</td>
                  <td className="px-6 py-4 text-gray-400">{order.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>{order.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={()=>setSelected(order)} className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition">View</button>
                      {nextStatus[order.status] && (
                        <button onClick={()=>updateStatus(order.id, nextStatus[order.status])} className="px-3 py-1.5 bg-purple-600/20 hover:bg-purple-600 text-purple-400 hover:text-white rounded-lg text-sm transition">
                          → {nextStatus[order.status]}
                        </button>
                      )}
                      {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                        <button onClick={()=>cancelOrder(order.id)} className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-lg text-sm transition">Cancel</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center py-12 text-gray-400">No orders found</div>}
        </div>
      </div>

      {/* Order Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Order {selected.id}</h2>
              <button onClick={()=>setSelected(null)} className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700">✕</button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-800 rounded-xl">
                <span className="text-gray-400">Status</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[selected.status]}`}>{selected.status}</span>
              </div>
              {[['Customer', selected.customer],['Product', selected.product],['Amount', `$${selected.amount}`],['Date', selected.date],['Address', selected.address],['Phone', selected.phone],['Items', String(selected.items)]].map(([label,value])=>(
                <div key={label} className="flex justify-between p-4 bg-gray-800 rounded-xl">
                  <span className="text-gray-400">{label}</span>
                  <span className="text-white font-medium">{value}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              {nextStatus[selected.status] && (
                <button onClick={()=>updateStatus(selected.id, nextStatus[selected.status])} className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-medium transition">
                  Mark as {nextStatus[selected.status]}
                </button>
              )}
              {selected.status !== 'Cancelled' && selected.status !== 'Delivered' && (
                <button onClick={()=>{cancelOrder(selected.id);setSelected(null);}} className="flex-1 py-3 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-xl font-medium transition">Cancel Order</button>
              )}
              <button onClick={()=>setSelected(null)} className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-medium transition">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
