import Link from 'next/link';

const stats = [
  { label: 'Total GMV', value: '$248,500', change: '+18%', icon: '💰' },
  { label: 'Active Users', value: '12,450', change: '+234', icon: '👥' },
  { label: 'Orders Today', value: '1,234', change: '+89', icon: '📦' },
  { label: 'Merchants', value: '456', change: '+12', icon: '🏪' },
  { label: 'Delivery Partners', value: '89', change: '+5', icon: '🚗' },
  { label: 'Pending Approvals', value: '23', change: 'urgent', icon: '⏳' },
];

const pendingMerchants = [
  { name: 'Tech Store Oman', owner: 'Ali Hassan', date: '2026-05-24', docs: true },
  { name: 'Fashion Hub', owner: 'Maryam Said', date: '2026-05-23', docs: true },
  { name: 'Sports World', owner: 'Khalid Omar', date: '2026-05-22', docs: false },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 border-r border-gray-800 p-6 flex flex-col">
        <div className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-8">👑 AdminHub</div>
        <nav className="space-y-2 flex-1">
          {[['📊', 'Dashboard', '/admin'], ['🏪', 'Merchants', '/admin/merchants'], ['👥', 'Users', '/admin/users'], ['🚗', 'Delivery', '/admin/delivery'], ['📦', 'Orders', '/admin/orders'], ['💰', 'Finance', '/admin/finance'], ['⚙️', 'Settings', '/admin/settings']].map(([icon, label, href]) => (
            <Link key={label} href={href} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800 text-gray-400 hover:text-white transition">
              <span>{icon}</span><span>{label}</span>
            </Link>
          ))}
        </nav>
        <Link href="/login" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800 text-gray-400 hover:text-white transition">
          <span>🚪</span><span>Logout</span>
        </Link>
      </div>

      {/* Main */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-400">Platform overview — May 24, 2026</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {stats.map(stat => (
            <div key={stat.label} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{stat.icon}</span>
                <span className={`text-sm font-medium ${stat.change === 'urgent' ? 'text-red-400' : 'text-green-400'}`}>{stat.change}</span>
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Pending Approvals */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">Pending Merchant Approvals</h2>
            <Link href="/admin/merchants" className="text-orange-400 text-sm hover:text-orange-300">View All</Link>
          </div>
          <div className="space-y-3">
            {pendingMerchants.map(merchant => (
              <div key={merchant.name} className="flex items-center justify-between p-4 bg-gray-800 rounded-xl">
                <div>
                  <p className="font-medium text-white">{merchant.name}</p>
                  <p className="text-gray-400 text-sm">{merchant.owner} · {merchant.date}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${merchant.docs ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {merchant.docs ? 'Docs Complete' : 'Missing Docs'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-xl text-sm font-medium transition">Approve</button>
                  <button className="px-4 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-xl text-sm font-medium transition">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
