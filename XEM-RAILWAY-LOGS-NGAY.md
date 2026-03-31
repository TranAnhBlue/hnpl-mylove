# 🔍 XEM RAILWAY LOGS NGAY

## ❌ VẪN 502

Railway vẫn fail sau khi set Root Directory đúng.

## 🎯 CẦN LÀM NGAY

### Bước 1: Xem Logs

1. Trong Railway, click tab **"Deployments"**
2. Click vào deployment MỚI NHẤT (ở trên cùng)
3. Click tab **"Deploy Logs"**

### Bước 2: Tìm Lỗi

Scroll xuống tìm dòng có:
- `Error:`
- `Failed:`
- `Cannot:`
- `ENOENT:`
- `Module not found:`
- `Connection refused:`

### Bước 3: Copy Lỗi

Copy toàn bộ lỗi đó và gửi cho tôi.

## 🔍 CÁC LỖI THƯỜNG GẶP

### Lỗi 1: Module not found

```
Error: Cannot find module 'express'
```

**Nguyên nhân:** Railway chưa chạy `npm install`

**Fix:** 
- Check `server/package.json` có đúng không
- Railway phải tự động chạy `npm install`

### Lỗi 2: MongoDB connection

```
MongoParseError: Invalid connection string
```

**Nguyên nhân:** MONGODB_URI sai

**Fix:**
- Check Railway Variables
- MONGODB_URI phải có `%40` thay vì `@`

### Lỗi 3: Port binding

```
Error: listen EADDRINUSE
```

**Nguyên nhân:** Port conflict

**Fix:**
- Code phải dùng `process.env.PORT`
- Railway tự động set PORT

### Lỗi 4: File not found

```
Error: Cannot find module './server.js'
```

**Nguyên nhân:** Root Directory hoặc Start Command sai

**Fix:**
- Root Directory = `server`
- Start Command = `node server.js`

## 📊 KIỂM TRA VARIABLES

Click tab **"Variables"** và kiểm tra:

### Phải có 4 biến:

1. **PORT**
   ```
   5001
   ```

2. **MONGODB_URI**
   ```
   mongodb+srv://trananhblue:blue22062004%40@cluster0.02q3jqa.mongodb.net/aniversary
   ```
   
   ⚠️ Chú ý: `%40` chứ không phải `@`

3. **CORS_ORIGIN**
   ```
   https://onlylovehnpl.vercel.app
   ```

4. **NODE_ENV**
   ```
   production
   ```

### Nếu thiếu biến:

Click **"+ New Variable"** và thêm.

## 🎯 LÀM NGAY

1. Xem Deploy Logs
2. Tìm lỗi
3. Copy lỗi đó
4. Gửi cho tôi
5. Hoặc check Variables có đủ 4 biến không

---

**Cho tôi biết lỗi gì trong logs!** 🔍
