# 🎬 Hướng Dẫn Sử Dụng Slideshow QR Code

## 🌟 Tính Năng Slideshow Đặc Biệt

Ứng dụng có tính năng tạo mã QR đặc biệt dẫn đến slideshow với:
- ✨ 5 ảnh đẹp (love1.jpg - love5.jpg)
- 🎵 Nhạc nền lãng mạn
- 💝 Hiệu ứng chuyển cảnh mượt mà
- 💕 Trái tim bay lơ lửng
- 📱 Responsive trên mọi thiết bị

## 🚀 Cách Sử Dụng

### 1. Tạo Mã QR Slideshow

**Bước 1:** Mở ứng dụng Ngày Kỷ Niệm

**Bước 2:** Click nút **🎬** ở góc trên bên phải (header)

**Bước 3:** Modal hiện ra với:
- Mã QR màu hồng
- 3 trái tim bay lơ lửng
- 4 tính năng: 📸 5 ảnh, 🎵 Nhạc, ✨ Hiệu ứng, 💝 Lời nhắn

**Bước 4:** Chọn một trong các tùy chọn:
- **📥 Tải xuống**: Lưu QR code dạng PNG
- **👁️ Xem trước**: Mở slideshow ngay trên trình duyệt
- **Đóng**: Đóng modal

### 2. Quét Mã QR

**Trên iPhone:**
1. Mở app Camera
2. Hướng vào mã QR
3. Chạm vào thông báo
4. Slideshow tự động mở

**Trên Android:**
1. Mở app Camera hoặc Google Lens
2. Hướng vào mã QR
3. Chạm vào link
4. Slideshow tự động mở

### 3. Xem Slideshow

Khi slideshow mở:
- **Tự động chuyển ảnh**: Mỗi 5 giây
- **Lời nhắn hiện ra**: 3 giây đầu mỗi ảnh
- **Trái tim bay**: Liên tục từ dưới lên
- **Nhạc nền**: Tự động phát (có thể bật/tắt)

### 4. Điều Khiển Slideshow

**Nút điều khiển ở dưới:**
- **🔊/🔇**: Bật/tắt nhạc
- **● ● ● ● ●**: Chấm tròn - click để chuyển ảnh
- **⛶**: Toàn màn hình

**Thao tác:**
- Click vào chấm tròn để xem ảnh cụ thể
- Click nút nhạc để bật/tắt
- Click toàn màn hình để xem đẹp hơn

## 🎨 Tùy Chỉnh Ảnh

### Thay Đổi 5 Ảnh

**Bước 1:** Chuẩn bị 5 ảnh đẹp của bạn

**Bước 2:** Đổi tên thành:
- `love1.jpg`
- `love2.jpg`
- `love3.jpg`
- `love4.jpg`
- `love5.jpg`

**Bước 3:** Copy vào thư mục:
```
client/public/images/
```

**Bước 4:** Thay thế ảnh cũ

**Lưu ý:**
- Ảnh nên có kích thước 1920x1080 hoặc 1280x720
- Định dạng JPG hoặc PNG
- Kích thước mỗi ảnh dưới 2MB

### Thay Đổi Lời Nhắn

Mở file `client/src/LoveSlideshow.jsx` và sửa:

```jsx
const loveMessages = [
  '💕 Lời nhắn cho ảnh 1',
  '🌟 Lời nhắn cho ảnh 2',
  '💝 Lời nhắn cho ảnh 3',
  '🌹 Lời nhắn cho ảnh 4',
  '💖 Lời nhắn cho ảnh 5'
];
```

## 🎵 Thêm Nhạc Nền

### Cách Nhanh (Khuyên Dùng)

**Bước 1:** Tải bài "Lễ Đường Đi" (MP3)

**Bước 2:** Copy vào:
```
client/public/music/le-duong-di.mp3
```

**Bước 3:** Mở `client/src/LoveSlideshow.jsx` và sửa:
```jsx
<audio ref={audioRef} loop>
  <source src="/music/le-duong-di.mp3" type="audio/mpeg" />
</audio>
```

**Xem hướng dẫn chi tiết:** `HUONG-DAN-THEM-NHAC.md`

## 💡 Ý Tưởng Sử Dụng

### 1. Quà Tặng Sinh Nhật
- In QR code ra giấy đẹp
- Dán vào thiệp sinh nhật
- Người nhận quét để xem slideshow

### 2. Kỷ Niệm Tình Yêu
- Tạo QR với 5 ảnh kỷ niệm
- Gửi cho người yêu
- Xem cùng nhau vào ngày đặc biệt

### 3. Đám Cưới
- In QR code lớn
- Đặt ở bàn tiệc
- Khách mời quét để xem ảnh cưới

