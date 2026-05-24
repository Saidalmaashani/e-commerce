import React from 'react';
import Link from 'next/link';

export default function DeliveryDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Delivery Dashboard</h1>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                🟢 Online
              </button>
              <div className="w-10 h-10 bg-green-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">Today's Earnings</div>
            <div className="mt-2 text-3xl font-bold text-green-600">$156.50</div>
            <div className="mt-2 text-sm text-gray-600">12 deliveries completed</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">Weekly Earnings</div>
            <div className="mt-2 text-3xl font-bold text-green-600">$892.00</div>
            <div className="mt-2 text-sm text-gray-600">72 deliveries</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">Rating</div>
            <div className="mt-2 text-3xl font-bold text-yellow-500">4.9★</div>
            <div className="mt-2 text-sm text-gray-600">Based on 156 ratings</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">Performance Score</div>
            <div className="mt-2 text-3xl font-bold text-blue-600">98%</div>
            <div className="mt-2 text-sm text-gray-600">On-time delivery rate</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Live Map Tracking</h2>
            <div className="h-96 bg-gray-100 rounded-lg border-2 border-gray-300 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-2">🗺️</div>
                <p className="text-gray-600">Map integration will display here</p>
              </div>
            </div>
          </div>

          {/* Active Orders */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Active Orders</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="font-semibold text-gray-900">Order #{2000 + i}</div>
                  <div className="text-sm text-gray-600">📍 Pickup → Drop-off</div>
                  <div className="text-sm font-medium text-green-600 mt-1">$25.00</div>
                  <button className="mt-2 w-full px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/delivery/available-orders" className="px-6 py-3 text-center bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold">
            📦 View Available Orders
          </Link>
          <Link href="/delivery/earnings" className="px-6 py-3 text-center bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold">
            💰 View Earnings
          </Link>
          <Link href="/delivery/rating" className="px-6 py-3 text-center bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 font-semibold">
            ⭐ View Rating
          </Link>
        </div>
      </main>
    </div>
  );
}
