# Quick Start - Shopper Dashboard

## 🚀 Get Started in 60 Seconds

### 1. Install Dependencies (if not already done)
```bash
cd frontend
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
```
http://localhost:3001/shopper
```

## 📋 What You Get

✅ **Dark-themed dashboard** - Modern, premium look  
✅ **Navigation bar** - With search, notifications, cart  
✅ **Hero banner** - Eye-catching gradient with CTA  
✅ **8 categories** - Filter products instantly  
✅ **12+ products** - Beautiful product cards with ratings  
✅ **Shopping cart** - Full functionality (add/remove/quantity)  
✅ **Cart page** - Dedicated `/shopper/cart` route  
✅ **Smooth animations** - Framer Motion effects throughout  

## 🎯 Try These Actions

1. **Add to Cart**: Click "Add to Cart" button on any product
2. **View Cart**: Click cart icon → see slide-in sidebar
3. **Filter**: Click category buttons to filter products
4. **Favorite**: Click heart icon on products
5. **Cart Page**: Visit `/shopper/cart` for full cart experience

## 📁 Key Files

| File | Purpose |
|------|---------|
| `pages/shopper/pages/Home.tsx` | Main dashboard |
| `components/ShopperNav.tsx` | Navigation bar |
| `components/CartSidebar.tsx` | Slide-in cart |
| `pages/shopper/cart.tsx` | Full cart page |
| `store/cartStore.ts` | Cart state management |

## 💡 Next Steps

- **Connect API**: Replace mock products with real data
- **Add checkout**: Implement payment flow
- **User auth**: Add login/registration
- **Product details**: Create individual product pages

## 🎨 Customization Quick Tips

**Change colors**: Search `from-blue-500 to-purple-600` → update colors  
**Add products**: Edit `products` array in `Home.tsx`  
**Change shipping**: Update `$9.99` in `cart.tsx`  
**Adjust animations**: Modify Framer Motion `transition` properties  

## 📞 Troubleshooting

**Cart not showing items?**  
→ Check browser console for errors  
→ Ensure Zustand store is imported correctly  

**Styling looks off?**  
→ Clear `.next` folder: `rm -rf .next`  
→ Rebuild: `npm run dev`  

**Components not importing?**  
→ Check file paths match `@/components` alias  
→ Verify files exist in `src/components` folder  

---

**Happy shopping! 🛍️**

For detailed documentation, see [SHOPPER_DASHBOARD.md](./SHOPPER_DASHBOARD.md)
