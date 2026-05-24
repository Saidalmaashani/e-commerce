import { useState } from 'react';
import Link from 'next/link';

const Sidebar = ({ active }: { active: string }) => (
  <div className="w-64 bg-gray-900 border-r border-gray-800 p-6 flex flex-col min-h-screen">
    <div className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-8">👑 AdminHub</div>
    <nav className="space-y-2 flex-1">
      {[['📊','Dashboard','/admin'],['🏪','Merchants','/admin/merchants'],['👥','Users','/admin/users'],['🚗','Delivery','/admin/delivery'],['📦','Orders','/admin/orders'],['💰','Finance','/admin/finance'],['⚙️','Settings','/admin/settings']].map(([icon,label,href])=>(
        <Link key={label} href={href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${active===href?'bg-orange-600/20 text-orange-400 border border-orange-500/30':'hover:bg-gray-800 text-gray-400 hover:text-white'}`}>
          <span>{icon}</span><span>{label}</span>
        </Link>
      ))}
    </nav>
    <Link href="/login" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800 text-gray-400 hover:text-white transition"><span>🚪</span><span>Logout</span></Link>
  </div>
);

const orders = [
  { id:'ORD-001', customer:'Ahmed Al-Said', merchant:'Tech Store Oman', amount:379.97, status:'Delivered', date:'2026-05-24', items:2 },
  { id:'ORD-002', customer:'Sara Mohammed', merchant:'Fashion Hub', amount:89.99, status:'Shipped', date:'2026-05-24', items:1 },
  { id:'ORD-003', customer:'Khalid Omar', merchant:'Tech Store Oman', amount:49.99, status:'Processing', date:'2026-05-24', items:1 },
  { id:'ORD-004', customer:'Fatima Hassan', merchant:'Sports World', amount:199.99, status:'Pending', date:'2026-05-23', items:3 },
  { id:'ORD-005', customer:'Mohammed Ali', merchant:'Fashion Hub', amount:29.99, status:'Cancelled', date:'2026-05-23', items:1 },
];

const statusColors: Record<string, string> = {
  Delivered: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  Shipped: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Processing: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  Pending: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  Cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export default function AdminOrders() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const filters = ['All','Pending','Processing','Shipped','Delivered','Cancelled'];
  const filtered = orders.filter(o => (filter==='All'||o.status===filter) && (o.customer.toLowerCase().includes(search.toLowerCase())||o.id.toLowerCase().includes(search.toLowerCase())));

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      <Sidebar active="/admin/orders" />
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">All Orders</h1>
            <p className="text-gray-400">{orders.length} orders on platform</p>
          </div>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search orders..." className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 w-64" />
        </div>
        <div className="grid grid-cols-5 gap-4 mb-8">
          {[['💰','$748.93','Total Revenue'],['📦','5','Total Orders'],['✅','1','Delivered'],['🚚','1','Shipped'],['❌','1','Cancelled']].map(([icon,val,label])=>(
            <div key={label} className="bg-gray-900 border border-gray-800 rounded-2xl p-4 text-center">
              <span className="text-2xl">{icon}</span>
              <p className="text-xl font-black text-white mt-1">{val}</p>
              <p className="text-gray-400 text-xs">{label}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {filters.map(f => (
            <button key={f} onClick={()=>setFilter(f)} className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition ${filter===f?'bg-orange-600 text-white':'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700'}`}>{f}</button>
          ))}
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                {['Order ID','Customer','Merchant','Items','Amount','Date','Status','Action'].map(h=>(
                  <th key={h} className="text-left px-6 py-4 text-gray-400 text-sm font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(order=>(
                <tr key={order.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition">
                  <td className="px-6 py-4 font-mono text-blue-400 font-bold">{order.id}</td>
                  <td className="px-6 py-4 font-medium text-white">{order.customer}</td>
                  <td className="px-6 py-4 text-gray-400">{order.merchant}</td>
                  <td className="px-6 py-4 text-gray-300">{order.items}</td>
                  <td className="px-6 py-4 font-black text-white">${order.amount}</td>
                  <td className="px-6 py-4 text-gray-400 text-sm">{order.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-xl text-xs font-bold border ${statusColors[order.status]}`}>{order.status}</span>
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
