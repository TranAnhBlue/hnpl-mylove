# ⚡ Quick Start - Deploy trong 10 phút

## 🎯 Mục Tiêu
Deploy ứng dụng lên internet để truy cập từ mọi nơi.

## 📋 Chuẩn Bị (2 phút)

### 1. Tạo tài khoản (miễn phí)
- Vercel: https://vercel.com (dùng GitHub login)
- Railway: https://railway.app (dùng GitHub login)
- MongoDB Atlas: https://mongodb.com/cloud/atlas

### 2. Push code lên GitHub
```bash
git init
git add .
git commit -m "Ready to deploy"
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

---

## 🗄️ Bước 1: Setup Database (3 phút)

### MongoDB Atlas
1. Tạo cluster miễn phí
2. Database Access → Add User (username + password)
3. Network Access → Add IP: `0.0.0.0/0`
4. Connect → Copy connection string:
```
mongodb+srv://username:password@cluster.mongodb.net/anniversary
```

---

## 🚀 Bước 2: Deploy Backend (2 phút)

### Railway
1. New Project → Deploy from GitHub
2. Chọn repo → Chọn thư mục `server`
3. Variables → Add:
```
PORT=5001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/anniversary
NODE_ENV=production
```
4. Copy URL: `https://your-backend.railway.app`

---

## 🌐 Bước 3: Deploy Frontend (3 phút)

### Vercel

#### Option A: CLI (Nhanh)
```bash
npm install -g vercel
cd client
vercel --prod
```

#### Option B: Dashboard
1. Import repo
2. Settings:
   - Root Directory: `client`
   - Framework: Vite
   - Build: `npm run build`
   - Output: `dist`
3. Environment Variables:
```
VITE_API_URL=https://your-backend.railway.app/api
```
4. Deploy!

---

## 🔄 Bước 4: Cập Nhật CORS (1 phút)

Railway → Variables → Update:
```
CORS_ORIGIN=https://onlylovehnpl.vercel.app
```

---

## ✅ Xong!

### URLs của bạn:
- Frontend: `https://onlylovehnpl.vercel.app`
- Backend: `https://your-backend.railway.app`

### Test:
1. Mở frontend URL
2. Thêm kỷ niệm mới
3. Click 🎬 tạo QR
4. Quét QR → Slideshow!

---

## 🎉 Chia Sẻ

Gửi link cho người thân yêu:
```
https://your-app.vercel.app
```

Hoặc tạo QR code và in ra!

---

## 🔄 Cập Nhật Sau Này

Chỉ cần push lên GitHub:
```bash
git add .
git commit -m "Update"
git push
```

Vercel và Railway tự động deploy!

---

## 🆘 Gặp Vấn Đề?

Xem chi tiết:
- [HUONG-DAN-DEPLOY.md](HUONG-DAN-DEPLOY.md) - Hướng dẫn đầy đủ
- [DEPLOY-CHECKLIST.md](DEPLOY-CHECKLIST.md) - Checklist chi tiết

---

💝 **Chúc mừng! Ứng dụng đã online!**
