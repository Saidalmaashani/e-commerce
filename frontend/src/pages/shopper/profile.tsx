import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Profile() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState('Said Al-Maashani');
  const [email, setEmail] = useState('said@example.com');
  const [phone, setPhone] = useState('+968 9123 4567');

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const logout = () => { localStorage.clear(); router.push('/login'); };

  const stats = [
    { label:'Orders', value:'12', icon:'📦' },
    { label:'Wishlist', value:'8', icon:'♡' },
    { label:'Reviews', value:'5', icon:'★' },
    { label:'Points', value:'1,240', icon:'💎' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/shopper" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center text-sm font-black">S</div>
            <span className="text-xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">ShopHub</span>
          </Link>
          <div className="flex-1"/>
          <h1 className="text-lg font-bold">My Account</h1>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 border border-blue-500/20 rounded-3xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0" style={{backgroundImage:'radial-gradient(circle at 80% 50%, rgba(6,182,212,0.1) 0%, transparent 60%)'}}/>
          <div className="relative flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-3xl font-black shadow-xl shadow-blue-500/30">S</div>
            <div>
              <h2 className="text-2xl font-black text-white">{name}</h2>
              <p className="text-blue-300">{email}</p>
              <span className="inline-flex items-center gap-1 bg-blue-500/20 text-blue-300 text-xs px-3 py-1 rounded-full border border-blue-500/30 mt-2">
                💎 Premium Member
              </span>
            </div>
          </div>
          <div className="relative grid grid-cols-4 gap-4 mt-8">
            {stats.map(stat => (
              <div key={stat.label} className="bg-gray-900/50 backdrop-blur rounded-2xl p-4 text-center border border-gray-700/50">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-xl font-black text-white">{stat.value}</div>
                <div className="text-gray-400 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[['profile','👤','Profile'],['addresses','📍','Addresses'],['security','🔒','Security']].map(([tab,icon,label]) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition ${activeTab===tab?'bg-blue-600 text-white shadow-lg shadow-blue-500/25':'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700'}`}>
              <span>{icon}</span><span>{label}</span>
            </button>
          ))}
        </div>

        {activeTab === 'profile' && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-black text-white text-lg mb-4">Personal Information</h3>
            {[['Full Name', name, setName, 'text'],['Email', email, setEmail, 'email'],['Phone', phone, setPhone, 'tel']].map(([label, val, setter, type]) => (
              <div key={label as string}>
                <label className="text-sm text-gray-400 mb-1.5 block">{label as string}</label>
                <input type={type as string} value={val as string} onChange={e => (setter as any)(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition" />
              </div>
            ))}
            <button onClick={save} className={`w-full py-3.5 rounded-2xl font-black text-lg transition-all ${saved?'bg-emerald-600':'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500'}`}>
              {saved ? '✓ Saved!' : 'Save Changes'}
            </button>
          </div>
        )}

        {activeTab === 'addresses' && (
          <div className="space-y-4">
            <div className="bg-gray-900 border border-blue-500/30 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-blue-500/20 text-blue-300 text-xs px-3 py-1 rounded-full border border-blue-500/30 font-bold">Default</span>
                <button className="text-blue-400 text-sm hover:text-blue-300">Edit</button>
              </div>
              <h3 className="font-bold text-white mb-1">Said Al-Maashani</h3>
              <p className="text-gray-400 text-sm">123 Main Street, Salalah, Dhofar, Oman</p>
              <p className="text-gray-400 text-sm">+968 9123 4567</p>
            </div>
            <button className="w-full py-4 border-2 border-dashed border-gray-700 rounded-2xl text-gray-400 hover:border-blue-500/50 hover:text-blue-400 transition font-bold">
              + Add New Address
            </button>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-black text-white text-lg mb-4">Change Password</h3>
            {['Current Password','New Password','Confirm Password'].map(label => (
              <div key={label}>
                <label className="text-sm text-gray-400 mb-1.5 block">{label}</label>
                <input type="password" placeholder="••••••••" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition" />
              </div>
            ))}
            <button className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-2xl font-black text-lg transition-all">
              Update Password
            </button>
          </div>
        )}

        {/* Logout */}
        <button onClick={logout} className="w-full mt-6 py-3.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-2xl font-bold border border-red-600/30 transition">
          🚪 Sign Out
        </button>
      </div>
    </div>
  );
}
