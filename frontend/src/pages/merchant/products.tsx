import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

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

const emojis = ['📦','🎧','⌚','🔌','📱','🔊','💻','⌨️','🖱️','👕','👟','📚','🏠','⚽','🎮'];

type Product = {
  _id?: string;
  name: string;
  price: number;
  oldPrice: number | null;
  stock: number;
  category: string;
  description: string;
  emoji: string;
  badge: string | null;
  status: string;
  sales: number;
};

const defaultProduct: Product = { name:'', price:0, oldPrice:null, stock:0, category:'General', description:'', emoji:'📦', badge:null, status:'Active', sales:0 };

export default function MerchantProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<Product>(defaultProduct);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers = { Authorization: `Bearer ${token}` };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/merchant/products`, { headers });
      setProducts(res.data.products || []);
    } catch {
      // Use demo data if API fails
      setProducts([
        { _id:'1', name:'Wireless Headphones Pro', price:79.99, oldPrice:129.99, stock:45, sales:234, status:'Active', emoji:'🎧', badge:'Sale', category:'Electronics', description:'' },
        { _id:'2', name:'Smart Watch Series X', price:299.99, oldPrice:null, stock:12, sales:89, status:'Active', emoji:'⌚', badge:'New', category:'Electronics', description:'' },
        { _id:'3', name:'USB-C Cable Premium', price:12.99, oldPrice:19.99, stock:0, sales:567, status:'Out of Stock', emoji:'🔌', badge:null, category:'Electronics', description:'' },
        { _id:'4', name:'Phone Case Ultra', price:19.99, oldPrice:null, stock:78, sales:123, status:'Active', emoji:'📱', badge:'Hot', category:'Accessories', description:'' },
        { _id:'5', name:'Bluetooth Speaker', price:49.99, oldPrice:79.99, stock:5, sales:445, status:'Low Stock', emoji:'🔊', badge:null, category:'Electronics', description:'' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const openAdd = () => { setForm(defaultProduct); setEditProduct(null); setShowModal(true); setError(''); };
  const openEdit = (p: Product) => { setForm(p); setEditProduct(p); setShowModal(true); setError(''); };

  const save = async () => {
    if (!form.name || !form.price) { setError('Name and price are required'); return; }
    setSaving(true);
    try {
      if (editProduct?._id) {
        await axios.put(`${API}/merchant/products/${editProduct._id}`, form, { headers });
      } else {
        await axios.post(`${API}/merchant/products`, form, { headers });
      }
      await fetchProducts();
      setShowModal(false);
    } catch {
      // Update locally if API fails
      if (editProduct?._id) {
        const status = form.stock === 0 ? 'Out of Stock' : form.stock <= 10 ? 'Low Stock' : 'Active';
        setProducts(products.map(p => p._id === editProduct._id ? { ...form, status } : p));
      } else {
        const status = form.stock === 0 ? 'Out of Stock' : form.stock <= 10 ? 'Low Stock' : 'Active';
        setProducts([...products, { ...form, _id: Date.now().toString(), status, sales: 0 }]);
      }
      setShowModal(false);
    } finally {
      setSaving(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    try {
      await axios.delete(`${API}/merchant/products/${id}`, { headers });
      await fetchProducts();
    } catch {
      setProducts(products.filter(p => p._id !== id));
    }
  };

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      <Sidebar active="/merchant/products" />
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Products</h1>
            <p className="text-gray-400">{products.length} products total</p>
          </div>
          <div className="flex gap-3">
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products..." className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-purple-500 text-white w-64" />
            <button onClick={openAdd} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 rounded-xl font-medium transition">+ Add Product</button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-400">Loading products...</div>
          </div>
        ) : (
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
                  <tr key={product._id} className="border-b border-gray-800 hover:bg-gray-800/50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-xl">{product.emoji}</div>
                        <div>
                          <p className="font-medium text-white">{product.name}</p>
                          <p className="text-gray-500 text-xs">{product.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-blue-400 font-bold">${product.price}</p>
                      {product.oldPrice && <p className="text-gray-500 text-xs line-through">${product.oldPrice}</p>}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-bold text-lg ${product.stock===0?'text-red-400':product.stock<=10?'text-yellow-400':'text-green-400'}`}>{product.stock}</span>
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
                        <button onClick={()=>openEdit(product)} className="px-3 py-1.5 bg-gray-800 hover:bg-purple-600 rounded-lg text-sm transition">Edit</button>
                        <button onClick={()=>deleteProduct(product._id!)} className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-lg text-sm transition">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-400">No products found</div>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-auto">
            <h2 className="text-xl font-bold mb-6">{editProduct ? 'Edit Product' : 'Add New Product'}</h2>

            {error && <div className="bg-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-4 text-sm">{error}</div>}

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Product Name *</label>
                <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Enter product name" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Price *</label>
                  <input type="number" value={form.price} onChange={e=>setForm({...form,price:parseFloat(e.target.value)||0})} placeholder="0.00" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Old Price</label>
                  <input type="number" value={form.oldPrice||''} onChange={e=>setForm({...form,oldPrice:e.target.value?parseFloat(e.target.value):null})} placeholder="0.00" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Stock *</label>
                  <input type="number" value={form.stock} onChange={e=>setForm({...form,stock:parseInt(e.target.value)||0})} placeholder="0" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Category</label>
                  <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500">
                    {['General','Electronics','Clothing','Home','Sports','Books','Accessories'].map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Description</label>
                <textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Product description..." rows={3} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 resize-none" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Emoji Icon</label>
                <div className="flex flex-wrap gap-2">
                  {emojis.map(e=>(
                    <button key={e} onClick={()=>setForm({...form,emoji:e})} className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition ${form.emoji===e?'bg-purple-600':'bg-gray-800 hover:bg-gray-700'}`}>{e}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Badge</label>
                <div className="flex gap-2">
                  {[null,'Sale','New','Hot','Top'].map(b=>(
                    <button key={String(b)} onClick={()=>setForm({...form,badge:b})} className={`px-4 py-2 rounded-xl text-sm font-medium transition ${form.badge===b?'bg-purple-600 text-white':'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>{b||'None'}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={()=>setShowModal(false)} className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-medium transition">Cancel</button>
              <button onClick={save} disabled={saving} className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-medium transition disabled:opacity-50">
                {saving?'Saving...':editProduct?'Save Changes':'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
