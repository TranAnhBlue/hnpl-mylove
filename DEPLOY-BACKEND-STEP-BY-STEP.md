# 🚀 Deploy Backend - Từng Bước Chi Tiết

## 📋 Tổng Quan

Backend cần 3 thứ:
1. **MongoDB Atlas** - Database (miễn phí)
2. **Railway** - Host backend (miễn phí $5/tháng)
3. **Kết nối** - Nối backend với frontend

Thời gian: ~15 phút

---

## 🗄️ BƯỚC 1: Setup MongoDB Atlas (5 phút)

### 1.1. Tạo Tài Khoản
1. Truy cập: https://www.mongodb.com/cloud/atlas/register
2. Sign up với email hoặc Google
3. Chọn plan **FREE** (M0 Sandbox)

### 1.2. Tạo Cluster
1. Sau khi đăng nhập, click **Build a Database**
2. Chọn **FREE** (Shared)
3. Provider: **AWS**
4. Region: **Singapore** (gần Việt Nam nhất)
5. Cluster Name: `onlylove-cluster`
6. Click **Create**

Đợi 3-5 phút để cluster được tạo.

### 1.3. Tạo Database User
1. Bên trái, click **Database Access**
2. Click **Add New Database User**
3. Authentication Method: **Password**
4. Username: `onlylove`
5. Password: Click **Autogenerate Secure Password** → Copy password này!
   ```
   Ví dụ: aB3dE5fG7hI9jK
   ```
6. Database User Privileges: **Read and write to any database**
7. Click **Add User**

💾 **LƯU LẠI PASSWORD NÀY!**

### 1.4. Whitelist IP
1. Bên trái, click **Network Access**
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere**
4. IP Address sẽ là: `0.0.0.0/0`
5. Click **Confirm**

