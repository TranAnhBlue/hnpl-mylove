import { useState, useEffect, useRef } from 'react';
import './MiniGames.css';
import AnniversaryEditionBadge from './AnniversaryEditionBadge';

// Game 1: Tìm Trái Tim (Whack-a-Mole)
function HeartCatchGame({ onClose, onWin }) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [activeHearts, setActiveHearts] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
      if (score >= 20) onWin?.('Bắt được ' + score + ' trái tim! 💝');
    }
  }, [timeLeft, gameOver, score, onWin]);

  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(() => {
        const newHeart = {
          id: Date.now(),
          position: Math.floor(Math.random() * 9)
        };
        setActiveHearts(prev => [...prev, newHeart]);
        setTimeout(() => {
          setActiveHearts(prev => prev.filter(h => h.id !== newHeart.id));
        }, 1000);
      }, 800);
      return () => clearInterval(interval);
    }
  }, [gameOver]);

  const catchHeart = (heartId) => {
    setActiveHearts(prev => prev.filter(h => h.id !== heartId));
    setScore(score + 1);
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h3>💝 Gom tim cho năm thứ hai</h3>
        <div className="game-stats">
          <span>⏱️ {timeLeft}s</span>
          <span>💖 {score}</span>
        </div>
      </div>
      <div className="heart-grid">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="heart-hole">
            {activeHearts.find(h => h.position === i) && (
              <div 
                className="heart-pop"
                onClick={() => catchHeart(activeHearts.find(h => h.position === i).id)}
              >
                💖
              </div>
            )}
          </div>
        ))}
      </div>
      {gameOver && (
        <div className="game-result">
          <h4>{score >= 20 ? '🎉 Xuất sắc!' : '💪 Cố gắng lên!'}</h4>
          <p>Điểm: {score}</p>
          <button onClick={onClose}>Đóng</button>
        </div>
      )}
    </div>
  );
}

