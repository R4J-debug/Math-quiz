const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { generateQuestion, checkAnswer } = require('./questionGenerator');

const app = express();
const httpServer = createServer(app);

// CORS configuration for Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(cors());
app.use(express.json());

// In-memory storage (for MVP - would use Redis/PostgreSQL in production)
let currentQuestion = generateQuestion();
let highScores = []; // Array of {username, score, timestamp}
let connectedUsers = new Map(); // socketId -> {username, score}
let answerAttempts = []; // Track who answered when

// REST endpoints
app.get('/health', (req, res) => {
  res.json({ status: 'ok', question: currentQuestion.id });
});

app.get('/api/question', (req, res) => {
  res.json({
    id: currentQuestion.id,
    question: currentQuestion.question,
    difficulty: currentQuestion.difficulty
  });
});

app.get('/api/leaderboard', (req, res) => {
  const topScores = highScores
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
  res.json(topScores);
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Send current question immediately
  socket.emit('question', {
    id: currentQuestion.id,
    question: currentQuestion.question,
    difficulty: currentQuestion.difficulty
  });

  // Send current leaderboard
  socket.emit('leaderboard', getTopScores());

  // User joins with username
  socket.on('join', (username) => {
    connectedUsers.set(socket.id, { username, score: 0 });
    io.emit('users_count', connectedUsers.size);
    console.log(`${username} joined. Total users: ${connectedUsers.size}`);
  });

  // Handle answer submission
  socket.on('submit_answer', (data) => {
    const { answer, timestamp, username } = data;
    const user = connectedUsers.get(socket.id);
    
    if (!user && username) {
      connectedUsers.set(socket.id, { username, score: 0 });
    }

    const userInfo = connectedUsers.get(socket.id) || { username, score: 0 };
    
    // Check if answer is correct
    const isCorrect = checkAnswer(currentQuestion, answer);
    
    if (isCorrect) {
      // Record the attempt with server timestamp
      const serverTimestamp = Date.now();
      answerAttempts.push({
        socketId: socket.id,
        username: userInfo.username,
        clientTimestamp: timestamp,
        serverTimestamp: serverTimestamp,
        answer: answer
      });

      // Check if this is the first correct answer
      if (answerAttempts.length === 1) {
        // This is the winner!
        const winner = userInfo.username;
        const points = currentQuestion.difficulty * 10;
        
        // Update score
        userInfo.score += points;
        connectedUsers.set(socket.id, userInfo);
        
        // Update high scores
        updateHighScores(winner, userInfo.score);
        
        // Announce winner to all clients
        io.emit('winner', {
          username: winner,
          answer: answer,
          points: points,
          correctAnswer: currentQuestion.answer
        });

        // Generate new question after 3 seconds
        setTimeout(() => {
          currentQuestion = generateQuestion();
          answerAttempts = [];
          
          io.emit('question', {
            id: currentQuestion.id,
            question: currentQuestion.question,
            difficulty: currentQuestion.difficulty
          });
          
          io.emit('leaderboard', getTopScores());
        }, 3000);

        // Notify the winner
        socket.emit('you_won', { points });
      } else {
        // Someone else already answered correctly
        socket.emit('too_late', {
          correctAnswer: currentQuestion.answer
        });
      }
    } else {
      // Wrong answer
      socket.emit('wrong_answer', {
        message: 'Incorrect answer, try again!'
      });
    }
  });

  socket.on('disconnect', () => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      console.log(`${user.username} disconnected`);
      connectedUsers.delete(socket.id);
      io.emit('users_count', connectedUsers.size);
    }
  });
});

function updateHighScores(username, score) {
  // Update or add user's high score
  const existingIndex = highScores.findIndex(s => s.username === username);
  
  if (existingIndex >= 0) {
    if (highScores[existingIndex].score < score) {
      highScores[existingIndex].score = score;
      highScores[existingIndex].timestamp = Date.now();
    }
  } else {
    highScores.push({
      username,
      score,
      timestamp: Date.now()
    });
  }
}

function getTopScores() {
  return highScores
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
}

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`First question: ${currentQuestion.question}`);
});

