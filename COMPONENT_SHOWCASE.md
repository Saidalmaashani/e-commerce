# Component Showcase - Dark-Themed Shopper Dashboard

## 🎬 Live Components

### 1. **ShopperNav** - Navigation Bar
**Location**: `components/ShopperNav.tsx`

**Features**:
- Sticky gradient navbar with blur backdrop
- Logo with gradient color
- Desktop navigation links
- Search bar (desktop only)
- Notification badge with counter
- Shopping cart with dynamic item count
- Mobile hamburger menu
- Profile icon

**Example Usage**:
```typescript
import ShopperNav from '@/components/ShopperNav';

export default function Page() {
  return <ShopperNav />;
}
```

**Customization**:
- Change logo: Update `ShopHub` text or emoji
- Add links: Edit the navigation array
- Change gradient: Modify `from-blue-500 to-purple-600`

---

### 2. **CartSidebar** - Shopping Cart Panel
**Location**: `components/CartSidebar.tsx`

**Features**:
- Slide-in animation from right
- Backdrop blur overlay
- Item list with images
- Quantity controls (+ / -)
- Remove item button
- Price calculations
- Checkout button
- Empty cart state

**Example Usage**:
```typescript
import CartSidebar from '@/components/CartSidebar';
import { useState } from 'react';

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Cart</button>
      <CartSidebar isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
```

**Props**:
```typescript
interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}
```

---

### 3. **useCartStore** - Cart State Management
**Location**: `store/cartStore.ts`

**Features**:
- Add items to cart
- Remove items
- Update quantities
- Calculate totals
- Get total items count
- Clear entire cart

**Example Usage**:
```typescript
import { useCartStore } from '@/store/cartStore';

export default function ProductCard() {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: 1,
      name: 'Product Name',
      price: 29.99,
      image: '🎧',
    });
  };

  return <button onClick={handleAddToCart}>Add to Cart</button>;
}
```

**Available Methods**:
```typescript
// Add item to cart
addItem(item: Omit<CartItem, 'quantity'>)

// Remove item from cart
removeItem(id: number)

// Update item quantity
updateQuantity(id: number, quantity: number)

// Clear entire cart
clearCart()

// Get total price
getTotalPrice(): number

// Get total items
getTotalItems(): number
```

---

### 4. **Home Dashboard** - Main Page
**Location**: `pages/shopper/pages/Home.tsx`

**Sections**:
1. **Navigation** - ShopperNav component
2. **Cart Sidebar** - CartSidebar component
3. **Hero Banner** - Animated gradient with CTA
4. **Category Filter** - 8 interactive categories
5. **Product Grid** - 12 sample products
6. **Load More** - Pagination button
7. **Footer** - Links and trust badges

**Key Features**:
- Real-time category filtering
- Product cards with animations
- Rating display with star icons
- Price comparison (original vs. current)
- Discount percentage badges
- Favorite toggle (heart icon)
- Responsive grid layout
- Smooth animations throughout

**Customization Points**:
```typescript
// Edit categories
const categories = [
  { id: 'all', name: 'All', icon: '🎯' },
  // Add more...
];

// Edit products
const products = [
  {
    id: 1,
    name: 'Product Name',
    category: 'electronics',
    price: 99.99,
    originalPrice: 149.99,
    rating: 4.8,
    reviews: 2543,
    image: '🎧',
    badge: 'Popular',
    inStock: true,
  },
  // Add more...
];
```

---

### 5. **Cart Page** - Full Cart View
**Location**: `pages/shopper/cart.tsx`

**Features**:
- Full-page cart display
- Order summary panel (sticky on desktop)
- Item detail cards with images
- Quantity controls
- Remove item functionality
- Subtotal, shipping, tax calculations
- Promo code input
- Checkout button
- Continue shopping link
- Empty cart state

**Layout**:
- 2/3 width: Cart items list
- 1/3 width: Order summary (sticky on large screens)

**Responsive**:
- Mobile: Stacked layout (100% width each)
- Tablet: 2 columns with wrapping
- Desktop: Sidebar fixed on right

---

## 🎨 Design System

### Color Palette
```
Dark Backgrounds:
- slate-900: Main background
- slate-800: Secondary background
- slate-700: Cards/elements

Accent Colors:
- blue-500 to purple-600: Primary gradient
- red-500: Badges/alerts
- green-500: Success/discounts
- yellow-400: Ratings

Text:
- white: Primary text
- slate-300: Secondary text
- slate-400: Tertiary/muted text
```

### Typography
```
H1: text-4xl sm:text-5xl lg:text-6xl font-bold
H2: text-2xl font-bold
H3: text-lg font-bold
Body: text-base font-normal
Small: text-sm
Caption: text-xs
```

### Spacing
- Containers: `px-4 sm:px-6 lg:px-8`
- Vertical: `py-8 sm:py-12 lg:py-16`
- Gaps: `gap-4 sm:gap-6`

### Border Radius
- Cards: `rounded-xl` (12px)
- Buttons: `rounded-lg` (8px)
- Inputs: `rounded-lg` (8px)

### Shadows & Borders
- Cards: `border border-slate-600/50`
- Hover: `hover:border-purple-500/50`
- Shadows: `shadow-lg shadow-purple-500/50`

---

## 🚀 Animation Patterns

### Framer Motion
All animations use `framer-motion` library:

**Fade In**:
```typescript
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ delay: 0.1 }}
```

**Slide From Left**:
```typescript
initial={{ opacity: 0, x: -20 }}
animate={{ opacity: 1, x: 0 }}
```

**Scale Hover**:
```typescript
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

**Layout Animation**:
```typescript
layout
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
```

---

## 📱 Responsive Breakpoints

**Mobile First** approach using TailwindCSS:

```typescript
// Base (mobile):
className="w-full px-4"

// Tablet (md: 768px):
className="md:flex md:px-6"

// Desktop (lg: 1024px):
className="lg:grid lg:grid-cols-3 lg:px-8"

// Large (xl: 1280px):
className="xl:grid-cols-4"
```

---

## 🔗 Component Dependencies

```
pages/shopper/pages/Home.tsx
├── ShopperNav (component)
├── CartSidebar (component)
├── useCartStore (hook)
└── Framer Motion, React Icons

components/ShopperNav.tsx
├── useCartStore (hook)
└── React Icons, Framer Motion

components/CartSidebar.tsx
├── useCartStore (hook)
└── Framer Motion, React Icons

pages/shopper/cart.tsx
├── ShopperNav (component)
├── useCartStore (hook)
└── Framer Motion, React Icons
```

---

## 🧪 Testing Tips

**Component Rendering**:
```bash
# Start dev server
npm run dev

# Visit http://localhost:3001/shopper
```

**Cart Functionality**:
1. Add multiple products
2. Check cart count updates
3. Open sidebar - verify items display
4. Update quantities
5. Remove items
6. Visit `/shopper/cart` - verify full page

**Animations**:
- Hover over products → Scale up
- Click category → Filter updates
- Open cart sidebar → Slide in animation
- Navigation links → Hover color change

**Responsiveness**:
- Test on mobile (320px)
- Test on tablet (768px)
- Test on desktop (1024px+)
- Use Chrome DevTools device emulation

---

## 📚 Additional Resources

- [TailwindCSS Docs](https://tailwindcss.com)
- [Framer Motion Docs](https://www.framer.com/motion)
- [React Icons](https://react-icons.github.io/react-icons)
- [Zustand Store](https://github.com/pmndrs/zustand)
- [Next.js Documentation](https://nextjs.org/docs)

---

**Version**: 1.0.0  
**Status**: Production Ready ✅
