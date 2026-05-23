import React from 'react';
import Link from 'next/link';

export default function MerchantDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
              <p className="text-gray-500 mt-1">Welcome back to your merchant portal</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                📦 New Store
              </button>
              <div className="w-10 h-10 bg-indigo-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">Total Revenue</div>
            <div className="mt-2 text-3xl font-bold text-gray-900">$12,543</div>
            <div className="mt-2 text-green-600 text-sm">↑ 12% from last month</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">Total Orders</div>
            <div className="mt-2 text-3xl font-bold text-gray-900">456</div>
            <div className="mt-2 text-green-600 text-sm">↑ 8% from last month</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">Conversion Rate</div>
            <div className="mt-2 text-3xl font-bold text-gray-900">3.24%</div>
            <div className="mt-2 text-red-600 text-sm">↓ 0.5% from last month</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">Average Rating</div>
            <div className="mt-2 text-3xl font-bold text-gray-900">4.8★</div>
            <div className="mt-2 text-green-600 text-sm">Based on 234 reviews</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Orders Section */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
              <Link href="/merchant/orders" className="text-indigo-600 hover:text-indigo-700">
                View All →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-4 py-2 font-semibold text-gray-700">Order ID</th>
                    <th className="text-left px-4 py-2 font-semibold text-gray-700">Customer</th>
                    <th className="text-left px-4 py-2 font-semibold text-gray-700">Total</th>
                    <th className="text-left px-4 py-2 font-semibold text-gray-700">Status</th>
                    <th className="text-left px-4 py-2 font-semibold text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono text-gray-900">#ORD-{10001 + i}</td>
                      <td className="px-4 py-3 text-gray-700">Customer {i}</td>
                      <td className="px-4 py-3 text-gray-900 font-semibold">${(i * 100).toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          i % 2 === 0
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {i % 2 === 0 ? 'Delivered' : 'Processing'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">Jan {10 + i}, 2024</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/merchant/products/new" className="block px-4 py-2 text-center bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  + Add Product
                </Link>
                <Link href="/merchant/orders" className="block px-4 py-2 text-center border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  Manage Orders
                </Link>
                <Link href="/merchant/wallet" className="block px-4 py-2 text-center border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  View Wallet
                </Link>
              </div>
            </div>

            {/* Alerts */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Stock Alerts</h3>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• 3 products low stock</li>
                <li>• 1 product out of stock</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
