# ✅ Checklist Deploy

## 📋 Trước Khi Deploy

### 1. Code & Files
- [ ] Đã test ứng dụng local (http://localhost:3000)
- [ ] Đã test trên điện thoại (http://192.168.0.101:3000)
- [ ] Slideshow hoạt động tốt
- [ ] Nhạc "Lễ Đường" phát được
- [ ] QR code hoạt động
- [ ] Tất cả 70 ảnh đã có trong `client/public/images/`
- [ ] File nhạc đã có trong `client/public/music/`

### 2. Git
- [ ] Đã tạo repo trên GitHub
- [ ] Đã push code lên GitHub
```bash
git init
git add .
git commit -m "Ready to deploy"
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

### 3. Accounts
- [ ] Đã có tài khoản Vercel (https://vercel.com)
- [ ] Đã có tài khoản Railway (https://railway.app)
- [ ] Đã có tài khoản MongoDB Atlas (https://mongodb.com/cloud/atlas)

---

## 🗄️ Setup Database (MongoDB Atlas)

- [ ] Đã tạo cluster miễn phí
- [ ] Đã tạo database user
- [ ] Đã whitelist IP (0.0.0.0/0)
- [ ] Đã lấy connection string
- [ ] Connection string format: `mongodb+srv://username:password@cluster.mongodb.net/anniversary`

---

## 🚀 Deploy Backend (Railway)

### Bước 1: Deploy
- [ ] Đã login Railway
- [ ] New Project → Deploy from GitHub
- [ ] Chọn repo
- [ ] Chọn thư mục `server`

### Bước 2: Environment Variables
Thêm các biến sau trong Railway Variables:
- [ ] `PORT=5001`
- [ ] `MONGODB_URI=mongodb+srv://...` (từ MongoDB Atlas)
- [ ] `CORS_ORIGIN=https://your-frontend.vercel.app` (sẽ cập nhật sau)
- [ ] `NODE_ENV=production`

### Bước 3: Lấy URL
- [ ] Đã lấy backend URL: `https://your-backend.railway.app`
- [ ] Test API: `https://your-backend.railway.app/api/memories`

---

## 🌐 Deploy Frontend (Vercel)

### Bước 1: Tạo file .env
Tạo file `client/.env.production`:
```
VITE_API_URL=https://your-backend.railway.app/api
```

- [ ] Đã tạo file `.env.production`
- [ ] Đã thay URL backend đúng

### Bước 2: Deploy
```bash
cd client
vercel --prod
```

Hoặc:
- [ ] Import repo vào Vercel dashboard
- [ ] Root Directory: `client`
- [ ] Framework: Vite
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`

### Bước 3: Environment Variables
Trong Vercel dashboard → Settings → Environment Variables:
- [ ] `VITE_API_URL=https://your-backend.railway.app/api`

### Bước 4: Lấy URL
- [ ] Đã lấy frontend URL: `https://your-app.vercel.app`

---

## 🔄 Cập Nhật CORS

Quay lại Railway, cập nhật biến:
- [ ] `CORS_ORIGIN=https://your-app.vercel.app`
- [ ] Đã redeploy backend

---

## 🧪 Test Production

### Frontend
- [ ] Mở `https://your-app.vercel.app`
- [ ] Trang load được
- [ ] Không có lỗi console (F12)
- [ ] Ảnh hiển thị
- [ ] Có thể thêm kỷ niệm mới

### Backend API
- [ ] `https://your-backend.railway.app/api/memories` trả về data
- [ ] Có thể POST kỷ niệm mới
- [ ] Có thể upload ảnh

### Slideshow
- [ ] Click nút 🎬 tạo QR
- [ ] Quét QR mở được slideshow
- [ ] 70 ảnh hiển thị
- [ ] Nhạc phát được
- [ ] Controls hoạt động

### Mobile
- [ ] Mở trên điện thoại
- [ ] UI không bị đè
- [ ] Slideshow responsive
- [ ] Nhạc phát được
- [ ] QR code hoạt động

---

## 📱 Cập Nhật QR Code

Code đã tự động detect production/development:
- [ ] QR code local: `http://192.168.0.101:3000/love-slideshow`
- [ ] QR code production: `https://your-app.vercel.app/love-slideshow`

---

## 🖼️ Upload Ảnh (Optional - Cloudinary)

Nếu muốn upload ảnh trên production:

### Setup Cloudinary
- [ ] Đăng ký Cloudinary (https://cloudinary.com)
- [ ] Lấy credentials
- [ ] Cài package: `npm install cloudinary multer-storage-cloudinary`
- [ ] Cập nhật `server/server.js`
- [ ] Thêm env variables trên Railway:
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`

---

## 🎨 Custom Domain (Optional)

### Vercel
- [ ] Mua domain
- [ ] Vercel → Settings → Domains
- [ ] Add domain
- [ ] Cấu hình DNS

---

## 📊 Monitoring

### Vercel Analytics
- [ ] Enable Analytics trong dashboard
- [ ] Xem traffic, performance

### Railway Logs
- [ ] Check logs để debug
- [ ] Monitor resource usage

---

## 🔒 Security

- [ ] MongoDB user có password mạnh
- [ ] Environment variables không commit lên Git
- [ ] `.gitignore` đã có `.env`
- [ ] CORS chỉ cho phép domain của bạn

---

## 📝 Documentation

- [ ] Cập nhật README với URL production
- [ ] Ghi chú URL backend/frontend
- [ ] Lưu credentials an toàn

---

## 🎉 Hoàn Thành!

### URLs Quan Trọng
```
Frontend: https://your-app.vercel.app
Backend: https://your-backend.railway.app
Database: MongoDB Atlas
```

### Chia Sẻ
- [ ] Tạo QR code mới với URL production
- [ ] Chia sẻ link với người thân yêu
- [ ] Test trên nhiều thiết bị

---

## 🔄 Cập Nhật Sau Này

### Khi thay đổi code:

**Frontend:**
```bash
git add .
git commit -m "Update frontend"
git push
# Vercel tự động deploy
```

**Backend:**
```bash
git add .
git commit -m "Update backend"
git push
# Railway tự động deploy
```

### Khi thêm ảnh mới:
1. Add ảnh vào `client/public/images/`
2. Cập nhật `loveImages` array trong `LoveSlideshow.jsx`
3. Thêm lời nhắn tương ứng
4. Push lên Git
5. Vercel tự động deploy

---

## 🆘 Troubleshooting

### ❌ Frontend không load
- Check Vercel logs
- Verify build command
- Check environment variables

### ❌ API không kết nối
- Check Railway logs
- Verify CORS_ORIGIN
- Test API endpoint trực tiếp

### ❌ Database lỗi
- Check MongoDB Atlas connection
- Verify IP whitelist
- Check credentials

### ❌ Ảnh không hiển thị
- Check file paths
- Verify Cloudinary setup (nếu dùng)
- Check CORS headers

---

## 📞 Support

Nếu gặp vấn đề:
1. Check logs (Vercel/Railway dashboard)
2. Xem file [HUONG-DAN-DEPLOY.md](HUONG-DAN-DEPLOY.md)
3. Test từng phần riêng lẻ
4. Verify environment variables

---

💝 **Chúc mừng! Ứng dụng của bạn đã online!**

🌐 **Giờ bạn có thể truy cập từ bất kỳ đâu!**

🎉 **Chia sẻ với người thân yêu và tận hưởng!**
