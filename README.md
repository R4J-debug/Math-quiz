# 🧮 Competitive Math Quiz

A real-time multiplayer math quiz game where users compete to solve problems first. Built with React, Node.js, Express, and Socket.io.

## 🎯 Features

- **Real-time Multiplayer**: Multiple users can compete simultaneously
- **Concurrency Handling**: Server-side timestamp validation ensures fair winner detection
- **Dynamic Question Generation**: 8 different types of math problems with 3 difficulty levels
- **High Score Tracking**: Persistent leaderboard showing top 10 players
- **Network Resilience**: Handles varying network speeds with timestamp-based validation
- **Live Updates**: Questions change automatically after each winner

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool (fast dev experience)
- **Socket.io Client** - Real-time WebSocket communication
- **CSS3** - Modern responsive design

### Backend
- **Node.js** - Runtime environment
- **Express** - Web server framework
- **Socket.io** - WebSocket server for real-time bidirectional communication
- **CORS** - Cross-origin resource sharing

## 🏗️ Architecture & Design Decisions

### Concurrency Handling
The server uses a first-come-first-served approach with server-side timestamps:
1. When a correct answer is received, server records timestamp
2. Only the FIRST correct answer is declared winner
3. Subsequent correct answers receive "too late" message
4. Client timestamps are sent but server timestamp is authoritative (prevents cheating)

### Network Conditions
- Socket.io automatically handles reconnections
- Server-side validation ensures fairness regardless of client network speed
- Answer attempts tracked with both client and server timestamps
- Fallback to polling if WebSocket connection fails

### Question Generation
- 8 different problem types (addition, subtraction, multiplication, division, algebra, squares, modulo, mixed)
- 3 difficulty levels (1-3 stars)
- Randomized generation prevents memorization
- Difficulty scales point rewards (difficulty × 10)

### Corners Cut (Time Constraint Notes)

⚠️ **For production, these would need improvement:**

1. **In-Memory Storage**: Currently stores questions and scores in memory
   - **Production**: Use Redis for current question + PostgreSQL for persistent scores
   
2. **No Authentication**: Username is self-declared
   - **Production**: Implement proper auth (JWT, OAuth, etc.)
   
3. **No Rate Limiting**: Users can spam answers
   - **Production**: Add rate limiting per user (e.g., 1 answer per 500ms)
   
4. **No Answer History**: Don't track who got what wrong
   - **Production**: Store full game history for analytics
   
5. **Basic Security**: No input sanitization
   - **Production**: Validate/sanitize all inputs, add helmet.js, implement CSP
   
6. **No Tests**: No unit or integration tests
   - **Production**: Jest for backend, React Testing Library for frontend
   
7. **Simple Leaderboard**: Top 10 only, resets on server restart
   - **Production**: Persistent DB, pagination, time-based leaderboards

## 🚀 Local Development

### Prerequisites
- Node.js 16+ and npm
- Git

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd Quiz
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env if needed
npm run dev
```

Backend runs on `http://localhost:3001`

3. **Frontend Setup** (in a new terminal)
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env to point to your backend URL
npm run dev
```

Frontend runs on `http://localhost:5173`

4. **Open your browser**
   - Go to `http://localhost:5173`
   - Enter a username and start playing!

## 📦 Deployment

### Backend Deployment (Render/Railway)

**Recommended: Railway (Free tier supports WebSockets)**

1. Create account at [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Set root directory to `backend`
5. Add environment variables:
   ```
   PORT=3001
   FRONTEND_URL=https://your-frontend.vercel.app
   NODE_ENV=production
   ```
6. Deploy!

**Alternative: Render**
1. Create account at [render.com](https://render.com)
2. New Web Service → Connect repository
3. Settings:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add environment variables (same as above)

### Frontend Deployment (Vercel)

1. Create account at [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure:
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add environment variable:
   ```
   VITE_BACKEND_URL=https://your-backend.railway.app
   ```
5. Deploy!

### Post-Deployment
1. Update backend `FRONTEND_URL` to your Vercel URL
2. Update frontend `VITE_BACKEND_URL` to your Railway/Render URL
3. Redeploy both if needed

## 🎮 How to Play

1. **Join**: Enter a unique username
2. **Solve**: Read the math problem and type your answer
3. **Submit**: Hit Enter or click Submit
4. **Win**: Be the first with the correct answer to earn points!
5. **Compete**: Climb the leaderboard by solving more problems

## 📊 Question Types

- **Addition**: Simple to complex sums
- **Subtraction**: Difference calculations  
- **Multiplication**: Product calculations
- **Division**: Quotient calculations (always whole numbers)
- **Algebra**: Solve for x
- **Squares**: Calculate powers of 2
- **Modulo**: Remainder calculations
- **Mixed**: Multi-operation problems

## 🔧 API Endpoints

### REST API
- `GET /health` - Health check
- `GET /api/question` - Get current question
- `GET /api/leaderboard` - Get top 10 scores

### WebSocket Events
**Client → Server:**
- `join` - Join with username
- `submit_answer` - Submit answer attempt

**Server → Client:**
- `question` - New question broadcast
- `winner` - Winner announcement
- `you_won` - Personal win notification
- `wrong_answer` - Incorrect answer
- `too_late` - Correct but not first
- `leaderboard` - Updated scores
- `users_count` - Online user count

## 📈 Future Enhancements

- User authentication & profiles
- Private rooms for groups
- Timed challenges (speedrun mode)
- Different game modes (team play, elimination)
- Mobile app (React Native)
- Voice chat during games
- Custom question sets
- Achievements & badges
- Replay/spectator mode

## 📄 License

MIT

## 👨‍💻 Development Time

Approximately 2-3 hours as per requirements:
- Backend setup & question generator: 45 min
- Socket.io concurrency logic: 30 min
- Frontend React app: 45 min
- Styling & UX: 30 min
- Documentation & deployment config: 30 min

---

Built with ❤️ for competitive math enthusiasts!

