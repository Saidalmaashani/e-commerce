import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 backdrop-blur-md border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">⚡</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ShopHub
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-slate-300 hover:text-white transition-colors">About</a>
              <a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a>
              <a href="#contact" className="text-slate-300 hover:text-white transition-colors">Contact</a>
            </div>
            <Link href="/shopper" className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg font-semibold transition-all duration-200">
              Shop Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Welcome to <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">ShopHub</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8">
              Discover an amazing selection of products with incredible deals. Fast shipping, easy returns, and premium customer service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shopper" className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg font-bold text-center transition-all duration-200">
                Start Shopping
              </Link>
              <Link href="#about" className="px-8 py-4 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 rounded-lg font-bold text-center transition-all duration-200">
                Learn More
              </Link>
            </div>
          </div>
          <div className="text-center">
            <div className="text-9xl">🛍️</div>
            <p className="text-slate-400 mt-4">Ready to shop?</p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center">Why Choose ShopHub?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: '🚀', title: 'Fast Shipping', desc: 'Get your orders delivered quickly and safely' },
            { icon: '💰', title: 'Great Prices', desc: 'Find amazing deals on thousands of products' },
            { icon: '✨', title: 'Premium Quality', desc: 'All products are carefully selected and verified' },
          ].map((feature) => (
            <div key={feature.title} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-8 hover:border-purple-500/50 transition-all duration-300">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl text-blue-100 mb-8">Browse thousands of products and enjoy exclusive deals</p>
          <Link href="/shopper" className="inline-block px-8 py-4 bg-white text-purple-600 font-bold rounded-lg hover:bg-blue-50 transition-all duration-200">
            Visit Our Store
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 mt-20 py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800/50 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {[
              { title: 'About', items: ['About Us', 'Careers', 'Blog'] },
              { title: 'Help', items: ['Contact Us', 'FAQ', 'Support'] },
              { title: 'Legal', items: ['Privacy', 'Terms', 'Cookies'] },
              { title: 'Follow', items: ['Twitter', 'Facebook', 'Instagram'] },
            ].map((section) => (
              <div key={section.title}>
                <h4 className="font-bold mb-3">{section.title}</h4>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item}>
                      <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-700/50 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">© 2026 ShopHub. All rights reserved.</p>
            <div className="flex gap-4 mt-4 sm:mt-0">
              <span className="text-2xl">🔒</span>
              <span className="text-2xl">✓</span>
              <span className="text-2xl">🚀</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}