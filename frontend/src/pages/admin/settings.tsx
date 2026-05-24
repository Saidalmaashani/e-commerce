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

export default function AdminSettings() {
  const [commission, setCommission] = useState(10);
  const [maintenance, setMaintenance] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      <Sidebar active="/admin/settings" />
      <div className="flex-1 p-8 overflow-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Platform Settings</h1>
          <p className="text-gray-400">Configure global platform settings</p>
        </div>
        <div className="space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-6">General Settings</h2>
            <div className="space-y-4">
              {[['Platform Name','ShopHub'],['Support Email','support@shophub.com'],['Currency','OMR / USD']].map(([label,val])=>(
                <div key={label}>
                  <label className="text-sm text-gray-400 mb-1.5 block">{label}</label>
                  <input defaultValue={val} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" />
                </div>
              ))}
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Platform Commission: <span className="text-orange-400 font-bold">{commission}%</span></label>
                <input type="range" min="1" max="30" value={commission} onChange={e=>setCommission(Number(e.target.value))} className="w-full accent-orange-500" />
              </div>
            </div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-6">System Controls</h2>
            <div className="space-y-4">
              {[['🔧','Maintenance Mode','Disable access to all users',maintenance,setMaintenance],['📧','Email Notifications','Send automated emails',true,()=>{}],['💬','SMS Alerts','Send SMS for critical events',false,()=>{}]].map(([icon,label,desc,val,setter])=>(
                <div key={label as string} className="flex items-center justify-between p-4 bg-gray-800 rounded-xl border border-gray-700">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{icon}</span>
                    <div>
                      <p className="font-bold text-white">{label as string}</p>
                      <p className="text-gray-400 text-sm">{desc as string}</p>
                    </div>
                  </div>
                  <button onClick={()=>(setter as any)(!val)} className={`w-12 h-6 rounded-full transition-all relative ${val?'bg-orange-500':'bg-gray-700'}`}>
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${val?'left-7':'left-1'}`}/>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button onClick={save} className={`w-full py-3.5 rounded-2xl font-black text-lg transition-all ${saved?'bg-emerald-600':'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500'}`}>
            {saved?'✓ Saved!':'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
