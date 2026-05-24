# Render Deployment Troubleshooting Guide

## Understanding the Error

```
Exited with status 1 while building your code.
```

This means the build command failed. The logs show:
```
==> Running build command 'npm install --legacy-peer-deps && npm run build'...
```

## Why It's Failing

The build is failing because the command is running from the **project root** instead of the **frontend directory**.

## ✅ Fix #1: Update Build Command in Render Dashboard

1. **Go to Dashboard** → **Settings** → **Build Command**

2. **Replace with**:
```bash
cd frontend && npm install --legacy-peer-deps && npm run build
```

Or for even better compatibility:
```bash
cd frontend && npm ci --legacy-peer-deps && npm run build
```

3. **Replace Start Command with**:
```bash
cd frontend && npm start
```

## ✅ Fix #2: Update Environment Variables

Make sure these are set in Render Dashboard:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
NODE_ENV=production
```

## ✅ Fix #3: Clear Build Cache & Redeploy

1. Go to **Service Settings** → **Danger Zone**
2. Click **Clear Build Cache**
3. Click **Redeploy**

## ✅ Fix #4: Verify render.yaml is Correct

The `render.yaml` file at project root should have:

```yaml
services:
  - type: web
    name: ecommerce-frontend
    runtime: node
    region: oregon
    plan: free
    buildCommand: cd frontend && npm install --legacy-peer-deps && npm run build
    startCommand: cd frontend && npm start
    rootDir: frontend
```

Important: The `rootDir: frontend` tells Render where your app is.

## ✅ Fix #5: Local Build Test

Before redeploying, test the build locally:

```bash
# Simulate Render build
cd frontend
npm cache clean --force
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run build

# If build succeeds, try running it
npm start
```

If this works locally, it should work on Render.

## Common Build Errors & Solutions

### Error: Cannot find module '@/components/ShopperNav'

**Solution**: Check that all files exist:
```bash
# These must exist:
ls frontend/src/components/ShopperNav.tsx
ls frontend/src/components/CartSidebar.tsx
ls frontend/src/store/cartStore.ts
ls frontend/src/pages/shopper/pages/Home.tsx
```

### Error: TypeScript Compilation Failed

**Solution**: Add to build command:
```bash
cd frontend && npm install --legacy-peer-deps && npm run build -- --no-linter
```

Or disable TypeScript errors:
Create `frontend/next.config.js`:
```javascript
module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
};
```

### Error: Out of Memory

**Solution**: Increase Node memory in environment:
```
NODE_OPTIONS=--max_old_space_size=2048
```

Add this as an environment variable in Render.

## Step-by-Step Deploy Instructions

### 1. **Ensure all code is committed**
```bash
git status  # Should be clean
git add .
git commit -m "Fix Render deployment"
git push origin main
```

### 2. **Delete current Render service** (optional)
If the service is stuck, delete and recreate:
- Go to Settings → Delete Service

### 3. **Create new service on Render**
- Click **New** → **Web Service**
- Connect GitHub repo
- Fill in settings:

| Setting | Value |
|---------|-------|
| **Name** | ecommerce-frontend |
| **Runtime** | Node |
| **Build Command** | `cd frontend && npm install --legacy-peer-deps && npm run build` |
| **Start Command** | `cd frontend && npm start` |
| **Region** | Oregon |
| **Plan** | Free |

### 4. **Add Environment Variables**
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NODE_ENV=production
```

### 5. **Click Deploy**

Watch the logs in **Logs** tab.

### 6. **Wait for completion**

You should see:
```
✓ Build succeeded
✓ Build complete
✓ Deployment live
```

## How to Monitor Logs

While deploying:
1. Go to your service in Render
2. Click **Logs** tab
3. Watch for errors
4. Most common errors are shown

## After Successful Deployment

1. **Visit your URL**: `https://your-service.onrender.com`
2. **Test the app**:
   - Homepage loads ✓
   - Click "Shop Now" ✓
   - See products on `/shopper` ✓
   - Add items to cart ✓
   - Visit `/shopper/cart` ✓

## Debugging Production

If deployment succeeds but app has issues:

1. **Check browser console** (F12) for errors
2. **Check Render logs** for warnings
3. **Test locally** with same versions

## Getting Help

- **Render Status**: https://status.render.com
- **Next.js Issues**: Check `.next/` folder exists
- **Dependencies**: Run `npm ls` to see dependency tree
- **Clear Everything**:
```bash
cd frontend
rm -rf node_modules .next package-lock.json
npm install --legacy-peer-deps
npm run build
```

---

**Most Common Fix**: Update build command to include `cd frontend && ` prefix!
