# 🎯 START HERE - Quick Guide

Welcome to the Competitive Math Quiz! Follow these steps to get started.

## ⚡ For the Impatient

```bash
# 1. Install dependencies
npm run install:all

# 2. Start backend (keep this running)
npm run dev:backend

# 3. In a NEW terminal, start frontend
npm run dev:frontend

# 4. Open http://localhost:5173 in multiple browsers
```

That's it! You now have a real-time multiplayer math quiz running.

---

## 📖 Full Documentation

Choose your path:

### 🚀 I want to run it locally
→ Read [SETUP.md](./SETUP.md)

### ☁️ I want to deploy it
→ Read [DEPLOYMENT.md](./DEPLOYMENT.md)

### 🛠️ I want to understand the tech stack
→ Read [TECH_STACK.md](./TECH_STACK.md)

### 📋 I want the submission details
→ Read [SUBMISSION.md](./SUBMISSION.md)

### 📚 I want the full README
→ Read [README.md](./README.md)

---

## 🎮 Quick Test

1. **Open 2 browser windows** to http://localhost:5173
2. **Enter different usernames** in each
3. **Solve the math problem** in one window
4. **Watch the magic** - both windows update in real-time!

---

## 🏆 Features at a Glance

✅ Real-time multiplayer  
✅ Fair concurrency handling  
✅ 8 types of math problems  
✅ 3 difficulty levels  
✅ Live leaderboard  
✅ Network resilient  
✅ Responsive design  

---

## 🆘 Having Issues?

### Backend won't start
```bash
cd backend
rm -rf node_modules
npm install
node server.js
```

### Frontend won't start
```bash
cd frontend
rm -rf node_modules
npm install
npm run dev
```

### Can't connect
- Check backend is running (Terminal 1)
- Check frontend is running (Terminal 2)
- Open http://localhost:5173 (NOT 3001)

---

## 📁 Project Structure

```
Quiz/
├── backend/           ← Node.js + Socket.io server
├── frontend/          ← React application
├── README.md          ← Full documentation
├── SETUP.md           ← Local setup guide
├── DEPLOYMENT.md      ← Deployment guide
├── TECH_STACK.md      ← Tech decisions
└── START_HERE.md      ← You are here!
```

---

## 🎯 Next Steps

1. ✅ Get it running locally (above)
2. 🧪 Test multiplayer functionality
3. 🎨 Customize the UI (optional)
4. ☁️ Deploy to production
5. 📤 Submit your work

---

**Need help?** All questions answered in the documentation files above!

**Ready to deploy?** Jump to [DEPLOYMENT.md](./DEPLOYMENT.md)

**Want to hack on it?** Check [TECH_STACK.md](./TECH_STACK.md) for architecture details

---

*Happy quizzing! 🧮*

