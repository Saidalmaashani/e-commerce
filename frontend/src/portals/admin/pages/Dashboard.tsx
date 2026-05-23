import React from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900">Platform Admin Dashboard</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm">Total GMV</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">$2.5M</div>
            <div className="text-green-600 text-sm mt-1">↑ 15% MoM</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm">Active Users</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">48.5K</div>
            <div className="text-green-600 text-sm mt-1">↑ 8% MoM</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm">Orders Today</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">3,240</div>
            <div className="text-green-600 text-sm mt-1">↑ 12% vs yesterday</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm">Revenue Today</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">$45.8K</div>
            <div className="text-green-600 text-sm mt-1">↑ 20% vs yesterday</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm">Platform Health</div>
            <div className="text-3xl font-bold text-green-600 mt-2">99.9%</div>
            <div className="text-green-600 text-sm mt-1">All systems normal</div>
          </div>
        </div>

        {/* Admin Panel Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/admin/users">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg cursor-pointer transition">
              <div className="text-3xl mb-2">👥</div>
              <h3 className="font-semibold text-gray-900">User Management</h3>
              <p className="text-sm text-gray-600 mt-1">Manage all users on platform</p>
            </div>
          </Link>

          <Link href="/admin/merchants">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg cursor-pointer transition">
              <div className="text-3xl mb-2">🏪</div>
              <h3 className="font-semibold text-gray-900">Merchants</h3>
              <p className="text-sm text-gray-600 mt-1">Approve & manage sellers</p>
            </div>
          </Link>

          <Link href="/admin/orders">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg cursor-pointer transition">
              <div className="text-3xl mb-2">📦</div>
              <h3 className="font-semibold text-gray-900">Orders</h3>
              <p className="text-sm text-gray-600 mt-1">View all platform orders</p>
            </div>
          </Link>

          <Link href="/admin/financial">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg cursor-pointer transition">
              <div className="text-3xl mb-2">💰</div>
              <h3 className="font-semibold text-gray-900">Financial</h3>
              <p className="text-sm text-gray-600 mt-1">Revenue & payouts</p>
            </div>
          </Link>

          <Link href="/admin/moderation">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg cursor-pointer transition">
              <div className="text-3xl mb-2">🛡️</div>
              <h3 className="font-semibold text-gray-900">Moderation</h3>
              <p className="text-sm text-gray-600 mt-1">Review flagged content</p>
            </div>
          </Link>

          <Link href="/admin/disputes">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg cursor-pointer transition">
              <div className="text-3xl mb-2">⚖️</div>
              <h3 className="font-semibold text-gray-900">Disputes</h3>
              <p className="text-sm text-gray-600 mt-1">Resolve user disputes</p>
            </div>
          </Link>

          <Link href="/admin/analytics">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg cursor-pointer transition">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold text-gray-900">Analytics</h3>
              <p className="text-sm text-gray-600 mt-1">Platform insights & data</p>
            </div>
          </Link>

          <Link href="/admin/config">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg cursor-pointer transition">
              <div className="text-3xl mb-2">⚙️</div>
              <h3 className="font-semibold text-gray-900">Configuration</h3>
              <p className="text-sm text-gray-600 mt-1">Platform settings</p>
            </div>
          </Link>
        </div>

        {/* Pending Approvals Alert */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
          <h3 className="font-semibold text-blue-900 mb-2">⏳ Pending Approvals</h3>
          <p className="text-sm text-blue-800">
            • 12 merchant applications pending review
            <br />
            • 8 flagged products waiting for decision
            <br />
            • 5 disputes awaiting resolution
          </p>
        </div>
      </main>
    </div>
  );
}
