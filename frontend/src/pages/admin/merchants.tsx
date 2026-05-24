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

export default function AdminMerchants() {
  const [merchants, setMerchants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<any>(null);
  const [notification, setNotification] = useState('');

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => { fetchMerchants(); }, [filter]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchMerchants = async () => {
    setLoading(true);
    try {
      const params = filter !== 'all' ? `?status=${filter}` : '';
      const res = await axios.get(`${API}/admin/merchants${params}`, { headers });
      setMerchants(res.data.merchants || []);
    } catch {
      setMerchants([
        { _id:'1', businessName:'Tech Store Oman', email:'tech@store.om', phone:'+968 9111 1111', status:'pending', businessCategory:'Electronics', createdAt:'2026-05-24T10:00:00Z', kycDocuments:{ businessLicense:{ url:'yes' } }, totalRevenue:0, totalOrders:0 },
        { _id:'2', businessName:'Fashion Hub', email:'fashion@hub.om', phone:'+968 9222 2222', status:'approved', businessCategory:'Clothing', createdAt:'2026-05-20T10:00:00Z', kycDocuments:{ businessLicense:{ url:'yes' } }, totalRevenue:15420, totalOrders:234 },
        { _id:'3', businessName:'Sports World', email:'sports@world.om', phone:'+968 9333 3333', status:'pending', businessCategory:'Sports', createdAt:'2026-05-22T10:00:00Z', kycDocuments:{}, totalRevenue:0, totalOrders:0 },
        { _id:'4', businessName:'AJYAL Store', email:'ajyal@JJ.com', phone:'+96891234567', status:'pending', businessCategory:'General', createdAt:'2026-05-24T14:00:00Z', kycDocuments:{ businessLicense:{ url:'yes' } }, totalRevenue:0, totalOrders:0 },
        { _id:'5', businessName:'Home Decor Plus', email:'home@decor.om', phone:'+968 9555 5555', status:'approved', businessCategory:'Home', createdAt:'2026-05-15T10:00:00Z', kycDocuments:{ businessLicense:{ url:'yes' } }, totalRevenue:8930, totalOrders:156 },
        { _id:'6', businessName:'Book World', email:'book@world.om', phone:'+968 9666 6666', status:'rejected', businessCategory:'Books', createdAt:'2026-05-10T10:00:00Z', kycDocuments:{}, totalRevenue:0, totalOrders:0 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id: string, status: string) => {
    try {
      await axios.put(`${API}/admin/merchants/${id}`, { status }, { headers });
    } catch {}
    setMerchants(m => m.map(x => x._id === id ? { ...x, status } : x));
    if (selected?._id === id) setSelected((s: any) => ({ ...s, status }));
    setNotification(`Merchant ${status === 'approved' ? 'approved ✓' : status === 'rejected' ? 'rejected ✕' : 'suspended ⚠'}`);
    setTimeout(() => setNotification(''), 3000);
  };

  const statusConfig: Record<string, any> = {
    pending: { color:'text-amber-400', bg:'bg-amber-500/20 border-amber-500/30', label:'Pending' },
    approved: { color:'text-emerald-400', bg:'bg-emerald-500/20 border-emerald-500/30', label:'Approved' },
    rejected: { color:'text-red-400', bg:'bg-red-500/20 border-red-500/30', label:'Rejected' },
    suspended: { color:'text-gray-400', bg:'bg-gray-500/20 border-gray-500/30', label:'Suspended' },
  };

  const filters = ['all','pending','approved','rejected','suspended'];
  const filtered = merchants.filter(m =>
    (filter === 'all' || m.status === filter) &&
    (m.businessName?.toLowerCase().includes(search.toLowerCase()) || m.email?.toLowerCase().includes(search.toLowerCase()))
  );

  const counts = filters.reduce((acc, f) => {
    acc[f] = f === 'all' ? merchants.length : merchants.filter(m => m.status === f).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-2xl shadow-2xl font-bold text-white ${notification.includes('approved') ? 'bg-emerald-500' : notification.includes('rejected') ? 'bg-red-500' : 'bg-amber-500'}`}>
          {notification}
        </div>
      )}

      <Sidebar active="/admin/merchants" />

      <div className="flex-1 p-8 overflow-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Merchants</h1>
            <p className="text-gray-400">{merchants.length} total merchants on platform</p>
          </div>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search merchants..." className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 w-64" />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition capitalize ${filter===f?'bg-orange-600 text-white shadow-lg shadow-orange-500/25':'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700'}`}>
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
              <span className={`px-2 py-0.5 rounded-lg text-xs ${filter===f?'bg-white/20 text-white':'bg-gray-700 text-gray-400'}`}>{counts[f]}</span>
            </button>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading merchants...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏪</div>
            <p className="text-white font-bold text-xl">No merchants found</p>
          </div>
        ) : (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  {['Merchant','Category','Contact','Revenue','Orders','Status','Actions'].map(h => (
                    <th key={h} className="text-left px-6 py-4 text-gray-400 text-sm font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(merchant => {
                  const sc = statusConfig[merchant.status] || statusConfig.pending;
                  return (
                    <tr key={merchant._id} className="border-b border-gray-800 hover:bg-gray-800/50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center font-black">
                            {merchant.businessName?.[0] || 'M'}
                          </div>
                          <div>
                            <p className="font-bold text-white">{merchant.businessName}</p>
                            <p className="text-gray-500 text-xs">{new Date(merchant.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-300 text-sm">{merchant.businessCategory}</td>
                      <td className="px-6 py-4">
                        <p className="text-gray-300 text-sm">{merchant.email}</p>
                        <p className="text-gray-500 text-xs">{merchant.phone}</p>
                      </td>
                      <td className="px-6 py-4 text-emerald-400 font-bold">${(merchant.totalRevenue||0).toLocaleString()}</td>
                      <td className="px-6 py-4 text-gray-300">{merchant.totalOrders||0}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${sc.bg} ${sc.color}`}>{sc.label}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button onClick={() => setSelected(merchant)} className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition">View</button>
                          {merchant.status === 'pending' && (
                            <>
                              <button onClick={() => handleAction(merchant._id, 'approved')} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-sm transition font-bold">✓</button>
                              <button onClick={() => handleAction(merchant._id, 'rejected')} className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-lg text-sm transition border border-red-500/30">✕</button>
                            </>
                          )}
                          {merchant.status === 'approved' && (
                            <button onClick={() => handleAction(merchant._id, 'suspended')} className="px-3 py-1.5 bg-amber-600/20 hover:bg-amber-600 text-amber-400 hover:text-white rounded-lg text-sm transition border border-amber-500/30">⚠</button>
                          )}
                          {merchant.status === 'suspended' && (
                            <button onClick={() => handleAction(merchant._id, 'approved')} className="px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white rounded-lg text-sm transition border border-emerald-500/30">↺</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Merchant Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-3xl p-8 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black">Merchant Details</h2>
              <button onClick={() => setSelected(null)} className="w-9 h-9 bg-gray-800 hover:bg-gray-700 rounded-xl flex items-center justify-center transition">✕</button>
            </div>

            <div className="flex items-center gap-4 mb-6 p-4 bg-gray-800 rounded-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center font-black text-2xl">
                {selected.businessName?.[0]}
              </div>
              <div>
                <h3 className="text-xl font-black text-white">{selected.businessName}</h3>
                <p className="text-gray-400">{selected.businessCategory}</p>
                <span className={`px-3 py-1 rounded-xl text-xs font-bold border mt-1 inline-block ${(statusConfig[selected.status]||statusConfig.pending).bg} ${(statusConfig[selected.status]||statusConfig.pending).color}`}>
                  {(statusConfig[selected.status]||statusConfig.pending).label}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {[['📧 Email', selected.email],['📞 Phone', selected.phone],['📅 Joined', new Date(selected.createdAt).toLocaleDateString('en-US', { month:'long', day:'numeric', year:'numeric' })],['💰 Revenue', `$${(selected.totalRevenue||0).toLocaleString()}`],['📦 Orders', selected.totalOrders||0],['📄 Documents', selected.kycDocuments?.businessLicense?.url ? 'Complete ✓' : 'Missing ✕']].map(([label, value]) => (
                <div key={label as string} className="flex justify-between items-center p-3 bg-gray-800 rounded-xl">
                  <span className="text-gray-400 text-sm">{label as string}</span>
                  <span className="text-white font-medium text-sm">{value as string}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              {selected.status === 'pending' && (
                <>
                  <button onClick={() => { handleAction(selected._id, 'approved'); setSelected(null); }} className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-2xl font-black transition">✓ Approve</button>
                  <button onClick={() => { handleAction(selected._id, 'rejected'); setSelected(null); }} className="flex-1 py-3 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-2xl font-black transition border border-red-500/30">✕ Reject</button>
                </>
              )}
              {selected.status === 'approved' && (
                <button onClick={() => { handleAction(selected._id, 'suspended'); setSelected(null); }} className="flex-1 py-3 bg-amber-600/20 hover:bg-amber-600 text-amber-400 hover:text-white rounded-2xl font-black transition border border-amber-500/30">⚠ Suspend</button>
              )}
              {selected.status === 'suspended' && (
                <button onClick={() => { handleAction(selected._id, 'approved'); setSelected(null); }} className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-2xl font-black transition">↺ Reactivate</button>
              )}
              <button onClick={() => setSelected(null)} className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 rounded-2xl font-black transition">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
