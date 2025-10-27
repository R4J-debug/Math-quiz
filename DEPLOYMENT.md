# 🚀 Deployment Guide

This guide walks through deploying the Competitive Math Quiz application.

## Architecture Overview

```
Frontend (Vercel) ←→ Backend (Railway/Render)
     React              Node.js + Socket.io
```

## Prerequisites

- GitHub account with repository access
- Vercel account (free)
- Railway account (free) OR Render account (free)

## Step 1: Prepare Repository

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit: Competitive Math Quiz"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

## Step 2: Deploy Backend (Railway - Recommended)

**Why Railway?** Free tier with WebSocket support, no cold starts.

### Railway Deployment

1. Go to [railway.app](https://railway.app)
2. Sign up/Login with GitHub
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose your repository
6. Click **"Add variables"** and add:
   ```
   PORT=3001
   FRONTEND_URL=https://your-app.vercel.app
   NODE_ENV=production
   ```
7. In Settings:
   - **Root Directory**: `backend`
   - **Start Command**: `npm start` (or leave default)
8. Click **"Deploy"**
9. Copy your deployment URL (e.g., `https://your-app.up.railway.app`)

### Alternative: Render Deployment

1. Go to [render.com](https://render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: math-quiz-backend
   - **Root Directory**: `backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   ```
   FRONTEND_URL=https://your-app.vercel.app
   NODE_ENV=production
   ```
6. Click **"Create Web Service"**
7. Copy your deployment URL

## Step 3: Deploy Frontend (Vercel)

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click **"Add New"** → **"Project"**
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
6. Add Environment Variable:
   ```
   VITE_BACKEND_URL=https://your-backend.up.railway.app
   ```
   (Use your Railway or Render URL from Step 2)
7. Click **"Deploy"**
8. Copy your deployment URL (e.g., `https://your-app.vercel.app`)

## Step 4: Update Backend Environment

Now that you have your Vercel frontend URL, update the backend:

### On Railway:
1. Go to your backend project
2. Click **"Variables"**
3. Update `FRONTEND_URL` to your Vercel URL
4. Redeploy (automatic)

### On Render:
1. Go to your web service
2. Click **"Environment"**
3. Update `FRONTEND_URL` to your Vercel URL
4. Save changes (triggers redeploy)

## Step 5: Test Your Deployment

1. Open your Vercel URL in multiple browser windows/tabs
2. Enter different usernames in each
3. Try solving a math problem
4. Verify:
   - ✅ Real-time question updates
   - ✅ Winner detection works
   - ✅ Leaderboard updates
   - ✅ Multiple users can compete

## Troubleshooting

### Frontend can't connect to backend

**Problem**: "Failed to connect" or infinite loading

**Solution**:
1. Check browser console for errors
2. Verify `VITE_BACKEND_URL` in Vercel environment variables
3. Make sure backend is running (check Railway/Render logs)
4. Verify CORS settings in `backend/server.js`

### WebSocket connection fails

**Problem**: Polling works but WebSocket fails

**Solution**:
1. Ensure backend platform supports WebSockets (Railway ✅, Render ✅)
2. Check backend logs for WebSocket errors
3. Socket.io automatically falls back to polling if needed

### Questions not updating

**Problem**: Question stays the same forever

**Solution**:
1. Check backend logs for errors
2. Verify question generator is working
3. Check if Socket.io events are being emitted

### Leaderboard empty after redeploy

**Expected behavior**: Using in-memory storage resets on restart

**Production fix**: Implement Redis/PostgreSQL for persistence

## Environment Variables Reference

### Backend
```env
PORT=3001                                    # Server port
FRONTEND_URL=https://your-app.vercel.app    # Frontend URL for CORS
NODE_ENV=production                          # Environment
```

### Frontend
```env
VITE_BACKEND_URL=https://your-backend.up.railway.app  # Backend WebSocket URL
```

## Monitoring

### Railway
- View logs: Project → Deployments → Click deployment → Logs
- Metrics: Project → Metrics tab

### Render
- View logs: Service → Logs tab
- Metrics: Service → Metrics tab

### Vercel
- View logs: Project → Deployments → Click deployment → Function logs
- Analytics: Project → Analytics tab

## Updating the Application

### Backend Updates
1. Push changes to GitHub
2. Railway/Render auto-deploys (if enabled)
3. Or manually trigger deployment in dashboard

### Frontend Updates
1. Push changes to GitHub
2. Vercel auto-deploys from main branch
3. Or manually trigger in Vercel dashboard

## Cost Considerations

### Free Tier Limits

**Railway**:
- $5 free credit/month
- ~500 hours of usage
- Sufficient for this project

**Render**:
- Free tier available
- Spins down after 15 min inactivity (cold starts)
- 750 hours/month free

**Vercel**:
- 100 GB bandwidth/month
- 100 builds/day
- More than enough for personal projects

## Production Checklist

Before going to production:
- [ ] Set up proper database (PostgreSQL/Redis)
- [ ] Implement authentication
- [ ] Add rate limiting
- [ ] Set up monitoring (Sentry, LogRocket)
- [ ] Configure custom domain
- [ ] Add SSL certificates (auto on Vercel/Railway/Render)
- [ ] Set up CI/CD pipeline
- [ ] Add comprehensive tests
- [ ] Implement logging
- [ ] Add analytics

## Need Help?

- Backend not starting? Check logs in Railway/Render dashboard
- Frontend build failing? Check Vercel build logs
- WebSocket issues? Socket.io will fall back to polling automatically
- CORS errors? Verify `FRONTEND_URL` matches your Vercel domain

---

Good luck with your deployment! 🚀

