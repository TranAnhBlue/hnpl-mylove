# 📜 TẤT CẢ SCRIPTS - HƯỚNG DẪN SỬ DỤNG

## 🎯 MỤC ĐÍCH

Giải quyết vấn đề: "Fix frontend thì hỏng backend, fix backend thì hỏng frontend"

## 🚀 SCRIPTS CHÍNH

### 1. `deploy-stable.bat` - SETUP LẦN ĐẦU
**Khi nào dùng:** Lần đầu tiên deploy hoặc khi Backend URL thay đổi

**Làm gì:**
- Hỏi Railway Backend URL
- Cập nhật `client/.env.production`
- Build và deploy frontend
- Kết nối tất cả

**Cách dùng:**
```bash
deploy-stable.bat
```

---

### 2. `update-frontend-only.bat` - CẬP NHẬT FRONTEND
**Khi nào dùng:** Chỉ sửa code frontend (UI, CSS, components)

**Làm gì:**
- Build frontend
- Deploy lên Vercel
- Backend không bị ảnh hưởng

**Cách dùng:**
```bash
update-frontend-only.bat
```

---

### 3. `update-backend-only.bat` - CẬP NHẬT BACKEND
**Khi nào dùng:** Chỉ sửa code backend (API, database logic)

**Làm gì:**
- Commit backend changes
- Push lên GitHub
- Railway tự động deploy
- Frontend không bị ảnh hưởng

**Cách dùng:**
```bash
update-backend-only.bat
```

---

### 4. `test-backend.bat` - KIỂM TRA BACKEND
**Khi nào dùng:** Muốn kiểm tra Railway backend có hoạt động không

**Làm gì:**
- Test API endpoint
- Hiển thị kết quả

**Cách dùng:**
```bash
test-backend.bat
```

---

### 5. `check-railway-status.bat` - KIỂM TRA RAILWAY
**Khi nào dùng:** Muốn xem Railway deploy status

**Làm gì:**
- Mở Railway dashboard
- Hướng dẫn kiểm tra

**Cách dùng:**
```bash
check-railway-status.bat
```

---

## 📊 WORKFLOW KHUYẾN NGHỊ

### Lần đầu tiên:

```
1. Setup Railway (1 lần duy nhất)
   ↓
2. Chạy: deploy-stable.bat
   ↓
3. Test: test-backend.bat
   ↓
4. Xong! ✅
```

### Lần sau:

#### Sửa Frontend (UI, CSS, components)
```bash
# Sửa code trong client/src/
update-frontend-only.bat
```

#### Sửa Backend (API, logic)
```bash
# Sửa code trong server/
update-backend-only.bat
```

#### Sửa cả 2
```bash
# 1. Backend trước
update-backend-only.bat
# Đợi Railway deploy xong (1-2 phút)

# 2. Frontend sau
update-frontend-only.bat
```

---

## 🎯 BẢNG TÓM TẮT

| Script | Mục đích | Khi nào dùng | Ảnh hưởng |
|--------|----------|--------------|-----------|
| `deploy-stable.bat` | Setup lần đầu | Chưa có Backend URL | Cả 2 |
| `update-frontend-only.bat` | Update UI | Sửa frontend | Frontend |
| `update-backend-only.bat` | Update API | Sửa backend | Backend |
| `test-backend.bat` | Test API | Kiểm tra backend | Không |
| `check-railway-status.bat` | Xem status | Kiểm tra Railway | Không |

---

## 📖 HƯỚNG DẪN CHI TIẾT

Đọc thêm: `HUONG-DAN-DEPLOY-HOAN-CHINH.md`

---

## ❓ FAQ

### Q: Tôi sửa frontend, cần deploy backend không?
**A:** KHÔNG! Chỉ cần chạy `update-frontend-only.bat`

### Q: Tôi sửa backend, cần deploy frontend không?
**A:** KHÔNG! Chỉ cần chạy `update-backend-only.bat`

### Q: Backend URL có thay đổi không?
**A:** KHÔNG! Railway URL cố định mãi mãi

### Q: Làm sao biết backend có hoạt động?
**A:** Chạy `test-backend.bat` hoặc vào Railway dashboard

### Q: QR slideshow bị 404?
**A:** Dùng hash routing: `/#/love-slideshow` (đã fix)

---

## 🆘 KHI GẶP LỖI

### Frontend không kết nối Backend
```bash
# 1. Test backend
test-backend.bat

# 2. Nếu backend chết, kiểm tra Railway
check-railway-status.bat

# 3. Nếu cần, setup lại
deploy-stable.bat
```

### Railway báo lỗi
```bash
# Xem logs tại Railway dashboard
# Thường do: MongoDB URI sai, Port sai, Dependencies thiếu
```

---

## 💡 TIPS

1. **Luôn test backend trước:** `test-backend.bat`
2. **Commit thường xuyên:** Tránh mất code
3. **Deploy từng phần:** Dễ debug hơn
4. **Đọc logs:** Railway và Vercel đều có logs chi tiết

---

## 🎉 KẾT LUẬN

Với các scripts này, bạn có thể:
- ✅ Deploy an toàn, không xung đột
- ✅ Update riêng frontend hoặc backend
- ✅ Test dễ dàng
- ✅ Không còn "fix cái này hỏng cái kia"

**Chúc bạn deploy thành công!** 💝
