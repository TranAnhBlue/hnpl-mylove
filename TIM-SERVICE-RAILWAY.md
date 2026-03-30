# 🔍 TÌM SERVICE TRONG RAILWAY

## ❌ BẠN ĐANG SAI CHỖ

Bạn đang ở: **Project Settings** (General, Usage, Environments...)

Cần vào: **Service** → **Settings**

## ✅ CÁCH TÌM SERVICE

### Cách 1: Từ Project Settings

1. Click vào tên project **"onlylovehnpl"** (góc trên bên trái)
2. Hoặc click logo Railway
3. Bạn sẽ về **Project Dashboard**

### Cách 2: Nhìn vào Dashboard

Trong Project Dashboard, bạn sẽ thấy:

```
┌─────────────────────────────────────┐
│  Project: onlylovehnpl              │
├─────────────────────────────────────┤
│                                     │
│  ┌───────────────────────────┐     │
│  │  Service: hnpl-mylove     │     │ ← Click vào đây!
│  │  Status: Crashed/Running  │     │
│  │  Last deploy: ...         │     │
│  └───────────────────────────┘     │
│                                     │
│  [+ New]                            │
│                                     │
└─────────────────────────────────────┘
```

### Cách 3: Nếu không thấy Service

Có thể service chưa được tạo. Làm theo:

1. Click **"+ New"** hoặc **"New"**
2. Chọn **"GitHub Repo"**
3. Chọn repository: **hnpl-mylove**
4. Railway sẽ tạo service và deploy

## 🎯 SAU KHI VÀO SERVICE

Bạn sẽ thấy tabs:

```
┌─────────────────────────────────────────────────┐
│  Service: hnpl-mylove                           │
├─────────────────────────────────────────────────┤
│  Deployments | Variables | Settings | Metrics  │ ← Tabs này
└─────────────────────────────────────────────────┘
```

### Tab "Settings" (Service Settings)

Trong này bạn sẽ thấy:

#### Build:
- **Root Directory** ← Nhập: `server`
- Build Command

#### Deploy:
- **Start Command** ← Nhập: `node server.js`
- Watch Paths

#### Networking:
- **Generate Domain** ← Lấy URL ở đây

## 📋 BƯỚC TIẾP THEO

### 1. Vào Service Settings

Service → Settings tab

### 2. Cấu hình Build

Root Directory: `server`

### 3. Cấu hình Deploy

Start Command: `node server.js`

### 4. Thêm Variables

Service → Variables tab

Thêm 4 biến:
```
PORT = 5001
MONGODB_URI = mongodb+srv://trananhblue:blue22062004%40@cluster0.02q3jqa.mongodb.net/aniversary
CORS_ORIGIN = https://onlylovehnpl.vercel.app
NODE_ENV = production
```

### 5. Deploy

Railway sẽ tự động deploy sau khi thêm variables

### 6. Lấy URL

Service → Settings → Networking → Generate Domain

## 🆘 VẪN KHÔNG TÌM THẤY?

### Kiểm tra:

1. **Có service nào trong project không?**
   - Nếu không → Tạo mới từ GitHub repo

2. **Service có tên gì?**
   - Có thể là: hnpl-mylove, server, hoặc tên khác

3. **Service có đang chạy không?**
   - Status: Running, Crashed, Building...

### Nếu service bị crashed:

1. Click vào service
2. Tab "Deployments"
3. Click vào deployment mới nhất
4. Xem "Deploy Logs"
5. Tìm lỗi

## 💡 PHÂN BIỆT

| Project Settings | Service Settings |
|------------------|------------------|
| General, Usage, Environments | Deployments, Variables, Settings |
| Cài đặt toàn project | Cài đặt từng service |
| Không có Root Directory | Có Root Directory |
| Không có Start Command | Có Start Command |

**Bạn cần vào Service Settings!**

## 🎯 TÓM TẮT NHANH

1. Quay lại Project Dashboard (click tên project)
2. Tìm service (hình chữ nhật)
3. Click vào service
4. Tab "Settings" → Root Directory & Start Command
5. Tab "Variables" → Thêm env vars
6. Đợi deploy
7. Lấy URL từ Networking

**Chúc bạn tìm thấy!** 💝
