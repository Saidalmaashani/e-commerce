import Link from 'next/link';

const transactions = [
  { id:'TXN-001', type:'Sale', description:'Wireless Headphones x2', amount:159.98, date:'2026-05-24', status:'Completed' },
  { id:'TXN-002', type:'Payout', description:'Weekly payout', amount:-500.00, date:'2026-05-23', status:'Completed' },
  { id:'TXN-003', type:'Sale', description:'Smart Watch x1', amount:299.99, date:'2026-05-23', status:'Completed' },
  { id:'TXN-004', type:'Refund', description:'USB-C Cable refund', amount:-12.99, date:'2026-05-22', status:'Completed' },
  { id:'TXN-005', type:'Sale', description:'Phone Case x3', amount:59.97, date:'2026-05-22', status:'Pending' },
];

const Sidebar = () => (
  <div className="w-64 bg-gray-900 border-r border-gray-800 p-6 flex flex-col min-h-screen">
    <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">MerchantHub</div>
    <nav className="space-y-2 flex-1">
      {[['Dashboard','/merchant'],['Products','/merchant/products'],['Orders','/merchant/orders'],['Messages','/merchant/messages'],['Finance','/merchant/finance'],['Settings','/merchant/settings']].map(([label,href])=>(
        <Link key={label} href={href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${href==='/merchant/finance'?'bg-purple-600 text-white':'hover:bg-gray-800 text-gray-400 hover:text-white'}`}>
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  </div>
);

export default function MerchantFinance() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Finance</h1>
            <p className="text-gray-400">Track your earnings and payouts</p>
          </div>
          <button className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 rounded-xl font-medium transition">Request Payout</button>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[['Total Revenue','$12,450','text-white'],['Available Balance','$11,200','text-green-400'],['Pending','$1,250','text-yellow-400']].map(([label,val,color])=>(
            <div key={label} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <p className={`text-3xl font-bold mt-2 ${color}`}>{val}</p>
              <p className="text-gray-400 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-6">Transaction History</h2>
          <div className="space-y-3">
            {transactions.map(txn=>(
              <div key={txn.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-xl">
                <div>
                  <p className="font-medium text-white">{txn.description}</p>
                  <p className="text-gray-400 text-sm">{txn.id} - {txn.date}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-lg ${txn.amount>0?'text-green-400':'text-red-400'}`}>
                    {txn.amount>0?'+':''}{txn.amount.toFixed(2)}
                  </p>
                  <span className={`text-xs ${txn.status==='Completed'?'text-green-400':'text-yellow-400'}`}>{txn.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
