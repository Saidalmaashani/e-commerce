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

const transactions = [
  { id:'TXN-001', type:'Commission', from:'Tech Store Oman', amount:+245.50, date:'2026-05-24', status:'Completed' },
  { id:'TXN-002', type:'Payout', to:'Ahmed Driver', amount:-48.50, date:'2026-05-24', status:'Completed' },
  { id:'TXN-003', type:'Commission', from:'Fashion Hub', amount:+89.99, date:'2026-05-23', status:'Completed' },
  { id:'TXN-004', type:'Refund', to:'Sara Customer', amount:-19.99, date:'2026-05-23', status:'Completed' },
  { id:'TXN-005', type:'Commission', from:'Sports World', amount:+199.99, date:'2026-05-22', status:'Pending' },
];

export default function AdminFinance() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      <Sidebar active="/admin/finance" />
      <div className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Finance</h1>
          <p className="text-gray-400">Platform revenue & payouts</p>
        </div>
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[['💰','$248,500','Total GMV','text-white'],['📈','$24,850','Platform Revenue (10%)','text-emerald-400'],['⏳','$2,450','Pending Payouts','text-amber-400'],['📉','$1,200','Total Refunds','text-red-400']].map(([icon,val,label,color])=>(
            <div key={label} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <span className="text-2xl">{icon}</span>
              <p className={`text-3xl font-black mt-2 ${color}`}>{val}</p>
              <p className="text-gray-400 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">Transaction History</h2>
            <button className="px-4 py-2 bg-orange-600 hover:bg-orange-500 rounded-xl text-sm font-bold transition">Export CSV</button>
          </div>
          <div className="space-y-3">
            {transactions.map(txn => (
              <div key={txn.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-xl border border-gray-700">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${txn.type==='Commission'?'bg-emerald-500/20':txn.type==='Payout'?'bg-blue-500/20':'bg-red-500/20'}`}>
                    {txn.type==='Commission'?'💰':txn.type==='Payout'?'🏦':'↩️'}
                  </div>
                  <div>
                    <p className="font-bold text-white">{txn.type}</p>
                    <p className="text-gray-400 text-sm">{txn.from || txn.to} · {txn.id} · {txn.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-black text-lg ${txn.amount>0?'text-emerald-400':'text-red-400'}`}>{txn.amount>0?'+':''}{txn.amount.toFixed(2)}</p>
                  <span className={`text-xs ${txn.status==='Completed'?'text-emerald-400':'text-amber-400'}`}>{txn.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
