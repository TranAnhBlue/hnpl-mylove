# 🚀 SETUP RAILWAY NGAY - ĐÃ FIX MONGODB

## ✅ LOCAL ĐÃ HOẠT ĐỘNG

Server local đã kết nối MongoDB thành công!

```
✅ Connected to MongoDB
✅ Server running on port 5001
```

## 🚂 BÂY GIỜ SETUP RAILWAY

### Bước 1: Vào Railway Dashboard

https://railway.app

### Bước 2: Kiểm tra Project

- Project: `hnpl-mylove`
- Nếu chưa có → New Project → Deploy from GitHub → Chọn `hnpl-mylove`

### Bước 3: Settings

Railway → Settings:

```
Root Directory: server
Start Command: node server.js
Builder: NIXPACKS
```

### Bước 4: Environment Variables

Railway → Variables → Thêm:

**QUAN TRỌNG:** Password có ký tự `@` phải encode thành `%40`!

```env
PORT
5001

MONGODB_URI
mongodb+srv://trananhblue:blue22062004%40@cluster0.02q3jqa.mongodb.net/aniversary

CORS_ORIGIN
https://onlylovehnpl.vercel.app

NODE_ENV
production
```

**Lưu ý:** 
- Password: `blue22062004@` → Encode: `blue22062004%40`
- Ký tự `@` trong password → `%40`

### Bước 5: Deploy

Railway sẽ tự động deploy sau khi thêm variables.

Hoặc: Deployments → Redeploy

### Bước 6: Lấy URL

Settings → Networking → Generate Domain (nếu chưa có)

Copy URL: `https://xxx.up.railway.app`

### Bước 7: Test Backend

```bash
curl https://xxx.up.railway.app/
curl https://xxx.up.railway.app/api/health
curl https://xxx.up.railway.app/api/memories
```

Nếu thấy JSON response → Backend OK! ✅

## 🌐 KẾT NỐI FRONTEND

### Cập nhật client/.env.production

```env
VITE_API_URL=https://xxx.up.railway.app/api
```

### Deploy Frontend

```bash
cd client
npm run build
vercel --prod
```

## 🧪 TEST HOÀN CHỈNH

1. Vào: https://onlylovehnpl.vercel.app
2. Thêm kỷ niệm mới
3. Quét QR slideshow

## 📝 CHECKLIST

- [x] Local server hoạt động
- [ ] Railway có đúng Environment Variables (nhớ encode `@` → `%40`)
- [ ] Railway deploy thành công
- [ ] Test backend API
- [ ] Frontend kết nối backend
- [ ] Test thêm kỷ niệm
- [ ] Test QR slideshow

## 💡 LƯU Ý

### Ký tự đặc biệt trong password cần encode:

| Ký tự | Encode |
|-------|--------|
| `@`   | `%40`  |
| `#`   | `%23`  |
| `$`   | `%24`  |
| `%`   | `%25`  |
| `&`   | `%26`  |
| `/`   | `%2F`  |
| `?`   | `%3F`  |

### Tool encode online:
https://www.urlencoder.org/

## 🚀 SCRIPT TỰ ĐỘNG

Sau khi Railway có URL, chạy:

```bash
final-connect.bat
```

**Chúc bạn thành công!** 💝
