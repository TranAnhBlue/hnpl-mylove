# 🔧 FIX CORS ERROR - NGAY LẬP TỨC

## ❌ VẤN ĐỀ

Frontend Vercel không thể gọi backend vì CORS error:
```
Access-Control-Allow-Origin header has a value 'http://localhost:5173' 
that is not equal to the supplied origin 'https://onlylovehnpl.vercel.app'
```

## 🎯 NGUYÊN NHÂN

Railway CORS_ORIGIN đang là `http://localhost:5173` (local) thay vì `https://onlylovehnpl.vercel.app` (production)

## ✅ GIẢI PHÁP

### Sửa CORS_ORIGIN trong Railway:

1. Vào: https://railway.app
2. Project: hnpl-mylove → Service
3. Tab **Variables**
4. Tìm biến **CORS_ORIGIN**
5. Click vào biến đó
6. Sửa value:

**Từ:**
```
http://localhost:5173
```

**Thành:**
```
https://onlylovehnpl.vercel.app
```

7. Click **Save** hoặc **Update**
8. Railway sẽ restart (30 giây)

## 🧪 TEST SAU KHI SỬA

1. Đợi 30 giây
2. Vào: https://onlylovehnpl.vercel.app
3. Hard refresh: Ctrl + Shift + R
4. Phải load được dữ liệu!

## 💡 LƯU Ý

Nếu muốn dùng cả local và production:

**CORS_ORIGIN có thể là:**
```
https://onlylovehnpl.vercel.app,http://localhost:5173
```

Hoặc dùng wildcard (không khuyên):
```
*
```

---

**Sửa CORS_ORIGIN ngay!** 🚀
