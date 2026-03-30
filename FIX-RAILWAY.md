# 🔧 Fix Lỗi Railway Deploy

## ❌ Lỗi: "Build failed" / "Error creating build plan with Nixpacks"

Tôi thấy Railway đang báo lỗi build. Đây là cách fix:

---

## ✅ Giải Pháp

### Bước 1: Kiểm tra Root Directory

1. Vào Railway Dashboard
2. Click vào service `hnpl-mylove`
3. Click **Settings**
4. Tìm **Root Directory**
5. Đảm bảo là: `server`

Nếu không phải `server`, sửa lại:
- Nhập: `server`
- Click **Update**

### Bước 2: Kiểm tra Environment Variables

Click **Variables**, đảm bảo có đủ:

```env
PORT=5001
MONGODB_URI=mongodb+srv://...
CORS_ORIGIN=https://onlylovehnpl.vercel.app
NODE_ENV=production
```

**Quan trọng:**
- `MONGODB_URI` phải là connection string đầy đủ từ MongoDB Atlas
- `CORS_ORIGIN` không có dấu `/` ở cuối

### Bước 3: Kiểm tra MongoDB Atlas

1. Vào MongoDB Atlas Dashboard
2. **Network Access** → Đảm bảo có IP: `0.0.0.0/0`
3. **Database Access** → Đảm bảo user có quyền "Read and write"

### Bước 4: Redeploy

Sau khi sửa xong:

1. Railway Dashboard → **Deployments**
2. Click **Deploy** (nút ở góc phải)
3. Hoặc push code mới lên GitHub:
   ```bash
   git add .
   git commit -m "Fix railway config"
   git push
   ```

Railway sẽ tự động deploy lại.

---

## 🔍 Debug Logs

### Xem Logs Chi Tiết:

1. Railway Dashboard → **Deployments**
2. Click vào deployment bị lỗi
3. Click **View logs**
4. Xem lỗi cụ thể

### Lỗi Thường Gặp:

#### 1. "Cannot find module"
**Nguyên nhân:** Root Directory sai

**Fix:**
- Settings → Root Directory → `server`

#### 2. "ENOENT: no such file or directory"
**Nguyên nhân:** Đang tìm file ở sai thư mục

**Fix:**
- Đảm bảo Root Directory = `server`
- File `server.js` phải ở trong `server/`

#### 3. "MongoDB connection failed"
**Nguyên nhân:** Connection string sai hoặc IP chưa whitelist

**Fix:**
- Check MONGODB_URI
- MongoDB Atlas → Network Access → 0.0.0.0/0

#### 4. "Port already in use"
**Nguyên nhân:** Không sao, Railway tự động assign port

**Fix:** Không cần fix, Railway sẽ xử lý

---

## 📋 Checklist

- [ ] Root Directory = `server`
- [ ] Environment Variables đầy đủ
- [ ] MongoDB IP whitelist: 0.0.0.0/0
- [ ] Connection string đúng format
- [ ] File `server/server.js` tồn tại
- [ ] File `server/package.json` tồn tại

---

## 🚀 Sau Khi Fix

### Test Backend:

Mở trình duyệt, truy cập:
```
https://your-railway-url.up.railway.app/api/memories
```

Nếu thấy `[]` → Backend hoạt động! ✅

### Lấy Backend URL:

1. Railway → Settings → Domains
2. Copy URL (ví dụ: `https://hnpl-mylove-production.up.railway.app`)

### Cập Nhật Frontend:

```bash
# Cập nhật file client/.env.production
echo VITE_API_URL=https://your-railway-url.up.railway.app/api > client\.env.production

# Redeploy frontend
cd client
vercel --prod
```

---

## 💡 Tips

### Nếu Vẫn Lỗi:

#### Option 1: Xóa và Tạo Lại Service
1. Railway → Settings → Delete Service
2. New Service → Deploy from GitHub
3. Chọn repo
4. Root Directory: `server`
5. Add Variables

#### Option 2: Deploy Thủ Công
```bash
# Cài Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link project
railway link

# Deploy
cd server
railway up
```

---

## 📞 Cần Thêm Thông Tin?

Gửi cho tôi:
1. Screenshot logs đầy đủ
2. Environment Variables (che password)
3. Root Directory setting

Tôi sẽ giúp debug cụ thể hơn!

---

💝 **Chúc bạn fix thành công!**
