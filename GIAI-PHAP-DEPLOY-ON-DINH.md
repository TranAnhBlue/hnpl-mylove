# 🎯 GIẢI PHÁP DEPLOY ỔN ĐỊNH

## ❌ VẤN ĐỀ HIỆN TẠI

Khi deploy frontend → Backend URL thay đổi → Frontend bị lỗi
Khi deploy backend → Frontend cần redeploy → QR lại chết

**Nguyên nhân:** Frontend và Backend phụ thuộc lẫn nhau!

## ✅ GIẢI PHÁP: DEPLOY ĐÚNG THỨ TỰ

### Chiến lược 3 bước:

```
1. Deploy Backend TRƯỚC (Railway)
   ↓
2. Lấy Backend URL cố định
   ↓
3. Deploy Frontend với URL đó (Vercel)
```

## 📋 HƯỚNG DẪN CHI TIẾT

### BƯỚC 1: Setup Backend trên Railway (CHỈ LÀM 1 LẦN)

```bash
# 1. Push code lên GitHub
git add .
git commit -m "Setup backend for Railway"
git push

# 2. Vào Railway: https://railway.app
# 3. New Project → Deploy from GitHub
# 4. Chọn repo: hnpl-mylove
# 5. Settings:
#    - Root Directory: server
#    - Start Command: node server.js
#    - Environment Variables:
#      PORT=5001
#      MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/anniversary
#      CORS_ORIGIN=https://onlylovehnpl.vercel.app

# 6. Settings → Networking → Generate Domain
# 7. Copy URL: https://hnpl-mylove-production.up.railway.app
```

### BƯỚC 2: Cập nhật Frontend với Backend URL

```bash
# Sửa file: client/.env.production
VITE_API_URL=https://hnpl-mylove-production.up.railway.app/api

# Commit
git add client/.env.production
git commit -m "Update backend URL"
git push
```

### BƯỚC 3: Deploy Frontend

```bash
cd client
vercel --prod
```

## 🔒 SAU KHI SETUP XONG

**Backend URL sẽ CỐ ĐỊNH**, không thay đổi nữa!

Khi cần update code:

### Update Frontend:
```bash
cd client
npm run build
vercel --prod
```

### Update Backend:
```bash
# Railway tự động deploy khi push GitHub
git add server/
git commit -m "Update backend"
git push
```

## 🚀 SCRIPT TỰ ĐỘNG

Tôi sẽ tạo script `deploy-stable.bat` để làm tất cả!

## 🎯 LỢI ÍCH

- ✅ Backend URL cố định, không đổi
- ✅ Frontend luôn biết Backend ở đâu
- ✅ Deploy frontend không ảnh hưởng backend
- ✅ Deploy backend không ảnh hưởng frontend
- ✅ QR slideshow luôn hoạt động

## 📝 CHECKLIST

- [ ] Railway có Backend URL cố định
- [ ] `client/.env.production` có Backend URL đúng
- [ ] Railway có CORS_ORIGIN đúng
- [ ] Railway có MONGODB_URI đúng
- [ ] Test cả 2 hoạt động độc lập