### 4. Cầu Hôn
- Tạo slideshow với 5 khoảnh khắc đẹp
- Cho người yêu quét QR
- Khi slideshow kết thúc: Quỳ gối cầu hôn!

### 5. Album Ảnh Số
- Tạo nhiều QR cho nhiều bộ ảnh
- Mỗi QR là 1 chủ đề
- Tạo "album ảnh tương tác"

## 🎁 Combo Quà Tặng

### Combo 1: Hộp Kỷ Niệm
**Bao gồm:**
- 1 QR code slideshow (in đẹp, đóng khung)
- 5 ảnh in ra (giống trong slideshow)
- 1 lá thư tay viết
- 1 hộp gỗ đựng

### Combo 2: Thiệp Đặc Biệt
**Bao gồm:**
- Thiệp handmade
- QR code dán giữa
- Lời nhắn viết tay
- Phong bì đẹp

### Combo 3: Tranh QR
**Bao gồm:**
- QR code in A4
- Khung tranh đẹp
- Đèn LED trang trí
- Chữ "Quét để xem kỷ niệm"

## 🔧 Xử Lý Sự Cố

### QR Code không quét được
- Đảm bảo QR không bị mờ
- Tăng độ sáng màn hình
- Thử app quét QR khác
- In lại với chất lượng cao hơn

### Slideshow không mở
- Kiểm tra kết nối internet
- Thử trình duyệt khác
- Clear cache trình duyệt
- Restart điện thoại

### Nhạc không phát
- Click nút 🔊 để bật nhạc
- Kiểm tra âm lượng điện thoại
- Một số trình duyệt chặn autoplay
- Thử refresh trang

### Ảnh không hiển thị
- Kiểm tra file ảnh có trong thư mục
- Đảm bảo tên file đúng (love1.jpg - love5.jpg)
- Thử build lại project
- Clear cache

## 📱 Tương Thích

### Trình Duyệt:
- ✅ Chrome (Desktop & Mobile)
- ✅ Safari (Desktop & Mobile)
- ✅ Firefox (Desktop & Mobile)
- ✅ Edge (Desktop)
- ⚠️ IE (Không hỗ trợ)

### Thiết Bị:
- ✅ iPhone (iOS 12+)
- ✅ Android (Android 8+)
- ✅ iPad
- ✅ Desktop/Laptop
- ✅ Tablet

## 🎯 Tips Chuyên Nghiệp

### 1. Chất Lượng Ảnh
- Dùng ảnh độ phân giải cao
- Crop ảnh theo tỷ lệ 16:9
- Chỉnh sáng/màu trước khi dùng
- Nén ảnh để load nhanh

### 2. Lời Nhắn
- Ngắn gọn, súc tích (1-2 dòng)
- Dùng emoji phù hợp
- Viết từ trái tim
- Tránh quá dài

### 3. Nhạc Nền
- Chọn nhạc phù hợp với ảnh
- Âm lượng vừa phải
- Dùng nhạc không lời nếu có lời nhắn
- Fade in/out mượt mà

### 4. Trải Nghiệm
- Test trên nhiều thiết bị
- Xem ở chế độ toàn màn hình
- Tắt đèn khi xem
- Xem cùng người thân yêu

## 📊 Thống Kê Sử Dụng

### Thời Gian Slideshow:
- Mỗi ảnh: 5 giây
- Tổng thời gian: 25 giây
- Lặp lại: Vô hạn

### Hiệu Ứng:
- Chuyển ảnh: Slide + Scale
- Trái tim: Float up
- Lời nhắn: Fade in/out
- Background: Blur

### Kích Thước:
- QR Code: 280x280px (có thể scale)
- Ảnh slideshow: Responsive
- File nhạc: ~3-5MB
- Tổng dung lượng: ~10-15MB

## 🌟 Nâng Cấp Trong Tương Lai

### Có Thể Thêm:
- [ ] Thêm nhiều ảnh hơn (10, 20, 50...)
- [ ] Playlist nhạc (nhiều bài)
- [ ] Hiệu ứng chuyển cảnh đa dạng
- [ ] Thêm video
- [ ] Tùy chỉnh màu sắc
- [ ] Thêm sticker, filter
- [ ] Share lên social media
- [ ] Download slideshow dạng video

## 📞 Hỗ Trợ

Nếu cần hỗ trợ:
1. Đọc file `HUONG-DAN-THEM-NHAC.md`
2. Đọc file `HUONG-DAN-QR-CODE.md`
3. Check console log (F12)
4. Thử build lại project

---

💝 **Chúc bạn tạo được slideshow tuyệt vời!**

🎬 **Mỗi slideshow là một câu chuyện tình yêu!**

✨ **Hãy chia sẻ khoảnh khắc đẹp với người thân yêu!**
