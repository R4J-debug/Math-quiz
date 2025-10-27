import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import './App.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

function App() {
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success', 'error', 'info'
  const [leaderboard, setLeaderboard] = useState([]);
  const [usersCount, setUsersCount] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    // Connect to socket
    const newSocket = io(BACKEND_URL, {
      transports: ['websocket', 'polling']
    });

    setSocket(newSocket);

    // Listen for events
    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.on('question', (data) => {
      setQuestion(data);
      setAnswer('');
      setMessage('');
      if (inputRef.current) {
        inputRef.current.focus();
      }
    });

    newSocket.on('winner', (data) => {
      if (data.username === username) {
        setMessage(`🎉 You won! +${data.points} points!`);
        setMessageType('success');
      } else {
        setMessage(`${data.username} won! Answer was: ${data.correctAnswer}`);
        setMessageType('info');
      }
      setAnswer('');
    });

    newSocket.on('you_won', (data) => {
      setCurrentScore(prev => prev + data.points);
    });

    newSocket.on('wrong_answer', (data) => {
      setMessage('❌ ' + data.message);
      setMessageType('error');
      setTimeout(() => setMessage(''), 2000);
    });

    newSocket.on('too_late', (data) => {
      setMessage(`⏰ Too late! Answer was: ${data.correctAnswer}`);
      setMessageType('info');
    });

    newSocket.on('leaderboard', (data) => {
      setLeaderboard(data);
    });

    newSocket.on('users_count', (count) => {
      setUsersCount(count);
    });

    return () => {
      newSocket.close();
    };
  }, [username]);

  const handleJoin = (e) => {
    e.preventDefault();
    if (username.trim() && socket) {
      socket.emit('join', username.trim());
      setIsJoined(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.trim() && socket && question) {
      socket.emit('submit_answer', {
        answer: answer.trim(),
        timestamp: Date.now(),
        username: username
      });
    }
  };

  if (!isJoined) {
    return (
      <div className="app">
        <div className="join-container">
          <h1>🧮 Competitive Math Quiz</h1>
          <p className="subtitle">Be the first to solve and win!</p>
          <form onSubmit={handleJoin}>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={20}
              autoFocus
            />
            <button type="submit">Join Quiz</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header>
        <h1>🧮 Math Quiz Battle</h1>
        <div className="header-info">
          <span className="user-info">👤 {username}</span>
          <span className="score">🏆 {currentScore} pts</span>
          <span className="users-online">👥 {usersCount} online</span>
        </div>
      </header>

      <main>
        <div className="quiz-section">
          {question && (
            <div className="question-card">
              <div className="difficulty-badge">
                Difficulty: {'⭐'.repeat(question.difficulty)}
              </div>
              <h2 className="question">{question.question}</h2>
              <form onSubmit={handleSubmit}>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Your answer..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  autoFocus
                  autoComplete="off"
                />
                <button type="submit">Submit</button>
              </form>
              {message && (
                <div className={`message ${messageType}`}>
                  {message}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="leaderboard-section">
          <h3>🏆 Top Scores</h3>
          <div className="leaderboard">
            {leaderboard.length === 0 ? (
              <p className="empty-leaderboard">No scores yet. Be the first!</p>
            ) : (
              <ol>
                {leaderboard.map((entry, index) => (
                  <li key={index} className={entry.username === username ? 'current-user' : ''}>
                    <span className="rank">#{index + 1}</span>
                    <span className="username">{entry.username}</span>
                    <span className="score">{entry.score} pts</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </main>

      <footer>
        <p>💡 Tip: Type fast and accurate to win! Questions change after each winner.</p>
      </footer>
    </div>
  );
}

export default App;

