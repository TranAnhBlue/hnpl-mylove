import { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDistanceToNow, format } from 'date-fns';
import { vi } from 'date-fns/locale';
import QRCode from 'qrcode';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [showStats, setShowStats] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [filterMood, setFilterMood] = useState('all');
  const [filterHasImage, setFilterHasImage] = useState('all');
  const [showQuickNote, setShowQuickNote] = useState(false);
  const [quickNoteText, setQuickNoteText] = useState('');
  const [tags, setTags] = useState([]);
  const [currentTags, setCurrentTags] = useState([]);
  const [filterTag, setFilterTag] = useState('all');
  const [showGallery, setShowGallery] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [selectedMemories, setSelectedMemories] = useState([]);
  const [bulkEditMode, setBulkEditMode] = useState(false);
  const [showWidget, setShowWidget] = useState(true);
  const [randomMemory, setRandomMemory] = useState(null);
  const [countdowns, setCountdowns] = useState([]);
  const [showCountdownModal, setShowCountdownModal] = useState(false);
  const [newCountdown, setNewCountdown] = useState({ title: '', date: '' });
  const [savedFilters, setSavedFilters] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrMemory, setQrMemory] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [showSpecialQR, setShowSpecialQR] = useState(false);
  const [specialQRUrl, setSpecialQRUrl] = useState('');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    fetchMemories();
    fetchSettings();
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    const savedCountdowns = JSON.parse(localStorage.getItem('countdowns') || '[]');
    setCountdowns(savedCountdowns);
    const savedFiltersData = JSON.parse(localStorage.getItem('savedFilters') || '[]');
    setSavedFilters(savedFiltersData);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    checkUpcomingEvents();
    updateRandomMemory();
    extractAllTags();
  }, [memories]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('countdowns', JSON.stringify(countdowns));
  }, [countdowns]);

  useEffect(() => {
    localStorage.setItem('savedFilters', JSON.stringify(savedFilters));
  }, [savedFilters]);

  const checkUpcomingEvents = () => {
    const now = new Date();
    const upcoming = memories.filter(memory => {
      const memoryDate = new Date(memory.date);
      const thisYearDate = new Date(now.getFullYear(), memoryDate.getMonth(), memoryDate.getDate());
      const daysUntil = Math.ceil((thisYearDate - now) / (1000 * 60 * 60 * 24));
      return daysUntil >= 0 && daysUntil <= 7;
    }).map(memory => {
      const memoryDate = new Date(memory.date);
      const thisYearDate = new Date(now.getFullYear(), memoryDate.getMonth(), memoryDate.getDate());
      const daysUntil = Math.ceil((thisYearDate - now) / (1000 * 60 * 60 * 24));
      return { ...memory, daysUntil };
    });
    setUpcomingEvents(upcoming);
  };

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
    formData.append('tags', JSON.stringify(currentTags));
    formData.append('favorite', 'false');
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
      setCurrentTags([]);
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
    setCurrentTags(memory.tags || []);
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
    setCurrentTags([]);
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

  const getFilteredAndSortedMemories = () => {
    let filtered = memories.filter(m => {
      const matchCategory = filterCategory === 'all' || m.category === filterCategory;
      const matchSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (m.description && m.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Advanced filters
      const matchMood = filterMood === 'all' || m.mood === filterMood;
      const matchImage = filterHasImage === 'all' || 
                        (filterHasImage === 'with' && m.image) ||
                        (filterHasImage === 'without' && !m.image);
      
      const matchTag = filterTag === 'all' || (m.tags && m.tags.includes(filterTag));
      const matchFavorite = !showFavorites || m.favorite;
      
      let matchDateRange = true;
      if (dateRange.start || dateRange.end) {
        const memDate = new Date(m.date);
        if (dateRange.start) matchDateRange = matchDateRange && memDate >= new Date(dateRange.start);
        if (dateRange.end) matchDateRange = matchDateRange && memDate <= new Date(dateRange.end);
      }
      
      return matchCategory && matchSearch && matchMood && matchImage && matchDateRange && matchTag && matchFavorite;
    });

    switch(sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'category':
        filtered.sort((a, b) => (a.category || 'other').localeCompare(b.category || 'other'));
        break;
      default:
        break;
    }

    return filtered;
  };

  const groupByMonth = (memories) => {
    const groups = {};
    memories.forEach(memory => {
      const date = new Date(memory.date);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      const label = format(date, 'MMMM yyyy', { locale: vi });
      if (!groups[key]) {
        groups[key] = { label, memories: [] };
      }
      groups[key].memories.push(memory);
    });
    return Object.values(groups);
  };

  const getStats = () => {
    const total = memories.length;
    const withImages = memories.filter(m => m.image).length;
    const categoryStats = {};
    categories.forEach(cat => {
      categoryStats[cat.id] = memories.filter(m => m.category === cat.id).length;
    });
    const mostUsedCategory = Object.keys(categoryStats).reduce((a, b) => 
      categoryStats[a] > categoryStats[b] ? a : b, 'other'
    );
    const recentMemories = [...memories].sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    ).slice(0, 5);
    
    return { total, withImages, categoryStats, mostUsedCategory, recentMemories };
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(memories, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `memories-backup-${format(new Date(), 'yyyy-MM-dd')}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const importedData = JSON.parse(event.target.result);
          // Import each memory
          for (const memory of importedData) {
            await axios.post(`${API_URL}/memories`, {
              title: memory.title,
              date: memory.date,
              description: memory.description,
              category: memory.category,
              mood: memory.mood
            });
          }
          fetchMemories();
          alert('Import thành công!');
        } catch (error) {
          console.error('Error importing:', error);
          alert('Lỗi khi import dữ liệu!');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleQuickNote = async () => {
    if (!quickNoteText.trim()) return;
    
    try {
      await axios.post(`${API_URL}/memories`, {
        title: quickNoteText,
        date: new Date().toISOString(),
        description: '',
        category: 'other',
        mood: '❤️'
      });
      setQuickNoteText('');
      setShowQuickNote(false);
      fetchMemories();
    } catch (error) {
      console.error('Error saving quick note:', error);
    }
  };

  const shareMemory = (memory) => {
    const text = `${memory.title}\n${format(new Date(memory.date), 'dd/MM/yyyy')}`;
    if (navigator.share) {
      navigator.share({
        title: memory.title,
        text: text,
      }).catch(err => console.log('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(text);
      alert('Đã copy vào clipboard!');
    }
  };

  const extractAllTags = () => {
    const allTags = new Set();
    memories.forEach(m => {
      if (m.tags && Array.isArray(m.tags)) {
        m.tags.forEach(tag => allTags.add(tag));
      }
    });
    setTags(Array.from(allTags));
  };

  const addTag = (tag) => {
    if (tag && !currentTags.includes(tag)) {
      setCurrentTags([...currentTags, tag]);
    }
  };

  const removeTag = (tag) => {
    setCurrentTags(currentTags.filter(t => t !== tag));
  };

  const toggleFavorite = async (memoryId) => {
    try {
      const memory = memories.find(m => m._id === memoryId);
      await axios.put(`${API_URL}/memories/${memoryId}`, {
        ...memory,
        favorite: !memory.favorite
      });
      fetchMemories();
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const updateRandomMemory = () => {
    if (memories.length > 0) {
      const random = memories[Math.floor(Math.random() * memories.length)];
      setRandomMemory(random);
    }
  };

  const getMemoryFromThisDay = () => {
    const today = new Date();
    const thisDay = memories.filter(m => {
      const mDate = new Date(m.date);
      return mDate.getDate() === today.getDate() && 
             mDate.getMonth() === today.getMonth() &&
             mDate.getFullYear() !== today.getFullYear();
    });
    return thisDay.length > 0 ? thisDay[0] : null;
  };

  const addCountdown = () => {
    if (newCountdown.title && newCountdown.date) {
      setCountdowns([...countdowns, { ...newCountdown, id: Date.now() }]);
      setNewCountdown({ title: '', date: '' });
      setShowCountdownModal(false);
    }
  };

  const deleteCountdown = (id) => {
    setCountdowns(countdowns.filter(c => c.id !== id));
  };

  const getDaysUntil = (date) => {
    const now = new Date();
    const target = new Date(date);
    const diffTime = target - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const toggleSelectMemory = (memoryId) => {
    if (selectedMemories.includes(memoryId)) {
      setSelectedMemories(selectedMemories.filter(id => id !== memoryId));
    } else {
      setSelectedMemories([...selectedMemories, memoryId]);
    }
  };

  const bulkDelete = async () => {
    if (window.confirm(`Xóa ${selectedMemories.length} kỷ niệm?`)) {
      try {
        for (const id of selectedMemories) {
          await axios.delete(`${API_URL}/memories/${id}`);
        }
        setSelectedMemories([]);
        setBulkEditMode(false);
        fetchMemories();
      } catch (error) {
        console.error('Error bulk deleting:', error);
      }
    }
  };

  const bulkChangeCategory = async (newCategory) => {
    try {
      for (const id of selectedMemories) {
        const memory = memories.find(m => m._id === id);
        await axios.put(`${API_URL}/memories/${id}`, {
          ...memory,
          category: newCategory
        });
      }
      setSelectedMemories([]);
      setBulkEditMode(false);
      fetchMemories();
    } catch (error) {
      console.error('Error bulk updating:', error);
    }
  };

  const bulkExport = () => {
    const selected = memories.filter(m => selectedMemories.includes(m._id));
    const dataStr = JSON.stringify(selected, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `selected-memories-${format(new Date(), 'yyyy-MM-dd')}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const saveCurrentFilter = () => {
    if (filterName) {
      const filter = {
        name: filterName,
        category: filterCategory,
        searchQuery,
        sortBy,
        dateRange,
        filterMood,
        filterHasImage,
        filterTag
      };
      setSavedFilters([...savedFilters, filter]);
      setFilterName('');
    }
  };

  const loadFilter = (filter) => {
    setFilterCategory(filter.category);
    setSearchQuery(filter.searchQuery);
    setSortBy(filter.sortBy);
    setDateRange(filter.dateRange);
    setFilterMood(filter.filterMood);
    setFilterHasImage(filter.filterHasImage);
    setFilterTag(filter.filterTag);
  };

  const deleteFilter = (index) => {
    setSavedFilters(savedFilters.filter((_, i) => i !== index));
  };

  const getGalleryImages = () => {
    return memories.filter(m => m.image).map(m => ({
      ...m,
      imageUrl: `http://localhost:5001${m.image}`
    }));
  };

  const generateQRCode = async (memory) => {
    setQrMemory(memory);
    
    // Tạo URL để xem kỷ niệm (có thể share)
    const memoryUrl = `${window.location.origin}/memory/${memory._id}`;
    
    // Tạo nội dung đáng yêu cho QR code
    const loveMessage = `
💕 Kỷ Niệm Đáng Yêu 💕

${memory.title}

📅 Ngày: ${format(new Date(memory.date), 'dd/MM/yyyy')}
${memory.mood || '❤️'} ${categories.find(c => c.id === memory.category)?.name || 'Kỷ niệm'}

${memory.description ? `💭 "${memory.description}"` : ''}

${memory.tags && memory.tags.length > 0 ? `🏷️ ${memory.tags.join(', ')}` : ''}

⏰ Đã ${getTimeAgo(memory.date)} trôi qua...

💝 Được tạo với yêu thương từ ứng dụng Ngày Kỷ Niệm

🔗 Xem chi tiết: ${memoryUrl}
    `.trim();

    try {
      const qrUrl = await QRCode.toDataURL(loveMessage, {
        width: 300,
        margin: 2,
        color: {
          dark: '#E91E63',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'H'
      });
      setQrCodeUrl(qrUrl);
      setShowQRModal(true);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `qr-${qrMemory.title.replace(/\s+/g, '-')}.png`;
    link.click();
  };

  const printQRCode = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>In Mã QR - ${qrMemory.title}</title>
          <style>
            body {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              font-family: Arial, sans-serif;
              background: white;
            }
            .print-container {
              text-align: center;
              padding: 40px;
              max-width: 600px;
            }
            h1 {
              color: #E91E63;
              margin-bottom: 10px;
              font-size: 28px;
            }
            .subtitle {
              color: #666;
              margin-bottom: 30px;
              font-size: 16px;
            }
            img {
              width: 300px;
              height: 300px;
              margin: 20px 0;
              border: 4px solid #E91E63;
              border-radius: 20px;
              padding: 10px;
            }
            .info {
              margin-top: 20px;
              padding: 20px;
              background: #FFE5EC;
              border-radius: 15px;
            }
            .date {
              color: #666;
              font-size: 14px;
              margin-top: 10px;
            }
            .footer {
              margin-top: 30px;
              color: #999;
              font-size: 12px;
            }
            @media print {
              body { margin: 0; }
              .print-container { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="print-container">
            <h1>💕 ${qrMemory.title}</h1>
            <div class="subtitle">Quét mã QR để xem kỷ niệm đáng yêu</div>
            <img src="${qrCodeUrl}" alt="QR Code" />
            <div class="info">
              <div style="font-size: 18px; font-weight: bold; color: #E91E63;">
                ${categories.find(c => c.id === qrMemory.category)?.icon || '📌'} 
                ${categories.find(c => c.id === qrMemory.category)?.name || 'Kỷ niệm'}
              </div>
              <div class="date">📅 ${format(new Date(qrMemory.date), 'dd/MM/yyyy')}</div>
            </div>
            <div class="footer">
              💝 Được tạo từ ứng dụng Ngày Kỷ Niệm
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  const generateSpecialQR = async () => {
    // Lấy URL phù hợp với môi trường
    const isDevelopment = window.location.hostname === 'localhost' || 
                         window.location.hostname.includes('192.168');
    
    let baseUrl;
    if (isDevelopment) {
      // Development: dùng IP local
      const localIP = window.location.hostname === 'localhost' 
        ? '192.168.0.101'
        : window.location.hostname;
      const port = window.location.port || '3000';
      baseUrl = `http://${localIP}:${port}`;
    } else {
      // Production: dùng domain hiện tại
      baseUrl = window.location.origin;
    }
    
    const specialUrl = `${baseUrl}/love-slideshow`;
    
    const specialMessage = `
💕💕💕 THÔNG ĐIỆP YÊU THƯƠNG ĐẶC BIỆT 💕💕💕

🎵 Quét mã QR này để xem slideshow ảnh đẹp với nhạc "Lễ Đường" lãng mạn!

✨ 70 khoảnh khắc đáng nhớ
🎶 Nhạc nền "Lễ Đường"
💝 Hiệu ứng chuyển cảnh mượt mà
🌟 Được tạo với tất cả tình yêu

🔗 ${specialUrl}

💌 Dành tặng người đặc biệt nhất
    `.trim();

    try {
      const qrUrl = await QRCode.toDataURL(specialMessage, {
        width: 350,
        margin: 2,
        color: {
          dark: '#E91E63',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'H'
      });
      setSpecialQRUrl(qrUrl);
      setShowSpecialQR(true);
    } catch (error) {
      console.error('Error generating special QR:', error);
    }
  };

  const downloadSpecialQR = () => {
    const link = document.createElement('a');
    link.href = specialQRUrl;
    link.download = 'qr-love-slideshow-special.png';
    link.click();
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
        <div className="header-actions">
          <button className="icon-btn special-qr-btn" onClick={generateSpecialQR} title="QR Slideshow Đặc Biệt">
            🎬
          </button>
          <button className="icon-btn" onClick={() => setShowFavorites(!showFavorites)} title="Yêu thích">
            {showFavorites ? '⭐' : '☆'}
          </button>
          <button className="icon-btn" onClick={() => setDarkMode(!darkMode)} title="Chế độ tối">
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button className="icon-btn" onClick={() => setShowStats(true)} title="Thống kê">
            📊
          </button>
          <button className="icon-btn" onClick={() => setShowSettings(true)} title="Cài đặt">
            ⚙️
          </button>
        </div>
      </div>

      {showWidget && randomMemory && (
        <div className="widget-container">
          <button className="widget-close" onClick={() => setShowWidget(false)}>×</button>
          <div className="widget-content">
            <div className="widget-icon">💭</div>
            <div className="widget-title">Kỷ niệm ngẫu nhiên</div>
            <div className="widget-memory">{randomMemory.title}</div>
            <div className="widget-date">
              {format(new Date(randomMemory.date), 'dd/MM/yyyy')}
            </div>
            <button className="widget-refresh" onClick={updateRandomMemory}>🔄</button>
          </div>
          {getMemoryFromThisDay() && (
            <div className="widget-thisday">
              <div className="widget-icon">📅</div>
              <div className="widget-title">Ngày này năm trước</div>
              <div className="widget-memory">{getMemoryFromThisDay().title}</div>
            </div>
          )}
        </div>
      )}

      {countdowns.length === 0 && upcomingEvents.length === 0 ? null : (
        <div className="notifications-section">
          {countdowns.length > 0 && (
            <div className="countdowns-compact">
              <span className="section-label">⏰ Countdown:</span>
              {countdowns.slice(0, 2).map(cd => {
                const days = getDaysUntil(cd.date);
                return (
                  <div key={cd.id} className="countdown-item-compact">
                    <span>{cd.title}</span>
                    <span className="countdown-days">
                      {days > 0 ? `${days}d` : days === 0 ? 'Hôm nay!' : 'Qua'}
                    </span>
                  </div>
                );
              })}
              {countdowns.length > 2 && (
                <button className="see-more-btn" onClick={() => setShowCountdownModal(true)}>
                  +{countdowns.length - 2}
                </button>
              )}
            </div>
          )}

          {upcomingEvents.length > 0 && (
            <div className="upcoming-compact">
              <span className="section-label">🔔 Sắp tới:</span>
              {upcomingEvents.slice(0, 2).map(event => (
                <div key={event._id} className="event-item-compact">
                  <span>{event.title}</span>
                  <span className="event-countdown">
                    {event.daysUntil === 0 ? 'Hôm nay!' : `${event.daysUntil}d`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {upcomingEvents.length > 0 && false && (
        <div className="upcoming-events">
          <h3>🔔 Sự kiện sắp tới</h3>
          <div className="events-list">
            {upcomingEvents.map(event => (
              <div key={event._id} className="event-item">
                <span className="event-icon">{categories.find(c => c.id === event.category)?.icon || '📌'}</span>
                <span className="event-title">{event.title}</span>
                <span className="event-countdown">
                  {event.daysUntil === 0 ? 'Hôm nay!' : `${event.daysUntil} ngày nữa`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="controls-bar">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Tìm kiếm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="controls-group">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
            <option value="category">Danh mục</option>
          </select>
          <button 
            className={`control-btn ${showAdvancedFilter ? 'active' : ''}`}
            onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
            title="Bộ lọc"
          >
            🔧
          </button>
          <button 
            className={`control-btn ${bulkEditMode ? 'active' : ''}`}
            onClick={() => setBulkEditMode(!bulkEditMode)}
            title="Chọn nhiều"
          >
            {bulkEditMode ? '✓' : '☐'}
          </button>
          <button 
            className="control-btn"
            onClick={() => setShowGallery(true)}
            title="Gallery"
          >
            🖼️
          </button>
          <div className="view-toggle">
            <button 
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
            >
              ⊞
            </button>
            <button 
              className={viewMode === 'timeline' ? 'active' : ''}
              onClick={() => setViewMode('timeline')}
            >
              ≡
            </button>
          </div>
        </div>
        
        {showAdvancedFilter && (
          <div className="advanced-filter">
            <div className="filter-grid">
              <div className="filter-item">
                <label>Từ:</label>
                <input 
                  type="date" 
                  value={dateRange.start}
                  onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                />
              </div>
              <div className="filter-item">
                <label>Đến:</label>
                <input 
                  type="date" 
                  value={dateRange.end}
                  onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                />
              </div>
              <div className="filter-item">
                <label>Cảm xúc:</label>
                <select value={filterMood} onChange={(e) => setFilterMood(e.target.value)}>
                  <option value="all">Tất cả</option>
                  {moods.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div className="filter-item">
                <label>Ảnh:</label>
                <select value={filterHasImage} onChange={(e) => setFilterHasImage(e.target.value)}>
                  <option value="all">Tất cả</option>
                  <option value="with">Có</option>
                  <option value="without">Không</option>
                </select>
              </div>
              {tags.length > 0 && (
                <div className="filter-item">
                  <label>Tags:</label>
                  <select value={filterTag} onChange={(e) => setFilterTag(e.target.value)}>
                    <option value="all">Tất cả</option>
                    {tags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
                  </select>
                </div>
              )}
            </div>
            <div className="filter-actions">
              <button 
                className="clear-filter-btn"
                onClick={() => {
                  setDateRange({ start: '', end: '' });
                  setFilterMood('all');
                  setFilterHasImage('all');
                  setFilterTag('all');
                }}
              >
                Xóa
              </button>
              {savedFilters.length > 0 && (
                <select onChange={(e) => e.target.value && loadFilter(JSON.parse(e.target.value))} defaultValue="">
                  <option value="">Bộ lọc đã lưu</option>
                  {savedFilters.map((filter, idx) => (
                    <option key={idx} value={JSON.stringify(filter)}>{filter.name}</option>
                  ))}
                </select>
              )}
              <input 
                type="text" 
                placeholder="Tên bộ lọc..."
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                style={{flex: 1, minWidth: '100px'}}
              />
              <button className="save-filter-btn" onClick={saveCurrentFilter}>
                💾
              </button>
            </div>
          </div>
        )}
      </div>

      {bulkEditMode && selectedMemories.length > 0 && (
        <div className="bulk-actions-bar">
          <span>{selectedMemories.length} đã chọn</span>
          <select onChange={(e) => e.target.value && bulkChangeCategory(e.target.value)} defaultValue="">
            <option value="">Đổi danh mục</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
            ))}
          </select>
          <button onClick={bulkExport}>📥 Xuất</button>
          <button onClick={bulkDelete} className="bulk-delete">🗑️ Xóa</button>
          <button onClick={() => {
            setSelectedMemories([]);
            setBulkEditMode(false);
          }}>Hủy</button>
        </div>
      )}

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

      {viewMode === 'grid' ? (
        <div className="memories-list">
          {getFilteredAndSortedMemories().map((memory, index) => {
            const categoryInfo = categories.find(c => c.id === memory.category) || categories[5];
            return (
              <div 
                key={memory._id} 
                className="memory-card"
                style={{ backgroundColor: categoryInfo.color }}
              >
                {bulkEditMode && (
                  <input 
                    type="checkbox"
                    className="memory-checkbox"
                    checked={selectedMemories.includes(memory._id)}
                    onChange={() => toggleSelectMemory(memory._id)}
                  />
                )}
                <button 
                  className="favorite-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(memory._id);
                  }}
                >
                  {memory.favorite ? '⭐' : '☆'}
                </button>
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
                  {memory.tags && memory.tags.length > 0 && (
                    <div className="memory-tags">
                      {memory.tags.map(tag => (
                        <span key={tag} className="memory-tag">{tag}</span>
                      ))}
                    </div>
                  )}
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
                  className="share-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    shareMemory(memory);
                  }}
                  title="Chia sẻ"
                >
                  📤
                </button>
                <button 
                  className="qr-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    generateQRCode(memory);
                  }}
                  title="Tạo mã QR"
                >
                  📱
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => handleDelete(memory._id)}
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="timeline-view">
          {groupByMonth(getFilteredAndSortedMemories()).map((group, idx) => (
            <div key={idx} className="timeline-group">
              <div className="timeline-month">{group.label}</div>
              {group.memories.map((memory) => {
                const categoryInfo = categories.find(c => c.id === memory.category) || categories[5];
                return (
                  <div key={memory._id} className="timeline-item">
                    <div className="timeline-dot" style={{ backgroundColor: categoryInfo.color }}></div>
                    <div className="timeline-content" style={{ borderLeftColor: categoryInfo.color }}>
                      <div className="timeline-header">
                        <span className="timeline-icon">{categoryInfo.icon}</span>
                        <span className="timeline-mood">{memory.mood || '❤️'}</span>
                        <span className="timeline-date">
                          {format(new Date(memory.date), 'dd/MM/yyyy')}
                        </span>
                      </div>
                      {memory.image && (
                        <img 
                          src={`http://localhost:5001${memory.image}`} 
                          alt={memory.title}
                          className="timeline-image"
                          onClick={() => setViewImage(`http://localhost:5001${memory.image}`)}
                        />
                      )}
                      <h3 className="timeline-title">{memory.title}</h3>
                      {memory.description && (
                        <p className="timeline-description">{memory.description}</p>
                      )}
                      <div className="timeline-actions">
                        <button onClick={() => handleEdit(memory)} className="edit-btn-timeline">
                          ✏️ Sửa
                        </button>
                        <button onClick={() => generateQRCode(memory)} className="qr-btn-timeline">
                          � QR Code
                        </button>
                        <button onClick={() => shareMemory(memory)} className="share-btn-timeline">
                          � Chia sẻ
                        </button>
                        <button onClick={() => handleDelete(memory._id)} className="delete-btn-timeline">
                          �🗑️ Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      <div className="floating-actions">
        <button className="action-btn quick-note-btn" onClick={() => setShowQuickNote(true)} title="Ghi chú nhanh">
          📝
        </button>
        <button className="action-btn widget-btn" onClick={() => setShowWidget(!showWidget)} title="Widget">
          💭
        </button>
        <button className="action-btn countdown-btn" onClick={() => setShowCountdownModal(true)} title="Countdown">
          ⏰
        </button>
        <button className="action-btn add-btn" onClick={() => setShowModal(true)}>
          +
        </button>
      </div>

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

            <div className="form-group">
              <label>Tags</label>
              <div className="tags-input-container">
                <div className="current-tags">
                  {currentTags.map(tag => (
                    <span key={tag} className="tag-item">
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)}>×</button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Thêm tag..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag(e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
                {tags.length > 0 && (
                  <div className="tag-suggestions">
                    {tags.filter(t => !currentTags.includes(t)).slice(0, 5).map(tag => (
                      <button key={tag} type="button" onClick={() => addTag(tag)}>
                        + {tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showGallery && (
        <div className="gallery-modal">
          <div className="gallery-header">
            <button onClick={() => setShowGallery(false)}>← Đóng</button>
            <span>{galleryIndex + 1} / {getGalleryImages().length}</span>
          </div>
          <div className="gallery-content">
            {getGalleryImages().length > 0 ? (
              <>
                <button 
                  className="gallery-nav prev"
                  onClick={() => setGalleryIndex(Math.max(0, galleryIndex - 1))}
                  disabled={galleryIndex === 0}
                >
                  ‹
                </button>
                <div className="gallery-image-container">
                  <img 
                    src={getGalleryImages()[galleryIndex]?.imageUrl} 
                    alt={getGalleryImages()[galleryIndex]?.title}
                  />
                  <div className="gallery-info">
                    <h3>{getGalleryImages()[galleryIndex]?.title}</h3>
                    <p>{format(new Date(getGalleryImages()[galleryIndex]?.date), 'dd/MM/yyyy')}</p>
                  </div>
                </div>
                <button 
                  className="gallery-nav next"
                  onClick={() => setGalleryIndex(Math.min(getGalleryImages().length - 1, galleryIndex + 1))}
                  disabled={galleryIndex === getGalleryImages().length - 1}
                >
                  ›
                </button>
              </>
            ) : (
              <div className="gallery-empty">Không có ảnh nào</div>
            )}
          </div>
          <div className="gallery-thumbnails">
            {getGalleryImages().map((img, idx) => (
              <img
                key={idx}
                src={img.imageUrl}
                alt={img.title}
                className={idx === galleryIndex ? 'active' : ''}
                onClick={() => setGalleryIndex(idx)}
              />
            ))}
          </div>
        </div>
      )}

      {showCountdownModal && (
        <div className="quick-note-modal">
          <div className="quick-note-content">
            <h3>⏰ Thêm Countdown</h3>
            <input
              type="text"
              placeholder="Tên sự kiện..."
              value={newCountdown.title}
              onChange={(e) => setNewCountdown({...newCountdown, title: e.target.value})}
            />
            <input
              type="date"
              value={newCountdown.date}
              onChange={(e) => setNewCountdown({...newCountdown, date: e.target.value})}
            />
            <div className="quick-note-actions">
              <button onClick={() => setShowCountdownModal(false)} className="cancel-btn">
                Hủy
              </button>
              <button onClick={addCountdown} className="save-btn">
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}

      {showQRModal && qrMemory && (
        <div className="qr-modal" onClick={() => setShowQRModal(false)}>
          <div className="qr-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="qr-close-btn" onClick={() => setShowQRModal(false)}>×</button>
            <div className="qr-header">
              <h2>💕 Mã QR Kỷ Niệm</h2>
              <p className="qr-subtitle">Quét để xem thông điệp đáng yêu</p>
            </div>
            <div className="qr-body">
              <div className="qr-code-container">
                <img src={qrCodeUrl} alt="QR Code" className="qr-code-image" />
                {qrMemory.image && (
                  <div className="qr-memory-photo">
                    <img src={`http://localhost:5001${qrMemory.image}`} alt={qrMemory.title} />
                  </div>
                )}
                <div className="qr-decoration">
                  <span className="qr-heart">💝</span>
                </div>
              </div>
              <div className="qr-info">
                <div className="qr-memory-title">
                  <span className="qr-icon">{categories.find(c => c.id === qrMemory.category)?.icon || '📌'}</span>
                  <span>{qrMemory.title}</span>
                </div>
                <div className="qr-memory-date">
                  {format(new Date(qrMemory.date), 'dd/MM/yyyy')}
                </div>
                <div className="qr-hint">
                  <span className="qr-hint-icon">📱</span>
                  <span>Quét mã QR bằng camera điện thoại để xem thông điệp yêu thương</span>
                </div>
              </div>
            </div>
            <div className="qr-actions">
              <button onClick={downloadQRCode} className="qr-download-btn">
                📥 Tải xuống
              </button>
              <button onClick={printQRCode} className="qr-print-btn">
                🖨️ In
              </button>
              <button onClick={() => setShowQRModal(false)} className="qr-close-action-btn">
                Đóng
              </button>
            </div>
            
            <div className="qr-ideas">
              <h3>💡 Ý tưởng sử dụng QR Code:</h3>
              <div className="ideas-grid">
                <div className="idea-item">
                  <span className="idea-icon">📖</span>
                  <span className="idea-text">Dán vào album ảnh</span>
                </div>
                <div className="idea-item">
                  <span className="idea-icon">🎁</span>
                  <span className="idea-text">Gắn lên quà tặng</span>
                </div>
                <div className="idea-item">
                  <span className="idea-icon">💌</span>
                  <span className="idea-text">Gửi trong thiệp</span>
                </div>
                <div className="idea-item">
                  <span className="idea-icon">🗺️</span>
                  <span className="idea-text">Tạo treasure hunt</span>
                </div>
                <div className="idea-item">
                  <span className="idea-icon">🖼️</span>
                  <span className="idea-text">Làm tranh treo tường</span>
                </div>
                <div className="idea-item">
                  <span className="idea-icon">📱</span>
                  <span className="idea-text">Làm hình nền điện thoại</span>
                </div>
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

            <div className="settings-section">
              <h3>Sao lưu & Khôi phục</h3>
              <button className="action-btn export-btn" onClick={handleExport}>
                📥 Xuất dữ liệu
              </button>
              <label className="action-btn import-btn">
                📤 Nhập dữ liệu
                <input type="file" accept=".json" onChange={handleImport} style={{display: 'none'}} />
              </label>
            </div>
          </div>
        </div>
      )}

      {showStats && (
        <div className="modal">
          <div className="modal-header">
            <button className="back-btn" onClick={() => setShowStats(false)}>
              ← Quay lại
            </button>
            <h2>Thống kê</h2>
            <div style={{width: '60px'}}></div>
          </div>
          
          <div className="modal-content stats-content">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📝</div>
                <div className="stat-value">{getStats().total}</div>
                <div className="stat-label">Tổng kỷ niệm</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📷</div>
                <div className="stat-value">{getStats().withImages}</div>
                <div className="stat-label">Có hình ảnh</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  {categories.find(c => c.id === getStats().mostUsedCategory)?.icon || '📌'}
                </div>
                <div className="stat-value">
                  {getStats().categoryStats[getStats().mostUsedCategory] || 0}
                </div>
                <div className="stat-label">Danh mục yêu thích</div>
              </div>
            </div>

            <div className="chart-section">
              <h3>Kỷ niệm theo danh mục</h3>
              <div className="chart-bars">
                {categories.map(cat => {
                  const count = getStats().categoryStats[cat.id] || 0;
                  const percentage = getStats().total > 0 ? (count / getStats().total) * 100 : 0;
                  return (
                    <div key={cat.id} className="chart-bar-item">
                      <div className="chart-label">
                        <span>{cat.icon} {cat.name}</span>
                        <span>{count}</span>
                      </div>
                      <div className="chart-bar-bg">
                        <div 
                          className="chart-bar-fill" 
                          style={{width: `${percentage}%`, backgroundColor: cat.color}}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="recent-section">
              <h3>Kỷ niệm gần đây</h3>
              <div className="recent-list">
                {getStats().recentMemories.map(memory => (
                  <div key={memory._id} className="recent-item" onClick={() => {
                    setShowStats(false);
                    handleEdit(memory);
                  }}>
                    <span className="recent-icon">
                      {categories.find(c => c.id === memory.category)?.icon || '📌'}
                    </span>
                    <span className="recent-title">{memory.title}</span>
                    <span className="recent-date">
                      {format(new Date(memory.date), 'dd/MM/yyyy')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showQuickNote && (
        <div className="quick-note-modal">
          <div className="quick-note-content">
            <h3>✍️ Ghi chú nhanh</h3>
            <textarea
              placeholder="Viết ghi chú ngắn về khoảnh khắc này..."
              value={quickNoteText}
              onChange={(e) => setQuickNoteText(e.target.value)}
              autoFocus
            />
            <div className="quick-note-actions">
              <button onClick={() => setShowQuickNote(false)} className="cancel-btn">
                Hủy
              </button>
              <button onClick={handleQuickNote} className="save-btn">
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
      {showSpecialQR && (
        <div className="qr-modal special-qr-modal" onClick={() => setShowSpecialQR(false)}>
          <div className="qr-modal-content special-qr-content" onClick={(e) => e.stopPropagation()}>
            <button className="qr-close-btn" onClick={() => setShowSpecialQR(false)}>×</button>
            <div className="qr-header special-qr-header">
              <h2>🎬 Mã QR Slideshow Đặc Biệt</h2>
              <p className="qr-subtitle">Quét để xem toàn bộ tình cảm của anh dành cho em 🎵</p>
            </div>
            <div className="qr-body">
              <div className="qr-code-container special-qr-container">
                <img src={specialQRUrl} alt="Special QR Code" className="qr-code-image special-qr-image" />
                <div className="special-qr-decoration">
                  <span className="qr-heart animate-heart">💝</span>
                  <span className="qr-heart animate-heart" style={{animationDelay: '0.5s'}}>💕</span>
                  <span className="qr-heart animate-heart" style={{animationDelay: '1s'}}>💖</span>
                </div>
              </div>
              <div className="qr-info special-qr-info">
                <div className="special-features">
                  <div className="feature-item">
                    <span className="feature-icon">📸</span>
                    <span className="feature-text">Nhiều ảnh đẹp</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">🎵</span>
                    <span className="feature-text">Nhạc đáng yêu</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">✨</span>
                    <span className="feature-text">Hiệu ứng của Blue Original</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">💝</span>
                    <span className="feature-text">Hàng ngàn lời nhắn</span>
                  </div>
                </div>
                <div className="qr-hint special-qr-hint">
                  <span className="qr-hint-icon">📱</span>
                  <span>Quét mã QR để mở slideshow trên điện thoại. Tốt nhất xem ở chế độ toàn màn hình!</span>
                </div>
              </div>
            </div>
            <div className="qr-actions">
              <button onClick={downloadSpecialQR} className="qr-download-btn">
                📥 Tải xuống
              </button>
              <button onClick={() => window.open('/love-slideshow', '_blank')} className="qr-preview-btn">
                👁️ Xem trước
              </button>
              <button onClick={() => setShowSpecialQR(false)} className="qr-close-action-btn">
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
