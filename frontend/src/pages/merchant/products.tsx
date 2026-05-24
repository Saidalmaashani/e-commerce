import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://e-commerce-t702.onrender.com/api/v1';

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
const defaultForm = { name:'', basePrice:0, salePrice:'', baseStock:0, category:'General', description:'', emoji:'📦', badge:'' };

export default function MerchantProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<any>(null);
  const [form, setForm] = useState(defaultForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers = { Authorization: `Bearer ${token}` };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/merchant/products`, { headers });
      setProducts(res.data.products || []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getStatus = (stock: number) => stock === 0 ? 'Out of Stock' : stock <= 10 ? 'Low Stock' : 'Active';

  const openAdd = () => { setForm(defaultForm); setEditProduct(null); setShowModal(true); setError(''); };
  const openEdit = (p: any) => {
    setForm({ name:p.name, basePrice:p.basePrice, salePrice:p.salePrice||'', baseStock:p.baseStock, category:p.category, description:p.description||'', emoji:p.tags?.[1]||'📦', badge:p.tags?.[0]||'' });
    setEditProduct(p);
    setShowModal(true);
    setError('');
  };

  const save = async () => {
    if (!form.name || !form.basePrice) { setError('Name and price are required'); return; }
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        basePrice: Number(form.basePrice),
        salePrice: form.salePrice ? Number(form.salePrice) : null,
        baseStock: Number(form.baseStock),
        category: form.category,
        description: form.description,
        isActive: true,
        tags: [form.badge, form.emoji].filter(Boolean),
      };
      if (editProduct?._id) {
        await axios.put(`${API}/merchant/products/${editProduct._id}`, payload, { headers });
      } else {
        await axios.post(`${API}/merchant/products`, payload, { headers });
      }
      await fetchProducts();
      setShowModal(false);
      setNotification(editProduct ? 'Product updated!' : 'Product added! Now visible to shoppers ✓');
      setTimeout(() => setNotification(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Delete this product? It will be removed from the store.')) return;
    try {
      await axios.delete(`${API}/merchant/products/${id}`, { headers });
      await fetchProducts();
      setNotification('Product deleted');
      setTimeout(() => setNotification(''), 2000);
    } catch {
      setProducts(products.filter(p => p._id !== id));
    }
  };

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-2xl">✓ {notification}</div>
      )}
      <Sidebar active="/merchant/products" />
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Products</h1>
            <p className="text-gray-400">{products.length} products • Visible to all shoppers</p>
          </div>
          <div className="flex gap-3">
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products..." className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-purple-500 text-white w-64" />
            <button onClick={openAdd} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 rounded-xl font-medium transition">+ Add Product</button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading products...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-bold text-white mb-2">No products yet</h3>
            <p className="text-gray-400 mb-6">Add your first product and it will appear in the shopper store</p>
            <button onClick={openAdd} className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold transition">+ Add First Product</button>
          </div>
        ) : (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  {['Product','Price','Sale Price','Stock','Status','Visible','Actions'].map(h=>(
                    <th key={h} className="text-left px-6 py-4 text-gray-400 text-sm font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(product=>(
                  <tr key={product._id} className="border-b border-gray-800 hover:bg-gray-800/50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-xl">{product.tags?.[1] || '📦'}</div>
                        <div>
                          <p className="font-medium text-white">{product.name}</p>
                          <p className="text-gray-500 text-xs">{product.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-blue-400 font-bold">${product.basePrice}</td>
                    <td className="px-6 py-4">{product.salePrice ? <span className="text-gray-500 line-through">${product.salePrice}</span> : <span className="text-gray-600">—</span>}</td>
                    <td className="px-6 py-4">
                      <span className={`font-bold text-lg ${product.baseStock===0?'text-red-400':product.baseStock<=10?'text-yellow-400':'text-green-400'}`}>{product.baseStock}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatus(product.baseStock)==='Active'?'bg-green-500/20 text-green-400':getStatus(product.baseStock)==='Low Stock'?'bg-yellow-500/20 text-yellow-400':'bg-red-500/20 text-red-400'}`}>
                        {getStatus(product.baseStock)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${product.isActive?'bg-blue-500/20 text-blue-400':'bg-gray-500/20 text-gray-400'}`}>
                        {product.isActive ? '👁 Visible' : '🙈 Hidden'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={()=>openEdit(product)} className="px-3 py-1.5 bg-gray-800 hover:bg-purple-600 rounded-lg text-sm transition">Edit</button>
                        <button onClick={()=>deleteProduct(product._id)} className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-lg text-sm transition">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-auto">
            <h2 className="text-xl font-bold mb-2">{editProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <p className="text-gray-400 text-sm mb-6">{editProduct ? 'Changes will be visible to shoppers immediately' : 'Product will be visible to all shoppers after adding'}</p>
            {error && <div className="bg-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-4 text-sm">{error}</div>}
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Product Name *</label>
                <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Enter product name" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Price *</label>
                  <input type="number" value={form.basePrice} onChange={e=>setForm({...form,basePrice:parseFloat(e.target.value)||0})} placeholder="0.00" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Original Price (optional)</label>
                  <input type="number" value={form.salePrice} onChange={e=>setForm({...form,salePrice:e.target.value})} placeholder="0.00" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Stock *</label>
                  <input type="number" value={form.baseStock} onChange={e=>setForm({...form,baseStock:parseInt(e.target.value)||0})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" />
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
                <textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Describe your product for shoppers..." rows={3} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 resize-none" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Icon</label>
                <div className="flex flex-wrap gap-2">
                  {emojis.map(e=>(
                    <button key={e} onClick={()=>setForm({...form,emoji:e})} className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition ${form.emoji===e?'bg-purple-600':'bg-gray-800 hover:bg-gray-700'}`}>{e}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Badge</label>
                <div className="flex gap-2 flex-wrap">
                  {['','Sale','New','Hot','Top','Best Seller'].map(b=>(
                    <button key={b} onClick={()=>setForm({...form,badge:b})} className={`px-4 py-2 rounded-xl text-sm font-medium transition ${form.badge===b?'bg-purple-600 text-white':'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>{b||'None'}</button>
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
