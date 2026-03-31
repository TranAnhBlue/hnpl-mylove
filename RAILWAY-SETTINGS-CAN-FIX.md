# 🎯 RAILWAY SETTINGS CẦN FIX NGAY

## ❌ VẤN ĐỀ

Railway đang trả về 502 cho tất cả requests. Nguyên nhân chính: **Root Directory chưa được set!**

## ✅ GIẢI PHÁP - 3 PHÚT

### Bước 1: Vào Railway Settings

1. Mở: https://railway.app
2. Đăng nhập
3. Click Project: **hnpl-mylove**
4. Click vào **Service** (hnpl-mylove-production)
5. Click tab **Settings** (ở menu bên trái)

### Bước 2: Scroll Xuống "Service Settings"

Tìm section **"Service Settings"** (gần cuối trang)

### Bước 3: Set Root Directory

Tìm field **"Root Directory"**:

**Hiện tại:** (trống hoặc `/`)

**Cần sửa thành:**
```
server
```

Click **"Update"** hoặc **"Save"**

### Bước 4: Set Start Command (Nếu Cần)

Tìm field **"Start Command"**:

**Hiện tại:** (có thể trống)

**Cần sửa thành:**
```
node server.js
```

Click **"Update"** hoặc **"Save"**

### Bước 5: Kiểm Tra Variables

Click tab **"Variables"** (ở menu bên trái)

**Phải có 4 biến này:**

1. **PORT**
   ```
   5001
   ```

2. **MONGODB_URI**
   ```
   mongodb+srv://trananhblue:blue22062004%40@cluster0.02q3jqa.mongodb.net/aniversary
   ```

3. **CORS_ORIGIN**
   ```
   https://onlylovehnpl.vercel.app
   ```

4. **NODE_ENV**
   ```
   production
   ```

**Nếu thiếu biến nào:**
- Click **"+ New Variable"**
- Nhập Name và Value
- Click **"Add"**

### Bước 6: Redeploy

1. Click tab **"Deployments"**
2. Click nút **"Deploy"** (góc phải trên)
3. Chọn **"Redeploy"**
4. Đợi 2-3 phút

### Bước 7: Xem Logs

1. Vẫn ở tab **"Deployments"**
2. Click vào deployment mới nhất (ở trên cùng)
3. Click tab **"Deploy Logs"**

**Phải thấy:**
```
✅ Connected to MongoDB
✅ Server running on port 5001
```

**Nếu thấy lỗi:**
- Screenshot lỗi đó
- Tìm cách fix

## 🧪 TEST SAU KHI FIX

### Test 1: Trong Browser

Vào: https://hnpl-mylove-production.up.railway.app/api/health

Phải thấy:
```json
{"status":"OK","mongodb":"connected","uptime":123}
```

### Test 2: Trong Terminal

```bash
curl https://hnpl-mylove-production.up.railway.app/api/health
```

### Test 3: Frontend

Vào: https://onlylovehnpl.vercel.app

Phải load được dữ liệu!

## 📊 TẠI SAO CẦN ROOT DIRECTORY?

### Cấu trúc project:
```
hnpl-mylove/
├── client/          (Frontend)
├── server/          (Backend) ← Railway cần chạy từ đây
│   ├── server.js
│   ├── package.json
│   └── ...
└── ...
```

### Không có Root Directory:
- Railway cố build từ root `/`
- Không tìm thấy `server.js`
- → Fail!

### Có Root Directory = `server`:
- Railway build từ `/server`
- Tìm thấy `server.js`
- → Success!

## 💡 CHECKLIST

Trước khi redeploy, kiểm tra:

### Settings:
- [ ] Root Directory = `server`
- [ ] Start Command = `node server.js`

### Variables:
- [ ] PORT = 5001
- [ ] MONGODB_URI = mongodb+srv://...
- [ ] CORS_ORIGIN = https://onlylovehnpl.vercel.app
- [ ] NODE_ENV = production

### Sau khi redeploy:
- [ ] Logs có "Connected to MongoDB"
- [ ] Logs có "Server running on port 5001"
- [ ] Health check trả về 200 OK
- [ ] Frontend load được dữ liệu

## 🎯 NẾU VẪN FAIL

### Xem Logs Chi Tiết

Railway → Deployments → Click deployment mới → Deploy Logs

**Tìm dòng có:**
- `Error:`
- `Failed:`
- `Cannot:`
- `ENOENT:`

Copy lỗi đó và tìm cách fix.

### Các Lỗi Thường Gặp

#### 1. Module not found
```
Error: Cannot find module 'express'
```
→ Railway chưa chạy `npm install`
→ Check `package.json` có đúng không

#### 2. MongoDB connection failed
```
MongoParseError: Invalid connection string
```
→ Check MONGODB_URI có đúng không
→ Password có encode `@` thành `%40` chưa

#### 3. Port already in use
```
Error: listen EADDRINUSE
```
→ Railway tự động set PORT
→ Code phải dùng `process.env.PORT`

## 🚀 LÀM NGAY!

1. Vào Railway Settings
2. Set Root Directory = `server`
3. Set Start Command = `node server.js`
4. Check Variables (4 biến)
5. Redeploy
6. Xem logs
7. Test!

**Chỉ mất 3 phút!** 💝
