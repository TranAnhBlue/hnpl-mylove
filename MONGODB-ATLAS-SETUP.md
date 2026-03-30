# 🗄️ MONGODB ATLAS - HƯỚNG DẪN KẾT NỐI

## ✅ BẠN ĐÃ CÓ

Từ screenshot:
- Cluster: `cluster0.02q3jqa.mongodb.net`
- Database: `aniversary`
- Collection: `memories` (có data)
- User: `admin`

## 📋 LẤY CONNECTION STRING

### Bước 1: Vào MongoDB Atlas
https://cloud.mongodb.com

### Bước 2: Chọn Cluster
Click vào `cluster0`

### Bước 3: Connect
1. Click nút "Connect"
2. Chọn "Connect your application"
3. Driver: Node.js
4. Version: 5.5 or later

### Bước 4: Copy Connection String

Sẽ có dạng:
```
mongodb+srv://admin:<password>@cluster0.02q3jqa.mongodb.net/aniversary
```

### Bước 5: Thay Password

Thay `<password>` bằng password thật của user `admin`

Ví dụ:
```
mongodb+srv://admin:MyPassword123@cluster0.02q3jqa.mongodb.net/aniversary
```

## 🔒 BẢO MẬT

### Kiểm tra Network Access

1. MongoDB Atlas → Network Access
2. Phải có: `0.0.0.0/0` (Allow access from anywhere)
3. Nếu chưa có, click "Add IP Address" → "Allow Access from Anywhere"

### Kiểm tra Database Access

1. MongoDB Atlas → Database Access
2. User `admin` phải có quyền: "Read and write to any database"

## 🧪 TEST CONNECTION

### Test Local

```bash
# 1. Cập nhật server/.env
PORT=5001
MONGODB_URI=mongodb+srv://admin:password@cluster0.02q3jqa.mongodb.net/aniversary

# 2. Khởi động server
cd server
npm start

# 3. Test API
curl http://localhost:5001/api/memories
```

Nếu thấy data từ MongoDB → Kết nối OK! ✅

## 🚂 DÙNG VỚI RAILWAY

### Environment Variables trong Railway:

```env
PORT=5001
MONGODB_URI=mongodb+srv://admin:password@cluster0.02q3jqa.mongodb.net/aniversary
CORS_ORIGIN=https://onlylovehnpl.vercel.app
NODE_ENV=production
```

## 🚀 SCRIPT TỰ ĐỘNG

Chạy script để setup tất cả:

```bash
setup-railway-mongodb.bat
```

Script sẽ:
1. Hỏi MongoDB Connection String
2. Cập nhật server/.env
3. Hướng dẫn setup Railway
4. Kết nối frontend với backend
5. Deploy tất cả

## ❌ TROUBLESHOOTING

### Lỗi: "Authentication failed"
- Password sai
- User không có quyền
- Kiểm tra Database Access

### Lỗi: "Connection timeout"
- IP chưa được whitelist
- Kiểm tra Network Access
- Thêm 0.0.0.0/0

### Lỗi: "Database not found"
- Database name sai (phải là `aniversary`)
- Kiểm tra connection string

## 📝 LƯU Ý

- Database name: `aniversary` (không có 'n' thứ 2)
- Collection: `memories` (tự động tạo nếu chưa có)
- Bạn đã có data trong collection rồi ✅

## 🎯 BƯỚC TIẾP THEO

Sau khi có MongoDB Connection String:

1. Chạy: `setup-railway-mongodb.bat`
2. Làm theo hướng dẫn
3. Test: https://onlylovehnpl.vercel.app
4. Xem kỷ niệm cũ từ MongoDB ✅

**Chúc bạn thành công!** 💝
