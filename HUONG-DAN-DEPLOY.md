# 🚀 Hướng Dẫn Deploy Ứng Dụng

## 📋 Tổng Quan

Có 3 cách deploy:
1. **Vercel** (Khuyến nghị) - Miễn phí, dễ nhất, tự động deploy
2. **Netlify** - Miễn phí, tương tự Vercel
3. **Railway/Render** - Cho cả frontend + backend + database

## 🎯 Cách 1: Deploy lên Vercel (Khuyến nghị)

### Bước 1: Chuẩn bị

#### 1.1. Tạo tài khoản Vercel
- Truy cập: https://vercel.com
- Sign up bằng GitHub (khuyến nghị)

#### 1.2. Push code lên GitHub
```bash
# Khởi tạo git (nếu chưa có)
git init

# Add tất cả files
git add .

# Commit
git commit -m "Ready to deploy"

# Tạo repo trên GitHub rồi push
git remote add origin https://github.com/USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

### Bước 2: Deploy Frontend (Client)

#### 2.1. Cài Vercel CLI
```bash
npm install -g vercel
```

#### 2.2. Deploy
```bash
# Vào thư mục client
cd client

# Login Vercel
vercel login

# Deploy
vercel

# Làm theo hướng dẫn:
# - Set up and deploy? Yes
# - Which scope? Chọn account của bạn
# - Link to existing project? No
# - Project name? anniversary-app (hoặc tên bạn muốn)
# - Directory? ./ (enter)
# - Override settings? No
```

#### 2.3. Lấy URL
Sau khi deploy xong, bạn sẽ có URL như:
```
https://anniversary-app-abc123.vercel.app
```

### Bước 3: Deploy Backend (Server)

#### Option A: Deploy backend lên Vercel

**Tạo file `server/vercel.json`:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

**Deploy:**
```bash
cd server
vercel
```

#### Option B: Deploy backend lên Railway (Khuyến nghị cho backend)

1. Truy cập: https://railway.app
2. Sign up bằng GitHub
3. New Project → Deploy from GitHub repo
4. Chọn repo của bạn
5. Chọn thư mục `server`
6. Railway tự động detect và deploy

### Bước 4: Setup Database

#### Option A: MongoDB Atlas (Miễn phí)

1. Truy cập: https://www.mongodb.com/cloud/atlas
2. Sign up
3. Create Free Cluster
4. Database Access → Add User
5. Network Access → Add IP (0.0.0.0/0 cho phép tất cả)
6. Connect → Get connection string
7. Copy connection string: `mongodb+srv://username:password@cluster.mongodb.net/anniversary`

#### Option B: Railway MongoDB

1. Trong Railway project
2. New → Database → MongoDB
3. Copy connection string từ Variables

### Bước 5: Cấu hình Environment Variables

#### Trên Vercel (Frontend):
1. Vào project dashboard
2. Settings → Environment Variables
3. Thêm:
```
VITE_API_URL=https://your-backend-url.railway.app/api
```

#### Trên Railway (Backend):
1. Vào project dashboard
2. Variables
3. Thêm:
```
PORT=5001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/anniversary
CORS_ORIGIN=https://your-frontend-url.vercel.app
```

### Bước 6: Cập nhật Code

#### File `client/src/App.jsx`:
```jsx
// Thay đổi từ:
const API_URL = 'http://localhost:5001/api';

// Thành:
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
```

#### File `server/server.js`:
```javascript
// Thêm CORS config
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
};

app.use(cors(corsOptions));
```

### Bước 7: Redeploy

```bash
# Frontend
cd client
vercel --prod

# Backend (nếu dùng Vercel)
cd server
vercel --prod

# Backend (nếu dùng Railway) - tự động deploy khi push git
git add .
git commit -m "Update for production"
git push
```

---

## 🎯 Cách 2: Deploy Toàn Bộ lên Railway

### Bước 1: Chuẩn bị

#### Tạo file `railway.json` ở root:
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm run start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

#### Cập nhật `package.json` ở root:
```json
{
  "scripts": {
    "install-all": "npm install && cd server && npm install && cd ../client && npm install",
    "build": "cd client && npm run build",
    "start": "cd server && node server.js",
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "server": "cd server && npm run dev",
    "client": "cd client && npm run dev"
  }
}
```

### Bước 2: Deploy

