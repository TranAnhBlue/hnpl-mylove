import { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDistanceToNow, format } from 'date-fns';
import { vi } from 'date-fns/locale';
import './App.css';

const API_URL = 'http://localhost:5001/api';

const categories = [
  { id: 'date', name: 'Hẹn hò', icon: '💑', color: '#E91E63' },
  { id: 'travel', name: 'Du lịch', icon: '✈️', color: '#2196F3' },
  { id: 'gift', name: 'Quà tặng', icon: '🎁', color: '#9C27B0' },
  { id: 'food', name: 'Ăn uống', icon: '🍽️', color: '#FF9800' },
  { id: 'special', name: 'Đặc biệt', icon: '⭐', color: '#FFC107' },
  { id: 'other', name: 'Khác', icon: '📌', color: '#607D8B' }
];

const moods = ['❤️', '😍', '🥰', '😘', '💕', '💖', '💗', '💝', '💞', '💓'];

const colors = [
  '#64B5F6', '#7E57C2', '#AB47BC', '#EC407A', 
  '#EF5350', '#FF8A65', '#DCE775', '#81C784', '#4DD0E1'
];

function App() {
  const [memories, setMemories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [viewImage, setViewImage] = useState(null);
  const [editingMemory, setEditingMemory] = useState(null);
  const [settings, setSettings] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [anniversaryDate, setAnniversaryDate] = useState('');
  const [coupleName1, setCoupleName1] = useState('');
  const [coupleName2, setCoupleName2] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('other');
  const [mood, setMood] = useState('❤️');
  const [filterCategory, setFilterCategory] = useState('all');
  const [expandedMemory, setExpandedMemory] = useState(null);

  useEffect(() => {
    fetchMemories();
    fetchSettings();
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get(`${API_URL}/settings`);
      setSettings(response.data);
      setAnniversaryDate(response.data.anniversaryDate.split('T')[0]);
      setCoupleName1(response.data.coupleName1 || '');
      setCoupleName2(response.data.coupleName2 || '');
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleSaveSettings = async () => {
    try {
      await axios.put(`${API_URL}/settings`, {
        anniversaryDate,
        coupleName1,
        coupleName2
      });
      fetchSettings();
      setShowSettings(false);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const getDaysInLove = () => {
    if (!settings) return 0;
    const start = new Date(settings.anniversaryDate);
    const now = new Date();
    const diffTime = Math.abs(now - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const fetchMemories = async () => {
    try {
      const response = await axios.get(`${API_URL}/memories`);
      setMemories(response.data);
    } catch (error) {
      console.error('Error fetching memories:', error);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!title || !date) return;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('date', date);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('mood', mood);
    if (image) formData.append('image', image);

    try {
      if (editingMemory) {
        await axios.put(`${API_URL}/memories/${editingMemory._id}`, formData);
      } else {
        await axios.post(`${API_URL}/memories`, formData);
      }
      setTitle('');
      setDate('');
      setDescription('');
      setCategory('other');
      setMood('❤️');
      setImage(null);
      setImagePreview(null);
      setShowModal(false);
      setEditingMemory(null);
      fetchMemories();
    } catch (error) {
      console.error('Error saving memory:', error);
    }
  };

  const handleEdit = (memory) => {
    setEditingMemory(memory);
    setTitle(memory.title);
    setDate(memory.date.split('T')[0]);
    setDescription(memory.description || '');
    setCategory(memory.category || 'other');
    setMood(memory.mood || '❤️');
    setImagePreview(memory.image ? `http://localhost:5001${memory.image}` : null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingMemory(null);
    setTitle('');
    setDate('');
    setDescription('');
    setCategory('other');
    setMood('❤️');
    setImage(null);
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/memories/${id}`);
      fetchMemories();
    } catch (error) {
      console.error('Error deleting memory:', error);
    }
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const memoryDate = new Date(date);
    const diffTime = Math.abs(now - memoryDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    
    if (diffWeeks > 0) return `${diffWeeks}w`;
    if (diffDays === 0) return 'hôm nay';
    return `${diffDays}d`;
  };

  return (
    <div className="app">
      <div className="header">
        <div className="time">
          {format(currentTime, 'HH:mm')} ❤️
        </div>
        <h1>Ngày Kỷ Niệm</h1>
        {settings && (
          <div className="love-counter">
            <div className="days-count">{getDaysInLove()}</div>
            <div className="days-label">ngày bên nhau</div>
            {(coupleName1 || coupleName2) && (
              <div className="couple-names">
                {coupleName1} {coupleName1 && coupleName2 && '❤️'} {coupleName2}
              </div>
            )}
          </div>
        )}
        <button className="settings-btn" onClick={() => setShowSettings(true)}>
          ⚙️
        </button>
      </div>

      <div className="category-filter">
        <button 
          className={filterCategory === 'all' ? 'active' : ''}
          onClick={() => setFilterCategory('all')}
        >
          Tất cả
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            className={filterCategory === cat.id ? 'active' : ''}
            onClick={() => setFilterCategory(cat.id)}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      <div className="memories-list">
        {memories
          .filter(m => filterCategory === 'all' || m.category === filterCategory)
          .map((memory, index) => {
            const categoryInfo = categories.find(c => c.id === memory.category) || categories[5];
            return (
          <div 
            key={memory._id} 
            className="memory-card"
            style={{ backgroundColor: categoryInfo.color }}
          >
            <div className="time-badge">{getTimeAgo(memory.date)}</div>
            <div className="category-badge">{categoryInfo.icon}</div>
            <div className="mood-badge">{memory.mood || '❤️'}</div>
            {memory.image && (
              <img 
                src={`http://localhost:5001${memory.image}`} 
                alt={memory.title}
                className="memory-image"
                onClick={() => setViewImage(`http://localhost:5001${memory.image}`)}
              />
            )}
            <div className="memory-content" onClick={() => handleEdit(memory)}>
              <h3>{memory.title}</h3>
              {memory.description && expandedMemory === memory._id && (
                <p className="memory-description">{memory.description}</p>
              )}
              <div className="memory-date">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                  <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"></path>
                </svg>
                ngày {format(new Date(memory.date), 'dd \'thg\' M, yyyy', { locale: vi })}
              </div>
            </div>
            {memory.description && (
              <button 
                className="expand-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedMemory(expandedMemory === memory._id ? null : memory._id);
                }}
              >
                {expandedMemory === memory._id ? '▲' : '▼'}
              </button>
            )}
            <button 
              className="delete-btn"
              onClick={() => handleDelete(memory._id)}
            >
              ×
            </button>
          </div>
        )})}
      </div>

      <button className="add-btn" onClick={() => setShowModal(true)}>
        +
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-header">
            <button className="back-btn" onClick={handleCloseModal}>
              ← Quay lại
            </button>
            <h2>{editingMemory ? 'Chỉnh sửa' : 'Ngày Kỷ Niệm'}</h2>
            <button className="save-btn-header" onClick={handleSubmit}>
              Lưu
            </button>
          </div>
          
          <div className="modal-content">
            <div className="image-upload-area">
              <label htmlFor="image-input" className="image-preview-box">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" />
                ) : (
                  <div className="plus-icon">+</div>
                )}
              </label>
              <input
                id="image-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <div className="image-upload-text">
                Nhấn vào để thay đổi hoặc xóa ảnh
              </div>
            </div>

            <div className="form-group">
              <label>Ngày kỷ niệm</label>
              <input
                type="text"
                placeholder=""
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Ngày</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Mô tả</label>
              <textarea
                placeholder="Viết ghi chú ngọt ngào..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>Danh mục</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Cảm xúc</label>
              <div className="mood-selector">
                {moods.map(m => (
                  <button
                    key={m}
                    type="button"
                    className={mood === m ? 'active' : ''}
                    onClick={() => setMood(m)}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {viewImage && (
        <div className="image-modal" onClick={() => setViewImage(null)}>
          <div className="image-modal-content">
            <button className="close-image-btn" onClick={() => setViewImage(null)}>
              ×
            </button>
            <img src={viewImage} alt="View" />
          </div>
        </div>
      )}

      {showSettings && (
        <div className="modal">
          <div className="modal-header">
            <button className="back-btn" onClick={() => setShowSettings(false)}>
              ← Quay lại
            </button>
            <h2>Cài đặt</h2>
            <button className="save-btn-header" onClick={handleSaveSettings}>
              Lưu
            </button>
          </div>
          
          <div className="modal-content">
            <div className="form-group">
              <label>Ngày bắt đầu yêu</label>
              <input
                type="date"
                value={anniversaryDate}
                onChange={(e) => setAnniversaryDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Tên bạn</label>
              <input
                type="text"
                placeholder="Tên của bạn"
                value={coupleName1}
                onChange={(e) => setCoupleName1(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Tên người yêu</label>
              <input
                type="text"
                placeholder="Tên người yêu"
                value={coupleName2}
                onChange={(e) => setCoupleName2(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
