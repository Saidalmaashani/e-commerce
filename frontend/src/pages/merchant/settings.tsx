import { useState } from 'react';
import Link from 'next/link';

const Sidebar = () => (
  <div className="w-64 bg-gray-900 border-r border-gray-800 p-6 flex flex-col min-h-screen">
    <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">🏪 MerchantHub</div>
    <nav className="space-y-2 flex-1">
      {[['📊','Dashboard','/merchant'],['🏷️','Products','/merchant/products'],['📦','Orders','/merchant/orders'],['💬','Messages','/merchant/messages'],['💰','Finance','/merchant/finance'],['⚙️','Settings','/merchant/settings']].map(([icon,label,href])=>(
        <Link key={label} href={href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${href==='/merchant/settings'?'bg-purple-600 text-white':'hover:bg-gray-800 text-gray-400 hover:text-white'}`}>
          <span>{icon}</span><span>{label}</span>
        </Link>
      ))}
    </nav>
  </div>
);

export default function MerchantSettings() {
  const [storeName, setStoreName] = useState('My Awesome Store');
  const [email, setEmail] = useState('merchant@store.com');
  const [phone, setPhone] = useState('+968 9123 4567');
  const [notifications, setNotifications] = useState({ orders:true, messages:true, payouts:false });
  const [saved, setSaved] = useState(false);

  const save = () => { setSaved(true); setTimeout(()=>setSaved(false),2000); };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-gray-400">Manage your store settings</p>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-6">Store Information</h2>
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-4xl">🏪</div>
              <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl text-sm transition">Change Logo</button>
            </div>
            <div className="space-y-4">
              {[['Store Name', storeName, setStoreName],['Email', email, setEmail],['Phone', phone, setPhone]].map(([label, val, setter])=>(
                <div key={label as string}>
                  <label className="text-sm text-gray-400 mb-1 block">{label as string}</label>
                  <input value={val as string} onChange={e=>(setter as any)(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-6">Notifications</h2>
            <div className="space-y-4">
              {[['New Orders','Get notified for new orders','orders'],['Messages','Get notified for customer messages','messages'],['Payouts','Get notified when payout is processed','payouts']].map(([label,desc,key])=>(
                <div key={key as string} className="flex items-center justify-between p-4 bg-gray-800 rounded-xl">
                  <div>
                    <p className="font-medium text-white">{label as string}</p>
                    <p className="text-gray-400 text-sm">{desc as string}</p>
                  </div>
                  <button onClick={()=>setNotifications({...notifications,[key as string]:!notifications[key as keyof typeof notifications]})} className={`w-12 h-6 rounded-full transition-all relative ${notifications[key as keyof typeof notifications]?'bg-purple-600':'bg-gray-700'}`}>
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${notifications[key as keyof typeof notifications]?'left-7':'left-1'}`}/>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button onClick={save} className={`w-full py-3 rounded-xl font-semibold transition ${saved?'bg-green-600':'bg-purple-600 hover:bg-purple-500'}`}>
            {saved?'✓ Saved!':'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
