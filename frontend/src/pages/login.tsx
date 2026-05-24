import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const [role, setRole] = useState('shopper');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const roles = [
    { value: 'shopper', label: '🛒 Shopper', color: 'from-blue-500 to-cyan-500' },
    { value: 'merchant', label: '🏪 Merchant', color: 'from-purple-500 to-pink-500' },
    { value: 'delivery', label: '🚗 Delivery', color: 'from-green-500 to-teal-500' },
    { value: 'admin', label: '👑 Admin', color: 'from-orange-500 to-red-500' },
  ];

  const handleLogin = () => {
    router.push(`/${role}`);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🛍️ ShopHub</h1>
          <p className="text-gray-400">Your ultimate shopping destination</p>
        </div>

        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-2xl">
          <h2 className="text-xl font-semibold text-white mb-6">Sign In</h2>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {roles.map((r) => (
              <button
                key={r.value}
                onClick={() => setRole(r.value)}
                className={`p-3 rounded-xl text-sm font-medium transition-all ${
                  role === r.value
                    ? `bg-gradient-to-r ${r.color} text-white shadow-lg scale-105`
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-500/25"
          >
            Sign In →
          </button>

          <p className="text-center text-gray-500 text-sm mt-4">
            Don't have an account?{' '}
            <span className="text-blue-400 cursor-pointer hover:text-blue-300">Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
}