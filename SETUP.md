# 🚀 Quick Setup Guide

Get the Competitive Math Quiz running locally in 5 minutes!

## Prerequisites

- **Node.js** 16+ ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Git**

Check your versions:
```bash
node --version  # Should be v16 or higher
npm --version   # Should be 7 or higher
```

## Quick Start

### Option 1: Automated Setup (Recommended)

```bash
# Install all dependencies
npm run install:all

# Start backend (Terminal 1)
npm run dev:backend

# Start frontend (Terminal 2) - in a new terminal
npm run dev:frontend
```

Then open **http://localhost:5173** in your browser!

### Option 2: Manual Setup

**Terminal 1 - Backend:**
```bash
cd backend
npm install
node server.js
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

### Backend (.env)
Create `backend/.env`:
```env
PORT=3001
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend (.env)
Create `frontend/.env`:
```env
VITE_BACKEND_URL=http://localhost:3001
```

**Note:** For local development, these are the defaults and can be omitted.

## Testing Multiplayer

To test the multiplayer functionality:

1. **Open multiple browser windows/tabs**
   - Window 1: http://localhost:5173
   - Window 2: http://localhost:5173 (incognito/private mode)
   - Window 3: Your phone on same network

2. **Enter different usernames** in each

3. **Solve a problem** in one window

4. **Watch real-time updates** in all windows!

## Troubleshooting

### Port already in use

**Backend (Port 3001):**
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3001 | xargs kill
```

**Frontend (Port 5173):**
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5173 | xargs kill
```

### Module not found

```bash
# Clear node_modules and reinstall
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

### CORS errors

Check that:
1. Backend is running on port 3001
2. Frontend is running on port 5173
3. `FRONTEND_URL` in backend .env matches frontend URL

### Socket.io connection failed

1. Check backend is running (`http://localhost:3001/health` should return JSON)
2. Check browser console for errors
3. Clear browser cache
4. Try incognito/private mode

## Development Tips

### Hot Reload

Both frontend and backend support hot reload:
- **Frontend**: Vite HMR (instant)
- **Backend**: Nodemon restarts on file changes

### View Logs

**Backend**: Terminal 1 shows all Socket.io events and HTTP requests

**Frontend**: Open Browser DevTools → Console

### Testing Different Scenarios

**Test concurrency:**
```bash
# Open 3 browser windows
# Start typing in window 1
# Quickly switch to window 2 and answer
# Winner should be detected correctly
```

**Test network lag:**
```bash
# Chrome DevTools → Network tab
# Throttle to "Slow 3G"
# Server timestamp should still handle fairness
```

**Test reconnection:**
```bash
# Stop backend server (Ctrl+C)
# Frontend should show disconnected
# Restart backend
# Frontend should auto-reconnect
```

## Project Structure

```
Quiz/
├── backend/
│   ├── server.js              # Express + Socket.io server
│   ├── questionGenerator.js   # Math problem generator
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── App.jsx            # Main React component
│   │   ├── App.css            # Styles
│   │   ├── main.jsx           # React entry point
│   │   └── index.css          # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .env
├── README.md
├── DEPLOYMENT.md
└── package.json               # Root scripts
```

## API Testing

### REST Endpoints

```bash
# Health check
curl http://localhost:3001/health

# Current question
curl http://localhost:3001/api/question

# Leaderboard
curl http://localhost:3001/api/leaderboard
```

### WebSocket Events (using browser console)

Open browser console on http://localhost:5173:

```javascript
// Already connected via App.jsx, but to test manually:

// Join with username
socket.emit('join', 'TestUser');

// Submit answer
socket.emit('submit_answer', {
  answer: '42',
  timestamp: Date.now(),
  username: 'TestUser'
});

// Listen for events
socket.on('winner', (data) => console.log('Winner:', data));
socket.on('question', (data) => console.log('New question:', data));
```

## Next Steps

1. ✅ **Working locally?** Great! Try solving some problems
2. 📱 **Test multiplayer** with multiple browsers
3. 🎨 **Customize** - Edit styles in `frontend/src/App.css`
4. 🧮 **Add questions** - Modify `backend/questionGenerator.js`
5. 🚀 **Deploy** - Follow [DEPLOYMENT.md](./DEPLOYMENT.md)

## Common Commands

```bash
# Install dependencies
npm run install:all

# Development
npm run dev:backend     # Start backend with nodemon
npm run dev:frontend    # Start frontend with Vite

# Production
npm run start:backend   # Start backend (no watch)
npm run build:frontend  # Build frontend for production

# Navigate
cd backend              # Backend directory
cd frontend             # Frontend directory
```

## Need Help?

- Check [README.md](./README.md) for full documentation
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help
- Check [TECH_STACK.md](./TECH_STACK.md) for architecture details

## IDE Setup (Optional)

### VS Code Extensions
- ESLint
- Prettier
- ES7+ React/Redux/React-Native snippets
- Auto Rename Tag
- Better Comments

### VS Code Settings
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

---

Happy coding! 🎉 If everything works, you should see a beautiful math quiz interface where multiple users can compete in real-time!

