import { useState, useEffect } from 'react';
import './GiftBox.css';
import AnniversaryEditionBadge from './AnniversaryEditionBadge';

const gifts = [
  {
    id: 1,
    name: 'Má hồng dành tặng vợ',
    icon: '💄',
    color: '#E91E63',
    description: 'Một món quà nhỏ để Phương Linh luôn thật xinh trong mắt chồng',
    value: 'Trị giá ~1.200.000đ'
  },
  {
    id: 2,
    name: 'Bữa tối do chồng mời',
    icon: '🍽️',
    color: '#4CAF50',
    description: 'Vợ chọn món, chồng chọn chỗ ngồi cạnh vợ và thanh toán',
    value: 'Voucher hẹn hò năm thứ hai'
  },
  {
    id: 3,
    name: 'Một ngày vợ làm công chúa',
    icon: '👑',
    color: '#2196F3',
    description: 'Vợ được chọn lịch trình, món ăn và điều mình muốn làm',
    value: 'Có hiệu lực cả ngày'
  },
  {
    id: 4,
    name: 'Hộp làm đẹp cho vợ',
    icon: '💅',
    color: '#9C27B0',
    description: 'Một món làm đẹp vợ thích, hai đứa cùng đi chọn',
    value: 'Trị giá ~800.000đ'
  },
  {
    id: 5,
    name: 'Cheat day của hai đứa',
    icon: '🍕',
    color: '#FF9800',
    description: 'Một buổi ăn những món vợ thích, không đếm calo và không vội vàng',
    value: 'Kèm một tấm ảnh chung'
  },
  {
    id: 6,
    name: 'Chuyến đi bí mật',
    icon: '🎁',
    color: '#F44336',
    description: 'Một chuyến đi mới nối tiếp kỷ niệm Sa Pa đầu tiên của chúng mình',
    value: 'Địa điểm do chồng chuẩn bị'
  },
  {
    id: 7,
    name: '100 cái ôm',
    icon: '🧸',
    color: '#FF69B4',
    description: 'Dùng bất cứ lúc nào vợ buồn, mệt hoặc đơn giản là muốn được ôm',
    value: 'Không hết hạn'
  },
  {
    id: 8,
    name: 'Hương thơm của kỷ niệm',
    icon: '🌸',
    color: '#BA68C8',
    description: 'Một chai nước hoa để sau này mùi hương cũng nhắc mình nhớ năm đầu tiên',
    value: 'Trị giá ~900.000đ'
  },
  {
    id: 9,
    name: 'Buổi chăm sóc dành cho vợ',
    icon: '💆',
    color: '#26A69A',
    description: 'Một buổi thư giãn để vợ được nghỉ ngơi và được chiều chuộng',
    value: 'Trị giá ~500.000đ'
  },
  {
    id: 10,
    name: 'Một điều ước của vợ',
    icon: '🌟',
    color: '#5C6BC0',
    description: 'Vợ nói một điều ước vừa sức, chồng sẽ nghiêm túc thực hiện',
    value: 'Dành riêng cho Phương Linh'
  }
];

function GiftBox({ onClose }) {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [selectedGift, setSelectedGift] = useState(null);
  const [hasOpened, setHasOpened] = useState(false);

  // Check if user has already opened a gift
  useEffect(() => {
    const opened = localStorage.getItem('anniversary1GiftOpened');
    const savedGift = localStorage.getItem('anniversary1GiftResult');

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
      localStorage.setItem('anniversary1GiftOpened', 'true');
      localStorage.setItem('anniversary1GiftResult', JSON.stringify(gift));
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
      localStorage.removeItem('anniversary1GiftOpened');
      localStorage.removeItem('anniversary1GiftResult');
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

        <AnniversaryEditionBadge note="Một lượt mở quà dành riêng cho Phương Linh" />
        <h2 className="unified-title gift-title">🎁 Hộp quà năm đầu tiên</h2>
        {hasOpened ? (
          <p className="unified-subtitle gift-subtitle">Vợ đã mở món quà kỷ niệm của mình rồi 💝</p>
        ) : (
          <p className="unified-subtitle gift-subtitle">Nhắm mắt ước một điều rồi mở quà nhé, vợ iu!</p>
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
              {isOpening ? 'Đang mở điều bất ngờ…' : hasOpened ? '✓ Đã mở quà' : 'Mở quà kỷ niệm ♡'}
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
                  Món quà này đánh dấu năm đầu tiên của Đức Anh và Phương Linh ♡
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
