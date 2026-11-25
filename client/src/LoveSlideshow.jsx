import { useEffect, useMemo, useRef, useState } from 'react';
import './LoveSlideshow.css';
import { anniversaryMessages } from './anniversaryMessages';
import { readAnniversaryPhoto } from './anniversaryPhotoStorage';

const TOTAL_LOVE_IMAGES = 155;
const loveImages = Array.from({ length: TOTAL_LOVE_IMAGES }, (_, index) => `/images/love${index + 1}.jpg`);

const slideshowTracks = [
  { title: 'Em Đồng Ý (I Do)', src: '/music/Em Đồng Ý (I Do).mp3' },
  { title: 'Ngày Đầu Tiên', src: '/music/Ngày Đầu Tiên.mp3' },
  { title: 'Chăm Em Một Đời', src: '/music/Chăm Em Một Đời.mp3' },
];

const albumChapters = [
  { title: 'Ngày mình bắt đầu', subtitle: 'Những rung động đầu tiên của chúng mình.', start: 0, end: 31 },
  { title: 'Những lần đầu tiên', subtitle: 'Mỗi điều bình thường đều hóa thành một kỷ niệm.', start: 31, end: 62 },
  { title: 'Bình yên bên nhau', subtitle: 'Chỉ cần cạnh nhau, ngày nào cũng là ngày đáng nhớ.', start: 62, end: 93 },
  { title: 'Đi đâu cũng có nhau', subtitle: 'Những nơi mình từng đến và những cái nắm tay chưa rời.', start: 93, end: 124 },
  { title: 'Một năm thành chúng ta', subtitle: '155 khoảnh khắc và một câu chuyện vẫn đang viết tiếp.', start: 124, end: 155 },
];

const FAVORITES_KEY = 'love-album-favorites';

function readFavorites() {
  try {
    const value = JSON.parse(window.localStorage.getItem(FAVORITES_KEY) || '[]');
    return Array.isArray(value) ? value.filter(Number.isInteger) : [];
  } catch {
    return [];
  }
}

function getMemoryMessage(index) {
  if (index === TOTAL_LOVE_IMAGES) {
    return 'Tấm ảnh đầu tiên của năm thứ hai — và cũng là lời nhắc rằng câu chuyện của chúng mình vẫn đang được viết tiếp.';
  }
  return anniversaryMessages[index % anniversaryMessages.length].normalize('NFC');
}

