import { useState } from 'react';
import './FoodPicker.css';

const foods = [
  { 
    id: 1, 
    name: 'Cửu Vân Long', 
    icon: '🍜',
    type: 'Quán ăn',
    description: 'Món Trung Hoa đặc sắc'
  },
  { 
    id: 2, 
    name: 'Som Tum Thai', 
    icon: '🥗',
    type: 'Quán ăn',
    description: 'Ẩm thực Thái Lan'
  },
  { 
    id: 3, 
    name: 'Bít Tết', 
    icon: '🥩',
    type: 'Món ăn',
    description: 'Thịt bò nướng thơm ngon'
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
    name: 'Brunch', 
    icon: '🥞',
    type: 'Món ăn',
    description: 'Bữa sáng - trưa'
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
        
        <h2 className="unified-title">🍽️ Hôm Nay Ăn Gì?</h2>
        <p className="unified-subtitle">Để mình chọn món cho bạn nhé!</p>

        <div className="food-display">
          {!selectedFood ? (
            <div className="food-placeholder">
              <div className="food-icon-large">🤔</div>
              <p>Nhấn nút bên dưới để bốc món!</p>
            </div>
          ) : (
            <div className={`food-result ${isPicking ? 'picking' : 'selected'}`}>
              <div className="food-icon-large">{selectedFood.icon}</div>
              <h3 className="food-name">{selectedFood.name}</h3>
              <div className="food-type-badge">{selectedFood.type}</div>
              <p className="food-description">{selectedFood.description}</p>
            </div>
          )}
        </div>

        <button 
          className="food-pick-btn"
          onClick={pickFood}
          disabled={isPicking}
        >
          {isPicking ? '🎲 Đang chọn...' : selectedFood ? '🔄 Chọn Lại' : '🎲 Bốc Món'}
        </button>

        {history.length > 0 && (
          <div className="food-history">
            <h4>📜 Lịch sử bốc món</h4>
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
          <h4>🍴 Tất cả món ăn</h4>
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
