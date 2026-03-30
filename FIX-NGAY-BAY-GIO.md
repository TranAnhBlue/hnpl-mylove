# 🚨 FIX NGAY BÂY GIỜ - MONGODB PASSWORD SAI

## ❌ LỖI

```
MongoServerError: bad auth : authentication failed
```

## ✅ GIẢI PHÁP NHANH (5 PHÚT)

### Bước 1: Vào MongoDB Atlas

https://cloud.mongodb.com

### Bước 2: Tạo User Mới

1. Sidebar → **Database Access**
2. Click **"Add New Database User"**
3. Username: `hnpl`
4. Password: Click **"Autogenerate Secure Password"**
5. **COPY PASSWORD** (quan trọng!)
6. Privileges: **Read and write to any database**
7. Click **"Add User"**

### Bước 3: Kiểm tra Network Access

1. Sidebar → **Network Access**
2. Phải có: **0.0.0.0/0**
3. Nếu chưa có: **Add IP Address** → **Allow Access from Anywhere**

### Bước 4: Tạo Connection String

Format:
```
mongodb+srv://hnpl:YOUR_PASSWORD@cluster0.02q3jqa.mongodb.net/aniversary
```

Thay `YOUR_PASSWORD` bằng password vừa copy ở Bước 2.

### Bước 5: Cập nhật server/.env

Mở file `server/.env` và sửa:

```env
PORT=5001
MONGODB_URI=mongodb+srv://hnpl:YOUR_PASSWORD@cluster0.02q3jqa.mongodb.net/aniversary
CORS_ORIGIN=http://localhost:5173
```

### Bước 6: Test

```bash
cd server
npm start
```

Nếu thấy:
```
✅ Connected to MongoDB
✅ Server running on port 5001
```

→ THÀNH CÔNG! ✅

## 🚀 HOẶC CHẠY SCRIPT

```bash
fix-mongodb-connection.bat
```

Script sẽ hướng dẫn từng bước.

## 📖 ĐỌC THÊM

- `LAY-MONGODB-PASSWORD.md` - Hướng dẫn chi tiết
- `MONGODB-ATLAS-SETUP.md` - Setup MongoDB Atlas

## 💡 LƯU Ý

- **Password Database User** ≠ Password đăng nhập Atlas
- Dùng **Autogenerate** để tránh ký tự đặc biệt
- **Copy password ngay** - chỉ hiện 1 lần!
- **Không commit .env** lên GitHub

**Làm ngay 5 phút là xong!** 💝
