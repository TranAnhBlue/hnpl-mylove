import { useState, useEffect, useRef } from 'react';
import './LoveSlideshow.css';
import { anniversaryMessages } from './anniversaryMessages';

// Tự động tạo danh sách ảnh từ love1.jpg đến love70.jpg
const loveImages = Array.from({ length: 70 }, (_, i) => {
  const num = i + 1;
  // Bỏ qua số 59 vì không có love59.jpg
  if (num === 59) return null;
  return `/images/love${num}.jpg`;
}).filter(Boolean);

function LoveSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const audioRef = useRef(null);
  const containerRef = useRef(null);

  // Hide mobile browser UI on mount
  useEffect(() => {
    // Request fullscreen on mobile
    const hideAddressBar = () => {
      if (containerRef.current) {
        // Scroll to hide address bar
        window.scrollTo(0, 1);
        
        // Try to enter fullscreen
        if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen().catch(() => {});
        } else if (containerRef.current.webkitRequestFullscreen) {
          containerRef.current.webkitRequestFullscreen().catch(() => {});
        } else if (containerRef.current.mozRequestFullScreen) {
          containerRef.current.mozRequestFullScreen().catch(() => {});
        } else if (containerRef.current.msRequestFullscreen) {
          containerRef.current.msRequestFullscreen().catch(() => {});
        }
      }
    };

    // Delay to ensure DOM is ready
    setTimeout(hideAddressBar, 100);
    
    // Hide on orientation change
    window.addEventListener('orientationchange', hideAddressBar);
    
    return () => {
      window.removeEventListener('orientationchange', hideAddressBar);
    };
  }, []);

  // Hàm bắt đầu phát nhạc
  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setShowPlayButton(false);
      }).catch(error => {
        console.log('Play prevented:', error);
      });
    }
  };

  // Auto-play nhạc khi component mount (thử)
  useEffect(() => {
    // Thử autoplay sau 500ms
    const timer = setTimeout(() => {
      startMusic();
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % loveImages.length);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  return (
    <div className="slideshow-container" ref={containerRef}>
      {/* Background with blur effect */}
      <div 
        className="slideshow-background"
        style={{ backgroundImage: `url(${loveImages[currentIndex]})` }}
      />

      {/* Main slideshow */}
      <div className="slideshow-content">
        {/* Nút Play lớn ở giữa màn hình */}
        {showPlayButton && (
          <div className="play-overlay" onClick={startMusic}>
            <div className="play-button-large">
              <div className="play-icon">▶</div>
              <p>Bấm để phát nhạc</p>
            </div>
          </div>
        )}

        {loveImages.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? 'active' : ''} ${
              index === (currentIndex - 1 + loveImages.length) % loveImages.length ? 'prev' : ''
            }`}
          >
            <img src={image} alt={`Love ${index + 1}`} />
          </div>
        ))}

        {/* Love message overlay */}
        <div className={`love-message ${showMessage ? 'show' : ''}`}>
          <p>{anniversaryMessages[currentIndex % anniversaryMessages.length]}</p>
        </div>

        {/* Hearts animation */}
        <div className="hearts-container">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="heart" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s` }}>
              💝
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="slideshow-controls">
          <button className="control-btn music-btn" onClick={toggleMusic} title={isPlaying ? 'Tắt nhạc' : 'Bật nhạc'}>
            {isPlaying ? '🔊' : '🔇'}
          </button>
          
          <div className="slide-counter">
            {currentIndex + 1} / {loveImages.length}
          </div>
          
          <button className="control-btn prev-btn" onClick={() => goToSlide((currentIndex - 1 + loveImages.length) % loveImages.length)} title="Ảnh trước">
            ◀
          </button>
          
          <button className="control-btn next-btn" onClick={() => goToSlide((currentIndex + 1) % loveImages.length)} title="Ảnh sau">
            ▶
          </button>

          <button className="control-btn fullscreen-btn" onClick={() => {
            if (document.fullscreenElement) {
              document.exitFullscreen();
            } else {
              document.documentElement.requestFullscreen();
            }
          }} title="Toàn màn hình">
            ⛶
          </button>
        </div>

        {/* Title */}
        <div className="slideshow-title">
          <h1>💕 Một Năm Yêu Nhau 💕</h1>
        </div>
      </div>

      {/* Audio - Nhạc nền "Lễ Đường Đi" - Autoplay */}
      <audio ref={audioRef} loop autoPlay>
        {/* File nhạc "Lễ Đường.mp3" đã có trong thư mục music */}
        <source src="/music/Lễ Đường.mp3" type="audio/mpeg" />
        
        {/* Nhạc dự phòng (nếu không tìm thấy file chính) */}
        <source src="https://cdn.pixabay.com/audio/2022/03/10/audio_4a8a7c9c45.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default LoveSlideshow;
