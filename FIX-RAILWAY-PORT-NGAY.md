# 🎯 FIX RAILWAY PORT - NGAY LẬP TỨC

## ❌ VẤN ĐỀ TÌM RA RỒI!

**Public Networking đang map sai port:**
- Railway expose: Port 8080
- Server chạy: Port 5001
- → 502 error!

## ✅ GIẢI PHÁP

### Cách 1: Sửa Public Networking Port (KHUYÊN DÙNG)

1. Trong Railway Settings, tìm **"Public Networking"**
2. Click vào domain: `hnpl-mylove-production.up.railway.app`
3. Click icon **Edit** (bút chì)
4. Sửa **Port** từ `8080` → `5001`
5. Click **Save** hoặc **Update**

### Cách 2: Xóa và Tạo Lại Domain

1. Click icon **Delete** (thùng rác) để xóa domain cũ
2. Railway sẽ tự động tạo domain mới
3. Domain mới sẽ tự động detect port đúng

### Cách 3: Sửa Code (Không khuyên)

Sửa `server/server.js`:
```javascript
const PORT = process.env.PORT || 8080; // Thay 5001 thành 8080
```

Nhưng cách này không tốt vì PORT=5001 đã set trong Variables.

## 🎯 LÀM NGAY

**Cách đơn giản nhất:**

1. Click icon **Edit** (bút chì) bên cạnh domain
2. Tìm field **"Port"**
3. Sửa từ `8080` → `5001`
4. Save
5. Đợi 10 giây
6. Test!

## 🧪 TEST SAU KHI SỬA

```bash
curl https://hnpl-mylove-production.up.railway.app/api/health
```

Phải thấy:
```json
{"status":"OK","mongodb":"connected","uptime":123}
```

## 🎉 SAU KHI FIX

- ✅ Railway sẽ hoạt động ngay
- ✅ Frontend Vercel sẽ load được dữ liệu
- ✅ Không cần ngrok
- ✅ Không cần làm gì nữa!

---

**Sửa port ngay bây giờ!** 🚀

Click Edit → Port: 8080 → 5001 → Save
