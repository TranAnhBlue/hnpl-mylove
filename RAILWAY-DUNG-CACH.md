# 🚂 RAILWAY - HƯỚNG DẪN ĐÚNG CÁCH

## 📍 BẠN ĐANG Ở ĐÂU

Bạn đang ở: **Project Settings** (onlylovehnpl)

Cần vào: **Service Settings** (service cụ thể)

## 🎯 CÁCH ĐÚNG

### Bước 1: Quay lại Dashboard

Click vào logo Railway (góc trên bên trái) hoặc tên project "onlylovehnpl"

### Bước 2: Tìm Service

Bạn sẽ thấy:
- Project name: **onlylovehnpl**
- Bên dưới có **service** (hình chữ nhật)
- Service name có thể là: **hnpl-mylove** hoặc tên repo

### Bước 3: Click vào Service

Click vào service đó (không phải Project Settings)

### Bước 4: Vào Service Settings

Trong service, bạn sẽ thấy tabs:
- **Deployments**
- **Variables**
- **Settings** ← Click vào đây
- Metrics
- Logs

### Bước 5: Trong Service Settings

Bây giờ bạn sẽ thấy:

#### Build Section:
- **Root Directory** ← Đây rồi! Nhập: `server`
- **Build Command** (để trống)

#### Deploy Section:
- **Start Command** ← Nhập: `node server.js`
- **Watch Paths** (để trống)

## 📋 CHECKLIST CẤU HÌNH

### Service Settings:
- [ ] Root Directory: `server`
- [ ] Start Command: `node server.js`

### Variables Tab:
- [ ] PORT = `5001`
- [ ] MONGODB_URI = `mongodb+srv://trananhblue:blue22062004%40@cluster0.02q3jqa.mongodb.net/aniversary`
- [ ] CORS_ORIGIN = `https://onlylovehnpl.vercel.app`
- [ ] NODE_ENV = `production`

## 🔍 NẾU KHÔNG THẤY SERVICE

### Trường hợp 1: Chưa có service

1. Quay lại project dashboard
2. Click **"New"** hoặc **"+"**
3. Chọn **"GitHub Repo"**
4. Chọn repository: **hnpl-mylove**
5. Railway sẽ tạo service

### Trường hợp 2: Service đã bị xóa

1. Click **"New"**
2. **"GitHub Repo"**
3. Chọn lại **hnpl-mylove**

## 🎯 TÓM TẮT

```
Project (onlylovehnpl)
  └── Service (hnpl-mylove) ← Click vào đây
        ├── Deployments
        ├── Variables ← Thêm env vars
        ├── Settings ← Root Directory & Start Command
        └── Logs
```

## 📸 HÌNH ẢNH THAM KHẢO

Bạn cần thấy màn hình có:
- Tabs: Deployments | Variables | Settings | Metrics | Logs
- Không phải: General | Usage | Environments | ...

## 💡 TIPS

- **Project Settings** = Cài đặt toàn project
- **Service Settings** = Cài đặt từng service (backend, frontend, ...)

Bạn cần vào **Service Settings**!

**Thử lại nhé!** 💝
