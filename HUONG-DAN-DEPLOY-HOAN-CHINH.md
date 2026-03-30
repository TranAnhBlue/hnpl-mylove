# 🎯 HƯỚNG DẪN DEPLOY HOÀN CHỈNH - KHÔNG BỊ XUNG ĐỘT

## 🔥 VẤN ĐỀ BẠN ĐANG GẶP

> "Fix được frontend thì lại hỏng backend"

**Nguyên nhân:** Deploy không đúng thứ tự → Frontend và Backend mất đồng bộ

## ✅ GIẢI PHÁP: DEPLOY ĐÚNG 1 LẦN, XONG VIỆC!

### Chiến lược 3 bước:

```
Backend (Railway) → Lấy URL cố định → Frontend (Vercel)
     ↓                    ↓                    ↓
  Không đổi          Lưu vào .env        Luôn biết Backend
```

---

## 📋 BƯỚC 1: SETUP BACKEND (CHỈ LÀM 1 LẦN)

### 1.1. Chuẩn bị MongoDB Atlas

```
1. Vào: https://cloud.mongodb.com
2. Tạo cluster (nếu chưa có)
3. Database Access → Add User
   - Username: hnpl
   - Password: [tạo password mạnh]
4. Network Access → Add IP: 0.0.0.0/0 (cho phép tất cả)
5. Connect → Connect your application
6. Copy connection string:
   mongodb+srv://hnpl:<password>@cluster.mongodb.net/anniversary
```

### 1.2. Setup Railway

```bash
# 1. Push code lên GitHub
git add .
git commit -m "Prepare for Railway deploy"
git push

# 2. Vào Railway
```

Truy cập: https://railway.app

```
3. New Project → Deploy from GitHub
4. Chọn repository: hnpl-mylove
5. Settings:
   - Root Directory: server
   - Build Command: (để trống)
   - Start Command: node server.js
```

### 1.3. Thêm Environment Variables

Trong Railway → Variables:

```env
PORT=5001
MONGODB_URI=mongodb+srv://hnpl:password@cluster.mongodb.net/anniversary
CORS_ORIGIN=https://onlylovehnpl.vercel.app
NODE_ENV=production
```

### 1.4. Lấy Backend URL

```
1. Railway → Settings → Networking
2. Click "Generate Domain"
3. Copy URL: https://hnpl-mylove-production.up.railway.app
4. LƯU LẠI URL NÀY! (sẽ dùng mãi mãi)
```

---

## 📋 BƯỚC 2: DEPLOY FRONTEND VỚI BACKEND URL

### 2.1. Cập nhật Backend URL

Sửa file `client/.env.production`:

```env
VITE_API_URL=https://hnpl-mylove-production.up.railway.app/api
```

### 2.2. Commit và Push

```bash
git add client/.env.production
git commit -m "Connect to Railway backend"
git push
```

### 2.3. Deploy Frontend

```bash
cd client
npm run build
vercel --prod
```

---

## 🎉 XONG! GIỜ BẠN CÓ:

- ✅ Backend trên Railway (URL cố định)
- ✅ Frontend trên Vercel (biết Backend ở đâu)
- ✅ Database trên MongoDB Atlas
- ✅ Tất cả kết nối ổn định

---

## 🔄 SAU NÀY CẬP NHẬT THẾ NÀO?

### Chỉ sửa Frontend (UI, CSS, components)

```bash
# Dùng script:
update-frontend-only.bat

# Hoặc thủ công:
cd client
npm run build
vercel --prod
```

**Backend không bị ảnh hưởng!** ✅

### Chỉ sửa Backend (API, logic)

```bash
# Dùng script:
update-backend-only.bat

# Hoặc thủ công:
git add server/
git commit -m "Update backend"
git push
# Railway tự động deploy
```

**Frontend không bị ảnh hưởng!** ✅

### Sửa cả Frontend và Backend

```bash
# 1. Update backend trước
git add server/
git commit -m "Update backend"
git push
# Đợi Railway deploy xong (1-2 phút)

# 2. Update frontend sau
cd client
npm run build
vercel --prod
```

---

## 🚀 SCRIPTS TỰ ĐỘNG

### Lần đầu setup (có Railway URL rồi)

```bash
deploy-stable.bat
```

Script sẽ:
- Hỏi Railway Backend URL
- Cập nhật `client/.env.production`
- Build và deploy frontend
- Kết nối tất cả

### Lần sau chỉ cần

```bash
# Sửa frontend
update-frontend-only.bat

# Sửa backend
update-backend-only.bat
```

---

## 🧪 TEST SAU KHI DEPLOY

### 1. Test Backend

```bash
# Thay YOUR_RAILWAY_URL
curl https://YOUR_RAILWAY_URL/api/memories
# Kết quả: [] hoặc [...]
```

### 2. Test Frontend

```
1. Vào: https://onlylovehnpl.vercel.app
2. Click nút + (góc dưới phải)
3. Thêm kỷ niệm mới
4. Upload ảnh
5. Click Lưu
```

Nếu kỷ niệm xuất hiện → Backend kết nối OK! ✅

### 3. Test QR Slideshow

```
1. Click nút 🎬 (header)
2. Quét QR code bằng điện thoại
3. Slideshow mở: https://onlylovehnpl.vercel.app/#/love-slideshow
4. 70 ảnh + nhạc "Lễ Đường" phát
```

---

## ❌ TROUBLESHOOTING

### Frontend không kết nối Backend

```bash
# Kiểm tra:
1. Railway có deploy thành công không?
2. Backend URL trong client/.env.production đúng chưa?
3. CORS_ORIGIN trong Railway có đúng không?
```

### Railway báo lỗi

```bash
# Xem logs:
Railway → Deployments → Click vào deployment → View Logs

# Lỗi thường gặp:
- MongoDB URI sai → Kiểm tra password
- Port sai → Phải là PORT=5001
- Missing dependencies → Railway tự cài, đợi thêm
```

### QR Slideshow 404

```bash
# Đã fix! Dùng hash routing:
https://onlylovehnpl.vercel.app/#/love-slideshow

# Không dùng:
https://onlylovehnpl.vercel.app/love-slideshow (404)
```

---

## 📞 TÓM TẮT

| Tình huống | Script | Ảnh hưởng |
|------------|--------|-----------|
| Lần đầu setup | `deploy-stable.bat` | Setup tất cả |
| Sửa frontend | `update-frontend-only.bat` | Backend OK |
| Sửa backend | `update-backend-only.bat` | Frontend OK |
| Sửa cả 2 | Backend trước → Frontend sau | Tất cả OK |

---

## 🎯 KẾT LUẬN

Sau khi setup đúng 1 lần:
- ✅ Backend URL cố định mãi mãi
- ✅ Frontend luôn biết Backend ở đâu
- ✅ Deploy riêng không ảnh hưởng nhau
- ✅ Không còn "fix frontend thì hỏng backend"

**Chúc bạn deploy thành công!** 💝