1. Push code lên GitHub
2. Truy cập: https://railway.app
3. New Project → Deploy from GitHub
4. Chọn repo
5. Add MongoDB database
6. Configure environment variables
7. Deploy!

---

## 🎯 Cách 3: Deploy Nhanh với Vercel (Không cần CLI)

### Bước 1: Push lên GitHub

### Bước 2: Import vào Vercel
1. Vào https://vercel.com/new
2. Import Git Repository
3. Chọn repo của bạn
4. Configure:
   - Framework Preset: Vite
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Deploy!

---

## 📱 Cập Nhật QR Code Sau Khi Deploy

Sau khi deploy, bạn cần cập nhật URL trong QR code:

### File `client/src/App.jsx`:
```javascript
const generateSpecialQR = async () => {
  // Thay đổi từ IP local sang domain production
  const productionUrl = 'https://your-app.vercel.app'; // URL Vercel của bạn
  const isDevelopment = window.location.hostname === 'localhost';
  
  const baseUrl = isDevelopment 
    ? `http://192.168.0.101:3000`
    : productionUrl;
  
  const specialUrl = `${baseUrl}/love-slideshow`;
  
  // ... rest of code
};
```

---

## 🔧 Xử Lý Sự Cố

### ❌ Build failed

**Lỗi:** `Module not found`
**Giải pháp:**
```bash
cd client
npm install
npm run build
```

### ❌ API không kết nối được

**Kiểm tra:**
1. Backend có đang chạy không?
2. CORS có được cấu hình đúng không?
3. Environment variables có đúng không?

**Test API:**
```bash
curl https://your-backend-url.railway.app/api/memories
```

### ❌ Database connection failed

**Kiểm tra:**
1. MongoDB URI có đúng không?
2. IP whitelist có bao gồm 0.0.0.0/0 không?
3. Username/password có đúng không?

### ❌ Images không hiển thị

**Vấn đề:** Ảnh upload không được lưu trên Vercel/Railway (serverless)

**Giải pháp:** Dùng Cloudinary hoặc AWS S3

#### Setup Cloudinary (Miễn phí):

1. Đăng ký: https://cloudinary.com
2. Lấy credentials
3. Cài package:
```bash
cd server
npm install cloudinary multer-storage-cloudinary
```

4. Cập nhật `server/server.js`:
```javascript
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'anniversary',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif']
  }
});

const upload = multer({ storage });
```

5. Thêm env variables trên Railway:
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🎨 Custom Domain (Tùy chọn)

### Trên Vercel:
1. Mua domain (Namecheap, GoDaddy, etc.)
2. Vercel Dashboard → Settings → Domains
3. Add domain
4. Cấu hình DNS theo hướng dẫn

---

## 📊 Monitoring & Analytics

### Vercel Analytics:
1. Vercel Dashboard → Analytics
2. Enable Analytics
3. Xem traffic, performance

### Google Analytics:
Thêm vào `client/index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 💰 Chi Phí

### Miễn Phí:
- **Vercel**: 100GB bandwidth/tháng
- **Railway**: $5 credit/tháng (đủ cho hobby project)
- **MongoDB Atlas**: 512MB storage
- **Cloudinary**: 25GB storage, 25GB bandwidth/tháng

### Nếu vượt giới hạn:
- Vercel Pro: $20/tháng
- Railway: Pay as you go
- MongoDB Atlas: $9/tháng (Shared cluster)

---

## 🚀 Checklist Deploy

- [ ] Code đã push lên GitHub
- [ ] Frontend deploy lên Vercel
- [ ] Backend deploy lên Railway
- [ ] MongoDB Atlas setup
- [ ] Environment variables configured
- [ ] CORS configured
- [ ] API URL updated trong frontend
- [ ] QR code URL updated
- [ ] Test trên production
- [ ] Images upload working (Cloudinary)
- [ ] Mobile responsive checked
- [ ] Performance tested

---

## 📞 Hỗ Trợ

Nếu gặp vấn đề:
1. Check logs trên Vercel/Railway dashboard
2. Test API endpoints với Postman
3. Check browser console (F12)
4. Verify environment variables

---

💝 **Chúc bạn deploy thành công!**

🌐 **Ứng dụng của bạn sẽ online 24/7!**

🎉 **Chia sẻ link với người thân yêu nhé!**