function LoveSlideshow() {
  const [mode, setMode] = useState('welcome');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isSlideshowPlaying, setIsSlideshowPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [favorites, setFavorites] = useState(readFavorites);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [yearTwoPhotoUrl, setYearTwoPhotoUrl] = useState('');
  const audioRef = useRef(null);
  const containerRef = useRef(null);

  const favoriteSet = useMemo(() => new Set(favorites), [favorites]);
  const albumImages = useMemo(
    () => (yearTwoPhotoUrl ? [...loveImages, yearTwoPhotoUrl] : loveImages),
    [yearTwoPhotoUrl],
  );
  const visibleChapters = useMemo(() => (
    yearTwoPhotoUrl
      ? [...albumChapters, {
        title: 'Năm thứ hai bắt đầu',
        subtitle: 'Tấm ảnh đầu tiên được chụp ngay trong ngày kỷ niệm của chúng mình.',
        start: TOTAL_LOVE_IMAGES,
        end: TOTAL_LOVE_IMAGES + 1,
      }]
      : albumChapters
  ), [yearTwoPhotoUrl]);

  useEffect(() => {
    let active = true;
    let objectUrl = '';
    readAnniversaryPhoto().then((blob) => {
      if (!active || !blob) return;
      objectUrl = URL.createObjectURL(blob);
      setYearTwoPhotoUrl(objectUrl);
    });
    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  useEffect(() => {
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [mode]);

  useEffect(() => {
    if (mode !== 'film' || !isSlideshowPlaying || isFinished) return undefined;

    const timer = window.setTimeout(() => {
      if (currentIndex >= albumImages.length - 1) {
        setIsSlideshowPlaying(false);
        setIsFinished(true);
        setShowMessage(false);
        audioRef.current?.pause();
        return;
      }

      setCurrentIndex((index) => index + 1);
      setShowMessage(true);
      window.setTimeout(() => setShowMessage(false), 3000);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [albumImages.length, currentIndex, isFinished, isSlideshowPlaying, mode]);

  useEffect(() => {
    if (!isMusicPlaying || !audioRef.current) return;
    audioRef.current.load();
    audioRef.current.play().catch(() => setIsMusicPlaying(false));
  }, [currentTrackIndex]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (lightboxIndex === null) return;
      if (event.key === 'Escape') setLightboxIndex(null);
      if (event.key === 'ArrowLeft') setLightboxIndex((index) => (index - 1 + albumImages.length) % albumImages.length);
      if (event.key === 'ArrowRight') setLightboxIndex((index) => (index + 1) % albumImages.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [albumImages.length, lightboxIndex]);

  const requestFullscreen = () => {
    const element = containerRef.current;
    if (!element || document.fullscreenElement) return;
    const request = element.requestFullscreen || element.webkitRequestFullscreen;
    request?.call(element).catch(() => {});
  };

  const startFilm = (index = 0) => {
    setCurrentIndex(index);
    setCurrentTrackIndex(0);
    setIsFinished(false);
    setIsSlideshowPlaying(true);
    setShowMessage(true);
    setLightboxIndex(null);
    setMode('film');
    requestFullscreen();

    window.setTimeout(() => {
      if (!audioRef.current) return;
      audioRef.current.load();
      audioRef.current.play().catch(() => setIsMusicPlaying(false));
    }, 0);
  };

  const openAlbum = () => {
    audioRef.current?.pause();
    setIsSlideshowPlaying(false);
    setMode('album');
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  };

  const goBackHome = async () => {
    if (document.fullscreenElement) await document.exitFullscreen().catch(() => {});
    window.location.assign('/');
  };

  const toggleSlideshowPlayback = () => {
    if (isFinished) return;
    if (isSlideshowPlaying) {
      setIsSlideshowPlaying(false);
      audioRef.current?.pause();
      return;
    }

    setIsSlideshowPlaying(true);
    audioRef.current?.play().catch(() => setIsMusicPlaying(false));
  };

  const toggleFavorite = (index) => {
    setFavorites((current) => (
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index]
    ));
  };

  const openRandomMemory = () => {
    let nextIndex = Math.floor(Math.random() * albumImages.length);
    if (nextIndex === lightboxIndex) nextIndex = (nextIndex + 1) % albumImages.length;
    setLightboxIndex(nextIndex);
  };

  const playNextTrack = () => setCurrentTrackIndex((index) => (index + 1) % slideshowTracks.length);

  const renderWelcome = () => (
    <main className="album-welcome">
      <button type="button" className="slideshow-back-btn" onClick={goBackHome}>
        <span aria-hidden="true">‹</span> Quay lại
      </button>
      <div className="welcome-glow welcome-glow-one" />
      <div className="welcome-glow welcome-glow-two" />
      <section className="welcome-copy">
        <p className="welcome-eyebrow">KỶ NIỆM MỘT NĂM YÊU NHAU</p>
        <h1>
          <span>{albumImages.length} khoảnh khắc.</span>
          <em><span>Một câu chuyện</span><br /><span>của chúng mình.</span></em>
        </h1>
        <p>Đức Anh dành tặng Phương Linh một cuốn album có thể xem theo hai cách.</p>
      </section>
      <section className="experience-picker" aria-label="Chọn cách xem album">
        <button type="button" className="experience-card experience-film" onClick={() => startFilm(0)}>
          <span className="experience-number">01</span>
          <span className="experience-icon" aria-hidden="true">▶</span>
          <strong>Xem như một bộ phim</strong>
          <small>Ảnh tự chuyển theo nhạc, lời nhắn xuất hiện theo từng khoảnh khắc.</small>
          <span className="experience-action">Bắt đầu cuộn phim</span>
        </button>
        <button type="button" className="experience-card experience-album" onClick={openAlbum}>
          <span className="experience-number">02</span>
          <span className="experience-icon" aria-hidden="true">♡</span>
          <strong>Tự mình lật từng kỷ niệm</strong>
          <small>Khám phá {visibleChapters.length} chương, phóng lớn từng ảnh và giữ lại những tấm mình yêu nhất.</small>
          <span className="experience-action">Mở cuốn album</span>
        </button>
      </section>
      <p className="welcome-note">Một năm đầu tiên · 27.11.2025 — 27.11.2026</p>
    </main>
  );

  const renderFilm = () => (
    <main className="film-mode">
      <div className="slideshow-background" style={{ backgroundImage: `url(${albumImages[currentIndex]})` }} />
      <header className="film-header">
        <button type="button" className="slideshow-back-btn film-back" onClick={goBackHome}>
          <span aria-hidden="true">‹</span> Quay lại
        </button>
        <div className="mode-switcher" aria-label="Chuyển chế độ xem">
          <button type="button" className="active" aria-pressed="true">Cuộn phim</button>
          <button type="button" onClick={openAlbum}>Lật album</button>
        </div>
        <div className="film-progress" aria-label={`Ảnh ${currentIndex + 1} trên ${albumImages.length}`}>
          <span>{String(currentIndex + 1).padStart(3, '0')}</span>
          <i style={{ '--film-progress': `${((currentIndex + 1) / albumImages.length) * 100}%` }} />
          <span>{albumImages.length}</span>
        </div>
      </header>

      <div className="slideshow-content">
        <div
          key={currentIndex}
          className={`love-slide active ${isSlideshowPlaying ? '' : 'paused'}`}
          role="button"
          tabIndex="0"
          aria-label={isSlideshowPlaying ? 'Tạm dừng cuộn phim và nhạc' : 'Tiếp tục cuộn phim và nhạc'}
          onClick={toggleSlideshowPlayback}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              toggleSlideshowPlayback();
            }
          }}
        >
          <img src={albumImages[currentIndex]} alt={`Kỷ niệm của Đức Anh và Phương Linh, ảnh ${currentIndex + 1}`} />
          {!isSlideshowPlaying && !isFinished && (
            <div className="playback-paused-indicator" aria-hidden="true"><span>▶</span><p>Chạm để tiếp tục</p></div>
          )}
        </div>

        <div className={`love-message ${showMessage && !isFinished ? 'show' : ''}`}>
          <p>{getMemoryMessage(currentIndex)}</p>
        </div>

        {isFinished && (
          <section className="slideshow-ending" aria-labelledby="slideshow-ending-title">
            <span className="slideshow-ending-heart" aria-hidden="true">♡</span>
            <p className="slideshow-ending-eyebrow">HẾT MỘT NĂM ĐẦU TIÊN</p>
            <h2 id="slideshow-ending-title">Cảm ơn vợ đã cùng chồng đi qua {albumImages.length} khoảnh khắc này.</h2>
            <p>Chuyện của chúng mình vẫn còn rất nhiều điều đẹp đang chờ phía trước.</p>
            <div className="slideshow-ending-actions">
              <button type="button" className="ending-replay-btn" onClick={() => startFilm(0)}>Xem lại từ đầu</button>
              <button type="button" className="ending-album-btn" onClick={openAlbum}>Lật album ảnh</button>
              <button type="button" className="ending-exit-btn" onClick={goBackHome}>Về trang chính</button>
            </div>
          </section>
        )}
      </div>
    </main>
  );

  const renderAlbum = () => (
    <main className="manual-album">
      <header className="album-header">
        <button type="button" className="album-home-btn" onClick={goBackHome}><span aria-hidden="true">‹</span> Trang chính</button>
        <div className="mode-switcher album-switcher" aria-label="Chuyển chế độ xem">
          <button type="button" onClick={() => startFilm(0)}>Cuộn phim</button>
          <button type="button" className="active" aria-pressed="true">Lật album</button>
        </div>
      </header>

      <section className="album-hero">
        <div>
          <p className="welcome-eyebrow">ALBUM NĂM ĐẦU TIÊN</p>
          <h1>Mình đã có thật nhiều<br /><em>ngày đáng nhớ.</em></h1>
          <p>Không cần xem thật nhanh. Cứ chậm rãi lật lại từng ngày mình đã có nhau.</p>
        </div>
        <dl className="album-stats">
          <div><dt>Khoảnh khắc</dt><dd>{albumImages.length}</dd></div>
          <div><dt>Chương</dt><dd>{String(visibleChapters.length).padStart(2, '0')}</dd></div>
          <div><dt>Đã thả tim</dt><dd>{String(favorites.length).padStart(2, '0')}</dd></div>
        </dl>
      </section>

      <nav className="album-tools" aria-label="Công cụ album">
        <button type="button" onClick={openRandomMemory}>✦ Bốc một kỷ niệm</button>
        <button type="button" className={showFavoritesOnly ? 'active' : ''} onClick={() => setShowFavoritesOnly((value) => !value)} aria-pressed={showFavoritesOnly}>
          {showFavoritesOnly ? '♥ Đang xem ảnh yêu thích' : '♡ Xem ảnh yêu thích'}
        </button>
      </nav>

      {showFavoritesOnly && favorites.length === 0 ? (
        <section className="album-empty">
          <span>♡</span><h2>Chưa có tấm ảnh nào được thả tim</h2>
          <p>Mở một bức ảnh và chạm vào trái tim để giữ riêng tại đây nhé.</p>
          <button type="button" onClick={() => setShowFavoritesOnly(false)}>Xem toàn bộ album</button>
        </section>
      ) : (
        visibleChapters.map((chapter, chapterIndex) => {
          const chapterImages = albumImages
            .map((src, index) => ({ src, index }))
            .slice(chapter.start, chapter.end)
            .filter(({ index }) => !showFavoritesOnly || favoriteSet.has(index));
          if (chapterImages.length === 0) return null;

          return (
            <section className="album-chapter" key={chapter.title}>
              <header>
                <span>{String(chapterIndex + 1).padStart(2, '0')}</span>
                <div><h2>{chapter.title}</h2><p>{chapter.subtitle}</p></div>
                <small>{chapterImages.length} ảnh</small>
              </header>
              <div className="album-grid">
                {chapterImages.map(({ src, index }) => (
                  <button type="button" className={`album-photo album-photo-${index % 7} ${favoriteSet.has(index) ? 'is-favorite' : ''}`} key={src} onClick={() => setLightboxIndex(index)} aria-label={`Mở ảnh kỷ niệm ${index + 1}`}>
                    <img src={src} alt={`Khoảnh khắc ${index + 1} của Đức Anh và Phương Linh`} loading="lazy" />
                    <span>{String(index + 1).padStart(3, '0')}</span>
                    {favoriteSet.has(index) && <i aria-label="Đã thả tim">♥</i>}
                  </button>
                ))}
              </div>
            </section>
          );
        })
      )}

      <footer className="album-footer">
        <span aria-hidden="true">♡</span>
        <h2>Hết album, nhưng chưa hết chuyện của chúng mình.</h2>
        <p>Cùng nhau nắm tay qua 100 cái Tết nữa nhé vợ iu!</p>
        <button type="button" onClick={() => startFilm(0)}>Xem lại như một bộ phim</button>
      </footer>

      {lightboxIndex !== null && (
        <div className="album-lightbox" role="dialog" aria-modal="true" aria-label={`Ảnh ${lightboxIndex + 1} trên ${albumImages.length}`}>
          <button type="button" className="lightbox-close" onClick={() => setLightboxIndex(null)} aria-label="Đóng ảnh">×</button>
          <button type="button" className="lightbox-nav lightbox-prev" onClick={() => setLightboxIndex((lightboxIndex - 1 + albumImages.length) % albumImages.length)} aria-label="Ảnh trước">‹</button>
          <figure>
            <img src={albumImages[lightboxIndex]} alt={`Khoảnh khắc ${lightboxIndex + 1} của Đức Anh và Phương Linh`} />
            <figcaption><p>{getMemoryMessage(lightboxIndex)}</p><span>{String(lightboxIndex + 1).padStart(3, '0')} / {albumImages.length}</span></figcaption>
          </figure>
          <button type="button" className="lightbox-nav lightbox-next" onClick={() => setLightboxIndex((lightboxIndex + 1) % albumImages.length)} aria-label="Ảnh tiếp theo">›</button>
          <div className="lightbox-actions">
            <button type="button" onClick={() => toggleFavorite(lightboxIndex)} className={favoriteSet.has(lightboxIndex) ? 'active' : ''}>{favoriteSet.has(lightboxIndex) ? '♥ Đã giữ trong tim' : '♡ Giữ trong tim'}</button>
            <button type="button" onClick={openRandomMemory}>✦ Ảnh ngẫu nhiên</button>
            <button type="button" onClick={() => startFilm(lightboxIndex)}>▶ Xem phim từ đây</button>
          </div>
        </div>
      )}
    </main>
  );

  return (
    <div className={`slideshow-container mode-${mode}`} ref={containerRef}>
      {mode === 'welcome' && renderWelcome()}
      {mode === 'film' && renderFilm()}
      {mode === 'album' && renderAlbum()}
      <audio ref={audioRef} src={slideshowTracks[currentTrackIndex].src} preload="auto" onPlay={() => setIsMusicPlaying(true)} onPause={() => setIsMusicPlaying(false)} onEnded={playNextTrack} />
    </div>
  );
}

export default LoveSlideshow;
