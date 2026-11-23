import { useState } from 'react';
import './FoodPicker.css';
import AnniversaryEditionBadge from './AnniversaryEditionBadge';

const foods = [
  { 
    id: 1, 
    name: 'Bữa tối kỷ niệm',
    icon: '🍜',
    type: 'Hẹn hò đặc biệt',
    description: 'Một bàn nhỏ, ánh đèn ấm và thật nhiều thời gian dành cho nhau'
  },
  { 
    id: 2, 
    name: 'Vợ chọn món',
    icon: '🥗',
    type: 'Đặc quyền của vợ',
    description: 'Phương Linh chọn món mình thích, Đức Anh lo phần còn lại'
  },
  { 
    id: 3, 
    name: 'Bít tết & lời chúc',
    icon: '🥩',
    type: 'Món ăn',
    description: 'Một bữa tối chậm rãi để cùng chúc mừng năm đầu tiên'
  },
  { 
    id: 4, 
    name: 'Pizza & Pasta', 
    icon: '🍕',
    type: 'Món ăn',
    description: 'Ẩm thực Ý'
  },
  { 
    id: 5, 
    name: 'Brunch của hai đứa',
    icon: '🥞',
    type: 'Món ăn',
    description: 'Một buổi sáng không vội, cùng nhau bắt đầu năm thứ hai'
  },
  { 
    id: 6, 
    name: 'Pizza 4P\'s', 
    icon: '🍕',
    type: 'Quán ăn',
    description: 'Pizza phong cách Nhật'
  },
  { 
    id: 7, 
    name: 'Sushi', 
    icon: '🍣',
    type: 'Món ăn',
    description: 'Ẩm thực Nhật Bản'
  },
  { 
    id: 8, 
    name: 'Đồ Âu', 
    icon: '🍽️',
    type: 'Món ăn',
    description: 'Ẩm thực châu Âu'
  },
  { 
    id: 9, 
    name: 'Lẩu', 
    icon: '🍲',
    type: 'Món ăn',
    description: 'Lẩu Thái, Lẩu Hải Sản'
  },
  { 
    id: 10, 
    name: 'BBQ Hàn Quốc', 
    icon: '🥓',
    type: 'Món ăn',
    description: 'Thịt nướng kiểu Hàn'
  },
  { 
    id: 11, 
    name: 'Phở', 
    icon: '🍜',
    type: 'Món ăn',
    description: 'Món ăn truyền thống Việt Nam'
  },
  { 
    id: 12, 
    name: 'Bún Bò Huế', 
    icon: '🍜',
    type: 'Món ăn',
    description: 'Đặc sản miền Trung'
  },
  { 
    id: 13, 
    name: 'Cơm Tấm', 
    icon: '🍚',
    type: 'Món ăn',
    description: 'Cơm tấm sườn bì chả'
  },
  { 
    id: 14, 
    name: 'Bánh Mì', 
    icon: '🥖',
    type: 'Món ăn',
    description: 'Bánh mì Việt Nam'
  },
  { 
    id: 15, 
    name: 'Gà Rán', 
    icon: '🍗',
    type: 'Món ăn',
    description: 'KFC, Lotteria, Jollibee'
  },
  { 
    id: 16, 
    name: 'Burger', 
    icon: '🍔',
    type: 'Món ăn',
    description: 'Burger bò, gà'
  },
  { 
    id: 17, 
    name: 'Mì Ý', 
    icon: '🍝',
    type: 'Món ăn',
    description: 'Spaghetti, Carbonara'
  },
  { 
    id: 18, 
    name: 'Dimsum', 
    icon: '🥟',
    type: 'Món ăn',
    description: 'Há cảo, sủi cảo'
  },
  { 
    id: 19, 
    name: 'Bún Chả', 
    icon: '🍜',
    type: 'Món ăn',
    description: 'Đặc sản Hà Nội'
  },
  { 
    id: 20, 
    name: 'Cháo', 
    icon: '🥣',
    type: 'Món ăn',
    description: 'Cháo gà, cháo lòng'
  },
  { 
    id: 21, 
    name: 'Mì Quảng', 
    icon: '🍜',
    type: 'Món ăn',
    description: 'Đặc sản Quảng Nam'
  },
  { 
    id: 22, 
    name: 'Hủ Tiếu', 
    icon: '🍜',
    type: 'Món ăn',
    description: 'Hủ tiếu Nam Vang'
  },
  { 
    id: 23, 
    name: 'Bánh Xèo', 
    icon: '🥞',
    type: 'Món ăn',
    description: 'Bánh xèo miền Tây'
  },
  { 
    id: 24, 
    name: 'Chè', 
    icon: '🍨',
    type: 'Món ăn',
    description: 'Chè đậu đỏ, chè thái'
  }
];

