import Link from 'next/link';

const stats = [
  { label: 'Total Revenue', value: '$12,450', change: '+12%', icon: '💰', color: 'blue' },
  { label: 'Total Orders', value: '234', change: '+8%', icon: '📦', color: 'purple' },
  { label: 'Products', value: '48', change: '+3', icon: '🏷️', color: 'green' },
  { label: 'Avg Rating', value: '4.8', change: '+0.2', icon: '⭐', color: 'yellow' },
];

const recentOrders = [
  { id: 'ORD-101', customer: 'Ahmed Al-Said', product: 'Wireless Headphones', amount: 79.99, status: 'New' },
  { id: 'ORD-102', customer: 'Sara Mohammed', product: 'Smart Watch', amount: 299.99, status: 'Processing' },
  { id: 'ORD-103', customer: 'Khalid Omar', product: 'USB-C Cable', amount: 12.99, status: 'Shipped' },
  { id: 'ORD-104', customer: 'Fatima Hassan', product: 'Phone Case', amount: 19.99, status: 'Delivered' },
];

export default function MerchantDashboard() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 border-r border-gray-800 p-6 flex flex-col">
        <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">🏪 MerchantHub</div>
        <nav className="space-y-2 flex-1">
          {[['📊', 'Dashboard', '/merchant'], ['🏷️', 'Products', '/merchant/products'], ['📦', 'Orders', '/merchant/orders'], ['💬', 'Messages', '/merchant/messages'], ['💰', 'Finance', '/merchant/finance'], ['⚙️', 'Settings', '/merchant/settings']].map(([icon, label, href]) => (
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-400">Welcome back, Merchant!</p>
          </div>
          <Link href="/merchant/products/new" className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 rounded-xl font-medium transition">+ Add Product</Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(stat => (
            <div key={stat.label} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{stat.icon}</span>
                <span className="text-green-400 text-sm">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">Recent Orders</h2>
            <Link href="/merchant/orders" className="text-purple-400 text-sm hover:text-purple-300">View All</Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map(order => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-xl hover:bg-gray-750 transition">
                <div>
                  <p className="font-medium text-white">{order.customer}</p>
                  <p className="text-gray-400 text-sm">{order.product} · {order.id}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">${order.amount}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'New' ? 'bg-blue-500/20 text-blue-400' :
                    order.status === 'Processing' ? 'bg-yellow-500/20 text-yellow-400' :
                    order.status === 'Shipped' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
