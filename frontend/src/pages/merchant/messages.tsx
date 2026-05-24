import { useState } from 'react';
import Link from 'next/link';

const conversations = [
  { id:1, customer:'Ahmed Al-Said', lastMsg:'Is this available in red?', time:'2m', unread:2, avatar:'A' },
  { id:2, customer:'Sara Mohammed', lastMsg:'When will my order arrive?', time:'15m', unread:1, avatar:'S' },
  { id:3, customer:'Khalid Omar', lastMsg:'Thank you!', time:'1h', unread:0, avatar:'K' },
  { id:4, customer:'Fatima Hassan', lastMsg:'Can I get a refund?', time:'3h', unread:0, avatar:'F' },
];

const Sidebar = () => (
  <div className="w-64 bg-gray-900 border-r border-gray-800 p-6 flex flex-col min-h-screen">
    <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">🏪 MerchantHub</div>
    <nav className="space-y-2 flex-1">
      {[['📊','Dashboard','/merchant'],['🏷️','Products','/merchant/products'],['📦','Orders','/merchant/orders'],['💬','Messages','/merchant/messages'],['💰','Finance','/merchant/finance'],['⚙️','Settings','/merchant/settings']].map(([icon,label,href])=>(
        <Link key={label} href={href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${href==='/merchant/messages'?'bg-purple-600 text-white':'hover:bg-gray-800 text-gray-400 hover:text-white'}`}>
          <span>{icon}</span><span>{label}</span>
        </Link>
      ))}
    </nav>
  </div>
);

export default function MerchantMessages() {
  const [selected, setSelected] = useState(conversations[0]);
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([
    { from:'customer', text:'Is this available in red?', time:'10:30' },
    { from:'merchant', text:'Yes! We have it in red, blue and black.', time:'10:32' },
    { from:'customer', text:'Great! How long for delivery?', time:'10:33' },
  ]);

  const send = () => {
    if(!msg.trim()) return;
    setMessages([...messages, { from:'merchant', text:msg, time:'Now' }]);
    setMsg('');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      <Sidebar />
      <div className="flex-1 flex">
        <div className="w-80 bg-gray-900 border-r border-gray-800 flex flex-col">
          <div className="p-4 border-b border-gray-800">
            <h2 className="font-bold text-lg mb-3">Messages</h2>
            <input placeholder="Search..." className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-purple-500" />
          </div>
          <div className="flex-1 overflow-auto">
            {conversations.map(conv=>(
              <div key={conv.id} onClick={()=>setSelected(conv)} className={`p-4 cursor-pointer hover:bg-gray-800 transition border-b border-gray-800 ${selected.id===conv.id?'bg-gray-800':''}`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center font-bold">{conv.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-white text-sm">{conv.customer}</span>
                      <span className="text-gray-500 text-xs">{conv.time}</span>
                    </div>
                    <p className="text-gray-400 text-xs truncate">{conv.lastMsg}</p>
                  </div>
                  {conv.unread>0 && <span className="bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{conv.unread}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-800 bg-gray-900 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center font-bold">{selected.avatar}</div>
            <div>
              <p className="font-medium text-white">{selected.customer}</p>
              <p className="text-green-400 text-xs">Online</p>
            </div>
          </div>
          <div className="flex-1 p-6 space-y-4 overflow-auto bg-gray-950">
            {messages.map((m,i)=>(
              <div key={i} className={`flex ${m.from==='merchant'?'justify-end':''}`}>
                <div className={`max-w-xs px-4 py-3 rounded-2xl text-sm ${m.from==='merchant'?'bg-purple-600 text-white':'bg-gray-800 text-gray-200'}`}>
                  <p>{m.text}</p>
                  <p className="text-xs opacity-60 mt-1 text-right">{m.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-800 bg-gray-900 flex gap-3">
            <input value={msg} onChange={e=>setMsg(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Type a message..." className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 text-white" />
            <button onClick={send} className="px-5 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-medium transition">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
