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

type Message = { from: 'customer' | 'merchant'; text: string; time: string; };
type Conversation = { id: number; customer: string; avatar: string; lastMsg: string; time: string; unread: number; online: boolean; orderId: string; messages: Message[]; };

const initialConversations: Conversation[] = [
  { id:1, customer:'Ahmed Al-Said', avatar:'A', lastMsg:'Is this available in red?', time:'2m', unread:2, online:true, orderId:'ORD-101',
    messages:[
      { from:'customer', text:'Hi! Is the Wireless Headphones available in red?', time:'10:28' },
      { from:'merchant', text:'Hello Ahmed! Yes, we have it in red, blue and black.', time:'10:30' },
      { from:'customer', text:'Great! How long for delivery?', time:'10:31' },
      { from:'customer', text:'Is this available in red?', time:'10:32' },
    ]
  },
  { id:2, customer:'Sara Mohammed', avatar:'S', lastMsg:'When will my order arrive?', time:'15m', unread:1, online:true, orderId:'ORD-102',
    messages:[
      { from:'customer', text:'Hello, I placed order ORD-102. When will it arrive?', time:'09:45' },
      { from:'merchant', text:'Hi Sara! Your order is being processed and will ship tomorrow.', time:'09:50' },
      { from:'customer', text:'When will my order arrive?', time:'10:15' },
    ]
  },
  { id:3, customer:'Khalid Omar', avatar:'K', lastMsg:'Thank you!', time:'1h', unread:0, online:false, orderId:'ORD-103',
    messages:[
      { from:'customer', text:'Got my order. Everything is perfect!', time:'09:00' },
      { from:'merchant', text:'So glad to hear that! Thank you for your purchase.', time:'09:05' },
      { from:'customer', text:'Thank you!', time:'09:06' },
    ]
  },
  { id:4, customer:'Fatima Hassan', avatar:'F', lastMsg:'Can I get a refund?', time:'3h', unread:0, online:false, orderId:'ORD-104',
    messages:[
      { from:'customer', text:'The product I received is damaged. Can I get a refund?', time:'07:30' },
      { from:'merchant', text:'We are very sorry to hear that! Please send us photos of the damage.', time:'07:45' },
      { from:'customer', text:'Can I get a refund?', time:'08:00' },
    ]
  },
];

export default function MerchantMessages() {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [selected, setSelected] = useState<Conversation>(initialConversations[0]);
  const [msg, setMsg] = useState('');
  const [search, setSearch] = useState('');

  const selectConversation = (conv: Conversation) => {
    setSelected(conv);
    setConversations(conversations.map(c => c.id === conv.id ? { ...c, unread: 0 } : c));
  };

  const send = () => {
    if (!msg.trim()) return;
    const newMsg: Message = { from:'merchant', text:msg, time: new Date().toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' }) };
    const updated = conversations.map(c => c.id === selected.id ? { ...c, messages:[...c.messages, newMsg], lastMsg:msg, time:'now' } : c);
    setConversations(updated);
    setSelected({ ...selected, messages:[...selected.messages, newMsg] });
    setMsg('');
  };

  const filtered = conversations.filter(c => c.customer.toLowerCase().includes(search.toLowerCase()));
  const totalUnread = conversations.reduce((s, c) => s + c.unread, 0);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      <Sidebar active="/merchant/messages" />
      <div className="flex-1 flex overflow-hidden" style={{height:'100vh'}}>
        {/* Conversations List */}
        <div className="w-80 bg-gray-900 border-r border-gray-800 flex flex-col">
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-lg">Messages</h2>
              {totalUnread > 0 && <span className="bg-purple-600 text-white text-xs rounded-full px-2 py-0.5">{totalUnread} new</span>}
            </div>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search conversations..." className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-purple-500 text-white" />
          </div>
          <div className="flex-1 overflow-auto">
            {filtered.map(conv=>(
              <div key={conv.id} onClick={()=>selectConversation(conv)} className={`p-4 cursor-pointer hover:bg-gray-800 transition border-b border-gray-800/50 ${selected.id===conv.id?'bg-gray-800':''}`}>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center font-bold text-sm">{conv.avatar}</div>
                    {conv.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"/>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-white text-sm">{conv.customer}</span>
                      <span className="text-gray-500 text-xs">{conv.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-400 text-xs truncate">{conv.lastMsg}</p>
                      {conv.unread>0 && <span className="bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-1 flex-shrink-0">{conv.unread}</span>}
                    </div>
                    <p className="text-gray-600 text-xs">{conv.orderId}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-800 bg-gray-900 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center font-bold">{selected.avatar}</div>
                {selected.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"/>}
              </div>
              <div>
                <p className="font-medium text-white">{selected.customer}</p>
                <p className={`text-xs ${selected.online?'text-green-400':'text-gray-500'}`}>{selected.online?'Online':'Offline'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 bg-gray-800 px-3 py-1 rounded-full">{selected.orderId}</span>
              <Link href="/merchant/orders" className="px-3 py-1.5 bg-purple-600/20 text-purple-400 hover:bg-purple-600 hover:text-white rounded-xl text-xs transition">View Order</Link>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-6 space-y-4 overflow-auto bg-gray-950">
            {selected.messages.map((m, i) => (
              <div key={i} className={`flex ${m.from==='merchant'?'justify-end':''}`}>
                {m.from==='customer' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0">{selected.avatar}</div>
                )}
                <div className={`max-w-sm px-4 py-3 rounded-2xl ${m.from==='merchant'?'bg-purple-600 text-white rounded-br-none':'bg-gray-800 text-gray-200 rounded-bl-none'}`}>
                  <p className="text-sm">{m.text}</p>
                  <p className="text-xs opacity-60 mt-1 text-right">{m.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Replies */}
          <div className="px-4 py-2 flex gap-2 overflow-x-auto border-t border-gray-800 bg-gray-900">
            {['Thank you for your message!','Your order is on the way.','We will process your refund shortly.','Please send us more details.'].map(r=>(
              <button key={r} onClick={()=>setMsg(r)} className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-xl text-xs whitespace-nowrap text-gray-300 transition">{r}</button>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-800 bg-gray-900 flex gap-3">
            <input
              value={msg}
              onChange={e=>setMsg(e.target.value)}
              onKeyDown={e=>e.key==='Enter'&&!e.shiftKey&&(e.preventDefault(),send())}
              placeholder="Type a message... (Enter to send)"
              className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 text-white"
            />
            <button onClick={send} disabled={!msg.trim()} className="px-5 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-medium transition disabled:opacity-50">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
