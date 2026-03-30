# 🎵 Thư Mục Nhạc Nền

## Cách Thêm Nhạc

### Bước 1: Tải nhạc về
Tải bài "Lễ Đường Đi" hoặc bài nhạc yêu thích của bạn

### Bước 2: Copy vào đây
Copy file MP3 vào thư mục này với tên:
- `le-duong-di.mp3` (Lễ Đường Đi)
- `yeu-la-cuoi.mp3` (Yêu Là Cưới)
- `perfect.mp3` (Perfect - Ed Sheeran)
- hoặc tên khác tùy thích

### Bước 3: Cập nhật code
Mở file `client/src/LoveSlideshow.jsx` và sửa:

```jsx
<audio ref={audioRef} loop>
  <source src="/music/le-duong-di.mp3" type="audio/mpeg" />
</audio>
```

## 📝 Lưu Ý

- File MP3 nên dưới 5MB
- Chất lượng 128kbps là đủ
- Chỉ dùng nhạc có bản quyền hoặc free

## 🎶 Gợi Ý Nhạc Free

### Pixabay Audio (Free):
https://pixabay.com/music/

### YouTube Audio Library:
https://studio.youtube.com/channel/UC.../music

### Free Music Archive:
https://freemusicarchive.org/

## 💡 Ví Dụ Cấu Trúc

```
client/public/music/
├── le-duong-di.mp3
├── yeu-la-cuoi.mp3
├── perfect.mp3
└── README.md
```

---

💝 Xem hướng dẫn chi tiết tại: `HUONG-DAN-THEM-NHAC.md`
