import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

const roles = [
  { value:'shopper', label:'Shopper', icon:'🛒', color:'from-blue-500 to-cyan-500', desc:'Browse & buy products' },
  { value:'merchant', label:'Merchant', icon:'🏪', color:'from-purple-500 to-pink-500', desc:'Sell your products' },
  { value:'delivery', label:'Delivery', icon:'🚗', color:'from-green-500 to-teal-500', desc:'Deliver orders' },
  { value:'admin', label:'Admin', icon:'👑', color:'from-orange-500 to-red-500', desc:'Manage platform' },
];

export default function Login() {
  const router = useRouter();
  const [mode, setMode] = useState<'login'|'register'>('login');
  const [role, setRole] = useState('shopper');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ email:'', password:'', confirmPassword:'', firstName:'', lastName:'', phone:'', businessName:'', vehicleType:'bike' });

  const set = (k: string, v: string) => setForm(f => ({...f, [k]:v}));

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        const res = await axios.post(`${API}/auth/login`, { email:form.email, password:form.password, role });
        const { accessToken, refreshToken, user } = res.data;
        localStorage.setItem('token', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('role', user.role);
        localStorage.setItem('user', JSON.stringify(user));
        if (user.role === 'shopper') router.push('/shopper');
        else if (user.role === 'merchant') router.push('/merchant');
        else if (user.role === 'delivery') router.push('/delivery');
        else if (user.role === 'admin') router.push('/admin');
      } else {
        if (form.password !== form.confirmPassword) { setError('Passwords do not match'); setLoading(false); return; }
        if (role === 'merchant') {
          await axios.post(`${API}/auth/register/merchant`, { email:form.email, password:form.password, confirmPassword:form.confirmPassword, businessName:form.businessName, businessCategory:'General', businessEmail:form.email, phone:form.phone, storeName:form.businessName, businessLicense:'pending', nationalId:'pending', bankAccountNumber:'pending', bankRoutingNumber:'pending', bankHolderName:form.businessName, address:'pending', city:'pending', state:'pending', postalCode:'pending', country:'OM' });
          setError('');
          alert('Registration submitted! Pending admin approval.');
          setMode('login');
        } else if (role === 'shopper') {
          await axios.post(`${API}/auth/register/shopper`, { email:form.email, password:form.password, firstName:form.firstName, lastName:form.lastName, phone:form.phone });
          const res = await axios.post(`${API}/auth/login`, { email:form.email, password:form.password, role:'shopper' });
          localStorage.setItem('token', res.data.accessToken);
          localStorage.setItem('role', 'shopper');
          localStorage.setItem('user', JSON.stringify(res.data.user));
          router.push('/shopper');
        } else if (role === 'delivery') {
          await axios.post(`${API}/auth/register/delivery`, { email:form.email, password:form.password, confirmPassword:form.confirmPassword, firstName:form.firstName, lastName:form.lastName, phone:form.phone, vehicleType:form.vehicleType, vehicleRegistration:'pending', licenseNumber:'pending', nationalId:'pending', licensePhoto:'pending', vehiclePhoto:'pending', nationalIdPhoto:'pending' });
          alert('Registration submitted! Pending admin approval.');
          setMode('login');
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🛍️ ShopHub</h1>
          <p className="text-gray-400">Your ultimate shopping destination</p>
        </div>

        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-2xl">
          {/* Mode Toggle */}
          <div className="flex bg-gray-800 rounded-xl p-1 mb-6">
            {['login','register'].map(m=>(
              <button key={m} onClick={()=>{setMode(m as any);setError('');}} className={`flex-1 py-2 rounded-xl text-sm font-medium transition capitalize ${mode===m?'bg-gray-700 text-white':'text-gray-400 hover:text-white'}`}>{m==='login'?'Sign In':'Sign Up'}</button>
            ))}
          </div>

          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {roles.map(r=>(
              <button key={r.value} onClick={()=>setRole(r.value)} className={`p-3 rounded-xl text-left transition-all ${role===r.value?`bg-gradient-to-r ${r.color} text-white shadow-lg`:'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
                <div className="text-xl mb-1">{r.icon}</div>
                <div className="text-sm font-medium">{r.label}</div>
                <div className="text-xs opacity-70">{r.desc}</div>
              </button>
            ))}
          </div>

          {error && <div className="bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl mb-4 text-sm">{error}</div>}

          <div className="space-y-3">
            {mode==='register' && role !== 'merchant' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">First Name</label>
                  <input value={form.firstName} onChange={e=>set('firstName',e.target.value)} placeholder="First name" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Last Name</label>
                  <input value={form.lastName} onChange={e=>set('lastName',e.target.value)} placeholder="Last name" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500" />
                </div>
              </div>
            )}
            {mode==='register' && role==='merchant' && (
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Business Name</label>
                <input value={form.businessName} onChange={e=>set('businessName',e.target.value)} placeholder="Your business name" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500" />
              </div>
            )}
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Email</label>
              <input type="email" value={form.email} onChange={e=>set('email',e.target.value)} placeholder="Enter your email" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500" />
            </div>
            {mode==='register' && (
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Phone</label>
                <input value={form.phone} onChange={e=>set('phone',e.target.value)} placeholder="+968 9123 4567" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500" />
              </div>
            )}
            {mode==='register' && role==='delivery' && (
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Vehicle Type</label>
                <select value={form.vehicleType} onChange={e=>set('vehicleType',e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-green-500">
                  {['bike','car','van','truck'].map(v=><option key={v} value={v} className="capitalize">{v}</option>)}
                </select>
              </div>
            )}
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Password</label>
              <input type="password" value={form.password} onChange={e=>set('password',e.target.value)} placeholder="••••••••" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500" />
            </div>
            {mode==='register' && (
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Confirm Password</label>
                <input type="password" value={form.confirmPassword} onChange={e=>set('confirmPassword',e.target.value)} placeholder="••••••••" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500" />
              </div>
            )}
          </div>

          {mode==='login' && role==='admin' && (
            <p className="text-xs text-gray-500 mt-2">Default: admin@shophub.com / Admin@123456</p>
          )}

          <button onClick={handleSubmit} disabled={loading} className={`w-full py-3 rounded-xl font-semibold mt-6 transition text-white disabled:opacity-50 bg-gradient-to-r ${roles.find(r=>r.value===role)?.color}`}>
            {loading ? 'Please wait...' : mode==='login' ? `Sign In as ${roles.find(r=>r.value===role)?.label}` : `Create ${roles.find(r=>r.value===role)?.label} Account`}
          </button>
        </div>
      </div>
    </div>
  );
}
