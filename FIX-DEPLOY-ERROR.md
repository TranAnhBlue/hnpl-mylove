# 🔧 Fix Lỗi Deploy

## ❌ Lỗi: "No Output Directory named 'dist' found"

### Nguyên Nhân
Vercel đang deploy từ thư mục root thay vì thư mục `client`.

### ✅ Giải Pháp

#### Cách 1: Dùng Script Mới (Khuyến nghị)
```bash
deploy-simple.bat
```

Script này sẽ:
1. Tự động vào thư mục `client`
2. Build frontend
3. Deploy đúng cách

#### Cách 2: Deploy Thủ Công
```bash
# Bước 1: Vào thư mục client
cd client

# Bước 2: Build
npm run build

# Bước 3: Deploy
vercel --prod

# Bước 4: Quay lại root
cd ..
```

#### Cách 3: Dùng Vercel Dashboard

1. Truy cập: https://vercel.com/new
2. Import Git Repository
3. Chọn repo của bạn
4. **Quan trọng:** Configure:
   - **Root Directory**: `client` ← Chọn thư mục client
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Environment Variables:
   - `VITE_API_URL`: `https://your-backend.railway.app/api`
6. Deploy!

---

## 🔍 Kiểm Tra Cấu Hình

### File `vercel.json` (ở root)
Đã được cập nhật:
```json
{
  "buildCommand": "cd client && npm install && npm run build",
  "outputDirectory": "client/dist",
  "installCommand": "npm install --prefix client",
  "framework": null
}
```

### Hoặc Deploy Từ Thư Mục Client
Nếu muốn deploy trực tiếp từ `client`:

1. Xóa file `vercel.json` ở root
2. Vào thư mục client:
   ```bash
   cd client
   ```
3. Deploy:
   ```bash
   vercel --prod
   ```

---

## 🎯 Test Lại

### Bước 1: Clean Build
```bash
cd client
rmdir /s /q dist
npm run build
```

Kiểm tra thư mục `client/dist/` có tồn tại không.

### Bước 2: Deploy Lại
```bash
# Từ thư mục client
vercel --prod --yes
```

### Bước 3: Verify
Mở: https://onlylovehnpl.vercel.app

---

## 💡 Tips

### Nếu Vẫn Lỗi:

#### 1. Xóa .vercel folder
```bash
rmdir /s /q .vercel
rmdir /s /q client\.vercel
```

#### 2. Deploy lại từ đầu
```bash
cd client
vercel --prod
```

#### 3. Link lại project
```bash
cd client
vercel link
# Chọn scope và project name: onlylovehnpl
vercel --prod
```

---

## 🆘 Vẫn Không Được?

### Option A: Deploy Qua Dashboard
1. Vào https://vercel.com/dashboard
2. Import project
3. Chọn **Root Directory**: `client`
4. Deploy

### Option B: Tạo Project Mới
1. Xóa project cũ trên Vercel
2. Tạo project mới
3. Chọn đúng Root Directory: `client`

---

## ✅ Checklist

- [ ] Đã vào thư mục `client` trước khi deploy
- [ ] File `client/dist/` tồn tại sau khi build
- [ ] Vercel CLI đã login
- [ ] Root Directory = `client` (nếu dùng dashboard)
- [ ] Build command = `npm run build`
- [ ] Output directory = `dist`

---

💝 **Sau khi fix, chạy lại:**
```bash
deploy-simple.bat
```

Hoặc:
```bash
cd client
vercel --prod
```
