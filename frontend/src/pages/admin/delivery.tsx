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

const drivers = [
  { id:'1', name:'Saif Al-Rashdi', phone:'+968 9111 2222', vehicle:'Car', status:'online', rating:4.9, deliveries:234, earnings:1240, zone:'Muscat' },
  { id:'2', name:'Hamad Al-Balushi', phone:'+968 9333 4444', vehicle:'Bike', status:'offline', rating:4.7, deliveries:189, earnings:890, zone:'Salalah' },
  { id:'3', name:'Yusuf Al-Harthi', phone:'+968 9555 6666', vehicle:'Van', status:'online', rating:4.8, deliveries:312, earnings:1680, zone:'Muscat' },
  { id:'4', name:'Omar Al-Farsi', phone:'+968 9777 8888', vehicle:'Car', status:'pending', rating:0, deliveries:0, earnings:0, zone:'Sohar' },
];

export default function AdminDelivery() {
  const [driverList, setDriverList] = useState(drivers);
  const [filter, setFilter] = useState('all');
  const [notification, setNotification] = useState('');

  const filtered = driverList.filter(d => filter === 'all' || d.status === filter);

  const approve = (id: string) => {
    setDriverList(d => d.map(x => x.id === id ? { ...x, status: 'offline' } : x));
    setNotification('Driver approved ✓');
    setTimeout(() => setNotification(''), 2500);
  };

  const statusColor: Record<string, string> = {
    online: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    offline: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      {notification && <div className="fixed top-4 right-4 z-50 bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-2xl font-bold">{notification}</div>}
      <Sidebar active="/admin/delivery" />
      <div className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Delivery Partners</h1>
          <p className="text-gray-400">{driverList.length} registered drivers</p>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          {[['🚗','Total Drivers', driverList.length],['🟢','Online Now', driverList.filter(d=>d.status==='online').length],['⏳','Pending', driverList.filter(d=>d.status==='pending').length],['📦','Deliveries Today','28']].map(([icon,label,value])=>(
            <div key={label} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <span className="text-2xl">{icon}</span>
              <p className="text-2xl font-black text-white mt-2">{value}</p>
              <p className="text-gray-400 text-sm">{label}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          {['all','online','offline','pending'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-5 py-2.5 rounded-xl text-sm font-bold capitalize transition ${filter===f?'bg-orange-600 text-white':'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700'}`}>{f}</button>
          ))}
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                {['Driver','Vehicle','Zone','Rating','Deliveries','Earnings','Status','Actions'].map(h => (
                  <th key={h} className="text-left px-6 py-4 text-gray-400 text-sm font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(driver => (
                <tr key={driver.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center font-black">{driver.name[0]}</div>
                      <div>
                        <p className="font-bold text-white">{driver.name}</p>
                        <p className="text-gray-500 text-xs">{driver.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{driver.vehicle}</td>
                  <td className="px-6 py-4 text-gray-300">{driver.zone}</td>
                  <td className="px-6 py-4 text-amber-400 font-bold">{driver.rating > 0 ? `★ ${driver.rating}` : '—'}</td>
                  <td className="px-6 py-4 text-gray-300">{driver.deliveries}</td>
                  <td className="px-6 py-4 text-emerald-400 font-bold">${driver.earnings}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-xl text-xs font-bold border ${statusColor[driver.status]}`}>{driver.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    {driver.status === 'pending' ? (
                      <button onClick={() => approve(driver.id)} className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-sm font-bold transition">✓ Approve</button>
                    ) : (
                      <button className="px-4 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition">View</button>
                    )}
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