### 1.5. Lấy Connection String
1. Bên trái, click **Database**
2. Click **Connect** trên cluster của bạn
3. Chọn **Drivers**
4. Driver: **Node.js**, Version: **5.5 or later**
5. Copy connection string:
   ```
   mongodb+srv://onlylove:<password>@onlylove-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Thay `<password>` bằng password bạn đã copy ở bước 1.3
7. Thêm database name vào cuối:
   ```
   mongodb+srv://onlylove:aB3dE5fG7hI9jK@onlylove-cluster.xxxxx.mongodb.net/anniversary?retryWrites=true&w=majority
   ```

💾 **LƯU LẠI CONNECTION STRING NÀY!**

---

## 🚂 BƯỚC 2: Deploy lên Railway (5 phút)

### 2.1. Tạo Tài Khoản Railway
1. Truy cập: https://railway.app
2. Click **Login**
3. Chọn **Login with GitHub**
4. Authorize Railway

### 2.2. Tạo Project
1. Click **New Project**
2. Chọn **Deploy from GitHub repo**
3. Nếu chưa connect GitHub:
   - Click **Configure GitHub App**
   - Chọn repo của bạn
   - Click **Install & Authorize**
4. Chọn repo: `hnpl-mylove` (hoặc tên repo của bạn)
5. Click **Deploy Now**

### 2.3. Configure Root Directory
1. Sau khi project được tạo, click vào service
2. Click **Settings**
3. Tìm **Root Directory**
4. Nhập: `server`
5. Click **Update**

### 2.4. Add Environment Variables
1. Click **Variables**
2. Click **New Variable**
3. Thêm từng biến sau:

**Variable 1:**
```
Name: PORT
Value: 5001
```

**Variable 2:**
```
Name: MONGODB_URI
Value: mongodb+srv://onlylove:aB3dE5fG7hI9jK@onlylove-cluster.xxxxx.mongodb.net/anniversary?retryWrites=true&w=majority
```
(Thay bằng connection string của bạn từ Bước 1.5)

**Variable 3:**
```
Name: CORS_ORIGIN
Value: https://onlylovehnpl.vercel.app
```

**Variable 4:**
```
Name: NODE_ENV
Value: production
```

4. Click **Add** cho mỗi biến

### 2.5. Deploy
Railway sẽ tự động deploy sau khi thêm variables.

Đợi 2-3 phút để deploy hoàn tất.

### 2.6. Lấy Backend URL
1. Click **Settings**
2. Tìm **Domains**
3. Click **Generate Domain**
4. Copy domain, ví dụ:
   ```
   https://onlylove-backend-production.up.railway.app
   ```

💾 **LƯU LẠI BACKEND URL NÀY!**

---

## 🔗 BƯỚC 3: Kết Nối Frontend với Backend (3 phút)

### 3.1. Cập nhật Frontend Config
1. Mở file `client/.env.production`
2. Thay nội dung bằng:
   ```env
   VITE_API_URL=https://onlylove-backend-production.up.railway.app/api
   ```
   (Thay bằng backend URL của bạn + `/api`)

### 3.2. Commit Changes
```bash
git add client/.env.production
git commit -m "Update backend URL"
git push
```

### 3.3. Redeploy Frontend
```bash
cd client
vercel --prod
```

Hoặc:
```bash
deploy-simple.bat
```

---

## ✅ BƯỚC 4: Test (2 phút)

### 4.1. Test Backend
Mở trình duyệt, truy cập:
```
https://onlylove-backend-production.up.railway.app/api/memories
```

Nếu thấy `[]` (mảng rỗng) → Backend hoạt động! ✅

### 4.2. Test Frontend
1. Mở: https://onlylovehnpl.vercel.app
2. Click nút **+** (góc dưới phải)
3. Thêm kỷ niệm mới:
   - Tiêu đề: "Test"
   - Ngày: Hôm nay
   - Upload ảnh
4. Click **Lưu**

Nếu kỷ niệm xuất hiện → Kết nối thành công! ✅

### 4.3. Test Slideshow
1. Click nút 🎬
2. Quét QR code
3. Slideshow mở với 70 ảnh + nhạc ✅

---

## 🎉 HOÀN THÀNH!

### URLs của bạn:
```
Frontend: https://onlylovehnpl.vercel.app
Backend: https://onlylove-backend-production.up.railway.app
Database: MongoDB Atlas
Slideshow: https://onlylovehnpl.vercel.app/love-slideshow
```

### Tính năng đã có:
- ✅ Thêm/Sửa/Xóa kỷ niệm
- ✅ Upload ảnh
- ✅ Slideshow 70 ảnh + nhạc
- ✅ QR code
- ✅ Tìm kiếm, lọc
- ✅ Dark mode
- ✅ Thống kê
- ✅ Tất cả tính năng!

---

## 🔧 Troubleshooting

### ❌ Backend không kết nối được

#### Kiểm tra Railway Logs:
1. Railway Dashboard → Deployments
2. Click vào deployment mới nhất
3. Xem logs có lỗi gì

#### Lỗi thường gặp:

**1. MongoDB connection failed**
- Check connection string có đúng không
- Check password có đúng không
- Check IP whitelist: 0.0.0.0/0

**2. Port already in use**
- Không sao, Railway tự động assign port

**3. Module not found**
- Railway sẽ tự động `npm install`
- Nếu lỗi, check `server/package.json`

### ❌ Frontend không gọi được API

#### Kiểm tra:
1. CORS_ORIGIN có đúng không:
   ```
   https://onlylovehnpl.vercel.app
   ```
   (Không có dấu `/` ở cuối)

2. VITE_API_URL có đúng không:
   ```
   https://your-backend.railway.app/api
   ```
   (Có `/api` ở cuối)

3. Đã redeploy frontend chưa

#### Fix:
```bash
# Cập nhật .env.production
# Redeploy
cd client
vercel --prod
```

### ❌ Upload ảnh không hoạt động

Railway/Vercel là serverless, ảnh sẽ mất khi redeploy.

#### Giải pháp: Dùng Cloudinary

Xem hướng dẫn trong `DEPLOY-ONLYLOVEHNPL.md` phần "Upload Ảnh trên Production"

---

## 💰 Chi Phí

### Miễn Phí:
- MongoDB Atlas: 512MB (đủ cho ~10,000 kỷ niệm)
- Railway: $5 credit/tháng (đủ cho hobby project)
- Vercel: 100GB bandwidth/tháng

### Nếu vượt giới hạn:
- MongoDB: $9/tháng
- Railway: Pay as you go (~$5-10/tháng)
- Vercel: $20/tháng

---

## 📊 Monitoring

### Railway:
- Dashboard → Metrics
- Xem CPU, Memory, Network usage

### MongoDB Atlas:
- Dashboard → Metrics
- Xem database size, queries

### Vercel:
- Dashboard → Analytics
- Xem traffic, performance

---

## 🔄 Cập Nhật Sau Này

### Khi thay đổi backend code:
```bash
git add .
git commit -m "Update backend"
git push
```
Railway tự động deploy!

### Khi thay đổi frontend code:
```bash
git add .
git commit -m "Update frontend"
git push
```
Vercel tự động deploy!

---

💝 **Chúc mừng! Ứng dụng đã hoàn toàn online!**

🌐 **Truy cập từ mọi nơi, mọi thiết bị!**

🎬 **70 ảnh kỷ niệm + nhạc "Lễ Đường" đang chờ bạn!**
