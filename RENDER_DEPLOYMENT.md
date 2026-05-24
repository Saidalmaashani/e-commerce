# Deploy to Render.com - Quick Guide

## Prerequisites
- GitHub account with repository
- Render.com account

## Step-by-Step Deployment

### 1. Push Code to GitHub
```bash
git add .
git commit -m "Deploy dark shopper dashboard"
git push origin main
```

### 2. Connect GitHub to Render
1. Go to [render.com](https://render.com)
2. Click **New** → **Web Service**
3. Select your GitHub repository
4. Authorize GitHub connection

### 3. Configure Service Settings

**Service Name**: `ecommerce-frontend`

**Environment**: `Node`

**Region**: `Oregon` (or closest to you)

**Plan**: `Free`

**Build Command**:
```
cd frontend && npm install --legacy-peer-deps && npm run build
```

**Start Command**:
```
cd frontend && npm start
```

### 4. Environment Variables

Add these environment variables in Render dashboard:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:3001` (or your backend URL) |
| `NODE_ENV` | `production` |

### 5. Deploy

Click **Deploy** button and wait for build to complete (~5-10 minutes)

## Troubleshooting Build Errors

### Error: "Exited with status 1"

**Solution 1 - Clear Build Cache**:
```
In Render Dashboard:
1. Go to your service
2. Settings → Danger Zone
3. Clear build cache
4. Redeploy
```

**Solution 2 - Check Build Logs**:
```
In Render Dashboard:
1. Go to Logs tab
2. Look for specific error messages
3. Check NODE_ENV and NEXT_PUBLIC_API_URL are set
```

**Solution 3 - Fix Dependencies**:
```bash
# Ensure package.json has all dependencies
npm install --save framer-motion react-icons zustand

# In Render build command, use legacy-peer-deps
npm install --legacy-peer-deps && npm run build
```

### Error: Module not found

**Check that these files exist**:
- ✅ `frontend/src/components/ShopperNav.tsx`
- ✅ `frontend/src/components/CartSidebar.tsx`
- ✅ `frontend/src/store/cartStore.ts`
- ✅ `frontend/src/pages/shopper/pages/Home.tsx`
- ✅ `frontend/src/pages/shopper/cart.tsx`

### TypeScript Errors

**Solution**:
- Check for missing imports
- Ensure all types are properly defined
- Run locally: `npm run build` to test

## Monitor Deployment

After deployment:
1. Check live URL in Render dashboard
2. Visit `https://your-service.onrender.com`
3. Check `/shopper` route for dashboard
4. Monitor logs for errors

## Local Build Test

Before deploying, test the build locally:

```bash
cd frontend

# Clean build
rm -rf .next
npm run build

# Test production server
npm start

# Visit http://localhost:3000
```

## Common Issues

| Issue | Solution |
|-------|----------|
| Blank page | Check browser console for errors |
| Cart not working | Ensure Zustand store is imported |
| Styling looks wrong | Clear cache, check TailwindCSS config |
| 404 on routes | Verify Next.js routing structure |

## Next Steps

1. ✅ Deploy frontend to Render
2. Deploy backend API to Render or another service
3. Update `NEXT_PUBLIC_API_URL` with backend URL
4. Connect database
5. Implement authentication
6. Add payment processing

## Support

- Render Documentation: https://render.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
- Check Render status: https://status.render.com
