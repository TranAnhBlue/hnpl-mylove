import { useState, useEffect } from 'react';
import './GiftBox.css';

const gifts = [
  {
    id: 1,
    name: 'Má hồng YSL',
    icon: '💄',
    color: '#E91E63',
    description: 'Má hồng YSL Rouge Volupté Shine - Màu đỏ hồng quyến rũ',
    value: 'Trị giá ~1.200.000đ'
  },
  {
    id: 2,
    name: '100.000đ',
    icon: '💵',
    color: '#4CAF50',
    description: 'Tiền mặt 100k - Tự do mua sắm theo ý thích',
    value: '100.000đ'
  },
  {
    id: 3,
    name: '50.000đ',
    icon: '💴',
    color: '#2196F3',
    description: 'Tiền mặt 50k - Mua đồ ăn vặt hoặc trà sữa',
    value: '50.000đ'
  },
  {
    id: 4,
    name: 'Cốp Makeup',
    icon: '💅',
    color: '#9C27B0',
    description: 'Bộ cốp makeup mini - Gồm phấn, son, mascara',
    value: 'Trị giá ~800.000đ'
  },
  {
    id: 5,
    name: 'Voucher Cheat Day',
    icon: '🍕',
    color: '#FF9800',
    description: 'Voucher ăn thoải mái - Tùy chọn món yêu thích',
    value: 'Không giới hạn'
  },
  {
    id: 6,
    name: 'Hộp Quà Bí Ẩn',
    icon: '🎁',
    color: '#F44336',
    description: 'Món quà đặc biệt - Chỉ biết khi mở ra',
    value: 'Bất ngờ'
  },
  {
    id: 7,
    name: 'Gấu Bông',
    icon: '🧸',
    color: '#FF69B4',
    description: 'Gấu bông siêu cute - Ôm ngủ mỗi đêm',
    value: 'Trị giá ~300.000đ'
  },
  {
    id: 8,
    name: 'Nước Hoa Mini',
    icon: '🌸',
    color: '#BA68C8',
    description: 'Nước hoa mini - Hương thơm quyến rũ',
    value: 'Trị giá ~900.000đ'
  },
  {
    id: 9,
    name: 'Voucher Spa',
    icon: '💆',
    color: '#26A69A',
    description: 'Voucher spa thư giãn - Massage toàn thân',
    value: 'Trị giá ~500.000đ'
  },
  {
    id: 10,
    name: 'Tai Nghe Bluetooth',
    icon: '🎧',
    color: '#5C6BC0',
    description: 'Tai nghe không dây - Nghe nhạc cực đã',
    value: 'Trị giá ~500.000đ'
  }
];

function GiftBox({ onClose }) {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [selectedGift, setSelectedGift] = useState(null);
  const [hasOpened, setHasOpened] = useState(false);

  // Check if user has already opened a gift
  useEffect(() => {
    const opened = localStorage.getItem('giftBoxOpened');
    const savedGift = localStorage.getItem('giftBoxResult');

    if (opened === 'true' && savedGift) {
      setHasOpened(true);
      setSelectedGift(JSON.parse(savedGift));
      setIsOpened(true);
    }
  }, []);

  const handleOpenGift = () => {
    if (hasOpened) return; // Prevent opening if already opened

    setIsOpening(true);

    // Random gift after animation
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * gifts.length);
      const gift = gifts[randomIndex];
      setSelectedGift(gift);
      setIsOpened(true);

      // Save to localStorage
      localStorage.setItem('giftBoxOpened', 'true');
      localStorage.setItem('giftBoxResult', JSON.stringify(gift));
      setHasOpened(true);
    }, 1500);
  };

  const handleReset = () => {
    // Can't reset if already opened before
    if (hasOpened) {
      alert('Bạn đã bốc quà rồi! Mỗi người chỉ được bốc 1 lần duy nhất 💝');
      return;
    }

    setIsOpening(false);
    setIsOpened(false);
    setSelectedGift(null);
  };

  const handleAdminReset = () => {
    if (window.confirm('⚠️ ADMIN: Reset tất cả dữ liệu bốc quà?')) {
      localStorage.removeItem('giftBoxOpened');
      localStorage.removeItem('giftBoxResult');
      setHasOpened(false);
      setIsOpened(false);
      setIsOpening(false);
      setSelectedGift(null);
      alert('✅ Đã reset! Có thể bốc quà lại.');
    }
  };

  return (
    <div className="unified-modal gift-box-modal" onClick={onClose}>
      <div className="unified-modal-content gift-box-content" onClick={(e) => e.stopPropagation()}>
        <button className="unified-close-btn gift-close-btn" onClick={onClose}>×</button>
        <button
          className="gift-admin-reset-btn"
          onClick={handleAdminReset}
          title="Admin Reset (Giữ 3 giây)"
        >
          🔄
        </button>

        <h2 className="unified-title gift-title">🎁 Bốc Hộp Quà Kỷ Niệm</h2>
        {hasOpened ? (
          <p className="unified-subtitle gift-subtitle">Bạn đã bốc quà rồi! Đây là món quà của bạn 💝</p>
        ) : (
          <p className="unified-subtitle gift-subtitle">Mỗi hộp quà là một kỷ niệm đáng nhớ</p>
        )}

        <div className="gift-container">
          {!isOpened ? (
            <div className={`gift-box ${isOpening ? 'opening' : ''}`}>
              <div className="gift-lid">
                <div className="gift-bow">🎀</div>
              </div>
              <div className="gift-body">
                <div className="gift-shine"></div>
              </div>
              {isOpening && (
                <div className="gift-sparkles">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="sparkle" style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 0.5}s`
                    }}>✨</div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="gift-result">
              <div className="confetti-container">
                {[...Array(50)].map((_, i) => (
                  <div key={i} className="confetti" style={{
                    left: `${Math.random() * 100}%`,
                    backgroundColor: ['#E91E63', '#9C27B0', '#2196F3', '#FF9800', '#FFC107'][Math.floor(Math.random() * 5)],
                    animationDelay: `${Math.random() * 0.5}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}></div>
                ))}
              </div>

              <div className="memory-card-gift" style={{ backgroundColor: selectedGift.color }}>
                <div className="gift-memory-icon">{selectedGift.icon}</div>
                <h3 className="gift-memory-title">{selectedGift.name}</h3>
                <p className="gift-memory-description">{selectedGift.description}</p>
                <div className="gift-memory-category">
                  💝 {selectedGift.value}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="gift-actions">
          {!isOpened ? (
            <button
              className="gift-open-btn"
              onClick={handleOpenGift}
              disabled={isOpening || hasOpened}
            >
              {isOpening ? '🎁 Đang mở...' : hasOpened ? '✓ Đã bốc quà' : '🎁 Bốc Hộp Quà'}
            </button>
          ) : (
            <>
              {!hasOpened && (
                <button className="gift-again-btn" onClick={handleReset}>
                  🔄 Bốc Lại
                </button>
              )}
              {hasOpened && (
                <div className="gift-message">
                  💝 Bạn đã bốc quà rồi! Quay lại lần sau nhé!
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default GiftBox;