// Game 2: Câu Đố Tình Yêu
function LoveQuizGame({ onClose, onWin }) {
  const questions = [
    { q: 'Ngày câu chuyện của chúng mình bắt đầu?', a: ['27/11/2024', '27/11/2025', '27/12/2025'], correct: 1 },
    { q: 'Chuyến du lịch đầu tiên của hai đứa ở đâu?', a: ['Sa Pa', 'Đà Lạt', 'Hạ Long'], correct: 0 },
    { q: 'Ai đã nói lời tỏ tình?', a: ['Phương Linh', 'Đức Anh', 'Cả hai cùng lúc'], correct: 1 },
    { q: 'Điều ước cho chặng đường tiếp theo là gì?', a: ['Qua 10 mùa hè', 'Qua 100 cái Tết', 'Đi khắp 10 nơi'], correct: 1 },
    { q: 'Kỷ niệm một năm của mình là ngày nào?', a: ['27/11/2026', '27/12/2026', '27/11/2027'], correct: 0 }
  ];

  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (index) => {
    if (index === questions[currentQ].correct) {
      setScore(score + 1);
    }
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
      if (score + (index === questions[currentQ].correct ? 1 : 0) >= 3) {
        onWin?.('Trả lời đúng ' + (score + 1) + '/' + questions.length + ' câu! 🎓');
      }
    }
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h3>🎯 Hiểu nhau sau một năm</h3>
        <div className="game-stats">
          <span>Câu {currentQ + 1}/{questions.length}</span>
          <span>✅ {score}</span>
        </div>
      </div>
      {!showResult ? (
        <div className="quiz-content">
          <h4 className="quiz-question">{questions[currentQ].q}</h4>
          <div className="quiz-answers">
            {questions[currentQ].a.map((answer, i) => (
              <button key={i} className="quiz-btn" onClick={() => handleAnswer(i)}>
                {answer}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="game-result">
          <h4>{score >= 3 ? '🎉 Hai đứa hiểu nhau thật nhiều!' : '💕 Mình cùng xem lại kỷ niệm nhé!'}</h4>
          <p>Điểm: {score}/{questions.length}</p>
          <button onClick={onClose}>Đóng</button>
        </div>
      )}
    </div>
  );
}

// Game 3: Vòng Quay May Mắn
function LuckyWheelGame({ onClose, onWin }) {
  const prizes = [
    '💋 Hôn má chồng 3 cái',
    '📱 Gửi một tin nhắn cho năm thứ hai',
    '🎵 Chọn bài hát của hai đứa',
    '💕 Kể 3 điều vợ thương ở chồng',
    '🤗 Ôm nhau thật chặt 20 giây',
    '📸 Chụp ảnh kỷ niệm một năm',
    '💝 Kể lại một khoảnh khắc ở Sa Pa',
    '🎁 Cùng mở hộp quà đặc biệt'
  ];

  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState(null);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    const spins = 5 + Math.random() * 5;
    const newRotation = rotation + spins * 360 + Math.random() * 360;
    setRotation(newRotation);
    
    setTimeout(() => {
      const index = Math.floor(Math.random() * prizes.length);
      setResult(prizes[index]);
      setSpinning(false);
      onWin?.(prizes[index]);
    }, 3000);
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h3>🎰 Vòng quay hẹn hò năm thứ hai</h3>
      </div>
      <div className="wheel-container">
        <div 
          className="wheel"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {prizes.map((prize, i) => (
            <div 
              key={i} 
              className="wheel-segment"
              style={{ 
                transform: `rotate(${i * (360 / prizes.length)}deg)`,
                background: `hsl(${i * (360 / prizes.length)}, 70%, 60%)`
              }}
            >
              <span>{prize.split(' ')[0]}</span>
            </div>
          ))}
        </div>
        <div className="wheel-pointer">▼</div>
      </div>
      <button 
        className="spin-btn" 
        onClick={spin}
        disabled={spinning}
      >
        {spinning ? '🎰 Đang quay...' : '🎰 QUAY'}
      </button>
      {result && (
        <div className="wheel-result">
          <h4>🎉 Nhiệm vụ của vợ:</h4>
          <p>{result}</p>
          <button onClick={onClose}>Đóng</button>
        </div>
      )}
    </div>
  );
}

// Game 4: Ghép Hình Kỷ Niệm
function PuzzleGame({ onClose, onWin }) {
  const [pieces, setPieces] = useState([]);
  const [moves, setMoves] = useState(0);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    const shuffled = [...Array(9)].map((_, i) => i).sort(() => Math.random() - 0.5);
    setPieces(shuffled);
  }, []);

  const movePiece = (index) => {
    const emptyIndex = pieces.indexOf(8);
    const validMoves = [
      emptyIndex - 1, emptyIndex + 1,
      emptyIndex - 3, emptyIndex + 3
    ].filter(i => i >= 0 && i < 9);

    if (validMoves.includes(index)) {
      const newPieces = [...pieces];
      [newPieces[index], newPieces[emptyIndex]] = [newPieces[emptyIndex], newPieces[index]];
      setPieces(newPieces);
      setMoves(moves + 1);

      if (newPieces.every((p, i) => p === i)) {
        setSolved(true);
        onWin?.('Hoàn thành puzzle trong ' + (moves + 1) + ' nước! 🧩');
      }
    }
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h3>🧩 Ghép Hình Kỷ Niệm</h3>
        <div className="game-stats">
          <span>🔄 {moves} nước</span>
        </div>
      </div>
      <div className="puzzle-grid">
        {pieces.map((piece, index) => (
          <div
            key={index}
            className={`puzzle-piece ${piece === 8 ? 'empty' : ''}`}
            onClick={() => movePiece(index)}
            style={{
              backgroundImage: piece !== 8 ? `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="50" font-size="40" fill="%23E91E63">${['💕','💖','💗','💝','💞','💓','💘','💋'][piece]}</text></svg>')` : 'none'
            }}
          >
            {piece !== 8 && <span className="puzzle-emoji">{['💕','💖','💗','💝','💞','💓','💘','💋'][piece]}</span>}
          </div>
        ))}
      </div>
      {solved && (
        <div className="game-result">
          <h4>🎉 Hoàn thành!</h4>
          <p>Số nước: {moves}</p>
          <button onClick={onClose}>Đóng</button>
        </div>
      )}
    </div>
  );
}

