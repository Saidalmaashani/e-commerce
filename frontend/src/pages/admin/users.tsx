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

const users = [
  { id:'1', name:'Ahmed Al-Said', email:'ahmed@example.com', role:'shopper', status:'active', joined:'2026-05-20', orders:12, spent:1240 },
  { id:'2', name:'Sara Mohammed', email:'sara@example.com', role:'shopper', status:'active', joined:'2026-05-18', orders:8, spent:890 },
  { id:'3', name:'Khalid Omar', email:'khalid@example.com', role:'shopper', status:'suspended', joined:'2026-05-15', orders:3, spent:120 },
  { id:'4', name:'Fatima Hassan', email:'fatima@example.com', role:'shopper', status:'active', joined:'2026-05-10', orders:25, spent:3450 },
  { id:'5', name:'Mohammed Ali', email:'mohammed@example.com', role:'shopper', status:'active', joined:'2026-05-05', orders:6, spent:560 },
  { id:'6', name:'GO FAST', email:'gofast@speed.com', role:'shopper', status:'active', joined:'2026-05-24', orders:0, spent:0 },
];

export default function AdminUsers() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [userList, setUserList] = useState(users);
  const [selected, setSelected] = useState<any>(null);
  const [notification, setNotification] = useState('');

  const filtered = userList.filter(u =>
    (filter === 'all' || u.status === filter) &&
    (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
  );

  const toggleStatus = (id: string) => {
    setUserList(u => u.map(x => x.id === id ? { ...x, status: x.status === 'active' ? 'suspended' : 'active' } : x));
    const user = userList.find(x => x.id === id);
    setNotification(`${user?.name} ${user?.status === 'active' ? 'suspended' : 'reactivated'}`);
    setTimeout(() => setNotification(''), 2500);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      {notification && <div className="fixed top-4 right-4 z-50 bg-amber-500 text-white px-6 py-3 rounded-2xl shadow-2xl font-bold">{notification}</div>}
      <Sidebar active="/admin/users" />
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Users</h1>
            <p className="text-gray-400">{userList.length} registered shoppers</p>
          </div>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 w-64" />
        </div>

        <div className="flex gap-2 mb-6">
          {['all','active','suspended'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-5 py-2.5 rounded-xl text-sm font-bold capitalize transition ${filter===f?'bg-orange-600 text-white':'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700'}`}>{f}</button>
          ))}
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                {['User','Email','Joined','Orders','Spent','Status','Actions'].map(h => (
                  <th key={h} className="text-left px-6 py-4 text-gray-400 text-sm font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(user => (
                <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center font-black">{user.name[0]}</div>
                      <span className="font-bold text-white">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">{user.email}</td>
                  <td className="px-6 py-4 text-gray-400 text-sm">{user.joined}</td>
                  <td className="px-6 py-4 text-gray-300">{user.orders}</td>
                  <td className="px-6 py-4 text-emerald-400 font-bold">${user.spent}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-xl text-xs font-bold border ${user.status==='active'?'bg-emerald-500/20 text-emerald-400 border-emerald-500/30':'bg-red-500/20 text-red-400 border-red-500/30'}`}>{user.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => setSelected(user)} className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition">View</button>
                      <button onClick={() => toggleStatus(user.id)} className={`px-3 py-1.5 rounded-lg text-sm transition font-bold ${user.status==='active'?'bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30':'bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30'}`}>
                        {user.status==='active'?'Suspend':'Restore'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-3xl p-8 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black">User Details</h2>
              <button onClick={() => setSelected(null)} className="w-9 h-9 bg-gray-800 rounded-xl flex items-center justify-center">✕</button>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-2xl mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center font-black text-2xl">{selected.name[0]}</div>
              <div>
                <h3 className="text-xl font-black text-white">{selected.name}</h3>
                <p className="text-gray-400">{selected.email}</p>
                <span className={`px-3 py-1 rounded-xl text-xs font-bold mt-1 inline-block ${selected.status==='active'?'bg-emerald-500/20 text-emerald-400':'bg-red-500/20 text-red-400'}`}>{selected.status}</span>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              {[['📅 Joined', selected.joined],['📦 Orders', selected.orders],['💰 Total Spent', `$${selected.spent}`],['👤 Role', selected.role]].map(([label, value]) => (
                <div key={label as string} className="flex justify-between p-3 bg-gray-800 rounded-xl">
                  <span className="text-gray-400 text-sm">{label as string}</span>
                  <span className="text-white font-medium">{value as string}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setSelected(null)} className="w-full py-3 bg-gray-800 hover:bg-gray-700 rounded-2xl font-bold transition">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
