import { useState } from 'react';
import Link from 'next/link';

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

export default function MerchantSettings() {
  const [tab, setTab] = useState('store');
  const [saved, setSaved] = useState(false);
  const [storeName, setStoreName] = useState('My Awesome Store');
  const [email, setEmail] = useState('merchant@store.com');
  const [phone, setPhone] = useState('+968 9123 4567');
  const [bio, setBio] = useState('Welcome to our store! We offer the best products at the best prices.');
  const [category, setCategory] = useState('Electronics');
  const [returnPolicy, setReturnPolicy] = useState('30 days return policy');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notifications, setNotifications] = useState({ orders:true, messages:true, payouts:false, reviews:true, promotions:false });
  const [bankName, setBankName] = useState('Bank Muscat');
  const [accountNumber, setAccountNumber] = useState('1234567890');
  const [iban, setIban] = useState('OM12 1234 5678 9012 3456 789');
  const [passwordError, setPasswordError] = useState('');

  const save = () => {
    if (tab === 'security') {
      if (newPassword && newPassword !== confirmPassword) {
        setPasswordError('Passwords do not match');
        return;
      }
      setPasswordError('');
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id:'store', label:'Store Info', icon:'🏪' },
    { id:'security', label:'Security', icon:'🔒' },
    { id:'notifications', label:'Notifications', icon:'🔔' },
    { id:'payment', label:'Payment', icon:'💳' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      <Sidebar active="/merchant/settings" />
      <div className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-gray-400">Manage your store settings</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition ${tab === t.id ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
              <span>{t.icon}</span><span>{t.label}</span>
            </button>
          ))}
        </div>

        <div className="max-w-2xl space-y-6">
          {/* Store Info Tab */}
          {tab === 'store' && (
            <>
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <h2 className="text-lg font-bold mb-6">Store Information</h2>
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-4xl">🏪</div>
                  <div>
                    <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl text-sm transition mb-2 block">Upload Logo</button>
                    <p className="text-gray-500 text-xs">JPG, PNG up to 2MB</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Store Name</label>
                    <input value={storeName} onChange={e=>setStoreName(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Email</label>
                    <input value={email} onChange={e=>setEmail(e.target.value)} type="email" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Phone</label>
                    <input value={phone} onChange={e=>setPhone(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Category</label>
                    <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition">
                      {['Electronics','Clothing','Home','Sports','Books','Food','Beauty'].map(c=><option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Store Bio</label>
                    <textarea value={bio} onChange={e=>setBio(e.target.value)} rows={3} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition resize-none" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Return Policy</label>
                    <textarea value={returnPolicy} onChange={e=>setReturnPolicy(e.target.value)} rows={2} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition resize-none" />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Security Tab */}
          {tab === 'security' && (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-6">Security Settings</h2>
              {passwordError && <div className="bg-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-4 text-sm">{passwordError}</div>}
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Current Password</label>
                  <input type="password" value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)} placeholder="••••••••" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">New Password</label>
                  <input type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} placeholder="••••••••" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Confirm New Password</label>
                  <input type="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} placeholder="••••••••" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition" />
                </div>
              </div>
              <div className="mt-6 p-4 bg-gray-800 rounded-xl">
                <h3 className="font-medium text-white mb-3">Two-Factor Authentication</h3>
                <p className="text-gray-400 text-sm mb-3">Add an extra layer of security to your account</p>
                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-xl text-sm font-medium transition">Enable 2FA</button>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {tab === 'notifications' && (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-6">Notification Preferences</h2>
              <div className="space-y-3">
                {[
                  ['orders','New Orders','Get notified when you receive a new order'],
                  ['messages','Messages','Get notified for customer messages'],
                  ['payouts','Payouts','Get notified when payout is processed'],
                  ['reviews','Reviews','Get notified for new product reviews'],
                  ['promotions','Promotions','Receive platform promotion updates'],
                ].map(([key,label,desc])=>(
                  <div key={key} className="flex items-center justify-between p-4 bg-gray-800 rounded-xl">
                    <div>
                      <p className="font-medium text-white">{label}</p>
                      <p className="text-gray-400 text-sm">{desc}</p>
                    </div>
                    <button
                      onClick={()=>setNotifications({...notifications,[key]:!notifications[key as keyof typeof notifications]})}
                      className={`w-12 h-6 rounded-full transition-all relative ${notifications[key as keyof typeof notifications]?'bg-purple-600':'bg-gray-700'}`}
                    >
                      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${notifications[key as keyof typeof notifications]?'left-7':'left-1'}`}/>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payment Tab */}
          {tab === 'payment' && (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-6">Payment & Payout Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Bank Name</label>
                  <input value={bankName} onChange={e=>setBankName(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Account Number</label>
                  <input value={accountNumber} onChange={e=>setAccountNumber(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">IBAN</label>
                  <input value={iban} onChange={e=>setIban(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition" />
                </div>
                <div className="p-4 bg-gray-800 rounded-xl">
                  <h3 className="font-medium text-white mb-2">Payout Schedule</h3>
                  <div className="flex gap-3">
                    {['Weekly','Bi-Weekly','Monthly'].map(s=>(
                      <button key={s} className="px-4 py-2 bg-gray-700 hover:bg-purple-600 rounded-xl text-sm transition">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <button onClick={save} className={`w-full py-3 rounded-xl font-semibold transition text-white ${saved?'bg-green-600':'bg-purple-600 hover:bg-purple-500'}`}>
            {saved ? '✓ Saved Successfully!' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
