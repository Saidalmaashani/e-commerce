import { useState } from 'react';
import Link from 'next/link';

const orders = [
  { id:'ORD-101', customer:'Ahmed Al-Said', product:'Wireless Headphones', amount:79.99, date:'2026-05-24', status:'New' },
  { id:'ORD-102', customer:'Sara Mohammed', product:'Smart Watch', amount:299.99, date:'2026-05-23', status:'Processing' },
  { id:'ORD-103', customer:'Khalid Omar', product:'USB-C Cable', amount:12.99, date:'2026-05-23', status:'Shipped' },
  { id:'ORD-104', customer:'Fatima Hassan', product:'Phone Case', amount:19.99, date:'2026-05-22', status:'Delivered' },
  { id:'ORD-105', customer:'Mohammed Ali', product:'Bluetooth Speaker', amount:49.99, date:'2026-05-22', status:'Cancelled' },
];

const Sidebar = () => (
  <div className="w-64 bg-gray-900 border-r border-gray-800 p-6 flex flex-col min-h-screen">
    <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">🏪 MerchantHub</div>
    <nav className="space-y-2 flex-1">
      {[['📊','Dashboard','/merchant'],['🏷️','Products','/merchant/products'],['📦','Orders','/merchant/orders'],['💬','Messages','/merchant/messages'],['💰','Finance','/merchant/finance'],['⚙️','Settings','/merchant/settings']].map(([icon,label,href])=>(
        <Link key={label} href={href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${href==='/merchant/orders'?'bg-purple-600 text-white':'hover:bg-gray-800 text-gray-400 hover:text-white'}`}>
          <span>{icon}</span><span>{label}</span>
        </Link>
      ))}
    </nav>
  </div>
);

export default function MerchantOrders() {
  const [filter, setFilter] = useState('All');
  const statuses = ['All','New','Processing','Shipped','Delivered','Cancelled'];
  const filtered = filter==='All'?orders:orders.filter(o=>o.status===filter);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-gray-400">{orders.length} orders total</p>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {statuses.map(s=>(
            <button key={s} onClick={()=>setFilter(s)} className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition ${filter===s?'bg-purple-600 text-white':'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>{s}</button>
          ))}
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                {['Order ID','Customer','Product','Amount','Date','Status','Action'].map(h=>(
                  <th key={h} className="text-left px-6 py-4 text-gray-400 text-sm font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(order=>(
                <tr key={order.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition">
                  <td className="px-6 py-4 font-mono text-blue-400">{order.id}</td>
                  <td className="px-6 py-4 font-medium text-white">{order.customer}</td>
                  <td className="px-6 py-4 text-gray-300">{order.product}</td>
                  <td className="px-6 py-4 font-bold text-white">${order.amount}</td>
                  <td className="px-6 py-4 text-gray-400">{order.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status==='New'?'bg-blue-500/20 text-blue-400':
                      order.status==='Processing'?'bg-yellow-500/20 text-yellow-400':
                      order.status==='Shipped'?'bg-purple-500/20 text-purple-400':
                      order.status==='Delivered'?'bg-green-500/20 text-green-400':
                      'bg-red-500/20 text-red-400'
                    }`}>{order.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
