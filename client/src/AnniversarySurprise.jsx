import { useEffect, useMemo, useRef, useState } from 'react';
import './AnniversarySurprise.css';
import { deleteAnniversaryPhoto, readAnniversaryPhoto, saveAnniversaryPhoto } from './anniversaryPhotoStorage';

const UNLOCK_DATE = new Date('2027-11-27T00:00:00+07:00');
const CAPSULE_KEY = 'anniversary-time-capsule-2027';
const YEAR_TWO_STARTED_KEY = 'anniversary-year-two-started';
const VOICE_DB = 'anniversary-surprise';
const VOICE_STORE = 'voice';

const letterScenes = [
  {
    image: '/images/love1.jpg',
    gallery: ['/images/love2.jpg', '/images/love3.jpg', '/images/love4.jpg', '/images/love5.jpg'],
    eyebrow: 'GỬI PHƯƠNG LINH',
    text: 'Vậy là chúng mình đã đi cùng nhau trọn vẹn một năm rồi, vợ yêu nhỉ?',
  },
  {
    image: '/images/love22.jpg',
    gallery: ['/images/love23.jpg', '/images/love24.jpg', '/images/love25.jpg', '/images/love26.jpg'],
    eyebrow: 'TỪ NGÀY CÓ EM',
    text: 'Những điều rất bình thường cũng trở nên đặc biệt. Một lời hỏi han, một bữa ăn hay chỉ là khoảnh khắc được nhìn thấy em cười.',
  },
  {
    image: '/images/love82.jpg',
    gallery: ['/images/love83.jpg', '/images/love84.jpg', '/images/love85.jpg', '/images/love86.jpg'],
    eyebrow: 'CẢM ƠN EM',
    text: 'Cảm ơn em vì đã luôn ở bên lắng nghe, cảm thông và nắm chặt tay anh qua biết bao thăng trầm.',
  },
  {
    image: '/images/love116.jpg',
    gallery: ['/images/love117.jpg', '/images/love118.jpg', '/images/love119.jpg', '/images/love120.jpg'],
    eyebrow: 'NĂM THỨ HAI',
    text: 'Anh hứa sẽ luôn yêu thương, quan tâm, chăm sóc và dành những điều tốt đẹp, ý nghĩa nhất cho em.',
  },
  {
    image: '/images/love146.jpg',
    gallery: ['/images/love147.jpg', '/images/love148.jpg', '/images/love149.jpg', '/images/love150.jpg'],
    eyebrow: 'ĐỨC ANH ♡ PHƯƠNG LINH',
    text: 'Cùng nhau nắm tay qua 100 cái Tết nữa nhé vợ iu. Anh yêu em, thế thôi!',
  },
];

function loadCapsule() {
  try {
    const value = JSON.parse(window.localStorage.getItem(CAPSULE_KEY) || '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function loadYearTwoStarted() {
  return window.localStorage.getItem(YEAR_TWO_STARTED_KEY) === 'true';
}

function openVoiceDatabase() {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(VOICE_DB, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(VOICE_STORE)) {
        request.result.createObjectStore(VOICE_STORE);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function readVoiceRecording() {
  const database = await openVoiceDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(VOICE_STORE, 'readonly');
    const request = transaction.objectStore(VOICE_STORE).get('anniversary-letter');
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => database.close();
  });
}

async function saveVoiceRecording(blob) {
  const database = await openVoiceDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(VOICE_STORE, 'readwrite');
    transaction.objectStore(VOICE_STORE).put(blob, 'anniversary-letter');
    transaction.oncomplete = () => {
      database.close();
      resolve();
    };
    transaction.onerror = () => reject(transaction.error);
  });
}

