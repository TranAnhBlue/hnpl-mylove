# ✅ Kiểm Tra Railway Deploy

## 🔍 Đã Fix

Tôi đã fix 2 vấn đề:
1. ✅ Thêm script `"start": "node server.js"` vào `server/package.json`
2. ✅ Tạo file `server/railway.toml` với cấu hình đúng
3. ✅ Push lên GitHub

Railway sẽ tự động deploy trong 2-3 phút.

---

## 📋 Kiểm Tra Railway

### Bước 1: Vào Railway Dashboard
1. Mở: https://railway.app
2. Click vào project `hnpl-mylove`

### Bước 2: Xem Deployment Status
1. Tab **Deployments**
2. Xem deployment mới nhất
3. Đợi status chuyển từ "Building" → "Success"

### Bước 3: Kiểm Tra Settings

#### Root Directory
- Settings → **Root Directory** phải là: `server`
- Nếu không phải, sửa lại và redeploy

#### Environment Variables
Variables phải có đủ:
```
PORT=5001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/anniversary
CORS_ORIGIN=https://onlylovehnpl.vercel.app
NODE_ENV=production
```

**Quan trọng:**
- `MONGODB_URI` phải là connection string đầy đủ từ MongoDB Atlas
- `CORS_ORIGIN` không có dấu `/` ở cuối

### Bước 4: Generate Domain (Nếu Chưa Có)
1. Settings → **Domains**
2. Click **Generate Domain**
3. Copy URL (ví dụ: `https://hnpl-mylove-production.up.railway.app`)

---

## 🧪 Test Backend

### Test 1: Health Check
Mở trình duyệt:
```
https://your-railway-url.up.railway.app/api/memories
```

**Kết quả mong đợi:**
- ✅ Thấy `[]` (mảng rỗng) → Backend hoạt động!
- ❌ Lỗi 404 → Check Root Directory
- ❌ Lỗi 500 → Check MongoDB connection
- ❌ CORS error → Check CORS_ORIGIN

### Test 2: MongoDB Connection
Nếu thấy lỗi MongoDB:
1. Vào MongoDB Atlas: https://cloud.mongodb.com
2. **Network Access** → Đảm bảo có IP: `0.0.0.0/0`
3. **Database Access** → Đảm bảo user có quyền "Read and write"

---

## 🔗 Kết Nối Frontend

Sau khi backend hoạt động:

### Bước 1: Lấy Backend URL
Copy URL từ Railway (ví dụ: `https://hnpl-mylove-production.up.railway.app`)

### Bước 2: Cập Nhật Frontend
Tạo/sửa file `client/.env.production`:
```env
VITE_API_URL=https://hnpl-mylove-production.up.railway.app/api
```

**Lưu ý:** Phải có `/api` ở cuối!

### Bước 3: Commit & Deploy
```bash
git add client/.env.production
git commit -m "Connect to Railway backend"
git push

cd client
vercel --prod
```

### Bước 4: Test Kết Nối
1. Mở: https://onlylovehnpl.vercel.app
2. Click nút **+** (góc dưới)
3. Thêm kỷ niệm mới
4. Upload ảnh
5. Click **Lưu**

Nếu kỷ niệm xuất hiện → Kết nối thành công! ✅

---

## 🔧 Troubleshooting

### ❌ Railway vẫn build failed

#### Check Logs:
1. Deployments → Click deployment
2. **View logs**
3. Xem lỗi cụ thể

#### Lỗi thường gặp:

**1. "Cannot find module"**
- Check `server/package.json` có đủ dependencies
- Chạy `npm install` trong thư mục server

**2. "ENOENT: no such file or directory"**
- Check Root Directory = `server`
- Check file `server.js` tồn tại

**3. "Port already in use"**
- Không sao, Railway tự động assign port
- Đảm bảo code dùng `process.env.PORT`

**4. "MongoDB connection failed"**
- Check MONGODB_URI đúng format
- Check IP whitelist: 0.0.0.0/0
- Check username/password

### ❌ Frontend không gọi được API

#### Check CORS:
Backend phải có:
```javascript
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
}));
```

#### Check Environment Variables:
- Railway: `CORS_ORIGIN=https://onlylovehnpl.vercel.app`
- Frontend: `VITE_API_URL=https://your-railway-url.up.railway.app/api`

---

## 📊 Monitoring

### Railway Dashboard:
- **Metrics** → Xem CPU, Memory usage
- **Logs** → Xem real-time logs
- **Deployments** → Xem deployment history

### MongoDB Atlas:
- **Metrics** → Xem database usage
- **Monitoring** → Xem queries

---

## 🎉 Hoàn Thành!

Sau khi backend deploy thành công:

### URLs:
```
Frontend: https://onlylovehnpl.vercel.app
Backend: https://your-railway-url.up.railway.app
Slideshow: https://onlylovehnpl.vercel.app/#/love-slideshow
```

### Tính năng:
- ✅ Thêm/Sửa/Xóa kỷ niệm
- ✅ Upload ảnh
- ✅ Slideshow 70 ảnh + nhạc
- ✅ QR code
- ✅ Tất cả tính năng!

---

💝 **Chúc mừng! Ứng dụng đã hoàn toàn online!**
