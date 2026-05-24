# ✅ Deployment Checklist - Render.com

## Pre-Deployment Checks (Local)

- [ ] Code is clean (no uncommitted changes)
  ```bash
  git status
  ```

- [ ] All dependencies are installed
  ```bash
  cd frontend && npm install --legacy-peer-deps
  ```

- [ ] Build works locally
  ```bash
  cd frontend && npm run build
  ```

- [ ] No TypeScript errors
  ```bash
  cd frontend && npm run lint
  ```

- [ ] Test locally with production build
  ```bash
  cd frontend && npm start
  # Visit http://localhost:3000
  ```

- [ ] Push to GitHub
  ```bash
  git add .
  git commit -m "Deploy dark shopper dashboard to Render"
  git push origin main
  ```

## Render.com Setup

- [ ] GitHub account connected to Render
- [ ] Repository authorized
- [ ] Create new Web Service on Render

## Configuration in Render Dashboard

### Build Settings
- [ ] **Build Command**:
  ```
  cd frontend && npm install --legacy-peer-deps && npm run build
  ```

- [ ] **Start Command**:
  ```
  cd frontend && npm start
  ```

- [ ] **Runtime**: Node

- [ ] **Region**: Choose closest region (Oregon recommended)

- [ ] **Plan**: Free (or paid if needed)

### Environment Variables
- [ ] `NEXT_PUBLIC_API_URL` = `http://localhost:3001`
- [ ] `NODE_ENV` = `production`

## Deployment

- [ ] Click "Deploy" button
- [ ] Wait for build to complete (5-10 minutes)
- [ ] Check **Logs** tab for success message
- [ ] Verify no errors in logs

## Post-Deployment Tests

- [ ] Visit live URL
- [ ] Homepage loads at `/`
- [ ] Can navigate to `/shopper`
- [ ] Products display correctly
- [ ] Add to cart works
- [ ] Cart page `/shopper/cart` loads
- [ ] Responsive design works on mobile
- [ ] No console errors (F12)

## Troubleshooting If Build Fails

- [ ] Clear build cache:
  - Settings → Danger Zone → Clear Build Cache
  - Then Redeploy

- [ ] Check logs for specific error:
  - Click Logs tab
  - Search for "ERROR"
  - Look at last 50 lines

- [ ] Verify build command includes `cd frontend &&`

- [ ] Test local build again:
  ```bash
  cd frontend
  rm -rf node_modules .next
  npm install --legacy-peer-deps
  npm run build
  npm start
  ```

- [ ] If still failing, try:
  ```
  Add NODE_OPTIONS=--max_old_space_size=2048
  ```

## Files to Verify Exist

- [ ] `frontend/package.json`
- [ ] `frontend/src/pages/index.tsx`
- [ ] `frontend/src/pages/shopper/index.tsx`
- [ ] `frontend/src/pages/shopper/pages/Home.tsx`
- [ ] `frontend/src/pages/shopper/cart.tsx`
- [ ] `frontend/src/components/ShopperNav.tsx`
- [ ] `frontend/src/components/CartSidebar.tsx`
- [ ] `frontend/src/store/cartStore.ts`
- [ ] `frontend/tailwind.config.js`
- [ ] `frontend/next.config.js`
- [ ] `frontend/.eslintrc.json`

## After Successful Deployment

- [ ] Copy live URL
- [ ] Share with team
- [ ] Monitor logs for issues
- [ ] Set up error tracking (optional)
- [ ] Configure domain (optional)
- [ ] Set up auto-deploy from GitHub (should be automatic)

## Next Steps

1. Deploy backend API (if not done)
2. Update `NEXT_PUBLIC_API_URL` with actual backend URL
3. Add user authentication
4. Set up database
5. Configure payment processing
6. Set up email notifications
7. Add CI/CD pipeline

## Quick Reference

```bash
# Local build test
cd frontend && npm install --legacy-peer-deps && npm run build && npm start

# Check if dependencies are correct
npm list framer-motion zustand react-icons

# Clear everything
cd frontend && rm -rf node_modules .next package-lock.json && npm install --legacy-peer-deps
```

## Support Links

- Render Docs: https://render.com/docs
- Next.js Docs: https://nextjs.org/docs
- Render Status: https://status.render.com
- GitHub Actions: https://github.com/features/actions

---

**Key Point**: Make sure build command includes `cd frontend && ` prefix!

Last Updated: May 24, 2026
