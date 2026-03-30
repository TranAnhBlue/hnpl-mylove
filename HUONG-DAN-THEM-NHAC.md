# 🎵 Hướng Dẫn Thêm Nhạc Nền Cho Slideshow

## 🎶 Cách 1: Thêm File Nhạc Vào Dự Án (Khuyên Dùng)

### Bước 1: Chuẩn bị file nhạc
1. Tải bài "Lễ Đường Đi" hoặc bài nhạc yêu thích
2. Chuyển đổi sang định dạng MP3 (nếu chưa phải)
3. Đổi tên file thành `le-duong-di.mp3` (hoặc tên khác)

### Bước 2: Thêm vào dự án
```bash
# Tạo thư mục music trong public
mkdir client/public/music

# Copy file nhạc vào
# Windows:
copy "đường-dẫn-file-nhạc.mp3" client/public/music/le-duong-di.mp3

# Mac/Linux:
cp "đường-dẫn-file-nhạc.mp3" client/public/music/le-duong-di.mp3
```

### Bước 3: Code đã sẵn sàng!
File `client/src/LoveSlideshow.jsx` đã được cấu hình sẵn:

```jsx
<audio ref={audioRef} loop>
  <source src="/music/le-duong-di.mp3" type="audio/mpeg" />
  {/* Nhạc dự phòng nếu không tìm thấy file */}
  <source src="https://cdn.pixabay.com/audio/2022/03/10/audio_4a8a7c9c45.mp3" type="audio/mpeg" />
</audio>
```

**Bạn chỉ cần:**
1. Tải bài "Lễ Đường Đi" về
2. Đổi tên thành `le-duong-di.mp3`
3. Copy vào `client/public/music/`
4. Xong! Mở slideshow và bật nhạc 🎵

## 🎵 Cách 2: Dùng Link Online

### Từ YouTube (Cần convert)
1. Tìm bài "Lễ Đường Đi" trên YouTube
2. Dùng tool convert YouTube to MP3 (ví dụ: y2mate.com)
3. Upload file MP3 lên hosting (Google Drive, Dropbox, etc.)
4. Lấy direct link
5. Thay vào code:

```jsx
<audio ref={audioRef} loop>
  <source src="LINK_TRỰC_TIẾP_CỦA_BẠN" type="audio/mpeg" />
</audio>
```

### Từ Free Music Libraries
**Pixabay Audio** (Free, không bản quyền):
- Link: https://pixabay.com/music/
- Tìm "romantic", "wedding", "love"
- Download và làm theo Cách 1

**YouTube Audio Library** (Free):
- Link: https://studio.youtube.com/channel/UC.../music
- Cần tài khoản YouTube
- Download nhạc free

**Free Music Archive**:
- Link: https://freemusicarchive.org/
- Tìm "wedding march", "romantic"

## 🎼 Gợi Ý Bài Nhạc Lãng Mạn

### 🎵 Nhạc Việt Đám Cưới:
1. **Lễ Đường Đi** - Various Artists ⭐ (Đã cấu hình sẵn!)
   - Bài nhạc cưới truyền thống
   - Trang trọng, lãng mạn
   - Phù hợp cho slideshow kỷ niệm
2. **Yêu Là Cưới** - Phát Hồ, Hồ Quang Hiếu
3. **Cưới Thôi** - Masew, Masiu
4. **Anh Sẽ Đón Em** - Đạt G, DuUyên
5. **Cưới Luôn Được Không** - Hoa Vinh
6. **Yêu 5** - Rhymastic
7. **Cưới Nhau Đi** - Bùi Anh Tuấn, Hiền Hồ

### Nhạc Quốc Tế:
1. **Canon in D** - Pachelbel (Classic)
2. **A Thousand Years** - Christina Perri
3. **Perfect** - Ed Sheeran
4. **All of Me** - John Legend
5. **Marry You** - Bruno Mars
6. **Wedding March** - Mendelssohn (Classic)

### Nhạc Không Lời (Instrumental):
1. **River Flows in You** - Yiruma
2. **Kiss the Rain** - Yiruma
3. **Comptine d'un autre été** - Yann Tiersen
4. **Clair de Lune** - Debussy
5. **Love Story** - Taylor Swift (Piano Version)

## 🔧 Code Mẫu Đầy Đủ

### Với nhiều bài nhạc (random):
```jsx
import { useState, useEffect, useRef } from 'react';

const musicList = [
  '/music/le-duong-di.mp3',
  '/music/yeu-la-cuoi.mp3',
  '/music/perfect.mp3'
];

function LoveSlideshow() {
  const [currentMusic, setCurrentMusic] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    // Random nhạc khi load
    setCurrentMusic(Math.floor(Math.random() * musicList.length));
  }, []);

  const nextSong = () => {
    setCurrentMusic((prev) => (prev + 1) % musicList.length);
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
    }
  };

  return (
    <div>
      {/* ... slideshow code ... */}
      
      <button onClick={nextSong}>⏭️ Bài tiếp</button>
      
      <audio ref={audioRef} loop>
        <source src={musicList[currentMusic]} type="audio/mpeg" />
      </audio>
    </div>
  );
}
```