// Game 5: Bắn Tim Cupid
function CupidShootGame({ onClose, onWin }) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [targets, setTargets] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [playerPos, setPlayerPos] = useState(50);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
      if (score >= 15) onWin?.('Bắn trúng ' + score + ' trái tim! 🏹');
    }
  }, [timeLeft, gameOver, score, onWin]);

  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(() => {
        const newTarget = {
          id: Date.now(),
          x: Math.random() * 80 + 10,
          y: 0,
          type: Math.random() > 0.8 ? 'bad' : 'good'
        };
        setTargets(prev => [...prev, newTarget]);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameOver]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTargets(prev => prev.map(t => ({ ...t, y: t.y + 2 })).filter(t => t.y < 100));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const shoot = (targetId, type) => {
    setTargets(prev => prev.filter(t => t.id !== targetId));
    if (type === 'good') {
      setScore(score + 1);
    } else {
      setScore(Math.max(0, score - 1));
    }
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h3>💘 Bắn Tim Cupid</h3>
        <div className="game-stats">
          <span>⏱️ {timeLeft}s</span>
          <span>🎯 {score}</span>
        </div>
      </div>
      <div className="shoot-game">
        {targets.map(target => (
          <div
            key={target.id}
            className="target"
            style={{ left: `${target.x}%`, top: `${target.y}%` }}
            onClick={() => shoot(target.id, target.type)}
          >
            {target.type === 'good' ? '💖' : '🖤'}
          </div>
        ))}
        <div className="player" style={{ left: `${playerPos}%` }}>
          🏹
        </div>
      </div>
      {gameOver && (
        <div className="game-result">
          <h4>{score >= 15 ? '🎉 Thiện xạ!' : '💪 Luyện tập thêm!'}</h4>
          <p>Điểm: {score}</p>
          <button onClick={onClose}>Đóng</button>
        </div>
      )}
    </div>
  );
}

// Game 6: Thử Thách Tình Yêu
function DiceChallengeGame({ onClose, onWin }) {
  const challenges = [
    '💋 Hôn má chồng',
    '🎵 Hát một đoạn cho chồng nghe',
    '💕 Kể 5 điều vợ thương ở chồng',
    '🤗 Hai đứa ôm nhau thật chặt',
    '📱 Viết một tin nhắn cho năm thứ hai',
    '💃 Cùng nhảy một đoạn',
    '😘 Tặng nhau một nụ hôn',
    '💝 Kể một bất ngờ đáng nhớ trong năm qua',
    '🎁 Mỗi người hứa một điều nhỏ',
    '💖 Nói “Chồng yêu vợ”',
    '🌹 Chụp một tấm ảnh thật tình cảm',
    '✨ Khen nhau 3 câu'
  ];

  const [rolling, setRolling] = useState(false);
  const [dice, setDice] = useState([1, 1]);
  const [challenge, setChallenge] = useState(null);

  const rollDice = () => {
    setRolling(true);
    setChallenge(null);
    let count = 0;
    const interval = setInterval(() => {
      setDice([
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1
      ]);
      count++;
      if (count > 10) {
        clearInterval(interval);
        const d1 = Math.floor(Math.random() * 6) + 1;
        const d2 = Math.floor(Math.random() * 6) + 1;
        setDice([d1, d2]);
        const index = (d1 + d2 - 2) % challenges.length;
        setChallenge(challenges[index]);
        setRolling(false);
        onWin?.(challenges[index]);
      }
    }, 100);
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h3>🎲 Thử thách của hai đứa</h3>
      </div>
      <div className="dice-container">
        <div className={`dice ${rolling ? 'rolling' : ''}`}>
          <span className="dice-number">{dice[0]}</span>
        </div>
        <div className={`dice ${rolling ? 'rolling' : ''}`}>
          <span className="dice-number">{dice[1]}</span>
        </div>
      </div>
      <button 
        className="roll-btn"
        onClick={rollDice}
        disabled={rolling}
      >
        {rolling ? '🎲 Đang lắc...' : '🎲 LẮC XÚC XẮC'}
      </button>
      {challenge && (
        <div className="challenge-result">
          <h4>💝 Thử thách kỷ niệm:</h4>
          <p>{challenge}</p>
          <button onClick={onClose}>Hoàn thành</button>
        </div>
      )}
    </div>
  );
}

