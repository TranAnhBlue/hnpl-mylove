# 🔍 KIỂM TRA RAILWAY SETTINGS

Bạn đang ở trang Settings. Hãy kiểm tra các mục sau:

## 1️⃣ SERVICE SETTINGS (Quan trọng nhất!)

Scroll xuống tìm section **"Service Settings"**

### Root Directory
- **Hiện tại:** (cho tôi biết giá trị hiện tại)
- **Cần là:** `server`

Nếu trống hoặc khác `server`:
1. Click vào field "Root Directory"
2. Nhập: `server`
3. Click "Update" hoặc nhấn Enter

### Start Command
- **Hiện tại:** (cho tôi biết giá trị hiện tại)
- **Cần là:** `node server.js`

Nếu trống hoặc khác:
1. Click vào field "Start Command"
2. Nhập: `node server.js`
3. Click "Update" hoặc nhấn Enter

### Build Command
- **Cần là:** (để trống - Railway tự động chạy npm install)

## 2️⃣ VARIABLES

Click tab "Variables" (menu bên trái)

Phải có 4 biến này:

### PORT
```
5001
```

### MONGODB_URI
```
mongodb+srv://trananhblue:blue22062004%40@cluster0.02q3jqa.mongodb.net/aniversary
```

### CORS_ORIGIN
```
https://onlylovehnpl.vercel.app
```

### NODE_ENV
```
production
```

## 3️⃣ SAU KHI SỬA

1. Click tab "Deployments"
2. Click nút "Deploy" (góc phải)
3. Chọn "Redeploy"
4. Đợi 2-3 phút

## 4️⃣ XEM LOGS

1. Tab "Deployments"
2. Click deployment mới nhất
3. Tab "Deploy Logs"

Phải thấy:
```
✅ Connected to MongoDB
✅ Server running on port 5001
```

## ❓ CHO TÔI BIẾT

Hãy cho tôi biết:

1. **Root Directory hiện tại là gì?**
   - Trống?
   - `/`?
   - `server`?
   - Khác?

2. **Start Command hiện tại là gì?**
   - Trống?
   - `node server.js`?
   - Khác?

3. **Variables có đủ 4 biến không?**
   - PORT?
   - MONGODB_URI?
   - CORS_ORIGIN?
   - NODE_ENV?

4. **Logs có lỗi gì không?**
   - Copy lỗi đó cho tôi

---

**Trả lời 4 câu hỏi trên để tôi giúp bạn fix!** 🚀