### Với playlist tự động chuyển:
```jsx
useEffect(() => {
  const audio = audioRef.current;
  
  const handleEnded = () => {
    setCurrentMusic((prev) => (prev + 1) % musicList.length);
    audio.load();
    audio.play();
  };
  
  if (audio) {
    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }
}, []);
```

## 📱 Lưu Ý Quan Trọng

### 1. Bản Quyền
- Chỉ dùng nhạc có bản quyền hoặc free
- Không upload nhạc có bản quyền lên public
- Dùng cho mục đích cá nhân

### 2. Kích Thước File
- Nên dùng file MP3 dưới 5MB
- Chất lượng 128kbps là đủ cho web
- Dùng tool nén MP3 nếu file quá lớn

### 3. Trình Duyệt
- Một số trình duyệt chặn autoplay
- User phải click nút play lần đầu
- iOS Safari có giới hạn autoplay

### 4. Hosting
- Nếu dùng link online, cần direct link
- Google Drive link cần convert
- Dropbox link thêm `?dl=1` ở cuối

## 🎯 Cách Convert Google Drive Link

### Link gốc:
```
https://drive.google.com/file/d/FILE_ID/view?usp=sharing
```

### Chuyển thành:
```
https://drive.google.com/uc?export=download&id=FILE_ID
```

## 🛠️ Tools Hữu Ích

### Convert Audio:
- **Online Audio Converter**: https://online-audio-converter.com/
- **CloudConvert**: https://cloudconvert.com/
- **Audacity** (Desktop app - Free)

### Nén MP3:
- **MP3 Compressor**: https://www.mp3smaller.com/
- **YouCompress**: https://www.youcompress.com/

### Cắt/Chỉnh Sửa:
- **MP3Cut**: https://mp3cut.net/
- **Audio Trimmer**: https://audiotrimmer.com/

## 💡 Tips Chuyên Nghiệp

### 1. Fade In/Out
Thêm hiệu ứng fade cho nhạc:
```jsx
useEffect(() => {
  const audio = audioRef.current;
  if (audio && isPlaying) {
    audio.volume = 0;
    const fadeIn = setInterval(() => {
      if (audio.volume < 0.9) {
        audio.volume += 0.1;
      } else {
        clearInterval(fadeIn);
      }
    }, 100);
  }
}, [isPlaying]);
```

### 2. Volume Control
Thêm thanh điều chỉnh âm lượng:
```jsx
const [volume, setVolume] = useState(0.7);

useEffect(() => {
  if (audioRef.current) {
    audioRef.current.volume = volume;
  }
}, [volume]);

// UI:
<input 
  type="range" 
  min="0" 
  max="1" 
  step="0.1" 
  value={volume}
  onChange={(e) => setVolume(e.target.value)}
/>
```

### 3. Hiển thị tên bài hát
```jsx
const [currentSongName, setCurrentSongName] = useState('');

const songNames = [
  'Lễ Đường Đi',
  'Yêu Là Cưới',
  'Perfect'
];

// Hiển thị:
<div className="now-playing">
  🎵 Đang phát: {songNames[currentMusic]}
</div>
```

## 🎨 Tùy Chỉnh Thêm

### Thêm visualizer (sóng nhạc):
```jsx
// Cần thêm Web Audio API
const [audioContext, setAudioContext] = useState(null);
const [analyser, setAnalyser] = useState(null);

useEffect(() => {
  const context = new AudioContext();
  const analyserNode = context.createAnalyser();
  const source = context.createMediaElementSource(audioRef.current);
  
  source.connect(analyserNode);
  analyserNode.connect(context.destination);
  
  setAudioContext(context);
  setAnalyser(analyserNode);
}, []);
```

### Sync nhạc với slide:
```jsx
// Chuyển slide theo beat nhạc
useEffect(() => {
  if (analyser) {
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    
    const checkBeat = () => {
      analyser.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
      
      if (average > 200) {
        // Beat detected - chuyển slide
        setCurrentIndex((prev) => (prev + 1) % loveImages.length);
      }
      
      requestAnimationFrame(checkBeat);
    };
    
    checkBeat();
  }
}, [analyser]);
```

## 📞 Hỗ Trợ

Nếu gặp vấn đề:
1. Check console log (F12)
2. Kiểm tra đường dẫn file
3. Test file nhạc có play được không
4. Thử trình duyệt khác

---

💝 **Chúc bạn tạo được slideshow hoàn hảo với nhạc nền yêu thích!**

🎵 **Nhạc hay + Ảnh đẹp = Kỷ niệm vĩnh cửu!**