// Game 7: Lật Thẻ Bài
function MemoryCardGame({ onClose, onWin }) {
  const icons = ['💖', '💕', '💗', '💝', '💞', '💓', '💘', '💋'];
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const doubled = [...icons, ...icons];
    setCards(doubled.sort(() => Math.random() - 0.5));
  }, []);

  const flipCard = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
        setMatched([...matched, ...newFlipped]);
        setFlipped([]);
        if (matched.length + 2 === cards.length) {
          onWin?.('Hoàn thành trong ' + (moves + 1) + ' lượt! 🃏');
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h3>🃏 Lật Thẻ Bài Tình Yêu</h3>
        <div className="game-stats">
          <span>🔄 {moves} lượt</span>
          <span>✅ {matched.length / 2}/{icons.length}</span>
        </div>
      </div>
      <div className="memory-grid">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`match-card ${flipped.includes(index) || matched.includes(index) ? 'flipped' : ''}`}
            onClick={() => flipCard(index)}
          >
            <div className="card-front">❓</div>
            <div className="card-back">{card}</div>
          </div>
        ))}
      </div>
      {matched.length === cards.length && cards.length > 0 && (
        <div className="game-result">
          <h4>🎉 Hoàn thành!</h4>
          <p>Số lượt: {moves}</p>
          <button onClick={onClose}>Đóng</button>
        </div>
      )}
    </div>
  );
}

// Main Component
function MiniGames({ onClose }) {
  const [selectedGame, setSelectedGame] = useState(null);
  const [achievements, setAchievements] = useState([]);

  const games = [
    { id: 1, name: 'Gom tim năm thứ hai', icon: '💝', component: HeartCatchGame },
    { id: 2, name: 'Hiểu nhau sau một năm', icon: '🎯', component: LoveQuizGame },
    { id: 3, name: 'Vòng quay hẹn hò', icon: '🎰', component: LuckyWheelGame },
    { id: 4, name: 'Ghép ảnh kỷ niệm', icon: '🧩', component: PuzzleGame },
    { id: 5, name: 'Gửi tim cho nhau', icon: '💘', component: CupidShootGame },
    { id: 6, name: 'Thử thách hai đứa', icon: '🎲', component: DiceChallengeGame },
    { id: 7, name: 'Lật thẻ ký ức', icon: '🃏', component: MemoryCardGame }
  ];

  const handleWin = (message) => {
    setAchievements([...achievements, { game: selectedGame, message, time: new Date() }]);
  };

  const GameComponent = selectedGame ? games.find(g => g.id === selectedGame)?.component : null;

  return (
    <div className="unified-modal minigames-modal" onClick={onClose}>
      <div className="unified-modal-content minigames-content" onClick={(e) => e.stopPropagation()}>
        <button className="unified-close-btn minigames-close-btn" onClick={onClose}>×</button>
        
        {!selectedGame ? (
          <>
            <AnniversaryEditionBadge note="Cùng chơi, cùng nhớ lại hành trình năm đầu tiên" />
            <h2 className="unified-title minigames-title">🎮 Trò chơi kỷ niệm một năm</h2>
            <p className="unified-subtitle minigames-subtitle">Đức Anh và Phương Linh cùng thử xem mình hiểu nhau đến đâu nhé!</p>
            
            <div className="games-grid">
              {games.map(game => (
                <button type="button"
                  key={game.id}
                  className="game-card"
                  onClick={() => setSelectedGame(game.id)}
                >
                  <div className="game-icon">{game.icon}</div>
                  <div className="game-name">{game.name}</div>
                </button>
              ))}
            </div>

            {achievements.length > 0 && (
              <div className="achievements">
                <h3>🏆 Thành tích</h3>
                <div className="achievement-list">
                  {achievements.slice(-3).map((ach, i) => (
                    <div key={i} className="achievement-item">
                      {games.find(g => g.id === ach.game)?.icon} {ach.message}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <button 
              className="back-to-menu-btn"
              onClick={() => setSelectedGame(null)}
            >
              Danh sách trò chơi
            </button>
            {GameComponent && (
              <GameComponent 
                onClose={() => setSelectedGame(null)}
                onWin={handleWin}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default MiniGames;
