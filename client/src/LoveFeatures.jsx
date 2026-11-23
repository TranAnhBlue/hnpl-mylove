import { useState, useEffect } from 'react';
import './LoveFeatures.css';
import AnniversaryEditionBadge from './AnniversaryEditionBadge';

// Feature 1: Thư Tình Bí Mật
function LoveLetterFeature({ onClose }) {
  const [letters, setLetters] = useState([]);
  const [showWrite, setShowWrite] = useState(false);
  const [content, setContent] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [recipient, setRecipient] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('loveLetters') || '[]');
    setLetters(saved);
    
    // Check scheduled letters
    const interval = setInterval(() => {
      const now = new Date();
      saved.forEach(letter => {
        if (letter.scheduled && !letter.opened) {
          const schedTime = new Date(letter.scheduledTime);
          if (now >= schedTime) {
            alert(`💌 Bạn có thư tình mới từ ${letter.from}!`);
            letter.opened = true;
          }
        }
      });
      localStorage.setItem('loveLetters', JSON.stringify(saved));
      setLetters([...saved]);
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const saveLetter = () => {
    const newLetter = {
      id: Date.now(),
      content,
      from: 'Chồng',
      to: recipient || 'Vợ',
      date: new Date().toISOString(),
      scheduled: !!scheduledTime,
      scheduledTime: scheduledTime || null,
      opened: !scheduledTime
    };
    const updated = [...letters, newLetter];
    setLetters(updated);
    localStorage.setItem('loveLetters', JSON.stringify(updated));
    setContent('');
    setScheduledTime('');
    setRecipient('');
    setShowWrite(false);
  };

  return (
    <div className="feature-container">
      <h3>💌 Thư gửi cho năm thứ hai</h3>
      {!showWrite ? (
        <>
          <button className="feature-btn" onClick={() => setShowWrite(true)}>
            ✍️ Viết Thư Mới
          </button>
          <div className="letters-list">
            {letters.filter(l => l.opened).map(letter => (
              <div key={letter.id} className="letter-item">
                <div className="letter-header">
                  <span>💌 Từ {letter.from} → {letter.to}</span>
                  <span className="letter-date">{new Date(letter.date).toLocaleDateString()}</span>
                </div>
                <p className="letter-content">{letter.content}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="write-letter">
          <input
            type="text"
            placeholder="Gửi đến vợ..."
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
          <textarea
            placeholder="Viết điều chồng muốn vợ đọc vào một ngày đặc biệt..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="8"
          />
          <input
            type="datetime-local"
            value={scheduledTime}
            onChange={(e) => setScheduledTime(e.target.value)}
            placeholder="Hẹn giờ gửi (tùy chọn)"
          />
          <div className="letter-actions">
            <button onClick={() => setShowWrite(false)}>Hủy</button>
            <button onClick={saveLetter} className="primary">Gửi</button>
          </div>
        </div>
      )}
    </div>
  );
}

// Feature 2: Hũ Yêu Thương
function LoveJarFeature({ onClose }) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [randomNote, setRandomNote] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('loveJar') || '[]');
    setNotes(saved);
  }, []);

  const addNote = () => {
    if (!newNote.trim()) return;
    const updated = [...notes, { id: Date.now(), text: newNote, date: new Date().toISOString() }];
    setNotes(updated);
    localStorage.setItem('loveJar', JSON.stringify(updated));
    setNewNote('');
  };

  const pickRandom = () => {
    if (notes.length === 0) return;
    const random = notes[Math.floor(Math.random() * notes.length)];
    setRandomNote(random);
  };

  return (
    <div className="feature-container">
      <h3>💝 Hũ 100 điều thương vợ</h3>
      <div className="jar-stats">
        <div className="jar-visual">
          <div className="jar">
            <div className="jar-fill" style={{ height: `${Math.min(notes.length * 5, 100)}%` }}>
              {notes.slice(-10).map((_, i) => (
                <span key={i} className="jar-heart">💖</span>
              ))}
            </div>
          </div>
          <p>{notes.length}/100 điều thương nhau</p>
        </div>
      </div>
      <div className="jar-input">
        <textarea
          placeholder="Hôm nay chồng thương vợ vì..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          rows="3"
        />
        <button onClick={addNote}>💝 Bỏ vào hũ</button>
      </div>
      <button className="pick-btn" onClick={pickRandom}>
        🎲 Mở ngẫu nhiên
      </button>
      {randomNote && (
        <div className="random-note">
          <p>{randomNote.text}</p>
          <small>{new Date(randomNote.date).toLocaleDateString()}</small>
        </div>
      )}
    </div>
  );
}


