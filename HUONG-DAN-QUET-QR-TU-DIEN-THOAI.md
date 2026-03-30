# 📱 Hướng Dẫn Quét QR Từ Điện Thoại

## ❌ Vấn Đề: "Safari không thể mở trang vì không thể kết nối với máy chủ"

Lỗi này xảy ra vì QR code đang trỏ đến `localhost` - chỉ hoạt động trên máy tính, không hoạt động trên điện thoại.

## ✅ Giải Pháp

### Bước 1: Kiểm tra IP Local của máy tính

**Đã làm sẵn cho bạn!** IP của bạn là: `192.168.0.101`

Nếu muốn kiểm tra lại:
```bash
# Chạy lệnh này ở thư mục gốc dự án
node get-local-ip.js
```

### Bước 2: Đảm bảo cấu hình đúng

File `client/vite.config.js` đã được cấu hình:
```javascript
server: {
  host: '0.0.0.0', // Cho phép truy cập từ mạng local
  port: 3000,
}
```

File `client/src/App.jsx` đã có IP đúng:
```javascript
const localIP = '192.168.0.101'
```

### Bước 3: Restart server

**Quan trọng:** Phải restart server để áp dụng cấu hình mới!

```bash
# Dừng server hiện tại (Ctrl+C)
# Sau đó chạy lại:
npm run dev
```

### Bước 4: Kiểm tra kết nối

**Trên máy tính:**
1. Mở trình duyệt
2. Truy cập: `http://192.168.0.101:3000`
3. Nếu mở được → OK!

**Trên điện thoại:**
1. Đảm bảo điện thoại và máy tính **cùng mạng WiFi**
2. Mở trình duyệt trên điện thoại
3. Nhập: `http://192.168.0.101:3000`
4. Nếu mở được → OK!

### Bước 5: Tạo lại QR Code

1. Mở ứng dụng trên máy tính: `http://192.168.0.101:3000`
2. Click nút **🎬** (QR Slideshow Đặc Biệt)
3. QR code mới sẽ có link: `http://192.168.0.101:3000/love-slideshow`
4. Quét QR từ điện thoại → Slideshow sẽ mở!

## 🔍 Xử Lý Sự Cố

### Vẫn không kết nối được?

#### 1. Kiểm tra Firewall
**Windows:**
```powershell
# Cho phép port 3000
New-NetFirewallRule -DisplayName "Vite Dev Server" -Direction Inbound -LocalPort 3000 -Protocol TCP -Action Allow
```

**Hoặc tắt Firewall tạm thời:**
- Mở Windows Security
- Firewall & network protection
- Tắt tạm thời

#### 2. Kiểm tra cùng mạng WiFi
- Máy tính và điện thoại phải cùng WiFi
- Không dùng VPN
- Không dùng mạng khách (Guest Network)

#### 3. Kiểm tra IP có đúng không
```bash
# Windows
ipconfig

# Tìm dòng "IPv4 Address" trong phần WiFi adapter
# Ví dụ: 192.168.0.101
```

#### 4. Thử port khác
Nếu port 3000 bị chặn, đổi sang 5173:

**File `client/vite.config.js`:**
```javascript
server: {
  host: '0.0.0.0',
  port: 5173, // Đổi port
}
```

**File `client/src/App.jsx`:**
```javascript
const port = '5173'; // Đổi port
```

### Kiểm tra server có chạy đúng không?

Khi chạy `npm run dev`, bạn sẽ thấy:
```
  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.0.101:3000/
```

Nếu thấy dòng **Network** → OK!
Nếu không thấy → Cấu hình chưa đúng

## 🌐 Giải Pháp Thay Thế

### Giải pháp 1: Dùng ngrok (Dễ nhất)

**Cài đặt ngrok:**
1. Tải tại: https://ngrok.com/download
2. Giải nén
3. Chạy:
```bash
ngrok http 3000
```

4. Lấy URL public (ví dụ: `https://abc123.ngrok.io`)
5. Sửa trong `App.jsx`:
```javascript
const specialUrl = 'https://abc123.ngrok.io/love-slideshow';
```

**Ưu điểm:**
- Hoạt động mọi nơi (không cần cùng WiFi)
- Có HTTPS
- Dễ chia sẻ

**Nhược điểm:**
- URL thay đổi mỗi lần chạy (bản free)
- Cần internet

