# 🚀 Deploy lên onlylovehnpl.vercel.app

## 📋 Thông Tin Domain

- **Frontend**: https://onlylovehnpl.vercel.app
- **Backend**: Sẽ deploy lên Railway
- **Database**: MongoDB Atlas

---

## ⚡ Bước 1: Setup Database (MongoDB Atlas)

### 1.1. Tạo Cluster
1. Truy cập: https://mongodb.com/cloud/atlas
2. Sign up / Login
3. Create Free Cluster
4. Chọn region gần Việt Nam (Singapore)

### 1.2. Tạo User
1. Database Access → Add New Database User
2. Username: `onlylove`
3. Password: Tạo password mạnh (lưu lại)
4. Database User Privileges: Read and write to any database

### 1.3. Whitelist IP
1. Network Access → Add IP Address
2. Add: `0.0.0.0/0` (Allow from anywhere)
3. Confirm

### 1.4. Lấy Connection String
1. Database → Connect
2. Connect your application
3. Copy connection string:
```
mongodb+srv://onlylove:<password>@cluster0.xxxxx.mongodb.net/anniversary?retryWrites=true&w=majority
```
4. Thay `<password>` bằng password thật

**Connection string của bạn:**
```
mongodb+srv://onlylove:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/anniversary
```

---

## 🚀 Bước 2: Deploy Backend lên Railway

### 2.1. Tạo Project
1. Truy cập: https://railway.app
2. Login với GitHub
3. New Project → Deploy from GitHub repo
4. Chọn repo của bạn
5. Chọn thư mục: `server`

### 2.2. Configure Environment Variables
Trong Railway dashboard → Variables, thêm:

```env
PORT=5001
MONGODB_URI=mongodb+srv://onlylove:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/anniversary
CORS_ORIGIN=https://onlylovehnpl.vercel.app
NODE_ENV=production
```

### 2.3. Deploy
Railway sẽ tự động deploy. Đợi vài phút.

### 2.4. Lấy Backend URL
1. Settings → Generate Domain
2. Copy URL: `https://onlylove-backend-production.up.railway.app`
3. Lưu lại URL này

**Backend URL của bạn:**
```
https://onlylove-backend-production.up.railway.app
```

---

## 🌐 Bước 3: Deploy Frontend lên Vercel

### 3.1. Tạo file .env.production

Tạo file `client/.env.production`:
```env
VITE_API_URL=https://onlylove-backend-production.up.railway.app/api
```

### 3.2. Commit changes
```bash
git add .
git commit -m "Add production config"
git push
```

### 3.3. Deploy với Vercel CLI

#### Cài Vercel CLI (nếu chưa có)
```bash
npm install -g vercel
```

#### Login
```bash
vercel login
```

#### Deploy
```bash
cd client
vercel --prod
```

Khi được hỏi:
- **Set up and deploy?** Yes
- **Which scope?** Chọn account của bạn
- **Link to existing project?** Yes (nếu đã có) hoặc No (nếu mới)
- **Project name?** `onlylovehnpl`
- **Directory?** `./` (enter)
- **Override settings?** No

### 3.4. Hoặc Deploy qua Vercel Dashboard

1. Truy cập: https://vercel.com/new
2. Import Git Repository
3. Chọn repo của bạn
4. Configure:
   - **Project Name**: `onlylovehnpl`
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Environment Variables:
   - Key: `VITE_API_URL`
   - Value: `https://onlylove-backend-production.up.railway.app/api`
6. Deploy!

### 3.5. Verify Domain
Sau khi deploy, domain sẽ là:
```
https://onlylovehnpl.vercel.app
```

---

## 🔄 Bước 4: Cập Nhật CORS trên Backend

Quay lại Railway → Variables → Update:
```env
CORS_ORIGIN=https://onlylovehnpl.vercel.app
```

Railway sẽ tự động redeploy.

---

## ✅ Bước 5: Test Production

### 5.1. Test Frontend
1. Mở: https://onlylovehnpl.vercel.app
2. Trang load được ✅
3. Không có lỗi console (F12) ✅

### 5.2. Test API Connection
1. Thêm kỷ niệm mới
2. Upload ảnh
3. Xem danh sách kỷ niệm

### 5.3. Test Slideshow
1. Click nút 🎬
2. Quét QR code
3. Slideshow mở: https://onlylovehnpl.vercel.app/love-slideshow
4. 70 ảnh hiển thị ✅
5. Nhạc "Lễ Đường" phát ✅
6. Controls hoạt động ✅

### 5.4. Test trên Mobile
1. Mở trên điện thoại: https://onlylovehnpl.vercel.app
2. UI responsive ✅
3. Slideshow hoạt động ✅
4. Nhạc phát được ✅

---

