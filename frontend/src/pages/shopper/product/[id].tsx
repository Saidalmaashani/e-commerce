import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const products: Record<string, any> = {
  '1': { id:1, name:'Wireless Headphones Pro', price:79.99, oldPrice:129.99, rating:4.5, reviews:2341, emoji:'🎧', badge:'50% OFF', category:'Electronics', brand:'SoundMax', description:'Experience audio like never before with the SoundMax Wireless Headphones Pro. Featuring 40mm premium drivers, active noise cancellation technology, and an impressive 30-hour battery life. Whether you are commuting, working, or relaxing, these headphones deliver crystal-clear sound with deep bass and crisp highs.', features:['Active Noise Cancellation','30-hour battery life','Bluetooth 5.2','Built-in microphone','Foldable design','USB-C fast charging'], specs:[['Driver Size','40mm'],['Battery','800mAh'],['Connectivity','Bluetooth 5.2'],['Weight','250g']], colors:['Midnight Black','Pearl White','Navy Blue'], stock:45, sold:1250 },
  '2': { id:2, name:'Smart Watch Series X', price:299.99, oldPrice:399.99, rating:4.8, reviews:1893, emoji:'⌚', badge:'NEW', category:'Electronics', brand:'TechWear', description:'The TechWear Smart Watch Series X redefines what a smartwatch can do. With its stunning AMOLED display, advanced health monitoring, and built-in GPS, it is your ultimate fitness companion. Track heart rate, blood oxygen, sleep quality, and over 100 workout modes.', features:['1.9" AMOLED Display','GPS tracking','Heart rate monitor','7-day battery','Water resistant 50m','NFC payments'], specs:[['Display','1.9" AMOLED'],['Battery','7 days'],['Water Resistance','5ATM'],['Connectivity','Bluetooth 5.0']], colors:['Space Black','Silver','Rose Gold'], stock:12, sold:890 },
  '3': { id:3, name:'Premium USB-C Cable', price:12.99, oldPrice:24.99, rating:4.3, reviews:5672, emoji:'🔌', badge:'BEST SELLER', category:'Electronics', brand:'PowerLink', description:'The PowerLink Premium USB-C Cable delivers 100W Power Delivery and 10Gbps data transfer. Built with braided nylon rated for 20,000+ bend cycles for maximum durability.', features:['100W Power Delivery','10Gbps data transfer','Braided nylon','4K video output','2 meter length'], specs:[['Length','2 meters'],['Power','100W'],['Data','10Gbps'],['Material','Braided Nylon']], colors:['Matte Black','Arctic White'], stock:200, sold:5450 },
  '4': { id:4, name:'iPhone 15 Case Ultra', price:19.99, oldPrice:null, rating:4.6, reviews:1234, emoji:'📱', badge:null, category:'Accessories', brand:'ShieldPro', description:'Military-grade drop protection meets sleek minimalist design. The ShieldPro iPhone 15 Case Ultra absorbs shocks from up to 3 meters while remaining slim and lightweight.', features:['3m drop protection','Dual-layer shock absorption','Raised bezels','MagSafe compatible','Wireless charging compatible'], specs:[['Material','Polycarbonate + TPU'],['Drop Protection','3 meters'],['Thickness','1.5mm'],['Weight','45g']], colors:['Clear','Matte Black','Midnight Blue','Forest Green'], stock:78, sold:1180 },
  '5': { id:5, name:'JBL Bluetooth Speaker', price:49.99, oldPrice:79.99, rating:4.7, reviews:4451, emoji:'🔊', badge:'37% OFF', category:'Electronics', brand:'JBL', description:'The JBL Bluetooth Speaker delivers powerful 20W sound in a compact waterproof package. IPX7 rated, perfect for pool parties, beach trips, and outdoor adventures.', features:['20W JBL Pro Sound','IPX7 waterproof','12-hour battery','PartyBoost feature','Built-in speakerphone'], specs:[['Output','20W RMS'],['Battery','12 hours'],['Waterproof','IPX7'],['Bluetooth','5.3']], colors:['Black','Blue','Red','Teal'], stock:5, sold:4420 },
  '6': { id:6, name:'Ergonomic Laptop Stand', price:39.99, oldPrice:null, rating:4.4, reviews:987, emoji:'💻', badge:'TOP RATED', category:'Accessories', brand:'DeskPro', description:'The DeskPro Ergonomic Laptop Stand raises your screen to eye level, eliminating neck and back pain. Premium aluminum alloy dissipates heat while looking stunning on any desk.', features:['6-level height adjustment','360 degree rotation','Aluminum heat dissipation','Anti-slip pads','Portable 1kg','No assembly needed'], specs:[['Material','Aluminum Alloy'],['Height Range','15-29cm'],['Max Load','10kg'],['Weight','1kg']], colors:['Space Gray','Silver'], stock:33, sold:940 },
  '7': { id:7, name:'Mechanical Keyboard RGB', price:89.99, oldPrice:119.99, rating:4.9, reviews:3120, emoji:'⌨️', badge:'HOT', category:'Electronics', brand:'KeyMaster', description:'The KeyMaster Mechanical Keyboard RGB features Cherry MX Red switches for smooth linear keystrokes with per-key RGB lighting. Full aluminum frame ensures premium durability.', features:['Cherry MX Red switches','Per-key RGB 16.8M colors','Full aluminum frame','N-key rollover','USB-C detachable cable','5 onboard profiles'], specs:[['Switch','Cherry MX Red'],['Backlight','Per-key RGB'],['Frame','Aluminum Alloy'],['Connection','USB-C']], colors:['Black/RGB','White/RGB'], stock:0, sold:3100 },
  '8': { id:8, name:'Wireless Mouse Silent', price:29.99, oldPrice:44.99, rating:4.5, reviews:2018, emoji:'🖱️', badge:null, category:'Electronics', brand:'ClickPro', description:'The ClickPro Wireless Mouse Silent reduces click noise by 90%, perfect for offices and quiet environments. Adjustable DPI up to 3200 with ergonomic design for all-day comfort.', features:['90% quieter clicks','3200 DPI adjustable','18-month battery','10m wireless range','Ergonomic design','Plug and play'], specs:[['DPI','800-3200'],['Battery','18 months'],['Range','10 meters'],['Weight','90g']], colors:['Graphite Black','Pearl White','Sky Blue'], stock:67, sold:1980 },
};

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const product = products[id as string] || products['1'];
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setAdded(true);
    setCartCount(c => c + qty);
    setTimeout(() => setAdded(false), 2500);
  };

  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  const savings = product.oldPrice ? (product.oldPrice - product.price).toFixed(2) : 0;
  const images = [product.emoji, '📦', '✨', '🔍'];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/shopper" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center text-sm font-black">S</div>
            <span className="text-xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">ShopHub</span>
          </Link>
          <div className="flex-1"/>
          <Link href="/shopper/cart" className="relative p-2 text-gray-400 hover:text-white transition">
            <span className="text-xl">🛒</span>
            {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">{cartCount}</span>}
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/shopper" className="hover:text-blue-400 transition">Home</Link>
          <span>/</span>
          <span className="text-gray-400">{product.category}</span>
          <span>/</span>
          <span className="text-gray-300 truncate">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-4">
            <div className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-3xl h-96 flex items-center justify-center border border-gray-700/50 overflow-hidden group">
              <div className="absolute inset-0" style={{backgroundImage:'radial-gradient(circle at 30% 30%, rgba(59,130,246,0.08) 0%, transparent 60%)'}}/>
              <span className="text-[130px] select-none group-hover:scale-110 transition-transform duration-500">{images[selectedImage]}</span>
              {product.badge && <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-black px-4 py-2 rounded-2xl">{product.badge}</div>}
              {product.stock === 0 && <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center"><span className="bg-gray-800 text-gray-300 font-black px-6 py-3 rounded-2xl border border-gray-600 text-lg">Out of Stock</span></div>}
              <button onClick={() => setWishlisted(!wishlisted)} className="absolute top-4 right-4 w-11 h-11 bg-gray-900/80 backdrop-blur rounded-2xl flex items-center justify-center text-xl hover:bg-gray-800 transition border border-gray-700/50">
                {wishlisted ? '❤️' : '🤍'}
              </button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)} className={`h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center text-3xl border-2 transition-all hover:scale-105 ${selectedImage===i?'border-blue-500 shadow-lg shadow-blue-500/20':'border-gray-700 hover:border-gray-500'}`}>{img}</button>
              ))}
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-900 rounded-2xl border border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center font-black text-sm">{product.brand[0]}</div>
                <div>
                  <p className="font-black text-white text-sm">{product.brand}</p>
                  <p className="text-gray-500 text-xs">Official Store</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-emerald-400 font-black">{product.sold.toLocaleString()}+</p>
                <p className="text-gray-500 text-xs">units sold</p>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-blue-500/20 text-blue-300 text-xs px-3 py-1.5 rounded-full border border-blue-500/30 font-medium">{product.category}</span>
              {product.stock > 0 && product.stock <= 20 && <span className="bg-red-500/20 text-red-300 text-xs px-3 py-1.5 rounded-full border border-red-500/30 font-medium animate-pulse">🔥 Only {product.stock} left!</span>}
              {product.stock > 20 && <span className="bg-emerald-500/20 text-emerald-300 text-xs px-3 py-1.5 rounded-full border border-emerald-500/30 font-medium">✓ In Stock</span>}
            </div>
            <h1 className="text-3xl font-black text-white leading-tight">{product.name}</h1>
            <div className="flex items-center gap-3">
              <div className="flex">{[1,2,3,4,5].map(s => <span key={s} className={`text-lg ${s <= Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-700'}`}>★</span>)}</div>
              <span className="text-amber-400 font-black">{product.rating}</span>
              <span className="text-gray-500 text-sm">({product.reviews.toLocaleString()} reviews)</span>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-5 border border-gray-700/50">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-black text-white">${product.price}</span>
                {product.oldPrice && <span className="text-gray-500 text-xl line-through">${product.oldPrice}</span>}
              </div>
              {product.oldPrice && (
                <div className="flex items-center gap-3">
                  <span className="bg-emerald-500/20 text-emerald-400 text-sm font-black px-3 py-1 rounded-xl border border-emerald-500/30">{discount}% OFF</span>
                  <span className="text-emerald-400 text-sm">You save ${savings}</span>
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-300 mb-3">Color: <span className="text-white">{product.colors[selectedColor]}</span></p>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((color: string, i: number) => (
                  <button key={i} onClick={() => setSelectedColor(i)} className={`px-5 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${selectedColor===i?'border-blue-500 bg-blue-500/20 text-blue-300 scale-105':'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'}`}>{color}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-300 mb-3">Quantity</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
                  <button onClick={() => setQty(q => Math.max(1, q-1))} className="w-12 h-12 flex items-center justify-center hover:bg-gray-700 transition font-black text-xl">−</button>
                  <span className="w-12 text-center font-black text-lg">{qty}</span>
                  <button onClick={() => setQty(q => Math.min(product.stock||99, q+1))} className="w-12 h-12 flex items-center justify-center hover:bg-gray-700 transition font-black text-xl">+</button>
                </div>
                <span className="text-gray-500 text-sm">{product.stock > 0 ? `${product.stock} available` : 'Out of stock'}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={handleAddToCart} disabled={product.stock===0} className={`flex-1 py-4 rounded-2xl font-black text-lg transition-all ${added?'bg-emerald-600':product.stock===0?'bg-gray-800 text-gray-500 cursor-not-allowed':'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-lg shadow-blue-500/25 hover:scale-[1.02]'}`}>
                {added ? '✓ Added!' : product.stock===0 ? 'Out of Stock' : '🛒 Add to Cart'}
              </button>
              <button disabled={product.stock===0} className={`px-6 py-4 rounded-2xl font-black transition-all ${product.stock===0?'bg-gray-800 text-gray-500 cursor-not-allowed':'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 shadow-lg shadow-orange-500/25 hover:scale-[1.02]'}`}>⚡ Buy Now</button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[['🚚','Free Delivery','Orders over $50'],['🔒','Secure Pay','256-bit SSL'],['↩️','30-Day Returns','Hassle free']].map(([icon,title,desc]) => (
                <div key={title} className="bg-gray-900 border border-gray-800 rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-2">{icon}</div>
                  <p className="text-white text-xs font-bold">{title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden mb-12">
          <div className="flex border-b border-gray-800">
            {[['description','📄','Description'],['features','✨','Features'],['specifications','📊','Specs'],['reviews','⭐','Reviews']].map(([tab,icon,label]) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 flex items-center justify-center gap-2 py-5 text-sm font-bold transition-all ${activeTab===tab?'text-blue-400 border-b-2 border-blue-500 bg-blue-500/5':'text-gray-500 hover:text-gray-300 hover:bg-gray-800/50'}`}>
                <span>{icon}</span><span className="hidden md:inline">{label}</span>
              </button>
            ))}
          </div>
          <div className="p-8">
            {activeTab==='description' && (
              <div className="max-w-3xl">
                <h3 className="text-xl font-black text-white mb-4">About this product</h3>
                <p className="text-gray-300 leading-relaxed text-base mb-6">{product.description}</p>
                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/20 border border-blue-500/20 rounded-2xl p-5">
                  <p className="text-blue-300 font-bold text-sm mb-2">💡 Why customers love it</p>
                  <p className="text-gray-300 text-sm">Rated {product.rating}/5 by {product.reviews.toLocaleString()} verified buyers. One of our best-selling {product.category} products.</p>
                </div>
              </div>
            )}
            {activeTab==='features' && (
              <div>
                <h3 className="text-xl font-black text-white mb-6">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.features.map((feature: string, i: number) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-2xl border border-gray-700/50 hover:border-blue-500/30 transition group">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 font-black text-sm flex-shrink-0">{i+1}</div>
                      <p className="text-gray-200 text-sm leading-relaxed pt-1">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab==='specifications' && (
              <div>
                <h3 className="text-xl font-black text-white mb-6">Technical Specifications</h3>
                <div className="rounded-2xl overflow-hidden border border-gray-700/50">
                  {product.specs.map(([key, val]: [string,string], i: number) => (
                    <div key={i} className={`flex items-center gap-4 px-6 py-4 ${i%2===0?'bg-gray-800/30':'bg-gray-800/60'}`}>
                      <span className="text-gray-400 text-sm w-40 flex-shrink-0 font-medium">{key}</span>
                      <span className="text-white text-sm font-bold">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab==='reviews' && (
              <div>
                <div className="flex items-center gap-8 mb-8 p-6 bg-gradient-to-br from-amber-900/20 to-orange-900/10 border border-amber-500/20 rounded-2xl">
                  <div className="text-center">
                    <div className="text-6xl font-black text-white">{product.rating}</div>
                    <div className="flex justify-center mt-2">{[1,2,3,4,5].map(s => <span key={s} className={`text-xl ${s<=Math.floor(product.rating)?'text-amber-400':'text-gray-600'}`}>★</span>)}</div>
                    <p className="text-gray-400 text-sm mt-1">{product.reviews.toLocaleString()} reviews</p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5,4,3,2,1].map(star => (
                      <div key={star} className="flex items-center gap-3">
                        <span className="text-xs text-gray-400 w-3">{star}</span>
                        <span className="text-amber-400 text-xs">★</span>
                        <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full" style={{width:`${star===5?70:star===4?20:star===3?7:star===2?2:1}%`}}/>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  {[{user:'Ahmed K.',rating:5,comment:'Absolutely amazing quality! Exceeded my expectations completely. Best purchase this year!',date:'May 20, 2026',helpful:24},{user:'Sara M.',rating:4,comment:'Great product, arrived fast and well packaged. Build quality is excellent.',date:'May 18, 2026',helpful:12},{user:'Khalid O.',rating:5,comment:'Exceeded every expectation. Worth every penny! Will definitely buy again.',date:'May 15, 2026',helpful:31}].map((review,i) => (
                    <div key={i} className="p-6 bg-gray-800/40 rounded-2xl border border-gray-700/50 hover:border-gray-600 transition">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center font-black text-sm">{review.user[0]}</div>
                          <div>
                            <p className="font-black text-white">{review.user}</p>
                            <span className="text-emerald-400 text-xs">✓ Verified Purchase</span>
                          </div>
                        </div>
                        <span className="text-gray-500 text-sm">{review.date}</span>
                      </div>
                      <div className="flex mb-3">{[1,2,3,4,5].map(s => <span key={s} className={`text-base ${s<=review.rating?'text-amber-400':'text-gray-700'}`}>★</span>)}</div>
                      <p className="text-gray-300 leading-relaxed mb-4">{review.comment}</p>
                      <button className="text-sm text-gray-500 hover:text-blue-400 transition">👍 Helpful ({review.helpful})</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"/>
            <h2 className="text-2xl font-black text-white">You Might Also Like</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[{id:2,name:'Smart Watch Series X',price:299.99,emoji:'⌚',rating:4.8},{id:5,name:'JBL Bluetooth Speaker',price:49.99,emoji:'🔊',rating:4.7},{id:7,name:'Mechanical Keyboard',price:89.99,emoji:'⌨️',rating:4.9},{id:8,name:'Wireless Mouse',price:29.99,emoji:'🖱️',rating:4.5}].map(p => (
              <Link key={p.id} href={`/shopper/product/${p.id}`}>
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-blue-500/40 hover:shadow-xl transition group cursor-pointer">
                  <div className="text-5xl text-center mb-3 group-hover:scale-110 transition-transform">{p.emoji}</div>
                  <h3 className="font-bold text-white text-sm mb-2 line-clamp-2">{p.name}</h3>
                  <div className="flex items-center gap-1 mb-2"><span className="text-amber-400 text-xs">★ {p.rating}</span></div>
                  <p className="text-blue-400 font-black">${p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