### Giải pháp 2: Deploy lên Vercel/Netlify

**Deploy lên Vercel (Free):**
```bash
# Cài Vercel CLI
npm i -g vercel

# Deploy
cd client
vercel
```

Sau khi deploy, bạn có URL cố định như: `https://your-app.vercel.app`

**Ưu điểm:**
- URL cố định
- Hoạt động mọi nơi
- Nhanh, ổn định

**Nhược điểm:**
- Cần deploy mỗi lần thay đổi

### Giải pháp 3: Chỉ dùng text trong QR

Nếu chỉ muốn hiển thị text (không cần mở web):

**File `client/src/App.jsx`:**
```javascript
const generateSpecialQR = async () => {
  // Chỉ text, không có URL
  const specialMessage = `
💕💕💕 THÔNG ĐIỆP YÊU THƯƠNG 💕💕💕

🎵 5 khoảnh khắc đáng nhớ
🌟 Được tạo với tình yêu

💝 Ảnh 1: [Mô tả ảnh 1]
💝 Ảnh 2: [Mô tả ảnh 2]
💝 Ảnh 3: [Mô tả ảnh 3]
💝 Ảnh 4: [Mô tả ảnh 4]
💝 Ảnh 5: [Mô tả ảnh 5]

💌 Dành tặng người đặc biệt nhất
  `.trim();

  // Không cần URL, chỉ text
  const qrUrl = await QRCode.toDataURL(specialMessage, {
    width: 350,
    margin: 2,
    color: {
      dark: '#E91E63',
      light: '#FFFFFF'
    },
    errorCorrectionLevel: 'H'
  });
  
  setSpecialQRUrl(qrUrl);
  setShowSpecialQR(true);
};
```

## 📋 Checklist Trước Khi Quét QR

- [ ] Máy tính và điện thoại cùng WiFi
- [ ] Server đang chạy (`npm run dev`)
- [ ] Thấy dòng "Network: http://192.168.0.101:3000/"
- [ ] Mở được `http://192.168.0.101:3000` trên điện thoại
- [ ] IP trong code là `192.168.0.101`
- [ ] Đã tạo lại QR code mới
- [ ] Firewall không chặn port 3000

## 🎯 Cách Test Nhanh

### Test 1: Ping từ điện thoại
1. Tải app "Network Analyzer" (iOS) hoặc "Fing" (Android)
2. Ping đến `192.168.0.101`
3. Nếu ping được → Mạng OK

### Test 2: Mở trực tiếp trên điện thoại
1. Mở Safari/Chrome trên điện thoại
2. Nhập: `http://192.168.0.101:3000`
3. Nếu mở được → Server OK
4. Nếu không → Kiểm tra lại firewall/WiFi

### Test 3: Xem trước slideshow
1. Click nút "👁️ Xem trước" trong modal QR
2. Nếu slideshow mở → Code OK
3. Copy URL từ thanh địa chỉ
4. Gửi URL qua Messenger/Zalo cho điện thoại
5. Mở URL trên điện thoại

## 💡 Tips

### Tip 1: Dùng IP tĩnh
Để IP không thay đổi:
1. Vào router settings
2. DHCP Reservation
3. Gán IP cố định cho máy tính

### Tip 2: Tạo shortcut
Tạo file `start-with-network.bat`:
```batch
@echo off
cd client
npm run dev
pause
```

Double-click để chạy server với network access

### Tip 3: QR code cho nhiều người
Nếu muốn nhiều người quét:
1. Dùng ngrok hoặc deploy
2. Hoặc tạo nhiều QR với IP khác nhau

## 📞 Vẫn Không Được?

Thử các bước sau theo thứ tự:

1. **Restart mọi thứ:**
   - Tắt server (Ctrl+C)
   - Tắt trình duyệt
   - Chạy lại `npm run dev`
   - Mở lại trình duyệt

2. **Kiểm tra log:**
   - Xem console log (F12)
   - Xem terminal có lỗi không

3. **Thử trình duyệt khác:**
   - Safari → Chrome
   - Chrome → Firefox

4. **Thử điện thoại khác:**
   - iPhone → Android
   - Android → iPhone

5. **Dùng ngrok:**
   - Cách chắc chắn nhất
   - Hoạt động 100%

---

💝 **Chúc bạn thành công!**

📱 **Sau khi làm theo hướng dẫn, QR code sẽ hoạt động hoàn hảo!**
