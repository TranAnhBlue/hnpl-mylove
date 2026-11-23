import { useState, useEffect, useRef } from 'react';
import './LoveSlideshow.css';
import { anniversaryMessages } from './anniversaryMessages';

// Danh sách 155 ảnh kỷ niệm hiện có, từ love1.jpg đến love155.jpg.
const TOTAL_LOVE_IMAGES = 155;
const loveImages = Array.from(
  { length: TOTAL_LOVE_IMAGES },
  (_, index) => `/images/love${index + 1}.jpg`,
);

const slideshowTracks = [
  { title: 'Em Đồng Ý (I Do)', src: '/music/Em Đồng Ý (I Do).mp3' },
  { title: 'Ngày Đầu Tiên', src: '/music/Ngày Đầu Tiên.mp3' },
];

function LoveSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isSlideshowPlaying, setIsSlideshowPlaying] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
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
        setIsMusicPlaying(true);
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
    if (!isSlideshowPlaying || isFinished) return undefined;

    const timer = setTimeout(() => {
      if (currentIndex >= loveImages.length - 1) {
        setIsSlideshowPlaying(false);
        setIsFinished(true);
        setShowMessage(false);
        audioRef.current?.pause();
        return;
      }

      setCurrentIndex(currentIndex + 1);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentIndex, isFinished, isSlideshowPlaying]);

  const playNextTrack = () => {
    setCurrentTrackIndex(index => (index + 1) % slideshowTracks.length);
  };

  useEffect(() => {
    if (!isMusicPlaying || !audioRef.current) return;
    audioRef.current.load();
    audioRef.current.play().catch(error => {
      console.log('Play prevented:', error);
    });
  }, [currentTrackIndex]);

  const goBackHome = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => {});
    }
    window.location.assign('/');
  };

  const replaySlideshow = () => {
    setCurrentIndex(0);
    setCurrentTrackIndex(0);
    setIsFinished(false);
    setIsSlideshowPlaying(true);
    setShowMessage(true);
    setShowPlayButton(false);

    window.setTimeout(() => {
      if (!audioRef.current) return;
      audioRef.current.load();
      audioRef.current.play().catch(error => {
        console.log('Play prevented:', error);
      });
    }, 0);
  };

  const toggleSlideshowPlayback = () => {
    if (isFinished) return;

    if (isSlideshowPlaying) {
      setIsSlideshowPlaying(false);
      audioRef.current?.pause();
      return;
    }

    setIsSlideshowPlaying(true);
    audioRef.current?.play().catch(error => {
      console.log('Play prevented:', error);
    });
  };

  const handleSlideKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleSlideshowPlayback();
    }
  };

  return (
    <div className="slideshow-container" ref={containerRef}>
      <button type="button" className="slideshow-back-btn" onClick={goBackHome} aria-label="Quay lại trang chính">
        <span aria-hidden="true">‹</span> Quay lại
      </button>

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

        <div
          key={currentIndex}
          className={`love-slide active ${isSlideshowPlaying ? '' : 'paused'}`}
          role="button"
          tabIndex="0"
          aria-label={isSlideshowPlaying ? 'Tạm dừng slideshow và nhạc' : 'Tiếp tục slideshow và nhạc'}
          onClick={toggleSlideshowPlayback}
          onKeyDown={handleSlideKeyDown}
        >
          <img
            src={loveImages[currentIndex]}
            alt={`Kỷ niệm của Đức Anh và Phương Linh, ảnh ${currentIndex + 1}`}
          />
          {!isSlideshowPlaying && (
            <div className="playback-paused-indicator" aria-hidden="true">
              <span>▶</span>
              <p>Chạm để tiếp tục</p>
            </div>
          )}
        </div>

        {/* Love message overlay */}
        <div className={`love-message ${showMessage ? 'show' : ''}`}>
          <p>{anniversaryMessages[currentIndex % anniversaryMessages.length]}</p>
        </div>

        {isFinished && (
          <section className="slideshow-ending" aria-labelledby="slideshow-ending-title">
            <span className="slideshow-ending-heart" aria-hidden="true">♡</span>
            <p className="slideshow-ending-eyebrow">HẾT MỘT NĂM ĐẦU TIÊN</p>
            <h2 id="slideshow-ending-title">Cảm ơn vợ đã cùng chồng đi qua 155 khoảnh khắc này.</h2>
            <p>Chuyện của chúng mình vẫn còn rất nhiều điều đẹp đang chờ phía trước.</p>
            <div className="slideshow-ending-actions">
              <button type="button" className="ending-replay-btn" onClick={replaySlideshow}>Xem lại từ đầu</button>
              <button type="button" className="ending-exit-btn" onClick={goBackHome}>Thoát về trang chính</button>
            </div>
          </section>
        )}

        {/* Hearts animation */}
        <div className="hearts-container">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="heart" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s` }}>
              💝
            </div>
          ))}
        </div>

        {/* Title */}
        <div className="slideshow-title">
          <h1>💕 Một Năm Yêu Nhau 💕</h1>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={slideshowTracks[currentTrackIndex].src}
        preload="auto"
        autoPlay
        onPlay={() => {
          setIsMusicPlaying(true);
          setShowPlayButton(false);
        }}
        onPause={() => setIsMusicPlaying(false)}
        onEnded={playNextTrack}
      />
    </div>
  );
}

export default LoveSlideshow;
