# ☁️ THÊM CLOUDINARY VÀO RAILWAY

## ✅ ĐÃ LÀM GÌ?

1. ✅ Cài package `cloudinary`
2. ✅ Tạo config file
3. ✅ Cập nhật server.js để upload lên Cloudinary
4. ✅ Push code lên GitHub
5. ⏳ Railway đang deploy

## 🎯 CẦN LÀM TIẾP

### Thêm 3 biến Cloudinary vào Railway:

1. Vào: https://railway.app
2. Project: hnpl-mylove → Service
3. Tab **Variables**
4. Click **"+ New Variable"** (3 lần)

### Biến 1:
```
Name: CLOUDINARY_CLOUD_NAME
Value: dzerkw1e3
```

### Biến 2:
```
Name: CLOUDINARY_API_KEY
Value: 853555833238764
```

### Biến 3:
```
Name: CLOUDINARY_API_SECRET
Value: jVNhA5i19x-946RyPzgC9SSgedg
```

## ⏰ SAU KHI THÊM

Railway sẽ tự động restart (30 giây)

## 🧪 TEST

### Test 1: Thêm Kỷ Niệm Mới

1. Vào: https://onlylovehnpl.vercel.app
2. Click nút **+**
3. Chọn ảnh
4. Điền thông tin
5. Click **Lưu**

### Test 2: Kiểm Tra URL Ảnh

Ảnh sẽ có URL dạng:
```
https://res.cloudinary.com/dzerkw1e3/image/upload/...
```

Thay vì:
```
/uploads/...
```

### Test 3: Restart Railway

1. Railway → Service → Settings
2. Scroll xuống → Click **"Restart"**
3. Đợi 1 phút
4. Vào web → Ảnh vẫn còn! ✅

## 🎉 KẾT QUẢ

- ✅ Ảnh lưu trên Cloudinary (cloud)
- ✅ Railway restart → Ảnh vẫn còn
- ✅ Tắt máy → Bật lại → Ảnh vẫn còn
- ✅ Không mất dữ liệu nữa!

## 📊 KIỂM TRA CLOUDINARY

Vào xem ảnh đã upload:
https://console.cloudinary.com/console/media_library/folders/anniversary-memories

(Đăng nhập bằng tài khoản Cloudinary)

---

**Thêm 3 biến vào Railway ngay!** ☁️
