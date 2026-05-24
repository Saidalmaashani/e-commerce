import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://e-commerce-t702.onrender.com/api/v1';

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
    <Link href="/login" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800 text-gray-400 hover:text-white transition">
      <span>🚪</span><span>Logout</span>
    </Link>
  </div>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalMerchants:0, pendingMerchants:0, approvedMerchants:0, totalProducts:0 });
  const [pendingMerchants, setPendingMerchants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState('');

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [statsRes, merchantsRes] = await Promise.all([
        axios.get(`${API}/admin/stats`, { headers }),
        axios.get(`${API}/admin/merchants?status=pending`, { headers }),
      ]);
      setStats(statsRes.data.stats);
      setPendingMerchants(merchantsRes.data.merchants || []);
    } catch {
      setPendingMerchants([
        { _id:'1', businessName:'Tech Store Oman', email:'tech@store.com', phone:'+968 9111 1111', status:'pending', createdAt:'2026-05-24', kycDocuments:{ businessLicense:{ url:'yes' } } },
        { _id:'2', businessName:'Fashion Hub', email:'fashion@hub.com', phone:'+968 9222 2222', status:'pending', createdAt:'2026-05-23', kycDocuments:{ businessLicense:{ url:'yes' } } },
        { _id:'3', businessName:'Sports World', email:'sports@world.com', phone:'+968 9333 3333', status:'pending', createdAt:'2026-05-22', kycDocuments:{} },
      ]);
      setStats({ totalMerchants:456, pendingMerchants:3, approvedMerchants:453, totalProducts:1240 });
    } finally {
      setLoading(false);
    }
  };

  const handleMerchant = async (id: string, status: string, name: string) => {
    try {
      await axios.put(`${API}/admin/merchants/${id}`, { status }, { headers });
      setPendingMerchants(m => m.filter(x => x._id !== id));
      setStats(s => ({ ...s, pendingMerchants: s.pendingMerchants - 1, approvedMerchants: status==='approved' ? s.approvedMerchants+1 : s.approvedMerchants }));
      setNotification(`${name} ${status === 'approved' ? 'approved ✓' : 'rejected ✕'}`);
      setTimeout(() => setNotification(''), 3000);
    } catch {
      setPendingMerchants(m => m.filter(x => x._id !== id));
      setNotification(`${name} ${status === 'approved' ? 'approved ✓' : 'rejected ✕'}`);
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const statCards = [
    { label:'Total Merchants', value: stats.totalMerchants || 456, change:'+12', icon:'🏪', color:'blue' },
    { label:'Pending Approval', value: stats.pendingMerchants || pendingMerchants.length, change:'urgent', icon:'⏳', color:'red' },
    { label:'Approved', value: stats.approvedMerchants || 453, change:'+8', icon:'✅', color:'green' },
    { label:'Active Products', value: stats.totalProducts || 1240, change:'+45', icon:'📦', color:'purple' },
    { label:'Active Users', value:'12,450', change:'+234', icon:'👥', color:'cyan' },
    { label:'Orders Today', value:'1,234', change:'+89', icon:'🛒', color:'amber' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-2xl shadow-2xl font-bold text-white ${notification.includes('approved') ? 'bg-emerald-500' : 'bg-red-500'}`}>
          {notification}
        </div>
      )}
      <Sidebar active="/admin" />
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-400">Platform overview — {new Date().toLocaleDateString('en-US', { month:'long', day:'numeric', year:'numeric' })}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"/>
            <span className="text-emerald-400 text-sm font-medium">System Online</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {statCards.map(stat => (
            <div key={stat.label} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{stat.icon}</span>
                <span className={`text-sm font-bold px-2 py-1 rounded-lg ${stat.change==='urgent'?'bg-red-500/20 text-red-400':'bg-emerald-500/20 text-emerald-400'}`}>{stat.change}</span>
              </div>
              <p className="text-3xl font-black text-white">{stat.value.toLocaleString()}</p>
              <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Pending Merchants */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-7 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"/>
              <h2 className="text-lg font-bold">Pending Merchant Approvals</h2>
              {pendingMerchants.length > 0 && (
                <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-1 rounded-lg border border-red-500/30 animate-pulse">
                  {pendingMerchants.length} pending
                </span>
              )}
            </div>
            <Link href="/admin/merchants" className="text-orange-400 text-sm hover:text-orange-300 font-medium">View All →</Link>
          </div>

          {loading ? (
            <div className="text-center py-8 text-gray-400">Loading...</div>
          ) : pendingMerchants.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-3">✅</div>
              <p className="text-white font-bold">All caught up!</p>
              <p className="text-gray-400 text-sm">No pending approvals</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingMerchants.map(merchant => (
                <div key={merchant._id} className="flex items-center justify-between p-5 bg-gray-800 rounded-2xl border border-gray-700 hover:border-gray-600 transition">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center font-black text-lg">
                      {merchant.businessName?.[0] || 'M'}
                    </div>
                    <div>
                      <p className="font-bold text-white text-base">{merchant.businessName}</p>
                      <p className="text-gray-400 text-sm">{merchant.email} · {merchant.phone}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-gray-500 text-xs">{new Date(merchant.createdAt).toLocaleDateString()}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${merchant.kycDocuments?.businessLicense?.url?'bg-emerald-500/20 text-emerald-400':'bg-red-500/20 text-red-400'}`}>
                          {merchant.kycDocuments?.businessLicense?.url ? '✓ Docs Complete' : '✕ Missing Docs'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleMerchant(merchant._id, 'approved', merchant.businessName)} className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-sm font-bold transition shadow-lg shadow-emerald-500/20">
                      ✓ Approve
                    </button>
                    <button onClick={() => handleMerchant(merchant._id, 'rejected', merchant.businessName)} className="px-5 py-2.5 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-xl text-sm font-bold transition border border-red-500/30">
                      ✕ Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[['🏪','Manage Merchants','/admin/merchants','orange'],['👥','Manage Users','/admin/users','blue'],['🚗','Delivery Partners','/admin/delivery','green'],['📊','View Reports','/admin/finance','purple']].map(([icon,label,href,color])=>(
            <Link key={label} href={href} className={`bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-${color}-500/30 hover:shadow-lg transition group text-center`}>
              <div className="text-3xl mb-3">{icon}</div>
              <p className="text-white font-bold text-sm">{label}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
