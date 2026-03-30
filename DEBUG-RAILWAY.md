# 🔧 DEBUG RAILWAY CRASH

## ❌ VẤN ĐỀ

Railway báo: "Crashed in 4 seconds"

## 🔍 NGUYÊN NHÂN THƯỜNG GẶP

### 1. Thiếu Environment Variables
```
❌ MONGODB_URI không được set
❌ PORT không được set
```

### 2. MongoDB Connection Failed
```
❌ Connection string sai
❌ Password sai
❌ IP chưa được whitelist
❌ Database name sai
```

### 3. Thiếu Dependencies
```
❌ node_modules không được cài
❌ package.json thiếu dependencies
```

### 4. Code Error
```
❌ Syntax error
❌ Import error
❌ Runtime error
```

## ✅ ĐÃ FIX

### 1. Auto-create uploads directory
```javascript
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
```

### 2. Check MONGODB_URI before connect
```javascript
if (!MONGODB_URI) {
  console.error('ERROR: MONGODB_URI is not defined');
  process.exit(1);
}
```

### 3. Better error handling
```javascript
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected'))
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
```

### 4. Health check endpoints
```javascript
app.get('/', (req, res) => {
  res.json({ status: 'OK' });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});
```

### 5. Listen on 0.0.0.0
```javascript
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
```

## 🚀 CÁCH FIX

### Chạy script tự động:
```bash
fix-railway-crash.bat
```

Script sẽ:
1. ✅ Commit code đã fix
2. ✅ Push lên GitHub
3. ✅ Railway auto-deploy
4. ✅ Kiểm tra Environment Variables
5. ✅ Test backend
6. ✅ Deploy frontend

## 📋 CHECKLIST RAILWAY

### Environment Variables (Railway → Variables)

```env
✅ PORT = 5001
✅ MONGODB_URI = mongodb+srv://admin:password@cluster0.02q3jqa.mongodb.net/aniversary
✅ CORS_ORIGIN = https://onlylovehnpl.vercel.app
✅ NODE_ENV = production
```

### Settings (Railway → Settings)

```
✅ Root Directory: server
✅ Start Command: node server.js
✅ Builder: NIXPACKS
```

### Network Access (MongoDB Atlas)

```
✅ IP Whitelist: 0.0.0.0/0 (Allow all)
```

### Database Access (MongoDB Atlas)

```
✅ User: admin
✅ Password: [your password]
✅ Role: Read and write to any database
```

## 🧪 TEST BACKEND

### 1. Health Check
```bash
curl https://your-railway-url.up.railway.app/
# Kết quả: {"status":"OK","message":"Anniversary Memory API is running"}
```

### 2. API Test
```bash
curl https://your-railway-url.up.railway.app/api/memories
# Kết quả: [] hoặc [...]
```

### 3. Health Status
```bash
curl https://your-railway-url.up.railway.app/api/health
# Kết quả: {"status":"OK","mongodb":"connected","uptime":123}
```

## 📖 XEM LOGS

### Railway Dashboard

1. Vào: https://railway.app
2. Chọn project: hnpl-mylove
3. Tab "Deployments"
4. Click vào deployment mới nhất
5. Tab "Deploy Logs"

### Tìm lỗi

Tìm các dòng:
- ❌ `ERROR`
- ❌ `ECONNREFUSED`
- ❌ `MongoServerError`
- ❌ `Cannot find module`
- ❌ `SyntaxError`

### Lỗi thường gặp

#### "MONGODB_URI is not defined"
```
→ Thiếu Environment Variable
→ Fix: Thêm MONGODB_URI trong Railway Variables
```

#### "MongoServerError: Authentication failed"
```
→ Password sai
→ Fix: Kiểm tra password trong MongoDB Atlas
```

#### "ECONNREFUSED"
```
→ MongoDB không kết nối được
→ Fix: Kiểm tra Network Access trong MongoDB Atlas
```

#### "Cannot find module"
```
→ Thiếu dependencies
→ Fix: Railway tự cài, đợi thêm hoặc kiểm tra package.json
```

## 🆘 NẾU VẪN LỖI

### 1. Xem logs chi tiết
```bash
# Railway Dashboard → Deployments → Deploy Logs
# Copy toàn bộ logs
```

### 2. Test local trước
```bash
# Cập nhật server/.env với MongoDB URI
cd server
npm start

# Test
curl http://localhost:5001/
curl http://localhost:5001/api/memories
```

### 3. Kiểm tra MongoDB Atlas
```bash
# Test connection string
# Thay password và test trong MongoDB Compass
mongodb+srv://admin:password@cluster0.02q3jqa.mongodb.net/aniversary
```

## 💡 TIPS

1. **Luôn kiểm tra Environment Variables trước**
2. **Test local trước khi deploy**
3. **Đọc logs từ đầu đến cuối**
4. **MongoDB URI phải có password đúng**
5. **Database name: `aniversary` (không có 'n' thứ 2)**

## 🎯 SAU KHI FIX XONG

Backend sẽ:
- ✅ Start thành công
- ✅ Connect MongoDB
- ✅ Listen trên PORT
- ✅ Response health check
- ✅ API hoạt động

**Chúc bạn fix thành công!** 💝
