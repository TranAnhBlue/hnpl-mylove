# ✅ Đã Có Railway & MongoDB Atlas

Bạn đã có Railway và MongoDB rồi, tuyệt! Chỉ cần vài bước nữa:

---

## 🔧 Bước 1: Fix Lỗi Railway (Nếu Có)

Tôi thấy Railway đang báo "Build failed". Fix ngay:

### 1.1. Kiểm tra Root Directory
1. Railway Dashboard → Click service `hnpl-mylove`
2. Settings → **Root Directory**
3. Đảm bảo là: `server`
4. Nếu không phải, sửa thành `server` và click Update

### 1.2. Kiểm tra Environment Variables
Click **Variables**, đảm bảo có:
```
PORT=5001
MONGODB_URI=mongodb+srv://...
CORS_ORIGIN=https://onlylovehnpl.vercel.app
NODE_ENV=production
```

### 1.3. Redeploy
- Click **Deployments** → **Deploy**
- Hoặc push code mới:
  ```bash
  git add .
  git commit -m "Fix config"
  git push
  ```

**Xem chi tiết:** `FIX-RAILWAY.md`

---

## 🔗 Bước 2: Kết Nối Frontend với Backend

### Cách 1: Dùng Script (Nhanh)
```bash
connect-backend.bat
```

Script sẽ:
1. Hỏi Backend URL
2. Cập nhật `client/.env.production`
3. Commit changes
4. Redeploy frontend

### Cách 2: Thủ Công

#### 2.1. Lấy Backend URL
1. Railway → Settings → Domains
2. Copy URL (ví dụ: `https://hnpl-mylove-production.up.railway.app`)

#### 2.2. Cập nhật Frontend
```bash
# Tạo/sửa file client/.env.production
echo VITE_API_URL=https://your-railway-url.up.railway.app/api > client\.env.production
```

#### 2.3. Commit & Push
```bash
git add client/.env.production
git commit -m "Update backend URL"
git push
```

#### 2.4. Redeploy Frontend
```bash
cd client
vercel --prod
```

---

## ✅ Bước 3: Test

### 3.1. Test Backend
Mở trình duyệt:
```
https://your-railway-url.up.railway.app/api/memories
```
Thấy `[]` → Backend OK! ✅

### 3.2. Test Frontend
1. Mở: https://onlylovehnpl.vercel.app
2. Click nút **+**
3. Thêm kỷ niệm mới
4. Upload ảnh
5. Click **Lưu**

Kỷ niệm xuất hiện → Kết nối OK! ✅

### 3.3. Test Slideshow
1. Click nút 🎬
2. Quét QR code
3. 70 ảnh + nhạc "Lễ Đường" phát → Hoàn hảo! ✅

---

## 🎉 Hoàn Thành!

### URLs của bạn:
```
Frontend: https://onlylovehnpl.vercel.app
Backend: https://your-railway-url.up.railway.app
Slideshow: https://onlylovehnpl.vercel.app/love-slideshow
```

### Tính năng:
- ✅ Thêm/Sửa/Xóa kỷ niệm
- ✅ Upload ảnh
- ✅ Slideshow 70 ảnh + nhạc
- ✅ QR code
- ✅ Tìm kiếm, lọc
- ✅ Dark mode
- ✅ Thống kê
- ✅ Tất cả tính năng!

---

## 🔄 Cập Nhật Sau Này

### Khi thay đổi code:
```bash
git add .
git commit -m "Update"
git push
```

Railway và Vercel tự động deploy!

---

## 🆘 Nếu Gặp Vấn Đề

### Railway build failed
→ Xem: `FIX-RAILWAY.md`

### Frontend không gọi được API
→ Check CORS_ORIGIN và VITE_API_URL

### MongoDB connection failed
→ Check IP whitelist: 0.0.0.0/0

---

💝 **Chúc bạn thành công!**

🚀 **Chạy ngay:** `connect-backend.bat`
