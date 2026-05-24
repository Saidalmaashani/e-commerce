import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const [role, setRole] = useState('shopper');

  const handleLogin = () => {
    if (role === 'shopper') router.push('/shopper');
    else if (role === 'merchant') router.push('/merchant');
    else if (role === 'delivery') router.push('/delivery');
    else if (role === 'admin') router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-indigo-600 mb-2 text-center">ECommerce</h1>
        <p className="text-gray-500 text-center mb-8">Sign in to your account</p>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Login as</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="shopper">Shopper</option>
            <option value="merchant">Merchant</option>
            <option value="delivery">Delivery Partner</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <input type="email" placeholder="Email"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        <input type="password" placeholder="Password"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        <button onClick={handleLogin}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
          Sign In
        </button>
      </div>
    </div>
  );
}