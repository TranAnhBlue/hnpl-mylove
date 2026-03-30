# ✅ Backend Deploy Checklist

## 📋 Chuẩn Bị

- [ ] Đã có tài khoản GitHub
- [ ] Code đã push lên GitHub
- [ ] Frontend đã deploy thành công

---

## 🗄️ MongoDB Atlas

### Tạo Tài Khoản & Cluster
- [ ] Đăng ký tại: https://mongodb.com/cloud/atlas
- [ ] Chọn plan FREE (M0 Sandbox)
- [ ] Provider: AWS
- [ ] Region: Singapore
- [ ] Cluster Name: `onlylove-cluster`

### Database User
- [ ] Username: `onlylove`
- [ ] Password: Autogenerate (đã copy)
- [ ] Privileges: Read and write to any database

### Network Access
- [ ] Add IP: `0.0.0.0/0` (Allow from anywhere)

### Connection String
- [ ] Đã lấy connection string
- [ ] Đã thay `<password>` bằng password thật
- [ ] Đã thêm `/anniversary` vào cuối
- [ ] Format: `mongodb+srv://onlylove:PASSWORD@cluster.xxxxx.mongodb.net/anniversary`

---

## 🚂 Railway

### Tạo Project
- [ ] Đăng ký tại: https://railway.app
- [ ] Login with GitHub
- [ ] New Project → Deploy from GitHub repo
- [ ] Chọn repo của bạn

### Configure
- [ ] Settings → Root Directory: `server`

### Environment Variables
- [ ] `PORT` = `5001`
- [ ] `MONGODB_URI` = (connection string từ MongoDB)
- [ ] `CORS_ORIGIN` = `https://onlylovehnpl.vercel.app`
- [ ] `NODE_ENV` = `production`

### Domain
- [ ] Settings → Generate Domain
- [ ] Đã copy backend URL

---

## 🔗 Kết Nối Frontend

### Update Config
- [ ] Cập nhật `client/.env.production`:
  ```
  VITE_API_URL=https://your-backend.railway.app/api
  ```

### Redeploy
- [ ] `git add client/.env.production`
- [ ] `git commit -m "Update backend URL"`
- [ ] `git push`
- [ ] `cd client && vercel --prod`

---

## ✅ Test

### Backend
- [ ] Mở: `https://your-backend.railway.app/api/memories`
- [ ] Thấy `[]` (mảng rỗng) → OK!

### Frontend
- [ ] Mở: https://onlylovehnpl.vercel.app
- [ ] Thêm kỷ niệm mới
- [ ] Upload ảnh
- [ ] Kỷ niệm xuất hiện → OK!

### Slideshow
- [ ] Click nút 🎬
- [ ] Quét QR code
- [ ] 70 ảnh + nhạc phát → OK!

---

## 🎉 Hoàn Thành!

### URLs
```
Frontend: https://onlylovehnpl.vercel.app
Backend: https://your-backend.railway.app
Slideshow: https://onlylovehnpl.vercel.app/love-slideshow
```

### Tính Năng
- [x] Thêm/Sửa/Xóa kỷ niệm
- [x] Upload ảnh
- [x] Slideshow 70 ảnh + nhạc
- [x] QR code
- [x] Tất cả tính năng!

---

## 🔧 Troubleshooting

### Backend không kết nối
- [ ] Check Railway logs
- [ ] Check MongoDB connection string
- [ ] Check CORS_ORIGIN

### Frontend không gọi API
- [ ] Check VITE_API_URL
- [ ] Đã redeploy frontend chưa
- [ ] Check browser console (F12)

### Upload ảnh không hoạt động
- [ ] Cần setup Cloudinary
- [ ] Xem: DEPLOY-ONLYLOVEHNPL.md

---

💝 **Chúc mừng! Backend đã online!**
