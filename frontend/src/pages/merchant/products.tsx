import { useState } from 'react';
import Link from 'next/link';

const initialProducts = [
  { id: 1, name: 'Wireless Headphones Pro', price: 79.99, stock: 45, sales: 234, status: 'Active', emoji: '🎧' },
  { id: 2, name: 'Smart Watch Series X', price: 299.99, stock: 12, sales: 89, status: 'Active', emoji: '⌚' },
  { id: 3, name: 'USB-C Cable Premium', price: 12.99, stock: 0, sales: 567, status: 'Out of Stock', emoji: '🔌' },
  { id: 4, name: 'Phone Case Ultra', price: 19.99, stock: 78, sales: 123, status: 'Active', emoji: '📱' },
  { id: 5, name: 'Bluetooth Speaker', price: 49.99, stock: 5, sales: 445, status: 'Low Stock', emoji: '🔊' },
];

const Sidebar = () => (
  <div className="w-64 bg-gray-900 border-r border-gray-800 p-6 flex flex-col min-h-screen">
    <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">🏪 MerchantHub</div>
    <nav className="space-y-2 flex-1">
      {[['📊','Dashboard','/merchant'],['🏷️','Products','/merchant/products'],['📦','Orders','/merchant/orders'],['💬','Messages','/merchant/messages'],['💰','Finance','/merchant/finance'],['⚙️','Settings','/merchant/settings']].map(([icon,label,href])=>(
        <Link key={label} href={href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${href==='/merchant/products'?'bg-purple-600 text-white':'hover:bg-gray-800 text-gray-400 hover:text-white'}`}>
          <span>{icon}</span><span>{label}</span>
        </Link>
      ))}
    </nav>
  </div>
);

export default function MerchantProducts() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Products</h1>
            <p className="text-gray-400">{products.length} products total</p>
          </div>
          <div className="flex gap-3">
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products..." className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-purple-500 text-white" />
            <button className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 rounded-xl font-medium transition">+ Add Product</button>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                {['Product','Price','Stock','Sales','Status','Actions'].map(h=>(
                  <th key={h} className="text-left px-6 py-4 text-gray-400 text-sm font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(product=>(
                <tr key={product.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-xl">{product.emoji}</div>
                      <span className="font-medium text-white">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-blue-400 font-bold">${product.price}</td>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${product.stock===0?'text-red-400':product.stock<=10?'text-yellow-400':'text-green-400'}`}>{product.stock}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{product.sales}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.status==='Active'?'bg-green-500/20 text-green-400':
                      product.status==='Low Stock'?'bg-yellow-500/20 text-yellow-400':
                      'bg-red-500/20 text-red-400'
                    }`}>{product.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition">Edit</button>
                      <button onClick={()=>setProducts(products.filter(p=>p.id!==product.id))} className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg text-sm transition">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
