import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiSearch, FiBell, FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { useCartStore } from '@/store/cartStore';

export default function ShopperNav() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItems = useCartStore((state) => state.getTotalItems());

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 backdrop-blur-md border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-lg">⚡</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hidden sm:inline">
              ShopHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/shopper/home" className="text-slate-300 hover:text-white transition-colors duration-200 text-sm font-medium">
              Home
            </Link>
            <Link href="/shopper/browse" className="text-slate-300 hover:text-white transition-colors duration-200 text-sm font-medium">
              Browse
            </Link>
            <Link href="/shopper/orders" className="text-slate-300 hover:text-white transition-colors duration-200 text-sm font-medium">
              Orders
            </Link>
            <Link href="/shopper/deals" className="text-slate-300 hover:text-white transition-colors duration-200 text-sm font-medium">
              Deals
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-xs mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-slate-700/50 text-white placeholder-slate-400 rounded-lg py-2 pl-4 pr-10 border border-slate-600 focus:border-blue-500 focus:outline-none transition-all duration-200"
              />
              <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            {/* Search Icon Mobile */}
            <button className="md:hidden text-slate-300 hover:text-white transition-colors duration-200">
              <FiSearch size={20} />
            </button>

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-slate-300 hover:text-white transition-colors duration-200 relative hidden sm:block"
            >
              <FiBell size={20} />
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                3
              </span>
            </motion.button>

            {/* Cart */}
            <Link href="/shopper/cart" className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-slate-300 hover:text-white transition-colors duration-200"
              >
                <FiShoppingCart size={20} />
                {cartItems > 0 && (
                  <motion.span
                    layoutId="cart-badge"
                    className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white text-xs flex items-center justify-center font-bold"
                  >
                    {cartItems}
                  </motion.span>
                )}
              </motion.button>
            </Link>

            {/* Profile */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-slate-300 hover:text-white transition-colors duration-200 hidden sm:block"
            >
              <FiUser size={20} />
            </motion.button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-slate-300 hover:text-white transition-colors duration-200"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-slate-700/50"
          >
            <div className="flex flex-col gap-3">
              <Link href="/shopper/home" className="text-slate-300 hover:text-white px-4 py-2">
                Home
              </Link>
              <Link href="/shopper/browse" className="text-slate-300 hover:text-white px-4 py-2">
                Browse
              </Link>
              <Link href="/shopper/orders" className="text-slate-300 hover:text-white px-4 py-2">
                Orders
              </Link>
              <Link href="/shopper/deals" className="text-slate-300 hover:text-white px-4 py-2">
                Deals
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
