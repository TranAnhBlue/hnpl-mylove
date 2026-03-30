# 🔧 Fix Lỗi QR Slideshow Sau Deploy

## ❌ Vấn Đề

Sau khi deploy lên Vercel, quét QR code mở slideshow bị lỗi 404 hoặc không load được.

## 🔍 Nguyên Nhân

Vercel không biết cách handle route `/love-slideshow` vì đây là Single Page Application (SPA).

## ✅ Giải Pháp

### Đã Fix Sẵn!

Tôi đã tạo file `client/vercel.json` để fix vấn đề này.

### Bước 1: Kiểm tra File

File `client/vercel.json` phải có nội dung:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Bước 2: Commit & Push

```bash
git add client/vercel.json
git commit -m "Fix slideshow routing"
git push
```

### Bước 3: Redeploy

```bash
cd client
vercel --prod
```

Hoặc dùng script:
```bash
deploy-simple.bat
```

### Bước 4: Test

1. Mở: https://onlylovehnpl.vercel.app
2. Click nút 🎬
3. Quét QR code
4. Slideshow sẽ mở: https://onlylovehnpl.vercel.app/love-slideshow

---

## 🧪 Test Trực Tiếp

Không cần quét QR, test trực tiếp:

**Mở trình duyệt:**
```
https://onlylovehnpl.vercel.app/love-slideshow
```

Nếu thấy slideshow → Fix thành công! ✅

---

## 🔄 Nếu Vẫn Lỗi

### Option 1: Clear Cache

1. Xóa cache trình duyệt (Ctrl + Shift + Delete)
2. Mở lại URL
3. Hoặc dùng Incognito mode

### Option 2: Kiểm tra Vercel Dashboard

1. Vào https://vercel.com/dashboard
2. Click vào project `onlylovehnpl`
3. Settings → General
4. Đảm bảo:
   - Framework Preset: Vite
   - Root Directory: (để trống hoặc `.`)
   - Build Command: `npm run build`
   - Output Directory: `dist`

### Option 3: Redeploy Từ Dashboard

1. Vercel Dashboard → Deployments
2. Click vào deployment mới nhất
3. Click **Redeploy**

### Option 4: Kiểm tra File Structure

Đảm bảo cấu trúc đúng:
```
client/
├── vercel.json          ← File này phải có!
├── src/
│   ├── main.jsx         ← Routing logic
│   ├── App.jsx
│   └── LoveSlideshow.jsx
├── public/
│   ├── images/          ← 70 ảnh
│   └── music/           ← Nhạc
└── package.json
```

---

## 💡 Giải Thích Kỹ Thuật

### Vấn Đề:
- Vercel serve static files từ thư mục `dist/`
- Khi truy cập `/love-slideshow`, Vercel tìm file `dist/love-slideshow/index.html`
- Không tìm thấy → 404

### Giải Pháp:
- File `vercel.json` với `rewrites` rule
- Mọi route đều trỏ về `index.html`
- React Router (trong `main.jsx`) xử lý routing
- `/love-slideshow` → Render `<LoveSlideshow />`

### Code Routing (main.jsx):
```jsx
const path = window.location.pathname;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {path === '/love-slideshow' ? <LoveSlideshow /> : <App />}
  </React.StrictMode>
);
```

---

## 🎯 Checklist

- [x] File `client/vercel.json` đã tạo
- [ ] Đã commit & push
- [ ] Đã redeploy
- [ ] Test URL: https://onlylovehnpl.vercel.app/love-slideshow
- [ ] Quét QR code hoạt động

---

## 📱 Test Trên Điện Thoại

### Bước 1: Test URL Trực Tiếp
Mở trên điện thoại:
```
https://onlylovehnpl.vercel.app/love-slideshow
```

Nếu mở được → Routing OK!

### Bước 2: Test QR Code
1. Mở app: https://onlylovehnpl.vercel.app
2. Click 🎬
3. Quét QR
4. Slideshow mở!

---

## 🆘 Vẫn Không Được?

### Debug Steps:

#### 1. Check Console
- Mở slideshow URL
- Nhấn F12 (DevTools)
- Tab Console
- Xem có lỗi gì

#### 2. Check Network
- Tab Network
- Reload trang
- Xem request nào bị 404

#### 3. Check Vercel Logs
- Vercel Dashboard → Deployments
- Click deployment
- View Logs
- Tìm lỗi

#### 4. Verify Build
```bash
cd client
npm run build
```

Kiểm tra `client/dist/` có file `index.html` không.

---

## 🚀 Quick Fix Script

Tôi tạo script để fix nhanh:

```bash
fix-qr.bat
```

Script sẽ:
1. Kiểm tra `client/vercel.json`
2. Commit & push
3. Redeploy
4. Test URL

---

💝 **Sau khi fix, slideshow sẽ hoạt động hoàn hảo!**

🎬 **70 ảnh + nhạc "Lễ Đường" đang chờ bạn!**