// Feature 3: Điểm Yêu Thương
function LovePointsFeature({ onClose }) {
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Gửi tin nhắn yêu', points: 10, done: false },
    { id: 2, name: 'Hôn má nhau', points: 20, done: false },
    { id: 3, name: 'Nấu ăn cho nhau', points: 50, done: false },
    { id: 4, name: 'Đi dạo cùng nhau', points: 30, done: false },
    { id: 5, name: 'Xem phim cùng nhau', points: 40, done: false }
  ]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('lovePoints') || '{"points":0,"level":1}');
    setPoints(saved.points);
    setLevel(saved.level);
  }, []);

  const completeTask = (taskId, taskPoints) => {
    const newPoints = points + taskPoints;
    const newLevel = Math.floor(newPoints / 100) + 1;
    setPoints(newPoints);
    setLevel(newLevel);
    setTasks(tasks.map(t => t.id === taskId ? { ...t, done: true } : t));
    localStorage.setItem('lovePoints', JSON.stringify({ points: newPoints, level: newLevel }));
  };

  return (
    <div className="feature-container">
      <h3>🌟 Điểm yêu thương năm thứ hai</h3>
      <div className="points-header">
        <div className="level-badge">Level {level}</div>
        <div className="points-display">⭐ {points} điểm</div>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${(points % 100)}%` }}></div>
      </div>
      <p className="next-level">Còn {100 - (points % 100)} điểm để lên level {level + 1}</p>
      <div className="tasks-list">
        <h4>Nhiệm vụ hôm nay:</h4>
        {tasks.map(task => (
          <div key={task.id} className={`task-item ${task.done ? 'done' : ''}`}>
            <span>{task.name}</span>
            <div>
              <span className="task-points">+{task.points}</span>
              {!task.done && (
                <button onClick={() => completeTask(task.id, task.points)}>✓</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Feature 4: Lịch Hẹn Hò
function DateCalendarFeature({ onClose }) {
  const [dates, setDates] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newDate, setNewDate] = useState({ title: '', date: '', location: '', notes: '' });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('dateDates') || '[]');
    setDates(saved);
  }, []);

  const addDate = () => {
    const updated = [...dates, { ...newDate, id: Date.now() }];
    setDates(updated);
    localStorage.setItem('dateDates', JSON.stringify(updated));
    setNewDate({ title: '', date: '', location: '', notes: '' });
    setShowAdd(false);
  };

  const suggestions = [
    '🍽️ Bữa tối kỷ niệm',
    '🎬 Xem lại phim hai đứa thích',
    '🌳 Đi dạo và kể chuyện năm đầu tiên',
    '☕ Quán cà phê chụp một tấm ảnh chung',
    '🏔️ Lên kế hoạch trở lại Sa Pa',
    '🎨 Làm một món đồ lưu niệm cùng nhau'
  ];

  return (
    <div className="feature-container">
      <h3>🗓️ Lịch hẹn năm thứ hai</h3>
      {!showAdd ? (
        <>
          <button className="feature-btn" onClick={() => setShowAdd(true)}>
            ➕ Thêm Lịch Hẹn
          </button>
          <div className="dates-list">
            {dates.sort((a, b) => new Date(a.date) - new Date(b.date)).map(date => {
              const daysUntil = Math.ceil((new Date(date.date) - new Date()) / (1000 * 60 * 60 * 24));
              return (
                <div key={date.id} className="date-item">
                  <div className="date-icon">💑</div>
                  <div className="date-info">
                    <h4>{date.title}</h4>
                    <p>📍 {date.location}</p>
                    <p>📅 {new Date(date.date).toLocaleDateString()}</p>
                    {daysUntil > 0 && <span className="countdown">Còn {daysUntil} ngày</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="add-date-form">
          <input
            type="text"
            placeholder="Tiêu đề (VD: Dinner Date)"
            value={newDate.title}
            onChange={(e) => setNewDate({ ...newDate, title: e.target.value })}
          />
          <input
            type="datetime-local"
            value={newDate.date}
            onChange={(e) => setNewDate({ ...newDate, date: e.target.value })}
          />
          <input
            type="text"
            placeholder="Địa điểm"
            value={newDate.location}
            onChange={(e) => setNewDate({ ...newDate, location: e.target.value })}
          />
          <div className="suggestions">
            <p>Gợi ý:</p>
            {suggestions.map((s, i) => (
              <button key={i} onClick={() => setNewDate({ ...newDate, location: s })}>
                {s}
              </button>
            ))}
          </div>
          <textarea
            placeholder="Ghi chú..."
            value={newDate.notes}
            onChange={(e) => setNewDate({ ...newDate, notes: e.target.value })}
            rows="3"
          />
          <div className="form-actions">
            <button onClick={() => setShowAdd(false)}>Hủy</button>
            <button onClick={addDate} className="primary">Lưu</button>
          </div>
        </div>
      )}
    </div>
  );
}

// Feature 5: Playlist Của Chúng Mình
function PlaylistFeature({ onClose }) {
  const [songs, setSongs] = useState([]);
  const [newSong, setNewSong] = useState({ title: '', artist: '', url: '' });
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('playlist') || '[]');
    setSongs(saved);
  }, []);

  const addSong = () => {
    const updated = [...songs, { ...newSong, id: Date.now() }];
    setSongs(updated);
    localStorage.setItem('playlist', JSON.stringify(updated));
    setNewSong({ title: '', artist: '', url: '' });
  };

  const playSong = (song) => {
    setCurrentSong(song);
  };

  const shuffle = () => {
    if (songs.length > 0) {
      const random = songs[Math.floor(Math.random() * songs.length)];
      setCurrentSong(random);
    }
  };

  return (
    <div className="feature-container">
      <h3>🎵 Playlist Của Chúng Mình</h3>
      {currentSong && (
        <div className="now-playing">
          <div className="music-icon">🎵</div>
          <div className="song-info">
            <h4>{currentSong.title}</h4>
            <p>{currentSong.artist}</p>
          </div>
        </div>
      )}
      <button className="shuffle-btn" onClick={shuffle}>
        🔀 Shuffle
      </button>
      <div className="add-song">
        <input
          type="text"
          placeholder="Tên bài hát"
          value={newSong.title}
          onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Ca sĩ"
          value={newSong.artist}
          onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
        />
        <input
          type="text"
          placeholder="Link YouTube/Spotify"
          value={newSong.url}
          onChange={(e) => setNewSong({ ...newSong, url: e.target.value })}
        />
        <button onClick={addSong}>➕ Thêm</button>
      </div>
      <div className="songs-list">
        {songs.map(song => (
          <div key={song.id} className="song-item" onClick={() => playSong(song)}>
            <span className="song-icon">🎵</span>
            <div className="song-details">
              <strong>{song.title}</strong>
              <small>{song.artist}</small>
            </div>
            {song.url && (
              <a href={song.url} target="_blank" rel="noopener noreferrer">🔗</a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


// Feature 6: Nhật Ký Tâm Trạng
function MoodDiaryFeature({ onClose }) {
  const [entries, setEntries] = useState([]);
  const [mood, setMood] = useState('😊');
  const [note, setNote] = useState('');
  
  const moods = ['😊', '😍', '🥰', '😢', '😠', '😴', '🤗', '😎'];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('moodDiary') || '[]');
    setEntries(saved);
  }, []);

  const addEntry = () => {
    const updated = [...entries, { id: Date.now(), mood, note, date: new Date().toISOString() }];
    setEntries(updated);
    localStorage.setItem('moodDiary', JSON.stringify(updated));
    setNote('');
  };

  const getMoodStats = () => {
    const stats = {};
    entries.forEach(e => {
      stats[e.mood] = (stats[e.mood] || 0) + 1;
    });
    return stats;
  };

  return (
    <div className="feature-container">
      <h3>🎭 Nhật Ký Tâm Trạng</h3>
      <div className="mood-selector">
        <p>Hôm nay em cảm thấy thế nào?</p>
        <div className="mood-options">
          {moods.map(m => (
            <button
              key={m}
              className={mood === m ? 'active' : ''}
              onClick={() => setMood(m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <textarea
        placeholder="Ghi chú về tâm trạng..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows="3"
      />
      <button onClick={addEntry}>💾 Lưu</button>
      
      <div className="mood-stats">
        <h4>Thống kê tâm trạng:</h4>
        {Object.entries(getMoodStats()).map(([mood, count]) => (
          <div key={mood} className="mood-stat">
            <span>{mood}</span>
            <div className="stat-bar">
              <div style={{ width: `${(count / entries.length) * 100}%` }}></div>
            </div>
            <span>{count}</span>
          </div>
        ))}
      </div>

      <div className="entries-list">
        {entries.slice(-5).reverse().map(entry => (
          <div key={entry.id} className="diary-entry">
            <span className="entry-mood">{entry.mood}</span>
            <div className="entry-content">
              <p>{entry.note}</p>
              <small>{new Date(entry.date).toLocaleDateString()}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Feature 7: Thử Thách 30 Ngày
function Challenge30Feature({ onClose }) {
  const challenges = [
    'Gửi tin nhắn yêu buổi sáng',
    'Nấu bữa sáng cho nhau',
    'Đi dạo cùng nhau',
    'Xem phim cùng nhau',
    'Viết thư tình',
    'Chụp ảnh selfie',
    'Nấu bữa tối',
    'Massage cho nhau',
    'Hát karaoke',
    'Đi picnic',
    'Làm bánh cùng nhau',
    'Chơi game cùng nhau',
    'Đọc sách cho nhau nghe',
    'Vẽ tranh cho nhau',
    'Tập thể dục cùng nhau',
    'Làm video TikTok',
    'Đi mua sắm',
    'Tặng quà bất ngờ',
    'Ăn tối ngoài trời',
    'Xem hoàng hôn',
    'Đi cafe',
    'Chơi bowling',
    'Đi xem triển lãm',
    'Làm spa tại nhà',
    'Nấu món mới',
    'Chụp ảnh couple',
    'Viết nhật ký chung',
    'Lên kế hoạch du lịch',
    'Dọn dẹp nhà cùng nhau',
    'Tổ chức tiệc nhỏ'
  ];

  const [progress, setProgress] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('challenge30') || '[]');
    setProgress(saved);
  }, []);

  const toggleDay = (day) => {
    const updated = progress.includes(day) 
      ? progress.filter(d => d !== day)
      : [...progress, day];
    setProgress(updated);
    localStorage.setItem('challenge30', JSON.stringify(updated));
  };

  return (
    <div className="feature-container">
      <h3>🎪 30 ngày yêu nhau chủ động hơn</h3>
      <div className="challenge-progress">
        <div className="progress-circle">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#FFE5EC" strokeWidth="10"/>
            <circle 
              cx="50" cy="50" r="45" fill="none" 
              stroke="#E91E63" strokeWidth="10"
              strokeDasharray={`${(progress.length / 30) * 283} 283`}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="progress-text">
            {progress.length}/30
          </div>
        </div>
        <p>{Math.round((progress.length / 30) * 100)}% hoàn thành</p>
      </div>
      <div className="challenges-grid">
        {challenges.map((challenge, i) => (
          <div 
            key={i} 
            className={`challenge-day ${progress.includes(i + 1) ? 'completed' : ''}`}
            onClick={() => toggleDay(i + 1)}
          >
            <div className="day-number">Ngày {i + 1}</div>
            <div className="day-challenge">{challenge}</div>
            {progress.includes(i + 1) && <div className="check-mark">✓</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// Feature 8: Truth or Dare
function TruthOrDareFeature({ onClose }) {
  const truths = [
    'Điều gì vợ thương nhất ở chồng sau một năm?',
    'Khoảnh khắc nào trong năm đầu tiên vợ muốn sống lại?',
    'Vợ mong điều gì cho năm thứ hai của chúng mình?',
    'Điều nhỏ bé nào chồng làm khiến vợ hạnh phúc?',
    'Khi nào vợ cảm thấy mình được yêu thương nhất?',
    'Món quà ý nghĩa nhất em nhận được?',
    'Nơi em muốn đi nhất với anh?',
    'Bài hát yêu thích của em?',
    'Em thích kiểu hẹn hò nào?',
    'Điều em muốn thay đổi ở bản thân?'
  ];

  const dares = [
    'Hôn má chồng 3 lần',
    'Hát một đoạn cho chồng nghe',
    'Nhảy 30 giây',
    'Nói “Vợ yêu chồng” 5 lần',
    'Viết một tin nhắn cho năm thứ hai',
    'Chụp ảnh selfie ngớ ngẩn',
    'Kể 1 câu chuyện hài',
    'Làm 10 cái squat',
    'Vẽ trái tim lên tay',
    'Ôm chồng một phút'
  ];

  const [current, setCurrent] = useState(null);
  const [type, setType] = useState(null);

  const pick = (selectedType) => {
    setType(selectedType);
    const list = selectedType === 'truth' ? truths : dares;
    setCurrent(list[Math.floor(Math.random() * list.length)]);
  };

  return (
    <div className="feature-container">
      <h3>🎲 Thật lòng hay thử thách kỷ niệm</h3>
      <div className="tod-buttons">
        <button className="truth-btn" onClick={() => pick('truth')}>
          💭 Truth
        </button>
        <button className="dare-btn" onClick={() => pick('dare')}>
          🎯 Dare
        </button>
      </div>
      {current && (
        <div className={`tod-result ${type}`}>
          <h4>{type === 'truth' ? '💭 Câu hỏi:' : '🎯 Thử thách:'}</h4>
          <p>{current}</p>
          <button onClick={() => setCurrent(null)}>Tiếp theo</button>
        </div>
      )}
    </div>
  );
}


// Feature 9: Vẽ Tranh Tình Yêu
function DrawingFeature({ onClose }) {
  const canvasRef = useState(null);
  const [color, setColor] = useState('#E91E63');
  const [isDrawing, setIsDrawing] = useState(false);

  const colors = ['#E91E63', '#9C27B0', '#2196F3', '#4CAF50', '#FF9800', '#000000'];

  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef[0];
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef[0];
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef[0];
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveDrawing = () => {
    const canvas = canvasRef[0];
    if (!canvas) return;
    const dataUrl = canvas.toDataURL();
    const link = document.createElement('a');
    link.download = 'love-drawing.png';
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="feature-container">
      <h3>🎨 Vẽ Tranh Tình Yêu</h3>
      <div className="color-palette">
        {colors.map(c => (
          <button
            key={c}
            className={color === c ? 'active' : ''}
            style={{ background: c }}
            onClick={() => setColor(c)}
          />
        ))}
      </div>
      <canvas
        ref={(el) => canvasRef[0] = el}
        width={400}
        height={400}
        className="drawing-canvas"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
      <div className="canvas-actions">
        <button onClick={clearCanvas}>🗑️ Xóa</button>
        <button onClick={saveDrawing}>💾 Lưu</button>
      </div>
    </div>
  );
}

// Main Component
function LoveFeatures({ onClose }) {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const features = [
    { id: 1, name: 'Thư cho năm thứ hai', icon: '💌', component: LoveLetterFeature },
    { id: 2, name: '100 điều thương nhau', icon: '💝', component: LoveJarFeature },
    { id: 3, name: 'Điểm yêu thương', icon: '🌟', component: LovePointsFeature },
    { id: 4, name: 'Lịch hẹn năm thứ hai', icon: '🗓️', component: DateCalendarFeature },
    { id: 5, name: 'Nhạc của hai đứa', icon: '🎵', component: PlaylistFeature },
    { id: 6, name: 'Nhật ký cảm xúc', icon: '🎭', component: MoodDiaryFeature },
    { id: 7, name: '30 ngày gần nhau hơn', icon: '🎪', component: Challenge30Feature },
    { id: 8, name: 'Thật lòng hay thử thách', icon: '🎲', component: TruthOrDareFeature },
    { id: 9, name: 'Vẽ điều mình mơ', icon: '🎨', component: DrawingFeature }
  ];

  const FeatureComponent = selectedFeature ? features.find(f => f.id === selectedFeature)?.component : null;

  return (
    <div className="unified-modal love-features-modal" onClick={onClose}>
      <div className="unified-modal-content love-features-content" onClick={(e) => e.stopPropagation()}>
        <button className="unified-close-btn features-close-btn" onClick={onClose}>×</button>
        
        {!selectedFeature ? (
          <>
            <AnniversaryEditionBadge note="Những thói quen nhỏ để năm thứ hai vẫn luôn có nhau" />
            <h2 className="unified-title features-title">💕 Góc yêu thương của vợ chồng mình</h2>
            <p className="unified-subtitle features-subtitle">Giữ lời yêu bằng những điều thật nhỏ mỗi ngày.</p>
            
            <div className="features-grid">
              {features.map(feature => (
                <button type="button"
                  key={feature.id}
                  className="feature-card"
                  onClick={() => setSelectedFeature(feature.id)}
                >
                  <div className="feature-icon">{feature.icon}</div>
                  <div className="feature-name">{feature.name}</div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <button 
              className="back-to-features-btn"
              onClick={() => setSelectedFeature(null)}
            >
              Danh sách tính năng
            </button>
            {FeatureComponent && <FeatureComponent onClose={() => setSelectedFeature(null)} />}
          </>
        )}
      </div>
    </div>
  );
}

export default LoveFeatures;