function FoodPicker({ onClose }) {
  const [isPicking, setIsPicking] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [history, setHistory] = useState([]);

  const pickFood = () => {
    setIsPicking(true);
    setSelectedFood(null);
    
    // Animation effect
    let count = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * foods.length);
      setSelectedFood(foods[randomIndex]);
      count++;
      
      if (count > 15) {
        clearInterval(interval);
        const finalFood = foods[Math.floor(Math.random() * foods.length)];
        setSelectedFood(finalFood);
        setIsPicking(false);
        
        // Add to history
        setHistory(prev => [
          { ...finalFood, time: new Date() },
          ...prev.slice(0, 4)
        ]);
      }
    }, 100);
  };

  return (
    <div className="unified-modal food-picker-modal" onClick={onClose}>
      <div className="unified-modal-content food-picker-content" onClick={(e) => e.stopPropagation()}>
        <button className="unified-close-btn" onClick={onClose}>×</button>
        
        <AnniversaryEditionBadge note="Một cuộc hẹn ngon lành cho chặng đường năm thứ hai" />
        <h2 className="unified-title">🍽️ Bữa hẹn hôm nay</h2>
        <p className="unified-subtitle">Vợ chồng mình để chiếc nút này quyết định nhé!</p>

        <div className="food-display">
          {!selectedFood ? (
            <div className="food-placeholder">
              <div className="food-icon-large">🤔</div>
              <p>Nhấn để chọn một ý tưởng cho buổi hẹn tiếp theo.</p>
            </div>
          ) : (
            <div className={`food-result ${isPicking ? 'picking' : 'selected'}`}>
              <div className="food-icon-large">{selectedFood.icon}</div>
              <h3 className="food-name">{selectedFood.name}</h3>
              <div className="food-type-badge">{selectedFood.type}</div>
              <p className="food-description">{selectedFood.description}</p>
              <p className="anniversary-food-note">Điều quan trọng nhất: người ngồi đối diện vẫn là nhau ♡</p>
            </div>
          )}
        </div>

        <button 
          className="food-pick-btn"
          onClick={pickFood}
          disabled={isPicking}
        >
          {isPicking ? 'Đang chọn cuộc hẹn…' : selectedFood ? 'Chọn một ý tưởng khác' : 'Chọn bữa hẹn ♡'}
        </button>

        {history.length > 0 && (
          <div className="food-history">
            <h4>Những ý tưởng vừa chọn</h4>
            <div className="history-list">
              {history.map((item, index) => (
                <div key={index} className="history-item">
                  <span className="history-icon">{item.icon}</span>
                  <span className="history-name">{item.name}</span>
                  <span className="history-time">
                    {new Date(item.time).toLocaleTimeString('vi-VN', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="food-grid">
          <h4>Gợi ý cho những buổi hẹn năm thứ hai</h4>
          <div className="foods-list">
            {foods.map(food => (
              <div 
                key={food.id} 
                className="food-item"
              >
                <span className="food-item-icon">{food.icon}</span>
                <span className="food-item-name">{food.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodPicker;
