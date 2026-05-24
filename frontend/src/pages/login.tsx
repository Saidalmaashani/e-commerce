import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://e-commerce-t702.onrender.com/api/v1';

const roles = [
  { value:'shopper', label:'Shopper', icon:'🛒', color:'from-blue-500 to-cyan-500', desc:'Browse & buy' },
  { value:'merchant', label:'Merchant', icon:'🏪', color:'from-purple-500 to-pink-500', desc:'Sell products' },
  { value:'delivery', label:'Delivery', icon:'🚗', color:'from-green-500 to-teal-500', desc:'Deliver orders' },
  { value:'admin', label:'Admin', icon:'👑', color:'from-orange-500 to-red-500', desc:'Manage platform' },
];

export default function Login() {
  const router = useRouter();
  const [mode, setMode] = useState('login');
  const [role, setRole] = useState('shopper');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ email:'', password:'', confirmPassword:'', firstName:'', lastName:'', phone:'', businessName:'', vehicleType:'bike' });

  const set = (k, v) => setForm(f => ({...f, [k]:v}));

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    window.location.href = `${API.replace('/api/v1', '')}/api/v1/auth/google`;
  };

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
          await axios.post(`${API}/auth/register/merchant`, {
            email:form.email, password:form.password, confirmPassword:form.confirmPassword,
            businessName:form.businessName, businessCategory:'General',
            businessEmail:form.email, phone:form.phone, storeName:form.businessName,
            businessLicense:'pending', nationalId:'pending', bankAccountNumber:'pending',
            bankRoutingNumber:'pending', bankHolderName:form.businessName,
            address:'pending', city:'pending', state:'pending', postalCode:'pending', country:'OM',
          });
          alert('Registration submitted! Pending admin approval.');
          setMode('login');
        } else if (role === 'shopper') {
          const res = await axios.post(`${API}/auth/register/shopper`, {
            email:form.email, password:form.password,
            firstName:form.firstName, lastName:form.lastName, phone:form.phone
          });
          localStorage.setItem('token', res.data.accessToken);
          localStorage.setItem('refreshToken', res.data.refreshToken);
          localStorage.setItem('role', 'shopper');
          localStorage.setItem('user', JSON.stringify(res.data.user));
          router.push('/shopper');
        } else if (role === 'delivery') {
          await axios.post(`${API}/auth/register/delivery`, {
            email:form.email, password:form.password, confirmPassword:form.confirmPassword,
            firstName:form.firstName, lastName:form.lastName, phone:form.phone,
            vehicleType:form.vehicleType, vehicleRegistration:'pending',
            licenseNumber:'pending', nationalId:'pending', licensePhoto:'pending',
            vehiclePhoto:'pending', nationalIdPhoto:'pending',
          });
          alert('Registration submitted! Pending admin approval.');
          setMode('login');
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectedRole = roles.find(r => r.value === role);

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">ShopHub</h1>
          <p className="text-gray-400">Your ultimate shopping destination</p>
        </div>
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-2xl">
          <div className="flex bg-gray-800 rounded-xl p-1 mb-6">
            {['login','register'].map(m=>(
              <button key={m} onClick={()=>{setMode(m);setError('');}} className={`flex-1 py-2 rounded-xl text-sm font-medium transition capitalize ${mode===m?'bg-gray-700 text-white':'text-gray-400 hover:text-white'}`}>
                {m==='login'?'Sign In':'Sign Up'}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 mb-6">
            {roles.map(r=>(
              <button key={r.value} onClick={()=>setRole(r.value)} className={`p-3 rounded-xl text-left transition-all ${role===r.value?`bg-gradient-to-r ${r.color} text-white shadow-lg scale-105`:'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
                <div className="text-xl mb-1">{r.icon}</div>
                <div className="text-sm font-medium">{r.label}</div>
                <div className="text-xs opacity-70">{r.desc}</div>
              </button>
            ))}
          </div>

          {role === 'shopper' && (
            <>
              <button onClick={handleGoogleLogin} disabled={googleLoading} className="w-full flex items-center justify-center gap-3 py-3 bg-white hover:bg-gray-100 text-gray-900 rounded-xl font-semibold transition mb-4 disabled:opacity-50">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {googleLoading ? 'Connecting...' : 'Continue with Google'}
              </button>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-gray-700"/>
                <span className="text-gray-500 text-sm">or</span>
                <div className="flex-1 h-px bg-gray-700"/>
              </div>
            </>
          )}

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
                  {['bike','car','van','truck'].map(v=><option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            )}
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Password</label>
              <input type="password" value={form.password} onChange={e=>set('password',e.target.value)} placeholder="Min 8 chars, 1 uppercase, 1 number" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500" />
            </div>
            {mode==='register' && (
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Confirm Password</label>
                <input type="password" value={form.confirmPassword} onChange={e=>set('confirmPassword',e.target.value)} placeholder="••••••••" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500" />
              </div>
            )}
          </div>

          {mode==='login' && role==='admin' && (
            <p className="text-xs text-gray-500 mt-2 text-center">Default: admin@shophub.com / Admin@123456</p>
          )}

          <button onClick={handleSubmit} disabled={loading} className={`w-full py-3 rounded-xl font-semibold mt-6 transition text-white disabled:opacity-50 bg-gradient-to-r ${selectedRole?.color}`}>
            {loading ? 'Please wait...' : mode==='login' ? `Sign In as ${selectedRole?.label}` : `Create ${selectedRole?.label} Account`}
          </button>
        </div>
      </div>
    </div>
  );
}
