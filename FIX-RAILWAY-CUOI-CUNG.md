# 🔧 FIX RAILWAY LẦN CUỐI - CHI TIẾT

## ❌ VẤN ĐỀ

Railway vẫn trả về 502 error sau nhiều lần deploy.

## 🔍 NGUYÊN NHÂN CÓ THỂ

### 1. Railway Settings Sai

**Root Directory** phải là: `server`

Nếu không set, Railway sẽ cố build từ root → Fail

### 2. Start Command Sai

**Start Command** phải là: `node server.js`

### 3. Variables Thiếu hoặc Sai

Phải có đủ 4 biến:
- PORT
- MONGODB_URI  
- CORS_ORIGIN
- NODE_ENV

## ✅ CÁCH FIX - TỪNG BƯỚC

### Bước 1: Kiểm Tra Railway Settings

1. Vào: https://railway.app
2. Project: **hnpl-mylove**
3. Click vào **Service** (backend)
4. Click tab **Settings**
5. Scroll xuống **Service Settings**

**Kiểm tra:**

#### Root Directory:
```
server
```

Nếu trống hoặc sai → Sửa thành `server`

#### Start Command:
```
node server.js
```

Nếu trống hoặc sai → Sửa thành `node server.js`

#### Build Command:
```
(để trống - Railway tự động)
```

### Bước 2: Kiểm Tra Variables

1. Tab **Variables**
2. Phải có 4 biến:

```
PORT = 5001
MONGODB_URI = mongodb+srv://trananhblue:blue22062004%40@cluster0.02q3jqa.mongodb.net/aniversary
CORS_ORIGIN = https://onlylovehnpl.vercel.app
NODE_ENV = production
```

**Nếu thiếu, thêm ngay!**

### Bước 3: Redeploy

Sau khi sửa Settings/Variables:

1. Tab **Deployments**
2. Click nút **"Deploy"** (góc phải)
3. Chọn **"Redeploy"**
4. Đợi 2-3 phút

### Bước 4: Xem Logs

1. Tab **Deployments**
2. Click deployment mới nhất
3. Tab **Deploy Logs**

**Phải thấy:**
```
Connecting to MongoDB...
✅ Connected to MongoDB
✅ Server running on port 5001
```

**Nếu thấy lỗi:**
- Copy lỗi đó
- Tìm cách fix

## 🧪 TEST

### Test 1: Health Check

```bash
curl https://hnpl-mylove-production.up.railway.app/api/health
```

Phải thấy:
```json
{"status":"OK","mongodb":"connected"}
```

### Test 2: Get Memories

```bash
curl https://hnpl-mylove-production.up.railway.app/api/memories
```

Phải thấy array (có thể rỗng)

### Test 3: Root Endpoint

```bash
curl https://hnpl-mylove-production.up.railway.app/
```

Phải thấy:
```json
{"status":"OK","message":"Anniversary Memory API is running"}
```

## 📊 CHECKLIST

### Railway Settings:
- [ ] Root Directory = `server`
- [ ] Start Command = `node server.js`
- [ ] Build Command = (trống)

### Railway Variables:
- [ ] PORT = 5001
- [ ] MONGODB_URI = mongodb+srv://...
- [ ] CORS_ORIGIN = https://onlylovehnpl.vercel.app
- [ ] NODE_ENV = production

### Deployment:
- [ ] Status = Success
- [ ] Logs có "Connected to MongoDB"
- [ ] Logs có "Server running on port 5001"

### Testing:
- [ ] Health check OK
- [ ] Get memories OK
- [ ] Root endpoint OK

## 🎯 NẾU VẪN FAIL

### Option 1: Xem Logs Chi Tiết

Railway → Deployments → Click deployment → Deploy Logs

Tìm dòng có "Error:" hoặc "Failed:"

### Option 2: Test Local

```bash
cd server
npm start
```

Nếu local chạy OK → Vấn đề ở Railway config

### Option 3: Dùng Local + ngrok

Nếu Railway không fix được:
1. Chạy server local
2. Dùng ngrok expose ra internet
3. Update frontend trỏ về ngrok URL

## 💡 LƯU Ý

### MongoDB Connection String

Password có ký tự `@` phải encode thành `%40`:
```
blue22062004@ → blue22062004%40
```

### CORS Origin

Phải match chính xác với frontend URL:
```
https://onlylovehnpl.vercel.app
```

Không có `/` ở cuối!

---

**Làm theo từng bước trên để fix Railway!** 🚀