export default function AnniversarySurprise() {
  const [activeSection, setActiveSection] = useState('letter');
  const [sceneIndex, setSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLetterFinished, setIsLetterFinished] = useState(false);
  const [showVoiceSetup, setShowVoiceSetup] = useState(false);
  const [voiceUrl, setVoiceUrl] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingError, setRecordingError] = useState('');
  const [capsules, setCapsules] = useState(loadCapsule);
  const [author, setAuthor] = useState('Chồng');
  const [wish, setWish] = useState('');
  const [destination, setDestination] = useState('');
  const [promise, setPromise] = useState('');
  const [justSealed, setJustSealed] = useState(false);
  const [anniversaryPhotoUrl, setAnniversaryPhotoUrl] = useState('');
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [photoCountdown, setPhotoCountdown] = useState(0);
  const [yearTwoStarted, setYearTwoStarted] = useState(loadYearTwoStarted);
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const fallbackTimerRef = useRef(null);
  const cameraStreamRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const isUnlocked = Date.now() >= UNLOCK_DATE.getTime();
  const daysRemaining = Math.max(0, Math.ceil((UNLOCK_DATE.getTime() - Date.now()) / 86400000));

  const countdown = useMemo(() => ({
    days: daysRemaining,
    months: Math.max(0, Math.floor(daysRemaining / 30)),
  }), [daysRemaining]);

  useEffect(() => {
    let objectUrl = '';
    readVoiceRecording().then((blob) => {
      if (!blob) return;
      objectUrl = URL.createObjectURL(blob);
      setVoiceUrl(objectUrl);
    }).catch(() => {});

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      window.clearInterval(fallbackTimerRef.current);
      mediaRecorderRef.current?.stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  useEffect(() => {
    let objectUrl = '';
    readAnniversaryPhoto().then((blob) => {
      if (!blob) return;
      objectUrl = URL.createObjectURL(blob);
      setAnniversaryPhotoUrl(objectUrl);
    }).catch(() => {});

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      cameraStreamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  useEffect(() => {
    window.localStorage.setItem(CAPSULE_KEY, JSON.stringify(capsules));
  }, [capsules]);

  const runFallbackLetter = () => {
    window.clearInterval(fallbackTimerRef.current);
    fallbackTimerRef.current = window.setInterval(() => {
      setSceneIndex((current) => {
        if (current >= letterScenes.length - 1) {
          window.clearInterval(fallbackTimerRef.current);
          setIsPlaying(false);
          setIsLetterFinished(true);
          return current;
        }
        return current + 1;
      });
    }, 6000);
  };

  const startLetter = () => {
    setSceneIndex(0);
    setIsLetterFinished(false);
    setIsPlaying(true);

    if (voiceUrl && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(runFallbackLetter);
    } else {
      runFallbackLetter();
    }
  };

  const toggleLetter = () => {
    if (!isPlaying) {
      startLetter();
      return;
    }
    setIsPlaying(false);
    window.clearInterval(fallbackTimerRef.current);
    audioRef.current?.pause();
  };

  const syncSceneToAudio = () => {
    const audio = audioRef.current;
    if (!audio?.duration) return;
    const nextScene = Math.min(letterScenes.length - 1, Math.floor((audio.currentTime / audio.duration) * letterScenes.length));
    setSceneIndex(nextScene);
  };

  const startRecording = async () => {
    setRecordingError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recordedChunksRef.current = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size) recordedChunksRef.current.push(event.data);
      };
      recorder.onstop = async () => {
        const blob = new Blob(recordedChunksRef.current, { type: recorder.mimeType || 'audio/webm' });
        await saveVoiceRecording(blob);
        setVoiceUrl((current) => {
          if (current) URL.revokeObjectURL(current);
          return URL.createObjectURL(blob);
        });
        stream.getTracks().forEach((track) => track.stop());
        setIsRecording(false);
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
    } catch {
      setRecordingError('Chưa thể dùng micro. Hãy cho phép truy cập micro rồi thử lại nhé.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') mediaRecorderRef.current.stop();
  };

  const handleVoiceFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await saveVoiceRecording(file);
    setVoiceUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return URL.createObjectURL(file);
    });
  };

  const sealCapsule = (event) => {
    event.preventDefault();
    if (!wish.trim() || !destination.trim() || !promise.trim()) return;
    setCapsules((current) => [...current, {
      id: Date.now(), author, wish: wish.trim(), destination: destination.trim(), promise: promise.trim(), sealedAt: new Date().toISOString(),
    }]);
    setWish('');
    setDestination('');
    setPromise('');
    setJustSealed(true);
    window.setTimeout(() => setJustSealed(false), 4000);
  };

  const stopCamera = () => {
    cameraStreamRef.current?.getTracks().forEach((track) => track.stop());
    cameraStreamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraOpen(false);
    setPhotoCountdown(0);
  };

  const selectSection = (section) => {
    if (section !== 'photo') stopCamera();
    setActiveSection(section);
  };

  const startCamera = async () => {
    setCameraError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1600 }, height: { ideal: 1200 } },
        audio: false,
      });
      cameraStreamRef.current = stream;
      setCameraOpen(true);
      window.setTimeout(() => {
        if (!videoRef.current) return;
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }, 0);
    } catch {
      setCameraError('Chưa thể mở camera. Hãy cho phép truy cập camera rồi thử lại nhé.');
    }
  };

  const captureAnniversaryPhoto = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !video.videoWidth || !video.videoHeight) return;

    for (let count = 3; count >= 1; count -= 1) {
      setPhotoCountdown(count);
      await new Promise((resolve) => window.setTimeout(resolve, 900));
    }
    setPhotoCountdown(0);

    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    context.save();
    context.translate(width, 0);
    context.scale(-1, 1);
    context.drawImage(video, 0, 0, width, height);
    context.restore();

    const gradient = context.createLinearGradient(0, height * 0.55, 0, height);
    gradient.addColorStop(0, 'rgba(35, 7, 20, 0)');
    gradient.addColorStop(1, 'rgba(70, 15, 38, 0.78)');
    context.fillStyle = gradient;
    context.fillRect(0, height * 0.45, width, height * 0.55);
    context.strokeStyle = 'rgba(255, 242, 238, 0.92)';
    context.lineWidth = Math.max(8, width * 0.012);
    context.strokeRect(context.lineWidth / 2, context.lineWidth / 2, width - context.lineWidth, height - context.lineWidth);
    context.fillStyle = '#fff9f5';
    context.textAlign = 'center';
    context.font = `700 ${Math.max(28, width * 0.045)}px "Segoe UI", Arial, sans-serif`;
    context.fillText('ĐỨC ANH ♡ PHƯƠNG LINH', width / 2, height - Math.max(88, height * 0.12));
    context.font = `500 ${Math.max(18, width * 0.024)}px "Segoe UI", Arial, sans-serif`;
    context.fillText('NĂM THỨ HAI BẮT ĐẦU · 27.11.2026', width / 2, height - Math.max(42, height * 0.055));

    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.92));
    if (!blob) return;
    await saveAnniversaryPhoto(blob);
    window.localStorage.removeItem(YEAR_TWO_STARTED_KEY);
    setYearTwoStarted(false);
    setAnniversaryPhotoUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return URL.createObjectURL(blob);
    });
    stopCamera();
  };

  const removeAnniversaryPhoto = async () => {
    const shouldDelete = window.confirm('Xóa tấm ảnh này khỏi kỷ niệm năm thứ hai?');
    if (!shouldDelete) return;
    stopCamera();
    await deleteAnniversaryPhoto();
    window.localStorage.removeItem(YEAR_TWO_STARTED_KEY);
    setYearTwoStarted(false);
    setAnniversaryPhotoUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return '';
    });
    setCameraError('');
  };

  const beginYearTwo = () => {
    window.localStorage.setItem(YEAR_TWO_STARTED_KEY, 'true');
    setYearTwoStarted(true);
  };

  const scene = letterScenes[sceneIndex];

  return (
    <main className="surprise-page">
      <header className="surprise-header">
        <a href="/" className="surprise-home"><span aria-hidden="true">‹</span> Trang chính</a>
        <p>Đức Anh <span>♡</span> Phương Linh</p>
        <nav aria-label="Chọn phần bất ngờ">
          <button type="button" className={activeSection === 'letter' ? 'active' : ''} onClick={() => selectSection('letter')}>Lời của anh</button>
          <button type="button" className={activeSection === 'capsule' ? 'active' : ''} onClick={() => selectSection('capsule')}>Hộp năm thứ hai</button>
          <button type="button" className={activeSection === 'photo' ? 'active' : ''} onClick={() => selectSection('photo')}>Ảnh năm thứ hai</button>
        </nav>
      </header>

      {activeSection === 'letter' ? (
        <section className="voice-letter" aria-labelledby="voice-letter-title">
          <div className="voice-letter-photo" style={{ backgroundImage: `url(${scene.image})` }}>
            <div className="voice-photo-collage" key={sceneIndex}>
              <figure className="voice-photo-main">
                <img src={scene.image} alt={`Kỷ niệm chính của Đức Anh và Phương Linh, phần ${sceneIndex + 1}`} />
              </figure>
              {scene.gallery.map((image, imageIndex) => (
                <figure className={`voice-photo-small voice-photo-small-${imageIndex + 1}`} key={image}>
                  <img src={image} alt={`Kỷ niệm ${sceneIndex * 5 + imageIndex + 2} của Đức Anh và Phương Linh`} />
                </figure>
              ))}
            </div>
            <span>{String(sceneIndex + 1).padStart(2, '0')} / {String(letterScenes.length).padStart(2, '0')}</span>
          </div>
          <div className="voice-letter-copy">
            <p className="surprise-eyebrow">{scene.eyebrow}</p>
            <h1 id="voice-letter-title">{scene.text}</h1>
            <div className="letter-progress" aria-hidden="true">
              {letterScenes.map((item, index) => <i key={item.eyebrow} className={index <= sceneIndex ? 'active' : ''} />)}
            </div>
            <div className="voice-letter-actions">
              <button type="button" className="letter-play" onClick={toggleLetter}>{isPlaying ? 'Tạm dừng' : isLetterFinished ? 'Nghe lại từ đầu' : 'Bắt đầu lá thư'} <span>{isPlaying ? 'Ⅱ' : '▶'}</span></button>
              <button type="button" className="voice-setup-toggle" onClick={() => setShowVoiceSetup((value) => !value)}>{voiceUrl ? 'Đổi bản thu' : 'Thêm giọng nói của Đức Anh'}</button>
            </div>
            {isLetterFinished && (
              <div className="letter-finale" role="status">
                <strong>Phương Linh, cùng anh bước sang năm thứ hai nhé?</strong>
                <button type="button" onClick={() => selectSection('photo')}>Em đồng ý ♡</button>
              </div>
            )}
            {showVoiceSetup && (
              <aside className="voice-setup">
                <div><strong>{voiceUrl ? 'Bản thu đã sẵn sàng' : 'Thu lời nhắn ngay trên thiết bị này'}</strong><p>Bản thu được giữ riêng trong trình duyệt, không tự tải lên mạng.</p></div>
                <div className="voice-setup-actions">
                  {!isRecording ? <button type="button" onClick={startRecording}>● Bắt đầu thu</button> : <button type="button" className="recording" onClick={stopRecording}>■ Dừng và lưu</button>}
                  <label>Chọn file có sẵn<input type="file" accept="audio/*" onChange={handleVoiceFile} /></label>
                </div>
                {recordingError && <p className="voice-error">{recordingError}</p>}
              </aside>
            )}
          </div>
          {voiceUrl && <audio ref={audioRef} src={voiceUrl} onTimeUpdate={syncSceneToAudio} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} onEnded={() => { setSceneIndex(letterScenes.length - 1); setIsPlaying(false); setIsLetterFinished(true); }} />}
        </section>
      ) : activeSection === 'capsule' ? (
        <section className="time-capsule" aria-labelledby="capsule-title">
          <div className="capsule-intro">
            <p className="surprise-eyebrow">MỞ LẠI VÀO 27.11.2027</p>
            <h1 id="capsule-title">Một chiếc hộp dành cho<br /><em>chúng mình của năm sau.</em></h1>
            <p>Viết những điều hai đứa muốn cùng thực hiện, rồi niêm phong lại. Đúng ngày kỷ niệm tiếp theo, chiếc hộp sẽ tự mở.</p>
            <div className="capsule-countdown">
              <div><strong>{countdown.months}</strong><span>tháng</span></div>
              <div><strong>{countdown.days}</strong><span>ngày còn lại</span></div>
              <div><strong>{capsules.length}</strong><span>lá thư đã khóa</span></div>
            </div>
          </div>

          {isUnlocked ? (
            <div className="opened-capsules">
              <p className="surprise-eyebrow">CHIẾC HỘP ĐÃ MỞ</p>
              {capsules.map((capsule) => (
                <article key={capsule.id}>
                  <span>Từ {capsule.author} · {new Date(capsule.sealedAt).toLocaleDateString('vi-VN')}</span>
                  <h2>Điều muốn cùng nhau làm</h2><p>{capsule.wish}</p>
                  <h2>Nơi muốn cùng nhau đến</h2><p>{capsule.destination}</p>
                  <h2>Lời hứa dành cho nhau</h2><p>{capsule.promise}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="capsule-workspace">
              <form className="capsule-form" onSubmit={sealCapsule}>
                <div className="capsule-author"><span>Người viết</span><button type="button" className={author === 'Chồng' ? 'active' : ''} onClick={() => setAuthor('Chồng')}>Chồng</button><button type="button" className={author === 'Vợ' ? 'active' : ''} onClick={() => setAuthor('Vợ')}>Vợ</button></div>
                <label><span>Một điều muốn cùng nhau thực hiện</span><textarea value={wish} onChange={(event) => setWish(event.target.value)} placeholder="Ví dụ: Cùng nhau đón bình minh ở một nơi thật xa..." required /></label>
                <label><span>Một nơi muốn cùng nhau đến</span><input value={destination} onChange={(event) => setDestination(event.target.value)} placeholder="Nơi mà hai đứa vẫn luôn nhắc tới..." required /></label>
                <label><span>Một lời hứa dành cho đối phương</span><textarea value={promise} onChange={(event) => setPromise(event.target.value)} placeholder="Năm thứ hai, anh/em hứa sẽ..." required /></label>
                <button type="submit" className="seal-button">Niêm phong đến 27.11.2027 <span>♡</span></button>
                {justSealed && <p className="sealed-success" role="status">Đã cất lời nhắn vào chiếc hộp của năm thứ hai.</p>}
              </form>
              <aside className="sealed-stack">
                <div className="capsule-lock"><span>♡</span><strong>{capsules.length ? `${capsules.length} lá thư đang được giữ kín` : 'Chiếc hộp đang chờ lời nhắn đầu tiên'}</strong><p>Nội dung sẽ không hiện lại trước ngày mở hộp.</p></div>
                {capsules.map((capsule, index) => <div className="sealed-envelope" key={capsule.id} style={{ '--envelope-index': index }}><span>Gửi chúng mình của năm thứ hai</span><small>Từ {capsule.author}</small><i>27 · 11 · 2027</i></div>)}
              </aside>
            </div>
          )}
        </section>
      ) : (
        <section className="year-two-photo" aria-labelledby="year-two-photo-title">
          <div className="year-two-photo-intro">
            <p className="surprise-eyebrow">KHOẢNH KHẮC SỐ 171</p>
            <h1 id="year-two-photo-title">Chụp tấm ảnh đầu tiên<br /><em>của năm thứ hai.</em></h1>
            <p>Không cần tạo dáng thật hoàn hảo. Chỉ cần hai đứa cùng có mặt trong khoảnh khắc này.</p>
          </div>

          <div className="year-two-camera-card">
            {anniversaryPhotoUrl && !cameraOpen ? (
              <figure className="captured-anniversary-photo">
                <img src={anniversaryPhotoUrl} alt="Khoảnh khắc đầu tiên trong năm thứ hai của Đức Anh và Phương Linh" />
                <figcaption>
                  <div><span>ẢNH 171</span><strong>Năm thứ hai đã bắt đầu.</strong></div>
                  <div className="captured-photo-actions">
                    <a href={anniversaryPhotoUrl} download="duc-anh-phuong-linh-nam-thu-hai.jpg">Tải ảnh về</a>
                    <button type="button" onClick={startCamera}>Chụp lại</button>
                    <button type="button" className="delete-photo-button" onClick={removeAnniversaryPhoto}>Xóa ảnh</button>
                    <a href="/love-slideshow">Mở album 171 ảnh</a>
                  </div>
                </figcaption>
              </figure>
            ) : cameraOpen ? (
              <div className="camera-stage">
                <video ref={videoRef} playsInline muted aria-label="Khung xem trước camera" />
                <div className="camera-frame-copy"><strong>ĐỨC ANH ♡ PHƯƠNG LINH</strong><span>NĂM THỨ HAI BẮT ĐẦU · 27.11.2026</span></div>
                {photoCountdown > 0 && <div className="camera-countdown" aria-live="assertive">{photoCountdown}</div>}
                <div className="camera-actions">
                  <button type="button" onClick={stopCamera}>Đóng camera</button>
                  <button type="button" className="camera-shutter" onClick={captureAnniversaryPhoto} disabled={photoCountdown > 0} aria-label="Chụp ảnh"><span /></button>
                  <button type="button" onClick={captureAnniversaryPhoto} disabled={photoCountdown > 0}>Đếm 3 giây và chụp</button>
                </div>
              </div>
            ) : (
              <div className="camera-placeholder">
                <div className="camera-placeholder-collage" aria-hidden="true">
                  <img src="/images/love1.jpg" alt="" />
                  <img src="/images/love82.jpg" alt="" />
                  <img src="/images/love146.jpg" alt="" />
                </div>
                <span className="camera-heart" aria-hidden="true">♡</span>
                <h2>Sẵn sàng cho một kỷ niệm mới?</h2>
                <p>Ảnh được lưu riêng trên thiết bị này và tự xuất hiện ở cuối album.</p>
                <button type="button" onClick={startCamera}>Mở camera và chụp cùng nhau</button>
                {cameraError && <p className="camera-error" role="alert">{cameraError}</p>}
              </div>
            )}
          </div>
          {anniversaryPhotoUrl && !cameraOpen && (
            <section className={`year-two-finale ${yearTwoStarted ? 'is-started' : ''}`} aria-live="polite">
              <div className="finale-hearts" aria-hidden="true">
                <i>♡</i><i>♡</i><i>♡</i><i>♡</i><i>♡</i>
              </div>
              {!yearTwoStarted ? (
                <>
                  <p className="surprise-eyebrow">LỜI KẾT CỦA NĂM ĐẦU TIÊN</p>
                  <h2>170 tấm ảnh kể lại những gì mình đã đi qua.<br /><em>Tấm ảnh này mở đầu những điều đang chờ phía trước.</em></h2>
                  <p>Năm thứ hai không cần hoàn hảo. Chỉ cần chúng mình vẫn chọn cùng nhau đi tiếp.</p>
                  <div className="year-two-finale-actions">
                    <a href={anniversaryPhotoUrl} download="duc-anh-phuong-linh-nam-thu-hai.jpg">Cất khoảnh khắc này</a>
                    <button type="button" onClick={beginYearTwo}>Bắt đầu năm thứ hai ♡</button>
                  </div>
                </>
              ) : (
                <>
                  <span className="finale-seal" aria-hidden="true">♡</span>
                  <p className="surprise-eyebrow">27 · 11 · 2026</p>
                  <h2>Năm thứ hai<br /><em>chính thức bắt đầu.</em></h2>
                  <p>Hẹn gặp lại ở đây vào ngày 27.11.2027, với thêm thật nhiều câu chuyện của hai đứa.</p>
                  <div className="year-two-finale-actions">
                    <a href="/love-slideshow">Mở album 171 ảnh</a>
                    <a className="finale-home-link" href="/">Về trang chính</a>
                  </div>
                </>
              )}
            </section>
          )}
          <canvas ref={canvasRef} className="camera-canvas" aria-hidden="true" />
        </section>
      )}
    </main>
  );
}
