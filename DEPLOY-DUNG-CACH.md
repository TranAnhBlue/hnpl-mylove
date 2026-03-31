# 🚀 DEPLOY ĐÚNG CÁCH - RAILWAY + VERCEL

## 📋 KIỂM TRA TRƯỚC KHI DEPLOY

### 1. Backend (Railway)

**File cần có:**
- ✅ `server/server.js` - Code backend
- ✅ `server/package.json` - Dependencies
- ✅ `server/railway.toml` - Railway config
- ✅ `server/.env` - Local env (không push lên git)

**Railway Variables cần có:**
```
PORT=5001
MONGODB_URI=mongodb+srv://trananhblue:blue22062004%40@cluster0.02q3jqa.mongodb.net/aniversary
CORS_ORIGIN=https://onlylovehnpl.vercel.app
NODE_ENV=production
```

### 2. Frontend (Vercel)

**File cần có:**
- ✅ `client/.env.production` - Production env
- ✅ `client/package.json` - Dependencies
- ✅ `client/vercel.json` - Vercel config

**Env production:**
```
VITE_API_URL=https://hnpl-mylove-production.up.railway.app/api
```

## 🎯 BƯỚC DEPLOY

### Bước 1: Kiểm Tra Railway Variables

1. Vào: https://railway.app
2. Project: hnpl-mylove → Service
3. Tab **Variables**
4. Kiểm tra có đủ 4 biến:
   - PORT
   - MONGODB_URI
   - CORS_ORIGIN
   - NODE_ENV

**Nếu thiếu, thêm ngay:**

```
PORT
5001

MONGODB_URI
mongodb+srv://trananhblue:blue22062004%40@cluster0.02q3jqa.mongodb.net/aniversary

CORS_ORIGIN
https://onlylovehnpl.vercel.app

NODE_ENV
production
```

### Bước 2: Deploy Backend (Railway)

Railway tự động deploy khi push code lên GitHub:

```bash
git add .
git commit -m "Deploy backend to Railway"
git push
```

Đợi 2-3 phút để Railway build và deploy.

### Bước 3: Test Backend

```bash
curl https://hnpl-mylove-production.up.railway.app/api/health
```

Phải thấy:
```json
{"status":"OK","mongodb":"connected","uptime":123}
```

### Bước 4: Build Frontend

```bash
cd client
npm run build
```

### Bước 5: Deploy Frontend (Vercel)

```bash
cd client
vercel --prod
```

Vercel sẽ deploy lên: https://onlylovehnpl.vercel.app

### Bước 6: Test Frontend

Vào: https://onlylovehnpl.vercel.app

Phải thấy:
- ✅ Load được dữ liệu
- ✅ Thêm kỷ niệm được
- ✅ Upload ảnh được

## 🔍 TROUBLESHOOTING

### Railway 502 Error

**Nguyên nhân:**
- MongoDB connection string sai
- CORS_ORIGIN không đúng
- Server không start được

**Fix:**
1. Xem Railway logs
2. Kiểm tra Variables
3. Test MongoDB connection string

### Frontend không load dữ liệu

**Nguyên nhân:**
- Backend chưa chạy
- VITE_API_URL sai
- CORS issue

**Fix:**
1. Test backend: `curl https://hnpl-mylove-production.up.railway.app/api/health`
2. Kiểm tra `client/.env.production`
3. Kiểm tra Railway CORS_ORIGIN

### Upload ảnh fail

**Nguyên nhân:**
- Railway không có thư mục uploads
- Multer config sai

**Fix:**
- Code đã tự động tạo thư mục uploads
- Kiểm tra Railway logs

## ✅ CHECKLIST

### Backend (Railway):
- [ ] Code đã push lên GitHub
- [ ] Railway Variables đã đủ 4 biến
- [ ] Railway deployment status: Success
- [ ] Test health check: OK
- [ ] Test get memories: OK

### Frontend (Vercel):
- [ ] `.env.production` đúng URL
- [ ] Build thành công
- [ ] Deploy thành công
- [ ] Test load dữ liệu: OK
- [ ] Test thêm kỷ niệm: OK

## 🎉 HOÀN THÀNH

Sau khi deploy xong:
- ✅ Backend: https://hnpl-mylove-production.up.railway.app
- ✅ Frontend: https://onlylovehnpl.vercel.app
- ✅ Database: MongoDB Atlas
- ✅ Hoạt động 24/7