## 📱 QR Code Production

QR code sẽ tự động dùng URL production:
```
https://onlylovehnpl.vercel.app/love-slideshow
```

Không cần thay đổi code, đã tự động detect!

---

## 🎨 Custom Domain (Optional)

Nếu muốn domain riêng (ví dụ: `onlylove.com`):

### Bước 1: Mua domain
- Namecheap, GoDaddy, Google Domains, etc.

### Bước 2: Add vào Vercel
1. Vercel Dashboard → Settings → Domains
2. Add Domain: `onlylove.com`
3. Follow hướng dẫn cấu hình DNS

### Bước 3: Cập nhật CORS
Railway → Variables:
```env
CORS_ORIGIN=https://onlylove.com
```

---

## 🔄 Cập Nhật Sau Này

### Khi thay đổi code:

**Frontend:**
```bash
git add .
git commit -m "Update frontend"
git push
```
Vercel tự động deploy!

**Backend:**
```bash
git add .
git commit -m "Update backend"
git push
```
Railway tự động deploy!

### Khi thêm ảnh mới:
1. Add ảnh vào `client/public/images/`
2. Cập nhật code nếu cần
3. Push lên Git
4. Vercel tự động deploy

---

## 🖼️ Upload Ảnh trên Production

Hiện tại ảnh được lưu local trong `server/uploads/`. Trên Railway/Vercel (serverless), ảnh sẽ mất khi redeploy.

### Giải pháp: Dùng Cloudinary (Miễn phí)

#### Bước 1: Setup Cloudinary
1. Đăng ký: https://cloudinary.com
2. Dashboard → Copy credentials:
   - Cloud Name
   - API Key
   - API Secret

#### Bước 2: Cài package
```bash
cd server
npm install cloudinary multer-storage-cloudinary
```

#### Bước 3: Cập nhật server.js
```javascript
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Update multer storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'onlylove-memories',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    transformation: [{ width: 1200, height: 1200, crop: 'limit' }]
  }
});

const upload = multer({ storage });
```

#### Bước 4: Add env variables trên Railway
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### Bước 5: Push & Deploy
```bash
git add .
git commit -m "Add Cloudinary support"
git push
```

---

## 📊 Monitoring

### Vercel Analytics
1. Vercel Dashboard → Analytics
2. Enable Analytics
3. Xem traffic, performance

### Railway Logs
1. Railway Dashboard → Deployments
2. View Logs
3. Debug errors

### MongoDB Atlas
1. Atlas Dashboard → Metrics
2. Xem database usage
3. Monitor queries

---

## 🔒 Security Checklist

- [x] MongoDB password mạnh
- [x] IP whitelist: 0.0.0.0/0
- [x] CORS chỉ cho phép domain của bạn
- [x] Environment variables không commit
- [x] `.gitignore` đã có `.env`
- [x] HTTPS enabled (tự động với Vercel/Railway)

---

## 💰 Chi Phí

### Miễn Phí:
- **Vercel**: 100GB bandwidth/tháng
- **Railway**: $5 credit/tháng
- **MongoDB Atlas**: 512MB storage
- **Cloudinary**: 25GB storage, 25GB bandwidth/tháng

Đủ cho hobby project!

---

## 🆘 Troubleshooting

### ❌ Frontend không load
```bash
# Check Vercel logs
vercel logs

# Rebuild
cd client
npm run build
vercel --prod
```

### ❌ API không kết nối
1. Check Railway logs
2. Verify CORS_ORIGIN
3. Test API: `https://onlylove-backend-production.up.railway.app/api/memories`

### ❌ Database lỗi
1. Check MongoDB Atlas connection
2. Verify IP whitelist: 0.0.0.0/0
3. Test connection string

### ❌ Ảnh không hiển thị
1. Setup Cloudinary (xem bên trên)
2. Hoặc dùng external image hosting

---

## 📞 Support

Nếu gặp vấn đề:
1. Check logs (Vercel/Railway dashboard)
2. Verify environment variables
3. Test API endpoints với Postman
4. Check browser console (F12)

---

## 🎉 Hoàn Thành!

### URLs của bạn:
```
Frontend: https://onlylovehnpl.vercel.app
Slideshow: https://onlylovehnpl.vercel.app/love-slideshow
Backend: https://onlylove-backend-production.up.railway.app
```

### Chia sẻ:
1. Gửi link cho người thân yêu
2. Tạo QR code và in ra
3. Share trên social media

---

💝 **Chúc mừng! Ứng dụng đã online tại onlylovehnpl.vercel.app!**

🌐 **Truy cập từ mọi nơi, mọi thiết bị!**

🎉 **Tận hưởng 70 ảnh kỷ niệm với nhạc "Lễ Đường"!**
